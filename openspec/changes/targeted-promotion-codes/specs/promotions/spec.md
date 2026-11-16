# Promotions Specification

## Purpose

Define customer-entered percentage promotion codes and their eligibility, scheduling, and order-time pricing behavior.

## Requirements

### Requirement: Promotion code definition and eligibility

The system MUST allow an administrator to define a promotion by a unique code, percentage, validity period, and eligible target selection. Codes MUST be matched exactly and case-sensitively. A target selection MUST support multiple categories, specific products or all products within personalized-book and standard-photobook categories, and the custom-cover photobook category as a whole. A separate internal campaign name is not required.

#### Scenario: Configure targeted promotion

- GIVEN an administrator defines a code, percentage, validity period, and one or more supported targets
- WHEN the promotion is saved
- THEN the promotion is identified by its code and those targets determine eligible products

#### Scenario: Match code capitalization

- GIVEN an active promotion code is `SUMMER10`
- WHEN a customer enters `summer10`
- THEN the code MUST NOT match

### Requirement: Single-code percentage discount without stacking

A purchase MUST accept at most one promotion code. The code MUST apply a percentage discount only to eligible product lines that are not already covered by another promotion. Products already under another promotion MUST be skipped, and the code MUST NOT be applied if no eligible, undiscounted product line remains. The custom-cover surcharge, approximately S/ 20, MUST be excluded from the discount calculation.

#### Scenario: Apply code to eligible lines only

- GIVEN a purchase contains eligible undiscounted lines, an ineligible line, and a line already under another promotion
- WHEN the customer applies a valid code
- THEN only eligible undiscounted lines receive the percentage discount, while the other lines remain unchanged

#### Scenario: No eligible undiscounted line

- GIVEN every line is ineligible or already covered by another promotion
- WHEN the customer applies a valid code
- THEN no discount is applied

#### Scenario: Exclude custom-cover surcharge

- GIVEN an eligible custom-cover photobook has a separate custom-cover surcharge
- WHEN a percentage code is applied
- THEN the percentage calculation excludes that surcharge

#### Scenario: Reject second code

- GIVEN a purchase already has a promotion code applied
- WHEN another code is submitted for that purchase
- THEN the purchase MUST NOT receive a second code

### Requirement: Validity and order pricing stability

The system MUST validate a promotion code's validity when the order is created. Once created, the order's applied discount and payable amount MUST remain unchanged through payment, including when the promotion expires after order creation.

#### Scenario: Code expires during payment

- GIVEN a valid code is applied when an order is created
- WHEN the code expires before payment completes
- THEN the order retains the discount and payable amount established at creation

#### Scenario: Code is not yet valid at order creation

- GIVEN the promotion's validity period has not started
- WHEN a customer attempts to create an order using the code
- THEN the promotion discount MUST NOT be applied to the order

#### Scenario: Code has expired before order creation

- GIVEN the promotion's validity period has ended
- WHEN a customer attempts to create an order using the code
- THEN the promotion discount MUST NOT be applied to the order

### Requirement: Prevent overlapping promotion schedules

The system MUST prevent scheduling promotions whose validity periods overlap and whose resolved product targets overlap. This MUST account for product-specific and category-wide targets, including a category-wide target that includes a specifically targeted product.

#### Scenario: Overlapping target schedules

- GIVEN an existing promotion targets a product during a validity period
- WHEN an administrator schedules another promotion for an overlapping period whose category-wide or product-specific target includes that product
- THEN the new schedule MUST be blocked

#### Scenario: Non-overlapping schedules

- GIVEN two promotions target the same product during non-overlapping validity periods
- WHEN the second promotion is scheduled
- THEN the schedule MUST NOT be blocked on the basis of product-target overlap

### Requirement: Replace automatic customer-facing promotions

The system MUST use explicit customer-entered codes instead of automatically applying global promotions to customer-facing product prices or purchases.

#### Scenario: Customer views or purchases products without a code

- GIVEN no promotion code has been entered
- WHEN a customer views products or creates a purchase
- THEN no promotion discount is automatically applied
