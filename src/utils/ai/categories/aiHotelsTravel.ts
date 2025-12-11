import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIHotelsTravelService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "warm + descriptive + comfort-focused";
  }

  protected getCategoryVoiceStyle(): string {
    return "experience-based";
  }

  protected getCategoryFocus(): string {
    return "cleanliness, staff behavior, stay comfort, travel convenience";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with stay experience → room clarity → staff",
      "Start with check-in → room feel → small detail",
      "Start with location → comfort → final thought",
      "Start with environment → service speed → closing",
      "Start with breakfast/food → cleanliness → experience",
      "Start with first impression → room interior → ending",
      "Start with travel support → stay ease → wrap up",
      "Start with staff gesture → amenities → close",
      "Start with simple opening → describe stay → final line",
      "Start with comfort level → housekeeping → ending note",
      "Start with booking process → room type → satisfaction level",
      "Start with arrival → welcome experience → overall comfort",
      "Start with room service → food quality → staff behavior",
      "Start with wifi/connectivity → work comfort → facilities",
      "Start with parking → accessibility → stay quality",
      "Start with view → room amenities → closing thought",
      "Start with check-out → overall experience → recommendation",
      "Start with family stay → kid-friendly → comfort level",
      "Start with pricing → value for money → stay verdict",
      "Start with repeat visit → consistency → final note",
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

    return `Generate a realistic Google review for "${businessName}" - a ${type} accommodation/travel service.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Warm, descriptive, comfort-focused
🗣️ Voice: Experience-based storytelling
📍 Focus: Room/facility cleanliness, staff hospitality, comfort, location
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Guest highlights: ${highlights}` : ""}
${serviceInstructions}

Hotels & Travel Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a traveler sharing stay/travel experience
- Mention room quality, staff friendliness, comfort level
- Use descriptive language (e.g., "comfortable stay", "welcoming staff", "clean rooms")
- Focus on hospitality and travel convenience
- Warm and appreciative tone
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid travel blog clichés

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound warm and genuine
- No repetitive phrases like "home away from home", "amazing hospitality"
- Be specific to stay/travel experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiHotelsTravelService = new AIHotelsTravelService();
