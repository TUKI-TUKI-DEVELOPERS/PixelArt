export const dynamic = 'force-dynamic';

import Image from "next/image";
import Link from "next/link";
import { Camera, Shield, Sparkles, Heart, Pencil, Award, Truck, Headphones, Plane } from "lucide-react";
import IntroOverlay from "@/components/layout/IntroOverlay";
import HeroBookCarousel from "@/components/Home/HeroBookCarousel";
import type { HeroCarouselBook } from "@/components/Home/HeroBookCarousel";
import CreateBookAccordion from "@/components/Home/CreateBookAccordion";
import NuestrosLibrosSection from "@/components/Home/NuestrosLibrosSection";
import type { Book, BookCategory } from "@/components/Home/NuestrosLibrosSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection";
import BookQualitySection from "@/components/Home/BookQualitySection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import { HOME_ASSET_KEYS } from "@/lib/homeAssetKeys";
import { getAssetUrl } from "@/lib/assetUrl";
import { tokens } from "@/lib/design-tokens";
import { hexToRgba } from "@/lib/colors";

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

/* Separador editorial — el "cambio de capítulo" entre secciones */
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "min(1240px, 92%)",
        margin: "18px auto 0",
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <span style={{ flex: 1, height: "1px", background: tokens.colors.neutral.surface.divider }} />
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: tokens.colors.neutral.text.disabled,
          flexShrink: 0,
        }}
      />
      <span style={{ flex: 1, height: "1px", background: tokens.colors.neutral.surface.divider }} />
    </div>
  );
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

  const loveBookUrl = getAssetUrl(K.ourBooksLove10Razones);
  const loveBookHomeUrl = getAssetUrl(K.ourBooksLove10RazonesHome);
  const familyHeroHomeUrl = getAssetUrl(K.ourBooksFamilyPapaHeroeHome);
  const petAngelUrl = getAssetUrl(K.ourBooksPetsAngel);
  const petAngelHomeUrl = getAssetUrl(K.ourBooksPetsAngelHome);
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
  const grandpaBookHomeUrl = getAssetUrl(K.ourBooksFamilyAbueloHome);
  const grandmaBookHomeUrl = getAssetUrl(K.ourBooksFamilyAbuelaHome);
  const mamaHeroinaHomeUrl = getAssetUrl(K.ourBooksFamilyMamaHeroinaHome);
  const laFamiliaHomeUrl = getAssetUrl(K.ourBooksFamilyLaFamiliaHome);
  const mejorEquipoHomeUrl = getAssetUrl(K.ourBooksFamilyElMejorEquipoHome);
  const miAmorBookHomeUrl = getAssetUrl(K.ourBooksLoveMiAmorHome);
  const aventuraPatasHomeUrl = getAssetUrl(K.ourBooksPetsAventurasHome);
  const love1025HomeUrl = getAssetUrl(K.ourBooksLove1025DiasHome);
  const miauravillosoHomeUrl = getAssetUrl(K.ourBooksPetsMiauravillosoHome);
  const mejorAmigoHomeUrl = getAssetUrl(K.ourBooksPetsMejorAmigoHome);
  const memoriasGraciasHomeUrl = getAssetUrl(K.ourBooksMemoriasGraciasHome);
  const memoriasAngelHomeUrl = getAssetUrl(K.ourBooksMemoriasAngelGuardianHome);
  const memoriasSiempreCorazonHomeUrl = getAssetUrl(K.ourBooksMemoriasSiempreCorazonHome);
  const memoriasSiempreSerasHomeUrl = getAssetUrl(K.ourBooksMemoriasSiempreSerásHome);
  const photobooksHeroCutoutUrl = getAssetUrl(K.photobooksHeroCutout);
  const heroSilkLeftUrl = getAssetUrl(K.heroSilkLeftBackground);
  const whyChooseUsImageUrl = getAssetUrl(K.whyChooseUsImage);
  const bookCoverThickUrl = getAssetUrl(K.bookCoverThick);
  const bookCoverSlimUrl  = getAssetUrl(K.bookCoverSlim);

  const ourClients1Url = getAssetUrl(K.ourClients1);
  const ourClients2Url = getAssetUrl(K.ourClients2);
  const ourClients3Url = getAssetUrl(K.ourClients3);

  const heroBooks: HeroCarouselBook[] = [
    {
      key: "love-10-razones",
      kicker: "Libros de Amor",
      title: "10 Razones por las que Te Amo",
      description:
        "Celebra su historia con más de 21 escenarios cotidianos, divertidos y nostálgicos. Un libro impreso que tu pareja va a guardar para siempre.",
      image: loveBookUrl,
      href: "/libros-personalizados/libros-de-amor/10-razones-por-las-que-te-amo",
      accent: tokens.colors.customBooks.primary,
      price: "S/ 130.00",
    },
    {
      key: "photobook-iquitos",
      kicker: "Photobooks",
      title: "Photobook Iquitos",
      description:
        "La selva, el río y la vida salvaje de la Amazonía peruana en un photobook de tapa dura que celebra el destino más increíble del Perú.",
      image: photobookIquitosUrl,
      href: "/photobooks",
      accent: tokens.colors.photobooks.primary,
      price: "S/ 90.00",
    },
    {
      key: "pets-angel",
      kicker: "Libros de Mascotas",
      title: "Nuestro Ángel de 4 Patas",
      description:
        "El tributo más hermoso a ese peludo que te ama sin condiciones. Cada página conserva su recuerdo con la calidad que merece.",
      image: petAngelUrl,
      href: "/libros-personalizados/libros-de-mascotas/nuestro-angel-de-4-patas",
      accent: tokens.colors.customBooks.primary,
      price: "S/ 130.00",
    },
    {
      key: "photobook-machu-picchu",
      kicker: "Photobooks",
      title: "Photobook Machu Picchu",
      description:
        "Tus viajes en un photobook de tapa dura premium. Impresión en alta resolución para revivir cada momento con máxima calidad.",
      image: photobookMachuPicchuUrl,
      href: "/photobooks",
      accent: tokens.colors.photobooks.primary,
      price: "S/ 90.00",
    },
  ];

  const books: Book[] = [
    {
      title: "10 Razones por las que Te Amo",
      subtitle: "Libro de historia entre tú y esa persona especial",
      description:
        "Celebra el amor a través de escenarios cotidianos, divertidos y nostálgicos. Más de 21 escenarios para crear momentos mágicos únicos.",
      image: loveBookHomeUrl,
      badge: "NEW",
      href: "/libros-personalizados/libros-de-amor/10-razones-por-las-que-te-amo",
      category: "love" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["pareja"],
    },
    {
      title: "Nuestro Ángel de 4 Patas",
      subtitle: "Homenaje a esa mascota que siempre te acompañará",
      description:
        "Crea el tributo más hermoso a ese peludo que te recibe como si fueras una estrella, que te protege y que te ama sin condiciones.",
      image: petAngelHomeUrl,
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
      image: familyHeroHomeUrl,
      href: "/libros-personalizados/libros-de-familia/papa-mi-heroe",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["papa", "hijos"],
    },
    {
      title: "Te Amo, Abuelo",
      subtitle: "Homenaje al vínculo sagrado abuelo-nieto",
      description:
        "Honra el vínculo entre abuelos y nietos, capturando la sabiduría, ternura, historias compartidas y ese amor incondicional único.",
      image: grandpaBookHomeUrl,
      href: "/libros-personalizados/libros-de-familia/te-amo-abuelo",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["abuelos"],
    },
    {
      title: "Te Amo, Abuela",
      subtitle: "Homenaje al amor incondicional de la abuela",
      description:
        "Celebra a esa abuela que llena cada momento de ternura, cariño y sabiduría. Un libro que captura todo lo que la hace tan especial e irremplazable.",
      image: grandmaBookHomeUrl,
      href: "/libros-personalizados/libros-de-familia/te-amo-abuela",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["abuelos"],
    },
    {
      title: "Mamá, Mi Heroína",
      subtitle: "El regalo que tu mamá guardará para siempre",
      description:
        "Un libro donde los hijos celebran a su madre reconociendo todo lo que la hace extraordinaria. Cada página es un abrazo de gratitud y amor eterno.",
      image: mamaHeroinaHomeUrl,
      href: "/libros-personalizados/libros-de-familia/mama-mi-heroina",
      category: "family" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["mama", "hijos"],
    },
    {
      title: "La Familia",
      subtitle: "Porque estando juntos todo es mejor",
      description:
        "Un libro que celebra la unión familiar, capturando los momentos que hacen de tu familia algo único e irrepetible. El regalo perfecto para toda la familia.",
      image: laFamiliaHomeUrl,
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
      image: mejorEquipoHomeUrl,
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
      image: memoriasGraciasHomeUrl,
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
      image: memoriasAngelHomeUrl,
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
      image: memoriasSiempreCorazonHomeUrl,
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
      image: memoriasSiempreSerasHomeUrl,
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
      image: miAmorBookHomeUrl,
      href: "/libros-personalizados/libros-de-amor/mi-amor",
      category: "love" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["pareja"],
    },
    {
      title: "Aventura Entre Patas",
      subtitle: "Celebra la complicidad con tu mascota",
      description:
        "Libro que celebra la diversión y amor incondicional entre la mascota de la familia y los niños del hogar. Aventuras y risas compartidas.",
      image: aventuraPatasHomeUrl,
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
      image: love1025HomeUrl,
      href: "/libros-personalizados/libros-de-amor/1025-dias-enamorandome-de-ti",
      category: "love" as BookCategory,
      price: "S/ 130.00",
      pages: 30,
      paraQuien: ["pareja"],
    },
    {
      title: "Mi Amigo Miauravilloso",
      subtitle: "Tributo a tu felino especial",
      description:
        "Crea el tributo más hermoso a ese felino que te elige, que ronronea en tu regazo, que te mira con ojos hipnóticos y convierte tu casa en su reino.",
      image: miauravillosoHomeUrl,
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
      image: mejorAmigoHomeUrl,
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
        /* Photobooks hero */
        @media (max-width: 1023px) {
          .photobooks-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .photobooks-hero-image { display: none !important; }
          .photobooks-hero-left { max-width: 100% !important; }
        }
        .photobook-cta {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .photobook-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.22) !important;
        }
        .photobook-cta:active {
          transform: translateY(-1px);
        }
        @media (max-width: 767px) {
          .photobooks-hero-grid { padding: 40px 20px !important; }
          .photobook-cta { min-width: unset !important; width: 100% !important; max-width: 340px; }
        }
        @media (min-width: 1281px) {
          .photobooks-hero-image { margin-right: calc(-1 * ((100vw - 1280px) / 2) - 24px); }
        }
        .photobooks-bottom-bar { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1023px) {
          .photobooks-bottom-bar { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .photobooks-bottom-bar { grid-template-columns: 1fr !important; }
        }

      `}</style>
      <IntroOverlay />
      {/* ═══ HERO SECTION — carousel coverflow de libros destacados ═══ */}
      <HeroBookCarousel books={heroBooks} fabricBgUrl={heroSilkLeftUrl} />

      <SectionDivider />

      {/* ═══ BOOKS SECTION ═══ */}
      <NuestrosLibrosSection books={books.map((b) => {
        const priceCents = parsePriceCents(b.price);
        const promoPrice = priceCents !== undefined ? applyBestPromo(priceCents, activePromos) : undefined;
        return { ...b, priceCents, promoPrice };
      })} />

      <SectionDivider />

      {/* ═══ CREATE BOOK ACCORDION — cómo funciona el libro personalizado ═══ */}
      <CreateBookAccordion />

      <SectionDivider />

      {/* ═══ PHOTOBOOKS HERO — mismo lenguaje editorial que el hero principal ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {/* Blob sutil del acento photobooks — mismo recurso que el hero */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "640px",
            height: "420px",
            top: "50%",
            right: "4%",
            transform: "translateY(-50%)",
            backgroundImage: `radial-gradient(closest-side, ${tokens.colors.photobooks.primary} 0%, transparent 72%)`,
            opacity: 0.10,
            pointerEvents: "none",
          }}
        />

        {/* Palabra editorial de fondo — mismo recurso que el hero */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "2%",
            bottom: "5%",
            fontFamily: tokens.fonts.display,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(90px, 14vw, 200px)",
            lineHeight: 1,
            color: "rgba(17, 17, 17, 0.04)",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Viajes
        </div>

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
            gridTemplateColumns: "1fr 1.4fr",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <div className="photobooks-hero-left" style={{ maxWidth: "520px" }}>
            {/* Kicker — misma gramática que el hero */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <span style={{ width: "28px", height: "2px", background: tokens.colors.photobooks.primary }} />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: tokens.colors.photobooks.primary,
                  lineHeight: 1.1,
                }}
              >
                Photobooks
              </span>
            </div>

            <h2
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontFamily: tokens.fonts.display,
                fontSize: "clamp(36px, 4vw, 54px)",
                lineHeight: 1.12,
                fontWeight: 700,
                color: tokens.colors.neutral.text.primary,
                letterSpacing: "-0.01em",
              }}
            >
              Tus viajes merecen un Photobook
            </h2>

            <p
              style={{
                margin: `0 0 ${tokens.spacing.component.md} 0`,
                fontSize: "18px",
                lineHeight: 1.65,
                color: tokens.colors.neutral.text.secondary,
                fontWeight: 400,
                maxWidth: "480px",
              }}
            >
              Los Photobooks de PixelArt convierten tus viajes en recuerdos únicos,
              diseñados para capturar la emoción de cada momento y conservarla para
              toda la vida.
            </p>

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" as const }}>
                <Link
                  href="/photobooks"
                  className="photobook-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "0 32px",
                    minWidth: "240px",
                    height: "54px",
                    borderRadius: "9999px",
                    border: "none",
                    background: tokens.colors.photobooks.primary,
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.16)",
                    textDecoration: "none",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  Crear mi Photobook
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <span style={{ fontSize: "15px", fontWeight: 700, color: tokens.colors.neutral.text.primary }}>
                  Desde S/ 90.00
                </span>
              </div>

              <Link
                href="/photobooks"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "0 28px",
                  width: "fit-content",
                  height: "48px",
                  borderRadius: "9999px",
                  border: `1.5px solid ${tokens.colors.photobooks.primary}`,
                  background: "transparent",
                  color: tokens.colors.photobooks.primary,
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap" as const,
                }}
              >
                <Camera size={17} strokeWidth={2.2} />
                Explorar diseños
              </Link>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const, marginTop: "4px" }}>
                {[
                  { icon: Shield, lines: ["Tapa gruesa", "premium"] },
                  { icon: Sparkles, lines: ["Impresión de", "alta calidad"] },
                  { icon: Heart, lines: ["Recuerdos para", "toda la vida"] },
                ].map(({ icon: Icon, lines }, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "8px 10px",
                      borderRadius: tokens.borderRadius.lg,
                      border: `1px solid ${tokens.colors.neutral.surface.border}`,
                      background: "#ffffff",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        background: hexToRgba(tokens.colors.photobooks.primary, 0.12),
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={13} color={tokens.colors.photobooks.primary} strokeWidth={2.2} />
                    </span>
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: tokens.colors.neutral.text.primary, lineHeight: 1.3, whiteSpace: "nowrap" as const }}>
                      {lines[0]}<br />{lines[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="photobooks-hero-image"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* Mapamundi + avión — motivo decorativo de viaje, muy sutil, detrás de la imagen */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-6%",
                right: "-4%",
                width: "220px",
                height: "220px",
                opacity: 0.08,
                pointerEvents: "none",
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke={tokens.colors.photobooks.primary} strokeWidth="1.2" />
                <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke={tokens.colors.photobooks.primary} strokeWidth="1.2" />
                <ellipse cx="12" cy="12" rx="4.2" ry="10" stroke={tokens.colors.photobooks.primary} strokeWidth="1.2" />
                <line x1="2" y1="12" x2="22" y2="12" stroke={tokens.colors.photobooks.primary} strokeWidth="1.2" />
              </svg>
            </div>
            <div aria-hidden="true" style={{ position: "absolute", top: "-18%", right: "6%", pointerEvents: "none" }}>
              <svg width="90" height="46" viewBox="0 0 90 46" fill="none">
                <path d="M2 40C24 34 50 14 80 6" stroke={tokens.colors.photobooks.primary} strokeWidth="1.4" strokeDasharray="3 5" strokeLinecap="round" opacity="0.3" />
              </svg>
              <Plane
                size={20}
                color={tokens.colors.photobooks.primary}
                strokeWidth={2}
                style={{ position: "absolute", top: "-10px", right: "0px", transform: "rotate(35deg)", opacity: 0.45 }}
              />
            </div>

            {/* Card flotante "Personalizable" */}
            <div
              style={{
                position: "absolute",
                top: "4%",
                right: "2%",
                zIndex: 3,
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                width: "230px",
                padding: "16px 18px",
                background: "#ffffff",
                borderRadius: tokens.borderRadius.xl,
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: hexToRgba(tokens.colors.photobooks.primary, 0.12),
                  flexShrink: 0,
                }}
              >
                <Camera size={18} color={tokens.colors.photobooks.primary} />
              </span>
              <div>
                <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: tokens.colors.neutral.text.primary }}>
                  Personalizable
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: tokens.colors.neutral.text.secondary, lineHeight: 1.4 }}>
                  Más de 20 páginas para tus mejores recuerdos.
                </p>
              </div>
            </div>

            <Image
              src={photobooksHeroCutoutUrl}
              alt="Ejemplo de Photobooks PixelArt"
              width={1241}
              height={760}
              style={{
                width: "100%",
                maxWidth: "1250px",
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 26px 44px rgba(0,0,0,0.18))",
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Barra de confianza — 4 puntos clave del servicio */}
        <div
          className="photobooks-bottom-bar"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: `${tokens.spacing.component.lg} ${tokens.spacing.component.md} ${tokens.spacing.section.md}`,
            display: "grid",
            gap: "24px",
            borderTop: `1px solid ${tokens.colors.neutral.surface.border}`,
          }}
        >
          {[
            { icon: Pencil, title: "Diseño personalizado", desc: "Crea un photobook a tu estilo." },
            { icon: Award, title: "Calidad premium", desc: "Materiales resistentes y acabados impecables." },
            { icon: Truck, title: "Envíos seguros", desc: "A todo el Perú con embalaje protegido." },
            { icon: Headphones, title: "Atención personalizada", desc: "Te acompañamos en cada paso." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: hexToRgba(tokens.colors.photobooks.primary, 0.12),
                }}
              >
                <Icon size={18} color={tokens.colors.photobooks.primary} strokeWidth={2} />
              </span>
              <div>
                <p style={{ margin: 0, fontSize: "14.5px", fontWeight: 700, color: tokens.colors.neutral.text.primary }}>
                  {title}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: "12.5px", color: tokens.colors.neutral.text.secondary, lineHeight: 1.4 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ═══ BOOK QUALITY SECTION — calidad de tapas photobooks ═══ */}
      <BookQualitySection bookCoverThickUrl={bookCoverThickUrl} bookCoverSlimUrl={bookCoverSlimUrl} />

      {/* ═══ WHY CHOOSE US - Icons SVG + Real Copy ═══ */}
      <WhyChooseSection whyChooseUsImageUrl={whyChooseUsImageUrl} />

      <SectionDivider />

      {/* ═══ CLIENT TESTIMONIALS ═══ */}
      <TestimonialsSection clients={clients} />
    </main>
  );
}
