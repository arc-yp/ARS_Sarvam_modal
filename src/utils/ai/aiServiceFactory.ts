import { AIServiceBase } from "./base/aiServiceBase";
import { aiRetailShoppingService } from "./categories/aiRetailShopping";
import { aiFoodBeverageService } from "./categories/aiFoodBeverage";
import { aiServicesService } from "./categories/aiServices";
import { aiProfessionalService } from "./categories/aiProfessional";
import { aiHealthMedicalService } from "./categories/aiHealthMedical";
import { aiEducationService } from "./categories/aiEducation";
import { aiHotelsTravelService } from "./categories/aiHotelsTravel";
import { aiEntertainmentService } from "./categories/aiEntertainment";

/**
 * Factory class to select the appropriate AI service based on business category
 * This ensures category-specific tone, voice, and focus for each review
 */
export class AIServiceFactory {
  private static categoryMap: Map<string, AIServiceBase> = new Map<
    string,
    AIServiceBase
  >([
    ["Retail & Shopping", aiRetailShoppingService],
    ["Food & Beverage", aiFoodBeverageService],
    ["Services", aiServicesService],
    ["Professional Businesses", aiProfessionalService],
    ["Health & Medical", aiHealthMedicalService],
    ["Education", aiEducationService],
    ["Hotels & Travel", aiHotelsTravelService],
    ["Entertainment & Recreation", aiEntertainmentService],
  ]);

  /**
   * Get the appropriate AI service for a given category
   * Falls back to Services category if category not found
   */
  static getService(category: string): AIServiceBase {
    const service = this.categoryMap.get(category);

    if (!service) {
      console.warn(
        `Category "${category}" not found. Using default Services category.`
      );
      return aiServicesService; // Default fallback
    }

    return service;
  }

  /**
   * Get all supported categories
   */
  static getSupportedCategories(): string[] {
    return Array.from(this.categoryMap.keys());
  }

  /**
   * Check if a category is supported
   */
  static isCategorySupported(category: string): boolean {
    return this.categoryMap.has(category);
  }

  /**
   * Clear all used review hashes across all services
   */
  static clearAllUsedHashes(): void {
    this.categoryMap.forEach((service) => service.clearUsedHashes());
  }

  /**
   * Get total usage statistics across all services
   */
  static getTotalUsageStats(): {
    totalGenerated: number;
    byCategory: Record<string, number>;
  } {
    let totalGenerated = 0;
    const byCategory: Record<string, number> = {};

    this.categoryMap.forEach((service, category) => {
      const stats = service.getUsageStats();
      byCategory[category] = stats.totalGenerated;
      totalGenerated += stats.totalGenerated;
    });

    return { totalGenerated, byCategory };
  }
}
