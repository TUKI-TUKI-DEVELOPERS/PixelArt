import { getAssetUrl, toRelativeAssetUrl } from "@/lib/assetUrl";

/* Libros personalizados por categoría: datos y armado de las tarjetas que
   comparten la página de categoría y la sección "más libros" del detalle. */

export type BookData = {
  id: string;
  slug: string;
  catalogName: string; // nombre exacto en catalog_books — usado para resolver el ID real
  name: string;
  productType: string;
  description: string | null;
  coverImageUrl: string | null;
  variants: { id: string; coverType: string; basePriceCents: number }[];
  categoryBadge?: string;
  tagline?: string;
  reviewCount?: number;
};

const ADULT_BOOKS_BY_CATEGORY: Record<string, BookData[]> = {
  "libros-de-familia": [
    { id: "familia-mama-adulto", slug: "mama-mi-heroina-adulto", catalogName: "Mamá, Mi Heroína Adulto", name: "Mamá, Mi Heroína Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta para agradecer a mamá desde la memoria, la calma y la vida compartida.", coverImageUrl: null, variants: [{ id: "v12a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE FAMILIA", tagline: "PARA LA MAMÁ QUE SOSTUVO MI VIDA", reviewCount: 0 },
    { id: "familia-abuelo-adulto", slug: "te-amo-abuelo-adulto", catalogName: "Te Amo, Abuelo Adulto", name: "Te Amo, Abuelo Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta para honrar al abuelo desde sus consejos, historias y legado.", coverImageUrl: null, variants: [{ id: "v8a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE FAMILIA", tagline: "PARA EL ABUELO QUE ME DEJÓ RAÍCES", reviewCount: 0 },
    { id: "familia-abuela-adulto", slug: "te-amo-abuela-adulto", catalogName: "Te Amo, Abuela Adulto", name: "Te Amo, Abuela Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta para celebrar a la abuela desde la ternura, la memoria y el hogar.", coverImageUrl: null, variants: [{ id: "v12b", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE FAMILIA", tagline: "PARA LA ABUELA QUE HIZO HOGAR", reviewCount: 0 },
    { id: "familia-equipo-adulto", slug: "el-mejor-equipo-adulto", catalogName: "El Mejor Equipo Adulto", name: "El Mejor Equipo Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta para hermanos que siguen siendo equipo en la vida real.", coverImageUrl: null, variants: [{ id: "v9a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE FAMILIA", tagline: "PARA LOS HERMANOS QUE SIGUEN SIENDO EQUIPO", reviewCount: 0 },
    { id: "familia-la-familia-adulto", slug: "la-familia-adulto", catalogName: "Mi Familia Adulto", name: "Mi Familia Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta para celebrar una familia que siempre encuentra camino de regreso.", coverImageUrl: null, variants: [{ id: "v11a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE FAMILIA", tagline: "PARA LA FAMILIA QUE SIEMPRE VUELVE", reviewCount: 0 },
  ],
  "libros-de-memorias-familiares": [
    { id: "mem-corazon-abuelo-adulto", slug: "siempre-en-mi-corazon-abuelo-adulto", catalogName: "Siempre en mi Corazón Abuelo Adulto", name: "Siempre en mi Corazón Abuelo Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta memorial para recordar al abuelo con una presencia clara y luminosa.", coverImageUrl: null, variants: [{ id: "vm1a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE MEMORIA", tagline: "PARA RECORDAR AL ABUELO QUE SIGUE PRESENTE", reviewCount: 0 },
    { id: "mem-corazon-abuela-adulto", slug: "siempre-en-mi-corazon-abuela-adulto", catalogName: "Siempre en mi Corazón Abuela Adulto", name: "Siempre en mi Corazón Abuela Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta memorial para recordar a la abuela con ternura y presencia luminosa.", coverImageUrl: null, variants: [{ id: "vm1b", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE MEMORIA", tagline: "PARA RECORDAR A LA ABUELA QUE SIGUE PRESENTE", reviewCount: 0 },
    { id: "mem-angel-padre-adulto", slug: "mi-angel-guardian-padre-adulto", catalogName: "Mi Ángel Guardián Padre Adulto", name: "Mi Ángel Guardián Padre Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta protectora para honrar a papá desde la luz, el cuidado y la memoria.", coverImageUrl: null, variants: [{ id: "vm2a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE MEMORIA", tagline: "PARA EL PADRE QUE AÚN CUIDA MI CAMINO", reviewCount: 0 },
    { id: "mem-angel-madre-adulto", slug: "mi-angel-guardian-madre-adulto", catalogName: "Mi Ángel Guardián Madre Adulto", name: "Mi Ángel Guardián Madre Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta protectora para honrar a mamá desde la luz, el cuidado y la memoria.", coverImageUrl: null, variants: [{ id: "vm2b", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE MEMORIA", tagline: "PARA LA MADRE QUE AÚN CUIDA MI CAMINO", reviewCount: 0 },
    { id: "mem-siempre-seras-adulto", slug: "siempre-seras-parte-de-mi-adulto", catalogName: "Siempre Serás Parte de Mí Adulto", name: "Siempre Serás Parte de Mí Adulto", productType: "CUSTOM_BOOK", description: "Versión adulta de hermanos, con escenas vivas de complicidad y memoria compartida.", coverImageUrl: null, variants: [{ id: "vm3a", coverType: "TAPA_DURA", basePriceCents: 13000 }], categoryBadge: "LIBRO DE MEMORIA", tagline: "PARA EL HERMANO QUE SIEMPRE SERÁ PARTE DE MÍ", reviewCount: 0 },
  ],
};

const CATEGORY_BOOKS: Record<string, BookData[]> = {
  "libros-de-amor": [
    {
      id: "amor-1",
      slug: "10-razones-por-las-que-te-amo",
      catalogName: "10 Razones por las que Te Amo",
      name: "10 o 15 Razones Por Las Que Te Amo",
      productType: "CUSTOM_BOOK",
      description:
        "Libro que celebra el amor a través de escenarios cotidianos, divertidos y nostálgicos. Cada plantilla representa un momento especial de la vida en pareja que hace que el amor crezca cada día.",
      coverImageUrl: null,
      variants: [{ id: "v1", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE AMOR",
      tagline: "PORQUE EN LO SIMPLE VIVIMOS LO MAS GRANDE TÚ Y YO",
      reviewCount: 200,
    },
    {
      id: "amor-2",
      slug: "mi-amor",
      catalogName: "Mi Amor",
      name: "Javier, Mi Amor",
      productType: "CUSTOM_BOOK",
      description:
        "Libro que describe al ser amado de manera única y especial. Cada plantilla transforma al destinatario en un personaje poderoso, romántico o inspirador, celebrando sus cualidades a través de metáforas visuales impactantes.",
      coverImageUrl: null,
      variants: [{ id: "v2", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE AMOR",
      tagline: "ERES MI INSPIRACIÓN INFINITA",
      reviewCount: 150,
    },
    {
      id: "amor-3",
      slug: "1025-dias-enamorandome-de-ti",
      catalogName: "1025 Días enamorándome de ti",
      name: "1025 Días Enamorándome De Ti",
      productType: "CUSTOM_BOOK",
      description:
        "Libro que celebra el tiempo juntos como pareja, contando los días desde que comenzaron su relación. Cada plantilla representa un momento mágico, un sentimiento profundo o una comparación creativa que demuestra cómo el amor crece día a día.",
      coverImageUrl: null,
      variants: [{ id: "v3", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE AMOR",
      tagline: "EL MEJOR CONTEO ES EL DE NOSOTROS",
      reviewCount: 180,
    },
  ],
  "libros-de-mascotas": [
    {
      id: "mascota-1",
      slug: "nuestro-angel-de-4-patas",
      catalogName: "Nuestro Angel de 4 patas",
      name: "Nuestro Ángel de 4 Patas",
      productType: "CUSTOM_BOOK",
      description:
        "Crea el homenaje más hermoso a ese peludo que te recibe como si fueras una estrella, que te protege, que te hace reír y que te ama sin condiciones.",
      coverImageUrl: null,
      variants: [{ id: "v4", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "SU HUELLA QUEDÓ PARA SIEMPRE EN TU CORAZÓN",
      reviewCount: 188,
    },
    {
      id: "mascota-2",
      slug: "aventura-entre-patas",
      catalogName: "Aventura entre patas",
      name: "Aventura Entre Patas",
      productType: "CUSTOM_BOOK",
      description:
        "Celebra la complicidad, diversión y amor incondicional entre la mascota de la familia y los niños del hogar.",
      coverImageUrl: null,
      variants: [{ id: "v5", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "CELEBRA TUS AVENTURAS JUNTO A TU PELUDO AMIGO",
      reviewCount: 150,
    },
    {
      id: "mascota-3",
      slug: "mi-amigo-miauravilloso",
      catalogName: "Mi amigo Miauravilloso",
      name: "Mi Amigo Miauravilloso",
      productType: "CUSTOM_BOOK",
      description:
        "Crea el tributo más hermoso a ese felino que te elige, que ronronea en tu regazo y que convierte tu casa en su reino.",
      coverImageUrl: null,
      variants: [{ id: "v6", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "PARA TU GUARDIAN MISTICO",
      reviewCount: 188,
    },
    {
      id: "mascota-4",
      slug: "mi-mejor-amigo-del-mundo",
      catalogName: "Mi mejor amigo del mundo",
      name: "Mi Mejor Amigo del Mundo",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que celebra el vínculo único e irrompible entre tú y tu mascota, capturando cada momento de lealtad, juego y amor incondicional.",
      coverImageUrl: null,
      variants: [{ id: "v14", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "ERES MI COMPAÑERO FIEL",
      reviewCount: 90,
    },
  ],
  "libros-de-familia": [
    {
      id: "familia-1",
      slug: "papa-mi-heroe",
      catalogName: "Papá, Mi Héroe",
      name: "Papá, Mi Héroe",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro personalizado donde una hija celebra a su padre, reconociendo todo lo que lo hace especial.",
      coverImageUrl: null,
      variants: [{ id: "v7", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PARA EL HOMBRE QUE ME ENSEÑO A SER VALIENTE",
      reviewCount: 185,
    },
    {
      id: "familia-1-adulto",
      slug: "papa-mi-heroe-adulto",
      catalogName: "Papá, Mi Héroe Adulto",
      name: "Papá, Mi Héroe Adulto",
      productType: "CUSTOM_BOOK",
      description:
        "Una versión adulta y emotiva para celebrar a papá desde la gratitud de un hijo o hija que ya creció.",
      coverImageUrl: null,
      variants: [{ id: "v7a", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PARA EL PAPÁ QUE SOSTUVO MI CAMINO",
      reviewCount: 0,
    },
    {
      id: "familia-2",
      slug: "te-amo-abuelo",
      catalogName: "Te amo, abuelo",
      name: "Te Amo, Abuelo",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que honra el vínculo sagrado entre abuelos y nietos, capturando la sabiduría, ternura e historias compartidas.",
      coverImageUrl: null,
      variants: [{ id: "v8", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "ÉL TE CONTO HISTORIAS, AHORA TU DALE UN TESORO QUE RECORDAR",
      reviewCount: 185,
    },
    {
      id: "familia-3",
      slug: "el-mejor-equipo",
      catalogName: "El Mejor Equipo",
      name: "El Mejor Equipo",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que celebra el vínculo entre hermanos, capturando las aventuras, risas y momentos que los hacen un equipo único.",
      coverImageUrl: null,
      variants: [{ id: "v9", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE SER HERMANOS SE MERECE UN LIBRO PROPIO",
      reviewCount: 180,
    },
    {
      id: "familia-4",
      slug: "la-familia",
      catalogName: "Mi Familia",
      name: "La Familia",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro personalizado que celebra la unión familiar, capturando los momentos que hacen de tu familia algo único e irrepetible.",
      coverImageUrl: null,
      variants: [{ id: "v11", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE ESTANDO JUNTOS TODO ES MEJOR",
      reviewCount: 170,
    },
    {
      id: "familia-5",
      slug: "te-amo-abuela",
      catalogName: "Te amo, abuela",
      name: "Te Amo, Abuela",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que celebra el amor incondicional de una abuela, capturando su ternura, sus historias y el calor de su presencia.",
      coverImageUrl: null,
      variants: [{ id: "v12", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE EL AMOR DE UNA ABUELA NUNCA SE OLVIDA",
      reviewCount: 90,
    },
    {
      id: "familia-6",
      slug: "mama-mi-heroina",
      catalogName: "Mamá, Mi Heroína",
      name: "Mamá, Mi Heroína",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro personalizado donde celebras a tu mamá, reconociendo su fuerza, amor y todo lo que la hace extraordinaria.",
      coverImageUrl: null,
      variants: [{ id: "v13", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "EL REGALO QUE TU MAMÁ GUARDARÁ PARA SIEMPRE",
      reviewCount: 182,
    },
  ],
  "libros-de-memorias-familiares": [
    {
      id: "memorias-5",
      slug: "siempre-seras-parte-de-mi",
      catalogName: "Siempre seras parte de mi",
      name: "Siempre Serás Parte de Mi Corazón",
      productType: "CUSTOM_BOOK",
      description:
        "Un homenaje a ese vínculo eterno que ninguna distancia puede romper. Cada página celebra la complicidad, las aventuras y el amor que los une para siempre.",
      coverImageUrl: null,
      variants: [{ id: "vm4", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "MEMORIAS FAMILIARES",
      tagline: "PORQUE NUESTRO VÍNCULO ES ETERNO",
      reviewCount: 0,
    },
    {
      id: "memorias-4",
      slug: "siempre-en-mi-corazon",
      catalogName: "Siempre en mi corazon",
      name: "Siempre en mi Corazón",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro dedicado a ese ser querido que partió pero vive para siempre en tus recuerdos. Cada página celebra su legado y el amor que los unió.",
      coverImageUrl: null,
      variants: [{ id: "vm3", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "MEMORIAS FAMILIARES",
      tagline: "PORQUE TU RECUERDO VIVE EN CADA LATIDO",
      reviewCount: 0,
    },
    {
      id: "memorias-3",
      slug: "mi-angel-guardian",
      catalogName: "Mi angel guardian",
      name: "Mi Ángel Guardián",
      productType: "CUSTOM_BOOK",
      description:
        "Un homenaje lleno de amor para honrar a esa persona que fue tu guía, tu fuerza y tu luz. Porque su presencia sigue brillando en cada recuerdo.",
      coverImageUrl: null,
      variants: [{ id: "vm2", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "MEMORIAS FAMILIARES",
      tagline: "PORQUE TU LUZ SIGUE BRILLANDO EN MÍ",
      reviewCount: 0,
    },
  ],
};

/* Miniatura por slug desde MinIO (fallback cuando el API no trae portada). */
const COVER_MAP: Record<string, string> = {
  // Amor
  "10-razones-por-las-que-te-amo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_10RazonesPorLasQueTeAmo_Miniatura.png",
  "mi-amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_Miamor_Miniatura.png",
  "1025-dias-enamorandome-de-ti": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png",
  // Mascotas
  "nuestro-angel-de-4-patas": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_NuestroAngelde4Patas_Miniatura.png",
  "aventura-entre-patas": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Miniatura.png",
  "mi-amigo-miauravilloso": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_MiAmigoMiauravilloso_Miniatura.png",
  "mi-mejor-amigo-del-mundo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_ElMejorAmigoDelMundo_Miniatura.png",
  // Familia
  "papa-mi-heroe": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png",
  "papa-mi-heroe-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Adulto_Miniatura.png",
  "mama-mi-heroina": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png",
  "te-amo-abuelo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png",
  "te-amo-abuela": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Miniatura.png",
  "el-mejor-equipo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Miniatura.png",
  "la-familia": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Miniatura.png",
  // Memorias Familiares
  "mi-angel-guardian": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png",
  "siempre-en-mi-corazon": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazon_Miniatura.png",
  "siempre-seras-parte-de-mi": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMiCorazon_Miniatura.png",
  "mama-mi-heroina-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Adulto_Miniatura.webp",
  "te-amo-abuelo-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Adulto_Miniatura.webp",
  "te-amo-abuela-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Adulto_Miniatura.webp",
  "el-mejor-equipo-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Adulto_Miniatura.webp",
  "la-familia-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Adulto_Miniatura.webp",
  "aventura-entre-patas-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Adulto_Miniatura.webp",
  "siempre-en-mi-corazon-abuelo-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuelo_Adulto_Miniatura.webp",
  "siempre-en-mi-corazon-abuela-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazonAbuela_Adulto_Miniatura.webp",
  "mi-angel-guardian-padre-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianPadre_Adulto_Miniatura.webp",
  "mi-angel-guardian-madre-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardianMadre_Adulto_Miniatura.webp",
  "siempre-seras-parte-de-mi-adulto": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMi_Adulto_Miniatura.webp",
};

type VersionOption = { slug: string; label: string; caption?: string };
const VERSION_GROUPS: Array<{ baseSlug: string; displayName: string; versions: VersionOption[] }> = [
  { baseSlug: "papa-mi-heroe", displayName: "Papá, mi héroe", versions: [{ slug: "papa-mi-heroe", label: "Versión Infantil" }, { slug: "papa-mi-heroe-adulto", label: "Versión Adultos" }] },
  { baseSlug: "aventura-entre-patas", displayName: "Aventura Entre Patas", versions: [{ slug: "aventura-entre-patas", label: "Versión Infantil" }, { slug: "aventura-entre-patas-adulto", label: "Versión Adultos" }] },
  { baseSlug: "mama-mi-heroina", displayName: "Mamá, Mi Heroína", versions: [{ slug: "mama-mi-heroina", label: "Versión Infantil" }, { slug: "mama-mi-heroina-adulto", label: "Versión Adultos" }] },
  { baseSlug: "te-amo-abuelo", displayName: "Te Amo, Abuelo", versions: [{ slug: "te-amo-abuelo", label: "Versión Infantil" }, { slug: "te-amo-abuelo-adulto", label: "Versión Adultos" }] },
  { baseSlug: "te-amo-abuela", displayName: "Te Amo, Abuela", versions: [{ slug: "te-amo-abuela", label: "Versión Infantil" }, { slug: "te-amo-abuela-adulto", label: "Versión Adultos" }] },
  { baseSlug: "el-mejor-equipo", displayName: "El Mejor Equipo", versions: [{ slug: "el-mejor-equipo", label: "Versión Infantil" }, { slug: "el-mejor-equipo-adulto", label: "Versión Adultos" }] },
  { baseSlug: "la-familia", displayName: "Mi Familia", versions: [{ slug: "la-familia", label: "Versión Infantil" }, { slug: "la-familia-adulto", label: "Versión Adultos" }] },
  { baseSlug: "siempre-en-mi-corazon", displayName: "Siempre en mi Corazón", versions: [{ slug: "siempre-en-mi-corazon", label: "Infantil", caption: "Ilustrado para leer en familia" }, { slug: "siempre-en-mi-corazon-abuelo-adulto", label: "Abuelo", caption: "Edición adultos · para el abuelo" }, { slug: "siempre-en-mi-corazon-abuela-adulto", label: "Abuela", caption: "Edición adultos · para la abuela" }] },
  { baseSlug: "mi-angel-guardian", displayName: "Mi Ángel Guardián", versions: [{ slug: "mi-angel-guardian", label: "Infantil", caption: "Ilustrado para leer en familia" }, { slug: "mi-angel-guardian-padre-adulto", label: "Papá", caption: "Edición adultos · para papá" }, { slug: "mi-angel-guardian-madre-adulto", label: "Mamá", caption: "Edición adultos · para mamá" }] },
  { baseSlug: "siempre-seras-parte-de-mi", displayName: "Siempre Serás Parte de Mí", versions: [{ slug: "siempre-seras-parte-de-mi", label: "Infantil", caption: "Ilustrado para leer en familia" }, { slug: "siempre-seras-parte-de-mi-adulto", label: "Adultos", caption: "Edición adultos · entre hermanos" }] },
];

export type CategoryBook = BookData & {
  href: string;
  versions?: Array<BookData & { href: string; label: string; caption?: string }>;
};

export function buildCategoryBooks(
  categoriaSlug: string,
  { catalogIds = {}, modelCovers = {} }: { catalogIds?: Record<string, number>; modelCovers?: Record<string, string> } = {},
): CategoryBook[] {
  const booksRaw = [
    ...(CATEGORY_BOOKS[categoriaSlug] ?? []),
    ...(ADULT_BOOKS_BY_CATEGORY[categoriaSlug] ?? []),
  ];

  const resolvedBooks = booksRaw.map((b) => {
    const realId = catalogIds[b.catalogName] ? String(catalogIds[b.catalogName]) : b.id;
    // Prioridad: API (BD) → COVER_MAP estático (fallback) → null
    const coverImageUrl =
      (modelCovers[b.catalogName] ? toRelativeAssetUrl(modelCovers[b.catalogName]) : undefined) ??
      (COVER_MAP[b.slug] ? getAssetUrl(COVER_MAP[b.slug]) : null);
    return {
      ...b,
      id: realId,
      coverImageUrl,
      href: `/libros-personalizados/${categoriaSlug}/${b.slug}`,
    };
  });

  const hiddenVersionSlugs = new Set(VERSION_GROUPS.flatMap((group) => group.versions.slice(1).map((version) => version.slug)));
  const allBooks = resolvedBooks.flatMap((book) => {
    if (hiddenVersionSlugs.has(book.slug)) return [];
    const group = VERSION_GROUPS.find((item) => item.baseSlug === book.slug);
    if (!group) return [book];

    const versions = group.versions
      .map((version) => {
        const match = resolvedBooks.find((candidate) => candidate.slug === version.slug);
        return match ? { ...match, label: version.label, caption: version.caption, name: group.displayName } : null;
      })
      .filter(Boolean) as Array<BookData & { href: string; label: string; caption?: string }>;

    if (versions.length < 2) return [book];
    return [{ ...book, name: group.displayName, versions }];
  });

  return allBooks;
}
