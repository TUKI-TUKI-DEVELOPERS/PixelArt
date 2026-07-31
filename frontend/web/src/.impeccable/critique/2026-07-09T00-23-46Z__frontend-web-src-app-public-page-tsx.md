---
target: home page
total_score: 23
p0_count: 2
p1_count: 2
timestamp: 2026-07-09T00-23-46Z
slug: frontend-web-src-app-public-page-tsx
---
# Critique — Home PixelArt (frontend/web/src/app/(public)/page.tsx)

## Design Health Score

| # | Heurística | Score | Issue clave |
|---|-----------|-------|-----------|
| 1 | Visibilidad de estado | 3 | Carousel con dots + loader de transición; sólido |
| 2 | Sistema ↔ mundo real | 3 | Español natural, categorías claras |
| 3 | Control y libertad | 3 | Filtros, Ver más/menos, navegación por teclado en hero |
| 4 | Consistencia y estándares | 1 | Cada sección tiene su propio lenguaje: eyebrow pill vs barra roja vs nada; CTA con 3 estilos distintos; uppercase intermitente |
| 5 | Prevención de errores | 3 | Superficie de marketing, poco que prevenir |
| 6 | Reconocimiento vs recuerdo | 3 | Filtros con icono+label, navegación visible |
| 7 | Flexibilidad y eficiencia | 2 | Teclado en carousel; sin más aceleradores |
| 8 | Estética y minimalismo | 1 | Identity Section + glassmorphism + 6 chips + 5 gradientes de categoría + fondo animado: todo compite |
| 9 | Recuperación de errores | 2 | Sin estados de fallo de imágenes visibles |
| 10 | Ayuda y documentación | 2 | Sin ayuda contextual (aceptable en landing) |
| **Total** | | **23/40** | **Acceptable — mejoras significativas necesarias** |

## Anti-Patterns Verdict: FALLA el slop test

El home actual dispara casi todos los tells de "hecho por IA" que la skill lista como bans absolutos:

1. **Logo multicolor letra-por-letra** (page.tsx:594-601) — firma visual de IA #1, ya identificada en junio 2026 y nunca eliminada del repo (el rediseño de esa sesión se perdió sin commitear).
2. **Glassmorphism decorativo** — 8 usos: Identity card (blur 12px), testimonial cards, chips del hero photobooks, TrustBadge, BookQualitySection.
3. **Gradient text** — NuestrosLibrosSection (2 usos de background-clip: text).
4. **Eyebrow pills con emoji** — "✦ EL FAVORITO DE LOS VIAJEROS" (page.tsx:751).
5. **Fondo animado por background-position** (clientsBgShift, page.tsx:926-939) — repaint por frame, sin prefers-reduced-motion. Ya diagnosticado como performance killer y sigue ahí.
6. **27 gradientes decorativos** en 6 archivos; 5 gradientes de categoría (rojo/naranja/verde/violeta/azul) + shadows tintadas por color.
7. **Wall of options**: 24 libros de peso idéntico en la grilla (límite de memoria de trabajo: 4).
8. **Métricas inconsistentes**: "+2,400 photobooks entregados" (hero photobooks) vs "+1500 clientes / +2400 libros" (testimonios).

Detector CLI: no disponible (instalación incompleta — falta lib/impeccable-config.mjs). Fallback: scan manual con rg, hallazgos arriba.

## Priority Issues

- **[P0] La página contradice la identidad elegida (premium/editorial/elegante)**: logo arcoíris, 5 colores de categoría en gradiente, Montserrat 900 uppercase en todos los títulos = flyer de imprenta, no editorial premium. Fix: sistema neutral + 1 acento de marca; color de categoría solo como acento funcional mínimo; matar Identity Section. → quieter + colorize
- **[P0] La calidad física del producto no se siente**: el libro (objeto) nunca aparece grande y táctil; BookQualitySection está enterrada en posición 6 de 8; el hero es un carousel dividido entre 2 productos. Fix: hero liderado por fotografía real del libro físico; calidad al frente. → shape/bolder
- **[P1] Sin jerarquía editorial**: 8 secciones con la misma cadencia (eyebrow + título centrado + separador), todas gritando en weight 900. 24 cards idénticas. Fix: curaduría (6-8 destacados), ritmo variado, una sección = una idea. → layout + distill
- **[P1] Tipografía sin voz**: Montserrat (geometric sans genérica) en weights 400-900 como única familia, uppercase + letterSpacing negativos. Fix: sistema editorial con contraste real de display vs body, elegido por procedimiento de brand.md. → typeset
- **[P2] Motion amateur y costoso**: clientsBgShift (repaint/frame), ParticleCanvas, IntroOverlay, cero prefers-reduced-motion. → optimize + animate

## Persona Red Flags

**Jordan (primera vez)**: el hero carousel alterna entre 2 productos con 2 sistemas de color — no entiende qué vende PixelArt en los primeros 5 segundos. La distinción libro personalizado vs photobook nunca se explica de frente.

**Casey (móvil, distraída)**: fondo animado infinito + canvas de partículas + 24 cards con framer-motion = batería y frames en Android de gama media (el dispositivo dominante del mercado). Hero min-height 720px empuja todo el contenido bajo el fold.

**Riley (stress tester)**: métricas que no cuadran entre secciones (+2400 photobooks vs +1500 clientes totales); testimonios con nombres completos formales y voz de marketing (huelen a fake → daño de confianza); rating 4.8 con 5 estrellas pintadas llenas.

## Minor Observations

- El manifiesto en itálica con comillas decorativas es filler — no aporta info ni emoción real.
- Badge "NEW" en productos que no son nuevos erosiona confianza.
- Separadores dorados (#D9AF62) aparecen solo en Identity Section — color huérfano del sistema.
- page.tsx de 1149 líneas con data hardcodeada de 24 libros — mantenibilidad.

## Questions to Consider

- ¿Qué pasaría si el hero fuera UNA foto espectacular del libro físico abierto, y los dos productos se presentaran después?
- ¿Un visitante puede decir en 5 segundos por qué esto cuesta S/ 130 y vale la pena?
- ¿Qué se puede BORRAR sin que la conversión baje? (hipótesis: Identity Section entera, chips, badges, partículas)
