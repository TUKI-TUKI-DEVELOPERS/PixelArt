-- Remaining adult custom-book models/templates.
-- Generated from the validated local DB after the full adult interior loop.
-- Idempotent: updates existing rows by (model_id, template_preview_key), inserts missing rows.


-- El Mejor Equipo Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'El Mejor Equipo Adulto', 'CUSTOM_BOOK', 'Versión adulta de El Mejor Equipo Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'El Mejor Equipo Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de El Mejor Equipo Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'El Mejor Equipo Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'El Mejor Equipo Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'El Mejor Equipo Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Familia'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'El Mejor Equipo Adulto', 'el-mejor-equipo-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Familia' AND m.name = 'El Mejor Equipo Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'La estrategia de nuestras locuras', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_01_la_estrategia_de_nuestras_locuras.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (2, 'El pacto de llegar juntos', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_02_el_pacto_de_llegar_juntos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (3, 'La banda sonora de nuestras batallas', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_03_la_banda_sonora_de_nuestras_batallas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (4, 'El idioma privado de las bromas', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_04_el_idioma_privado_de_las_bromas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (5, 'La ruta que inventamos sin mapa', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_05_la_ruta_que_inventamos_sin_mapa.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (6, 'El archivo de nuestras victorias pequeñas', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_06_el_archivo_de_nuestras_victorias_pequenas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (7, 'La mesa de los planes imposibles', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_07_la_mesa_de_los_planes_imposibles.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (8, 'El código secreto de la confianza', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_08_el_codigo_secreto_de_la_confianza.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (9, 'La noche en que supimos cubrirnos', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_09_la_noche_en_que_supimos_cubrirnos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (10, 'El taller de las soluciones raras', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_10_el_taller_de_las_soluciones_raras.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (11, 'La patrulla de los días difíciles', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_11_la_patrulla_de_los_dias_dificiles.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (12, 'El refugio donde nadie actúa solo', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_12_el_refugio_donde_nadie_actua_solo.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (13, 'La brújula de los hermanos', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_13_la_brujula_de_los_hermanos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (14, 'El puente después de cada pelea', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_14_el_puente_despues_de_cada_pelea.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (15, 'La celebración de seguir siendo equipo', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_15_la_celebracion_de_seguir_siendo_equipo.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (16, 'El mapa de nuestras diferencias', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_16_el_mapa_de_nuestras_diferencias.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (17, 'La carrera donde nadie queda atrás', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_17_la_carrera_donde_nadie_queda_atras.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (18, 'El laboratorio de la complicidad', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_18_el_laboratorio_de_la_complicidad.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (19, 'La promesa de estar cerca', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_19_la_promesa_de_estar_cerca.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE),
    (20, 'El mejor equipo todavía en marcha', 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo_adulto/Plantillas/Plantilla_20_el_mejor_equipo_todavia_en_marcha.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos o tres hermanos adultos con rostros visibles, en acción compartida y complicidad madura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Hay equipos que no firma el azar,
se hacen con risas, peleas y lealtad.
Si el mundo se pone difícil de leer,
juntos encontramos qué hacer.
{APODO_DESTINATARIO}, hermana, misma dirección,
distintas maneras, un solo corazón.
Y aunque cambie la vida alrededor,
nuestro equipo conserva su valor.', '[{"key": "hermanos", "count": 3}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Mi Familia Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Mi Familia Adulto', 'CUSTOM_BOOK', 'Versión adulta de Mi Familia Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Mi Familia Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Mi Familia Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Mi Familia Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Mi Familia Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Mi Familia Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Familia'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Mi Familia Adulto', 'la-familia-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Familia' AND m.name = 'Mi Familia Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'La casa de los mil regresos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_01_la_casa_de_los_mil_regresos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (2, 'El laboratorio de nuestras mezclas', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_02_el_laboratorio_de_nuestras_mezclas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (3, 'La mesa donde todos cabemos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_03_la_mesa_donde_todos_cabemos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (4, 'La ruta de las voces mezcladas', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_04_la_ruta_de_las_voces_mezcladas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (5, 'El archivo de las sobremesas', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_05_el_archivo_de_las_sobremesas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (6, 'La coreografía de los días comunes', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_06_la_coreografia_de_los_dias_comunes.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (7, 'La cocina donde empieza la historia', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_07_la_cocina_donde_empieza_la_historia.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (8, 'El mapa de nuestras mudanzas', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_08_el_mapa_de_nuestras_mudanzas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (9, 'La sala de los planes pendientes', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_09_la_sala_de_los_planes_pendientes.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (10, 'El jardín de las generaciones', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_10_el_jardin_de_las_generaciones.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (11, 'La noche de las historias repetidas', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_11_la_noche_de_las_historias_repetidas.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (12, 'El puente de los apellidos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_12_el_puente_de_los_apellidos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (13, 'La estación de los abrazos largos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_13_la_estacion_de_los_abrazos_largos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (14, 'La biblioteca de fotos familiares', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_14_la_biblioteca_de_fotos_familiares.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (15, 'El taller de arreglarlo juntos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_15_el_taller_de_arreglarlo_juntos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (16, 'La terraza de los domingos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_16_la_terraza_de_los_domingos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (17, 'El viaje donde cabemos todos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_17_el_viaje_donde_cabemos_todos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (18, 'La luz que prende cada regreso', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_18_la_luz_que_prende_cada_regreso.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (19, 'El álbum de lo que somos', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_19_el_album_de_lo_que_somos.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE),
    (20, 'La familia que siempre encuentra camino', 'IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_20_la_familia_que_siempre_encuentra_camino.webp', NULL, 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.', '[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Mamá, Mi Heroína Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Mamá, Mi Heroína Adulto', 'CUSTOM_BOOK', 'Versión adulta de Mamá, Mi Heroína Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Mamá, Mi Heroína Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Mamá, Mi Heroína Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Mamá, Mi Heroína Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Mamá, Mi Heroína Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Mamá, Mi Heroína Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Familia'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Mamá, Mi Heroína Adulto', 'mama-mi-heroina-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Familia' AND m.name = 'Mamá, Mi Heroína Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'La calma que me enseñó a respirar De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'El mapa de tus consejos De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'La mesa donde siempre vuelvo De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'Tus manos hicieron hogar De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La fuerza que no hacía ruido De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El abrigo de los días difíciles De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La luz de las pequeñas costumbres De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente hacia mi propio camino De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La paciencia que me dio raíces De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'La voz que todavía me ordena el mundo De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'El refugio de las conversaciones pendientes De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'La brújula de mis decisiones De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'El jardín de lo que sembraste en mí De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La casa que llevo por dentro De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'El oficio silencioso de cuidar De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'La risa que me devuelve al origen De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'El legado de mirar con ternura De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'La ventana donde aprendí a esperar De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'La promesa de volver a casa De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre seré parte de tu historia De Hijo a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_hijo_a_mama.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hijo adulto con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (21, 'La calma que me enseñó a respirar De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (22, 'El mapa de tus consejos De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (23, 'La mesa donde siempre vuelvo De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (24, 'Tus manos hicieron hogar De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (25, 'La fuerza que no hacía ruido De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (26, 'El abrigo de los días difíciles De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (27, 'La luz de las pequeñas costumbres De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (28, 'El puente hacia mi propio camino De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (29, 'La paciencia que me dio raíces De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (30, 'La voz que todavía me ordena el mundo De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (31, 'El refugio de las conversaciones pendientes De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (32, 'La brújula de mis decisiones De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (33, 'El jardín de lo que sembraste en mí De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (34, 'La casa que llevo por dentro De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (35, 'El oficio silencioso de cuidar De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (36, 'La risa que me devuelve al origen De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (37, 'El legado de mirar con ternura De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (38, 'La ventana donde aprendí a esperar De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (39, 'La promesa de volver a casa De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (40, 'Siempre seré parte de tu historia De Hija a Mamá', 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_hija_a_mama.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Mamá Elena y su hija adulta con rostros visibles, como adultos compartiendo memoria y gratitud. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Te Amo, Abuela Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Te Amo, Abuela Adulto', 'CUSTOM_BOOK', 'Versión adulta de Te Amo, Abuela Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Te Amo, Abuela Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Te Amo, Abuela Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Te Amo, Abuela Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Te Amo, Abuela Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Te Amo, Abuela Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Familia'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Te Amo, Abuela Adulto', 'te-amo-abuela-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Familia' AND m.name = 'Te Amo, Abuela Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'La calma que me enseñó a respirar De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'El mapa de tus consejos De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'La mesa donde siempre vuelvo De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'Tus manos hicieron hogar De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La fuerza que no hacía ruido De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El abrigo de los días difíciles De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La luz de las pequeñas costumbres De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente hacia mi propio camino De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La paciencia que me dio raíces De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'La voz que todavía me ordena el mundo De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'El refugio de las conversaciones pendientes De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'La brújula de mis decisiones De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'El jardín de lo que sembraste en mí De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La casa que llevo por dentro De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'El oficio silencioso de cuidar De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'La risa que me devuelve al origen De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'El legado de mirar con ternura De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'La ventana donde aprendí a esperar De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'La promesa de volver a casa De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre seré parte de tu historia De Hijo a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_hijo_a_abuela.webp', 'HE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieto adulto con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (21, 'La calma que me enseñó a respirar De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (22, 'El mapa de tus consejos De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (23, 'La mesa donde siempre vuelvo De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (24, 'Tus manos hicieron hogar De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (25, 'La fuerza que no hacía ruido De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (26, 'El abrigo de los días difíciles De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (27, 'La luz de las pequeñas costumbres De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (28, 'El puente hacia mi propio camino De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (29, 'La paciencia que me dio raíces De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (30, 'La voz que todavía me ordena el mundo De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (31, 'El refugio de las conversaciones pendientes De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (32, 'La brújula de mis decisiones De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (33, 'El jardín de lo que sembraste en mí De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (34, 'La casa que llevo por dentro De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (35, 'El oficio silencioso de cuidar De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (36, 'La risa que me devuelve al origen De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (37, 'El legado de mirar con ternura De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (38, 'La ventana donde aprendí a esperar De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (39, 'La promesa de volver a casa De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (40, 'Siempre seré parte de tu historia De Hija a Abuela', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_hija_a_abuela.webp', 'SHE_TO_SHE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuela Rosa y su nieta adulta con rostros visibles, unidos por memoria, cuidado y ternura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Te Amo, Abuelo Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Te Amo, Abuelo Adulto', 'CUSTOM_BOOK', 'Versión adulta de Te Amo, Abuelo Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Te Amo, Abuelo Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Te Amo, Abuelo Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Te Amo, Abuelo Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Te Amo, Abuelo Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Te Amo, Abuelo Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Familia'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Te Amo, Abuelo Adulto', 'te-amo-abuelo-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Familia' AND m.name = 'Te Amo, Abuelo Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'La calma que me enseñó a respirar De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_01_la_calma_que_me_enseno_a_respirar_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'El mapa de tus consejos De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_02_el_mapa_de_tus_consejos_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'La mesa donde siempre vuelvo De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_03_la_mesa_donde_siempre_vuelvo_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'Tus manos hicieron hogar De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_04_tus_manos_hicieron_hogar_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La fuerza que no hacía ruido De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_05_la_fuerza_que_no_hacia_ruido_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El abrigo de los días difíciles De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_06_el_abrigo_de_los_dias_dificiles_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La luz de las pequeñas costumbres De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_07_la_luz_de_las_pequenas_costumbres_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente hacia mi propio camino De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_08_el_puente_hacia_mi_propio_camino_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La paciencia que me dio raíces De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_09_la_paciencia_que_me_dio_raices_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'La voz que todavía me ordena el mundo De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_10_la_voz_que_todavia_me_ordena_el_mundo_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'El refugio de las conversaciones pendientes De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_11_el_refugio_de_las_conversaciones_pendientes_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'La brújula de mis decisiones De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_12_la_brujula_de_mis_decisiones_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'El jardín de lo que sembraste en mí De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_13_el_jardin_de_lo_que_sembraste_en_mi_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La casa que llevo por dentro De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_14_la_casa_que_llevo_por_dentro_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'El oficio silencioso de cuidar De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_15_el_oficio_silencioso_de_cuidar_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'La risa que me devuelve al origen De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_16_la_risa_que_me_devuelve_al_origen_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'El legado de mirar con ternura De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_17_el_legado_de_mirar_con_ternura_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'La ventana donde aprendí a esperar De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_18_la_ventana_donde_aprendi_a_esperar_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'La promesa de volver a casa De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_19_la_promesa_de_volver_a_casa_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre seré parte de tu historia De Nieto a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_20_siempre_sere_parte_de_tu_historia_de_nieto_a_abuelo.webp', 'HE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieto adulto con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (21, 'La calma que me enseñó a respirar De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_21_la_calma_que_me_enseno_a_respirar_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la calma que me enseñó a respirar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (22, 'El mapa de tus consejos De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_22_el_mapa_de_tus_consejos_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el mapa de tus consejos, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (23, 'La mesa donde siempre vuelvo De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_23_la_mesa_donde_siempre_vuelvo_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la mesa donde siempre vuelvo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (24, 'Tus manos hicieron hogar De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_24_tus_manos_hicieron_hogar_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En tus manos hicieron hogar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (25, 'La fuerza que no hacía ruido De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_25_la_fuerza_que_no_hacia_ruido_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la fuerza que no hacía ruido, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (26, 'El abrigo de los días difíciles De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_26_el_abrigo_de_los_dias_dificiles_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el abrigo de los días difíciles, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (27, 'La luz de las pequeñas costumbres De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_27_la_luz_de_las_pequenas_costumbres_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la luz de las pequeñas costumbres, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (28, 'El puente hacia mi propio camino De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_28_el_puente_hacia_mi_propio_camino_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el puente hacia mi propio camino, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (29, 'La paciencia que me dio raíces De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_29_la_paciencia_que_me_dio_raices_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la paciencia que me dio raíces, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (30, 'La voz que todavía me ordena el mundo De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_30_la_voz_que_todavia_me_ordena_el_mundo_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la voz que todavía me ordena el mundo, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (31, 'El refugio de las conversaciones pendientes De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_31_el_refugio_de_las_conversaciones_pendientes_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el refugio de las conversaciones pendientes, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (32, 'La brújula de mis decisiones De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_32_la_brujula_de_mis_decisiones_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la brújula de mis decisiones, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (33, 'El jardín de lo que sembraste en mí De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_33_el_jardin_de_lo_que_sembraste_en_mi_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el jardín de lo que sembraste en mí, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (34, 'La casa que llevo por dentro De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_34_la_casa_que_llevo_por_dentro_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la casa que llevo por dentro, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (35, 'El oficio silencioso de cuidar De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_35_el_oficio_silencioso_de_cuidar_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el oficio silencioso de cuidar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (36, 'La risa que me devuelve al origen De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_36_la_risa_que_me_devuelve_al_origen_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la risa que me devuelve al origen, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (37, 'El legado de mirar con ternura De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_37_el_legado_de_mirar_con_ternura_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En el legado de mirar con ternura, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (38, 'La ventana donde aprendí a esperar De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_38_la_ventana_donde_aprendi_a_esperar_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la ventana donde aprendí a esperar, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (39, 'La promesa de volver a casa De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_39_la_promesa_de_volver_a_casa_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En la promesa de volver a casa, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (40, 'Siempre seré parte de tu historia De Nieta a Abuelo', 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo_adulto/Plantillas/Plantilla_40_siempre_sere_parte_de_tu_historia_de_nieta_a_abuelo.webp', 'SHE_TO_HE', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar Abuelo Arturo y su nieta adulta con rostros visibles, unidos por memoria, consejo y ternura. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, guardo este lugar,
donde tu voz me vuelve a acompañar.
Lo que me diste no se queda atrás,
camina conmigo cuando necesito paz.
Hoy miro la vida con otra claridad,
con tus consejos y tu forma de amar.
En siempre seré parte de tu historia, vuelvo a comprender,
que tu amor me enseñó a permanecer.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Mi Ángel Guardián Madre Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Mi Ángel Guardián Madre Adulto', 'CUSTOM_BOOK', 'Versión adulta de Mi Ángel Guardián Madre Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Mi Ángel Guardián Madre Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Mi Ángel Guardián Madre Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Mi Ángel Guardián Madre Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Mi Ángel Guardián Madre Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Mi Ángel Guardián Madre Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Memorias Familiares'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Mi Ángel Guardián Madre Adulto', 'mi-angel-guardian-madre-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Memorias Familiares' AND m.name = 'Mi Ángel Guardián Madre Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El faro que aún me guía', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'La ruta de tus pasos buenos', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'El jardín de tus fechas queridas', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'El manto de tus historias', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La lámpara de tu cuidado', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El archivo luminoso de tu voz', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La silla donde vuelve tu risa', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente de nuestras conversaciones', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La ventana donde te recuerdo', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'El mapa de tu legado', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'La mesa que guarda tu nombre', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'El refugio de tus consejos', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'La constelación de tus gestos', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La carta que sigo escribiendo', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'La fotografía que respira contigo', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'El camino que dejaste abierto', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'La luz que no se apaga', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'El abrazo que aprendí de ti', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'El lugar donde vuelvo a encontrarte', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre en mi corazón', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_madre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su madre recordada visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Mi Ángel Guardián Padre Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Mi Ángel Guardián Padre Adulto', 'CUSTOM_BOOK', 'Versión adulta de Mi Ángel Guardián Padre Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Mi Ángel Guardián Padre Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Mi Ángel Guardián Padre Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Mi Ángel Guardián Padre Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Mi Ángel Guardián Padre Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Mi Ángel Guardián Padre Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Memorias Familiares'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Mi Ángel Guardián Padre Adulto', 'mi-angel-guardian-padre-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Memorias Familiares' AND m.name = 'Mi Ángel Guardián Padre Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El faro que aún me guía', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'La ruta de tus pasos buenos', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'El jardín de tus fechas queridas', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'El manto de tus historias', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La lámpara de tu cuidado', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El archivo luminoso de tu voz', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La silla donde vuelve tu risa', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente de nuestras conversaciones', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La ventana donde te recuerdo', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'El mapa de tu legado', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'La mesa que guarda tu nombre', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'El refugio de tus consejos', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'La constelación de tus gestos', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La carta que sigo escribiendo', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'La fotografía que respira contigo', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'El camino que dejaste abierto', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'La luz que no se apaga', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'El abrazo que aprendí de ti', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'El lugar donde vuelvo a encontrarte', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre en mi corazón', 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian_padre_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y su padre recordado visible claramente como presencia protectora real, sin alas humanas ni halo. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Siempre en mi Corazón Abuela Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Siempre en mi Corazón Abuela Adulto', 'CUSTOM_BOOK', 'Versión adulta de Siempre en mi Corazón Abuela Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Siempre en mi Corazón Abuela Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Siempre en mi Corazón Abuela Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Siempre en mi Corazón Abuela Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Siempre en mi Corazón Abuela Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Siempre en mi Corazón Abuela Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Memorias Familiares'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Siempre en mi Corazón Abuela Adulto', 'siempre-en-mi-corazon-abuela-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Memorias Familiares' AND m.name = 'Siempre en mi Corazón Abuela Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El faro que aún me guía', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'La ruta de tus pasos buenos', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'El jardín de tus fechas queridas', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'El manto de tus historias', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La lámpara de tu cuidado', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El archivo luminoso de tu voz', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La silla donde vuelve tu risa', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente de nuestras conversaciones', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La ventana donde te recuerdo', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'El mapa de tu legado', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'La mesa que guarda tu nombre', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'El refugio de tus consejos', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'La constelación de tus gestos', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La carta que sigo escribiendo', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'La fotografía que respira contigo', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'El camino que dejaste abierto', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'La luz que no se apaga', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'El abrazo que aprendí de ti', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'El lugar donde vuelvo a encontrarte', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre en mi corazón', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuela_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y la abuela recordada visible claramente como presencia real en una escena floral tejida, sin fantasma literal. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Siempre en mi Corazón Abuelo Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Siempre en mi Corazón Abuelo Adulto', 'CUSTOM_BOOK', 'Versión adulta de Siempre en mi Corazón Abuelo Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Siempre en mi Corazón Abuelo Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Siempre en mi Corazón Abuelo Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Siempre en mi Corazón Abuelo Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Siempre en mi Corazón Abuelo Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Siempre en mi Corazón Abuelo Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Memorias Familiares'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Siempre en mi Corazón Abuelo Adulto', 'siempre-en-mi-corazon-abuelo-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Memorias Familiares' AND m.name = 'Siempre en mi Corazón Abuelo Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El faro que aún me guía', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_01_el_faro_que_aun_me_guia.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (2, 'La ruta de tus pasos buenos', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_02_la_ruta_de_tus_pasos_buenos.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (3, 'El jardín de tus fechas queridas', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_03_el_jardin_de_tus_fechas_queridas.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (4, 'El manto de tus historias', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_04_el_manto_de_tus_historias.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (5, 'La lámpara de tu cuidado', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_05_la_lampara_de_tu_cuidado.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (6, 'El archivo luminoso de tu voz', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_06_el_archivo_luminoso_de_tu_voz.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (7, 'La silla donde vuelve tu risa', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_07_la_silla_donde_vuelve_tu_risa.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (8, 'El puente de nuestras conversaciones', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_conversaciones.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (9, 'La ventana donde te recuerdo', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_09_la_ventana_donde_te_recuerdo.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (10, 'El mapa de tu legado', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_10_el_mapa_de_tu_legado.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (11, 'La mesa que guarda tu nombre', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_11_la_mesa_que_guarda_tu_nombre.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (12, 'El refugio de tus consejos', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_12_el_refugio_de_tus_consejos.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (13, 'La constelación de tus gestos', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_13_la_constelacion_de_tus_gestos.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (14, 'La carta que sigo escribiendo', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_14_la_carta_que_sigo_escribiendo.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (15, 'La fotografía que respira contigo', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_15_la_fotografia_que_respira_contigo.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (16, 'El camino que dejaste abierto', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_16_el_camino_que_dejaste_abierto.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (17, 'La luz que no se apaga', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_17_la_luz_que_no_se_apaga.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (18, 'El abrazo que aprendí de ti', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_18_el_abrazo_que_aprendi_de_ti.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (19, 'El lugar donde vuelvo a encontrarte', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_19_el_lugar_donde_vuelvo_a_encontrarte.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE),
    (20, 'Siempre en mi corazón', 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon_abuelo_adulto/Plantillas/Plantilla_20_siempre_en_mi_corazon.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar un adulto dedicante con rostro visible y el abuelo recordado visible claramente como presencia real en una escena de archivo luminoso, sin fantasma literal. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', 'Para {APODO_DESTINATARIO}, en este lugar,
tu luz tranquila vuelve a llegar.
No como ausencia ni despedida,
sino memoria que cuida la vida.
Cada consejo, cada mirar,
sigue enseñándome a caminar.
Y bajo esta paloma de amor,
tu recuerdo permanece en mi corazón.', '[{"key": "recipient", "count": 1}, {"key": "dedicator", "count": 1}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);


-- Siempre Serás Parte de Mí Adulto


INSERT INTO catalog_books (name, product_type, description, currency, is_active)
SELECT 'Siempre Serás Parte de Mí Adulto', 'CUSTOM_BOOK', 'Versión adulta de Siempre Serás Parte de Mí Adulto para el catálogo PixelArt.', 'PEN', TRUE
WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = 'Siempre Serás Parte de Mí Adulto');

UPDATE catalog_books
SET product_type = 'CUSTOM_BOOK', description = 'Versión adulta de Siempre Serás Parte de Mí Adulto para el catálogo PixelArt.', currency = 'PEN', is_active = TRUE, updated_at = now()
WHERE name = 'Siempre Serás Parte de Mí Adulto';


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_DELGADA', 13000
FROM catalog_books cb
WHERE cb.name = 'Siempre Serás Parte de Mí Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT cb.id, 'TAPA_GRUESA', 15000
FROM catalog_books cb
WHERE cb.name = 'Siempre Serás Parte de Mí Adulto'
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE
SET base_price_cents = EXCLUDED.base_price_cents, updated_at = now();


WITH category AS (
  SELECT id FROM personalized_categories WHERE name = 'Libros de Memorias Familiares'
)
INSERT INTO personalized_models (category_id, name, slug, is_active)
SELECT category.id, 'Siempre Serás Parte de Mí Adulto', 'siempre-seras-parte-de-mi-adulto', TRUE
FROM category
ON CONFLICT (category_id, name) DO UPDATE
SET slug = EXCLUDED.slug, is_active = TRUE, updated_at = now();


WITH model AS (
  SELECT m.id
  FROM personalized_models m
  JOIN personalized_categories c ON c.id = m.category_id
  WHERE c.name = 'Libros de Memorias Familiares' AND m.name = 'Siempre Serás Parte de Mí Adulto'
), rows(sort_order, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active) AS (
  VALUES
    (1, 'El equipo que sigue conmigo Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_01_el_equipo_que_sigue_conmigo_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (2, 'La ruta de nuestras bromas Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_02_la_ruta_de_nuestras_bromas_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (3, 'El refugio de nuestras locuras Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_03_el_refugio_de_nuestras_locuras_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (4, 'La promesa de seguir jugando Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_04_la_promesa_de_seguir_jugando_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (5, 'La complicidad que no se rompe Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_05_la_complicidad_que_no_se_rompe_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (6, 'El mapa de nuestros secretos Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_06_el_mapa_de_nuestros_secretos_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (7, 'La tarde donde todavía te escucho Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_07_la_tarde_donde_todavia_te_escucho_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (8, 'El puente de nuestras peleas y risas Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_08_el_puente_de_nuestras_peleas_y_risas_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (9, 'La canción que era de los dos Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_09_la_cancion_que_era_de_los_dos_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (10, 'La patrulla de infancia eterna Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_10_la_patrulla_de_infancia_eterna_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (11, 'La mesa de nuestras conspiraciones Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_11_la_mesa_de_nuestras_conspiraciones_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (12, 'El álbum donde seguimos juntos Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_12_el_album_donde_seguimos_juntos_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (13, 'La carrera hasta el fin del mundo Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_13_la_carrera_hasta_el_fin_del_mundo_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (14, 'El código de hermanos Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_14_el_codigo_de_hermanos_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (15, 'La noche de nuestras historias Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_15_la_noche_de_nuestras_historias_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (16, 'El jardín de los recuerdos vivos Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_16_el_jardin_de_los_recuerdos_vivos_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (17, 'La luz que dejó tu risa Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_17_la_luz_que_dejo_tu_risa_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (18, 'La esquina donde empieza la memoria Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_18_la_esquina_donde_empieza_la_memoria_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (19, 'El lazo que no aprende a irse Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_19_el_lazo_que_no_aprende_a_irse_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (20, 'Siempre serás parte de mí Hermano', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_20_siempre_seras_parte_de_mi_hermano.webp', 'M', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (21, 'El equipo que sigue conmigo Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_21_el_equipo_que_sigue_conmigo_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (22, 'La ruta de nuestras bromas Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_22_la_ruta_de_nuestras_bromas_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (23, 'El refugio de nuestras locuras Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_23_el_refugio_de_nuestras_locuras_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (24, 'La promesa de seguir jugando Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_24_la_promesa_de_seguir_jugando_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (25, 'La complicidad que no se rompe Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_25_la_complicidad_que_no_se_rompe_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (26, 'El mapa de nuestros secretos Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_26_el_mapa_de_nuestros_secretos_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (27, 'La tarde donde todavía te escucho Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_27_la_tarde_donde_todavia_te_escucho_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (28, 'El puente de nuestras peleas y risas Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_28_el_puente_de_nuestras_peleas_y_risas_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (29, 'La canción que era de los dos Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_29_la_cancion_que_era_de_los_dos_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (30, 'La patrulla de infancia eterna Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_30_la_patrulla_de_infancia_eterna_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (31, 'La mesa de nuestras conspiraciones Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_31_la_mesa_de_nuestras_conspiraciones_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (32, 'El álbum donde seguimos juntos Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_32_el_album_donde_seguimos_juntos_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (33, 'La carrera hasta el fin del mundo Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_33_la_carrera_hasta_el_fin_del_mundo_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (34, 'El código de hermanos Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_34_el_codigo_de_hermanos_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (35, 'La noche de nuestras historias Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_35_la_noche_de_nuestras_historias_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (36, 'El jardín de los recuerdos vivos Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_36_el_jardin_de_los_recuerdos_vivos_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (37, 'La luz que dejó tu risa Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_37_la_luz_que_dejo_tu_risa_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (38, 'La esquina donde empieza la memoria Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_38_la_esquina_donde_empieza_la_memoria_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (39, 'El lazo que no aprende a irse Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_39_el_lazo_que_no_aprende_a_irse_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE),
    (40, 'Siempre serás parte de mí Hermana', 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi_adulto/Plantillas/Plantilla_40_siempre_seras_parte_de_mi_hermana.webp', 'F', 'Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar dos hermanos adultos visibles en una escena viva de complicidad; el hermano/a recordado debe verse claramente junto al dedicante, no como retrato ni fantasma. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.', 'Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.', 'Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema. Bajo el poema debe ir una paloma lineal minimalista. No usar casita, halo, alas humanas ni fantasma literal.', 'Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.', '{APODO_DESTINATARIO}, tu risa no aprende a partir,
sigue en mis días queriendo vivir.
No como sombra ni como final,
sino en recuerdos de fuerza real.
Vuelvo a encontrarte en cada canción,
en nuestras bromas y en mi corazón.
Aunque la vida cambió su color,
sigues conmigo en forma de amor.', '[{"key": "recipient", "count": 1}, {"key": "livingSiblings", "count": 2}]'::jsonb, TRUE)
), updated AS (
  UPDATE personalized_templates t
  SET name = rows.name,
      gender_direction = rows.gender_direction,
      scene_visual = rows.scene_visual,
      background_details = rows.background_details,
      magic_effects = rows.magic_effects,
      lighting_color = rows.lighting_color,
      poem_template = rows.poem_template,
      character_roles = rows.character_roles,
      is_active = rows.is_active,
      updated_at = now()
  FROM model, rows
  WHERE t.model_id = model.id
    AND t.template_preview_key = rows.template_preview_key
  RETURNING t.template_preview_key
)
INSERT INTO personalized_templates (
  model_id, name, template_preview_key, gender_direction,
  scene_visual, background_details, magic_effects, lighting_color,
  poem_template, character_roles, is_active
)
SELECT model.id, rows.name, rows.template_preview_key, rows.gender_direction,
       rows.scene_visual, rows.background_details, rows.magic_effects, rows.lighting_color,
       rows.poem_template, rows.character_roles, rows.is_active
FROM model, rows
WHERE NOT EXISTS (
  SELECT 1 FROM personalized_templates t
  WHERE t.model_id = model.id AND t.template_preview_key = rows.template_preview_key
);
