BEGIN;

CREATE TABLE IF NOT EXISTS custom_photobook_request_reference_slots (
  request_id BIGINT NOT NULL,
  asset_id BIGINT NOT NULL,
  surface TEXT NOT NULL CHECK (surface IN ('FRONT_COVER', 'BACK_COVER')),
  slot_index SMALLINT NOT NULL CHECK (slot_index IN (1, 2)),
  PRIMARY KEY (request_id, surface, slot_index),
  UNIQUE (request_id, asset_id),
  CONSTRAINT custom_photobook_reference_slots_request_asset_fk
    FOREIGN KEY (request_id, asset_id)
    REFERENCES custom_photobook_request_reference_assets(request_id, asset_id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS custom_photobook_request_reference_slots_request_asset_idx
  ON custom_photobook_request_reference_slots(request_id, asset_id);

COMMIT;
