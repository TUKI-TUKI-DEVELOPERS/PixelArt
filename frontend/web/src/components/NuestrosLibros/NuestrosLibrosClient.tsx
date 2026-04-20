"use client";

import { useState, useMemo } from "react";
import ProductGrid from "../catalog/ProductGrid";
import { getAssetUrl } from "@/lib/assetUrl";

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
    "Recuerdos Familiares",
  ],
};

const BADGE_MAP: Record<string, string> = {
  "Libros de Amor": "LIBRO DE AMOR",
  "Libros de Mascotas": "LIBRO DE MASCOTAS",
  "Libros de Familia": "LIBRO DE FAMILIA",
  "Libros de Memorias Familiares": "LIBRO DE FAMILIA",
};

function getCategoryBadge(bookName: string): string | undefined {
  for (const [category, names] of Object.entries(CATEGORY_BOOK_MAP)) {
    if (names.includes(bookName)) {
      return BADGE_MAP[category];
    }
  }
  return undefined;
}

/* ── Datos extra del Figma (taglines + reviews) ── */
const BOOK_EXTRA: Record<string, { tagline: string; reviewCount: number }> = {
  "10 Razones por las que Te Amo": {
    tagline: "PORQUE EN LO SIMPLE VIVIMOS LO MAS GRANDE TÚ Y YO",
    reviewCount: 200,
  },
  "Nuestro Angel de 4 patas": {
    tagline: "SU HUELLA QUEDÓ PARA SIEMPRE EN TU CORAZÓN",
    reviewCount: 188,
  },
  "Papá, Mi Héroe": {
    tagline: "PARA EL HOMBRE QUE ME ENSEÑO A SER VALIENTE",
    reviewCount: 185,
  },
  "1025 Días enamorándome de ti": {
    tagline: "EL MEJOR CONTEO ES EL DE NOSOTROS",
    reviewCount: 180,
  },
  "Aventura entre patas": {
    tagline: "CELEBRA TUS AVENTURAS JUNTO A TU PELUDO AMIGO",
    reviewCount: 150,
  },
  "Mamá, Mi Heroína": {
    tagline: "EL REGALO QUE TU MAMÁ GUARDARÁ PARA SIEMPRE",
    reviewCount: 182,
  },
  "Mi Amor": {
    tagline: "ERES MI INSPIRACIÓN INFINITA",
    reviewCount: 150,
  },
  "Mi mejor amigo del mundo": {
    tagline: "ERES MI COMPAÑERO FIEL",
    reviewCount: 90,
  },
  "Mi Familia": {
    tagline: "PORQUE ESTANDO JUNTOS TODO ES MEJOR",
    reviewCount: 170,
  },
  "Mi amigo Miauravilloso": {
    tagline: "PARA TU GUARDIAN MISTICO",
    reviewCount: 188,
  },
  "Te amo, abuelo": {
    tagline: "ÉL TE CONTO HISTORIAS, AHORA TU DALE UN TESORO QUE RECORDAR",
    reviewCount: 185,
  },
  "El Mejor Equipo": {
    tagline: "PORQUE SER HERMANOS SE MERECE UN LIBRO PROPIO",
    reviewCount: 180,
  },
  "Te amo, abuela": {
    tagline: "PORQUE EL AMOR DE UNA ABUELA NUNCA SE OLVIDA",
    reviewCount: 90,
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

/* ── Testimonios del Figma ── */
const TESTIMONIALS = [
  {
    title: "Libro Personalizado para mi héroe",
    story:
      'Alondra se acercó en puntitas con el libro entre las manos, como si cargara un tesoro. "Es para ti, papá". Javier lo tomó despacio, leyó el título y se quedó en silencio un segundo. Sonrió sin poder evitarlo; los ojos se le humedecieron. La abrazó fuerte, con el libro pegado al pecho, como si acabara de recibir algo que no sabía que le faltaba.',
  },
  {
    title: "Un recuerdo de mi mejor amigo",
    story:
      'En cuanto abrieron el libro, los dos se juntaron más, hombro con hombro. "Mira… es Rocky", dijo uno, señalando una escena donde parecía estar corriendo con ellos otra vez. Se rieron bajito, y luego se quedaron mirando con esa mezcla de nostalgia y calma. "Aquí está con nosotros", susurró la niña, apretando la página con cuidado, como si pudiera sentir sus patitas en cada recuerdo.',
  },
  {
    title: "Un recuerdo de mi mejor amigo",
    story:
      'La cena iba tranquila hasta que él sacó el libro, nervioso y sonriendo. Ella lo abrió y empezó a pasar páginas: recuerdos, momentos, pequeñas "razones" que la hicieron reír y luego respirar hondo. Cuando levantó la mirada, él ya estaba de rodillas. Ella se llevó la mano al pecho, incrédula, con lágrimas bonitas. No hizo falta decir mucho: se abrazaron, y el libro quedó entre los dos como la prueba de una historia que recién empezaba.',
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
  "Recuerdos Familiares": "/libros-personalizados/libros-de-memorias-familiares/recuerdos-familiares",
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
];

const CARDS_PER_PAGE = 6;

/* ── Componente FAQ Accordion ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #ddd",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#222",
          }}
        >
          {question}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          strokeLinecap="round"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            flexShrink: 0,
            marginLeft: "16px",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            padding: "0 0 20px 0",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#555",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════ */
export default function NuestrosLibrosClient({ books }: Props) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

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
        href: BOOK_HREF[b.name],
      }));
  }, [books]);

  const visibleBooks = sortedBooks.slice(0, visibleCount);
  const hasMore = visibleCount < sortedBooks.length;

  return (
    <div>
      {/* ═══ SECCIÓN 1: HERO ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 40px",
          marginBottom: "0",
          overflow: "hidden",
          borderRadius: "0 0 40px 40px",
        }}
      >
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.35)",
            zIndex: 0,
          }}
        />
        <h1
          style={{
            position: "relative",
            zIndex: 1,
            margin: "0 0 16px 0",
            fontSize: "72px",
            fontWeight: 800,
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.1,
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Libros Personalizados
        </h1>
        <p
          style={{
            position: "relative",
            zIndex: 1,
            margin: 0,
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Elige un momento especial
        </p>
      </section>

      {/* ═══ SECCIÓN 2: INTRODUCCIÓN ═══ */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "56px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#444",
            fontWeight: 400,
            marginBottom: "20px",
          }}
        >
          Descubre nuestra selección de Libros personalizados y Photobooks más
          vendidos en Pixelart: con ellos crea o recrea tus momentos especiales.
        </p>
        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#444",
            fontWeight: 400,
            marginBottom: "20px",
          }}
        >
          Son los favoritos por muchas razones… desde historias emotivas para
          compartir en familia, hasta &ldquo;razones por las que te amo&rdquo; y
          aventuras únicas con tu mascota, todo creado con tus fotos.
        </p>
        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#444",
            fontWeight: 400,
            marginBottom: "0",
          }}
        >
          Son perfectos para San Valentín, cumpleaños, aniversarios, Día del
          Padre, Día de la Madre y Navidad, pero también para sorprender a
          alguien especial con un regalo inesperado en cualquier día del año.
        </p>
      </section>

      {/* ═══ SECCIÓN 3: GRID DE LIBROS ═══ */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 40px 56px",
        }}
      >
        <div
          style={{
            borderTop: "2px solid #e0e0e0",
            paddingTop: "40px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: 700,
              color: "#222",
              textTransform: "uppercase",
              margin: "0 0 40px 0",
            }}
          >
            Selecciona el libro que más te gusta
          </h2>

          <ProductGrid books={visibleBooks} />

          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "48px",
              }}
            >
              <button
                onClick={() =>
                  setVisibleCount((prev) => prev + CARDS_PER_PAGE)
                }
                style={{
                  minWidth: "220px",
                  height: "56px",
                  borderRadius: "18px",
                  border: "2px solid #4f97cf",
                  background: "#fff",
                  color: "#4f97cf",
                  fontSize: "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Ver Más
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ SECCIÓN 4: FAQ ═══ */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "56px 40px",
          borderTop: "2px solid #e0e0e0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#222",
              margin: 0,
            }}
          >
            ¿Por qué escoger
          </h2>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#4f97cf",
              margin: 0,
            }}
          >
            PIXELART
          </span>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#222",
              margin: 0,
            }}
          >
            como libro de regalo?
          </h2>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      {/* ═══ SECCIÓN 5: COMUNIDAD ═══ */}
      <section
        style={{
          padding: "56px 40px",
          borderTop: "2px solid #e0e0e0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: 700,
            color: "#222",
            textTransform: "uppercase",
            margin: "0 0 32px 0",
          }}
        >
          Comunidad
        </h2>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            columns: 3,
            columnGap: "16px",
          }}
        >
          {[
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1_Amor_Comunidad_1.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_2.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_3.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_4.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_5.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_6.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_7.png",
            "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Comunidad_8.png",
          ].map((key, i) => (
            <div
              key={i}
              style={{
                breakInside: "avoid",
                marginBottom: "16px",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <img
                src={getAssetUrl(key)}
                alt={`Comunidad PixelArt ${i + 1}`}
                loading={i > 3 ? "lazy" : undefined}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECCIÓN 6: BLOG ═══ */}
      <section
        style={{
          padding: "56px 40px",
          borderTop: "2px solid #e0e0e0",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#222",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
          }}
        >
          Blog
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#777",
            margin: 0,
          }}
        >
          Próximamente artículos sobre regalos personalizados, ideas creativas y
          más.
        </p>
      </section>

      {/* ═══ SECCIÓN 7: TESTIMONIOS ═══ */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "56px 40px",
          borderTop: "2px solid #e0e0e0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={getAssetUrl([
                    "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_1.png",
                    "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_2.png",
                    "IA_Books/Love_Books_Page/Pagina_Libros_Amor_Blog_3.png",
                  ][i])}
                  alt={t.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#222",
                  margin: "0 0 12px 0",
                }}
              >
                {t.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#555",
                  margin: "0 0 20px 0",
                }}
              >
                {t.story}
              </p>
              <button
                style={{
                  padding: "10px 28px",
                  borderRadius: "14px",
                  border: "2px solid #4f97cf",
                  background: "#fff",
                  color: "#4f97cf",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Leer más
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
