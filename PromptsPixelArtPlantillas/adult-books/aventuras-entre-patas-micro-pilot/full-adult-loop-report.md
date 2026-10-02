# Full adult loop — Aventura Entre Patas Adulto

## Scope

Generated and published the complete adult interior set for the pet book, preserving the child version.

## Output

```txt
Book: Aventura Entre Patas Adulto
Slug: aventura-entre-patas-adulto
Storage base: IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas
Local output: PromptsPixelArtPlantillas/output/Aventuras Entre Patas Adulto/full-adult/
Contact sheet: PromptsPixelArtPlantillas/adult-books/aventuras-entre-patas-micro-pilot/review-assets/contact-sheet-full-adult-huella.jpg
```

## Generation

```txt
Total templates: 20
Reused approved pilot: 4
Generated new: 17 API calls
Final new templates required: 16
Extra regeneration: 1 (template 18 was corrected because the first attempt showed people from behind)
Additional full-loop cost: $0.6532
Pilot cost already spent: $0.1754
Total Aventura adult visual cost: $0.8286
```

## Rules applied

- Paw/patita under poem.
- No casita.
- No paloma.
- Rocky as golden medium dog protagonist.
- Humans alternate between 1, 2 and 3 adults.
- Maximum 3 visible humans per scene; pet does not count toward the limit.
- Humans should show visible faces front/three-quarter.

## Upload / local page

- Uploaded 20 WebP templates to local MinIO.
- Inserted local DB model `Aventura Entre Patas Adulto` under `Libros de Mascotas`.
- Inserted 20 personalized templates and 2 catalog variants.
- Wired frontend route/version switch for local preview.

## Verification

```txt
API model: Aventura Entre Patas Adulto | aventura-entre-patas-adulto | 20 templates
Catalog variants: 2
MinIO WebP objects: 20
Detail page: http://localhost:3000/libros-personalizados/libros-de-mascotas/aventura-entre-patas-adulto -> 200
Category page: http://localhost:3000/libros-personalizados/libros-de-mascotas -> 200
TypeScript check on modified frontend files: no new errors reported by filtered tsc output
```

## Correction note

During the loop, template 18 initially violated the visible-face rule by showing viewers from behind. It was regenerated with explicit front/three-quarter face composition and the DB/MinIO object were updated.
