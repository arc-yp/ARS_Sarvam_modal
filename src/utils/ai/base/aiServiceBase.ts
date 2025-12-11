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

export abstract class AIServiceBase {
  protected readonly SARVAM_API_URL =
    "https://api.sarvam.ai/v1/chat/completions";
  protected readonly SARVAM_MODEL = "sarvam-m";

  // Abstract methods that each category must implement
  protected abstract getCategoryTone(): string;
  protected abstract getCategoryVoiceStyle(): string;
  protected abstract getCategoryFocus(): string;
  protected abstract getStructurePatterns(): string[];
  protected abstract buildCategorySpecificPrompt(
    request: ReviewRequest
  ): string;

  // Get a random structure pattern
  protected getRandomPattern(): string {
    const patterns = this.getStructurePatterns();
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  // Generate a simple hash for review content
  protected generateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // force 32-bit
    }
    return Math.abs(hash).toString(36);
  }

  // Check if review is unique
  protected isReviewUnique(content: string): boolean {
    const hash = this.generateHash(content);
    return !usedReviewHashes.has(hash);
  }

  // Mark review as used
  protected markReviewAsUsed(content: string): void {
    const hash = this.generateHash(content);
    usedReviewHashes.add(hash);
  }

  // Get sentiment guide based on rating
  protected getSentimentGuide(rating: number): string {
    const sentimentGuide: Record<number, string> = {
      1: "Polite but reserved- highlights one or two issues gently, while still appreciating the effort or environment. Sounds constructive, not harsh.",
      2: "Encouraging with minor suggestions-points out areas for improvement but emphasises positive aspects more strongly.",
      3: "Balanced review - mentions a mix of pros and small cons, but overall keeps the tone supportive and fair.",
      4: "Clearly positive- praises good service or experience, maybe with one small suggestion.",
      5: "Highly enthusiastic- warm, detailed praise, showing full satisfaction.",
    };
    return sentimentGuide[rating] || sentimentGuide[3];
  }

  // Get language instruction based on selected language
  protected getLanguageInstruction(language: string): string {
    switch (language) {
      case "English":
        return "Write the review ONLY in English. Do NOT use any Gujarati, Hindi, or Marathi words. The entire review must be in English.";
      case "Gujarati":
        return "Write review in Gujarati using Roman letters (Romanized Gujarati). Do NOT use Gujarati script.";
      case "Hindi":
        return "Write review in Hindi using Roman letters (Romanized Hindi). Do NOT use Devanagari script.";
      default:
        return "Write the review ONLY in English. Do NOT use any Gujarati, Hindi, or Marathi words. The entire review must be in English.";
    }
  }

  // Select random language if not specified
  protected selectLanguage(requestedLanguage?: string): string {
    if (requestedLanguage) return requestedLanguage;
    const languageOptions = ["English", "Gujarati", "Hindi"];
    return languageOptions[Math.floor(Math.random() * languageOptions.length)];
  }

  // Build service instructions if services are selected
  protected buildServiceInstructions(
    selectedServices?: string[],
    starRating?: number
  ): string {
    if (!selectedServices || selectedServices.length === 0) return "";

    return `
Customer specifically wants to highlight these services: ${selectedServices.join(
      ", "
    )}
- Mention these services naturally in the review context
- Don't list them generically, weave them into the experience narrative
- Focus on how these specific aspects contributed to the ${starRating}-star experience
- Use authentic language that reflects real customer experience with these services
`;
  }

  // Enforce character limit
  protected enforceCharacterLimit(
    reviewText: string,
    maxLength: number = 280
  ): string {
    if (reviewText.length <= maxLength) return reviewText;

    const sentences = reviewText.match(/[^.!?]+[.!?]+/g) || [];
    let truncated = "";
    for (const sentence of sentences) {
      if ((truncated + sentence).length <= maxLength) {
        truncated += sentence;
      } else {
        break;
      }
    }
    return truncated.trim();
  }

  // Log token usage
  protected logTokenUsage(
    data: {
      usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      };
      choices?: unknown[];
    },
    request: ReviewRequest,
    systemPrompt: string,
    userPrompt: string,
    reviewText: string,
    selectedLanguage: string
  ): void {
    if (!data.usage) return;

    console.log(`\n📊 Token Usage Breakdown:`);
    console.log(`   ⭐ Star Rating: ${request.starRating}/5`);
    console.log(`   🌐 Language: ${selectedLanguage}`);
    console.log(`   📁 Category: ${request.category}`);
    console.log(`   ---`);
    console.log(`   📝 Prompt Components:`);
    console.log(
      `      • System Prompt: ~${Math.ceil(systemPrompt.length / 4)} tokens (${
        systemPrompt.length
      } chars)`
    );
    console.log(
      `      • User Prompt: ~${Math.ceil(userPrompt.length / 4)} tokens (${
        userPrompt.length
      } chars)`
    );
    console.log(
      `      • Business Name: (${request.businessName.length} chars)`
    );
    console.log(`      • Category: (${request.category.length} chars)`);
    console.log(`      • Type: (${request.type.length} chars)`);
    if (request.highlights) {
      console.log(`      • Highlights: (${request.highlights.length} chars)`);
    }
    if (request.selectedServices && request.selectedServices.length > 0) {
      console.log(
        `      • Services: ${request.selectedServices.join(", ")} (${
          request.selectedServices.join(", ").length
        } chars)`
      );
    }
    console.log(`   ---`);
    console.log(`   📤 Prompt Tokens: ${data.usage.prompt_tokens}`);
    console.log(`   📥 Response Tokens: ${data.usage.completion_tokens}`);
    console.log(`   📊 Total Tokens: ${data.usage.total_tokens}`);

    console.log(`   ---`);
    console.log(
      `   📏 Generated Review Length: ${reviewText.length} characters`
    );
    console.log(`   📄 Review Preview: "${reviewText.substring(0, 80)}..."`);
    console.log(`   ---\n`);
  }

  // Main generation method (template method pattern)
  async generateReview(request: ReviewRequest): Promise<GeneratedReview> {
    const { sarvamApiKey } = request;

    if (!sarvamApiKey) {
      throw new Error("Sarvam API key is required");
    }

    const selectedLanguage = this.selectLanguage(request.language);

    // Build system prompt
    const systemPrompt = `You are an expert at generating authentic, natural-sounding customer reviews for ${
      request.category
    } businesses. 
Tone: ${this.getCategoryTone()}
Voice Style: ${this.getCategoryVoiceStyle()}
Focus Areas: ${this.getCategoryFocus()}
You must strictly follow all formatting and content guidelines provided.`;

    // Build user prompt using category-specific implementation
    const userPrompt = this.buildCategorySpecificPrompt({
      ...request,
      language: selectedLanguage,
    });

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
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 120,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Sarvam API Error:", errorData);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      let reviewText = data.choices?.[0]?.message?.content?.trim() || "";

      if (!reviewText) {
        throw new Error("No review text generated");
      }

      // Remove quotation marks if present at start and end
      reviewText = reviewText.replace(/^["']|["']$/g, "");

      // Enforce maximum length
      reviewText = this.enforceCharacterLimit(reviewText, 280);

      // Log token usage
      this.logTokenUsage(
        data,
        request,
        systemPrompt,
        userPrompt,
        reviewText,
        selectedLanguage
      );

      this.markReviewAsUsed(reviewText);

      return {
        text: reviewText,
        hash: this.generateHash(reviewText),
        language: selectedLanguage,
        rating: request.starRating,
        selectedServices: request.selectedServices,
      };
    } catch (error) {
      console.error("Sarvam AI Error:", error);
      throw error;
    }
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
