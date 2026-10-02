
BEGIN;
WITH cat AS (SELECT id FROM personalized_categories WHERE name = $q$Libros de Familia$q$),
ins_model AS (
  INSERT INTO personalized_models (category_id, name, slug, is_active)
  SELECT id, $q$Mi Familia Adulto$q$, $q$la-familia-adulto$q$, true FROM cat
  ON CONFLICT (category_id, name) DO UPDATE SET slug = EXCLUDED.slug, is_active = true, updated_at = now()
  RETURNING id
), model_row AS (
  SELECT id FROM ins_model UNION ALL SELECT id FROM personalized_models WHERE name=$q$Mi Familia Adulto$q$ AND slug=$q$la-familia-adulto$q$ LIMIT 1
), ins_catalog AS (
  INSERT INTO catalog_books (name, product_type, description, currency, is_active)
  SELECT $q$Mi Familia Adulto$q$, 'CUSTOM_BOOK', $q$Versión adulta de Mi Familia Adulto para el catálogo PixelArt.$q$, 'PEN', true
  WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name=$q$Mi Familia Adulto$q$)
  RETURNING id
), catalog_row AS (
  SELECT id FROM ins_catalog UNION ALL SELECT id FROM catalog_books WHERE name=$q$Mi Familia Adulto$q$ LIMIT 1
)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_DELGADA', 13000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

WITH catalog_row AS (SELECT id FROM catalog_books WHERE name=$q$Mi Familia Adulto$q$ LIMIT 1)
INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
SELECT id, 'TAPA_GRUESA', 15000 FROM catalog_row
ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents=EXCLUDED.base_price_cents, updated_at=now();

CREATE TEMP TABLE tmp_adult_templates (
  template_preview_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender_direction VARCHAR(20),
  scene_visual TEXT NOT NULL,
  background_details TEXT NOT NULL,
  magic_effects TEXT NOT NULL,
  lighting_color TEXT NOT NULL,
  poem_template TEXT NOT NULL,
  character_roles JSONB NOT NULL
) ON COMMIT DROP;
INSERT INTO tmp_adult_templates VALUES
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_01_la_casa_de_los_mil_regresos.webp$q$, $q$La casa de los mil regresos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una terraza urbana al atardecer con viento suave y objetos cotidianos significativos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_02_el_laboratorio_de_nuestras_mezclas.webp$q$, $q$El laboratorio de nuestras mezclas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un taller luminoso con madera, herramientas ordenadas y luz lateral cinematográfica. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_03_la_mesa_donde_todos_cabemos.webp$q$, $q$La mesa donde todos cabemos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cocina adulta cálida con vapor, vajilla sobria y detalles familiares discretos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_04_la_ruta_de_las_voces_mezcladas.webp$q$, $q$La ruta de las voces mezcladas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un jardín o invernadero de plantas grandes con luz filtrada y senderos húmedos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_05_el_archivo_de_las_sobremesas.webp$q$, $q$El archivo de las sobremesas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una biblioteca íntima con lámparas cálidas, libros y polvo dorado en el aire. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_06_la_coreografia_de_los_dias_comunes.webp$q$, $q$La coreografía de los días comunes$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un malecón al amanecer con agua serena, bancas de madera y horizonte abierto. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_07_la_cocina_donde_empieza_la_historia.webp$q$, $q$La cocina donde empieza la historia$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una estación de tren tranquila con maletas, relojes antiguos y luz de mañana. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_08_el_mapa_de_nuestras_mudanzas.webp$q$, $q$El mapa de nuestras mudanzas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una cafetería elegante con dos tazas, ventanales y ciudad desenfocada al fondo. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_09_la_sala_de_los_planes_pendientes.webp$q$, $q$La sala de los planes pendientes$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un comedor familiar de noche con luz baja, mantel de lino y fotografías al margen. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_10_el_jardin_de_las_generaciones.webp$q$, $q$El jardín de las generaciones$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un camino de montaña con neblina suave, mochila y cielo amplio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un camino de montaña con neblina suave, mochila y cielo amplio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_11_la_noche_de_las_historias_repetidas.webp$q$, $q$La noche de las historias repetidas$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un estudio de arte con lienzos, papeles, cartas y reflejos dorados. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_12_el_puente_de_los_apellidos.webp$q$, $q$El puente de los apellidos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una sala moderna con proyector de fotos familiares y sombras suaves. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una sala moderna con proyector de fotos familiares y sombras suaves. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_13_la_estacion_de_los_abrazos_largos.webp$q$, $q$La estación de los abrazos largos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un mercado de flores al aire libre con toldos, texturas y color sobrio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un mercado de flores al aire libre con toldos, texturas y color sobrio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_14_la_biblioteca_de_fotos_familiares.webp$q$, $q$La biblioteca de fotos familiares$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una playa fría al atardecer con arena húmeda, mantas y faroles. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una playa fría al atardecer con arena húmeda, mantas y faroles. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_15_el_taller_de_arreglarlo_juntos.webp$q$, $q$El taller de arreglarlo juntos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un patio interior con plantas, lluvia fina y luces cálidas colgantes. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un patio interior con plantas, lluvia fina y luces cálidas colgantes. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_16_la_terraza_de_los_domingos.webp$q$, $q$La terraza de los domingos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una azotea nocturna con ciudad lejana y una mesa pequeña con recuerdos. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_17_el_viaje_donde_cabemos_todos.webp$q$, $q$El viaje donde cabemos todos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una ruta costera con auto detenido, mapas y luz baja de viaje. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una ruta costera con auto detenido, mapas y luz baja de viaje. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_18_la_luz_que_prende_cada_regreso.webp$q$, $q$La luz que prende cada regreso$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un muelle de madera sobre lago tranquilo con termos, remos y niebla. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un muelle de madera sobre lago tranquilo con termos, remos y niebla. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_19_el_album_de_lo_que_somos.webp$q$, $q$El álbum de lo que somos$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: un archivo familiar con cajas, álbumes, papeles y una lámpara de escritorio. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$),
($q$IA_Books/Family_Books_Page/Libros/La_familia_adulto/Plantillas/Plantilla_20_la_familia_que_siempre_encuentra_camino.webp$q$, $q$La familia que siempre encuentra camino$q$, NULL, $q$Una única fotografía continua, plana y a sangre completa, con tono adulto y sobrio. Mostrar una familia adulta de tres a cinco personas, rostros visibles, interactuando con naturalidad; sin mascotas ni animales. La escena ocurre en una habitación de lectura con ventana grande, sillón y luz serena. Rostros visibles frontal o tres cuartos; no mostrar protagonistas de espaldas. No incluir mascotas, perros, gatos, aves ni animales.$q$, $q$Ambiente realista y adulto: una habitación de lectura con ventana grande, sillón y luz serena. Detalles cotidianos significativos, profundidad fotográfica suave, composición editorial y movimiento natural.$q$, $q$Metáfora visual sutil integrada a la fotografía: hilos de luz, reflejos, partículas pequeñas o líneas poéticas según el tema.$q$, $q$Iluminación cinematográfica suave con paleta temática variable, sobria y adulta; evitar dorado fijo y fantasía infantil.$q$, $q$Familia es volver sin tener que explicar,
un idioma propio para descansar.
Somos mezcla de historias y verdad,
raíces, camino y complicidad.
Cada abrazo guarda una estación,
cada mesa, una conversación.
Y si el mundo nos quiere separar,
nuestro amor sabe regresar.$q$, $q$[{"key": "papa", "count": 1}, {"key": "mama", "count": 1}, {"key": "hijos", "count": 3}]$q$);

WITH model_row AS (SELECT id FROM personalized_models WHERE name=$q$Mi Familia Adulto$q$ AND slug=$q$la-familia-adulto$q$ LIMIT 1)
INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction, scene_visual, background_details, magic_effects, lighting_color, poem_template, character_roles, is_active)
SELECT model_row.id, t.name, t.template_preview_key, t.gender_direction, t.scene_visual, t.background_details, t.magic_effects, t.lighting_color, t.poem_template, t.character_roles, true
FROM tmp_adult_templates t CROSS JOIN model_row
WHERE NOT EXISTS (SELECT 1 FROM personalized_templates p WHERE p.model_id=model_row.id AND p.template_preview_key=t.template_preview_key);

UPDATE personalized_templates p
SET name=t.name, gender_direction=t.gender_direction, scene_visual=t.scene_visual, background_details=t.background_details, magic_effects=t.magic_effects, lighting_color=t.lighting_color, poem_template=t.poem_template, character_roles=t.character_roles, is_active=true, updated_at=now()
FROM tmp_adult_templates t, personalized_models m
WHERE m.slug=$q$la-familia-adulto$q$
  AND m.id=p.model_id
  AND p.template_preview_key=t.template_preview_key;
COMMIT;
