# Fix: Android Chrome — `window.innerWidth` reportaba 1012px en celulares

## El síntoma

En celulares Android, la app no era responsive. `window.innerWidth` devolvía **1012px** en vez del ancho real del dispositivo (~360px), por lo que `isMobile` nunca era `true` y el layout quedaba en modo desktop.

En iPhone (Safari) y desktop funcionaba perfectamente.

---

## Por qué costó encontrarlo

El meta tag de viewport **ya estaba correctamente configurado** en `layout.tsx`:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
```

Esto generaba el HTML correcto:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Entonces el problema no era el meta tag. Había que entender por qué Chrome Android lo ignoraba en la práctica.

---

## El problema real: dos causas combinadas

### Causa 1 — Chrome Android vs Safari iOS se comportan diferente

Safari iOS respeta `width=device-width` de forma **estricta**: sin importar qué contenido tenga la página, el layout viewport siempre es el ancho CSS del dispositivo.

Chrome Android tiene una **heurística adicional**: si detecta que el contenido de la página es "demasiado ancho para el dispositivo", puede expandir el layout viewport para acomodar ese contenido, incluso con el meta tag presente. Esto está documentado en el comportamiento de Blink (el motor de Chrome).

### Causa 2 — `useWindowSize` inicializaba con `useState(1280)`

```ts
// Antes
const [width, setWidth] = useState(1280);
```

En Next.js, el componente se renderiza en el servidor (SSR) con ese valor inicial **antes** de que corra cualquier JavaScript en el cliente. Con `width = 1280`:

- `isMobile = false`
- `isCompact = false`

Resultado: el HTML que el servidor enviaba al navegador tenía el **layout desktop completo** — grids de dos columnas, botones de 248px en fila horizontal, imágenes anchas, etc.

Chrome Android recibía ese HTML, lo analizaba, determinaba que el contenido necesitaba ~1012px para renderizarse cómodamente, y **fijaba el layout viewport en 1012px** antes de que corra ningún JavaScript.

Cuando el `useEffect` de `useWindowSize` finalmente corría y leía `window.innerWidth`, ya era tarde: el valor era **1012**, `isMobile` quedaba `false`, y el layout nunca se corregía. Un loop que se auto-confirmaba.

### Por qué era 1012 y no 980 (el default histórico)

980px es el default de Chrome cuando **no hay** meta viewport tag. Con el meta tag presente pero contenido desktop, Chrome corre su algoritmo de "minimum comfortable width" basado en los elementos del layout. En este caso el resultado era ~1012px, derivado del ancho del contenido renderizado con el layout de dos columnas.

---

## La solución: dos cambios

### Fix 1 — `globals.css`: `overflow-x: clip`

```css
html,
body {
  overflow-x: clip;
}
```

Chrome Android usa la detección de **overflow horizontal** como señal para expandir el viewport. Con `overflow-x: clip`, el contenido que se pasa de los bordes queda recortado y Chrome ya no puede usarlo como razón para agrandar el viewport.

Se usó `clip` y **no** `hidden` por una razón técnica importante:

- `overflow-x: hidden` crea un **Block Formatting Context (BFC)**, lo que convierte al elemento en un scroll container. Esto rompe `position: sticky` del Navbar.
- `overflow-x: clip` recorta el contenido visualmente **sin** crear un BFC, entonces `position: sticky` sigue funcionando.

### Fix 2 — `useWindowSize`: default mobile-first

```ts
// Antes
const [width, setWidth] = useState(1280);

// Después
const [width, setWidth] = useState(0);

const measured = width > 0;
return {
  isMobile: !measured || width < 768,   // SSR → true (mobile)
  isTablet: measured && width >= 768 && width < 1024,
  isCompact: !measured || width < 1024, // SSR → true (compact)
};
```

Con `width = 0` como estado inicial, el SSR genera un **HTML compacto/mobile**. Chrome Android ve contenido angosto, no tiene razón para expandir el viewport, y lo fija en el ancho real del dispositivo. Cuando el `useEffect` corre y lee `window.innerWidth`, ya es el valor correcto (~360px).

**Trade-off en desktop**: hay un flash breve de layout mobile → desktop después de la hydration (el `useEffect` no corre hasta después del primer paint). Es aceptable porque:
- El Navbar usa `useIsomorphicLayoutEffect` (= `useLayoutEffect` en cliente), que corre **antes** del primer paint, así que el hamburger vs desktop nav no flashea.
- En desktop la hydration es casi instantánea (<100ms).

---

## El bug bonus que apareció

Al cambiar `useWindowSize` a mobile-first, se expusieron tres warnings pre-existentes en los componentes:

```
Removing a style property during rerender (margin) when a conflicting
property is set (marginBottom) can lead to styling bugs.
```

Estos venían del patrón:

```tsx
// Anti-pattern: shorthand + individual en el mismo objeto
style={{
  marginBottom: tokens.spacing.component.md,
  ...(isMobile && { margin: `0 auto ${tokens.spacing.component.md}` }),
}}
```

Con `useState(1280)` nunca había un re-render de mobile → desktop, entonces el conflicto nunca se activaba. Con el nuevo default, el re-render ocurre y React se queja (con razón) de que intenta remover `margin` (shorthand) mientras `marginBottom` (individual) sigue presente.

La corrección fue reemplazar el shorthand por propiedades individuales explícitas:

```tsx
// Correcto: solo propiedades individuales
style={{
  marginTop: 0,
  marginBottom: tokens.spacing.component.md,
  marginLeft: isMobile ? "auto" : 0,
  marginRight: isMobile ? "auto" : 0,
}}
```

Archivos corregidos: `WhyChooseSection.tsx` (2 instancias) y `BookQualitySection.tsx` (1 instancia).

---

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `frontend/web/src/app/globals.css` | `overflow-x: clip` en `html, body` |
| `frontend/web/src/hooks/useWindowSize.ts` | Default mobile-first (`useState(0)`) |
| `frontend/web/src/components/Home/WhyChooseSection.tsx` | Fix shorthand vs individual margin (x2) |
| `frontend/web/src/components/Home/BookQualitySection.tsx` | Fix shorthand vs individual margin (x1) |
