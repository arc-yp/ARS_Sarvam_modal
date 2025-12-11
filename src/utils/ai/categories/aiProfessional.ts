import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIProfessionalService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "polite + precise + trust-centric";
  }

  protected getCategoryVoiceStyle(): string {
    return "slightly formal but human";
  }

  protected getCategoryFocus(): string {
    return "expertise, clarity, professionalism";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with issue/requirement → expert guidance → clarity",
      "Start with call/meeting → explanation quality → final feel",
      "Start with confusion → how they simplified → outcome",
      "Start with a short remark → detail experience → closing",
      "Start with service timeline → updates → satisfaction",
      "Start with behavior → accuracy → result",
      "Start with project/task → working style → wrap up",
      "Start with trust factor → communication → end note",
      "Start direct with solution → background → final impression",
      "Start with professionalism → output → short ending",
      "Start with consultation → expertise shown → decision made",
      "Start with documentation → process clarity → final outcome",
      "Start with response time → problem solving → satisfaction",
      "Start with team coordination → delivery quality → ending",
      "Start with initial doubt → reassurance given → confidence",
      "Start with pricing discussion → value received → verdict",
      "Start with referral → first interaction → overall impression",
      "Start with follow-up → consistency → trust level",
      "Start with complex issue → simplified approach → result",
      "Start with deadline → commitment → quality delivered",
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

    return `Generate a realistic Google review for "${businessName}" - a professional ${type} firm.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Polite, precise, trust-centric
🗣️ Voice: Slightly formal but human
📍 Focus: Professional expertise, clarity in communication, trustworthiness
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Client highlights: ${highlights}` : ""}
${serviceInstructions}

Professional Business Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a client evaluating professional service
- Mention expertise, knowledge, and professional handling
- Use polite, respectful language (e.g., "knowledgeable", "professional", "thorough")
- Focus on trust, competence, and clear communication
- Balanced formality - professional yet personable
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid casual slang or overly stiff corporate speak

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound respectful and precise
- Be specific to professional consultation experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiProfessionalService = new AIProfessionalService();
