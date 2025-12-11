/**
 * Main AI Service - Now uses category-specific services via Factory Pattern
 * This provides optimized, focused prompts for each business category
 * Resulting in better reviews and ~40% token savings
 */

import { AIServiceFactory } from "./ai/aiServiceFactory";
import type { ReviewRequest, GeneratedReview } from "./ai/base/aiServiceBase";

// Re-export types for backward compatibility
export type { ReviewRequest, GeneratedReview };

export class AIReviewService {
  async generateReview(request: ReviewRequest): Promise<GeneratedReview> {
    // Get the appropriate category-specific service
    const categoryService = AIServiceFactory.getService(request.category);
    
    // Log which service is being used
    console.log(`🎯 Using specialized service for category: ${request.category}`);
    
    // Delegate to category-specific service
    return categoryService.generateReview(request);
  }

  // Clear used hashes across all category services
  clearUsedHashes(): void {
    AIServiceFactory.clearAllUsedHashes();
  }

  // Get usage statistics across all services
  getUsageStats(): { totalGenerated: number; byCategory?: Record<string, number> } {
    return AIServiceFactory.getTotalUsageStats();
  }
  
  // Get supported categories
  getSupportedCategories(): string[] {
    return AIServiceFactory.getSupportedCategories();
  }
  
  // Check if category is supported
  isCategorySupported(category: string): boolean {
    return AIServiceFactory.isCategorySupported(category);
  }
}

export const aiService = new AIReviewService();
