import Image from "next/image";
import HomeHeroClient from "@/components/Home/HomeHeroClient";
import CreateBookAccordion from "@/components/Home/CreateBookAccordion";
import ModernBackground from "@/components/backgrounds/ModernBackground";
import NuestrosLibrosSection from "@/components/Home/NuestrosLibrosSection";
import type { Book, BookCategory } from "@/components/Home/NuestrosLibrosSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import { HOME_ASSET_KEYS } from "@/lib/homeAssetKeys";
import { getAssetUrl } from "@/lib/assetUrl";
import { tokens } from "@/lib/design-tokens";

type HeroSlide = {
  key: string;
  title: string;
  heroText: string;
  description?: string;
  sliderUrl: string;
  carouselUrl: string;
};


export default function HomePage() {
  const K = HOME_ASSET_KEYS;

  // URLs construidas directamente — sin fetch al backend
  const customBookCarouselUrl = getAssetUrl(K.heroAIBookCarousel);
  const customBookSliderUrl = getAssetUrl(K.heroAIBookSlider);
  const photobookSliderUrl = getAssetUrl(K.heroPhotobookSlider);
  const photobookCarouselUrl = getAssetUrl(K.heroPhotobookCarousel);

  const identityBackgroundUrl = getAssetUrl(K.identityBackground);
  const logoUrl = getAssetUrl(K.logo);

  const loveBookUrl = getAssetUrl(K.ourBooksLove10Razones);
  const familyHeroUrl = getAssetUrl(K.ourBooksFamilyPapaHeroe);
  const petAngelUrl = getAssetUrl(K.ourBooksPetsAngel);
  const photobookMachuPicchuUrl = getAssetUrl(K.ourBooksPhotobooksMachuPicchu);
  const photobookParisUrl       = getAssetUrl(K.ourBooksPhotobooksParis);
  const photobookNuevaYorkUrl   = getAssetUrl(K.ourBooksPhotobooksNuevaYork);
  const photobookRomaUrl        = getAssetUrl(K.ourBooksPhotobooksRoma);
  const grandpaBookUrl = getAssetUrl(K.ourBooksFamilyAbuelo);
  const miAmorBookUrl = getAssetUrl(K.ourBooksLoveMiAmor);
  const aventuraPatasUrl = getAssetUrl(K.ourBooksPetsAventuras);
  const love1025Url = getAssetUrl(K.ourBooksLove1025Dias);
  const miauravillosoUrl = getAssetUrl(K.ourBooksPetsMiauravilloso);
  const mejorAmigoUrl = getAssetUrl(K.ourBooksPetsMejorAmigo);
  const photobooksExampleUrl = getAssetUrl(K.photobooksExample);
  const whyChooseUsImageUrl = getAssetUrl(K.whyChooseUsImage);
  const bookCoverThickUrl = getAssetUrl(K.bookCoverThick);
  const photobooksSectionBgUrl = getAssetUrl(K.photobooksSectionBackground);

  const registerBoyImageUrl = getAssetUrl(K.createBookBoy);
  const registerGirlImageUrl = getAssetUrl(K.createBookGirl);
  const registerStage1ImageUrl = getAssetUrl(K.createBookStage1);
  const registerStage2ImageUrl = getAssetUrl(K.createBookStage2);
  const registerResultImageUrl = getAssetUrl(K.createBookResult);
  const poemSpaceImageUrl = getAssetUrl(K.createBookPoemSpace);
  const chooseBookCoverThickUrl = getAssetUrl(K.chooseBookCoverThick);
  const chooseBookCoverPremiumUrl = getAssetUrl(K.chooseBookCoverPremium);
  const previsualizedResultsCoupleUrl = getAssetUrl(K.previsualizedResultsCouple);

  const ourClients1Url = getAssetUrl(K.ourClients1);
  const ourClients2Url = getAssetUrl(K.ourClients2);
  const ourClients3Url = getAssetUrl(K.ourClients3);
  const ourClients4Url = getAssetUrl(K.ourClients4);
  const ourClientsBackgroundUrl = getAssetUrl(K.ourClientsBackground);

  const slides: HeroSlide[] = [
    {
      key: "custom-book",
      title: "Libros Personalizados",
      heroText: "Preserva tus momentos para siempre",
      description: "Crea libros únicos con inteligencia artificial. Historias personalizadas llenas de emoción y significado.",
      sliderUrl: customBookSliderUrl,
      carouselUrl: customBookCarouselUrl,
    },
    {
      key: "photobook",
      title: "Photobooks",
      heroText: "Tus mejores recuerdos en alta calidad",
      description: "Photobooks profesionales con tus fotografías. Tapas delgadas, gruesas o premium para guardar tus recuerdos con estilo.",
      sliderUrl: photobookSliderUrl,
      carouselUrl: photobookCarouselUrl,
    },
  ];

  const books: Book[] = [
    {
      title: "10 Razones por las que Te Amo",
      subtitle: "Libro de historia entre tú y esa persona especial",
      description:
        "Celebra el amor a través de escenarios cotidianos, divertidos y nostálgicos. Más de 21 escenarios para crear momentos mágicos únicos.",
      image: loveBookUrl,
      badge: "NEW",
      href: "/libros-personalizados/libros-de-amor/10-razones-por-las-que-te-amo",
      category: "love" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Nuestro Ángel de 4 Patas",
      subtitle: "Homenaje a esa mascota que siempre te acompañará",
      description:
        "Crea el tributo más hermoso a ese peludo que te recibe como si fueras una estrella, que te protege y que te ama sin condiciones.",
      image: petAngelUrl,
      badge: "NEW",
      href: "/libros-personalizados/libros-de-mascotas/nuestro-angel-de-4-patas",
      category: "pets" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Photobook Machu Picchu",
      subtitle: "La maravilla del mundo en tus recuerdos",
      description:
        "Revive la magia de Machu Picchu con un photobook de tapa gruesa premium. Conserva cada momento con máxima calidad y elegancia.",
      image: photobookMachuPicchuUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 149.00",
      pages: 24,
    },
    {
      title: "Photobook París",
      subtitle: "La ciudad del amor en tus páginas",
      description:
        "Captura el encanto de París en un photobook de diseño elegante. El regalo perfecto para los amantes de los viajes y la fotografía.",
      image: photobookParisUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 99.00",
      pages: 24,
    },
    {
      title: "Photobook Nueva York",
      subtitle: "La gran manzana en cada página",
      description:
        "Inmortaliza tus mejores momentos en la ciudad que nunca duerme. Un photobook vibrante lleno de energía y estilo urbano.",
      image: photobookNuevaYorkUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 99.00",
      pages: 24,
    },
    {
      title: "Photobook Roma",
      subtitle: "Historia y belleza en cada foto",
      description:
        "El Coliseo, la Fontana di Trevi y tus mejores recuerdos reunidos en un photobook de calidad superior. Eterno como la Ciudad Eterna.",
      image: photobookRomaUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 99.00",
      pages: 24,
    },
    {
      title: "Papá, Mi Héroe",
      subtitle: "Libro personalizado para celebrar a papá",
      description:
        "Un libro donde una hija celebra a su padre, reconociendo todo lo que lo hace especial. Cada página captura momentos únicos y enseñanzas.",
      image: familyHeroUrl,
      href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
      category: "family" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Te Amo, Abuelo",
      subtitle: "Homenaje al vínculo sagrado abuelo-nieto",
      description:
        "Honra el vínculo entre abuelos y nietos, capturando la sabiduría, ternura, historias compartidas y ese amor incondicional único.",
      image: grandpaBookUrl,
      href: "/libros-personalizados/libros-de-familia/te-amo-abuelo",
      category: "family" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Mi Amor",
      subtitle: "Libro con metáforas visuales impactantes",
      description:
        "Describe al ser amado de manera única con arquetipos creativos. Cada plantilla transforma al destinatario en un personaje poderoso y romántico.",
      image: miAmorBookUrl,
      href: "/libros-personalizados/libros-de-amor/mi-amor",
      category: "love" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Aventura Entre Patas",
      subtitle: "Celebra la complicidad con tu mascota",
      description:
        "Libro que celebra la diversión y amor incondicional entre la mascota de la familia y los niños del hogar. Aventuras y risas compartidas.",
      image: aventuraPatasUrl,
      href: "/libros-personalizados/libros-de-mascotas/aventura-entre-patas",
      category: "pets" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "1025 Días Enamorándome de Ti",
      subtitle: "El conteo más romántico para parejas",
      description:
        "Crea una historia de amor única eligiendo entre más de 21 escenarios. Momentos cotidianos y recuerdos inolvidables llenos de cariño.",
      image: love1025Url,
      href: "/libros-personalizados/libros-de-amor/1025-dias-enamorandome-de-ti",
      category: "love" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Mi Amigo Miauravilloso",
      subtitle: "Tributo a tu felino especial",
      description:
        "Crea el tributo más hermoso a ese felino que te elige, que ronronea en tu regazo, que te mira con ojos hipnóticos y convierte tu casa en su reino.",
      image: miauravillosoUrl,
      href: "/libros-personalizados/libros-de-mascotas/mi-amigo-miauravilloso",
      category: "pets" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
    {
      title: "Mi Mejor Amigo del Mundo",
      subtitle: "La relación especial persona-perro",
      description:
        "Un libro personalizado que celebra el vínculo único y especial entre una persona y su perro. Lealtad, compañía y amor incondicional.",
      image: mejorAmigoUrl,
      href: "/libros-personalizados/libros-de-mascotas/mi-mejor-amigo",
      category: "pets" as BookCategory,
      price: "S/ 89.00",
      pages: 30,
    },
  ];

  const categories = [
    { label: "Todos", value: "all" },
    { label: "Amor", value: "love" },
    { label: "Mascotas", value: "pets" },
    { label: "Familia", value: "family" },
    { label: "Photobooks", value: "photobooks" },
  ];

  const clients = [
    {
      name: "María González Torres",
      image: ourClients1Url,
      review:
        "¡Increíble! El libro de '10 Razones Por Las Que Te Amo' superó todas mis expectativas. Mi pareja lloró de emoción al verlo. La calidad de impresión es excelente.",
      rating: 5,
    },
    {
      name: "Carlos Mendoza Silva",
      image: ourClients2Url,
      review:
        "Compré el Photobook para mi boda y quedé impresionado. La tapa gruesa es de lujo, las fotos se ven espectaculares. Totalmente recomendado.",
      rating: 5,
    },
    {
      name: "Ana Lucía Ramírez",
      image: ourClients3Url,
      review:
        "El libro 'Nuestro Ángel de 4 Patas' fue el mejor regalo de despedida para nuestra mascota. Nos ayudó a recordar todos los momentos hermosos juntos.",
      rating: 4,
    },
    {
      name: "Roberto Fernández Cruz",
      image: ourClients4Url,
      review:
        "Excelente servicio al cliente. Me ayudaron a personalizar cada detalle del libro para mi padre. Llegó antes de lo esperado y en perfectas condiciones.",
      rating: 5,
    },
  ];

  return (
    <main
      style={{
        background: tokens.colors.neutral.surface.base,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ═══ HERO SECTION ═══ */}
      <HomeHeroClient slides={slides} />

      {/* ═══ IDENTITY SECTION - Glassmorphism ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "480px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        }}
      >
        <Image
          src={identityBackgroundUrl}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          loading="lazy"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1060px",
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            borderRadius: tokens.borderRadius["2xl"],
            border: "1px solid rgba(255, 255, 255, 0.6)",
            padding: `${tokens.spacing.section.sm} ${tokens.spacing.section.md}`,
            boxShadow: tokens.shadows["2xl"],
            textAlign: "center",
          }}
        >
          <Image
            src={logoUrl}
            alt="PixelArt Logo"
            width={280}
            height={80}
            style={{
              width: "280px",
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: `0 auto ${tokens.spacing.component.md}`,
            }}
            loading="lazy"
          />

          <p
            style={{
              margin: 0,
              fontSize: tokens.typography.h4.size,
              lineHeight: tokens.typography.h4.lineHeight,
              color: tokens.colors.neutral.text.primary,
              fontWeight: 500,
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            En <strong>PixelArt</strong> convertimos tus momentos en historias para
            siempre. Crea <strong>libros personalizados con IA</strong> o{" "}
            <strong>Photobooks</strong> para guardar tus recuerdos más importantes.
          </p>
        </div>
      </section>

      {/* ═══ BOOKS SECTION ═══ */}
      <NuestrosLibrosSection books={books} categories={categories} />

      {/* ═══ PHOTOBOOKS HERO SECTION ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "700px",
          display: "flex",
          alignItems: "center",
          padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Image
          src={photobooksSectionBgUrl}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
          loading="lazy"
        />
        {/* Gradient overlay: solid left → transparent right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right,
              rgba(20, 70, 115, 0.92) 0%,
              rgba(30, 95, 155, 0.82) 35%,
              rgba(45, 143, 213, 0.45) 65%,
              rgba(79, 151, 207, 0.15) 100%
            )`,
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <div style={{ maxWidth: "520px" }}>
            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontSize: "64px",
                lineHeight: 0.95,
                fontWeight: 900,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "-1.5px",
                textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              PHOTOBOOKS
            </h2>

            <div
              style={{
                width: "400px",
                maxWidth: "100%",
                height: "4px",
                background: "rgba(255,255,255,0.6)",
                borderRadius: "2px",
                marginBottom: tokens.spacing.section.xs,
              }}
            />

            <p
              style={{
                margin: `0 0 ${tokens.spacing.section.sm} 0`,
                fontSize: "18px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.92)",
                fontWeight: 500,
                maxWidth: "480px",
                textShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            >
              Los Photobooks de PixelArt convierten tus viajes en recuerdos únicos,
              diseñados para capturar la emoción de cada momento y conservarla para
              toda la vida.
            </p>

            <button
              style={{
                minWidth: "260px",
                height: "56px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #fff 0%, #f0f4f8 100%)",
                color: "#1a5f8a",
                fontSize: "16px",
                fontWeight: 800,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                transition: `transform ${tokens.transitions.fast}`,
              }}
            >
              Comenzar Photobook
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={photobooksExampleUrl}
              alt="Ejemplo de Photobooks PixelArt"
              width={880}
              height={500}
              style={{
                width: "100%",
                maxWidth: "880px",
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.25))",
              }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US - Icons SVG + Real Copy ═══ */}
      <WhyChooseSection logoUrl={logoUrl} whyChooseUsImageUrl={whyChooseUsImageUrl} />

      {/* ═══ BOOK QUALITY SECTION ═══ */}
      <section
        style={{
          width: "100%",
          padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
          background: "linear-gradient(180deg, #dce9d1 0%, #a6d8a8 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.spacing.component.md,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.45)",
                borderRadius: tokens.borderRadius["2xl"],
                padding: tokens.spacing.section.xs,
                minHeight: "310px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={bookCoverThickUrl}
                alt="Tipos de tapa de photobook - delgada, gruesa y premium"
                width={560}
                height={310}
                style={{
                  width: "100%",
                  maxWidth: "560px",
                  height: "auto",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>

            <div
              style={{
                width: "82%",
                marginLeft: "60px",
                background: "rgba(255,255,255,0.55)",
                borderRadius: tokens.borderRadius["2xl"],
                padding: `${tokens.spacing.component.md} ${tokens.spacing.section.xs}`,
              }}
            >
              <h3
                style={{
                  margin: `0 0 ${tokens.spacing.micro.sm} 0`,
                  fontSize: "42px",
                  lineHeight: 1,
                  fontWeight: 900,
                  color: tokens.colors.neutral.text.primary,
                  textTransform: "uppercase",
                }}
              >
                Tapa Delgada
              </h3>

              <div
                style={{
                  marginBottom: tokens.spacing.component.xs,
                  fontSize: tokens.typography.bodyLarge.size,
                  color: tokens.colors.photobooks.accent,
                  fontWeight: 700,
                }}
              >
                Para una experiencia más fina
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: tokens.spacing.component.md,
                }}
              >
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    fontSize: tokens.typography.body.size,
                    lineHeight: 1.35,
                    color: tokens.colors.neutral.text.primary,
                    fontWeight: 600,
                  }}
                >
                  <li>Cartulina de grosor estándar</li>
                  <li>Acabado mate profesional</li>
                  <li>Colores vibrantes</li>
                  <li>Protección duradera</li>
                </ul>

                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 600,
                    color: tokens.colors.neutral.text.primary,
                    whiteSpace: "nowrap",
                  }}
                >
                  S/ 99.99
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: tokens.spacing.component.md,
            }}
          >
            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontSize: "68px",
                lineHeight: 1.05,
                fontWeight: 900,
                color: tokens.colors.neutral.text.primary,
                textTransform: "uppercase",
              }}
            >
              Calidad en cada
              <br />
              página
            </h2>

            <div
              style={{
                width: "78%",
                height: "5px",
                background: tokens.colors.neutral.text.primary,
                marginBottom: tokens.spacing.component.md,
              }}
            />

            <p
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontSize: tokens.typography.h4.size,
                lineHeight: tokens.typography.h4.lineHeight,
                color: tokens.colors.neutral.text.primary,
                maxWidth: "640px",
              }}
            >
              En PixelArt cuidamos cada detalle de tu Photobook ofreciéndote tres
              tipos de tapa:
              <strong> Delgada, ligera y básica</strong> para un uso estándar;
              <strong> Gruesa, rígida</strong> y más resistente con mejor
              presentación; y <strong>Premium, de alta calidad</strong> con acabados
              metálicos, plastificado resistente al agua y una apariencia de lujo.
            </p>

            <button
              style={{
                width: "280px",
                padding: `${tokens.spacing.component.xs} ${tokens.spacing.component.md}`,
                borderRadius: tokens.borderRadius.md,
                border: "none",
                background: tokens.colors.neutral.text.primary,
                color: "#fff",
                fontSize: tokens.typography.bodyLarge.size,
                fontWeight: 800,
                cursor: "pointer",
                transition: `all ${tokens.transitions.fast}`,
              }}
            >
              Comenzar mi diseño
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CREATE BOOK ACCORDION ═══ */}
      <CreateBookAccordion
        registerInformationCarouselProps={{
          boyImageUrl: registerBoyImageUrl,
          girlImageUrl: registerGirlImageUrl,
          stage1ImageUrl: registerStage1ImageUrl,
          stage2ImageUrl: registerStage2ImageUrl,
          resultImageUrl: registerResultImageUrl,
        }}
        poemSpaceImageUrl={poemSpaceImageUrl}
        chooseBookCoverThickUrl={chooseBookCoverThickUrl}
        chooseBookCoverPremiumUrl={chooseBookCoverPremiumUrl}
        previsualizedResultsCoupleUrl={previsualizedResultsCoupleUrl}
      />

      {/* ═══ CLIENT TESTIMONIALS ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        }}
      >
        <Image
          src={ourClientsBackgroundUrl}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          loading="lazy"
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1480px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              margin: `0 0 ${tokens.spacing.component.xs} 0`,
              fontSize: "64px",
              lineHeight: 1.05,
              fontWeight: 900,
              color: tokens.colors.neutral.text.primary,
              textTransform: "uppercase",
            }}
          >
            Nuestros Clientes
            <br />
            Nos Respaldan
          </h2>

          <div
            style={{
              width: "680px",
              maxWidth: "100%",
              height: "5px",
              background: tokens.colors.neutral.text.primary,
              marginBottom: tokens.spacing.section.xs,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: tokens.spacing.component.md,
              marginBottom: tokens.spacing.section.sm,
            }}
          >
            {clients.map((client, idx) => (
              <article
                key={`${client.name}-${idx}`}
                style={{
                  background: "rgba(240, 248, 247, 0.92)",
                  borderRadius: tokens.borderRadius["2xl"],
                  padding: `${tokens.spacing.section.sm} ${tokens.spacing.component.md}`,
                  boxShadow: tokens.shadows.lg,
                  textAlign: "center",
                }}
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={160}
                  height={160}
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    display: "block",
                    margin: `0 auto ${tokens.spacing.component.md}`,
                    border: "4px solid #f2f2f2",
                  }}
                  loading="lazy"
                />

                <h3
                  style={{
                    margin: `0 0 ${tokens.spacing.component.xs} 0`,
                    fontSize: tokens.typography.bodyLarge.size,
                    lineHeight: tokens.typography.bodyLarge.lineHeight,
                    fontWeight: 700,
                    color: tokens.colors.neutral.text.primary,
                  }}
                >
                  {client.name}
                </h3>

                <div
                  style={{
                    fontSize: "22px",
                    marginBottom: tokens.spacing.component.md,
                    letterSpacing: "2px",
                    color: "#f5a623",
                  }}
                >
                  {Array.from({ length: client.rating }, (_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#f5a623" stroke="#f5a623" strokeWidth="2" style={{ display: "inline-block", marginRight: "2px" }} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                  {Array.from({ length: 5 - client.rating }, (_, i) => (
                    <svg key={i + client.rating} width="20" height="20" viewBox="0 0 24 24" fill="transparent" stroke="#d0d0d0" strokeWidth="2" style={{ display: "inline-block", marginRight: "2px" }} xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: tokens.typography.body.size,
                    lineHeight: tokens.typography.body.lineHeight,
                    color: tokens.colors.neutral.text.secondary,
                    textAlign: "left",
                  }}
                >
                  {client.review}
                </p>
              </article>
            ))}
          </div>

          <div
            style={{
              maxWidth: "1060px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.9)",
              borderRadius: tokens.borderRadius.lg,
              padding: `${tokens.spacing.component.md} ${tokens.spacing.section.xs}`,
              textAlign: "center",
              boxShadow: tokens.shadows.md,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: tokens.typography.h4.size,
                lineHeight: tokens.typography.h4.lineHeight,
                fontWeight: 800,
                color: tokens.colors.neutral.text.primary,
              }}
            >
              Calificación 4.8/5 basada en más de 1500 clientes satisfechos
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
