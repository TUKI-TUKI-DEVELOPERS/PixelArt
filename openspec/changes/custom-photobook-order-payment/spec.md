# Specification: Custom Photobook Orders and Payment

## Requirements

### R1 — Linked configuration order on cover approval
When a customer approves a front and back cover for a custom photobook request, the system SHALL create exactly one `PHOTOBOOK` order linked to the request's `photobook_project_id`.

- The operation SHALL be idempotent when approval is retried.
- The new order SHALL contain the request customer's name, email, and phone.
- The order SHALL use `CONFIGURING_PHOTOBOOK` with zero amount until the editor is completed.
- No payment-upload public link SHALL be issued at this stage.

### R2 — Finalize editor, sync project, and activate payment
When the authenticated custom editor is finalized, the system SHALL:

- Require a valid explicitly selected format and a photo in every configured page.
- Require name, email, phone, address, district, city, region, and department in the submitted state.
- Persist the customer and delivery fields, cover type, page count, rush option, draft state, calculated total, and confirmed project status.
- Calculate price on the server using the existing photobook pricing service; client totals are untrusted.
- Update the pre-created order's customer information and exact total.
- Move the order from `CONFIGURING_PHOTOBOOK` to `AWAITING_PAYMENT_PROOF`.
- Generate or reuse a seven-day `PAYMENT_UPLOAD` link and return its public payment URL.
- Keep the operation idempotent for retries: no second order, no duplicate active payment link, and no duplicate production pages.

### R3 — Customer payment handoff
After custom editor finalization succeeds, the frontend SHALL navigate to the returned `/pagar/[token]` route.

- The page SHALL show the existing Yape QR, final calculated price, voucher upload, and confirmation behavior.
- The custom editor SHALL no longer claim that production is complete before payment is validated.

### R4 — Payment review and fulfillment
- Voucher upload SHALL move the order from `AWAITING_PAYMENT_PROOF` to `UNDER_PAYMENT_REVIEW`.
- Administrative payment approval SHALL move it to `PAYMENT_VERIFIED` and create a status event.
- Standard admin transitions SHALL then permit `IN_PRODUCTION`, `SHIPPED`, and `DELIVERED`.
- The orders list/detail SHALL label `CONFIGURING_PHOTOBOOK` clearly and display custom-photobook production downloads once the project has been finalized.

### R5 — Existing data and links
- Existing requests and projects without an order SHALL remain usable.
- Legacy links and existing orders SHALL remain valid.
- A migration SHALL add the new order-status enum value without changing or deleting existing rows.
