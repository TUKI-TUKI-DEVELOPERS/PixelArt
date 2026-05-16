"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductGrid from "@/components/catalog/ProductGrid";
import { getAssetUrl } from "@/lib/assetUrl";
import { useWindowSize } from "@/hooks/useWindowSize";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/* ── Datos por categoría ── */

type BookData = {
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


type ActivePromo = {
  targetType: string;
  targetId: number | null;
  targetIds: number[];
  discountType: string;
  discountValue: number;
};

const CATEGORY_HERO: Record<
  string,
  { title: string; subtitle: string; description: string; accent: string }
> = {
  "libros-de-amor": {
    title: "LOS MEJORES LIBROS DE AMOR",
    subtitle: "PARA AQUELLA PERSONA ESPECIAL",
    description:
      "Tu pareja es lo mejor que tienes, y por eso merece un regalo que esté a la altura de lo que sienten el uno por el otro.",
    accent: "#e74c6f",
  },
  "libros-de-mascotas": {
    title: "LOS MEJORES LIBROS DE MASCOTAS",
    subtitle: "PARA TU COMPAÑERO FIEL",
    description:
      "Tu mascota es parte de la familia, y merece un homenaje tan especial como el amor que te da cada día. Estos libros personalizados capturan esos momentos únicos que compartes con tu peludo amigo, creando un recuerdo que atesorarás para siempre.",
    accent: "#f5a623",
  },
  "libros-de-familia": {
    title: "LOS MEJORES LIBROS DE FAMILIA",
    subtitle: "PARA QUIENES MÁS QUIERES",
    description:
      "La familia es el pilar de todo. Estos libros personalizados celebran los vínculos más importantes de tu vida, desde padres y abuelos hasta hermanos. Un regalo que fortalece lazos y crea recuerdos que se transmiten de generación en generación.",
    accent: "#88c343",
  },
  "libros-de-memorias-familiares": {
    title: "LIBROS DE MEMORIAS FAMILIARES",
    subtitle: "PRESERVA TU HISTORIA",
    description:
      "Cada familia tiene una historia única que merece ser contada. Estos libros recopilan los recuerdos más valiosos de tu familia, creando un legado emocional que perdurará a través del tiempo.",
    accent: "#8b6bb1",
  },
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
      id: "memorias-2",
      slug: "gracias-por-tu-amor",
      catalogName: "Gracias por tu amor",
      name: "Gracias por tu amor",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro homenaje para honrar a esa persona especial que siempre será parte de tu corazón. Cada página celebra los momentos únicos que compartieron juntos.",
      coverImageUrl: null,
      variants: [{ id: "vm1", coverType: "TAPA_DURA", basePriceCents: 13000 }],
      categoryBadge: "MEMORIAS FAMILIARES",
      tagline: "PORQUE SIEMPRE SERÁS PARTE DE MÍ",
      reviewCount: 0,
    },
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

/* ── FAQ por categoría ── */
const FAQ_ITEMS: Record<string, { question: string; answer: string }[]> = {
  "libros-de-amor": [
    {
      question: "¿Por qué un libro de amor es mejor regalo que flores o chocolates?",
      answer:
        "Las flores se marchitan y los chocolates se acaban, pero un libro de amor se queda para siempre. Cada vez que tu pareja lo abre, revive ese momento especial. Es el único regalo que mezcla tus fotos reales, su nombre y su historia en un objeto físico que dura años.",
    },
    {
      question: "¿Necesito saber de diseño para crear el libro?",
      answer:
        "Para nada. Solo sube tus fotos y nosotros nos encargamos del resto. La IA integra tus imágenes en escenarios ya diseñados de forma profesional. Sin programas de edición, sin complicaciones: en minutos tienes tu libro listo para imprimir.",
    },
    {
      question: "¿Cuántas fotos necesito subir para el libro de amor?",
      answer:
        "Con solo 5 fotos es suficiente para que quede hermoso. No necesitas fotos de estudio, con fotos cotidianas del celular funciona perfecto.",
    },
    {
      question: "¿Puedo personalizar los nombres y los detalles de la historia?",
      answer:
        "Sí, completamente. El nombre de tu pareja, la fecha de su aniversario, los apodos que se tienen, los momentos que vivieron juntos... todo eso se integra en el libro para que se sienta cien por ciento único e irrepetible.",
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi libro?",
      answer:
        "Una vez aprobado el diseño, el proceso de impresión y envío demora entre 5 y 10 días hábiles según tu ciudad. Puedes coordinar la entrega para que llegue justo a tiempo para esa fecha especial.",
    },
  ],
  "libros-de-mascotas": [
    {
      question: "¿Qué tipo de fotos de mi mascota necesito subir?",
      answer:
        "Fotos claras donde se vea bien la cara de tu mascota. No necesitas fotos profesionales, las del celular funcionan perfecto. Cuantas más expresiones y momentos captures, más rico queda el libro.",
    },
    {
      question: "¿El libro funciona para cualquier tipo de mascota?",
      answer:
        "Sí. Aunque la mayoría de nuestros libros están pensados para perros y gatos, los escenarios se adaptan perfectamente a cualquier compañero peludo. Si tienes dudas con una mascota en particular, escríbenos antes de pedir.",
    },
    {
      question: "¿Puedo hacer un libro en memoria de una mascota que ya no está?",
      answer:
        "Sí, y de hecho es uno de los usos más emotivos que le dan nuestros clientes. Con las fotos que tienes guardadas, creamos un libro que honra su memoria y se convierte en un recuerdo para siempre.",
    },
    {
      question: "¿Cómo aparece el nombre de mi mascota en el libro?",
      answer:
        "El nombre de tu mascota se integra de forma personalizada en las páginas del libro. No es un sello genérico: está tejido dentro del relato visual de cada escena, como si el libro hubiera sido creado especialmente para ella.",
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi libro?",
      answer:
        "Una vez aprobado el diseño, el proceso de impresión y envío demora entre 5 y 10 días hábiles según tu ciudad.",
    },
  ],
  "libros-de-familia": [
    {
      question: "¿Puedo incluir a varios miembros de la familia en el mismo libro?",
      answer:
        "Sí. Puedes subir fotos de toda la familia y el libro los incluirá a todos. Es ideal para regalar en fechas especiales donde la familia se reúne, como el Día de la Madre, Navidad o un cumpleaños especial.",
    },
    {
      question: "¿Qué libro es mejor para el Día de la Madre o del Padre?",
      answer:
        'Tenemos libros diseñados específicamente para esas fechas: "Mamá, Mi Heroína", "Papá, Mi Héroe" y otros títulos que convierten a mamá o papá en los protagonistas de una historia única. Son los más pedidos en esas fechas.',
    },
    {
      question: "¿Las fotos tienen que ser de alta calidad?",
      answer:
        "No necesariamente. Con fotos tomadas desde el celular es suficiente. Lo más importante es que estén bien iluminadas y que se vean con claridad los rostros de las personas que quieres incluir.",
    },
    {
      question: "¿Puedo hacer un libro especial para mis abuelos?",
      answer:
        'Sí, y es uno de los regalos más emotivos que puedes hacer. Tenemos libros como "Te Amo Abuelo" y "Te Amo Abuela" que celebran ese vínculo especial. Los abuelos lo guardan con mucho cariño.',
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi libro?",
      answer:
        "Una vez aprobado el diseño, el proceso de impresión y envío demora entre 5 y 10 días hábiles según tu ciudad. Te recomendamos pedirlo con anticipación para fechas especiales.",
    },
  ],
  "libros-de-memorias-familiares": [
    {
      question: "¿Qué hace diferente un libro de memorias a un álbum de fotos tradicional?",
      answer:
        "Un álbum guarda fotos. Un libro de memorias cuenta una historia. Cada página está compuesta con intención, con un relato visual que conecta los momentos, los nombres y los sentimientos de tu familia en algo que se lee y se siente como un libro de verdad.",
    },
    {
      question: "¿Puedo usar fotos antiguas o escaneadas?",
      answer:
        "Sí. Puedes subir fotos escaneadas de épocas anteriores junto con fotos actuales. Mezclar generaciones en un mismo libro es de las cosas más emocionantes que puedes crear.",
    },
    {
      question: "¿Cuántas páginas tiene el libro de memorias?",
      answer:
        "El número de páginas varía según el libro que elijas, pero en general oscilan entre 15 y 30 páginas. Suficientes para contar una historia completa sin perder calidad ni detalle.",
    },
    {
      question: "¿Puedo agregar textos o descripciones junto a las fotos?",
      answer:
        "Sí. Al momento de pedir el libro puedes incluir frases, fechas, nombres y pequeños relatos que quieres que acompañen cada imagen. Nosotros los integramos de forma cuidada dentro del diseño.",
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi libro?",
      answer:
        "Una vez aprobado el diseño, el proceso de impresión y envío demora entre 5 y 10 días hábiles según tu ciudad.",
    },
  ],
};

const FAQ_TITLE: Record<string, string> = {
  "libros-de-amor":                "¿Por qué elegir un libro de amor de PIXELART?",
  "libros-de-mascotas":            "¿Por qué elegir un libro de mascotas de PIXELART?",
  "libros-de-familia":             "¿Por qué elegir un libro familiar de PIXELART?",
  "libros-de-memorias-familiares": "¿Por qué preservar tus memorias con PIXELART?",
};

/* ── Testimonios ── */
const TESTIMONIALS = [
  {
    title: "Libro Personalizado para mi héroe",
    story:
      'Alondra se acercó en puntitas con el libro entre las manos, como si cargara un tesoro. "Es para ti, papá". Javier lo tomó despacio, leyó el título y se quedó en silencio un segundo. Sonrió sin poder evitarlo; los ojos se le humedecieron. La abrazó fuerte, con el libro pegado al pecho.',
  },
  {
    title: "Un recuerdo de mi mejor amigo",
    story:
      'En cuanto abrieron el libro, los dos se juntaron más, hombro con hombro. "Mira… es Rocky", dijo uno, señalando una escena donde parecía estar corriendo con ellos otra vez. Se rieron bajito, y luego se quedaron mirando con esa mezcla de nostalgia y calma.',
  },
  {
    title: "Una propuesta inolvidable",
    story:
      'La cena iba tranquila hasta que él sacó el libro, nervioso y sonriendo. Ella lo abrió y empezó a pasar páginas: recuerdos, momentos, pequeñas "razones" que la hicieron reír y luego respirar hondo. Cuando levantó la mirada, él ya estaba de rodillas.',
  },
];

/* ── Ocasiones perfectas ── */
const OCCASIONS: Record<string, { subtitle: string; items: string[] }> = {
  "libros-de-amor": {
    subtitle: "Nuestros libros de amor son el regalo perfecto para cualquiera de estos momentos.",
    items: [
      "San Valentín",
      "Aniversario",
      "Propuesta de matrimonio",
      "Boda",
      "Cumpleaños",
      "Sorpresa sin motivo",
    ],
  },
  "libros-de-mascotas": {
    subtitle: "Cualquier momento es perfecto para celebrar a tu compañero peludo.",
    items: [
      "Cumpleaños de la mascota",
      "Adopción",
      "En su memoria",
      "Regalo para el dueño",
      "Navidad",
      "Sorpresa",
    ],
  },
  "libros-de-familia": {
    subtitle: "Cada fecha especial merece un regalo único y lleno de amor.",
    items: [
      "Día de la Madre",
      "Día del Padre",
      "Cumpleaños",
      "Navidad",
      "Para los abuelos",
      "Reunión familiar",
    ],
  },
  "libros-de-memorias-familiares": {
    subtitle: "Preserva los momentos que nunca quieres olvidar.",
    items: [
      "Fin de año",
      "Cumpleaños especial",
      "Navidad",
      "Para los abuelos",
      "Bodas de oro o plata",
      "Sorpresa familiar",
    ],
  },
};

/* ── Encabezados del catalogo ── */
const CATALOG_HEADING: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  "libros-de-amor": {
    eyebrow: "LIBROS DE AMOR",
    title: "ELIGE TU HISTORIA DE AMOR",
    subtitle: "Cada libro es tan único como tu relación",
  },
  "libros-de-mascotas": {
    eyebrow: "LIBROS DE MASCOTAS",
    title: "CELEBRA A TU COMPAÑERO FIEL",
    subtitle: "Porque el amor de una mascota merece un libro propio",
  },
  "libros-de-familia": {
    eyebrow: "LIBROS DE FAMILIA",
    title: "EL REGALO QUE NUNCA OLVIDARÁN",
    subtitle: "Un libro para cada vínculo especial",
  },
  "libros-de-memorias-familiares": {
    eyebrow: "MEMORIAS FAMILIARES",
    title: "PRESERVA TU HISTORIA FAMILIAR",
    subtitle: "Un legado emocional que perdurará en el tiempo",
  },
};

/* ══════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════ */

type Props = {
  categoriaSlug: string;
  categoriaNombre: string;
  assetUrls?: Record<string, string>;
  catalogIds?: Record<string, number>;
  // coverImageUrl por nombre de modelo (catalogName), vienen del API
  modelCovers?: Record<string, string>;
};

const INITIAL_VISIBLE = 3;

export default function CategoriaClient({
  categoriaSlug,
  categoriaNombre,
  assetUrls = {},
  catalogIds = {},
  modelCovers = {},
}: Props) {
  const { isMobile, isTablet } = useWindowSize();
  const hero = CATEGORY_HERO[categoriaSlug];
  const booksRaw = CATEGORY_BOOKS[categoriaSlug] ?? [];

  // Mapa slug → miniatura desde MinIO
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
    "mama-mi-heroina": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png",
    "te-amo-abuelo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png",
    "te-amo-abuela": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Miniatura.png",
    "el-mejor-equipo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Miniatura.png",
    "la-familia": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Miniatura.png",
    // Memorias Familiares
    "gracias-por-tu-amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_GraciasPorTuAmor_Miniatura.png",
    "mi-angel-guardian": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png",
    "siempre-en-mi-corazon": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazon_Miniatura.png",
    "siempre-seras-parte-de-mi": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMiCorazon_Miniatura.png",
  };

  const allBooks = booksRaw.map((b) => {
    const realId = catalogIds[b.catalogName] ? String(catalogIds[b.catalogName]) : b.id;
    // Prioridad: API (BD) → COVER_MAP estático (fallback) → null
    const coverImageUrl =
      modelCovers[b.catalogName] ??
      (COVER_MAP[b.slug] ? getAssetUrl(COVER_MAP[b.slug]) : null);
    return {
      ...b,
      id: realId,
      coverImageUrl,
      href: `/libros-personalizados/${categoriaSlug}/${b.slug}`,
    };
  });
  const hasHeroBg = !!assetUrls.heroBackground;
  const comunidadImages = [
    assetUrls.comunidad1,
    assetUrls.comunidad2,
    assetUrls.comunidad3,
    assetUrls.comunidad4,
    assetUrls.comunidad5,
    assetUrls.comunidad6,
    assetUrls.comunidad7,
    assetUrls.comunidad8,
  ].filter((url): url is string => !!url);
  const [promos, setPromos] = useState<ActivePromo[]>([]);

  useEffect(() => {
    fetch(`${API}/api/promotions/active`)
      .then((r) => r.json())
      .then((data) => setPromos(Array.isArray(data) ? data : data.data ?? []))
      .catch(() => {});
  }, []);

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const books = allBooks.slice(0, visibleCount);
  const hasMore = visibleCount < allBooks.length;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: isMobile ? "auto" : "560px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          paddingBottom: isMobile ? "40px" : "72px",
        }}
      >
        {/* Background image from MinIO (if available) */}
        {assetUrls.heroBackground ? (
          <>
            <img
              src={assetUrls.heroBackground}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          </>
        ) : (
          <>
            {/* Fallback: Background gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${hero.accent}18 0%, ${hero.accent}08 40%, #f8f9fa 100%)`,
                zIndex: 0,
              }}
            />
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                top: "-120px",
                right: "-80px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: `${hero.accent}0a`,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "-40px",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `${hero.accent}08`,
                zIndex: 0,
              }}
            />
          </>
        )}

        <motion.div
          initial={hasHeroBg ? { opacity: 0, scale: 0.93 } : false}
          animate={hasHeroBg ? { opacity: 1, scale: 1 } : false}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: isMobile ? "calc(100% - 40px)" : isTablet ? "600px" : "680px",
            margin: isMobile ? "0 20px" : "0 auto",
            padding: isMobile ? "32px 24px" : isTablet ? "40px 40px" : "48px 56px",
            textAlign: "center",
            borderRadius: "24px",
            ...(hasHeroBg ? {
              background: "rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
            } : {
              padding: isMobile ? "48px 20px" : isTablet ? "64px 32px" : "80px 48px",
            }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 20px",
              borderRadius: "20px",
              background: hero.accent,
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "24px",
            }}
          >
            {categoriaNombre}
          </div>

          <h1
            style={{
              margin: "0 0 8px 0",
              fontSize: isMobile ? "28px" : isTablet ? "36px" : "48px",
              fontWeight: 900,
              color: hasHeroBg ? "#ffffff" : "#111",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            {hero.title}
          </h1>
          <h2
            style={{
              margin: "0 0 28px 0",
              fontSize: isMobile ? "16px" : isTablet ? "22px" : "28px",
              fontWeight: 600,
              color: hero.accent,
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {hero.subtitle}
          </h2>
          <p
            style={{
              margin: "0 auto",
              maxWidth: "480px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: hasHeroBg ? "#f0e4dc" : "#444",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {hero.description}
          </p>
        </motion.div>
      </section>

      {/* ═══ SECCIÓN CATÁLOGO ═══ */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px" : isTablet ? "48px 32px" : "64px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              fontWeight: 500,
              color: hero.accent,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {CATALOG_HEADING[categoriaSlug]?.eyebrow ?? "NUESTROS LIBROS"}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              margin: "0 0 8px 0",
            }}
          >
            {!isMobile && !isTablet && (
              <CatalogOrnament accent={hero.accent} category={categoriaSlug} />
            )}
            <h3
              style={{
                margin: 0,
                fontSize: isMobile ? "22px" : isTablet ? "28px" : "36px",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {CATALOG_HEADING[categoriaSlug]?.title ?? "ELIGE TU LIBRO PERFECTO"}
            </h3>
            {!isMobile && !isTablet && (
              <CatalogOrnament accent={hero.accent} category={categoriaSlug} flip />
            )}
          </div>
          <p
            style={{
              margin: "0 0 20px 0",
              fontSize: "16px",
              color: "#666",
              fontWeight: 400,
            }}
          >
            {CATALOG_HEADING[categoriaSlug]?.subtitle ?? ""}
          </p>
          <div
            style={{
              width: "80px",
              height: "3px",
              background: hero.accent,
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        <ProductGrid books={books} promos={promos} />

        {hasMore && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE)}
              style={{
                minWidth: "220px",
                height: "56px",
                borderRadius: "18px",
                border: `2px solid ${hero.accent}`,
                background: "#fff",
                color: hero.accent,
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "inherit",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              Ver Más
            </button>
          </div>
        )}
      </section>

      {/* ═══ ¿POR QUÉ ESCOGER PIXELART? — FAQ ═══ */}
      <section
        style={{
          background: "#fafafa",
          padding: isMobile ? "48px 20px" : isTablet ? "64px 32px" : "80px 48px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "22px" : isTablet ? "28px" : "36px",
                fontWeight: 700,
                color: "#111",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {FAQ_TITLE[categoriaSlug] ?? "¿Por qué elegir PIXELART?"}
            </h2>
          </div>

          <div>
            {(FAQ_ITEMS[categoriaSlug] ?? FAQ_ITEMS["libros-de-amor"]).map((item, i) => (
              <FaqItem
                key={i}
                index={i}
                question={item.question}
                answer={item.answer}
                accent={hero.accent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OCASIONES PERFECTAS ═══ */}
      <section
        style={{
          background: hero.accent,
          padding: isMobile ? "48px 20px" : isTablet ? "56px 32px" : "72px 48px",
        }}
      >
        <style>{`
          .occasion-chip-f {
            transition: transform 0.18s ease, box-shadow 0.18s ease;
            cursor: default;
          }
          .occasion-chip-f:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
          }
        `}</style>

        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              marginBottom: "14px",
            }}
          >
            OCASIONES PERFECTAS
          </div>
          <h3
            style={{
              margin: "0 0 14px 0",
              fontSize: isMobile ? "26px" : "36px",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            ¿Cuándo regalarlo?
          </h3>
          <p
            style={{
              margin: "0 0 40px 0",
              fontSize: "16px",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6,
              maxWidth: "520px",
              marginInline: "auto",
            }}
          >
            {OCCASIONS[categoriaSlug]?.subtitle ?? "Una sorpresa que siempre llega en el momento justo."}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {(OCCASIONS[categoriaSlug]?.items ?? []).map((label) => (
              <div
                key={label}
                className="occasion-chip-f"
                style={{
                  padding: "11px 28px",
                  borderRadius: "100px",
                  border: "none",
                  background: "#fff",
                  color: hero.accent,
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── FAQ Accordion Item ── */
function FaqItem({
  question,
  answer,
  accent,
  index,
}: {
  question: string;
  answer: string;
  accent: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: `1px solid ${open ? accent + "40" : "#ebebeb"}`,
        borderLeft: `4px solid ${open ? accent : "transparent"}`,
        marginBottom: "12px",
        overflow: "hidden",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: open ? `0 4px 24px ${accent}18` : "none",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          fontFamily: "inherit",
          gap: "16px",
        }}
      >
        {/* Número */}
        <span
          style={{
            flexShrink: 0,
            fontSize: "13px",
            fontWeight: 700,
            color: open ? accent : "#ccc",
            letterSpacing: "0.5px",
            minWidth: "26px",
            transition: "color 0.25s ease",
          }}
        >
          {num}
        </span>

        {/* Pregunta */}
        <span
          style={{
            flex: 1,
            fontSize: "17px",
            fontWeight: 600,
            color: open ? "#111" : "#333",
            transition: "color 0.25s ease",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>

        {/* Botón círculo con chevron */}
        <div
          style={{
            flexShrink: 0,
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: open ? accent : "transparent",
            border: `2px solid ${open ? accent : "#ddd"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.25s ease, border-color 0.25s ease",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#fff" : "#aaa"}
            strokeWidth="2.5"
            strokeLinecap="round"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div
          style={{
            padding: "0 24px 24px 66px",
            fontSize: "15px",
            lineHeight: 1.65,
            color: "#666",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ── Catalog Ornament ── */
function CatalogOrnament({ accent, category, flip }: { accent: string; category: string; flip?: boolean }) {
  return (
    <svg
      width="170"
      height="48"
      viewBox="0 0 170 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: accent, flexShrink: 0, transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* ══ SIMBOLO DE CATEGORIA (ocupa aprox x:4-42, y:8-40) ══ */}

      {/* AMOR — corazon grande y reconocible */}
      {category === "libros-de-amor" && (
        <path
          d="M 23 38 C 23 38 4 28 4 17 C 4 10 9 7.5 14 10.5 C 17.5 12.5 20.5 16 23 21 C 25.5 16 28.5 12.5 32 10.5 C 37 7.5 42 10 42 17 C 42 28 23 38 23 38Z"
          fill="currentColor"
          opacity="0.90"
        />
      )}

      {/* MASCOTAS — huella con pad central y 3 dedos */}
      {category === "libros-de-mascotas" && (
        <>
          <ellipse cx="23" cy="30" rx="9" ry="7" fill="currentColor" opacity="0.90" />
          <circle cx="11" cy="19" r="5.5" fill="currentColor" opacity="0.90" />
          <circle cx="23" cy="14" r="5.5" fill="currentColor" opacity="0.90" />
          <circle cx="35" cy="19" r="5.5" fill="currentColor" opacity="0.90" />
        </>
      )}

      {/* FAMILIA — hoja con nervadura */}
      {category === "libros-de-familia" && (
        <>
          <path
            d="M 23 38 C 6 30 4 17 23 9 C 42 17 40 30 23 38Z"
            fill="currentColor"
            opacity="0.90"
          />
          <path
            d="M 23 9 L 23 38"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </>
      )}

      {/* MEMORIAS — estrella de 5 puntas */}
      {(category === "libros-de-memorias-familiares" ||
        !["libros-de-amor", "libros-de-mascotas", "libros-de-familia"].includes(category)) && (
        <path
          d="M 23 9 L 26 18.5 L 36 18.5 L 28.5 24.5 L 31 34 L 23 28.5 L 15 34 L 17.5 24.5 L 10 18.5 L 20 18.5Z"
          fill="currentColor"
          opacity="0.90"
        />
      )}

      {/* ══ PRIMER SWIRL desde el simbolo ══ */}
      <path
        d="M 42 19 C 50 6 65 8 63 20"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ══ LOOP caligrafico (el corazon del estilo caligrafico) ══ */}
      <path
        d="M 63 20 C 61 32 73 34 76 25 C 79 16 70 12 71 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* ══ LINEA hacia el texto ══ */}
      <line x1="76" y1="24" x2="122" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.65" />

      {/* ══ DIAMANTE central ══ */}
      <path d="M 99 20 L 103 24 L 99 28 L 95 24Z" fill="currentColor" opacity="0.85" />
      <circle cx="99" cy="24" r="1.2" fill="white" opacity="0.6" />

      {/* ══ PUNTOS decorativos ══ */}
      <circle cx="85" cy="24" r="2" fill="currentColor" opacity="0.50" />
      <circle cx="114" cy="24" r="2" fill="currentColor" opacity="0.50" />

      {/* ══ VOLUTA final de cierre ══ */}
      <path
        d="M 122 24 C 133 13 150 15 150 24 C 150 33 133 35 122 29"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* ══ COLA que conecta al texto ══ */}
      <path
        d="M 150 24 C 156 21 162 23 165 24"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* ── Masonry Grid (CSS columns — Pinterest-style) ── */
function MasonryGrid({
  images,
  accent,
}: {
  images: string[];
  accent: string;
}) {
  if (images.length === 0) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              aspectRatio: "4/3",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${accent}15 0%, ${accent}08 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbb",
              fontSize: "14px",
            }}
          >
            Imagen comunidad
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{`
        .masonry-comunidad {
          columns: 4;
          column-gap: 16px;
        }
        .masonry-comunidad-item {
          break-inside: avoid;
          margin-bottom: 16px;
          border-radius: 16px;
          overflow: hidden;
          display: inline-block;
          width: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .masonry-comunidad-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .masonry-comunidad-item img {
          width: 100%;
          height: auto;
          display: block;
        }
        @media (max-width: 1024px) {
          .masonry-comunidad {
            columns: 2;
          }
        }
        @media (max-width: 640px) {
          .masonry-comunidad {
            columns: 1;
          }
        }
      `}</style>
      <div className="masonry-comunidad">
        {images.map((url, i) => (
          <div key={i} className="masonry-comunidad-item">
            <img
              src={url}
              alt={`Comunidad PixelArt ${i + 1}`}
              loading={i > 3 ? "lazy" : undefined}
            />
          </div>
        ))}
      </div>
    </>
  );
}
