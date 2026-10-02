# Automatización de tapa/contratapa/lomo — Photobooks

Estado del trabajo, decisiones cerradas y lo que falta para automatizar la
tapa/contratapa/lomo de los 18 temas de photobooks (año dinámico + diseño
real de lomo). Reemplaza el enfoque de PNG estático por tema con el año
pintado a mano.

## Problema original

- `photobook_themes.cover_template_key` / `back_cover_key`: imágenes PNG
  estáticas por tema, con el año pintado como píxeles (ej. "FRANCIA 2026").
  En 2027 seguiría diciendo 2026 si no se regenera a mano.
- `cover_title` (columna/DTO/campo admin): **campo muerto**, no es el
  problema real — 0 de 78 proyectos lo usan, no tiene input en el editor
  cliente, el PDF nunca lo lee. No confundir con este trabajo.

## Decisiones cerradas

### Arquitectura: panorámica única + corte dinámico por código

- Tapa y contratapa **no son 2 imágenes independientes** — es **1 sola
  fotografía panorámica continua** generada por IA (contratapa izquierda,
  franja central segura, tapa derecha), para que la luz/color/estilo sean
  consistentes por construcción (dos generaciones independientes no
  garantizan continuidad).
- Layout en porcentajes exactos del ancho total: **44% contratapa / 12%
  franja central (lomo) / 44% tapa**. La franja central debe quedar sin
  gente, sin arquitectura icónica, sin detalle crítico — tolerante a
  recortarse en ancho variable después (reusa la terminología ya existente
  en el repo: "franja central", ver `prompt-shared-blocks.sql`).
- El **lomo NO lo genera la IA**. Motivo: su ancho real depende de
  `page_count` + `cover_type` de cada **proyecto** (son campos variables
  por pedido, no por tema — confirmado en `schemaPixelart.sql:606-650`),
  así que no puede hornearse en una imagen estática compartida por tema.
  Se recorta por código (`sharp().extract()`) de la misma panorámica, con
  ancho calculado en el momento de renderizar el PDF de cada pedido.
- Precedente de personalizados (que NO tienen lomo) **no aplica** acá:
  ahí el lomo se prohibió por completo; en photobooks el lomo sí lleva
  diseño (país + año), por eso hace falta resolverlo distinto.

### Texto: 100% compuesto por código, nunca pintado por la IA

- Título+año en tapa, país+año en lomo: **todo se compone por código**
  (HTML + Puppeteer, mismo motor que ya usan para dedicatoria/degradado
  del PDF de libros personalizados), no la IA.
- Motivo: la IA no es confiable para centrado/posición pixel-perfect
  (2 intentos seguidos fallaron en centrar el título incluso con
  instrucciones explícitas), y el ancho del lomo es dinámico — cualquier
  texto pre-pintado por la IA quedaría mal alineado al recortarse a un
  ancho real distinto al de prueba.
- **Fuente elegida: Prata** (Google Fonts, gratis, un solo peso 400).
  Descartadas en el camino: Montserrat, Libre Caslon Text, Playfair
  Display, Cormorant, Bodoni Moda, DM Serif Display, Marcellus, Cinzel,
  Didot (no existe gratis en Google Fonts, es de Linotype/Adobe), GFS
  Didot, Instrument Serif, Cormorant Garamond, Bodoni 72 (no existe en
  Google Fonts, es fuente del sistema de Apple).
- Estilo de referencia (a escala del test, 300px card ≈ 676px reales):
  título 34px, año 8.4px, `letter-spacing: 0.14em`, separador fino de
  30px entre título y año, texto blanco, posición vertical ajustada a
  ~20% desde arriba tras iterar (probamos 8% → 42% → 20%).

### Resolución: camino A (generar chico + escalar con sharp)

- Ganador validado visualmente: generar en tamaño estándar de OpenAI
  (1024x1024 / 1536x1024, no "experimental") y escalar después con
  `sharp().resize(..., { kernel: 'lanczos3' })` hasta el techo de
  impresión — mismo patrón que ya usan los interiores de libros
  personalizados (`splitIntoPrintPages()`).
- **Dato técnico importante**: `kernel: 'lanczos3'` es el default de
  sharp para **downsizing**, pero en **upsampling** los kernels mapean a
  interpoladores simples (nearest/linear/cubic) — lanczos3 no tiene
  equivalente de upsampling y cae a **cúbica** (Catmull-Rom), no Lanczos
  real. Igual, validado visualmente sin pérdida notoria a ~2.44x.
- Techo de resolución: `MAX_IMAGE_PX = 2500` en `photobook-pdf.service.ts`
  (= 288 DPI a 22cm, documentado en el propio código como "calidad de
  impresión profesional"). El baseline actual en producción (1643x1639,
  ~190 DPI, upscale manual desde 1024x1024) está por debajo de ese
  estándar — esta feature también sube la calidad, no solo automatiza el
  año.
- Camino B (pedir directo una resolución grande nativa, ~2496x2496)
  **descartado**: cae en zona "experimental" de OpenAI (SDK confirma:
  resoluciones arbitrarias múltiplo de 16, aspect ratio 1:3 a 3:1, por
  encima de 2560x1440 "experimental", máximo 3840x2160), sin ganancia de
  calidad perceptible sobre A en la prueba visual.

### Snapshot vs. año en vivo (Fase 1.3) — resuelto distinto a lo planeado

- En vez de versionar/snapshotear el asset de tapa por proyecto, se
  agregará un **campo de año en el formulario del cliente** (elegir año
  actual u otro) — evita el problema de raíz (pedidos pagados que
  cambiarían de año si se re-renderiza el PDF tras regenerar el tema).
- **Pendiente de implementar**, no cerrado en detalle todavía.

## Prompt final (Fase 0) — iteraciones

Archivos en `PromptsPixelArtPlantillas/_pilot_photobook_cover_2027/`
(standalone, no toca `manifest.json` ni `output_photobooks/` reales):

- `test_cover_2027.py` (v1): 2 prompts independientes (portada/contraportada
  separadas), año dinámico validado, $0.1087 el par.
- `test_wrap_v2.py`: fusión a panorámica única, layout en "tercios" (ambiguo).
- `test_wrap_v3.py`: fix de centrado — layout en porcentajes exactos
  (44/12/44) en vez de "tercios", para que coincida con el corte real.
- `test_wrap_v4.py`: fix de posición vertical (arriba, no estaba dicho) +
  tipografía "normal" en vez de descriptores ornamentales.
- `test_wrap_v5.py`: quita TODO texto/tipografía del prompt — la IA genera
  solo escena pura, el texto pasa 100% a componerse por código.
- `test_wrap_v6.py`: recupera la Torre Eiffel (v5 la había perdido/reducido
  al pedir "dejar el 25% superior despejado" para el título).
- `font_preview.html` + `render_font_preview.js`: comparador de fuentes por
  código (Puppeteer + Google Fonts), sin gastar en generaciones de IA.
- `crop_test.js`: simulación de corte en 3 piezas (44/12/44) con líneas de
  referencia, para revisar visualmente dónde cae cada corte.

## Fase 2 — RESUELTO por medición física (ya no bloquea)

En vez de esperar la fórmula verbal de la imprenta (que ya había dado un
dato equivocado: "couché 200g" era falso), se midió un libro real impreso.

Medición (libro **TAPA_GRUESA**, sin vernier, valores aprox):

- 15 hojas = 30 caras → confirma `hojas = page_count / 2`; este libro es
  `page_count = 30`.
- Bloque de solo las hojas: **3.75 cm**.
- Lomo real: **~4 cm**.
- Es un fotolibro **rígido / lay-flat**: lomo pieza sólida, NO cosido, hojas
  gruesas montadas. Por eso el caliper es ~2.5 mm/hoja (páginas gruesas), no
  los ~0.25 mm de un libro de papel fino pegado.

### Fórmula del lomo (derivada de la medición)

```
hojas   = page_count / 2
lomo_mm = hojas × CALIPER_MM_POR_HOJA + OFFSET_TAPA_MM[cover_type]

CALIPER_MM_POR_HOJA = 2.5          // 3.75 cm ÷ 15 hojas
OFFSET_TAPA_MM = { TAPA_DELGADA: 1.5, TAPA_GRUESA: 2.5 }
SANGRADO_MM = 3                    // NO va en el lomo (ver abajo)
```

Ancla: 15 hojas TAPA_GRUESA → `15 × 2.5 + 2.5 = 40 mm = 4 cm` (✓ medido).

**El sangrado NO forma parte del ancho del lomo.** El lomo es interior al
wrap: ahí no se recorta nada, así que su ancho es puramente funcional. El
sangrado (3mm) es margen del **perímetro exterior** del wrap y lo consume la
geometría del wrap, no la fórmula del lomo.

**Implementado y testeado** (funciones puras de dominio, sin romper nada):
- `backend/api/src/photobook/domain/services/photobook-spine.service.ts`
  — `calculateSpineWidthMm(pageCount, coverType)` + las constantes.
- `backend/api/src/photobook/domain/services/photobook-wrap-layout.service.ts`
  — `computeWrapLayout()` (dimensiones + offsets del wrap) y
  `computeSourceCrops()` (recortes de la panorámica). El sangrado entra acá.
- Verificado con 22 asserts (el repo no tiene jest instalado todavía; se
  corrió un harness ts-node). `tsc --noEmit` limpio.

**Confianza**: son constantes de ARRANQUE, calibradas contra 1 medición
manual (rough, sin vernier). Van como **config** (no hardcodeadas) y se
afinan con UNA prueba impresa real (Fase 6). El grosor de tapa medido
(0.85/0.75 cm) NO se usa para el lomo — no cuadra con un lomo de 4 cm
(daría ~5.5 cm), así que el offset se deriva del **lomo medido directo**,
que es más confiable. Única validación pendiente: imprimir 1 prueba y medir.

## Lo que falta (nada de esto toca código real todavía)

- [ ] **Fase 1.3**: agregar campo de año al formulario/wizard del cliente.
- [x] **Fase 2**: RESUELTO por medición física — fórmula del lomo cerrada
      (ver sección "Fase 2 — RESUELTO"). Falta solo validar con 1 prueba impresa.
- [ ] **Fase 3 — Schema**: columna(s) de año en `photobook_themes` (o donde
      corresponda tras 1.3); constantes de la fórmula del lomo (¿hardcodeadas
      o configurables desde admin?).
- [ ] **Fase 4 — Backend**:
  - Endpoint admin "regenerar panorámica" por tema (reusa
    `ImageGenerationPort.generate()`, patrón de `generate-order-cover.use-case.ts`).
  - Función de cálculo de ancho de lomo real (`page_count` + `cover_type` +
    fórmula de imprenta).
  - Función de composición del wrap final: `extract()` de las 3 piezas +
    overlay de texto Prata (país+año en lomo, título+año en tapa) por
    código (Puppeteer) + **sangrado/bleed real de imprenta** (~3mm, todavía
    sin probar en ningún test — investigación previa lo confirmó como
    estándar de la industria).
  - Modificar `photobook-pdf.service.ts` para embeber el wrap como **1 sola
    página** en vez de 2 separadas (tapa/contratapa hoy son páginas PDF
    independientes).
- [ ] **Fase 5 — Frontend admin**: UI para disparar la regeneración anual
      por tema.
- [ ] **Fase 6 — Prueba end-to-end**: un tema real + un proyecto real con
      `page_count` real, verificar que el wrap arma y mide bien.
- [ ] **Fase 7 — Rollout**: regenerar los 18 temas, deploy.

## Datos técnicos confirmados en el camino (para no re-verificar)

- `photobook_themes` (`schemaPixelart.sql:593`) no tiene columnas de
  año/país/prompt — solo `cover_preview_key`, `cover_template_key`,
  `back_cover_key`, `is_active`.
- `photobook_projects.page_count` y `cover_type` son campos **por
  proyecto**, variables (`schemaPixelart.sql:606-650`), afectan el precio.
- `photobook-pdf.service.ts` resuelve tapa/contratapa **en vivo** contra el
  tema en cada render (líneas 69-70) — sin snapshot hoy, por eso importa la
  Fase 1.3.
- `photobook.module.ts` no importa `PersonalizedModule` directo — llega
  indirecto vía `OrdersModule`.
- Los prompts/precedentes de libros personalizados (`AUTOMATIZACION_ADMIN_IA.md`,
  `TAPA_CONTRATAPA_PROMOCION.md`) ya resolvieron "no lomo" para ese producto
  — no aplica igual acá porque el lomo de photobooks sí lleva diseño.
