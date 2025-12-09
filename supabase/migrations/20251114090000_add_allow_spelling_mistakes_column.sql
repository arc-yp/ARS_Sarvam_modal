-- Add admin-controlled spelling mistake highlight toggle
-- Default OFF
ALTER TABLE IF EXISTS public.review_cards
  ADD COLUMN IF NOT EXISTS allow_spelling_mistakes boolean NOT NULL DEFAULT false;

-- Backfill existing rows to explicit default (optional, redundant due to DEFAULT)
UPDATE public.review_cards SET allow_spelling_mistakes = false WHERE allow_spelling_mistakes IS NULL;