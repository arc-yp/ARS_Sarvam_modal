-- Drop highlight_services column from review_cards table
-- Safe to run multiple times
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name='review_cards' AND column_name='highlight_services'
  ) THEN
    ALTER TABLE review_cards
    DROP COLUMN highlight_services;
  END IF;
END $$;
