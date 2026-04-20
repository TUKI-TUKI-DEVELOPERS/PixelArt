"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type RegisterInformationCarouselProps = {
  boyImageUrl: string;
  girlImageUrl: string;
  stage1ImageUrl: string;
  stage2ImageUrl: string;
  resultImageUrl: string;
};

type Slide = {
  id: number;
  images: string[];
  bordered?: boolean;
  dimFirstImage?: boolean;
};

export default function RegisterInformationCarousel({
  boyImageUrl,
  girlImageUrl,
  stage1ImageUrl,
  stage2ImageUrl,
  resultImageUrl,
}: RegisterInformationCarouselProps) {
  const slides: Slide[] = [
    {
      id: 1,
      images: [boyImageUrl, girlImageUrl],
      bordered: true,
    },
    {
      id: 2,
      images: [stage1ImageUrl, stage2ImageUrl],
    },
    {
      id: 3,
      images: [resultImageUrl],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              slides[currentSlide].images.length === 1 ? "1fr" : "1fr 1fr",
            gap: "22px",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {slides[currentSlide].images.map((image, index) => {
            const isFirstSlide = slides[currentSlide].id === 1;
            const isLastSlide = slides[currentSlide].id === 3;

            return (
              <div
                key={`${slides[currentSlide].id}-${index}`}
                style={{
                  position: "relative",
                  width: isLastSlide ? "100%" : "200px",
                  maxWidth: isLastSlide ? "440px" : "200px",
                }}
              >
                <div
                  style={{
                    border:
                      slides[currentSlide].bordered && !isLastSlide
                        ? "2px dashed #8f8f8f"
                        : "none",
                    padding:
                      slides[currentSlide].bordered && !isLastSlide
                        ? "10px"
                        : "0",
                    background: "transparent",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Registro de información ${slides[currentSlide].id}-${index + 1}`}
                    width={440}
                    height={isLastSlide ? 240 : 200}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: isLastSlide ? "240px" : "200px",
                      objectFit: "cover",
                      display: "block",
                      opacity: isLastSlide && index === 0 ? 0.96 : 1,
                    }}
                  />
                </div>

                {isFirstSlide && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-6px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#67f229",
                      color: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir al slide ${slide.id}`}
            style={{
              width: currentSlide === index ? "24px" : "10px",
              height: "10px",
              borderRadius: "5px",
              border: "none",
              background: currentSlide === index ? "#B72020" : "#d0d0d0",
              transition: "all 0.3s ease",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}