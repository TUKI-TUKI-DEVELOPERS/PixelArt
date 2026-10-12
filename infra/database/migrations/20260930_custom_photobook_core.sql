-- Bootstrap the custom-photobook schema on databases created from origin/main.
-- Intentionally no explicit transaction: PostgreSQL must commit newly added enum values
-- before they can be used by CHECK constraints in subsequent statements.

DO $$ BEGIN
  CREATE TYPE custom_photobook_request_status AS ENUM (
    'PENDING_REVIEW',
    'DESIGN_IN_PROGRESS',
    'AWAITING_CUSTOMER',
    'CHANGES_REQUESTED',
    'EDITOR_READY',
    'EDITOR_IN_PROGRESS',
    'AWAITING_PAYMENT',
    'READY_FOR_PRODUCTION',
    'CLOSED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TYPE custom_photobook_request_status ADD VALUE IF NOT EXISTS 'CHANGES_REQUESTED';
ALTER TYPE custom_photobook_request_status ADD VALUE IF NOT EXISTS 'AWAITING_PAYMENT';

DO $$ BEGIN
  CREATE TYPE custom_photobook_cover_mode AS ENUM (
    'PIXELART_DESIGNED',
    'CUSTOMER_ARTWORK',
    'PHOTO_BASED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TYPE public_link_type ADD VALUE IF NOT EXISTS 'PHOTOBOOK_COVER_APPROVAL';
ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'PHOTOBOOK_COVER_APPROVAL_SENT';
ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'PHOTOBOOK_COVER_CHANGES_REQUESTED_TO_ADMIN';
ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'PHOTOBOOK_EDITOR_CODE_SENT';

CREATE TABLE IF NOT EXISTS custom_photobook_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status custom_photobook_request_status NOT NULL DEFAULT 'PENDING_REVIEW',
  occasion TEXT NOT NULL,
  requested_theme TEXT NOT NULL,
  cover_title TEXT,
  cover_mode custom_photobook_cover_mode NOT NULL,
  brief TEXT NOT NULL,
  customer_full_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  front_cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL,
  back_cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL,
  cover_wrap_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL,
  cover_approved_at TIMESTAMPTZ,
  linked_photobook_project_id BIGINT UNIQUE REFERENCES photobook_projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE custom_photobook_requests
  ADD COLUMN IF NOT EXISTS front_cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS back_cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS cover_wrap_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS cover_approved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS linked_photobook_project_id BIGINT UNIQUE REFERENCES photobook_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS custom_photobook_requests_status_idx
  ON custom_photobook_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS custom_photobook_requests_customer_email_idx
  ON custom_photobook_requests(customer_email);

CREATE TABLE IF NOT EXISTS custom_photobook_request_reference_assets (
  request_id BIGINT NOT NULL REFERENCES custom_photobook_requests(id) ON DELETE CASCADE,
  asset_id BIGINT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (request_id, asset_id)
);

ALTER TABLE custom_photobook_request_reference_assets
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
CREATE INDEX IF NOT EXISTS custom_photobook_request_reference_assets_asset_idx
  ON custom_photobook_request_reference_assets(asset_id);

CREATE TABLE IF NOT EXISTS custom_photobook_request_designs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  request_id BIGINT NOT NULL REFERENCES custom_photobook_requests(id) ON DELETE CASCADE,
  surface TEXT NOT NULL CHECK (surface IN ('FRONT_COVER', 'BACK_COVER')),
  asset_id BIGINT NOT NULL REFERENCES assets(id) ON DELETE RESTRICT,
  source_design_id BIGINT REFERENCES custom_photobook_request_designs(id) ON DELETE SET NULL,
  is_selected BOOLEAN NOT NULL DEFAULT false,
  assembled_prompt TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'openai',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE custom_photobook_request_designs
  ADD COLUMN IF NOT EXISTS source_design_id BIGINT REFERENCES custom_photobook_request_designs(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_selected BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS custom_photobook_request_designs_request_surface_created_idx
  ON custom_photobook_request_designs(request_id, surface, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS custom_photobook_request_designs_selected_front_idx
  ON custom_photobook_request_designs(request_id)
  WHERE surface = 'FRONT_COVER' AND is_selected;
CREATE UNIQUE INDEX IF NOT EXISTS custom_photobook_request_designs_selected_back_idx
  ON custom_photobook_request_designs(request_id)
  WHERE surface = 'BACK_COVER' AND is_selected;

ALTER TABLE public_links ADD COLUMN IF NOT EXISTS custom_photobook_request_id BIGINT;
DO $$ BEGIN
  ALTER TABLE public_links ADD CONSTRAINT fk_public_links_custom_photobook_request
    FOREIGN KEY (custom_photobook_request_id) REFERENCES custom_photobook_requests(id) ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
CREATE INDEX IF NOT EXISTS public_links_custom_photobook_request_id_idx
  ON public_links(custom_photobook_request_id);

ALTER TABLE public_links DROP CONSTRAINT IF EXISTS chk_public_links_has_reference;
ALTER TABLE public_links DROP CONSTRAINT IF EXISTS chk_public_links_type_reference;
ALTER TABLE public_links ADD CONSTRAINT chk_public_links_has_reference
  CHECK (demo_request_id IS NOT NULL OR order_id IS NOT NULL OR custom_photobook_request_id IS NOT NULL);
ALTER TABLE public_links ADD CONSTRAINT chk_public_links_type_reference CHECK (
  (link_type = 'DEMO_VIEW' AND demo_request_id IS NOT NULL AND order_id IS NULL AND custom_photobook_request_id IS NULL) OR
  (link_type IN ('PAYMENT_UPLOAD', 'FEEDBACK', 'CHECKOUT') AND order_id IS NOT NULL AND demo_request_id IS NULL AND custom_photobook_request_id IS NULL) OR
  (link_type = 'PHOTOBOOK_COVER_APPROVAL' AND custom_photobook_request_id IS NOT NULL AND demo_request_id IS NULL AND order_id IS NULL) OR
  (link_type::text = 'PHOTOBOOK_EDITOR' AND custom_photobook_request_id IS NOT NULL AND demo_request_id IS NULL AND order_id IS NULL AND revoked_at IS NOT NULL)
);

ALTER TABLE photobook_projects ALTER COLUMN photobook_theme_id DROP NOT NULL;
