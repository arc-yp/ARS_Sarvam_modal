-- Add generation_source column to track review generation method
-- This column indicates whether a review was auto-generated on first load, service selection, or manually regenerated

ALTER TABLE generated_reviews 
ADD COLUMN IF NOT EXISTS generation_source TEXT DEFAULT 'auto' CHECK (generation_source IN ('auto', 'service', 'manual'));

-- Add comment to explain the column
COMMENT ON COLUMN generated_reviews.generation_source IS 'Tracks how the review was generated: auto (first load), service (service selection), or manual (Generate New Review button)';

-- Create index for faster filtering by generation source
CREATE INDEX IF NOT EXISTS idx_generated_reviews_generation_source ON generated_reviews(generation_source);

-- Update existing records to have 'auto' as default (if not already set)
UPDATE generated_reviews 
SET generation_source = 'auto' 
WHERE generation_source IS NULL;
