-- Add highlight_services flag to control bold service highlighting in reviews
-- Safe to run multiple times
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name='review_cards' AND column_name='highlight_services'
  ) THEN
    ALTER TABLE review_cards
    ADD COLUMN highlight_services boolean NOT NULL DEFAULT true;
  END IF;
END $$;