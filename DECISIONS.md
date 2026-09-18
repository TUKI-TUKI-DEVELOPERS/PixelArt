# Decisions

## 2026-09-14 — Papá, Mi Héroe Adulto technical pilot

- Chose a new personalized model named `Papá, Mi Héroe Adulto` under `Libros de Familia`, instead of changing the existing child-oriented `Papá, Mi Héroe` schema or adding a variant table now.
- Used slug `papa-mi-heroe-adulto` and storage base `IA_Books/Family_Books_Page/Libros/Papa_mi_heroe_adulto/` so the adult pilot is isolated from the infantil book.
- Kept current adult assets as PNG because this pilot set was already generated that way; future adult sets should prefer WebP.
- Marked the detail route as `force-dynamic` so a newly seeded model does not 404 because of stale cached category/catalog API responses.
- Uploaded local review assets to local MinIO for page validation; production still needs the same storage upload before deploy.
## 2026-09-14 — Personalized books navbar navigation model

- Rejected option B (`Libros Infantiles` / `Libros Adultos`) because it added visual weight to the main navbar and made the sidebar feel worse.
- Kept one top-level entry: `Libros Personalizados`.
- Replaced public `Infantil` / `Adulto` segmentation inside the dropdown with recipient-first navigation: `Papá`, `Mamá`, `Pareja`, `Hijos`, `Abuelos`, `Mascotas`.
- Public copy should avoid `Adulto` for the premium/mature line; use `Ediciones emotivas` / `Edición Emotiva` instead. Internal slugs/storage keys may still contain `adulto` for compatibility.

## 2026-09-14 — Custom books version labels inside recipient menu

- Changed the recipient panel to show explicit version buttons inside each recipient instead of relying on section headings.
- Use `Cuento para niños` for the child/family-reading format and `Regalo de hijos adultos` for the mature emotional format.
- Dropped `Homenaje editorial` from the menu because it was too abstract for customers.
- Made the bottom CTA strip visually stronger with a dark background and version-aware CTA.

## 2026-09-14 — Public version labels in custom books menu

- Renamed navbar version buttons from `Cuento para niños` / `Regalo de hijos adultos` to `Versión Infantil` / `Versión Adultos` per product direction.

## 2026-09-14 — Contextual version labels by recipient

- `Versión Infantil` remains the default only where it makes sense.
- `Pareja` now uses `Versión Pareja`.
- `Mascotas` now uses `Versión Mascotas`.
- Added dedicated version glyphs for romantic and pet versions so the menu does not reuse the child/family icon in the wrong contexts.

## Aventuras Entre Patas — human composition limit

- Date: 2026-09-15
- Decision: The adult pet book must alternate human composition instead of always showing only a couple.
- Rule: Use 1, 2, or 3 adult humans with the pet; maximum 3 visible humans per scene. The pet does not count toward the human limit.
- Visual rule retained: under-poem ornament is a paw/patita, not a house/casita and not a memorial dove.
- Reason: The book should work for different pet-family configurations while keeping the pet as the emotional protagonist.

## Aventura Entre Patas Adulto — separate adult model

- Date: 2026-09-15
- Decision: Publish the adult pet book as a separate local model/slug: `Aventura Entre Patas Adulto` / `aventura-entre-patas-adulto`.
- Why: The child version must remain intact; adult previews should not overwrite existing MinIO keys.
- Storage: `IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas`.
- Page: Add version switch from the existing `aventura-entre-patas` card to the adult slug.


## 2026-09-15 — Remaining adult books full-loop publication

- Decision: Complete remaining adult interiors as separate local models/slugs and isolated MinIO storage folders, not by overwriting child/original books.
- Scope completed: `mama-mi-heroina-adulto`, `te-amo-abuelo-adulto`, `te-amo-abuela-adulto`, `el-mejor-equipo-adulto`, `la-familia-adulto`, `siempre-en-mi-corazon-abuelo-adulto`, `siempre-en-mi-corazon-abuela-adulto`, `mi-angel-guardian-padre-adulto`, `mi-angel-guardian-madre-adulto`, `siempre-seras-parte-de-mi-adulto`.
- Why: This preserves existing products while enabling mature/adult variants and split memorial products.
- Frontend: Category cards group child/original and adult versions behind version selectors; detail pages use adult DB templates with canonical asset fallbacks until adult web thumbnails/assets are generated.
- Seed persistence: `backfill-adult-remaining-content.sql` is wired into `seed.ts` so resets can recreate these models/templates.
- Wizard: Adult display names are aliased back to canonical wizard/dedication modes; split memorial adult books with one gendered template set do not hide templates if the user-selected memorial gender differs.
- Cost: Remaining batch excluding already-completed Aventura/Papá cost `$10.7072` for 280 WebP images.


## 2026-09-16 — Adult web assets excluding Papá

- Decision: Generate adult web thumbnails/backgrounds/carousel assets for every adult book except `Papá, Mi Héroe Adulto`, preserving the previously excluded/separate Papá asset decision.
- Asset set: one catalog thumbnail, one home thumbnail, one detail background and three detail central/carousel images per book, stored as WebP.
- Storage: adult-specific MinIO keys under `IA_Books/IaBooks_Miniaturas`, `IA_Books/Backgrounds`, and each adult book storage folder.
- Frontend: detail pages now point to adult-specific background/carousel assets; category/detail related thumbnails point to adult thumbnails; local DB cover assets are linked for adult cards.
- Memorial correction: first memorial pass looked too ghostly; regenerated Abuelo/Abuela/Padre/Madre web assets with a stronger rule: no transparent apparitions, floating faces, sky faces, halos or wings; use framed photos/albums/letters/objects plus small dove motifs.
- Cost: `$2.3738` initial pass + `$0.8729` correction pass = `$3.2467` total spent.

## 2026-09-16 — Adult catalog thumbnail contract

- Decision: Adult catalog thumbnails must follow the existing PixelArt product-mockup grammar; they are not free-standing cover designs.
- Reference: Use the original child thumbnail for the same book plus the approved `Papá, Mi Héroe Adulto` thumbnail as the visual contract.
- Contract: landscape 29x21 hard-cover book, almost frontal, only mildly reclined backward, thin left spine, thin lower edge, no vertical novel pose, no flat/over-reclined perspective.
- Text rule: never print `Adulto` on the cover; the UI owns version labeling.
- Scale rule: catalog canvas `1310x926`; target visual bbox should match Papá adult closely (`1294x901`, margins around `8 / 12 / 8 / 13`).
- Crop rule: crop to the physical book, not to the generated background/shadow; remove circular/elliptical halos, side haze and orphan shadows before uploading.
- Process rule: generate one pilot, compare against child + Papá, upload to MinIO for card review, then scale only after visual approval.
- Applied correction: `Te Amo, Abuelo Adulto` final local preview uses `corrected-v9-physical-book-crop` and MinIO key `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp`.

## 2026-09-16 — Adult Home thumbnail companion view

- Decision: Derive the Home thumbnail from the approved catalog thumbnail through deterministic postprocess before considering another OpenAI generation.
- Why: The catalog thumbnail already has approved people, title, tone and product mockup; generating Home from scratch risks changing faces, text or composition.
- Contract: canvas `1190x1322`, landscape book rotated about `+6°` counterclockwise, right side higher, left spine lower, light alpha-derived shadow, no circular/elliptical halo.
- `Te Amo, Abuelo Adulto` accepted Home preview: `PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/home-postprocess-v2-light-shadow/TeAmoAbuelo_Adulto_Miniatura_Home_Postprocess_v2_light_shadow.webp`.
- MinIO Home key: `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura_Home.webp`.
- UI rule: use the existing `NuestrosLibrosCard.versions` switch; the Home page data for `Te Amo, Abuelo` now exposes `Versión Infantil` and `Versión Adultos`, mirroring `Papá, mi héroe`.
## 2026-09-17 — Correct remaining adult thumbnails and Home switches

- Decision: Replace the rejected adult thumbnail pass for the remaining adult books with product-mockup catalog thumbnails following the `Papá, Mi Héroe Adulto` / `Te Amo, Abuelo Adulto` contract.
- Scope: `Mamá`, `Te Amo Abuela`, `Mi Familia`, `El Mejor Equipo`, `Aventura Entre Patas`, `Siempre en mi Corazón` Abuelo/Abuela, `Mi Ángel Guardián` Padre/Madre, and `Siempre Serás Parte de Mí`.
- Home rule: derive each Home thumbnail from its corrected catalog thumbnail through deterministic postprocess (`1190x1322`, about `+6°`, light alpha shadow), not by regenerating a second concept.
- Storage: overwrote the existing adult MinIO thumbnail keys after backing up previous objects under `IA_Books/IaBooks_Miniaturas/_backups/`.
- UI: Home cards now expose version switches for all adult-capable base books; the personalized-books navbar now lists available adult versions instead of marking them as upcoming.
- Cost: `$0.5359` for 10 corrected catalog generations; Home derivatives were postprocess-only.

## 2026-09-17 — Papá adult thumbnail v4 card contract

- Decision: Replace only the `Papá, Mi Héroe Adulto` card thumbnails now that the user explicitly authorized touching Papá assets.
- Why: The original Papá adult thumbnail came from the early training phase and was less aligned with the final adult thumbnail contract used for the remaining books.
- Asset keys preserved to avoid frontend/schema churn:
  - `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura.png`
  - `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`
- Local final files live in `PromptsPixelArtPlantillas/output/Papá, Mi Héroe Adulto Assets/thumbnail-candidates/corrected-v4-card-contract/`.
- Catalog metrics: `1310x926`, bbox `1294x901`, margins `8 / 12 / 8 / 13`.
- Home metrics: `1190x1322`, bbox `1103x833`, margins `50 / 211 / 37 / 278`.
- MinIO backups were saved under `IA_Books/IaBooks_Miniaturas/_backups/` before overwriting.
- Cost: `$0.0533`.
