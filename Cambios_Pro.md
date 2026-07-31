# Cambios_Pro.md — Rediseño Editorial del Home

**Fecha:** 2026-07-09
**Objetivo:** Transformar el home de PixelArt hacia la identidad de marca definida en `PRODUCT.md`: **premium, editorial, elegante**. El objeto físico (el libro) como protagonista.
**Baseline:** Critique formal inicial 23/40 (snapshot en `frontend/web/src/.impeccable/critique/`).

---

## 1. Sistema de Diseño Global

### 1.1 Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| **Display** | `Libre Caslon Text` (400, 400 itálica, 700) | Todos los H1/H2/H3 de sección, títulos de pasos, títulos de tapas, números de métricas, palabras de fondo |
| **Body / UI** | `Montserrat` (400–900) | Párrafos, botones, pills, labels, cards |

- Definidas en `lib/design-tokens.ts` → `tokens.fonts.display` y `tokens.fonts.body`.
- Cargadas en `app/layout.tsx` (Google Fonts).
- **Por qué Caslon:** es la tipografía clásica de los libros impresos — la voz del producto físico que se vende.
- **Regla de la itálica:** Libre Caslon solo tiene itálica en peso 400. Las itálicas display van SIEMPRE en 400 (nunca forzar 700 — el navegador la engorda artificialmente).
- Sentence case en todos los títulos. **Prohibido** el `text-transform: uppercase` en headings (solo permitido en kickers pequeños).
- Escala display: `clamp()` fluido. H2 de sección: `clamp(30-36px, 3.5-4vw, 44-64px)`.

### 1.2 Regla de Color (LA regla del proyecto)

> **El color va en los acentos, JAMÁS en los fondos de sección.**
> La exclusividad editorial la dan el blanco, la serif y el aire.

| Token | Valor | Uso |
|---|---|---|
| Fondo base | `#ffffff` | Secciones principales |
| Fondo alternado | `#f8f9fa` (`surface.subtle`) | Bandas de ritmo (perla) |
| Tinta | `#111` | Títulos, CTAs neutros, pills activos |
| Texto secundario | `#444` | Párrafos |
| Acento libros personalizados | `#B72020` | Kickers, CTAs, dots de la zona custom books |
| Acento photobooks | `#2d8fd5` | Kickers, CTAs, checks de la zona photobooks |
| Acentos de categoría (solo funcionales) | love `#B72020` · pets `#f5a623` · family `#88C343` · memories `#8b6bb1` · photobooks `#2d8fd5` | Barrita 3px de BookCard, dots de filtros, subtítulos de card |

**Ritmo de fondos del home:** blanco (hero) → blanco (libros) → perla (crea tu libro) → blanco (photobooks) → perla (calidad) → blanco (por qué elegir) → perla (testimonios) → **oscuro (footer — único bloque oscuro de la página, cierre con contraste)**.

### 1.3 Gramática de Sección (se repite en TODA la página)

1. **Kicker:** barrita de 28×2px + palabra en 14px/700, tracking `0.14em`, uppercase, en el color de acento de la sección.
2. **Título:** serif Caslon, tinta, sentence case. Acentos internos en *itálica 400* (ej.: "Crea tu libro *muy fácil*", "Por qué elegir *PixelArt*").
3. **SectionDivider:** el separador editorial (dos hairlines de 1px que se encuentran en un punto de 5px) — marca cada "cambio de capítulo". Componente local en `page.tsx`.
4. **Palabra editorial de fondo:** la firma de la casa — palabra en Caslon itálica gigante (`clamp(90-110px, 14-17vw, 200-240px)`) al **4% de tinta** (`rgba(17,17,17,0.04)`), detrás del contenido. Usada en: hero (categoría del libro), photobooks ("Viajes"), testimonios ("Gracias").
5. **CTAs:** pill (`border-radius: 9999px`), altura 52-54px, color de acento pleno (nunca gradiente), sombra neutra `0 6px 20px rgba(0,0,0,0.16)`, hover `translateY(-3px)` + sombra mayor. Junto al CTA principal: el precio ("Desde S/ XX.00").

### 1.4 Prohibiciones (los AI-tells eliminados)

- ❌ Glassmorphism decorativo (`backdrop-filter`)
- ❌ Gradient text (`background-clip: text`)
- ❌ Gradientes decorativos en fondos y botones
- ❌ Noise textures (feTurbulence)
- ❌ Logo multicolor como pieza tipográfica (solo navbar, tamaño chico)
- ❌ Chips/pills de features en masa
- ❌ Sombras tintadas de color
- ❌ Animación de `background-position`, `width`, `left` (solo `transform`/`opacity`)
- ❌ Blur ANIMADO (blur estático en capa separada + crossfade de opacidad = OK)
- ❌ Fondos de color en secciones
- ❌ Eyebrows uppercase tracked sobre cada sección (el kicker con barrita es el único patrón permitido)

---

## 2. Cambios por Sección

### 2.1 Hero — `HeroBookCarousel.tsx` (componente NUEVO)

Adaptación en React del carousel coverflow del mockup propio (`/Mockups`), corregido y optimizado.

**Contenido:** 4 libros destacados alternando producto: 10 Razones (amor) → Photobook Iquitos → Ángel de 4 Patas (mascotas) → Photobook Machu Picchu. Data en `page.tsx` (`heroBooks`).

**Composición:** kicker de categoría + título del libro en serif `clamp(34-62px)` + descripción + CTA "Personalizar" (color del producto) + precio + microlínea de confianza ("Tapa dura premium · Envío a todo el Perú · ★ 4.8 de +1,500 clientes"). Imagen del libro a la derecha. Palabra de la categoría gigante de fondo. Blob radial del acento (opacity 0.13) — cambia con cada libro.

**Efecto coverflow:**
- 4 posiciones: `pos1` saliente (translate -62%, scale 1.32, opacity 0) · `pos2` centro (nítido) · `pos3` (translate 52%/9%, scale 0.64) · `pos4` (translate 88%/18%, scale 0.4, opacity 0.75).
- Rotación por estado `order[]` (equivalente React del DOM-reorder del mockup). El item que "envuelve" salta sin transición (clase `no-anim`).
- Transiciones: SOLO `transform` + `opacity`, 750ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Blur de profundidad de campo SIN costo:** cada imagen tiene capa nítida + capa con `blur(22px)` ESTÁTICO; lo que se anima es la opacidad de la capa (pos3: 0.8, pos4: 0.95). El blur nunca se recalcula.
- **Normalización por ALTURA:** `hc-imgwrap` fija altura `clamp(280px, 46vh, 440px)`; cada libro respira en ancho según su proporción (resuelve la mezcla de assets apaisados y verticales).
- Reveal escalonado del contenido del centro (kicker → título → descripción → CTAs → trust) con keyframe `hcShow` (translateY + opacity).

**Interacción:** flechas SVG circulares + contador editorial "01 — 04" en Caslon itálica (grupo abajo-izquierda) · miniaturas clicables de los 4 libros (abajo-derecha, activo con subrayado; ocultas en <1024px) · swipe táctil (threshold 60px) · teclado (← →) · autoplay cada 6s con pausa on-hover · `prefers-reduced-motion` respetado en todo.

**Bugs del mockup corregidos:** selector CSS sin coma (items no se ocultaban), `class="tittle"` vs `.title`, `transition: right` sobre cambios de `left`, lockout de 2000ms → 750ms exactos.

### 2.2 Nuestros Libros — `NuestrosLibrosSection.tsx` + `BookCard.tsx`

- Fondo crema + noise texture → **blanco limpio**.
- Título "Nuestros libros" en **Caslon itálica 400** (64px desktop), sin gradient text.
- Subtítulo a peso 400.
- **Filtros:** iconos lucide → **punto de color de categoría (7px)** + **contador de libros** ("● Amor 5"). Activo: fondo tinta, texto blanco. Sin gradientes ni sombras tintadas.
- **Línea de resultados:** "Mostrando X de Y libros" (caption, `aria-live`).
- **Ver más (N):** el botón muestra cuántos libros faltan.
- **BookCard:** sombras neutras (`CARD_SHADOW`/`CARD_SHADOW_HOVER`), zona superior en `surface.subtle`, barrita superior de 3px en color de categoría plano (único acento), CTA "Personalizar" en tinta `#111`, drop-shadows de imagen neutros. Efecto 3D tilt + sheen conservados.
- Eliminados: `SearchInput.tsx`, `CategoryTabs.tsx` (código muerto). Decisión: **no hay búsqueda en el home** (24 libros con filtros bastan).

### 2.3 Crea tu libro muy fácil — `CreateBookAccordion.tsx`

- Fondo `surface.subtle` (perla). Abre con SectionDivider.
- Eyebrow "PASO A PASO" eliminado. Título: "Crea tu libro *muy fácil*" (itálica en acento rojo).
- **Títulos de pasos en Caslon 700 sentence case** (stepper desktop, tabs mobile, header del panel).
- Colores hardcodeados → tokens. **Fix WCAG:** descripciones inactivas `#aaa` (2.3:1, ilegible) → `#666` (5.7:1 ✓).
- Conector del timeline y header del panel: gradientes → planos. Sombra del círculo activo: roja tintada → neutra.
- Bullets: cajita roja rellena con check blanco → **check fino stroke rojo, sin caja**.
- Panel derecho: `position: sticky` eliminado (perseguía el scroll). Carousel interno centrado (`margin: auto`).
- **CTA final agregado** (no existía): pill rojo "Crear mi libro" → `/libros-personalizados` + microcopy "Sin registro · Recibe tu demo gratis antes de pagar".

### 2.4 Photobooks — sección inline en `page.tsx`

- **Eliminados:** foto de fondo (atardecer difuminado — peleaba cálido vs. frío con los overlays), los 2 overlays azules (uno era huérfano de un stepper inexistente), `textShadow`, CSS muerto del stepper.
- **Ahora:** blanco editorial con el lenguaje del hero — SectionDivider, blob radial azul (opacity 0.10), palabra "*Viajes*" de fondo, kicker "PHOTOBOOKS" azul, título serif en tinta ("Tus viajes merecen un Photobook"), CTA **azul pleno** con texto blanco + "Desde S/ 90.00" en tinta.
- La imagen de producto (photobook abierto + libro parado) quedó protagonista sobre blanco con drop-shadow del sistema.
- Nota histórica: se probó una banda navy `#0d2d4d` y fue **rechazada** — origen de la regla "color solo en acentos".

### 2.5 Calidad en cada página — `BookQualitySection.tsx` (REESCRITA, 578→~290 líneas)

- **Eliminados:** canvas de 30 partículas arcoíris a 60fps (CPU permanente), **cubo 3D giratorio** (rotaba cada 2.6s — las tapas no se podían ver; en mobile ni se mostraba), fondo degradado navy/púrpura, cover cards glass, reseñas fake ("5.0 — 89 reseñas").
- **Ahora:** fondo perla, kicker "NUESTROS FORMATOS" azul (doble barrita), título serif, y **dos cards de comparación estáticas** (máx 920px): imagen de tapa GRANDE y quieta (280px desktop / 220px mobile — visible en mobile por primera vez), nombre en Caslon 26px, badge "La más elegida" (Tapa Gruesa), descripción, 4 specs con checks azules, precio anclado con hairline.
- Precios: Tapa Delgada desde S/ 90.00 · Tapa Gruesa desde S/ 120.00.
- Hover: lift + sombra. Cierre: enlace subrayado "Crear mi Photobook →".

### 2.6 Por qué elegir — `WhyChooseSection.tsx` + `FeatureCard.tsx`

- Titular partido en 3 piezas (texto + **logo arcoíris PNG de 280px** + barra negra de 4px) → **una sola pieza serif:** "Por qué elegir *PixelArt*". El logo multicolor vive solo en el navbar.
- Kicker "NUESTRA PROMESA" con barrita roja.
- **FeatureCard re-escalado:** títulos 24px/600 → **19px/700**, descripciones 16 → 15px, caja de icono 56 → 48px (jerarquía por saltos claros: H2 → título de ítem → cuerpo).
- Iconos unificados a tinta (antes alternaban rojo/azul sin razón).
- Imagen: radius 24→16, sombra xl→lg. Padding sección 96→80px.

### 2.7 Testimonios — `TestimonialsSection.tsx` (componente NUEVO, extraído de page.tsx)

- **Problema resuelto:** fondo oscuro `#0f172a` que se fundía con el footer oscuro → **fondo perla**. El footer es ahora el ÚNICO bloque oscuro (cierre con contraste real).
- Palabra "*Gracias*" de fondo. Kicker "TESTIMONIOS" rojo (doble barrita). Título serif en tinta.
- Cards blancas con borde + sombra + hover lift.
- **Efecto — reveal escalonado al scroll:** las cards entran con fade-up una tras otra (framer-motion `whileInView`, `once: true`, delay `idx*0.12`, `useReducedMotion` respetado). Es el único scroll-reveal de la página, reservado para el cierre.
- **Métricas en serif:** 4.8 / +1,500 / +2,400 en **Caslon 40px/700** con labels caption — autoridad de cierre.

---

## 3. Orden Narrativo de Secciones (reordenado)

Antes el contenido de cada producto estaba intercalado. Ahora la página cuenta una historia por producto:

1. **Hero** (carousel de libros destacados — ambos productos)
2. **Nuestros libros** (catálogo con filtros)
3. **Crea tu libro muy fácil** (cómo funciona — libros personalizados)
4. **Photobooks** (hero del segundo producto)
5. **Calidad en cada página** (tapas — photobooks)
6. **Por qué elegir PixelArt** (confianza)
7. **Testimonios** (prueba social — cierre)
8. Footer (único bloque oscuro)

---

## 4. Archivos

### Modificados
- `frontend/web/src/app/(public)/page.tsx` — reorden, SectionDivider, heroBooks, photobooks inline, limpieza de CSS muerto
- `frontend/web/src/app/layout.tsx` — carga de Libre Caslon Text
- `frontend/web/src/lib/design-tokens.ts` — `tokens.fonts` (display/body)
- `frontend/web/src/components/Home/NuestrosLibrosSection.tsx`
- `frontend/web/src/components/Home/BookCard.tsx`
- `frontend/web/src/components/Home/CreateBookAccordion.tsx`
- `frontend/web/src/components/Home/RegisterInformationCarousel.tsx`
- `frontend/web/src/components/Home/WhyChooseSection.tsx`
- `frontend/web/src/components/Home/FeatureCard.tsx`

### Nuevos
- `frontend/web/src/components/Home/HeroBookCarousel.tsx`
- `frontend/web/src/components/Home/TestimonialsSection.tsx`
- `PRODUCT.md` (contexto estratégico de diseño)
- `frontend/web/src/components/Home/BookQualitySection.tsx` (reescrito de cero)

### Eliminados
- `frontend/web/src/components/Home/SearchInput.tsx`
- `frontend/web/src/components/Home/CategoryTabs.tsx`

### Huérfanos (pendientes de borrar en la pasada de polish)
- `frontend/web/src/components/Home/HomeHeroClient.tsx` (hero viejo, fallback temporal)
- `frontend/web/src/components/Home/TrustBadge.tsx`
- `frontend/web/src/components/Home/ParticleCanvas.tsx`

---

## 5. Pendientes

1. **Commitear todo** (rediseño + fix de migraciones del deploy) — el rediseño de junio se perdió por no commitear.
2. **Re-critique** para medir contra el baseline 23/40.
3. **Producción de assets del hero:** re-exportar los libros en el estilo del Photobook Machu Picchu (libro parado, lomo visible, 3/4, PNG transparente, ~1600px lado largo). Urgente: "10 Razones" (su miniatura actual es de 392px y se pixela).
4. Borrar componentes huérfanos.
5. Revisar el footer bajo el nuevo sistema (es el cierre oscuro de la página).
6. Assets sin uso en MinIO: `Section_Photobooks_Background.png`.
