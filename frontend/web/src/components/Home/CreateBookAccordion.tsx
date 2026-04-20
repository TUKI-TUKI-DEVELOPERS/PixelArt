"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterInformationCarousel from "@/components/Home/RegisterInformationCarousel";

type AccordionItem = {
  id: number;
  label: string;
  title: string;
  content: string[];
};

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

const items: AccordionItem[] = [
  {
    id: 1,
    label: "Paso 1",
    title: "Registro de Información",
    content: [
      "Ingresa los datos y fotos de ti y esa persona especial.",
      "Selecciona los escenarios que más te gusten.",
      "Previsualización preliminar de imágenes generadas.",
    ],
  },
  {
    id: 2,
    label: "Paso 2",
    title: "Personalización de Poemas",
    content: [
      "Elige entre palabras tuyas o algunos de nuestros poemas.",
    ],
  },
  {
    id: 3,
    label: "Paso 3",
    title: "Personalización del Libro",
    content: [
      "Elige la calidad de la tapa del libro",
    ],
  },
  {
    id: 4,
    label: "Paso 4",
    title: "Visualización de Resultados",
    content: [
      "Previsualiza los resultados añádelo al carrito y listo",
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
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      style={{
        width: "100%",
        padding: "64px 48px",
        background: "#fafafa",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Section heading */}
        <div style={{ marginBottom: "40px" }}>
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
                fontSize: "14px",
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
              fontSize: "38px",
              lineHeight: 1.1,
              fontWeight: 900,
              color: "#111",
              textTransform: "uppercase",
            }}
          >
            Crea tu libro
            <br />
            <span style={{ color: ACCENT }}>muy fácil</span>
          </h2>
        </div>

        {/* Stepper vertical */}
        <div style={{ position: "relative" }}>
          {items.map((item, idx) => {
            const isOpen = openItems.includes(item.id);
            const isLast = idx === items.length - 1;

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "24px",
                  position: "relative",
                }}
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
                    onClick={() => toggleItem(item.id)}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: isOpen ? "none" : `2px solid #d0d0d0`,
                      background: isOpen ? ACCENT_GRADIENT : "#fff",
                      color: isOpen ? "#fff" : "#999",
                      fontSize: "18px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      boxShadow: isOpen
                        ? "0 4px 16px rgba(183, 32, 32, 0.3)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                      position: "relative",
                      zIndex: 2,
                      flexShrink: 0,
                    }}
                  >
                    {item.id}
                  </button>

                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      style={{
                        width: "2px",
                        flex: 1,
                        minHeight: "16px",
                        background: isOpen
                          ? `linear-gradient(to bottom, ${ACCENT}, #d0d0d0)`
                          : "#e0e0e0",
                        transition: "background 0.3s ease",
                      }}
                    />
                  )}
                </div>

                {/* Content column */}
                <div
                  style={{
                    flex: 1,
                    paddingBottom: isLast ? 0 : "8px",
                    minWidth: 0,
                  }}
                >
                  {/* Header */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "8px 0",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: isOpen ? ACCENT : "#999",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "4px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {item.label}
                      </div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "24px",
                          fontWeight: 800,
                          color: isOpen ? "#111" : "#666",
                          textTransform: "uppercase",
                          transition: "color 0.3s ease",
                          lineHeight: 1.2,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isOpen ? ACCENT : "#bbb"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease, stroke 0.3s ease",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Expandable content */}
                  <div
                    style={{
                      maxHeight: isOpen ? "2000px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <div style={{ paddingTop: "4px", paddingBottom: "8px" }}>
                      {/* Bullet items */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        {item.content.map((text, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "26px",
                                height: "26px",
                                minWidth: "26px",
                                borderRadius: "6px",
                                background: ACCENT_GRADIENT,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
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
                                fontSize: "15px",
                                lineHeight: 1.5,
                                color: "#444",
                                fontWeight: 400,
                              }}
                            >
                              {text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Step-specific content */}
                      {item.id === 1 && (
                        <RegisterInformationCarousel
                          boyImageUrl={registerInformationCarouselProps.boyImageUrl}
                          girlImageUrl={registerInformationCarouselProps.girlImageUrl}
                          stage1ImageUrl={registerInformationCarouselProps.stage1ImageUrl}
                          stage2ImageUrl={registerInformationCarouselProps.stage2ImageUrl}
                          resultImageUrl={registerInformationCarouselProps.resultImageUrl}
                        />
                      )}

                      {item.id === 2 && (
                        <div
                          style={{
                            maxWidth: "900px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid #e8e8e8",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                height: "56px",
                                border: "none",
                                borderBottom: "2px solid #e0e0e0",
                                background: "#f0f0f0",
                                color: "#666",
                                fontSize: "15px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              PixelArt dedicatorias inspiradoras
                            </button>
                            <button
                              type="button"
                              style={{
                                height: "56px",
                                border: "none",
                                borderBottom: `2px solid ${ACCENT}`,
                                background: "#fff",
                                color: ACCENT,
                                fontSize: "15px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Dedicatorias Personales
                            </button>
                          </div>
                          <div
                            style={{
                              height: "44px",
                              background: "#f8f8f8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: ACCENT,
                              fontSize: "14px",
                              fontWeight: 500,
                            }}
                          >
                            Selecciona una de las dos opciones
                          </div>
                          <Image
                            src={poemSpaceImageUrl}
                            alt="Espacio para poema o dedicatoria"
                            width={900}
                            height={400}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        </div>
                      )}

                      {item.id === 3 && (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "40px",
                            maxWidth: "1000px",
                          }}
                        >
                          {/* Tapa Gruesa */}
                          <div
                            style={{
                              background: "#fff",
                              borderRadius: "16px",
                              padding: "32px 24px",
                              border: "1px solid #e8e8e8",
                              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              src={chooseBookCoverThickUrl}
                              alt="Tapa gruesa"
                              width={320}
                              height={240}
                              loading="lazy"
                              style={{
                                width: "100%",
                                maxWidth: "320px",
                                height: "auto",
                                display: "block",
                                marginBottom: "24px",
                              }}
                            />
                            <h4
                              style={{
                                margin: "0 0 8px 0",
                                fontSize: "22px",
                                fontWeight: 800,
                                color: "#111",
                                textTransform: "uppercase",
                                textAlign: "center",
                              }}
                            >
                              Tapa Gruesa
                            </h4>
                            <div
                              style={{
                                marginBottom: "12px",
                                fontSize: "14px",
                                color: ACCENT,
                                fontWeight: 600,
                                textAlign: "center",
                              }}
                            >
                              Para una experiencia más fina
                            </div>
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: "18px",
                                fontSize: "14px",
                                lineHeight: 1.6,
                                color: "#555",
                                fontWeight: 400,
                              }}
                            >
                              <li>Cartulina de grosor estándar</li>
                              <li>Acabado mate</li>
                              <li>Colores estándar</li>
                              <li>Protección básica</li>
                            </ul>
                          </div>

                          {/* Tapa Premium */}
                          <div
                            style={{
                              background: "#fff",
                              borderRadius: "16px",
                              padding: "32px 24px",
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
                                right: "24px",
                                background: ACCENT_GRADIENT,
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: 700,
                                padding: "4px 12px",
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
                              width={320}
                              height={240}
                              loading="lazy"
                              style={{
                                width: "100%",
                                maxWidth: "320px",
                                height: "auto",
                                display: "block",
                                marginBottom: "24px",
                              }}
                            />
                            <h4
                              style={{
                                margin: "0 0 8px 0",
                                fontSize: "22px",
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
                                marginBottom: "12px",
                                fontSize: "14px",
                                color: ACCENT,
                                fontWeight: 600,
                                textAlign: "center",
                              }}
                            >
                              Para una experiencia superior
                            </div>
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: "18px",
                                fontSize: "14px",
                                lineHeight: 1.6,
                                color: "#555",
                                fontWeight: 400,
                              }}
                            >
                              <li>Cartón rígido de mayor grosor</li>
                              <li>Mayor durabilidad</li>
                              <li>Acabado mate o brillante</li>
                              <li>Mejor protección y presentación</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {item.id === 4 && (
                        <div
                          style={{
                            maxWidth: "900px",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                          }}
                        >
                          <Image
                            src={previsualizedResultsCoupleUrl}
                            alt="Pareja viendo el resultado del libro"
                            width={900}
                            height={500}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
