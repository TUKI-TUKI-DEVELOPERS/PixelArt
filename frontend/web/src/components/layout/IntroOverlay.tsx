'use client';

import { useEffect, useState } from 'react';
import PixelArtLogo from '@/components/layout/PixelArtLogo';

const SESSION_KEY = 'pixelart_intro_shown';
const VISIBLE_DURATION_MS = 2800;
const SLIDE_DURATION_MS = 1300;

export default function IntroOverlay() {
  const [hidden, setHidden]   = useState(false);
  // Arranca en true (removed) — consistente entre SSR y cliente, sin hydration mismatch.
  // useEffect opta por mostrarlo solo en la primera visita real.
  const [removed, setRemoved] = useState(true);

  useEffect(() => {
    // Ya vio el telón en esta sesión: no mostrar
    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    // Primera visita: montar el overlay y arrancar el timer
    setRemoved(false);

    const slideTimer = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem(SESSION_KEY, '1');
      setTimeout(() => setRemoved(true), SLIDE_DURATION_MS);
    }, VISIBLE_DURATION_MS);

    return () => clearTimeout(slideTimer);
  }, []);

  if (removed) return null;

  return (
    <>
      <style>{`
        @keyframes pixelart-intro-bounce {
          0%, 100% { transform: scale(1)    rotate(0deg); }
          50%       { transform: scale(1.08) rotate(4deg); }
        }
      `}</style>

      {/* SVG noise filter — oculto, solo define el filtro */}
      <svg style={{ display: 'none' }} aria-hidden="true">
        <defs>
          <filter id="pixelart-grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          overflow: 'hidden',
          /* Borgoña oscuro — suficiente contraste para todos los colores del logo */
          background: '#4A0E0E',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.87, 0, 0.13, 1)`,
          pointerEvents: hidden ? 'none' : 'all',
          userSelect: 'none',
        }}
      >
        {/* ── Capa de grano cinematográfico ── */}
        <div
          style={{
            position: 'absolute',
            inset: '-50%',
            width: '200%',
            height: '200%',
            opacity: 0.09,
            filter: 'url(#pixelart-grain-filter)',
            background: '#ffffff',
          }}
        />

        {/* ── Viñeta radial: oscurece bordes, abre el centro ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 50% at 50% 50%, transparent 0%, rgba(20,4,4,0.65) 100%)',
          }}
        />

        {/* ── Contenido central ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              animation: 'pixelart-intro-bounce 2s ease-in-out infinite',
              filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.5))',
            }}
          >
            <PixelArtLogo width={280} animated />
          </div>

          <p
            style={{
              color: 'rgba(255,255,255,0.80)',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.3rem',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              textAlign: 'center',
              margin: 0,
              padding: '0 24px',
            }}
          >
            Tus momentos, para siempre
          </p>
        </div>
      </div>
    </>
  );
}
