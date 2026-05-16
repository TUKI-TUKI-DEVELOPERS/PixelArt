"use client";

import { useState, useRef, useEffect } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhotobookThemeApi } from "@/lib/api/photobook";
import PixelArtLogo from "@/components/layout/PixelArtLogo";

/* ── Datos de portadas/temas de photobooks ── */

type PhotobookTheme = {
  id: string;
  dbName: string;
  name: string;
  description: string;
  reviews: number;
  badge: string;
  coverPreviewUrl?: string;
};

const PHOTOBOOK_THEMES: Omit<PhotobookTheme, "coverPreviewUrl">[] = [
  {
    id: "portada-francesa-flores",
    dbName: "Francia",
    name: "Portada Francesa de Flores",
    description:
      "Un photobook creado para que tus recuerdos en Francia encuentren su espacio, diseño editorial, elegancia atemporal y el protagonismo absoluto de tus propias fotografías.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-chichen-itza",
    dbName: "México",
    name: "Portada Chichén Itzá",
    description:
      "Un photobook pensado para preservar tus recuerdos en México con elegancia y equilibrio, el diseño enmarca. Las fotografías hablan y la historia siempre es tuya.",
    reviews: 220,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-nueva-york",
    dbName: "Nueva York",
    name: "Portada Ciudad Nueva York",
    description:
      "Un photobook pensado para guardar lo que la ciudad despertó en ti. Cada imagen ocupa su lugar con claridad y carácter, en un diseño sobrio que deja que los recuerdos hablen.",
    reviews: 210,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-coliseo-romano",
    dbName: "Roma",
    name: "Portada Coliseo Romano",
    description:
      "Un photobook que reúne tus recuerdos en Roma con equilibrio y sobriedad. Clásico en espíritu, contemporáneo en diseño, cada fotografía encuentra aquí un marco que realza su fuerza.",
    reviews: 420,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-pais-vientos",
    dbName: "Holanda",
    name: "Portada País de los Vientos",
    description:
      "Un álbum pensado para conservar tus momentos en Holanda con claridad y frescura. Ligero, limpio y visualmente armónico, permite que cada fotografía destaque con naturalidad.",
    reviews: 320,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-thailandia",
    dbName: "Thailandia",
    name: "Portada Thailandia",
    description:
      "Un photobook creado para preservar tu experiencia en Thailandia con profundidad y atmósfera. Sutil y refinado, equilibra intensidad visual y serenidad.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-rio-janeiro",
    dbName: "Río de Janeiro",
    name: "Portada Rio de Janeiro",
    description:
      "Un photobook que reúne tus recuerdos en Rio de Janeiro con energía y equilibrio. Vibrante pero sofisticado. La ciudad aporta movimiento pero tus fotografías le dan significado.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-iquitos",
    dbName: "Iquitos",
    name: "Portada de Visita a Iquitos",
    description:
      "Un photobook pensado para preservar tus momentos en Iquitos con calma y profundidad. Natural y envolvente, ofrece el espacio necesario para que cada imagen conserve su atmósfera.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-machu-picchu",
    dbName: "Machu Picchu",
    name: "Portada Machu Picchu",
    description:
      "Un photobook que conserva tus recuerdos en Machu Picchu con sobriedad y carácter. Diseñado para resaltar la fuerza visual del imperio incaico.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-punta-cana",
    dbName: "Punta Cana",
    name: "Portada Punta Cana",
    description:
      "Un álbum creado para enmarcar tus días en Punta Cana con ligereza y claridad. Su estética luminosa permite que cada fotografía fluya con naturalidad y armonía.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-jamaica",
    dbName: "Jamaica",
    name: "Portada Jamaica",
    description:
      "Un photobook pensado para conservar tus recuerdos en Jamaica con profundidad y ritmo. Equilibrado y refinado. La energía está en el entorno y la historia permanece en tus imágenes.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
  {
    id: "portada-miami",
    dbName: "Miami",
    name: "Portada Miami",
    description:
      "Un álbum diseñado para capturar la luz y el carácter de tu viaje en Miami. Moderno y luminoso, crea una composición limpia donde cada fotografía respira con naturalidad.",
    reviews: 120,
    badge: "PHOTOBOOK VIAJE",
  },
];

/* ── Sección calidad ── */
const QUALITY_BLOCKS = [
  {
    title: "Impreso para durar toda la vida.",
    subtitle: "Sostén tus recuerdos con orgullo. Hay viajes que merecen quedarse contigo para siempre.",
  },
  {
    title: "Los libros son un recuerdo eterno",
    subtitle: "Un destino puede inspirar. Tus recuerdos lo convierten en algo eterno.",
  },
  {
    title: "Detalle en cada parte",
    subtitle: "Cada página guarda algo que el tiempo no debería borrar.",
  },
];

/* ── FAQ ── */
const FAQ_ITEMS = [
  {
    question: "¿Cómo funciona los Photobooks PixelArt?",
    answer:
      "Subes tus fotos, eliges el destino o diseño que prefieras y nosotros transformamos tus recuerdos en un photobook listo para imprimir. El proceso es simple, guiado y pensado para que el resultado sea elegante y profesional.",
  },
  {
    question: "¿Tengo que diseñar el álbum yo mismo?",
    answer:
      "No necesitas experiencia en diseño. Las plantillas están preparadas para que tus fotografías encajen de forma natural y estética.",
  },
  {
    question: "¿Qué calidad tienen los libros?",
    answer:
      "Nuestros photobooks son de tapa dura, acabado mate y papel de alta calidad. Están pensados para durar y conservar tus recuerdos por años.",
  },
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer:
      "El tiempo de producción e impresión es corto. Luego se suma el tiempo de envío según tu ubicación. Siempre recibirás una estimación clara antes de confirmar tu compra.",
  },
  {
    question: "¿Las fotos pierden calidad al imprimir?",
    answer:
      "No. Trabajamos con estándares de impresión de alta resolución para mantener nitidez y fidelidad de color.",
  },
];

const ACCENT = "#804187";
const ACCENT_LIGHT = "#049eff";
const INITIAL_VISIBLE = 6;

/* ══════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════ */

type Props = {
  apiThemes: PhotobookThemeApi[];
  heroImageUrl?: string | null;
  qualityImageUrls?: string[];
  memoriesImageUrls?: string[];
  faqImageUrl?: string | null;
};

export default function PhotobooksClient({ apiThemes, heroImageUrl, qualityImageUrls = [], memoriesImageUrls = [], faqImageUrl }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const { isMobile, isTablet } = useWindowSize();
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroBgRef.current || !heroSectionRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroSectionRef.current.offsetHeight;
      if (scrollY <= heroHeight) {
        heroBgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".quality-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay ?? "0");
            setTimeout(() => el.classList.add("visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const themes: PhotobookTheme[] = PHOTOBOOK_THEMES.map((t) => {
    const apiTheme = apiThemes.find((a) => a.name === t.dbName);
    return { ...t, coverPreviewUrl: apiTheme?.coverPreviewUrl };
  });

  const visibleThemes = themes.slice(0, visibleCount);
  const hasMore = visibleCount < PHOTOBOOK_THEMES.length;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <style>{`
        @keyframes heroZoom {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }
      `}</style>
      <section
        ref={heroSectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "520px" : "620px",
          overflow: "hidden",
        }}
      >
        {/* Background — parallax wrapper (JS translateY) */}
        <div
          ref={heroBgRef}
          style={{
            position: "absolute",
            top: "-15%",
            left: 0,
            right: 0,
            bottom: "-15%",
            willChange: "transform",
          }}
        >
          {/* Zoom in/out layer (CSS animation) */}
          <div style={{ width: "100%", height: "100%", animation: "heroZoom 10s ease-in-out infinite" }}>
            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#1a1a2e" }} />
            )}
          </div>
        </div>

        {/* Overlay neutral oscuro */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(12,12,16,0.30) 0%, rgba(12,12,16,0.65) 100%)",
            zIndex: 1,
          }}
        />

        {/* Contenido centrado */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: isMobile ? "0 24px" : "0 48px",
            gap: "18px",
          }}
        >
          <PixelArtLogo width={isMobile ? 180 : 280} animated={false} />

          <h1
            style={{
              margin: 0,
              fontSize: isMobile ? "26px" : "36px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              maxWidth: "820px",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Plasma tus mejores recuerdos<br />en un álbum de calidad, con tan solo unos clicks.
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.82)",
              maxWidth: "820px",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
            }}
          >
            En su versión de Photobooks, PIXELART permite realizar la impresión de álbumes<br />con fotos que tengas listas para ser subidas de forma digital.
          </p>

          <button
            onClick={() => {
              document.getElementById("catalogo-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              marginTop: "6px",
              padding: "16px 40px",
              borderRadius: "14px",
              border: "1.5px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#fff",
              fontSize: "17px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Comenzar mi diseño
          </button>
        </div>
      </section>

      {/* ═══ CATÁLOGO DE PORTADAS ═══ */}
      <section
        id="catalogo-section"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "48px 24px" : isTablet ? "60px 32px" : "72px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "14px",
              fontWeight: 700,
              color: ACCENT,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            RECUERDOS QUE DURARÁN PARA SIEMPRE
          </p>
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "36px",
              fontWeight: 700,
              color: "#111",
              textTransform: "uppercase",
            }}
          >
            Escoge el diseño que más te guste
          </h2>
          <div
            style={{
              width: "80px",
              height: "3px",
              background: ACCENT,
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Grid de portadas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            columnGap: "32px",
            rowGap: "40px",
            alignItems: "start",
          }}
        >
          {visibleThemes.map((theme) => (
            <PhotobookCard key={theme.id} theme={theme} />
          ))}
        </div>

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
                border: `2px solid ${ACCENT}`,
                background: "#fff",
                color: ACCENT,
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "inherit",
              }}
            >
              Ver Más
            </button>
          </div>
        )}
      </section>

      {/* ═══ SECCIÓN CALIDAD ═══ */}
      <style>{`
        .quality-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .quality-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .quality-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #eee;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .quality-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.10);
        }
        .quality-img {
          transition: transform 0.4s ease;
        }
        .quality-card:hover .quality-img {
          transform: scale(1.06);
        }
      `}</style>
      <section
        style={{
          background: "#fafafa",
          padding: isMobile ? "48px 24px" : isTablet ? "60px 32px" : "72px 48px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Título */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-block",
              padding: "5px 16px",
              borderRadius: "20px",
              background: `${ACCENT}18`,
              color: ACCENT,
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "16px",
            }}>
              Calidad que se siente
            </div>
            <h2 style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 700,
              color: "#111",
              lineHeight: 1.2,
            }}>
              Cada detalle importa.
            </h2>
          </div>

          {/* Grid de cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "32px" }}>
            {QUALITY_BLOCKS.map((block, i) => (
              <div
                key={i}
                className="quality-reveal"
                data-delay={String(i * 160)}
                style={{ height: "100%" }}
              >
                <article className="quality-card">
                  <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
                    {qualityImageUrls[i] ? (
                      <img
                        src={qualityImageUrls[i]}
                        alt={block.title}
                        className="quality-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)` }} />
                    )}
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#111", margin: "0 0 8px 0" }}>
                      {block.title}
                    </h3>
                    <p style={{ fontSize: "14px", lineHeight: 1.5, color: "#888", margin: 0 }}>
                      {block.subtitle}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRECIOS ═══ */}
      <PricingSection />

      {/* ═══ SECCIÓN MEMORIES FOREVER ═══ */}
      <style>{`
        .memory-img-wrap {
          overflow: hidden;
          border-radius: 16px;
          flex: 1;
        }
        .memory-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .memory-img-wrap:hover .memory-img {
          transform: scale(1.08);
        }
      `}</style>
      <section style={{ background: "#fff", padding: isMobile ? "48px 24px" : isTablet ? "60px 32px" : "80px 48px" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

          {/* Título */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 700,
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "1px",
              lineHeight: 1.2,
            }}>
              Recuerdos que durarán<br />para siempre
            </h2>
            <div style={{
              width: "64px",
              height: "3px",
              background: ACCENT,
              borderRadius: "2px",
              margin: "20px auto 0",
            }} />
          </div>

          {/* 4 imágenes equidistantes */}
          <div style={{
            display: "flex",
            gap: "24px",
            height: isMobile || isTablet ? "auto" : "420px",
            flexWrap: isMobile || isTablet ? "wrap" : "nowrap",
          }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="memory-img-wrap" style={{ flex: isMobile || isTablet ? "0 0 calc(50% - 12px)" : 1, height: isMobile || isTablet ? "220px" : "100%" }}>
                {memoriesImageUrls[i] ? (
                  <img
                    src={memoriesImageUrls[i]}
                    alt={`Recuerdo ${i + 1}`}
                    className="memory-img"
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: `${ACCENT}12` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ background: "#fafafa", padding: isMobile ? "48px 24px" : isTablet ? "60px 32px" : "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: !isMobile && !isTablet && faqImageUrl ? "1fr 1fr" : "1fr", gap: isMobile ? "40px" : "64px", alignItems: "start" }}>

          {/* Imagen izquierda */}
          {faqImageUrl && (
            <div style={{ borderRadius: "24px", overflow: "hidden", position: isMobile || isTablet ? "static" : "sticky", top: "100px" }}>
              <img
                src={faqImageUrl}
                alt="Preguntas frecuentes"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          {/* Preguntas */}
          <div>
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#111", margin: "0 0 12px 0" }}>
                PREGUNTAS FRECUENTES
              </h2>
              <div style={{ width: "60px", height: "3px", background: ACCENT, borderRadius: "2px" }} />
            </div>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} index={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Pricing Section ── */

// Ejemplos de precio para mostrar en las cards (calculados con la fórmula)
// Delgada: S/90 + S/3 × (hojas - 15)
// Gruesa:  S/120 + S/4 × (hojas - 15)
const EXAMPLES_DELGADA = [
  { hojas: 15, price: "S/ 90",  highlight: false },
  { hojas: 20, price: "S/ 105", highlight: false },
  { hojas: 25, price: "S/ 120", highlight: true  },
  { hojas: 35, price: "S/ 150", highlight: false },
  { hojas: 50, price: "S/ 195", highlight: false },
];

const EXAMPLES_GRUESA = [
  { hojas: 15, price: "S/ 120", highlight: false },
  { hojas: 20, price: "S/ 140", highlight: false },
  { hojas: 25, price: "S/ 160", highlight: true  },
  { hojas: 35, price: "S/ 200", highlight: false },
  { hojas: 50, price: "S/ 240", highlight: false },
];

function PricingSection() {
  const { isMobile, isTablet } = useWindowSize();
  return (
    <section style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 60%, #1a1a2e 100%)", padding: isMobile ? "48px 24px" : isTablet ? "60px 32px" : "80px 48px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-block", padding: "5px 16px", borderRadius: "20px",
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: ACCENT_LIGHT, fontSize: "12px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px",
          }}>
            Precios claros, sin sorpresas
          </div>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "36px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            Precio por hoja, sin sorpresas
          </h2>
          <p style={{ margin: 0, fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Pagas exactamente por las hojas que usas. Mínimo <strong style={{ color: "#fff" }}>15 hojas (30 caras)</strong>, cada hoja adicional tiene un costo fijo.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "28px" }}>
          <CoverCard
            title="Tapa Delgada"
            subtitle="Cartulina estándar · Ligero y económico"
            formula="S/ 90 base · +S/ 3 por hoja extra"
            examples={EXAMPLES_DELGADA}
            accentColor="#049eff"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#049eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            }
          />
          <CoverCard
            title="Tapa Gruesa"
            subtitle="Tapa dura resistente · Durabilidad premium"
            formula="S/ 120 base · +S/ 4 por hoja extra"
            examples={EXAMPLES_GRUESA}
            accentColor={ACCENT}
            isPremium
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            }
          />
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            Los precios incluyen diseño e impresión. Envío se calcula al confirmar el pedido.
          </p>
        </div>
      </div>
    </section>
  );
}

type PriceExample = { hojas: number; price: string; highlight: boolean };

function CoverCard({
  title, subtitle, formula, examples, accentColor, isPremium = false, icon,
}: {
  title: string;
  subtitle: string;
  formula: string;
  examples: PriceExample[];
  accentColor: string;
  isPremium?: boolean;
  icon: ReactNode;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: `1.5px solid ${accentColor}40`,
      borderRadius: "24px",
      overflow: "hidden",
      position: "relative",
    }}>
      {isPremium && (
        <div style={{
          position: "absolute", top: 0, right: "24px",
          background: `linear-gradient(135deg, ${ACCENT} 0%, #c471ed 100%)`,
          color: "#fff", fontSize: "10px", fontWeight: 700,
          padding: "4px 12px", borderRadius: "0 0 10px 10px",
          letterSpacing: "0.8px", textTransform: "uppercase",
        }}>
          Recomendada
        </div>
      )}

      {/* Card header */}
      <div style={{
        padding: "28px 28px 20px",
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        display: "flex", alignItems: "flex-start", gap: "14px",
      }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "14px",
          background: `${accentColor}18`,
          border: `1.5px solid ${accentColor}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#fff", marginBottom: "4px", margin: "0 0 4px 0" }}>{title}</h3>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{subtitle}</div>
        </div>
      </div>

      {/* Fórmula */}
      <div style={{ padding: "16px 28px 0", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
        <span style={{ fontSize: "13px", fontWeight: 700, color: accentColor }}>{formula}</span>
      </div>

      {/* Ejemplos */}
      <div style={{ padding: "16px 28px 28px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {examples.map((ex) => (
          <div
            key={ex.hojas}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 16px",
              borderRadius: "12px",
              background: ex.highlight ? `${accentColor}18` : "rgba(255,255,255,0.03)",
              border: ex.highlight ? `1.5px solid ${accentColor}50` : "1.5px solid rgba(255,255,255,0.07)",
              position: "relative",
            }}
          >
            {ex.highlight && (
              <div style={{
                position: "absolute", top: "-9px", left: "14px",
                background: accentColor, color: "#fff",
                fontSize: "9px", fontWeight: 700,
                padding: "2px 9px", borderRadius: "99px",
                letterSpacing: "0.5px",
              }}>
                MÁS ELEGIDO
              </div>
            )}
            <div style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
              {ex.hojas} hojas · {ex.hojas * 2} caras
            </div>
            <div style={{ fontSize: "20px", fontWeight: 900, color: ex.highlight ? accentColor : "#fff" }}>
              {ex.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Photobook Card ── */

const CARD_SHADOW       = `0 8px 32px rgba(128, 65, 135, 0.10)`;
const CARD_SHADOW_HOVER = `0 24px 64px rgba(128, 65, 135, 0.24)`;
const CARD_GRADIENT     = `linear-gradient(135deg, ${ACCENT} 0%, #c471ed 100%)`;

function PhotobookCard({ theme }: { theme: PhotobookTheme }) {
  return (
    <div style={{ perspective: "1200px", height: "100%" }}>
      <article
        style={{
          position:       "relative",
          paddingTop:     "115px",
          cursor:         "pointer",
          height:         "100%",
          transformStyle: "preserve-3d",
          transition:     "transform 0.35s ease",
          willChange:     "transform",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transition = "transform 0.3s ease";

          const cardBody = el.querySelector<HTMLElement>("[data-card-body]");
          if (cardBody) {
            cardBody.style.boxShadow   = CARD_SHADOW_HOVER;
            cardBody.style.borderColor = `${ACCENT}50`;
          }

          const img = el.querySelector<HTMLElement>("[data-book-image]");
          if (img) {
            img.style.transform = "translateZ(40px) translateY(-10px) scale(1.06)";
            img.style.filter    = `drop-shadow(0 22px 30px ${ACCENT}70)`;
          }

          const sheen = el.querySelector<HTMLElement>("[data-sheen]");
          if (sheen) {
            sheen.style.transition = "none";
            sheen.style.transform  = "translateX(-200%) skewX(-20deg)";
            sheen.getBoundingClientRect();
            sheen.style.transition = "transform 0.65s ease";
            sheen.style.transform  = "translateX(200%) skewX(-20deg)";
          }
        }}
        onMouseMove={(e) => {
          const el   = e.currentTarget;
          const rect = el.getBoundingClientRect();
          const nx   = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
          const ny   = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
          el.style.transition = "transform 0.08s linear";
          el.style.transform  = `translateY(-8px) rotateX(${-ny * 7}deg) rotateY(${nx * 7}deg)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transition = "transform 0.45s ease";
          el.style.transform  = "translateY(0) rotateX(0deg) rotateY(0deg)";

          const cardBody = el.querySelector<HTMLElement>("[data-card-body]");
          if (cardBody) {
            cardBody.style.boxShadow   = CARD_SHADOW;
            cardBody.style.borderColor = "#e8e8e8";
          }

          const img = el.querySelector<HTMLElement>("[data-book-image]");
          if (img) {
            img.style.transform = "translateZ(20px) translateY(0) scale(1)";
            img.style.filter    = `drop-shadow(0 8px 14px ${ACCENT}35)`;
          }
        }}
      >
        {/* ── IMAGEN FLOTANTE ── */}
        <div
          data-book-image=""
          style={{
            position:       "absolute",
            top:            0,
            left:           0,
            right:          0,
            height:         "207px",
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "center",
            zIndex:         3,
            transform:      "translateZ(20px)",
            filter:         `drop-shadow(0 8px 14px ${ACCENT}35)`,
            transition:     "transform 0.35s ease, filter 0.35s ease",
          }}
        >
          {theme.coverPreviewUrl ? (
            <Image
              src={theme.coverPreviewUrl}
              alt={theme.name}
              width={138}
              height={184}
              style={{ maxWidth: "100%", maxHeight: "184px", height: "auto", width: "auto", objectFit: "contain" }}
            />
          ) : (
            <div style={{
              width: "100px", height: "140px",
              background: `${ACCENT}20`, borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#ccc", fontSize: "14px",
            }}>
              Portada
            </div>
          )}
        </div>

        {/* ── CARD BODY ── */}
        <div
          data-card-body=""
          style={{
            position:      "relative",
            overflow:      "hidden",
            borderRadius:  "20px",
            border:        "1px solid #e8e8e8",
            background:    "#fff",
            boxShadow:     CARD_SHADOW,
            display:       "flex",
            flexDirection: "column",
            height:        "100%",
            transition:    "box-shadow 0.3s ease, border-color 0.3s ease",
          }}
        >
          {/* Sheen */}
          <div
            data-sheen=""
            style={{
              position:      "absolute",
              top:           0, left: 0, bottom: 0,
              width:         "55%",
              background:    "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)",
              transform:     "translateX(-200%) skewX(-20deg)",
              pointerEvents: "none",
              zIndex:        10,
            }}
          />

          {/* Zona superior tintada */}
          <div style={{
            position:   "relative",
            background: `linear-gradient(160deg, ${ACCENT}14 0%, ${ACCENT}07 100%)`,
            padding:    "124px 16px 16px",
          }}>
            {/* Barra gradiente superior */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "3px", background: CARD_GRADIENT,
            }} />
            {/* Badge */}
            <div style={{
              display: "inline-block", padding: "5px 14px", borderRadius: "20px",
              background: ACCENT, color: "#fff",
              fontSize: "11px", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.5px",
            }}>
              {theme.badge}
            </div>
          </div>

          {/* Zona inferior */}
          <div style={{
            background:    "#fff",
            padding:       "16px 20px 24px",
            flex:          1,
            display:       "flex",
            flexDirection: "column",
            textAlign:     "center",
            alignItems:    "center",
            gap:           "8px",
          }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" stroke="#f5a623" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <div style={{ fontSize: "13px", color: "#999" }}>{theme.reviews} Reviews</div>

            <h3 style={{ margin: 0, fontSize: "16px", lineHeight: 1.2, color: "#111", fontWeight: 600 }}>
              {theme.name}
            </h3>

            <p style={{ margin: 0, maxWidth: "360px", fontSize: "13px", lineHeight: 1.4, color: "#666", fontWeight: 400 }}>
              {theme.description}
            </p>

            <div style={{ flex: 1 }} />

            {/* Price */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "2px" }}>Desde</div>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#111", lineHeight: 1 }}>S/ 90</div>
              <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>15 hojas · Tapa Delgada</div>
            </div>

            {/* CTA */}
            <Link
              href={`/photobooks/${theme.id}/configurar`}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                minWidth:       "170px",
                height:         "40px",
                borderRadius:   "9999px",
                border:         "none",
                background:     CARD_GRADIENT,
                color:          "#fff",
                fontSize:       "14px",
                fontWeight:     700,
                cursor:         "pointer",
                textTransform:  "uppercase",
                fontFamily:     "inherit",
                textDecoration: "none",
                letterSpacing:  "0.03em",
                boxShadow:      `0 4px 12px ${ACCENT}30`,
              }}
            >
              Crear Aquí
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ── FAQ Accordion ── */

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: `1px solid ${open ? ACCENT + "40" : "#ebebeb"}`,
        borderLeft: `4px solid ${open ? ACCENT : "transparent"}`,
        marginBottom: "12px",
        overflow: "hidden",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: open ? `0 4px 24px ${ACCENT}18` : "none",
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
            color: open ? ACCENT : "#ccc",
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
            fontSize: "16px",
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
            background: open ? ACCENT : "transparent",
            border: `2px solid ${open ? ACCENT : "#ddd"}`,
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
