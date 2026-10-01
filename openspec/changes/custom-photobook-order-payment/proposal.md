# Custom Photobook Order and Payment Lifecycle

## Problem
A customer can complete a custom photobook editor but the result remains only in the custom-photobook workspace. No shared order is created for payment, fulfillment, payment review, production tracking, or delivery. The editor also lacks the existing QR/voucher payment handoff.

## Outcome
Create a linked `PHOTOBOOK` order as soon as the customer approves both covers. It remains a configuration draft while the editor is incomplete. When the customer finishes the editor and mandatory delivery form, synchronize the project, calculate the server-side price, activate the order for payment, and redirect the customer to the existing QR/voucher page. The normal Orders dashboard becomes the source of truth for payment review and fulfillment.

## Confirmed product rules
- Cover approval creates the order and preserves its link to the custom request through the photobook project.
- The order starts as `CONFIGURING_PHOTOBOOK`, not payable, because format, rush option, pages, and delivery information are not known yet.
- Editor completion converts it to `AWAITING_PAYMENT_PROOF`, issues/reuses a `PAYMENT_UPLOAD` public link, and opens `/pagar/[token]`.
- Payment uses the existing Yape QR and voucher upload flow. Admin approval moves the order to `PAYMENT_VERIFIED`.
- Fulfillment follows existing statuses: `PAYMENT_VERIFIED → IN_PRODUCTION → SHIPPED → DELIVERED`.
- The custom request remains the editorial history; Orders owns payment and fulfillment.

## Non-goals
- Do not create a second payment system, checkout, or duplicate project/order.
- Do not migrate or reset existing customer content automatically.
- Do not alter catalog/custom-book order behavior except the shared payment approval transition bug.
