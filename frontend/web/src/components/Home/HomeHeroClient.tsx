"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import ModernBackground from "@/components/backgrounds/ModernBackground";
import TrustBadge from "./TrustBadge";
import { tokens } from "@/lib/design-tokens";
import { Star, Truck } from "lucide-react";

type HeroSlide = {
  key: string;
  title: string;
  heroText: string;
  description?: string;
  sliderUrl: string;
  carouselUrl: string;
};

type Props = {
  slides: HeroSlide[];
};

export default function HomeHeroClient({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const { isCompact } = useWindowSize();

  const currentSlide = useMemo(() => slides[currentIndex], [slides, currentIndex]);
  const inactiveSlide = useMemo(
    () => slides[currentIndex === 0 ? 1 : 0],
    [slides, currentIndex]
  );

  const isPhotobook = currentSlide.key === "photobook";
  const isCustomBook = currentSlide.key === "custom-book";

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const switchToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const productColors = {
    photobook: {
      primary: "#4f97cf",
      gradient: "linear-gradient(135deg, #2d8fd5 0%, #4f97cf 50%, #6bb3e0 100%)",
      accent: "#1591ff",
      bgAccent: "rgba(79, 151, 207, 0.08)",
    },
    customBook: {
      primary: "#B72020",
      gradient: "linear-gradient(135deg, #B72020 0%, #d92d34 50%, #e85858 100%)",
      accent: "#d92d34",
      bgAccent: "rgba(183, 32, 32, 0.08)",
    },
  };

  const activeColor = isPhotobook ? productColors.photobook : productColors.customBook;
  const inactiveColor = isPhotobook ? productColors.customBook : productColors.photobook;

  const primaryButtonStyle = {
    width: "248px",
    height: "52px",
    borderRadius: "12px",
    border: "none",
    background: activeColor.gradient,
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    padding: "0 24px",
    whiteSpace: "nowrap" as const,
  };

  const secondaryButtonStyle = {
    width: "216px",
    height: "48px",
    borderRadius: "12px",
    border: `2px solid ${inactiveColor.primary}`,
    background: "#fff",
    color: inactiveColor.primary,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    textTransform: "uppercase" as const,
    letterSpacing: "0.3px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "0 20px",
    whiteSpace: "nowrap" as const,
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Productos destacados"
      style={{
        overflow: "hidden",
        minHeight: "720px",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`bg-${currentSlide.key}`}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <ModernBackground
            variant={isPhotobook ? "photobooks-hero" : "custom-books-hero"}
            animationKey={currentSlide.key}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div />
          </ModernBackground>
        </motion.div>
      </AnimatePresence>

      <div
        className="hero-wrap"
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "40px 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            alignItems: "start",
            gap: "48px",
          }}
        >
          {/* Left Column - Content */}
          <div className="hero-left-col">
            {/* Product Title — prominent heading */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`title-${currentSlide.key}`}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "16px" }}
              >
                <div
                  className="hero-eyebrow-wrap"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "32px",
                      borderRadius: "2px",
                      background: activeColor.gradient,
                    }}
                  />
                  <span
                    style={{
                      fontSize: tokens.typography.h4.size,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: activeColor.primary,
                      lineHeight: 1.1,
                    }}
                  >
                    {currentSlide.title}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide.key}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  color: tokens.colors.neutral.text.secondary,
                  margin: "0 0 16px 0",
                  maxWidth: "480px",
                }}
              >
                {currentSlide.description || "Crea recuerdos inolvidables con la mejor calidad"}
              </motion.p>
            </AnimatePresence>

            {/* Trust Badges */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`trust-${currentSlide.key}`}
                className="hero-trust"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
                style={{
                  display: "flex",
                  gap: tokens.spacing.component.md,
                  marginBottom: tokens.spacing.section.xs,
                  flexWrap: "wrap",
                }}
              >
                <TrustBadge icon={Star} text="Alta Calidad" />
                <TrustBadge icon={Truck} text="Envío Rápido" />
              </motion.div>
            </AnimatePresence>

            {/* Main Image with Preview */}
            <div
              className="hero-slider-wrap"
              style={{
                maxWidth: isCustomBook ? "450px" : "280px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                minHeight: isCustomBook ? "160px" : "130px",
                alignItems: "center",
                marginBottom: "24px",
                marginLeft: "auto",
                marginRight: "auto",
                transform: "translateX(-56px)",
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`slider-${currentSlide.key}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40, scale: 0.96 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    boxShadow: tokens.shadows["2xl"],
                  }}
                >
                  <Image
                    src={currentSlide.sliderUrl}
                    alt={currentSlide.title}
                    width={450}
                    height={160}
                    loading="eager"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "16px",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Preview pequeño del producto inactivo */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`preview-${inactiveSlide.key}`}
                  initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
                  animate={{ opacity: 0.85, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20, y: -20 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => switchToSlide(currentIndex === 0 ? 1 : 0)}
                  style={{
                    position: "absolute",
                    bottom: "-10px",
                    right: "-10px",
                    width: "105px",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={inactiveSlide.sliderUrl}
                    alt={`Preview de ${inactiveSlide.title}`}
                    width={105}
                    height={70}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "12px",
                      border: "4px solid white",
                      boxShadow: tokens.shadows.lg,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs with Hierarchy */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`buttons-${currentSlide.key}`}
                className="hero-cta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  alignItems: "center",
                  ...(isCompact && {
                    justifyContent: "center",
                    width: "100%",
                    flexDirection: "column" as const,
                  }),
                }}
              >
                {/* Primary Button - Active product */}
                <motion.a
                  href={isPhotobook ? "/photobooks" : "/libros-personalizados"}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    ...primaryButtonStyle,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    ...(isCompact && { width: "100%", maxWidth: "300px" }),
                  }}
                  aria-label={`Comenzar ${currentSlide.title}`}
                >
                  {isPhotobook ? "Comenzar Photobook" : "Comenzar IA Book"}
                </motion.a>

                {/* Secondary Button - Inactive product */}
                <motion.button
                  whileHover={{ y: -2, scale: 1.02, borderWidth: "3px" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    ...secondaryButtonStyle,
                    ...(isCompact && { width: "100%", maxWidth: "300px" }),
                  }}
                  onClick={() => switchToSlide(currentIndex === 0 ? 1 : 0)}
                  aria-label={`Ver ${inactiveSlide.title}`}
                >
                  {isPhotobook ? "Ver IA Books" : "Ver Photobooks"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Carousel Image */}
          <div
            className="hero-right-col"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Hero Text */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.h1
                key={`hero-text-${currentSlide.key}`}
                custom={direction}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                style={{
                  fontSize: tokens.typography.display.size,
                  lineHeight: 1.1,
                  fontWeight: 900,
                  color: "#111",
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                  textAlign: "center",
                  letterSpacing: "-0.5px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {currentSlide.heroText}
              </motion.h1>
            </AnimatePresence>

            <div
              className="hero-carousel-wrap"
              style={{
                width: "100%",
                maxWidth: "1000px",
                position: "relative",
                minHeight: "420px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`carousel-${currentSlide.key}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40, scale: 0.97 }}
                  transition={{ duration: 0.46, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.16))",
                  }}
                >
                  <Image
                    src={currentSlide.carouselUrl}
                    alt={currentSlide.title}
                    width={1000}
                    height={420}
                    priority={true}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <motion.button
                aria-label="Slide anterior"
                onClick={goPrev}
                whileHover={{ scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.18 }}
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.8)",
                  fontSize: "28px",
                  lineHeight: 1,
                  color: "#999",
                  cursor: "pointer",
                  padding: 0,
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                ‹
              </motion.button>

              {/* Dots Indicators */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => switchToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Ir a slide ${index + 1}`}
                    aria-current={currentIndex === index ? "true" : "false"}
                    style={{
                      border: "none",
                      background: currentIndex === index ? activeColor.primary : "#ddd",
                      width: currentIndex === index ? "12px" : "8px",
                      height: currentIndex === index ? "12px" : "8px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              <motion.button
                aria-label="Slide siguiente"
                onClick={goNext}
                whileHover={{ scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.18 }}
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.8)",
                  fontSize: "28px",
                  lineHeight: 1,
                  color: activeColor.primary,
                  cursor: "pointer",
                  padding: 0,
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                ›
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        section {
          min-height: 720px;
        }
        .hero-grid {
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
        }

        /* ── Tablet grande ── */
        @media (max-width: 1200px) {
          .hero-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }

        /* ── Tablet (768–1023px) y Mobile: columna única, derecha primero ── */
        @media (max-width: 1023px) {
          section { min-height: auto; }
          .hero-wrap { padding: 40px 32px !important; }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: center;
          }
          .hero-right-col { order: -1; }
          .hero-left-col  { order: 1; }
          .hero-left-col {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-eyebrow-wrap { justify-content: center !important; }
          .hero-trust { justify-content: center !important; }
          .hero-cta   { justify-content: center !important; width: 100% !important; }
          .hero-slider-wrap { display: none !important; }
          .hero-carousel-wrap { min-height: 260px !important; }
          .hero-right-col h1 { font-size: 36px !important; margin-bottom: 12px !important; }
        }

        /* ── Mobile (<768px) ── */
        @media (max-width: 767px) {
          .hero-wrap { padding: 28px 20px !important; }
          .hero-grid { gap: 16px !important; }
          .hero-right-col h1 {
            font-size: 24px !important;
            line-height: 1.25 !important;
            letter-spacing: 0 !important;
          }
          .hero-carousel-wrap { min-height: 160px !important; }
          .hero-cta {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          .hero-cta a, .hero-cta button {
            width: 100% !important;
            max-width: 300px !important;
            text-align: center !important;
          }
        }

        /* ── Mobile muy pequeño (<480px) ── */
        @media (max-width: 480px) {
          .hero-right-col h1 { font-size: 20px !important; }
        }
      `}</style>
    </section>
  );
}