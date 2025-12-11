import { AIServiceBase, ReviewRequest } from "../base/aiServiceBase";

export class AIEducationService extends AIServiceBase {
  protected getCategoryTone(): string {
    return "encouraging + positive + disciplined";
  }

  protected getCategoryVoiceStyle(): string {
    return "student-friendly, progress-focused";
  }

  protected getCategoryFocus(): string {
    return "teaching method, understanding, improvement";
  }

  protected getStructurePatterns(): string[] {
    return [
      "Start with student situation → teaching method → progress",
      "Start with faculty behavior → explanation → environment",
      "Start with subject difficulty → how teacher helped → result",
      "Start with short remark → detail learning experience",
      "Start with facilities → learning method → ending",
      "Start with motivation → teacher support → outcome",
      "Start with practical example → class experience → closing",
      "Start with improvement line → teaching style → final feel",
      "Start with batch environment → teaching clarity → wrap up",
      "Start with simple note → mention progress → closing",
      "Start with initial doubts → teacher's approach → confidence gained",
      "Start with class atmosphere → individual attention → satisfaction",
      "Start with course coverage → practice sessions → learning outcome",
      "Start with simple observation → teaching pace → final thoughts",
      "Start with faculty dedication → doubt clearing → overall experience",
      "Start with specific subject → study material quality → result",
      "Start with admission experience → classroom interaction → recommendation",
      "Start with weak area → teacher guidance → improvement noticed",
      "Start with infrastructure → learning resources → ending remark",
      "Start with hesitation → supportive environment → growth achieved",
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

    return `Generate a realistic Google review for "${businessName}" - an educational ${type}.

⭐ Star Rating: ${starRating}/5
💭 Sentiment: ${sentiment}
🎯 Tone: Encouraging, positive, disciplined
🗣️ Voice: Student-friendly and progress-focused
📍 Focus: Teaching quality, learning methods, student improvement, environment
📐 Structure Pattern: ${structurePattern}
${highlights ? `✨ Student/Parent highlights: ${highlights}` : ""}
${serviceInstructions}

Education Specific Guidelines:
- FOLLOW THE STRUCTURE PATTERN EXACTLY - it ensures unique review flow
- Talk like a student or parent sharing learning experience
- Mention teaching methods, teacher support, learning environment
- Use encouraging language (e.g., "helpful teachers", "clear concepts", "good progress")
- Focus on learning outcomes and atmosphere
- Positive yet realistic tone
- NO promotional words, NO repeated phrases, add unique details
- Include natural imperfections in flow
- Avoid exaggerated claims about results

Critical Requirements:
- LENGTH: EXACTLY 200-250 characters total
- Write 2-3 SHORT sentences maximum
- ${businessName} must appear once naturally
- Match ${starRating}-star sentiment exactly
- Sound encouraging and genuine
- No repetitive phrases like "best institute", "excellent faculty"
- Be specific to educational experience
- Don't mention star rating in text
- ${languageInstruction}
- in gujarati starting line not write "Kem chho!"
- not use exclamation mark
- Return only the review text, no quotes, no instructions, no formatting.`;
  }
}

export const aiEducationService = new AIEducationService();
