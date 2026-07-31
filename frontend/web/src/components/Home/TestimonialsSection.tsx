"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { tokens } from "@/lib/design-tokens";
import { useWindowSize } from "@/hooks/useWindowSize";

// ─── Testimonios — cierre editorial claro; el footer queda como único bloque oscuro ──

export type TestimonialClient = {
  name: string;
  image: string;
  review: string;
  rating: number;
};

type Props = {
  clients: TestimonialClient[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? "#f5a623" : "#e5e7eb"}
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const METRICS = [
  { value: "5", label: "Calificación promedio", stars: true },
  { value: "+1,500", label: "Clientes satisfechos" },
  { value: "+2,400", label: "Libros entregados" },
];

export default function TestimonialsSection({ clients }: Props) {
  const { isMobile, isTablet } = useWindowSize();
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? undefined : { opacity: 0, y: 32 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        background: tokens.colors.neutral.surface.subtle,
        overflow: "hidden",
      }}
    >
      {/* Palabra editorial de fondo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "2%",
          top: "4%",
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
        Gracias
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1060px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: tokens.spacing.section.xs }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <span style={{ width: "28px", height: "2px", background: tokens.colors.customBooks.primary }} />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: tokens.colors.customBooks.primary,
                lineHeight: 1.1,
              }}
            >
              Testimonios
            </span>
            <span style={{ width: "28px", height: "2px", background: tokens.colors.customBooks.primary }} />
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(30px, 3.5vw, 44px)",
              lineHeight: 1.15,
              fontWeight: 700,
              color: tokens.colors.neutral.text.primary,
              letterSpacing: "-0.01em",
            }}
          >
            Nuestros clientes nos respaldan
          </h2>
        </div>

        {/* ── Cards con reveal escalonado ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: tokens.spacing.component.md,
            marginBottom: tokens.spacing.section.sm,
          }}
        >
          {clients.map((client, idx) => (
            <motion.article
              key={`${client.name}-${idx}`}
              {...reveal(idx * 0.12)}
              style={{
                background: "#ffffff",
                borderRadius: tokens.borderRadius.lg,
                border: `1px solid ${tokens.colors.neutral.surface.border}`,
                padding: tokens.spacing.component.md,
                boxShadow: tokens.shadows.sm,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = tokens.shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = tokens.shadows.sm;
              }}
            >
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
                    border: `2px solid ${tokens.colors.neutral.surface.border}`,
                  }}
                  loading="lazy"
                />
                <div>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: tokens.typography.small.size,
                      fontWeight: 700,
                      color: tokens.colors.neutral.text.primary,
                      lineHeight: 1.3,
                    }}
                  >
                    {client.name}
                  </h3>
                  <Stars rating={client.rating} />
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: tokens.colors.neutral.text.secondary,
                }}
              >
                {client.review}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ── Métricas en serif — cierre con autoridad ── */}
        <motion.div
          {...reveal(0.35)}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? "20px" : tokens.spacing.section.xs,
            flexWrap: "wrap",
          }}
        >
          {METRICS.map((metric, idx) => (
            <div key={metric.label} style={{ display: "contents" }}>
              {idx > 0 && !isMobile && (
                <div
                  aria-hidden="true"
                  style={{ width: "1px", height: "44px", background: tokens.colors.neutral.surface.border }}
                />
              )}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: tokens.fonts.display,
                    fontSize: "40px",
                    fontWeight: 700,
                    color: tokens.colors.neutral.text.primary,
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {metric.value}
                </div>
                {metric.stars && (
                  <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 2px" }}>
                    <Stars rating={5} />
                  </div>
                )}
                <div
                  style={{
                    marginTop: metric.stars ? "2px" : "8px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: tokens.colors.neutral.text.muted,
                    letterSpacing: "0.02em",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
