-- Remove allow_spelling_mistakes column from review_cards table
-- This migration removes the spelling mistake feature from the system

ALTER TABLE public.review_cards
  DROP COLUMN IF EXISTS allow_spelling_mistakes;

-- Add comment explaining the change
COMMENT ON TABLE public.review_cards IS 'Review cards table - allow_spelling_mistakes column removed on 2024-12-10';
