import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIFoodBeverageService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "warm + casual + taste-driven";
  }

  protected getCategoryVoiceStyle(): string {
    return "conversational & foodie-style";
  }

  protected getCategoryFocus(): string {
    return "taste, freshness, ambiance, service";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with dish experience → mention service → small detail → closing opinion",
      "Start with ambiance → taste → staff → tiny imperfection",
      "Start with staff → food quality → cleanliness → final feel",
      "Start with a quick overall impression → highlight signature dish → end with mood",
      "Start with waiting time → taste notes → environment → closing",
      "Start with visit reason → meal experience → staff tone → wrap up",
      "Start with aroma/smell → food texture → seating comfort",
      "Start with one unique moment → explain food part → end simple",
      "Start directly with food review → minor issue → positive note",
      "Start with place vibe → order item → service timing → final touch",
      "Start with first impression → menu variety → order satisfaction",
      "Start with recommendation → tried dish → taste experience",
      "Start with presentation → flavor quality → portion size",
      "Start with pricing → value for money → food quality",
      "Start with repeat visit → consistency → overall feel",
      "Start with specific craving → how they fulfilled → ending",
      "Start with decor → beverage quality → service speed",
      "Start with family visit → kid-friendly → food taste",
      "Start with hygiene → ingredient freshness → closing thought",
      "Start with location → dining comfort → meal verdict",
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

    return `Generate a realistic Google review for "${businessName}" - a ${type}.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Warm, casual, taste-driven
🗣️ Voice: Conversational foodie-style
📍 Focus: Food taste, freshness, ambiance, service quality
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Customer highlights: ${highlights}` : ""}
${serviceInstructions}

Food & Beverage Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a food lover sharing dining experience
- Mention taste, freshness, presentation naturally
- Use foodie language but keep it casual (e.g., "tasty", "fresh", "delicious")
- Focus on flavors, ambiance, and service
- Create appetite appeal through description
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid generic food review clichés

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound warm and conversational
- No repetitive phrases like "must try", "heaven for foodies"
- Be specific to dining/food experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiFoodBeverageService = new AIFoodBeverageService();
