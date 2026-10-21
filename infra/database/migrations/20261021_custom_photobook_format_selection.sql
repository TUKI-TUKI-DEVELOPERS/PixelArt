BEGIN;

ALTER TABLE public.custom_photobook_requests
  ADD COLUMN IF NOT EXISTS selected_cover_type TEXT,
  ADD COLUMN IF NOT EXISTS selected_sheet_count INTEGER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'custom_photobook_requests_format_selection_check'
      AND conrelid = 'public.custom_photobook_requests'::regclass
  ) THEN
    ALTER TABLE public.custom_photobook_requests
      ADD CONSTRAINT custom_photobook_requests_format_selection_check CHECK (
        (selected_cover_type IS NULL AND selected_sheet_count IS NULL)
        OR (
          selected_cover_type IS NOT NULL
          AND selected_sheet_count IS NOT NULL
          AND (
            (selected_cover_type = 'TAPA_DELGADA' AND selected_sheet_count IN (15, 20, 25, 35))
            OR (selected_cover_type = 'TAPA_GRUESA' AND selected_sheet_count IN (15, 20, 25, 35, 50))
          )
        )
      );
  END IF;
END $$;

COMMIT;
