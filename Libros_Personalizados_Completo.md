# Libros Personalizados — Documentación Completa

> Última actualización: 2026-05-11

---

## 1. Visión General del Flujo

El proceso de **Libros Personalizados** es el flujo principal de PixelArt. El cliente elige un libro, personaliza su pedido, el admin genera propuestas (demos) y finalmente el cliente paga y confirma.

```
Cliente elige libro
       ↓
Wizard de personalización (4 pasos)
       ↓
Admin recibe solicitud demo (RECEIVED)
       ↓
Admin sube propuestas de diseño (3 plantillas)
       ↓
Admin envía link unificado de checkout
       ↓
Cliente ve propuestas, elige plantillas restantes, paga
       ↓
Admin verifica pago → orden a producción
```

---

## 2. Precios Definitivos

| Plan       | Tapa     | Precio   |
|------------|----------|----------|
| Estándar   | Delgada  | S/ 130   |
| Estándar   | Gruesa   | S/ 150   |
| Premium    | Delgada  | S/ 170   |
| Premium    | Gruesa   | S/ 190   |

- **Extra premium**: siempre +S/ 40 (`EXTRA_PRICE_CENTS = 4000`) sin importar la tapa
- **Express**: +S/ 25 (`RUSH_FEE_CENTS = 2500`)
- **Estándar**: 10 plantillas (3 demo + 7 adicionales)
- **Premium**: 15 plantillas (3 demo + 12 adicionales)

### Constantes de precios (backend)
```ts
// submit-checkout.use-case.ts
const STANDARD_ADDITIONAL = 7;
const PREMIUM_ADDITIONAL = 12;
const EXTRA_TEMPLATES_PRICE_CENTS = 4000;
```

### Constantes de precios (frontend)
```ts
// checkout/[token]/page.tsx
const STANDARD_ADDITIONAL = 7;
const PREMIUM_ADDITIONAL = 12;
const EXTRA_PRICE_CENTS = 4000;
```

### Seeds (backend/api/src/database/seed.ts)
- Libros personalizados TAPA_DELGADA: `13000` (S/ 130)
- Libros personalizados TAPA_GRUESA: `15000` (S/ 150)
- Photobook TAPA_DELGADA: `9000` (S/ 90)
- Photobook TAPA_GRUESA: `12000` (S/ 120)
- Seeds usan `ON CONFLICT DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents`

---

## 3. Wizard de Personalización (Frontend)

**Archivo**: `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx`

### Paso 1: Datos del cliente
- Nombre, email, teléfono, dirección, fecha de entrega
- Checkbox: "Quiero entrega express" (+S/ 25)
- Checkbox: dedicatoria personalizada + campo de texto

### Paso 2: Selección de plantillas (3 obligatorias)
- `TemplateBook` component con page-flip en desktop, grid en mobile/tablet
- Botón "Siguiente" **deshabilitado hasta seleccionar exactamente 3**:
  ```tsx
  disabled={selectedTemplates.length < 3}
  ```

### Paso 3: Personalización
Orden en pantalla:
1. **Selector de plan** (10 / 15 plantillas) — SVGs profesionales, sin precios en las cards
2. **Selector de tapa** (Delgada / Gruesa) — con descripción, sin precio
3. **Bloque de precio consolidado** — muestra tapa + plan + express → total
4. Campo de dedicatoria (si la activó)

#### Estado `selectedPackage`
```tsx
const [selectedPackage, setSelectedPackage] = useState<"STANDARD" | "PREMIUM">("STANDARD");
const EXTRA_PLANTILLAS_CENTS = 4000;
```

### Paso 4: Resumen
- Filas con label/value para cada dato
- Tapa muestra solo el tipo: `selectedVariant.coverType.replace("TAPA_", "Tapa ")`
- **No** muestra precio en la fila de tapa
- Bloque de precio completo al fondo (igual al paso 3)
- Botones "Anterior" y "Confirmar y enviar" **centrados**

### Paso 5: Envío
- SVG de papel avión (no emoji)
- Pantalla de confirmación: círculo verde con checkmark SVG

### POST al enviar
```ts
body: JSON.stringify({
  // ...datos del cliente...
  packagePreference: selectedPackage,  // "STANDARD" | "PREMIUM"
})
```

---

## 4. TemplateBook Component

**Archivo**: `frontend/web/src/components/TemplateBook.tsx`

### Variantes de renderizado
- **Mobile** (`isMobile`): `MobileGrid` con 2 columnas
- **Tablet** (`isTablet`): `MobileGrid` con 3 columnas
- **Desktop**: `DesktopBook` con page-flip

### Slots dinámicos (selection bar)
Los slots son **dinámicos** según `maxSelections`:

```ts
const sz = maxSelections <= 3 ? 44 : maxSelections <= 7 ? 36 : 26;
const gap = maxSelections <= 3 ? 6 : maxSelections <= 7 ? 5 : 3;
const cols = maxSelections > 7 ? Math.ceil(maxSelections / 2) : maxSelections;
```

- `maxSelections <= 7` → fila única (ej: 7 slots para plan estándar)
- `maxSelections > 7` → **grid de 2 filas** (ej: 12 slots para plan premium en 2 filas de 6)
- Usa `display: grid` con `gridTemplateColumns: repeat(cols, ${sz}px)`
- Sin scroll horizontal (se eliminó el `maxWidth: 320px` que cortaba los slots)

---

## 5. Base de Datos — Cambios Aplicados

### Columnas añadidas a `demo_request`
```sql
ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS wants_rush BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS package_preference VARCHAR(10) NOT NULL DEFAULT 'STANDARD';
```

### Schema actualizado (`schemaPixelart.sql`)
- `wants_rush BOOLEAN NOT NULL DEFAULT FALSE`
- `package_preference VARCHAR(10) NOT NULL DEFAULT 'STANDARD'`

### Estados de la orden (`orders.status`)
```
AWAITING_PAYMENT_PROOF → UNDER_PAYMENT_REVIEW → PAYMENT_VERIFIED → IN_PRODUCTION → SHIPPED → DELIVERED
                                              ↘ REJECTED → AWAITING_PAYMENT_PROOF
CANCELLED (desde cualquier estado activo)
```

---

## 6. Backend — Módulos Involucrados

### Demo Request

**Dominio**: `backend/api/src/demo/domain/demo-request.ts`
- Campos: `wantsRush`, `packagePreference`

**ORM Entity**: `backend/api/src/demo/infrastructure/persistence/entities/demo-request.orm-entity.ts`
```ts
@Column({ name: 'package_preference', type: 'varchar', length: 10, default: 'STANDARD' })
packagePreference!: string;
```

**Mapper**: `backend/api/src/demo/infrastructure/persistence/mappers/demo-request.mapper.ts`
- Incluye `orm.packagePreference ?? 'STANDARD'`

**Port**: `backend/api/src/demo/domain/ports/demo-repository.port.ts`
- `CreateDemoRequestData`: incluye `packagePreference?: string`
- `DemoRequestWithRelations`: incluye `coverType: string | null`

**Repository**: `backend/api/src/demo/infrastructure/persistence/repositories/typeorm-demo.repository.ts`
- `create()`: guarda `packagePreference: data.packagePreference ?? 'STANDARD'`
- `findById()`: hace JOIN a `catalog_book_variants` para obtener `coverType`

### Checkout

**Get Info**: `backend/api/src/checkout/application/use-cases/get-checkout-info.use-case.ts`
- Usa `findByToken()` (no `validate()`) para no tirar error en links revocados
- Si link expirado sin revocar → `ForbiddenException`
- Si link revocado → devuelve `{ orderStatus: order.status }` (respuesta mínima)
- Si link válido → devuelve info completa incluyendo `orderStatus`, `rushFeeCents`, `packagePreference`

**Submit**: `backend/api/src/checkout/application/use-cases/submit-checkout.use-case.ts`
- Valida cantidad de plantillas según `packageType`
- Si PREMIUM → llama `updateExtraTemplates(order.id, 4000)`
- Inserta `order_template_selections` (3 originales + adicionales)
- Sube comprobante a MinIO en `uploads/vouchers/{orderId}.{ext}`
- **Revoca el link** después de enviar
- Avanza orden a `UNDER_PAYMENT_REVIEW`

**Public Links Service**: `backend/api/src/public-links/public-links.service.ts`
- Método `findByToken()` agregado (sin validar, para uso en checkout info)

### Admin — Detalle de Solicitud

**Get Detail**: `backend/api/src/demo/application/use-cases/get-demo-request-detail.use-case.ts`
- Busca la orden **directamente** por `demo_request_id` en tabla `orders` (no via public_links)
- Esto garantiza que `orderId` siempre se devuelve aunque el link esté revocado
- `hasPaymentProof` también usa el `linkedOrderId` directo

```ts
// Buscar orden directamente (no via public_links)
const orderRows = await dataSource.query(
  `SELECT id AS order_id FROM orders WHERE demo_request_id = $1 ORDER BY created_at DESC LIMIT 1`,
  [id],
);
```

---

## 7. Frontend — Checkout Page

**Archivo**: `frontend/web/src/app/(public)/checkout/[token]/page.tsx`

### Tipos (`frontend/web/src/lib/api/checkout.ts`)
```ts
type CheckoutInfo = {
  orderStatus: string;          // nuevo — siempre presente
  packagePreference: 'STANDARD' | 'PREMIUM';  // nuevo
  rushFeeCents: number;         // nuevo
  customerName: string;
  bookName: string;
  // ...resto de campos
}
```

### Pantallas según estado
```tsx
// Link revocado → solo llega { orderStatus }
if (!data.customerName) {
  const approved = ['PAYMENT_VERIFIED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'].includes(data.orderStatus);
  if (approved) return <ApprovedScreen />;
  return <PendingScreen />;
}

// Recién envió en esta sesión
if (submitted) return <PendingScreen />;
```

| Estado | Pantalla | Color |
|--------|----------|-------|
| `UNDER_PAYMENT_REVIEW` | "Comprobante enviado — esperando revisión" | Ámbar 🕐 |
| `PAYMENT_VERIFIED` / `IN_PRODUCTION` / etc. | "¡Pago aprobado!" | Verde ✓ |
| Link expirado sin pago | Error: "El link expiró. Contactá al equipo." | Rojo |

### Upsell de plan (solo para usuarios STANDARD)
- `pkg` se inicializa desde `info.packagePreference`
- Si `packagePreference === 'STANDARD'` → muestra card de upsell a 15 plantillas (+S/ 40)
- Si `packagePreference === 'PREMIUM'` → no muestra upsell, directo a 15 plantillas
- Al cambiar de plan → limpia `selectedTemplates`

### Total en pantalla
```ts
const totalDisplay = baseAmount + rushAmount + extraAmount;
// rushAmount = data.rushFeeCents ?? 0
// extraAmount = pkg === "PREMIUM" ? 4000 : 0
```

---

## 8. Admin — Solicitudes Demo

**Archivo**: `frontend/web/src/app/admin/libros-personalizados/solicitudes/[id]/page.tsx`

### Header
- `Solicitud #ID` + badge de estado
- **Chip "Orden #X →"** (vinculado a `/admin/ordenes/X`) — siempre visible si existe orden
- Nombre del cliente
- Contador propuestas (X/3)

### Sección "Datos del cliente"
- Grid 4 columnas: Email, Teléfono, Dirección, Fecha entrega
- Fila extra: Dedicatoria + Mensaje adicional (con `whiteSpace: pre-wrap`, `wordBreak: break-word`)

### Sección "Detalles del pedido"
- Grid 4 columnas: Tipo de tapa, Plantillas (10/15), Tipo de entrega (Express en ámbar), Fecha deseada

### Estados del CTA inferior
1. **Sin checkout enviado** (`RECEIVED` + propuestas subidas): botón "Enviar link unificado"
2. **Link activo esperando pago** (`PROPOSALS_SENT`): URL copiable + botones Copiar/Renovar
3. **Pago recibido**: badge verde "Proceso completado" + botón "Ver orden →"
4. **Link expirado sin pago**: badge naranja + botón "Renovar link"

---

## 9. Archivos Clave — Referencia Rápida

| Archivo | Rol |
|---------|-----|
| `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx` | Wizard completo del cliente |
| `frontend/web/src/components/TemplateBook.tsx` | Selector de plantillas con page-flip |
| `frontend/web/src/app/(public)/checkout/[token]/page.tsx` | Página de checkout del cliente |
| `frontend/web/src/lib/api/checkout.ts` | Tipos y fetch wrappers de checkout |
| `frontend/web/src/app/admin/libros-personalizados/solicitudes/[id]/page.tsx` | Detalle de solicitud en admin |
| `frontend/web/src/app/admin/libros-personalizados/solicitudes/page.tsx` | Lista de solicitudes en admin |
| `backend/api/src/checkout/application/use-cases/get-checkout-info.use-case.ts` | Info del checkout (maneja link revocado) |
| `backend/api/src/checkout/application/use-cases/submit-checkout.use-case.ts` | Procesa el pago + revocar link |
| `backend/api/src/demo/application/use-cases/get-demo-request-detail.use-case.ts` | Detalle de solicitud para admin |
| `backend/api/src/demo/application/use-cases/send-unified-checkout.use-case.ts` | Genera orden + link unificado |
| `backend/api/src/demo/application/use-cases/reissue-checkout-link.use-case.ts` | Renueva link expirado |
| `backend/api/src/public-links/public-links.service.ts` | Gestión de links públicos |
| `backend/api/src/orders/orders.service.ts` | Estados y transiciones de órdenes |
| `backend/api/src/database/seed.ts` | Seeds con precios actualizados |
| `schemaPixelart.sql` | Schema completo (fuente de verdad) |

---

## 10. Decisiones de Diseño Importantes

### Por qué `findByToken` en lugar de `validate` en checkout info
`validate()` tira `ForbiddenException` si el link está revocado. El checkout lo revoca al pagar. Si el cliente vuelve a entrar, necesitamos mostrarle el estado del pedido, no un error. Por eso `get-checkout-info` usa `findByToken()` directamente y maneja los estados manualmente.

### Por qué buscar la orden por `demo_request_id` directamente
La query anterior buscaba la orden via `public_links`. Cuando el link se revocar post-pago, la query no encontraba nada y el admin no veía el chip "Orden #X". La query directa a `orders WHERE demo_request_id = $1` es más robusta e independiente del estado del link.

### Por qué grid de 2 filas para slots > 7
El plan premium requiere seleccionar 12 plantillas adicionales. Con `display: flex` y `maxWidth: 320px`, 12 slots × 28px + gaps = 380px → se cortaban. Con `display: grid` de 2 filas de 6 (26px cada una) = 171px de ancho, todos visibles sin scroll.

### Por qué `packagePreference` viaja del wizard al checkout
El cliente elige 10 o 15 plantillas en el wizard ANTES de que el admin procese nada. El admin necesita saber cuántas plantillas preparar. El checkout inicializa `pkg` desde `packagePreference` para mostrar el plan correcto, y ofrece upsell solo a quienes eligieron 10.
