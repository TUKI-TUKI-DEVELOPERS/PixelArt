# PixelArt Interface Design System

## Direction & Feel

**Design Philosophy:** "Collage Vibrante" — Colorful, warm, artisanal

**Core Intent:**
- **Who:** Usuarios peruanos buscando regalos personalizados y emotivos (parejas, familias, dueños de mascotas)
- **Task:** Explorar categorías, personalizar libros, comprar con confianza
- **Feel:** Cálido, artesanal, alegre pero profesional — como una boutique de papelería fina, no un e-commerce genérico

**Product Domain:**
- Páginas encuadernadas y artesanía manual
- Paleta de artista con colores vibrantes
- Álbumes de recuerdos y memorias personales
- Taller de encuadernación con atención al detalle

## Color Palette

### PIXELART Brand Colors
Cada letra del logo tiene su color único, inspirado en marcadores de colores sobre una mesa de trabajo creativa:

```css
P_RED: #B72028        /* Rojo - Pasión, amor */
I_ORANGE: #EA6F29     /* Naranja - Energía, creatividad */
X_YELLOW: #F0B02A     /* Amarillo - Alegría, optimismo */
E_GREEN: #88C343      /* Verde lima - Crecimiento, familia */
L_PURPLE: #804187     /* Púrpura - Lujo, imaginación */
A_BLUE: #2B86BF       /* Azul - Confianza, tranquilidad */
R_PINK: #DF1F74       /* Rosa magenta - Afecto, dulzura */
T_TURQUOISE: #44B9B1  /* Turquesa - Frescura, creatividad */
```

### Base Colors (Papel & Tinta)
Tonos cálidos inspirados en materiales artesanales:

```css
paperCream: rgba(250, 248, 243, 0.92)  /* Fondo papel crema cálido */
paperCreamSolid: #FAF8F3               /* Versión sólida */
inkSepia: #8B7355                      /* Color tinta sepia para texto */
inkSepiaLight: rgba(139, 115, 85, 0.6) /* Borders sutiles */
```

**Temperatura:** Cálida — NO usar blanco puro (#FFFFFF) ni grises fríos.

### Color Usage by Context

**Navigation Links:**
- Home → Rojo #B72028
- Libros Personalizados → Naranja #EA6F29
- PhotoBooks → Púrpura #804187
- Nuestros Libros → Verde #88C343

**Dropdown Categories:**
- Libros de Amor → Rosa #DF1F74
- Libros de Mascotas → Naranja #EA6F29
- Libros de Familia → Verde #88C343
- Libros de Memorias → Azul #2B86BF

**Interactive Icons:**
- Usuario → Azul #2B86BF
- Carrito → Rosa #DF1F74

## Typography

**Font Family:** Montserrat (Google Fonts)
- Weights available: 400, 500, 600, 700, 800, 900
- Loaded via Next.js font optimization

**Text Hierarchy:**
- Headlines: 600-800 weight
- Body: 400-500 weight
- Labels/UI: 500-600 weight
- Logo: 800 weight (ExtraBold)

**Key Principle:** Font weight + color convey hierarchy, not just size.

## Depth Strategy

**Approach:** Borders + Subtle Layering

- **NO harsh drop shadows**
- **NO pure white cards on colored backgrounds**
- Use subtle border progression: `rgba(0, 0, 0, 0.06)` to `0.12`
- Glassmorphism with backdrop-filter for navbar
- Paper cream background provides warmth

**Surface Elevation:**
```css
Base: rgba(250, 248, 243, 0.92)
Elevated: backdrop-filter: blur(12px) saturate(1.2)
Dropdown: box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)
```

## Spacing System

**Base Unit:** 4px (implicit via 8px increments)

**Scale:**
```css
micro: 4px, 8px          /* Icon gaps, tight spacing */
component: 12px, 16px    /* Within buttons, cards */
section: 24px, 32px      /* Between groups */
major: 48px, 64px        /* Between distinct areas */
```

**Responsive Padding:**
```css
Mobile: 16px
Tablet: 32px
Desktop: 48px
```

## Breakpoints

```typescript
mobile: < 768px
tablet: 768px - 1023px
desktop: ≥ 1024px
```

**Max Container Width:** 1600px

## Animations

**Easing Functions:**
```css
smooth: cubic-bezier(0.4, 0, 0.2, 1)
spring: cubic-bezier(0.45, 0, 0.55, 1)
```

**Durations:**
```css
fast: 150ms     /* Micro-interactions */
normal: 300ms   /* Standard transitions */
slow: 500ms     /* Larger movements */
logoPulse: 6s   /* Logo color pulse con brightness/scale */
gradientMove: 20s /* Barra superior gradient */
```

**Key Animations:**
1. **Logo Color Pulse:** Cada letra hace brightness(1.3) + scale(1.05) en ciclo de 6s con stagger de 0.75s entre letras - muy notoria y atractiva
2. **Gradient Bar:** Gradiente multicolor se mueve horizontalmente (20s loop)
3. **Link Hover:** Background color expansion con el color de categoría (300ms)
4. **Mobile Drawer:** Slide-in desde left con spring physics

## Component Patterns

### Navbar

**Structure:**
1. Barra multicolor superior (12px desktop, 8px mobile)
2. Navbar principal con glassmorphism
3. Logo PIXELART multicolor animado
4. Links con border-left + color mapping
5. Dropdown con colores por categoría
6. Iconos usuario/carrito con color coding

**Mobile Behavior:**
- Hamburger menu (3 líneas → X animation)
- Slide-in drawer desde left (300px width)
- Iconos usuario/carrito siempre visibles (20px)

**Desktop Layout:**
```
[Gradient Bar 12px]
─────────────────────────────────────────
[Logo] [🏠Home│] [📖Libros│] [📷Photos│] [📚Nuestros│]  👤│🛒
       └─color     └─color     └─color      └─color
       └─icon      └─icon      └─icon       └─icon
```

**Signature Elements:**
1. **Navigation Icons:** Cada link tiene su icono contextual (home, book, camera, library) en el color correspondiente
2. **Border-left indicator:** Cada link tiene borde izquierdo de su color
3. **Hover expansion:** Background del color al 10% opacity + icono cambia a color
4. **Active state:** Background al 15% opacity + color text + icono en color
5. **Dropdown dots:** Cada item tiene círculo de su color categorial

**Icon Mapping:**
- Home → home icon (house)
- Libros Personalizados → book icon (open book)
- PhotoBooks → camera icon
- Nuestros Libros → library icon (book collection)

### Button States

**Pattern:**
```css
default: transparent
hover: rgba([color], 0.1)
active: rgba([color], 0.15)
focus: rgba([color], 0.2) + outline
```

**Transition:** `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Maternal Sky Background

**Componente:** `MaternalSkyBackground.tsx`  
**Uso:** Landing pages de productos emocionales (ej: "Mamá, mi heroína")

**Concepto:**
Background celestial tipo "heavenly clouds" con centro luminoso y respirable, nubes volumétricas difuminadas que enmarcan desde los bordes. Evoca un cielo maternal cálido y envolvente, como mirar hacia arriba en un momento de gratitud.

**Signature Element:**
"Resplandor del Centro Sagrado" — Centro amplio y luminoso (negativo space) que actúa como portal celestial donde vive el contenido. Las nubes enmarcan desde bordes creando efecto de ventana al cielo maternal. No es ausencia, es presencia pura.

**Paleta Maternal:**
```css
--heaven-center: #FFFBF8      /* Blanco cálido central */
--heaven-glow: #FFF5EB        /* Crema marfil resplandor */
--cloud-soft: #FFE8DC         /* Melocotón muy suave */
--cloud-shadow: #F8F3E8       /* Champagne sombra sutil */
--rose-whisper: #FFEEF0       /* Rosa apenas perceptible */
--gold-dust: rgba(248, 243, 232, 0.3)  /* Dorado translúcido */
```

**Técnica:**
- 7 layers de gradientes radiales
- SVG noise con feTurbulence para textura orgánica (opacity 0.15)
- Blur filters (60-80px) para suavidad
- Mix-blend-modes (overlay, soft-light) para integración
- Optional animations (cloud drift 40-50s, gold shimmer 6s)

**Estructura de Capas:**
```
Layer 1: Base gradient cálido (lineal 180deg)
Layer 2: Resplandor central desde arriba (radial ellipse 60%×40%)
Layer 3: Nubes top - suaves y cremosas (3 radiales superpuestos)
Layer 4: Nubes laterales - abrazo envolvente (2 radiales L+R)
Layer 5: Nubes bottom - base suave (3 radiales bottom)
Layer 6: Rosa whisper - toque romántico sutil
Layer 7: Gold dust sparkle - champagne premium
```

**Props:**
```typescript
<MaternalSkyBackground 
  animated={true}    // Nubes con drift sutil
  className=""       // Clase adicional opcional
/>
```

**Uso:**
```tsx
// Condicional en LibroDetalleClient
const isMamaHeroina = libroSlug === "mama-mi-heroina";

{isMamaHeroina ? (
  <MaternalSkyBackground animated />
) : (
  // Background gradiente default
)}
```

**Responsive:**
- Mobile: Reduce opacity de nubes laterales (0.7)
- Mantiene todas las capas activas
- Textura SVG escala proporcionalmente

**Performance:**
- GPU-accelerated (transform, opacity, filter)
- SVG noise ligero (<1KB inline)
- Animations opcionales con prop
- No requiere imágenes externas

### Form Controls

Not yet defined — create custom styled inputs when needed.

**Principle:** Native selects/dates don't work — build custom components.

## Border Radius

**Scale:**
```css
small: 4px      /* Inputs, tight elements */
medium: 8-10px  /* Buttons, icons */
large: 16px     /* Cards, dropdowns */
```

**Principle:** Moderately soft — not sharp (technical) nor too round (playful).

## Iconography

**Icon Set:** Custom SVG (inline in components)
**Size Standard:** 
- Desktop: 22px
- Mobile: 20px

**Usage:** Icons clarify, not decorate. Every icon has meaning.

## Dark Mode

Not yet implemented.

**Considerations for future:**
- Shadows less visible — lean on borders
- Semantic colors need desaturation
- Invert surface hierarchy (darker = higher)

## Accessibility

**Requirements:**
- All interactive elements have `aria-label`
- Keyboard navigation supported
- Focus states visible
- Color contrast meets WCAG AA minimum
- Mobile drawer closes with ESC key
- Drawer includes focus trap (via AnimatePresence)

## File Structure

```
/lib/colors.ts              # Color tokens & design system
/components/layout/
  PixelArtLogo.tsx          # Logo SVG multicolor animado
  HamburgerIcon.tsx         # Hamburger → X animation
  MobileDrawer.tsx          # Slide-in drawer con Framer Motion
  NavbarClient.tsx          # Navbar principal
  Navbar.tsx                # Server component wrapper
/app/globals.css            # Global animations (gradientMove)
```

## Implementation Notes

### hexToRgba Helper
```typescript
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
```

Used for dynamic hover/active states with opacity.

### Performance Optimizations
- Animations use `transform` and `opacity` (GPU-accelerated)
- Framer Motion tree-shaked (only import needed components)
- SVG logo is inline (no extra HTTP request)
- Backdrop-filter has fallback for older browsers (solid background)

## What NOT to Do

❌ Use pure white (#FFFFFF) — always use paperCream
❌ Use cold grays (#6B7280, etc.) — use inkSepia tones
❌ Heavy drop shadows — keep shadows subtle or use borders
❌ Random color usage — every color maps to a category/function
❌ Multiple accent colors without system — stick to PIXELART palette
❌ Generic hover states (#f3f4f6) — use color-coded hovers

## Future Extensions

When building new components, follow these principles:

1. **Color Mapping:** Assign PIXELART colors meaningfully (not decoratively)
2. **Warmth First:** Choose warm tones over cold
3. **Border + Layer:** Prefer borders over shadows for depth
4. **Animation Purpose:** Animations delight, not distract (moderate speed)
5. **Responsive:** Design mobile-first, enhance for desktop
6. **Artisanal Feel:** Evoke "handcrafted" not "mass-produced"

## Questions for New Features

Before designing new UI:

1. **Who uses this?** (Parent buying for child vs. couple creating love book)
2. **What color from palette makes sense?** (Don't add new colors)
3. **How does this feel artisanal?** (Texture, warmth, humanity)
4. **Does this work on mobile?** (Design mobile-first)
5. **Is this delightful without being noisy?** (Subtlety > flash)

---

## Changelog

### v1.2 - 2026-03-17 (Maternal Sky Background)
- ✅ **Realistic Cloud Background:** Background fotorrealista de nubes celestiales usando SVG filters avanzados
- ✅ **SVG Filters:** feTurbulence + feDisplacementMap + feDiffuseLighting para nubes 3D volumétricas
- ✅ **6-Layer Cloud System:** Nubes top, bottom, laterales y volumétricas centrales con profundidad real
- ✅ **Heavenly Light:** Radial gradient desde centro superior simulando luz divina
- ✅ **Maternal Palette:** Colores cálidos (crema, marfil, melocotón, rosa pastel, champagne)
- ✅ **Photorealistic:** Nubes esponjosas con textura, iluminación y sombras realistas

### v1.1 - 2026-03-17 (Improvements)
- ✅ **Navigation Icons Added:** Cada link ahora tiene su icono contextual (home, book, camera, library)
- ✅ **Logo Animation Enhanced:** Cambio de subtle opacity pulse a brightness(1.3) + scale(1.05) - mucho más notorio y atractivo
- ✅ **Animation Speed Adjusted:** 8s → 6s con stagger de 0.75s entre letras
- ✅ **Mobile Drawer Icons:** Iconos también incluidos en el drawer mobile

### v1.0 - 2026-03-17 (Initial Release)
- ✅ Core system established
- ✅ Navbar (Desktop + Mobile)
- ✅ Logo multicolor animado
- ✅ Barra gradient superior
- ✅ Color system completo

---

**Last Updated:** 2026-03-17  
**Components Documented:** Navbar (Desktop + Mobile), Maternal Sky Background  
**Status:** v1.2 — Celestial backgrounds for emotional products
