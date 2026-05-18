"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { tokens } from "@/lib/design-tokens";
import { useWindowSize } from "@/hooks/useWindowSize";

// ─── Particle canvas (Canvas 2D nativo, sin dependencias externas) ─────────────
// Porta el comportamiento del tsParticles config: circulos de colores que
// rebotan, colisionan y se destruyen/reaparecen al tocarse.

function QualityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = [
      "#3998D0", "#2EB6AF", "#A9BD33",
      "#FEC73B", "#F89930", "#F45623", "#D62E32",
    ];
    const COUNT = 30;
    const BASE_SPEED = 7;
    const FPS = 60;

    let W = canvas.parentElement?.offsetWidth ?? window.innerWidth;
    let H = canvas.parentElement?.offsetHeight ?? window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    interface P {
      x: number; y: number; r: number;
      vx: number; vy: number;
      color: string; alpha: number; dying: boolean;
      reset(): void;
    }

    function makeParticle(): P {
      const p: P = {
        x: 0, y: 0, r: 0, vx: 0, vy: 0, color: "", alpha: 1, dying: false,
        reset() {
          W = canvas!.parentElement?.offsetWidth ?? window.innerWidth;
          H = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
          this.x = Math.random() * W;
          this.y = Math.random() * H;
          this.r = 4 + Math.random() * 4;
          const angle = Math.random() * Math.PI * 2;
          const speed = BASE_SPEED * (0.5 + Math.random() * 0.5);
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
          this.alpha = 1;
          this.dying = false;
        },
      };
      p.reset();
      return p;
    }

    const particles: P[] = Array.from({ length: COUNT }, makeParticle);

    function tick() {
      W = canvas!.parentElement?.offsetWidth ?? window.innerWidth;
      H = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
      if (canvas!.width !== W || canvas!.height !== H) {
        canvas!.width = W;
        canvas!.height = H;
      }

      ctx!.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.dying) {
          p.alpha -= 0.04;
          p.r *= 1.05;
          if (p.alpha <= 0) p.reset();
        } else {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x - p.r < 0 || p.x + p.r > W) {
            p.vx *= -1;
            p.x = Math.max(p.r, Math.min(W - p.r, p.x));
          }
          if (p.y - p.r < 0 || p.y + p.r > H) {
            p.vy *= -1;
            p.y = Math.max(p.r, Math.min(H - p.r, p.y));
          }

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            if (q.dying) continue;
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            if (dx * dx + dy * dy < (p.r + q.r) ** 2) {
              p.dying = true;
              q.dying = true;
            }
          }
        }

        ctx!.save();
        ctx!.globalAlpha = Math.max(0, p.alpha);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();
        ctx!.restore();
      }
    }

    const timer = setInterval(tick, 1000 / FPS);

    const ro = new ResizeObserver(() => {
      W = canvas!.parentElement?.offsetWidth ?? window.innerWidth;
      H = canvas!.parentElement?.offsetHeight ?? window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => { clearInterval(timer); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ─── Cubo 3D (CSS 3D puro + autoplay via useEffect) ───────────────────────────
// Replica el efecto cube de Swiper sin ninguna dependencia externa.
// Geometria: dos caras (front + right), el contenedor rota en Y.

interface CubeSlide {
  image?: string;
  alt?: string;
  price: string;
  title: string;
  description: string;
  rating: string;
  ratingCount: string;
  darkText?: boolean;
}

function CubeSlider({ slides, width = 400, height = 490 }: {
  slides: CubeSlide[];
  width?: number;
  height?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [rotating, setRotating] = useState(false);
  const half = width / 2;

  // Autoplay cada 2600ms, igual que el config de Swiper original
  useEffect(() => {
    const id = setInterval(() => {
      setRotating(true);
      setCurrent((c) => (c + 1) % slides.length);
      setTimeout(() => setRotating(false), 1000);
    }, 2600);
    return () => clearInterval(id);
  }, [slides.length]);

  const rotateY = current * -90;

  return (
    <div
      style={{
        width,
        height,
        perspective: "1200px",
        cursor: "grab",
      }}
    >
      {/* Cubo — rota en Y */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotateY}deg)`,
          transition: rotating ? "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" : "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {slides.map((slide, i) => {
          // Cara i: rotada i*90deg en Y, trasladada half hacia afuera
          const faceRotate = i * 90;
          const textColor = slide.darkText ? "#202134" : "#fff";
          const subColor  = slide.darkText ? "#555"    : "rgba(255,255,255,0.85)";
          const metaColor = slide.darkText ? "#777"    : "rgba(255,255,255,0.7)";

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width,
                height,
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.3)",
                background: slide.image ? "transparent" : "#ffffff",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: `rotateY(${faceRotate}deg) translateZ(${half}px)`,
                // Sombra lateral del cubo (simula slideShadows de Swiper)
                boxShadow: "inset -20px 0 40px rgba(0,0,0,0.15), inset 20px 0 40px rgba(0,0,0,0.08)",
              }}
            >
              {/* Imagen */}
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.alt ?? slide.title}
                  fill
                  style={{ objectFit: "contain", borderRadius: "20px" }}
                  sizes={`${width}px`}
                />
              )}

              {/* Price badge */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "6px",
                  background: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
                  borderRadius: "30px",
                  padding: "6px 12px",
                  color: slide.darkText ? "#202134" : "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  zIndex: 2,
                }}
              >
                {slide.price}
              </div>

              {/* Overlay glassmorphism inferior */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "150px",
                  padding: "10px 20px",
                  background: "rgba(93,95,145,0.2)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderTop: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "0 0 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <h3 style={{ fontSize: "22px", fontWeight: 600, margin: "0 0 4px 0", color: textColor }}>
                  {slide.title}
                </h3>
                <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.3, margin: "0 0 8px 0", color: subColor }}>
                  {slide.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#afe312", fontSize: "14px", letterSpacing: "1px" }}>{slide.rating}</span>
                  <span style={{ fontSize: "13px", fontWeight: 300, color: metaColor }}>{slide.ratingCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Cover type card ──────────────────────────────────────────────────────────

interface CoverCardProps {
  icon: React.ReactNode;
  name: string;
  features: string;
  price: string;
  highlighted?: boolean;
  badge?: string;
}

function CoverCard({ icon, name, features, price, highlighted, badge }: CoverCardProps) {
  if (highlighted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.spacing.component.md,
          padding: "14px 18px",
          background: tokens.colors.photobooks.gradient,
          borderRadius: tokens.borderRadius.lg,
          boxShadow: "0 8px 28px rgba(45,143,213,0.28)",
        }}
      >
        <div
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "1.5px solid rgba(255,255,255,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: "15px", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
            {name}
            {badge && (
              <span style={{
                fontSize: "10px", fontWeight: 700,
                background: "rgba(255,255,255,0.25)",
                padding: "2px 8px", borderRadius: "9999px",
                letterSpacing: "0.5px", textTransform: "uppercase",
              }}>
                {badge}
              </span>
            )}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.82)", marginTop: "2px" }}>{features}</div>
        </div>
        <div style={{ fontWeight: 800, fontSize: "17px", color: "#fff", whiteSpace: "nowrap" }}>{price}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: tokens.spacing.component.md,
        padding: "14px 18px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: tokens.borderRadius.lg,
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        style={{
          width: "44px", height: "44px",
          borderRadius: "50%",
          background: "rgba(79,151,207,0.2)",
          border: "1.5px solid rgba(79,151,207,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: "15px", color: "#fff" }}>{name}</div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>{features}</div>
      </div>
      <div style={{ fontWeight: 800, fontSize: "17px", color: "#fff", whiteSpace: "nowrap" }}>{price}</div>
    </div>
  );
}

// ─── Iconos ───────────────────────────────────────────────────────────────────

const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6bb3e0" strokeWidth="1.8" />
    <path d="M3 9h18" stroke="#6bb3e0" strokeWidth="1.8" />
  </svg>
);

const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill="white"
      fillOpacity="0.95"
    />
  </svg>
);

// ─── Componente principal ─────────────────────────────────────────────────────

interface BookQualitySectionProps {
  bookCoverThickUrl: string;
  bookCoverSlimUrl: string;
}

export default function BookQualitySection({ bookCoverThickUrl, bookCoverSlimUrl }: BookQualitySectionProps) {
  const { isMobile } = useWindowSize();
  const slides: CubeSlide[] = [
    {
      image: bookCoverThickUrl,
      alt: "Tapa Gruesa",
      price: "Desde S/ 120.00",
      title: "Tapa Gruesa",
      description: "Tapa dura resistente, acabado premium y mayor durabilidad.",
      rating: "★★★★★",
      ratingCount: "5.0 (89 reseñas)",
    },
    {
      image: bookCoverSlimUrl,
      alt: "Tapa Delgada",
      price: "Desde S/ 90.00",
      title: "Tapa Delgada",
      description: "Cartulina estándar, acabado mate profesional y colores vibrantes.",
      rating: "★★★★★",
      ratingCount: "4.9 (124 reseñas)",
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#162561",
        backgroundImage: [
          "radial-gradient(circle at 20% 100%, rgba(184,184,184,0.1) 0%, rgba(184,184,184,0.1) 33%, rgba(96,96,96,0.1) 33%, rgba(96,96,96,0.1) 66%, rgba(7,7,7,0.1) 66%, rgba(7,7,7,0.1) 99%)",
          "linear-gradient(40deg, #040a22, #162561, #202e64, #6f7aa6)",
        ].join(", "),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <QualityParticles />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "50% 45%",
          placeItems: "center",
          gap: isMobile ? "32px" : "60px",
          padding: isMobile ? "48px 24px" : "60px",
          minHeight: isMobile ? "auto" : "100vh",
        }}
      >
        {/* ── Cubo 3D — oculto en mobile ── */}
        {!isMobile && <CubeSlider slides={slides} width={400} height={490} />}

        {/* ── Contenido ── */}
        <div style={{ maxWidth: "540px", textAlign: isMobile ? "center" : "left" }}>
          <p
            style={{
              margin: `0 0 ${tokens.spacing.micro.sm} 0`,
              fontSize: tokens.typography.small.size,
              fontWeight: 700,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Nuestros formatos
          </p>

          <h2
            style={{
              margin: `0 0 ${tokens.spacing.component.xs} 0`,
              fontSize: tokens.typography.h1.size,
              lineHeight: 1.05,
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.5px",
              textShadow: "0 2px 16px rgba(0,0,0,0.3)",
            }}
          >
            Calidad en cada
            <br />
            página
          </h2>

          <div
            style={{
              width: "72px",
              height: "3px",
              background: tokens.colors.photobooks.gradient,
              borderRadius: "2px",
              marginTop: 0,
              marginBottom: tokens.spacing.component.md,
              marginLeft: isMobile ? "auto" : 0,
              marginRight: isMobile ? "auto" : 0,
            }}
          />

          <p
            style={{
              margin: `0 0 ${tokens.spacing.component.md} 0`,
              fontSize: tokens.typography.bodyLarge.size,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.72)",
              maxWidth: "480px",
            }}
          >
            En PixelArt cuidamos cada detalle de tu Photobook. Elige entre dos
            tipos de tapa según tu presupuesto y el nivel de presentación que buscas.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: tokens.spacing.component.md,
            }}
          >
            <CoverCard
              icon={<IconBook />}
              name="Tapa Delgada"
              features="Cartulina estándar · Acabado mate · Colores vibrantes"
              price="S/ 90.00"
            />
            <CoverCard
              icon={<IconStar />}
              name="Tapa Gruesa"
              features="Tapa dura · Mayor resistencia · Acabado premium"
              price="S/ 120.00"
              highlighted
              badge="Premium"
            />
          </div>

          <button
            style={{
              width: isMobile ? "100%" : "260px",
              height: "52px",
              borderRadius: tokens.borderRadius.md,
              border: "none",
              background: "#eaeaea",
              color: "#202134",
              fontSize: tokens.typography.bodyLarge.size,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.4s ease-in",
              letterSpacing: "0.3px",
            }}
          >
            Comenzar mi diseño
          </button>
        </div>
      </div>
    </section>
  );
}
