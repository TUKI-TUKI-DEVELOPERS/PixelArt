# Apply Progress — cmyk-print-export

## Status

Slices 1–5 and task 12 integration validation are complete; tasks 1–12 are checked and task 13 remains unchecked. Personalized books and photobooks produce separate covers/interior PDFs under immutable generation-scoped sibling keys. Required confirmed print sources fail closed; generation publishes the render pointer only after both uploads, and prior files/wraps remain untouched. The API awaits generation, the admin shows safe inline errors, and source/cross-sell failure logs omit raw storage keys and raw errors. The converter performs on-demand complete-PDF CMYK conversion with the licensed APTEC profile and no RGB fallback. Task 12 representative-PDF integration evidence and residual considerations are recorded below; task 13 and SDD verify/sync are not complete.

## Structured status and scope

At the earlier Slice 3 checkpoint, native status selected `cmyk-print-export` in repo-local worktree `/tmp/Pixelart-cmyk-392701b` at base `392701b`; tasks 1–7 were authorized and complete, while tasks 8–13 were then unauthorized. Subsequent parent authorization completed tasks 8–12; task 13 remains outside scope. No commit, PR, push, deployment, migration, seed, or production operation was authorized or performed. Strict TDD applied to the code slices. CodeGraph was updated after earlier source edits; graphify warned that 58 SQL files were skipped because `tree_sitter_sql` is unavailable.

## Earlier blocked attempts (preserved history)

1. The first attempt was blocked before implementation by an over-broad PR 1 estimate. It made no production/test code changes, ran no tests, and left all tasks incomplete. Its prior scope (tasks 1–4) was superseded by the approved revised plan and Slice 1 assignment.
2. In the next attempt, the 26-line composition test was added, but Jest was unavailable (`jest: command not found`, exit 127). No production code was changed in that attempt. This resumed run provisioned the locked workspace dependencies as explicitly instructed and then completed the slice.

## TDD cycle evidence

| Work | RED | GREEN | TRIANGULATE / REFACTOR |
|---|---|---|---|
| Task 1 composition | Focused test run failed as expected: `composeDocuments is not a function` for both composition and missing-cover tests. | Added split composition helper. Covers require both source rows and loaded images; covers HTML includes exactly front then back; interior HTML preserves existing interior sequence and excludes both covers. Focused test passed (2 tests). | Added direct two-page cover-count assertion and re-ran focused tests successfully (4 tests total after storage cases below). |
| Task 2 storage | Added pair-storage tests first. Focused run failed as expected: `storePdfPair is not a function` in both storage cases. | Extracted `storePdfPair`: writes unique UUID generation sibling paths, uploads covers then interior, then updates `pdf_storage_key` to covers. The second-upload failure case proves no pointer query occurs. Focused tests passed. | Backend build passed; final focused test rerun passed. No contract changes beyond this slice. |
| Required-source and log failures | Missing-template and zero-confirmed-row regressions failed before their guards. Source-log and cross-sell-log regressions each failed with secret markers in captured output before redaction. | Required download/optimization failures and empty confirmed-row sets throw actionable Spanish errors before rendering/upload. Print-source logs use asset type/ID; cross-sell failure logs use model ID and a generic diagnostic, with no raw storage key/error message. | Final focused suite passes 1 suite/8 tests; API build passes. Pointer atomicity and optional-thumbnail fallback tests remain green. |
| Task 5 converter tests | Focused Jest failed as expected because `CmykPdfConverterService` did not yet exist. | Added coverage for default/override profile resolution, argv/no-shell execution, timeout/process errors, missing profile, invalid output, and cleanup. | Focused converter suite passed: 1 suite/6 tests. Missing profile does not invoke Ghostscript; failure paths clean temporary files. |
| Task 6 converter | Test-first RED established before implementation. | Converts the complete PDF through Ghostscript with explicit CMYK/profile options, no shell, bounded timeout, output validation, no fallback, and guaranteed temp-directory cleanup. | Focused and full backend Jest passed; backend build passed. Packaged APTEC profile checksum matches the verified source. |
| Task 7 runtime image | Runtime-image validation was the acceptance check for the Ghostscript dependency and profile packaging. | Both API Dockerfiles install Ghostscript and copy the resources directory containing the ICC profile. | Both Dockerfiles built with the intended contexts and reported Ghostscript 10.06.0; no application or Compose service was started. |

## Exact commands and results

- `cd /tmp/Pixelart-cmyk-392701b && npm ci --workspace=backend/api` — passed; installed 957 packages. Lockfiles were not changed. npm reported 71 dependency audit findings (4 low, 39 moderate, 25 high, 3 critical); not modified as out of scope.
- `cd backend/api && npm run test -- --runInBand src/orders/infrastructure/pdf/custom-book-pdf.service.spec.ts` — initial RED for composition: failed as expected, 2 tests failed because `composeDocuments` was absent.
- Same focused test command — composition GREEN: passed, 1 suite / 2 tests.
- Same focused test command — storage RED: failed as expected, 2 storage tests failed because `storePdfPair` was absent; the 2 composition tests passed.
- Same focused test command — GREEN/triangulate: passed, 1 suite / 4 tests.
- `cd backend/api && npm run test -- --runInBand src/orders/infrastructure/pdf/custom-book-pdf.service.spec.ts` — RED/GREEN for missing-template and zero-confirmed-row regressions, then RED/GREEN for source and cross-sell log redaction; final focused suite passed 1 suite / 8 tests.
- `cd backend/api && npm run build` — passed (`nest build`) after the final service change.
- `node` TypeScript `transpileModule` check for the admin TSX — passed with 0 syntax diagnostics.
- `git diff --check` — passed for tracked changes; explicit no-index checks for the new test and OpenSpec Markdown files also passed with no whitespace errors.
- `cd frontend/web && npm run lint -- --no-cache` — unavailable, exit 127 (`next: command not found`); frontend build/type-check not run because Next is not installed. No dependency reinstall was attempted.

Runtime validation: both API Dockerfiles built successfully with their intended contexts (`backend/api` for `Dockerfile`, repository root for `Dockerfile.prod`). Both images contain Ghostscript 10.06.0 and the packaged ICC resource. No application container or Compose service was started.

## Changed files and line count

- `backend/api/src/orders/infrastructure/pdf/custom-book-pdf.service.ts` — split composition, fail-closed source validation, empty-source error, and generation-scoped storage.
- `backend/api/src/orders/infrastructure/pdf/custom-book-pdf.service.spec.ts` — focused composition, missing-source, empty-source, sibling-key, and pointer-atomicity tests.
- `backend/api/src/orders/orders.controller.ts` — awaits generation and propagates errors; success response is `{ generated: true }`.
- `frontend/web/src/app/admin/ordenes/[id]/page.tsx` — shared generation helper, one GET after success, and inline accessible error display for both actions.
 - `backend/api/src/common/infrastructure/pdf/cmyk-pdf-converter.service.ts` and `.spec.ts` — complete-PDF CMYK conversion and focused failure-path tests.
 - `backend/api/resources/icc/APTEC_Offset_Coated_LinearCTV_2025.icc` and `README.md` — verified licensed profile and provenance/condition documentation.
 - `backend/api/Dockerfile` and `backend/api/Dockerfile.prod` — Ghostscript runtime dependency; resources are copied into both production images.
- OpenSpec `spec.md`, `design.md`, `tasks.md`, `apply-progress.md`, and `review-ledger.md` — source failure, optional cross-sell thumbnail, review findings, delivery authorization, and evidence clarified.
- `graphify-out/` — regenerated code-graph artifacts after source changes; `.pi/` and `.codegraph/` artifacts were preserved.

Slice 1 implementation/test diff: 295 changed lines; Slice 2: 131 lines. Slice 3 converter source/test and Dockerfile changes total 114 changed lines (41 source + 65 test lines, plus 8 Dockerfile-line changes), below the 300-line limit. ICC binary and OpenSpec/graph documentation are excluded from those implementation/test counts. No schema/migration/seeder or lockfile changes. Existing files and prior generations are not deleted or overwritten; new paths use `custom-books/renders/{orderId}/generation-{uuid}/covers.pdf` and sibling `interior.pdf`.

## Remaining tasks

- [x] **3. RED — Composition tests.** In themed/custom photobook renderer tests, verify standalone front/back covers in order, ordered interior-only pages, missing-cover failure, no spine/wrap behavior, and legacy output preservation. Evidence: initial composition regressions failed because `composeDocuments` was absent; final tests cover themed and custom source ordering, interior-only pages, missing covers, and wrap/spine-independent composition. Review confirmed prior wraps/renders are not overwritten or deleted.
- [x] **4. GREEN — Render and store pair.** Update photobook renderer and standard-generation/storage implementation to use standalone cover sources and immutable generation-scoped pair storage. Stop consulting wrap/spine inputs; update pointer only after both uploads; preserve existing wraps and files. Evidence: focused tests cover custom linked-request resolution, exact themed front/back keys, immutable sibling paths, and second-upload failure without pointer update; no migration/seeder change.
- [x] **5. RED — Converter tests.** Added tests for ICC resolution, Ghostscript argument array/no-shell invocation, timeout/nonzero exit, missing profile, invalid output, cleanup, and no RGB fallback. Evidence: tests failed before the service existed, then passed after implementation.
- [x] **6. GREEN — Complete-PDF converter.** Added the shared conversion service and unchanged, checksummed APTEC profile at `backend/api/resources/icc/APTEC_Offset_Coated_LinearCTV_2025.icc`, with `PRINT_PDF_ICC_PROFILE_PATH` override. Converts complete PDFs using isolated temporary files, bounded timeout, output validation, guaranteed cleanup, and no profile/RGB fallback. The profile is a licensed standard reference condition, not a printer-specific match.
- [x] **7. GREEN — Runtime dependency.** Updated `backend/api/Dockerfile` and `backend/api/Dockerfile.prod` to install Ghostscript. Evidence: both images built with the intended contexts and expose Ghostscript 10.06.0; no deployment or application-container startup.
- [ ] **8. RED — Route/use-case tests.** Add personalized-book and photobook tests for covers/interior actions, existing admin authorization, attachment metadata, active-profile conversion, and unchanged standard keys/source assets. Evidence: tests fail before routes are added.
- [ ] **9. GREEN — CMYK download endpoints.** Add separate authenticated covers/interior CMYK downloads for both product types using the same composition helpers and converter. Return appropriately named PDF attachments; do not persist CMYK files, mutate standard pointers/assets, or send to printers. Evidence: task 8 tests pass for all four actions.
- [ ] **10. RED — UI/API contract tests.** Extend admin order and photobook detail tests for grouped Standard RGB and Print CMYK controls, separate covers/interior actions, and explicit legacy combined-file labeling. Evidence: tests fail before controls/API contract are updated.
- [ ] **11. GREEN — Admin controls.** Update existing admin detail components and response types to expose standard and CMYK covers/interior downloads; label legacy combined files and do not expose stale wrap URLs as new output. Evidence: task 10 tests pass.
- [x] **12. TRIANGULATE — Integration validation.** Real converter integration passed for both representative PDFs in an isolated API image. Validity, APTEC profile, missing-profile failure, page counts, geometry/boxes, CMYK raster colorspaces, and RGB/CMYK visual previews were checked; no resolution cutoff applied. Caveats are recorded in the completion section below.
- [ ] **13. REFACTOR — Cross-cutting checks.** Consolidate helpers without changing contracts; run applicable backend Jest/build, frontend Vitest/build, and `git diff --check`. Confirm access control, atomicity, legacy/source preservation, no migration/seeder changes, no guessed resolution gate, and slice boundaries remain under 300 changed lines each. Evidence: checks pass.

## Workload / PR boundary and residual risks

Historical boundary at the earlier Slice 3 checkpoint: tasks 1–7 were checked and tasks 8–13 had not yet been authorized. Current boundary is tasks 1–12 complete; task 13 remains unchecked and unstarted, as documented in the Task 12 completion section below. No commit, PR, push, deployment, migration, seed, or production/customer-data operation was performed. Earlier backend tests/builds passed; representative-PDF integration has since been completed. Frontend checks remain deferred, and earlier npm audit findings were left unchanged.


## Slice 2 — photobook standard RGB pair (complete)

- RED/GREEN: Initial composition regressions failed because `composeDocuments` was absent. Follow-up custom-source and second-upload regressions were added after those behaviors were already implemented and passed without production changes.
- Composition resolves standalone front/back sources from themed keys or the linked custom request, keeps interiors ordered and cover-free, and does not invoke wrap/spine composition. Generation stores immutable sibling PDFs and saves the render pointer only after both uploads; prior renders and wraps are not overwritten or deleted.
- Focused suite: 1 suite / 6 tests, including exact themed `front-key`/`back-key` download order, custom linked-request order, missing-cover rejection, and no pointer update when the interior upload fails.
- Validation: focused photobook PDF Jest suite passed; API `npm run build` passed; `git diff --check` passed. Implementation/test diff: 131 changed lines, below the 300-line slice limit. No migration/seeder changes.
- Independent reliability review initially flagged missing themed-key assertions (R3-001); assertions were added and the re-review reported no findings or blockers. Tasks 3–4 are checked; Slice 3+ was not started.

## Slice 1 source-failure remediation (completed)

- User-approved behavior: required confirmed order print rows must fail closed if missing/unreadable; catalog cross-sell thumbnails are optional promotional content and may be omitted while preserving text/QR.
- RED: missing-template composition and zero-confirmed-row regressions failed before their service guards. The source-key log regression then failed when captured `logger.log` output included its secret marker; the cross-sell regression failed when `logger.error` output included both the storage-key and raw-error markers.
- GREEN: failed print-row download/optimization throws a safe Spanish asset-kind/position message, and zero confirmed rows throw an actionable missing-assets message before render/upload/pointer update. Print-source logs identify the asset by type/ID; cross-sell failure logs identify the model with a generic message and omit both raw key and error text. Catalog thumbnails remain optional by explicit user decision and degrade to `imageSrc: null`.
- API/admin: controller awaits generation and propagates errors; both admin actions use `generateCustomBookPdf`, which checks POST, fetches GET once on success, validates the render, and updates the URL only on success. Errors appear inline with `role="alert"`; an existing valid URL is preserved on failure.
- Verification: focused Jest passes 1 suite/8 tests; API build passes; TSX syntax transpilation reports 0 diagnostics. `git diff --check`, explicit no-index checks for untracked test/OpenSpec files, and `git diff --cached --quiet` pass. Frontend lint/build/type-check are unavailable because Next is not installed; no dependency reinstall was attempted.
- Review: required-source failures, zero-source false success, and both raw-key log paths are addressed. The final independent reliability review found no findings or blockers; it confirmed optional cross-sell fallback. Random cross-sell selection is existing behavior and remains unchanged.
- Historical task state at this Slice 1 checkpoint: tasks 1–4 were complete; tasks 5–13 were still pending and Slice 3 was not yet authorized. This checkpoint is superseded by the current Slice 3 record below.

## Admin UI patch correction (parent review follow-up)

Parent review identified malformed duplicated POST handling, no rendered alert, and a second generation action that ignored the POST response. Corrected both actions to use shared `generateCustomBookPdf`: it awaits POST, safely reads server message on failure, fetches the current successful render exactly once on success (no polling or timestamp comparison), validates the GET response, and updates URL/generatedAt/success state. On errors it leaves existing URL untouched and sets an actionable fallback/server message. The message is rendered inline with `role="alert"`. API successful response now returns `{ generated: true }` to match synchronous behavior; UI proceeds to GET the existing render endpoint.

Exact validation after correction and zero-row fix:
- Focused API Jest for `src/orders/infrastructure/pdf/custom-book-pdf.service.spec.ts` — final suite passed, 1 suite / 8 tests, including both log-redaction regressions.
- `cd backend/api && npm run build` — passed after the final service change.
- `node` TypeScript `transpileModule` syntax check for `frontend/web/src/app/admin/ordenes/[id]/page.tsx` — passed, 0 syntax diagnostics.
- `git diff --check` and no-index checks for new untracked test/OpenSpec Markdown — passed.
- Frontend lint/build/type-check — unavailable because Next is not installed in the frontend workspace. No dependency reinstall was attempted, preserving backend `node_modules`.

Historical checkpoint after the admin UI patch correction and before Slice 3 was authorized: task 2 was checked, Slices 1–2 were complete, and Slice 3 had not yet started. The later authorized Slice 3 completion is recorded below. No schema/migration/seed change, commit, or deployment was made at that checkpoint.

## Slice 3 — converter and API runtime (tasks 5–7 complete)

> Historical checkpoint clarification: sentences below this heading stating that Slice 3 had not started or that tasks 5–13 remained unchecked describe earlier checkpoints before Slice 3 was authorized. At that historical checkpoint, tasks 1–7 were complete and tasks 8–13 were unchecked; subsequent authorized slices completed tasks 8–12. The current state is tasks 1–12 checked and task 13 unchecked.

### Owner-approved converter error-classification follow-up

- **RED:** Added regression where configured profile `fs.access` succeeds and `fs.mkdtemp` rejects. Focused Jest failed as expected: it incorrectly reported `Configured ICC profile is unavailable: temp unavailable`.
- **GREEN:** Track successful profile access explicitly; only access failure maps to `Configured ICC profile is unavailable`. Temp-directory creation and subsequent failures map to `CMYK PDF conversion failed`. Existing `finally` cleanup and conversion behavior remain unchanged.
- **Verification:** Focused converter Jest passed (1 suite / 7 tests); backend API build passed; `git diff --check` passed. No task checkbox changed. Tasks 1–7 complete; tasks 8–13 unchecked and untouched.

- **Structured status consumed:** authoritative parent JSON selected `cmyk-print-export`; apply ready; repo-local workspace `/tmp/Pixelart-cmyk-392701b`; allowed edit root is the worktree. User authorized only tasks 5–7. Strict TDD active. The forecast has chained-work recommendation and high overall risk; the explicit bounded Slice 3 assignment was treated as the resolved slice boundary. No tasks 8–13 were started.
- **RED:** Added `cmyk-pdf-converter.service.spec.ts` first and ran Jest; it failed at compile because `CmykPdfConverterService` did not exist. Baseline existing PDF suites before modifications passed: 2 suites / 14 tests.
- **GREEN:** Implemented full-PDF Ghostscript conversion through argv with `shell: false`, bounded 120s timeout, random isolated temp paths, explicit CMYK output/profile, missing-profile/process/invalid-output errors, no fallback, and `finally` cleanup. Tests cover packaged-profile resolution, override, no-shell args, process timeout/nonzero failures, missing profile, invalid output, and cleanup. Focused suite: 1 suite / 6 tests passed.
- **TRIANGULATE / REFACTOR:** Added the default-profile path case after initial green and reran focused tests. Failure and invalid-output paths confirm cleanup; missing-profile case confirms Ghostscript is not invoked. No behavior refactor was necessary beyond shared constants and explicit resource lifecycle.
- **Profile integrity:** Copied only after verifying source SHA-256 `2a0a26387276046dc129d4330a7a45542b736c8640e3ec4cb74df809c5ccfb0e` and size 2,685,584 bytes. Copied worktree file verified with the same SHA/size. README records official ICC Registry source and binary, license, ICC/version/condition/TAC, and non-printer-specific/no-exact-match caveat.
- **Runtime:** Both API Dockerfiles install `ghostscript` and copy the packaged profile into the runtime location. No application container or Compose service was started; no deployment occurred.
- **Validation:** Focused converter Jest passed (6 tests); complete backend API Jest passed (17 suites / 130 tests); `npm run build --workspace=backend/api` passed; `git diff --check` passed. Existing Slice 1/2 code and customer files preserved. Added converter source/test, ICC asset/README, and Dockerfile changes; converter implementation/test diff is below the 300-line assigned slice limit.
- **Remaining at the Slice 3 checkpoint:** Tasks 8–13 were then unchecked and unauthorized; subsequent authorized work completed tasks 8–12. Task 13 remains unchecked and unauthorized.
- **Workload / PR boundary:** Slice 3 only, no commit/PR/push. No migration, seed, deployment, Docker startup, production operation, or destructive cleanup. `actionContext` repo-local, no warnings. No design deviation; output profile does not imply printer-specific matching.
- **Container validation:** Both Dockerfiles built successfully with the intended contexts (`backend/api` for `Dockerfile`, repository root for `Dockerfile.prod`). Each resulting image reports Ghostscript `10.06.0`, and the packaged profile exists at the runtime path expected by the converter. No application/Compose service was started. An initial build with an incorrect context failed because its package context differed; subsequent builds with the correct contexts passed.

## Slice 4 — authenticated CMYK API integration (tasks 8–9 complete)

- **Structured status:** Consumed parent-provided authoritative status: `cmyk-print-export`, `openspec`, `applyState=ready`, repo-local `/tmp/Pixelart-cmyk-392701b`, allowed edit root is this worktree; no action-context warnings. Parent authorized only Slice 4 tasks 8–9. Strict TDD active. Workload gate resolved by explicit assigned slice. No frontend, Docker/Compose, database, object storage service, listener, or printer was started.
- **RED:** Added personalized-book and photobook route tests first. Focused Jest failed on all four cases because route methods were missing. Checks cover covers/interior, admin order check, PDF content type/attachment filename, converter input, and attachment result.
- **GREEN:** Added CMYK source-render methods that use the existing split composition helpers and render only the requested part in memory; both admin controllers validate part and existing order channel, convert with the active `CmykPdfConverterService`, and return PDF attachments. Added the converter as a Nest provider. No CMYK file is persisted, no render pointer/assets are written, and no printer call is made.
- **Persisted task checkboxes:** Tasks 8 and 9 changed to `[x]`; tasks 10–13 remain unchecked.
- **Files changed for this slice:** `backend/api/src/orders/orders.cmyk.controller.spec.ts`, `backend/api/src/photobook/photobook-admin.cmyk.controller.spec.ts`, `backend/api/src/orders/orders.controller.ts`, `backend/api/src/orders/orders.module.ts`, `backend/api/src/orders/infrastructure/pdf/custom-book-pdf.service.ts`, `backend/api/src/photobook/photobook-admin.controller.ts`, `backend/api/src/photobook/photobook.module.ts`, `backend/api/src/photobook/infrastructure/pdf/photobook-pdf.service.ts`, `backend/api/src/common/infrastructure/pdf/cmyk-pdf-converter.service.ts` (Injectable decorator).
- **Validation:** focused Jest for both new route suites plus existing PDF composition suites passed: 4 suites / 18 tests. `cd backend/api && npm run build` passed. `git diff --check` passed.
- **Deviations/risks:** tests mock source rendering/converter; no external services or Ghostscript integration was started. Personalized CMYK rendering repeats source selection/preparation logic rather than extracting a shared preparation method; future changes should keep standard and CMYK composition/source rules synchronized. Do not run graph refresh; protected graph artifacts remain untouched.
- **Workload / PR boundary:** Slice 4 tasks 8–9 only; frontend tasks 10–13 untouched. No commit/PR/push. Task slice diff must remain under 300 lines; existing unrelated worktree changes predate this slice.
- **Remaining tasks:**
  - [ ] **10. RED — UI/API contract tests.**
  - [ ] **11. GREEN — Admin controls.**
  - [x] **12. TRIANGULATE — Integration validation.** Completed after this historical checkpoint; see Task 12 integration completion section.
  - [ ] **13. REFACTOR — Cross-cutting checks.**

### Slice 4 security remediation — R1-001 closed

- **RED:** Extended `photobook-admin.cmyk.controller.spec.ts` to assert handler metadata includes `JwtAuthGuard`, `RolesGuard`, and roles `ADMIN`/`OPERATOR`. Focused test failed as expected: only `JwtAuthGuard` was present.
- **GREEN:** Added `RolesGuard` and `Roles` imports and route-local authorization decorators only on `downloadProjectCmyk`. No other photobook route authorization was changed.
- **Verification:** `cd backend/api && npm run test -- --runInBand src/photobook/photobook-admin.cmyk.controller.spec.ts` passed (1 suite / 3 tests); `git diff --check` passed. Tasks 10–13 remain unchecked and unchanged. No staging/commit or external service startup.
- **Review ledger:** R1-001 recorded verified/closed with RED/GREEN evidence.

## Slice 5 — admin print output controls (tasks 10–11 complete)

- **Structured status at the Slice 5 checkpoint:** Parent selected `cmyk-print-export`; apply ready; authorized edit root is `/tmp/Pixelart-cmyk-392701b`. At that checkpoint only tasks 10–11 were authorized and tasks 12–13 were unchecked; task 12 was later authorized and completed as recorded below. Strict TDD active. Context-mode batch execution was scoped to the worktree for research/tests; no global permission changes.
- **RED:** Added order and photobook project detail Vitest tests before UI edits. Both failed as expected because `Standard RGB` controls were absent; assertions cover separate RGB covers/interior, separate CMYK covers/interior, explicit legacy-combined labeling, and avoiding stale wrap output.
- **GREEN:** Added grouped format controls to order and photobook project details, API render response metadata for legacy versus generation-scoped split outputs, and a cookie-authenticated Next route proxy for photobook CMYK downloads. Legacy PDFs are explicitly labeled combined and are never offered as a split cover/interior pair. Stale photobook wrap output is not exposed. Styling uses Montserrat and existing neutral/product tokens.
- **Validation:** Focused Vitest passed 2 files / 2 tests. Project-configured `npx tsc --noEmit` reports no diagnostics in the changed pages or proxy route, but the whole project check exits with 58 diagnostics from Jest-style tests lacking Jest globals. An isolated CLI TypeScript attempt was not valid because it did not load the project alias configuration. Backend `npm run build` was attempted but unavailable (`nest: command not found`); no install was performed. `git diff --check` passed.
- **Persisted task checkboxes:** tasks 10–12 are `[x]`; task 13 remains `[ ]`.
- **Files for this slice:** order and photobook project detail pages, their two new focused `.test.tsx` files, `frontend/web/src/app/admin-api/photobook/projects/[id]/print-cmyk/[part]/route.ts`, and render response fields in the two existing admin API controllers.
- **Workload / boundary:** Slice 5 tasks 10–11 only, under the 300-line slice target; no task 12–13 work, package manifest/lock changes, services, staging, commit, or publish. Earlier unrelated worktree changes remain present and untouched.
- **Remaining after Slice 5:** task 13 only; task 12 was completed afterward.
  - [x] **12. TRIANGULATE — Integration validation.**
  - [ ] **13. REFACTOR — Cross-cutting checks.**

## Task 12 — representative-PDF integration validation (complete)

- **Scope/status:** Parent explicitly selected active change `cmyk-print-export` and authorized task-12-only documentation. Task 12 is checked in `tasks.md`; task 13 remains unchecked and was not started. No SDD verify/sync/archive is claimed.
- **Converter regression TDD:** The added assertion for `--permit-file-read=/profile/aptec.icc` failed RED because the Ghostscript argv lacked that permission. After adding the narrowly scoped argument while preserving `-dSAFER`, argv/no-shell, timeout, profile-error classification, temporary isolation, and cleanup, focused Jest passed (1 suite / 7 tests) in the API build image. The API Docker `build` target and `git diff --check` passed. The build required network access for Alpine/npm dependencies; the focused test ran in a one-off container with `--network none`. No API app, Compose, PostgreSQL, MinIO, service, or published port was started.
- **Real conversion:** The actual `CmykPdfConverterService` from `pixelart-api-task12-test:local` converted both user-provided PDFs in a one-off `--network none` container, with source PDFs mounted read-only. Both outputs were valid PDFs. The image's APTEC profile SHA-256 was `2a0a26387276046dc129d4330a7a45542b736c8640e3ec4cb74df809c5ccfb0e`. A runtime probe with a missing profile returned `Configured ICC profile is unavailable` clearly.
- **Page geometry:** Custom book remained 26→26 pages at 822 x 581.04 pt; photobook remained 30→30 pages at 624 x 624 pt. Every page's size, rotation, MediaBox, CropBox, BleedBox, TrimBox, and ArtBox comparison had zero mismatches. No resolution cutoff was applied.
- **Color/visual checks:** Source ICC raster images converted to CMYK. Photobook output has 54 CMYK image objects. Custom-book output has 26 CMYK image objects plus one original DeviceGray image; Ghostscript documents DeviceGray as retained as gray and mapped to K under CMYK conversion. No RGB/CalRGB/ICCBased color markers or RGB image objects were found. Custom book retained its single font. RGB/CMYK 72-dpi previews of custom-book page 3 and photobook page 1 looked consistent with no visible layout/content loss, with expected color shifts.
- **Residual considerations (not new requirements):** Custom-book page 3 Poppler text extraction changed from 180 to 174 non-whitespace characters although the font remained and visual preview showed no visible loss. Output PDFs contain DeviceCMYK but no `/OutputIntents` or `/ICCBased` markers; current SDD requires configured-profile conversion and CMYK output, not PDF/X embedding. Original input PDFs were not modified. Validation files/previews remain in `.tmp-cmyk-validation-20261010/`; parent-created `debug-book.pdf` is a partial diagnostic artifact, not a valid output.
- **Review:** Fresh `review-risk` review found no actionable findings. Parent saved the integration discovery to Engram. No graphify artifacts or global settings were changed.

## Task 13 — prior checkpoint (superseded by resumed isolated refactor below)

- **Structured status:** Parent-confirmed authoritative selection is `cmyk-print-export`; apply ready, repo-local `/private/tmp/Pixelart-cmyk-392701b`; only task 13 authorized. Tasks 1–12 checked; task 13 remains unchecked. Verify/sync/archive remain blocked. No action-context warnings. Strict TDD active.
- **REFACTOR rationale:** At this superseded checkpoint no helper extraction had yet been made; the authorized follow-up below identified and consolidated photobook preparation.
- **Commands:** `npm --prefix backend/api test -- --runInBand` blocked (exit 127, `jest: command not found`); `npm --prefix backend/api run build` blocked (exit 127, `nest: command not found`). No dependency installation attempted. `npm --prefix frontend/web test` passed (15 files / 61 tests). `NEXT_TELEMETRY_DISABLED=1 npm --prefix frontend/web run build` passed; Next warned about choosing repository root among multiple lockfiles and skipped type validation per project configuration. `git diff --check` passed.
- **Invariant review:** Existing photobook CMYK route locally declares `JwtAuthGuard`, `RolesGuard`, and ADMIN/OPERATOR roles (prior verified R1-001). Existing pair-storage tests cover no pointer update after second upload failure. Prior task evidence confirms immutable sibling outputs and legacy/source/wrap preservation. No migration/seeder paths appear in changed/untracked paths. No guessed resolution cutoff was introduced; inspected renderer/converter references concern rendering DPI only. Task-13 code delta: 0 lines. Existing task slices remain governed by previously recorded counts; no code changes here.
- **Remaining:** `- [ ] **13. REFACTOR — Cross-cutting checks.**` remains unchecked because backend suite/build could not run and no justified consolidation was made. Do not start verify/sync/archive.

## Task 13 — resumed isolated refactor (complete)

- **Scope/status:** Parent authorized task 13 in existing `pixelart-api-task12-test:local` only. Active change remains `cmyk-print-export`, tasks 1–13 checked. Verify/sync/archive remain blocked and out of scope. Repo-local action context; no warnings.
- **RED / baseline:** Inspected Jest configuration (Node environment, no setup hooks) and the full-suite MinIO spec (AWS S3 client fully mocked). Focused PhotobookPdfService suite passed before refactor: 1 suite / 6 tests. This was a behavior-preserving refactor with no uncovered contract gap, so no new regression test was indicated.
- **REFACTOR:** Extracted `prepareProjectDocuments` to share project/theme lookup, page asset preparation, themed/custom front/back key resolution, downloads, placeholder validation, and document composition. Public signatures remain unchanged. Explicit `throw` vs `log-and-return` option preserves missing-project behavior; passed missing-cover messages preserve the distinct standard/CMYK errors. Placeholder error remains unchanged. CMYK still renders only the selected part and performs no storage/pointer mutation; standard generation alone renders and uploads both PDFs then publishes pointer after uploads. Personalized-book flow was not modified. Approximate task-13 source delta is 122 changed lines; OpenSpec evidence changes remain below 300 combined task-13 lines.
- **GREEN / TRIANGULATE:** Focused suite passed after extraction: 1 suite / 6 tests. Full backend Jest passed: 19 suites / 137 tests. `npm run build` passed.
- **Isolation:** All three backend commands used the exact existing image ID `sha256:2c660a183c8c0951ba3dd8666ede89fa559b551b1ce8538ad8807c0d3b1dce85`, `--rm --network none --entrypoint /bin/sh`, and only a read-only bind mount of worktree `backend/api/src` to `/app/src`. Each shell unset common database/Postgres/MinIO variables without printing values. No ports, services, Compose, DB/MinIO containers, customer-data mounts, or application entrypoint were used. Unit suite's MinIO client is mocked; no service connections.
- **Earlier frontend evidence retained (frontend files unchanged):** Vitest passed 15 files / 61 tests; Next production build passed with multiple-lockfile root warning and configured type validation skip. Final `git diff --check` passed.
- **Invariants:** Existing route authorization and pointer-atomicity review evidence remains intact; no schema/migration/seeder edits or resolution cutoff. Standard source/wrap preservation and distinct personalized-book behavior remain untouched.
- **Files changed for task 13:** `backend/api/src/photobook/infrastructure/pdf/photobook-pdf.service.ts`; OpenSpec task checkbox, apply-progress, review-ledger. Task 13 is checked only after all required backend commands passed. No stage/commit/push/deploy/service operation. Next: stop before verify/sync.
