# Ralph Wiggum Loop — Libros personalizados adultos

Este documento define el método operativo para crear versiones adultas de libros personalizados en PixelArt sin romper las versiones infantiles existentes. El objetivo no es solo reescribir poemas: el loop cubre concepto, prompts, plantillas, imágenes IA, revisión visual, integración técnica y QA del flujo completo.

## 1. Objetivo

Crear variantes adultas para libros personalizados seleccionados, manteniendo la magia de PixelArt pero con tono, escenas, poemas, portadas y experiencia de selección adecuados para adultos.

El resultado final esperado es que una persona pueda navegar la web, distinguir libros infantiles y adultos, elegir un libro adulto, seleccionar plantillas internas compatibles, solicitar una demo y recibir resultados generados con IA coherentes con el libro.

## 2. Qué significa “adulto” en PixelArt

“Adulto” no significa oscuro, explícito ni sexual. En esta iniciativa significa:

- emociones más maduras;
- lenguaje menos infantil;
- escenas más realistas o simbólicas;
- vínculos familiares, espirituales o de compañía tratados con mayor profundidad;
- humor sano cuando el libro lo permita;
- magia visual cuidada, no infantilizada;
- coherencia entre destinatario, relación, poema, escena e imagen.

La definición exacta depende de cada libro. No existe un único tono adulto universal.

## 3. Alcance inicial

Libros incluidos en la primera etapa adulta:

| Libro | Estado |
|---|---|
| Papá, Mi Héroe | Incluido |
| Mamá, Mi Heroína | Incluido |
| Aventura entre patas | Incluido |
| Te amo, abuelo | Incluido |
| Te amo, abuela | Incluido |
| El Mejor Equipo | Incluido |
| Siempre en mi corazón — Abuelo | Incluido / split requerido |
| Siempre en mi corazón — Abuela | Incluido / split requerido |
| Mi Ángel Guardián — Padre | Incluido / split requerido |
| Mi Ángel Guardián — Madre | Incluido / split requerido |
| Siempre serás parte de mí | Incluido |
| Mi Familia | Incluido |

Nota importante: `Memorias familiares` es una categoría, no un libro único. No generar ni integrar un paquete genérico llamado “Memorias familiares” como producto final. Deben trabajarse por separado los libros activos. Además, `Siempre en mi corazón` no debe comprimirse en un solo libro de 80 plantillas: se divide como producto en `Siempre en mi corazón — Abuelo` y `Siempre en mi corazón — Abuela`, igual que la lógica `Te amo, abuelo` / `Te amo, abuela`. `Mi Ángel Guardián` también se divide en `Mi Ángel Guardián — Padre` y `Mi Ángel Guardián — Madre`; no deben compartir plantillas genéricas ni copiar la misma familia visual. `Gracias por tu amor` queda fuera/pausado.

Libros fuera de alcance por ahora:

| Libro | Motivo |
|---|---|
| Gracias por tu amor | Retirado temporalmente |
| Libros de amor de pareja | No se tocarán en esta etapa |
| Nuestro Ángel de 4 patas | Fuera de esta etapa |
| Mi mejor amigo del mundo | Fuera de esta etapa |
| Mi amigo Miauravilloso | Fuera de esta etapa |

## 4. Principios obligatorios

Estas reglas no se negocian durante el loop:

- La versión infantil actual se conserva intacta.
- La versión adulta se crea como variante nueva.
- No se toca código hasta que estén aprobados textos, prompts e imágenes de muestra.
- Todo poema debe rimar.
- Todo poema debe usar apodo o un equivalente contextual aprobado.
- El castellano del producto debe ser neutral, sin voseo ni regionalismos argentinos.
- La escena debe coincidir con el poema.
- El prompt debe coincidir con la relación real del libro.
- La imagen debe respetar identidad, roles, edades, tono, composición, dimensión y formato web.
- Las mascotas deben tener especie explícita cuando apliquen.
- Los libros que no son de mascotas deben prohibir explícitamente mascotas, perros, gatos, aves y animales.
- El color del título debe acompañar el tema de cada plantilla; no usar dorado fijo por defecto.
- No se deben usar escenas oscuras, explícitas, morbosas ni religiosas en exceso.
- Máximo 2 intentos de imagen por plantilla antes de marcarla para revisión manual.
- Cada loop debe tener presupuesto estimado y aprobado antes de generar imágenes.

### 4.1 Reglas confirmadas por micro-pilotos

Aprendizajes validados durante Mamá v2c, Abuelo, Abuela y Mi Familia:

- Adulto no significa serio genérico: cada plantilla necesita arquetipo adulto, escenario único, objeto símbolo, magia propia y paleta diferenciada.
- Adulto tampoco significa interior, mesa y personajes sentados: cada micro-piloto debe mezclar escala, movimiento y espacios. Usar exteriores, rutas, azoteas, puentes, estaciones, playas, jardines, talleres abiertos o escenas en acción cuando el libro lo permita.
- Como regla práctica, un micro-piloto de 4 no debe tener más de 1 escena claramente sentada/alrededor de mesa, salvo que el libro lo justifique y el usuario lo apruebe.
- El apodo/nombre no debe aparecer siempre al inicio del poema; variar inicio, medio y cierre para evitar sonido mecánico.
- El título y sus ornamentos deben usar color temático por plantilla, igual que en los libros infantiles; dorado solo si el tema lo justifica.
- Si el libro no es de mascotas, el prompt debe decir explícitamente `no incluir mascotas, perros, gatos, aves ni animales de ningún tipo`.
- En libros de recuerdo donde se piden fotos del cliente/dedicante y del destinatario fallecido —abuelo, abuela, padre, madre, hermano/a— ambas identidades deben usarse claramente. El dedicante debe tener rostro visible frontal o tres cuartos; prohibido dejarlo de espaldas. La persona fallecida debe aparecer como pieza memorial artística grande, visible y emocionalmente protagonista, basada en su foto real y preservando parecido. Cada libro memorial debe definir su propia familia artística; cada plantilla puede variar el tratamiento dentro de esa familia. No alcanza una foto pequeña escondida ni un prop secundario; tampoco debe volverse fantasma literal.
- Si el libro sí es de mascotas, la especie debe ser explícita en el prompt principal. Para esta etapa, Mascotas significa el libro específico `Aventuras Entre Patas`.
- Antes de escalar un libro completo, generar una prueba controlada de 4 plantillas, crear contact sheet y registrar costo real.

## 5. Matriz de tono por libro

| Libro | Tono adulto | Emoción principal | Humor | Magia | Riesgo a evitar |
|---|---|---|---|---|---|
| Papá, Mi Héroe | Admiración adulta, gratitud, respeto | Orgullo y reconocimiento | Bajo, cálido | Media | Que parezca un niño hablando como bebé |
| Mamá, Mi Heroína | Ternura madura, gratitud, protección invertida | Amor, cuidado, agradecimiento | Bajo | Media | Infantilizar a la mamá o al hijo adulto |
| Te amo, abuelo | Nostalgia, legado, memoria familiar | Admiración y ternura | Medio, familiar | Media-alta | Volverse triste u oscuro |
| Te amo, abuela | Nostalgia dulce, calidez, hogar | Amor, memoria, gratitud | Medio, familiar | Media-alta | Volverse demasiado solemne |
| El Mejor Equipo | Hermanos adultos, convivencia, complicidad | Unión y lealtad | Alto pero sano | Media | Que parezca libro de niños o grupo genérico |
| Aventura entre patas | Vínculo profundo con mascota, aventura cotidiana | Compañía y ternura | Medio-alto, humor de mascota | Media | Tratar al dueño como niño |
| Siempre en mi corazón — Abuelo | Sanador, esperanzador, espiritual | Presencia emocional y recuerdo del abuelo | Bajo | Alta, suave | Hacerlo oscuro o fúnebre; mezclar destinatario abuelo/abuela |
| Siempre en mi corazón — Abuela | Sanador, esperanzador, espiritual | Presencia emocional y recuerdo de la abuela | Bajo | Alta, suave | Hacerlo oscuro o fúnebre; mezclar destinatario abuelo/abuela |
| Mi Ángel Guardián — Padre | Espiritual no religioso, protector, guía sobria | Protección como brújula, ruta y límite seguro | Bajo | Alta | Copiar abuelo/abuela; ángel literal kitsch; padre fantasma |
| Mi Ángel Guardián — Madre | Espiritual no religioso, protector, refugio luminoso | Protección como manto, umbral, voz y abrigo | Bajo | Alta | Copiar abuela/corazón; religiosidad barata; madre fantasma literal |
| Siempre serás parte de mí | Hermanos adultos, complicidad, equipo y vínculo que sigue | Hermandad, risas compartidas, presencia interior del hermano | Medio, cálido | Media-alta | Confundir con padres/abuelos; usar retratos artísticos; volverlo fúnebre |
| Mi Familia | Familia adulta, hogar, historia compartida | Pertenencia y unión | Medio | Media | Familia perfecta/falsa o demasiado infantil |

## 6. Estrategia producto: adulto vs infantil

La experiencia debe permitir distinguir libros infantiles y adultos desde la navegación principal, tomando como referencia el enfoque de Hooray Heroes de organizar libros por audiencia/categoría, pero sin copiar su identidad visual.

Antes de implementar UI se debe investigar y decidir:

- si la navegación tendrá categorías visibles tipo “Infantiles” y “Adultos”;
- si habrá subcategorías por vínculo: mamá, papá, abuelos, hermanos, familia, mascotas;
- cómo se verá en desktop y mobile;
- si la selección adulto/infantil vive en navbar, catálogo, página de detalle o varias capas;
- cómo mantener la identidad actual de PixelArt sin convertir la navegación en un menú genérico;
- cómo evitar que los libros adultos parezcan una sección separada sin relación con el resto de la marca.

Criterio recomendado: el cliente debe entender desde el navbar que existen libros para diferentes audiencias, pero la página de detalle debe seguir reforzando la elección con copy, miniaturas, ejemplos y plantillas compatibles.

## 7. Estrategia técnica pendiente

No decidir la estructura técnica sin revisar el schema y el flujo actual.

Opciones a evaluar:

| Opción | Ventaja | Riesgo |
|---|---|---|
| Agregar columna o metadata `audience_variant` | Mantiene el catálogo ordenado y evita duplicar nombres | Requiere revisar queries, seeds y frontend |
| Crear modelos/libros separados | Más simple de entender al inicio | Duplica datos y puede ensuciar slugs/catálogo |
| Usar categorías separadas | Fácil para navegación | Puede mezclar taxonomía de producto con audiencia |
| Usar metadata por plantilla | Flexible | Puede complicar filtros y validaciones |

Recomendación preliminar: preferir variante explícita en datos antes que duplicar libros, pero decidir solo después de auditar `schemaPixelart.sql`, seeds, repositorios, servicios y frontend.

## 8. Cantidad de plantillas

Cuando el libro tenga dirección por género o relación, la variante adulta debe cubrir esas direcciones.

Regla confirmada para Papá/Mamá:

| Libro adulto | Plantillas esperadas |
|---|---|
| Papá, Mi Héroe | 20 de hijo adulto → papá + 20 de hija adulta → papá |
| Mamá, Mi Heroína | 20 de hijo adulto → mamá + 20 de hija adulta → mamá |
| Siempre en mi corazón — Abuelo | 20 de hijo adulto → abuelo + 20 de hija adulta → abuelo |
| Siempre en mi corazón — Abuela | 20 de hijo adulto → abuela + 20 de hija adulta → abuela |

Para los demás libros, la cantidad debe definirse por libro según variantes reales, complejidad y experiencia de selección. Si un libro cruza dos destinatarios fuertes —por ejemplo abuelo y abuela— no comprimir 80 plantillas en un solo producto salvo decisión explícita; preferir split por destinatario para no volver pesada la selección.

## 9. Planificación de costos de generación

Cada loop debe incluir una estimación de costo antes de generar imágenes. Generar plantillas con IA tiene costo real y no se debe iniciar una tanda sin presupuesto aprobado.

Configuración base actual del entorno aislado `PromptsPixelArtPlantillas/`:

| Parámetro | Valor actual |
|---|---|
| Script principal | `PromptsPixelArtPlantillas/scripts/generate.py` |
| Modelo por defecto | `gpt-image-2` |
| Calidad | `medium` |
| Tamaño | `1600x944` |
| Costo estimado de referencia | `~$0.041 USD / imagen` |
| Tracking real | `manifest.json` guarda `cost_usd` por imagen |

El costo real puede variar porque el script calcula el precio con los tokens reportados por la API. Para planificación se usa `$0.041` por imagen y luego se compara contra el costo real acumulado del manifest.

### 9.1 Fórmula de presupuesto

```txt
imágenes_base = cantidad_de_plantillas + assets_adicionales
intentos_presupuestados = 1 + porcentaje_de_reintentos
costo_estimado = imágenes_base × intentos_presupuestados × costo_unitario
```

Para escenario máximo:

```txt
costo_máximo = imágenes_base × 2 × costo_unitario
```

El máximo operativo es 2 intentos por imagen. Si ambos fallan, la plantilla se marca para revisión manual.

### 9.2 Presupuesto inicial de plantillas interiores

Estimación usando `$0.041 USD / imagen` solo para plantillas interiores adultas. No incluye todavía miniaturas, portadas, contratapas, fondos ni imágenes de página slug.

| Libro adulto | Plantillas interiores | 1 intento | +20% reintentos | Máximo 2 intentos |
|---|---:|---:|---:|---:|
| Papá, Mi Héroe | 40 | $1.64 | $1.97 | $3.28 |
| Mamá, Mi Heroína | 40 | $1.64 | $1.97 | $3.28 |
| Aventura entre patas | 20 | $0.82 | $0.98 | $1.64 |
| Te amo, abuelo | 40 | $1.64 | $1.97 | $3.28 |
| Te amo, abuela | 40 | $1.64 | $1.97 | $3.28 |
| El Mejor Equipo | 20 | $0.82 | $0.98 | $1.64 |
| Siempre en mi corazón — Abuelo | 40 | $1.64 | $1.97 | $3.28 |
| Siempre en mi corazón — Abuela | 40 | $1.64 | $1.97 | $3.28 |
| Mi Ángel Guardián — Padre | 40 | $1.64 | $1.97 | $3.28 |
| Mi Ángel Guardián — Madre | 40 | $1.64 | $1.97 | $3.28 |
| Siempre serás parte de mí | 40 | $1.64 | $1.97 | $3.28 |
| Mi Familia | 20 | $0.82 | $0.98 | $1.64 |
| **Total interiores** | **380** | **$15.58** | **$18.70** | **$31.16** |

### 9.3 Assets adicionales

Cada libro puede requerir imágenes adicionales además de plantillas interiores:

- miniatura/card del catálogo;
- imagen hero o imágenes de la página slug;
- fondo nuevo si el actual es demasiado infantil;
- portada;
- contratapa;
- assets promocionales o de carrusel si corresponden.

Regla operativa confirmada: las versiones infantiles existentes no se tocan. Para cada versión adulta aprobada habrá que crear miniaturas/assets adultos propios más adelante, después de validar interiores. No adelantar miniaturas si el usuario no lo pide explícitamente.

Estos assets se presupuestan por libro antes de generar:

```txt
assets_adicionales = miniaturas + hero + fondos + portadas + contratapas + promocionales
costo_assets = assets_adicionales × costo_unitario × intentos_presupuestados
```

No asumir que todos los libros requieren todos los assets. Primero se audita qué puede conservarse.

### 9.4 Contrato visual para miniaturas adultas

Aprendizaje incorporado al loop después de corregir `Te Amo, Abuelo Adulto`: una miniatura adulta no es una portada nueva. Es una miniatura PixelArt del mismo sistema visual, con contenido adulto.

Referencia obligatoria antes de generar:

| Referencia | Uso |
|---|---|
| Miniatura infantil existente del mismo libro | Define composición, postura, magia, título y lectura de producto. |
| `Papá, Mi Héroe Adulto` aprobado | Define tamaño de tarjeta, recorte adulto y escala final. |

Contrato de catálogo:

- Mockup 3D de libro físico, cerrado, tapa dura, formato apaisado 29x21.
- Vista casi frontal: el libro mira al usuario y solo se inclina levemente hacia atrás.
- Inclinación suave: borde inferior apenas más cerca de cámara; borde superior no debe alejarse demasiado.
- No generar libro vertical, novela editorial, portada libre, libro parado ni libro acostado plano.
- El libro debe ocupar casi todo el ancho de la tarjeta, como Papá adulto.
- Canvas final de catálogo: `1310x926`.
- Objetivo visual de bbox para tarjeta: cercano a Papá adulto, `1294x901` con márgenes aproximados `8 / 12 / 8 / 13`.
- Fondo exterior limpio/transparente. Si hay blanco de estudio, debe poder recortarse sin halos.
- El título impreso no debe incluir `Adulto`; la UI comunica la variante.
- La escena de tapa cambia a adulta, pero la gramática de producto se mantiene PixelArt.

Gate obligatorio antes de escalar miniaturas:

1. Generar una sola miniatura piloto de catálogo.
2. Compararla contra la miniatura infantil y Papá adulto en una hoja lado a lado.
3. Subirla temporalmente a MinIO y verla en la tarjeta real.
4. Ajustar postura, escala y recorte antes de generar el resto.
5. Solo escalar si la tarjeta real aprueba visualmente.

Postproceso obligatorio:

- Recortar contra el libro físico, no contra la sombra generada.
- Eliminar halos circulares/elípticos, neblina lateral y sombras huérfanas bajo el libro.
- Si el concepto ya está aprobado, preferir postprocesar tamaño/recorte antes que regenerar.
- Guardar backup del objeto MinIO anterior antes de reemplazar una miniatura usada por frontend.

#### 9.4.1 Miniatura Home

La miniatura Home no debe generarse como otro concepto. Es el mismo libro físico aprobado para catálogo, colocado en la pose de Home.

Contrato Home:

- Canvas final: `1190x1322`.
- Libro apaisado 29x21 rotado en diagonal, con el lado derecho más alto y el lomo izquierdo más bajo.
- Ángulo práctico de referencia: `+6°` counterclockwise desde la miniatura de catálogo.
- Bbox objetivo para `Te Amo, Abuelo`: cerca de la infantil Home, `~1112x832`; la versión adulta aprobada quedó en `1109x833`.
- Márgenes de referencia: infantil `35 / 207 / 43 / 283`; adulto aprobado `44 / 211 / 37 / 278`.
- Sombra suave derivada del alpha del libro; no usar círculos, elipses ni sombra negra pesada.
- Método preferido: postproceso determinístico desde la miniatura de catálogo aprobada.
- Usar OpenAI image edit solo si el giro 2D se ve físicamente falso; nunca hacer text-only generation para Home si ya existe una miniatura de catálogo aprobada.

Regla UI Home:

- El switch vive en datos (`versions`) de `NuestrosLibrosCard`.
- No crear un componente especial por libro.
- La card mantiene título común y alterna imagen, descripción y href por versión.
- `Te Amo, Abuelo` usa `K.ourBooksFamilyAbueloAdultoHome` y apunta a `/libros-personalizados/libros-de-familia/te-amo-abuelo-adulto`.

### 9.5 Gate de aprobación económica

Antes de generar imágenes de un libro, registrar:

```txt
Libro:
Plantillas interiores:
Assets adicionales:
Total imágenes base:
Costo unitario usado:
Costo estimado 1 intento:
Costo con buffer de reintentos:
Costo máximo 2 intentos:
Presupuesto aprobado por el usuario: sí/no
```

No ejecutar generación si el presupuesto no está aprobado.

## 10. Campos de BD/prompts que deben auditarse

Antes de crear o adaptar una variante adulta, auditar estos campos:

| Campo | Qué validar |
|---|---|
| `scene_visual` | Que la escena sea adulta, concreta y coherente con el vínculo |
| `background_details` | Que el fondo no sea infantil salvo que el libro lo justifique |
| `magic_effects` | Que la magia se sienta elegante, simbólica o emocional |
| `lighting_color` | Que la luz apoye el tono del libro |
| `poem_template` | Que el poema rime, use apodo y no hable como niño pequeño |
| `character_roles` | Que los roles sean correctos: hijo adulto, hija adulta, hermanos adultos, familia, etc. |
| `gender_direction` | Que la dirección de género/relación coincida con la variante |

Cambiar parámetros de prompt cuando:

- aparezcan palabras como niño, niña, peque, infante o similares y el libro sea adulto;
- la escena sea demasiado infantil;
- la relación emocional no calce con adultos;
- el poema hable desde una voz infantil;
- el fondo, props o magia contradigan la matriz de tono;
- la tapa o contratapa actual sean demasiado infantiles para la variante adulta.

## 11. El Ralph Wiggum Loop

Definición:

> Partir de una idea ingenua, simple o torpe, y convertirla en una escena adulta emocionalmente clara, visualmente generable y coherente con el libro.

El loop no acepta saltar directo a prompts. Cada plantilla debe pasar por estas capas:

```txt
Idea simple
→ intención emocional
→ interpretación adulta
→ escena concreta
→ poema rimado
→ prompt IA estructurado
→ generación de imagen
→ revisión visual/textual
→ aprobación o ajuste
```

Ejemplo conceptual:

```txt
Idea simple:
“Mi papá arregla todo.”

Intención emocional:
Reconocer que papá sostuvo muchas cosas invisibles durante años.

Interpretación adulta:
Un hijo adulto agradece la calma, la paciencia y la fuerza silenciosa de su padre.

Escena concreta:
Padre e hijo adulto en un taller cálido, rodeados de herramientas antiguas y pequeñas luces mágicas que convierten recuerdos en estrellas.

Poema:
Debe rimar, usar apodo y expresar admiración madura.

Prompt IA:
Debe describir edad adulta, vínculo padre-hijo, entorno, composición, iluminación, estilo y texto con precisión.
```

## 12. Fase 1 — Auditoría del libro infantil existente

Antes de crear la variante adulta, revisar el libro actual completo.

Checklist:

- [ ] Leer nombre, slug, categoría y descripción pública.
- [ ] Revisar página de detalle.
- [ ] Revisar miniatura/card.
- [ ] Revisar fondos e imágenes acompañantes.
- [ ] Revisar dedicatorias disponibles.
- [ ] Revisar prompts de tapa y contratapa.
- [ ] Revisar plantillas interiores activas.
- [ ] Revisar poemas actuales.
- [ ] Revisar campos de prompt en BD.
- [ ] Identificar qué puede reutilizarse y qué debe rehacerse.

Salida esperada:

```txt
Libro:
Qué se conserva:
Qué se rehace:
Riesgos:
Decisiones pendientes:
```

## 13. Fase 2 — Concepto adulto del libro

Definir el concepto adulto antes de escribir poemas o prompts.

Preguntas obligatorias:

- ¿Quién dedica el libro?
- ¿A quién se lo dedica?
- ¿Qué edad/etapa vital representa?
- ¿Qué emoción domina?
- ¿Cuánta magia debe tener?
- ¿Cuánto humor permite?
- ¿Qué cosas nunca debe mostrar?
- ¿Qué tipo de recuerdo o vínculo debe activar?
- ¿Qué diferencia esta variante adulta de la infantil?

Salida esperada:

```txt
Concepto adulto:
Voz emocional:
Tono visual:
Tipo de magia:
Humor permitido:
Límites:
```

## 14. Fase 3 — Diseño de plantillas interiores

Cada plantilla debe tener una razón emocional y visual. No basta con cambiar “niño” por “adulto”.

Para cada plantilla definir:

- intención emocional;
- arquetipo adulto claro;
- situación adulta concreta;
- vínculo representado;
- escena visual;
- variedad espacial y corporal: interior/exterior, de pie/caminando/creando/cruzando/explorando, no solo sentados;
- objeto símbolo;
- elementos mágicos propios;
- paleta y color de título temático;
- fondo;
- composición;
- texto/poema;
- riesgos de generación;
- restricciones negativas necesarias;
- campos de prompt a crear o modificar.

Formato recomendado:

```txt
Plantilla:
Idea Ralph:
Intención adulta:
Arquetipo adulto:
Objeto símbolo:
Paleta/título:
Escena:
Poema:
Prompt visual:
Restricciones negativas:
Variedad espacial/movimiento:
Notas de validación:
```

Regla de diferenciación adulta:

```txt
Adulto ≠ serio genérico.
Adulto ≠ todos sentados en una sala.
Adulto = metáfora visual madura + escena diferenciada + magia sutil + variedad de espacio y movimiento.
```

## 15. Fase 4 — Poemas rimados

Reglas de poema:

- Deben rimar.
- Deben usar castellano neutral.
- No deben usar voseo.
- Deben usar apodo o equivalente contextual aprobado.
- Deben coincidir con la escena.
- Deben respetar el espacio visual disponible.
- No deben sonar infantiles si la variante es adulta.
- No deben forzar diminutivos salvo que el contexto lo pida.
- No deben asumir relación, género o historia que el cliente no eligió.

Regla de apodo:

- Si existe placeholder de nombre en poema adulto, debe resolverse hacia apodo cuando corresponda.
- Si una plantilla colectiva no tiene placeholder pero existe apodo grupal, se debe integrar de forma natural.
- No todas las plantillas deben empezar con `Para {APODO_DESTINATARIO}`; variar ubicación:
  - inicio: `Para {APODO_DESTINATARIO}, ...`
  - medio: `Hoy, {APODO_DESTINATARIO}, ...`
  - cierre: `... a ti, {APODO_DESTINATARIO}.`

## 16. Fase 5 — Prompts IA

Cada prompt adulto debe contener suficiente información para evitar ambigüedad.

Debe especificar:

- destinatario y dedicador;
- edad adulta cuando aplique;
- relación exacta;
- apodo cuando sea relevante para texto impreso;
- escena concreta;
- fondo;
- magia;
- iluminación;
- composición;
- estilo visual;
- texto del poema;
- tipografía o tratamiento de texto esperado;
- color temático del título y ornamentos;
- dimensiones del proyecto;
- formato de salida web esperado.

Reglas:

- No confiar en que el modelo deduzca especie, edad o relación.
- No dejar palabras infantiles heredadas.
- No usar escenas genéricas tipo “familia feliz” sin situación concreta.
- No usar título dorado fijo en todas las plantillas; el color debe responder al arquetipo/escena.
- No mezclar tono adulto con props infantiles si no hay intención clara.
- No cambiar identidad visual de una persona o mascota.
- Si el flujo pide foto del cliente/dedicante y del destinatario, ambas identidades deben ser visibles y relevantes en la imagen final. El cliente no puede quedar de espaldas o como silueta anónima.
- En libros de recuerdo, usar retrato artístico enmarcado grande, álbum abierto protagonista, mural/retrato editorial, cianotipo, carboncillo, acuarela, bordado, vitral u otra técnica definida por la familia visual del libro; prohibido convertirlo en fantasma literal o esconderlo como miniatura.
- Iconografía memorial bajo poema: usar una paloma lineal minimalista. No usar casita/casa con corazón bajo el poema en libros memoriales.
- Familias artísticas memoriales definidas: `Siempre en mi corazón — Abuelo` = `archivo de legado luminoso`; `Siempre en mi corazón — Abuela` = `archivo floral tejido`.
- `Mi Ángel Guardián` requiere otra idea visual: dividir Padre/Madre y trabajar protección simbólica, no recuerdo contemplativo. Evitar repetir retrato de archivo/corazón; usar presencia protectora abstracta, umbrales de luz, mapas, mantos o arquitectura luminosa sin ángel literal kitsch.
- Familias artísticas definidas: `Mi Ángel Guardián — Padre` = `cartografía protectora de luz`; `Mi Ángel Guardián — Madre` = `refugio maternal de luz`.
- Corrección: `Siempre serás parte de mí` = libro de hermanos; familia visual `hermandad en escenas vivas`. No usar retratos artísticos ni tratarlo como mamá/papá/abuelo/abuela.
- En libros sin mascota, prohibir explícitamente mascotas/perros/gatos/aves/animales.
- En libros con mascota, declarar especie, tamaño, pelaje y rol de la mascota en el prompt principal.
- En libros de mascotas, el ornamento bajo poema debe ser una huella de pata minimalista; no casita ni paloma.
- En libros de mascotas, la mascota subida por el cliente debe verse reconocible y protagonista; los humanos deben tener rostro visible si aparecen.
- En `Aventuras Entre Patas`, alternar 1, 2 y 3 personas adultas acompañando a la mascota; límite máximo 3 personas humanas visibles por escena, sin contar la mascota.

## 17. Fase 6 — Generación de imágenes

Antes de generar:

- [ ] Textos aprobados.
- [ ] Prompts aprobados.
- [ ] Presupuesto estimado y aprobado.
- [ ] Cantidad de plantillas confirmada.
- [ ] Assets adicionales confirmados.
- [ ] Dimensiones confirmadas.
- [ ] Formato web confirmado.
- [ ] Ruta/nomenclatura confirmada.
- [ ] Criterios de revisión preparados.

Micro-piloto obligatorio antes de escalar:

- [ ] Preparar 4 plantillas representativas.
- [ ] Confirmar 0 placeholders en prompts finales de generación.
- [ ] Confirmar apodo/nombre variable en los poemas.
- [ ] Confirmar color de título temático por plantilla.
- [ ] Confirmar restricciones negativas específicas del libro.
- [ ] Si se generan miniaturas/assets web, hacer primero una miniatura piloto de catálogo y compararla contra la miniatura infantil + `Papá, Mi Héroe Adulto`; no escalar miniaturas sin aprobación visual en tarjeta real.
- [ ] Si el producto pide fotos del cliente/dedicante y del destinatario/mascota, confirmar que ambas identidades se usan de forma visible. En memorial: dedicante con rostro frontal/tres cuartos; persona fallecida como pieza artística grande/protagonista, con familia visual definida por libro y parecido preservado.
- [ ] Generar contact sheet.
- [ ] Registrar costo real y número de intentos.

Durante generación:

- Generar máximo 2 intentos por plantilla.
- Si ambos fallan, marcar como revisión manual.
- No quemar presupuesto intentando corregir una plantilla mal definida.
- Registrar el motivo de rechazo.

## 18. Fase 7 — Validación visual/textual

Prioridad de aprobación:

1. Identidad preservada.
2. Roles, edad y relación correctos.
3. Coherencia escena-poema.
4. Composición completa.
5. Dimensiones correctas.
6. Tipo de archivo/formato web correcto.
7. Tipografía o texto impreso compatible con el proyecto.
8. Texto suficientemente legible.
9. Estética general.

Checklist por imagen:

- [ ] La imagen respeta identidad.
- [ ] La relación se entiende sin explicación externa.
- [ ] La escena coincide con el poema.
- [ ] El tono coincide con la matriz del libro.
- [ ] No parece infantil si es variante adulta.
- [ ] No introduce elementos oscuros o explícitos.
- [ ] El texto no tiene errores ortográficos.
- [ ] Tildes y ñ se renderizan correctamente.
- [ ] La composición no corta elementos importantes.
- [ ] La dimensión coincide con la requerida.
- [ ] El formato sirve para web.
- [ ] Si es miniatura de catálogo, se lee como mockup de libro físico PixelArt: apaisado, casi frontal, inclinación suave, sin `Adulto` impreso, escala compatible con Papá adulto y sin halos/círculos de recorte.

## 19. Fase 8 — Integración técnica

Solo iniciar esta fase cuando el paquete visual/textual esté aprobado.

Tareas posibles:

- actualizar schema o metadata si corresponde;
- agregar seeds idempotentes;
- agregar variantes adultas;
- conectar plantillas adultas con el flujo de demo;
- ajustar wizard para seleccionar variante;
- ajustar catálogo/navbar;
- ajustar página de detalle;
- ajustar panel admin si necesita distinguir variante;
- actualizar generación de prompts;
- actualizar tests.

Reglas técnicas:

- No modificar la versión infantil existente.
- No hacer cambios destructivos de datos.
- Mantener seeds idempotentes.
- Mantener `schemaPixelart.sql` como fuente de schema.
- Mantener Clean Architecture en backend.
- Mantener dinero en centavos cuando aplique.
- No tocar volúmenes Docker sin confirmación explícita.

## 20. Fase 9 — QA del flujo completo

Validar el flujo como usuario y como admin.

Usuario:

- [ ] Puede distinguir libros infantiles y adultos desde navegación/catálogo.
- [ ] Puede entrar a un libro adulto.
- [ ] La página no muestra copy infantil.
- [ ] Las miniaturas y fondos son coherentes.
- [ ] Puede seleccionar plantillas adultas.
- [ ] Puede solicitar demo.
- [ ] El resumen del pedido muestra datos correctos.

Admin:

- [ ] La orden muestra la variante correcta.
- [ ] Las plantillas internas corresponden a adulto.
- [ ] El prompt generado usa parámetros adultos.
- [ ] La regeneración IA respeta correcciones.
- [ ] Las previsualizaciones permiten revisar composición completa.

Verificación técnica:

- [ ] Tests backend relevantes.
- [ ] Tests frontend si existen para el flujo tocado.
- [ ] Build backend.
- [ ] Build frontend.
- [ ] `git diff --check`.

## 21. Checklist de aceptación por plantilla

Una plantilla adulta se aprueba solo si cumple todo esto:

- [ ] Tiene intención emocional clara.
- [ ] Tiene escena adulta concreta.
- [ ] El poema rima.
- [ ] El poema usa apodo o equivalente aprobado.
- [ ] El poema coincide con la escena.
- [ ] El prompt explicita relación, edad y roles.
- [ ] El fondo no contradice el tono adulto.
- [ ] La magia se siente madura y coherente.
- [ ] La imagen generada respeta identidad.
- [ ] La imagen respeta dimensiones.
- [ ] El texto renderizado no tiene errores.
- [ ] No parece una plantilla infantil reciclada.

## 22. Checklist de aceptación por libro

Un libro adulto se aprueba solo si:

- [ ] Tiene concepto adulto definido.
- [ ] Tiene matriz de tono aplicada.
- [ ] Tiene cantidad de plantillas definida.
- [ ] Tiene direcciones de género/relación completas.
- [ ] Tiene dedicatorias adultas o compatibles.
- [ ] Tiene portada/contratapa compatibles.
- [ ] Tiene miniatura compatible.
- [ ] Tiene página de detalle compatible.
- [ ] Todas las plantillas pasaron revisión.
- [ ] El flujo público funciona.
- [ ] El flujo admin funciona.
- [ ] La versión infantil sigue funcionando intacta.

## 23. Preguntas obligatorias antes de iniciar cada libro

Antes de trabajar un libro, detenerse y responder:

```txt
1. ¿Cuál es el libro?
2. ¿Cuál es la variante adulta exacta?
3. ¿Quién dedica y quién recibe?
4. ¿Qué género/dirección aplica?
5. ¿Cuántas plantillas se crearán?
6. ¿Qué emoción domina?
7. ¿Qué nivel de humor se permite?
8. ¿Qué tipo de magia corresponde?
9. ¿Qué fondos actuales se pueden conservar?
10. ¿Qué fondos deben rehacerse?
11. ¿La portada actual sirve o debe rehacerse?
12. ¿La contratapa actual sirve o debe rehacerse?
13. ¿Las dedicatorias actuales sirven o deben rehacerse?
14. ¿Qué palabras infantiles deben eliminarse?
15. ¿Qué debe evitarse para no romper el tono?
16. ¿Qué assets adicionales necesita este libro?
17. ¿Cuántas imágenes base se presupuestan?
18. ¿Cuál es el costo estimado con 1 intento?
19. ¿Cuál es el costo máximo con 2 intentos?
20. ¿El usuario aprobó el presupuesto?
21. ¿Qué contexto especial debe conocer la IA antes de escribir?
22. ¿Qué criterios de revisión son más importantes para este libro?
```

No iniciar poemas, prompts, imágenes ni código sin estas respuestas.

## 24. Plantilla de trabajo por libro

Usar este bloque dentro del documento o en la tarea correspondiente antes de ejecutar.

```md
## Libro: <nombre>

### Variante adulta

- Dedicador:
- Destinatario:
- Dirección de género/relación:
- Cantidad de plantillas:
- Apodo requerido:

### Presupuesto

- Plantillas interiores:
- Assets adicionales:
- Total imágenes base:
- Costo unitario usado:
- Costo estimado 1 intento:
- Costo con buffer de reintentos:
- Costo máximo 2 intentos:
- Presupuesto aprobado por el usuario:

### Concepto

- Tono adulto:
- Emoción principal:
- Humor permitido:
- Magia:
- Riesgo principal:

### Auditoría del libro existente

| Área | Conservar | Rehacer | Notas |
|---|---|---|---|
| Miniatura |  |  |  |
| Página slug |  |  |  |
| Fondo |  |  |  |
| Dedicatorias |  |  |  |
| Portada |  |  |  |
| Contratapa |  |  |  |
| Plantillas interiores |  |  |  |
| Poemas |  |  |  |
| Prompts BD |  |  |  |

### Plantillas

| # | Idea Ralph | Intención adulta | Escena | Poema aprobado | Prompt aprobado | Imagen aprobada |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |

### Decisiones pendientes

-

### Resultado final

- Textos aprobados:
- Prompts aprobados:
- Presupuesto aprobado:
- Costo real registrado:
- Imágenes aprobadas:
- Código integrado:
- QA aprobado:
```

### Loop result — Aventura Entre Patas Adulto

- Full adult interior set complete locally: 20 WebP templates.
- Storage base: `IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas_Adulto/Plantillas`.
- Local route: `/libros-personalizados/libros-de-mascotas/aventura-entre-patas-adulto`.
- Cost: `$0.1754` pilot + `$0.6532` full-loop additions = `$0.8286`.
- Rule preserved: paw/patita under poem, no casita, no paloma.
- Human composition rule: alternate 1–3 adults, maximum 3 visible humans, pet excluded from limit.


### Loop result — Remaining adult interiors batch

- Full adult interior sets completed locally and uploaded to local MinIO for all remaining approved books.
- Concise visual reviews written as `review-full-adult.md` inside each package.
- Generator: `PromptsPixelArtPlantillas/scripts/generate_adult_remaining_full.py`.
- Model/config: `gpt-image-2`, `quality: medium`, `size: 1600x944`, `moderation: auto`, output `WebP`.
- Local DB sync: completed; adult models have no duplicate `template_preview_key` groups.
- Frontend routes smoke-tested at `200` for all generated adult slugs.

| Adult book | Templates | Storage base | Real cost | Contact sheet |
|---|---:|---|---:|---|
| Mamá, Mi Heroína Adulto | 40 | `IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas` | `$1.5280` | `PromptsPixelArtPlantillas/adult-books/mama-mi-heroina-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Te Amo, Abuelo Adulto | 40 | `IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas` | `$1.5280` | `PromptsPixelArtPlantillas/adult-books/te-amo-abuelo-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Te Amo, Abuela Adulto | 40 | `IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas` | `$1.5280` | `PromptsPixelArtPlantillas/adult-books/te-amo-abuela-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| El Mejor Equipo Adulto | 20 | `IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas` | `$0.7620` | `PromptsPixelArtPlantillas/adult-books/el-mejor-equipo-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Mi Familia Adulto | 20 | `IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas` | `$0.7618` | `PromptsPixelArtPlantillas/adult-books/mi-familia-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Siempre en mi Corazón Abuelo Adulto | 20 | `IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas` | `$0.7660` | `PromptsPixelArtPlantillas/adult-books/siempre-en-mi-corazon-abuelo-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Siempre en mi Corazón Abuela Adulto | 20 | `IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas` | `$0.7660` | `PromptsPixelArtPlantillas/adult-books/siempre-en-mi-corazon-abuela-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Mi Ángel Guardián Padre Adulto | 20 | `IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas` | `$0.7657` | `PromptsPixelArtPlantillas/adult-books/mi-angel-guardian-padre-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Mi Ángel Guardián Madre Adulto | 20 | `IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas` | `$0.7657` | `PromptsPixelArtPlantillas/adult-books/mi-angel-guardian-madre-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| Siempre Serás Parte de Mí Adulto | 40 | `IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas` | `$1.5360` | `PromptsPixelArtPlantillas/adult-books/siempre-seras-parte-de-mi-micro-pilot/review-assets/contact-sheet-full-adult.jpg` |
| **Batch total, excluding Aventura/Papá** | **280** | — | **`$10.7072`** | — |

Preserved visual rules:

- Non-pet adult books explicitly prohibit pets, dogs, cats, birds and animals.
- Memorial books use a minimal line dove under the poem; no house/casita, no halo, no human wings, no literal ghost.
- `Siempre Serás Parte de Mí Adulto` uses two siblings visible in shared scenes, not hidden portraits.
- Adult family/group books avoid default infantile treatment and use mature cinematic scenes.

Technical integration completed in local environment:

- Adult models/slugs are available in local Postgres with expected template counts.
- Seed persistence added via `backend/api/src/database/content/backfill-adult-remaining-content.sql` and `backend/api/src/database/seed.ts`.
- WebP templates are uploaded to local MinIO under isolated adult storage bases.
- Category cards now group child/original and adult/split adult versions with version selectors.
- Detail pages and wizard reuse canonical child/original assets/copy where adult-specific web assets do not exist yet.
- Wizard aliases map adult display names back to canonical dedication/wizard modes, including adult family, sibling and split memorial products.


### Loop result — Adult web assets and thumbnails

- Generated adult-specific web assets for all adult books except `Papá, Mi Héroe Adulto`, which remains intentionally untouched from the previously excluded/separate asset decision.
- Generator: `PromptsPixelArtPlantillas/scripts/generate_adult_web_assets.py`.
- Output format: `WebP`.
- Asset set per book: 1 catalog thumbnail, 1 home thumbnail, 1 detail background and 3 detail carousel/central images.
- Local MinIO upload complete; local DB cover assets linked through `personalized_models.cover_asset_id` and `catalog_books.cover_asset_id`.
- Seed persistence added via `backend/api/src/database/content/backfill-adult-web-assets.sql`.
- Frontend asset maps updated for category cards, related-book thumbnails, detail backgrounds and detail carousel images.
- Memorial web assets were corrected after first pass to remove ghostly/floating-apparition treatment; final versions use framed photos, letters, albums, objects and small dove motifs.

| Adult book | Final assets | Contact sheet |
|---|---:|---|
| Mamá, Mi Heroína Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/mama-mi-heroina-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Te Amo, Abuelo Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/te-amo-abuelo-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Te Amo, Abuela Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/te-amo-abuela-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| El Mejor Equipo Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/el-mejor-equipo-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Mi Familia Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/mi-familia-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Aventura Entre Patas Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/aventuras-entre-patas-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Siempre en mi Corazón Abuelo Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/siempre-en-mi-corazon-abuelo-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Siempre en mi Corazón Abuela Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/siempre-en-mi-corazon-abuela-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Mi Ángel Guardián Padre Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/mi-angel-guardian-padre-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Mi Ángel Guardián Madre Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/mi-angel-guardian-madre-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |
| Siempre Serás Parte de Mí Adulto | 6 | `PromptsPixelArtPlantillas/adult-books/siempre-seras-parte-de-mi-micro-pilot/review-assets/web-assets-contact-sheet.jpg` |

Cost tracking:

- Initial adult web-assets pass: `$2.3738`.
- Memorial correction pass: `$0.8729`.
- **Total spent on adult web assets:** `$3.2467`.

Smoke checks:

- `/libros-personalizados/libros-de-familia/mama-mi-heroina-adulto` references adult background and central WebP assets.
- `/libros-personalizados/libros-de-mascotas/aventura-entre-patas-adulto` references adult background and central WebP assets.
- `/libros-personalizados/libros-de-memorias-familiares/mi-angel-guardian-madre-adulto` references adult background and central WebP assets.


### Loop correction — `Te Amo, Abuelo Adulto` catalog thumbnail

The first adult thumbnail pass is rejected as a visual reference. It generated vertical/editorial book covers and printed `Adulto` on the cover, which breaks the PixelArt thumbnail language.

Approved correction path:

| Step | Result |
|---|---|
| v1 | Corrected to horizontal book, but still looked too upright/standing. |
| v2 | Corrected to reclined product posture, but over-inclined/almost too flat. |
| v3 | Corrected to mild PixelArt recline and approved in category-card direction. |
| size match | Adjusted bbox to match `Papá, Mi Héroe Adulto`: `1294x901`, margins `8 / 12 / 8 / 13`. |
| clean crop | Removed the lower circular/elliptical crop artifact by cropping to the physical book bounds and restoring Papa-sized bbox. |

Final local file:

`PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/corrected-v9-physical-book-crop/TeAmoAbuelo_Adulto_Miniatura_Catalog_Candidate_v9_physical_book_crop.webp`

Comparison sheet:

`PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/corrected-v9-physical-book-crop/compare_papa_abuelo_before_after_v9_physical_book_crop.jpg`

Current local MinIO key:

`IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp`

Generated-candidate cost: `$0.1611` (`v1` + `v2` + `v3`). The size/crop fixes were postprocess only.

Training rule added to future loops: once the scene is visually approved, treat posture, bbox and clean alpha crop as postprocessable product-work, not as a reason to restart concept generation.

Home thumbnail follow-up:

- Final local Home preview: `PromptsPixelArtPlantillas/output/Te Amo, Abuelo Adulto Assets/thumbnail-candidates/home-postprocess-v2-light-shadow/TeAmoAbuelo_Adulto_Miniatura_Home_Postprocess_v2_light_shadow.webp`.
- Current local MinIO Home key: `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura_Home.webp`.
- Method: no-IA postprocess from the accepted catalog thumbnail, rotated `+6°` into the Home pose on `1190x1322`.
- Verified served metrics: bbox `1109x833`, margins `44 / 211 / 37 / 278`.
- Home card switch added in `frontend/web/src/app/(public)/page.tsx` through `versions`, matching the existing `Papá, mi héroe` interaction.


### Loop correction — remaining adult catalog/Home thumbnails

After `Te Amo, Abuelo Adulto` validated the thumbnail contract, the remaining adult thumbnails were corrected as a batch while preserving `Papá, Mi Héroe Adulto` untouched.

- Batch run: `adult-thumbnails-corrected-v1`.
- Scope: 10 adult books (`Mamá`, `Te Amo Abuela`, `Mi Familia`, `El Mejor Equipo`, `Aventura Entre Patas`, `Siempre en mi Corazón` Abuelo/Abuela, `Mi Ángel Guardián` Padre/Madre, `Siempre Serás Parte de Mí`).
- Catalog generation: one OpenAI image generation per book with the PixelArt physical-book contract.
- Home thumbnails: deterministic postprocess from each approved catalog image; no second Home concept generation.
- Catalog output rule: `1310x926`, bbox `1294x901`, margins around `8 / 12 / 8 / 13`.
- Home output rule: `1190x1322`, rotated about `+6°`, bbox around `~1110x830`, light shadow only.
- Local review sheets:
  - `PromptsPixelArtPlantillas/output/_adult_thumbnail_batch_corrected_v1/review-assets/corrected-adult-catalog-thumbnails-contact-sheet.jpg`
  - `PromptsPixelArtPlantillas/output/_adult_thumbnail_batch_corrected_v1/review-assets/corrected-adult-home-thumbnails-contact-sheet.jpg`
- MinIO: replaced the adult catalog/Home thumbnail keys after backing up previous objects under `IA_Books/IaBooks_Miniaturas/_backups/`.
- Cost: `$0.5359` for 10 catalog generations. Home derivatives cost `$0` because they were postprocess-only.
- UI follow-up: Home cards now use `versions` switches for all adult-capable base books, and the personalized-books navbar lists available adult versions instead of leaving them in `Próximamente`.


### Loop correction — `Papá, Mi Héroe Adulto` thumbnail v4

The user explicitly authorized improving the original `Papá, Mi Héroe Adulto` thumbnail after the rest of the adult thumbnails had established the final card contract.

- Scope: only `Papá, Mi Héroe Adulto` catalog/Home thumbnails.
- Final local directory: `PromptsPixelArtPlantillas/output/Papá, Mi Héroe Adulto Assets/thumbnail-candidates/corrected-v4-card-contract/`.
- Current MinIO catalog key: `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura.png`.
- Current MinIO Home key: `IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura_Home.png`.
- Keys stayed `.png` to preserve current frontend/storage references.
- Catalog metrics: `1310x926`, bbox `1294x901`, margins `8 / 12 / 8 / 13`.
- Home metrics: `1190x1322`, bbox `1103x833`, margins `50 / 211 / 37 / 278`.
- Cost: `$0.0533`.
- Verification: both `/assets/...PapaMiHeroe_Adulto...png` URLs returned `200` locally after upload.
