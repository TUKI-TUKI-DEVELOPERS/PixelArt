# Exploration: targeted-promotion-codes

## Context and confirmed product rules

Replace automatic/global promotions with customer-entered codes. Admin defines code text, percentage, validity window, and eligible products. Eligibility may span multiple categories and specific products or all products in a selected category; custom-cover photobooks are eligible as an entire category. Customers enter the code before payment. A product must never receive two discounts at once.

## Current architecture and behavior

- `backend/api/src/promotions/domain/promotion.ts` defines `TargetType` as `model | models | category | all`, and `DiscountType` as `percent | fixed_cents`. `Promotion.applyTo()` applies either percentage or fixed-cent reduction.
- `backend/api/src/promotions/promotion.service.ts` exposes active/all lookup and CRUD through the repository. It validates date ordering and positive discount values; percentages are capped at 100.
- `backend/api/src/promotions/promotion-admin.controller.ts` provides `GET/POST /admin/promotions`, `PUT/DELETE /admin/promotions/:id`. `backend/api/src/promotions/promotion.controller.ts` exposes `GET /promotions/active`.
- `backend/api/src/promotions/infrastructure/persistence/entities/promotion.orm-entity.ts` persists label, target type/id, discount type/value, validity, active state, and timestamps. `typeorm-promotion.repository.ts` looks up currently valid active promotions and stores selected IDs in `promotion_targets`, whose rows reference `catalog_book_id`.
- `backend/api/src/database/seed.ts` creates `promotions` with target-type constraint `model | category | all`; this conflicts with the TypeScript `models` option. The repository reads, deletes, and inserts rows in `promotion_targets` (`typeorm-promotion.repository.ts`), but the inspected seed block does not establish where that table is created.
- `frontend/web/src/app/admin/promociones/page.tsx` fetches catalog books and manages promotion CRUD. `getConflicts()` checks selected book IDs against active/upcoming promotions. Saving can prompt the admin to confirm replacement, then deactivate conflicting promotions through separate PUT requests before saving. This is client-side workflow behavior, not atomic or backend-enforced conflict prevention.
- `frontend/web/src/components/catalog/ProductGrid.tsx` was identified in the supplied CodeGraph map as automatically applying `applyBestPromo` to displayed catalog-book prices. This does not establish checkout pricing behavior.

## Target fit and checkout integration

The current model can represent catalog books and selected book IDs, but `promotion_targets` specifically maps to catalog books. It does not establish a general product identity across personalized books, standard photobooks, and custom-cover photobooks. Requested category-level and photobook-category targeting therefore needs product/category resolution beyond the current book-ID mapping.

Repository search found checkout endpoints and a submission use case, but this does not establish that one checkout flow covers all requested product types:
- `backend/api/src/checkout/checkout-public.controller.ts` exposes checkout info and submission routes.
- `backend/api/src/checkout/application/use-cases/submit-checkout.use-case.ts` reloads the order and uses its updated `totalAmountCents`; `orders/infrastructure/persistence/repositories/typeorm-order.repository.ts` calculates order totals.
- `backend/api/src/database/seed.ts` includes an order-total check based on base amount, rush fee, and extra-template amount.
- Photobook pricing has a separate calculation in `backend/api/src/photobook/domain/services/photobook-pricing.service.ts`, whose comments identify it as the price source of truth; projects persist `calculated_total_cents`.

The concrete creation/payment paths and whether all three product types share these totals were not fully verified. No inspected evidence establishes coupon validation during checkout or an order snapshot of promotion/code details.

## Gaps and questions for proposal/spec/design

1. Where should a code be validated and applied for each purchase flow, and which component owns the final payable total?
2. How should eligibility map catalog books, personalized products, standard photobooks, and custom-cover photobooks into a common product/category identity?
3. How is no-stacking enforced atomically when active codes or eligible promotions overlap? Current admin replacement behavior is insufficient.
4. For mixed eligible/ineligible products or already-discounted lines, is the code applied only to eligible lines or rejected? This was not specified.
5. Is validity evaluated at code entry, order creation, or payment completion? Current promotions are filtered by current time during active lookup, but coupon redemption timing is unverified.
6. What code uniqueness/case-normalization policy, invalid-code response, and order/payment price snapshot are required? These remain open.
7. Admin selection needs a product/category source that includes photobook categories; the current UI only loads catalog books.

## Evidence boundaries

Inspected promotion domain, service, controller, ORM entity, repository, admin page, seed schema, checkout use case, order repository/entity, and photobook pricing service. Payment-provider integration, complete product creation paths, and all order persistence details were not fully traced.
