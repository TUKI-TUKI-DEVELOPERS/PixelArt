# PageTransitionLoader — Diagnóstico completo

## Descripción del problema

El loader de transición entre páginas funciona **perfectamente en local** (`next dev`) pero en **producción (VPS)** para un caso específico de navegación, el loader apenas muestra la primera letra "P" iluminada (~100ms) antes de que la página cambie.

### Caso que falla
- Ruta: `/libros-personalizados/[categoriaId]/[libroSlug]`
- Acción: hacer click en el botón "Personalizar" de una tarjeta en la sección "más libros" (misma categoría, distinto slug)
- Resultado esperado: loader visible ~1800ms con letras iluminándose progresivamente
- Resultado real: loader visible ~100ms (solo "P" cambia de color)

### Lo que funciona bien
- Navegación entre secciones distintas (home → catálogo, etc.)
- Navegación con botón "Volver" (popstate)
- Todo en `next dev` local

---

## Entorno

- Next.js 15 App Router
- React 19
- Build mode: `next build` + standalone (`output: 'standalone'` en `next.config.ts`)
- Deploy: Docker container en VPS Linux
- **Prefetching activo en producción** — las páginas de la misma categoría se prefetchean al montar el componente

---

## Arquitectura del loader

`PageTransitionLoader` vive en `app/(public)/layout.tsx` — shared layout sobre todos los libros.
NO está dentro de la página dinámica. NO se desmonta entre navegaciones dentro de `(public)`.

```
app/layout.tsx
└── app/(public)/layout.tsx   ← PageTransitionLoader está acá
    └── app/(public)/libros-personalizados/[categoriaId]/[libroSlug]/page.tsx
```

El botón "Personalizar" es un `<a href="/libros-personalizados/[categoriaId]/[otro-slug]">` — link estándar, no `router.push()`, no `onClick`. Confirmado leyendo `BookCard.tsx`.

---

## Código actual

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { PIXELART_COLORS } from '@/lib/colors';

const LETTERS = ['P', 'I', 'X', 'E', 'L', 'A', 'R', 'T'] as const;
// COLORS = [RED, ORANGE, YELLOW, GREEN, PURPLE, BLUE, PINK, TURQUOISE]

// 1400ms visible + 400ms fade-out
const VISIBLE_MS = 1400;
const FADE_MS    = 400;
const TOTAL_MS   = VISIBLE_MS + FADE_MS; // 1800ms
const V          = 78; // % del total que está en opacity:1

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
  const [visible, setVisible] = useState(false);
  const [run, setRun]         = useState(0);
  const prevPath  = useRef(pathname);
  const timerRef  = useRef(null);
  const startedAt = useRef(0);

  // Inyectar keyframes una vez
  useEffect(() => {
    if (document.querySelector('style[data-px-loader]')) return;
    const s = document.createElement('style');
    s.setAttribute('data-px-loader', '');
    s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }, []);

  const showLoader = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    startedAt.current = Date.now();

    flushSync(() => {
      setVisible(true);
      setRun(r => r + 1);
    });

    // Timer set al momento del CLICK — garantiza duración fija
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, TOTAL_MS);
  };

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') ||
          href.startsWith('mailto:') || href.startsWith('tel:') ||
          a.target === '_blank' || href === prevPath.current) return;
      sessionStorage.setItem('pixelart_nav', '1');
      showLoader();
    };

    const onNavStart = (e) => {
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
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    const elapsed = Date.now() - startedAt.current;
    if (startedAt.current > 0 && elapsed >= TOTAL_MS) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 400);
    }
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
        animation: `px-ov ${TOTAL_MS}ms ease forwards`,
      }}
    >
      {/* letters + progress bar */}
    </div>
  );
}
```

---

## Historial de intentos y resultados

### Intento 1 — Aumentar MIN_VISIBLE_MS (700 → 1400ms)
- **Resultado**: sin cambio visible en producción
- **Por qué falló**: el problema no era el valor del tiempo sino CUÁNDO se calculaba el timer

### Intento 2 — Lógica del wait mejorada (elapsed < 50 → forzar full wait)
```tsx
const wait = Math.max(MIN_VISIBLE_MS, elapsed < 50 ? MIN_VISIBLE_MS : Math.max(0, MIN_VISIBLE_MS - elapsed));
```
- **Resultado**: sin cambio
- **Por qué falló**: el timer se seguía calculando en el pathname effect, que en same-segment navigation puede dispararse antes de que el overlay haya pintado

### Intento 3 — flushSync para forzar commit antes de navegación
```tsx
flushSync(() => { setRemoved(false); setActive(true); setProgress(0); });
```
- **Resultado**: sin cambio
- **Diagnóstico de Codex**: `flushSync` fuerza React a commitear al DOM, pero NO fuerza al browser a pintar. Si la navegación completa antes del primer frame, el overlay puede entrar al DOM invisible

### Intento 4 — CSS animations (todo el lifecycle en CSS, sin timers React)
- **Resultado**: MEJORA — ahora las letras se ven iluminarse una a una
- **Problema que persiste**: en el caso específico de "Personalizar" en mismo segmento, el overlay desaparece después de ~100ms (solo P iluminada)
- **Por qué falla**: hipótesis — algo interrumpe la animación CSS (el div se desmonta o la key cambia)

### Intento 5 — Timer al momento del click (no al cambio de pathname)
- **Resultado**: sin cambio reportado
- **Hipótesis**: el timer SIGUE corriendo 1800ms, pero el overlay no es visible o algo lo oculta

---

## Lo que sabemos con certeza

1. El loader SÍ se muestra (se ve "P" iluminarse) — el click listener funciona, `showLoader()` se llama
2. El overlay desaparece en ~100ms (solo "P" llega a iluminarse — P empieza en 0% = 0ms, I empieza en 7% = 126ms)
3. Funciona perfectamente en `next dev` — la diferencia es producción vs desarrollo
4. El componente vive en el shared layout — NO debería desmontarse entre navegaciones
5. El botón "Personalizar" es un `<a>` estándar — no `router.push()`, no `onClick`
6. `pixelart:nav-start` solo se despacha desde `BackButton.tsx` (blog) — no involucrado
7. `popstate` no dispara en `router.push()` / `history.pushState()`
8. No hay layouts anidados en `[categoriaId]` ni `[libroSlug]` que puedan remontarse

---

## Hipótesis actuales

### H1 — El (public)/layout se remonta en producción (probabilidad: media)
En `next dev`, layouts son siempre preservados. En producción con `output: 'standalone'`, podría haber alguna diferencia en cómo Next.js maneja la reconciliación del layout tree para same-segment navigation. Si el layout remonta, `PageTransitionLoader` remonta y pierde el timer.

**Cómo verificar**: agregar `console.log('mount')` en un `useEffect([], [])` del loader. Si aparece más de una vez en producción para la misma sesión, el componente remonta.

### H2 — `flushSync` lanza error silencioso en React 19 producción (probabilidad: baja-media)
React 19 es más estricto con `flushSync`. Si lanza dentro del event listener en producción (modo concurrent activo), el state update podría ser parcial. Sin embargo, el hecho de que P se ilumine sugiere que el div SÍ entra al DOM.

### H3 — El overlay está en el DOM pero no cubre la pantalla (probabilidad: baja)
`position: fixed; inset: 0` podría no funcionar si algún ancestro tiene `transform`, `filter`, o `will-change` que cree un nuevo stacking context y haga que el `position: fixed` sea relativo a ese contenedor en vez del viewport.

`globals.css` tiene `overflow-x: clip` en `body`. Aunque en spec no crea BFC, en algunos browsers podría afectar elementos `fixed`.

**Cómo verificar**: cambiar `background: '#ffffff'` a `background: 'red'` temporalmente. Si el loader es visible (rojo) durante la transición, la cobertura funciona. Si no, hay un z-index o stacking context issue.

### H4 — La CSS animation se cancela (animationcancel, no animationend) (probabilidad: baja)
Si React desmonta y remonta el div (por key change o layout remount), la animación se cancela. `animationcancel` dispararía en vez de `animationend`.

### H5 — `key={run}` en el div root del componente no funciona como se espera (probabilidad: media)
Cuando un componente retorna `null` → `<div key={n}>`, React monta el div fresh (no por el key, sino porque antes no había nada). El key SOLO importa para el caso de restart (cuando visible ya era true). Podría haber un problema de reconciliación aquí.

---

## Preguntas clave sin respuesta

1. ¿El `(public)/layout.tsx` se remonta en producción durante same-segment navigation?
2. ¿Qué exactamente termina la visibilidad del overlay a los ~100ms — `visible=false`, unmount, o algo visual (z-index)?
3. ¿El `setTimeout(1800ms)` que se setea en el click llega a ejecutarse después de 1800ms? ¿O se limpia antes?
4. ¿Existe algún elemento en la página con `z-index > 9999` que cubra el overlay?

---

## Contexto adicional del proyecto

- `next.config.ts`: `output: 'standalone'`
- `globals.css`: `overflow-x: clip` en `body` (no crea BFC pero inusual)
- `BookCard.tsx`: botón "Personalizar" es `<a href={href}>` directo, sin wrappers
- No hay `loading.tsx` en `[libroSlug]` (fue eliminado — causaba doble animación)
- `IntroOverlay` solo existe en la home page — no interfiere
- `pixelart:nav-start` solo se despacha desde `BackButton.tsx` en blog

---

## Pregunta para Codex

Dado este contexto, el overlay muestra ~100ms y desaparece. El timer de `setTimeout(setVisible(false), 1800)` se setea en el click handler. ¿Qué podría limpiar ese timer o desmontar el componente dentro de los primeros 100ms en Next.js 15 producción con `output: 'standalone'` y React 19? ¿Hay algo en cómo Next.js App Router maneja same-segment navigation en producción que cause un remount del shared layout o un cancelación de timers?
