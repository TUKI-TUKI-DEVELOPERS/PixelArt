'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
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

// 1400ms visible + 400ms fade-out — CSS lo controla todo, no React
const VISIBLE_MS = 1400;
const FADE_MS    = 400;
const TOTAL_MS   = VISIBLE_MS + FADE_MS;
const V          = Math.round((VISIBLE_MS / TOTAL_MS) * 100); // ~78%

// Keyframes generados una sola vez fuera del componente
const KEYFRAMES = [
  `@keyframes px-ov{0%,${V}%{opacity:1}100%{opacity:0}}`,
  `@keyframes px-bar{0%{width:0}50%{width:75%}${V}%{width:95%}100%{width:100%}}`,
  ...LETTERS.map((_, i) => {
    const on = Math.round((i / LETTERS.length) * V * 0.75);
    return `@keyframes px-l${i}{0%,${on}%{color:#d4d4d4}${on + 6}%,100%{color:${COLORS[i]}}}`;
  }),
].join('');

export default function PageTransitionLoader() {
  const pathname = usePathname();

  // `run` cambia en cada navegación → key diferente → React desmonta+remonta el div
  // → CSS animation arranca desde cero, sin depender de timers ni React state
  const [visible, setVisible] = useState(false);
  const [run, setRun]         = useState(0);
  const prevPath = useRef(pathname);

  // Inyectar keyframes en <head> una sola vez al montar
  useEffect(() => {
    if (document.querySelector('style[data-px-loader]')) return;
    const s = document.createElement('style');
    s.setAttribute('data-px-loader', '');
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }, []);

  const showLoader = () => {
    // flushSync garantiza que React commitee el div al DOM ANTES de que
    // Next.js procese la navegación. CSS animation arranca desde ese paint.
    flushSync(() => {
      setVisible(true);
      setRun(r => r + 1);
    });
  };

  // ─── Interceptar clicks en links internos ───────────────────────────────────
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        a.target === '_blank' ||
        href === prevPath.current
      ) return;

      sessionStorage.setItem('pixelart_nav', '1');
      showLoader();
    };

    // ─── Interceptar navegación programática (router.back / popstate) ─────────
    const onNavStart = (e: Event) => {
      if (e.type === 'popstate' && window.location.pathname === prevPath.current) return;
      sessionStorage.setItem('pixelart_nav', '1');
      showLoader();
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('pixelart:nav-start', onNavStart);
    window.addEventListener('popstate', onNavStart);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('pixelart:nav-start', onNavStart);
      window.removeEventListener('popstate', onNavStart);
    };
  }, []);

  // Mantener prevPath sincronizado
  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      key={run}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        // animationend burbujea desde hijos — filtramos solo el del overlay
        if (e.animationName === 'px-ov') setVisible(false);
      }}
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
        pointerEvents: 'all',
        animation: `px-ov ${TOTAL_MS}ms ease forwards`,
      }}
    >
      {/* Letras PIXELART — cada una con su propio keyframe de color */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {LETTERS.map((letter, i) => (
          <span
            key={letter}
            style={{
              display: 'inline-block',
              width: '34px',
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 900,
              fontFamily: '"Courier New", Courier, monospace',
              animation: `px-l${i} ${TOTAL_MS}ms ease forwards`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Barra de progreso — crece con CSS animation */}
      <div
        style={{
          width: '300px',
          height: '3px',
          background: '#e0e0e0',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: '#333333',
            borderRadius: '2px',
            animation: `px-bar ${TOTAL_MS}ms cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        />
      </div>
    </div>
  );
}
