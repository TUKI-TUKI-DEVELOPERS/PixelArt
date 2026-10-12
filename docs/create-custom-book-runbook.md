# Runbook para crear un nuevo libro personalizado PixelArt

Este runbook consolida lo aprendido al crear las versiones adultas de PixelArt: no basta con “generar imágenes”. El flujo correcto es iterar prompts, aprobar pilotos, aislar slugs/assets, sembrar contenido por SQL, subir a MinIO y recién después desplegar código.

## Camino rápido

1. Definí el libro: categoría, audiencia, tono, slug, variantes y nombre comercial.
2. Hacé micro-pilotos antes del full loop.
3. Cerrá el contrato visual y textual con una muestra aprobada.
4. Generá interiores, assets web, miniaturas catálogo/Home y fondos.
5. Subí assets a MinIO local y verificá keys reales.
6. Creá backfills SQL idempotentes.
7. Cableá frontend: categoría, detalle, wizard, Home, navbar y asset keys.
8. Verificá local: build, tests/API, rutas, assets y solicitud demo.
9. Sincronizá MinIO producción antes del rebuild.
10. En VPS: `git fetch`, checkout selectivo, rebuild `api web`, aplicar SQL y smoke test.

## Reglas duras

| Tema | Regla |
|---|---|
| Versiones existentes | Nunca sobrescribir libros infantiles/originales. Crear modelo/slug/storage separado. |
| Generación de imágenes | No generar nuevas imágenes sin aprobación explícita del usuario. |
| MinIO | Assets no viajan por git. Se suben/sincronizan a MinIO. |
| Deploy VPS | No usar `git pull`. Usar `git fetch` + checkout selectivo. |
| Docker VPS | No tocar `docker-compose.yml` de producción salvo autorización explícita. |
| Git local | No usar `git add .`; el árbol puede tener trabajo no relacionado. |
| Placeholders | No dejar `[NOMBRE]`, `[APODO]` ni placeholders visibles en prompts finales/renderables. |
| UI | La variante nueva debe aparecer en categoría, detalle, wizard, Home y navbar. |
| Smoke test | No cerrar el trabajo solo con build; verificar rutas, assets y solicitud demo. |

## 1. Definición del libro

Antes de generar nada, dejá estas decisiones escritas:

- Nombre público del libro.
- Categoría: Amor, Familia, Mascotas, Memorias Familiares, etc.
- Slug final.
- Audiencia: infantil, adulta, memorial, pareja, mascotas.
- Dirección emocional: lúdica, madura, sobria, homenaje, gratitud, duelo, celebración.
- Roles requeridos por plantilla:
  - `recipient`
  - `dedicator`
  - `hermanos`
  - `pet`
  - `owners`
  - `livingSiblings`
- Cantidad de plantillas por variante.
- Variantes de tapa y precio en centavos.

Ejemplo adulto:

```txt
Libro: Mamá, Mi Heroína Adulto
Categoría: Libros de Familia
Slug: mama-mi-heroina-adulto
Storage: IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/
Tono: adulto, emocional, sobrio, gratitud madura
No tocar: Mamá, Mi Heroína infantil
```

## 2. Loop de prompts

El resultado final sale de iterar, no de un prompt perfecto inicial.

### Secuencia recomendada

1. Escribir prompts candidatos.
2. Generar micro-piloto de pocas plantillas.
3. Armar contact sheet.
4. Revisar con criterios concretos.
5. Ajustar prompt.
6. Repetir hasta aprobar dirección.
7. Recién ahí ejecutar full loop.

### Qué registrar

Guardá en `PromptsPixelArtPlantillas/adult-books/<libro>/` o carpeta equivalente:

- `README.md`: objetivo y estado.
- `pilot-templates.md`: prompts piloto.
- `generation-prompts.md`: prompts finales.
- `review.md`: revisión visual/textual.
- `audit.md`: problemas detectados.
- `cost-estimate.md`: costos.
- `review-assets/`: contact sheets.

## 3. Lecciones de prompts ya aprendidas

| Caso | Lección |
|---|---|
| Mascotas | La especie debe decirse explícitamente: “perro”, “gato”, etc. El nombre no basta. |
| Libros no mascota | Prohibir animales si no deben aparecer: “No incluir mascotas, perros, gatos, aves ni animales.” |
| Adultos | Evitar lenguaje infantil, fantasía excesiva y poses de niño. Usar gratitud madura, memoria y vida compartida. |
| Memoriales | Usar símbolo sobrio, por ejemplo paloma lineal bajo el poema. Evitar fantasmas, halos, alas humanas o apariciones. |
| Miniaturas catálogo | Deben parecer libro físico apaisado 29x21, card-ready, casi frontal, reclinado suave 3–6°. |
| Miniaturas Home | Derivar desde catálogo aprobado; no reinventar el concepto si el catálogo ya fue aprobado. |
| Tapas | No imprimir “Adulto” en la tapa. |
| Moderación IA | Si falla una vez, reintentar una vez. Si vuelve a fallar, marcar para generación manual. |

## 4. Contrato de assets

### Interiores

Estructura esperada:

```txt
IA_Books/<Category_Page>/Libros/<Libro_slug_storage>/Plantillas/<archivo>.webp
```

Ejemplos:

```txt
IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/...
IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas/...
IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/...
```

### Assets de detalle

Cada libro debe tener, cuando aplique:

```txt
<Libro>_Central.webp
<Libro>_Central_2.webp
<Libro>_Central_3.webp
```

### Backgrounds

Frontend los consume desde `BACKGROUND_KEYS` en:

```txt
frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/page.tsx
```

### Miniaturas

Catálogo y Home deben tener keys estables:

```txt
IA_Books/IaBooks_Miniaturas/<Libro>_Miniatura.webp
IA_Books/IaBooks_Miniaturas/<Libro>_Miniatura_Home.webp
```

Si una key existente usa `.png`, preservala para evitar churn innecesario.

## 5. Backfills SQL

Cada libro nuevo debe quedar reproducible por SQL idempotente.

### Mínimo esperado

- Crear/actualizar `catalog_books`.
- Crear/actualizar `catalog_book_variants`.
- Crear/actualizar `personalized_models` con `slug`.
- Crear/actualizar `personalized_templates`.
- Insertar/actualizar assets necesarios.
- Asignar `cover_asset_id` a modelo y catálogo cuando aplique.

### Ubicación

```txt
backend/api/src/database/content/backfill-<libro>-content.sql
backend/api/src/database/content/backfill-<libro>-web-assets.sql
```

O, para batches:

```txt
backend/api/src/database/content/backfill-adult-remaining-content.sql
backend/api/src/database/content/backfill-adult-web-assets.sql
```

### Wiring en seed

Agregar el SQL a:

```txt
backend/api/src/database/seed.ts
```

Usar logs claros:

```ts
await client.query(
  readFileSync(join(__dirname, 'content/backfill-<libro>-content.sql'), 'utf8'),
);
console.log('[seed] personalized_templates content backfill (<Libro>) ✓');
```

## 6. Frontend checklist

Actualizar según corresponda:

```txt
frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/CategoriaClient.tsx
frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/page.tsx
frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/LibroDetalleClient.tsx
frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx
frontend/web/src/app/(public)/page.tsx
frontend/web/src/components/Home/NuestrosLibrosCard.tsx
frontend/web/src/components/layout/LibrosPersonalizadosMegaMenu.tsx
frontend/web/src/components/layout/MobileLibrosAccordion.tsx
frontend/web/src/components/layout/NavbarClient.tsx
frontend/web/src/lib/homeAssetKeys.ts
```

### Home

- Si una card tiene 2 versiones: switch simple.
- Si tiene 3+ versiones: selector “Elegir versión”.
- `Ver detalles` debe apuntar al slug activo.
- La miniatura debe cambiar con animación, sin tapar el CTA.

## 7. Verificación local

Antes de deploy:

```bash
npm run build --workspace=backend/api
npm run build --workspace=frontend/web
npm run build
npm run test
```

Si lint falla por tooling conocido, documentar el motivo y no ocultarlo.

Smoke mínimo:

- Todas las rutas públicas del libro devuelven `200`.
- Assets `/assets/...` devuelven `200`.
- API lista el modelo nuevo.
- Cada modelo tiene templates.
- Cada modelo tiene variantes.
- `/api/demo/requests` funciona para el libro nuevo.
- Si se crea demo QA, limpiarla de la DB.

## 8. Deploy controlado

### Orden correcto

1. Subir/sincronizar assets a MinIO producción.
2. Verificar assets en producción.
3. Hacer `git fetch origin` en VPS.
4. Checkout selectivo de archivos necesarios.
5. Rebuild `api web`.
6. Aplicar SQL/backfills si el seed no corre completo.
7. Smoke test.

### Túnel MinIO

En local:

```bash
ssh -L 9002:localhost:9000 root@<IP_VPS> -N
```

En otra terminal:

```bash
mc alias set vps http://localhost:9002 <MINIO_ACCESS_KEY> <MINIO_SECRET_KEY>
mc ls vps/pixelart-assets
```

### Rebuild VPS

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d api web
```

Si necesitás evitar cache/contenedores viejos:

```bash
docker compose -f infra/docker/docker-compose.yml up --build --force-recreate -d api web
```

### Aplicar SQL directo

Si `npm run seed` no existe dentro del contenedor o falla por no tener `src/database/seed.ts`, aplicar SQL directo:

```bash
docker exec -i pixelart_postgres psql -U pixelart -d pixelart -v ON_ERROR_STOP=1 < backend/api/src/database/content/backfill-<libro>-content.sql
```

## 9. Smoke test VPS

```bash
curl -fsS http://localhost:3001/api/health && echo
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Validar rutas del libro:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/libros-personalizados/<categoria-slug>/<libro-slug>
```

Validar asset:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/assets/<storage-key>
```

Validar DB:

```bash
docker exec -i pixelart_postgres psql -U pixelart -d pixelart -c "
SELECT
  m.name,
  m.slug,
  COUNT(t.id) AS templates,
  CASE WHEN m.cover_asset_id IS NULL THEN 'NO_COVER' ELSE 'OK' END AS cover
FROM personalized_models m
LEFT JOIN personalized_templates t ON t.model_id = m.id
WHERE m.name ILIKE '%<nombre>%'
GROUP BY m.id
ORDER BY m.name;
"
```

## 10. Cierre del trabajo

Antes de decir “listo”, registrar:

- Qué se creó.
- Qué slugs/storage keys quedaron.
- Qué assets se subieron a MinIO.
- Qué SQL se aplicó.
- Qué rutas se verificaron.
- Costos de generación.
- Decisiones visuales finales.
- Problemas encontrados y solución.

## Referencias de este ciclo

- `docs/ralph-wiggum-loop-adult-books.md`
- `DECISIONS.md`
- `backend/api/src/database/content/backfill-papa-mi-heroe-adult-content.sql`
- `backend/api/src/database/content/backfill-adult-remaining-content.sql`
- `backend/api/src/database/content/backfill-adult-aventuras-content.sql`
- `backend/api/src/database/content/backfill-adult-web-assets.sql`
- `PromptsPixelArtPlantillas/adult-books/adult-thumbnail-loop-training.md`
