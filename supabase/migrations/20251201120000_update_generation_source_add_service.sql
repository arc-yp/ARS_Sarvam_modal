-- Update generation_source column to include 'service' option
-- This migration modifies the CHECK constraint to allow 'auto', 'service', and 'manual'

-- Drop the existing CHECK constraint
ALTER TABLE generated_reviews 
DROP CONSTRAINT IF EXISTS generated_reviews_generation_source_check;

-- Add new CHECK constraint with 'service' option
ALTER TABLE generated_reviews 
ADD CONSTRAINT generated_reviews_generation_source_check 
CHECK (generation_source IN ('auto', 'service', 'manual'));

-- Update the column comment
COMMENT ON COLUMN generated_reviews.generation_source IS 'Tracks how the review was generated: auto (first load), service (service selection), or manual (Generate New Review button)';
