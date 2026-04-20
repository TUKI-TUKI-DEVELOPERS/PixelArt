"use client";

import { AnimatePresence } from "framer-motion";
import FloatingElementsLayer from "./FloatingElementsLayer";

type BackgroundVariant = "photobooks" | "custom-books" | "photobooks-hero" | "custom-books-hero";

type Props = {
  variant: BackgroundVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationKey?: string;
};

/**
 * Fondos CSS modernos que reflejan la identidad de marca dual de PixelArt
 * - Photobooks (azul): Viajes, recuerdos abiertos, expansión
 * - Custom Books (rojo): Historias personales, calidez, intimidad
 */
export default function ModernBackground({
  variant,
  children,
  className = "",
  style = {},
  animationKey = "default",
}: Props) {
  const backgrounds = {
    // Fondo para sección Photobooks - azul profundo para soportar texto blanco
    photobooks: {
      background: `
        radial-gradient(circle at 15% 20%, rgba(45, 143, 213, 0.85) 0%, transparent 55%),
        radial-gradient(circle at 85% 75%, rgba(88, 174, 232, 0.70) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 100%, rgba(79, 151, 207, 0.60) 0%, transparent 65%),
        linear-gradient(135deg, 
          rgba(32, 95, 145, 0.92) 0%, 
          rgba(45, 143, 213, 0.88) 30%,
          rgba(79, 151, 207, 0.85) 65%,
          rgba(88, 174, 232, 0.90) 100%
        )
      `,
      position: "relative" as const,
      overflow: "hidden" as const,
    },
    // Fondo para sección Custom Books - rojo cálido con formas orgánicas de páginas
    "custom-books": {
      background: `
        radial-gradient(ellipse at 20% 30%, rgba(183, 32, 32, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(217, 106, 106, 0.09) 0%, transparent 48%),
        radial-gradient(ellipse at 50% 0%, rgba(243, 215, 215, 0.06) 0%, transparent 55%),
        linear-gradient(160deg, 
          rgba(183, 32, 32, 0.04) 0%, 
          rgba(217, 106, 106, 0.02) 40%,
          rgba(245, 245, 245, 0.01) 70%,
          rgba(183, 32, 32, 0.03) 100%
        )
      `,
      position: "relative" as const,
      overflow: "hidden" as const,
    },
    // Fondo para hero Photobooks - gradiente azul sutil
    "photobooks-hero": {
      background: `linear-gradient(135deg,
        #f3f9fd 0%,
        #f8fbfe 35%,
        #f5f9fd 70%,
        #f4f8fc 100%
      )`,
      position: "relative" as const,
      overflow: "hidden" as const,
    },
    // Fondo para hero Custom Books - organic blobs rojos
    "custom-books-hero": {
      background: "#fffcfc",
      position: "relative" as const,
      overflow: "hidden" as const,
    },
  };

  const selectedBackground = backgrounds[variant];

  const isPhotobooksHero = variant === "photobooks-hero";
  const isCustomBooksHero = variant === "custom-books-hero";
  const showFloatingElements = isPhotobooksHero || isCustomBooksHero;

  return (
    <div
      className={className}
      style={{
        ...selectedBackground,
        ...style,
      }}
    >
      {/* Floating Elements - Solo para hero variants */}
      {showFloatingElements && (
        <FloatingElementsLayer
          variant={isPhotobooksHero ? "photobooks" : "ai-books"}
          elementCount={isCustomBooksHero ? 15 : 16}
          animationKey={animationKey}
          interactive={true}
        />
      )}

      {/* Overlay gradient para unificar - Solo hero variants */}
      {showFloatingElements && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isPhotobooksHero
              ? "linear-gradient(135deg, rgba(79,151,207,0.06) 0%, rgba(107,179,224,0.04) 50%, rgba(255,255,255,0.05) 100%)"
              : "linear-gradient(135deg, rgba(255,250,250,0.12) 0%, rgba(255,250,250,0.06) 100%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}

      {/* Noise texture para calidad premium - Solo hero variants */}
      {showFloatingElements && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: isPhotobooksHero ? 0.025 : 0.012,
            zIndex: 11,
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id={`noise-${variant}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency={isPhotobooksHero ? "0.9" : "0.8"}
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#noise-${variant})`} />
          </svg>
        </div>
      )}

      {/* Vignette sutil - Solo para photobooks hero */}
      {isPhotobooksHero && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(79,151,207,0.08) 100%)",
            pointerEvents: "none",
            zIndex: 11,
          }}
        />
      )}

      {/* Film grain texture - Solo para photobooks hero */}
      {isPhotobooksHero && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.03,
            zIndex: 11,
            mixBlendMode: "overlay" as const,
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="film-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.2"
                numOctaves="3"
                seed="2"
              />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 0 0 1 1" />
              </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#film-grain)" />
          </svg>
        </div>
      )}

      {/* Elementos geométricos decorativos sutiles - Solo para non-hero variants */}
      {!showFloatingElements && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: variant.includes("photobooks") ? 0.04 : 0.035,
          }}
        >
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute" }}
          >
            <defs>
              <pattern
                id={`pattern-${variant}`}
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                {variant.includes("photobooks") ? (
                  // Formas que evocan lentes de cámara / marcos fotográficos
                  <>
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="#2d8fd5"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="120"
                      y="120"
                      width="60"
                      height="60"
                      fill="none"
                      stroke="#58aee8"
                      strokeWidth="1"
                      rx="8"
                    />
                  </>
                ) : (
                  // Formas que evocan esquinas de páginas / libros abiertos
                  <>
                    <path
                      d="M 30 30 L 60 30 L 55 60 L 30 60 Z"
                      fill="none"
                      stroke="#B72020"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 140 140 Q 160 140 160 160 L 140 170 Z"
                      fill="none"
                      stroke="#d96a6a"
                      strokeWidth="1"
                    />
                  </>
                )}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${variant})`} />
          </svg>
        </div>
      )}

      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 12 }}>{children}</div>


    </div>
  );
}
