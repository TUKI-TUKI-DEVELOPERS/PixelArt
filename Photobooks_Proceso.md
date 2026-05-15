# Proceso de Creación de Photobooks — PixelArt

## Visión General

El flujo completo de un photobook va desde que el cliente elige un tema hasta que el admin genera el PDF y crea la orden de pago. Es un flujo **sin autenticación**: el cliente opera en rutas públicas, el admin en rutas protegidas.

```
Cliente elige tema → Editor (5 pasos) → Proyecto CONFIRMED en DB
                                              ↓
                                    Admin crea orden → Email con link de pago
                                              ↓
                                    PDF generado por Puppeteer → MinIO
```

---

## 1. Selección de Tema (Frontend público)

**Ruta**: `/photobooks` → `/photobooks/[temaSlug]` → `/photobooks/[temaSlug]/editor`

- `GET /api/photobook/themes` — devuelve temas activos con `coverPreviewUrl`, `coverTemplateUrl`, `backCoverUrl` (URLs de MinIO via `FileStoragePort`)
- `GET /api/photobook/products` — devuelve productos activos con `pricePerPageCents`, `minPages`, `allowsCustomDimensions`
- El `temaSlug` se resuelve en el Server Component de `[temaSlug]/page.tsx` para obtener `themeId` y los datos del tema antes de renderizar el editor.

---

## 2. Editor — 5 Pasos (PhotobookEditorClient.tsx)

El editor es un componente client-side con estado local. Usa **localStorage** como borrador automático (`photobook_draft_{temaSlug}`) guardado con debounce de 1 segundo.

### Paso 1 — Subir Fotos

- El usuario sube imágenes via `usePhotoUpload("uploads/photobooks")`
- Las fotos se suben al backend → se almacenan en MinIO, se crean assets deduplicados por SHA-256 `content_hash`
- Cada foto subida tiene: `id` (assetId en DB), `preview` (URL), `width`, `height`, `originalFilename`, `storageKey`
- Advertencia de baja resolución: fotos con ancho o alto < 1000px reciben badge naranja `!`

### Paso 2 — Editor de Páginas

Layouts disponibles (`layoutKey`):

| Key | Nombre | Slots |
|-----|--------|-------|
| `FULL_1` | 1 foto | 1 |
| `GRID_2` | 2 fotos | 2 |
| `GRID_3` | 3 fotos | 3 |
| `GRID_4` | 4 fotos | 4 |

Funcionalidades:
- **Auto-distribuir**: genera páginas automáticamente según N fotos por página (1, 2, 3 o 4), rellena hasta `minPages` con páginas vacías
- **Drag & drop** (desktop): usa `interactjs` para arrastrar fotos del sidebar a slots
- **Mobile**: tap en slot lo selecciona, tap en foto la asigna; navegación por páginas con botones ‹ ›
- **Operaciones de página**: agregar, duplicar, eliminar, reordenar (drag), zoom modal
- **Swap de slots**: arrastrando una foto sobre otra dentro de la misma página
- **Filtro "Disponibles"**: oculta fotos ya colocadas en alguna página
- Alerta de duplicado: si una foto ya está en otra página, muestra aviso temporal de 3s
- Validación de mínimo de páginas al avanzar al paso 3 (modal de advertencia si no alcanza)

### Paso 3 — Preview

- Renderiza `<PhotobookPreview>` con todas las páginas (turn-page style)
- Muestra resumen: cantidad de páginas, precio por página (en centavos → S/), total
- Bloquea avance si `páginas con fotos < minPages`

### Paso 4 — Datos del Cliente

Campos del formulario:
- Nombre completo *(requerido)*
- Email *(requerido)*
- Teléfono *(requerido)*
- Dirección de entrega *(requerida)*
- Distrito *(opcional)*
- DNI *(opcional, máx 8 caracteres)*
- Selector de producto (cambia precio por página y mínimo de páginas)
- Si `product.allowsCustomDimensions === true`: campos de ancho y alto en cm *(requeridos)*

### Paso 5 — Confirmación

- Muestra resumen final: páginas, total en S/, tema
- `handleSubmit()` llama `POST /api/photobook/projects` con el payload completo
- Al éxito: limpia el borrador de localStorage, muestra pantalla de confirmación
- El cliente ve: _"Tu proyecto fue confirmado. Recibirás un link de pago en tu correo."_

---

## 3. Creación del Proyecto (Backend)

**Endpoint**: `POST /api/photobook/projects`
**Controller**: `PhotobookPublicController` → `PhotobookService.createProject()`

### Validaciones:
1. Producto existe (`repo.getProduct`)
2. `pages.length >= product.minPages`
3. Si `allowsCustomDimensions`, deben venir `customWidthCm` y `customHeightCm`

### Transacción en DB (TypeORM):
1. Crea `photobook_projects` con `status = 'CONFIRMED'` y `calculatedTotalCents = pricePerPageCents × pageCount`
2. Por cada página: crea `photobook_pages` (pageNumber, layoutKey)
3. Por cada slot en la página: crea `photobook_page_slots` (slotIndex, assetId)
4. Por cada assetId: inserta en `photobook_project_assets` con `ON CONFLICT DO NOTHING`

> **Nota**: Los use cases (`CreateProjectUseCase`, `AutosaveProjectUseCase`, `ConfirmProjectUseCase`) son TODOs — toda la lógica vive directamente en `PhotobookService` y el repositorio.

---

## 4. Flujo Admin — Crear Orden

**Endpoint**: `POST /api/admin/photobook/projects/:id/create-order`
**Controller**: `PhotobookAdminController` → `PhotobookService.createOrderFromProject()`

### Pasos:
1. Verifica que el proyecto existe y está en estado `CONFIRMED`
2. Llama `OrdersService.create()` con `channel: 'PHOTOBOOK'`, `photobookProjectId`, datos del cliente, y `baseAmountCents = calculatedTotalCents`
3. Actualiza proyecto a `status = 'CONVERTED_TO_ORDER'`
4. Genera link público `PAYMENT_UPLOAD` via `PublicLinksService` (TTL 7 días)
5. Encola email al cliente con el link de pago (tipo `PAYMENT_PROOF_RECEIVED_ADMIN`)

---

## 5. Generación del PDF

**Service**: `PhotobookPdfService.generateAndStore(projectId)`

### Pipeline:
1. Carga el proyecto completo (`findProjectById`)
2. Descarga todos los assets de MinIO, los optimiza con `sharp`: resize máx 2000px, JPEG quality 85, embeds como base64
3. Construye HTML con CSS basado en el `layoutKey` de cada página:
   - `FULL_1`: imagen ocupa 100% del área
   - `GRID_2`: dos columnas iguales, altura completa
   - `GRID_3`: primera imagen ancho total (50% alto), dos abajo (50% alto c/u)
   - `GRID_4`: grilla 2×2
   - Dimensiones default: 21×21 cm; custom si el producto lo permite
4. Renderiza PDF con **Puppeteer** (pool de hasta 2 browsers Chromium, timeout 90s)
5. Sube PDF a MinIO: `photobooks/renders/{projectId}.pdf`
6. Guarda referencia en `photobook_renders` (upsert por `project_id`)

**Recuperar el PDF**: `GET /api/admin/photobook/projects/:id/render` devuelve `pdfUrl` y `generatedAt`

---

## 6. Estados del Proyecto

```
DRAFT  →  CONFIRMED  →  CONVERTED_TO_ORDER
                    ↘  CANCELLED (disponible en enum)
```

| Estado | Descripción |
|--------|-------------|
| `DRAFT` | Nunca se usa actualmente (el frontend envía directo a CONFIRMED) |
| `CONFIRMED` | Proyecto enviado por el cliente, listo para que admin cree la orden |
| `CONVERTED_TO_ORDER` | Orden creada, link de pago enviado al cliente |
| `CANCELLED` | Disponible en el enum, sin lógica implementada |

---

## 7. Modelo de Datos

```
photobook_themes          photobook_products
       │                         │
       └──────────┬──────────────┘
                  │
         photobook_projects (status: ENUM)
            ├── calculatedTotalCents = pricePerPageCents × pageCount
            ├── photobook_project_assets (N:N con assets)
            ├── photobook_pages
            │       └── photobook_page_slots (assetId + slotIndex)
            └── photobook_renders (PDF en MinIO, 1:1 con proyecto)
                  │
                orders (photobook_project_id UNIQUE FK)
```

---

## 8. Gaps / TODOs Identificados

| Área | Estado |
|------|--------|
| `CreateProjectUseCase` | TODO vacío — lógica en Service |
| `AutosaveProjectUseCase` | TODO vacío — sin endpoint de autosave real (solo localStorage) |
| `ConfirmProjectUseCase` | TODO vacío |
| Entidades de dominio (`PhotobookProject`, `PhotobookTheme`, etc.) | TODO vacías |
| Trigger de generación de PDF | No hay trigger automático — admin debe invocar manualmente |
| Estado `DRAFT` | Existe en DB pero nunca se usa (se crea directo como CONFIRMED) |
| Cancelación de proyectos | Enum tiene `CANCELLED` pero no hay endpoint ni lógica |

---

## 9. Archivos Clave

| Archivo | Rol |
|---------|-----|
| `frontend/web/src/app/(public)/photobooks/[temaSlug]/editor/PhotobookEditorClient.tsx` | Editor completo 5 pasos |
| `backend/api/src/photobook/photobook.service.ts` | Fachada: orquesta casos de uso y repositorio |
| `backend/api/src/photobook/photobook-public.controller.ts` | Endpoints públicos (themes, products, createProject) |
| `backend/api/src/photobook/photobook-admin.controller.ts` | Endpoints admin (list, detail, createOrder, render) |
| `backend/api/src/photobook/domain/ports/photobook-repository.port.ts` | Contratos del repositorio + tipos de transferencia |
| `backend/api/src/photobook/infrastructure/persistence/repositories/typeorm-photobook.repository.ts` | Implementación del repositorio (transacción de creación) |
| `backend/api/src/photobook/infrastructure/pdf/photobook-pdf.service.ts` | Generación PDF con Puppeteer + sharp |
| `schemaPixelart.sql` líneas 510–658 | Schema completo de tablas photobook |
