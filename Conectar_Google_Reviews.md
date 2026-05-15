# Conectar Sistema de Reviews a Google

## Resumen del flujo

El sistema de feedback funciona en dos etapas:

1. **Post-compra**: Admin marca una orden como entregada → genera link de feedback → cliente recibe email → califica su libro
2. **Gate automático**:
   - `stars >= 4.5` → el cliente ve un botón "Dejar reseña en Google" → se registra como `redirectedToGoogle: true`
   - `stars < 4.5` → queda guardado internamente → admin lo ve en `/admin/feedback` bajo "Requieren Atención"

Las estrellas en las tarjetas del catálogo son decorativas (5 fijas por defecto) hasta que haya ratings reales, momento en que el promedio real reemplaza el valor estático automáticamente.

---

## Archivos relevantes

| Archivo | Qué hace |
|---|---|
| `backend/api/src/feedback/feedback.service.ts` | Lógica principal — Google URL, submit, ratings públicos |
| `backend/api/src/feedback/feedback-public.controller.ts` | Endpoints públicos: `GET /api/feedback/ratings`, `GET/POST /api/feedback/:token` |
| `backend/api/src/feedback/feedback-admin.controller.ts` | Endpoint admin: lista todos los feedbacks |
| `backend/api/src/feedback/domain/ports/feedback-repository.port.ts` | Contrato del repo (port) — incluye `getAverageRatings()` |
| `backend/api/src/feedback/infrastructure/persistence/repositories/typeorm-feedback.repository.ts` | Implementación TypeORM — incluye query SQL de promedios |
| `frontend/web/src/app/(public)/feedback/[token]/page.tsx` | Página pública donde el cliente califica |
| `frontend/web/src/app/admin/feedback/page.tsx` | Panel admin de feedbacks |
| `frontend/web/src/components/Home/BookCard.tsx` | Tarjeta del Home — acepta prop `rating?: number` |
| `frontend/web/src/components/catalog/ProductCard.tsx` | Tarjeta de Libros Personalizados — acepta prop `rating?: number` |
| `frontend/web/src/app/(public)/page.tsx` | Home — pasa libros a `NuestrosLibrosSection` |
| `frontend/web/src/components/NuestrosLibros/NuestrosLibrosClient.tsx` | Página /libros-personalizados — pasa libros a `ProductGrid` |
| `infra/docker/.env.docker` | Variables de entorno de producción |

---

## Paso 1 — Obtener la URL de Google Reviews

1. Ir a [Google Business Profile](https://business.google.com)
2. Seleccionar el negocio PixelArt
3. En el panel principal buscar "Obtener más reseñas" o ir a **Inicio > Reseñas**
4. Copiar el link directo (formato: `https://g.page/r/XXXXXX/review` o `https://search.google.com/local/writereview?placeid=XXXXXX`)

---

## Paso 2 — Configurar la variable de entorno

Abrir `infra/docker/.env.docker` y agregar:

```env
GOOGLE_REVIEW_URL=https://g.page/r/TU_ID_REAL/review
```

El backend ya lee esta variable en `feedback.service.ts`:

```ts
const GOOGLE_REVIEW_URL = process.env.GOOGLE_REVIEW_URL ?? 'https://g.page/pixelart-peru/review';
```

No hay que tocar ningún archivo de código. Solo setear la variable y reiniciar.

---

## Paso 3 — Reiniciar el servicio

```bash
docker compose -f infra/docker/docker-compose.yml restart api
```

Verificar que funciona:

```bash
curl -s http://localhost:3001/api/feedback/ratings | jq
# Debe devolver [] si aún no hay ratings, o el promedio por libro
```

---

## Paso 4 — Conectar ratings reales a las tarjetas

Cuando ya haya feedbacks registrados, las tarjetas pueden mostrar el rating real en vez de las 5 estrellas estáticas.

### 4.1 — Entender el endpoint

```
GET /api/feedback/ratings
```

Respuesta:
```json
[
  { "modelId": 3, "photobookThemeId": null, "average": 4.7, "count": 23 },
  { "modelId": null, "photobookThemeId": 5, "average": 4.9, "count": 11 }
]
```

- `modelId` → ID del modelo de libro personalizado (tabla `personalized_models`)
- `photobookThemeId` → ID del tema de photobook
- `average` → promedio de estrellas (1.0 a 5.0, soporta medias estrellas)
- `count` → cantidad de calificaciones recibidas

### 4.2 — Conectar en el Home (`page.tsx`)

En `frontend/web/src/app/(public)/page.tsx`, agregar el fetch de ratings al inicio de `HomePage()`:

```ts
// Al inicio de la función HomePage, junto a los otros getAssetUrl
const ratingsRes = await fetch('http://api:3001/api/feedback/ratings', {
  next: { revalidate: 300 },
}).catch(() => ({ ok: false }));
const ratings: { modelId: number | null; average: number; count: number }[] =
  ratingsRes instanceof Response && ratingsRes.ok ? await ratingsRes.json() : [];

// Helper para obtener rating de un libro por modelId
function getRating(modelId: number | null): number {
  if (!modelId) return 5;
  const found = ratings.find(r => r.modelId === modelId && r.count > 0);
  return found ? found.average : 5;
}
```

Luego pasar `rating={getRating(modelId)}` a cada entrada del array `books`.

> **Nota**: Para esto necesitás saber el `modelId` de cada libro. Podés obtenerlo consultando la BD:
> ```bash
> docker exec -it pixelart_postgres psql -U pixelart -d pixelart \
>   -c "SELECT id, name FROM personalized_models ORDER BY id;"
> ```

### 4.3 — Conectar en Libros Personalizados (`NuestrosLibrosClient.tsx`)

El `ProductCard` ya recibe `reviewCount` desde los datos de la API. Solo hay que agregar el `rating`.

En `frontend/web/src/app/(public)/libros-personalizados/page.tsx`, agregar el fetch de ratings y pasarlo al componente:

```ts
async function fetchRatings() {
  const res = await fetch('http://api:3001/api/feedback/ratings', {
    next: { revalidate: 300 },
  }).catch(() => null);
  if (!res || !res.ok) return [];
  return res.json();
}
```

Luego pasarlo como prop a `NuestrosLibrosClient` y usarlo en el `sortedBooks` del `useMemo`.

### 4.4 — Las tarjetas ya están listas

Ambos componentes aceptan `rating?: number` con default `5`:

```tsx
// BookCard — Home
<BookCard
  title="10 Razones por las que Te Amo"
  rating={4.7}   // <- pasar aquí el promedio real. Si omitís → 5 estrellas
  // ... resto de props
/>

// ProductCard — Libros Personalizados
<ProductCard
  name="Mi Amor"
  rating={4.5}   // <- pasar aquí el promedio real. Si omitís → 5 estrellas
  // ... resto de props
/>
```

Las estrellas soportan medias estrellas (4.5 = 4 llenas + 1 media).

---

## Paso 5 — Flujo completo post-deploy para generar feedback

1. **Entregar una orden**: cambiar estado a `DELIVERED` en `/admin/ordenes`
2. **Generar link de feedback**: en la orden entregada, el admin puede generar el link que se envía por email al cliente
3. **Cliente califica**: entra a `/feedback/{token}`, pone sus estrellas y envía
4. **Gate automático**:
   - Si puso 4.5 o 5 estrellas → ve botón "Dejar reseña en Google" con la URL configurada en `GOOGLE_REVIEW_URL`
   - Si puso menos → el admin ve la alerta en `/admin/feedback` para tomar acción
5. **Ratings se acumulan**: el endpoint `GET /api/feedback/ratings` devuelve los promedios actualizados

---

## Resumen de cambios ya implementados

| Cambio | Estado |
|---|---|
| `GOOGLE_REVIEW_URL` lee de variable de entorno | Implementado |
| Endpoint publico `GET /api/feedback/ratings` | Implementado |
| `BookCard` acepta prop `rating` con medias estrellas | Implementado |
| `ProductCard` acepta prop `rating` con medias estrellas | Implementado |
| Gate 4.5 stars → Google / <4.5 → interno | Implementado |
| Panel admin `/admin/feedback` con KPIs y alertas | Implementado |

**Pendiente al momento del deploy:**
- Setear `GOOGLE_REVIEW_URL` real en `.env.docker`
- Pasar `rating` prop a las tarjetas usando datos reales del endpoint (Paso 4)
