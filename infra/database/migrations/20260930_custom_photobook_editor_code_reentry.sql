BEGIN;

ALTER TABLE custom_photobook_editor_access_codes
  DROP CONSTRAINT IF EXISTS custom_photobook_editor_access_codes_redeem_count_check;

ALTER TABLE custom_photobook_editor_access_codes
  ADD CONSTRAINT custom_photobook_editor_access_codes_redeem_count_check
  CHECK (redeem_count >= 0);

-- The code remains valid until expiration. Throttling limits entry attempts;
-- successful re-entry must not permanently invalidate a customer code.
UPDATE custom_photobook_editor_access_codes
SET redeem_count = 0,
    revoked_at = NULL
WHERE revoked_at IS NOT NULL
  AND expires_at > now()
  AND redeem_count >= 5;

COMMIT;
