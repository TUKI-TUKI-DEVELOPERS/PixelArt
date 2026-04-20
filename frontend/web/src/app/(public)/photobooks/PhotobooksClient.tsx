"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhotobookThemeApi } from "@/lib/api/photobook";

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

/* ── Tapa Premium specs ── */
const TAPA_SPECS = [
  "Cartón rígido de alta calidad",
  "Colores metálicos brillosos (dorado, plateado, rosa gold)",
  "Acabado plastificado a prueba de agua",
  "Colores más vibrantes y decorativos",
  "Textura especial y acabados elaborados",
  "Máxima durabilidad y presentación de lujo",
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
};

export default function PhotobooksClient({ apiThemes }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const themes: PhotobookTheme[] = PHOTOBOOK_THEMES.map((t) => {
    const apiTheme = apiThemes.find((a) => a.name === t.dbName);
    return { ...t, coverPreviewUrl: apiTheme?.coverPreviewUrl };
  });

  const visibleThemes = themes.slice(0, visibleCount);
  const hasMore = visibleCount < PHOTOBOOK_THEMES.length;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "520px",
          background: "linear-gradient(160deg, #1a0a2e 0%, #2d1b4e 40%, #1a1a2e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-40px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(128, 65, 135, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-30px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(4, 158, 255, 0.1)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            padding: "80px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left text */}
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: ACCENT_LIGHT,
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "20px",
              }}
            >
              Photobooks PixelArt
            </div>
            <h1
              style={{
                margin: "0 0 20px 0",
                fontSize: "44px",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              Plasma tus mejores recuerdos en un álbum de calidad
            </h1>
            <p
              style={{
                margin: "0 0 32px 0",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              En su versión de Photobooks, PIXELART permite realizar la impresión
              de álbumes con fotos que tengas listas para ser subidas de forma digital.
              Con tan solo unos clicks.
            </p>
            <button
              onClick={() => {
                document.getElementById("catalogo-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "16px 36px",
                borderRadius: "14px",
                border: "none",
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_LIGHT} 100%)`,
                color: "#fff",
                fontSize: "17px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Comenzar mi diseño
            </button>
          </div>

          {/* Right: preview placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              maxHeight: "440px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: "16px",
            }}
          >
            Vista previa Photobook
          </div>
        </div>
      </section>

      {/* ═══ TAPA PREMIUM ═══ */}
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Left: images placeholder */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 2 ? "200px" : "160px",
                  height: "260px",
                  borderRadius: "16px",
                  background: `linear-gradient(135deg, ${ACCENT}15 0%, ${ACCENT}08 100%)`,
                  border: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ccc",
                  fontSize: "12px",
                }}
              >
                Tapa {i}
              </div>
            ))}
          </div>

          {/* Right: specs */}
          <div>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "40px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              TAPA PREMIUM
            </h2>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: ACCENT_LIGHT,
                marginBottom: "24px",
              }}
            >
              Para una experiencia más fina
            </div>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {TAPA_SPECS.map((spec) => (
                <li
                  key={spec}
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#333",
                    paddingLeft: "20px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: ACCENT,
                      fontWeight: 700,
                    }}
                  >
                    ·
                  </span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            {QUALITY_BLOCKS.map((block, i) => (
              <article
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #eee",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg, ${ACCENT}12 0%, ${ACCENT}06 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontSize: "14px",
                  }}
                >
                  Imagen calidad
                </div>
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#111",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {block.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "#888",
                      margin: 0,
                    }}
                  >
                    {block.subtitle}
                  </p>
                </div>
              </article>
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
      <div
        style={{
          margin: "0 0 18px 0",
          fontSize: "18px",
          fontWeight: 700,
          color: "#111",
        }}
      >
        PRECIO
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
