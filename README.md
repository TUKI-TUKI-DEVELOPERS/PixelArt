# PixelArt — Monorepo

Plataforma de libros personalizados y fotolibros.

## Stack

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Backend    | NestJS 10 + TypeORM               |
| Frontend   | Next.js 15 (App Router)           |
| Base datos | PostgreSQL 16                     |
| Cache      | Redis 7                           |
| Storage    | MinIO (S3-compatible)             |
| Node       | 20 LTS                            |

## Estructura

```
pixelart/
├── backend/
│   └── api/              # NestJS — puerto 3001
│       └── src/
│           └── database/
│               └── seed.ts   # Seeds iniciales
├── frontend/
│   └── web/              # Next.js — puerto 3000
├── packages/
│   └── shared/           # Tipos y utilidades compartidas
├── infra/
│   └── docker/
│       └── docker-compose.yml
├── schemaPixelart.sql    # Schema PostgreSQL (auto-aplicado al primer arranque)
├── .env.docker           # Variables para modo full-docker
├── .env.example          # Variables para modo híbrido (local)
├── package.json          # npm workspaces
└── README.md
```

---

## Modo Full-Docker (recomendado)

Todo corre en Docker. Un solo comando levanta la pila completa.

### 1. Levantar todos los servicios

```bash
docker compose -f infra/docker/docker-compose.yml up --build
```

Al primer arranque:
- PostgreSQL crea la BD y ejecuta `schemaPixelart.sql` automáticamente.
- `minio-mc` crea el bucket `pixelart-assets`.
- La API espera a que postgres, redis y minio estén sanos antes de iniciar.
- `SEED_ON_BOOT=true` en `.env.docker` → los seeds se ejecutan automáticamente.

### 2. URLs

| Servicio          | URL                              |
|-------------------|----------------------------------|
| Web (Next.js)     | http://localhost:3000            |
| API (NestJS)      | http://localhost:3001/api        |
| Health check      | http://localhost:3001/api/health |
| MinIO S3 API      | http://localhost:9000            |
| MinIO Console     | http://localhost:9001            |
| PostgreSQL        | localhost:5432                   |
| Redis             | localhost:6379                   |

### 3. Bajar contenedores

```bash
# Solo bajar (conserva volúmenes y datos):
docker compose -f infra/docker/docker-compose.yml down

# Bajar y BORRAR TODOS LOS VOLÚMENES (reset completo — re-ejecuta schema y seeds):
docker compose -f infra/docker/docker-compose.yml down -v --remove-orphans
```

---

## Seeds

### Ejecutar seeds manualmente

```bash
docker compose -f infra/docker/docker-compose.yml exec api npm run seed
```

### Seeds automáticos al arrancar

Controlado por `SEED_ON_BOOT` en `.env.docker`:

```
SEED_ON_BOOT=true    # ejecuta seeds al iniciar la API
SEED_ON_BOOT=false   # desactivar después del primer arranque
```

### Datos iniciales que insertan los seeds

| Tabla                      | Datos                                                                       |
|----------------------------|-----------------------------------------------------------------------------|
| `users`                    | `admin@pixelart.local` / `Admin123!` (rol ADMIN)                           |
| `personalized_categories`  | Infantil, Romántico, Familiar                                               |
| `personalized_models`      | Aventura Espacial, Princesa del Bosque, Amor Eterno, Momentos en Familia   |
| `personalized_templates`   | 3 templates con preview keys fake                                           |
| `catalog_books`            | Libro Personalizado Clásico, Libro Personalizado Luxe, Fotolibro Premium   |
| `catalog_book_variants`    | TAPA_DURA, TAPA_BLANDA, CUERO con precios en centavos                      |
| `photobook_themes`         | Viaje por Europa, Boda Clásica                                              |
| `photobook_products`       | Fotolibro 21×21 cm, Fotolibro 30×20 cm                                     |
| `rush_fee_rules`           | Express (7 días / S/10), Urgente (3 días / S/20)                           |

---

## Conexión DBeaver / psql

| Campo    | Valor            |
|----------|------------------|
| Host     | `localhost`      |
| Port     | `5432`           |
| Database | `pixelart`       |
| User     | `pixelart`       |
| Password | `pixelart_secret`|

```bash
# psql desde terminal:
docker exec -it pixelart_postgres psql -U pixelart -d pixelart
```

---

## Credenciales MinIO (desarrollo)

| Campo       | Valor                |
|-------------|----------------------|
| Access Key  | `pixelart_access`    |
| Secret Key  | `pixelart_secret_key`|
| Bucket      | `pixelart-assets`    |

---

## Modo Híbrido (infra en Docker, apps en local)

Para desarrollo local con hot-reload nativo (más rápido que Docker):

```bash
# 1. Levantar solo postgres + redis + minio
npm run infra:up

# 2. Backend (terminal 1) — lee .env.example con POSTGRES_HOST=localhost
cd backend/api && npm install && npm run dev

# 3. Frontend (terminal 2)
cd frontend/web && npm install && npm run dev

# Bajar infra al terminar
npm run infra:down
```

Variables a usar: `.env.example` (con `POSTGRES_HOST=localhost`, `REDIS_HOST=localhost`, `MINIO_ENDPOINT=localhost`).

---

## Comandos de referencia

```bash
# Levantar full-docker
docker compose -f infra/docker/docker-compose.yml up --build

# Levantar solo infra (modo híbrido)
npm run infra:up

# Bajar contenedores (conserva datos)
docker compose -f infra/docker/docker-compose.yml down

# Reset completo (borra volúmenes → re-ejecuta schema)
docker compose -f infra/docker/docker-compose.yml down -v --remove-orphans

# Ejecutar seeds manualmente
docker compose -f infra/docker/docker-compose.yml exec api npm run seed

# Logs de un servicio
docker compose -f infra/docker/docker-compose.yml logs -f api
docker compose -f infra/docker/docker-compose.yml logs -f postgres

# psql interactivo
docker exec -it pixelart_postgres psql -U pixelart -d pixelart
```

---

## Notas importantes

- **Schema**: `schemaPixelart.sql` se ejecuta automáticamente solo la **primera vez** que
  se inicializa el volumen de postgres (`/var/lib/postgresql/data`).
  Para re-ejecutarlo: borrar el volumen con `down -v`.
- **TypeORM**: `synchronize: false` — el schema **nunca** es modificado por el ORM.
- **node_modules**: En Docker, los volúmenes nombrados `api_node_modules` y `web_node_modules`
  preservan los módulos del contenedor, evitando conflictos con el bind mount del código fuente.
- **Healthchecks**: La API tiene `start_period: 90s` porque NestJS compila TypeScript al arrancar.
  El Web espera a que la API esté sana antes de iniciar.
- **`.env.docker`**: Cargado por el docker-compose. No commitear si contiene secretos reales.
