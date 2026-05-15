type Pixel = {
  x: number;     // left %, 0-100
  y: number;     // bottom % within strip, 0 = touching bottom
  size: number;  // px
  color: string;
  opacity: number;
  glow: number;  // box-shadow radius px
};

// Deterministic pixel layout for the bottom mosaic strip.
// Colors: turquoise, celeste, soft yellow, cyan, ice blue.
// Density decreases moving upward — heavier at base, dissolving into the gradient.
const PIXELS: Pixel[] = [
  // ── Dense base row (y 0–10%) ──────────────────────────────
  { x: 1.5,  y: 2,  size: 4, color: '#00D4F5', opacity: 0.70, glow: 6 },
  { x: 5.2,  y: 5,  size: 3, color: '#1DCFCE', opacity: 0.60, glow: 5 },
  { x: 9.0,  y: 2,  size: 5, color: '#E8D848', opacity: 0.45, glow: 7 },
  { x: 13.5, y: 7,  size: 3, color: '#5BB8E8', opacity: 0.65, glow: 5 },
  { x: 17.8, y: 3,  size: 4, color: '#00D4F5', opacity: 0.55, glow: 6 },
  { x: 22.0, y: 6,  size: 3, color: '#1DCFCE', opacity: 0.72, glow: 5 },
  { x: 26.5, y: 2,  size: 4, color: '#8ED0EE', opacity: 0.58, glow: 4 },
  { x: 31.0, y: 8,  size: 3, color: '#E8D848', opacity: 0.42, glow: 7 },
  { x: 35.5, y: 3,  size: 5, color: '#00D4F5', opacity: 0.62, glow: 6 },
  { x: 40.0, y: 5,  size: 3, color: '#1DCFCE', opacity: 0.68, glow: 5 },
  { x: 44.5, y: 2,  size: 4, color: '#5BB8E8', opacity: 0.55, glow: 5 },
  { x: 49.0, y: 7,  size: 3, color: '#E8D848', opacity: 0.40, glow: 7 },
  { x: 53.5, y: 3,  size: 5, color: '#00D4F5', opacity: 0.70, glow: 6 },
  { x: 58.0, y: 6,  size: 3, color: '#1DCFCE', opacity: 0.58, glow: 5 },
  { x: 62.5, y: 2,  size: 4, color: '#8ED0EE', opacity: 0.62, glow: 4 },
  { x: 67.0, y: 5,  size: 3, color: '#E8D848', opacity: 0.38, glow: 7 },
  { x: 71.5, y: 3,  size: 4, color: '#00D4F5', opacity: 0.65, glow: 6 },
  { x: 76.0, y: 7,  size: 3, color: '#1DCFCE', opacity: 0.52, glow: 5 },
  { x: 80.5, y: 2,  size: 5, color: '#5BB8E8', opacity: 0.60, glow: 5 },
  { x: 85.0, y: 5,  size: 3, color: '#E8D848', opacity: 0.44, glow: 7 },
  { x: 89.5, y: 3,  size: 4, color: '#00D4F5', opacity: 0.56, glow: 6 },
  { x: 93.8, y: 6,  size: 3, color: '#1DCFCE', opacity: 0.68, glow: 5 },
  { x: 97.5, y: 2,  size: 4, color: '#8ED0EE', opacity: 0.50, glow: 4 },

  // ── Mid sparse row (y 18–28%) ─────────────────────────────
  { x: 3.5,  y: 20, size: 3, color: '#5BB8E8', opacity: 0.38, glow: 5 },
  { x: 11.0, y: 23, size: 4, color: '#00D4F5', opacity: 0.32, glow: 5 },
  { x: 20.5, y: 19, size: 3, color: '#E8D848', opacity: 0.28, glow: 6 },
  { x: 29.0, y: 25, size: 3, color: '#1DCFCE', opacity: 0.36, glow: 5 },
  { x: 38.5, y: 21, size: 4, color: '#8ED0EE', opacity: 0.28, glow: 4 },
  { x: 48.0, y: 24, size: 3, color: '#00D4F5', opacity: 0.33, glow: 5 },
  { x: 57.5, y: 18, size: 4, color: '#E8D848', opacity: 0.25, glow: 6 },
  { x: 66.0, y: 22, size: 3, color: '#1DCFCE', opacity: 0.35, glow: 5 },
  { x: 75.0, y: 20, size: 3, color: '#5BB8E8', opacity: 0.30, glow: 5 },
  { x: 84.5, y: 26, size: 4, color: '#00D4F5', opacity: 0.32, glow: 5 },
  { x: 92.0, y: 22, size: 3, color: '#E8D848', opacity: 0.24, glow: 6 },

  // ── Dissolving top row (y 38–55%) — absorbed by gradient ─
  { x: 8.0,  y: 40, size: 3, color: '#00D4F5', opacity: 0.18, glow: 5 },
  { x: 24.5, y: 44, size: 3, color: '#5BB8E8', opacity: 0.15, glow: 4 },
  { x: 43.0, y: 38, size: 4, color: '#1DCFCE', opacity: 0.16, glow: 5 },
  { x: 61.5, y: 42, size: 3, color: '#E8D848', opacity: 0.12, glow: 6 },
  { x: 79.0, y: 39, size: 3, color: '#00D4F5', opacity: 0.15, glow: 5 },
  { x: 95.0, y: 52, size: 3, color: '#8ED0EE', opacity: 0.10, glow: 4 },
];

export default function FooterBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {/* ── Dark blue gradient ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #020C18 0%, #041525 50%, #061A30 100%)',
        }}
      />

      {/* ── Pixel mosaic strip ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '170px',
          WebkitMaskImage:
            'linear-gradient(to top, black 0%, black 18%, rgba(0,0,0,0.5) 45%, transparent 80%)',
          maskImage:
            'linear-gradient(to top, black 0%, black 18%, rgba(0,0,0,0.5) 45%, transparent 80%)',
        }}
      >
        {PIXELS.map((px, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${px.x}%`,
              bottom: `${px.y}%`,
              width: `${px.size}px`,
              height: `${px.size}px`,
              background: px.color,
              opacity: px.opacity,
              borderRadius: '1px',
              boxShadow: `0 0 ${px.glow}px ${Math.ceil(px.glow / 2)}px ${px.color}80`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
