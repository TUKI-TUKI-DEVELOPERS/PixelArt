# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PixelArt is a platform for selling personalized books (Custom Books) and photobooks in Peru. It's a monorepo with NestJS backend, Next.js frontend, and PostgreSQL database. Currency is PEN (Peruvian soles), prices stored as centavos (BIGINT). MVP is feature-complete across all phases (auth, custom books, photobooks, feedback, marketing).

## Commands

```bash
# Full-Docker (recommended) — starts all services
docker compose -f infra/docker/docker-compose.yml up --build

# Hybrid mode — infra in Docker, apps local
npm run infra:up                    # postgres + redis + minio
npm run api                         # NestJS on :3001 (workspace: backend/api)
npm run web                         # Next.js on :3000 (workspace: frontend/web)
npm run infra:down                  # stop infra

# Build & lint all workspaces
npm run build
npm run lint

# Backend only
cd backend/api
npm run dev                         # nest start --watch
npm run build                       # nest build
npm run seed                        # ts-node src/database/seed.ts
npm run test                        # jest
npm run test -- --testPathPattern=users  # run tests matching pattern
npm run lint                        # eslint --fix

# Frontend only
cd frontend/web
npm run dev                         # next dev -p 3000
npm run build                       # next build
npm run lint                        # next lint

# Seeds (in Docker)
docker compose -f infra/docker/docker-compose.yml exec api npm run seed

# Database reset (drops volumes, re-runs schema + seeds)
docker compose -f infra/docker/docker-compose.yml down -v --remove-orphans

# psql interactive
docker exec -it pixelart_postgres psql -U pixelart -d pixelart
```

**Environment files**: `.env.docker` for full-Docker mode, `.env.example` for hybrid mode (localhost hosts). Never commit real secrets.

**Schema changes workflow**: Edit `schemaPixelart.sql` → run `docker compose -f infra/docker/docker-compose.yml down -v --remove-orphans` → restart. The schema only runs on first volume init, so you must drop volumes to re-apply.

## Architecture

**Monorepo** with npm workspaces: `backend/*`, `frontend/*`, `packages/*`.

### Backend (`backend/api`) — NestJS 10 + TypeORM

Follows **Clean Architecture** with strict layer separation per module:

```
module/
├── domain/                 # Pure TypeScript — NO NestJS/TypeORM imports
│   ├── entity.ts           # Domain entities (plain classes)
│   ├── interfaces/         # Business rule contracts
│   ├── value-objects/      # Money, Rating, etc.
│   ├── services/           # Domain services
│   └── ports/              # Abstract classes = contracts for infrastructure
├── application/
│   └── use-cases/          # Orchestration — calls ports, no business logic
├── infrastructure/
│   └── persistence/
│       ├── entities/       # *.orm-entity.ts — TypeORM decorators
│       ├── repositories/   # Implement domain ports (typeorm-*.repository.ts)
│       └── mappers/        # ORM entity ↔ Domain entity conversion
├── dto/                    # class-validator DTOs
├── module.module.ts        # Binds ports → implementations
├── module.controller.ts    # HTTP endpoints
└── module.service.ts       # Facade delegating to use cases
```

**Modules**: users, auth, catalog, personalized, assets, demo, public-links, orders, payments, feedback, photobook, email, site-config.

**Cross-cutting** (`common/`): decorators (`@CurrentUser`, `@Roles`), guards (JWT + Roles), filters (HTTP exception), interceptors (response transform `{ data, meta }`), validation pipe.

### Frontend (`frontend/web`) — Next.js 15 App Router

React 19 + framer-motion + lucide-react (no Tailwind — uses custom CSS/design tokens).

- `(public)/` route group — no auth: catalogo, libros-personalizados, photobooks/editor, demo/[token], pagar/[token], feedback/[token]
- `admin/` — protected by middleware JWT: dashboard, catalogo, solicitudes, proyectos, ordenes, feedback, configuracion
- `components/ui/` — shared UI (Button, Input, Modal, Drawer, Badge, Toast)
- `lib/api/` — typed fetch wrappers per domain (catalog, demo, photobook, orders, payments, feedback)
- `lib/auth/` — JWT session management (httpOnly cookie)
- `lib/utils/` — price.ts (centavos → S/), dates.ts
- `lib/design-tokens.ts`, `lib/colors.ts` — design system constants
- `hooks/` — usePhotoUpload, usePhotobookEditor, useStarRating
- `middleware.ts` — JWT auth guard for admin routes

### Database — PostgreSQL 16

- Schema managed exclusively by `schemaPixelart.sql` — **TypeORM `synchronize: false`**, ORM never modifies tables
- IDs: `BIGINT GENERATED ALWAYS AS IDENTITY` (mapped to JS `number`, not UUID)
- Timestamps: always `TIMESTAMPTZ`
- Money: `BIGINT` in centavos (8900 = S/ 89.00)
- Assets deduplicated by SHA-256 `content_hash`
- Email outbox pattern: transactional INSERT with `claimed_at`/`claimed_by` for exactly-once processing
- Clients have no accounts — access via UUID token public links with TTL 7 days

### Infrastructure

- PostgreSQL 16, Redis 7, MinIO (S3-compatible) — all in `infra/docker/docker-compose.yml`
- Seeds in `backend/api/src/database/seed.ts` — uses raw `pg` (not TypeORM), 100% idempotent (`ON CONFLICT DO NOTHING`)
- `SEED_ON_BOOT=true` in `.env.docker` auto-runs seeds on API start

## Key Conventions

- **File naming**: `entity.ts` (domain), `entity.orm-entity.ts` (TypeORM), `entity-repository.port.ts` (port), `typeorm-entity.repository.ts` (repo impl), `entity.mapper.ts` (mapper), `verb-noun.use-case.ts` (use case)
- **Frontend components**: PascalCase `.tsx`, hooks: `use*.ts`
- **Domain purity**: domain layer must have zero imports from `typeorm`, `@nestjs/*`, or any framework
- **Ports in domain/**: use cases inject abstract port classes, never concrete repositories
- **Mappers are mandatory**: repositories return domain entities, never ORM entities
- **Indent**: 2 spaces, LF line endings (see `.editorconfig`)
- **Node**: >=20.0.0, npm >=10.0.0
- **Language**: The project UI and business domain are in Spanish (Peru market)
