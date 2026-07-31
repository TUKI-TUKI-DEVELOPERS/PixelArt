"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { tokens } from "@/lib/design-tokens";

export type HeroCarouselBook = {
  key: string;
  kicker: string;        // categoría — "Libros de Amor"
  title: string;
  description: string;
  image: string;
  href: string;
  accent: string;        // color pleno del producto
  price: string;         // "S/ 130.00"
};

type Props = {
  books: HeroCarouselBook[];
  fabricBgUrl?: string;
};

const SLIDE_MS = 750;

export default function HeroBookCarousel({ books, fabricBgUrl }: Props) {
  /* order[i] = índice del libro que ocupa la posición visual i (0 = saliente, 1 = centro…) */
  const [order, setOrder] = useState<number[]>(() => books.map((_, i) => i));
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  /* libro que "envuelve" (salta de punta a punta) — se mueve sin transición, igual que el mockup */
  const [wrapIdx, setWrapIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const centerBook = books[order[1]];
  /* Palabra editorial de fondo: "Libros de Amor" → "Amor" */
  const bgWord = centerBook.kicker.replace(/^Libros de /i, "");

  const go = useCallback((dir: "next" | "prev") => {
    if (locked) return;
    setLocked(true);
    setOrder((prev) => {
      if (dir === "next") {
        setWrapIdx(prev[0]);                     // el saliente salta al final sin animar
        return [...prev.slice(1), prev[0]];
      }
      setWrapIdx(prev[prev.length - 1]);          // el último salta al inicio sin animar
      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    });
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => setLocked(false), SLIDE_MS);
  }, [locked]);

  /* Teclado: flechas navegan */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go("prev");
      if (e.key === "ArrowRight") go("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => () => { if (lockTimer.current) clearTimeout(lockTimer.current); }, []);

  /* Salto directo a un libro (miniaturas) — rota el orden hasta centrarlo */
  const goTo = useCallback((bookIdx: number) => {
    if (locked) return;
    setOrder((prev) => {
      const shift = (prev.indexOf(bookIdx) - 1 + prev.length) % prev.length;
      if (shift === 0) return prev;
      setLocked(true);
      setWrapIdx(prev[0]);                        // el que estaba saliendo salta sin animar
      if (lockTimer.current) clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => setLocked(false), SLIDE_MS);
      return [...prev.slice(shift), ...prev.slice(0, shift)];
    });
  }, [locked]);

  /* Autoplay cada 6s — pausa on hover y respeta prefers-reduced-motion */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go("next"), 6000);
    return () => clearInterval(id);
  }, [go, paused]);

  /* Swipe táctil */
  const onPointerDown = (e: React.PointerEvent) => { touchStartX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.clientX - touchStartX.current;
    if (Math.abs(delta) > 60) go(delta < 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  return (
    <section
      className="hero-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Libros destacados"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Anuncio para lectores de pantalla */}
      <p className="sr-only" aria-live="polite">{centerBook.title}</p>

      {/* Blob de fondo — radial-gradient puro, sin filter (costo GPU cero) */}
      <div
        className="hero-blob"
        aria-hidden="true"
        style={{ backgroundImage: `radial-gradient(closest-side, ${centerBook.accent} 0%, transparent 72%)` }}
      />

      {/* Palabra editorial de fondo — categoría del libro central */}
      <div className="hc-word" aria-hidden="true" key={`word-${centerBook.key}`}>
        {bgWord}
      </div>

      {/* Tela de seda, pegada al borde real de la sección — detrás del texto */}
      {fabricBgUrl && (
        <div className="hc-fabric" aria-hidden="true">
          <Image
            src={fabricBgUrl}
            alt=""
            fill
            priority
            quality={95}
            sizes="(max-width: 1023px) 0px, 720px"
            style={{ objectFit: "cover", objectPosition: "left top" }}
          />
        </div>
      )}

      <div className="hero-stage">
        {books.map((book, bookIdx) => {
          const pos = order.indexOf(bookIdx) + 1;          // 1..n
          const isWrap = wrapIdx === bookIdx;
          const isCenter = pos === 2;
          return (
            <article
              key={book.key}
              className={`hc-item pos${Math.min(pos, 5)}${isWrap ? " no-anim" : ""}`}
              aria-hidden={!isCenter}
            >
              {/* Imagen: capa nítida + capa blur ESTÁTICA (crossfade de opacidad, blur jamás animado).
                  Normalizada por ALTURA: todos los libros ocupan la misma altura visual,
                  el ancho respira según la proporción de cada uno. */}
              <div className="hc-imgwrap">
                <div className="hc-imgframe">
                  <Image
                    src={book.image}
                    alt={isCenter ? `Libro ${book.title}` : ""}
                    width={760}
                    height={520}
                    priority={pos <= 2}
                    className="hc-img"
                  />
                  <Image
                    src={book.image}
                    alt=""
                    width={760}
                    height={520}
                    className="hc-img hc-img-blur"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Intro — solo visible en el centro; key remonta para replay del stagger */}
              {isCenter && (
                <div className="hc-intro" key={`intro-${book.key}`}>
                  <div className="hc-kicker" style={{ color: book.accent }}>
                    <span className="hc-kicker-bar" style={{ background: book.accent }} />
                    {book.kicker}
                  </div>
                  <h1 className="hc-title">{book.title}</h1>
                  <p className="hc-des">{book.description}</p>
                  <div className="hc-ctas">
                    <Link
                      href={book.href}
                      className="hc-cta-primary"
                      style={{ background: book.accent }}
                    >
                      Personalizar
                    </Link>
                    <span className="hc-price">Desde {book.price}</span>
                  </div>
                  <p className="hc-trust">
                    Tapa dura premium&ensp;·&ensp;Envío a todo el Perú&ensp;·&ensp;★ 4.8 de +1,500 clientes
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Controles — grupo editorial: flechas + contador */}
      <div className="hc-controls">
        <button
          type="button"
          className="hc-arrow"
          onClick={() => go("prev")}
          aria-label="Libro anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hc-arrow"
          onClick={() => go("next")}
          aria-label="Libro siguiente"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="hc-counter" aria-hidden="true">
          {String(order[1] + 1).padStart(2, "0")}
          <span className="hc-counter-sep"> — </span>
          {String(books.length).padStart(2, "0")}
        </span>

        {/* Miniaturas — salto directo a cada libro */}
        <div className="hc-thumbs" role="tablist" aria-label="Ir a un libro">
          {books.map((book, idx) => (
            <button
              key={`thumb-${book.key}`}
              type="button"
              role="tab"
              aria-selected={order[1] === idx}
              aria-label={book.title}
              className={`hc-thumb${order[1] === idx ? " active" : ""}`}
              onClick={() => goTo(idx)}
            >
              <Image
                src={book.image}
                alt=""
                width={120}
                height={80}
                className="hc-thumb-img"
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: clamp(600px, 82vh, 780px);
          overflow: hidden;
          background: #ffffff;
          touch-action: pan-y;
        }

        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap; border: 0;
        }

        .hero-blob {
          position: absolute;
          width: 640px;
          height: 420px;
          top: 50%;
          left: 55%;
          transform: translate(-30%, -50%);
          opacity: 0.13;
          pointer-events: none;
        }

        /* ── Palabra editorial de fondo ── */
        .hc-word {
          position: absolute;
          right: 2%;
          bottom: 6%;
          font-family: ${tokens.fonts.display};
          font-style: italic;
          font-weight: 700;
          font-size: clamp(110px, 17vw, 240px);
          line-height: 1;
          color: rgba(17, 17, 17, 0.04);
          letter-spacing: -0.02em;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          animation: hcWordIn 0.9s 0.15s ease forwards;
        }
        @keyframes hcWordIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-stage {
          position: absolute;
          inset: 0;
          width: min(1240px, 92%);
          margin: 0 auto;
          left: 0;
          right: 0;
        }

        /* ── Tela de seda, pegada al borde izquierdo real de la sección ── */
        .hc-fabric {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 42%;
          max-width: 720px;
          z-index: 1;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to right, black 45%, transparent 92%);
          mask-image: linear-gradient(to right, black 45%, transparent 92%);
        }

        /* ── Posiciones del coverflow — SOLO transform + opacity ── */
        .hc-item {
          position: absolute;
          inset: 0;
          transition:
            transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }
        .hc-item.no-anim { transition: none; }

        .pos1 {
          transform: translate(-62%, -4%) scale(1.32);
          opacity: 0;
          z-index: 11;
          pointer-events: none;
        }
        .pos2 {
          transform: translate(0, 0) scale(1);
          opacity: 1;
          z-index: 10;
        }
        .pos3 {
          transform: translate(52%, 9%) scale(0.64);
          opacity: 1;
          z-index: 9;
          pointer-events: none;
        }
        .pos4 {
          transform: translate(88%, 18%) scale(0.4);
          opacity: 0.75;
          z-index: 8;
          pointer-events: none;
        }
        .pos5 {
          transform: translate(110%, 24%) scale(0.28);
          opacity: 0;
          z-index: 7;
          pointer-events: none;
        }

        /* ── Imagen: nítida + blur estático crossfade ──
           El wrap fija la ALTURA; el frame se ajusta al ancho natural de cada libro. */
        .hc-imgwrap {
          position: absolute;
          right: 0;
          top: 50%;
          width: 56%;
          height: clamp(280px, 46vh, 440px);
          transform: translateY(-52%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hc-imgframe {
          position: relative;
          height: 100%;
          max-width: 100%;
        }
        :global(.hc-img) {
          width: auto;
          height: 100%;
          max-width: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 26px 44px rgba(0, 0, 0, 0.18));
        }
        :global(.hc-img-blur) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          filter: blur(22px);
          opacity: 0;
          transition: opacity ${SLIDE_MS}ms ease;
          pointer-events: none;
        }
        .pos3 :global(.hc-img-blur) { opacity: 0.8; }
        .pos4 :global(.hc-img-blur) { opacity: 0.95; }

        /* ── Intro (centro) ── */
        .hc-intro {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 40%;
          max-width: 480px;
          z-index: 12;
        }

        .hc-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0;
          animation: hcShow 0.55s 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hc-kicker-bar {
          width: 28px;
          height: 2px;
          display: inline-block;
        }
        .hc-title {
          margin: 14px 0 18px;
          font-family: ${tokens.fonts.display};
          font-size: clamp(34px, 4vw, 56px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.01em;
          color: ${tokens.colors.neutral.text.primary};
          opacity: 0;
          animation: hcShow 0.55s 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hc-des {
          margin: 0 0 28px;
          font-size: 17px;
          line-height: 1.65;
          color: ${tokens.colors.neutral.text.secondary};
          max-width: 420px;
          opacity: 0;
          animation: hcShow 0.55s 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hc-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          opacity: 0;
          animation: hcShow 0.55s 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes hcShow {
          from {
            opacity: 0;
            transform: translateY(26px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.hc-cta-primary) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 30px;
          border-radius: 9999px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        :global(.hc-cta-primary:hover) {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
        }
        :global(.hc-cta-primary:active) {
          transform: translateY(-1px) scale(0.98);
        }
        .hc-price {
          font-size: 15px;
          font-weight: 700;
          color: ${tokens.colors.neutral.text.primary};
        }
        .hc-trust {
          margin: 22px 0 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: ${tokens.colors.neutral.text.muted};
          opacity: 0;
          animation: hcShow 0.55s 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ── Controles — grupo editorial abajo a la izquierda ── */
        .hc-controls {
          position: absolute;
          bottom: 34px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1240px, 92%);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 12px;
          z-index: 20;
        }
        .hc-arrow {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid ${tokens.colors.neutral.surface.border};
          background: #ffffff;
          color: ${tokens.colors.neutral.text.primary};
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
        }
        .hc-arrow:hover {
          background: ${tokens.colors.neutral.text.primary};
          border-color: ${tokens.colors.neutral.text.primary};
          color: #ffffff;
          transform: scale(1.05);
        }
        .hc-arrow:active {
          transform: scale(0.96);
        }
        .hc-counter {
          margin-left: 8px;
          font-family: ${tokens.fonts.display};
          font-style: italic;
          font-size: 16px;
          letter-spacing: 0.06em;
          color: ${tokens.colors.neutral.text.primary};
        }
        .hc-counter-sep {
          color: ${tokens.colors.neutral.text.disabled};
        }

        /* ── Miniaturas ── */
        .hc-thumbs {
          margin-left: auto;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }
        .hc-thumb {
          padding: 0 0 6px;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          cursor: pointer;
          opacity: 0.45;
          transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
        }
        .hc-thumb:hover {
          opacity: 0.8;
          transform: translateY(-3px);
        }
        .hc-thumb.active {
          opacity: 1;
          border-bottom-color: ${tokens.colors.neutral.text.primary};
        }
        :global(.hc-thumb-img) {
          width: auto;
          height: 44px;
          max-width: 76px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.18));
        }

        /* ── Mobile / Tablet ──
           El texto se ancla DEBAJO de la imagen (top calculado a partir de la
           altura real de la imagen), no desde bottom — así nunca se superponen
           sin importar cuánto mida el título/descripción de cada slide. La
           descripción se clampea a 2 líneas para que el bloque tenga una
           altura máxima predecible. */
        @media (max-width: 1023px) {
          .hero-carousel { height: clamp(620px, 90vh, 760px); }
          .hc-fabric { display: none; }
          .hc-imgwrap {
            width: 82%;
            height: clamp(150px, 22vh, 210px);
            right: auto;
            left: 50%;
            top: 56px;
            transform: translateX(-50%);
          }
          .hc-intro {
            width: 92%;
            max-width: 520px;
            left: 50%;
            top: calc(56px + clamp(150px, 22vh, 210px) + 24px);
            bottom: auto;
            transform: translateX(-50%);
            text-align: center;
          }
          .hc-kicker { margin-bottom: 2px; }
          .hc-title { margin: 10px 0 10px !important; }
          .hc-des {
            margin: 0 auto 14px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .hc-trust { margin-top: 12px; }
          .hc-ctas { justify-content: center; }
          .hc-controls { justify-content: center; }
          .hc-thumbs { display: none; }
          .hc-word { font-size: clamp(80px, 22vw, 140px); right: 0; bottom: auto; top: 4%; }
          .pos1 { transform: translate(-80%, 0) scale(1.2); }
          .pos3 { transform: translate(70%, 5%) scale(0.52); }
          .pos4 { transform: translate(105%, 10%) scale(0.32); opacity: 0.45; }
        }

        @media (max-width: 640px) {
          .hero-carousel { height: 640px; }
          .hc-title { font-size: 30px; }
          .hc-des { font-size: 15px; margin-bottom: 20px; }
          .hc-controls { bottom: 14px; }
        }

        /* ── Reduced motion: todo instantáneo ── */
        @media (prefers-reduced-motion: reduce) {
          .hc-item,
          .hc-imgwrap,
          .hero-blob,
          :global(.hc-img-blur) {
            transition: none !important;
          }
          .hc-kicker, .hc-title, .hc-des, .hc-ctas, .hc-trust, .hc-word {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}
