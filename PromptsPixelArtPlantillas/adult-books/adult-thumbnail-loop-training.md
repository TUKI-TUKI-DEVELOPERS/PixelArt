# Adult thumbnail loop training

This note captures the corrected PixelArt catalog-thumbnail workflow learned from `Te Amo, Abuelo Adulto`.

## Decision

Adult thumbnails must look like existing PixelArt product mockups, not like standalone editorial covers.

The adult version changes the people, tone and scene printed on the cover. It does **not** change the product grammar of the thumbnail.

## References to check before generation

| Reference | What to copy |
|---|---|
| Child thumbnail of the same book | Title placement, magic level, emotional reading, product family. |
| `Papá, Mi Héroe Adulto` catalog thumbnail | Adult mockup size, bbox, crop and card scale. |

## Catalog thumbnail contract

- Closed hard-cover book.
- Physical format: landscape 29x21, wider than tall.
- View: almost frontal.
- Posture: very mild backward recline, about 3–6 degrees.
- Bottom edge: visible but thin; it must not become a thick slab.
- Left spine: visible as a narrow strip.
- The book must occupy almost the full card width.
- Canvas: `1310x926`.
- Target bbox for card consistency: close to `1294x901`, margins around `8 / 12 / 8 / 13`.
- The word `Adulto` must not be printed on the cover.
- Use transparent/clean background after postprocess.

## Reject immediately

- Vertical novel/book standing upright.
- Book lying too flat or over-reclined.
- Free cover art with no physical product mockup.
- Big white field around a small product.
- `Adulto` printed on the cover.
- Generated table/props/hands outside the book.
- Circular or elliptical shadow under the book.
- Side haze or bottom halo caused by weak background removal.

## Pilot loop

1. Generate one catalog-thumbnail candidate only.
2. Compare side by side against:
   - child thumbnail of the same book;
   - `Papá, Mi Héroe Adulto` catalog thumbnail.
3. Judge in this order:
   - product grammar;
   - posture/inclination;
   - scale in card;
   - clean crop;
   - cover scene/title.
4. Upload to local MinIO only for live card preview.
5. If scene is approved but posture/size/crop is slightly off, postprocess first. Do not regenerate the concept unless the cover content is wrong.
6. Scale to other books only after approval in the real category card.

## `Te Amo, Abuelo Adulto` correction record

Final accepted local file:

`PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/corrected-v9-physical-book-crop/TeAmoAbuelo_Adulto_Miniatura_Catalog_Candidate_v9_physical_book_crop.webp`

Comparison sheet:

`PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/corrected-v9-physical-book-crop/compare_papa_abuelo_before_after_v9_physical_book_crop.jpg`

MinIO key used for preview:

`IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp`

Corrections made:

| Attempt | Lesson |
|---|---|
| v1 | Horizontal book was better, but it stood too upright. |
| v2 | Reclinable posture was right, but inclination was too strong. |
| v3 | Mild recline matched the PixelArt card language. |
| size match | Bbox was adjusted to match `Papá, Mi Héroe Adulto`. |
| v9 crop | Cropped to the physical book bounds to remove the lower circular artifact. |

Generated-candidate cost: `$0.1611` (`v1`, `v2`, `v3`). Later size/crop fixes were postprocess only.

## Home thumbnail companion view

The Home thumbnail is the same physical product as the catalog thumbnail, only shown in the homepage pose.

Do not ask the model to invent a second book unless the postprocess version fails. The safer method is deterministic:

1. Start from the approved catalog thumbnail.
2. Crop to the physical book bbox.
3. Trim only obvious generated bottom rim/shadow if needed.
4. Rotate about `+6°` counterclockwise so the right side is higher and the left spine sits lower.
5. Place it on a `1190x1322` transparent canvas.
6. Target a bbox close to the child Home reference: `~1112x832`, margins around `35 / 207 / 43 / 283`.
7. Add only a light derived shadow; avoid black slabs, circular halos or big background ellipses.

For `Te Amo, Abuelo Adulto`, the accepted Home preview is:

`PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/home-postprocess-v2-light-shadow/TeAmoAbuelo_Adulto_Miniatura_Home_Postprocess_v2_light_shadow.webp`

Current local MinIO Home key:

`IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura_Home.webp`

Observed metrics after upload:

- Canvas: `1190x1322`.
- Bbox: `1109x833`.
- Margins: `44 / 211 / 37 / 278`.

Use OpenAI image edit only if the deterministic rotation looks physically fake in the real Home card. If using image edit, provide both the approved catalog thumbnail and the child Home reference; do not do text-only generation.

## Home card switch rule

Home cards already support version switching through the `versions` array in `NuestrosLibrosCard`.

To preview an adult Home thumbnail:

- add the adult Home asset URL in `frontend/web/src/app/(public)/page.tsx`;
- add `versions` to the base book entry;
- keep the public card title as the shared book title;
- use `Versión Infantil` and `Versión Adultos` labels;
- point the adult version to the adult slug.

For `Te Amo, Abuelo`, the switch was added in `frontend/web/src/app/(public)/page.tsx` using `K.ourBooksFamilyAbueloAdultoHome`.

## Prompt clause to reuse

```text
This is a PixelArt catalog thumbnail, not a standalone cover.
Create a closed hard-cover landscape 29x21 book mockup, almost frontal, with only a very mild backward recline of 3 to 6 degrees. The lower edge is slightly closer to the camera but remains thin; the top edge recedes only subtly. Thin left spine visible. The book fills almost the full width of the thumbnail.
Do not create a vertical novel, a standing book, a flat/over-reclined book, or free cover art. Do not print the word "Adulto" on the cover. Pure white studio background outside the book, no hands, table, props or scenery outside the book. Final crop must follow the physical book, with no circular/elliptical shadow or side haze.
```

## Batch correction record — remaining adult thumbnails

Batch: `adult-thumbnails-corrected-v1`.

After the `Te Amo, Abuelo Adulto` correction was approved, the same contract was applied to the remaining adult catalog thumbnails and Home companions.

Generated catalog thumbnails:

- `Mamá, Mi Heroína Adulto`
- `Te Amo, Abuela Adulto`
- `El Mejor Equipo Adulto`
- `Mi Familia Adulto`
- `Aventura Entre Patas Adulto`
- `Siempre en mi Corazón Abuelo Adulto`
- `Siempre en mi Corazón Abuela Adulto`
- `Mi Ángel Guardián Padre Adulto`
- `Mi Ángel Guardián Madre Adulto`
- `Siempre Serás Parte de Mí Adulto`

Review sheets:

- Catalog: `PromptsPixelArtPlantillas/output/_adult_thumbnail_batch_corrected_v1/review-assets/corrected-adult-catalog-thumbnails-contact-sheet.jpg`
- Home: `PromptsPixelArtPlantillas/output/_adult_thumbnail_batch_corrected_v1/review-assets/corrected-adult-home-thumbnails-contact-sheet.jpg`

Cost: `$0.5359` for 10 catalog generations. Home thumbnails were deterministic postprocess from catalog thumbnails.

Observed batch metrics:

- Catalog images: `1310x926`, bbox `1294x901`, margins `8 / 12 / 8 / 13`.
- Home images: `1190x1322`, approximate bbox `1091–1114 x 817–835`, margins close to the `Te Amo, Abuelo Adulto` approved Home pose.

Do not use the first rejected adult-web-assets thumbnails as prompt references. Use either this batch or the `Te Amo, Abuelo Adulto` corrected thumbnail record.

