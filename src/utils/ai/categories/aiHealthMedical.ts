import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIHealthMedicalService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "calm + empathetic + respectful";
  }

  protected getCategoryVoiceStyle(): string {
    return "sensitive, reassuring";
  }

  protected getCategoryFocus(): string {
    return "doctor care, clarity, hygiene, comfort";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with visit reason → doctor explanation → comfort level",
      "Start with staff interaction → treatment clarity → hygiene",
      "Start with symptoms (light) → consultation experience → relief feeling",
      "Start with small fear → doctor reassurance → final comfort",
      "Start with waiting time → diagnosis clarity → supportive team",
      "Start with clinic atmosphere → doctor communication → smooth process",
      "Start with basic checkup → advice given → overall trust",
      "Start with emergency experience → response speed → care level",
      "Start with doubts → doctor cleared them → end grateful",
      "Start with short opening → main treatment detail → closing calm line",
      "Start with appointment booking → receptionist behavior → doctor care",
      "Start with referral → first visit → treatment approach",
      "Start with facility cleanliness → equipment quality → professional care",
      "Start with follow-up visit → progress tracking → doctor attention",
      "Start with medicine prescription → clear instructions → improvement",
      "Start with report discussion → treatment plan → satisfaction",
      "Start with family member treatment → doctor patience → outcome",
      "Start with second opinion → detailed explanation → trust built",
      "Start with nursing staff → overall care → recovery experience",
      "Start with clinic timing → convenience → service quality",
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

    return `Generate a realistic Google review for "${businessName}" - a ${type} healthcare facility.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Calm, empathetic, respectful
🗣️ Voice: Sensitive and reassuring
📍 Focus: Doctor's care, staff behavior, cleanliness, patient comfort
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Patient highlights: ${highlights}` : ""}
${serviceInstructions}

Health & Medical Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a patient sharing healthcare experience
- Mention doctor's behavior, care quality, staff support
- Use gentle, respectful language (e.g., "caring", "attentive", "clean facility")
- Focus on comfort, trust, and treatment quality
- Empathetic and reassuring tone
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- NEVER use phrases like "I felt safe", "Dr. is amazing"
- Avoid dramatic medical claims or sensitive details

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound calm and genuine
- No repetitive healthcare clichés
- Be specific to medical care experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiHealthMedicalService = new AIHealthMedicalService();
