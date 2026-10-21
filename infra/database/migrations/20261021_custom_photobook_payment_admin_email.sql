-- Email events queued when a customer uploads a payment proof for a manually
-- priced custom photobook. Without these enum values the voucher upload
-- returns HTTP 500 after the proof is saved and no email is sent.
ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'CUSTOM_PHOTOBOOK_PAYMENT_TO_ADMIN';
ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'CUSTOM_PHOTOBOOK_PAYMENT_RECEIVED_TO_CUSTOMER';
