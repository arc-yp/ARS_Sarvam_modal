export interface ReviewRequest {
  businessName: string;
  category: string;
  type: string;
  highlights?: string;
  selectedServices?: string[];
  starRating: number;
  language?: string;
  sarvamApiKey?: string;
  // Admin permission: allow bold highlighting of selected services in text/UI
  allowServiceHighlight?: boolean;
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
${
  request.allowServiceHighlight === false
    ? "- Do NOT use markdown or special symbols like ** around service names. Keep plain text."
    : `- IMPORTANT: When mentioning any of these services (${selectedServices.join(
        ", "
      )}), wrap them with **double asterisks** like **service name** to make them bold in the final display`
}
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
          "Write the review in Gujarati language, but use only English letters (Romanized Gujarati). Do NOT use Gujarati script. Write natural conversational Gujarati.";
        break;
      case "Hindi":
        languageInstruction =
          "Write the review in Hindi language, but use only English letters (Romanized Hindi). Do NOT use Hindi script. Write natural conversational Hindi.";
        break;
    }

    // Generate review using Sarvam AI
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      // Random target length between 50-200 characters
      const minLength = 50 + Math.floor(Math.random() * 50); // 50-100
      const maxLength = minLength + 50 + Math.floor(Math.random() * 50); // +50 to +100 more
      const targetLength = Math.min(maxLength, 200); // Cap at 200
      
      // Adjust max_tokens based on language (Gujarati/Hindi need more tokens)
      const maxTokens = selectedLanguage === "English" ? 80 : 150;

      const systemPrompt = `You are an expert at generating authentic, natural-sounding customer reviews. You must strictly follow all formatting and content guidelines provided.`;

      const userPrompt = `Write a complete ${starRating}-star Google review for "${businessName}" (${type}).

IMPORTANT: Write 2-3 COMPLETE sentences. Each sentence must end properly. Maximum ${targetLength} characters.

Tone: ${sentimentGuide[starRating as keyof typeof sentimentGuide]}

${serviceInstructions}

Rules:
- ${languageInstruction}
- Write COMPLETE sentences only, no cut-off words
- Each sentence must have proper ending
- Keep it natural and conversational
- Unique starting line each time
- Do NOT use these symbols: ! - — – … • " " ' ' 
- Use only periods (.) and commas (,)
${
  selectedServices && selectedServices.length > 0
    ? `- Naturally mention: ${selectedServices.join(", ")}`
    : ""
}

Write the review now. Ensure every sentence is complete. Stop at ${targetLength} characters.`;

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
            max_tokens: maxTokens,
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
