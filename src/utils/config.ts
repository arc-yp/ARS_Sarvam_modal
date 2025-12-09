// Application configuration using environment variables

export const config = {
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  },

  // AI Service Configuration
  ai: {
    sarvamApiKey: import.meta.env.VITE_SARVAM_API_KEY || "",
  },

  // Netlify Configuration (for future use)
  netlify: {
    apiKey: import.meta.env.VITE_NETLIFY_API_KEY || "",
  },

  // Google Sheets (Apps Script Web App) Configuration
  sheets: {
    // Deployed Apps Script Web App URL
    webAppUrl: import.meta.env.VITE_SHEETS_WEBAPP_URL || "",
    // Optional shared secret validated by the Apps Script (recommended)
    sharedSecret: import.meta.env.VITE_SHEETS_SHARED_SECRET || "",
  },

  // Application Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || "Review Automation System",
    description:
      import.meta.env.VITE_APP_DESCRIPTION || "Streamline your reviews",
    isDevelopment: import.meta.env.VITE_DEV_MODE === "true",
  },

  // Validation helpers
  isSupabaseConfigured(): boolean {
    return !!(
      this.supabase.url &&
      this.supabase.anonKey &&
      this.supabase.url !== "your_supabase_project_url_here" &&
      this.supabase.url.includes("supabase.co")
    );
  },

  isSarvamConfigured(): boolean {
    return !!(
      this.ai.sarvamApiKey &&
      this.ai.sarvamApiKey !== "your_sarvam_api_key_here"
    );
  },

  isNetlifyConfigured(): boolean {
    return !!(
      this.netlify.apiKey && this.netlify.apiKey !== "your_netlify_api_key_here"
    );
  },

  isSheetsConfigured(): boolean {
    return !!(
      (this.sheets.webAppUrl &&
        this.sheets.webAppUrl.startsWith(
          "https://script.googleusercontent.com/"
        )) ||
      this.sheets.webAppUrl.startsWith("https://script.google.com/")
    );
  },
};

// Log configuration status in development
if (config.app.isDevelopment) {
  console.log("Configuration Status:", {
    supabase: config.isSupabaseConfigured()
      ? "✅ Configured"
      : "❌ Not configured",
    sarvam: config.isSarvamConfigured() ? "✅ Configured" : "❌ Not configured",
    netlify: config.isNetlifyConfigured()
      ? "✅ Configured"
      : "❌ Not configured",
    sheets: config.isSheetsConfigured() ? "✅ Configured" : "❌ Not configured",
  });
}
