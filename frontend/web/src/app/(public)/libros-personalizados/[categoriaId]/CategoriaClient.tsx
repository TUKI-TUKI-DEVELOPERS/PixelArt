"use client";

import { useState } from "react";
import ProductGrid from "@/components/catalog/ProductGrid";
import { getAssetUrl } from "@/lib/assetUrl";

/* ── Datos por categoría ── */

type BookData = {
  id: string;
  slug: string;
  name: string;
  productType: string;
  description: string | null;
  coverImageUrl: string | null;
  variants: { id: string; coverType: string; basePriceCents: number }[];
  categoryBadge?: string;
  tagline?: string;
  reviewCount?: number;
};

const CATEGORY_HERO: Record<
  string,
  { title: string; subtitle: string; description: string; accent: string }
> = {
  "libros-de-amor": {
    title: "LOS MEJORES LIBROS DE AMOR",
    subtitle: "PARA AQUELLA PERSONA ESPECIAL",
    description:
      "Tu pareja es lo mejor que tienes, y por eso merece un regalo que esté a la altura de lo que sienten el uno por el otro. Estos libros personalizados, protagonizados por ambos, es una de las formas más lindas y significativas de expresar su amor. Pueden diseñar a los personajes, elegir las historias que más se parezcan a su relación y agregar una dedicatoria especial que haga único cada detalle.",
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
    accent: "#4f97cf",
  },
  "libros-de-memorias-familiares": {
    title: "LIBROS DE MEMORIAS FAMILIARES",
    subtitle: "PRESERVA TU HISTORIA",
    description:
      "Cada familia tiene una historia única que merece ser contada. Estos libros recopilan los recuerdos más valiosos de tu familia, creando un legado emocional que perdurará a través del tiempo.",
    accent: "#4f97cf",
  },
};

const CATEGORY_BOOKS: Record<string, BookData[]> = {
  "libros-de-amor": [
    {
      id: "amor-1",
      slug: "10-razones-por-las-que-te-amo",
      name: "10 o 15 Razones Por Las Que Te Amo",
      productType: "CUSTOM_BOOK",
      description:
        "Libro que celebra el amor a través de escenarios cotidianos, divertidos y nostálgicos. Cada plantilla representa un momento especial de la vida en pareja que hace que el amor crezca cada día.",
      coverImageUrl: null,
      variants: [{ id: "v1", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE AMOR",
      tagline: "PORQUE EN LO SIMPLE VIVIMOS LO MAS GRANDE TÚ Y YO",
      reviewCount: 200,
    },
    {
      id: "amor-2",
      slug: "mi-amor",
      name: "Javier, Mi Amor",
      productType: "CUSTOM_BOOK",
      description:
        "Libro que describe al ser amado de manera única y especial. Cada plantilla transforma al destinatario en un personaje poderoso, romántico o inspirador, celebrando sus cualidades a través de metáforas visuales impactantes.",
      coverImageUrl: null,
      variants: [{ id: "v2", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE AMOR",
      tagline: "ERES MI INSPIRACIÓN INFINITA",
      reviewCount: 150,
    },
    {
      id: "amor-3",
      slug: "1025-dias-enamorandome-de-ti",
      name: "1025 Días Enamorándome De Ti",
      productType: "CUSTOM_BOOK",
      description:
        "Libro que celebra el tiempo juntos como pareja, contando los días desde que comenzaron su relación. Cada plantilla representa un momento mágico, un sentimiento profundo o una comparación creativa que demuestra cómo el amor crece día a día.",
      coverImageUrl: null,
      variants: [{ id: "v3", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE AMOR",
      tagline: "EL MEJOR CONTEO ES EL DE NOSOTROS",
      reviewCount: 180,
    },
  ],
  "libros-de-mascotas": [
    {
      id: "mascota-1",
      slug: "nuestro-angel-de-4-patas",
      name: "Nuestro Ángel de 4 Patas",
      productType: "CUSTOM_BOOK",
      description:
        "Crea el homenaje más hermoso a ese peludo que te recibe como si fueras una estrella, que te protege, que te hace reír y que te ama sin condiciones.",
      coverImageUrl: null,
      variants: [{ id: "v4", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "SU HUELLA QUEDÓ PARA SIEMPRE EN TU CORAZÓN",
      reviewCount: 188,
    },
    {
      id: "mascota-2",
      slug: "aventura-entre-patas",
      name: "Aventura Entre Patas",
      productType: "CUSTOM_BOOK",
      description:
        "Celebra la complicidad, diversión y amor incondicional entre la mascota de la familia y los niños del hogar.",
      coverImageUrl: null,
      variants: [{ id: "v5", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "CELEBRA TUS AVENTURAS JUNTO A TU PELUDO AMIGO",
      reviewCount: 150,
    },
    {
      id: "mascota-3",
      slug: "mi-amigo-miauravilloso",
      name: "Mi Amigo Miauravilloso",
      productType: "CUSTOM_BOOK",
      description:
        "Crea el tributo más hermoso a ese felino que te elige, que ronronea en tu regazo y que convierte tu casa en su reino.",
      coverImageUrl: null,
      variants: [{ id: "v6", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "PARA TU GUARDIAN MISTICO",
      reviewCount: 188,
    },
    {
      id: "mascota-4",
      slug: "mi-mejor-amigo-del-mundo",
      name: "Mi Mejor Amigo del Mundo",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que celebra el vínculo único e irrompible entre tú y tu mascota, capturando cada momento de lealtad, juego y amor incondicional.",
      coverImageUrl: null,
      variants: [{ id: "v14", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE MASCOTAS",
      tagline: "ERES MI COMPAÑERO FIEL",
      reviewCount: 90,
    },
  ],
  "libros-de-familia": [
    {
      id: "familia-1",
      slug: "papa-mi-heroe",
      name: "Papá, Mi Héroe",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro personalizado donde una hija celebra a su padre, reconociendo todo lo que lo hace especial.",
      coverImageUrl: null,
      variants: [{ id: "v7", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PARA EL HOMBRE QUE ME ENSEÑO A SER VALIENTE",
      reviewCount: 185,
    },
    {
      id: "familia-2",
      slug: "te-amo-abuelo",
      name: "Te Amo, Abuelo",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que honra el vínculo sagrado entre abuelos y nietos, capturando la sabiduría, ternura e historias compartidas.",
      coverImageUrl: null,
      variants: [{ id: "v8", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "ÉL TE CONTO HISTORIAS, AHORA TU DALE UN TESORO QUE RECORDAR",
      reviewCount: 185,
    },
    {
      id: "familia-3",
      slug: "el-mejor-equipo",
      name: "El Mejor Equipo",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que celebra el vínculo entre hermanos, capturando las aventuras, risas y momentos que los hacen un equipo único.",
      coverImageUrl: null,
      variants: [{ id: "v9", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE SER HERMANOS SE MERECE UN LIBRO PROPIO",
      reviewCount: 180,
    },
    {
      id: "familia-4",
      slug: "la-familia",
      name: "La Familia",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro personalizado que celebra la unión familiar, capturando los momentos que hacen de tu familia algo único e irrepetible.",
      coverImageUrl: null,
      variants: [{ id: "v11", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE ESTANDO JUNTOS TODO ES MEJOR",
      reviewCount: 170,
    },
    {
      id: "familia-5",
      slug: "te-amo-abuela",
      name: "Te Amo, Abuela",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que celebra el amor incondicional de una abuela, capturando su ternura, sus historias y el calor de su presencia.",
      coverImageUrl: null,
      variants: [{ id: "v12", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE EL AMOR DE UNA ABUELA NUNCA SE OLVIDA",
      reviewCount: 90,
    },
    {
      id: "familia-6",
      slug: "mama-mi-heroina",
      name: "Mamá, Mi Heroína",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro personalizado donde celebras a tu mamá, reconociendo su fuerza, amor y todo lo que la hace extraordinaria.",
      coverImageUrl: null,
      variants: [{ id: "v13", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "EL REGALO QUE TU MAMÁ GUARDARÁ PARA SIEMPRE",
      reviewCount: 182,
    },
  ],
  "libros-de-memorias-familiares": [
    {
      id: "memorias-1",
      slug: "recuerdos-familiares",
      name: "Recuerdos Familiares",
      productType: "CUSTOM_BOOK",
      description:
        "Un libro que reúne los momentos más especiales de tu familia, creando un legado emocional que perdurará a través del tiempo.",
      coverImageUrl: null,
      variants: [{ id: "v10", coverType: "TAPA_DURA", basePriceCents: 8900 }],
      categoryBadge: "LIBRO DE FAMILIA",
      tagline: "PORQUE CADA FAMILIA TIENE UNA HISTORIA QUE CONTAR",
      reviewCount: 170,
    },
  ],
};

/* ── FAQ ── */
const FAQ_ITEMS = [
  {
    question:
      "¿Qué hace diferente a PIXELART como regalo frente a un álbum o un detalle común?",
    answer:
      'Porque no se queda en "qué bonito": se queda en el corazón. PIXELART convierte tus fotos y tu historia en un libro que se abre como un recuerdo vivo. Es ese regalo que provoca sonrisa, silencio, "wow"… y después una conversación. No es un detalle más: es un momento que se vuelve para siempre.',
  },
  {
    question:
      "¿Qué diferencia hay entre un photobook y un libro personalizado con IA?",
    answer:
      "Un photobook es perfecto si quieres un recuerdo clásico: tú eliges las fotos, decides el orden y acomodas todo en la interfaz a tu gusto. Un libro personalizado con IA, en cambio, va un paso más allá: tus fotos y datos se convierten en una experiencia narrativa dentro de escenarios creados por IA, con un estilo más \"cuento/aventura\" y un efecto sorpresa mucho mayor.",
  },
  {
    question: "¿Cuál debería elegir: photobook o libro personalizado?",
    answer:
      'Depende del tipo de emoción que quieras regalar: Photobook: "Mira todo lo que vivimos" (recuerdo directo, simple y elegante). Libro con IA: "Esto lo hice para ti" (sorpresa, historia, sentimiento y un toque único). Muchos eligen photobook para guardar memorias del año y libro con IA para una fecha especial.',
  },
  {
    question:
      "¿Qué tipos de libros y categorías puedo encontrar en PIXELART?",
    answer:
      "Hay estilos para distintos sentimientos: románticos, familiares, divertidos, para niños, para celebrar logros o para regalar un recuerdo que abrace. Elige la categoría que encaje con tu historia y Pixelart se encarga de que el resultado se vea consistente, bonito y listo para imprimir.",
  },
  {
    question:
      "¿Cómo se crea mi libro en PIXELART (qué tengo que subir y qué hace la IA)?",
    answer:
      "Tú solo traes lo más importante: tus fotos, nombres y ese pedacito de historia que quieres regalar. Nosotros hacemos el resto. La IA integra tu contenido dentro de escenarios ya preparados para que cada página se sienta cuidada, coherente y hermosa. Sin editar, sin complicarte: solo elige, sube y prepárate para ver tu historia transformada.",
  },
];

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

/* ══════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════ */

type Props = {
  categoriaSlug: string;
  categoriaNombre: string;
  assetUrls?: Record<string, string>;
};

const INITIAL_VISIBLE = 3;

export default function CategoriaClient({
  categoriaSlug,
  categoriaNombre,
  assetUrls = {},
}: Props) {
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
  };

  const allBooks = booksRaw.map((b) => ({
    ...b,
    coverImageUrl: COVER_MAP[b.slug]
      ? getAssetUrl(COVER_MAP[b.slug])
      : b.coverImageUrl,
    href: `/libros-personalizados/${categoriaSlug}/${b.slug}`,
  }));
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
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
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
            {/* Overlay para legibilidad del texto */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.35)",
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

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            padding: "80px 48px",
            textAlign: "center",
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
              fontSize: "48px",
              fontWeight: 900,
              color: hasHeroBg ? "#fff" : "#111",
              lineHeight: 1.1,
              textTransform: "uppercase",
              textShadow: hasHeroBg ? "0 2px 8px rgba(0,0,0,0.4)" : undefined,
            }}
          >
            {hero.title}
          </h1>
          <h2
            style={{
              margin: "0 0 28px 0",
              fontSize: "28px",
              fontWeight: 600,
              color: hasHeroBg ? "#fff" : hero.accent,
              lineHeight: 1.2,
              textTransform: "uppercase",
              textShadow: hasHeroBg ? "0 2px 8px rgba(0,0,0,0.3)" : undefined,
            }}
          >
            {hero.subtitle}
          </h2>
          <p
            style={{
              margin: "0 auto",
              maxWidth: "760px",
              fontSize: "17px",
              lineHeight: 1.7,
              color: hasHeroBg ? "rgba(255,255,255,0.9)" : "#555",
              textShadow: hasHeroBg ? "0 1px 4px rgba(0,0,0,0.3)" : undefined,
            }}
          >
            {hero.description}
          </p>
        </div>
      </section>

      {/* ═══ SECCIÓN CATÁLOGO ═══ */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "64px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "14px",
              fontWeight: 700,
              color: hero.accent,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            MUESTRA TU AMOR
          </h2>
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "32px",
              fontWeight: 800,
              color: "#111",
              textTransform: "uppercase",
            }}
          >
            Escoge el diseño que más te guste
          </h3>
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

        <ProductGrid books={books} />

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
          padding: "72px 48px",
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
                fontSize: "32px",
                fontWeight: 800,
                color: "#111",
                margin: "0 0 4px 0",
                lineHeight: 1.2,
              }}
            >
              ¿Por qué escoger{" "}
              <span style={{ color: hero.accent }}>PIXELART</span>
            </h2>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#111",
                margin: 0,
              }}
            >
              como libro de regalo?
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                accent={hero.accent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMUNIDAD — Masonry Grid ═══ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "72px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#111",
              textTransform: "uppercase",
              margin: "0 0 8px 0",
            }}
          >
            Comunidad
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: hero.accent,
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        <MasonryGrid images={comunidadImages} accent={hero.accent} />
      </section>

      {/* ═══ BLOG ═══ */}
      <section
        style={{
          background: "#fafafa",
          padding: "72px 48px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#111",
                textTransform: "uppercase",
                margin: "0 0 8px 0",
              }}
            >
              Blog
            </h2>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: hero.accent,
                margin: "0 auto",
                borderRadius: "2px",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
            }}
          >
            {[1, 2, 3].map((i) => {
              const blogImages = [
                assetUrls.blog1,
                assetUrls.blog2,
                assetUrls.blog3,
              ];
              const blogImg = blogImages[i - 1];
              return (
              <article
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/10",
                    background: `linear-gradient(135deg, ${hero.accent}12 0%, ${hero.accent}06 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {blogImg && (
                    <img
                      src={blogImg}
                      alt={`Blog ${i}`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: hero.accent,
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {categoriaNombre.replace("Libros de ", "Libro de ")}
                  </div>
                  {!blogImg && (
                    <span style={{ color: "#ccc", fontSize: "14px" }}>
                      Portada blog {i}
                    </span>
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#222",
                      margin: "0 0 8px 0",
                    }}
                  >
                    Artículo sobre {categoriaNombre.toLowerCase()}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "#888",
                      margin: 0,
                    }}
                  >
                    Próximamente contenido sobre ideas creativas y regalos
                    personalizados.
                  </p>
                </div>
              </article>
              );
            })}
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
}: {
  question: string;
  answer: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #e8e8e8",
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
          fontFamily: "inherit",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: open ? accent : "#222",
            transition: "color 0.2s ease",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? accent : "#999"}
          strokeWidth="2"
          strokeLinecap="round"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease, stroke 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <div
          style={{
            padding: "0 0 22px 0",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#666",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
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
