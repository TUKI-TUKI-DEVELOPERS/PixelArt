# Estructura Implementada - PixelArt

## Resumen

Se ha creado la arquitectura completa del proyecto siguiendo **Clean Architecture** con separación de capas:

- **Backend**: 216 archivos TypeScript
- **Frontend**: 70 archivos TypeScript/TSX

---

## Backend — Clean Architecture

### Principios aplicados

1. **Domain 100% puro**: sin decoradores TypeORM, solo TypeScript/JS estándar
2. **Ports en domain/**: los contratos pertenecen al dominio, no a la aplicación
3. **Infrastructure aislada**: implementa los ports del dominio
4. **Mappers**: conversión explícita ORM ↔ Domain
5. **Use Cases**: orquestación sin lógica de negocio

### Módulos implementados

```
backend/api/src/
├── common/                      ← Infraestructura transversal
│   ├── decorators/              @CurrentUser, @Roles
│   ├── filters/                 HTTP exception filter
│   ├── guards/                  JWT + Roles guards
│   ├── interceptors/            Transform { data, meta }
│   └── pipes/                   Validation pipe
│
├── users/                       ← Gestión usuarios admin/operator/viewer
├── auth/                        ← JWT login
├── catalog/                     ← Catálogo productos (CUSTOM_BOOK, PHOTOBOOK)
├── personalized/                ← Categorías → Modelos → Plantillas
├── assets/                      ← Upload MinIO + deduplicación SHA-256
├── demo/                        ← Solicitudes custom book + propuestas
├── public-links/                ← Links temporales UUID (TTL 7 días)
├── orders/                      ← Órdenes unificadas + estado + rush fees
├── payments/                    ← Vouchers Yape + revisión admin
├── feedback/                    ← Ratings media estrella + lógica Google
├── photobook/                   ← Editor photobook (themes, projects, pages, slots)
├── email/                       ← Outbox transaccional + worker cron
└── site-config/                 ← Banners + modals marketing
```

### Estructura de cada módulo

```
module/
├── module.module.ts             ← Binding ports → implementaciones
├── module.controller.ts         ← Endpoints HTTP
├── module.service.ts            ← Fachada que delega a use cases
│
├── domain/                      ← Reglas de negocio (PURO)
│   ├── entity.ts                Clases sin decoradores TypeORM
│   ├── interfaces/              Contratos de reglas de negocio
│   ├── value-objects/           Money, Rating, etc.
│   ├── services/                Domain services
│   └── ports/                   Contratos para infraestructura (abstract class)
│
├── application/                 ← Orquestación
│   └── use-cases/               Coordinan dominio + llaman ports
│
├── infrastructure/              ← Implementaciones concretas
│   └── persistence/
│       ├── entities/            .orm-entity.ts con decoradores TypeORM
│       ├── repositories/        Implementan ports del dominio
│       └── mappers/             ORM ↔ Domain
│
└── dto/                         ← Validación entrada/salida
```

---

## Frontend — Next.js 15 App Router

### Estructura

```
frontend/web/src/
├── middleware.ts                ← Protege /admin/* con JWT
│
├── app/
│   ├── layout.tsx               Fuente global + Banner dinámico
│   ├── page.tsx                 Home: hero, CTA
│   │
│   ├── (public)/                ← Route Group sin auth
│   │   ├── catalogo/
│   │   ├── libros-personalizados/
│   │   │   ├── [categoriaId]/   Modelos
│   │   │   └── solicitar/       Formulario demo
│   │   ├── photobooks/
│   │   │   └── editor/          Mini-editor pantalla completa
│   │   ├── demo/[token]/        Ver propuestas
│   │   ├── pagar/[token]/       QR Yape + upload voucher
│   │   └── feedback/[token]/    Star rating
│   │
│   └── admin/                   ← Protegido por middleware
│       ├── login/
│       ├── page.tsx             Dashboard KPIs
│       ├── catalogo/
│       ├── libros-personalizados/solicitudes/
│       ├── photobooks/proyectos/
│       ├── ordenes/
│       ├── feedback/
│       └── configuracion/
│
├── components/
│   ├── ui/                      Button, Input, Modal, etc.
│   ├── layout/                  Header, Footer, AdminSidebar
│   ├── catalog/                 ProductCard, ProductGrid
│   ├── demo-request/            TemplateSelector, PhotoUploader
│   ├── photobook-editor/        BookCanvas, PageEditor, SlotPicker
│   ├── payment/                 YapeQR, VoucherUpload
│   ├── feedback/                StarRating (media estrella)
│   └── admin/                   ProposalManager, OrderTimeline, PaymentReview
│
├── lib/
│   ├── api/                     Wrappers tipados fetch
│   ├── auth/                    Sesión JWT (cookie httpOnly)
│   └── utils/                   price.ts (centavos → S/), dates.ts
│
├── hooks/
│   ├── usePhotoUpload.ts        File[] + progress + SHA-256
│   ├── usePhotobookEditor.ts    Estado pages/slots
│   └── useStarRating.ts         Lógica half-star
│
└── types/
    └── index.ts                 Re-exporta desde packages/shared
```

---

## Reglas de nombres

| Artefacto | Backend | Frontend |
|---|---|---|
| Entidad dominio | `order.ts` | - |
| Entidad TypeORM | `order.orm-entity.ts` | - |
| Puerto (contrato) | `order-repository.port.ts` | - |
| Repositorio | `typeorm-order.repository.ts` | - |
| Mapper | `order.mapper.ts` | - |
| Use Case | `create-order.use-case.ts` | - |
| Componente | - | `ProductCard.tsx` |
| Hook | - | `usePhotoUpload.ts` |

---

## Próximos pasos (Etapas de implementación)

### Etapa 1 — Fundación backend (1 semana)
- Implementar `common/` (filters, guards, interceptors, pipes)
- Implementar `auth/` (JWT login)
- Implementar `users/` (CRUD)

### Etapa 2 — Catálogo + Assets (1 semana)
- `catalog/` completo
- `personalized/` completo
- `assets/` con MinIO + SHA-256 dedup

### Etapa 3 — Flujo Custom Book: solicitud (1.5 semanas)
- `demo/` público (POST /demo/request)
- Frontend: libros-personalizados/ completo

### Etapa 4 — Panel admin Custom Book (1.5 semanas)
- `demo/` admin (propuestas + watermark server-side con sharp)
- `public-links/` (generar DEMO_VIEW)
- `email/` (INSERT email_outbox)

### Etapa 5 — Pagos Yape (1.5 semanas)
- `orders/` + `payments/` completo
- Frontend: pagar/[token]

### Etapa 6 — Feedback + Marketing (1 semana)
- `feedback/` (lógica Google ≥4.5)
- `site-config/` (banners/modals)

### Etapa 7 — Editor Photobook (3-4 semanas)
- `photobook/` completo
- Frontend: editor/ con BookCanvas, autosave

### Etapa 8 — Email real + polish (1 semana)
- `email/email-worker.service.ts` (@Cron)
- Integración Resend
- Accesibilidad + i18n prep

---

## Comandos de verificación

```bash
# Backend
cd /Users/prom1/Desktop/Pixelart/backend/api
npm run dev

# Frontend
cd /Users/prom1/Desktop/Pixelart/frontend/web
npm run dev

# Infra
npm run infra:up
```

---

## Notas técnicas clave

1. **Domain puro**: cero imports de `typeorm`, `@nestjs/*`, etc.
2. **Ports en domain/**: los use cases inyectan `UserRepositoryPort` (abstract class), nunca `TypeOrmUserRepository`
3. **Mappers obligatorios**: repositorios devuelven entidades del dominio, no ORM
4. **id de users es `number`** (BIGINT → JS number), no UUID
5. **Email transaccional**: INSERT en `email_outbox` dentro de la txn del negocio
6. **Watermark server-side**: `sharp` procesa imágenes, el cliente nunca accede al bucket original
7. **Precios en centavos**: `8900` = S/ 89.00 (conversión en `lib/utils/price.ts`)
8. **Búsqueda case-insensitive**: `WHERE LOWER(email) = LOWER($1)` respeta índice SQL

---

**Total archivos generados**: 286 (216 backend + 70 frontend)
