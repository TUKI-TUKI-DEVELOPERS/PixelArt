# PixelArt — Documento de Proyecto

> Estado: **MVP en construcción** — Infraestructura y base de datos lista, lógica de negocio pendiente.
> Última actualización: 2026-02-27

---

## Índice

1. [Descripción del negocio](#1-descripción-del-negocio)
2. [Flujos de negocio](#2-flujos-de-negocio)
3. [Stack técnico](#3-stack-técnico)
4. [Estructura del monorepo](#4-estructura-del-monorepo)
5. [Base de datos](#5-base-de-datos)
6. [Infraestructura Docker](#6-infraestructura-docker)
7. [Variables de entorno](#7-variables-de-entorno)
8. [Seeds](#8-seeds)
9. [API — Endpoints implementados](#9-api--endpoints-implementados)
10. [Frontend](#10-frontend)
11. [Decisiones técnicas](#11-decisiones-técnicas)
12. [Estado actual y próximos pasos](#12-estado-actual-y-próximos-pasos)
13. [Comandos de referencia rápida](#13-comandos-de-referencia-rápida)

---

## 1. Descripción del negocio

**PixelArt** es una plataforma de venta de libros personalizados y fotolibros en Perú.

### Productos

| Producto | Descripción |
|---|---|
| **Custom Book** | Libro personalizado con plantillas prediseñadas. El cliente solicita una demo, el admin prepara propuestas y se concreta la orden. Moneda: PEN. |
| **Photobook** | Fotolibro armado desde un editor web. El cliente selecciona un tema (portada), sube fotos, organiza páginas y confirma el proyecto. Moneda: PEN. |

### Tipos de usuarios

| Rol | Descripción |
|---|---|
| `ADMIN` | Acceso total: gestión de catálogo, revisión de pagos, producción, configuración. |
| `OPERATOR` | Gestión operativa (producción, envíos). |
| `VIEWER` | Solo lectura (consultas, reportes). |

Los **clientes** no tienen cuenta en el sistema — interactúan a través de **links públicos con token UUID** que el admin genera y les envía.

---

## 2. Flujos de negocio

### Flujo Custom Book (17 pasos)

```
1.  Cliente visita el catálogo → selecciona un Custom Book
2.  Elige categoría → modelo → hasta 3 plantillas (sin preview)
3.  Completa datos: nombre, email, teléfono, dirección, fecha de entrega
4.  Sube fotos (assets) para personalizar el libro
5.  Sistema crea demo_request (status: RECEIVED)
6.  Admin recibe notificación por email_outbox
7.  Admin genera propuestas (demo_proposals) con watermark/baja calidad
8.  Admin actualiza demo_request → status: PROPOSALS_SENT
9.  Sistema envía link público (public_link tipo DEMO_VIEW) al cliente
10. Cliente ve las propuestas y elige
11. Admin crea la orden (orders, channel: CUSTOM_BOOK)
12. Admin envía link de pago (public_link tipo PAYMENT_UPLOAD)
13. Cliente sube voucher (payment_proofs, status: PENDING)
14. Admin revisa voucher → APPROVED o REJECTED
15. Orden avanza: PAYMENT_VERIFIED → IN_PRODUCTION → SHIPPED → DELIVERED
16. Admin envía link de feedback (public_link tipo FEEDBACK)
17. Cliente deja rating (feedback con model_id)
```

### Flujo Photobook

```
1.  Cliente accede al editor de fotolibros
2.  Selecciona producto (photobook_products) y tema/portada (photobook_themes)
3.  Sube fotos (assets, deduplicadas por content_hash SHA-256)
4.  Organiza páginas (photobook_pages) y slots (photobook_page_slots)
5.  Sistema calcula total: price_per_page_cents × page_count
6.  Cliente confirma proyecto → status: CONFIRMED (requiere nombre + teléfono)
7.  Sistema crea orden (orders, channel: PHOTOBOOK, vincula photobook_project_id)
8.  Continúa igual que Custom Book desde el paso 12 (link de pago)
9.  Feedback con photobook_theme_id (no model_id)
```

### Admin marketing

- **`site_config`**: configuración de banners/modals (clave-valor JSONB).
- **`rush_fee_rules`**: tarifas por urgencia configurables; se aplican según días hasta entrega.

---

## 3. Stack técnico

| Capa | Tecnología | Versión |
|---|---|---|
| Backend | NestJS | ^10 |
| ORM | TypeORM | ^0.3 |
| Frontend | Next.js (App Router) | ^15 |
| Base de datos | PostgreSQL | 16-alpine |
| Cache / Queue | Redis | 7-alpine |
| Storage S3 | MinIO | latest |
| Email | Resend / SendGrid | placeholder (no integrado) |
| Runtime | Node.js | 20 LTS |
| Contenerización | Docker + Docker Compose | v3.9 |
| Hashing contraseñas | bcryptjs | ^2.4.3 |
| Gestor de paquetes | npm workspaces | - |

---

## 4. Estructura del monorepo

```
pixelart/
├── backend/
│   └── api/                        # NestJS — puerto 3001
│       ├── src/
│       │   ├── app.module.ts        # ConfigModule + TypeORM (synchronize: false)
│       │   ├── app.controller.ts    # GET /api/health
│       │   ├── main.ts              # Bootstrap + SEED_ON_BOOT
│       │   └── database/
│       │       └── seed.ts          # Seeds idempotentes con pg directo
│       ├── Dockerfile               # targets: dev / build / prod
│       ├── .dockerignore
│       ├── nest-cli.json
│       ├── tsconfig.json
│       ├── tsconfig.build.json
│       └── package.json
│
├── frontend/
│   └── web/                        # Next.js — puerto 3000
│       ├── src/app/
│       │   ├── layout.tsx
│       │   └── page.tsx             # Placeholder
│       ├── Dockerfile               # targets: dev / build / prod
│       ├── .dockerignore
│       ├── next.config.ts           # Rewrite /api/* con API_INTERNAL_URL
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                     # Tipos y utilidades compartidas (placeholder)
│       ├── src/index.ts
│       └── package.json
│
├── infra/
│   └── docker/
│       └── docker-compose.yml      # Full-docker: postgres, redis, minio, minio-mc, api, web
│
├── schemaPixelart.sql              # Schema PostgreSQL completo (MVP-ready)
├── .env.docker                     # Variables para modo full-docker
├── .env.example                    # Variables para modo híbrido (local)
├── .gitignore
├── .editorconfig
├── package.json                    # npm workspaces: backend/*, frontend/*, packages/*
├── README.md
└── PROYECTO.md                     # Este archivo
```

---

## 5. Base de datos

### Motor y extensiones

- **PostgreSQL 16**
- `pgcrypto` — genera UUIDs con `gen_random_uuid()` y soporte de hashing

### ENUMs definidos

| Enum | Valores |
|---|---|
| `product_type` | `CUSTOM_BOOK`, `PHOTOBOOK` |
| `personalized_book_demo_request_status` | `RECEIVED`, `PROPOSALS_SENT`, `CANCELLED` |
| `order_status` | `AWAITING_PAYMENT_PROOF`, `UNDER_PAYMENT_REVIEW`, `PAYMENT_VERIFIED`, `REJECTED`, `IN_PRODUCTION`, `SHIPPED`, `DELIVERED`, `CANCELLED` |
| `payment_method` | `YAPE_QR`, `PLIN`, `CARD` |
| `payment_proof_status` | `PENDING`, `APPROVED`, `REJECTED` |
| `email_outbox_status` | `PENDING`, `SENT`, `FAILED` |
| `email_event_type` | `PROPOSALS_SENT_TO_CUSTOMER`, `PAYMENT_PROOF_RECEIVED_ADMIN`, `PAYMENT_APPROVED_TO_CUSTOMER`, `PAYMENT_REJECTED_TO_CUSTOMER`, `DELIVERY_FEEDBACK_REQUEST` |
| `refund_status` | `NOT_REQUESTED`, `REQUESTED`, `APPROVED`, `REJECTED`, `PROCESSED` |
| `public_link_type` | `DEMO_VIEW`, `PAYMENT_UPLOAD`, `FEEDBACK` |
| `photobook_project_status` | `DRAFT`, `CONFIRMED`, `CONVERTED_TO_ORDER`, `CANCELLED` |

### Tablas

#### Usuarios y configuración

| Tabla | Descripción | Clave |
|---|---|---|
| `users` | Admin/Operator/Viewer del sistema | `id`, email único (LOWER) |
| `site_config` | Configuración de marketing (banners, modals) | `key` TEXT PK |
| `rush_fee_rules` | Tarifas por urgencia | `id`, `days_threshold`, `fee_cents` |

#### Catálogo (productos del home)

| Tabla | Descripción | Relaciones |
|---|---|---|
| `catalog_books` | Producto vendible (CUSTOM_BOOK o PHOTOBOOK) | - |
| `catalog_book_variants` | Variantes de tapa (solo para CUSTOM_BOOK) | → `catalog_books` |

#### Personalizado (árbol de selección)

| Tabla | Descripción | Relaciones |
|---|---|---|
| `personalized_categories` | Categorías temáticas | - |
| `personalized_models` | Modelos dentro de cada categoría | → `personalized_categories` |
| `personalized_templates` | Plantillas con preview en storage | → `personalized_models` |

#### Assets

| Tabla | Descripción | Clave |
|---|---|---|
| `assets` | Archivos subidos, deduplicados por SHA-256 | `content_hash` UNIQUE, `storage_key` UNIQUE |

#### Demo (Custom Book)

| Tabla | Descripción | Relaciones |
|---|---|---|
| `demo_request` | Solicitud del cliente | → catálogo, categoría, modelo |
| `demo_request_assets` | Fotos del cliente para la demo | → `demo_request`, `assets` |
| `demo_template_selections` | Hasta 3 plantillas elegidas | → `demo_request`, `personalized_templates` |
| `demo_proposals` | Propuestas generadas por el admin (watermark) | → `demo_request`, `personalized_templates` |

#### Órdenes

| Tabla | Descripción | Notas |
|---|---|---|
| `orders` | Orden unificada para CUSTOM_BOOK y PHOTOBOOK | `public_token` UUID único, CHECK `total = base + rush` |
| `public_links` | Links temporales para clientes (TTL 7 días, reemisión) | tipo → referencia exclusiva por CHECK |
| `payment_proofs` | Voucher de pago (1 por orden) | status: PENDING→APPROVED/REJECTED |
| `order_status_events` | Historial de cambios de estado | BRIN index en `created_at` |
| `email_outbox` | Cola de emails con claim para concurrencia | índice parcial `WHERE status='PENDING'` |
| `feedback` | Rating del cliente (0.5–5 estrellas, escala ×2) | `model_id` XOR `photobook_theme_id` |
| `refunds` | Gestión de devoluciones | → `orders` |

#### Photobooks

| Tabla | Descripción | Relaciones |
|---|---|---|
| `photobook_themes` | Temas de portada (Europa, Boda, etc.) | - |
| `photobook_products` | Producto con precio/página y mínimo páginas | - |
| `photobook_projects` | Proyecto del cliente (draft hasta confirmado) | → `photobook_products`, `photobook_themes` |
| `photobook_project_assets` | Fotos usadas en el proyecto | → `photobook_projects`, `assets` |
| `photobook_pages` | Páginas del proyecto | → `photobook_projects` |
| `photobook_page_slots` | Slots de foto por página con datos de recorte | → `photobook_pages`, `assets` |
| `photobook_renders` | PDF final generado para producción | → `photobook_projects` |

### Constraints de negocio clave

```sql
-- Total de orden = base + rush
CONSTRAINT chk_total_amount CHECK (total_amount_cents = base_amount_cents + rush_fee_cents)

-- Custom Book requiere demo y modelo
CONSTRAINT chk_custom_book_requires_demo CHECK (
  channel <> 'CUSTOM_BOOK' OR (demo_request_id IS NOT NULL AND personalized_model_id IS NOT NULL)
)

-- Photobook requiere proyecto
CONSTRAINT chk_photobook_requires_project CHECK (
  channel <> 'PHOTOBOOK' OR photobook_project_id IS NOT NULL
)

-- Public link tipo → referencia correcta (exclusiva)
CONSTRAINT chk_public_links_type_reference CHECK (
  (link_type = 'DEMO_VIEW'      AND demo_request_id IS NOT NULL AND order_id IS NULL) OR
  (link_type = 'PAYMENT_UPLOAD' AND order_id IS NOT NULL AND demo_request_id IS NULL) OR
  (link_type = 'FEEDBACK'       AND order_id IS NOT NULL AND demo_request_id IS NULL)
)

-- Feedback: model_id XOR photobook_theme_id (nunca ambos, nunca ninguno)
CONSTRAINT chk_feedback_source CHECK (
  (model_id IS NOT NULL AND photobook_theme_id IS NULL) OR
  (model_id IS NULL     AND photobook_theme_id IS NOT NULL)
)

-- Voucher APPROVED requiere revisor + fecha
CONSTRAINT chk_proof_reviewed CHECK (
  status <> 'APPROVED' OR (reviewed_by_user_id IS NOT NULL AND reviewed_at IS NOT NULL)
)

-- Photobook CONFIRMED requiere nombre y teléfono del cliente
CONSTRAINT chk_confirmed_requires_contact CHECK (
  status <> 'CONFIRMED' OR (customer_full_name IS NOT NULL AND customer_phone IS NOT NULL)
)

-- Total del photobook = precio_por_página × páginas
CONSTRAINT chk_photobook_projects_total CHECK (
  calculated_total_cents = price_per_page_cents * page_count
)
```

### Decisiones de diseño del schema

- **IDs**: `BIGINT GENERATED ALWAYS AS IDENTITY` en todas las tablas.
- **Timestamps**: `TIMESTAMPTZ` en todas partes (nunca `TIMESTAMP`).
- **Strings**: `TEXT` sin `VARCHAR(n)`.
- **Dinero**: `BIGINT` en centavos (e.g., `8900` = S/ 89.00). Nunca `FLOAT`.
- **Unique en email**: índice de expresión `LOWER(email)`, no constraint simple.
- **Historial de eventos**: tabla `order_status_events` append-only con BRIN index.
- **Email outbox**: patrón outbox transaccional con `claimed_at`/`claimed_by` para evitar envíos dobles en concurrencia.
- **Assets**: deduplicación por `content_hash` (SHA-256) + `storage_key` únicos.
- **FK indexes**: todos los FK columns tienen índice explícito (PostgreSQL no los crea automáticamente).

---

## 6. Infraestructura Docker

### Servicios

| Servicio | Imagen | Puerto | Rol |
|---|---|---|---|
| `postgres` | `postgres:16-alpine` | `5432` | Base de datos principal |
| `redis` | `redis:7-alpine` | `6379` | Cache y cola futura |
| `minio` | `minio/minio:latest` | `9000` (API), `9001` (Console) | Storage S3-compatible |
| `minio-mc` | `minio/mc:latest` | — | Crea bucket al inicio, luego sale (`restart: no`) |
| `api` | Dockerfile `dev` | `3001` | NestJS con hot-reload |
| `web` | Dockerfile `dev` | `3000` | Next.js con hot-reload |

### Healthchecks y orden de arranque

```
postgres → redis → minio
             ↓
           minio-mc (bucket creation, sale)
             ↓
            api (start_period: 90s — espera compilación TypeScript)
             ↓
            web (start_period: 60s)
```

### Volúmenes

| Volumen | Propósito |
|---|---|
| `postgres_data` | Datos de PostgreSQL |
| `redis_data` | Datos de Redis |
| `minio_data` | Archivos de MinIO |
| `api_node_modules` | node_modules del contenedor API (protegido del bind mount) |
| `web_node_modules` | node_modules del contenedor Web |
| `web_next` | Caché `.next` del contenedor Web |

### Pattern bind mount + volumen nombrado

```
bind:  ../../backend/api  →  /app          (código fuente, hot-reload)
named: api_node_modules   →  /app/node_modules  (instalados en la imagen, no pisados)
```
Esto permite hot-reload del código sin reinstalar dependencias en cada cambio.

### Modos de ejecución

#### Modo Full-Docker (default actual)

Todos los servicios en Docker. Un solo comando:

```bash
docker compose -f infra/docker/docker-compose.yml up --build
```

Archivo de variables: `.env.docker`

#### Modo Híbrido

Solo infra en Docker; API y Web en local con `npm run dev`.

```bash
npm run infra:up          # solo postgres + redis + minio
npm run api               # NestJS local
npm run web               # Next.js local
```

Archivo de variables: `.env.example` (con `POSTGRES_HOST=localhost`, etc.)

---

## 7. Variables de entorno

### `.env.docker` — Full-Docker

| Variable | Valor por defecto | Nota |
|---|---|---|
| `POSTGRES_PORT` | `5432` | HOST lo sobrescribe compose → `postgres` |
| `POSTGRES_DB` | `pixelart` | |
| `POSTGRES_USER` | `pixelart` | |
| `POSTGRES_PASSWORD` | `pixelart_secret` | Cambiar en producción |
| `REDIS_PORT` | `6379` | HOST lo sobrescribe compose → `redis` |
| `MINIO_PORT` | `9000` | ENDPOINT lo sobrescribe compose → `minio` |
| `MINIO_USE_SSL` | `false` | |
| `MINIO_ACCESS_KEY` | `pixelart_access` | |
| `MINIO_SECRET_KEY` | `pixelart_secret_key` | |
| `MINIO_BUCKET` | `pixelart-assets` | Creado automáticamente por `minio-mc` |
| `API_PORT` | `3001` | |
| `NODE_ENV` | `development` | |
| `SEED_ON_BOOT` | `true` | Cambiar a `false` tras el primer arranque |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | Usado por el browser |
| `API_INTERNAL_URL` | `http://api:3001` | Sobrescrito en compose; usado por Next.js server-side |
| `EMAIL_FROM` | `noreply@pixelart.local` | Placeholder |
| `JWT_SECRET` | `change_me_in_production...` | **Cambiar en producción** |
| `JWT_EXPIRES_IN` | `7d` | |

### Diferencia híbrido vs full-docker

| Variable | Híbrido (`.env.example`) | Full-Docker (`.env.docker`) |
|---|---|---|
| `POSTGRES_HOST` | `localhost` | sobrescrito por compose: `postgres` |
| `REDIS_HOST` | `localhost` | sobrescrito por compose: `redis` |
| `MINIO_ENDPOINT` | `localhost` | sobrescrito por compose: `minio` |
| `API_INTERNAL_URL` | no definida | `http://api:3001` (en compose) |

---

## 8. Seeds

Archivo: `backend/api/src/database/seed.ts`

- Implementado con `pg` directo (sin TypeORM) para evitar dependencia del contexto NestJS.
- **100% idempotente**: se puede ejecutar N veces sin duplicar datos.
  - Tablas con UNIQUE constraint: `ON CONFLICT DO NOTHING`.
  - Tablas sin UNIQUE en nombre: `INSERT ... WHERE NOT EXISTS`.

### Datos insertados

| Tabla | Datos |
|---|---|
| `personalized_categories` | Infantil, Romántico, Familiar |
| `personalized_models` | Aventura Espacial, Princesa del Bosque (Infantil) · Amor Eterno (Romántico) · Momentos en Familia (Familiar) |
| `personalized_templates` | Cohete Rojo, Luna Amarilla (Aventura Espacial) · Rosas Rojas (Amor Eterno) — preview keys fake |
| `catalog_books` | Libro Personalizado Clásico (CUSTOM_BOOK) · Libro Personalizado Luxe (CUSTOM_BOOK) · Fotolibro Premium (PHOTOBOOK) |
| `catalog_book_variants` | Clásico: TAPA_DURA S/89 / TAPA_BLANDA S/69 · Luxe: CUERO S/149 |
| `photobook_themes` | Viaje por Europa · Boda Clásica |
| `photobook_products` | Fotolibro 21×21 cm (S/3.90/pág, mín 25) · Fotolibro 30×20 cm (S/4.90/pág, mín 30) |
| `rush_fee_rules` | Express 7 días → S/10 · Urgente 3 días → S/20 |
| `users` | `admin@pixelart.local` / `Admin123!` (bcrypt, rol ADMIN) |

### Ejecución

```bash
# Automático al arrancar (si SEED_ON_BOOT=true en .env.docker)
docker compose -f infra/docker/docker-compose.yml up --build

# Manual dentro del contenedor
docker compose -f infra/docker/docker-compose.yml exec api npm run seed

# Local (con variables de entorno del .env)
cd backend/api && npm run seed
```

---

## 9. API — Endpoints implementados

Base path: `/api`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/health` | Estado del API y conexión a PostgreSQL | No |

### Respuesta `/api/health`

```json
{
  "status": "ok",
  "timestamp": "2026-02-27T00:00:00.000Z",
  "services": {
    "api": "up",
    "database": "up"
  }
}
```

> Todo lo demás (autenticación, gestión de catálogo, órdenes, pagos, etc.) está **pendiente de implementación**.

---

## 10. Frontend

Archivo: `frontend/web/src/app/page.tsx`

Estado actual: **placeholder** — muestra el nombre del proyecto y un link al health check.

### Configuración relevante

`next.config.ts` — Rewrite server-side de `/api/*`:

```ts
// En Docker (server-side): usa API_INTERNAL_URL=http://api:3001
// En browser: NEXT_PUBLIC_API_URL=http://localhost:3001 (fetch directo)
const apiBase = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
```

Esto evita que los rewrites dentro del contenedor Docker intenten conectar a `localhost:3001` (que dentro del contenedor sería el propio container web, no el container api).

---

## 11. Decisiones técnicas

### TypeORM con `synchronize: false`

El schema es gestionado exclusivamente por `schemaPixelart.sql`. TypeORM **nunca** modifica la base de datos. Las entidades se agregarán progresivamente sin que el ORM altere tablas existentes.

### Schema idempotente (FINAL PATCH)

`schemaPixelart.sql` incluye un bloque `FINAL PATCH` con guards `DO $$ BEGIN ... END $$` que hacen seguros los `ALTER TABLE` al ejecutarse múltiples veces. Esto permite re-ejecutar el schema en bases de datos ya inicializadas (útil para CI/CD o debugging).

### Email outbox transaccional

En lugar de llamar directamente al servicio de email, se inserta en `email_outbox` en la misma transacción de la operación de negocio. Un worker (a implementar) procesa los pendientes con `claimed_at`/`claimed_by` para garantizar exactly-once delivery incluso con múltiples instancias.

### Links públicos con token UUID

Los clientes no tienen sesión. El acceso se otorga mediante links con `token UUID` y `expires_at`. Al reemitir un link, el anterior se revoca (`revoked_at`) y se crea uno nuevo con `reissued_from_id` para trazabilidad.

### Precios en centavos

Todos los precios se almacenan en **centavos enteros** (`BIGINT`). Ejemplo: `8900` = S/ 89.00. Evita errores de punto flotante. La conversión a soles se hace en la capa de presentación.

### Deduplicación de assets por SHA-256

Antes de insertar un archivo, se calcula su SHA-256. Si ya existe en `assets` (por `content_hash`), se reutiliza el mismo registro. Ahorra espacio en MinIO y evita duplicados en la BD.

### bcryptjs sobre bcrypt

Se eligió `bcryptjs` (implementación pura JS) en lugar de `bcrypt` (bindings nativos) para evitar problemas de compilación nativa en Alpine Linux durante el build de Docker.

### Volúmenes nombrados para node_modules en Docker dev

El patrón bind mount + volumen nombrado evita que el bind mount del código fuente pise los `node_modules` instalados dentro del contenedor:

```yaml
volumes:
  - ../../backend/api:/app          # código fuente
  - api_node_modules:/app/node_modules  # instalados en imagen, intocables
```

---

## 12. Estado actual y próximos pasos

### Completado

- [x] Schema PostgreSQL completo y validado como MVP-ready
- [x] Monorepo estructurado (NestJS + Next.js + packages/shared)
- [x] Docker Compose full-docker (postgres, redis, minio, minio-mc, api, web)
- [x] Dockerfiles con targets dev/build/prod y hot-reload
- [x] Sistema de seeds idempotentes
- [x] Variables de entorno documentadas para híbrido y full-docker
- [x] Endpoint `GET /api/health`
- [x] Bucket MinIO creado automáticamente al iniciar

### Pendiente (lógica de negocio)

- [ ] Autenticación (JWT, login de admin)
- [ ] CRUD de catálogo (catalog_books, variants, categorías, modelos, plantillas)
- [ ] Gestión de demo_requests (crear, actualizar status, subir assets)
- [ ] Generación y envío de propuestas (demo_proposals)
- [ ] Sistema de links públicos (generar, validar, revocar)
- [ ] Upload de assets a MinIO
- [ ] Gestión de órdenes (crear, cambiar estado, order_status_events)
- [ ] Upload y revisión de vouchers de pago (payment_proofs)
- [ ] Editor de fotolibros (photobook_projects, pages, slots)
- [ ] Sistema de feedback (rating con media estrella)
- [ ] Procesador de email_outbox (worker con claim)
- [ ] Integración real de email (Resend o SendGrid)
- [ ] Panel de admin (frontend)
- [ ] Flujo de cliente (frontend)
- [ ] rush_fee_rules aplicadas al calcular total de orden
- [ ] site_config (banners/modals desde admin)
- [ ] Gestión de devoluciones (refunds)

---

## 13. Comandos de referencia rápida

```bash
# ── Full-Docker ────────────────────────────────────────────────────────────────

# Levantar todo (primera vez o después de cambios)
docker compose -f infra/docker/docker-compose.yml up --build

# Levantar en background
docker compose -f infra/docker/docker-compose.yml up --build -d

# Bajar (conserva volúmenes y datos)
docker compose -f infra/docker/docker-compose.yml down

# Reset completo (borra volúmenes → re-ejecuta schema + seeds)
docker compose -f infra/docker/docker-compose.yml down -v --remove-orphans

# ── Seeds ──────────────────────────────────────────────────────────────────────

# Ejecutar seeds manualmente (dentro del contenedor api corriendo)
docker compose -f infra/docker/docker-compose.yml exec api npm run seed

# ── Logs ───────────────────────────────────────────────────────────────────────

docker compose -f infra/docker/docker-compose.yml logs -f api
docker compose -f infra/docker/docker-compose.yml logs -f postgres
docker compose -f infra/docker/docker-compose.yml logs -f web

# ── Base de datos ───────────────────────────────────────────────────────────────

# psql interactivo
docker exec -it pixelart_postgres psql -U pixelart -d pixelart

# Ver tablas
docker exec -it pixelart_postgres psql -U pixelart -d pixelart -c "\dt"

# ── Modo Híbrido ────────────────────────────────────────────────────────────────

npm run infra:up          # solo postgres + redis + minio
npm run api               # NestJS local (terminal 1)
npm run web               # Next.js local (terminal 2)
npm run infra:down        # bajar infra

# ── URLs ────────────────────────────────────────────────────────────────────────

# Web            →  http://localhost:3000
# API health     →  http://localhost:3001/api/health
# MinIO Console  →  http://localhost:9001  (pixelart_access / pixelart_secret_key)
# PostgreSQL     →  localhost:5432  (pixelart / pixelart_secret / db: pixelart)
# Redis          →  localhost:6379
```
