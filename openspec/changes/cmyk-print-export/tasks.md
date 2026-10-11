# CMYK Print Export and Split Book PDFs — Tasks

Implementation is a sequence of bounded review slices, each targeting no more than 300 changed lines. These boundaries are planning only—not permission to commit, push, create PRs, or deploy. Preserve existing generated PDFs, source assets, customer projects, and wraps. No migration, seeder change, deployment, printer transmission, guessed resolution gate, or upscaling is in scope.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 450–700 total; 180–280 per slice |
| 400-line budget risk | High overall; Low per slice |
| Chained PRs recommended | Yes (forecast only; not authorization) |
| Suggested split | Slice 1 → Slice 2 → Slice 3 → Slice 4 → Slice 5 |
| Delivery strategy | user-controlled; no commit/PR without explicit approval |
| Chain strategy | deferred until explicit owner approval |

Decision needed before current apply: No (Slice 1 only)
Chained PRs recommended: Yes (forecast only; not authorization)
Chain strategy: deferred until explicit owner approval
400-line budget risk: High overall; each review slice targets <=300 changed lines.

## Tasks

### Slice 1 — Personalized-book standard RGB pair and source-failure feedback (estimate: 230–300 changed lines)

- [x] **1. RED — Composition and source-failure tests.** Verify covers contain exactly front then back, interior excludes covers and preserves order, missing cover/interior sources fail, and no confirmed print rows cannot report a successful generation. Evidence: regressions fail before the corresponding guards.
- [x] **2. GREEN — Render, store, and surface errors.** Produce immutable generation-scoped covers/interior PDFs; abort on any required source download/optimization failure or an empty confirmed-source set with a safe actionable Spanish message. Await generation in the API and display failures inline in admin. Keep the existing render key pointing to covers and publish it only after both uploads succeed; preserve legacy/prior files. Evidence: 8 focused tests (including fail-closed source, empty-source, and sanitized-log regressions), pointer atomicity tests, API build, TSX syntax check, diff checks, and final reliability review with no findings.

### Slice 2 — Photobook standard RGB pair (estimate: 200–280 changed lines)

- [x] **3. RED — Composition tests.** In themed/custom photobook renderer tests, verify standalone front/back covers in order, ordered interior-only pages, missing-cover failure, no spine/wrap behavior, and legacy output preservation. Evidence: original composition regressions failed because `composeDocuments` was absent; final suite verifies themed and custom cover ordering, interior order/exclusion, missing-cover rejection, and wrap/spine-independent behavior.
- [x] **4. GREEN — Render and store pair.** Update photobook renderer and standard-generation/storage implementation to use standalone cover sources and immutable generation-scoped pair storage. Stop consulting wrap/spine inputs; update pointer only after both uploads; preserve existing wraps and files. Evidence: focused tests pass for custom linked-request source resolution and front/back ordering, immutable sibling paths, and second-upload failure without pointer update; no migration/seeder change.

### Slice 3 — CMYK converter and API runtime (estimate: 190–280 changed lines)

- [x] **5. RED — Converter tests.** Add tests for ICC resolution, Ghostscript argument array/no-shell invocation, timeout/nonzero exit, missing profile, invalid output, cleanup, and no RGB fallback. Evidence: tests fail before service exists.
- [x] **6. GREEN — Complete-PDF converter.** Added shared converter and unaltered documented APTEC profile at `backend/api/resources/icc/APTEC_Offset_Coated_LinearCTV_2025.icc`. Uses `PRINT_PDF_ICC_PROFILE_PATH`, isolated temp files, Ghostscript argv/no shell with 120-second timeout, output validation, guaranteed cleanup, and no RGB/profile fallback. Verified SHA-256, size, source/license, and reference-condition caveat in `resources/icc/README.md`.
- [x] **7. GREEN — Runtime dependency.** Update `backend/api/Dockerfile` and `backend/api/Dockerfile.prod` to install Ghostscript. Evidence: both images build and expose the expected executable; no deployment.

### Slice 4 — Authenticated CMYK API integration (estimate: 180–270 changed lines)

- [x] **8. RED — Route/use-case tests.** Add personalized-book and photobook tests for covers/interior actions, existing admin authorization, attachment metadata, active-profile conversion, and unchanged standard keys/source assets. Evidence: tests fail before routes are added.
- [x] **9. GREEN — CMYK download endpoints.** Add separate authenticated covers/interior CMYK downloads for both product types using the same composition helpers and converter. Return appropriately named PDF attachments; do not persist CMYK files, mutate standard pointers/assets, or send to printers. Evidence: task 8 tests pass for all four actions.

### Slice 5 — Admin UI and integrated verification (estimate: 180–280 changed lines)

- [x] **10. RED — UI/API contract tests.** Extend admin order and photobook detail tests for grouped Standard RGB and Print CMYK controls, separate covers/interior actions, and explicit legacy combined-file labeling. Evidence: tests fail before controls/API contract are updated.
- [x] **11. GREEN — Admin controls.** Update existing admin detail components and response types to expose standard and CMYK covers/interior downloads; label legacy combined files and do not expose stale wrap URLs as new output. Evidence: task 10 tests pass.
- [x] **12. TRIANGULATE — Integration validation.** Add/run an API-container integration check with representative outputs; verify page counts/dimensions, configured profile, and CMYK conversion of raster and vector content. Compare visually with RGB; do not gate on resolution. Evidence: real `CmykPdfConverterService` conversion in an isolated API image produced valid PDFs for both representative inputs; page counts and all page geometry/box dimensions matched, configured APTEC profile checksum verified, missing-profile runtime error was clear, and RGB/CMYK previews showed no visible layout/content loss. No resolution cutoff was applied. Residual considerations: custom-book page 3 Poppler text extraction changed 180→174 non-whitespace characters despite retained font and no visible loss; PDFs contain DeviceCMYK but no `/OutputIntents` or `/ICCBased` markers. These are documented considerations, not requirements.
- [x] **13. REFACTOR — Cross-cutting checks.** Consolidate helpers without changing contracts; run applicable backend Jest/build, frontend Vitest/build, and `git diff --check`. Confirm access control, atomicity, legacy/source preservation, no migration/seeder changes, no guessed resolution gate, and slice boundaries remain under 300 changed lines each. Evidence: checks pass.
