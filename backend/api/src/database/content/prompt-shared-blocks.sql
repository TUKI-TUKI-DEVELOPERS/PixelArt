INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('imagen_base', $psb1$Fotografía hiperrealista en formato horizontal apaisado, plana y a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la obra final que se imprimirá en las páginas de un libro: NO es la foto de un libro ni de ningún objeto. Prohibido mostrar libros, páginas, lomo, pliegues, curvatura de papel, sombras de encuadernación, mesas, marcos, bordes o cualquier fondo exterior a la escena.$psb1$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('identidad_humano', $psb2$Usá cada imagen de referencia adjunta para que el personaje correspondiente sea la persona real de esa foto — mantené su parecido real (rasgos, edad, tono de piel) e integralo de forma natural y fotorrealista con la iluminación, el enfoque y el estilo del resto de la escena, como si hubiera sido fotografiado ahí mismo. La edad aparente de cada personaje es la edad real de su foto de referencia, sea niño, adolescente o adulto, sin importar lo que sugiera el contexto de la escena. El vestuario y los accesorios de cada personaje son EXCLUSIVAMENTE los descritos en esta escena (no lo que tenga puesto en su foto de referencia), excepto los lentes de armazón (no de sol), que sí se conservan si la persona los usa habitualmente.$psb2$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('identidad_mascota', $psb3$Usá la imagen de referencia de la mascota para que sea el mismo animal real de esa foto — mantené su pelaje (color, patrón, manchas), color de ojos y rasgos distintivos reales, e integralo de forma natural y fotorrealista con la iluminación, el enfoque y el estilo del resto de la escena, como si hubiera sido fotografiado ahí mismo.$psb3$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('composicion_reglas', $psb4$- La imagen se imprimirá dividida en dos mitades (izquierda y derecha) mediante corte digital posterior, NO dibujado en la imagen. La escena, la luz y el ambiente fluyen de forma continua entre ambas mitades como una sola fotografía.
- Franja central prohibida: en el 10% central del ancho del lienzo NO debe haber rostros, ojos, manos ni texto. Solo escena y ambiente (paisaje, cielo, luz, telas, vegetación) pueden cruzar esa franja.
- Margen de seguridad: los rostros deben estar a más de un 8% de cada borde del lienzo. Los bloques de título y poema deben estar contenidos holgadamente dentro de cada mitad, a más de un 12% de los bordes laterales del lienzo y a más de un 8% de los bordes superior e inferior.
- Composición asimétrica: sujetos ligeramente descentrados. Prohibidas las composiciones simétricas o especulares (elementos duplicados en espejo, columnas idénticas a ambos lados, sujeto exactamente en el centro).$psb4$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('diseno_editorial_wrapper', $psb5$Mitad izquierda del lienzo
Título en tipografía de la familia Montserrat de alta gama, integrado como impresión elegante con ligero relieve sobre la fotografía, dentro del margen de seguridad y sin cruzar la franja central.
Título: {TITULO}

Mitad derecha del lienzo
Poema integrado en tipografía Montserrat moderna, limpia y perfectamente legible, ubicado sobre una zona visualmente tranquila de la fotografía, sin tocar rostros ni la franja central. Debajo del poema, un pequeño separador decorativo: una línea fina horizontal con un corazón pequeño centrado en el medio, en el mismo tono del título.

Poema (Texto final impreso verbatim en el libro)
"{POEMA}"$psb5$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('detalles_tecnicos', $psb6$Hiperrealismo extremo, profundidad de campo cinematográfica. Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin cajas de texto, sin fondos blancos detrás del texto, sin marcos. La fotografía debe cubrir el 100% del lienzo, de borde a borde, como una única imagen plana y continua — sin lomo, sin pliegue, sin curvatura de papel, sin ningún elemento que sugiera un libro físico.$psb6$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('composicion_reglas_paginas', $psb7$ - Esta imagen es UNA PÁGINA COMPLETA de un libro apaisado (más ancha que alta) — no se recorta ni se divide después, ocupa el 100% del lienzo tal cual se genera.
 - Esta página es independiente de las demás páginas del mismo libro — no la repitas ni la conviertas en una copia casi idéntica de otra página con el mismo tono emocional. Buscá un momento, pose y encuadre DISTINTOS, manteniendo el mismo estilo visual, personajes y ambiente general de la escena descripta.
 - Margen de seguridad: los rostros deben estar a más de un 8% de cada borde del lienzo. Los bloques de título y poema deben estar contenidos holgadamente dentro de la página, a más de un 12% de los bordes laterales y a más de un 8% de los bordes superior e inferior.
 - Composición asimétrica: sujetos ligeramente descentrados. Prohibidas las composiciones simétricas o especulares (elementos duplicados en espejo, columnas idénticas a ambos lados, sujeto exactamente en el centro).$psb7$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('diseno_editorial_pagina_a', $psb8$Página izquierda de una apertura de libro de dos páginas.
Título en tipografía de la familia Montserrat de alta gama, integrado como impresión elegante con ligero relieve sobre la fotografía, dentro del margen de seguridad.
Título: {TITULO}$psb8$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('diseno_editorial_pagina_b', $psb9$Página derecha de la misma apertura de libro — un momento distinto de la misma historia, con el mismo tono emocional que la página izquierda, pero NO la misma pose ni el mismo encuadre.
Poema integrado en tipografía Montserrat moderna, limpia y perfectamente legible, ubicado sobre una zona visualmente tranquila de la fotografía, sin tocar rostros. Debajo del poema, un pequeño separador decorativo: una línea fina horizontal con un corazón pequeño centrado en el medio, en el mismo tono del título.

Poema (Texto final impreso verbatim en el libro)
"{POEMA}"$psb9$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Tapa y contratapa (portada/contraportada impresas con IA) — portado
-- verbatim del piloto validado en PromptsPixelArtPlantillas/TAPA_CONTRATAPA_PROMOCION.md.
-- {NOMBRE_A}/{NOMBRE_B} del piloto se renombraron a {NOMBRE_DESTINATARIO}/
-- {NOMBRE_DEDICANTE} para reusar fillNamePlaceholders() sin cambios.
INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('tapa_imagen_base', $tcp1$Fotografía hiperrealista plana, a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la tapa final de un libro de tapa dura que se imprimirá directamente: NO es el render de un objeto-libro, NO es una maqueta 3D, NO debe mostrarse el libro como objeto (nada de tapas cerradas, lomo, cantos, curvatura de papel, sombra de contacto, fondo blanco de estudio ni mesa). Es una única fotografía continua tipo retrato de estudio cálido, como una portada de revista editorial de alta gama.$tcp1$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('tapa_proporcion_conexion', $tcp2$Aunque las fotos de referencia puedan haber sido tomadas a distancias o ángulos distintos, en la escena final ambos deben verse fotografiados juntos, en el mismo momento, a la MISMA distancia de cámara — ninguno de los dos debe verse más grande, más pequeño, más cerca o más lejos que el otro. Sus alturas relativas y la proporción de sus cuerpos (cabeza, hombros, brazos, manos) deben ser anatómicamente coherentes entre sí y con la escena, sin distorsiones. Tiene que existir un punto de contacto físico real y natural entre ellos (un brazo rodeando el hombro o la cintura, manos entrelazadas o apoyadas, mejillas o frentes tocándose) — nunca dos personas flotando una junto a la otra sin tocarse. Ambos rostros deben compartir exactamente la misma profundidad de campo, el mismo nivel de enfoque/nitidez y la misma fuente e intensidad de luz de la escena.$tcp2$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('tapa_composicion_reglas', $tcp3$- Composición asimétrica: la pareja ligeramente descentrada. Prohibidas las composiciones perfectamente simétricas o especulares.
- Margen de seguridad: rostros y bloques de texto a más de un 10% de cada borde del lienzo (se recortará al imprimir).
- {NOMBRE_DESTINATARIO} y {NOMBRE_DEDICANTE} deben ocupar una porción generosa y equilibrada del lienzo, con la misma escala aparente entre ambos.$tcp3$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('tapa_diseno_editorial_wrapper', $tcp4$Franja superior: título en caligrafía romántica fluida, conectada entre letras, con variación de grosor entre trazos finos y gruesos, remates ornamentados, acabado dorado con relieve sutil. Centrado.
Título: "{TITULO}"

Franja inferior, debajo de la pareja: mismo estilo caligráfico, tamaño menor, centrado.
Subtítulo: "{NOMBRE_DESTINATARIO} & {NOMBRE_DEDICANTE}"$tcp4$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('tapa_detalles_tecnicos', $tcp5$Hiperrealismo extremo, coherencia total con los rostros de las imágenes de referencia. Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin mockup de libro, sin tapas, sin cantos, sin fondo blanco ni mesa. Estética editorial premium de photobook de alta gama.$tcp5$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('contratapa_imagen_base', $tcp6$Fotografía hiperrealista plana, a sangre completa, que ocupa el 100% del lienzo de borde a borde. Esta imagen ES la contratapa final de un libro de tapa dura que se imprimirá directamente: NO es el render de un objeto-libro, NO es una maqueta 3D. Es un fondo de estudio ambiental puro, sin personas ni personajes de ningún tipo — el texto editorial es el protagonista absoluto de esta pieza.$tcp6$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

-- Fondo/efectos/iluminación de contratapa: por ahora fijo (corazones en
-- bokeh, piloteado solo con libros de Amor). Al escalar a otras categorías
-- (Fase D), conviene parametrizar el motivo decorativo igual que ya hace
-- resolveSeparator() en build-generation-prompt.ts para las páginas
-- interiores (casita/huella/paloma según categoría) en vez de agregar un
-- campo nuevo por libro.
INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('contratapa_fondo_efectos', $tcp7$Fondo de estudio cálido en degradado de tonos marrón dorado a rosa/coral profundo, sin arquitectura ni elementos exteriores.

Efectos Mágicos
El fondo entero está lleno de corazones suaves en bokeh, de distintos tamaños y profundidades, en tonos dorado cálido y rosa pastel, brillando con un resplandor difuso tipo luz de vela, cubriendo todo el encuadre de borde a borde de forma pareja y generosa.

[ILUMINACIÓN Y COLOR]
Iluminación cálida de estudio, tonos marrón dorado, rosa y coral profundo.$tcp7$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('contratapa_composicion_reglas', $tcp8$- Sin sujetos, sin siluetas humanas, sin animales.
- Prohibidas las composiciones perfectamente simétricas.
- Reservar el 15-18% superior del lienzo, centrado horizontalmente, con bokeh más suave y difuminado (sin corazones grandes ni nítidos ahí) — esa franja queda para un isotipo de marca que se agrega en posproducción. NO dibujar ningún logotipo, texto de marca ni ícono ahí, dejar solo fondo liso.
- El bloque de texto (más abajo, centrado) debe tener bokeh suave detrás para leerse con claridad total.$tcp8$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('contratapa_diseno_editorial_wrapper', $tcp9$Centrado, debajo de la franja reservada para el isotipo, con jerarquía tipográfica marcada y buen aire entre líneas:

Línea 1 (tagline — grande, protagonista, serif editorial de alta gama, TODO EN MAYÚSCULAS, tinta oscura cálida):
"{TAGLINE}"

Línea 2 (nombres de los protagonistas — mediano, caligrafía dorada fluida y elegante con degradado sutil de dorado cálido a dorado claro, relieve suave tipo grabado en lámina de oro dándole profundidad y cuerpo, pequeñas florituras delicadas en las letras iniciales mayúsculas — NUNCA un dorado plano ni una tipografía de trazo fino sin volumen, tiene que sentirse premium y hecha a mano):
"{NOMBRE_DESTINATARIO} & {NOMBRE_DEDICANTE}"

Línea 3 (hashtag — mediano, mismo tratamiento de caligrafía dorada con relieve que la línea de nombres, un poco más liviano):
"{HASHTAG}"

Línea 4 (cierre — la más pequeña, serif liviana):
"{LINEA_CIERRE}"

Separación generosa entre las cuatro líneas, todo centrado.$tcp9$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();

INSERT INTO prompt_shared_blocks (block_key, content) VALUES ('contratapa_detalles_tecnicos', $tcp10$Sin logotipos, marcas de agua, emojis ni elementos de plataformas de IA. Sin mockup de libro, sin tapas, sin fondo blanco ni mesa. Estética editorial premium de photobook de alta gama.$tcp10$)
  ON CONFLICT (block_key) DO UPDATE SET content = EXCLUDED.content, updated_at = now();
