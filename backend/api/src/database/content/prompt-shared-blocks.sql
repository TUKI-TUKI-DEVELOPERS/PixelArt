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
