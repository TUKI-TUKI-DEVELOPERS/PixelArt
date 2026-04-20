'use client';

import { PIXELART_COLORS } from '@/lib/colors';

interface PixelArtLogoProps {
  size?: 'small' | 'default';
  className?: string;
}

/**
 * Logo PIXELART multicolor con animación de color shift
 * 
 * Cada letra tiene su propio color vibrante que rota en un ciclo infinito,
 * evocando marcadores de colores sobre una mesa de trabajo creativa.
 * 
 * Animación: Los colores se desplazan entre letras cada 8 segundos,
 * creando un efecto dinámico y memorable.
 */
export default function PixelArtLogo({ size = 'default', className = '' }: PixelArtLogoProps) {
  const width = size === 'small' ? 160 : 220;
  const height = size === 'small' ? 40 : 55;
  const fontSize = size === 'small' ? 36 : 48;

  const letters = [
    { char: 'P', color: PIXELART_COLORS.P_RED, x: 0 },
    { char: 'I', color: PIXELART_COLORS.I_ORANGE, x: size === 'small' ? 20 : 27 },
    { char: 'X', color: PIXELART_COLORS.X_YELLOW, x: size === 'small' ? 32 : 43 },
    { char: 'E', color: PIXELART_COLORS.E_GREEN, x: size === 'small' ? 56 : 75 },
    { char: 'L', color: PIXELART_COLORS.L_PURPLE, x: size === 'small' ? 78 : 104 },
    { char: 'A', color: PIXELART_COLORS.A_BLUE, x: size === 'small' ? 98 : 131 },
    { char: 'R', color: PIXELART_COLORS.R_PINK, x: size === 'small' ? 122 : 163 },
    { char: 'T', color: PIXELART_COLORS.T_TURQUOISE, x: size === 'small' ? 144 : 192 },
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-labelledby="pixelart-logo-title"
      style={{ display: 'block' }}
    >
      <title id="pixelart-logo-title">PixelArt Logo</title>
      
      <defs>
        <style>
          {`
            @keyframes colorPulse {
              0%, 100% {
                filter: brightness(1) saturate(1);
                transform: scale(1);
              }
              10% {
                filter: brightness(1.3) saturate(1.4);
                transform: scale(1.05);
              }
              20% {
                filter: brightness(1) saturate(1);
                transform: scale(1);
              }
            }

            .logo-letter {
              font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 800;
              font-size: ${fontSize}px;
              animation: colorPulse 6s ease-in-out infinite;
              transform-origin: center;
              transition: filter 0.3s ease, transform 0.3s ease;
            }

            .logo-letter:nth-child(1) { animation-delay: 0s; }
            .logo-letter:nth-child(2) { animation-delay: 0.75s; }
            .logo-letter:nth-child(3) { animation-delay: 1.5s; }
            .logo-letter:nth-child(4) { animation-delay: 2.25s; }
            .logo-letter:nth-child(5) { animation-delay: 3s; }
            .logo-letter:nth-child(6) { animation-delay: 3.75s; }
            .logo-letter:nth-child(7) { animation-delay: 4.5s; }
            .logo-letter:nth-child(8) { animation-delay: 5.25s; }
          `}
        </style>
      </defs>

      <g id="pixelart-wordmark">
        {letters.map((letter, index) => (
          <text
            key={letter.char}
            x={letter.x}
            y={size === 'small' ? 32 : 42}
            className="logo-letter"
            fill={letter.color}
            style={{ 
              userSelect: 'none',
            } as React.CSSProperties}
          >
            {letter.char}
          </text>
        ))}
      </g>
    </svg>
  );
}
