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

### 4. Recargar `puente` (nginx compartido) — SIEMPRE después de reconstruir `web`

Reconstruir el contenedor no lo reinicia: lo destruye y crea uno nuevo con **otra IP
interna**, aunque el nombre (`pixelart_web`) sea el mismo. `puente` (el nginx
compartido que enruta todo el tráfico de internet) resuelve ese nombre a una IP una
sola vez al arrancar — después de un rebuild sigue apuntando a la IP del contenedor
viejo (ya destruido) y tira **502 Bad Gateway**, aunque `pixelart_web` esté sano y
escuchando bien. La conexión a la red `shared-gateway` en sí no se rompe (no hace
falta `docker network connect` de nuevo) — el problema es solo la IP cacheada de nginx:

```bash
docker exec puente nginx -s reload
```

Esto no reinicia `puente`, solo le hace releer su config y volver a resolver los
nombres de los contenedores a sus IPs actuales. Sin este paso, cualquier rebuild de
`web` deja el sitio caído hasta que alguien lo note.

### 5. Si después de un rebuild el sitio da 502 aunque `puente` ya recargó

Verificar que `frontend/web/Dockerfile.prod` tenga esta línea (debería estar siempre,
pero si alguna vez se usa una imagen vieja — por ejemplo, un rollback manual con
`docker tag <id-viejo> docker-web:latest` — puede faltar):

```dockerfile
ENV HOSTNAME=0.0.0.0
```

Docker le pone automáticamente `HOSTNAME=<id-del-contenedor>` a todo contenedor, y el
server standalone de Next.js (`server.js`) usa esa variable para decidir en qué
dirección escuchar. Sin este override, el server queda escuchando SOLO en la IP de
una de las dos redes del contenedor (la que Docker resuelve como "primaria" para ese
hostname) — normalmente `docker_default` — y nunca en `shared-gateway`. Resultado:
`curl localhost:3000` desde el mismo host funciona (pasa por el puerto publicado,
que sí llega), pero `puente` (que le habla por `shared-gateway`) se queda con
"Connection refused" aunque la IP que está usando sea la correcta y el contenedor
esté sano. Se nota en el log de arranque: si dice
`Local: http://ada7aebeb95b:3000` (el hostname del contenedor) en vez de
`Local: http://localhost:3000` / `Network: http://0.0.0.0:3000`, falta este fix.

**Importante:** esto significa que un rollback a una imagen vieja (`docker tag
<id-anterior> docker-web:latest`) puede resucitar un bug que ya se había arreglado
después. Antes de volver a una imagen vieja como solución rápida, confirmar que
tenía este fix — si no, es mejor arreglar hacia adelante (la imagen nueva) que
retroceder.

### 6. MinIO — NUNCA cambiar de versión sin el sufijo `-cpuv1`

Esta VPS tiene una CPU que **no soporta microarquitectura x86-64-v2**. Las imágenes
`minio/minio:latest` (y cualquier release sin sufijo `-cpuv1`) desde cierta versión
requieren ese nivel de CPU y mueren con `Fatal glibc error: CPU does not support
x86-64-v2` — MinIO no arranca, no hay fallback gracioso.

Por eso el compose está pineado a una versión específica con sufijo `-cpuv1`
(ver el comentario junto al servicio `minio` en `docker-compose.prod.yml`). Esa
build existe exactamente para CPUs viejas como esta — es la ÚNICA familia de tags
segura para subir de versión acá.

**Gotcha real que ya pasó una vez:** si alguna vez MinIO llegó a correr con una
versión más nueva (`-cpuv1` o no) y después alguien volvió a pinear una versión
vieja sin migrar los datos de vuelta, los objetos quedan escritos en un formato de
metadata que el MinIO viejo no puede leer — todas las lecturas devuelven
`500 Internal Server Error` con `decodeXLHeaders: Unknown xl header version N` en
el log de MinIO (`docker logs pixelart_minio`), aunque los archivos siguen
intactos en el volumen. No es pérdida de datos, es incompatibilidad del binario
que los lee. La solución es subir el motor a una versión `-cpuv1` que sí entienda
ese formato, nunca bajar la versión para "arreglarlo".

Antes de cambiar la versión de MinIO:
1. Confirmar que el tag termina en `-cpuv1`.
2. Si no hay una imagen `-cpuv1` ya descargada (`docker images | grep minio`), buscar
   en Docker Hub el release deseado específicamente con ese sufijo — no usar `latest`.

### Checklist rápido después de reconstruir CUALQUIER contenedor en esta VPS

1. `docker ps --filter name=<contenedor> --format "{{.Status}}"` — ¿está "healthy"?
2. `docker logs <contenedor> --tail 30` — ¿arrancó limpio, sin stack traces?
3. Si el contenedor está en `shared-gateway` (lo usa `puente` para enrutar): `docker exec puente nginx -s reload`
4. Probar la ruta real desde adentro de otro contenedor de la misma red, no solo
   `curl localhost` desde el host — `localhost` pasa por el puerto publicado y puede
   funcionar aunque la red interna esté rota (fue justo lo que pasó con `web` hoy).

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
