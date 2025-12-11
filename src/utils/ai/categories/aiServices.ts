import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIServicesService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "neutral + professional + straightforward";
  }

  protected getCategoryVoiceStyle(): string {
    return "clear, result-focused";
  }

  protected getCategoryFocus(): string {
    return "reliability, timeliness, solution quality";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with problem → solution they provided → outcome → closing",
      "Start with staff behavior → work quality → timeline",
      "Start with booking/communication → service detail → final impression",
      "Start with how fast service was → clarity → result",
      "Start with issue faced → technician skill → experience",
      "Start with short statement → describe process → end naturally",
      "Start with first impression → service step explained → satisfaction",
      "Start with price transparency → work quality → end calm",
      "Start with a small doubt → how they resolved it → outcome",
      "Start with location/availability → service accuracy → closing thought",
      "Start with appointment → punctuality → service completion",
      "Start with quote → work explanation → value assessment",
      "Start with emergency call → response speed → problem resolution",
      "Start with previous experience → comparison → current verdict",
      "Start with warranty/guarantee → service quality → trust level",
      "Start with staff professionalism → attention to detail → outcome",
      "Start with follow-up → after-service → overall satisfaction",
      "Start with cleanliness → systematic approach → ending",
      "Start with equipment quality → technician expertise → result",
      "Start with customer support → service delivery → final note",
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

    return `Generate a realistic Google review for "${businessName}" - a ${type} service provider.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Neutral, professional, straightforward
🗣️ Voice: Clear and result-focused
📍 Focus: Reliability, timeliness, quality of work, problem-solving
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Customer highlights: ${highlights}` : ""}
${serviceInstructions}

Services Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a customer evaluating service quality
- Mention reliability, punctuality, and results
- Use clear, practical language (e.g., "timely", "efficient", "reliable")
- Focus on problem resolution and outcome
- Professional yet approachable tone
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid overly emotional language

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound practical and straightforward
- No repetitive phrases like "excellent service", "highly professional"
- Be specific to service experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiServicesService = new AIServicesService();
