import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIEntertainmentService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "energetic + fun + engaging";
  }

  protected getCategoryVoiceStyle(): string {
    return "upbeat, activity-driven";
  }

  protected getCategoryFocus(): string {
    return "environment, equipment, enjoyment";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with vibe → trainer/equipment → result feeling",
      "Start with entry → environment → highlight",
      "Start with activity → support → closing line",
      "Start with simple positive → facility detail → wrap up",
      "Start with crowd/space → hygiene → experience",
      "Start with staff motivation → workout feel → end",
      "Start with reason (joined gym/game) → experience → closing",
      "Start with equipment detail → vibe → last line",
      "Start with quick remark → mention 1-2 service tags",
      "Start with timing/session → support → final feel",
      "Start with first visit → facility tour → enjoyment level",
      "Start with booking process → staff welcome → activity quality",
      "Start with group/solo experience → instructor help → outcome",
      "Start with amenities → entertainment value → closing thought",
      "Start with membership → class variety → satisfaction",
      "Start with initial hesitation → actual experience → recommendation",
      "Start with friend suggestion → tried it → personal opinion",
      "Start with location convenience → facility standard → final note",
      "Start with specific activity → skill improvement → wrap up",
      "Start with ambience → service quality → ending remark",
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

    return `Generate a realistic Google review for "${businessName}" - an entertainment/recreation ${type}.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Energetic, fun, engaging
🗣️ Voice: Upbeat and activity-driven
📍 Focus: Atmosphere, facilities/equipment quality, fun factor, experience
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Visitor highlights: ${highlights}` : ""}
${serviceInstructions}

Entertainment & Recreation Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like someone sharing a fun experience
- Mention atmosphere, equipment/facilities, entertainment value
- Use energetic language (e.g., "fun time", "great vibe", "good equipment")
- Focus on enjoyment and experience quality
- Upbeat and enthusiastic tone (but not over-the-top)
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid generic entertainment phrases

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound energetic and genuine
- No repetitive phrases like "super fun", "awesome place"
- Be specific to entertainment/recreation experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiEntertainmentService = new AIEntertainmentService();
