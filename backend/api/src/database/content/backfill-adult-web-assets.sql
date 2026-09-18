-- Adult custom-book web cover assets.
-- Generated after adult web-assets loop. Idempotent and safe if a model is absent.


-- Mamá, Mi Heroína Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '22fc38daa1faad43cd479fe244c52ce68fd4180c9863c871fb4b47c4ce0baac1')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Mamá, Mi Heroína Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Mamá, Mi Heroína Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura.webp';


-- Te Amo, Abuelo Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '4948e9968d806228dbbb8e6de3e6ed0418f6e91453722c98b22fd118b8cb57ed')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Te Amo, Abuelo Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Te Amo, Abuelo Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp';


-- Te Amo, Abuela Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '320e96b0f7b35cf1c0a7a8f2a5fecff8b1c51ad20cfdbe579fb798d8627cc2b8')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Te Amo, Abuela Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Te Amo, Abuela Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura.webp';


-- El Mejor Equipo Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '42b0ae0f1634e157590168ea6454125f817fc057622c312a2957c4f1d5da8696')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'El Mejor Equipo Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'El Mejor Equipo Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura.webp';


-- Mi Familia Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura.webp', 'image/webp', 1310, 926, 'adb9f776621cc10b2f911b1de738ce84c045878ace5c7b57a49413990eb837ac')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Mi Familia Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Mi Familia Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura.webp';


-- Aventura Entre Patas Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura.webp', 'image/webp', 1310, 926, 'b224f3c56c4d3eafba9e7b3d2c63b0cdb564a0274716e8175a4285fb08547673')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Aventura Entre Patas Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Aventura Entre Patas Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura.webp';


-- Siempre en mi Corazón Abuelo Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '51cc654314ad7540d838420ef223de2da313cd26f204b8f4bc2c9cf054b11915')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Siempre en mi Corazón Abuelo Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Siempre en mi Corazón Abuelo Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura.webp';


-- Siempre en mi Corazón Abuela Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '6c8eedfc8d7c44faefd0eee143d50a1f97a6b7231cff2bfc406fe6db0dd656f6')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Siempre en mi Corazón Abuela Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Siempre en mi Corazón Abuela Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura.webp';


-- Mi Ángel Guardián Padre Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura.webp', 'image/webp', 1310, 926, '955f96f72b17661933f808b23108db5352389d39903cba84df1a7a6ec46b072d')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Mi Ángel Guardián Padre Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Mi Ángel Guardián Padre Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura.webp';


-- Mi Ángel Guardián Madre Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura.webp', 'image/webp', 1310, 926, 'd389cff90180f53a2d80eb529b3a5aa5bd03ec6e774fd71e521cf10058083c8a')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Mi Ángel Guardián Madre Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Mi Ángel Guardián Madre Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura.webp';


-- Siempre Serás Parte de Mí Adulto
INSERT INTO assets (storage_key, original_filename, mime_type, width, height, content_hash)
VALUES ('IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura.webp', 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura.webp', 'image/webp', 1310, 926, 'ee6b3c6fbf7ed380cc037dcd457e7b57ca8e8a408ad6ff19ef934ff26bb75021')
ON CONFLICT (content_hash) DO UPDATE
SET storage_key = EXCLUDED.storage_key,
    original_filename = EXCLUDED.original_filename,
    mime_type = EXCLUDED.mime_type,
    width = EXCLUDED.width,
    height = EXCLUDED.height;

UPDATE personalized_models m
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE m.name = 'Siempre Serás Parte de Mí Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura.webp';

UPDATE catalog_books cb
SET cover_asset_id = a.id, updated_at = now()
FROM assets a
WHERE cb.name = 'Siempre Serás Parte de Mí Adulto'
  AND a.storage_key = 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura.webp';
