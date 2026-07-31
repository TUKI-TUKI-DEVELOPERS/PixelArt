"use client";

import Link from "next/link";
import { useState } from "react";
import { NotebookPen, Mail, ThumbsUp, Truck, ChevronRight, ChevronDown, LucideIcon } from "lucide-react";
import { tokens } from "@/lib/design-tokens";
import { useWindowSize } from "@/hooks/useWindowSize";

const ACCENT = "#eb6164";

type Step = {
  id: number;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Cuéntanos tu historia",
    description: "Sube tus fotos y personaliza cada detalle.",
    bullets: [
      "Sube las fotos de los protagonistas.",
      "Elige el escenario y la tapa que más te guste.",
      "Escribe tu dedicatoria o usa una de las nuestras.",
    ],
    icon: NotebookPen,
  },
  {
    id: 2,
    title: "Recibe tu demo gratis",
    description: "Te enviamos las propuestas por correo, sin costo.",
    bullets: [
      "Creamos 2 a 3 propuestas personalizadas para tu historia.",
      "Sin costo y sin compromiso de compra.",
    ],
    icon: Mail,
  },
  {
    id: 3,
    title: "Elige tu propuesta favorita",
    description: "Revisa y selecciona la que más te guste.",
    bullets: [
      "Compara las propuestas directamente desde tu correo.",
      "Decides recién cuando estés convencido.",
    ],
    icon: ThumbsUp,
  },
  {
    id: 4,
    title: "Paga y recíbelo en tu casa",
    description: "Yape, comprobante, y tu libro llega a la puerta.",
    bullets: [
      "Escanea el QR y paga con Yape.",
      "Sube tu comprobante para validar el pago.",
      "Recibe tu libro impreso en la puerta de tu casa.",
    ],
    icon: Truck,
  },
];

export default function CreateBookAccordion() {
  const { isMobile, isTablet } = useWindowSize();
  const isCompact = isMobile || isTablet;
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggleExpanded(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section
      style={{
        width: "100%",
        padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        background: tokens.colors.neutral.surface.subtle,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section heading */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(32px, 3.8vw, 50px)",
              lineHeight: 1.12,
              fontWeight: 700,
              color: "#111",
              letterSpacing: "-0.01em",
            }}
          >
            Crea tu libro <span style={{ color: ACCENT, fontStyle: "italic" }}>muy fácil</span>
          </h2>
        </div>

        {/* Steps — fila horizontal con flechas de secuencia */}
        <div
          style={{
            display: "flex",
            flexDirection: isCompact ? "column" : "row",
            alignItems: "flex-start",
            justifyContent: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            const isOpen = expanded.has(step.id);
            return (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  flexDirection: isCompact ? "column" : "row",
                  alignItems: "center",
                  flex: isCompact ? undefined : 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "320px",
                    background: "#fff",
                    borderRadius: tokens.borderRadius.xl,
                    border: `1px solid ${ACCENT}22`,
                    padding: "34px 22px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "19px",
                      fontSize: "14px",
                      fontWeight: 800,
                      color: `${ACCENT}80`,
                    }}
                  >
                    {String(step.id).padStart(2, "0")}
                  </div>

                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: `${ACCENT}14`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={32} color={ACCENT} strokeWidth={1.75} />
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontFamily: tokens.fonts.display,
                      fontSize: "20px",
                      fontWeight: 700,
                      color: tokens.colors.neutral.text.primary,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      lineHeight: 1.5,
                      color: tokens.colors.neutral.text.secondary,
                    }}
                  >
                    {step.description}
                  </p>

                  <div
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        paddingTop: "12px",
                        textAlign: "left",
                      }}
                    >
                      {step.bullets.map((bullet, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ fontSize: "15px", lineHeight: 1.5, color: tokens.colors.neutral.text.secondary }}>
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpanded(step.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      border: "none",
                      background: "transparent",
                      color: ACCENT,
                      fontSize: "15px",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: "2px 0 0",
                      marginTop: "auto",
                    }}
                  >
                    {isOpen ? "Ver menos" : "Ver más"}
                    <ChevronDown
                      size={17}
                      color={ACCENT}
                      strokeWidth={2.5}
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                    />
                  </button>
                </div>

                {!isLast && (
                  <div
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: isCompact ? "6px 0" : "0 10px",
                    }}
                  >
                    {isCompact ? (
                      <ChevronDown size={20} color={ACCENT} strokeWidth={2} />
                    ) : (
                      <ChevronRight size={20} color={ACCENT} strokeWidth={2} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA final — la puerta de salida de la sección */}
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link
            href="/libros-personalizados"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "54px",
              padding: "0 36px",
              borderRadius: "9999px",
              background: ACCENT,
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.01em",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.16)",
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(0, 0, 0, 0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.16)";
            }}
          >
            Crear mi libro
          </Link>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: tokens.colors.neutral.text.muted,
            }}
          >
            Sin registro · Recibe tu demo gratis antes de pagar
          </span>
        </div>
      </div>
    </section>
  );
}
