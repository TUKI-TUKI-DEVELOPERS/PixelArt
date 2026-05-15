"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterInformationCarousel from "@/components/Home/RegisterInformationCarousel";
import { tokens } from "@/lib/design-tokens";

type RegisterInformationCarouselProps = {
  boyImageUrl: string;
  girlImageUrl: string;
  stage1ImageUrl: string;
  stage2ImageUrl: string;
  resultImageUrl: string;
};

type CreateBookAccordionProps = {
  registerInformationCarouselProps: RegisterInformationCarouselProps;
  poemSpaceImageUrl: string;
  chooseBookCoverThickUrl: string;
  chooseBookCoverPremiumUrl: string;
  previsualizedResultsCoupleUrl: string;
};

const ACCENT = "#B72020";
const ACCENT_GRADIENT = "linear-gradient(135deg, #B72020 0%, #d92d34 50%, #e85858 100%)";

const steps = [
  {
    id: 1,
    label: "Paso 1",
    title: "Registro de Información",
    description: "Ingresa los datos y fotos de los protagonistas del libro.",
    bullets: [
      "Sube las fotos tuyas y de esa persona especial.",
      "Selecciona los escenarios que más te gusten.",
      "Previsualización preliminar de imágenes generadas.",
    ],
  },
  {
    id: 2,
    label: "Paso 2",
    title: "Personalización de Poemas",
    description: "Elige las palabras que acompañarán cada página.",
    bullets: [
      "Escoge entre dedicatorias inspiradoras de PixelArt.",
      "O escribe tus propias palabras desde el corazón.",
    ],
  },
  {
    id: 3,
    label: "Paso 3",
    title: "Personalización del Libro",
    description: "Elige la calidad de tapa que prefieres para tu libro.",
    bullets: [
      "Tapa Delgada: acabado mate, protección estándar.",
      "Tapa Premium: cartón rígido, mayor durabilidad.",
    ],
  },
  {
    id: 4,
    label: "Paso 4",
    title: "Visualización de Resultados",
    description: "Revisa tu libro terminado antes de hacer el pedido.",
    bullets: [
      "Previsualiza todas las páginas generadas.",
      "Agrégalo al carrito y completa tu pedido.",
    ],
  },
];

export default function CreateBookAccordion({
  registerInformationCarouselProps,
  poemSpaceImageUrl,
  chooseBookCoverThickUrl,
  chooseBookCoverPremiumUrl,
  previsualizedResultsCoupleUrl,
}: CreateBookAccordionProps) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      style={{
        width: "100%",
        padding: `${tokens.spacing.section.lg} ${tokens.spacing.component.md}`,
        background: "#fafafa",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section heading */}
        <div style={{ marginBottom: "48px" }}>
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
                height: "32px",
                borderRadius: "2px",
                background: ACCENT_GRADIENT,
              }}
            />
            <span
              style={{
                fontSize: tokens.typography.small.size,
                fontWeight: 700,
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Paso a paso
            </span>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: tokens.typography.h1.size,
              lineHeight: 1.1,
              fontWeight: 900,
              color: "#111",
              textTransform: "uppercase",
            }}
          >
            Crea tu libro
            <br />
            <span style={{ color: ACCENT }}>muy facil</span>
          </h2>
        </div>

        {/* Split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "42% 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* LEFT — stepper */}
          <div style={{ position: "relative" }}>
            {steps.map((step, idx) => {
              const isActive = activeStep === step.id;
              const isLast = idx === steps.length - 1;

              return (
                <div
                  key={step.id}
                  style={{ display: "flex", gap: "20px", position: "relative" }}
                >
                  {/* Timeline column */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "44px",
                      flexShrink: 0,
                    }}
                  >
                    {/* Step circle */}
                    <button
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: isActive ? "none" : "2px solid #d0d0d0",
                        background: isActive ? ACCENT_GRADIENT : "#fff",
                        color: isActive ? "#fff" : "#999",
                        fontSize: tokens.typography.body.size,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        boxShadow: isActive
                          ? "0 4px 16px rgba(183, 32, 32, 0.3)"
                          : "0 2px 8px rgba(0,0,0,0.06)",
                        position: "relative",
                        zIndex: 2,
                        flexShrink: 0,
                      }}
                    >
                      {step.id}
                    </button>

                    {!isLast && (
                      <div
                        style={{
                          width: "2px",
                          flex: 1,
                          minHeight: "40px",
                          background: isActive
                            ? `linear-gradient(to bottom, ${ACCENT}, #d0d0d0)`
                            : "#e0e0e0",
                          transition: "background 0.3s ease",
                        }}
                      />
                    )}
                  </div>

                  {/* Step text */}
                  <button
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "0 0 32px 0",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        fontSize: tokens.typography.caption.size,
                        fontWeight: 600,
                        color: isActive ? ACCENT : "#999",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "4px",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {step.label}
                    </div>
                    <h3
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: tokens.typography.h4.size,
                        fontWeight: 800,
                        color: isActive ? "#111" : "#666",
                        textTransform: "uppercase",
                        transition: "color 0.3s ease",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: tokens.typography.body.size,
                        color: isActive ? "#444" : "#aaa",
                        lineHeight: 1.5,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Bullets — visible only when active */}
                    <div
                      style={{
                        maxHeight: isActive ? "200px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.35s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          paddingBottom: "4px",
                        }}
                      >
                        {step.bullets.map((bullet, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "22px",
                                height: "22px",
                                minWidth: "22px",
                                borderRadius: "5px",
                                background: ACCENT_GRADIENT,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span
                              style={{
                                fontSize: "13px",
                                lineHeight: 1.4,
                                color: "#555",
                              }}
                            >
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT — visual panel */}
          <div
            style={{
              position: "sticky",
              top: "24px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              minHeight: "420px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                padding: "20px 28px",
                borderBottom: "1px solid #f0f0f0",
                background: "linear-gradient(to right, #fff8f8, #fff)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: ACCENT,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "4px",
                }}
              >
                {steps[activeStep - 1].label}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#111",
                  textTransform: "uppercase",
                }}
              >
                {steps[activeStep - 1].title}
              </div>
            </div>

            {/* Panel content */}
            <div
              style={{
                flex: 1,
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {activeStep === 1 && (
                <RegisterInformationCarousel
                  boyImageUrl={registerInformationCarouselProps.boyImageUrl}
                  girlImageUrl={registerInformationCarouselProps.girlImageUrl}
                  stage1ImageUrl={registerInformationCarouselProps.stage1ImageUrl}
                  stage2ImageUrl={registerInformationCarouselProps.stage2ImageUrl}
                  resultImageUrl={registerInformationCarouselProps.resultImageUrl}
                />
              )}

              {activeStep === 2 && (
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid #e8e8e8",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <button
                      type="button"
                      style={{
                        height: "52px",
                        border: "none",
                        borderBottom: "2px solid #e0e0e0",
                        background: "#f0f0f0",
                        color: "#666",
                        fontSize: tokens.typography.body.size,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      PixelArt dedicatorias
                    </button>
                    <button
                      type="button"
                      style={{
                        height: "52px",
                        border: "none",
                        borderBottom: `2px solid ${ACCENT}`,
                        background: "#fff",
                        color: ACCENT,
                        fontSize: tokens.typography.body.size,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Dedicatorias Personales
                    </button>
                  </div>
                  <div
                    style={{
                      height: "40px",
                      background: "#f8f8f8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ACCENT,
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Selecciona una de las dos opciones
                  </div>
                  <Image
                    src={poemSpaceImageUrl}
                    alt="Espacio para poema o dedicatoria"
                    width={700}
                    height={340}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              )}

              {activeStep === 3 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {/* Tapa Delgada */}
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      padding: "24px 18px",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={chooseBookCoverThickUrl}
                      alt="Tapa delgada"
                      width={240}
                      height={180}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    />
                    <h4
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#111",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      Tapa Delgada
                    </h4>
                    <div
                      style={{
                        marginBottom: "10px",
                        fontSize: "13px",
                        color: "#666",
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      Opcion estandar
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "16px",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "#555",
                      }}
                    >
                      <li>Cartulina de grosor estandar</li>
                      <li>Acabado mate</li>
                      <li>Colores vibrantes</li>
                      <li>Proteccion basica</li>
                    </ul>
                  </div>

                  {/* Tapa Premium */}
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      padding: "24px 18px",
                      border: `2px solid ${ACCENT}`,
                      boxShadow: "0 4px 20px rgba(183, 32, 32, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-1px",
                        right: "18px",
                        background: ACCENT_GRADIENT,
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "0 0 8px 8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Recomendado
                    </div>
                    <Image
                      src={chooseBookCoverPremiumUrl}
                      alt="Tapa premium"
                      width={240}
                      height={180}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    />
                    <h4
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#111",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      Tapa Premium
                    </h4>
                    <div
                      style={{
                        marginBottom: "10px",
                        fontSize: "13px",
                        color: ACCENT,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Mayor durabilidad
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "16px",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "#555",
                      }}
                    >
                      <li>Carton rigido de mayor grosor</li>
                      <li>Acabado mate o brillante</li>
                      <li>Mayor durabilidad</li>
                      <li>Mejor proteccion</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <Image
                    src={previsualizedResultsCoupleUrl}
                    alt="Pareja viendo el resultado del libro"
                    width={700}
                    height={420}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              )}
            </div>

            {/* Step dots nav */}
            <div
              style={{
                padding: "16px 28px",
                borderTop: "1px solid #f0f0f0",
                display: "flex",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              {steps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  style={{
                    width: activeStep === step.id ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    border: "none",
                    background: activeStep === step.id ? ACCENT : "#ddd",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
