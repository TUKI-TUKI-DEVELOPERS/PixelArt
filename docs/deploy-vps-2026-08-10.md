# Deploy a la VPS — 10 de agosto 2026 (generación con IA de tapa/contraportada/add-on)

## Qué se desplegó

4 commits a `origin/main`:
1. `feat: generación con IA de tapa, contraportada y add-on para libros personalizados`
2. `feat: backfill de contenido Familia/Mascotas/Memorias Familiares + fix dedicatoria pisando poemas`
3. `fix: poemas de '1025 Días...' arrancaban con '100 días', y castellano neutro en textos de cara al cliente`
4. `chore: ignorar PromptsPixelArtPlantillas/ (pipeline standalone, 575MB, no es parte de la app)`

## Procedimiento estándar (según `docs/deploy-strategy.md`)

```bash
cd ~/PixelArt
git fetch origin
git checkout origin/main -- $(git diff --name-only HEAD origin/main | grep -vE '^(infra/docker/docker-compose\.yml|\.env\.docker|frontend/web/next\.config\.ts)$')
docker compose -f infra/docker/docker-compose.yml up --build api web -d
```

Esto trajo el código, pero **destapó una cadena de problemas preexistentes** que nadie había visto porque el contenedor `api` no se reiniciaba hacía mucho tiempo. Ninguno de los siguientes problemas los causó el `git push` — los causó el simple hecho de reiniciar contenedores que llevaban mucho sin arrancar en frío. Quedan documentados acá para que la próxima vez sea mecánico, no una odisea de 3+ horas.

---

## Problema 1 — MinIO no arranca: `Fatal glibc error: CPU does not support x86-64-v2`

**Síntoma**: `docker ps` muestra `pixelart_minio` en `Restarting`, y todo lo que depende de él (`api`, `web`) nunca llega a arrancar (`dependency failed to start: container pixelart_minio is unhealthy`).

**Causa**: el `docker-compose.yml` tenía `image: minio/minio:latest` sin pinnear. Las imágenes recientes de MinIO se compilan exigiendo instrucciones de CPU x86-64-v2, que esta VPS no soporta (CPU virtualizada más vieja). Además, el repo oficial `minio/minio` en Docker Hub se archivó en abril 2026 — ya no publican imágenes nuevas.

**Fix**: pinnear a la última release oficial con variante `-cpuv1` (compilada para CPU baseline):

```bash
sed -i 's|image: minio/minio:latest|image: minio/minio:RELEASE.2025-09-07T16-13-09Z-cpuv1|' infra/docker/docker-compose.yml
docker compose -f infra/docker/docker-compose.yml up -d
```

Si en el futuro hay que actualizar MinIO, buscar la última tag `-cpuv1` disponible (repo oficial archivado — revisar forks de la comunidad tipo `coollabsio/minio` como alternativa a mediano plazo).

---

## Problema 2 y 3 — `api` no arranca: faltan `OPENAI_API_KEY` y `RESEND_API_KEY`

**Síntoma**: log de `pixelart_api` muestra `ERROR [ExceptionHandler] Missing credentials...` (OpenAI) o `Missing API key. Pass it to the constructor new Resend(...)` (Resend), y el contenedor queda `unhealthy`.

**Causa**: el `.env.docker` real de la VPS (nunca se toca por git, a propósito) directamente no tenía esas dos variables. Como NestJS instancia todos los providers al arrancar, si falta cualquiera de las dos keys que usan los adaptadores (`OpenAiImageGenerationAdapter`, `ResendEmailSender`), el proceso entero no bootea — no es que "rompa una feature", tira abajo toda la API.

**Fix**: agregar las líneas faltantes al `.env.docker` de la VPS (nunca pegar la key real en el chat — se edita el comando localmente en la propia terminal de la VPS antes de correrlo):

```bash
echo 'OPENAI_API_KEY=sk-proj-...' >> .env.docker
echo 'RESEND_API_KEY=re_...' >> .env.docker
echo 'NEXT_PUBLIC_URL=https://pixelart.pe' >> .env.docker   # tampoco estaba
docker compose -f infra/docker/docker-compose.yml up -d
```

**Verificar sin exponer la key** (cuenta líneas, no valores):
```bash
grep -c "^OPENAI_API_KEY=" .env.docker
grep -c "^RESEND_API_KEY=" .env.docker
grep -c "^NEXT_PUBLIC_URL=" .env.docker
```

---

## Problema 4 — El sitio corría en modo desarrollo (`next dev` / `nest start --watch`), lento y con la insignia "N" de Next.js

**Síntoma**: el sitio funciona pero está notablemente lento, y en el navegador aparece la insignia de desarrollo de Next.js.

**Causa**: `docker-compose.yml` tenía `target: dev` para `api` y `web` — esto **nunca fue un modo de producción real**, corría con hot-reload desde siempre (coincide con lo que documentaba `deploy-strategy.md`). Además el `target: dev` monta el código fuente por bind-mount, lo que hay que sacar al pasar a producción (si no, pisa el build compilado).

**Fix** — cambiar a los targets `prod` que ya existen en los Dockerfiles (`node dist/main` para api, `node server.js` standalone para web), sacar los bind-mounts, y `NODE_ENV: production`:

```bash
cp infra/docker/docker-compose.yml infra/docker/docker-compose.yml.bak-$(date +%s)
```

Cambios aplicados a `infra/docker/docker-compose.yml` (a mano en la VPS, **nunca vía git** — este archivo está en la lista de divergencia):
- `target: dev` → `target: prod` (en `api` y `web`)
- `NODE_ENV: development` → `NODE_ENV: production` (en `api`)
- Se eliminó el bloque `volumes:` de código fuente en `api` y `web` (bind-mount + node_modules/cache nombrados) — en producción el build ya viene compilado dentro de la imagen, el bind-mount lo pisaría.

```bash
docker compose -f infra/docker/docker-compose.yml up --build -d
```

**⚠️ Esto es ahora una divergencia PERMANENTE** entre el `docker-compose.yml` del repo (que sigue en `target: dev` para desarrollo local/híbrido) y el de la VPS (`target: prod`). Ya estaba en la lista de archivos que nunca se tocan por `git checkout` — esta es exactamente la razón.

---

## Problema 5 — 502 Bad Gateway después de cada rebuild: se pierde la conexión a `shared-gateway`

**Síntoma**: los contenedores están `healthy`, pero el sitio da 502 desde afuera. El log de `puente` (el nginx compartido de la VPS, contenedor `nginx:alpine`, atiende varios proyectos — PixelArt, torolococayma, etc. — en el puerto 80/443) dice `host not found in upstream "pixelart_web:3000"`.

**Causa**: `puente` resuelve los contenedores por **nombre**, vía una red Docker compartida llamada `shared-gateway`. Esa conexión de red **no estaba declarada en `docker-compose.yml`** (se había agregado a mano con `docker network connect`, no era parte del compose managed) — así que cada vez que Docker recreaba `pixelart_api`/`pixelart_web` (cualquier `--build`), se perdía.

**Fix aplicado (2026-08-11) — ya no requiere pasos manuales.** Se declaró `shared-gateway` como red externa directo en `infra/docker/docker-compose.yml` de la VPS (edición a mano, nunca vía git — este archivo sigue en la lista de divergencia permanente):

```yaml
  api:
    ...
    networks:
      - default
      - shared-gateway   # agregar después del depends_on, antes de healthcheck

  web:
    ...
    networks:
      - default
      - shared-gateway   # agregar después del depends_on, antes de healthcheck

networks:                # nueva sección al final del archivo, junto a volumes:
  shared-gateway:
    external: true
```

Con esto, Compose reconecta `shared-gateway` solo en cada recreación de `api`/`web` — **`docker network connect` no hace falta nunca más**.

Verificación:
```bash
docker inspect pixelart_web --format 'web: {{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'
docker inspect pixelart_api --format 'api: {{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'
# ambos tienen que listar: docker_default shared-gateway
```

---

## Problema 6 — Seguía 502 aun con la red bien conectada: Next.js standalone escucha solo en `localhost`

**Síntoma**: `puente` resuelve bien la IP del contenedor, pero el log dice `connect() failed (111: Connection refused)`. `curl localhost:3000` desde la VPS funciona perfecto (200 OK), pero la conexión desde OTRO contenedor (`puente`, vía la IP de `shared-gateway`) es rechazada.

**Causa**: el server standalone de producción de Next.js (`server.js`, generado por `output: 'standalone'`) **por defecto escucha solo en `localhost` dentro del contenedor**, a diferencia de `next dev` que escucha en todas las interfaces. El puerto publicado (`ports: "3000:3000"`) funciona igual porque Docker lo redirige directo al proceso, pero una conexión desde OTRO contenedor por la IP de red sí necesita que la app escuche en `0.0.0.0`.

**Fix** — forzar el bind a todas las interfaces (variable de entorno, no se hornea en el build, no hace falta rebuild):

```yaml
  web:
    environment:
      ...
      HOSTNAME: "0.0.0.0"
```

```bash
docker compose -f infra/docker/docker-compose.yml up -d web
docker exec puente nginx -s reload   # shared-gateway ya no hay que reconectarla (ver Problema 5), pero el reload sigue haciendo falta
```

---

## Checklist para el próximo deploy a producción

1. `git fetch` + `git checkout origin/main -- <archivos>` (nunca `docker-compose.yml`, `.env.docker`, `next.config.ts`)
2. `docker compose -f infra/docker/docker-compose.yml up --build api web -d`
3. **Siempre**, después del build: recargar `puente` (la reconexión a `shared-gateway` ya es automática desde el fix del 2026-08-11, ver Problema 5 — solo falta el reload porque nginx cachea la IP vieja del contenedor):
   ```bash
   docker exec puente nginx -s reload
   ```
4. Verificar sin exponer secretos: `.env.docker` tiene `OPENAI_API_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_URL=https://pixelart.pe` (los tres con `grep -c "^VAR="`)
5. Verificar contenido de BD aplicado (si el deploy incluye backfills):
   ```bash
   docker exec -i pixelart_postgres psql -U pixelart -d pixelart -c "
   SELECT COUNT(*) FILTER (WHERE cover_scene_visual IS NOT NULL) AS con_tapa, COUNT(*) AS total
   FROM personalized_models;"
   ```
6. `curl -I https://pixelart.pe` desde la propia VPS (no confiar solo en el navegador — puede tener caché)
7. Si el 502 vuelve a aparecer después de un rebuild futuro: el paso 3 (reload de `puente`) es el único punto que sigue siendo manual — confirmá que se corrió. Si el reload no alcanza, recién ahí revisar el Problema 5 completo (podría indicar que la red `shared-gateway` se sacó del compose sin querer).
