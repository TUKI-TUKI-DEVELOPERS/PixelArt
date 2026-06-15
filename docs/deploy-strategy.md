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

---

## Sincronización de MinIO (assets de imágenes)

Los assets de MinIO **no están en git** — viven en Docker volumes. Para subirlos a la VPS se usa `mc` (MinIO Client) + un túnel SSH. Nunca se expone el puerto de MinIO públicamente.

---

### Setup inicial (solo la primera vez)

**1. Instalar mc:**
```bash
brew install minio-mc
```

**2. Configurar alias local** (MinIO corriendo en tu máquina):
```bash
mc alias set local http://localhost:9000 minioadmin minioadmin
# Verificar:
mc ls local/pixelart-assets
```

**3. Configurar alias VPS via SSH tunnel:**

El MinIO de la VPS no tiene el puerto expuesto públicamente. Se accede via tunnel:

```bash
# Abrir el túnel en background (mapea puerto 9002 local → puerto 9000 de la VPS)
ssh -L 9002:localhost:9000 root@<IP_VPS> -N &
# Guarda el PID que aparece, lo vas a necesitar para cerrar el túnel

mc alias set vps http://localhost:9002 <MINIO_USER_VPS> <MINIO_PASS_VPS>
# Verificar:
mc ls vps/pixelart-assets
```

> Las credenciales de MinIO de la VPS están en el `.env.docker` de producción.

---

### Flujo para reemplazar archivos con mejor calidad

Este es el caso más común: reemplazás imágenes localmente por versiones de mejor calidad con el **mismo nombre y ruta**.

**Paso 1 — Ver qué cambiaría antes de ejecutar (dry-run):**
```bash
mc diff local/pixelart-assets vps/pixelart-assets
```
Esto lista los archivos que difieren entre local y VPS. Revisá que el listado tenga solo lo que querés subir.

**Paso 2 — Sincronizar (sobreescribe solo lo que cambió, NO borra nada):**
```bash
mc mirror --overwrite local/pixelart-assets vps/pixelart-assets
```

`--overwrite` reemplaza archivos que existen en VPS si difieren de local.
**SIN** `--remove` — nunca borres archivos de VPS que quizás no tenés en local.

**Paso 3 — Verificar:**
```bash
mc ls vps/pixelart-assets/IA_Books/  # navegar el bucket y confirmar
```

**Paso 4 — Cerrar el túnel:**
```bash
kill %1  # o el PID del proceso ssh -N
```

---

### Para subir/reemplazar archivos puntuales (más quirúrgico)

Si solo cambiaron 1 o 2 archivos y no querés sincronizar todo:

```bash
# Abrir túnel primero (igual que arriba)
ssh -L 9002:localhost:9000 root@<IP_VPS> -N &

mc cp \
  "local/pixelart-assets/IA_Books/Love_Books_Page/Libros/X_Razones/Plantillas/PLANTILLA_2.png" \
  "vps/pixelart-assets/IA_Books/Love_Books_Page/Libros/X_Razones/Plantillas/PLANTILLA_2.png"

# Cerrar túnel
kill %1
```

---

### Regla de oro: cuándo usar cada comando

| Situación | Comando |
|---|---|
| Reemplazás muchos archivos con mejor calidad | `mc mirror --overwrite local/... vps/...` |
| Subís 1-3 archivos puntuales | `mc cp local/... vps/...` |
| Querés ver diferencias antes de tocar algo | `mc diff local/... vps/...` |
| Querés listar lo que hay en VPS | `mc ls vps/pixelart-assets/ruta/` |

**NUNCA usar `mc mirror --remove`** — eso borra en VPS los archivos que no existen en local, y es probable que tu local no tenga todo lo que tiene la VPS.

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
