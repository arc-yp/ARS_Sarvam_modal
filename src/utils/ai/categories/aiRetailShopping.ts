import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIRetailShoppingService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "friendly + practical + experience-focused";
  }

  protected getCategoryVoiceStyle(): string {
    return "simple, everyday customer language";
  }

  protected getCategoryFocus(): string {
    return "usability, pricing, staff help, product variety";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with product experience → staff help → closing",
      "Start with store vibe → product variety → pricing note",
      "Start with staff behavior → product quality → final feel",
      "Start with quick impression → highlight product → end",
      "Start with availability → quality check → environment",
      "Start with visit reason → shopping experience → wrap up",
      "Start with product range → staff assistance → comfort",
      "Start with unique moment → product detail → end simple",
      "Start with product review → minor point → positive note",
      "Start with store atmosphere → purchase → service → closing",
      "Start with first visit → store layout → product discovery",
      "Start with discount/offer → value check → satisfaction",
      "Start with specific need → staff guidance → purchase decision",
      "Start with comparison → product quality → final choice",
      "Start with return/exchange → process ease → overall experience",
      "Start with billing process → store cleanliness → ending",
      "Start with product display → trial experience → verdict",
      "Start with location → parking → shopping comfort",
      "Start with brand variety → quality assurance → closing thought",
      "Start with repeat visit → consistency → recommendation",
    ];
  }

  protected buildCategorySpecificPrompt(request: ReviewRequest): string {
    const { businessName, type, starRating, highlights, selectedServices } =
      request;
    const sentiment = this.getSentimentGuide(starRating);
    const languageInstruction = this.getLanguageInstruction(
      request.language || "English"
    );
    const serviceInstructions = this.buildServiceInstructions(
      selectedServices,
      starRating
    );
    const structurePattern = this.getRandomPattern();

    return `Generate a realistic Google review for "${businessName}" - a ${type} store.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Friendly, practical, experience-focused
🗣️ Voice: Simple everyday customer language
📍 Focus: Product variety, pricing, staff helpfulness, shopping experience
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Customer highlights: ${highlights}` : ""}
${serviceInstructions}

Retail-Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a regular shopper sharing their experience
- Mention practical aspects: product availability, pricing value, staff assistance
- Use casual, relatable language (e.g., "great deals", "helpful staff", "easy to find")
- Focus on shopping experience and convenience
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid overly formal or technical language

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound conversational and genuine
- No repetitive phrases like "highly recommend", "amazing experience"
- Be specific to retail shopping experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiRetailShoppingService = new AIRetailShoppingService();
