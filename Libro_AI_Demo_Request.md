# Libro AI — Demo Request & Checkout Flow

Documento de referencia completo para el flujo de demo request → checkout unificado.
**Leé esto antes de tocar cualquier archivo de esta feature.**

---

## Flujo completo

```
1. Cliente llena formulario público
      POST /api/demo/requests
      → crea demo_request (status=RECEIVED) + demo_template_selections (max 3) + demo_request_assets

2. Admin sube propuestas (una por plantilla)
      POST /api/admin/demo/requests/:id/proposals?templateId=X&protectionMode=WATERMARK|LOW_QUALITY
      → crea demo_proposals con imagen protegida en MinIO

3. Admin envía el link unificado ← NUEVO FLUJO PRINCIPAL
      POST /api/admin/demo/requests/:id/send-checkout
      → crea orden (status=AWAITING_PAYMENT_PROOF)
      → genera public_link tipo CHECKOUT (referencia order_id)
      → inserta email_outbox (UNIFIED_CHECKOUT_SENT)
      → actualiza demo_request.status = PROPOSALS_SENT

4. Cliente recibe email con UN solo link: /checkout/:token
      GET /api/checkout/:token       → ve propuestas + plantillas disponibles + info de orden
      POST /api/checkout/:token/submit → elige plantillas + sube comprobante

5. Admin revisa comprobante
      POST /api/admin/payments/:orderId/review (APPROVE | REJECT)
```

> **Flujo anterior (backwards compat, no eliminar)**
> - `POST /api/admin/demo/requests/:id/send-proposals` → solo envía propuestas (link DEMO_VIEW)
> - `POST /api/admin/demo/requests/:id/create-order` → crea orden por separado (link PAYMENT_UPLOAD)

---

## Reglas de negocio

| Concepto | Valor |
|----------|-------|
| Fotos en demo request | 5 (máximo, validado en frontend + backend) |
| Plantillas en demo request | 3 (máximo, validado en código) |
| Paquete Standard | 15 plantillas totales = 3 originales + **12 adicionales** |
| Paquete Premium | 20 plantillas totales = 3 originales + **17 adicionales** |
| Precio extra Premium | **5000 centavos (S/ 50)** — placeholder, cambiar en `submit-checkout.use-case.ts` |
| TTL del link | 7 días (en `TypeOrmPublicLinksRepository.create`) |
| Moneda | PEN (soles peruanos) |
| Precios en DB | BIGINT en centavos (8900 = S/ 89.00) |

---

## Base de datos

### Tablas relevantes

```sql
-- Solicitud de demo (punto de entrada)
demo_request (
  id, catalog_book_id, catalog_book_variant_id,
  personalized_category_id, personalized_model_id,
  customer_full_name, customer_email, customer_phone,
  shipping_address_line1..., delivery_date,
  wants_custom_dedication, dedication_text,
  status  -- RECEIVED | PROPOSALS_SENT | CANCELLED
)

-- 3 plantillas elegidas por el cliente al inicio
demo_template_selections (
  id, demo_request_id, template_id
  UNIQUE(demo_request_id, template_id)
)

-- Propuestas protegidas que sube el admin (una por plantilla)
demo_proposals (
  id, demo_request_id, template_id,
  output_storage_key,     -- MinIO key de imagen protegida
  protection_mode,        -- 'WATERMARK' | 'LOW_QUALITY'
  is_watermarked, generated_by_user_id
  UNIQUE(demo_request_id, template_id)
)

-- Orden creada a partir de la demo request
orders (
  id, channel ('CUSTOM_BOOK'), status, public_token (UUID),
  demo_request_id, catalog_book_variant_id, personalized_model_id,
  customer_full_name, customer_email, customer_phone,
  base_amount_cents, rush_fee_cents,
  extra_templates_amount_cents  -- 0 (Standard) | 5000 (Premium)  ← NUEVO
  total_amount_cents,           -- = base + rush + extra_templates
  currency ('PEN'), estimated_delivery_date
  CONSTRAINT chk_total_amount CHECK (total_amount_cents = base_amount_cents + rush_fee_cents + extra_templates_amount_cents)
)

-- Plantillas definitivas del pedido (las 15 o 20)  ← NUEVA TABLA
order_template_selections (
  id, order_id, template_id
  UNIQUE(order_id, template_id)
)

-- Links públicos con token
public_links (
  id, link_type, token (UUID), expires_at, revoked_at,
  demo_request_id, order_id
  -- link_type: 'DEMO_VIEW' | 'PAYMENT_UPLOAD' | 'FEEDBACK' | 'CHECKOUT'  ← CHECKOUT es nuevo
  -- CHECKOUT → order_id NOT NULL, demo_request_id NULL
)

-- Comprobante de pago (1 por orden)
payment_proofs (
  id, order_id, storage_key, payment_method, amount_cents,
  status  -- PENDING | APPROVED | REJECTED
  UNIQUE(order_id)
)

-- Outbox de emails
email_outbox (
  id, event_type, demo_request_id, order_id, to_email, subject, payload (JSONB)
  -- event_type incluye: UNIFIED_CHECKOUT_SENT  ← NUEVO
)

-- Catálogo de plantillas del modelo
personalized_templates (
  id, model_id, name, template_preview_key, is_active
)

personalized_models (id, category_id, name, is_active)
personalized_categories (id, name, is_active)
```

### Para aplicar cambios de schema

```bash
# Schema solo corre en fresh volume — siempre que cambies schemaPixelart.sql:
docker compose -f infra/docker/docker-compose.yml down -v --remove-orphans
docker compose -f infra/docker/docker-compose.yml up --build
```

---

## Backend — Archivos completos

### Estructura de módulos relevantes

```
backend/api/src/
├── demo/
│   ├── domain/
│   │   ├── demo-request.ts                          -- entidad dominio
│   │   └── ports/
│   │       └── demo-repository.port.ts              -- tipos y port abstracto
│   ├── application/use-cases/
│   │   ├── create-demo-request.use-case.ts
│   │   ├── list-demo-requests.use-case.ts
│   │   ├── get-demo-request-detail.use-case.ts
│   │   ├── upload-demo-proposal.use-case.ts
│   │   ├── send-demo-proposals.use-case.ts          -- flujo anterior (mantener)
│   │   ├── create-order-from-demo.use-case.ts       -- flujo anterior (mantener)
│   │   └── send-unified-checkout.use-case.ts        ← NUEVO
│   ├── infrastructure/persistence/
│   │   ├── entities/  (demo-request, demo-template-selection, demo-proposal orm entities)
│   │   ├── repositories/typeorm-demo.repository.ts
│   │   └── mappers/
│   ├── demo.service.ts                              ← actualizado
│   ├── demo-admin.controller.ts                     ← actualizado
│   ├── demo-public.controller.ts
│   └── demo.module.ts                               ← actualizado
│
├── checkout/                                        ← NUEVO MÓDULO COMPLETO
│   ├── application/use-cases/
│   │   ├── get-checkout-info.use-case.ts
│   │   └── submit-checkout.use-case.ts
│   ├── checkout.service.ts
│   ├── checkout-public.controller.ts
│   └── checkout.module.ts
│
├── orders/
│   ├── domain/ports/order-repository.port.ts        ← actualizado (extra_templates, updateExtraTemplates)
│   ├── infrastructure/persistence/
│   │   ├── entities/order.orm-entity.ts             ← actualizado
│   │   └── repositories/typeorm-order.repository.ts ← actualizado
│   ├── orders.service.ts                            ← actualizado (updateExtraTemplates)
│   └── orders.module.ts
│
├── public-links/
│   ├── domain/ports/public-links-repository.port.ts ← actualizado (CHECKOUT en CreateLinkData)
│   ├── public-links.service.ts
│   └── ...
│
└── app.module.ts                                    ← actualizado (importa CheckoutModule)
```

---

### `demo/domain/ports/demo-repository.port.ts`
**Tipos clave:**
```typescript
export type DemoRequestWithRelations = DemoRequest & {
  templateSelections: { id: number; templateId: number; templateName: string | null; templatePreviewKey: string | null }[];
  assetIds: number[];
  proposals: { id: number; templateId: number; outputStorageKey: string; protectionMode: string }[];
};
// También: catalogBookVariantId, personalizedModelId, deliveryDate, customerFullName, customerEmail, customerPhone, status
```
**Métodos del port:**
- `create(data)`, `findAll()`, `findById(id): DemoRequestWithRelations | null`
- `saveProposal(data)`, `updateStatus(id, status)`

---

### `demo/application/use-cases/send-unified-checkout.use-case.ts`
**Archivo:** `backend/api/src/demo/application/use-cases/send-unified-checkout.use-case.ts`
**Inyecta:** `DemoRepositoryPort`, `OrdersService`, `PublicLinksService`, `EmailService`, `DataSource`

**Lógica:**
1. `demoRepo.findById(demoRequestId)` — valida status=`RECEIVED` y proposals.length > 0
2. Query `catalog_book_variants WHERE id = detail.catalogBookVariantId` → `base_price_cents`
3. `ordersService.create({ channel:'CUSTOM_BOOK', demoRequestId, catalogBookVariantId, personalizedModelId, ... })`
4. `publicLinksService.generate({ linkType:'CHECKOUT', orderId: order.id })`
5. `emailService.queue({ eventType:'UNIFIED_CHECKOUT_SENT', ... payload: { checkoutUrl } })`
6. `demoRepo.updateStatus(demoRequestId, 'PROPOSALS_SENT')`
7. Retorna `{ status, orderId, checkoutLink: { token, url, expiresAt } }`

**URL generada:** `${NEXT_PUBLIC_URL}/checkout/${link.token}`

---

### `demo/demo-admin.controller.ts`
**Archivo:** `backend/api/src/demo/demo-admin.controller.ts`
**Rutas (todas bajo `/api/admin/demo`):**
```
GET  /requests                        → listAll()
GET  /requests/:id                    → getDetail()
POST /requests/:id/proposals          → uploadProposal() [multipart, query: templateId, protectionMode]
POST /requests/:id/send-proposals     → sendProposals()  [flujo anterior]
POST /requests/:id/create-order       → createOrder()    [flujo anterior]
POST /requests/:id/send-checkout      → sendUnifiedCheckout()  ← NUEVO
```

---

### `demo/demo.service.ts`
**Métodos:**
```typescript
create(data)
listAll()
getDetail(id)
uploadProposal(input: UploadProposalInput)
sendProposals(id)
createOrder(demoRequestId)
sendUnifiedCheckout(demoRequestId)   // ← NUEVO
```

---

### `orders/domain/ports/order-repository.port.ts`
**`CreateOrderData`** — campos relevantes:
```typescript
{
  channel: 'CUSTOM_BOOK' | 'PHOTOBOOK';
  demoRequestId?: number | null;
  catalogBookVariantId?: number | null;
  personalizedModelId?: number | null;
  customerFullName, customerEmail, customerPhone: string;
  baseAmountCents: number;
  rushFeeCents?: number;
  extraTemplatesAmountCents?: number;  // ← NUEVO, default 0
  estimatedDeliveryDate?: string | null;
}
```
**`OrderRecord`** — campos relevantes:
```typescript
{
  id, channel, status, publicToken,
  demoRequestId, personalizedModelId,
  customerFullName, customerEmail, customerPhone,
  baseAmountCents, rushFeeCents,
  extraTemplatesAmountCents,  // ← NUEVO
  totalAmountCents, currency,
  estimatedDeliveryDate, createdAt
}
```
**Métodos del port:**
- `create()`, `findAll()`, `findById()`, `findByPublicToken()`, `updateStatus()`
- `updateExtraTemplates(id, extraTemplatesAmountCents)` ← **NUEVO** — recalcula total

---

### `checkout/application/use-cases/get-checkout-info.use-case.ts`
**Archivo:** `backend/api/src/checkout/application/use-cases/get-checkout-info.use-case.ts`
**Inyecta:** `PublicLinksService`, `OrdersService`, `FileStoragePort`, `DataSource`

**Flujo:**
1. `publicLinksService.validate(token)` — valida linkType=`CHECKOUT`
2. `ordersService.findById(link.orderId)` → tiene `demoRequestId` y `personalizedModelId`
3. SQL: `demo_proposals JOIN personalized_templates WHERE demo_request_id = ?`
4. SQL: `demo_template_selections WHERE demo_request_id = ?` → `alreadySelectedIds`
5. SQL: `personalized_templates WHERE model_id = ? AND is_active = TRUE AND id NOT IN (demo_template_selections)` → `availableTemplates`
6. SQL: `personalized_models WHERE id = ?` → `model_name`
7. SQL: `payment_proofs WHERE order_id = ?` → `hasPaymentProof`

**Response:**
```typescript
{
  customerName, bookName, orderId,
  baseAmountCents, extraTemplatesAmountCents,
  currency, expiresAt,
  proposals: [{ templateId, templateName, templatePreviewUrl, imageUrl, protectionMode }],
  alreadySelectedTemplateIds: number[],
  availableTemplates: [{ id, name, previewUrl }],
  hasPaymentProof: boolean
}
```

---

### `checkout/application/use-cases/submit-checkout.use-case.ts`
**Archivo:** `backend/api/src/checkout/application/use-cases/submit-checkout.use-case.ts`
**Constantes clave (en el archivo):**
```typescript
const STANDARD_ADDITIONAL = 12;
const PREMIUM_ADDITIONAL = 17;
const EXTRA_TEMPLATES_PRICE_CENTS = 5000; // S/ 50 — cambiar aquí
```

**Input:**
```typescript
{
  token: string;
  additionalTemplateIds: number[];
  packageType: 'STANDARD' | 'PREMIUM';
  paymentBuffer: Buffer;
  originalFilename: string;
  mimeType: string;
}
```

**Flujo:**
1. Valida token CHECKOUT
2. Verifica no existe `payment_proofs WHERE order_id = ?`
3. Valida count de `additionalTemplateIds` según paquete
4. Valida que todos los template IDs pertenecen al `personalizedModelId` de la orden
5. Si PREMIUM: `ordersService.updateExtraTemplates(order.id, 5000)` → total se recalcula
6. Recarga orden (`findById`) para tener el total actualizado
7. Obtiene los 3 IDs originales de `demo_template_selections`
8. Inserta en `order_template_selections` (3 originales + adicionales) con `ON CONFLICT DO NOTHING`
9. Sube comprobante a MinIO: `uploads/vouchers/{orderId}.{ext}`
10. Inserta `payment_proofs` con `payment_method='YAPE_QR'`

**Response:**
```typescript
{ success: true, totalAmountCents, currency, message }
```

---

### `checkout/checkout-public.controller.ts`
**Archivo:** `backend/api/src/checkout/checkout-public.controller.ts`
**Rutas (bajo `/api/checkout`):**
```
GET  /:token           → getInfo(token)
POST /:token/submit    → submit() [multipart: packageType (body), additionalTemplateIds (body, CSV string), paymentProof (file)]
```
**Parsing de `additionalTemplateIds`:** llega como CSV string `"1,2,3"` desde el frontend, se split/map a `number[]`.

---

### `checkout/checkout.module.ts`
**Importa:** `MulterModule` (10MB limit), `PublicLinksModule`, `OrdersModule`, `AssetsModule`
**Providers:** `CheckoutService`, `GetCheckoutInfoUseCase`, `SubmitCheckoutUseCase`
**Registrado en:** `app.module.ts`

---

### `public-links/domain/ports/public-links-repository.port.ts`
```typescript
export type CreateLinkData = {
  linkType: 'DEMO_VIEW' | 'PAYMENT_UPLOAD' | 'FEEDBACK' | 'CHECKOUT';
  demoRequestId?: number | null;
  orderId?: number | null;
  ttlDays?: number;  // default 7
};
```

---

## Frontend — Archivos completos

### `components/ProposalBook.tsx`
**Archivo:** `frontend/web/src/components/ProposalBook.tsx`
**Uso:** Componente read-only que muestra las propuestas del admin con el mismo efecto page-flip que `TemplateBook`. Se usa en la sección "Tus propuestas" del checkout (desktop). En mobile se usa un grid de cards.
**Props:** `{ proposals: { templateId, templateName, imageUrl, protectionMode }[] }`
**Dependencia:** `page-flip` (ya instalada vía `TemplateBook`)

---

### `lib/api/checkout.ts`
**Archivo:** `frontend/web/src/lib/api/checkout.ts`
**Exports:**
```typescript
// Tipos
CheckoutProposal, AvailableTemplate, CheckoutInfo

// Funciones
getCheckoutInfo(token: string): Promise<CheckoutInfo>
submitCheckout(token, { additionalTemplateIds, packageType, paymentProof }): Promise<{...}>
```
**`submitCheckout`** usa `FormData`:
- `packageType`: string
- `additionalTemplateIds`: `ids.join(',')` (CSV)
- `paymentProof`: File

---

### `/checkout/[token]/page.tsx`
**Archivo:** `frontend/web/src/app/(public)/checkout/[token]/page.tsx`

**Constantes (en el archivo — cambiar acá si cambian las reglas):**
```typescript
const STANDARD_ADDITIONAL = 12;
const PREMIUM_ADDITIONAL = 17;
const EXTRA_PRICE_CENTS = 5000;
```

**Estado:**
```typescript
data: CheckoutInfo | null
pkg: 'STANDARD' | 'PREMIUM'          // paquete elegido
selectedTemplates: Set<number>        // IDs de plantillas adicionales seleccionadas
paymentFile: File | null
submitting, submitted, submittedTotal
```

**Secciones de la página:**
1. **Header** — nombre del cliente, nombre del libro, expiresAt
2. **Propuestas** — `ProposalBook` (efecto de libro page-flip) en desktop; grid 2 columnas en mobile
3. **Elegí tus plantillas:**
   - Package selector (2 cards: Standard / Premium)
   - Contador: `selectedTemplates.size / requiredAdditional`
   - `TemplateCarousel` — scroll horizontal snap, cards 140×140px, badge ✓ cuando seleccionada, disabled cuando ya llegó al máximo
4. **Comprobante de pago:**
   - Desglose de precios (con línea extra solo si PREMIUM)
   - QR placeholder
   - Upload de archivo (drag-replace visual)
5. **Botón sticky** `Confirmar pedido · S/ XX.XX` — disabled hasta `selectedTemplates.size === requiredAdditional && paymentFile !== null`

**Guards:**
- Si `data.hasPaymentProof === true` al cargar → muestra `SuccessScreen` directamente
- Si error de API → `ErrorScreen`

---

### `/admin/libros-personalizados/solicitudes/[id]/page.tsx`
**Archivo:** `frontend/web/src/app/admin/libros-personalizados/solicitudes/[id]/page.tsx`

**Estado relevante:**
```typescript
sending: boolean                    // "Enviar propuestas" (flujo anterior)
generatedLink: { url, expiresAt }  // resultado de send-proposals
creatingOrder: boolean             // "Generar Orden + Link de Pago" (flujo anterior)
paymentLink: { url, orderId, total }
sendingCheckout: boolean           // ← NUEVO
checkoutLink: { url, orderId }     // ← NUEVO
```

**Botones de envío (aparecen cuando `data.proposals.length > 0 && data.status === "RECEIVED"`):**

1. **"Enviar link unificado"** (destacado en violeta) — llama `POST /api/admin/demo/requests/${id}/send-checkout` → setea `checkoutLink`
2. **"Solo enviar propuestas (flujo anterior)"** (discreto, borde gris) — llama `POST /api/admin/demo/requests/${id}/send-proposals` → setea `generatedLink`

**Cuando `data.status === "PROPOSALS_SENT"` y no hay `paymentLink`:**
- Botón "Generar Orden + Link de Pago" (flujo anterior) — llama `POST /api/admin/demo/requests/${id}/create-order`

---

## Cambios habituales — Cómo hacerlos

### Cambiar el precio de las 5 plantillas extra
Editá **DOS archivos** (mantenerlos sincronizados):
- `backend/api/src/checkout/application/use-cases/submit-checkout.use-case.ts` → `EXTRA_TEMPLATES_PRICE_CENTS`
- `frontend/web/src/app/(public)/checkout/[token]/page.tsx` → `EXTRA_PRICE_CENTS`

### Cambiar la cantidad de plantillas requeridas
Editá **TRES archivos**:
- `backend/api/src/checkout/application/use-cases/submit-checkout.use-case.ts` → `STANDARD_ADDITIONAL`, `PREMIUM_ADDITIONAL`
- `frontend/web/src/app/(public)/checkout/[token]/page.tsx` → `STANDARD_ADDITIONAL`, `PREMIUM_ADDITIONAL`
- Si cambia el total del libro (actualmente 15 y 20): actualizar también los textos en la página

### Agregar un nuevo paquete (ej. Ultra con 25 plantillas)
1. Agregar el tipo en `submit-checkout.use-case.ts` (`SubmitCheckoutInput.packageType`)
2. Agregar constante y case en `submit-checkout.use-case.ts`
3. Agregar card en el package selector de `checkout/[token]/page.tsx`
4. Agregar constante en `page.tsx`

### Cambiar el método de pago (agregar Plin, tarjeta, etc.)
1. En `submit-checkout.use-case.ts` → el campo `payment_method` en el INSERT está hardcodeado a `'YAPE_QR'`. Cambiar o recibir del cliente.
2. En `page.tsx` → sección "Pagá con Yape", agregar selector de método.

### Cambiar el máximo de fotos en el wizard (Step 1)
Editá **TRES lugares** (mantenerlos sincronizados):
- `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx` → `const MAX_PHOTOS = 5`
- `backend/api/src/demo/application/use-cases/create-demo-request.use-case.ts` → `data.assetIds.length > 5`
- `backend/api/src/assets/assets.controller.ts` → `@Throttle({ default: { limit: 20, ttl: 60000 } })` (debe ser `>= MAX_PHOTOS * 4` para dar margen)

### Cambiar el TTL del link de checkout
En `public-links/infrastructure/persistence/repositories/typeorm-public-links.repository.ts`:
```typescript
const ttlDays = data.ttlDays ?? 7;  // ← cambiar el default aquí
```
O pasar `ttlDays: X` al llamar `publicLinksService.generate(...)` en `send-unified-checkout.use-case.ts`.

### Ver el email que se envía al cliente
El email se inserta en `email_outbox` con `event_type='UNIFIED_CHECKOUT_SENT'` y payload:
```json
{ "customerName": "...", "checkoutUrl": "http://localhost:3000/checkout/<token>", "totalAmountCents": 8900 }
```
El sender de emails (worker) consume esta tabla. Buscar en `backend/api/src/email/` el worker que procesa esta cola.

### Agregar más info en el GET /checkout/:token
Editá `get-checkout-info.use-case.ts`. Todas las queries son SQL raw con `DataSource`. Seguir el mismo patrón.

---

## Gotchas importantes

1. **Schema en fresh volume — NO usar `down -v` si hay datos en MinIO.** El `schemaPixelart.sql` solo corre en la primera inicialización del volumen. Para volúmenes existentes, los cambios se aplican manualmente con `ALTER TABLE` / `ALTER TYPE` (ver sección "Migraciones manuales" abajo). Nunca `docker compose down -v` si hay imágenes cargadas en MinIO.

2. **TypeORM bigint → string.** Todos los IDs y amounts en las ORM entities son `string` (TypeORM mapea BIGINT así). En los `toRecord()` mappers se convierten a `number` con `Number(e.id)`.

3. **`additionalTemplateIds` como CSV.** El frontend envía los IDs como string CSV en el FormData (`"1,2,3"`). El controller lo parsea. Si en algún momento cambiás a JSON body, tenés que cambiar el controller y el `lib/api/checkout.ts`.

4. **La query de templates disponibles excluye los 3 ya en `demo_template_selections`.** Si el cliente quiere rearmar su selección original, habría que cambiar esa query.

5. **`order_template_selections` incluye los 3 originales + los adicionales.** Esto es intencional: representa el set COMPLETO de plantillas del pedido en producción.

6. **El token CHECKOUT referencia `order_id` (no `demo_request_id`).** Para llegar a la demo request desde el checkout se navega: `link.orderId → order.demoRequestId`.

7. **El check constraint del total de la orden.** Si necesitás agregar otro componente al precio, hay que modificar la columna en la tabla `orders`, el ORM entity, el port, el repository, y el CHECK constraint en el schema.

8. **`sendUnifiedCheckout` requiere `status=RECEIVED`.** No se puede re-enviar si ya está en `PROPOSALS_SENT`. Si el admin necesita re-enviar, habría que revocar el link anterior y resetear el status.

9. **Upload de fotos: una request por archivo.** El endpoint `POST /api/assets/upload-public` acepta un solo archivo por request (Multer `FileInterceptor('file')`). El hook `usePhotoUpload` sube en paralelo con `MAX_CONCURRENT=3`. El throttle está en 20 req/60s, suficiente para hasta 5 fotos con reintentos.

---

## Migraciones manuales — Para volúmenes existentes

Cuando el volumen de Postgres ya tiene datos (MinIO con imágenes cargadas), **nunca** usar `docker compose down -v`. En cambio, conectarse y aplicar los cambios en caliente:

```bash
docker exec pixelart_postgres psql -U pixelart -d pixelart -c "<SQL aquí>"
```

### Historial de migraciones aplicadas

Todas están también en el seed (`seed.ts`, sección `0. Schema migrations`) para que en un despliegue nuevo corran automáticamente.

#### v1 — Checkout unificado (2026-04-13)

```sql
-- 1. Nuevos valores de enum
ALTER TYPE public_link_type ADD VALUE IF NOT EXISTS 'CHECKOUT';
ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'UNIFIED_CHECKOUT_SENT';

-- 1b. Actualizar CHECK constraint de public_links para incluir CHECKOUT
-- CRÍTICO: sin esto, insertar un link tipo CHECKOUT viola el constraint y da 500
ALTER TABLE public_links DROP CONSTRAINT IF EXISTS chk_public_links_type_reference;
ALTER TABLE public_links ADD CONSTRAINT chk_public_links_type_reference CHECK (
  (link_type = 'DEMO_VIEW'      AND demo_request_id IS NOT NULL AND order_id IS NULL)
  OR (link_type = 'PAYMENT_UPLOAD' AND order_id IS NOT NULL     AND demo_request_id IS NULL)
  OR (link_type = 'FEEDBACK'    AND order_id IS NOT NULL        AND demo_request_id IS NULL)
  OR (link_type = 'CHECKOUT'    AND order_id IS NOT NULL        AND demo_request_id IS NULL)
);

-- 2. Nueva columna en orders
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS extra_templates_amount_cents BIGINT NOT NULL DEFAULT 0
    CHECK (extra_templates_amount_cents >= 0);

-- 3. Actualizar CHECK constraint del total (ahora incluye extra_templates)
ALTER TABLE orders DROP CONSTRAINT IF EXISTS chk_total_amount;
ALTER TABLE orders ADD CONSTRAINT chk_total_amount
  CHECK (total_amount_cents = base_amount_cents + rush_fee_cents + extra_templates_amount_cents);

-- 4. Nueva tabla para plantillas definitivas del pedido
CREATE TABLE IF NOT EXISTS order_template_selections (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id    BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  template_id BIGINT NOT NULL REFERENCES personalized_templates(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (order_id, template_id)
);
CREATE INDEX IF NOT EXISTS order_template_selections_order_id_idx
  ON order_template_selections(order_id);
```

> **Importante:** `ADD VALUE IF NOT EXISTS` en enums no puede correr dentro de una transacción en Postgres < 12. Ejecutar cada `ALTER TYPE` como statement separado (el seed ya lo hace así).

### Patrón para futuras migraciones

Cada vez que agregues una columna, tabla, enum value, o constraint:
1. Editá `schemaPixelart.sql` (fuente de verdad para fresh volumes)
2. Agregá el `ALTER` correspondiente al seed en la sección `0. Schema migrations`
3. Ejecutá el `ALTER` manualmente en el contenedor corriendo
4. Documentá acá con fecha y descripción

---

## Rutas de la app

| URL (cliente) | Archivo frontend |
|---------------|-----------------|
| `/checkout/:token` | `app/(public)/checkout/[token]/page.tsx` |
| `/demo/:token` | `app/(public)/demo/[token]/page.tsx` (flujo anterior) |
| `/pagar/:token` | `app/(public)/pagar/[token]/page.tsx` (flujo anterior) |

| URL (admin) | Archivo frontend |
|-------------|-----------------|
| `/admin/libros-personalizados/solicitudes` | `app/admin/libros-personalizados/solicitudes/page.tsx` |
| `/admin/libros-personalizados/solicitudes/:id` | `app/admin/libros-personalizados/solicitudes/[id]/page.tsx` |

| Endpoint API | Módulo backend |
|--------------|---------------|
| `GET /api/checkout/:token` | `checkout/checkout-public.controller.ts` |
| `POST /api/checkout/:token/submit` | `checkout/checkout-public.controller.ts` |
| `POST /api/admin/demo/requests/:id/send-checkout` | `demo/demo-admin.controller.ts` |
| `POST /api/admin/demo/requests/:id/send-proposals` | `demo/demo-admin.controller.ts` |
| `POST /api/admin/demo/requests/:id/create-order` | `demo/demo-admin.controller.ts` |
| `POST /api/demo/requests` | `demo/demo-public.controller.ts` |
| `GET /api/demo/view/:token` | `demo/demo-public.controller.ts` |
| `GET /api/payment/:token` | `payments/payments-public.controller.ts` |
| `POST /api/payment/:token/voucher` | `payments/payments-public.controller.ts` |
