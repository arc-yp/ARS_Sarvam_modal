import { ReviewCard } from "../types";
import { supabase, isSupabaseConfigured } from "./supabase";

// In-memory caches to avoid duplicate fetches in React 18 Strict Mode
const cardCache = new Map<string, ReviewCard | null>();
const inFlightCardFetch = new Map<string, Promise<ReviewCard | null>>();

// Cache for getCards() API call deduplication
let inFlightGetCardsRequest: Promise<ReviewCard[]> | null = null;

// Helper function to validate UUID format
const isValidUuid = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// Transform database row to ReviewCard type
const transformDbRowToCard = (row: any): ReviewCard => ({
  id: row.id,
  businessName: row.business_name,
  category: row.category,
  type: row.type,
  description: row.description || "",
  location: row.location || "",
  services: row.services || [],
  slug: row.slug,
  logoUrl: row.logo_url || "",
  googleMapsUrl: row.google_maps_url,
  sarvamApiKey: row.sarvam_api_key || "sk_lvy8wqoz_CTuFEr2mv41GcfaBhRPC0xSu",
  viewCount: row.view_count || 0,
  active: typeof row.active === "boolean" ? row.active : true,
  expiresAt: row.expires_at || undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  allowedLanguages: row.allowed_languages || ["English", "Gujarati", "Hindi"], // NEW
  highlightServices:
    typeof row.highlight_services === "boolean" ? row.highlight_services : true,
  allowSpellingMistakes:
    typeof row.allow_spelling_mistakes === "boolean"
      ? row.allow_spelling_mistakes
      : false,
});

// Transform ReviewCard to database insert format
const transformCardToDbInsert = (card: ReviewCard) => {
  const baseData = {
    business_name: card.businessName,
    category: card.category,
    type: card.type,
    description: card.description || null,
    location: card.location || null,
    services: card.services || null,
    slug: card.slug,
    logo_url: card.logoUrl || null,
    google_maps_url: card.googleMapsUrl,
    sarvam_api_key: card.sarvamApiKey || "",
    view_count: card.viewCount || 0,
    active: typeof card.active === "boolean" ? card.active : true,
    expires_at: card.expiresAt || null,
    allowed_languages: card.allowedLanguages || [
      "English",
      "Gujarati",
      "Hindi",
    ], // NEW
    highlight_services:
      typeof card.highlightServices === "boolean"
        ? card.highlightServices
        : true,
    allow_spelling_mistakes:
      typeof card.allowSpellingMistakes === "boolean"
        ? card.allowSpellingMistakes
        : false,
    created_at: card.createdAt || new Date().toISOString(),
    updated_at: card.updatedAt || new Date().toISOString(),
  };

  // Only include id if it's a valid UUID, otherwise let Supabase generate one
  if (isValidUuid(card.id)) {
    return { id: card.id, ...baseData };
  }

  return baseData;
};

// Transform ReviewCard to database update format
const transformCardToDbUpdate = (card: ReviewCard) => ({
  business_name: card.businessName,
  category: card.category,
  type: card.type,
  description: card.description || null,
  location: card.location || null,
  services: card.services || null,
  slug: card.slug,
  logo_url: card.logoUrl || null,
  google_maps_url: card.googleMapsUrl,
  sarvam_api_key: card.sarvamApiKey || "",
  view_count: card.viewCount || 0,
  active: typeof card.active === "boolean" ? card.active : true,
  expires_at: card.expiresAt || null,
  allowed_languages: card.allowedLanguages || ["English", "Gujarati", "Hindi"], // NEW
  highlight_services:
    typeof card.highlightServices === "boolean" ? card.highlightServices : true,
  allow_spelling_mistakes:
    typeof card.allowSpellingMistakes === "boolean"
      ? card.allowSpellingMistakes
      : false,
  updated_at: new Date().toISOString(),
});

export const storage = {
  async getCards(): Promise<ReviewCard[]> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      // If there's already a request in flight, reuse it
      if (inFlightGetCardsRequest) {
        console.log("Reusing in-flight getCards request...");
        return await inFlightGetCardsRequest;
      }

      // Create a new request
      inFlightGetCardsRequest = (async () => {
        try {
          console.log("Fetching cards from Supabase...");
          const { data, error } = await supabase
            .from("review_cards")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) {
            console.error("Supabase error:", error);
            throw error;
          }

          console.log(
            `Successfully fetched ${data?.length || 0} cards from Supabase`
          );
          let supabaseCards = (data || []).map(transformDbRowToCard);

          // Auto deactivate expired cards
          const now = Date.now();
          const expiredActiveCards = supabaseCards.filter(
            (c) =>
              c.active !== false && c.expiresAt && Date.parse(c.expiresAt) < now
          );

          if (expiredActiveCards.length > 0) {
            for (const card of expiredActiveCards) {
              card.active = false;
            }

            // Update Supabase to persist deactivation
            try {
              await supabase.from("review_cards").upsert(
                expiredActiveCards.map((c) => ({
                  id: c.id,
                  active: false,
                  updated_at: new Date().toISOString(),
                }))
              );
            } catch (e) {
              console.warn("Failed to persist expiry deactivations:", e);
            }
          }

          return supabaseCards;
        } finally {
          // Clear the in-flight promise after completion
          inFlightGetCardsRequest = null;
        }
      })();

      return await inFlightGetCardsRequest;
    } catch (error) {
      console.error("Error loading cards:", error);
      return [];
    }
  },

  async addCard(card: ReviewCard): Promise<boolean> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      console.log("Adding card:", card.businessName);
      const insertData = transformCardToDbInsert(card);
      console.log("Insert data:", insertData);

      const { data, error } = await supabase
        .from("review_cards")
        .upsert([insertData], { onConflict: "id" })
        .select();

      if (error) {
        console.error("Error adding card to Supabase:", error);
        throw error;
      }

      console.log("Card successfully added to Supabase:", data);

      // Clear cache for this slug
      if (card.slug) {
        cardCache.delete(card.slug);
      }

      return true;
    } catch (error) {
      console.error("Error adding card:", error);
      return false;
    }
  },

  async updateCard(updatedCard: ReviewCard): Promise<boolean> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      console.log("Updating card:", updatedCard.businessName);
      const updateData = transformCardToDbUpdate(updatedCard);
      console.log("Update data:", updateData);

      const { data, error } = await supabase
        .from("review_cards")
        .update(updateData)
        .eq("id", updatedCard.id)
        .select();

      if (error) {
        console.error("Error updating card in Supabase:", error);
        throw error;
      }

      console.log("Card successfully updated in Supabase:", data);

      // Clear cache for this slug
      if (updatedCard.slug) {
        cardCache.delete(updatedCard.slug);
      }

      return true;
    } catch (error) {
      console.error("Error updating card:", error);
      return false;
    }
  },

  async deleteCard(cardId: string): Promise<boolean> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      console.log("Deleting card:", cardId);

      const { error } = await supabase
        .from("review_cards")
        .delete()
        .eq("id", cardId);

      if (error) {
        console.error("Error deleting card from Supabase:", error);
        throw error;
      }

      console.log("Card successfully deleted from Supabase");

      // Clear all caches since we don't have the slug here
      cardCache.clear();

      return true;
    } catch (error) {
      console.error("Error deleting card:", error);
      return false;
    }
  },

  async getCardBySlug(slug: string): Promise<ReviewCard | null> {
    try {
      // Serve from cache immediately if available
      if (cardCache.has(slug)) {
        const cached = cardCache.get(slug) ?? null;
        console.log("Card served from cache:", slug);
        return cached;
      }

      // If there is an in-flight request for the same slug, reuse it
      const existing = inFlightCardFetch.get(slug);
      if (existing) {
        console.log("Reusing in-flight card fetch for slug:", slug);
        return await existing;
      }

      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      console.log("Looking for card with slug:", slug);

      const fetchPromise = (async (): Promise<ReviewCard | null> => {
        const { data, error } = await supabase
          .from("review_cards")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        if (data) {
          console.log("Card found in Supabase:", data.business_name);
          return transformDbRowToCard(data);
        }

        console.log("Card not found in Supabase");
        return null;
      })();

      // Track the in-flight request to deduplicate parallel calls
      inFlightCardFetch.set(slug, fetchPromise);

      const result = await fetchPromise;
      // Cache the result for the remainder of the page session
      cardCache.set(slug, result);
      inFlightCardFetch.delete(slug);
      return result;
    } catch (error) {
      console.error("Error loading card by slug:", error);
      return null;
    }
  },

  // View count methods
  async incrementViewCount(cardId: string): Promise<boolean> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      console.log("Incrementing view count for card:", cardId);

      const { error } = await supabase.rpc("increment_view_count", {
        card_id: cardId,
      });

      if (error) {
        console.error("Error incrementing view count in Supabase:", error);

        // Fallback: update the record manually
        const { data: currentCard, error: fetchError } = await supabase
          .from("review_cards")
          .select("view_count")
          .eq("id", cardId)
          .single();

        if (!fetchError && currentCard) {
          const newViewCount = (currentCard.view_count || 0) + 1;
          const { error: updateError } = await supabase
            .from("review_cards")
            .update({ view_count: newViewCount })
            .eq("id", cardId);

          if (updateError) {
            console.error("Error updating view count manually:", updateError);
            throw updateError;
          }

          console.log("View count updated manually in Supabase");
          return true;
        }

        throw error;
      }

      console.log("View count successfully incremented in Supabase");
      return true;
    } catch (error) {
      console.error("Error incrementing view count:", error);
      return false;
    }
  },

  async getViewCount(cardId: string): Promise<number> {
    try {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error("Supabase is not configured");
      }

      const { data, error } = await supabase
        .from("review_cards")
        .select("view_count")
        .eq("id", cardId)
        .single();

      if (error) {
        console.error("Error fetching view count from Supabase:", error);
        throw error;
      }

      return data.view_count || 0;
    } catch (error) {
      console.error("Error getting view count:", error);
      return 0;
    }
  },
};
