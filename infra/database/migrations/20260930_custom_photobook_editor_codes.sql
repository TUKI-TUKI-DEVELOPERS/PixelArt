BEGIN;

ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'PHOTOBOOK_EDITOR_CODE_SENT';

CREATE TABLE IF NOT EXISTS custom_photobook_editor_access_codes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  request_id BIGINT NOT NULL REFERENCES custom_photobook_requests(id) ON DELETE CASCADE,
  code_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ NULL,
  last_redeemed_at TIMESTAMPTZ NULL,
  redeem_count INTEGER NOT NULL DEFAULT 0 CHECK (redeem_count >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS custom_photobook_editor_access_codes_one_active_idx
  ON custom_photobook_editor_access_codes(request_id)
  WHERE revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS custom_photobook_editor_sessions (
  id UUID PRIMARY KEY,
  request_id BIGINT NOT NULL REFERENCES custom_photobook_requests(id) ON DELETE CASCADE,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS custom_photobook_editor_sessions_active_request_idx
  ON custom_photobook_editor_sessions(request_id, expires_at)
  WHERE revoked_at IS NULL;

-- Retire the incomplete legacy editor path without deleting historical links.
UPDATE public_links
SET revoked_at = now()
WHERE link_type::text = 'PHOTOBOOK_EDITOR' AND revoked_at IS NULL;

COMMIT;
