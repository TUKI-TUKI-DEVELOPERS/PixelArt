# Review Ledger — Custom Photobook Order and Payment

## Scope note
The worktree already contained extensive uncommitted photobook changes before this change. The scoped review focused on the order/payment lifecycle additions and verification evidence, not attribution of unrelated prior diff lines.

## Risk
- **Checked:** custom cover approval creates one configuration order; finalization activates the same unique project-linked order; no payment link exists for the zero-value configuration state.
- **Result:** no confirmed defect. Repository retries a concurrent unique-project insertion by re-reading the existing order.

## Resilience
- **Checked:** finalization validates server-side pages, explicit format, contact/delivery fields, and trusted price; order activation and payment-link creation are retry-safe.
- **Result:** no confirmed defect. A failed activation leaves the persisted editor/project state retryable; existing payment links are reused.

## Readability
- **Checked:** status names and transitions are explicit in domain service, schema, admin list/detail, and OpenSpec artifacts.
- **Result:** no confirmed defect. `CONFIGURING_PHOTOBOOK` clarifies the pre-price order stage.

## Reliability
- **Checked:** additive enum migration was backed up and applied; backend tests/build, frontend tests/build, and diff whitespace check pass.
- **Result:** no confirmed defect. Legacy request #3 was safely returned to its preserved editor final step so it can enter the new payment lifecycle.

## Follow-up risk
- The combined worktree diff is well above normal review size due to earlier uncommitted work. No commit or PR was created; a future review should use this change's OpenSpec artifacts and logical work units rather than reviewing all accumulated changes as one patch.
