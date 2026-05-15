'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PIXELART_COLORS } from '@/lib/colors';

const LETTERS = ['P', 'I', 'X', 'E', 'L', 'A', 'R', 'T'] as const;
const COLORS  = [
  PIXELART_COLORS.P_RED,
  PIXELART_COLORS.I_ORANGE,
  PIXELART_COLORS.X_YELLOW,
  PIXELART_COLORS.E_GREEN,
  PIXELART_COLORS.L_PURPLE,
  PIXELART_COLORS.A_BLUE,
  PIXELART_COLORS.R_PINK,
  PIXELART_COLORS.T_TURQUOISE,
] as const;

// Mínimo tiempo visible — garantiza que la animación se vea aunque la página cargue rápido
const MIN_VISIBLE_MS = 700;

export default function PageTransitionLoader() {
  const pathname = usePathname();

  const [active, setActive]     = useState(false); // controla opacidad
  const [removed, setRemoved]   = useState(true);  // controla si está en el DOM
  const [progress, setProgress] = useState(0);     // 0–100

  const prevPath  = useRef(pathname);
  const startedAt = useRef(0);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Interceptar clicks en links internos ───────────────────────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        href === prevPath.current  // mismo pathname → no mostrar loader (nunca completaría)
      ) return;

      // Limpiar cualquier timer anterior
      if (timerRef.current) clearTimeout(timerRef.current);

      // Marcar que ya hubo navegación interna — IntroOverlay lo respeta
      sessionStorage.setItem('pixelart_nav', '1');

      startedAt.current = Date.now();
      setRemoved(false);
      setProgress(0);

      // Doble rAF: espera que el DOM monte antes de animar
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setActive(true);
          setProgress(80); // CSS transition anima de 0 → 80% en 600ms
        })
      );
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // ─── Interceptar navegación programática (router.back / router.forward) ──────
  // Los botones "Volver" despachan 'pixelart:nav-start' ANTES de navegar,
  // así el loader aparece antes de que Next.js procese el popstate.
  // También capturamos 'popstate' directamente para las flechas del navegador.
  useEffect(() => {
    const handleNavStart = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      sessionStorage.setItem('pixelart_nav', '1');
      startedAt.current = Date.now();
      setRemoved(false);
      setProgress(0);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setActive(true);
          setProgress(80);
        })
      );
    };

    window.addEventListener('pixelart:nav-start', handleNavStart);
    window.addEventListener('popstate', handleNavStart);
    return () => {
      window.removeEventListener('pixelart:nav-start', handleNavStart);
      window.removeEventListener('popstate', handleNavStart);
    };
  }, []);

  // ─── Detectar que la navegación completó (pathname cambió) ──────────────────
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    if (timerRef.current) clearTimeout(timerRef.current);

    const elapsed = Date.now() - startedAt.current;
    const wait    = Math.max(0, MIN_VISIBLE_MS - elapsed);

    // Esperar el mínimo, luego completar al 100% y hacer fade-out
    timerRef.current = setTimeout(() => {
      setProgress(100); // dispara transición 80→100% en 200ms

      timerRef.current = setTimeout(() => {
        setActive(false); // fade-out opacity

        timerRef.current = setTimeout(() => {
          setRemoved(true);
          setProgress(0);
        }, 350); // espera que termine el fade-out
      }, 250);
    }, wait);
  }, [pathname]);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        opacity: active ? 1 : 0,
        transition: 'opacity 300ms ease',
        pointerEvents: active ? 'all' : 'none',
      }}
    >
      {/* Letras PIXELART — se iluminan a medida que la barra avanza */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {LETTERS.map((letter, i) => {
          // P empieza en 0 → se enciende al primer frame; T en 87.5% → completa al final
          const threshold = (i / LETTERS.length) * 100;
          const lit = progress > threshold;
          return (
            <span
              key={letter}
              style={{
                display: 'inline-block',
                width: '34px',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 900,
                color: lit ? COLORS[i] : '#d4d4d4',
                transition: 'color 200ms ease',
                fontFamily: '"Courier New", Courier, monospace',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Barra luminosa con tip brillante en el borde */}
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '3px',
          background: '#e0e0e0',
          borderRadius: '2px',
        }}
      >
        {/* Fill — tenue, solo marca el recorrido */}
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#333333',
            borderRadius: '2px',
            transition:
              progress === 0
                ? 'none'
                : `width ${progress === 100 ? 200 : 600}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />

        {/* Tip luminoso — borde delantero que irradia luz */}
        {progress > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${progress}%`,
              transform: 'translate(-50%, -50%)',
              width: '3px',
              height: '9px',
              borderRadius: '2px',
              background: '#1a1a1a',
              transition:
                progress === 0
                  ? 'none'
                  : `left ${progress === 100 ? 200 : 600}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
