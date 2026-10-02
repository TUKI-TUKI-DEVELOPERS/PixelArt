# Review — miniaturas v2 Papá, mi héroe adulto

## Generación

Fecha: 2026-09-14
Modelo: `gpt-image-2`
Calidad: `medium`

| Asset | Fuente generada | Final postprocesado | Dimensión final | Costo |
|---|---|---|---:|---:|
| Home v2 intento 1 | `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/raw/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_raw_attempt1.png` | `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/processed/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_attempt1.png` | 1190x1322 | `$0.0695` |
| Catálogo v2 intento 1 | `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/raw/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_raw_attempt1.png` | `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/processed/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_attempt1.png` | 1600x1200 | `$0.0535` |

Costo total intento 1: `$0.1230`

## Comparación

Contact sheet:

`output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/review-assets/miniaturas-v2-comparison.jpg`

## Resultado técnico

- Home v2 final: `1190x1322`, bbox aproximado `97.1%` ancho x `70.3%` alto, muy cercano a las proporciones visuales de Home existentes.
- Catálogo v2 final: `1600x1200`, bbox aproximado `97.1%` ancho x `97.0%` alto, elimina el fondo blanco sobrante del intento anterior.
- Ambos assets muestran solo `Papá Leo + Mateo`; no incluyen a Valeria ni tercera persona.

## Pendiente

Esperar aprobación visual antes de sobrescribir:

- `output/Papá, Mi Héroe Adulto Assets/web-assets/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`
- `output/Papá, Mi Héroe Adulto Assets/web-assets/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura.png`

Luego subir/reemplazar en MinIO local y, más adelante, producción.

## 2026-09-14 — Home raw sharp crop preview

User preferred the raw Home attempt visually. Processed that raw file with Sharp:

- Source: `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/raw/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_raw_attempt1.png`
- Candidate: `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/processed/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_raw_sharp_crop_1190x1322.png`
- Final local overwrite for preview: `output/Papá, Mi Héroe Adulto Assets/web-assets/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`
- Backup before overwrite: `output/Papá, Mi Héroe Adulto Assets/web-assets/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_before_sharp_crop.png`
- Uploaded to local MinIO key: `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`
- Served dimensions verified: `1190x1322`.
- Cleared `pixelart_web` Next image cache: `.next/cache/images`.

## 2026-09-14 — Transparent background pass

User noted the previous Sharp crop still preserved a white background rectangle. Reprocessed the current Home asset with Sharp using edge-connected near-white background removal:

- Candidate: `output/Papá, Mi Héroe Adulto Assets/web-assets-v2-candidates/processed/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_transparent_bg_1190x1322.png`
- Final local overwrite: `output/Papá, Mi Héroe Adulto Assets/web-assets/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`
- Backup before transparent pass: `output/Papá, Mi Héroe Adulto Assets/web-assets/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home_before_transparent_bg.png`
- Uploaded to local MinIO key: `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`
- Served verification: `1190x1322`, `RGBA`, alpha present, hash matches local.
- Cleared `pixelart_web` Next image cache: `.next/cache/images`.
