-- fix-tapa-contratapa-logo-zone.sql — reserva explícita de la zona donde se
-- pega el logo de PixelArt (compositeLogo, por código, nunca por IA).
--
-- TAPA: el logo va esquina inferior derecha (18% ancho, margen 3%,
-- composite-logo.ts). Sin esta regla, la IA podía dejar pelo/objetos justo
-- ahí — confirmado en vivo: el pelo de la hija tapaba la "L" de PixelArt en
-- "Mamá, Mi Heroína Adulto". Afecta a los 12 libros adultos (bloque
-- compartido, no es un fix por libro).
--
-- CONTRATAPA: el logo se movió de arriba-centro a pegado debajo del bloque
-- de texto / línea de cierre (re-validado con el cliente 2026-10-06,
-- composite-logo.ts BACK_COVER_TOP_RATIO 0.12 -> 0.76) — la franja reservada
-- tiene que moverse con él, de la parte superior a la inferior del lienzo.
--
-- Idempotente: solo aplica el REPLACE si la frase vieja todavía está
-- presente; si ya se corrió antes, no encuentra el texto original y no hace
-- nada (a diferencia de los backfill-*.sql con UPDATE incondicional, acá sí
-- importa no duplicar la frase si se corre dos veces).

UPDATE prompt_shared_blocks
SET content = content || E'\n- Reservar la esquina inferior derecha del lienzo (18% del ancho, margen del 3% desde los bordes) completamente libre de personas, cabello, objetos o texto — solo fondo o bokeh suave ahí, sin nada nítido. Esa zona se usa después para un isotipo de marca que se agrega en posproducción. NO dibujar ningún logotipo, texto de marca ni ícono ahí, dejar solo fondo.',
    updated_at = now()
WHERE block_key = 'tapa_composicion_reglas'
  AND content NOT LIKE '%esquina inferior derecha%';

UPDATE prompt_shared_blocks
SET content = REPLACE(
  content,
  '- Reservar el 15-18% superior del lienzo, centrado horizontalmente, con bokeh más suave y difuminado (sin corazones grandes ni nítidos ahí) — esa franja queda para un isotipo de marca que se agrega en posproducción. NO dibujar ningún logotipo, texto de marca ni ícono ahí, dejar solo fondo liso.',
  '- Reservar el 15-20% inferior del lienzo, centrado horizontalmente, justo debajo de donde va el bloque de texto, con bokeh más suave y difuminado ahí — esa franja queda para un isotipo de marca que se agrega en posproducción. NO dibujar ningún logotipo, texto de marca ni ícono ahí, dejar solo fondo liso.'
),
updated_at = now()
WHERE block_key = 'contratapa_composicion_reglas'
  AND content LIKE '%15-18% superior%';
