# Fix: Upload de fotos no funcionaba en mobile (producción VPS)

## El síntoma

El upload de fotos fallaba silenciosamente en mobile (iPhone y Android) en la VPS de producción. El desktop funcionaba normalmente en local, pero en producción ningún cliente podía subir fotos desde el celular.

Comportamiento exacto:
- El file picker abría correctamente
- El usuario seleccionaba una foto
- Nada pasaba — sin spinner, sin error, sin foto en la UI
- En desktop (probado en local) funcionaba bien

---

## Diagnóstico — lo que probamos

### Intento 1 — Logs de la API y nginx

Corrimos:
```bash
docker compose -f infra/docker/docker-compose.yml logs -f api
tail -f /var/log/nginx/access.log
```

Resultado: al intentar el upload desde mobile, **no aparecía nada en ninguno de los dos logs**. El request nunca llegaba al servidor.

Conclusión: el problema era client-side o se cortaba antes de llegar a la API.

### Intento 2 — Filtro de MIME type (HEIC en iOS)

En `usePhotoUpload.ts` había un filtro:
```ts
const imageFiles = files.filter((f) => f.type.startsWith("image/"));
```

En iOS, las fotos HEIC tienen `file.type === ""` (string vacío). Entonces el filtro las eliminaba y el array quedaba vacío → return sin error, sin upload.

Fix aplicado:
```ts
const imageFiles = files.filter(
  (f) =>
    f.type.startsWith("image/") ||
    (!f.type && /\.(jpe?g|png|gif|webp|heic|heif|avif|bmp)$/i.test(f.name)),
);
```

Resultado: el fix era correcto y necesario, pero el upload seguía fallando. El request aún no llegaba al servidor.

### Intento 3 — Logs del contenedor web

Esta fue la clave. En vez de mirar los logs de la API, miramos los logs del contenedor web (Next.js):

```bash
docker compose -f infra/docker/docker-compose.yml logs -f web
```

Output al intentar el upload:
```
Failed to proxy http://localhost:3001/api/assets/upload-public?folder=uploads%2Fphotobooks [AggregateError: ] { code: 'ECONNREFUSED' }
```

El contenedor web intentaba conectar a `http://localhost:3001` — que dentro de Docker es el contenedor mismo, no la API. `ECONNREFUSED` porque nadie escucha en ese puerto.

### Diagnóstico confirmado

El `next.config.ts` tiene este rewrite:

```ts
async rewrites() {
  const apiBase =
    process.env.API_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:3001';
  return [
    {
      source: '/api/:path*',
      destination: `${apiBase}/api/:path*`,
    },
  ];
},
```

El docker-compose de la VPS tiene `API_INTERNAL_URL: http://api:3001` en la sección `environment:` del servicio web. Pero eso solo aplica en **runtime** (cuando el contenedor está corriendo), NO durante el `docker build`.

---

## El problema real — Next.js standalone baquea rewrites en BUILD TIME

**Este es el punto más importante y no obvio.**

En Next.js con `output: 'standalone'`, las funciones `rewrites()`, `headers()`, y `redirects()` de `next.config.ts` se evalúan durante **`next build`**, no cuando el servidor arranca.

El resultado queda compilado en el output de `.next/standalone/`. Al momento del build, `API_INTERNAL_URL` no estaba disponible porque las variables de `environment:` en docker-compose solo se inyectan al contenedor en runtime.

| Momento | ¿Tiene `API_INTERNAL_URL`? |
|---|---|
| `docker build` (RUN npm run build) | NO — env vars de `environment:` no están disponibles |
| Contenedor corriendo | SÍ — pero ya es tarde, la rewrite está compilada con `localhost:3001` |

Por eso el rewrite siempre usaba `http://localhost:3001` sin importar cuántas veces se reiniciara el contenedor.

**¿Por qué funcionaba en desktop?**

En retrospectiva, "desktop funciona" se refería al local dev (`localhost:3001` sí alcanza la API), no a producción. En producción el upload también fallaba en desktop — pero la app en general cargaba bien porque las páginas usan Server Components que no pasan por el rewrite de upload.

---

## La solución

### Fix 1 — `frontend/web/Dockerfile`

Agregar `ARG` + `ENV` **antes** de `RUN npm run build` para que la variable esté disponible en build time:

```dockerfile
# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
# API_INTERNAL_URL debe estar disponible en build time para que Next.js standalone
# baquee correctamente el rewrite /api/* → http://api:3001 (red Docker interna).
ARG API_INTERNAL_URL=http://api:3001
ENV API_INTERNAL_URL=${API_INTERNAL_URL}
# public/ es opcional en Next.js; si no existe el COPY del stage prod falla
RUN mkdir -p public
RUN npm run build
```

El default `http://api:3001` es correcto para cualquier build de Docker — es el hostname interno de la red de Docker Compose. En local dev se corre Next.js directamente (sin Docker), así que el Dockerfile no afecta.

### Fix 2 — `frontend/web/src/hooks/usePhotoUpload.ts`

Filtro de MIME type más permisivo para archivos HEIC de iOS:

```ts
const imageFiles = files.filter(
  (f) =>
    f.type.startsWith("image/") ||
    (!f.type && /\.(jpe?g|png|gif|webp|heic|heif|avif|bmp)$/i.test(f.name)),
);
```

---

## Por qué `docker compose restart` no servía

`docker compose restart` reinicia el contenedor con la **misma imagen y las mismas variables** con las que fue creado originalmente. No recarga el docker-compose.yml.

Para forzar la recreación con variables actualizadas (sin rebuild):
```bash
docker compose -f infra/docker/docker-compose.yml up web -d --force-recreate
```

Pero en este caso no alcanzaba porque el problema estaba en el BUILD, no en las variables de runtime.

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `frontend/web/Dockerfile` | ARG/ENV para `API_INTERNAL_URL` + `mkdir -p public` |
| `frontend/web/src/hooks/usePhotoUpload.ts` | Filtro HEIC con tipo vacío |

---

## Regla para el futuro

> En Next.js standalone, cualquier variable de entorno usada en `rewrites()`, `headers()`, o `redirects()` de `next.config.ts` debe declararse como `ARG` en el Dockerfile y estar disponible durante `RUN npm run build`. Las variables de `environment:` en docker-compose solo llegan al proceso en runtime, demasiado tarde para estas funciones.
