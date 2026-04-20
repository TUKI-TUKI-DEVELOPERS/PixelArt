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
      { categoryId: cat['Libros de Memorias Familiares'], name: 'Recuerdos Familiares' },
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
          'PLANTILLA_1_Despertar_a_Tu_Lado_es_Como_un_Cuento_de_Hadas.png',
          'PLANTILLA_2_Besarte_es_Como_Comer_Algodón_de_Azucar.png',
          'PLANTILLA_3_Besarte_es_Como_Comer_Algodón_de_Azúca.png',
          'PLANTILLA_4_Cocinar_Contigo_es_Como_un_Show_de_Cocina.png',
          'PLANTILLA_5_Ver_Películas_Juntos_es_Como_Estar_en_el_Cine.png',
          'PLANTILLA_6_Viajar_Contigo_es_Como_una_Aventura_Épica.png',
          'PLANTILLA_7_Bailar_Contigo_es_Como_Estar_en_un_Musical.png',
          'PLANTILLA_8_Tus_Abrazos_Son_Como_un_Refugio_Mágico.png',
          'PLANTILLA_9_Escuchar_Música_Contigo_es_Como_un_Concierto_Privado.png',
          'PLANTILLA_10_Hacer_Planes_Contigo_es_Como_Diseñar_Nuestro_Futuro.png',
          'PLANTILLA_11_Reír_Contigo_es_Como_Terapia_del_Alma.png',
          'PLANTILLA_12_Dormir_Contigo_es_Como_Flotar_en_las_Nubes.png',
          'PLANTILLA_13_Caminar_de_la_Mano_es_Como_Conquistar_el_Mundo.png',
          'PLANTILLA_14_Tus_Mensajes_Son_Como_Recibir_Cartas_de_Amor.png',
          'PLANTILLA_15_Mirarte_a_los_Ojos_es_Como_Ver_el_Universo.png',
          'PLANTILLA_16_Hacer_el_Amor_Contigo_es_Como_Fuegos_Artificiales.png',
          'PLANTILLA_17_Cuidarme_Cuando_Estoy_Enfermo_es_Como_Tener_un_Angel.png',
          'PLANTILLA_18_Tus_Sorpresas_Son_Como_Magia_Pura.png',
          'PLANTILLA_19_Apoyarme_en_Mis_Sueños_es_Como_Tener_Alas.png',
          'PLANTILLA_20_Perdonarme_es_Como_Recibir_una_Segunda_Oportunidad.png',
        ],
      },
      'Mi Amor': {
        base: 'IA_Books/Love_Books_Page/Libros/Mi_Amor/Plantillas',
        files: [
          'PLANTILLA_1_Mi_Superhéroe_Personal.png',
          'PLANTILLA_2_Mi_Príncipe_Encantador.png',
          'PLANTILLA_3_Mi_Thor_Dios_del_Trueno.png',
          'PLANTILLA_4_Mi_Caballero_de_Armadura_Brillante.png',
          'PLANTILLA_5_Mi_Rey.png',
          'PLANTILLA_6_Mi_Ángel_Guardián.png',
          'PLANTILLA_7_Mi_Pirata_Aventurero.png',
          'PLANTILLA_8_Mi_Mago_Hechicero.png',
          'PLANTILLA_9_Mi_Guerrero_Protector.png',
          'PLANTILLA_10_Mi_Estrella_de_Rock.png',
          'PLANTILLA_11_Mi_Capitán_Piloto.png',
          'PLANTILLA_12_Mi_Vikingo_Valiente.png',
          'PLANTILLA_13_Mi_Romeo_Amante_Eterno.png',
          'PLANTILLA_14_Mi_Arquitecto_de_Sueños.png',
          'PLANTILLA_15_Mi_Gladiador.png',
          'PLANTILLA_16_Mi_Cowboy_Vaquero.png',
          'PLANTILLA_17_Mi_Samurai.png',
          'PLANTILLA_18_Mi_Astronauta_Explorador_Espacial.png',
          'PLANTILLA_19_Mi_Titan.png',
          'PLANTILLA_20_Mi_Fenix_Renacimiento.png',
        ],
      },
      '1025 Días enamorándome de ti': {
        base: 'IA_Books/Love_Books_Page/Libros/X_Dias_Enamorandome_De_Ti/Plantillas',
        files: [
          'PLANTILLA_1_Amarte_es_Como_Tener_el_Sol_en_Casa.png',
          'PLANTILLA_2_Estar_Contigo_es_Como_Vivir_en_un_Sueño.png',
          'PLANTILLA_3_Tu_Risa_es_Como_Música_para_Mis_Oídos.png',
          'PLANTILLA_4_Tus_Ojos_Son_Como_Ventanas_al_Paraíso.png',
          'PLANTILLA_5_Tu_Voz_es_Como_Miel_para_Mi_Alma.png',
          'PLANTILLA_6_Tu_Abrazo_es_Como_Mi_Refugio_Seguro.png',
          'PLANTILLA_7_Tu_Sonrisa_es_Como_el_Arcoíris_Después_de_la_Lluvia.png',
          'PLANTILLA_8_Nuestro_Primer_Beso_Fue_Magia_Pura.png',
          'PLANTILLA_9_Cuando_Dijiste_Te_Amo_Por_Primera_Vez.png',
          'PLANTILLA_10_Nuestras_Nochoes_de_Películas_Son_Mi_Momento_Favorito.png',
          'PLANTILLA_11_Despertar_Contigo_es_Como_Comenzar_en_el_Paraíso.png',
          'PLANTILLA_12_Nuestras_Aventuras_Juntos_Son_Inolvidables.png',
          'PLANTILLA_13_Bailar_Contigo_es_Como_Flotar_en_las_Nubes.png',
          'PLANTILLA_14_Nuestras_Conversaciones_Profundas_de_Madrugada.png',
          'PLANTILLA_15_Me_Haces_Sentir_la_Persona_Más_Especial_del_Mundo.png',
          'PLANTILLA_16_Contigo_Aprendí_Qué_es_el_Amor_Verdadero.png',
          'PLANTILLA_17_Me_Apoyas_en_Mis_Peores_Momentos.png',
          'PLANTILLA_18_Me_Haces_Reír_Hasta_Que_Me_Duele_el_Estómago.png',
          'PLANTILLA_19_Me_Inspiras_a_Ser_Mejor_Persona_Cada_Día.png',
          'PLANTILLA_20_Cada_Día_Me_Enamoro_Más_de_Ti.png',
        ],
      },
      'Nuestro Angel de 4 patas': {
        base: 'IA_Books/Pet_Books_Page/Libros/Nuestro_Angel_De_4_Patas/Plantillas',
        files: [
          'PLANTILLA_1_Porque_Tu_Lugar_Favorito_Era_a_Mi _Lado\u201D.png',
          'PLANTILLA_2_Porque_Nuestros_Paseos_Eran_Nuestra_Aventura_Diaria.png',
          'PLANTILLA_3_Porque_Jugabamos_Como_Niños_Sin_Importar_la_Edad.png',
          'PLANTILLA_4_Porque_Siempre_Supiste_Cuando_Necesitaba_un_Abrazo.png',
          'PLANTILLA_5_Porque_Me_Despertabas_Cada_Mañana_con_Tu_Amor.png',
          'PLANTILLA_6_Porque_Me_Enseñaste_Que_el_Amor_No_Necesita_Palabras.png',
          'PLANTILLA_7_Porque_Eras_Mi_Compañero.png',
          'PLANTILLA_8_Porque_Tu_Comida_Favorita_Era_Cualquier_Cosa_Que_Yo_Comiera.png',
          'PLANTILLA_9_Porque_Protegias_Nuestra_Casa_Como_un_Verdadero_Guardian.png',
          'PLANTILLA_10_Porque_Tus_Travesuras_Me_Hacian_Reir_Incluso_Cuando_No_Debia.png',
          'PLANTILLA_11_Porque_Celebrabamos_Juntos_Cada_Momento_Especial.png',
          'PLANTILLA_12_Porque_Eras_Mi_Razon_Para_Llegar_a_Casa.png',
          'PLANTILLA_13_Porque_Me_Acompañabas_en_Mis_Momentos_de_Soledad.png',
          'PLANTILLA_14_Porque_Tus_Fotos_Llenan_Mi_Corazon_de_Recuerdos.png',
          'PLANTILLA_15_Porque_Me_Enseñaste_a_Vivir_el_Presente.png',
          'PLANTILLA_16_Porque_Tu_Amor_Era_Incondicional_y_Puro.png',
          'PLANTILLA_17_Porque_Compartimos_Silencios_Que_Decían_Todo.png',
          'PLANTILLA_18_Porque_Fuiste_Mi_Maestroealtad.png',
          'PLANTILLA_19_Porque_Hiciste_de_Nuestra_Casa_un_Hogar.png',
          'PLANTILLA_20_Porque_Nuestro_Amor_Es_Eterno.png',
        ],
      },
      'Aventura entre patas': {
        base: 'IA_Books/Pet_Books_Page/Libros/Aventuras_Entre_Patas/Plantillas',
        files: [
          'PLANTILLA_1_PIRATAS_DEL_TESORO_ESCONDIDO.png',
          'PLANTILLA_2_SUPERHEROES_AL_RESCATE.png',
          'PLANTILLA_3_ASTRONAUTAS_EN_EL_ESPACIO.png',
          'PLANTILLA_4_CABALLEROS_DEL_REINO_MAGICO.png',
          'PLANTILLA_5_DETECTIVES_DEL_MISTERIO.png',
          'PLANTILLA_6_CIENTIFICOS_LOCOS.png',
          'PLANTILLA_7_NINJAS_SECRETOS.png',
          'PLANTILLA_8_MAGOS_Y_HECHICEROS.png',
          'PLANTILLA_9_MI_GUARDIAN_PELUDO.png',
          'PLANTILLA_10_ABRAZOS_QUE_CURAN_TODO.png',
          'PLANTILLA_11_SECRETOS_ENTRE_MEJORES_AMIGOS.png',
          'PLANTILLA_12_LAGRIMAS_SECADAS_CON_LAMIDAS.png',
          'PLANTILLA_13_CAMA_COMPARTIDA.png',
          'PLANTILLA_14_PROTECTOR_DE_PESADILLAS.png',
          'PLANTILLA_15_EL_PRIMER_ENCUENTRO.png',
          'PLANTILLA_16_ESCONDIDAS_IMPOSIBLES.png',
          'PLANTILLA_17_PERSECUCION_EN_EL_JARDIN.png',
          'PLANTILLA_18_CLASE_DE_TRUCOS_FALLIDOS.png',
          'PLANTILLA_19_AVENTUREROS_DE_DINOSAURIOS.png',
          'PLANTILLA_20_DIA_DE_PLAYA_PERFECTO.png',
        ],
      },
      'Mi amigo Miauravilloso': {
        base: 'IA_Books/Pet_Books_Page/Libros/Mi_Amigo_Miauravilloso/Plantillas',
        files: [
          'PLANTILLA_1_Porque_Ignora_Mis_Llamados_Hasta_que_Abro_la_Comida.png',
          'PLANTILLA_2_Porque_Tira_Cosas_de_la_Mesa.png',
          'PLANTILLA_3_Porque_Corre_Como_Loco_a_las_3AM.png',
          'PLANTILLA_4_Porque_Se_Sienta_Justo_en_Mi_Teclado.png',
          'PLANTILLA_5_Porque_Cabe_en_Cualquier_Caja.png',
          'PLANTILLA_6_Porque_Actua_Como_Si_Fuera_El_Dueno_De_La_Casa.png',
          'PLANTILLA_7_Porque_Ronronea_Cuando_Me_Ve.png',
          'PLANTILLA_8_Porque_Duerme_en_Mi_Regazo.png',
          'PLANTILLA_9_Porque_Me_Mira_Con_Esos_Ojos_De_Amor.png',
          'PLANTILLA_10_Porque_Se_Acurruca_Junto_a_Mi_en_las_Noches_Frias.png',
          'PLANTILLA_11_Porque_Me_Elige_a_Mi.png',
          'PLANTILLA_12_Porque_Su_Ronroneo_Es_Mi_Cancion_Favorita.png',
          'PLANTILLA_13_Porque_Explora_Cada_Rincon_De_La_Casa.png',
          'PLANTILLA_14_Porque_Caza_Sombras_y_Luces_Como_un_Guerrero.png',
          'PLANTILLA_15_Porque_Llego_a_Mi_Vida_Cuando_Mas_Lo_Necesitaba.png',
          'PLANTILLA_16_Porque_Es_Mi_Guardian_Mistico_De_La_Noche.png',
          'PLANTILLA_17_Porque_Tiene_Nueve_Vidas_y_Mil_Aventuras.png',
          'PLANTILLA_18_Porque_Es_Mi_Mago_Peludo.png',
          'PLANTILLA_19_Porque_Es_Mi_Companero_De_Suenos.png',
          'PLANTILLA_20_Porque_Es_Mi_Faro_en_la_Soledad.png',
        ],
      },
      'Mi mejor amigo del mundo': {
        base: 'IA_Books/Pet_Books_Page/Libros/Mi_mejor_amigo_del_mundo/Plantillas',
        files: [
          'PLANTILLA_1_Porque_Siempre_Me_Recibe_Como_Si_Fuera_una_Estrella.png',
          'PLANTILLA_2_Porque_Duerme_a_Mi_Lado_Todas_las_Noches.png',
          'PLANTILLA_3_Porque_Sabe_Cuando_Necesito_un_Abrazo.png',
          'PLANTILLA_4_Porque_Me_Entiende_Sin_Palabras.png',
          'PLANTILLA_5_Porque_Su_Mirada_Lo_Dice_Todo.png',
          'PLANTILLA_6_Porque_Me_Ama_Sin_Condiciones.png',
          'PLANTILLA_7_Porque_Me_Roba_Mi_Lugar_en_el_Sofa.png',
          'PLANTILLA_8_Porque_Ocupa_Toda_la_Cama_y_Yo_Duermo_en_la_Orilla.png',
          'PLANTILLA_9_Porque_Roba_Mi_Comida_y_No_Puedo_Enojarme.png',
          'PLANTILLA_10_Porque_Pide_Comida_Con_Esa_Mirada_Que_No_Puedo_Resistir.png',
          'PLANTILLA_11_Porque_Corre_Como_Loco_Despues_del_Baño.png',
          'PLANTILLA_12_Porque_Hace_las_Caras_Mas_Chistosas.png',
          'PLANTILLA_13_Porque_Es_Mi_Companero_de_Aventuras.png',
          'PLANTILLA_14_Porque_Siempre_Esta_Ahi_Sin_Importar_Que.png',
          'PLANTILLA_15_Porque_Me_Protege_Como_un_Guardian.png',
          'PLANTILLA_16_Porque_Juntos_Volamos_Sin_Alas.png',
          'PLANTILLA_17_Porque_Es_Mi_Superheroe_Sin_Capa.png',
          'PLANTILLA_18_Porque_Convierte_lo_Ordinario_en_Extraordinario.png',
          'PLANTILLA_19_Porque_Ilumina_Mis_Dias_Oscuros.png',
          'PLANTILLA_20_Porque_Es_Mi_Companero_de_Aventuras_Infinitas.png',
        ],
      },
      'Papá, Mi Héroe': {
        base: 'IA_Books/Family_Books_Page/Libros/Papa_mi_heroe/Plantillas',
        files: [
          'PLANTILLA_1_MI_SUPERHEROE_PERSONAL.png',
          'PLANTILLA_2_MI CABALLERO_DE_ARMADURA_BRILLANTE.png',
          'PLANTILLA_3_MI_REY.png',
          'PLANTILLA_4_MI_ANGEL_GUARDIAN.png',
          'PLANTILLA_5_MI_PIRATA_AVENTURERO.png',
          'PLANTILLA_6_MI_GUERRERO_PROTECTOR.png',
          'PLANTILLA_7_MI_CAPITAN.png',
          'PLANTILLA_8_MI_VIKINGO_VALIENTE.png',
          'PLANTILLA_9_MI_ARQUITECTO_DE_SUEÑOS.png',
          'PLANTILLA_10_MI_GLADIADOR.png',
          'PLANTILLA_11_MI_SAMURAI.png',
          'PLANTILLA_12_MI_TITAN.png',
          'PLANTILLA_13_MI_PRIMER_AMOR.png',
          'PLANTILLA_14_CUANDO_BAILAMOS_EN_LA_SALA.png',
          'PLANTILLA_15_ME_ENSEÑASTE_QUE_SOY_UNA_PRINCESA.png',
          'PLANTILLA_16_NUESTRAS_CITAS_DE_PADRE_E_HIJA.png',
          'PLANTILLA_17_CUANDO_ME_PEINAS.png',
          'PLANTILLA_18_EL_HOMBRE_QUE_ME_ENSEÑO_COMO_DEBO_SER_TRATADA.png',
          'PLANTILLA_19_CUANDO_ME_HACES_SENTIR_LA_MAS_BONITA.png',
          'PLANTILLA_20_Papa_Mi_Heroe_Sere_Tu_Nina_Para_Siempre.png',
        ],
      },
      'Mamá, Mi Heroína': {
        base: 'IA_Books/Family_Books_Page/Libros/Mama_mi_heroina/Plantillas',
        files: [
          'PLANTILLA_1_SUPERHEROINA_DE_LA_CIUDAD.png',
          'PLANTILLA_02_Guerrera_Invencible_Mama_Mi_Heroe.png',
          'PLANTILLA_03_Reina_Del_Corazon.png',
          'PLANTILLA_04_Angel_Guardian..png',
          'PLANTILLA_05_Maga_Poderosa.png',
          'PLANTILLA_06_Capitana_Valiente_Del_Corazon.png',
          'PLANTILLA_07_Ninja_Protectora_Silenciosa.png',
          'PLANTILLA_08_Amazona_Guerrera.png',
          'PLANTILLA_09_Diosa_Del_Amor_Eterno.png',
          'PLANTILLA_10_Titan_Maternal_Inquebrantable.png',
          'PLANTILLA_11_Samurai_Del_Hogar_De_Honor.png',
          'PLANTILLA_12_Heroina_Sin_Capa.png',
          'PLANTILLA_13_Abrazos_Que_Curan.png',
          'PLANTILLA_14_Besos_De_Buenas_Noches.png',
          'PLANTILLA_15_Cocinando_Juntos_Recetas_De_Amor.png',
          'PLANTILLA_16_Primer_Dia_Escuela_Valiente_Companera.png',
          'PLANTILLA_17_Cuando_Estoy_Enfermo_Enfermera_Del_Alma.png',
          'PLANTILLA_18_Secadora_De_Tristezas.png',
          'PLANTILLA_19_Ensenandome_A_Ser_Fuerte.png',
          'PLANTILLA_20_Mama_Mi_Mejor_Amiga.png',
        ],
      },
      'Te amo, abuelo': {
        base: 'IA_Books/Family_Books_Page/Libros/Te_amo_abuelo/Plantillas',
        files: [
          'PLANTILLA_01_Te_Amo_Abuelo_Mi_Superheroe.png',
          'PLANTILLA_02_Te_Amo_Abuelo_El_Rey_De_Mi_Corazon.png',
          'PLANTILLA_03_Te_Amo_Abuelo_Mi_Caballero_Dorado.png',
          'PLANTILLA_04_Te_Amo_Abuelo_Angel_Guardian.png',
          'PLANTILLA_05_Te_Amo_Abuelo_Capitan_Aventuras.png',
          'PLANTILLA_06_Te_Amo_Abuelo_El_Sabio_Historias.png',
          'PLANTILLA_07_Te_Amo_Abuelo_Mi_Guerrero.png',
          'PLANTILLA_08_Te_Amo_Abuelo_Arquitecto_De_Recuerdos.png',
          'PLANTILLA_09_Te_Amo_Abuelo_Mi_Titan.png',
          'PLANTILLA_10_Te_Amo_Abuelo_Guardian_Del_Tiempo.png',
          'PLANTILLA_11_Te_Amo_Abuelo_Mi_Faro.png',
          'PLANTILLA_12_Te_Amo_Abuelo_El_Gigante.png',
          'PLANTILLA_13_Tus_Historias_Magicas_El_Narrador.png',
          'PLANTILLA_14_Aventuras_En_Tu_Jardin.png',
          'PLANTILLA_15_Las_Lecciones_Que_Solo_Tu_Me_Das.png',
          'PLANTILLA_16_Nuestros_Secretos_Compartidos.png',
          'PLANTILLA_17_Cuando_Me_Haces_Reir.png',
          'PLANTILLA_18_Tu_Abrazo_Que_Todo_Lo_Arregla.png',
          'PLANTILLA_19_Ensenandome_El_Mundo.png',
          'PLANTILLA_20_Siempre_Sere_Tu_Pequeno.png',
        ],
      },
      'Te amo, abuela': {
        base: 'IA_Books/Family_Books_Page/Libros/Te_amo_abuela/Plantillas',
        files: [
          'PLANTILLA_01_Te_Amo_Abuela_Abrazos_Que_Curan.png',
          'PLANTILLA_02_Te_Amo_Abuela_Cuentos_Antes_De_Dormir.png',
          'PLANTILLA_03_Te_Amo_Abuela_Las_Galletas_Mas_Ricas.png',
          'PLANTILLA_04_Te_Amo_Abuela_Secretos_Entre_Nosotros.png',
          'PLANTILLA_05_Te_Amo_Abuela_Cuando_Me_Consientes.png',
          'PLANTILLA_06_Te_Amo_Abuela_Tus_Manos_Magicas.png',
          'PLANTILLA_07_Te_Amo_Abuela_Durmiendo_En_Tu_Regazo.png',
          'PLANTILLA_08_Te_Amo_Abuela_Me_Ensenaste_A.png',
          'PLANTILLA_09_Te_Amo_Abuela_Tus_Consejos_De_Oro.png',
          'PLANTILLA_10_Te_Amo_Abuela_Cuando_Lloro.png',
          'PLANTILLA_11_Te_Amo_Abuela_Fotos_Del_Pasado.png',
          'PLANTILLA_12_Te_Amo_Abuela_Eres_Mi_Segunda_Mama.png',
          'PLANTILLA_13_Te_Amo_Abuela_El_Jardin_Encantado.png',
          'PLANTILLA_14_Te_Amo_Abuela_Viajeras_Del_Tiempo.png',
          'PLANTILLA_15_Te_Amo_Abuela_Princesa_Principe.png',
          'PLANTILLA_16_Te_Amo_Abuela_Aventureras_Biblioteca.png',
          'PLANTILLA_17_Te_Amo_Abuela_Superheroina.png',
          'PLANTILLA_18_Te_Amo_Abuela_Tu_Legado_Amor.png',
          'PLANTILLA_19_Te_Amo_Abuela_Cuando_Crezca.png',
          'PLANTILLA_20_Te_Amo_Abuela_Gracias_Por_Existir.png',
        ],
      },
      'El Mejor Equipo': {
        base: 'IA_Books/Family_Books_Page/Libros/El_mejor_equipo/Plantillas',
        files: [
          'PLANTILLA_1_Parque_Triasico_Hermanos_Equipo.png',
          'PLANTILLA_2_Nave_De_Las_Nubes_Hermanos.png',
          'PLANTILLA_3_Laboratorio_De_Juegos_Hermanos.png',
          'PLANTILLA_4_Mansion_Encantada_Hermanos.png',
          'PLANTILLA_5_Castillo_De_Cojines_Hermanos.png',
          'PLANTILLA_6_Cueva_Tesoro_Escondido_Hermanos_Equipo.png',
          'PLANTILLA_7_Batalla_Almohadas_Hermanos_Equipo.png',
          'PLANTILLA_8_Galeria_De_Los_Genios_Hermanos.png',
          'PLANTILLA_9_Agencia_Secreta_De_Detectives_Hermanos.png',
          'PLANTILLA_10_Maquina_Del_Tiempo_Hermanos.png',
          'PLANTILLA_11_Isla_Calavera_Hermanos_Piratas.png',
          'PLANTILLA_12_Valle_De_Los_Dragones_Hermanos.png',
          'PLANTILLA_13_Torre_De_Los_Codigos_Hermanos.png',
          'PLANTILLA_14_Templo_Kung_Fu_Hermanos.png',
          'PLANTILLA_15_Taller_De_Magia_Creativa_Hermanos.png',
          'PLANTILLA_16_Jardin_De_Las_Maravillas_Hermanos.png',
          'PLANTILLA_17_Laboratorio_De_Bromas_Hermanos.png',
          'PLANTILLA_18_Bosque_De_Los_Enigmas_Hermanos.png',
          'PLANTILLA_19_Pista_Obstaculos_Fantasticos_Hermanos.png',
          'PLANTILLA_20_Pais_De_Las_Maravillas_Nocturnas_Hermanos_Equipo.png',
        ],
      },
      'Mi Familia': {
        base: 'IA_Books/Family_Books_Page/Libros/La_familia/Plantillas',
        files: [
          'PLANTILLA_01_Familia_Cavernicolas_Rock_Ancestral.png',
          'PLANTILLA_02_Familia_Conversa_Con_Animales.png',
          'PLANTILLA_03_Familia_Pizzería_Lunar_ZeroG.png',
          'PLANTILLA_04_Familia_Trafico_Imaginario.png',
          'PLANTILLA_05_Familia_Supermercado_Encantado.png',
          'PLANTILLA_06_Familia_Piratas_Tesoros_Risas.png',
          'PLANTILLA_07_Familia_Jungla_En_Casa.png',
          'PLANTILLA_08_Familia_Cocina_Laboratorio_Loco.png',
          'PLANTILLA_09_Familia_Globo_Cielos_Magicos.png',
          'PLANTILLA_10_Familia_Superpoderes_Caseros_Equipo.png',
          'PLANTILLA_11_Familia_Exploradores_Tesoros_Magicos.png',
          'PLANTILLA_12_Familia_Circo_Magico_En_Jardin.png',
          'PLANTILLA_13_Familia_Inventores_Locos_Taller.png',
          'PLANTILLA_14_Familia_Cuento_De_Hadas_Nocturno.png',
          'PLANTILLA_15_Familia_Reino_Fantastico_Parque.png',
          'PLANTILLA_16_Familia_Spa_Sirenas_Bano.png',
          'PLANTILLA_17_Familia_Nave_Espacial_Hogar.png',
          'PLANTILLA_18_Familia_Pasteleria_Magica_Cocina.png',
          'PLANTILLA_19_Familia_Pista_De_Baile_Salón.png',
          'PLANTILLA_20_Familia_Cuento_Sin_Final_Magico.png',
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

    // Limpiar plantillas existentes para evitar duplicados por Unicode NFC/NFD
    await client.query(`DELETE FROM personalized_templates`);

    for (const [modelName, data] of Object.entries(templateData)) {
      const modelId = model[modelName];
      if (!modelId) {
        console.warn(`[seed] Modelo "${modelName}" no encontrado, saltando plantillas`);
        continue;
      }
      for (const file of data.files) {
        const key = `${data.base}/${file}`.normalize('NFC');
        const name = fileToName(file);
        await client.query(`
          INSERT INTO personalized_templates (model_id, name, template_preview_key)
          VALUES ($1, $2, $3)
        `, [modelId, name, key]);
      }
    }
    console.log('[seed] personalized_templates ✓');

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
        // Todos los libros personalizados tienen 3 variantes de tapa
        const variants = [
          { coverType: 'TAPA_DELGADA', price: 9999 },
          { coverType: 'TAPA_GRUESA',  price: 14999 },
          { coverType: 'TAPA_PREMIUM', price: 24999 },
        ];
        for (const v of variants) {
          await client.query(`
            INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
            VALUES ($1, $2, $3)
            ON CONFLICT (catalog_book_id, cover_type) DO NOTHING
          `, [book.id, v.coverType, v.price]);
        }
      } else if (book.product_type === 'PHOTOBOOK') {
        // Photobooks tienen su variante de tapa correspondiente
        const coverType = book.name.includes('Gruesa') ? 'TAPA_GRUESA' : 'TAPA_DELGADA';
        const price = book.name.includes('Gruesa') ? 14999 : 9999;
        await client.query(`
          INSERT INTO catalog_book_variants (catalog_book_id, cover_type, base_price_cents)
          VALUES ($1, $2, $3)
          ON CONFLICT (catalog_book_id, cover_type) DO NOTHING
        `, [book.id, coverType, price]);
      }
    }
    console.log('[seed] catalog_book_variants ✓');

    // ── 6. photobook_themes ──────────────────────────────────────────────────
    await client.query(`
      INSERT INTO photobook_themes (name, cover_preview_key, cover_template_key, back_cover_key) VALUES
        ('Francia',        'Photobooks/Miniaturas/Photobook_Miniatura_Paris.png',          'themes/francia/template.psd',        NULL),
        ('México',         'Photobooks/Miniaturas/Photobook_Miniatura_Chichen_Itza.png',   'themes/mexico/template.psd',         NULL),
        ('Nueva York',     'Photobooks/Miniaturas/Photobook_Miniatura_New_York.png',       'themes/nueva-york/template.psd',     NULL),
        ('Roma',           'Photobooks/Miniaturas/Photobook_Miniatura_Coliseo_Romano.png', 'themes/roma/template.psd',           NULL),
        ('Holanda',        'Photobooks/Miniaturas/Photobook_Miniatura_Amsterdam.png',      'themes/holanda/template.psd',        NULL),
        ('Thailandia',     'Photobooks/Miniaturas/Photobook_Miniatura_Bangkok.png',        'themes/thailandia/template.psd',     NULL),
        ('Río de Janeiro', 'Photobooks/Miniaturas/Photobook_Miniatura_Rio_Janeiro.png',    'themes/rio-de-janeiro/template.psd', NULL),
        ('Iquitos',        'Photobooks/Miniaturas/Photobook_Miniatura_Iquitos.png',        'themes/iquitos/template.psd',        NULL),
        ('Machu Picchu',   'Photobooks/Miniaturas/Photobook_Miniatura_Machu_Picchu.png',   'Photobooks/Portadas/Photobook_MachuPichu_Portada.png',   'Photobooks/Contraportadas/Photobook_MachuPichu_Contraportada.png'),
        ('Punta Cana',     'Photobooks/Miniaturas/Photobook_Miniatura_Punta_Cana.png',     'themes/punta-cana/template.psd',     NULL),
        ('Jamaica',        'Photobooks/Miniaturas/Photobook_Miniatura_Jamaica.png',        'themes/jamaica/template.psd',        NULL),
        ('Bodas',          'themes/bodas/preview.jpg',                                     'themes/bodas/template.psd',          NULL),
        ('Miami',          'Photobooks/Miniaturas/Photobook_Miniatura_Miami.png',          'themes/miami/template.psd',          NULL)
      ON CONFLICT (name) DO UPDATE SET
        cover_preview_key  = EXCLUDED.cover_preview_key,
        cover_template_key = EXCLUDED.cover_template_key,
        back_cover_key     = EXCLUDED.back_cover_key
    `);
    console.log('[seed] photobook_themes ✓');

    // ── 7. photobook_products ────────────────────────────────────────────────
    // Desactivar producto anterior renombrado
    await client.query(`UPDATE photobook_products SET is_active = FALSE WHERE name = 'Fotolibro 30x20 cm'`);

    const photobookSeeds = [
      { name: 'Fotolibro 21x21 cm', desc: 'Tapa dura, acabado mate',                min_pages: 25, price: 390, custom_dims: false },
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
