import { createClient } from "@supabase/supabase-js";
import type { GeneratedReviewRecord } from "../../types";

/**
 * Review Store Service
 * Handles all interactions with the separate Review Store Supabase database
 * This database stores all AI-generated and fallback reviews
 */

// Environment variables for the separate Review Store database
const REVIEWSTORE_URL = import.meta.env.VITE_REVIEWSTORE_URL as string;
const REVIEWSTORE_KEY = import.meta.env.VITE_REVIEWSTORE_ANON_KEY as string;

// Validate environment variables
if (!REVIEWSTORE_URL || !REVIEWSTORE_KEY) {
  console.warn(
    "[reviewStore] Missing VITE_REVIEWSTORE_URL or VITE_REVIEWSTORE_ANON_KEY. Please add them to your .env file."
  );
}

// Create Supabase client for Review Store with unique storage key
export const reviewStoreClient = createClient(
  REVIEWSTORE_URL || "",
  REVIEWSTORE_KEY || "",
  {
    auth: {
      storageKey: "review_store_auth", // Unique key to avoid conflicts
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

// Table name in the Review Store database
const TABLE = "generated_reviews";

/**
 * Save a new review to the Review Store database
 * @param data Review data to save (without id and createdAt)
 * @returns Saved review record or null if failed
 */
async function saveReview(
  data: Omit<GeneratedReviewRecord, "id" | "createdAt">
): Promise<GeneratedReviewRecord | null> {
  try {
    const payload = {
      business_name: data.businessName,
      category: data.category,
      rating: data.rating,
      language: data.language,
      tone: data.tone,
      services: data.services || [],
      review_text: data.reviewText,
      is_fallback: data.isFallback === true,
      generation_source: data.generationSource || "auto",
    };

    const { data: inserted, error } = await reviewStoreClient
      .from(TABLE)
      .insert(payload)
      .select()
      .limit(1)
      .single();

    if (error) throw error;

    return inserted
      ? {
          id: inserted.id,
          businessName: inserted.business_name,
          category: inserted.category,
          rating: inserted.rating,
          language: inserted.language,
          tone: inserted.tone,
          services: inserted.services || [],
          reviewText: inserted.review_text,
          isFallback: inserted.is_fallback,
          generationSource: inserted.generation_source,
          createdAt: inserted.created_at,
        }
      : null;
  } catch (e) {
    console.error("[reviewStore.saveReview] Error saving review:", e);
    return null;
  }
}

/**
 * Get all reviews from the Review Store database
 * @returns Array of all review records (max 5000)
 */
async function getAllReviews(): Promise<GeneratedReviewRecord[]> {
  try {
    const { data, error } = await reviewStoreClient
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000); // Safety cap to prevent excessive data retrieval

    if (error) throw error;

    return (data || []).map((r: Record<string, any>) => ({
      id: r.id,
      businessName: r.business_name,
      category: r.category,
      rating: r.rating,
      language: r.language,
      tone: r.tone,
      services: r.services || [],
      reviewText: r.review_text,
      isFallback: r.is_fallback,
      generationSource: r.generation_source,
      createdAt: r.created_at,
    }));
  } catch (e) {
    console.error("[reviewStore.getAllReviews] Error fetching reviews:", e);
    return [];
  }
}

/**
 * Get all reviews for a specific business
 * @param businessName Name of the business to filter by
 * @returns Array of review records for the specified business (max 1000)
 */
async function getReviewsByBusiness(
  businessName: string
): Promise<GeneratedReviewRecord[]> {
  try {
    const { data, error } = await reviewStoreClient
      .from(TABLE)
      .select("*")
      .eq("business_name", businessName)
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    return (data || []).map((r: Record<string, any>) => ({
      id: r.id,
      businessName: r.business_name,
      category: r.category,
      rating: r.rating,
      language: r.language,
      tone: r.tone,
      services: r.services || [],
      reviewText: r.review_text,
      isFallback: r.is_fallback,
      generationSource: r.generation_source,
      createdAt: r.created_at,
    }));
  } catch (e) {
    console.error(
      "[reviewStore.getReviewsByBusiness] Error fetching reviews:",
      e
    );
    return [];
  }
}

/**
 * Get reviews by category
 * @param category Category to filter by
 * @returns Array of review records for the specified category
 */
async function getReviewsByCategory(
  category: string
): Promise<GeneratedReviewRecord[]> {
  try {
    const { data, error } = await reviewStoreClient
      .from(TABLE)
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    return (data || []).map((r: Record<string, any>) => ({
      id: r.id,
      businessName: r.business_name,
      category: r.category,
      rating: r.rating,
      language: r.language,
      tone: r.tone,
      services: r.services || [],
      reviewText: r.review_text,
      isFallback: r.is_fallback,
      generationSource: r.generation_source,
      createdAt: r.created_at,
    }));
  } catch (e) {
    console.error(
      "[reviewStore.getReviewsByCategory] Error fetching reviews:",
      e
    );
    return [];
  }
}

/**
 * Get review statistics
 * @returns Statistics about stored reviews
 */
async function getReviewStats(): Promise<{
  total: number;
  aiGenerated: number;
  fallback: number;
  categories: number;
}> {
  try {
    const { data, error } = await reviewStoreClient
      .from(TABLE)
      .select("is_fallback, category");

    if (error) throw error;

    const total = data?.length || 0;
    const fallback =
      data?.filter((r: Record<string, any>) => r.is_fallback).length || 0;
    const categories = new Set(
      data?.map((r: Record<string, any>) => r.category)
    ).size;

    return {
      total,
      aiGenerated: total - fallback,
      fallback,
      categories,
    };
  } catch (e) {
    console.error("[reviewStore.getReviewStats] Error fetching stats:", e);
    return { total: 0, aiGenerated: 0, fallback: 0, categories: 0 };
  }
}

// Export the Review Store service
export const reviewStore = {
  saveReview,
  getAllReviews,
  getReviewsByBusiness,
  getReviewsByCategory,
  getReviewStats,
};
