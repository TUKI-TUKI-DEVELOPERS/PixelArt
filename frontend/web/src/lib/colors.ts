/**
 * PixelArt Design System - Color Palette
 * 
 * Paleta de colores basada en el diseño Figma del logo PIXELART.
 * Cada letra tiene su propio color vibrante, representando creatividad
 * y personalización artesanal.
 */

export const PIXELART_COLORS = {
  P_RED: '#B72028',        // Rojo - Pasión, amor
  I_ORANGE: '#EA6F29',     // Naranja - Energía, creatividad
  X_YELLOW: '#F0B02A',     // Amarillo - Alegría, optimismo
  E_GREEN: '#88C343',      // Verde lima - Crecimiento, familia
  L_PURPLE: '#804187',     // Púrpura - Lujo, imaginación
  A_BLUE: '#2B86BF',       // Azul - Confianza, tranquilidad
  R_PINK: '#DF1F74',       // Rosa magenta - Afecto, dulzura
  T_TURQUOISE: '#44B9B1',  // Turquesa - Frescura, creatividad
} as const;

/**
 * Array de colores en orden para animaciones de gradiente
 */
export const COLORS_ARRAY = Object.values(PIXELART_COLORS);

/**
 * Colores base del sistema - tonos cálidos inspirados en papel y tinta
 */
export const BASE_COLORS = {
  paperCream: 'rgba(250, 248, 243, 0.92)',   // Fondo papel crema cálido
  paperCreamSolid: '#FAF8F3',                // Versión sólida
  inkSepia: '#8B7355',                       // Color tinta sepia para texto
  inkSepiaLight: 'rgba(139, 115, 85, 0.6)',  // Versión light para borders
} as const;

/**
 * Tokens de diseño para el sistema
 */
export const DESIGN_TOKENS = {
  colors: {
    pixelart: PIXELART_COLORS,
    base: BASE_COLORS,
  },
  spacing: {
    navbarPadding: {
      mobile: '16px',
      tablet: '32px',
      desktop: '48px',
    },
    navbarHeight: {
      mobile: '64px',
      desktop: '80px',
    },
  },
  animation: {
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.45, 0, 0.55, 1)',
    },
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      logoShift: '8s',
      gradientMove: '20s',
    },
  },
  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },
} as const;

/**
 * Paleta Maternal - Para backgrounds de libros de familia
 * 
 * Colores cálidos, celestiales y envolventes inspirados en
 * el amor maternal: luz del amanecer, algodón suave, crema de pastel.
 */
export const MATERNAL_PALETTE = {
  center: '#FFFBF8',      // Blanco cálido central - luz maternal
  glow: '#FFF5EB',        // Crema marfil resplandor - abrazo suave
  cloud: '#FFE8DC',       // Melocotón suave - mejilla de bebé
  shadow: '#F8F3E8',      // Champagne sombra - recuerdos dorados
  rose: '#FFEEF0',        // Rosa pastel - amor tierno
  gold: '#F8F3E8',        // Dorado champagne - momentos preciosos
} as const;

/**
 * Helper para convertir colores hex a rgba
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
