# Apply Progress

## Implemented
- Added `CONFIGURING_PHOTOBOOK` and `AWAITING_PAYMENT` enum values in the authoritative schema and applied additive migration `20260930_custom_photobook_order_payment.sql` after a data-only backup of affected tables.
- Added idempotent configuration-order creation and activation operations to the order port, repository, and service.
- Created/reused a configuration order after custom cover approval.
- Final custom editor submission now validates delivery data server-side, persists project/customer/pricing state, activates the shared order, returns a payment link, and keeps production artifacts retryable.
- Redirected the custom editor to the existing QR/voucher payment route.
- Added payment-pending/production handoff to custom request state and exposed custom delivery data in the admin order detail.
- Preserved existing request #3 content and returned it to editor completion so it can enter the new payment flow.

## Migration receipt
- Backup: `/tmp/pixelart-custom-order-payment-20260930190255.sql`
- Migration applied successfully without volume reset or data deletion.
