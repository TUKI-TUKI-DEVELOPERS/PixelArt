BEGIN;

ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'PHOTOBOOK_COVER_CHANGES_REQUESTED_TO_ADMIN';
ALTER TYPE custom_photobook_request_status ADD VALUE IF NOT EXISTS 'CHANGES_REQUESTED';

CREATE TABLE IF NOT EXISTS custom_photobook_cover_adjustment_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  request_id BIGINT NOT NULL REFERENCES custom_photobook_requests(id) ON DELETE CASCADE,
  surface TEXT NOT NULL CHECK (surface IN ('FRONT_COVER', 'BACK_COVER', 'BOTH')),
  message TEXT NOT NULL CHECK (char_length(btrim(message)) BETWEEN 5 AND 1200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS custom_photobook_cover_adjustment_requests_one_open_idx
  ON custom_photobook_cover_adjustment_requests(request_id)
  WHERE resolved_at IS NULL;

COMMIT;
