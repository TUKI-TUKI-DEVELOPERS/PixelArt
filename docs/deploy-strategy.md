# Estrategia de Deploy — Local → VPS

## Contexto importante

La VPS tiene su propio `docker-compose.yml` modificado con configuración de producción
(URLs hardcodeadas, `expose` en vez de `ports`, versiones de MinIO fijas, etc.).
El repo tiene la versión de desarrollo. **Nunca hacer `git pull` directo en la VPS**
porque pisaría esa configuración.

---

## Flujo estándar de cambios

### 1. En local (tu máquina)

Hacés los cambios en el código, los probás con el emulador o el dev server, y cuando
están listos:

```bash
git add <archivos cambiados>
git commit -m "descripcion del cambio"
git push origin main
```

### 2. En la VPS — fetch + checkout de archivos específicos

En vez de `git pull`, traés solo los archivos que cambiaron:

```bash
# Actualiza el conocimiento del remote SIN tocar ningún archivo local
git fetch origin

# Extrae solo el archivo específico que cambió
git checkout origin/main -- "ruta/del/archivo.tsx"

# Si cambiaron varios archivos, un checkout por cada uno
git checkout origin/main -- "ruta/del/otro/archivo.ts"
```

### 3. Rebuild del contenedor web

```bash
docker compose -f infra/docker/docker-compose.yml up --build web -d
```

Si el cambio fue en el backend también:

```bash
docker compose -f infra/docker/docker-compose.yml up --build api web -d
```

---

## ¿Por qué `git fetch` + `git checkout` y no `git pull`?

| Comando | Qué hace | Problema |
|---|---|---|
| `git pull` | Trae TODOS los cambios y mergea | Pisa el docker-compose y configs de producción |
| `git fetch` | Solo actualiza el mapa del remote | No toca ningún archivo — seguro siempre |
| `git checkout origin/main -- <archivo>` | Extrae UN archivo puntual del remote | Solo mueve lo que vos elegís |

---

## Archivos que NUNCA se deben tocar en la VPS vía checkout

Estos archivos tienen versiones diferentes en producción. No hacer checkout de ellos:

- `infra/docker/docker-compose.yml` — tiene URLs de producción, expose en vez de ports
- `.env.docker` — credenciales reales de producción
- `frontend/web/next.config.ts` — puede tener overrides de producción

---

## Regla para saber qué archivos hacer checkout

Mirá el output del commit que hiciste en local:

```bash
git log --stat -1 origin/main
```

Eso te muestra exactamente qué archivos cambiaron en el último commit.
Hacés checkout solo de esos.

---

## Ejemplo real de esta sesión

Cambios en el fix del file picker mobile:

```bash
git fetch origin

git checkout origin/main -- "frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx"
git checkout origin/main -- "frontend/web/src/app/(public)/photobooks/[temaSlug]/editor/PhotobookEditorClient.tsx"
git checkout origin/main -- "frontend/web/src/hooks/usePhotoUpload.ts"

docker compose -f infra/docker/docker-compose.yml up --build web -d
```

---

## Si el git index queda sucio (estado corrupto)

Si `git status` muestra "Unmerged paths" o conflictos raros sin que haya una merge activa:

```bash
git reset          # limpia el index sin tocar archivos
git stash --include-untracked   # guarda todos los cambios locales
git fetch origin   # actualiza el remote
git stash pop      # restaura los cambios locales
```

Luego hacés los `git checkout origin/main -- <archivo>` normalmente.

---

## Variables de entorno y NEXT_PUBLIC_*

**Regla crítica**: las variables `NEXT_PUBLIC_*` de Next.js se graban en el bundle
en BUILD TIME, no en runtime. Si el docker-compose las setea en `environment:`,
llegan al contenedor corriendo pero NO al proceso de build.

**Consecuencia**: nunca usar `process.env.NEXT_PUBLIC_API_URL` para fetch calls
en el cliente. Usar siempre URLs relativas (`/api/...`) para que pasen por el
rewrite de Next.js, que sí tiene acceso a `API_INTERNAL_URL` en runtime.

```ts
// MAL — localhost:3001 queda grabado en el bundle si la var no estaba en build time
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/upload`);

// BIEN — pasa por el rewrite de next.config.ts → http://api:3001 en Docker
const res = await fetch(`/api/assets/upload`);
```
