import Image from "next/image";
import Link from "next/link";
import IntroOverlay from "@/components/layout/IntroOverlay";
import HomeHeroClient from "@/components/Home/HomeHeroClient";
import CreateBookAccordion from "@/components/Home/CreateBookAccordion";
import ModernBackground from "@/components/backgrounds/ModernBackground";
import NuestrosLibrosSection from "@/components/Home/NuestrosLibrosSection";
import type { Book, BookCategory } from "@/components/Home/NuestrosLibrosSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import BookQualitySection from "@/components/Home/BookQualitySection";
import { PIXELART_COLORS } from "@/lib/colors";
import IdentityBackground from "@/components/backgrounds/IdentityBackground";
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


type ActivePromo = {
  targetType: string;
  discountType: string;
  discountValue: number;
};

function parsePriceCents(priceStr?: string): number | undefined {
  if (!priceStr) return undefined;
  const match = priceStr.match(/([\d.]+)/);
  return match ? Math.round(parseFloat(match[1]) * 100) : undefined;
}

function applyBestPromo(priceCents: number, promos: ActivePromo[]): number | undefined {
  const applicable = promos.filter((p) => p.targetType === 'all');
  if (!applicable.length) return undefined;
  let best = priceCents;
  for (const p of applicable) {
    const result = p.discountType === 'percent'
      ? Math.round(priceCents * (1 - p.discountValue / 100))
      : Math.max(0, priceCents - p.discountValue);
    if (result < best) best = result;
  }
  return best < priceCents ? best : undefined;
}

export default async function HomePage() {
  const K = HOME_ASSET_KEYS;

  const activePromos: ActivePromo[] = await fetch('http://api:3001/api/promotions/active', {
    next: { revalidate: 60 },
  }).then((r) => r.ok ? r.json() : []).catch(() => []);

  // URLs construidas directamente — sin fetch al backend
  const customBookCarouselUrl = getAssetUrl(K.heroAIBookCarousel);
  const customBookSliderUrl = getAssetUrl(K.heroAIBookSlider);
  const photobookSliderUrl = getAssetUrl(K.heroPhotobookSlider);
  const photobookCarouselUrl = getAssetUrl(K.heroPhotobookCarousel);

  const logoUrl = getAssetUrl(K.logo);

  const loveBookUrl = getAssetUrl(K.ourBooksLove10Razones);
  const familyHeroUrl = getAssetUrl(K.ourBooksFamilyPapaHeroe);
  const petAngelUrl = getAssetUrl(K.ourBooksPetsAngel);
  const photobookMachuPicchuUrl = getAssetUrl(K.ourBooksPhotobooksMachuPicchu);
  const photobookParisUrl       = getAssetUrl(K.ourBooksPhotobooksParis);
  const photobookNuevaYorkUrl   = getAssetUrl(K.ourBooksPhotobooksNuevaYork);
  const photobookRomaUrl        = getAssetUrl(K.ourBooksPhotobooksRoma);
  const photobookAmsterdamUrl   = getAssetUrl(K.ourBooksPhotobooksAmsterdam);
  const photobookBangkokUrl     = getAssetUrl(K.ourBooksPhotobooksBangkok);
  const photobookChichenUrl     = getAssetUrl(K.ourBooksPhotobooksChichenItza);
  const photobookIquitosUrl     = getAssetUrl(K.ourBooksPhotobooksIquitos);
  const photobookJamaicaUrl     = getAssetUrl(K.ourBooksPhotobooksJamaica);
  const photobookMiamiUrl       = getAssetUrl(K.ourBooksPhotobooksMiami);
  const photobookPuntaCanaUrl   = getAssetUrl(K.ourBooksPhotobooksPuntaCana);
  const photobookRioUrl         = getAssetUrl(K.ourBooksPhotobooksRioJaneiro);
  const grandpaBookUrl = getAssetUrl(K.ourBooksFamilyAbuelo);
  const grandmaBookUrl = getAssetUrl(K.ourBooksFamilyAbuela);
  const mamaHeroinaUrl = getAssetUrl(K.ourBooksFamilyMamaHeroina);
  const laFamiliaUrl   = getAssetUrl(K.ourBooksFamilyLaFamilia);
  const mejorEquipoUrl = getAssetUrl(K.ourBooksFamilyElMejorEquipo);
  const miAmorBookUrl = getAssetUrl(K.ourBooksLoveMiAmor);
  const aventuraPatasUrl = getAssetUrl(K.ourBooksPetsAventuras);
  const love1025Url = getAssetUrl(K.ourBooksLove1025Dias);
  const miauravillosoUrl = getAssetUrl(K.ourBooksPetsMiauravilloso);
  const mejorAmigoUrl = getAssetUrl(K.ourBooksPetsMejorAmigo);
  const memoriasGraciasUrl = getAssetUrl(K.ourBooksMemoriasGracias);
  const memoriasAngelUrl = getAssetUrl(K.ourBooksMemoriasAngelGuardian);
  const memoriasSiempreCorazonUrl = getAssetUrl(K.ourBooksMemoriasSiempreCorazon);
  const memoriasSiempreSerasUrl = getAssetUrl(K.ourBooksMemoriasSiempreSerás);
  const photobooksExampleUrl = getAssetUrl(K.photobooksExample);
  const whyChooseUsImageUrl = getAssetUrl(K.whyChooseUsImage);
  const bookCoverThickUrl = getAssetUrl(K.bookCoverThick);
  const bookCoverSlimUrl  = getAssetUrl(K.bookCoverSlim);
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
      price: "S/ 130.00",
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
      price: "S/ 130.00",
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
      price: "S/ 90.00",
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
      price: "S/ 90.00",
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
      price: "S/ 90.00",
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
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Amsterdam",
      subtitle: "Canales, flores y tus mejores momentos",
      description:
        "La magia de los canales, los tulipanes y la arquitectura única de Amsterdam en un photobook de calidad premium. Un recuerdo europeo inigualable.",
      image: photobookAmsterdamUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Bangkok",
      subtitle: "El exotismo del sudeste asiático",
      description:
        "Templos dorados, sabores únicos y energía inigualable. Inmortaliza tu aventura por Bangkok en un photobook que captura todo su misticismo.",
      image: photobookBangkokUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Chichen Itzá",
      subtitle: "La maravilla maya en tus páginas",
      description:
        "La imponente pirámide de Kukulkán y la magia de la civilización maya capturadas en un photobook de calidad superior. Historia viva en cada imagen.",
      image: photobookChichenUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Iquitos",
      subtitle: "La Amazonía peruana en todo su esplendor",
      description:
        "La selva, el río y la vida salvaje del Amazonas peruano en un photobook que celebra la biodiversidad más increíble del planeta.",
      image: photobookIquitosUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Jamaica",
      subtitle: "Playas, ritmo y color caribeño",
      description:
        "El paraíso caribeño con sus playas de arena blanca, aguas turquesas y el ritmo del reggae plasmados en un photobook vibrante y lleno de color.",
      image: photobookJamaicaUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Miami",
      subtitle: "Sol, playa y estilo en cada página",
      description:
        "Las playas de South Beach, el Art Deco y la energía vibrante de Miami capturadas en un photobook que irradia vida, color y estilo.",
      image: photobookMiamiUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Punta Cana",
      subtitle: "El paraíso dominicano en tus manos",
      description:
        "Cocoteros, aguas cristalinas y atardeceres únicos del Caribe dominicano. Un photobook que revive cada instante de ese destino soñado.",
      image: photobookPuntaCanaUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
      pages: 24,
    },
    {
      title: "Photobook Río de Janeiro",
      subtitle: "La ciudad maravillosa en cada imagen",
      description:
        "El Cristo Redentor, las playas de Copacabana e Ipanema y la energía única de Río capturadas en un photobook que celebra una ciudad única en el mundo.",
      image: photobookRioUrl,
      href: "/photobooks",
      category: "photobooks" as BookCategory,
      price: "S/ 90.00",
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
      price: "S/ 130.00",
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
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "Te Amo, Abuela",
      subtitle: "Homenaje al amor incondicional de la abuela",
      description:
        "Celebra a esa abuela que llena cada momento de ternura, cariño y sabiduría. Un libro que captura todo lo que la hace tan especial e irremplazable.",
      image: grandmaBookUrl,
      href: "/libros-personalizados/libros-de-familia/te-amo-abuela",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "Mamá, Mi Heroína",
      subtitle: "El regalo que tu mamá guardará para siempre",
      description:
        "Un libro donde los hijos celebran a su madre reconociendo todo lo que la hace extraordinaria. Cada página es un abrazo de gratitud y amor eterno.",
      image: mamaHeroinaUrl,
      href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "La Familia",
      subtitle: "Porque estando juntos todo es mejor",
      description:
        "Un libro que celebra la unión familiar, capturando los momentos que hacen de tu familia algo único e irrepetible. El regalo perfecto para toda la familia.",
      image: laFamiliaUrl,
      href: "/libros-personalizados/libros-de-familia/la-familia",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "El Mejor Equipo",
      subtitle: "La unión que lo puede todo",
      description:
        "Celebra ese equipo que se apoya, ríe y crece junto. Un libro que refleja la complicidad y el amor que hacen de tu familia el mejor equipo del mundo.",
      image: mejorEquipoUrl,
      href: "/libros-personalizados/libros-de-familia/el-mejor-equipo",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "Gracias por Tu Amor",
      subtitle: "Homenaje a quien siempre estará en tu corazón",
      description:
        "Un libro para honrar a esa persona especial que dejó una huella imborrable. Cada página celebra los momentos únicos que compartieron juntos.",
      image: memoriasGraciasUrl,
      href: "/libros-personalizados/libros-de-memorias-familiares/gracias-por-tu-amor",
      category: "memories" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "Mi Ángel Guardián",
      subtitle: "Para quienes cuidan desde el cielo",
      description:
        "Un homenaje lleno de amor para esa persona que, aunque ya no está, sigue siendo tu ángel. Un recuerdo que preserva su presencia para siempre.",
      image: memoriasAngelUrl,
      href: "/libros-personalizados/libros-de-memorias-familiares/mi-angel-guardian",
      category: "memories" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "Siempre en Mi Corazón",
      subtitle: "Porque el amor no tiene fin",
      description:
        "Un libro de memorias que preserva los recuerdos más preciados de quien amaste. Porque algunas personas dejan una marca eterna en el corazón.",
      image: memoriasSiempreCorazonUrl,
      href: "/libros-personalizados/libros-de-memorias-familiares/siempre-en-mi-corazon",
      category: "memories" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
    },
    {
      title: "Siempre Serás Parte de Mi Corazón",
      subtitle: "Un legado de amor que perdura",
      description:
        "Celebra la vida y el amor de esa persona que siempre será parte de ti. Cada página es un tributo a los momentos que los unieron para siempre.",
      image: memoriasSiempreSerasUrl,
      href: "/libros-personalizados/libros-de-memorias-familiares/siempre-seras-parte-de-mi",
      category: "memories" as BookCategory,
      price: "S/ 130.00",
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
      price: "S/ 130.00",
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
      price: "S/ 130.00",
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
      price: "S/ 130.00",
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
      price: "S/ 130.00",
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
      price: "S/ 130.00",
      pages: 30,
    },
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
  ];

  return (
    <main
      style={{
        background: tokens.colors.neutral.surface.base,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        /* Identity */
        @media (max-width: 767px) {
          .identity-card { padding: 24px 20px !important; }
          .identity-logo { font-size: 44px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .identity-card { padding: 32px 40px !important; }
          .identity-logo { font-size: 56px !important; }
        }

        /* Photobooks hero */
        @media (max-width: 1023px) {
          .photobooks-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .photobooks-hero-image { display: none !important; }
          .photobooks-hero-left { max-width: 100% !important; }
        }
        @media (max-width: 767px) {
          .photobooks-hero-grid { padding: 40px 20px !important; }
          .photobook-cta { min-width: unset !important; width: 100% !important; max-width: 340px; }
        }

        /* Stepper */
        @media (min-width: 768px) and (max-width: 1023px) {
          .stepper-grid { grid-template-columns: 1fr 1fr !important; }
          .stepper-connector { display: none !important; }
        }
        @media (max-width: 767px) {
          .stepper-grid { grid-template-columns: 1fr !important; }
          .stepper-connector { display: none !important; }
        }

        /* Testimonials */
        @media (min-width: 768px) and (max-width: 1023px) {
          .testimonials-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .testimonials-metrics { flex-direction: column !important; gap: 16px !important; }
          .metrics-separator { display: none !important; }
        }
      `}</style>
      <IntroOverlay />
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
          background: "radial-gradient(circle at center, #ffffff 0%, #D9AF62 42%)",
          overflow: "hidden",
        }}
      >
        <IdentityBackground />
        <div
          className="identity-card"
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
          {/* Logo multicolor */}
          <h2
            className="identity-logo"
            style={{
              margin: `0 0 ${tokens.spacing.component.xs} 0`,
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-1px",
              lineHeight: 1,
              userSelect: "none",
            }}
            aria-label="PixelArt"
          >
            <span style={{ color: PIXELART_COLORS.P_RED }}>P</span>
            <span style={{ color: PIXELART_COLORS.I_ORANGE }}>I</span>
            <span style={{ color: PIXELART_COLORS.X_YELLOW }}>X</span>
            <span style={{ color: PIXELART_COLORS.E_GREEN }}>E</span>
            <span style={{ color: PIXELART_COLORS.L_PURPLE }}>L</span>
            <span style={{ color: PIXELART_COLORS.A_BLUE }}>A</span>
            <span style={{ color: PIXELART_COLORS.R_PINK }}>R</span>
            <span style={{ color: PIXELART_COLORS.T_TURQUOISE }}>T</span>
          </h2>

          {/* Tagline */}
          <p
            style={{
              margin: `0 0 ${tokens.spacing.component.md} 0`,
              fontSize: tokens.typography.h3.size,
              fontWeight: 700,
              color: tokens.colors.neutral.text.primary,
              letterSpacing: "-0.3px",
            }}
          >
            Tus momentos, para siempre.
          </p>

          {/* Separador dorado */}
          <div style={{
            width: "120px",
            height: "3px",
            background: "linear-gradient(90deg, transparent, #D9AF62, transparent)",
            borderRadius: "2px",
            margin: `0 auto ${tokens.spacing.component.md}`,
          }} />

          {/* B — Manifiesto */}
          <p
            style={{
              margin: `0 0 ${tokens.spacing.component.md} 0`,
              fontSize: "22px",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.6,
              color: tokens.colors.neutral.text.secondary,
              maxWidth: "640px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            "Cada foto cuenta una historia.{" "}
            <strong style={{ color: tokens.colors.neutral.text.primary, fontStyle: "normal" }}>
              Nosotros la convertimos en un libro.
            </strong>"
          </p>

          {/* Separador dorado */}
          <div style={{
            width: "120px",
            height: "3px",
            background: "linear-gradient(90deg, transparent, #D9AF62, transparent)",
            borderRadius: "2px",
            margin: `0 auto ${tokens.spacing.component.md}`,
          }} />

          {/* C — Propuesta de valor + dos productos */}
          <p
            style={{
              margin: `0 0 ${tokens.spacing.component.md} 0`,
              fontSize: tokens.typography.h3.size,
              fontWeight: 800,
              color: tokens.colors.neutral.text.primary,
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
            }}
          >
            Dos formas de preservar lo que más amas
          </p>
        </div>
      </section>

      {/* ═══ BOOKS SECTION ═══ */}
      <NuestrosLibrosSection books={books.map((b) => {
        const priceCents = parsePriceCents(b.price);
        const promoPrice = priceCents !== undefined ? applyBestPromo(priceCents, activePromos) : undefined;
        return { ...b, priceCents, promoPrice };
      })} />

      {/* ═══ PHOTOBOOKS HERO + COMO FUNCIONA (sección unificada) ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Background image compartida */}
        <Image
          src={photobooksSectionBgUrl}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
          loading="lazy"
        />
        {/* Overlay 1: gradiente lateral para el hero (izquierda oscura) */}
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
        {/* Overlay 2: capa oscura que aparece en la parte inferior para el stepper */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 38%, rgba(8, 28, 62, 0.90) 68%, rgba(8, 28, 62, 0.95) 100%)",
            zIndex: 1,
          }}
        />

        {/* ── Hero content ── */}
        <div
          className="photobooks-hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <div className="photobooks-hero-left" style={{ maxWidth: "520px" }}>
            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontSize: tokens.typography.h1.size,
                lineHeight: 1,
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
                margin: `0 0 ${tokens.spacing.component.md} 0`,
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

            {/* Feature chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: tokens.spacing.component.md,
              }}
            >
              {["Alta resolución", "Tapa dura", "24-72 páginas", "Envío a Lima"].map((feat) => (
                <span
                  key={feat}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    borderRadius: "9999px",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    backdropFilter: "blur(4px)",
                    letterSpacing: "0.2px",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feat}
                </span>
              ))}
            </div>

            {/* Social counter */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                background: "rgba(255,255,255,0.12)",
                borderLeft: "3px solid rgba(255,255,255,0.7)",
                borderRadius: "0 8px 8px 0",
                marginBottom: tokens.spacing.section.sm,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"/>
              </svg>
              <div>
                <div style={{ color: "#fff", fontSize: "17px", fontWeight: 800, lineHeight: 1.1 }}>
                  +2,400 photobooks entregados
                </div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", fontWeight: 500, marginTop: "2px" }}>
                  y contando — cada uno, un recuerdo único
                </div>
              </div>
            </div>

            <Link
              href="/photobooks"
              className="photobook-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
                textDecoration: "none",
              }}
            >
              Comenzar Photobook
            </Link>
          </div>

          <div
            className="photobooks-hero-image"
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

        {/* ── Separador visual interno ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            height: "1px",
            background: "rgba(255,255,255,0.18)",
          }}
        />

        {/* ── Como funciona (stepper glassmorphism) ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: `${tokens.spacing.section.sm} ${tokens.spacing.component.md} ${tokens.spacing.section.lg}`,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: tokens.spacing.section.xs }}>
            <p
              style={{
                margin: `0 0 ${tokens.spacing.micro.sm} 0`,
                fontSize: tokens.typography.small.size,
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Fácil y rápido
            </p>
            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.xs} 0`,
                fontSize: tokens.typography.h1.size,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-1px",
                textShadow: "0 2px 16px rgba(0,0,0,0.3)",
              }}
            >
              Cómo funciona
            </h2>
            <div
              style={{
                width: "64px",
                height: "3px",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "2px",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Steps grid */}
          <div
            className="stepper-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "24px",
              position: "relative",
            }}
          >
            {/* Connector line */}
            <div
              className="stepper-connector"
              style={{
                position: "absolute",
                top: "44px",
                left: "calc(33.33% - 16px)",
                right: "calc(33.33% - 16px)",
                height: "1px",
                background: "rgba(255,255,255,0.25)",
                pointerEvents: "none",
              }}
            />

            {/* Step 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: `${tokens.spacing.section.xs} ${tokens.spacing.component.md}`,
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: tokens.borderRadius["2xl"],
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: tokens.spacing.component.md,
                  flexShrink: 0,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.8"/>
                </svg>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: tokens.spacing.micro.sm,
                }}
              >
                Paso 01
              </div>
              <h3
                style={{
                  margin: `0 0 ${tokens.spacing.component.xs} 0`,
                  fontSize: tokens.typography.h3.size,
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                Sube tus fotos
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: tokens.typography.body.size,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                Selecciona las mejores fotos de tus viajes o momentos especiales. Aceptamos todos los formatos de alta resolución.
              </p>
            </div>

            {/* Step 2 — destacado */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: `${tokens.spacing.section.xs} ${tokens.spacing.component.md}`,
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: tokens.borderRadius["2xl"],
                border: "1px solid rgba(255,255,255,0.38)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: tokens.spacing.component.md,
                  flexShrink: 0,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20h9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: tokens.spacing.micro.sm,
                }}
              >
                Paso 02
              </div>
              <h3
                style={{
                  margin: `0 0 ${tokens.spacing.component.xs} 0`,
                  fontSize: tokens.typography.h3.size,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Elige tu diseño
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: tokens.typography.body.size,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                Escoge entre nuestras plantillas profesionales, elige la tapa y personaliza cada página a tu gusto.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: `${tokens.spacing.section.xs} ${tokens.spacing.component.md}`,
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: tokens.borderRadius["2xl"],
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: tokens.spacing.component.md,
                  flexShrink: 0,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21V12h6v9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  marginBottom: tokens.spacing.micro.sm,
                }}
              >
                Paso 03
              </div>
              <h3
                style={{
                  margin: `0 0 ${tokens.spacing.component.xs} 0`,
                  fontSize: tokens.typography.h3.size,
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                Lo recibes en casa
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: tokens.typography.body.size,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                Imprimimos con la máxima calidad y te lo enviamos a domicilio en Lima. Tu recuerdo, listo para atesorar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US - Icons SVG + Real Copy ═══ */}
      <WhyChooseSection logoUrl={logoUrl} whyChooseUsImageUrl={whyChooseUsImageUrl} />

      {/* ═══ BOOK QUALITY SECTION ═══ */}
      <BookQualitySection bookCoverThickUrl={bookCoverThickUrl} bookCoverSlimUrl={bookCoverSlimUrl} />
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
      <style>{`
        @keyframes clientsBgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <section
        style={{
          position: "relative",
          width: "100%",
          padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
          backgroundImage: "linear-gradient(45deg, #2196F3 0%, #010b14 100%)",
          backgroundSize: "200% 200%",
          animation: "clientsBgShift 6s ease infinite",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1060px",
            margin: "0 auto",
          }}
        >
          {/* Header — mismo patrón eyebrow + título que el resto de secciones */}
          <div style={{ textAlign: "center", marginBottom: tokens.spacing.section.xs }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "28px",
                  borderRadius: "2px",
                  background: tokens.colors.customBooks.gradient,
                }}
              />
              <span
                style={{
                  fontSize: tokens.typography.caption.size,
                  fontWeight: 700,
                  color: "#f87171",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Testimonios reales
              </span>
            </div>

            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.xs} 0`,
                fontSize: tokens.typography.h2.size,
                lineHeight: 1.15,
                fontWeight: 900,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              Nuestros clientes
              <br />
              <span style={{ color: "#f87171" }}>nos respaldan</span>
            </h2>

            <div
              aria-hidden="true"
              style={{
                width: "56px",
                height: "3px",
                borderRadius: "9999px",
                background: tokens.colors.customBooks.gradient,
                margin: "0 auto",
              }}
            />
          </div>

          {/* Grid de tarjetas — glassmorphism */}
          <div
            className="testimonials-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: tokens.spacing.component.md,
              marginBottom: tokens.spacing.section.sm,
            }}
          >
            {clients.map((client, idx) => (
              <article
                key={`${client.name}-${idx}`}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: tokens.borderRadius.xl,
                  padding: tokens.spacing.component.md,
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                {/* Header de la card — foto + nombre + estrellas en fila */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "14px",
                  }}
                >
                  <Image
                    src={client.image}
                    alt={client.name}
                    width={56}
                    height={56}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      flexShrink: 0,
                      border: "2px solid rgba(255,255,255,0.25)",
                    }}
                    loading="lazy"
                  />
                  <div>
                    <h3
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: tokens.typography.small.size,
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.3,
                      }}
                    >
                      {client.name}
                    </h3>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {Array.from({ length: client.rating }, (_, i) => (
                        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f5a623" stroke="none" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      {Array.from({ length: 5 - client.rating }, (_, i) => (
                        <svg key={i + client.rating} width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)" stroke="none" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comilla decorativa */}
                <div
                  style={{
                    fontSize: "32px",
                    lineHeight: 1,
                    color: "rgba(248,113,113,0.5)",
                    marginBottom: "6px",
                    userSelect: "none",
                  }}
                >
                  &ldquo;
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.80)",
                  }}
                >
                  {client.review}
                </p>
              </article>
            ))}
          </div>

          {/* Métricas inline — sin recuadro pesado */}
          <div
            className="testimonials-metrics"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: tokens.spacing.section.xs,
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>4.8</div>
              <div style={{ display: "flex", gap: "2px", justifyContent: "center", margin: "4px 0" }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" stroke="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Calificación</div>
            </div>

            <div className="metrics-separator" style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.15)" }} />

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>+1500</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500, marginTop: "8px" }}>Clientes satisfechos</div>
            </div>

            <div className="metrics-separator" style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.15)" }} />

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>+2400</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500, marginTop: "8px" }}>Libros entregados</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
