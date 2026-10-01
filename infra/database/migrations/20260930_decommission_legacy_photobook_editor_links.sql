BEGIN;

-- Historical links remain auditable but cannot be active or reissued.
UPDATE public_links
SET revoked_at = now()
WHERE link_type::text = 'PHOTOBOOK_EDITOR' AND revoked_at IS NULL;

ALTER TABLE public_links DROP CONSTRAINT IF EXISTS chk_public_links_type_reference;
ALTER TABLE public_links ADD CONSTRAINT chk_public_links_type_reference CHECK (
  (link_type = 'DEMO_VIEW' AND demo_request_id IS NOT NULL AND order_id IS NULL AND custom_photobook_request_id IS NULL) OR
  (link_type IN ('PAYMENT_UPLOAD', 'FEEDBACK', 'CHECKOUT') AND order_id IS NOT NULL AND demo_request_id IS NULL AND custom_photobook_request_id IS NULL) OR
  (link_type = 'PHOTOBOOK_COVER_APPROVAL' AND custom_photobook_request_id IS NOT NULL AND demo_request_id IS NULL AND order_id IS NULL) OR
  (link_type::text = 'PHOTOBOOK_EDITOR' AND custom_photobook_request_id IS NOT NULL AND demo_request_id IS NULL AND order_id IS NULL AND revoked_at IS NOT NULL)
);

COMMIT;
