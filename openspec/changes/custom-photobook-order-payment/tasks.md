# Tasks: Custom Photobook Order and Payment Lifecycle

## Database and domain
- [x] Add `CONFIGURING_PHOTOBOOK` to order status enum in schema and additive migration.
- [x] Extend order domain port/repository/entity mapping to support configuration-order creation and activation with updated customer/amount data.
- [x] Add backend tests for idempotent configuration-order creation, activation, and payment status approval.

## Backend photobook/payment flow
- [x] Create the linked configuration order when custom covers are approved.
- [x] Persist final custom-editor form/delivery data, calculate trusted price, confirm the project, activate its linked order, and return a payment link.
- [x] Generalize project-to-order conversion for both pre-created custom orders and standard projects.
- [x] Advance an approved voucher to `PAYMENT_VERIFIED` through the order status machine.
- [x] Preserve request/editor idempotency and production PDF generation.

## Frontend and administration
- [x] Redirect a successfully finalized custom editor to the shared payment page.
- [x] Update final-state copy and error handling for payment handoff.
- [x] Render configuration status and custom order context in the admin Orders list/detail as needed.
- [x] Preserve existing frontend regression coverage for the custom editor data lifecycle; production build covers the payment-handoff integration.

## Verification
- [x] Run focused RED/GREEN tests while implementing each work unit.
- [x] Run backend Jest/build, frontend Vitest/build, and `git diff --check`.
- [x] Review the scoped diff for data safety, status transitions, public-link idempotency, and fulfillment routing.
