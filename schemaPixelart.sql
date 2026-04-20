-- =========================================
-- EXTENSIONS
-- =========================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================
-- ENUMS
-- =========================================
CREATE TYPE product_type AS ENUM ('CUSTOM_BOOK', 'PHOTOBOOK');

CREATE TYPE personalized_book_demo_request_status AS ENUM (
  'RECEIVED', 'PROPOSALS_SENT', 'CANCELLED'
);

CREATE TYPE order_status AS ENUM (
  'AWAITING_PAYMENT_PROOF',
  'UNDER_PAYMENT_REVIEW',
  'PAYMENT_VERIFIED',
  'REJECTED',
  'IN_PRODUCTION',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED'
);

CREATE TYPE payment_method AS ENUM ('YAPE_QR', 'PLIN', 'CARD');

CREATE TYPE payment_proof_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TYPE email_outbox_status AS ENUM ('PENDING', 'SENT', 'FAILED');

CREATE TYPE email_event_type AS ENUM (
  'PROPOSALS_SENT_TO_CUSTOMER',
  'PAYMENT_PROOF_RECEIVED_ADMIN',
  'PAYMENT_APPROVED_TO_CUSTOMER',
  'PAYMENT_REJECTED_TO_CUSTOMER',
  'DELIVERY_FEEDBACK_REQUEST',
  'UNIFIED_CHECKOUT_SENT'
);

CREATE TYPE refund_status AS ENUM (
  'NOT_REQUESTED', 'REQUESTED', 'APPROVED', 'REJECTED', 'PROCESSED'
);

CREATE TYPE public_link_type AS ENUM (
  'DEMO_VIEW',
  'PAYMENT_UPLOAD',
  'FEEDBACK',
  'CHECKOUT'
);

CREATE TYPE photobook_project_status AS ENUM (
  'DRAFT',
  'CONFIRMED',
  'CONVERTED_TO_ORDER'
);

-- =========================================
-- USERS (ADMIN)
-- =========================================
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'ADMIN',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_users_role CHECK (role IN ('ADMIN','OPERATOR','VIEWER'))
);

CREATE UNIQUE INDEX IF NOT EXISTS users_lower_email_uidx
  ON users (LOWER(email));

-- =========================================
-- CATALOG (productos vendibles del home)
-- =========================================
CREATE TABLE catalog_books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  product_type product_type NOT NULL, -- CUSTOM_BOOK o PHOTOBOOK
  description TEXT,
  currency TEXT NOT NULL DEFAULT 'PEN',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS catalog_books_product_type_idx ON catalog_books(product_type);

-- Variantes de tapa SOLO para libros personalizados (custom book)
CREATE TABLE catalog_book_variants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  catalog_book_id BIGINT NOT NULL REFERENCES catalog_books(id) ON DELETE CASCADE,
  cover_type TEXT NOT NULL,
  base_price_cents BIGINT NOT NULL CHECK (base_price_cents >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (catalog_book_id, cover_type)
);

CREATE INDEX IF NOT EXISTS catalog_book_variants_catalog_book_id_idx
  ON catalog_book_variants(catalog_book_id);

-- =========================================
-- PERSONALIZED (categoría -> modelo -> plantilla)
-- =========================================
CREATE TABLE personalized_categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name)
);

CREATE TABLE personalized_models (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES personalized_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (category_id, name)
);

CREATE INDEX IF NOT EXISTS personalized_models_category_id_idx
  ON personalized_models(category_id);

CREATE TABLE personalized_templates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  model_id BIGINT NOT NULL REFERENCES personalized_models(id) ON DELETE CASCADE,
  name TEXT,
  template_preview_key TEXT NOT NULL, -- key/ruta en storage (S3/R2/etc)
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS personalized_templates_model_id_idx
  ON personalized_templates(model_id);

-- =========================================
-- ASSETS (dedupe por hash)
-- =========================================
CREATE TABLE assets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  storage_key TEXT NOT NULL,
  original_filename TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  width INT,
  height INT,
  content_hash TEXT NOT NULL, -- sha256 hex
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (content_hash)
);
-- =========================================
-- COVER ASSETS (imagenes de portada)
-- =========================================

ALTER TABLE personalized_categories
ADD COLUMN cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL;

ALTER TABLE catalog_books
ADD COLUMN cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL;
-- =========================================
-- DEMO REQUEST (CUSTOM BOOK)
-- =========================================
CREATE TABLE demo_request (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- producto + tapa
  catalog_book_id BIGINT NOT NULL REFERENCES catalog_books(id) ON DELETE RESTRICT,
  catalog_book_variant_id BIGINT NOT NULL REFERENCES catalog_book_variants(id) ON DELETE RESTRICT,

  -- selección de tema/modelo
  personalized_category_id BIGINT NOT NULL REFERENCES personalized_categories(id) ON DELETE RESTRICT,
  personalized_model_id BIGINT NOT NULL REFERENCES personalized_models(id) ON DELETE RESTRICT,

  -- customer snapshot
  customer_full_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,

  -- dirección se define aquí (según tu decisión)
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_city TEXT,
  shipping_region TEXT,
  shipping_reference TEXT,

  delivery_date DATE NOT NULL,

  wants_custom_dedication BOOLEAN NOT NULL DEFAULT FALSE,
  dedication_text TEXT,

  message_optional TEXT,

  status personalized_book_demo_request_status NOT NULL DEFAULT 'RECEIVED',

  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  cancelled_by_user_id BIGINT REFERENCES users(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS demo_request_customer_email_idx ON demo_request(customer_email);
CREATE INDEX IF NOT EXISTS demo_request_status_idx ON demo_request(status);

CREATE INDEX IF NOT EXISTS demo_request_catalog_book_id_idx ON demo_request(catalog_book_id);
CREATE INDEX IF NOT EXISTS demo_request_catalog_book_variant_id_idx ON demo_request(catalog_book_variant_id);
CREATE INDEX IF NOT EXISTS demo_request_personalized_category_id_idx ON demo_request(personalized_category_id);
CREATE INDEX IF NOT EXISTS demo_request_personalized_model_id_idx ON demo_request(personalized_model_id);
CREATE INDEX IF NOT EXISTS demo_request_cancelled_by_user_id_idx ON demo_request(cancelled_by_user_id);

-- Fotos asociadas a la demo
CREATE TABLE demo_request_assets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  demo_request_id BIGINT NOT NULL REFERENCES demo_request(id) ON DELETE CASCADE,
  asset_id BIGINT NOT NULL REFERENCES assets(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (demo_request_id, asset_id)
);

CREATE INDEX IF NOT EXISTS demo_request_assets_demo_request_id_idx ON demo_request_assets(demo_request_id);
CREATE INDEX IF NOT EXISTS demo_request_assets_asset_id_idx ON demo_request_assets(asset_id);

-- Cliente selecciona 3 plantillas (sin preview)
CREATE TABLE demo_template_selections (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  demo_request_id BIGINT NOT NULL REFERENCES demo_request(id) ON DELETE CASCADE,
  template_id BIGINT NOT NULL REFERENCES personalized_templates(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (demo_request_id, template_id)
);

CREATE INDEX IF NOT EXISTS demo_template_selections_demo_request_id_idx ON demo_template_selections(demo_request_id);
CREATE INDEX IF NOT EXISTS demo_template_selections_template_id_idx ON demo_template_selections(template_id);

-- Admin sube el resultado protegido (watermark / baja calidad)
CREATE TABLE demo_proposals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  demo_request_id BIGINT NOT NULL REFERENCES demo_request(id) ON DELETE CASCADE,
  template_id BIGINT NOT NULL REFERENCES personalized_templates(id),

  output_storage_key TEXT NOT NULL, -- archivo generado protegido
  protection_mode TEXT NOT NULL DEFAULT 'WATERMARK', -- o 'LOW_QUALITY'
  is_watermarked BOOLEAN NOT NULL DEFAULT TRUE,

  generated_by_user_id BIGINT REFERENCES users(id),
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (demo_request_id, template_id)
);

CREATE INDEX IF NOT EXISTS demo_proposals_demo_request_id_idx ON demo_proposals(demo_request_id);
CREATE INDEX IF NOT EXISTS demo_proposals_template_id_idx ON demo_proposals(template_id);

CREATE INDEX IF NOT EXISTS demo_proposals_generated_by_user_id_idx ON demo_proposals(generated_by_user_id);

ALTER TABLE demo_proposals
  ADD CONSTRAINT chk_demo_proposals_protection_mode
  CHECK (protection_mode IN ('WATERMARK', 'LOW_QUALITY'));

-- =========================================
-- ORDERS (CUSTOM_BOOK + PHOTOBOOK)
-- =========================================
CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  channel product_type NOT NULL,
  status order_status NOT NULL DEFAULT 'AWAITING_PAYMENT_PROOF',

  public_token UUID NOT NULL DEFAULT gen_random_uuid(),
  UNIQUE (public_token),

  -- custom book
  demo_request_id BIGINT REFERENCES demo_request(id),
  catalog_book_variant_id BIGINT REFERENCES catalog_book_variants(id),
  personalized_model_id BIGINT REFERENCES personalized_models(id), -- para rating por modelo

  -- photobook (lo conectaremos luego si guardas proyectos)
  photobook_project_id BIGINT UNIQUE,

  customer_full_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,

  base_amount_cents BIGINT NOT NULL DEFAULT 0 CHECK (base_amount_cents >= 0),
  rush_fee_cents BIGINT NOT NULL DEFAULT 0 CHECK (rush_fee_cents >= 0),
  extra_templates_amount_cents BIGINT NOT NULL DEFAULT 0 CHECK (extra_templates_amount_cents >= 0),
  total_amount_cents BIGINT NOT NULL CHECK (total_amount_cents >= 0),

  currency TEXT NOT NULL DEFAULT 'PEN',
  estimated_delivery_date DATE,

  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  cancelled_by_user_id BIGINT REFERENCES users(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT chk_total_amount CHECK (total_amount_cents = base_amount_cents + rush_fee_cents + extra_templates_amount_cents),

  -- Si es CUSTOM_BOOK debe existir demo_request_id y personalized_model_id
  CONSTRAINT chk_custom_book_requires_demo
    CHECK (
      (channel <> 'CUSTOM_BOOK')
      OR (demo_request_id IS NOT NULL AND personalized_model_id IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_channel_idx ON orders(channel);
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_updated_at_idx ON orders(updated_at);

CREATE INDEX IF NOT EXISTS orders_demo_request_id_idx ON orders(demo_request_id);
CREATE INDEX IF NOT EXISTS orders_catalog_book_variant_id_idx ON orders(catalog_book_variant_id);
CREATE INDEX IF NOT EXISTS orders_cancelled_by_user_id_idx ON orders(cancelled_by_user_id);
CREATE INDEX IF NOT EXISTS orders_personalized_model_id_idx ON orders(personalized_model_id);

-- =========================================
-- ORDER TEMPLATE SELECTIONS (plantillas definitivas elegidas por el cliente)
-- =========================================
CREATE TABLE order_template_selections (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id    BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  template_id BIGINT NOT NULL REFERENCES personalized_templates(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (order_id, template_id)
);

CREATE INDEX IF NOT EXISTS order_template_selections_order_id_idx ON order_template_selections(order_id);

-- =========================================
-- PUBLIC LINKS (expiran 7 días, reemisión con nuevo token)
-- =========================================
CREATE TABLE public_links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  link_type public_link_type NOT NULL,
  token UUID NOT NULL DEFAULT gen_random_uuid(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,

  demo_request_id BIGINT REFERENCES demo_request(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,

  reissued_from_id BIGINT REFERENCES public_links(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (token)
);

CREATE INDEX IF NOT EXISTS public_links_token_idx ON public_links(token);
CREATE INDEX IF NOT EXISTS public_links_demo_request_id_idx ON public_links(demo_request_id);
CREATE INDEX IF NOT EXISTS public_links_order_id_idx ON public_links(order_id);
CREATE INDEX IF NOT EXISTS public_links_expires_at_idx ON public_links(expires_at);

-- 1) Que tenga al menos una referencia
ALTER TABLE public_links
  ADD CONSTRAINT chk_public_links_has_reference
  CHECK (demo_request_id IS NOT NULL OR order_id IS NOT NULL);

-- 2) Que el tipo obligue la referencia correcta
ALTER TABLE public_links
  ADD CONSTRAINT chk_public_links_type_reference
  CHECK (
    (link_type = 'DEMO_VIEW'      AND demo_request_id IS NOT NULL AND order_id IS NULL) OR
    (link_type = 'PAYMENT_UPLOAD' AND order_id IS NOT NULL AND demo_request_id IS NULL) OR
    (link_type = 'FEEDBACK'       AND order_id IS NOT NULL AND demo_request_id IS NULL) OR
    (link_type = 'CHECKOUT'       AND order_id IS NOT NULL AND demo_request_id IS NULL)
  );

-- =========================================
-- PAYMENT PROOFS (1 voucher por orden)
-- =========================================
CREATE TABLE payment_proofs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  storage_key TEXT NOT NULL,
  original_filename TEXT,
  mime_type TEXT,
  size_bytes BIGINT,

  payment_method payment_method NOT NULL,
  amount_cents BIGINT NOT NULL CHECK (amount_cents >= 0),

  status payment_proof_status NOT NULL DEFAULT 'PENDING',
  rejection_reason TEXT,

  reviewed_by_user_id BIGINT REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (order_id) -- 1 solo voucher
);

CREATE INDEX IF NOT EXISTS payment_proofs_status_idx ON payment_proofs(status);
CREATE INDEX IF NOT EXISTS payment_proofs_reviewed_by_user_id_idx ON payment_proofs(reviewed_by_user_id);

-- =========================================
-- ORDER STATUS EVENTS
-- =========================================
CREATE TABLE order_status_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status order_status,
  new_status order_status NOT NULL,
  changed_by_user_id BIGINT REFERENCES users(id),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_status_events_order_id_idx ON order_status_events(order_id);
CREATE INDEX IF NOT EXISTS order_status_events_new_status_idx ON order_status_events(new_status);
CREATE INDEX IF NOT EXISTS order_status_events_changed_by_user_id_idx ON order_status_events(changed_by_user_id);
CREATE INDEX IF NOT EXISTS order_status_events_created_brin ON order_status_events USING BRIN (created_at);

-- =========================================
-- EMAIL OUTBOX (con claim para concurrencia)
-- =========================================
CREATE TABLE email_outbox (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_type email_event_type NOT NULL,

  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  demo_request_id BIGINT REFERENCES demo_request(id) ON DELETE CASCADE,

  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  payload JSONB NOT NULL,

  status email_outbox_status NOT NULL DEFAULT 'PENDING',
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,

  claimed_at TIMESTAMPTZ,
  claimed_by TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS email_outbox_status_idx ON email_outbox(status);
CREATE INDEX IF NOT EXISTS email_outbox_event_type_idx ON email_outbox(event_type);
CREATE INDEX IF NOT EXISTS email_outbox_order_id_idx ON email_outbox(order_id);
CREATE INDEX IF NOT EXISTS email_outbox_demo_request_id_idx ON email_outbox(demo_request_id);
CREATE INDEX IF NOT EXISTS email_outbox_created_brin ON email_outbox USING BRIN (created_at);
CREATE INDEX IF NOT EXISTS email_outbox_pending_idx ON email_outbox (created_at) WHERE status = 'PENDING';
-- =========================================
-- FEEDBACK (rating por modelo, media estrella)
-- rating_x2: 1..10  (0.5..5.0)
-- =========================================
CREATE TABLE feedback (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  model_id BIGINT NOT NULL REFERENCES personalized_models(id),

  rating_x2 SMALLINT NOT NULL CHECK (rating_x2 BETWEEN 1 AND 10),
  comment TEXT,

  redirected_to_google BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS feedback_model_id_idx ON feedback(model_id);
CREATE INDEX IF NOT EXISTS feedback_rating_x2_idx ON feedback(rating_x2);

-- =========================================
-- REFUNDS
-- =========================================
CREATE TABLE refunds (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  status refund_status NOT NULL DEFAULT 'NOT_REQUESTED',

  requested_reason TEXT,
  requested_at TIMESTAMPTZ,

  decided_by_user_id BIGINT REFERENCES users(id),
  decided_at TIMESTAMPTZ,
  decision_reason TEXT,

  processed_at TIMESTAMPTZ,
  processed_reference TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS refunds_status_idx ON refunds(status);
CREATE INDEX IF NOT EXISTS refunds_decided_by_user_id_idx ON refunds(decided_by_user_id);

-- =========================================
-- PHOTOBOOKS
-- =========================================

-- Themes = portada (Francia, México, Cusco, Bodas, etc.)
CREATE TABLE photobook_themes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  cover_preview_key TEXT NOT NULL,   -- preview en storage
  cover_template_key TEXT NOT NULL,  -- plantilla base para generar portada
  back_cover_key TEXT,               -- contraportada en storage
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name)
);

-- Producto photobook (precio por página, min páginas, etc.)
CREATE TABLE photobook_products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  currency TEXT NOT NULL DEFAULT 'PEN',
  min_pages INT NOT NULL DEFAULT 25 CHECK (min_pages > 0),
  price_per_page_cents BIGINT NOT NULL CHECK (price_per_page_cents >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  allows_custom_dimensions BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Proyecto (draft) del usuario
CREATE TABLE photobook_projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  photobook_product_id BIGINT NOT NULL REFERENCES photobook_products(id),
  photobook_theme_id BIGINT NOT NULL REFERENCES photobook_themes(id),

  customer_email TEXT NOT NULL,
  customer_full_name TEXT,
  customer_phone TEXT,
  delivery_address TEXT,
  delivery_district TEXT,
  cover_title TEXT,
  customer_dni TEXT,
  custom_width_cm NUMERIC(5,1),
  custom_height_cm NUMERIC(5,1),

  status photobook_project_status NOT NULL DEFAULT 'DRAFT',

  -- snapshot de pricing al confirmar (para que no cambie si el admin edita el producto)
  price_per_page_cents BIGINT NOT NULL CHECK (price_per_page_cents >= 0),
  page_count INT NOT NULL DEFAULT 0 CHECK (page_count >= 0),
  calculated_total_cents BIGINT NOT NULL DEFAULT 0 CHECK (calculated_total_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'PEN',

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS photobook_projects_product_id_idx ON photobook_projects(photobook_product_id);
CREATE INDEX IF NOT EXISTS photobook_projects_theme_id_idx ON photobook_projects(photobook_theme_id);
CREATE INDEX IF NOT EXISTS photobook_projects_customer_email_idx ON photobook_projects(customer_email);
CREATE INDEX IF NOT EXISTS photobook_projects_status_idx ON photobook_projects(status);

ALTER TABLE photobook_projects
  ADD CONSTRAINT chk_photobook_projects_total
  CHECK (calculated_total_cents = price_per_page_cents * page_count);

-- Fotos usadas en el photobook (reusa assets por hash)
CREATE TABLE photobook_project_assets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES photobook_projects(id) ON DELETE CASCADE,
  asset_id BIGINT NOT NULL REFERENCES assets(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, asset_id)
);

CREATE INDEX IF NOT EXISTS photobook_project_assets_project_id_idx ON photobook_project_assets(project_id);
CREATE INDEX IF NOT EXISTS photobook_project_assets_asset_id_idx ON photobook_project_assets(asset_id);

-- Páginas del proyecto
CREATE TABLE photobook_pages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES photobook_projects(id) ON DELETE CASCADE,
  page_number INT NOT NULL CHECK (page_number >= 1),
  layout_key TEXT NOT NULL, -- GRID_3, GRID_2, FULL_1, etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, page_number)
);

CREATE INDEX IF NOT EXISTS photobook_pages_project_id_idx ON photobook_pages(project_id);

-- Slots: qué foto va en qué posición de la página
CREATE TABLE photobook_page_slots (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  page_id BIGINT NOT NULL REFERENCES photobook_pages(id) ON DELETE CASCADE,
  asset_id BIGINT NOT NULL REFERENCES assets(id),
  slot_index INT NOT NULL CHECK (slot_index >= 0),
  crop_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_id, slot_index)
);

CREATE INDEX IF NOT EXISTS photobook_page_slots_page_id_idx ON photobook_page_slots(page_id);
CREATE INDEX IF NOT EXISTS photobook_page_slots_asset_id_idx ON photobook_page_slots(asset_id);

-- Render final (PDF listo para imprimir / entregar a producción)
CREATE TABLE photobook_renders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL UNIQUE REFERENCES photobook_projects(id) ON DELETE CASCADE,
  pdf_storage_key TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS photobook_renders_generated_at_idx ON photobook_renders(generated_at);

-- =========================================
-- HOOK: orders.photobook_project_id -> photobook_projects
-- =========================================
ALTER TABLE orders
  ADD CONSTRAINT fk_orders_photobook_project
  FOREIGN KEY (photobook_project_id)
  REFERENCES photobook_projects(id)
  ON DELETE SET NULL;

-- (opcional pero recomendado) si es PHOTOBOOK, debe tener photobook_project_id
ALTER TABLE orders
  ADD CONSTRAINT chk_photobook_requires_project
  CHECK (
    (channel <> 'PHOTOBOOK')
    OR (photobook_project_id IS NOT NULL)
  );

  -- =========================================
-- MVP FIXES (post-análisis)
-- =========================================

ALTER TABLE feedback
  ALTER COLUMN model_id DROP NOT NULL;

ALTER TABLE feedback
  ADD COLUMN photobook_theme_id BIGINT REFERENCES photobook_themes(id);

ALTER TABLE feedback
  ADD CONSTRAINT chk_feedback_source CHECK (
    (model_id IS NOT NULL AND photobook_theme_id IS NULL) OR
    (model_id IS NULL     AND photobook_theme_id IS NOT NULL)
  );

CREATE INDEX IF NOT EXISTS feedback_photobook_theme_id_idx
  ON feedback(photobook_theme_id);

-- D2: Admin marketing: banner/modal config
CREATE TABLE IF NOT EXISTS site_config (
  key   TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by_user_id BIGINT REFERENCES users(id)
);

-- D2: Rush fee configurable por admin
CREATE TABLE IF NOT EXISTS rush_fee_rules (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label          TEXT NOT NULL,
  days_threshold INT NOT NULL CHECK (days_threshold > 0),
  fee_cents      BIGINT NOT NULL CHECK (fee_cents >= 0),
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- D3: Invariante: si voucher APPROVED debe tener revisor + fecha
ALTER TABLE payment_proofs
  ADD CONSTRAINT chk_proof_reviewed CHECK (
    status <> 'APPROVED'
    OR (reviewed_by_user_id IS NOT NULL AND reviewed_at IS NOT NULL)
  );

-- D5: Si photobook está CONFIRMED, exigir datos de contacto y dirección de entrega
ALTER TABLE photobook_projects
  ADD CONSTRAINT chk_confirmed_requires_contact CHECK (
    status <> 'CONFIRMED'
    OR (customer_full_name IS NOT NULL AND customer_phone IS NOT NULL AND delivery_address IS NOT NULL)
  );

-- D4: photobook_projects status CANCELLED (opcional pero recomendado)
ALTER TYPE photobook_project_status ADD VALUE IF NOT EXISTS 'CANCELLED';

-- D9 (opcional recomendado): storage_key único
ALTER TABLE assets
  ADD CONSTRAINT assets_storage_key_unique UNIQUE (storage_key);


-- =========================================
-- FINAL PATCH (MVP READY)
-- Idempotente: seguro de ejecutar múltiples veces.
-- Cubre B1, B2, B3 aunque el bloque MVP FIXES ya se haya corrido.
-- =========================================

-- B1a — feedback.model_id: hacer nullable si aún es NOT NULL
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'feedback'
      AND column_name  = 'model_id'
      AND is_nullable  = 'NO'
  ) THEN
    ALTER TABLE feedback ALTER COLUMN model_id DROP NOT NULL;
  END IF;
END $$;

-- B1b — feedback.photobook_theme_id: agregar columna si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'feedback'
      AND column_name  = 'photobook_theme_id'
  ) THEN
    ALTER TABLE feedback
      ADD COLUMN photobook_theme_id BIGINT REFERENCES photobook_themes(id);
  END IF;
END $$;

-- B1c — feedback.chk_feedback_source: CHECK exclusivo model|theme
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_schema    = 'public'
      AND table_name      = 'feedback'
      AND constraint_name = 'chk_feedback_source'
  ) THEN
    ALTER TABLE feedback
      ADD CONSTRAINT chk_feedback_source CHECK (
        (model_id IS NOT NULL AND photobook_theme_id IS NULL)
        OR
        (model_id IS NULL AND photobook_theme_id IS NOT NULL)
      );
  END IF;
END $$;

-- B1d — Índice para feedback.photobook_theme_id
CREATE INDEX IF NOT EXISTS feedback_photobook_theme_id_idx
  ON feedback (photobook_theme_id);

-- B2 — site_config: banner superior + modal de promociones
CREATE TABLE IF NOT EXISTS site_config (
  key                TEXT PRIMARY KEY,
  value              JSONB NOT NULL,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by_user_id BIGINT REFERENCES users(id)
);

-- B3 — rush_fee_rules: cobro por urgencia configurable desde admin
CREATE TABLE IF NOT EXISTS rush_fee_rules (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label          TEXT NOT NULL,
  days_threshold INT  NOT NULL CHECK (days_threshold > 0),
  fee_cents      BIGINT NOT NULL CHECK (fee_cents >= 0),
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);