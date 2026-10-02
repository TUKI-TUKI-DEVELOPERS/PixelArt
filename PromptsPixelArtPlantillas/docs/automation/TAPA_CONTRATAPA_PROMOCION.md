# Tapa, contratapa y página de promoción — estado y continuación

## Objetivo

Extender la automatización de generación con IA (ver `AUTOMATIZACION_ADMIN_IA.md`) — hoy solo cubre las páginas **interiores** (`TEMPLATE`) — a la **tapa** y **contratapa** del libro impreso, usando fotos reales de clientes en vez de personajes inventados. De paso, se diseñó una página de **venta cruzada** ("Más historias PixelArt") para promocionar otros libros dentro del mismo libro impreso.

Todo lo de acá se probó **manualmente en ChatGPT** (prompts) y con **scripts sueltos** (logo, QR, página de promoción) — nada de esto está todavía integrado al backend real. Es el mismo tipo de trabajo de piloto que ya se hizo antes para el bloque de identidad (ver `_plantilla-maestra.md` v6).

## Hechos verificados (no asumidos) — importante para la próxima sesión

- **Dimensión real de impresión**: `WIDTH_CM = 29`, `HEIGHT_CM = 20.5` (`backend/api/src/orders/infrastructure/pdf/custom-book-pdf.service.ts:11-12`). **No es 29×21** como dice `_plantilla-maestra.md` — ese doc está desactualizado en este punto, confiar en el código.
- **`COVER` y `BACK_COVER` son páginas únicas completas** en el PDF (no se parten en Cara A/B como `TEMPLATE`) — se insertan tal cual con `<img>` a pantalla completa (`custom-book-pdf.service.ts` → `pageDiv()`).
- **Gate de aprobación**: `custom-book-pdf.service.ts` solo toma assets con `status = 'CONFIRMED'` — hay un comentario explícito en el código: una generación con IA sin revisar por el admin nunca debe llegar al PDF.
- **Hoy `COVER` es 100% manual** — `uploadPrintAsset` en `orders.controller.ts` acepta `COVER` en `VALID_TYPES`, pero no existe ningún use-case que la genere con IA (a diferencia de `TEMPLATE`, que ya tiene `GenerateOrderTemplateUseCase`). Esta es la brecha que hay que cerrar.
- **Los `.md` de `Cover-Carrusel-Prompts.md` pueden estar desactualizados respecto al asset real ya aprobado en MinIO** — se comprobó con "10 Razones Por Las Que Te Amo": el `.md` describe una escena de balcón/rosas/luna que **nunca se usó**; el asset real (`personalized_models.cover_asset_id` → MinIO) es un fondo de corazones en bokeh dorado/rosado. Antes de reusar cualquier prompt de esa carpeta para un libro específico, verificar contra la imagen real:
  ```sql
  SELECT a.storage_key FROM personalized_models pm
  JOIN assets a ON a.id = pm.cover_asset_id
  WHERE pm.name ILIKE '%<libro>%';
  ```
  ```bash
  curl http://localhost:9000/pixelart-assets/<storage_key> -o preview.png
  ```
- **Solo la categoría Amor tiene contenido de prompt cargado** (`scene_visual`/`poem_template`) — mismo límite que ya existe para `TEMPLATE` (ver `AUTOMATIZACION_ADMIN_IA.md`). Todo lo de acá se probó con "10 Razones Por Las Que Te Amo".

## 1. Prompt de TAPA (portada impresa, con fotos reales)

Reemplaza el mockup 3D de la miniatura del sitio (que sigue existiendo, es para el catálogo web, no se toca) por una imagen **plana, a sangre completa, sin objeto-libro** — mismo criterio que ya usa `[IMAGEN BASE]` de las plantillas interiores en `_plantilla-maestra.md`.

Escena real verificada (corazones en bokeh dorado/rosado, NO balcón — ver arriba). Incluye bloque de "Proporción y conexión física" agregado tras detectar que `images.edit` con múltiples fotos de referencia (una persona por foto) tiende a componer a la pareja como dos recortes pegados si no se lo restringe explícitamente — mismo tipo de gotcha que ya está documentado en `AUTOMATIZACION_ADMIN_IA.md` ("profundidad de campo inconsistente entre rostros").

```
Genera una imagen en formato apaisado 3:2 con el siguiente prompt:

[IMAGEN BASE]
Fotografía hiperrealista plana, a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la tapa final de un libro de tapa dura que se imprimirá directamente: NO es el render de un objeto-libro, NO es una maqueta 3D, NO debe mostrarse el libro como objeto (nada de tapas cerradas, lomo, cantos, curvatura de papel, sombra de contacto, fondo blanco de estudio ni mesa). Es una única fotografía continua tipo retrato de estudio cálido, como una portada de revista editorial de alta gama.

[ESCENA VISUAL]
{NOMBRE_A} y {NOMBRE_B} muy cerca el uno del otro, mejilla con mejilla o frente con frente, ambos sonriendo con calidez genuina, de la cintura o los hombros hacia arriba, en ropa casual cómoda de tonos cálidos (blusa/camisa clara y oscura, nada formal ni de gala), ligeramente descentrados respecto del centro del lienzo.

Usá cada imagen de referencia adjunta para que el personaje correspondiente sea la persona real de esa foto ({NOMBRE_A} y {NOMBRE_B}) — mantené su parecido real (rasgos, edad, tono de piel) e integralo de forma natural y fotorrealista con la iluminación, el enfoque y el estilo del resto de la escena, como si hubiera sido fotografiado ahí mismo. El vestuario y los accesorios de cada uno son EXCLUSIVAMENTE los descritos en esta escena (no lo que tengan puesto en su foto de referencia), excepto lentes de armazón (no de sol), que sí se conservan si la persona los usa habitualmente.

Proporción y conexión física entre ambos (crítico)
Aunque las fotos de referencia puedan haber sido tomadas a distancias o ángulos distintos, en la escena final ambos deben verse fotografiados juntos, en el mismo momento, a la MISMA distancia de cámara — ninguno de los dos debe verse más grande, más pequeño, más cerca o más lejos que el otro. Sus alturas relativas y la proporción de sus cuerpos (cabeza, hombros, brazos, manos) deben ser anatómicamente coherentes entre sí y con la escena, sin distorsiones. Tiene que existir un punto de contacto físico real y natural entre ellos (un brazo rodeando el hombro o la cintura, manos entrelazadas o apoyadas, mejillas o frentes tocándose) — nunca dos personas flotando una junto a la otra sin tocarse. Ambos rostros deben compartir exactamente la misma profundidad de campo, el mismo nivel de enfoque/nitidez y la misma fuente e intensidad de luz de la escena.

Fondo y Detalles
Fondo de estudio cálido en degradado de tonos marrón dorado a rosa/coral profundo, sin arquitectura ni elementos exteriores — puro ambiente de luz y color.

Efectos Mágicos
El fondo está lleno de corazones suaves en bokeh, de distintos tamaños y profundidades, en tonos dorado cálido y rosa pastel, brillando con un resplandor difuso tipo luz de vela — algunos nítidos y cercanos, la mayoría difuminados y lejanos, cubriendo generosamente todo el encuadre detrás de la pareja.

[COMPOSICIÓN — REGLAS OBLIGATORIAS]
- Composición asimétrica: la pareja ligeramente descentrada. Prohibidas las composiciones perfectamente simétricas o especulares.
- Margen de seguridad: rostros y bloques de texto a más de un 10% de cada borde del lienzo (se recortará al imprimir).
- El bokeh de corazones debe sentirse denso y presente en todo el fondo, de borde a borde.
- {NOMBRE_A} y {NOMBRE_B} deben ocupar una porción generosa y equilibrada del lienzo, con la misma escala aparente entre ambos.

[ILUMINACIÓN Y COLOR]
Iluminación cálida de estudio, tonos marrón dorado, rosa y coral profundo. Atmósfera romántica, íntima y editorial.

[DISEÑO EDITORIAL]
Franja superior: título en caligrafía romántica fluida, conectada entre letras, con variación de grosor entre trazos finos y gruesos, remates ornamentados, acabado dorado con relieve sutil. Centrado.
Título: "{TÍTULO EN MAYÚSCULAS}"

Franja inferior, debajo de la pareja: mismo estilo caligráfico, tamaño menor, centrado.
Subtítulo: "{NOMBRE_A} & {NOMBRE_B}"

[DETALLES TÉCNICOS]
Hiperrealismo extremo, coherencia total con los rostros de las imágenes de referencia. Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin mockup de libro, sin tapas, sin cantos, sin fondo blanco ni mesa. Estética editorial premium de photobook de alta gama.
```

Probado con Javier/Zoe → resultado real: `ChatGPT Image 1 ago 2026, 11_05_12.png` / `11_48_03.png` (en la raíz del repo, no comiteados).

## 2. Prompt de CONTRATAPA

Dos variantes probadas — **la que se usa depende de si el libro lleva pareja también en la contratapa o no**. Copy original elegido (registro "cálido", ver sección 3) — evitar copiar texto de la competencia (Hooray Heroes), solo la estructura (poema/tagline + hashtag + cierre) es de dominio público, el texto debe ser propio.

### 2a. Con pareja (momento distinto al de la tapa)
Mismo bloque de "Proporción y conexión física" que la tapa. Escena más íntima (mirándose entre sí, no a cámara) para diferenciarla de la tapa.

### 2b. Sin personas — el texto es el protagonista (versión final elegida)
Cuando no hay pareja, el texto necesita mucha más jerarquía/tamaño que en la versión con pareja, si no la pieza se siente vacía.

```
Genera una imagen en formato apaisado 3:2 con el siguiente prompt:

[IMAGEN BASE]
Fotografía hiperrealista plana, a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la contratapa final de un libro de tapa dura que se imprimirá directamente: NO es el render de un objeto-libro, NO es una maqueta 3D. Es un fondo de estudio ambiental puro, sin personas ni personajes de ningún tipo — el texto editorial es el protagonista absoluto de esta pieza.

[ESCENA VISUAL]
Fondo de estudio cálido en degradado de tonos marrón dorado a rosa/coral profundo, sin arquitectura ni elementos exteriores.

Efectos Mágicos
El fondo entero está lleno de corazones suaves en bokeh, de distintos tamaños y profundidades, en tonos dorado cálido y rosa pastel, brillando con un resplandor difuso tipo luz de vela, cubriendo todo el encuadre de borde a borde de forma pareja y generosa.

[COMPOSICIÓN — REGLAS OBLIGATORIAS]
- Sin sujetos, sin siluetas humanas, sin animales.
- Prohibidas las composiciones perfectamente simétricas.
- Reservar el 15-18% superior del lienzo, centrado horizontalmente, con bokeh más suave y difuminado (sin corazones grandes ni nítidos ahí) — esa franja queda para un isotipo de marca que se agrega en posproducción. NO dibujar ningún logotipo, texto de marca ni ícono ahí, dejar solo fondo liso.
- El bloque de texto (más abajo, centrado) debe tener bokeh suave detrás para leerse con claridad total.

[ILUMINACIÓN Y COLOR]
Iluminación cálida de estudio, tonos marrón dorado, rosa y coral profundo.

[DISEÑO EDITORIAL]
Centrado, debajo de la franja reservada para el isotipo, con jerarquía tipográfica marcada y buen aire entre líneas:

Línea 1 (tagline — grande, protagonista, serif editorial de alta gama, tinta oscura cálida):
"{TAGLINE}"

Línea 2 (nombres de los protagonistas — mediano, mismo estilo caligráfico dorado que el subtítulo de la tapa):
"{NOMBRE_A} & {NOMBRE_B}"

Línea 3 (hashtag — mediano, caligrafía dorada fluida):
"{HASHTAG}"

Línea 4 (cierre — la más pequeña, serif liviana):
"{LÍNEA_DE_CIERRE}"

Separación generosa entre las cuatro líneas, todo centrado.

[DETALLES TÉCNICOS]
Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin mockup de libro, sin tapas, sin fondo blanco ni mesa. Estética editorial premium de photobook de alta gama.
```

Resultado real: `ChatGPT Image 1 ago 2026, 11_51_45.png` (raíz del repo).

## 3. Copy original elegido (contratapa)

Registro **"cálido"** (de 3 opciones presentadas — editorial/cálido/juguetón):

- **Tagline**: "10 razones hoy. Miles más por vivir." *(placeholder por libro — reemplazar por libro cuando se generalice)*
- **Hashtag**: `#AmorPixelArt`
- **Línea de cierre**: "Impreso con cariño en Perú, para quien más querés."

**Nota de copyright** (por si se retoma la pregunta): está bien inspirarse en la ESTRUCTURA de un colofón/contratapa de la competencia (poema/tagline + hashtag + disclaimer), no en el texto literal. Idea/estructura no es propiedad de nadie, la expresión concreta sí.

## 4. Logo — export estático y compositing

- **Decisión del cliente**: el logo se queda como está (multicolor, `PixelArtLogo.tsx`), **no se rediseña**. Se descartó explorar una versión "elegante" monocromática — no perder tiempo en eso de nuevo.
- **Archivo final**: `frontend/web/public/brand/pixelart-logo.svg` — vector, transparencia real, 60mm × 15.1mm (verificado renderizando y midiendo con Playwright, no a ojo), colores exactos de `frontend/web/src/lib/colors.ts` (`P_RED #B72028`, `I_ORANGE #EA6F29`, `X_YELLOW #F0B02A`, `E_GREEN #88C343`, `L_PURPLE #804187`, `A_BLUE #2B86BF`, `R_PINK #DF1F74`, `T_TURQUOISE #44B9B1`), Montserrat 800.
- **Preview con fondo blanco** (no usar para producción, solo referencia visual): `frontend/web/public/brand/pixelart-logo-preview-whitebg.png`.
- **Regla de oro confirmada con el cliente**: el logo **nunca se le pide a la IA que lo dibuje** en el prompt (los modelos no reproducen tipografía de marca multicolor de forma confiable) — siempre se reserva una zona limpia en el prompt y se pega **después, por código**, con `sharp`, mismo patrón que ya usa `processSpread()` en `generate-order-template.use-case.ts`.
- **Tamaño validado** (confirmado con el cliente que está bien para las dimensiones reales del libro, 29cm de ancho): 18-22% del ancho de la portada.
- **Posiciones probadas**:
  - Tapa (con pareja): esquina inferior derecha, ~18% ancho, margen 3%.
  - Contratapa (sin personas): arriba-centro, ~20% ancho, ~12% del alto desde arriba (dejar aire, no pegarlo al borde superior).

Snippet de compositing verificado (Node + `sharp`, mismo paquete ya usado en el backend):
```js
const sharp = require('sharp');
const cover = sharp(COVER_PATH);
const meta = await cover.metadata();
const logoWidth = Math.round(meta.width * 0.18); // o 0.20-0.22 según pieza
const logoBuffer = await sharp(LOGO_SVG_PATH, { density: 600 })
  .resize({ width: logoWidth })
  .png()
  .toBuffer();
const logoMeta = await sharp(logoBuffer).metadata();
await cover
  .composite([{ input: logoBuffer, left, top }]) // left/top según posición elegida
  .png()
  .toFile(OUT_PATH);
```

## 5. Página de venta cruzada ("Más historias PixelArt")

**No necesita IA en absoluto** — es maquetación pura (imágenes + texto + QR), mismo tipo de página que `dedicationPage` ya existente en `custom-book-pdf.service.ts` (HTML/CSS + Puppeteer).

### Instalado
`qrcode` + `@types/qrcode` ya están en `backend/api/package.json` (workspace correcto):
```bash
npm install qrcode @types/qrcode --workspace=backend/api
```

### URLs reales verificadas
Patrón: `/libros-personalizados/{categoriaSlug}/{libroSlug}`
- Categorías: `libros-de-amor`, `libros-de-mascotas` (y presumiblemente `libros-de-familia`, `libros-de-memorias-familiares` — no confirmado con el mismo detalle).
- Slugs de libro: **hardcodeados en un mapa `LIBRO_NAMES`** dentro de `frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/page.tsx` (no hay columna `slug` en `personalized_models` ni `personalized_categories`). **Deuda técnica anotada, no resuelta**: si esto se automatiza de verdad, convendría agregar `slug` a la BD en vez de mantener el mapa a mano.

### ⚠️ Bloqueante real para producción
**El dominio final de producción todavía no está definido** (`.env.example` tiene `dominiodelcliente.com.pe` como placeholder). Un QR va **impreso físicamente** — si se imprime con el dominio equivocado, no hay forma de corregirlo después. No generar QRs reales para imprenta hasta tener el dominio definitivo confirmado.

### Prototipo
Archivo completo guardado en `PromptsPixelArtPlantillas/tapa-contratapa-promocion/cross-sell-page-prototipo.html` (+ los 3 QR de prueba al lado, apuntando a `https://pixelart.pe/...` como placeholder). Abrir ese HTML directo en un navegador reproduce el resultado.

**Decisiones de diseño ya validadas visualmente**:
- 3 libros por página (se probó con Mi Amor, 1025 Días Enamorándome de Ti, Nuestro Ángel de 4 Patas — sirven de patrón para la lógica "excluir la categoría/libro actual, mostrar otros 3").
- Fondo **crema/beige** con textura de "nubecitas" suaves hecha 100% con `radial-gradient` en CSS (sin imagen, sin IA) — se probó también una variante roja intensa, el cliente prefirió la versión clara.
- Tipografía: `Libre Caslon Text` (ya cargada en el sitio, ver `layout.tsx`) en cursiva para los textos descriptivos — más elegante que texto regular.
- **Bug encontrado y resuelto**: si el título de un libro ocupa 2 líneas (ej. "1025 Días Enamorándome de Ti"), empuja el QR más abajo que en las tarjetas con título de 1 línea → se soluciona dándole `min-height` al `<h2>` (reserva el alto de 2 líneas siempre, independiente del contenido real).
- Frase de cierre al pie, cálida, **sin mencionar a PixelArt** (pedido explícito): *"Porque el amor, cuando es de verdad, merece quedar para siempre."*

### Pendiente para producción real
1. Método `crossSellPage()` en `custom-book-pdf.service.ts`, insertado antes de la contratapa (mismo lugar conceptual que `dedicationPage`).
2. Generar los QR con `QRCode.toDataURL()` (no archivos sueltos) usando el dominio real ya confirmado.
3. Resolver los 3 libros a promocionar dinámicamente desde la BD (excluir categoría/libro actual) en vez de hardcodeados.
4. **Embeber la fuente Libre Caslon Text en base64**, igual que ya hacen con `DancingScript.ttf` (`custom-book-pdf.service.ts` → `getDedicationFontBase64()`) — el prototipo usa el link de Google Fonts en vivo, que no va a funcionar igual dentro del contenedor de producción sin internet garantizado.

## Archivos relevantes de esta sesión

- `frontend/web/public/brand/pixelart-logo.svg` + `pixelart-logo-preview-whitebg.png`
- `PromptsPixelArtPlantillas/tapa-contratapa-promocion/cross-sell-page-prototipo.html` + 3 QR de prueba
- `backend/api/package.json` — `qrcode` y `@types/qrcode` agregados
- Resultados de prueba en la raíz del repo (**no comiteados, son solo pruebas del cliente en ChatGPT**): `ChatGPT Image 1 ago 2026, *.png`, `Tapa 10 Razones con logo PixelArt.png`, `Contratapa con logo PixelArt.png`, `Pagina promocion otros libros.png`, `Retrato romántico con corazones dorados.png`, `WhatsApp Image 2026-06-03*.jpeg` (referencias de la competencia) — considerar limpiar la raíz del repo antes de cualquier `git add .` para no ensuciar el historial con estos PNG de prueba.
- `backend/api/src/orders/infrastructure/pdf/custom-book-pdf.service.ts` — donde vive hoy el armado del PDF (`buildHtml`, `dedicationPage`, gate de `CONFIRMED`).
- `backend/api/src/orders/application/use-cases/generate-order-template.use-case.ts` — patrón a replicar para `COVER`/`BACK_COVER`.
