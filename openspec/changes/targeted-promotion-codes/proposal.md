# Proposal: targeted promotion codes

## Executive summary

Replace automatic/global catalog promotions with customer-entered percentage codes that apply only to explicitly eligible, undiscounted product lines. The first version supports exact, case-sensitive codes; an admin-defined validity period; category and product targeting; and one code per purchase. This improves customer understanding and gives administrators deliberate control over where discounts apply, without stacking discounts or discounting the separate custom-cover surcharge.

No products currently have active promotions, so this change requires no active-discount migration. Architecture for product identity, checkout ownership, persistence, and discount snapshots remains for design to resolve; this proposal does not assume a shared checkout path across all product types.

## User problem and intended outcome

Customers currently encounter automatic promotions whose eligibility may be difficult to understand at purchase time. Administrators need a clear way to communicate a promotion and control its audience. With this change, a customer enters a known code and can understand which eligible lines receive a discount; administrators can schedule targeted offers without overlapping promotion windows for the same product.

## Scope

- Replace automatic/global customer-facing promotions with explicit code entry.
- Let an administrator configure the exact code, percentage, validity period, and eligible targets.
- Allow multiple selected categories. For personalized books and standard photobooks, support selecting specific products or all products within each selected category. Treat custom-cover photobooks as one whole eligible category.
- Apply a single valid code at order creation to eligible product lines that have no other promotion. Skip already-promoted lines; reject/no-op when no eligible undiscounted line remains.
- Preserve the applied discount and payable amount through payment even when the promotion expires after order creation.
- Block scheduling overlapping valid periods for the same product, including conflicts where a category-wide target includes that product.

## Business rules

| Rule | Decision |
|---|---|
| Code matching | Case-sensitive exact match; customers must enter the exact capitalization. |
| Discount | Percentage only; administrator supplies the percentage. |
| Code count | At most one code per purchase. |
| Targeting | Multiple categories may be selected; personalized-book and standard-photobook categories allow specific products or all products; custom-cover photobooks are targeted as a whole category. |
| Stacking | Never stack. Skip a line covered by another promotion; do not apply if no eligible, undiscounted line remains. |
| Schedule conflict | A promotion cannot be scheduled with an overlapping validity period when its product target overlaps another promotion's target, including category-wide targets. |
| Validity and payment | Validate at order creation. Keep the discount and payable amount fixed through payment, even if the code expires afterward. |
| Custom-cover surcharge | The approximately S/ 20 surcharge is separate, explained via WhatsApp, and excluded from percentage calculations. |
| Campaign naming | No separate internal campaign-name field in the first version; identify the promotion by its code. |
| Migration | No active discounts exist, therefore no active discount migration is required. |

## Affected areas

- **Promotion domain and persistence:** current targets map catalog-book IDs and do not directly model all requested product categories. The current seed block does not establish the DDL source for `promotion_targets`; schema ownership must be verified during design.
- **Admin promotion management:** current conflict checks and replacement/deactivation flow are frontend-driven and non-atomic. The new schedule rule needs authoritative enforcement, with target selection spanning the required product types.
- **Customer pricing and checkout:** exploration found automatic catalog display pricing, but that does not prove checkout behavior. Checkout/order paths and pricing sources differ or are not fully traced; design must identify each applicable purchase flow and its final payable-total owner.
- **Order/payment persistence:** no inspected evidence establishes promotion validation at order creation or a durable discount snapshot. Preserve the agreed amount through payment while resolving the appropriate persistence boundary.
- **Customer-facing code entry and feedback:** introduce code entry and explain applicability/invalid or inapplicable outcomes without implying that excluded lines were discounted.

The exploration is the bounded source of current-state evidence. It does not establish that all product types share a checkout path.

## Non-goals

- Fixed-amount discounts, automatic/global discounts, or multiple codes per purchase.
- A separate internal campaign-name field.
- Discounting custom-cover surcharges.
- Migrating active discounts (none exist).
- Redesigning custom-photobook cover approval, editorial preparation, projects, covers, requests, or uploaded assets.
- Creating a parallel payment system; existing payment workflows should be reused where applicable, consistent with project standards.

## Remaining decision gaps for design

1. Identify concrete order-creation and payment paths for each eligible product type, and establish who owns the final payable amount in each. Do not assume one shared flow.
2. Define a product/category identity and resolution strategy spanning personalized books, standard photobooks, and custom-cover photobooks, including how category-wide targets resolve to products for overlap checks.
3. Select the authoritative persistence location and representation for configured targets, applied code/discount, and order payable-amount snapshot; verify current `promotion_targets` DDL and schema authority.
4. Specify how schedule-overlap enforcement is made race-safe and authoritative across concurrent admin changes, including the interval boundary convention.
5. Define customer-facing validation outcomes and behavior when a code is valid but only some lines qualify, while preserving the agreed skip/no-eligible-line rules.
6. Confirm percentage rounding and centavo calculation semantics for mixed eligible lines and totals.

These are architecture/product-detail questions, not changes to the confirmed rules above.

## Risks and mitigations

| Risk | Mitigation / design requirement |
|---|---|
| A code discounts an unintended product or surcharge | Resolve explicit eligible lines and keep custom-cover surcharge outside the percentage base. |
| Concurrent schedules introduce conflicting promotions | Enforce overlap as an authoritative backend invariant, not a UI-only check; design race-safe persistence/transaction strategy. |
| Expiration or later edits change an in-flight payment | Snapshot applied discount and payable amount at order creation and use that snapshot through payment. |
| Product types use different pricing/checkout paths | Trace each flow before implementation; integrate independently where necessary rather than assuming shared ownership. |
| Eligibility mismatch due to incomplete category mapping | Establish canonical target resolution and cover category-wide targets in conflict detection. |
| Existing automatic display behavior conflicts with code entry | Replace automatic customer-facing application consistently, while verifying catalog display and checkout separately. |

## Rollback

Because there are no active promotions, rollout can be reversed without restoring migrated active discounts. If the new flow causes pricing or payment discrepancies, disable code acceptance and revert customer-facing promotion application while preserving already-created orders' stored payable amounts and discount snapshots. Do not recalculate in-flight orders from current promotion state. Any schema rollback must be additive/reversible and must not delete order snapshots or customer data; exact migration steps are for design.

## Success criteria

- Customers can enter an exact, case-sensitive code and receive the percentage reduction only on eligible, otherwise-undiscounted product lines.
- Ineligible or already-promoted lines remain undiscounted; a code does not apply when no eligible undiscounted line remains; no purchase receives more than one code.
- Administrators can target the agreed product/category combinations and cannot schedule overlapping valid periods for the same product, including category-wide conflicts.
- The custom-cover surcharge is excluded from percentage calculations.
- A code is validated at order creation and the resulting discount/payable amount remains stable throughout payment after expiry.
- Automatic/global promotion application is no longer the customer-facing behavior, and all supported purchase paths have verified consistent rules.

## Proposal question round

Completed before this proposal. The user confirmed the business rules captured above; no answered product questions are reopened here.
