# Split RGB and CMYK Print PDF Design

## Context

The existing book PDF services render RGB PDFs with Chromium/Puppeteer. The personalized-book renderer currently assembles a front cover, generated interior pages, and a back cover into one PDF. The photobook renderer also assembles them into one PDF for themes without a wrap; themes with `coverWrapKey` omit front/back pages from that PDF and create a separate wide wrap with a calculated spine. Custom photobooks likewise produce a separate wrap from their front/back cover assets. The current render tables each store one `pdf_storage_key`.

The approved output contract now applies to both future standard RGB generation and on-demand CMYK print exports for both product types:

- `covers.pdf`: front cover first, back cover second.
- `interior.pdf`: interior pages only, in their current order.

Existing generated files and source assets remain unchanged. Future photobook generation must not create spine content or a combined cover wrap.

## Design

### 1. Shared two-document rendering model

Refactor each book renderer to expose a shared composition/rendering operation that returns two independent RGB PDF buffers: `coversPdf` and `interiorPdf`. Standard generation stores both; a CMYK request renders the requested document and converts it without persisting or replacing either standard file.

#### Personalized books

- Build the covers document from the confirmed `COVER` asset followed by the confirmed `BACK_COVER` asset. It must have exactly two pages in that order.
- Build the interior document from the existing generated interior sequence only: gradient/title or dedication pages, selected templates, add-on/cross-sell page, and other current interior pages, preserving their order. Do not include the `COVER` or `BACK_COVER` page in this file.
- If either cover is unavailable, fail rather than generate a successful partial covers document.
- If no confirmed print-asset rows are available, fail with an actionable error instead of returning success without generating a pair.
- Cross-sell catalog thumbnails are optional promotional content: if a thumbnail cannot be downloaded or optimized, omit that image while retaining the card's available text and QR code. Do not treat this as a missing required order print source.

#### Photobooks

- For themed projects, use the existing standalone `coverTemplateKey` and `backCoverKey`; seeded themes have these separately from `coverWrapKey`.
- For custom projects, resolve the front and back asset keys from the linked custom-photobook request.
- The covers document has the front image on page 1 and back image on page 2. The interior document contains each `project.pages` entry individually, in its existing order.
- Stop consulting `coverWrapKey` and `spineLabel` for future generation. Do not calculate spine width, generate either kind of wrap, or include spine content. Keep existing theme rows, source wrap images, and already-generated wrap PDFs untouched.
- If either required cover source cannot be resolved, fail with a clear error instead of returning an incomplete pair.

Personalized-book source preparation is fail-closed: every required confirmed print row must download and optimize before rendering, and an empty confirmed-row set is a generation failure. Errors identify the asset kind and page slot/part, never a storage key. Cross-sell catalog thumbnails remain optional as described above. The API awaits generation and propagates a safe error; the admin displays it inline. Pair upload/pointer publication remains atomic, preserving the prior successful generation on any failure.

### 2. Standard RGB storage and legacy compatibility

Store each new standard pair under an immutable generation-scoped path, for example:

- `custom-books/renders/{orderId}/generation-{id}/covers.pdf`
- `custom-books/renders/{orderId}/generation-{id}/interior.pdf`
- `photobook-renders/{projectId}/generation-{id}/covers.pdf`
- `photobook-renders/{projectId}/generation-{id}/interior.pdf`

Use the existing `pdf_storage_key` field to point to the generation's `covers.pdf`; derive the sibling `interior.pdf` key from that path. This avoids a schema migration while allowing each regeneration to create a new immutable pair. Update the existing render record to point at the latest pair only after both uploads succeed. Do not overwrite or delete a legacy `{id}.pdf` or any prior generation. If one upload fails, do not publish a pointer to a partial pair.

Update admin render responses/UI to expose separate standard-cover and standard-interior downloads. For records still pointing at a legacy combined `{id}.pdf`, retain its existing download as a clearly identified legacy file until a new pair is generated; do not pretend the combined file is a split pair. A new photobook render must not surface an old cover-wrap URL as belonging to it.

### 3. CMYK conversion service and downloads

Add a shared infrastructure service that converts one complete source PDF at a time using Ghostscript `pdfwrite` and an explicit CMYK output color-conversion strategy/output ICC profile. The conversion covers raster images and vector/text colors; it must not convert only source images or rasterize the complete document through Sharp.

Provide separate authenticated admin downloads for the covers and interior documents. Group the controls by format in each order/project detail view:

- Standard RGB: download covers; download interior.
- Print CMYK: generate/download covers; generate/download interior.

This is four file actions per order/project, with two documents per format. CMYK actions render the requested source document from the same composition helper and convert it in memory/temp storage; they do not update the standard render pointer or persist a CMYK file. The response uses `Content-Type: application/pdf` and an attachment filename identifying the item, document part, and active profile. Do not send the file to a printer automatically.

Run conversion in an isolated temporary directory. Invoke Ghostscript with an argument array (no shell interpolation), a bounded timeout, unique input/output names, and guaranteed cleanup. Validate the output before sending it. On a missing profile, process failure, timeout, or invalid output, return an actionable error; never fall back to RGB or another profile and never return a partial file.

The initial profile is the exact `APTEC_Offset_Coated_LinearCTV_2025.icc` ICC file, available from the [official ICC Profile Registry entry](https://registry.color.org/profile-registry/APTEC_Offset_Coated_LinearCTV_2025) and [official binary](https://registry.color.org/profile-registry/profiles/APTEC_Offset_Coated_LinearCTV_2025.icc). Package it unchanged as a documented, checksummed runtime asset at `backend/api/resources/icc/APTEC_Offset_Coated_LinearCTV_2025.icc`. Its license explicitly permits copying, distribution, embedding, use, and sale without restriction; the profile is made available with Eastman Kodak permission. The verified binary is 2,685,584 bytes, ICC 4.2.0, CMYK/Lab, with SHA-256 `2a0a26387276046dc129d4330a7a45542b736c8640e3ec4cb74df809c5ccfb0e`. It targets ISO 12647-2:2013 paper type 1 / premium coated, with TAC 320%. Allow `PRINT_PDF_ICC_PROFILE_PATH` to select Miguel's printer-supplied profile for future exports. Check the configured file on each export; absence is an export failure, not a reason to substitute a profile. This APTEC profile is a standard reference condition, not printer-specific: exact printer/color matching is not guaranteed and a printer proof remains necessary.

Install the Ghostscript runtime in both API Docker images (`backend/api/Dockerfile` and `backend/api/Dockerfile.prod`). No database migration or seeder change is required.

### 4. Failure, security, and data lifecycle

Apply the existing administrative authentication/authorization policy to standard and CMYK download paths. A failed generation/conversion leaves the current standard files, any legacy PDF, all source assets, and the order/project unchanged. Update the render pointer only after the standard covers and interior files are both stored successfully. Future CMYK downloads use the currently configured profile; a profile change affects only new downloads. No resolution threshold or image upscaling is introduced.

## Validation

- Unit-test the page composition for personalized books: covers PDF has exactly front then back; interior PDF excludes both covers and preserves all current interior page order.
- Unit-test photobook composition for themed and custom projects: two-page covers PDF, ordered interior-only PDF, missing-cover errors, and no access to spine/wrap generation paths.
- Test standard generation writes both files under one unique generation path, updates the pointer only after both uploads succeed, and leaves legacy/prior files unchanged.
- Test legacy render compatibility and ensure new renders do not return a stale legacy wrap URL.
- Unit-test ICC path resolution, Ghostscript argument construction, no-shell invocation, timeout/non-zero exit, missing profile, invalid output, and temporary-file cleanup. Assert there is no RGB fallback.
- Test every standard/CMYK file action for authorization and correct attachment filename/content type. Assert CMYK generation does not mutate standard render keys or source assets.
- Run an integration check with Ghostscript in the API container on representative personalized-book and photobook outputs. Verify each resulting PDF retains the expected page count and dimensions, carries the configured output profile, and is CMYK across raster and vector content. Compare output visually to RGB; do not use the source-resolution samples to impose a new resolution gate.

## Non-goals

- Deploying to the VPS, sending files to a printer, or changing database schema/seeds.
- Rewriting or deleting already-generated PDFs, source PNGs, customer projects, covers, or existing wrap assets.
- Guessing print-resolution limits, upscaling images, or promising exact press color without Miguel's final profile/proof.
