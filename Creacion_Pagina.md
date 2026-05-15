# Creación de un nuevo libro dentro de una categoría existente

Guía paso a paso para agregar un nuevo libro personalizado a la sección de Libros Personalizados.
Basada en la creación de "Gracias por tu amor" dentro de "Libros de Memorias Familiares".

---

## Estructura de carpetas en MinIO

Antes de tocar código, subir los archivos a MinIO siguiendo esta estructura:

```
IA_Books/
└── [Categoria]_Books_Page/         # Ej: Memorial_Books_Page
    └── Libros/
        └── [Nombre_Del_Libro]/     # Ej: Gracias_por_tu_amor
            ├── [Libro]_Central.png
            ├── [Libro]_Central_2.png
            ├── [Libro]_Central_3.png
            └── Plantillas/
                ├── PLANTILLA_01_[Nombre].png
                ├── PLANTILLA_02_[Nombre].png
                └── ... (hasta PLANTILLA_20)

IA_Books/
└── Backgrounds/
    └── Backgrounds_Libros_[Categoria]_[NombreLibro].png   # Background de la página del libro
```

**Archivos necesarios por libro:**
- 3 imágenes centrales (carousel en la página de detalle)
- 20 plantillas en la carpeta `Plantillas/`
- 1 imagen de background para la página del libro

**Opcional (cuando esté disponible):**
- 1 miniatura en `IA_Books/IaBooks_Miniaturas/` para la tarjeta del catálogo

---

## Archivos a modificar (5 en total)

### 1. `backend/api/src/database/seed.ts`

**a) Agregar el modelo a la categoría correspondiente** (array `modelSeeds`):
```ts
{ categoryId: cat['Libros de Memorias Familiares'], name: 'Gracias por tu amor' },
```

**b) Agregar las plantillas** (objeto `templateData`):
```ts
'Gracias por tu amor': {
  base: 'IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Plantillas',
  files: [
    'PLANTILLA_01_[Nombre].png',
    'PLANTILLA_02_[Nombre].png',
    // ... hasta 20
  ],
},
```

**c) Agregar el catalog_book** (array `catalogSeeds`):
```ts
{ name: 'Gracias por tu amor', type: 'CUSTOM_BOOK', desc: 'Descripción del libro.' },
```

**Luego correr el seed:**
```bash
docker compose -f infra/docker/docker-compose.yml exec api npm run seed
```

> El seed usa `INSERT ... WHERE NOT EXISTS` para las plantillas, por lo que es seguro correrlo múltiples veces sin duplicar datos.

---

### 0. Verificar nombres exactos en MinIO ANTES de escribir código

Siempre listar el contenido real de MinIO para obtener los nombres exactos de los archivos. Nunca asumir — cualquier diferencia de mayúsculas o guion rompe la carga de imagen.

**Listar archivos del libro (centrales + plantillas):**
```bash
docker exec pixelart_minio sh -c "ls /data/pixelart-assets/IA_Books/[Categoria]_Books_Page/Libros/[Nombre_Libro]/"
docker exec pixelart_minio sh -c "ls /data/pixelart-assets/IA_Books/[Categoria]_Books_Page/Libros/[Nombre_Libro]/Plantillas/"
```

**Listar backgrounds disponibles:**
```bash
docker exec pixelart_minio sh -c "ls /data/pixelart-assets/IA_Books/Backgrounds/"
```

**Listar miniaturas disponibles:**
```bash
docker exec pixelart_minio sh -c "ls /data/pixelart-assets/IA_Books/IaBooks_Miniaturas/"
```

Con los nombres reales de esos listados se completan los pasos siguientes.

---

### 2. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/page.tsx`

**a) Agregar el slug a `LIBROS_VALIDOS`** bajo la categoría correcta:
```ts
"libros-de-memorias-familiares": {
  "recuerdos-familiares": "Recuerdos Familiares",
  "gracias-por-tu-amor": "Gracias por tu amor",   // <-- agregar
},
```

**b) Agregar el background** en `BACKGROUND_KEYS`:
```ts
"gracias-por-tu-amor": "IA_Books/Backgrounds/Backgrounds_Libros_Memoria_Familiar_Gracias_por_tu_amor.png",
```

**c) Agregar las imágenes del carousel** en `CAROUSEL_KEYS`:
```ts
"gracias-por-tu-amor": [
  "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central.png",
  "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central_2.png",
  "IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Libros_Memoria_Familiar_Siempre_en_mi_corazon_Central_3.png",
],
```

**d) Agregar el mapa de nombres para resolver IDs de BD** en `LIBRO_NAMES`:
```ts
"gracias-por-tu-amor": { modelName: "Gracias por tu amor", catalogBookName: "Gracias por tu amor" },
```

> `modelName` debe coincidir exactamente con el nombre en `personalized_models`.
> `catalogBookName` debe coincidir exactamente con el nombre en `catalog_books`.

---

### 3. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/LibroDetalleClient.tsx`

**a) Agregar la miniatura** en `SLUG_THUMBNAIL` (cuando esté disponible en MinIO):
```ts
"gracias-por-tu-amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Memorial_GraciasportuAmor_Miniatura.png",
```

**b) Agregar la info del libro** en `LIBROS_INFO`:
```ts
"gracias-por-tu-amor": {
  nombre: "Gracias por tu amor",
  subtitulo: "Libro Memorial Personalizado",
  tagline: "PORQUE SIEMPRE SERÁS PARTE DE MÍ",
  descripcionCorta: "El homenaje más hermoso para quien nunca olvidarás:",
  bullets: [
    "Un libro que honra los momentos únicos que compartieron juntos.",
    "Cada página celebra quién fue esa persona especial y lo que significó para vos.",
  ],
  caracteristicas: [
    { label: "Edad", value: "0 - 100 años" },
    { label: "Longitud", value: "16 páginas" },
    { label: "Tamaño", value: "20 x 12 cm" },
    { label: "Tipo de tapa", value: "Delgada" },
    { label: "Historias", value: "1 / 10 Seleccionadas" },
  ],
  precio: { gruesa: "S/ 49.99", premium: "S/ 59.99" },
  reviewCount: 0,
  accent: "#8b6bb1",   // color del tema (usar el de la categoría o uno propio)
},
```

---

### 4. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/CategoriaClient.tsx`

**Agregar la tarjeta del libro** en `CATEGORY_BOOKS` bajo la categoría correcta:
```ts
"libros-de-memorias-familiares": [
  // ... libros existentes ...
  {
    id: "memorias-2",                        // ID único dentro del array
    slug: "gracias-por-tu-amor",             // slug de la URL
    name: "Gracias por tu amor",
    productType: "CUSTOM_BOOK",
    description: "Descripción corta para la tarjeta.",
    coverImageUrl: null,                     // null hasta tener miniatura
    variants: [{ id: "vm1", coverType: "TAPA_DURA", basePriceCents: 8900 }],
    categoryBadge: "MEMORIAS FAMILIARES",
    tagline: "PORQUE SIEMPRE SERÁS PARTE DE MÍ",
    reviewCount: 0,
  },
],
```

> Si hay miniatura disponible en MinIO, también agregar en `COVER_MAP`:
> ```ts
> "gracias-por-tu-amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Memorial_GraciasportuAmor_Miniatura.png",
> ```

---

### 5. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/page.tsx`

Solo necesita cambios si se crea una **categoría nueva**. Para libros dentro de una categoría existente, este archivo no se toca.

Si fuera categoría nueva, agregar:
- El slug en `CATEGORIAS_VALIDAS`
- El nombre en `CATEGORIA_NOMBRES`
- El bloque de assets en la función `CategoriaPage`

---

## Caché de Next.js — paso obligatorio después del seed

Después de correr el seed, el endpoint `/api/personalized/categories` puede tener una respuesta **cacheada** de antes de agregar el nuevo libro. Esto hace que `resolveDbIds` devuelva `null` y las plantillas del wizard aparezcan vacías sin ningún error visible.

**Siempre reiniciar el container de Next.js después del seed:**
```bash
docker compose -f infra/docker/docker-compose.yml restart web
```

Esperar unos segundos y verificar que la página responda:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/libros-personalizados/[categoria]/[slug-libro]
# Debe devolver 200
```

Recién después de ese restart visitar la página del libro nuevo. Si se visita antes, Next.js cachea el resultado vacío y las plantillas no aparecen aunque todo esté bien en la BD.

---

## Checklist rápido

- [ ] Archivos subidos a MinIO (3 centrales + 20 plantillas + 1 background)
- [ ] seed.ts: modelo + plantillas + catalog_book
- [ ] Seed corrido: `docker compose ... exec api npm run seed`
- [ ] `[libroSlug]/page.tsx`: LIBROS_VALIDOS + BACKGROUND_KEYS + CAROUSEL_KEYS + LIBRO_NAMES
- [ ] `LibroDetalleClient.tsx`: LIBROS_INFO (+ SLUG_THUMBNAIL cuando haya miniatura)
- [ ] `CategoriaClient.tsx`: tarjeta en CATEGORY_BOOKS (+ COVER_MAP cuando haya miniatura)
- [ ] Reiniciar el container web: `docker compose ... restart web`
- [ ] Verificar que la página responde 200 antes de visitarla

---

## Convenciones de nombres de archivos en MinIO

| Tipo | Patron |
|------|--------|
| Central | `Libros_[Categoria]_[NombreSlug]_Central.png` |
| Central 2/3 | `Libros_[Categoria]_[NombreSlug]_Central_2.png` |
| Background libro | `Backgrounds_Libros_[Categoria]_[NombreLibro].png` |
| Background categoría | `Background_IA_Books_[Categoria]_Book_Page.png` |
| Miniatura | `IaBooks_Libros_[Categoria]_[NombreLibro]_Miniatura.png` |
| Plantilla | `PLANTILLA_01_[Descripcion_Con_Guiones_Bajos].png` |
