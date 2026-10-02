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

## 2026-09-30 — Customer cover-adjustment workflow

- **Decision:** An approval-link recipient can request changes to `FRONT_COVER`, `BACK_COVER`, or `BOTH` with a required message of 5–1200 characters. The request is persisted, shown in the admin workspace, and notified by the email outbox.
- **Why:** A binary approval left the client blocked when the proposal did not represent their story and forced untracked WhatsApp follow-ups.
- **Scope behavior:** A back-cover request preserves the selected front cover and unlocks only the back cover. A front-cover or both-surfaces request invalidates the entire cover pair because the back design depends on the front.
- **Resolution:** Sending a new approval link resolves the open adjustment request; the old approval links are revoked when the client asks for changes.
- **Human control:** The client comment is not sent directly to image generation. The admin reviews it, sets the creative direction, generates, selects, and then re-sends approval.

## 2026-09-30 — Code access and full editor for custom photobooks

- **Decision:** Replace the incomplete token-route editor with a code-entry portal and a custom mode of the existing full photobook editor. The old token route, custom editor core, public-link issuance, email template, controller endpoints, and admin proxy are removed.
- **Why:** Access mechanics do not restore editor capabilities; maintaining two editor implementations guarantees feature drift.
- **Security:** The email code is a 12-character high-entropy value, stored only as a SHA-256 hash, expires after seven days, and exchanges for a short-lived opaque HTTP-only session cookie. Resending revokes old codes and sessions. The code itself never becomes a URL token.
- **Workflow:** Custom mode preserves approved front/back assets, uses the existing project for server drafts and finalization, retains full interior editing/review/contact steps, and replaces catalog checkout with production finalization because custom photobooks currently do not create a separate catalog order or payment flow.
- **Data compatibility:** Existing `PHOTOBOOK_EDITOR` enum values and historical sent outbox records remain in the live DB because PostgreSQL enums cannot be safely removed without a destructive type rebuild. All executable routes and issuance paths are removed; the migration revokes any active legacy editor links.

## 2026-09-30 — Reenviar aprobación no revierte una cubierta aceptada

- **Decision:** `sendCustomCoverApproval` rejects a resend if `cover_approved_at` is already set, instead of issuing another approval link and changing the request back to `AWAITING_CUSTOMER`.
- **Why:** A resent link rendered the historical approved state, while the status regression prevented the editor-code action. The correct next step after approval is sending the editor code.
- **Recovery:** Request #3 was restored from `AWAITING_CUSTOMER` to `EDITOR_READY`; its approved covers and linked project #79 were preserved.

## 2026-09-30 — Reingreso y migración desde el editor reducido

- **Decision:** Un código válido permanece canjeable hasta su vencimiento; el límite de cinco aplica a intentos por minuto del endpoint, no a canjes correctos. Las sesiones siguen siendo opacas y revocables al reenviar el código.
- **Why:** Revocar el código tras cinco canjes correctos bloqueaba a clientes que volvían al portal mientras editaban.
- **Decision:** El editor completo ignora borradores creados por el editor reducido salvo que tengan `editorMode: CUSTOM_FULL_EDITOR`.
- **Why:** El borrador legado restauraba fotos y el paso de preview, mezclando el flujo eliminado con el nuevo. Las fotos se eliminan ahora también de las páginas al quitarlas de la biblioteca.
- **Recovery:** Se reactivó el código vigente de la solicitud #3 y se reinició solo su estado de borrador; los assets, cubiertas aprobadas y proyecto #79 se conservaron.

## 2026-09-30 — Cambio de formato durante la edición

- **Decision:** El editor a medida expone un botón `Formato` que reabre el selector compartido de tapa y hojas.
- **Why:** El cliente debe poder reconsiderar el formato después de empezar, sin perder todo el trabajo.
- **Behavior:** Aumentar agrega páginas vacías; reducir conserva las fotos en la biblioteca y exige confirmación si elimina páginas con fotos. Tras guardar, se recarga el editor desde el borrador persistido.
- **Guard:** Solo la confirmación explícita del modal marca `formatConfigured`; páginas autoguardadas no pueden saltar el selector inicial.

## 2026-09-30 — Integridad de formato al finalizar un photobook a medida

- **Problem:** Era posible cambiar el formato después de avanzar y conservar una validación fija de 30 páginas, aunque el formato nuevo tuviera más páginas.
- **Decision:** En el flujo a medida, todas las páginas del formato elegido requieren al menos una foto antes de pasar a la vista previa o finalizar. El botón `Formato` solo se muestra hasta Preview y un cambio devuelve siempre al editor.
- **Server guard:** `finalizeCustomEditor` verifica el formato permitido, el marcador explícito y que ninguna página esté vacía; no depende únicamente de la interfaz.
- **Recovery:** El borrador activo del proyecto #79 se devolvió al paso Editor: tiene 100 páginas y 30 con fotos, por lo que requiere completar 70 o reducir el formato antes de continuar.

## 2026-09-30 — Evitar pérdida de fotos al cambiar formato repetidamente

- **Problem confirmed:** Los logs del proyecto #79 registraron una escritura de 42 fotos a 0 fotos al cambiar formato de 40 a 30 páginas; no fue un error de visualización.
- **Cause:** El selector volvía a leer el borrador persistido y recreaba el editor. Entre esas operaciones, una escritura automática obsoleta podía ganar la carrera y sobrescribir la biblioteca con un estado transitorio vacío.
- **Decision:** El botón `Formato` entrega al modal una instantánea del estado vivo del editor. El autosave se pausa mientras el modal está abierto y, tras confirmar, el editor ya montado aplica esa instantánea sin recrearse.
- **Recovery:** No se sobrescribió el estado actual. Los logs conservan la última instantánea previa a la pérdida, por lo que una restauración deliberada sigue siendo posible si se solicita.

## 2026-09-30 — Papá, Mi Héroe Adulto V10 preview standard

- **Decision:** The first ten previews in each adult child-to-father direction use the V10 visual language: AI-generated front-facing interior open-book spread, subtle paper rims, central physical binding crease, and deterministic local Spanish typography.
- **Scope:** Published only to adult model `9775` / `papa-mi-heroe-adulto`: `HE_TO_HE` rows 2088–2097 and `SHE_TO_HE` rows 2108–2117. The child model remains untouched.
- **Why:** The approved V10 first template proved that the physical spread treatment matches the established catalogue language better than the flat V9 output.
- **Rollback:** Every prior V9 key and display name is preserved in `minio-papa-v10-first-10-deployment-manifest.json`; existing objects were not deleted.

## 2026-09-30 — Órdenes y pago para photobooks a medida

- **Decision:** La aprobación de cubiertas crea una orden `CONFIGURING_PHOTOBOOK` vinculada al proyecto. El editor terminado confirma proyecto, activa esa orden para pago y redirige al flujo existente de QR/voucher.
- **Why:** La operación, pago, impresión y entrega deben vivir en Órdenes; el área a medida solo conserva el historial editorial.
- **Status lifecycle:** `CONFIGURING_PHOTOBOOK → AWAITING_PAYMENT_PROOF → UNDER_PAYMENT_REVIEW → PAYMENT_VERIFIED → IN_PRODUCTION → SHIPPED → DELIVERED`.
- **Legacy recovery:** La solicitud #3 había finalizado con el flujo anterior sin orden ni pago. Su borrador completo (30/30 páginas y datos de entrega) se preservó y la solicitud volvió a `EDITOR_IN_PROGRESS` para que, al reingresar y pulsar continuar al pago, cree su orden y QR correctamente.

## 2026-10-01 — Adult poem books are rewritten by hand, never templated

- **Problem confirmed:** Seven adult poem books shared 100% of their rhyme words and between 76 and 169 literally identical verses. The cause was not weak writing: those `poems.py` files were produced by a fill-in-the-blanks mould (`X trae Y / y Z guarda W / entre A encuentro B / con C siento D`) with scene nouns injected per template, which also produced ungrammatical output such as "fue casa, pulso e bravura".
- **Decision:** Every adult book's poems are written one by one, with its own rhyme bank and imagery taken from that template's own scene. No generator, no shared mould. `verificar_entre_libros.py` stays as the gate: rhyme-word Jaccard over 20% or any identical verse between books fails the batch.
- **Father and mother books stay separate:** `mi-angel-guardian-padre-adult` and `mi-angel-guardian-madre-adult` share the same 20 themes, and so do the two `siempre-en-mi-corazon` books. They are written as independent books rather than one gender-swapped copy — a customer buys one of them, and copy-and-regender is the defect being removed.
- **`rima.py` measures rhyme from the tonic vowel.** Three real bugs were found and fixed while verifying: two adjacent strong vowels are a hiatus and not a diphthong (`pe-a-je` rhymes with `paje`), the mute u of `que`/`gui` is not a vowel (`toque` rhymes with `roble`), and in assonance a diphthong counts only its nucleus (`falta` rhymes with `cauta`). The previous two-last-vowels check rejected valid rhymes and hid others.
- **The per-book check could not catch a mould, and now it can.** The generated batch passed `verificar_3bis.py` with zero failures, because rhyming every verse in `-ado` does rhyme. What exposes it is the concentration of rhyme endings: across the hand-written books the most repeated ending peaks at 10.8%, while the mould sat at 66.7%. `verificar_3bis.py` now fails over 20%.
- **`te-amo-abuela-adult` and `mama-mi-heroina-adult` are not rewritten.** They fail the strict AABB check because they use alternating assonant rhyme on purpose. Their most repeated final word reaches 1.2% of verses and they share no verse with any other book, so they are written work, not mould output.
