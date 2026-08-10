-- backfill-slugs.sql — slugs reales para /libros-personalizados/{categoriaSlug}/{libroSlug},
-- usados por los QR de la página de venta cruzada. Reemplazan el mapa
-- LIBRO_NAMES hardcodeado que hoy solo vive en
-- frontend/web/src/app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/page.tsx
-- — estos valores están copiados 1:1 de ese mapa para no romper ninguna URL
-- ya indexada/compartida. Matchea por nombre exacto (no por id, difiere entre
-- ambientes). Idempotente (UPDATE incondicional).

BEGIN;

UPDATE personalized_categories SET slug = 'libros-de-amor' WHERE name = 'Libros de Amor';
UPDATE personalized_categories SET slug = 'libros-de-mascotas' WHERE name = 'Libros de Mascotas';
UPDATE personalized_categories SET slug = 'libros-de-familia' WHERE name = 'Libros de Familia';
UPDATE personalized_categories SET slug = 'libros-de-memorias-familiares' WHERE name = 'Libros de Memorias Familiares';

-- Hashtag de contratapa — solo Amor tiene copy validado (piloto "10 Razones").
-- El resto de las categorías queda NULL a propósito hasta que se escriba su
-- copy (Fase D) — GenerateOrderCoverUseCase ya rechaza generar contratapa sin
-- contenido cargado, mismo guard que ya existe para TEMPLATE.
UPDATE personalized_categories SET back_cover_hashtag = '#AmorPixelArt' WHERE name = 'Libros de Amor';

UPDATE personalized_models SET slug = '10-razones-por-las-que-te-amo' WHERE name = '10 Razones por las que Te Amo';
UPDATE personalized_models SET slug = '1025-dias-enamorandome-de-ti' WHERE name = '1025 Días enamorándome de ti';
UPDATE personalized_models SET slug = 'mi-amor' WHERE name = 'Mi Amor';
UPDATE personalized_models SET slug = 'aventura-entre-patas' WHERE name = 'Aventura entre patas';
UPDATE personalized_models SET slug = 'mi-amigo-miauravilloso' WHERE name = 'Mi amigo Miauravilloso';
UPDATE personalized_models SET slug = 'mi-mejor-amigo-del-mundo' WHERE name = 'Mi mejor amigo del mundo';
UPDATE personalized_models SET slug = 'nuestro-angel-de-4-patas' WHERE name = 'Nuestro Angel de 4 patas';
UPDATE personalized_models SET slug = 'papa-mi-heroe' WHERE name = 'Papá, Mi Héroe';
UPDATE personalized_models SET slug = 'mama-mi-heroina' WHERE name = 'Mamá, Mi Heroína';
UPDATE personalized_models SET slug = 'te-amo-abuelo' WHERE name = 'Te amo, abuelo';
UPDATE personalized_models SET slug = 'te-amo-abuela' WHERE name = 'Te amo, abuela';
UPDATE personalized_models SET slug = 'el-mejor-equipo' WHERE name = 'El Mejor Equipo';
-- Mismatch pre-existente ya documentado (frontend slug "la-familia" para el
-- libro que en BD se llama "Mi Familia") — se preserva tal cual para no
-- romper la URL ya publicada, no se corrige acá.
UPDATE personalized_models SET slug = 'la-familia' WHERE name = 'Mi Familia';
UPDATE personalized_models SET slug = 'gracias-por-tu-amor' WHERE name = 'Gracias por tu amor';
UPDATE personalized_models SET slug = 'mi-angel-guardian' WHERE name = 'Mi angel guardian';
UPDATE personalized_models SET slug = 'siempre-en-mi-corazon' WHERE name = 'Siempre en mi corazon';
UPDATE personalized_models SET slug = 'siempre-seras-parte-de-mi' WHERE name = 'Siempre seras parte de mi';

COMMIT;
