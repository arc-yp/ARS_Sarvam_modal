/**
 * Utility to introduce random spelling and grammar mistakes in reviews
 * and track them for display highlighting
 */

export interface Mistake {
  original: string;
  incorrect: string;
  position: number;
  type: "spelling" | "grammar";
}

export interface ReviewWithMistakes {
  text: string;
  mistakes: Mistake[];
}

/**
 * Common spelling mistakes patterns
 */
const spellingMistakes: Record<string, string[]> = {
  // Common word mistakes
  effectively: ["effactively", "efectively", "effectivly"],
  meetings: ["metings", "meetins", "meettings"],
  started: ["start", "startet", "sterted"],
  professional: ["profesional", "proffesional", "profesional"],
  experience: ["experiance", "experince", "exprience"],
  excellent: ["excelent", "excellant", "exelent"],
  service: ["servise", "sevice", "servce"],
  quality: ["qualty", "qualitty", "quallity"],
  business: ["bussiness", "buisness", "busines"],
  recommend: ["recomend", "reccomend", "recommand"],
  definitely: ["definately", "definitly", "definetly"],
  received: ["recieved", "receved", "recived"],
  because: ["becuase", "beacuse", "becuse"],
  believe: ["beleive", "belive", "beleve"],
  environment: ["enviroment", "enviornment", "environmant"],
  immediately: ["immediatly", "imediately", "immedietly"],
  necessary: ["necesary", "neccesary", "neccessary"],
  separate: ["seperate", "separete", "seprate"],
  accommodate: ["accomodate", "acommodate", "acomodate"],
  occurred: ["occured", "ocurred", "occurd"],
  appreciate: ["apreciate", "appriciate", "apprieciate"],
  knowledge: ["knowlege", "knwoledge", "knowladge"],
  convenient: ["conveniant", "convienient", "convinient"],
  throughout: ["througout", "thruout", "throuhgout"],
  understand: ["understnd", "undrestand", "understnad"],
  attention: ["atention", "attension", "attencion"],
  communication: ["comunication", "communcation", "comuniction"],
  confidence: ["confidance", "confidense", "confidince"],
  present: ["presant", "prezent", "preasent"],
  valued: ["valud", "valueed", "vallued"],
  improved: ["improvd", "improoved", "improveed"],
  working: ["workin", "workng", "wokring"],
  really: ["realy", "relly", "realley"],
  knows: ["knowes", "knos", "nows"],
  since: ["sinse", "sence", "sinc"],
  ideas: ["ideeas", "idaes", "ides"],
};

/**
 * Generate random spelling mistakes in the review text
 * @param text - Original review text
 * @param mistakeCount - Number of mistakes to introduce (1-3)
 * @param excludeRanges - Array of {start, end} positions to exclude from mistakes (e.g., service names)
 * @returns Object with modified text and mistake details
 */
export function addSpellingMistakes(
  text: string,
  mistakeCount: number = Math.floor(Math.random() * 3) + 1, // Random 1-3 mistakes
  excludeRanges: Array<{ start: number; end: number }> = []
): ReviewWithMistakes {
  const mistakes: Mistake[] = [];
  let modifiedText = text;

  // Extract positions of **bold text** (service names) to exclude them from mistakes
  const boldTextRanges: Array<{ start: number; end: number }> = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let boldMatch;

  while ((boldMatch = boldRegex.exec(text)) !== null) {
    // Exclude the entire **text** including markers
    boldTextRanges.push({
      start: boldMatch.index,
      end: boldMatch.index + boldMatch[0].length,
    });
  }

  // Combine with additional exclude ranges
  const allExcludeRanges = [...boldTextRanges, ...excludeRanges];

  // Helper function to check if a position is in excluded range
  const isInExcludedRange = (index: number, length: number): boolean => {
    for (const range of allExcludeRanges) {
      // Check if word overlaps with excluded range
      if (
        (index >= range.start && index < range.end) ||
        (index + length > range.start && index + length <= range.end) ||
        (index <= range.start && index + length >= range.end)
      ) {
        return true;
      }
    }
    return false;
  };

  // Find all words in the text that we have mistake patterns for
  const availableWords: { word: string; index: number }[] = [];

  Object.keys(spellingMistakes).forEach((word) => {
    // Case-insensitive search for the word
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Skip if this word is in an excluded range (e.g., inside **bold**)
      if (!isInExcludedRange(match.index, match[0].length)) {
        availableWords.push({
          word: match[0], // Preserve original casing
          index: match.index,
        });
      }
    }
  });

  if (availableWords.length === 0) {
    return { text, mistakes: [] };
  }

  // Shuffle and select random words to make mistakes
  const shuffled = availableWords.sort(() => Math.random() - 0.5);
  const selectedWords = shuffled.slice(
    0,
    Math.min(mistakeCount, availableWords.length)
  );

  // Sort by index in reverse order to avoid index shifting during replacement
  selectedWords.sort((a, b) => b.index - a.index);

  selectedWords.forEach(({ word, index }) => {
    const lowerWord = word.toLowerCase();
    const mistakeOptions = spellingMistakes[lowerWord];

    if (mistakeOptions && mistakeOptions.length > 0) {
      const randomMistake =
        mistakeOptions[Math.floor(Math.random() * mistakeOptions.length)];

      // Preserve the original casing pattern
      const incorrectWord = preserveCasing(word, randomMistake);

      // Replace the word in the text
      modifiedText =
        modifiedText.substring(0, index) +
        incorrectWord +
        modifiedText.substring(index + word.length);

      mistakes.push({
        original: word,
        incorrect: incorrectWord,
        position: index,
        type: "spelling",
      });
    }
  });

  return {
    text: modifiedText,
    mistakes: mistakes.sort((a, b) => a.position - b.position),
  };
}

/**
 * Preserve the casing pattern of the original word when applying the mistake
 */
function preserveCasing(original: string, mistake: string): string {
  if (original === original.toUpperCase()) {
    return mistake.toUpperCase();
  }
  if (original[0] === original[0].toUpperCase()) {
    return mistake.charAt(0).toUpperCase() + mistake.slice(1).toLowerCase();
  }
  return mistake.toLowerCase();
}

/**
 * Render review text with mistakes highlighted in red
 * Returns array of text segments with metadata for styling
 */
export interface TextSegment {
  text: string;
  isMistake: boolean;
  original?: string;
  type?: "spelling" | "grammar";
}

export function parseReviewWithMistakes(
  text: string,
  mistakes: Mistake[]
): TextSegment[] {
  if (mistakes.length === 0) {
    return [{ text, isMistake: false }];
  }

  const segments: TextSegment[] = [];
  let currentIndex = 0;

  // Sort mistakes by position
  const sortedMistakes = [...mistakes].sort((a, b) => a.position - b.position);

  sortedMistakes.forEach((mistake) => {
    // Add text before the mistake
    if (mistake.position > currentIndex) {
      segments.push({
        text: text.substring(currentIndex, mistake.position),
        isMistake: false,
      });
    }

    // Add the mistake
    segments.push({
      text: mistake.incorrect,
      isMistake: true,
      original: mistake.original,
      type: mistake.type,
    });

    currentIndex = mistake.position + mistake.incorrect.length;
  });

  // Add remaining text after last mistake
  if (currentIndex < text.length) {
    segments.push({
      text: text.substring(currentIndex),
      isMistake: false,
    });
  }

  return segments;
}

/**
 * Get a formatted list of mistakes for display
 */
export function formatMistakesList(mistakes: Mistake[]): string {
  if (mistakes.length === 0) return "No mistakes introduced";

  return mistakes
    .map((m, idx) => `${idx + 1}. ${m.incorrect} → should be "${m.original}"`)
    .join("\n");
}
