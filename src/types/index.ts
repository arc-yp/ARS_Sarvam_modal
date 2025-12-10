export interface ReviewCard {
  id: string;
  businessName: string;
  category: string;
  type: string;
  description: string;
  location: string;
  services: string[];
  slug: string;
  logoUrl: string;
  googleMapsUrl: string;
  sarvamApiKey?: string;
  viewCount?: number;
  active?: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  allowedLanguages?: string[]; // NEW
}

export interface ReviewTemplates {
  openings: string[];
  qualities: string[];
  achievements: string[];
  endings: string[];
}

export interface ReviewVariations {
  connectors: string[];
  intensifiers: string[];
  timeframes: string[];
}

// Newly generated reviews storage type (in a separate new database)
export interface GeneratedReviewRecord {
  id?: string; // Supabase UUID (optional when inserting)
  businessName: string;
  category: string;
  rating: number;
  language: string;
  tone?: string;
  services?: string[];
  reviewText: string;
  isFallback?: boolean; // fallback review when API call fails
  generationSource?: "auto" | "service" | "manual"; // 'auto' = first load, 'service' = service selection, 'manual' = Generate New Review button
  createdAt?: string; // server default
}
