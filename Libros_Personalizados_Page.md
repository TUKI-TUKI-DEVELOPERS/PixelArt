# Libros Personalizados — Contexto de Cambios

## Objetivo

Alinear la sección "Libros Personalizados" al sistema de diseño del home principal:
- Unificación tipográfica usando `design-tokens.ts` como fuente de verdad
- Responsive completo: mobile (`<768px`) | tablet (`768–1023px`) | desktop (`≥1024px`)

---

## Sistema de Diseño (design-tokens.ts)

**Archivo**: `frontend/web/src/lib/design-tokens.ts`

| Token | fontSize | fontWeight | lineHeight |
|-------|----------|------------|------------|
| Display | 56px | 900 | 1.1 |
| H1 | 48px | 900 | 1.15 |
| H2 | 36px | 700 | 1.2 |
| H3 | 28px | 600 | 1.25 |
| H4 | 24px | 600 | 1.3 |
| Body Large | 18px | 500 | 1.5 |
| Body | 16px | 400 | 1.6 |
| Small | 14px | 500 | 1.5 |
| Caption | 12px | 500 | 1.4 |

**Espaciado estándar**: padding vertical `80px`, horizontal `48px` (desktop)
**Max-width**: secciones `1280–1400px`, texto `900px`
**Font**: Montserrat (weights 400–900), importada en `layout.tsx`

---

## Responsive — Hook

**Archivo**: `frontend/web/src/hooks/useWindowSize.ts`

Extendido para exponer `isMobile`, `isTablet` e `isCompact`:

```ts
return {
  isMobile: width < 768,
  isTablet: width >= 768 && width < 1024,
  isCompact: width < 1024,
};
```

Patrón de uso en inline styles:

```tsx
const { isMobile, isTablet } = useWindowSize();

fontSize: isMobile ? "22px" : isTablet ? "28px" : "36px"
padding: isMobile ? "48px 20px" : isTablet ? "64px 32px" : "80px 48px"
```

---

## Archivos Modificados

### 1. `frontend/web/src/hooks/useWindowSize.ts`
- Agregado `isTablet` y `isCompact` al objeto de retorno

---

### 2. `frontend/web/src/components/catalog/ProductGrid.tsx`
- Grid responsive: `repeat(3,1fr)` → `repeat(2,1fr)` (tablet) → `1fr` (mobile)
- Column gap: `32px` → `20px` (tablet) → `0` (mobile)

---

### 3. `frontend/web/src/components/catalog/ProductCard.tsx`
- Imagen: altura `220px` → `160px` (mobile)
- H3 nombre: `w700` → `w500` (Body Large)
- Tagline: `13px w600` → `14px w500` (Small)
- Descripcion: `13px` → `14px` (Small)
- Precio: `w700` → `w500`
- Badge categoria: `w700` → `w500` (Caption)
- Boton "Crear Aqui": `w800` → `w700`

---

### 4. `frontend/web/src/components/NuestrosLibros/NuestrosLibrosClient.tsx`

**Tipografia unificada:**
- H1 hero: `72px w800` → `56px w900` (Display)
- Subtitulo hero: `28px uppercase` → `18px w500` (Body Large, sin uppercase)
- Parrafos intro: `20px` → `18px w500` (Body Large)
- H2 "Selecciona el libro...": `28px w700` → `36px w700` (H2)
- H2 FAQ, Comunidad, Blog: `32px w700` → `36px w700` (H2)
- FAQ question: `18px w600` → `18px w500` (Body Large)
- Boton "Ver Mas": `20px` → `16px w700` (Body)
- Testimonios H3: `20px w600` → `18px w500` (Body Large)
- Paddings de seccion: `56px` → `80px`

**Responsive agregado:**

| Seccion | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero minHeight | 280px | — | 400px |
| Hero padding | 48px 20px | 64px 32px | 80px 40px |
| H1 hero | 32px | 42px | 56px |
| Subtitulo hero | 14px | — | 18px |
| Intro padding | 48px 20px | 64px 32px | 80px 40px |
| Parrafos intro | 15px | — | 18px |
| Grid padding | 0 20px 48px | 0 32px 64px | 0 40px 80px |
| H2 "Selecciona..." | 22px | 28px | 36px |
| FAQ padding | 48px 20px | 64px 32px | 80px 40px |
| FAQ H2 | 22px | 28px | 36px |
| FAQ flexWrap | wrap | — | nowrap |
| Comunidad padding | 48px 20px | 64px 32px | 80px 40px |
| Comunidad H2 | 22px | 28px | 36px |
| Comunidad columns | 1 | 2 | 3 |
| Blog padding | 48px 20px | 64px 32px | 80px 40px |
| Blog H2 | 22px | 28px | 36px |
| Testimonios padding | 48px 20px | 64px 32px | 80px 40px |
| Testimonios grid | 1fr | repeat(2,1fr) | repeat(3,1fr) |
| Testimonios gap | 24px | — | 32px |

---

### 5. `frontend/web/src/components/NuestrosLibros/Sidebar.tsx`

**Tipografia unificada** (componente huerfano — no importado en ningun archivo):
- H2 "Nuestros Libros": `52px w800 #4f97cf` → `48px w900` (H1)
- Labels "Libros Personalizados" / "PhotoBooks": `22px w500` → `18px w500` (Body Large)
- Input font size: `20px` → `16px` (Body)

> No se agrego responsive porque el componente no esta en uso.

---

### 6. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/CategoriaClient.tsx`

**Tipografia unificada:**
- Hero P descripcion: `17px` → `16px w400` (Body)
- Label eyebrow catalogo: `14px w700 uppercase` → `12px w500 uppercase` (Caption)
- H3 "Escoge el diseno...": `32px w800` → `36px w700` (H2)
- FAQ H2: `32px w800` → `36px w700` (H2)
- FAQ question: `17px w600` → `18px w500` (Body Large)
- FAQ answer: `15px` → `16px w400` (Body)
- Comunidad H2: `32px w800` → `36px w700` (H2)
- Blog H2: `32px w800` → `36px w700` (H2)
- Blog card H3: `16px w600` → `16px w400` (Body)
- Blog card P: `13px` → `14px w400` (Small)
- Blog badge: `11px w700` → `12px w500` (Caption)
- Paddings de seccion: `72px` → `80px`

**Responsive agregado:**

| Seccion | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero minHeight | auto | — | 520px |
| Hero padding interior | 48px 20px | 64px 32px | 80px 48px |
| H1 hero | 28px | 36px | 48px |
| H2 subtitulo | 16px | 22px | 28px |
| Catalogo padding | 40px 20px | 48px 32px | 64px 48px |
| H3 "Escoge el diseno..." | 22px | 28px | 36px |
| FAQ padding | 48px 20px | 64px 32px | 80px 48px |
| FAQ H2 | 22px | 28px | 36px |
| Comunidad padding | 48px 20px | 64px 32px | 80px 48px |
| Comunidad H2 | 22px | 28px | 36px |
| Blog padding | 48px 20px | 64px 32px | 80px 48px |
| Blog H2 | 22px | 28px | 36px |
| Blog grid | 1fr | repeat(2,1fr) | repeat(3,1fr) |
| Blog gap | 20px | — | 28px |

> Masonry grid de comunidad ya tenia `@media` CSS para responsive (clase `.masonry-comunidad`).

---

### 7. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/LibroDetalleClient.tsx`

Ya tenia responsive completo via `isMobile`. Solo se aplicaron fixes tipograficos:

- Label eyebrow: `12px w600` → `12px w500` (Caption)
- H1 desktop: `38px w900` → `36px w700` (H2)
- H1 mobile: `26px` → `28px w600` (H3)
- H3 descripcion corta: `22px w800` → `24px w600` (H4)
- Bullets body: `15px` → `16px w400` (Body)
- Caracteristicas label: `14px w600 uppercase` → `12px w500 uppercase` (Caption)
- Caracteristicas items: `14px w400` → `14px w500` (Small)
- Precio box texto: `14px w400` → `14px w500` (Small)
- FAQ H2: `32px w800` → `36px w700` (H2)
- FAQ question: `17px w600` → `18px w500` (Body Large)
- FAQ answer: `15px` → `16px w400` (Body)
- CTA button: `16px w800` → `16px w700` (Body)
- Padding de seccion: `72px` → `80px`

---

### 8. `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/WizardSection.tsx`

Ya tenia responsive completo via `isMobile`. Solo se aplicaron fixes tipograficos:

- H2 "CREA TU LIBRO" desktop: `32px w800` → `36px w700` (H2)
- H2 "CREA TU LIBRO" mobile: `24px w800` → `24px w600` (H4)
- Step title H3: `22px w700` → `24px w600` (H4)
- Step instrucciones P: `14px` → `14px w500` (Small)
- Form labels: `13px w600` → `14px w500` (Small)
- Padding de seccion: `72px` → `80px`

---

## Pendientes / Proximos pasos

- Verificar visualmente en el navegador (mobile, tablet, desktop)
- `Sidebar.tsx` no esta en uso — evaluar si se va a integrar o eliminar
- Pagina `/nuestros-libros` (que usa NuestrosLibrosClient) puede tener su propio layout que afecte el sidebar
