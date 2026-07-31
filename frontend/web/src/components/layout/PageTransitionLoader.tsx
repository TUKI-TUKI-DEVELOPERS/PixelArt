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

// Piso mínimo: solo evita que la animación se vea cortada a la mitad en
// navegaciones instantáneas. NO es una espera artificial larga — el loader
// se oculta apenas el pathname realmente cambia (navegación terminada).
const MIN_VISIBLE_MS = 300;
const FADE_MS        = 200;
// Duración de una vuelta del barrido — se repite en loop mientras se espera,
// en vez de una única animación calculada para una duración fija.
const CYCLE_MS = 900;
// Corte de seguridad: si el pathname nunca cambia (redirect externo, error),
// no dejamos el overlay bloqueando la página para siempre.
const FAILSAFE_MS = 6000;

const KEYFRAMES = [
  `@keyframes px-bar{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}`,
  ...LETTERS.map((_, i) => {
    const start = Math.round((i / LETTERS.length) * 100);
    return `@keyframes px-l${i}{0%,${start}%{color:#d4d4d4}${Math.min(start + 12, 100)}%,100%{color:${COLORS[i]}}}`;
  }),
].join('');

export default function PageTransitionLoader() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [hiding, setHiding]   = useState(false);
  const [run, setRun]         = useState(0);
  const prevPath     = useRef(pathname);
  const startedAt    = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inyectar keyframes en <head> una sola vez al montar
  useEffect(() => {
    if (document.querySelector('style[data-px-loader]')) return;
    const s = document.createElement('style');
    s.setAttribute('data-px-loader', '');
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }, []);

  const hideNow = () => {
    setHiding(true);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      setHiding(false);
    }, FADE_MS);
  };

  const showLoader = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (failsafeRef.current) clearTimeout(failsafeRef.current);

    startedAt.current = Date.now();

    // flushSync: commitea el div al DOM antes de que Next.js procese la navegación
    flushSync(() => {
      setHiding(false);
      setVisible(true);
      setRun(r => r + 1);
    });

    failsafeRef.current = setTimeout(hideNow, FAILSAFE_MS);
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
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
    };
  }, []);

  // Ocultar apenas el pathname realmente cambió (navegación terminada),
  // respetando solo el piso mínimo para que la animación no se corte.
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (failsafeRef.current) clearTimeout(failsafeRef.current);

    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(hideNow, wait);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      key={run}
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
        pointerEvents: 'all',
        opacity: hiding ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      {/* Letras PIXELART — barrido en loop mientras se espera la navegación */}
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
              animation: `px-l${i} ${CYCLE_MS}ms ease infinite`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Barra de progreso — indeterminada, en loop */}
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
            width: '35%',
            height: '100%',
            background: '#333333',
            borderRadius: '2px',
            animation: `px-bar ${CYCLE_MS}ms ease-in-out infinite`,
          }}
        />
      </div>
    </div>
  );
}
