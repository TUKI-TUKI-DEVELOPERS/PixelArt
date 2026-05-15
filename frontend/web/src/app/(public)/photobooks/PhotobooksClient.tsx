"use client";

import { useState, useRef, useEffect } from "react";
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
    question: "¿Puedo elegir la portada?",
    answer:
      "Sí. Puedes seleccionar entre diferentes destinos y estilos de portada. Cada colección mantiene una estética limpia y atemporal.",
  },
  {
    question: "¿Qué calidad tienen los libros?",
    answer:
      "Nuestros photobooks son de tapa dura, acabado mate y papel de alta calidad. Están pensados para durar y conservar tus recuerdos por años.",
  },
  {
    question: "¿Cuántas fotos puedo subir?",
    answer:
      "Depende del formato elegido, pero podrás incluir suficientes imágenes para contar tu viaje sin saturar el diseño.",
  },
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer:
      "El tiempo de producción e impresión es corto. Luego se suma el tiempo de envío según tu ubicación. Siempre recibirás una estimación clara antes de confirmar tu compra.",
  },
  {
    question: "¿Puedo enviar el photobook como regalo?",
    answer:
      "Sí. Puedes enviarlo directamente a otra persona. Es una forma elegante de regalar recuerdos.",
  },
  {
    question: "¿Qué pasa si no me gusta cómo quedó?",
    answer:
      "Antes de confirmar tu pedido podrás revisar el diseño. Queremos que estés completamente seguro antes de imprimir.",
  },
  {
    question: "¿Las fotos pierden calidad al imprimir?",
    answer:
      "No. Trabajamos con estándares de impresión de alta resolución para mantener nitidez y fidelidad de color.",
  },
  {
    question: "¿Mis fotos están seguras?",
    answer:
      "Sí. Tus imágenes se utilizan únicamente para crear tu photobook y se manejan con confidencialidad.",
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
};

export default function PhotobooksClient({ apiThemes, heroImageUrl, qualityImageUrls = [], memoriesImageUrls = [] }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
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
          height: "620px",
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
            padding: "0 48px",
            gap: "18px",
          }}
        >
          <PixelArtLogo width={280} animated={false} />

          <h1
            style={{
              margin: 0,
              fontSize: "36px",
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

      {/* ═══ PRECIOS ═══ */}
      <PricingSection />

      {/* ═══ CATÁLOGO DE PORTADAS ═══ */}
      <section
        id="catalogo-section"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "72px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
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
            gridTemplateColumns: "repeat(3, 1fr)",
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
          padding: "72px 48px",
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
              fontSize: "34px",
              fontWeight: 800,
              color: "#111",
              lineHeight: 1.2,
            }}>
              Cada detalle importa.
            </h2>
          </div>

          {/* Grid de cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
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
      <section style={{ background: "#fff", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

          {/* Título */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: 900,
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
            height: "420px",
          }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="memory-img-wrap">
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
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "72px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#111",
              margin: "0 0 8px 0",
            }}
          >
            PREGUNTAS FRECUENTES
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: ACCENT,
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} question={item.question} answer={item.answer} />
          ))}
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
  return (
    <section style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 60%, #1a1a2e 100%)", padding: "80px 48px" }}>
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
          <h2 style={{ margin: "0 0 12px 0", fontSize: "38px", fontWeight: 900, color: "#fff", lineHeight: 1.15 }}>
            Precio por hoja, sin sorpresas
          </h2>
          <p style={{ margin: 0, fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Pagas exactamente por las hojas que usas. Mínimo <strong style={{ color: "#fff" }}>15 hojas (30 caras)</strong>, cada hoja adicional tiene un costo fijo.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
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
          <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>{title}</div>
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

function PhotobookCard({ theme }: { theme: PhotobookTheme }) {
  return (
    <article
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 20px 28px",
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #e8e8e8",
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: "inline-block",
          padding: "6px 18px",
          borderRadius: "20px",
          background: ACCENT,
          color: "#fff",
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "16px",
        }}
      >
        {theme.badge}
      </div>

      {/* Cover image — portrait 5:6, matching natural book-cover ratio (~0.83) */}
      <div
        style={{
          width: "50%",
          aspectRatio: "5 / 6",
          marginBottom: "18px",
          borderRadius: "12px",
          overflow: "hidden",
          background: "transparent",
          position: "relative",
        }}
      >
        {theme.coverPreviewUrl ? (
          <Image
            src={theme.coverPreviewUrl}
            alt={theme.name}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ccc",
              fontSize: "14px",
            }}
          >
            Portada
          </div>
        )}
      </div>

      {/* Stars */}
      <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#f5a623"
            stroke="#f5a623"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Reviews */}
      <div style={{ fontSize: "13px", color: "#999", marginBottom: "14px" }}>
        {theme.reviews} Reviews
      </div>

      {/* Name */}
      <h3
        style={{
          margin: "0 0 10px 0",
          fontSize: "18px",
          lineHeight: 1.2,
          color: "#111",
          fontWeight: 700,
        }}
      >
        {theme.name}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: "0 0 14px 0",
          maxWidth: "360px",
          fontSize: "13px",
          lineHeight: 1.4,
          color: "#666",
          fontWeight: 400,
        }}
      >
        {theme.description}
      </p>

      {/* Price */}
      <div style={{ margin: "0 0 18px 0", textAlign: "center" }}>
        <div style={{ fontSize: "13px", color: "#999", marginBottom: "2px" }}>Desde</div>
        <div style={{ fontSize: "26px", fontWeight: 900, color: "#111", lineHeight: 1 }}>S/ 90</div>
        <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>15 hojas · Tapa Delgada</div>
      </div>

      {/* CTA */}
      <Link
        href={`/photobooks/${theme.id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "170px",
          height: "42px",
          borderRadius: "14px",
          border: `2px solid ${ACCENT}`,
          background: ACCENT,
          color: "#fff",
          fontSize: "16px",
          fontWeight: 800,
          cursor: "pointer",
          textTransform: "uppercase",
          fontFamily: "inherit",
          textDecoration: "none",
        }}
      >
        Crear Aquí
      </Link>
    </article>
  );
}

/* ── FAQ Accordion ── */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid #e8e8e8" }}>
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
            fontWeight: 700,
            color: open ? ACCENT : "#222",
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
          stroke={open ? ACCENT : "#999"}
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
