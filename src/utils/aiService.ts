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

  async generateReview(request: ReviewRequest): Promise<GeneratedReview> {
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
          "Write review in Gujarati using Roman letters (Romanized Gujarati). Do NOT use Gujarati script.'";
        break;
      case "Hindi":
        languageInstruction =
          "Write review in Hindi using Roman letters (Romanized Hindi). Do NOT use Devanagari script.;
        break;
    }

    // Generate review using Sarvam AI
    const systemPrompt = `You are an expert at generating authentic, natural-sounding customer reviews. You must strictly follow all formatting and content guidelines provided.`;

    const userPrompt = `Generate a realistic Google review for "${businessName}" which is a ${type} in the ${category} category.

Star Rating: ${starRating}/5
Sentiment: ${sentimentGuide[starRating as keyof typeof sentimentGuide]}
${highlights ? `Customer highlights: ${highlights}` : ""}
${serviceInstructions}

Strict instructions:
- No repetition of ideas or sentence structures.
- First sentence must always be different.
- Use fresh adjectives and sentence tone.
- Tone: Human, real, warm, and natural.
- not use exclamation mark

Requirements:
- CRITICAL LENGTH LIMIT: Write EXACTLY 200-250 characters. Count every character carefully.
- Write 2-3 SHORT sentences maximum
- Keep sentences brief and direct
- ${businessName} must appear once in the review
- Match the ${starRating}-star sentiment exactly
- Sound natural and human-like
- DO NOT repeat phrasing from previous reviews
- Not write any place name in the review
- Avoid overused lines like "I felt safe", "highly recommend", "Dr. is amazing"
- Be specific to the business type (${type})
- Use realistic customer language
- Don't mention the star rating in the text
- Make it unique and concise
- STOP WRITING after 250 characters
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

      // Enforce maximum length - truncate at sentence boundary if needed
      if (reviewText.length > 280) {
        const sentences = reviewText.match(/[^.!?]+[.!?]+/g) || [];
        reviewText = "";
        for (const sentence of sentences) {
          if ((reviewText + sentence).length <= 280) {
            reviewText += sentence;
          } else {
            break;
          }
        }
        reviewText = reviewText.trim();
      }

      // Log token usage with detailed breakdown
      if (data.usage) {
        console.log(`\n📊 Token Usage Breakdown:`);
        console.log(`   ⭐ Star Rating: ${starRating}/5`);
        console.log(`   🌐 Language: ${selectedLanguage}`);
        console.log(`   ---`);

        // Show prompt component sizes
        console.log(`   📝 Prompt Components:`);
        console.log(
          `      • System Prompt: ~${Math.ceil(
            systemPrompt.length / 4
          )} tokens (${systemPrompt.length} chars)`
        );
        console.log(
          `      • User Prompt: ~${Math.ceil(userPrompt.length / 4)} tokens (${
            userPrompt.length
          } chars)`
        );
        console.log(
          `      • Business Name: (${businessName.length} chars)`
        );
        console.log(
          `      • Category: (${category.length} chars)`
        );
        console.log(`      • Type: (${type.length} chars)`);
        if (highlights) {
          console.log(
            `      • Highlights: (${highlights.length} chars)`
          );
        }
        if (selectedServices && selectedServices.length > 0) {
          console.log(
            `      • Services: ${selectedServices.join(", ")} (${
              selectedServices.join(", ").length
            } chars)`
          );
        }
        console.log(`   ---`);

        // Show actual API token usage
        console.log(`   📤 Prompt Tokens: ${data.usage.prompt_tokens}`);
        console.log(`   📥 Response Tokens: ${data.usage.completion_tokens}`);
        console.log(`   📊 Total Tokens: ${data.usage.total_tokens}`);
        console.log(
          `   💰 Estimated Cost: ~$${(
            (data.usage.total_tokens / 1000) *
            0.002
          ).toFixed(6)}`
        );
        console.log(`   ---`);

        // Show generated review info
        console.log(
          `   📏 Generated Review Length: ${reviewText.length} characters`
        );
        console.log(
          `   📄 Review Preview: "${reviewText.substring(0, 80)}..."`
        );
        console.log(`   ---\n`);
      }

      this.markReviewAsUsed(reviewText);
      return {
        text: reviewText,
        hash: this.generateHash(reviewText),
        language: selectedLanguage,
        rating: starRating,
        selectedServices: selectedServices,
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

export const aiService = new AIReviewService();
