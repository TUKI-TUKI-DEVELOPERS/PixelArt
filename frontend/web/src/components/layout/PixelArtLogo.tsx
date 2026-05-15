'use client';

import { PIXELART_COLORS } from '@/lib/colors';

interface PixelArtLogoProps {
  width?: number;
  className?: string;
  animated?: boolean;
}

const VIEWBOX_WIDTH  = 220;
const BASE_FONT_SIZE = 48;

const LETTERS = [
  { char: 'P', color: PIXELART_COLORS.P_RED },
  { char: 'I', color: PIXELART_COLORS.I_ORANGE },
  { char: 'X', color: PIXELART_COLORS.X_YELLOW },
  { char: 'E', color: PIXELART_COLORS.E_GREEN },
  { char: 'L', color: PIXELART_COLORS.L_PURPLE },
  { char: 'A', color: PIXELART_COLORS.A_BLUE },
  { char: 'R', color: PIXELART_COLORS.R_PINK },
  { char: 'T', color: PIXELART_COLORS.T_TURQUOISE },
];

export default function PixelArtLogo({
  width = 220,
  className = '',
  animated = true,
}: PixelArtLogoProps) {
  const fontSize = Math.round((width / VIEWBOX_WIDTH) * BASE_FONT_SIZE);

  return (
    <>
      {animated && (
        <style>{`
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
          .pxl-letter {
            display: inline-block;
            animation: colorPulse 6s ease-in-out infinite;
            transform-origin: center bottom;
          }
          .pxl-letter:nth-child(1) { animation-delay: 0s; }
          .pxl-letter:nth-child(2) { animation-delay: 0.75s; }
          .pxl-letter:nth-child(3) { animation-delay: 1.5s; }
          .pxl-letter:nth-child(4) { animation-delay: 2.25s; }
          .pxl-letter:nth-child(5) { animation-delay: 3s; }
          .pxl-letter:nth-child(6) { animation-delay: 3.75s; }
          .pxl-letter:nth-child(7) { animation-delay: 4.5s; }
          .pxl-letter:nth-child(8) { animation-delay: 5.25s; }
        `}</style>
      )}
      <div
        className={className}
        role="img"
        aria-label="PixelArt Logo"
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 800,
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {LETTERS.map((letter, i) => (
          <span
            key={`${letter.char}-${i}`}
            className={animated ? 'pxl-letter' : undefined}
            style={{ color: letter.color }}
          >
            {letter.char}
          </span>
        ))}
      </div>
    </>
  );
}
