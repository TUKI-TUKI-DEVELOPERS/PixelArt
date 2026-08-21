/**
 * seed.ts — Seeds iniciales para PixelArt
 *
 * Idempotente: se puede ejecutar múltiples veces sin duplicar datos.
 * Usa pg directamente (sin TypeORM) para no depender del contexto NestJS.
 *
 * Ejecución:
 *   npm run seed                                    (en local o dentro del contenedor)
 *   docker compose -f infra/docker/docker-compose.yml exec api npm run seed
 */

import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';
import * as bcryptjs from 'bcryptjs';

function createClient(): Client {
  return new Client({
    host:     process.env.POSTGRES_HOST     ?? 'localhost',
    port:     Number(process.env.POSTGRES_PORT ?? 5432),
    database: process.env.POSTGRES_DB       ?? 'pixelart',
    user:     process.env.POSTGRES_USER     ?? 'pixelart',
    password: process.env.POSTGRES_PASSWORD ?? 'pixelart_secret',
  });
}

export async function runSeed(): Promise<void> {
  const client = createClient();
  await client.connect();

  try {
    console.log('[seed] Iniciando seeds...');

    // ── 0. Schema migrations (idempotent — para volúmenes pre-existentes) ─────
    // Aplica cambios de schema que no estaban en el volumen original.
    // Todos usan IF NOT EXISTS / IF EXISTS para ser idempotentes.

    // 0a. Enum values
    await client.query(`ALTER TYPE public_link_type ADD VALUE IF NOT EXISTS 'CHECKOUT'`);
    await client.query(`ALTER TYPE email_event_type ADD VALUE IF NOT EXISTS 'UNIFIED_CHECKOUT_SENT'`);

    // 0b. Columna extra_templates_amount_cents en orders
    await client.query(`
      ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS extra_templates_amount_cents BIGINT NOT NULL DEFAULT 0
          CHECK (extra_templates_amount_cents >= 0)
    `);

    // 0c. CHECK constraint del total (incluye extra_templates)
    await client.query(`ALTER TABLE orders DROP CONSTRAINT IF EXISTS chk_total_amount`);
    await client.query(`
      ALTER TABLE orders ADD CONSTRAINT chk_total_amount
        CHECK (total_amount_cents = base_amount_cents + rush_fee_cents + extra_templates_amount_cents)
    `);

    // 0d. Tabla order_template_selections
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_template_selections (
        id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        order_id    BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        template_id BIGINT NOT NULL REFERENCES personalized_templates(id),
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (order_id, template_id)
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS order_template_selections_order_id_idx
        ON order_template_selections(order_id)
    `);

    // 0e. Campos nuevos en photobook_products y photobook_projects
    await client.query(`ALTER TABLE photobook_products ADD COLUMN IF NOT EXISTS allows_custom_dimensions BOOLEAN NOT NULL DEFAULT FALSE`);
    await client.query(`ALTER TABLE photobook_projects ADD COLUMN IF NOT EXISTS delivery_address TEXT`);
    await client.query(`ALTER TABLE photobook_projects ADD COLUMN IF NOT EXISTS delivery_district TEXT`);
    await client.query(`ALTER TABLE photobook_projects ADD COLUMN IF NOT EXISTS cover_title TEXT`);
    await client.query(`ALTER TABLE photobook_projects ADD COLUMN IF NOT EXISTS customer_dni TEXT`);
    await client.query(`ALTER TABLE photobook_projects ADD COLUMN IF NOT EXISTS custom_width_cm NUMERIC(5,1)`);
    await client.query(`ALTER TABLE photobook_projects ADD COLUMN IF NOT EXISTS custom_height_cm NUMERIC(5,1)`);

    // 0f. Actualizar constraint chk_confirmed_requires_contact para incluir delivery_address
    await client.query(`ALTER TABLE photobook_projects DROP CONSTRAINT IF EXISTS chk_confirmed_requires_contact`);
    await client.query(`
      ALTER TABLE photobook_projects ADD CONSTRAINT chk_confirmed_requires_contact CHECK (
        status <> 'CONFIRMED'
        OR (customer_full_name IS NOT NULL AND customer_phone IS NOT NULL AND delivery_address IS NOT NULL)
      )
    `);

    // 0g. Tabla promotions
    await client.query(`
      CREATE TABLE IF NOT EXISTS promotions (
        id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        label          TEXT NOT NULL,
        target_type    TEXT NOT NULL CHECK (target_type IN ('model', 'category', 'all')),
        target_id      BIGINT,
        discount_type  TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed_cents')),
        discount_value BIGINT NOT NULL CHECK (discount_value > 0),
        valid_from     TIMESTAMPTZ NOT NULL,
        valid_until    TIMESTAMPTZ NOT NULL,
        is_active      BOOLEAN NOT NULL DEFAULT TRUE,
        created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT chk_promotions_valid_range   CHECK (valid_until > valid_from),
        CONSTRAINT chk_promotions_percent_range CHECK (
          discount_type != 'percent' OR (discount_value > 0 AND discount_value <= 100)
        )
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS promotions_active_idx
        ON promotions (is_active, valid_from, valid_until)
    `);

    // 0h. cover_asset_id en personalized_models
    await client.query(`
      ALTER TABLE personalized_models
        ADD COLUMN IF NOT EXISTS cover_asset_id BIGINT REFERENCES assets(id) ON DELETE SET NULL
    `);

    // 0i. Campos de personajes en demo_request + delivery_date opcional (wizard 9 pasos)
    await client.query(`ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS recipient_name TEXT`);
    await client.query(`ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS recipient_nickname TEXT`);
    await client.query(`ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS dedicator_name TEXT`);
    await client.query(`ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS gender_direction VARCHAR(20)`);
    await client.query(`ALTER TABLE demo_request ADD COLUMN IF NOT EXISTS character_meta JSONB`);
    await client.query(`ALTER TABLE demo_request ALTER COLUMN delivery_date DROP NOT NULL`);

    // 0j. order_print_assets: page_part (páginas dobles A/B), nuevos asset_types
    //     y unique keys parciales que reemplazan al UNIQUE original
    await client.query(`
      ALTER TABLE order_print_assets
        ADD COLUMN IF NOT EXISTS page_part TEXT NOT NULL DEFAULT 'ONLY'
    `);
    await client.query(`ALTER TABLE order_print_assets DROP CONSTRAINT IF EXISTS order_print_assets_asset_type_check`);
    await client.query(`
      ALTER TABLE order_print_assets ADD CONSTRAINT order_print_assets_asset_type_check
        CHECK (asset_type IN ('COVER','BLANK_PRE_DEDICATION','DEDICATION','TEMPLATE','BLANK_PRE_ADDON','ADDON','BACK_COVER'))
    `);
    await client.query(`ALTER TABLE order_print_assets DROP CONSTRAINT IF EXISTS order_print_assets_order_id_asset_type_template_id_key`);
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS opa_single_key
        ON order_print_assets(order_id, asset_type) WHERE template_id IS NULL
    `);
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS opa_template_key
        ON order_print_assets(order_id, template_id, page_part) WHERE template_id IS NOT NULL
    `);

    // 0k. Tapa, contratapa y venta cruzada — contenido de prompt + slugs para QR
    await client.query(`ALTER TABLE personalized_models ADD COLUMN IF NOT EXISTS cover_scene_visual TEXT`);
    await client.query(`ALTER TABLE personalized_models ADD COLUMN IF NOT EXISTS back_cover_tagline TEXT`);
    await client.query(`ALTER TABLE personalized_models ADD COLUMN IF NOT EXISTS back_cover_scene TEXT`);
    await client.query(`ALTER TABLE personalized_categories ADD COLUMN IF NOT EXISTS back_cover_hashtag TEXT`);
    await client.query(`ALTER TABLE personalized_categories ADD COLUMN IF NOT EXISTS slug TEXT`);
    await client.query(`ALTER TABLE personalized_categories DROP CONSTRAINT IF EXISTS personalized_categories_slug_key`);
    await client.query(`ALTER TABLE personalized_categories ADD CONSTRAINT personalized_categories_slug_key UNIQUE (slug)`);
    await client.query(`ALTER TABLE personalized_models ADD COLUMN IF NOT EXISTS slug TEXT`);
    await client.query(`ALTER TABLE personalized_models DROP CONSTRAINT IF EXISTS personalized_models_category_id_slug_key`);
    await client.query(`ALTER TABLE personalized_models ADD CONSTRAINT personalized_models_category_id_slug_key UNIQUE (category_id, slug)`);

    console.log('[seed] schema migrations ✓');

    // ── 1. personalized_categories ──────────────────────────────────────────
    await client.query(`
      INSERT INTO personalized_categories (name) VALUES
        ('Libros de Amor'),
        ('Libros de Mascotas'),
        ('Libros de Familia'),
        ('Libros de Memorias Familiares')
      ON CONFLICT DO NOTHING
    `);
    console.log('[seed] personalized_categories ✓');

    // ── 2. personalized_models ──────────────────────────────────────────────
    const { rows: cats } = await client.query<{ id: string; name: string }>(
      `SELECT id, name FROM personalized_categories
       WHERE name IN ('Libros de Amor', 'Libros de Mascotas', 'Libros de Familia', 'Libros de Memorias Familiares')`,
    );
    const cat = Object.fromEntries(cats.map((c) => [c.name, c.id]));

    const modelSeeds = [
      // Libros de Amor
      { categoryId: cat['Libros de Amor'], name: '10 Razones por las que Te Amo' },
      { categoryId: cat['Libros de Amor'], name: 'Mi Amor' },
      { categoryId: cat['Libros de Amor'], name: '1025 Días enamorándome de ti' },
      // Libros de Mascotas
      { categoryId: cat['Libros de Mascotas'], name: 'Nuestro Angel de 4 patas' },
      { categoryId: cat['Libros de Mascotas'], name: 'Aventura entre patas' },
      { categoryId: cat['Libros de Mascotas'], name: 'Mi amigo Miauravilloso' },
      { categoryId: cat['Libros de Mascotas'], name: 'Mi mejor amigo del mundo' },
      // Libros de Familia
      { categoryId: cat['Libros de Familia'], name: 'Papá, Mi Héroe' },
      { categoryId: cat['Libros de Familia'], name: 'Mamá, Mi Heroína' },
      { categoryId: cat['Libros de Familia'], name: 'Te amo, abuelo' },
      { categoryId: cat['Libros de Familia'], name: 'Te amo, abuela' },
      { categoryId: cat['Libros de Familia'], name: 'El Mejor Equipo' },
      { categoryId: cat['Libros de Familia'], name: 'Mi Familia' },
      // Libros de Memorias Familiares
      { categoryId: cat['Libros de Memorias Familiares'], name: 'Gracias por tu amor' },
      { categoryId: cat['Libros de Memorias Familiares'], name: 'Mi angel guardian' },
      { categoryId: cat['Libros de Memorias Familiares'], name: 'Siempre en mi corazon' },
      { categoryId: cat['Libros de Memorias Familiares'], name: 'Siempre seras parte de mi' },
    ];

    for (const m of modelSeeds) {
      await client.query(`
        INSERT INTO personalized_models (category_id, name)
        VALUES ($1, $2)
        ON CONFLICT (category_id, name) DO NOTHING
      `, [m.categoryId, m.name]);
    }
    console.log('[seed] personalized_models ✓');

    // ── 3. personalized_templates ────────────────────────────────────────────
    // Cada modelo tiene 20 plantillas reales en MinIO bajo IA_Books/
    const { rows: models } = await client.query<{ id: string; name: string }>(
      `SELECT id, name FROM personalized_models`,
    );
    const model = Object.fromEntries(models.map((m) => [m.name, m.id]));

    // Mapa: nombre del modelo → { basePath en MinIO, archivos de plantilla }
    const templateData: Record<string, { base: string; files: string[] }> = {
      '10 Razones por las que Te Amo': {
        base: 'IA_Books/Love_Books_Page/Libros/X_Razones_Por_Las_Que_Te_Amo/Plantillas',
        files: [
          'PLANTILLA_1_Despertar_a_Tu_Lado_es_Como_un_Cuento_de_Hadas_El_a_Ella.png',
          'PLANTILLA_1_Despertar_a_Tu_Lado_es_Como_un_Cuento_de_Hadas_Ella_a_El.png',
          'PLANTILLA_2_Cepillarnos_los_Dientes_Juntos_es_Como_una_Comedia_Romántica_El_a_Ella.png',
          'PLANTILLA_2_Cepillarnos_los_Dientes_Juntos_es_Como_una_Comedia_Romántica_Ella_a_El.png',
          'PLANTILLA_3_Besarte_es_Como_Comer_Algodón_de_Azúcar_El_a_Ella.png',
          'PLANTILLA_3_Besarte_es_Como_Comer_Algodón_de_Azúcar_Ella_a_El.png',
          'PLANTILLA_4_Cocinar_Contigo_es_Como_un_Show_de_Cocina_El_a_Ella.png',
          'PLANTILLA_4_Cocinar_Contigo_es_Como_un_Show_de_Cocina_Ella_a_El.png',
          'PLANTILLA_5_Ver_Películas_Juntos_es_Como_Estar_en_el_Cine_El_a_Ella.png',
          'PLANTILLA_5_Ver_Películas_Juntos_es_Como_Estar_en_el_Cine_Ella_a_El.png',
          'PLANTILLA_6_Viajar_Contigo_es_Como_una_Aventura_Épica_El_a_Ella.png',
          'PLANTILLA_6_Viajar_Contigo_es_Como_una_Aventura_Épica_Ella_a_El.png',
          'PLANTILLA_7_Bailar_Contigo_es_Como_Estar_en_un_Musical_El_a_Ella.png',
          'PLANTILLA_7_Bailar_Contigo_es_Como_Estar_en_un_Musical_Ella_a_El.png',
          'PLANTILLA_8_Tus_Abrazos_Son_Como_un_Refugio_Mágico_El_a_Ella.png',
          'PLANTILLA_8_Tus_Abrazos_Son_Como_un_Refugio_Mágico_Ella_a_El.png',
          'PLANTILLA_9_Escuchar_Música_Contigo_es_Como_un_Concierto_Privado_El_a_Ella.png',
          'PLANTILLA_9_Escuchar_Música_Contigo_es_Como_un_Concierto_Privado_Ella_a_El.png',
          'PLANTILLA_10_Hacer_Planes_Contigo_es_Como_Diseñar_Nuestro_Futuro_El_a_Ella.png',
          'PLANTILLA_10_Hacer_Planes_Contigo_es_Como_Diseñar_Nuestro_Futuro_Ella_a_El.png',
          'PLANTILLA_11_Reír_Contigo_es_Como_Terapia_del_Alma_El_a_Ella.png',
          'PLANTILLA_11_Reír_Contigo_es_Como_Terapia_del_Alma_Ella_a_El.png',
          'PLANTILLA_12_Dormir_Contigo_es_Como_Flotar_en_las_Nubes_El_a_Ella.png',
          'PLANTILLA_12_Dormir_Contigo_es_Como_Flotar_en_las_Nubes_Ella_a_El.png',
          'PLANTILLA_13_Caminar_de_la_Mano_es_Como_Conquistar_el_Mundo_El_a_Ella.png',
          'PLANTILLA_13_Caminar_de_la_Mano_es_Como_Conquistar_el_Mundo_Ella_a_El.png',
          'PLANTILLA_14_Tus_Mensajes_Son_Como_Recibir_Cartas_de_Amor_El_a_Ella.png',
          'PLANTILLA_14_Tus_Mensajes_Son_Como_Recibir_Cartas_de_Amor_Ella_a_El.png',
          'PLANTILLA_15_Mirarte_a_los_Ojos_es_Como_Ver_el_Universo_El_a_Ella.png',
          'PLANTILLA_15_Mirarte_a_los_Ojos_es_Como_Ver_el_Universo_Ella_a_El.png',
          'PLANTILLA_16_Hacer_el_Amor_Contigo_es_Como_Fuegos_Artificiales_El_a_Ella.png',
          'PLANTILLA_16_Hacer_el_Amor_Contigo_es_Como_Fuegos_Artificiales_Ella_a_El.png',
          'PLANTILLA_17_Cuidarme_Cuando_Estoy_Enfermo_es_Como_Tener_un_Ángel_El_a_Ella.png',
          'PLANTILLA_17_Cuidarme_Cuando_Estoy_Enfermo_es_Como_Tener_un_Ángel_Ella_a_El.png',
          'PLANTILLA_18_Tus_Sorpresas_Son_Como_Magia_Pura_El_a_Ella.png',
          'PLANTILLA_18_Tus_Sorpresas_Son_Como_Magia_Pura_Ella_a_El.png',
          'PLANTILLA_19_Apoyarme_en_Mis_Sueños_es_Como_Tener_Alas_El_a_Ella.png',
          'PLANTILLA_19_Apoyarme_en_Mis_Sueños_es_Como_Tener_Alas_Ella_a_El.png',
          'PLANTILLA_20_Perdonarme_es_Como_Recibir_una_Segunda_Oportunidad_El_a_Ella.png',
          'PLANTILLA_20_Perdonarme_es_Como_Recibir_una_Segunda_Oportunidad_Ella_a_El.png',
        ],
      },
      'Mi Amor': {
        base: 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas',
        files: [
          'PLANTILLA_1_Mi_Superhéroe_Personal_El_a_Ella.png',
          'PLANTILLA_1_Mi_Superhéroe_Personal_Ella_a_El.png',
          'PLANTILLA_2_Mi_Príncipe_Encantador_El_a_Ella.png',
          'PLANTILLA_2_Mi_Príncipe_Encantador_Ella_a_El.png',
          'PLANTILLA_3_Mi_Thor_Dios_del_Trueno_El_a_Ella.png',
          'PLANTILLA_3_Mi_Thor_Dios_del_Trueno_Ella_a_El.png',
          'PLANTILLA_4_Mi_Caballero_de_Armadura_Brillante_El_a_Ella.png',
          'PLANTILLA_4_Mi_Caballero_de_Armadura_Brillante_Ella_a_El.png',
          'PLANTILLA_5_Mi_Rey_El_a_Ella.png',
          'PLANTILLA_5_Mi_Rey_Ella_a_El.png',
          'PLANTILLA_6_Mi_Ángel_Guardián_El_a_Ella.png',
          'PLANTILLA_6_Mi_Ángel_Guardián_Ella_a_El.png',
          'PLANTILLA_7_Mi_Pirata_Aventurero_El_a_Ella.png',
          'PLANTILLA_7_Mi_Pirata_Aventurero_Ella_a_El.png',
          'PLANTILLA_8_Mi_Mago_Hechicero_El_a_Ella.png',
          'PLANTILLA_8_Mi_Mago_Hechicero_Ella_a_El.png',
          'PLANTILLA_9_Mi_Guerrero_Protector_El_a_Ella.png',
          'PLANTILLA_9_Mi_Guerrero_Protector_Ella_a_El.png',
          'PLANTILLA_10_Mi_Estrella_de_Rock_El_a_Ella.png',
          'PLANTILLA_10_Mi_Estrella_de_Rock_Ella_a_El.png',
          'PLANTILLA_11_Mi_Capitán_Piloto_El_a_Ella.png',
          'PLANTILLA_11_Mi_Capitán_Piloto_Ella_a_El.png',
          'PLANTILLA_12_Mi_Vikingo_Valiente_El_a_Ella.png',
          'PLANTILLA_12_Mi_Vikingo_Valiente_Ella_a_El.png',
          'PLANTILLA_13_Mi_Romeo_Amante_Eterno_El_a_Ella.png',
          'PLANTILLA_13_Mi_Romeo_Amante_Eterno_Ella_a_El.png',
          'PLANTILLA_14_Mi_Arquitecto_de_Sueños_El_a_Ella.png',
          'PLANTILLA_14_Mi_Arquitecto_de_Sueños_Ella_a_El.png',
          'PLANTILLA_15_Mi_Gladiador_El_a_Ella.png',
          'PLANTILLA_15_Mi_Gladiador_Ella_a_El.png',
          'PLANTILLA_16_Mi_Cowboy_Vaquero_El_a_Ella.png',
          'PLANTILLA_16_Mi_Cowboy_Vaquero_Ella_a_El.png',
          'PLANTILLA_17_Mi_Samurai_El_a_Ella.png',
          'PLANTILLA_17_Mi_Samurai_Ella_a_El.png',
          'PLANTILLA_18_Mi_Astronauta_Explorador_Espacial_El_a_Ella.png',
          'PLANTILLA_18_Mi_Astronauta_Explorador_Espacial_Ella_a_El.png',
          'PLANTILLA_19_Mi_Titan_El_a_Ella.png',
          'PLANTILLA_19_Mi_Titan_Ella_a_El.png',
          'PLANTILLA_20_Mi_Fenix_Renacimiento_Fuerza_El_a_Ella.png',
          'PLANTILLA_20_Mi_Fenix_Renacimiento_Fuerza_Ella_a_El.png',
        ],
      },
      '1025 Días enamorándome de ti': {
        base: 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas',
        files: [
          'PLANTILLA_1_Amarte_es_Como_Tener_el_Sol_en_Casa_El_a_Ella.png',
          'PLANTILLA_1_Amarte_es_Como_Tener_el_Sol_en_Casa_Ella_a_El.png',
          'PLANTILLA_2_Estar_Contigo_es_Como_Vivir_en_un_Sueño_El_a_Ella.png',
          'PLANTILLA_2_Estar_Contigo_es_Como_Vivir_en_un_Sueño_Ella_a_El.png',
          'PLANTILLA_3_Tu_Risa_es_Como_Música_para_Mis_Oídos_El_a_Ella.png',
          'PLANTILLA_3_Tu_Risa_es_Como_Música_para_Mis_Oídos_Ella_a_El.png',
          'PLANTILLA_4_Tus_Ojos_Son_Como_Ventanas_al_Paraíso_El_a_Ella.png',
          'PLANTILLA_4_Tus_Ojos_Son_Como_Ventanas_al_Paraíso_Ella_a_El.png',
          'PLANTILLA_5_Tu_Voz_es_Como_Miel_para_Mi_Alma_El_a_Ella.png',
          'PLANTILLA_5_Tu_Voz_es_Como_Miel_para_Mi_Alma_Ella_a_El.png',
          'PLANTILLA_6_Tu_Abrazo_es_Como_Mi_Refugio_Seguro_El_a_Ella.png',
          'PLANTILLA_6_Tu_Abrazo_es_Como_Mi_Refugio_Seguro_Ella_a_El.png',
          'PLANTILLA_7_Tu_Sonrisa_es_Como_el_Arcoíris_Después_de_la_Lluvia_El_a_Ella.png',
          'PLANTILLA_7_Tu_Sonrisa_es_Como_el_Arcoíris_Después_de_la_Lluvia_Ella_a_El.png',
          'PLANTILLA_8_Nuestro_Primer_Beso_Fue_Magia_Pura_El_a_Ella.png',
          'PLANTILLA_8_Nuestro_Primer_Beso_Fue_Magia_Pura_Ella_a_El.png',
          'PLANTILLA_9_Cuando_Dijiste_Te_Amo_Por_Primera_Vez_El_a_Ella.png',
          'PLANTILLA_9_Cuando_Dijiste_Te_Amo_Por_Primera_Vez_Ella_a_El.png',
          'PLANTILLA_10_Nuestras_Nochoes_de_Películas_Son_Mi_Momento_Favorito_El_a_Ella.png',
          'PLANTILLA_10_Nuestras_Nochoes_de_Películas_Son_Mi_Momento_Favorito_Ella_a_El.png',
          'PLANTILLA_11_Despertar_Contigo_es_Como_Comenzar_en_el_Paraíso_El_a_Ella.png',
          'PLANTILLA_11_Despertar_Contigo_es_Como_Comenzar_en_el_Paraíso_Ella_a_El.png',
          'PLANTILLA_12_Nuestras_Aventuras_Juntos_Son_Inolvidables_El_a_Ella.png',
          'PLANTILLA_12_Nuestras_Aventuras_Juntos_Son_Inolvidables_Ella_a_El.png',
          'PLANTILLA_13_Bailar_Contigo_es_Como_Flotar_en_las_Nubes_El_a_Ella.png',
          'PLANTILLA_13_Bailar_Contigo_es_Como_Flotar_en_las_Nubes_Ella_a_El.png',
          'PLANTILLA_14_Nuestras_Conversaciones_Profundas_de_Madrugada_El_a_Ella.png',
          'PLANTILLA_14_Nuestras_Conversaciones_Profundas_de_Madrugada_Ella_a_El.png',
          'PLANTILLA_15_Me_Haces_Sentir_la_Persona_Más_Especial_del_Mundo_El_a_Ella.png',
          'PLANTILLA_15_Me_Haces_Sentir_la_Persona_Más_Especial_del_Mundo_Ella_a_El.png',
          'PLANTILLA_16_Contigo_Aprendí_Qué_es_el_Amor_Verdadero_El_a_Ella.png',
          'PLANTILLA_16_Contigo_Aprendí_Qué_es_el_Amor_Verdadero_Ella_a_El.png',
          'PLANTILLA_17_Me_Apoyas_en_Mis_Peores_Momentos_El_a_Ella.png',
          'PLANTILLA_17_Me_Apoyas_en_Mis_Peores_Momentos_Ella_a_El.png',
          'PLANTILLA_18_Me_Haces_Reír_Hasta_Que_Me_Duele_el_Estómago_El_a_Ella.png',
          'PLANTILLA_18_Me_Haces_Reír_Hasta_Que_Me_Duele_el_Estómago_Ella_a_El.png',
          'PLANTILLA_19_Me_Inspiras_a_Ser_Mejor_Persona_Cada_Día_El_a_Ella.png',
          'PLANTILLA_19_Me_Inspiras_a_Ser_Mejor_Persona_Cada_Día_Ella_a_El.png',
          'PLANTILLA_20_Cada_Día_Me_Enamoro_Más_de_Ti_El_a_Ella.png',
          'PLANTILLA_20_Cada_Día_Me_Enamoro_Más_de_Ti_Ella_a_El.png',
        ],
      },
      'Nuestro Angel de 4 patas': {
        base: 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas',
        files: [
          'PLANTILLA_1_Porque_Tu_Lugar_Favorito_Era_a_Mi_Lado.png',
          'PLANTILLA_2_Porque_Nuestros_Paseos_Eran_Nuestra_Aventura_Diaria.png',
          'PLANTILLA_3_Porque_Jugábamos_Como_Niños_Sin_Importar_la_Edad.png',
          'PLANTILLA_4_Porque_Siempre_Supiste_Cuándo_Necesitaba_un_Abrazo.png',
          'PLANTILLA_5_Porque_Me_Despertabas_Cada_Mañana_con_Tu_Amor.png',
          'PLANTILLA_6_Porque_Me_Enseñaste_Que_el_Amor_No_Necesita_Palabras.png',
          'PLANTILLA_7_Porque_Eras_Mi_Compañero_en_Cada_Aventura.png',
          'PLANTILLA_8_Porque_Tu_Comida_Favorita_Era_Cualquier_Cosa_Que_Yo_Comiera.png',
          'PLANTILLA_9_Porque_Protegías_Nuestra_Casa_Como_un_Verdadero_Guardián.png',
          'PLANTILLA_10_Porque_Tus_Travesuras_Me_Hacían_Reír_Incluso_Cuando_No_Debía.png',
          'PLANTILLA_11_Porque_Celebrábamos_Juntos_Cada_Momento_Especial.png',
          'PLANTILLA_12_Porque_Eras_Mi_Razón_Para_Llegar_a_Casa.png',
          'PLANTILLA_13_Porque_Me_Acompañabas_en_Mis_Momentos_de_Soledad.png',
          'PLANTILLA_14_Porque_Tus_Fotos_Llenan_Mi_Corazón_de_Recuerdos.png',
          'PLANTILLA_15_Porque_Me_Enseñaste_a_Vivir_el_Presente.png',
          'PLANTILLA_16_Porque_Tu_Amor_Era_Incondicional_y_Puro.png',
          'PLANTILLA_17_Porque_Compartimos_Silencios_Que_Decían_Todo.png',
          'PLANTILLA_18_Porque_Fuiste_Mi_Maestra_de_Amor_y_Lealtad.png',
          'PLANTILLA_19_Porque_Hiciste_de_Nuestra_Casa_un_Hogar.png',
          'PLANTILLA_20_Porque_Nuestro_Amor_Es_Eterno.png',
        ],
      },
      'Aventura entre patas': {
        base: 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas/Plantillas',
        files: [
          'PLANTILLA_1_Piratas_del_Tesoro_Escondido.png',
          'PLANTILLA_2_Superhéroes_al_Rescate.png',
          'PLANTILLA_3_Astronautas_en_el_Espacio.png',
          'PLANTILLA_4_Caballeros_del_Reino_Mágico.png',
          'PLANTILLA_5_Detectives_del_Misterio.png',
          'PLANTILLA_6_Científicos_Locos.png',
          'PLANTILLA_7_Ninjas_Secretos.png',
          'PLANTILLA_8_Magos_y_Hechiceros.png',
          'PLANTILLA_9_Mi_Guardián_Peludo.png',
          'PLANTILLA_10_Abrazos_Que_Curan_Todo.png',
          'PLANTILLA_11_Secretos_Entre_Mejores_Amigos.png',
          'PLANTILLA_12_Lágrimas_Secadas_Con_Lamidas.png',
          'PLANTILLA_13_Cama_Compartida.png',
          'PLANTILLA_14_Protector_de_Pesadillas.png',
          'PLANTILLA_15_El_Primer_Encuentro.png',
          'PLANTILLA_16_Escondidas_Imposibles.png',
          'PLANTILLA_17_Persecución_en_el_Jardín.png',
          'PLANTILLA_18_Clase_de_Trucos_Fallidos.png',
          'PLANTILLA_19_Aventureros_de_Dinosaurios.png',
          'PLANTILLA_20_Día_de_Playa_Perfecto.png',
        ],
      },
      'Mi amigo Miauravilloso': {
        base: 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas',
        files: [
          'PLANTILLA_1_Porque_Ignora_Mis_Llamados_Hasta_que_Abro_la_Comida.png',
          'PLANTILLA_2_Porque_Tira_Cosas_de_la_Mesa_Solo_para_Verme_Reaccionar.png',
          'PLANTILLA_3_Porque_Corre_Como_Loco_a_las_3_AM.png',
          'PLANTILLA_4_Porque_Se_Sienta_Justo_en_Mi_Teclado.png',
          'PLANTILLA_5_Porque_Cabe_en_Cualquier_Caja_No_Importa_el_Tamaño.png',
          'PLANTILLA_6_Porque_Actúa_Como_Si_Fuera_el_Dueño_de_la_Casa.png',
          'PLANTILLA_7_Porque_Ronronea_Cuando_Me_Ve.png',
          'PLANTILLA_8_Porque_Duerme_en_Mi_Regazo.png',
          'PLANTILLA_9_Porque_Me_Mira_con_Esos_Ojos_de_Amor.png',
          'PLANTILLA_10_Porque_Se_Acurruca_Junto_a_Mí_en_las_Noches_Frías.png',
          'PLANTILLA_11_Porque_Me_Elige_a_Mí.png',
          'PLANTILLA_12_Porque_Su_Ronroneo_Es_Mi_Canción_Favorita.png',
          'PLANTILLA_13_Porque_Explora_Cada_Rincón_de_la_Casa.png',
          'PLANTILLA_14_Porque_Caza_Sombras_y_Luces_Como_un_Guerrero.png',
          'PLANTILLA_15_Porque_Llegó_a_Mi_Vida_Cuando_Más_Lo_Necesitaba.png',
          'PLANTILLA_16_Porque_Es_Mi_Guardián_Místico_de_la_Noche.png',
          'PLANTILLA_17_Porque_Tiene_Nueve_Vidas_y_Mil_Aventuras.png',
          'PLANTILLA_18_Porque_Es_Mi_Mago_Peludo.png',
          'PLANTILLA_19_Porque_Es_Mi_Compañero_de_Sueños.png',
          'PLANTILLA_20_Porque_Es_Mi_Faro_en_la_Soledad.png',
        ],
      },
      'Mi mejor amigo del mundo': {
        base: 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas',
        files: [
          'PLANTILLA_1_Porque_Siempre_Me_Recibe_Como_Si_Fuera_una_Estrella.png',
          'PLANTILLA_2_Porque_Duerme_a_Mi_Lado_Todas_las_Noches.png',
          'PLANTILLA_3_Porque_Sabe_Cuándo_Necesito_un_Abrazo.png',
          'PLANTILLA_4_Porque_Me_Entiende_Sin_Palabras.png',
          'PLANTILLA_5_Porque_Su_Mirada_Lo_Dice_Todo.png',
          'PLANTILLA_6_Porque_Me_Ama_Sin_Condiciones.png',
          'PLANTILLA_7_Porque_Me_Roba_Mi_Lugar_en_el_Sofá.png',
          'PLANTILLA_8_Porque_Ocupa_Toda_la_Cama_y_Yo_Duermo_en_la_Orilla.png',
          'PLANTILLA_9_Porque_Roba_Mi_Comida_y_No_Puedo_Enojarme.png',
          'PLANTILLA_10_Porque_Pide_Comida_Con_Esa_Mirada_Que_No_Puedo_Resistir.png',
          'PLANTILLA_11_Porque_Corre_Como_Loco_Después_del_Baño.png',
          'PLANTILLA_12_Porque_Hace_las_Caras_Más_Chistosas.png',
          'PLANTILLA_13_Porque_Es_Mi_Compañero_de_Aventuras.png',
          'PLANTILLA_14_Porque_Siempre_Está_Ahí_Sin_Importar_Qué.png',
          'PLANTILLA_15_Porque_Me_Protege_Como_un_Guardián.png',
          'PLANTILLA_16_Porque_Juntos_Volamos_Sin_Alas.png',
          'PLANTILLA_17_Porque_Es_Mi_Superhéroe_Sin_Capa.png',
          'PLANTILLA_18_Porque_Convierte_lo_Ordinario_en_Extraordinario.png',
          'PLANTILLA_19_Porque_Ilumina_Mis_Días_Oscuros.png',
          'PLANTILLA_20_Porque_Es_Mi_Compañero_de_Aventuras_Infinitas.png',
        ],
      },
      'Papá, Mi Héroe': {
        base: 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas',
        files: [
          'PLANTILLA_1_Mi_Superhéroe_Personal.png',
          'PLANTILLA_2_Mi_Caballero_de_Armadura_Brillante.png',
          'PLANTILLA_3_Mi_Rey.png',
          'PLANTILLA_4_Mi_Ángel_Guardián.png',
          'PLANTILLA_5_Mi_Pirata_Aventurero.png',
          'PLANTILLA_6_Mi_Guerrero_Protector.png',
          'PLANTILLA_7_Mi_Capitán_Piloto.png',
          'PLANTILLA_8_Mi_Vikingo_Valiente.png',
          'PLANTILLA_9_Mi_Arquitecto_de_Sueños.png',
          'PLANTILLA_10_Mi_Gladiador.png',
          'PLANTILLA_11_Mi_Samurái.png',
          'PLANTILLA_12_Mi_Titán.png',
          'PLANTILLA_13_Mi_Primer_Amor.png',
          'PLANTILLA_14_Cuando_Bailamos_en_la_Sala.png',
          'PLANTILLA_15_Me_Enseñaste_Que_Soy_Una_Princesa.png',
          'PLANTILLA_16_Nuestras_Citas_de_Padre_e_Hija.png',
          'PLANTILLA_17_Cuando_Me_Peinas_Aunque_No_Sepas.png',
          'PLANTILLA_18_El_Hombre_Que_Me_Enseñó_Cómo_Debo_Ser_Tratada.png',
          'PLANTILLA_19_Cuando_Me_Haces_Sentir_La_Más_Bonita.png',
          'PLANTILLA_20_Seré_Tu_Niña_Para_Siempre.png',
        ],
      },
      'Mamá, Mi Heroína': {
        base: 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas',
        files: [
          'PLANTILLA_1_Mi_Superheroína_Sin_Capa.png',
          'PLANTILLA_2_La_Guerrera_Que_Nunca_Se_Rinde.png',
          'PLANTILLA_3_Mi_Reina_Mi_Todo.png',
          'PLANTILLA_4_Mi_Ángel_Protector.png',
          'PLANTILLA_5_La_Maga_de_Mi_Vida.png',
          'PLANTILLA_6_Mi_Capitana_del_Corazón.png',
          'PLANTILLA_7_Mi_Ninja_Silenciosa.png',
          'PLANTILLA_8_Mi_Amazona_Guerrera.png',
          'PLANTILLA_9_Mi_Diosa_del_Amor_Eterno.png',
          'PLANTILLA_10_Mi_Titán_Inquebrantable.png',
          'PLANTILLA_11_Mi_Samurái_de_Honor.png',
          'PLANTILLA_12_La_Heroína_Que_No_Necesita_Capa.png',
          'PLANTILLA_13_Tus_Abrazos_Mágicos.png',
          'PLANTILLA_14_El_Ritual_Más_Sagrado.png',
          'PLANTILLA_15_Recetas_de_Amor.png',
          'PLANTILLA_16_Mi_Valiente_Compañera.png',
          'PLANTILLA_17_Mi_Enfermera_del_Alma.png',
          'PLANTILLA_18_Secadora_de_Tristezas.png',
          'PLANTILLA_19_Lecciones_de_Fortaleza.png',
          'PLANTILLA_20_Mamá_Mi_Mejor_Amiga.png',
        ],
      },
      'Te amo, abuelo': {
        base: 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas',
        files: [
          'PLANTILLA_1_Mi_Superhéroe_de_Canas_Plateadas.png',
          'PLANTILLA_2_El_Rey_de_Mi_Corazón.png',
          'PLANTILLA_3_Mi_Caballero_de_Armadura_Dorada.png',
          'PLANTILLA_4_El_Ángel_Guardián_de_la_Familia.png',
          'PLANTILLA_5_Capitán_de_Mil_Aventuras.png',
          'PLANTILLA_6_El_Sabio_de_Todas_las_Historias.png',
          'PLANTILLA_7_Mi_Guerrero_Invencible.png',
          'PLANTILLA_8_El_Arquitecto_de_Mis_Recuerdos.png',
          'PLANTILLA_9_Mi_Titán_de_Amor.png',
          'PLANTILLA_10_El_Guardián_del_Tiempo.png',
          'PLANTILLA_11_Mi_Faro_en_la_Tormenta.png',
          'PLANTILLA_12_El_Gigante_de_Corazón_Tierno.png',
          'PLANTILLA_13_Tus_Historias_Mágicas.png',
          'PLANTILLA_14_Aventuras_en_Tu_Jardín.png',
          'PLANTILLA_15_Las_Lecciones_Que_Solo_Tú_Me_Das.png',
          'PLANTILLA_16_Nuestros_Secretos_Compartidos.png',
          'PLANTILLA_17_Cuando_Me_Haces_Reír.png',
          'PLANTILLA_18_Tu_Abrazo_Que_Todo_lo_Arregla.png',
          'PLANTILLA_19_Enseñándome_el_Mundo.png',
          'PLANTILLA_20_Siempre_Seré_Tu_Pequeño.png',
        ],
      },
      'Te amo, abuela': {
        base: 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas',
        files: [
          'PLANTILLA_1_Abrazos_Que_Curan_Todo.png',
          'PLANTILLA_2_Cuentos_Antes_de_Dormir.png',
          'PLANTILLA_3_Las_Galletas_Más_Ricas_del_Mundo.png',
          'PLANTILLA_4_Secretos_Entre_Nosotros.png',
          'PLANTILLA_5_Cuando_Me_Consientes.png',
          'PLANTILLA_6_Tus_Manos_Mágicas.png',
          'PLANTILLA_7_Durmiendo_en_Tu_Regazo.png',
          'PLANTILLA_8_Me_Enseñaste_A.png',
          'PLANTILLA_9_Tus_Consejos_de_Oro.png',
          'PLANTILLA_10_Cuando_Lloro_Tú_Entiendes.png',
          'PLANTILLA_11_Fotos_del_Pasado.png',
          'PLANTILLA_12_Eres_Mi_Segunda_Mamá.png',
          'PLANTILLA_13_El_Jardín_Encantado_de_la_Abuela.png',
          'PLANTILLA_14_Viajeros_del_Tiempo.png',
          'PLANTILLA_15_Príncipe_de_la_Abuela.png',
          'PLANTILLA_16_Aventureros_en_la_Biblioteca.png',
          'PLANTILLA_17_Superheroína_Abuela.png',
          'PLANTILLA_18_Tu_Legado_de_Amor.png',
          'PLANTILLA_19_Cuando_Crezca_Seré_Como_Tú.png',
          'PLANTILLA_20_Gracias_Por_Ser_Mi_Abuela.png',
        ],
      },
      'El Mejor Equipo': {
        base: 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas',
        files: [
          'PLANTILLA_1_Parque_Triásico.png',
          'PLANTILLA_2_Nave_de_las_Nubes.png',
          'PLANTILLA_3_Laboratorio_de_Juegos.png',
          'PLANTILLA_4_Mansión_Encantada.png',
          'PLANTILLA_5_Castillo_de_Cojines.png',
          'PLANTILLA_6_Cueva_del_Tesoro_Escondido.png',
          'PLANTILLA_7_Batalla_de_Almohadas.png',
          'PLANTILLA_8_Galería_de_los_Genios.png',
          'PLANTILLA_9_Agencia_Secreta_de_Detectives.png',
          'PLANTILLA_10_Máquina_del_Tiempo.png',
          'PLANTILLA_11_Isla_Calavera.png',
          'PLANTILLA_12_Valle_de_los_Dragones.png',
          'PLANTILLA_13_Torre_de_los_Códigos.png',
          'PLANTILLA_14_Templo_Kung_Fu.png',
          'PLANTILLA_15_Taller_de_Magia_Creativa.png',
          'PLANTILLA_16_Jardín_de_las_Maravillas.png',
          'PLANTILLA_17_Laboratorio_de_Bromas.png',
          'PLANTILLA_18_Bosque_de_los_Enigmas.png',
          'PLANTILLA_19_Pista_de_Obstáculos_Fantásticos.png',
          'PLANTILLA_20_País_de_las_Maravillas_Nocturnas.png',
        ],
      },
      'Mi Familia': {
        base: 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas',
        files: [
          'PLANTILLA_1_Si_Fuéramos_Cavernícolas.png',
          'PLANTILLA_2_Si_Pudiéramos_Hablar_Con_Los_Animales.png',
          'PLANTILLA_3_Si_Fuéramos_Astronautas.png',
          'PLANTILLA_4_Si_Estuviéramos_Atascados_En_El_Tráfico.png',
          'PLANTILLA_5_Si_El_Supermercado_Fuera_Un_Castillo_Encantado.png',
          'PLANTILLA_6_Si_Fuéramos_Piratas.png',
          'PLANTILLA_7_Si_La_Sala_Fuera_Una_Jungla.png',
          'PLANTILLA_8_Si_La_Cocina_Fuera_Un_Laboratorio_Loco.png',
          'PLANTILLA_9_Si_Viajáramos_En_Globo_Por_El_Cielo.png',
          'PLANTILLA_10_Si_Tuviéramos_Superpoderes.png',
          'PLANTILLA_11_Si_Fuéramos_Exploradores_De_Tesoros.png',
          'PLANTILLA_12_Si_El_Jardín_Fuera_Un_Circo_Mágico.png',
          'PLANTILLA_13_Si_Fuéramos_Inventores_Locos.png',
          'PLANTILLA_14_Si_La_Noche_Fuera_Un_Cuento_De_Hadas.png',
          'PLANTILLA_15_Si_El_Parque_Fuera_Un_Reino_Fantástico.png',
          'PLANTILLA_16_Si_El_Baño_Fuera_Un_Spa_De_Sirenas.png',
          'PLANTILLA_17_Si_La_Casa_Fuera_Una_Nave_Espacial.png',
          'PLANTILLA_18_Si_La_Cocina_Fuera_Una_Pastelería_Mágica.png',
          'PLANTILLA_19_Si_El_Salón_Fuera_Una_Pista_De_Baile.png',
          'PLANTILLA_20_Si_La_Familia_Fuera_Un_Cuento_Sin_Final.png',
        ],
      },
      'Mi angel guardian': {
        base: 'IA_Books/Memorial_Books_Page/Libros/Mi_angel_guardian/Plantillas',
        files: [
          'PLANTILLA_01_Memoria_Familiar_Madre_Porque_eres_mi_Superheroína.png',
          'PLANTILLA_01_Memoria_Familiar_Padre_Porque_eres_mi_Superhéroe.png',
          'PLANTILLA_02_Memoria_Familiar_Madre_Porque_eres_mi_Guía.png',
          'PLANTILLA_02_Memoria_Familiar_Padre_Porque_eres_mi_Guía.png',
          'PLANTILLA_03_Memoria_Familiar_Madre_Porque_eres_una_Hechicera.png',
          'PLANTILLA_03_Memoria_Familiar_Padre_Porque_eres_un_Hechicero.png',
          'PLANTILLA_04_Memoria_Familiar_Madre_Porque_eres_una_Reina_Líder.png',
          'PLANTILLA_04_Memoria_Familiar_Padre_Porque_eres_un_Rey_Líder.png',
          'PLANTILLA_05_Memoria_Familiar_Madre_Porque_eres_Encantadora.png',
          'PLANTILLA_05_Memoria_Familiar_Padre_Porque_eres_Encantador.png',
          'PLANTILLA_06_Memoria_Familiar_Madre_Porque_eres_Aventurera.png',
          'PLANTILLA_06_Memoria_Familiar_Padre_Porque_eres_Aventurero.png',
          'PLANTILLA_07_Memoria_Familiar_Madre_Porque_eres_Divertida.png',
          'PLANTILLA_07_Memoria_Familiar_Padre_Porque_eres_Divertido.png',
          'PLANTILLA_08_Memoria_Familiar_Madre_Porque_cumples_mis_Deseos.png',
          'PLANTILLA_08_Memoria_Familiar_Padre_Porque_cumples_mis_Deseos.png',
          'PLANTILLA_09_Memoria_Familiar_Madre_Porque_eres_Valiente.png',
          'PLANTILLA_09_Memoria_Familiar_Padre_Porque_eres_Valiente.png',
          'PLANTILLA_10_Memoria_Familiar_Madre_Porque_eres_una_Soñadora.png',
          'PLANTILLA_10_Memoria_Familiar_Padre_Porque_eres_un_Soñador.png',
          'PLANTILLA_11_Memoria_Familiar_Madre_Porque_me_haces_sentir_a_Salvo.png',
          'PLANTILLA_11_Memoria_Familiar_Padre_Porque_me_haces_sentir_a_Salvo.png',
          'PLANTILLA_12_Memoria_Familiar_Madre_Porque_eres_Generosa.png',
          'PLANTILLA_12_Memoria_Familiar_Padre_Porque_eres_Generoso.png',
          'PLANTILLA_13_Memoria_Familiar_Madre_Porque_eres_Atrevida.png',
          'PLANTILLA_13_Memoria_Familiar_Padre_Porque_eres_Atrevido.png',
          'PLANTILLA_14_Memoria_Familiar_Madre_Porque_eres_una_Rebelde.png',
          'PLANTILLA_14_Memoria_Familiar_Padre_Porque_eres_un_Rebelde.png',
          'PLANTILLA_15_Memoria_Familiar_Madre_Porque_eres_Alegre.png',
          'PLANTILLA_15_Memoria_Familiar_Padre_Porque_eres_Alegre.png',
          'PLANTILLA_16_Memoria_Familiar_Madre_Porque_eres_mi_Guardiana_de_Historias.png',
          'PLANTILLA_16_Memoria_Familiar_Padre_Porque_eres_mi_Guardián_de_Historias.png',
          'PLANTILLA_17_Memoria_Familiar_Madre_Porque_eres_mi_Raíz_y_mi_Fuerza.png',
          'PLANTILLA_17_Memoria_Familiar_Padre_Porque_eres_mi_Raíz_y_mi_Fuerza.png',
          'PLANTILLA_18_Memoria_Familiar_Madre_Porque_eres_mi_Estrella_Guía.png',
          'PLANTILLA_18_Memoria_Familiar_Padre_Porque_eres_mi_Estrella_Guía.png',
          'PLANTILLA_19_Memoria_Familiar_Madre_Porque_eres_mi_Viajera_del_Tiempo.png',
          'PLANTILLA_19_Memoria_Familiar_Padre_Porque_eres_mi_Viajero_del_Tiempo.png',
          'PLANTILLA_20_Memoria_Familiar_Madre_Porque_eres_mi_Ángel_Guardián.png',
          'PLANTILLA_20_Memoria_Familiar_Padre_Porque_eres_mi_Ángel_Guardián.png',
        ],
      },
      'Siempre seras parte de mi': {
        base: 'IA_Books/Memorial_Books_Page/Libros/Siempre_seras_parte_de_mi/Plantillas',
        files: [
          'PLANTILLA_01_Memoria_Familiar_Hermano_Porque_somos_el_Mejor_Equipo.png',
          'PLANTILLA_02_Memoria_Familiar_Hermano_Porque_somos_Cómplices_de_Travesuras.png',
          'PLANTILLA_03_Memoria_Familiar_Hermano_Porque_nuestras_Locuras_Tienen_Sentido.png',
          'PLANTILLA_04_Memoria_Familiar_Hermano_Porque_resolvemos_Todos_los_Misterios.png',
          'PLANTILLA_05_Memoria_Familiar_Hermano_Porque_eres_mi_Compañero_de_Infinito.png',
          'PLANTILLA_06_Memoria_Familiar_Hermano_Porque_eres_mi_Copiloto_Eterno.png',
          'PLANTILLA_07_Memoria_Familiar_Hermano_Porque_llegamos_Hasta_el_Fin_del_Mundo.png',
          'PLANTILLA_08_Memoria_Familiar_Hermano_Porque_viajamos_en_Nuestro_Propio_Tiempo.png',
          'PLANTILLA_09_Memoria_Familiar_Hermano_Porque_volamos_a_Nunca_Jamás.png',
          'PLANTILLA_10_Memoria_Familiar_Hermano_Porque_nos_Protegemos_la_Espalda.png',
          'PLANTILLA_11_Memoria_Familiar_Hermano_Porque_juntos_Somos_Invencibles.png',
          'PLANTILLA_12_Memoria_Familiar_Hermano_Porque_somos_Cazafantasmas_de_Miedos.png',
          'PLANTILLA_13_Memoria_Familiar_Hermano_Porque_somos_el_Yin_de_mi_Yang.png',
          'PLANTILLA_14_Memoria_Familiar_Hermano_Porque_eres_mi_Refugio_Constante.png',
          'PLANTILLA_15_Memoria_Familiar_Hermano_Porque_somos_Rivales_y_Mejores_Amigos.png',
          'PLANTILLA_16_Memoria_Familiar_Hermano_Porque_cantamos_la_Misma_Canción.png',
          'PLANTILLA_17_Memoria_Familiar_Hermano_Porque_eres_la_Magia_de_mi_Invierno.png',
          'PLANTILLA_18_Memoria_Familiar_Hermano_Porque_nos_reímos_del_Peligro.png',
          'PLANTILLA_19_Memoria_Familiar_Hermano_Porque_nuestros_Caminos_Siempre_se_Cruzan.png',
          'PLANTILLA_20_Memoria_Familiar_Hermano_Porque_nuestro_Vínculo_es_Eterno.png',
        ],
      },
      'Siempre en mi corazon': {
        base: 'IA_Books/Memorial_Books_Page/Libros/Siempre_en_mi_corazon/Plantillas',
        files: [
          'PLANTILLA_01_Memoria_Familiar_Abuela_Porque_eres_mi_Superheroína.png',
          'PLANTILLA_01_Memoria_Familiar_Abuelo_Porque_eres_mi_Superhéroe.png',
          'PLANTILLA_02_Memoria_Familiar_Abuela_Porque_eres_mi_Guía.png',
          'PLANTILLA_02_Memoria_Familiar_Abuelo_Porque_eres_mi_Guía.png',
          'PLANTILLA_03_Memoria_Familiar_Abuela_Porque_eres_una_Hechicera.png',
          'PLANTILLA_03_Memoria_Familiar_Abuelo_Porque_eres_un_Hechicero.png',
          'PLANTILLA_04_Memoria_Familiar_Abuela_Porque_eres_una_Líder.png',
          'PLANTILLA_04_Memoria_Familiar_Abuelo_Porque_eres_un_Líder.png',
          'PLANTILLA_05_Memoria_Familiar_Abuela_Porque_eres_Encantadora.png',
          'PLANTILLA_05_Memoria_Familiar_Abuelo_Porque_eres_Encantador.png',
          'PLANTILLA_06_Memoria_Familiar_Abuela_Porque_eres_Aventurera.png',
          'PLANTILLA_06_Memoria_Familiar_Abuelo_Porque_eres_Aventurero.png',
          'PLANTILLA_07_Memoria_Familiar_Abuela_Porque_eres_Divertida.png',
          'PLANTILLA_07_Memoria_Familiar_Abuelo_Porque_eres_Divertido.png',
          'PLANTILLA_08_Memoria_Familiar_Abuela_Porque_cumples_mis_Deseos.png',
          'PLANTILLA_08_Memoria_Familiar_Abuelo_Porque_cumples_mis_Deseos.png',
          'PLANTILLA_09_Memoria_Familiar_Abuela_Porque_eres_Valiente.png',
          'PLANTILLA_09_Memoria_Familiar_Abuelo_Porque_eres_Valiente.png',
          'PLANTILLA_10_Memoria_Familiar_Abuela_Porque_eres_una_Soñadora.png',
          'PLANTILLA_10_Memoria_Familiar_Abuelo_Porque_eres_un_Soñador.png',
          'PLANTILLA_11_Memoria_Familiar_Abuela_Porque_me_haces_sentir_Seguro.png',
          'PLANTILLA_11_Memoria_Familiar_Abuelo_Porque_me_haces_sentir_Seguro.png',
          'PLANTILLA_12_Memoria_Familiar_Abuela_Porque_eres_Generosa.png',
          'PLANTILLA_12_Memoria_Familiar_Abuelo_Porque_eres_Generoso.png',
          'PLANTILLA_13_Memoria_Familiar_Abuela_Porque_eres_Atrevida.png',
          'PLANTILLA_13_Memoria_Familiar_Abuelo_Porque_eres_Atrevido.png',
          'PLANTILLA_14_Memoria_Familiar_Abuela_Porque_eres_una_Rebelde.png',
          'PLANTILLA_14_Memoria_Familiar_Abuelo_Porque_eres_un_Rebelde.png',
          'PLANTILLA_15_Memoria_Familiar_Abuela_Porque_eres_Alegre.png',
          'PLANTILLA_15_Memoria_Familiar_Abuelo_Porque_eres_Alegre.png',
          'PLANTILLA_16_Memoria_Familiar_Abuela_Porque_eres_mi_Guardiana_de_Historias.png',
          'PLANTILLA_16_Memoria_Familiar_Abuelo_Porque_eres_mi_Guardián_de_Historias.png',
          'PLANTILLA_17_Memoria_Familiar_Abuela_Porque_eres_mi_Raíz_y_mi_Fuerza.png',
          'PLANTILLA_17_Memoria_Familiar_Abuelo_Porque_eres_mi_Raíz_y_mi_Fuerza.png',
          'PLANTILLA_18_Memoria_Familiar_Abuela_Porque_eres_mi_Estrella_Guía.png',
          'PLANTILLA_18_Memoria_Familiar_Abuelo_Porque_eres_mi_Estrella_Guía.png',
          'PLANTILLA_19_Memoria_Familiar_Abuela_Porque_eres_mi_Viajera_del_Tiempo.png',
          'PLANTILLA_19_Memoria_Familiar_Abuelo_Porque_eres_mi_Viajero_del_Tiempo.png',
          'PLANTILLA_20_Memoria_Familiar_Abuela_Porque_eres_mi_Ángel_Guardián.png',
          'PLANTILLA_20_Memoria_Familiar_Abuelo_Porque_eres_mi_Ángel_Guardián.png',
        ],
      },
      'Gracias por tu amor': {
        base: 'IA_Books/Memorial_Books_Page/Libros/Gracias_por_tu_amor/Plantillas',
        files: [
          'PLANTILLA_01_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Niños.png',
          'PLANTILLA_02_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Estrellas_de_Rock.png',
          'PLANTILLA_03_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Exploradores.png',
          'PLANTILLA_04_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Chefs_Expertos.png',
          'PLANTILLA_05_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Piratas.png',
          'PLANTILLA_06_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Astronautas.png',
          'PLANTILLA_07_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Pilotos.png',
          'PLANTILLA_08_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Magos.png',
          'PLANTILLA_09_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Artistas.png',
          'PLANTILLA_10_Memoria_Familiar_Tia_Porque_nos_divertimos_como_Bailarines.png',
          'PLANTILLA_11_Memoria_Familiar_Tia_Porque_eres_el_Alma_de_la_Fiesta.png',
          'PLANTILLA_12_Memoria_Familiar_Tia_Porque_eres_mi_Cómplice_Perfecto.png',
          'PLANTILLA_13_Memoria_Familiar_Tia_Porque_me_enseñaste_a_Romper_las_Reglas.png',
          'PLANTILLA_14_Memoria_Familiar_Tia_Porque_hacíamos_el_Mejor_Equipo.png',
          'PLANTILLA_15_Memoria_Familiar_Tia_Porque_eres_la_Guardiana_de_mis_Secretos.png',
          'PLANTILLA_16_Memoria_Familiar_Tia_Porque_tus_Abrazos_Curaban_Todo.png',
          'PLANTILLA_17_Memoria_Familiar_Tia_Porque_iluminabas_los_Días_Grises.png',
          'PLANTILLA_18_Memoria_Familiar_Tia_Porque_eres_mi_Heroína_Secreta.png',
          'PLANTILLA_19_Memoria_Familiar_Tia_Porque_tus_Recuerdos_son_mi_Tesoro.png',
          'PLANTILLA_20_Memoria_Familiar_Tia_Porque_nuestra_Familia_es_Eterna.png',
        ],
      },
    };

    // Función auxiliar: extrae nombre legible del archivo (quita PLANTILLA_XX_ y .png, reemplaza _ con espacio)
    function fileToName(filename: string): string {
      return filename
        .replace(/\.png$/i, '')
        .replace(/^PLANTILLA_\d+_/, '')
        .replace(/_/g, ' ')
        .trim();
    }

    // "Siempre en mi Corazón" (Abuelo/Abuela) y "Mi Ángel Guardián" (Padre/Madre) tienen
    // dos variantes del homenajeado mezcladas en la misma carpeta — se distinguen por el
    // nombre del archivo. gender_direction guarda "M"/"F" y el wizard filtra por el género
    // del homenajeado (recipientGender), ya recogido en el paso 1 de estos dos libros.
    // Los libros de Amor (10 Razones, 1025 Días, Mi Amor) tienen dos variantes por escena
    // (dedicante→destinatario), distinguidas por el sufijo "El_a_Ella"/"Ella_a_El" del
    // nombre de archivo — gender_direction guarda "HE_TO_SHE"/"SHE_TO_HE" y el wizard
    // filtra por genderDirection (dedicante+destinatario), calculado en el paso previo.
    function fileToGender(filename: string): string | null {
      if (/_(Abuelo|Padre)_/.test(filename)) return 'M';
      if (/_(Abuela|Madre)_/.test(filename)) return 'F';
      if (/_El_a_Ella\.png$/.test(filename)) return 'HE_TO_SHE';
      if (/_Ella_a_El\.png$/.test(filename)) return 'SHE_TO_HE';
      return null;
    }

    for (const [modelName, data] of Object.entries(templateData)) {
      const modelId = model[modelName];
      if (!modelId) {
        console.warn(`[seed] Modelo "${modelName}" no encontrado, saltando plantillas`);
        continue;
      }
      for (const file of data.files) {
        const key = `${data.base}/${file}`.normalize('NFC');
        const name = fileToName(file);
        const gender = fileToGender(file);
        await client.query(`
          INSERT INTO personalized_templates (model_id, name, template_preview_key, gender_direction)
          SELECT $1, $2, $3, $4
          WHERE NOT EXISTS (
            SELECT 1 FROM personalized_templates
            WHERE model_id = $1 AND template_preview_key = $3
          )
        `, [modelId, name, key, gender]);
      }
    }
    console.log('[seed] personalized_templates ✓');

    // Backfill: filas insertadas antes de que fileToGender() reconociera el sufijo
    // "El_a_Ella"/"Ella_a_El" de Amor se quedaron con gender_direction NULL para siempre
    // (el INSERT de arriba usa WHERE NOT EXISTS, así que nunca las vuelve a tocar).
    // Guardado por "IS NULL" — no pisa nada que ya esté bien, seguro de re-correr.
    await client.query(`
      UPDATE personalized_templates SET gender_direction = 'HE_TO_SHE'
      WHERE gender_direction IS NULL AND template_preview_key LIKE '%\\_El\\_a\\_Ella.png'
    `);
    await client.query(`
      UPDATE personalized_templates SET gender_direction = 'SHE_TO_HE'
      WHERE gender_direction IS NULL AND template_preview_key LIKE '%\\_Ella\\_a\\_El.png'
    `);
    console.log('[seed] personalized_templates.gender_direction backfill (Amor) ✓');

    // Las filas que a esta altura SIGUEN con gender_direction NULL son las 20
    // por libro (60 en total) del formato viejo sin sufijo de género —
    // huérfanas de antes del split "_El_a_Ella"/"_Ella_a_El", sin contenido
    // de prompt y nunca alcanzadas por el backfill de arriba (su
    // template_preview_key no matchea ningún LIKE). El wizard filtraba
    // "gender_direction === null" como "aplica a ambas direcciones" —
    // pensado para memorial, pero en Amor mezclaba estas 20 plantillas
    // rotas junto a las 20 reales de cada dirección en el paso de elegir
    // plantillas: el cliente podía elegirlas sin error, y recién explotaba
    // en el backoffice al generar la imagen. No se pueden borrar (hay una
    // orden y una demo históricas con selecciones apuntando a estos ids),
    // así que se desactivan: is_active=false ya está excluido del listado
    // de plantillas por modelo (WHERE isActive = TRUE), sin afectar las
    // vistas de admin ni la regeneración, que buscan por id sin ese filtro.
    await client.query(`
      UPDATE personalized_templates SET is_active = false
      WHERE gender_direction IS NULL
        AND model_id IN (SELECT id FROM personalized_models WHERE category_id = $1)
    `, [cat['Libros de Amor']]);
    console.log('[seed] personalized_templates huérfanas de Amor desactivadas ✓');

    // Bloques de prompt compartidos (prompt_shared_blocks) — mismo problema que el
    // backfill de abajo: solo vivían en Postgres local, cargados a mano. Sin esto,
    // buildGenerationPrompt() revienta con "Cannot read properties of undefined
    // (reading 'replace')" al armar el prompt final, incluso con el contenido de
    // la plantilla (scene_visual/poem_template) ya cargado.
    await client.query(
      readFileSync(join(__dirname, 'content/prompt-shared-blocks.sql'), 'utf8'),
    );
    console.log('[seed] prompt_shared_blocks ✓');

    // Backfill del contenido de prompt (scene_visual/poem_template/character_roles/etc)
    // para las 120 plantillas activas de Amor. Vivía solo como un .sql suelto generado
    // por el pipeline de PromptsPixelArtPlantillas (carpeta sin trackear en git) y
    // corrido a mano contra Postgres local — nunca llegó a ningún otro ambiente.
    // Matchea por template_preview_key (igual en todo ambiente, viene del mismo
    // nombre de archivo) en vez de por id (los ids divergen entre bases distintas).
    // Es un UPDATE incondicional (no "IS NULL") a propósito: si el contenido maestro
    // se corrige más adelante, este archivo se actualiza y el fix llega solo en el
    // siguiente boot, sin backfill manual de nuevo.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-amor-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Amor) ✓');

    // Corrige personalized_templates.name para "Mi Amor": las 20 plantillas
    // "El a Ella" imprimían el mismo título masculino que su par "Ella a El"
    // (fileToName() solo hace reemplazo mecánico de texto, nunca tradujo
    // género — bug real: destinataria mujer pero título "MI SUPERHÉROE
    // PERSONAL"). De paso corrige 4 títulos masculinos desalineados de su
    // propio contenido (Plantilla 3 imprimía "Mi Thor Dios del Trueno",
    // nombre de marca registrada, aunque la escena ya no menciona a Thor;
    // 17/19/20 sin tilde). Ver detalle en el propio .sql.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-amor-title-gender-fix.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates.name gender fix (Mi Amor) ✓');

    // Backfill del contenido de prompt para los 6 libros de Familia (díada:
    // Mamá/Papá/Abuela/Abuelo; reparto variable: Mi Familia/El Mejor Equipo).
    // Mismo patrón que Amor: matchea por template_preview_key, idempotente
    // (UPDATE incondicional). Generado desde el .md del catálogo con las
    // limpiezas de size/edad/identidad; las poses íntimas (abrazo/beso) se
    // dejan intactas a pedido.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-familia-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Familia) ✓');

    // Backfill del contenido de prompt para los 3 libros díada de Mascotas
    // (Mi Amigo Miau-ravilloso, El Mejor Amigo del Mundo, Nuestro Ángel de 4
    // Patas — 60 plantillas). Mismo patrón: matchea por template_preview_key,
    // idempotente.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-mascotas-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Mascotas) ✓');

    // Backfill de Aventuras Entre Patas (20 plantillas) — reparto variable de
    // 1 a 3 hermanos (numOwners del wizard, sin edad fija), a diferencia del
    // resto del catálogo de Mascotas que trae reparto fijo. El elenco se
    // colectiviza ("los niños") en vez de nombrar individuos, mismo patrón
    // que Mi Familia/El Mejor Equipo — necesario porque character_roles=
    // "owners" siempre manda TODAS las fotos de referencia reales, sin
    // importar cuántas sean.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-aventuras-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Aventuras Entre Patas) ✓');

    // Backfill de Gracias por tu amor (Memorias Familiares, 20 plantillas) —
    // díada estándar tía fallecida (recipient) + sobrino/a que dedica
    // (dedicator), ambos humanos con identidad real. No necesita
    // needsDualIdentity: a diferencia de Mascotas (mascota+humano usan
    // bloques de identidad DISTINTOS), acá los dos personajes son humanos y
    // el bloque identidad_humano ya es genérico para N personas. Apodo
    // cariñoso de los poemas ("Sil") -> {APODO_DESTINATARIO}.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-gracias-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Gracias por tu amor) ✓');

    // Backfill de Siempre Serás Parte de Mí (Memorias Familiares, 20
    // plantillas) — hermano/a fallecido (recipient, siempre 1) + hermano/a(s)
    // vivo/s que dedican (livingSiblings, array de 1 o 2 según numSiblings
    // del wizard). Mismo mismatch que Aventuras Entre Patas: el .md original
    // asumía fijo a un solo hermano vivo nombrado (Emiliano); se colectivizó
    // a "tus hermanos" porque livingSiblings siempre se resuelve completo,
    // sin importar cuántos sean.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-siempre-seras-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Siempre Serás Parte de Mí) ✓');

    // Backfill de Mi Ángel Guardián (Memorias Familiares, 40 plantillas = 20
    // Padre + 20 Madre, distinguidas por gender_direction M/F). Reparto FIJO
    // en ambos archivos fuente (padre/madre fallecido + un solo hijo/a que
    // dedica) — a diferencia de los 2 libros anteriores de esta categoría,
    // acá no hay selector de cantidad variable en el wizard, así que el
    // backfill es sustitución mecánica de nombres, no colectivización.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-angel-guardian-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Mi Ángel Guardián) ✓');

    // Backfill de Siempre en mi Corazón (Memorias Familiares, 40 plantillas
    // = 20 Abuela + 20 Abuelo, gender_direction F/M). Misma arquitectura
    // fija que Mi Ángel Guardián: abuelo/a fallecido + un solo nieto/a que
    // dedica, sustitución mecánica de nombres.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-siempre-corazon-content.sql'), 'utf8'),
    );
    console.log('[seed] personalized_templates content backfill (Siempre en mi Corazón) ✓');

    // Slugs reales de categorías/modelos (para las URLs de los QR de la
    // página de venta cruzada) — copiados 1:1 del mapa LIBRO_NAMES que hoy
    // vive hardcodeado en el frontend.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-slugs.sql'), 'utf8'),
    );
    console.log('[seed] slugs de categorías/modelos ✓');

    // Contenido de tapa/contratapa del libro piloto de Fase B/C ("10 Razones
    // por las que Te Amo") — el resto del catálogo se backfillea aparte
    // (Fase D), una vez validado el flujo end-to-end con este libro.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-cover-content.sql'), 'utf8'),
    );
    console.log('[seed] contenido de tapa/contratapa (piloto) ✓');

    // Fase D: resto del catálogo — contratapa completa (16 libros + 3
    // categorías), tapa solo para los 10 libros sin tratamiento especial de
    // identidad (ver comentario en el .sql para los 6 casos que quedan
    // pendientes: Mi Amor, Nuestro Angel de 4 patas, y las 4 de Memorias
    // Familiares).
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-tapa-contratapa-resto.sql'), 'utf8'),
    );
    console.log('[seed] contenido de tapa/contratapa (resto del catálogo) ✓');

    // Fix: la contratapa generaba con un solo fondo compartido para los 17
    // libros (el de "10 Razones", copiado por error como si fuera genérico)
    // — carga la escena propia de cada libro en back_cover_scene.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-back-cover-scene.sql'), 'utf8'),
    );
    console.log('[seed] escena de contratapa por libro ✓');

    // Cierre de Fase D: cover_scene_visual de los 6 libros con tratamiento de
    // identidad especial (persona/mascota fallecida etérea, vestuario de
    // época) que backfill-tapa-contratapa-resto.sql dejó afuera a propósito.
    await client.query(
      readFileSync(join(__dirname, 'content/backfill-tapa-pendientes.sql'), 'utf8'),
    );
    console.log('[seed] contenido de tapa (6 libros pendientes) ✓');

    // ── 3.5. model cover assets (miniaturas de libros personalizados) ──────────
    // Registra los assets de miniaturas en la tabla assets y los vincula a cada
    // modelo via cover_asset_id. Usa encode(digest(...)) para hash determinístico.
    // Es idempotente: ON CONFLICT(content_hash) DO NOTHING + WHERE cover_asset_id IS NULL.
    const modelCoverSeeds: { modelName: string; storageKey: string }[] = [
      { modelName: '10 Razones por las que Te Amo',  storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_10RazonesPorLasQueTeAmo_Miniatura.png' },
      { modelName: 'Mi Amor',                        storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_Miamor_Miniatura.png' },
      { modelName: '1025 Días enamorándome de ti',   storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png' },
      { modelName: 'Nuestro Angel de 4 patas',       storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_NuestroAngelde4Patas_Miniatura.png' },
      { modelName: 'Aventura entre patas',           storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Miniatura.png' },
      { modelName: 'Mi amigo Miauravilloso',         storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_MiAmigoMiauravilloso_Miniatura.png' },
      { modelName: 'Mi mejor amigo del mundo',       storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_ElMejorAmigoDelMundo_Miniatura.png' },
      { modelName: 'Papá, Mi Héroe',                 storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png' },
      { modelName: 'Mamá, Mi Heroína',               storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png' },
      { modelName: 'Te amo, abuelo',                 storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png' },
      { modelName: 'Te amo, abuela',                 storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Miniatura.png' },
      { modelName: 'El Mejor Equipo',                storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Miniatura.png' },
      { modelName: 'Mi Familia',                     storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Miniatura.png' },
      { modelName: 'Gracias por tu amor',            storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_GraciasPorTuAmor_Miniatura.png' },
      { modelName: 'Mi angel guardian',              storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png' },
      { modelName: 'Siempre en mi corazon',          storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazon_Miniatura.png' },
      { modelName: 'Siempre seras parte de mi',      storageKey: 'IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMiCorazon_Miniatura.png' },
    ];

    for (const { modelName, storageKey } of modelCoverSeeds) {
      // 1) Insertar asset con hash determinístico (computado en Node.js)
      const contentHash = createHash('sha256').update(storageKey).digest('hex');
      await client.query(`
        INSERT INTO assets (storage_key, original_filename, mime_type, content_hash)
        VALUES ($1, $1, 'image/png', $2)
        ON CONFLICT (content_hash) DO NOTHING
      `, [storageKey, contentHash]);

      // 2) Vincular al modelo al asset con el storage_key correcto
      await client.query(`
        UPDATE personalized_models m
        SET cover_asset_id = a.id
        FROM assets a
        WHERE a.storage_key = $1
          AND m.name = $2
      `, [storageKey, modelName]);
    }
    console.log('[seed] model cover assets ✓');

    // ── 4. catalog_books ─────────────────────────────────────────────────────
    const catalogSeeds = [
      // Libros Personalizados (CUSTOM_BOOK)
      { name: '10 Razones por las que Te Amo',  type: 'CUSTOM_BOOK', desc: 'Crea una historia entre tú y esa persona especial, pudiendo elegir entre más de 21 escenarios para crear momentos mágicos.' },
      { name: 'Mi Amor',                        type: 'CUSTOM_BOOK', desc: 'Este libro utiliza arquetipos creativos y mágicos para describir al ser amado de manera única y especial.' },
      { name: '1025 Días enamorándome de ti',    type: 'CUSTOM_BOOK', desc: 'Plasma tus mejores recuerdos en un álbum de calidad, con tan solo unos clicks.' },
      { name: 'Nuestro Angel de 4 patas',        type: 'CUSTOM_BOOK', desc: 'Crea el homenaje más hermoso a ese peludo que te recibe como si fueras una estrella, que te protege, que te hace reír y que te ama sin condiciones.' },
      { name: 'Aventura entre patas',            type: 'CUSTOM_BOOK', desc: 'Libro personalizado que celebra la complicidad, diversión y amor incondicional entre la mascota de la familia y los niños del hogar.' },
      { name: 'Mi amigo Miauravilloso',          type: 'CUSTOM_BOOK', desc: 'Crea el tributo más hermoso a ese felino que te elige, que ronronea en tu regazo, que te mira con ojos hipnóticos y que convierte tu casa en su reino.' },
      { name: 'Mi mejor amigo del mundo',        type: 'CUSTOM_BOOK', desc: 'Un libro personalizado que celebra la relación especial entre una persona y su perro.' },
      { name: 'Papá, Mi Héroe',                  type: 'CUSTOM_BOOK', desc: 'Libro personalizado donde una hija celebra a su padre, reconociendo todo lo que lo hace especial.' },
      { name: 'Mamá, Mi Heroína',                type: 'CUSTOM_BOOK', desc: 'Libro personalizado que celebra el amor incondicional, la fortaleza, el sacrificio y la ternura de mamá.' },
      { name: 'Te amo, abuelo',                  type: 'CUSTOM_BOOK', desc: 'Un libro personalizado que honra el vínculo sagrado entre abuelos y nietos, capturando la sabiduría, ternura, historias compartidas y ese amor incondicional.' },
      { name: 'Te amo, abuela',                  type: 'CUSTOM_BOOK', desc: 'Libro personalizado que honra el vínculo sagrado entre abuelas y nietos, capturando la sabiduría, ternura y ese amor incondicional que solo las abuelas saben dar.' },
      { name: 'El Mejor Equipo',                  type: 'CUSTOM_BOOK', desc: 'Libro personalizado para celebrar la hermandad entre hermanos o hermanas, mostrando por qué juntos forman el mejor equipo.' },
      { name: 'Mi Familia',                       type: 'CUSTOM_BOOK', desc: 'Libro donde la familia vive aventuras increíbles sin límites: cavernícolas, astronautas, científicos locos, piratas y mucho más.' },
      // Libros Memoriales
      { name: 'Gracias por tu amor',              type: 'CUSTOM_BOOK', desc: 'Un libro homenaje para honrar a esa persona especial que siempre será parte de tu corazón. Cada página celebra los momentos únicos que compartieron juntos.' },
      { name: 'Mi angel guardian',               type: 'CUSTOM_BOOK', desc: 'Un homenaje lleno de amor para honrar a esa persona que fue tu guía, tu fuerza y tu luz. Porque su presencia sigue brillando en cada recuerdo.' },
      { name: 'Siempre en mi corazon',           type: 'CUSTOM_BOOK', desc: 'Un libro dedicado a ese ser querido que partió pero vive para siempre en tus recuerdos. Cada página celebra su legado y el amor que los unió.' },
      { name: 'Siempre seras parte de mi',       type: 'CUSTOM_BOOK', desc: 'Un homenaje a ese vínculo eterno que ninguna distancia puede romper. Cada página celebra la complicidad, las aventuras y el amor que los une para siempre.' },
      // Photobooks
      { name: 'PhotoBook de Tapa Gruesa',         type: 'PHOTOBOOK',   desc: 'Un álbum que captura tus mejores recuerdos con una tapa especial gruesa que conservara esos momentos especiales.' },
      { name: 'Photobook de Tapa Delgada',        type: 'PHOTOBOOK',   desc: 'Un álbum que captura tus mejores momentos con una tapa más fina para un mejor acabado.' },
    ];

    for (const b of catalogSeeds) {
      await client.query(`
        INSERT INTO catalog_books (name, product_type, description, currency)
        SELECT $1, $2::product_type, $3, 'PEN'
        WHERE NOT EXISTS (SELECT 1 FROM catalog_books WHERE name = $1)
      `, [b.name, b.type, b.desc]);
    }
    console.log('[seed] catalog_books ✓');

    // ── 5. catalog_book_variants ─────────────────────────────────────────────
    const { rows: allBooks } = await client.query<{ id: string; name: string; product_type: string }>(
      `SELECT id, name, product_type FROM catalog_books`,
    );

    for (const book of allBooks) {
      if (book.product_type === 'CUSTOM_BOOK') {
        // Libros personalizados: tapa delgada (10 plantillas base) y tapa gruesa (+S/30)
        const variants = [
          { coverType: 'TAPA_DELGADA', price: 13000 }, // S/ 130.00 — 10 plantillas
          { coverType: 'TAPA_GRUESA',  price: 15000 }, // S/ 150.00 — 10 plantillas + tapa gruesa
        ];
        for (const v of variants) {
          await client.query(`
            INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
            VALUES ($1, $2, $3)
            ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents
          `, [book.id, v.coverType, v.price]);
        }
        // Eliminar TAPA_PREMIUM si existe
        await client.query(
          `DELETE FROM catalog_book_variants WHERE catalog_book_id = $1 AND cover_type = 'TAPA_PREMIUM'`,
          [book.id],
        );
      } else if (book.product_type === 'PHOTOBOOK') {
        // Photobooks tienen su variante de tapa correspondiente
        const coverType = book.name.includes('Gruesa') ? 'TAPA_GRUESA' : 'TAPA_DELGADA';
        const price = book.name.includes('Gruesa') ? 12000 : 9000;
        await client.query(`
          INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
          VALUES ($1, $2, $3)
          ON CONFLICT (catalog_book_id, cover_type) DO UPDATE SET base_price_cents = EXCLUDED.base_price_cents
        `, [book.id, coverType, price]);
      }
    }
    console.log('[seed] catalog_book_variants ✓');

    // ── 6. photobook_themes ──────────────────────────────────────────────────
    await client.query(`
      INSERT INTO photobook_themes (name, cover_preview_key, cover_template_key, back_cover_key) VALUES
        ('Francia',        'Photobooks/Miniaturas/Photobook_Miniatura_Paris.png',          'Photobooks/Portadas/Photobook_Paris_Portada.png',          'Photobooks/Contraportadas/Photobook_Paris_Contraportada.png'),
        ('México',         'Photobooks/Miniaturas/Photobook_Miniatura_Chichen_Itza.png',   'Photobooks/Portadas/Photobook_Chichen_Itza_Portada.png',   'Photobooks/Contraportadas/Photobook_Chichen_Itza_Contraportada.png'),
        ('Nueva York',     'Photobooks/Miniaturas/Photobook_Miniatura_New_York.png',       'Photobooks/Portadas/Photobook_New_York_Portada.png',       'Photobooks/Contraportadas/Photobook_New_York_Contraportada.png'),
        ('Roma',           'Photobooks/Miniaturas/Photobook_Miniatura_Coliseo_Romano.png', 'Photobooks/Portadas/Photobook_Coliseo_Romano_Portada.png', 'Photobooks/Contraportadas/Photobook_Coliseo_Romano_Contraportada.png'),
        ('Holanda',        'Photobooks/Miniaturas/Photobook_Miniatura_Amsterdam.png',      'Photobooks/Portadas/Photobook_Amsterdam_Portada.png',      'Photobooks/Contraportadas/Photobook_Amsterdam_Contraportada.png'),
        ('Thailandia',     'Photobooks/Miniaturas/Photobook_Miniatura_Bangkok.png',        'Photobooks/Portadas/Photobook_Bangkok_Portada.png',        'Photobooks/Contraportadas/Photobook_Bangkok_Contraportada.png'),
        ('Río de Janeiro', 'Photobooks/Miniaturas/Photobook_Miniatura_Rio_Janeiro.png',    'Photobooks/Portadas/Photobook_Rio_Janeiro_Portada.png',    'Photobooks/Contraportadas/Photobook_Rio_Janeiro_Contraportada.png'),
        ('Iquitos',        'Photobooks/Miniaturas/Photobook_Miniatura_Iquitos.png',        'Photobooks/Portadas/Photobook_Iquitos_Portada.png',        'Photobooks/Contraportadas/Photobook_Iquitos_Contraportada.png'),
        ('Machu Picchu',   'Photobooks/Miniaturas/Photobook_Miniatura_Machu_Picchu.png',   'Photobooks/Portadas/Photobook_Machu_Picchu_Portada.png',   'Photobooks/Contraportadas/Photobook_Machu_Picchu_Contraportada.png'),
        ('Arequipa',       'Photobooks/Miniaturas/Photobook_Miniatura_Arequipa.png',       'Photobooks/Portadas/Photobook_Arequipa_Portada.png',       'Photobooks/Contraportadas/Photobook_Arequipa_Contraportada.png'),
        ('Ayacucho',       'Photobooks/Miniaturas/Photobook_Miniatura_Ayacucho.png',       'Photobooks/Portadas/Photobook_Ayacucho_Portada.png',       'Photobooks/Contraportadas/Photobook_Ayacucho_Contraportada.png'),
        ('Huancayo',       'Photobooks/Miniaturas/Photobook_Miniatura_Huancayo.png',       'Photobooks/Portadas/Photobook_Huancayo_Portada.png',       'Photobooks/Contraportadas/Photobook_Huancayo_Contraportada.png'),
        ('Puno',           'Photobooks/Miniaturas/Photobook_Miniatura_Puno.png',           'Photobooks/Portadas/Photobook_Puno_Portada.png',           'Photobooks/Contraportadas/Photobook_Puno_Contraportada.png'),
        ('Cajamarca',      'Photobooks/Miniaturas/Photobook_Miniatura_Cajamarca.png',      'Photobooks/Portadas/Photobook_Cajamarca_Portada.png',      'Photobooks/Contraportadas/Photobook_Cajamarca_Contraportada.png'),
        ('Punta Cana',     'Photobooks/Miniaturas/Photobook_Miniatura_Punta_Cana.png',     'Photobooks/Portadas/Photobook_Punta_Cana_Portada.png',     'Photobooks/Contraportadas/Photobook_Punta_Cana_Contraportada.png'),
        ('Jamaica',        'Photobooks/Miniaturas/Photobook_Miniatura_Jamaica.png',        'Photobooks/Portadas/Photobook_Jamaica_Portada.png',        'Photobooks/Contraportadas/Photobook_Jamaica_Contraportada.png'),
        ('Bodas',          'themes/bodas/preview.jpg',                                     'themes/bodas/template.psd',                                NULL),
        ('Miami',          'Photobooks/Miniaturas/Photobook_Miniatura_Miami.png',          'Photobooks/Portadas/Photobook_Miami_Portada.png',          'Photobooks/Contraportadas/Photobook_Miami_Contraportada.png')
      ON CONFLICT (name) DO UPDATE SET
        cover_preview_key  = EXCLUDED.cover_preview_key,
        cover_template_key = EXCLUDED.cover_template_key,
        back_cover_key     = EXCLUDED.back_cover_key
    `);
    console.log('[seed] photobook_themes ✓');

    // ── 7. photobook_products ────────────────────────────────────────────────
    // Desactivar producto anterior renombrado
    await client.query(`UPDATE photobook_products SET is_active = FALSE WHERE name = 'Fotolibro 30x20 cm'`);
    // Corrección de medida: el producto es 22x22 cm, no 21x21 cm
    await client.query(`UPDATE photobook_products SET name = 'Fotolibro 22x22 cm' WHERE name = 'Fotolibro 21x21 cm'`);

    const photobookSeeds = [
      { name: 'Fotolibro 22x22 cm', desc: 'Tapa dura, acabado mate',                min_pages: 25, price: 390, custom_dims: false },
      { name: 'Personalizado',       desc: 'Formato a medida, dimensiones libres',   min_pages: 20, price: 490, custom_dims: true  },
    ];
    for (const p of photobookSeeds) {
      await client.query(`
        INSERT INTO photobook_products (name, description, min_pages, price_per_page_cents, currency, allows_custom_dimensions)
        SELECT $1, $2, $3, $4, 'PEN', $5
        WHERE NOT EXISTS (SELECT 1 FROM photobook_products WHERE name = $1)
      `, [p.name, p.desc, p.min_pages, p.price, p.custom_dims]);
    }
    console.log('[seed] photobook_products ✓');

    // ── 8. rush_fee_rules ────────────────────────────────────────────────────
    const rushSeeds = [
      { label: 'Express (menos de 7 días)',  days: 7, fee: 1000 },
      { label: 'Urgente (menos de 3 días)',  days: 3, fee: 2000 },
    ];
    for (const r of rushSeeds) {
      await client.query(`
        INSERT INTO rush_fee_rules (label, days_threshold, fee_cents, is_active)
        SELECT $1, $2, $3, true
        WHERE NOT EXISTS (SELECT 1 FROM rush_fee_rules WHERE label = $1)
      `, [r.label, r.days, r.fee]);
    }
    console.log('[seed] rush_fee_rules ✓');

    // ── 9. users (admin) ─────────────────────────────────────────────────────
    const passwordHash = await bcryptjs.hash('Admin123!', 10);
    await client.query(`
      INSERT INTO users (email, password_hash, full_name, role, is_active)
      SELECT $1, $2, 'Admin PixelArt', 'ADMIN', true
      WHERE NOT EXISTS (
        SELECT 1 FROM users WHERE LOWER(email) = LOWER($1)
      )
    `, ['admin@pixelart.local', passwordHash]);
    console.log('[seed] users ✓');

    // Guarda anti-recurrencia: si quedó alguna plantilla activa sin contenido de
    // prompt (scene_visual/poem_template/character_roles), avisar fuerte. Suele
    // significar que se agregó un libro y falta su backfill, o que un backfill
    // matcheó por `id` (frágil, cambia entre bases) en vez de por
    // `template_preview_key`. No es fatal — solo avisa, para no descubrirlo un
    // cliente en el demo/PDF (ver generate-demo-proposal.use-case.ts).
    const { rows: plantillasSinContenido } = await client.query(`
      SELECT m.name, count(*)::int AS faltan
      FROM personalized_templates t
      JOIN personalized_models m ON m.id = t.model_id
      WHERE t.is_active = true
        AND (t.scene_visual IS NULL OR t.poem_template IS NULL OR t.character_roles IS NULL)
      GROUP BY m.name
      ORDER BY faltan DESC
    `);
    if (plantillasSinContenido.length > 0) {
      const total = plantillasSinContenido.reduce((n, r) => n + Number(r.faltan), 0);
      console.warn(`⚠️  [seed] ${total} plantilla(s) activa(s) SIN contenido de prompt — revisá el backfill de estos libros (¿matchea por template_preview_key?):`);
      for (const r of plantillasSinContenido) console.warn(`   - ${r.name}: ${r.faltan}`);
    } else {
      console.log('[seed] ✓ todas las plantillas activas tienen contenido de prompt');
    }

    console.log('[seed] Todos los seeds completados.');

  } catch (err) {
    console.error('[seed] Error:', err);
    throw err;
  } finally {
    await client.end();
  }
}

// ─── Ejecución directa: ts-node src/database/seed.ts ─────────────────────────
if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
