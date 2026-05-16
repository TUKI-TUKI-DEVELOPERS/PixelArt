"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import ProductGrid from "../catalog/ProductGrid";
import { getAssetUrl } from "@/lib/assetUrl";
import { useWindowSize } from "@/hooks/useWindowSize";
import { BLOG_POSTS } from "@/lib/blog-posts";

type Variant = {
  id: string;
  coverType: string;
  basePriceCents: number;
};

type Book = {
  id: string;
  name: string;
  productType: string;
  description: string | null;
  coverImageUrl: string | null;
  variants: Variant[];
};

type Category = {
  id: string;
  name: string;
  coverImageUrl: string | null;
  models: { id: string; name: string; templateCount: number }[];
};

type Props = {
  books: Book[];
  categories: Category[];
};

/* ── Mapeo categoría → nombres de libros ── */
const CATEGORY_BOOK_MAP: Record<string, string[]> = {
  "Libros de Amor": [
    "10 Razones por las que Te Amo",
    "Mi Amor",
    "1025 Días enamorándome de ti",
  ],
  "Libros de Mascotas": [
    "Nuestro Angel de 4 patas",
    "Aventura entre patas",
    "Mi amigo Miauravilloso",
    "Mi mejor amigo del mundo",
  ],
  "Libros de Familia": [
    "Papá, Mi Héroe",
    "Mamá, Mi Heroína",
    "Te amo, abuelo",
    "Te amo, abuela",
    "El Mejor Equipo",
    "Mi Familia",
  ],
  "Libros de Memorias Familiares": [
    "Gracias por tu amor",
    "Mi angel guardian",
    "Siempre en mi corazon",
    "Siempre seras parte de mi",
  ],
};

const BADGE_MAP: Record<string, string> = {
  "Libros de Amor": "LIBRO DE AMOR",
  "Libros de Mascotas": "LIBRO DE MASCOTAS",
  "Libros de Familia": "LIBRO DE FAMILIA",
  "Libros de Memorias Familiares": "MEMORIAS FAMILIARES",
};

function getCategoryBadge(bookName: string): string | undefined {
  for (const [category, names] of Object.entries(CATEGORY_BOOK_MAP)) {
    if (names.includes(bookName)) {
      return BADGE_MAP[category];
    }
  }
  return undefined;
}

/* ── Datos extra del Figma (taglines + reviews + descriptions) ── */
const BOOK_EXTRA: Record<string, { tagline: string; reviewCount: number; description: string }> = {
  "10 Razones por las que Te Amo": {
    tagline: "PORQUE EN LO SIMPLE VIVIMOS LO MAS GRANDE TÚ Y YO",
    reviewCount: 200,
    description: "Celebra el amor a través de escenarios cotidianos, divertidos y nostálgicos. Más de 21 escenarios para crear momentos mágicos únicos.",
  },
  "Nuestro Angel de 4 patas": {
    tagline: "SU HUELLA QUEDÓ PARA SIEMPRE EN TU CORAZÓN",
    reviewCount: 188,
    description: "Crea el tributo más hermoso a ese peludo que te recibe como si fueras una estrella y te ama sin condiciones.",
  },
  "Papá, Mi Héroe": {
    tagline: "PARA EL HOMBRE QUE ME ENSEÑO A SER VALIENTE",
    reviewCount: 185,
    description: "Un libro donde una hija celebra a su padre, reconociendo todo lo que lo hace especial. Cada página captura momentos únicos y enseñanzas.",
  },
  "1025 Días enamorándome de ti": {
    tagline: "EL MEJOR CONTEO ES EL DE NOSOTROS",
    reviewCount: 180,
    description: "Crea una historia de amor única eligiendo entre más de 21 escenarios. Momentos cotidianos y recuerdos inolvidables llenos de cariño.",
  },
  "Aventura entre patas": {
    tagline: "CELEBRA TUS AVENTURAS JUNTO A TU PELUDO AMIGO",
    reviewCount: 150,
    description: "Libro que celebra la diversión y amor incondicional entre la mascota de la familia y los niños del hogar. Aventuras y risas compartidas.",
  },
  "Mamá, Mi Heroína": {
    tagline: "EL REGALO QUE TU MAMÁ GUARDARÁ PARA SIEMPRE",
    reviewCount: 182,
    description: "El regalo perfecto para honrar a mamá. Cada página captura su amor, dedicación y los momentos especiales que construyeron quiénes somos.",
  },
  "Mi Amor": {
    tagline: "ERES MI INSPIRACIÓN INFINITA",
    reviewCount: 150,
    description: "Describe al ser amado de manera única con arquetipos creativos. Cada plantilla transforma al destinatario en un personaje poderoso y romántico.",
  },
  "Mi mejor amigo del mundo": {
    tagline: "ERES MI COMPAÑERO FIEL",
    reviewCount: 90,
    description: "Un libro personalizado que celebra el vínculo único entre una persona y su perro. Lealtad, compañía y amor incondicional en cada página.",
  },
  "Mi Familia": {
    tagline: "PORQUE ESTANDO JUNTOS TODO ES MEJOR",
    reviewCount: 170,
    description: "Un homenaje al núcleo familiar. Momentos compartidos, risas, abrazos y esos recuerdos que construyen quiénes somos.",
  },
  "Mi amigo Miauravilloso": {
    tagline: "PARA TU GUARDIAN MISTICO",
    reviewCount: 188,
    description: "El tributo perfecto a ese felino que te elige, ronronea en tu regazo y convierte tu casa en su reino.",
  },
  "Te amo, abuelo": {
    tagline: "ÉL TE CONTO HISTORIAS, AHORA TU DALE UN TESORO QUE RECORDAR",
    reviewCount: 185,
    description: "Honra el vínculo entre abuelos y nietos, capturando la sabiduría, ternura e historias compartidas de toda una vida.",
  },
  "El Mejor Equipo": {
    tagline: "PORQUE SER HERMANOS SE MERECE UN LIBRO PROPIO",
    reviewCount: 180,
    description: "Celebra el lazo especial entre hermanos. Complicidad, aventuras compartidas y esa amistad que dura toda la vida.",
  },
  "Te amo, abuela": {
    tagline: "PORQUE EL AMOR DE UNA ABUELA NUNCA SE OLVIDA",
    reviewCount: 90,
    description: "Para la mujer que nos mima, nos cuida y nos llena de amor incondicional. Un regalo que la hará llorar de emoción.",
  },
  "Gracias por tu amor": {
    tagline: "PORQUE SU AMOR VIVE PARA SIEMPRE EN TU CORAZÓN",
    reviewCount: 160,
    description: "Un libro homenaje para honrar a esa persona especial que dejó una huella imborrable. Cada página celebra los momentos únicos que compartieron juntos.",
  },
  "Mi angel guardian": {
    tagline: "SIEMPRE PRESENTE, SIEMPRE EN MI CORAZÓN",
    reviewCount: 145,
    description: "Un homenaje lleno de amor para esa persona que, aunque ya no está, sigue siendo tu ángel. Un recuerdo que preserva su presencia para siempre.",
  },
  "Siempre en mi corazon": {
    tagline: "PORQUE EL AMOR NO TIENE FIN",
    reviewCount: 138,
    description: "Un libro de memorias que preserva los recuerdos más preciados de quien amaste. Porque algunas personas dejan una marca eterna en el corazón.",
  },
  "Siempre seras parte de mi": {
    tagline: "UN LEGADO DE AMOR QUE PERDURA",
    reviewCount: 142,
    description: "Celebra la vida y el amor de esa persona que siempre será parte de ti. Cada página es un tributo a los momentos que los unieron para siempre.",
  },
};

/* ── FAQ data del Figma ── */
const FAQ_ITEMS = [
  {
    question: "¿Por qué un libro de PIXELART es un buen regalo?",
    answer:
      'Porque no se queda en "qué bonito": se queda en el corazón. PIXELART convierte tus fotos y tu historia en un libro que se abre como un recuerdo vivo. Es ese regalo que provoca sonrisa, silencio, "wow"… y después una conversación. No es un detalle más: es un momento que se vuelve para siempre.',
  },
  {
    question: "¿Cómo funciona el proceso?",
    answer:
      "Tú solo traes lo más importante: tus fotos, nombres y ese pedacito de historia que quieres regalar. Nosotros hacemos el resto. La IA integra tu contenido dentro de escenarios ya preparados para que cada página se sienta cuidada, coherente y hermosa. Sin editar, sin complicarte: solo elige, sube y prepárate para ver tu historia transformada.",
  },
  {
    question: "¿Cuál es la diferencia entre un photobook y un libro personalizado con IA?",
    answer:
      "Un photobook es perfecto si quieres un recuerdo clásico: tú eliges las fotos, decides el orden y acomodas todo en la interfaz a tu gusto. Un libro personalizado con IA, en cambio, va un paso más allá: tus fotos y datos se convierten en una experiencia narrativa dentro de escenarios creados por IA, con un estilo más \"cuento/aventura\" y un efecto sorpresa mucho mayor. Si quieres control total, photobook. Si quieres impacto emocional y magia, libro con IA.",
  },
  {
    question: "¿Para qué ocasión elegir cada tipo?",
    answer:
      'Depende del tipo de emoción que quieras regalar: Photobook: "Mira todo lo que vivimos" (recuerdo directo, simple y elegante). Libro con IA: "Esto lo hice para ti" (sorpresa, historia, sentimiento y un toque único). Muchos eligen photobook para guardar memorias del año y libro con IA para una fecha especial.',
  },
  {
    question: "¿Qué estilos hay disponibles?",
    answer:
      "Hay estilos para distintos sentimientos: románticos, familiares, divertidos, para niños, para celebrar logros o para regalar un recuerdo que abrace. Elige la categoría que encaje con tu historia y Pixelart se encarga de que el resultado se vea consistente, bonito y listo para imprimir.",
  },
];


/* ── Rutas de detalle por libro ── */
const BOOK_HREF: Record<string, string> = {
  "10 Razones por las que Te Amo": "/libros-personalizados/libros-de-amor/10-razones-por-las-que-te-amo",
  "Mi Amor": "/libros-personalizados/libros-de-amor/mi-amor",
  "1025 Días enamorándome de ti": "/libros-personalizados/libros-de-amor/1025-dias-enamorandome-de-ti",
  "Nuestro Angel de 4 patas": "/libros-personalizados/libros-de-mascotas/nuestro-angel-de-4-patas",
  "Aventura entre patas": "/libros-personalizados/libros-de-mascotas/aventura-entre-patas",
  "Mi amigo Miauravilloso": "/libros-personalizados/libros-de-mascotas/mi-amigo-miauravilloso",
  "Mi mejor amigo del mundo": "/libros-personalizados/libros-de-mascotas/mi-mejor-amigo-del-mundo",
  "Papá, Mi Héroe": "/libros-personalizados/libros-de-familia/papa-mi-heroe",
  "Mamá, Mi Heroína": "/libros-personalizados/libros-de-familia/mama-mi-heroina",
  "Te amo, abuelo": "/libros-personalizados/libros-de-familia/te-amo-abuelo",
  "Te amo, abuela": "/libros-personalizados/libros-de-familia/te-amo-abuela",
  "El Mejor Equipo": "/libros-personalizados/libros-de-familia/el-mejor-equipo",
  "Mi Familia": "/libros-personalizados/libros-de-familia/la-familia",
  "Gracias por tu amor": "/libros-personalizados/libros-de-memorias-familiares/gracias-por-tu-amor",
  "Mi angel guardian": "/libros-personalizados/libros-de-memorias-familiares/mi-angel-guardian",
  "Siempre en mi corazon": "/libros-personalizados/libros-de-memorias-familiares/siempre-en-mi-corazon",
  "Siempre seras parte de mi": "/libros-personalizados/libros-de-memorias-familiares/siempre-seras-parte-de-mi",
};

/* ── Miniaturas de MinIO ── */
const BOOK_THUMBNAIL: Record<string, string> = {
  "10 Razones por las que Te Amo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_10RazonesPorLasQueTeAmo_Miniatura.png",
  "Mi Amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_Miamor_Miniatura.png",
  "1025 Días enamorándome de ti": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Amor_xDiasEnamorandomeDeTi_Miniatura.png",
  "Papá, Mi Héroe": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_PapaMiHeroe_Miniatura.png",
  "Mamá, Mi Heroína": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MamamiHeroina_Miniatura.png",
  "Te amo, abuelo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuelo_Miniatura.png",
  "Te amo, abuela": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_TeAmoAbuela_Miniatura.png",
  "El Mejor Equipo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_ElMejorEquipo_Miniatura.png",
  "Mi Familia": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Familia_MiFamilia_Miniatura.png",
  "Nuestro Angel de 4 patas": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_NuestroAngelde4Patas_Miniatura.png",
  "Aventura entre patas": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_AventuraEntrePatas_Miniatura.png",
  "Mi mejor amigo del mundo": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_ElMejorAmigoDelMundo_Miniatura.png",
  "Mi amigo Miauravilloso": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_Mascotas_MiAmigoMiauravilloso_Miniatura.png",
  "Gracias por tu amor": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_GraciasPorTuAmor_Miniatura.png",
  "Mi angel guardian": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_MiAngelGuardian_Miniatura.png",
  "Siempre en mi corazon": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreEnMiCorazon_Miniatura.png",
  "Siempre seras parte de mi": "IA_Books/IaBooks_Miniaturas/IaBooks_Libros_MemoriaFamiliar_SiempreSerasParteDeMiCorazon_Miniatura.png",
};

/* ── Orden de libros según Figma ── */
const BOOK_ORDER = [
  "10 Razones por las que Te Amo",
  "Nuestro Angel de 4 patas",
  "Papá, Mi Héroe",
  "1025 Días enamorándome de ti",
  "Aventura entre patas",
  "Mamá, Mi Heroína",
  "Mi Amor",
  "Mi mejor amigo del mundo",
  "Mi Familia",
  "Mi amigo Miauravilloso",
  "Te amo, abuelo",
  "El Mejor Equipo",
  "Te amo, abuela",
  "Gracias por tu amor",
  "Mi angel guardian",
  "Siempre en mi corazon",
  "Siempre seras parte de mi",
];

const CARDS_PER_PAGE = 6;
const PAGE_SIZE      = 3;

/* ── Componente FAQ Accordion ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const { isMobile } = useWindowSize();
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        borderLeft: open ? "3px solid #e8453c" : "3px solid transparent",
        paddingLeft: open ? "16px" : "0",
        background: open ? "rgba(255,255,255,0.05)" : "transparent",
        borderRadius: open ? "0 8px 8px 0" : "0",
        transition: "background 0.3s ease, border-color 0.3s ease, padding 0.3s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontSize: isMobile ? "15px" : "17px",
            fontWeight: open ? 600 : 500,
            color: open ? "#fff" : "rgba(255,255,255,0.75)",
            transition: "color 0.2s ease",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <div
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: open ? "#e8453c" : "transparent",
            transition: "background 0.25s ease, border-color 0.25s ease",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#fff" : "rgba(255,255,255,0.70)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Animación de altura con max-height */}
      <div
        style={{
          maxHeight: open ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            padding: "0 48px 24px 0",
            fontSize: isMobile ? "14px" : "15px",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.60)",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════ */
type FilterKey = 'todos' | 'amor' | 'familia' | 'mascotas' | 'memorias';

const FILTER_KEYS: FilterKey[] = ['todos', 'amor', 'familia', 'mascotas', 'memorias'];

const FILTER_BADGE: Record<Exclude<FilterKey, 'todos'>, string> = {
  amor:     'LIBRO DE AMOR',
  familia:  'LIBRO DE FAMILIA',
  mascotas: 'LIBRO DE MASCOTAS',
  memorias: 'MEMORIAS FAMILIARES',
};

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type ActivePromo = { targetType: string; targetId: number | null; targetIds: number[]; discountType: string; discountValue: number };

export default function NuestrosLibrosClient({ books }: Props) {
  const { isMobile, isTablet } = useWindowSize();
  const [visibleCount, setVisibleCount]   = useState(CARDS_PER_PAGE);
  const [activeFilter, setActiveFilter]   = useState<FilterKey>('todos');
  const [filterOpen, setFilterOpen]       = useState(false);
  const [lightboxSrc, setLightboxSrc]     = useState<string | null>(null);
  const [pillStyle, setPillStyle]         = useState({ left: 6, width: 0 });
  const [promos, setPromos]               = useState<ActivePromo[]>([]);
  const filterContainerRef                = useRef<HTMLDivElement>(null);
  const filterBtnRefs                     = useRef<(HTMLButtonElement | null)[]>([]);
  const gridWrapperRef                    = useRef<HTMLDivElement>(null);
  const prevVisibleRef                    = useRef(0);
  const removingFromRef                   = useRef(Infinity);
  const scrollIntentRef                   = useRef<'more' | 'less' | null>(null);

  useEffect(() => {
    fetch(`${API}/api/promotions/active`)
      .then((r) => r.ok ? r.json() : [])
      .then(setPromos)
      .catch(() => {});
  }, []);

  /* Pill deslizante */
  useEffect(() => {
    const idx = FILTER_KEYS.indexOf(activeFilter);
    const btn = filterBtnRefs.current[idx];
    const container = filterContainerRef.current;
    if (!btn || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setPillStyle({ left: bRect.left - cRect.left, width: bRect.width });
  }, [activeFilter]);

  /* Cerrar lightbox con ESC */
  useEffect(() => {
    if (!lightboxSrc) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightboxSrc]);

  /* Scroll automático tras Ver más / Ver menos */
  useEffect(() => {
    const intent = scrollIntentRef.current;
    if (!intent || !gridWrapperRef.current) return;
    scrollIntentRef.current = null;

    requestAnimationFrame(() => {
      const grid = gridWrapperRef.current?.firstElementChild;
      if (!grid) return;
      const cards = Array.from(grid.children) as HTMLElement[];

      if (intent === 'more') {
        cards[prevVisibleRef.current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        cards[removingFromRef.current - 1]?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }, [visibleCount]);

  const sortedBooks = useMemo(() => {
    const customBooks = books.filter((b) => b.productType === "CUSTOM_BOOK");
    const ordered: typeof customBooks = [];
    for (const name of BOOK_ORDER) {
      const found = customBooks.find((b) => b.name === name);
      if (found) ordered.push(found);
    }
    // Agregar cualquiera que no esté en el orden definido
    for (const b of customBooks) {
      if (!ordered.includes(b)) ordered.push(b);
    }
    return ordered
      .filter((b) => !!BOOK_THUMBNAIL[b.name])
      .map((b) => ({
        ...b,
        coverImageUrl: getAssetUrl(BOOK_THUMBNAIL[b.name]),
        categoryBadge: getCategoryBadge(b.name),
        tagline: BOOK_EXTRA[b.name]?.tagline,
        reviewCount: BOOK_EXTRA[b.name]?.reviewCount ?? 0,
        description: BOOK_EXTRA[b.name]?.description ?? null,
        href: BOOK_HREF[b.name],
      }));
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (activeFilter === 'todos') return sortedBooks;
    return sortedBooks.filter(b => b.categoryBadge === FILTER_BADGE[activeFilter]);
  }, [sortedBooks, activeFilter]);

  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const hasMore      = visibleCount < filteredBooks.length;

  function handleFilterChange(filter: FilterKey) {
    prevVisibleRef.current  = 0;
    removingFromRef.current = Infinity;
    setActiveFilter(filter);
    setVisibleCount(CARDS_PER_PAGE);
  }

  function handleVerMas() {
    prevVisibleRef.current  = visibleCount;
    removingFromRef.current = Infinity;
    scrollIntentRef.current = 'more';
    setVisibleCount(v => v + PAGE_SIZE);
  }

  function handleVerMenos() {
    const next = Math.max(CARDS_PER_PAGE, visibleCount - PAGE_SIZE);
    prevVisibleRef.current  = 0;
    removingFromRef.current = next;
    scrollIntentRef.current = 'less';
    setVisibleCount(next);
  }

  return (
    <div>
      {/* ═══ SECCIÓN 1: HERO ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: isMobile ? "420px" : "560px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: isMobile ? "64px 24px" : isTablet ? "80px 40px" : "96px 40px",
          overflow: "hidden",
          borderRadius: "0 0 48px 48px",
        }}
      >
        {/* Imagen de fondo */}
        <img
          src={getAssetUrl("IA_Books/Backgrounds/Background_IA_Books_HomeSection_Page.png")}
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

        {/* Overlay gradiente — preserva imagen arriba, oscurece abajo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
            zIndex: 1,
          }}
        />

        {/* Contenido */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? "16px" : "20px",
            maxWidth: "680px",
          }}
        >
          {/* Eyebrow pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="rgba(255,255,255,0.9)" />
            </svg>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Con Inteligencia Artificial
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              margin: 0,
              fontSize: isMobile ? "36px" : isTablet ? "48px" : "64px",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-1px",
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            Libros
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #6bb3e0, #4f97cf, #2d8fd5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Personalizados
            </span>
          </h1>

          {/* Línea decorativa */}
          <div
            aria-hidden="true"
            style={{
              width: "64px",
              height: "3px",
              borderRadius: "9999px",
              background: "linear-gradient(90deg, #6bb3e0, #2d8fd5)",
            }}
          />

          {/* Descripción */}
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "15px" : "18px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.6,
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              maxWidth: "520px",
            }}
          >
            Convertimos tus fotos en una historia única. Diseñados con IA, impresos con calidad premium.
          </p>

          {/* Social proof */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "12px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span
              style={{
                fontSize: isMobile ? "13px" : "14px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              +1,500 libros entregados
            </span>
          </div>

          {/* CTA */}
          <a
            href="#libros"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("libros")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "4px",
              padding: isMobile ? "14px 28px" : "16px 36px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #6bb3e0, #2d8fd5)",
              color: "#fff",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(45,143,213,0.45)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(45,143,213,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(45,143,213,0.45)";
            }}
          >
            Explorar libros
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 2: INTRODUCCIÓN ═══ */}
      <section
        style={{
          background: "#faf8f6",
          padding: isMobile ? "56px 24px" : isTablet ? "64px 40px" : "80px 48px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* ── Header centrado ── */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "48px" : "64px" }}>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#B72020",
              }}
            >
              Para cada momento especial
            </p>
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: isMobile ? "26px" : isTablet ? "32px" : "40px",
                fontWeight: 900,
                color: "#1a1a1a",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
              }}
            >
              Hecho para ti,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #B72020, #e8453c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                entregado con amor
              </span>
            </h2>
            <div
              aria-hidden="true"
              style={{
                width: "48px",
                height: "3px",
                borderRadius: "9999px",
                background: "linear-gradient(90deg, #B72020, #e8453c)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* ── 3 pilares ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "32px" : "40px",
              marginBottom: isMobile ? "48px" : "64px",
            }}
          >
            {/* Pilar 1 — Tus fotos */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(183,32,32,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B72020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                  <path d="M9 15h4" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                  }}
                >
                  Tus fotos, tu historia
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#666",
                    fontWeight: 400,
                  }}
                >
                  Subes tus imágenes y nosotros las integramos en escenas únicas diseñadas para cada libro.
                </p>
              </div>
            </div>

            {/* Pilar 2 — Diseñado con IA */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(183,32,32,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B72020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                  }}
                >
                  Diseñado con IA
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#666",
                    fontWeight: 400,
                  }}
                >
                  La inteligencia artificial genera escenas narrativas únicas que hacen de cada página un momento irrepetible.
                </p>
              </div>
            </div>

            {/* Pilar 3 — Calidad premium */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(183,32,32,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B72020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                  }}
                >
                  Calidad premium
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#666",
                    fontWeight: 400,
                  }}
                >
                  Impresión profesional en papel 200g, tapa dura y acabado que se siente desde la primera página.
                </p>
              </div>
            </div>
          </div>

          {/* ── Divisor ── */}
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(183,32,32,0.2), transparent)",
              marginBottom: isMobile ? "32px" : "40px",
            }}
          />

          {/* ── Ocasiones ── */}
          <p
            style={{
              textAlign: "center",
              margin: "0 0 20px 0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#999",
            }}
          >
            Perfecto para
          </p>
          <p
            style={{
              textAlign: "center",
              margin: 0,
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 500,
              color: "#555",
              lineHeight: 2,
              letterSpacing: "0.01em",
            }}
          >
            San Valentín{" "}
            <span aria-hidden="true" style={{ color: "#ccc", margin: "0 8px" }}>·</span>
            Cumpleaños{" "}
            <span aria-hidden="true" style={{ color: "#ccc", margin: "0 8px" }}>·</span>
            Aniversario{" "}
            <span aria-hidden="true" style={{ color: "#ccc", margin: "0 8px" }}>·</span>
            Día del Padre{" "}
            <span aria-hidden="true" style={{ color: "#ccc", margin: "0 8px" }}>·</span>
            Día de la Madre{" "}
            <span aria-hidden="true" style={{ color: "#ccc", margin: "0 8px" }}>·</span>
            Navidad{" "}
            <span aria-hidden="true" style={{ color: "#ccc", margin: "0 8px" }}>·</span>
            <span style={{ color: "#B72020", fontWeight: 600 }}>cualquier día del año</span>
          </p>
        </div>
      </section>

      {/* ═══ SECCIÓN 3: GRID DE LIBROS ═══ */}
      <section id="libros" style={{ position: "relative" }}>

        {/* ── Bloque título — full bleed con gradiente ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(180deg, rgba(183,32,32,0.10) 0%, rgba(183,32,32,0.04) 60%, transparent 100%)",
            padding: isMobile ? "56px 24px 10px" : isTablet ? "64px 40px 10px" : "80px 48px 12px",
            textAlign: "center",
          }}
        >
          {/* Watermark PIXELART */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: isMobile ? "80px" : isTablet ? "120px" : "160px",
              fontWeight: 900,
              lineHeight: 1,
              color: "#B72020",
              opacity: 0.045,
              letterSpacing: isMobile ? "6px" : "12px",
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            PIXELART
          </span>

          {/* Contenido sobre el watermark */}
          <div style={{ position: "relative", zIndex: 1 }}>

            {/* Eyebrow */}
            <p
              style={{
                margin: "0 0 20px 0",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#B72020",
              }}
            >
              Nuestra colección
            </p>

            {/* Título editorial */}
            <h2
              style={{
                margin: "0 0 20px 0",
                lineHeight: 1.0,
                letterSpacing: isMobile ? "-1px" : "-2px",
                fontWeight: 900,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "48px" : isTablet ? "72px" : "96px",
                  color: "#1a1a1a",
                }}
              >
                El libro
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: isMobile ? "48px" : isTablet ? "72px" : "96px",
                  background: "linear-gradient(135deg, #B72020 0%, #e8453c 50%, #c0392b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                perfecto para ti.
              </span>
            </h2>

            {/* Subtítulo */}
            <p
              style={{
                margin: "0 0 36px 0",
                fontSize: isMobile ? "15px" : "17px",
                color: "#666",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
              Cada libro se personaliza con tus fotos, nombres e historia.
            </p>

            {/* ── Filtros ── */}
            {(() => {
              const FILTERS: { key: FilterKey; label: string; icon: React.ReactNode }[] = [
                {
                  key: "todos",
                  label: "Todos",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  ),
                },
                {
                  key: "amor",
                  label: "Amor",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  ),
                },
                {
                  key: "familia",
                  label: "Familia",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                },
                {
                  key: "mascotas",
                  label: "Mascotas",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/>
                      <circle cx="6" cy="11.5" r="1.75"/><circle cx="18" cy="11.5" r="1.75"/>
                      <path d="M7.5 15c-1.8 0-3.5 1.5-3.5 3.5C4 20.5 6 22 12 22s8-1.5 8-3.5C20 16.5 18.3 15 16.5 15c-1.5 0-2.5.8-4.5.8S9 15 7.5 15z"/>
                    </svg>
                  ),
                },
                {
                  key: "memorias",
                  label: "Memorias",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
                      <path d="m18 15-2-2"/><path d="m15 18-2-2"/>
                    </svg>
                  ),
                },
              ];

              const activeLabel = FILTERS.find(f => f.key === activeFilter)?.label ?? "Todos";
              const activeIcon  = FILTERS.find(f => f.key === activeFilter)?.icon;

              if (isMobile) {
                /* ── Mobile: dropdown tipo acordeón ── */
                return (
                  <div style={{ width: "100%", maxWidth: "320px", margin: "0 auto", position: "relative" }}>
                    {/* Trigger */}
                    <button
                      type="button"
                      onClick={() => setFilterOpen(o => !o)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 18px",
                        borderRadius: filterOpen ? "16px 16px 0 0" : "9999px",
                        border: "1px solid rgba(183,32,32,0.18)",
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 2px 16px rgba(183,32,32,0.10)",
                        cursor: "pointer",
                        transition: "border-radius 0.2s ease",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "#B72020" }}>
                        {activeIcon}
                        {activeLabel}
                      </span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B72020" strokeWidth="2.5" strokeLinecap="round"
                        style={{ transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>

                    {/* Panel desplegable */}
                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: filterOpen ? "300px" : "0",
                        transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderRadius: "0 0 16px 16px",
                        borderTop: "none",
                        borderRight: filterOpen ? "1px solid rgba(183,32,32,0.18)" : "none",
                        borderBottom: filterOpen ? "1px solid rgba(183,32,32,0.18)" : "none",
                        borderLeft: filterOpen ? "1px solid rgba(183,32,32,0.18)" : "none",
                        background: "rgba(255,255,255,0.95)",
                        boxShadow: filterOpen ? "0 8px 24px rgba(183,32,32,0.10)" : "none",
                      }}
                    >
                      {FILTERS.map(({ key, label, icon }) => {
                        const isActive = activeFilter === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => { handleFilterChange(key); setFilterOpen(false); }}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "13px 18px",
                              border: "none",
                              borderBottom: "1px solid rgba(183,32,32,0.07)",
                              background: isActive ? "rgba(183,32,32,0.06)" : "transparent",
                              color: isActive ? "#B72020" : "#555",
                              fontSize: "14px",
                              fontWeight: isActive ? 700 : 400,
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            {icon}
                            {label}
                            {isActive && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B72020" strokeWidth="2.5" strokeLinecap="round" style={{ marginLeft: "auto" }}>
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              /* ── Desktop: pill deslizante ── */
              return (
                <div
                  ref={filterContainerRef}
                  role="group"
                  aria-label="Filtrar por categoría"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "5px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 2px 20px rgba(183,32,32,0.12), 0 1px 4px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(183,32,32,0.10)",
                  }}
                >
                  {pillStyle.width > 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: `${pillStyle.left}px`,
                        width: `${pillStyle.width}px`,
                        height: "calc(100% - 10px)",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #B72020, #e8453c)",
                        boxShadow: "0 2px 12px rgba(183,32,32,0.40)",
                        transition: "left 0.28s cubic-bezier(0.4, 0, 0.2, 1), width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                        pointerEvents: "none",
                        zIndex: 0,
                      }}
                    />
                  )}
                  {FILTERS.map(({ key, label, icon }, idx) => {
                    const isActive = activeFilter === key;
                    return (
                      <button
                        key={key}
                        ref={(el) => { filterBtnRefs.current[idx] = el; }}
                        type="button"
                        onClick={() => handleFilterChange(key)}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "7px",
                          padding: "10px 20px",
                          borderRadius: "9999px",
                          border: "none",
                          background: "transparent",
                          color: isActive ? "#fff" : "#888",
                          fontSize: "14px",
                          fontWeight: isActive ? 700 : 500,
                          letterSpacing: "0.01em",
                          cursor: "pointer",
                          transition: "color 0.2s ease",
                          outline: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {icon}
                        {label}
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>

        {/* ── Grid — sin padding top extra, las cards flotan sobre el gradiente ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "0 20px 64px" : isTablet ? "0 32px 80px" : "0 40px 96px",
          }}
        >
          <div ref={gridWrapperRef}>
            <ProductGrid key={activeFilter} books={visibleBooks} promos={promos} />
          </div>

          {/* Ver más / Ver menos */}
          {(hasMore || visibleCount > CARDS_PER_PAGE) && (
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "56px", flexWrap: "wrap" }}>

              {hasMore && (
                <button
                  onClick={handleVerMas}
                  style={{
                    minWidth: isMobile ? "100%" : "180px",
                    height: "52px",
                    borderRadius: "9999px",
                    border: "2px solid #B72020",
                    background: "transparent",
                    color: "#B72020",
                    fontSize: isMobile ? "14px" : "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#B72020";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#B72020";
                  }}
                >
                  Ver más
                  <span aria-hidden="true">↓</span>
                </button>
              )}

              {visibleCount > CARDS_PER_PAGE && (
                <button
                  onClick={handleVerMenos}
                  style={{
                    minWidth: isMobile ? "100%" : "180px",
                    height: "52px",
                    borderRadius: "9999px",
                    border: `2px solid #e0e0e0`,
                    background: "transparent",
                    color: "#999",
                    fontSize: isMobile ? "14px" : "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#B72020";
                    e.currentTarget.style.color = "#B72020";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.color = "#999";
                  }}
                >
                  <span aria-hidden="true">↑</span>
                  Ver menos
                </button>
              )}

            </div>
          )}
        </div>

        {/* Onda de transición hacia la sección oscura */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            lineHeight: 0,
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 1440 72"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "72px", display: "block" }}
          >
            <path d="M0,72 C360,0 1080,72 1440,16 L1440,72 Z" fill="#1c1917" />
          </svg>
        </div>
      </section>

      {/* ═══ SECCIÓN 4: FAQ ═══ */}
      <section
        style={{
          position: "relative",
          background: "#1c1917",
          overflow: "hidden",
        }}
      >
        {/* Grano de textura sutil */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.25,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            pointerEvents: "none",
          }}
        />

        {/* Glow ambiental rojo — esquina superior derecha */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(183,32,32,0.14) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Contenido centrado */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "720px",
            margin: "0 auto",
            padding: isMobile
              ? "64px 24px 64px"
              : isTablet
              ? "80px 40px 80px"
              : "88px 0 96px",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              margin: "0 0 16px 0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#e8453c",
              textAlign: "center",
            }}
          >
            Tus preguntas, respondidas
          </p>

          {/* Título unificado */}
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: isMobile ? "28px" : isTablet ? "36px" : "44px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
              textAlign: "center",
            }}
          >
            ¿Por qué escoger{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e8453c, #B72020)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PIXELART
            </span>{" "}
            como regalo?
          </h2>

          {/* Línea decorativa */}
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "3px",
              borderRadius: "9999px",
              background: "linear-gradient(90deg, #e8453c, #B72020)",
              margin: "0 auto 56px",
            }}
          />

          {/* Accordion */}
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 5: BLOG ═══ */}
      <section
        style={{
          position: "relative",
          background: "#ffffff",
          overflow: "hidden",
          padding: isMobile ? "64px 20px 72px" : isTablet ? "72px 32px 80px" : "80px 40px 96px",
        }}
      >
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "56px" }}>
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#e8453c",
              }}
            >
              Historias reales
            </p>
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: isMobile ? "28px" : isTablet ? "36px" : "44px",
                fontWeight: 900, color: "#1a1a1a",
                lineHeight: 1.1, letterSpacing: "-0.5px",
              }}
            >
              Blog{" "}
              <span style={{ background: "linear-gradient(135deg, #e8453c, #B72020)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                PIXELART
              </span>
            </h2>
            <div aria-hidden="true" style={{ width: "48px", height: "3px", borderRadius: "9999px", background: "linear-gradient(90deg, #e8453c, #B72020)", margin: "0 auto 16px" }} />
            <p style={{ margin: 0, fontSize: isMobile ? "14px" : "16px", color: "#666", fontWeight: 400, maxWidth: "460px", marginInline: "auto", lineHeight: 1.6 }}>
              Momentos que se volvieron para siempre. Historias de personas reales con sus libros PIXELART.
            </p>
          </div>

          {/* Cards de blog */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "24px" : "28px",
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    background: "#fafafa",
                    border: "1px solid #ebebeb",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(183,32,32,0.30)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(183,32,32,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ebebeb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Imagen */}
                  <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                    <img
                      src={getAssetUrl(post.image)}
                      alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.45s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                    />
                  </div>

                  {/* Contenido */}
                  <div style={{ padding: "20px" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8453c" }}>
                      {post.eyebrow}
                    </p>
                    <h3 style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    <p style={{ margin: "0 0 16px 0", fontSize: "13px", lineHeight: 1.65, color: "#666", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.teaser}
                    </p>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#e8453c" }}>
                      Leer historia →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 6: COMUNIDAD ═══ */}
      <section
        style={{
          position: "relative",
          background: "#faf8f6",
          overflow: "hidden",
        }}
      >
        {/* Grain sutil */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2020/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "256px 256px", pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "64px 20px 64px" : isTablet ? "72px 32px 80px" : "80px 40px 96px",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "56px" }}>
            <p style={{ margin: "0 0 12px 0", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B72020" }}>
              Nuestra comunidad
            </p>
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: isMobile ? "28px" : isTablet ? "36px" : "44px",
                fontWeight: 900,
                color: "#1a1a1a",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
              }}
            >
              Historias que{" "}
              <span style={{ background: "linear-gradient(135deg, #B72020, #e8453c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                inspiran
              </span>
            </h2>
            <div aria-hidden="true" style={{ width: "48px", height: "3px", borderRadius: "9999px", background: "linear-gradient(90deg, #B72020, #e8453c)", margin: "0 auto 16px" }} />
            <p style={{ margin: 0, fontSize: isMobile ? "14px" : "16px", color: "#666", fontWeight: 400, maxWidth: "460px", marginInline: "auto", lineHeight: 1.6 }}>
              Personas reales, momentos únicos. Esto es lo que crean con sus libros PIXELART.
            </p>
          </div>

          {/* ── Collage asimétrico editorial ── */}
          {(() => {
            const IMAGES = [
              "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1_Amor_Comunidad_1.png",
              "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_2.png",
              "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_3.png",
              "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_4.png",
              "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_6.png",
              "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_7.png",
            ];

            const hoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
              const img = e.currentTarget.querySelector<HTMLElement>("img");
              if (img) img.style.transform = "scale(1.06)";
            };
            const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
              const img = e.currentTarget.querySelector<HTMLElement>("img");
              if (img) img.style.transform = "scale(1)";
            };
            const openLightbox = (src: string) => setLightboxSrc(src);

            const cellStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
              position: "relative", overflow: "hidden", cursor: "pointer", ...extra,
            });
            const imgStyle: React.CSSProperties = {
              width: "100%", height: "100%", objectFit: "cover",
              display: "block", transition: "transform 0.45s ease",
            };

            if (isMobile) {
              return (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "160px 160px 160px", gap: "3px", borderRadius: "20px", overflow: "hidden" }}>
                  {IMAGES.map((key, i) => (
                    <div key={i} style={cellStyle()} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(key))}>
                      <img src={getAssetUrl(key)} alt={`Comunidad PixelArt ${i + 1}`} loading={i > 1 ? "lazy" : undefined} style={imgStyle} />
                    </div>
                  ))}
                </div>
              );
            }

            if (isTablet) {
              return (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "220px 220px", gap: "4px", borderRadius: "20px", overflow: "hidden" }}>
                  {IMAGES.map((key, i) => (
                    <div key={i} style={cellStyle()} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(key))}>
                      <img src={getAssetUrl(key)} alt={`Comunidad PixelArt ${i + 1}`} loading={i > 2 ? "lazy" : undefined} style={imgStyle} />
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.6fr 1fr 1fr",
                  gridTemplateRows: "280px 280px 200px",
                  gap: "4px",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div style={cellStyle({ gridColumn: "1", gridRow: "1 / 3" })} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(IMAGES[0]))}>
                  <img src={getAssetUrl(IMAGES[0])} alt="Comunidad PixelArt 1" style={imgStyle} />
                </div>
                <div style={cellStyle({ gridColumn: "2", gridRow: "1" })} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(IMAGES[1]))}>
                  <img src={getAssetUrl(IMAGES[1])} alt="Comunidad PixelArt 2" style={imgStyle} />
                </div>
                <div style={cellStyle({ gridColumn: "3", gridRow: "1" })} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(IMAGES[2]))}>
                  <img src={getAssetUrl(IMAGES[2])} alt="Comunidad PixelArt 3" style={imgStyle} />
                </div>
                <div style={cellStyle({ gridColumn: "2", gridRow: "2" })} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(IMAGES[3]))}>
                  <img src={getAssetUrl(IMAGES[3])} alt="Comunidad PixelArt 4" loading="lazy" style={imgStyle} />
                </div>
                <div style={cellStyle({ gridColumn: "3", gridRow: "2" })} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(IMAGES[4]))}>
                  <img src={getAssetUrl(IMAGES[4])} alt="Comunidad PixelArt 5" loading="lazy" style={imgStyle} />
                </div>
                <div style={cellStyle({ gridColumn: "1 / 4", gridRow: "3" })} onMouseEnter={hoverIn} onMouseLeave={hoverOut} onClick={() => openLightbox(getAssetUrl(IMAGES[5]))}>
                  <img src={getAssetUrl(IMAGES[5])} alt="Comunidad PixelArt 6" loading="lazy" style={imgStyle} />
                </div>
              </div>
            );
          })()}

          {/* CTA Instagram */}
          <div style={{ textAlign: "center", marginTop: isMobile ? "40px" : "56px" }}>
            <p style={{ margin: "0 0 16px 0", fontSize: isMobile ? "14px" : "16px", color: "#555", fontWeight: 400 }}>
              ¿Tienes un libro PIXELART? Etiquétanos y aparece aquí.
            </p>
            <a
              href="https://instagram.com/pixelart.pe"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "12px 28px", borderRadius: "9999px",
                border: "2px solid #B72020", background: "transparent",
                color: "#B72020", fontSize: "14px", fontWeight: 700,
                textDecoration: "none", letterSpacing: "0.02em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B72020";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#B72020";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              @pixelart.pe
            </a>
          </div>
        </div>
      </section>


      {/* ── Lightbox ── */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeInLightbox 0.2s ease",
          }}
        >
          <style>{`
            @keyframes fadeInLightbox {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes scaleInLightbox {
              from { transform: scale(0.92); }
              to   { transform: scale(1); }
            }
          `}</style>

          <button
            onClick={() => setLightboxSrc(null)}
            aria-label="Cerrar imagen"
            style={{
              position: "absolute",
              top: "20px", right: "20px",
              width: "40px", height: "40px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.10)",
              color: "#fff", fontSize: "20px",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ×
          </button>

          <img
            src={lightboxSrc}
            alt="Imagen ampliada"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              animation: "scaleInLightbox 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      )}
    </div>
  );
}
