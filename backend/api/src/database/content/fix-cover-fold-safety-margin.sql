-- fix-cover-fold-safety-margin.sql — la imprenta reportó (prueba física
-- impresa, "Mamá, Mi Heroína Adulto") que el título, el cabello/hombros de
-- las personas y los nombres llegaban hasta el borde del lienzo en tapa y
-- contratapa. El margen de 10% ya existente en tapa_composicion_reglas solo
-- cubre "rostros y bloques de texto" — no cabello, cuerpo ni caligrafía del
-- título/subtítulo — y contratapa_composicion_reglas no tenía NINGÚN margen.
--
-- La tapa dura se imprime a 29x20.5cm (custom-book-pdf.service.ts) sobre un
-- lienzo de 1456x1024px — 1cm real = ~3.45% del ancho / ~4.88% del alto. La
-- imprenta pidió reservar 1cm en los 4 bordes porque ese material se dobla
-- físicamente sobre el cartón al encuadernar (turn-in), no es solo sangrado
-- de corte. Se usa 5% parejo en los 4 bordes — por encima de 1cm en ambos
-- ejes, y un solo número es más fácil de seguir para el modelo de imagen que
-- dos valores distintos por eje.
--
-- Las plantillas interiores (composicion_reglas / composicion_reglas_paginas)
-- ya tenían 8%/12% — más que suficiente en magnitud — pero con el mismo
-- problema de alcance (solo rostros/texto), así que se amplía el alcance ahí
-- también, sin tocar los porcentajes ya validados.
--
-- Idempotente: cada UPDATE solo aplica si la frase nueva todavía no está
-- presente, así correr el seed de nuevo no duplica las líneas.

UPDATE prompt_shared_blocks
SET content = content || E'\n- Margen de doblez de encuadernado: ningún elemento (cabello, hombros, ropa, manos, caligrafía del título o subtítulo, objetos) puede entrar en el 5% del lienzo más cercano a ninguno de los 4 bordes — esa franja se dobla físicamente sobre el cartón al encuadernar la tapa dura. Solo fondo o bokeh puede llegar hasta el borde.',
    updated_at = now()
WHERE block_key = 'tapa_composicion_reglas'
  AND content NOT LIKE '%Margen de doblez de encuadernado%';

-- El logo de tapa bajó de 18%/margen 3% a 9%/margen 5% (composite-logo.ts,
-- mismo cambio de hoy) — la zona reservada en el prompt se queda en sincro.
UPDATE prompt_shared_blocks
SET content = REPLACE(
  content,
  'Reservar la esquina inferior derecha del lienzo (18% del ancho, margen del 3% desde los bordes) completamente libre de personas, cabello, objetos o texto',
  'Reservar la esquina inferior derecha del lienzo (9% del ancho, margen del 5% desde los bordes) completamente libre de personas, cabello, objetos o texto'
),
updated_at = now()
WHERE block_key = 'tapa_composicion_reglas'
  AND content LIKE '%18% del ancho, margen del 3% desde los bordes%';

-- Re-ajuste posterior: el logo de tapa subió de 9% a 10.35% del ancho (+15%
-- a pedido del cliente tras verlo impreso, composite-logo.ts) — sincroniza la
-- zona reservada. Corre DESPUÉS del UPDATE de arriba para cubrir tanto bases
-- frescas (que acaban de quedar en 9%) como las ya migradas. Idempotente.
UPDATE prompt_shared_blocks
SET content = REPLACE(
  content,
  'Reservar la esquina inferior derecha del lienzo (9% del ancho, margen del 5% desde los bordes) completamente libre de personas, cabello, objetos o texto',
  'Reservar la esquina inferior derecha del lienzo (10.35% del ancho, margen del 5% desde los bordes) completamente libre de personas, cabello, objetos o texto'
),
updated_at = now()
WHERE block_key = 'tapa_composicion_reglas'
  AND content LIKE '%9% del ancho, margen del 5% desde los bordes%';

UPDATE prompt_shared_blocks
SET content = content || E'\n- Margen de doblez de encuadernado: ningún elemento (tagline, nombres, hashtag, cualquier detalle de fondo con textura marcada) puede entrar en el 5% del lienzo más cercano a ninguno de los 4 bordes — esa franja se dobla físicamente sobre el cartón al encuadernar la tapa dura. Solo fondo liso o bokeh puede llegar hasta el borde.',
    updated_at = now()
WHERE block_key = 'contratapa_composicion_reglas'
  AND content NOT LIKE '%Margen de doblez de encuadernado%';

-- Refuerzo 2026-10-12: la regla de arriba (5%) no bastó para el TÍTULO —
-- prueba real con "10 Razones por las que te amo" mostró los remates/rizos
-- de la caligrafía tocando el borde superior, aunque el cabello y los
-- hombros de las personas sí respetaron el margen general. Los corazones
-- decorativos de fondo están bien donde están (ya los deja libres "solo
-- fondo o bokeh puede llegar hasta el borde" de la regla de arriba) — el
-- problema es específicamente que el modelo trata los remates/rizos de la
-- letra como algo aparte del "texto", no como parte física de la letra.
-- Regla separada y más estricta (10%, ~2cm verticales) solo para la letra
-- del título/subtítulo, explícita sobre que remates y rizos SON parte de la
-- letra. Subido de 8% a 10% el 2026-10-12 para probar un margen visual más
-- amplio (8% ya había dado un resultado real de ~1cm, se prueba 2cm).
UPDATE prompt_shared_blocks
SET content = content || E'\n- Margen específico para la letra del título y el subtítulo (más estricto que el margen general): TODA la caligrafía — incluyendo remates, rizos, trazos ascendentes/descendentes y cualquier floritura que sea parte física de las propias letras — debe quedar dentro del 10% superior del lienzo (título) y del 10% inferior (subtítulo), sin tocar ese margen en ningún punto. Esto NO aplica a la decoración ambiental (corazones, bokeh de fondo), que sí puede llegar hasta el borde con normalidad.',
    updated_at = now()
WHERE block_key = 'tapa_composicion_reglas'
  AND content NOT LIKE '%Margen específico para la letra del título%';

UPDATE prompt_shared_blocks
SET content = content || E'\n- Margen específico para la letra del tagline/nombres/hashtag (más estricto que el margen general): TODA la caligrafía — incluyendo remates, rizos, trazos ascendentes/descendentes y cualquier floritura que sea parte física de las propias letras — debe quedar dentro del 10% del lienzo más cercano a los bordes superior e inferior, sin tocar ese margen en ningún punto. Esto NO aplica a la decoración ambiental de fondo, que sí puede llegar hasta el borde con normalidad.',
    updated_at = now()
WHERE block_key = 'contratapa_composicion_reglas'
  AND content NOT LIKE '%Margen específico para la letra del tagline%';

-- Mismo refuerzo, repetido justo donde se define la posición del título —
-- las instrucciones repetidas cerca de donde se usan se respetan mejor que
-- una sola mención genérica en la lista de reglas de composición.
UPDATE prompt_shared_blocks
SET content = REPLACE(
  content,
  'Franja superior: título en caligrafía romántica fluida, conectada entre letras, con variación de grosor entre trazos finos y gruesos, remates ornamentados, acabado dorado con relieve sutil. Centrado.',
  'Franja superior: título en caligrafía romántica fluida, conectada entre letras, con variación de grosor entre trazos finos y gruesos, remates ornamentados, acabado dorado con relieve sutil. Centrado, con TODA la letra (remates y rizos incluidos) contenida dentro del 10% superior del lienzo, sin tocarlo.'
),
updated_at = now()
WHERE block_key = 'tapa_diseno_editorial_wrapper'
  AND content LIKE '%remates ornamentados, acabado dorado con relieve sutil. Centrado.%';

UPDATE prompt_shared_blocks
SET content = REPLACE(
  content,
  'Franja inferior, debajo de la pareja: mismo estilo caligráfico, tamaño menor, centrado.',
  'Franja inferior, debajo de la pareja: mismo estilo caligráfico, tamaño menor, centrado, con TODA la letra (remates y rizos incluidos) contenida dentro del 10% inferior del lienzo, sin tocarlo.'
),
updated_at = now()
WHERE block_key = 'tapa_diseno_editorial_wrapper'
  AND content LIKE '%Franja inferior, debajo de la pareja: mismo estilo caligráfico, tamaño menor, centrado.%';

UPDATE prompt_shared_blocks
SET content = content || E'\n- Esa misma franja de seguridad (8% superior/inferior, 12% de los bordes laterales) aplica también a cualquier otro elemento visual — cabello, hombros, ropa, objetos, el separador decorativo — no solo a rostros y bloques de título/poema: esa zona se recorta o se dobla al encuadernar.',
    updated_at = now()
WHERE block_key = 'composicion_reglas'
  AND content NOT LIKE '%aplica también a cualquier otro elemento visual%';

UPDATE prompt_shared_blocks
SET content = content || E'\n- Esa misma franja de seguridad (8% superior/inferior, 12% de los bordes laterales) aplica también a cualquier otro elemento visual — cabello, hombros, ropa, objetos, el separador decorativo — no solo a rostros y bloques de título/poema: esa zona se recorta o se dobla al encuadernar.',
    updated_at = now()
WHERE block_key = 'composicion_reglas_paginas'
  AND content NOT LIKE '%aplica también a cualquier otro elemento visual%';

-- Nota 2026-10-12: se probó generar la tapa más grande y recortar al centro
-- por código (garantía dura, mismo principio que el logo) + pedirle a la IA
-- "aire de sobra" para que el recorte no cortara letras. Se revirtió: la IA
-- siguió llenando el lienzo más grande de borde a borde igual que antes, y
-- el recorte terminó cortando el título y la firma a la mitad — peor que el
-- problema original. El margen de 10% de arriba queda como la versión más
-- segura probada (dio ~1cm real en la prueba con "10 Razones por las que te
-- amo"). Una garantía dura de verdad requeriría sacar el título/subtítulo de
-- la generación de IA y componerlo por código, como el logo — no implementado.
