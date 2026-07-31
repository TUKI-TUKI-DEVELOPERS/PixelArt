"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Gift, Crown, Award, Sparkles, Truck } from "lucide-react";
import { tokens } from "@/lib/design-tokens";
import { hexToRgba } from "@/lib/colors";
import { useWindowSize } from "@/hooks/useWindowSize";

// ─── Calidad en cada página — comparación editorial de tapas ─────────────────
// Las dos tapas lado a lado, grandes y quietas. La calidad se muestra, no gira.

type CoverOption = {
  image: string;
  alt: string;
  name: string;
  description: string;
  badge?: string;
  featured?: boolean;
  specs: string[];
  idealIcon: typeof Gift;
  idealText: string;
};

const ACCENT_COLOR = "#eb6164";
const FEATURED_ACCENT = "#F0B02A";

function CoverCheck() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: ACCENT_COLOR,
        flexShrink: 0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

interface BookQualitySectionProps {
  bookCoverThickUrl: string;
  bookCoverSlimUrl: string;
}

export default function BookQualitySection({ bookCoverThickUrl, bookCoverSlimUrl }: BookQualitySectionProps) {
  const { isMobile } = useWindowSize();

  const covers: CoverOption[] = [
    {
      image: bookCoverSlimUrl,
      alt: "Photobook de tapa delgada",
      name: "Tapa Delgada",
      description: "Cartulina estándar con acabado mate profesional y colores vibrantes.",
      specs: [
        "Acabado mate profesional",
        "Ligera y fácil de transportar",
        "Colores vibrantes",
        "Excelente relación calidad-precio",
      ],
      idealIcon: Gift,
      idealText: "regalos prácticos, recuerdos cotidianos",
    },
    {
      image: bookCoverThickUrl,
      alt: "Photobook de tapa gruesa",
      name: "Tapa Gruesa",
      badge: "La más elegida",
      featured: true,
      description: "Tapa dura resistente con acabado premium y mayor durabilidad.",
      specs: [
        "Cartón rígido de alto grosor",
        "Acabado mate o brillante",
        "Máxima durabilidad",
        "Presentación premium",
      ],
      idealIcon: Crown,
      idealText: "regalos especiales, photobooks premium",
    },
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        background: tokens.colors.neutral.surface.subtle,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: tokens.spacing.section.sm }}>
          <h2
            style={{
              margin: `0 0 ${tokens.spacing.component.xs} 0`,
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(32px, 3.8vw, 50px)",
              lineHeight: 1.12,
              fontWeight: 700,
              color: tokens.colors.neutral.text.primary,
              letterSpacing: "-0.01em",
            }}
          >
            Calidad en cada página
          </h2>

          <div
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              margin: "6px 0 18px",
            }}
          >
            <span style={{ width: "36px", height: "1.5px", background: tokens.colors.customBooks.primary }} />
            <span style={{ width: "7px", height: "7px", background: FEATURED_ACCENT, transform: "rotate(45deg)" }} />
            <span style={{ width: "36px", height: "1.5px", background: tokens.colors.customBooks.primary }} />
          </div>

          <p
            style={{
              margin: "0 auto",
              maxWidth: "520px",
              fontSize: tokens.typography.bodyLarge.size,
              fontWeight: 400,
              lineHeight: 1.6,
              color: tokens.colors.neutral.text.secondary,
            }}
          >
            Elige la tapa según el nivel de presentación que buscas. Ambas se imprimen
            con la misma calidad fotográfica.
          </p>
        </div>

        {/* ── Comparación de tapas ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: tokens.spacing.component.lg,
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {covers.map((cover) => (
            <article
              key={cover.name}
              style={{
                position: "relative",
                background: "#ffffff",
                borderRadius: tokens.borderRadius.lg,
                border: cover.featured ? `1.5px solid ${FEATURED_ACCENT}` : `1px solid ${tokens.colors.neutral.surface.border}`,
                boxShadow: cover.featured ? `0 8px 28px ${hexToRgba(FEATURED_ACCENT, 0.18)}` : tokens.shadows.sm,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = tokens.shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = cover.featured ? `0 8px 28px ${hexToRgba(FEATURED_ACCENT, 0.18)}` : tokens.shadows.sm;
              }}
            >
              {/* Imagen de la tapa — grande, quieta, visible en todos los dispositivos */}
              <div
                style={{
                  position: "relative",
                  background: tokens.colors.neutral.surface.subtle,
                  padding: "8px 8px 6px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {cover.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      zIndex: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      background: tokens.colors.photobooks.primary,
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Star size={11} fill="#fff" color="#fff" />
                    {cover.badge}
                  </span>
                )}
                <Image
                  src={cover.image}
                  alt={cover.alt}
                  width={560}
                  height={400}
                  style={{
                    width: "auto",
                    height: isMobile ? "220px" : "280px",
                    maxWidth: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "drop-shadow(0 14px 24px rgba(0, 0, 0, 0.14))",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Contenido */}
              <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: tokens.fonts.display,
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: tokens.colors.neutral.text.primary,
                  }}
                >
                  {cover.name}
                </h3>

                <p
                  style={{
                    margin: "10px 0 18px",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: tokens.colors.neutral.text.secondary,
                  }}
                >
                  {cover.description}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
                  {cover.specs.map((spec) => (
                    <div key={spec} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <CoverCheck />
                      <span style={{ fontSize: "14px", lineHeight: 1.4, color: tokens.colors.neutral.text.secondary }}>
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    borderRadius: tokens.borderRadius.md,
                    background: hexToRgba(FEATURED_ACCENT, 0.1),
                  }}
                >
                  <cover.idealIcon size={22} color={ACCENT_COLOR} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "13.5px", lineHeight: 1.4 }}>
                    <strong style={{ color: tokens.colors.neutral.text.primary, fontWeight: 700 }}>Ideal para </strong>
                    <span style={{ color: tokens.colors.neutral.text.secondary }}>{cover.idealText}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Barra de confianza ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? "14px" : "36px",
            flexWrap: "wrap",
            marginTop: tokens.spacing.section.xs,
            padding: "18px 28px",
            background: "#ffffff",
            borderRadius: tokens.borderRadius.xl,
            border: `1px solid ${tokens.colors.neutral.surface.border}`,
            maxWidth: "1100px",
            marginInline: "auto",
          }}
        >
          {[
            { icon: Award, label: "Misma calidad de impresión" },
            { icon: Sparkles, label: "Acabado premium" },
            { icon: Truck, label: "Envíos seguros" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon size={25} color={ACCENT_COLOR} strokeWidth={2.5} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.colors.neutral.text.primary, whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginTop: tokens.spacing.section.xs }}>
          <Link
            href="/photobooks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "0 32px",
              height: "52px",
              borderRadius: "9999px",
              background: ACCENT_COLOR,
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Elegir mi formato →
          </Link>
          <Link
            href="/photobooks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "0 32px",
              height: "52px",
              borderRadius: "9999px",
              border: `1.5px solid ${tokens.colors.neutral.text.primary}`,
              background: "transparent",
              color: tokens.colors.neutral.text.primary,
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Ver detalles →
          </Link>
        </div>
      </div>
    </section>
  );
}
