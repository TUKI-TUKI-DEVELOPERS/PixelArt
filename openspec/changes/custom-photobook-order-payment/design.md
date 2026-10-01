# Design: Custom Photobook Order and Payment Lifecycle

## Lifecycle

```text
cover approval
  → create project + CONFIGURING_PHOTOBOOK order
  → editor format/photos/delivery
  → finalize editor atomically persists project and activates order
  → AWAITING_PAYMENT_PROOF + /pagar/[token]
  → voucher: UNDER_PAYMENT_REVIEW
  → admin approval: PAYMENT_VERIFIED
  → IN_PRODUCTION → SHIPPED → DELIVERED
```

## Persistence

1. Add `CONFIGURING_PHOTOBOOK` to `order_status` through an additive migration and `schemaPixelart.sql`.
2. Reuse the existing unique `orders.photobook_project_id` relationship. It makes cover-approval order creation idempotent and leaves the custom request connected through `linked_photobook_project_id`.
3. Extend the order port/repository with an update operation that atomically replaces customer values and money fields while moving an order from `CONFIGURING_PHOTOBOOK` to `AWAITING_PAYMENT_PROOF`.
4. Add an order status event when the custom order is activated.
5. Persist the custom editor's contact/delivery fields and server-calculated values in `photobook_projects`, matching the standard photobook project representation.

## Backend orchestration

- `approveCustomCover()` creates/reuses the project and creates/reuses its configuration order in the same transaction. It does not expose payment yet.
- `finalizeCustomEditor()` validates page completeness and contact/delivery fields, writes pages/assets/project data, marks the project confirmed, activates its order, and obtains a reusable active payment link.
- The existing project-to-order function is generalized to activate an already-linked configuration order, while preserving its existing behavior for a normal confirmed photobook project that has no order.
- `PaymentsService.reviewPayment()` uses the status machine to move a successfully approved voucher to `PAYMENT_VERIFIED`; this closes the current gap where approval leaves the order under payment review.

## Frontend

- Custom finalization receives `paymentLink` from the backend and redirects to the shared payment page.
- The final custom-editor copy describes payment handoff instead of production completion.
- Admin Orders renders the configuration status and uses existing PHOTOBOOK project download logic after payment/production eligibility.

## Safety and recovery

- No order is generated twice because `photobook_project_id` is unique and creation/activation is guarded transactionally.
- A retry returns the same active payment link when possible.
- Existing custom projects receive orders only when an explicit customer action (cover approval or editor finalization) reaches the new workflow; no bulk backfill is performed.
