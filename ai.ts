export interface ReviewRequest {
  businessName: string;
  category: string;
  type: string;
  highlights?: string;
  selectedServices?: string[];
  starRating: number;
  language?: string;
  sarvamApiKey?: string;
}

export interface GeneratedReview {
  text: string;
  hash: string;
  language: string;
  rating: number;
  selectedServices?: string[];
}

// Store used review hashes to prevent duplicates
const usedReviewHashes = new Set<string>();

export class AIReviewService {
  private readonly SARVAM_API_URL = "https://api.sarvam.ai/v1/chat/completions";
  private readonly SARVAM_MODEL = "sarvam-m";

  // Generate a simple hash for review content
  private generateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // force 32-bit
    }
    return Math.abs(hash).toString(36);
  }

  // Check if review is unique
  private isReviewUnique(content: string): boolean {
    const hash = this.generateHash(content);
    return !usedReviewHashes.has(hash);
  }

  // Mark review as used
  private markReviewAsUsed(content: string): void {
    const hash = this.generateHash(content);
    usedReviewHashes.add(hash);
  }

  async generateReview(
    request: ReviewRequest,
    maxRetries: number = 5
  ): Promise<GeneratedReview> {
    const { sarvamApiKey } = request;

    if (!sarvamApiKey) {
      throw new Error("Sarvam API key is required");
    }

    const {
      businessName,
      category,
      type,
      highlights,
      selectedServices,
      starRating,
      language,
    } = request;

    const sentimentGuide = {
      1: "Polite but reserved- highlights one or two issues gently, while still appreciating the effort or environment. Sounds constructive, not harsh.",
      2: "Encouraging with minor suggestions-points out areas for improvement but emphasises positive aspects more strongly.",
      3: "Balanced review - mentions a mix of pros and small cons, but overall keeps the tone supportive and fair.",
      4: "Clearly positive- praises good service or experience, maybe with one small suggestion.",
      5: "Highly enthusiastic- warm, detailed praise, showing full satisfaction.",
    };

    const languageOptions = ["English", "Gujarati", "Hindi"];
    const selectedLanguage =
      language ||
      languageOptions[Math.floor(Math.random() * languageOptions.length)];

    let serviceInstructions = "";
    if (selectedServices && selectedServices.length > 0) {
      serviceInstructions = `
Customer specifically wants to highlight these services: ${selectedServices.join(
        ", "
      )}
- Mention these services naturally in the review context
- Don't list them generically, weave them into the experience narrative
- Focus on how these specific aspects contributed to the ${starRating}-star experience
- Use authentic language that reflects real customer experience with these services
`;
    }

    let languageInstruction = "";
    switch (selectedLanguage) {
      case "English":
        languageInstruction =
          "Write the review ONLY in English. Do NOT use any Gujarati, Hindi, or Marathi words. The entire review must be in English.";
        break;
      case "Gujarati":
        languageInstruction =
          "Write the review in Gujarati language, but use only English letters (Romanized Gujarati). Do NOT use Gujarati script.'";
        break;
      case "Hindi":
        languageInstruction =
          "Write the review in Hindi language, but use only English letters (Romanized Hindi). Do NOT use Hindi script.'";
        break;
    }

    // Generate review using Sarvam AI
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      // Random target length between 50-200 characters
      const minLength = 50 + Math.floor(Math.random() * 50); // 50-100
      const maxLength = minLength + 50 + Math.floor(Math.random() * 50); // +50 to +100 more
      const targetLength = Math.min(maxLength, 200); // Cap at 200

      const systemPrompt = `You are an expert at generating authentic, natural-sounding customer reviews. You must strictly follow all formatting and content guidelines provided.`;

      const userPrompt = `Generate a realistic Google review for "${businessName}" which is a ${type} in the ${category} category.

Star Rating: ${starRating}/5
Sentiment: ${sentimentGuide[starRating as keyof typeof sentimentGuide]}
${highlights ? `Customer highlights: ${highlights}` : ""}
${serviceInstructions}

CRITICAL LENGTH REQUIREMENT:
- Review must be EXACTLY between ${minLength} and ${targetLength} characters.
- Count every character including spaces. Do NOT exceed ${targetLength} characters.
- Keep it short, concise, and authentic. MAXIMUM ${targetLength} characters.

Strict instructions:
- No repetition of ideas or sentence structures.
- First sentence must always be different.
- Use fresh adjectives and sentence tone.
- Tone: Human, real, warm, and natural.
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark

Requirements:
- ${businessName} is shown always different place in review
- Sound natural and human-like with regional authenticity
- DO NOT repeat phrasing or meaning from previous reviews
- not write any place name in the review.
- Avoid overused lines like "I felt safe", "highly recommend", "Dr. is amazing".
- Mention 1 unique point in each review (emotional detail).
- Match the ${starRating}-star sentiment exactly
- Be specific to the business type (${type}) and category (${category})
- Use realistic customer language
- No fake exaggeration, keep it credible and locally relevant
- Don't mention the star rating in the text
- Make it unique - avoid common phrases or structures
${
  highlights
    ? `- Try to incorporate these highlights naturally: ${highlights}`
    : ""
}
${
  selectedServices && selectedServices.length > 0
    ? `- Naturally incorporate these service experiences: ${selectedServices.join(
        ", "
      )}`
    : ""
}
- ${languageInstruction}
- Use authentic regional expressions and terminology
- Avoid generic templates or repetitive structures
- Return only the review text, no quotes, no instructions, no extra formatting, and no introductory sentences.`;

      try {
        const response = await fetch(this.SARVAM_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-subscription-key": sarvamApiKey,
          },
          body: JSON.stringify({
            model: this.SARVAM_MODEL,
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],
            temperature: 0.9,
            max_tokens: 80,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(
            `Sarvam API Error (attempt ${attempt + 1}):`,
            errorData
          );
          continue;
        }

        const data = await response.json();
        const reviewText = data.choices?.[0]?.message?.content?.trim() || "";

        // Check if review is unique
        if (reviewText && this.isReviewUnique(reviewText)) {
          // Log token usage for successful unique review
          if (data.usage) {
            console.log(`📊 Token Usage (Attempt ${attempt + 1}):`);
            console.log(`   ⭐ Star Rating: ${starRating}/5`);
            console.log(`   🌐 Language: ${selectedLanguage}`);
            console.log(`   ---`);
            console.log(`   📤 Prompt Tokens: ${data.usage.prompt_tokens}`);
            console.log(
              `   📥 Response Tokens: ${data.usage.completion_tokens}`
            );
            console.log(`   📊 Total Tokens: ${data.usage.total_tokens}`);
            console.log(
              `   📏 Generated Review Length: ${reviewText.length} characters`
            );
            console.log(`   ---`);
            console.log(
              `   📄 Review Preview: "${reviewText.substring(0, 80)}..."`
            );
          }

          this.markReviewAsUsed(reviewText);
          return {
            text: reviewText,
            hash: this.generateHash(reviewText),
            language: selectedLanguage,
            rating: starRating,
            selectedServices: selectedServices,
          };
        }

        console.log(
          `Attempt ${attempt + 1}: Generated duplicate review, retrying...`
        );
      } catch (error) {
        console.error(`Sarvam AI Error (attempt ${attempt + 1}):`, error);
      }
    }

    throw new Error("Failed to generate unique review after all retries");
  }

  // Clear used hashes (for testing or reset)
  clearUsedHashes(): void {
    usedReviewHashes.clear();
  }

  // Get usage statistics
  getUsageStats(): { totalGenerated: number } {
    return {
      totalGenerated: usedReviewHashes.size,
    };
  }
}

export const aiService = new AIReviewService();
