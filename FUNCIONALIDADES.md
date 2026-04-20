# Funcionalidades PixelArt — Seguimiento de Implementación

> Archivo de referencia para trackear el avance de cada funcionalidad.
> Última actualización: 2026-03-24

---

## Resumen Ejecutivo

| Fase | Funcionalidades | Estado |
|------|----------------|--------|
| Fase 1 — Fundación | F1.1, F1.2 | ✅ Completada |
| Fase 2 — Flujo Custom Books | F2.1, F2.2, F2.3, F2.4 | ✅ Completada |
| Fase 3 — Feedback | F3.1, F3.2 | ✅ Completada |
| Fase 4 — Photobooks | F4.1, F4.2, F4.3, F4.4 | ✅ Completada |
| Fase 5 — Marketing | F5.1 | ✅ Completada |
| Pendientes | Email worker, Refunds, Rush fees, PDF render | ⏳ Por implementar |

**MVP feature-complete**: Todas las fases del MVP están implementadas (backend + frontend).

---

## Fase 1 — Fundación (desbloquea todo)

### F1.1 — Upload de Assets a MinIO
- **Estado**: ✅ Completada (2026-03-19)
- **Descripción**: El usuario puede subir fotos desde el frontend y estas se almacenan en MinIO con deduplicación SHA-256.
- **Endpoint**: `POST /api/assets/upload?folder=uploads/customers` (multipart/form-data, campo "file")
- **Respuesta**: `{ id, storageKey, contentHash, url, wasExisting }`
- **Deduplicación**: Si el SHA-256 ya existe en BD, retorna el asset existente sin subir de nuevo
- **Carpetas MinIO**: `uploads/customers/`, `uploads/photobooks/`, `uploads/proposals/`, `uploads/vouchers/`
- **Límite**: 20MB por archivo
- **Archivos editados**:
  - `backend/api/src/assets/domain/asset.ts` — Entidad de dominio
  - `backend/api/src/assets/domain/ports/asset-repository.port.ts` — Contrato repositorio
  - `backend/api/src/assets/domain/ports/file-storage.port.ts` — Contrato storage
  - `backend/api/src/assets/application/use-cases/upload-asset.use-case.ts` — Lógica: hash → dedup → upload → save
  - `backend/api/src/assets/infrastructure/persistence/repositories/typeorm-asset.repository.ts` — Implementa AssetRepositoryPort
  - `backend/api/src/assets/infrastructure/persistence/mappers/asset.mapper.ts` — ORM ↔ Domain
  - `backend/api/src/assets/infrastructure/storage/minio-storage.service.ts` — Agregado método `upload()`, extiende FileStoragePort
  - `backend/api/src/assets/assets.controller.ts` — Agregado `POST /api/assets/upload`
  - `backend/api/src/assets/assets.service.ts` — Agregado `uploadAsset()` que delega a use case
  - `backend/api/src/assets/assets.module.ts` — Registra MulterModule, ports, use case, repository
  - `frontend/web/src/hooks/usePhotoUpload.ts` — Hook con uploadFiles(), removePhoto(), progress

### F1.2 — Crear Demo Request (solicitud de libro personalizado)
- **Estado**: ✅ Completada (2026-03-19) — Backend + Frontend
- **Descripción**: El usuario llena formulario con todos los campos de la BD, selecciona 3 plantillas, sube fotos y envía la solicitud.
- **Endpoints**:
  - `POST /api/demo/requests` — Crea demo_request + demo_template_selections + demo_request_assets (transaccional)
  - `GET /api/admin/demo/requests` — Lista todas las solicitudes (admin)
  - `GET /api/admin/demo/requests/:id` — Detalle con templateSelections + assetIds (admin)
- **Validaciones**: Máximo 3 plantillas, mínimo 1
- **Archivos editados (backend)**:
  - `demo/infrastructure/persistence/entities/demo-request.orm-entity.ts` — ORM entity completa con todos los campos de la tabla
  - `demo/infrastructure/persistence/entities/demo-template-selection.orm-entity.ts` — ORM entity
  - `demo/domain/demo-request.ts` — Entidad dominio
  - `demo/domain/ports/demo-repository.port.ts` — Contrato con create, findAll, findById
  - `demo/infrastructure/persistence/repositories/typeorm-demo.repository.ts` — Repo con transacción
  - `demo/infrastructure/persistence/mappers/demo-request.mapper.ts` — Mapper ORM → Domain
  - `demo/application/use-cases/create-demo-request.use-case.ts` — Validación + creación
  - `demo/application/use-cases/list-demo-requests.use-case.ts` — Listado
  - `demo/application/use-cases/get-demo-request-detail.use-case.ts` — Detalle con relaciones
  - `demo/demo.service.ts` — Fachada
  - `demo/demo-public.controller.ts` — POST /demo/requests
  - `demo/demo-admin.controller.ts` — GET /admin/demo/requests + /:id
  - `demo/demo.module.ts` — Módulo NestJS completo
  - `app.module.ts` — Importado DemoModule
- **Archivos editados (frontend)**:
  - `[libroSlug]/page.tsx` — Fetch variantes + plantillas por API, pasa dbIds/variants/templates como props
  - `[libroSlug]/LibroDetalleClient.tsx` — Recibe nuevos props, renderiza WizardSection
  - `[libroSlug]/WizardSection.tsx` — Wizard 5 pasos funcional:
    - Paso 1: Upload fotos real (usePhotoUpload hook → MinIO)
    - Paso 2: Seleccionar 3 plantillas (desde BD real)
    - Paso 3: Formulario completo (todos los campos de demo_request)
    - Paso 4: Resumen de solicitud
    - Paso 5: Enviar → POST /api/demo/requests → Confirmación

---

## Fase 2 — Flujo Custom Books

### F2.1 — Admin genera propuestas con protección
- **Estado**: ✅ Completada (2026-03-19)
- **Descripción**: Admin sube propuestas y el sistema aplica watermark ("PIXELART DEMO" en diagonal) o baja calidad (30% JPEG, max 600px) con sharp antes de guardar en MinIO.
- **Endpoint**: `POST /api/admin/demo/requests/:id/proposals?templateId=N&protectionMode=WATERMARK|LOW_QUALITY`
- **Respuesta**: `{ id, storageKey, url, protectionMode }`
- **Storage**: `uploads/proposals/{demoRequestId}_{templateId}.jpg`
- **Archivos editados (backend)**:
  - `demo/infrastructure/persistence/entities/demo-proposal.orm-entity.ts` — ORM entity completa
  - `demo/application/use-cases/upload-demo-proposal.use-case.ts` — sharp watermark/low quality
  - `demo/domain/ports/demo-repository.port.ts` — Agregado saveProposal + proposals en findById
  - `demo/infrastructure/.../typeorm-demo.repository.ts` — Implementa saveProposal + query proposals
  - `demo/demo-admin.controller.ts` — POST proposals endpoint con multipart
  - `demo/demo.service.ts` — Agrega uploadProposal
  - `demo/demo.module.ts` — Registra DemoProposalOrmEntity, UploadDemoProposalUseCase, AssetsModule
- **Archivos editados (frontend)**:
  - `admin/libros-personalizados/solicitudes/page.tsx` — Conectado a API real (GET /admin/demo/requests)
  - `admin/libros-personalizados/solicitudes/[id]/page.tsx` — Conectado a API real + upload funcional de propuestas con selector de protección

### F2.2 — Enviar propuestas por email + Link público DEMO_VIEW
- **Estado**: ✅ Completada (2026-03-19)
- **Descripción**: Admin envía propuestas → genera link DEMO_VIEW UUID (TTL 7 días) → inserta email_outbox → status PROPOSALS_SENT. Cliente ve propuestas protegidas en /demo/[token].
- **Endpoints**:
  - `POST /api/admin/demo/requests/:id/send-proposals` → genera link + email + cambia status
  - `GET /api/demo/view/:token` → valida token, devuelve propuestas protegidas al cliente
- **Módulos implementados**:
  - **PublicLinksModule** — ORM entity, domain, port, repository, service (generate + validate)
  - **EmailModule** — EmailService.queue() inserta en email_outbox
- **Archivos editados (backend)**:
  - `public-links/` — 7 archivos: ORM entity, domain, port, mapper, repository, service, module
  - `email/` — 2 archivos: email.service.ts, email.module.ts
  - `demo/application/use-cases/send-demo-proposals.use-case.ts` — orquesta todo
  - `demo/demo-public.controller.ts` — GET /demo/view/:token
  - `demo/demo-admin.controller.ts` — POST send-proposals
  - `demo/demo.service.ts` — agrega sendProposals
  - `demo/demo.module.ts` — importa PublicLinksModule + EmailModule
  - `demo/domain/ports/demo-repository.port.ts` — agrega updateStatus
  - `demo/infrastructure/.../typeorm-demo.repository.ts` — implementa updateStatus
- **Archivos editados (frontend)**:
  - `admin/solicitudes/[id]/page.tsx` — botón "Enviar Propuestas" funcional + muestra link generado con "Copiar link"
  - `(public)/demo/[token]/page.tsx` — página completa: valida token, muestra propuestas protegidas, info expiración

### F2.3 — Link de pago Yape + Subir voucher
- **Estado**: ✅ Completada (2026-03-19)
- **Descripción**: Admin crea orden → genera link PAYMENT_UPLOAD. Cliente ve detalle + QR Yape (placeholder) + sube voucher.
- **Endpoints**: `POST create-order` | `GET /payment/:token` | `POST /payment/:token/voucher`
- **Módulos nuevos**: OrdersModule (entity, port, repo, service) + PaymentsModule (entity, port, repo, service, controller)
- **Storage**: Vouchers en `uploads/vouchers/{orderId}.jpg`
- **Frontend**: Admin botón "Generar Orden + Link de Pago" | Cliente `/pagar/[token]` completa

### F2.4 — Admin revisa pago + avanza estado + email confirmación
- **Estado**: ✅ Completada (2026-03-19)
- **Descripción**: Admin ve voucher, aprueba/rechaza. Avanza estado con máquina de estados validada. Email de confirmación en outbox.
- **Endpoints**: `GET /admin/orders` | `GET /admin/orders/:id` | `POST review-payment` | `POST advance-status`
- **Máquina de estados**: AWAITING→UNDER_REVIEW→VERIFIED→IN_PRODUCTION→SHIPPED→DELIVERED (+ CANCELLED/REJECTED)
- **Frontend**: Lista órdenes real + detalle con voucher descargable + aprobar/rechazar + timeline real + avanzar estado

---

## Fase 3 — Feedback

### F3.1 + F3.2 — Feedback completo (link + estrellas + Google)
- **Estado**: ✅ Completadas (2026-03-19)
- **Descripción**: Admin genera link FEEDBACK desde orden DELIVERED. Cliente califica 0.5-5 estrellas (rating_x2 1-10). Si ≥4.5 → redirige a Google Reviews (placeholder URL). Si <4.5 → queda en panel admin.
- **Endpoints**: `POST /admin/feedback/generate/:orderId` | `GET /feedback/:token` | `POST /feedback/:token` | `GET /admin/feedback`
- **Módulo**: FeedbackModule (entity, port, repo, service, public+admin controllers, module)
- **Frontend**: `/feedback/[token]` con selector half-star interactivo + Google redirect | Admin `/admin/feedback` con KPIs + alertas low-rating

---

## Fase 4 — Photobooks

### F4.1-F4.3 — Photobook: upload + editor + confirmar + pago
- **Estado**: ✅ Completadas (2026-03-19)
- **Descripción**: Usuario sube fotos → editor con layouts (1-4 fotos/página) + auto-distribución + reordenamiento manual → preview con precio calculado → confirma con datos personales → proyecto CONFIRMED en BD → admin crea orden + link pago (reutiliza flujo Yape existente)
- **Endpoints**:
  - `GET /api/photobook/themes` + `GET /api/photobook/products` — catálogo
  - `POST /api/photobook/projects` — crea proyecto con pages + slots + assets
  - `GET /api/admin/photobook/projects` + `GET /:id` — admin listado + detalle
  - `POST /api/admin/photobook/projects/:id/create-order` — orden PHOTOBOOK + link pago
- **Backend**: PhotobookModule completo (5 ORM entities, port, repository transaccional, service, controllers, module)
- **Frontend editor reescrito** (5 pasos reales):
  1. Upload fotos real (usePhotoUpload → MinIO)
  2. Editor: selector layout por página + auto-distribución + asignación manual
  3. Preview con precio calculado (precio_por_página × páginas)
  4. Formulario datos cliente + selector producto
  5. Confirmar → POST /api/photobook/projects
- **Admin**: Proyectos list + detalle + botón "Crear Orden + Link de Pago"

### F4.4 — Photobook: feedback
- **Estado**: ✅ Ya funciona — reutiliza F3.1 + F3.2 (mismo flujo, usa photobook_theme_id)

---

## Fase 5 — Marketing

### F5.1 — Banner superior + Modal de promociones
- **Estado**: ✅ Completada (2026-03-19)
- **Descripción**: Admin configura banner (texto + color + toggle) y modal (título + descripción + toggle) desde /admin/configuracion. Frontend los muestra dinámicamente.
- **Endpoints**: `GET /site-config/:key` (público) | `PUT /admin/site-config/:key` (admin)
- **Keys**: `promo_banner` (text, color, enabled) | `promo_modal` (title, description, enabled)
- **Backend**: SiteConfigModule (ORM entity, port, repository, service, controllers público+admin, module)
- **Frontend**:
  - `admin/configuracion/page.tsx` — conectado API real (load + save)
  - `Navbar.tsx` (server) — fetch banner config, pasa a NavbarClient
  - `NavbarClient.tsx` — muestra banner dinámico con texto/color del admin
  - `PromoModal.tsx` — modal overlay centrado, se muestra 1 vez por sesión, cierra con X o click fuera
  - `(public)/layout.tsx` — agrega PromoModal

---

## Pendientes post-MVP

### P1 — Email Worker (envío real)
- **Estado**: ⏳ Stub creado, sin implementación
- **Archivo**: `backend/api/src/email/email-worker.service.ts` — actualmente solo `// TODO: Worker @Cron`
- **Qué falta**: Worker con `@Cron()` que claim emails del outbox → envía con Resend/SES → marca SENT/FAILED
- **Dependencia**: Todas las funcionalidades de email (F2.2, F2.4, F3.1) ya insertan en `email_outbox` pero los emails no se envían realmente
- **Prioridad**: Alta — bloquea comunicación real con clientes

### P2 — Refunds (reembolsos)
- **Estado**: ⏳ Schema creada, sin backend/frontend
- **Schema**: Tabla `refunds` existe con estados NOT_REQUESTED → REQUESTED → APPROVED/REJECTED → PROCESSED
- **Qué falta**: Módulo NestJS completo (domain, port, repo, service, controller) + UI admin para gestionar reembolsos
- **Prioridad**: Media

### P3 — Rush Fees configurables
- **Estado**: ⏳ Schema creada, sin CRUD admin
- **Schema**: Tabla `rush_fee_rules` (label, days_threshold, fee_cents, is_active)
- **Qué falta**: CRUD admin para configurar reglas de rush fee + lógica de cálculo en creación de órdenes
- **Prioridad**: Media

### P4 — Generación PDF Photobook
- **Estado**: ⏳ Schema creada, sin implementación
- **Schema**: Tabla `photobook_renders` (project_id, pdf_storage_key, generated_at)
- **Qué falta**: Servicio que genere PDF final del photobook para producción/entrega
- **Prioridad**: Media-baja (no bloquea flujo actual, producción puede usar datos del proyecto)

### P5 — Integración Yape/PLIN real
- **Estado**: ⏳ Placeholder QR
- **Qué falta**: Integrar API de Yape o generar QR dinámico con monto real
- **Prioridad**: Media

### P6 — Google Reviews URL real
- **Estado**: ⏳ Placeholder URL
- **Qué falta**: Configurar URL real de Google Reviews del negocio en feedback redirect
- **Prioridad**: Baja (configuración simple)

---

## Resumen completo de funcionalidades

| # | Funcionalidad | Backend | Frontend | Estado |
|---|---|---|---|---|
| F1.1 | Upload assets MinIO + dedup SHA-256 | ✅ | ✅ | Completa |
| F1.2 | Demo Request (solicitud libro personalizado) | ✅ | ✅ | Completa |
| F2.1 | Propuestas protegidas (watermark/low quality) | ✅ | ✅ | Completa |
| F2.2 | Enviar propuestas + link DEMO_VIEW | ✅ | ✅ | Completa |
| F2.3 | Link pago Yape + subir voucher | ✅ | ✅ | Completa |
| F2.4 | Revisar pago + avanzar estado + email | ✅ | ✅ | Completa |
| F3.1 | Link feedback desde orden DELIVERED | ✅ | ✅ | Completa |
| F3.2 | Rating half-star + redirect Google | ✅ | ✅ | Completa |
| F4.1 | Photobook upload fotos | ✅ | ✅ | Completa |
| F4.2 | Photobook editor (layouts + auto-distribución) | ✅ | ✅ | Completa |
| F4.3 | Photobook confirmar + pago | ✅ | ✅ | Completa |
| F4.4 | Photobook feedback | ✅ | ✅ | Completa (reutiliza F3) |
| F5.1 | Banner + Modal promociones | ✅ | ✅ | Completa |
| — | Auth admin (login JWT + roles) | ✅ | ✅ | Completa |
| — | Catálogo (categorías + modelos + variantes) | ✅ | ✅ | Completa |
| — | Navbar + rutas públicas + admin sidebar | — | ✅ | Completa |
| P1 | Email worker (envío real) | ⏳ stub | — | Pendiente |
| P2 | Refunds (reembolsos) | ⏳ schema | ⏳ | Pendiente |
| P3 | Rush fees configurables | ⏳ schema | ⏳ | Pendiente |
| P4 | PDF render photobook | ⏳ schema | — | Pendiente |
| P5 | Integración Yape/PLIN real | ⏳ placeholder | ⏳ | Pendiente |
| P6 | Google Reviews URL real | ⏳ placeholder | — | Pendiente |

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Backend | NestJS 10 + TypeORM (synchronize: false) |
| Frontend | Next.js 15 App Router |
| Base de datos | PostgreSQL 16 (27 tablas, schema en `schemaPixelart.sql`) |
| Storage | MinIO (S3-compatible) |
| Cache | Redis 7 |
| Auth | JWT httpOnly cookies + roles (ADMIN, OPERATOR, VIEWER) |
| Procesamiento imagen | Sharp (watermark, compresión) |
| Infraestructura | Docker Compose (`infra/docker/docker-compose.yml`) |

## Módulos backend (13)

`users` · `auth` · `catalog` · `personalized` · `assets` · `demo` · `public-links` · `orders` · `payments` · `feedback` · `photobook` · `email` · `site-config`

## Páginas frontend (29)

**Públicas (17)**: Home, Catálogo, Libros Personalizados (hub + categoría + detalle + solicitar + confirmación), Photobooks (hub + tema + editor + diseñar + preview), Demo view, Pagar, Feedback, Nuestros Libros

**Admin (12)**: Login, Dashboard, Catálogo, Libros Personalizados (overview + solicitudes + detalle), Photobooks (gestión + proyectos + detalle), Órdenes (lista + detalle), Feedback, Configuración
