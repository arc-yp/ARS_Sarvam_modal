import { supabase, isSupabaseConfigured } from "./supabase";

export interface PricingPlan {
  id: string;
  plan_name: string;
  plan_type: "first_year" | "renewal";
  original_price: number | null;
  current_price: number;
  currency: string;
  duration_text: string;
  badge_text: string | null;
  badge_icon: string | null;
  features: string[];
  bonus_text: string | null;
  button_text: string;
  button_link: string;
  button_gradient: string;
  border_color: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Default pricing data
const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: "1",
    plan_name: "Go For Review Plan",
    plan_type: "first_year",
    original_price: 12500,
    current_price: 10500,
    currency: "₹",
    duration_text: "One-time payment for the first year",
    badge_text: "Diwali Special Offer",
    badge_icon: "🎁",
    features: [
      "Custom QR code for your business",
      "AI-generated personalized reviews",
      "Mobile-optimized review page",
      "Direct Google Reviews integration",
      "Unlimited scans & reviews",
      "24/7 WhatsApp support",
      "Free updates & improvements",
      "Setup within 24 hours",
    ],
    bonus_text: "FREE Premium Standee included",
    button_text: "Get Your QR Code Now",
    button_link: "/#lead-form",
    button_gradient: "from-blue-600 to-purple-600",
    border_color: "border-yellow-300",
    is_featured: true,
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    plan_name: "Renewal from Second Year",
    plan_type: "renewal",
    original_price: null,
    current_price: 10500,
    currency: "₹",
    duration_text: "Annual renewal for continued access",
    badge_text: null,
    badge_icon: null,
    features: [
      "Continued QR code access (no downtime)",
      "Keep unlimited scans & reviews active",
      "Ongoing access to AI review generator",
      "Lifetime support & future upgrades",
      "Google review page remains live",
      "Annual platform maintenance & security updates",
    ],
    bonus_text: null,
    button_text: "Renew Your Access",
    button_link: "/renewalplanform",
    button_gradient: "from-yellow-400 to-orange-500",
    border_color: "border-gray-100",
    is_featured: false,
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

class PricingService {
  // Get all active pricing plans
  async getPlans(): Promise<PricingPlan[]> {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn("Supabase not configured, returning default pricing");
      return DEFAULT_PRICING;
    }

    try {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        return data as PricingPlan[];
      }

      // Return default pricing if no data in Supabase
      return DEFAULT_PRICING;
    } catch (error) {
      console.error("Error fetching pricing from Supabase:", error);
      return DEFAULT_PRICING;
    }
  }

  // Get a single plan by type
  async getPlanByType(
    type: "first_year" | "renewal"
  ): Promise<PricingPlan | null> {
    const plans = await this.getPlans();
    return plans.find((p) => p.plan_type === type) || null;
  }

  // Update a pricing plan
  async updatePlan(plan: PricingPlan): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) {
      console.error("Supabase not configured, cannot update pricing");
      return false;
    }

    const updatedPlan = {
      ...plan,
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from("pricing_plans")
        .update({
          plan_name: updatedPlan.plan_name,
          original_price: updatedPlan.original_price,
          current_price: updatedPlan.current_price,
          currency: updatedPlan.currency,
          duration_text: updatedPlan.duration_text,
          badge_text: updatedPlan.badge_text,
          badge_icon: updatedPlan.badge_icon,
          features: updatedPlan.features,
          bonus_text: updatedPlan.bonus_text,
          button_text: updatedPlan.button_text,
          button_link: updatedPlan.button_link,
          button_gradient: updatedPlan.button_gradient,
          border_color: updatedPlan.border_color,
          is_featured: updatedPlan.is_featured,
          display_order: updatedPlan.display_order,
          is_active: updatedPlan.is_active,
          updated_at: updatedPlan.updated_at,
        })
        .eq("id", plan.id);

      if (error) throw error;

      console.log("Pricing plan updated in Supabase");
      return true;
    } catch (error) {
      console.error("Error updating pricing in Supabase:", error);
      return false;
    }
  }

  // Initialize default pricing plans (for first time setup)
  async initializeDefaults(): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) {
      console.error("Supabase not configured, cannot initialize pricing");
      return false;
    }

    const plans = await this.getPlans();

    if (plans.length === 0 || plans === DEFAULT_PRICING) {
      try {
        const { error } = await supabase.from("pricing_plans").insert(
          DEFAULT_PRICING.map((p) => ({
            plan_name: p.plan_name,
            plan_type: p.plan_type,
            original_price: p.original_price,
            current_price: p.current_price,
            currency: p.currency,
            duration_text: p.duration_text,
            badge_text: p.badge_text,
            badge_icon: p.badge_icon,
            features: p.features,
            bonus_text: p.bonus_text,
            button_text: p.button_text,
            button_link: p.button_link,
            button_gradient: p.button_gradient,
            border_color: p.border_color,
            is_featured: p.is_featured,
            display_order: p.display_order,
            is_active: p.is_active,
          }))
        );

        if (error) throw error;
        console.log("Default pricing initialized in Supabase");
        return true;
      } catch (error) {
        console.error("Error initializing pricing in Supabase:", error);
        return false;
      }
    }

    return false;
  }
}

export const pricingService = new PricingService();
