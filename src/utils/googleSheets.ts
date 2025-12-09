import { config } from "./config";
import type { ReviewCard } from "../types";

/**
 * Sends a ReviewCard to a Google Apps Script Web App to append into Google Sheets.
 * - Requires config.sheets.webAppUrl to be set.
 * - Optionally includes config.sheets.sharedSecret for basic verification.
 */
export async function sendReviewCardToSheet(
  card: ReviewCard
): Promise<{ ok: boolean; message?: string }> {
  if (!config.isSheetsConfigured()) {
    if (config.app.isDevelopment) {
      console.warn(
        "[Sheets] Skipped sending to Google Sheets: web app URL not configured"
      );
    }
    return { ok: false, message: "Sheets not configured" };
  }

  // Prepare a lean payload; Apps Script can choose what columns to store
  const payload = {
    secret: config.sheets.sharedSecret || undefined,
    card: {
      id: card.id,
      businessName: card.businessName,
      category: card.category,
      type: card.type,
      description: card.description,
      location: card.location,
      services: card.services,
      slug: card.slug,
      logoUrl: card.logoUrl,
      googleMapsUrl: card.googleMapsUrl,
      active: card.active ?? true,
      expiresAt: card.expiresAt || "",
      allowedLanguages: card.allowedLanguages || [],
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    },
  };

  const res = await fetch(config.sheets.webAppUrl, {
    method: "POST",
    headers: {
      // Use text/plain to avoid CORS preflight with Apps Script Web Apps
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
    // Apps Script needs CORS response; it will add headers in the doPost
    mode: "cors",
  });

  const text = await res.text();
  let data: unknown = undefined;
  try {
    data = JSON.parse(text);
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "message" in data
        ? (data as { message?: string }).message || text
        : text || "Failed to send to Google Sheets";
    throw new Error(msg);
  }

  const message =
    typeof data === "object" && data && "message" in data
      ? (data as { message?: string }).message
      : undefined;
  return { ok: true, message };
}
