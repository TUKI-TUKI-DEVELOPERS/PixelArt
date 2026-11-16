# Review ledger: targeted-promotion-codes

## Reliability review

| ID | Lens | Location | Severity | Status | Evidence |
|---|---|---|---|---|---|
| R3-001 | reliability | `explore.md` — promotion schema paragraph | WARNING | info | Repository code reads, deletes, and inserts `promotion_targets`; the inspected seed block does not establish where the table is created. The exploration now distinguishes verified repository use from unverified DDL location. |
| R3-002 | reliability | `explore.md` — checkout integration section | WARNING | info | The checkout endpoints/use case found do not establish shared coverage across all requested product types. The exploration now says so explicitly. |

## Review outcome

No BLOCKER or CRITICAL findings. Both warnings are informational and do not schedule a fix or re-review. Checkout/payment paths across all product types and the table DDL location remain unverified in the exploration artifact.

## Proposal risk review

- **Lens:** risk
- **Target:** `proposal.md`
- **Result:** No findings. The proposal preserves the confirmed rules and leaves checkout ownership, pricing snapshots, target resolution, and race-safe schedule enforcement as design requirements.
