/**
 * PixelArt Design System - Tokens
 * 
 * Sistema de diseño unificado para mantener consistencia visual
 * y facilitar el mantenimiento del producto.
 */

export const tokens = {
  colors: {
    // Identidad de Custom Books (AI Books)
    customBooks: {
      primary: '#B72020',
      accent: '#d92d34',
      hover: '#e85858',
      light: 'rgba(183, 32, 32, 0.08)',
      gradient: 'linear-gradient(135deg, #B72020 0%, #d92d34 50%, #e85858 100%)',
    },
    // Identidad de Photobooks
    photobooks: {
      primary: '#2d8fd5',
      accent: '#4f97cf',
      hover: '#6bb3e0',
      light: 'rgba(79, 151, 207, 0.08)',
      gradient: 'linear-gradient(135deg, #2d8fd5 0%, #4f97cf 50%, #6bb3e0 100%)',
    },
    // Neutrales
    neutral: {
      text: {
        primary: '#111',
        secondary: '#444',
        tertiary: '#666',
        muted: '#888',
        disabled: '#aaa',
      },
      surface: {
        base: '#fff',
        subtle: '#f8f9fa',
        hover: '#f5f5f5',
        border: '#e0e0e0',
        divider: '#eeeeee',
      },
    },
    // Semánticos
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  // Sistema de espaciado basado en 4/8dp
  spacing: {
    micro: {
      xs: '4px',
      sm: '8px',
      md: '12px',
    },
    component: {
      xs: '16px',
      sm: '20px',
      md: '24px',
      lg: '28px',
    },
    section: {
      xs: '32px',
      sm: '48px',
      md: '64px',
      lg: '80px',
      xl: '96px',
    },
  },

  // Sistema tipográfico
  typography: {
    display: {
      size: '56px',
      weight: 900,
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
    },
    h1: {
      size: '48px',
      weight: 900,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
    },
    h2: {
      size: '36px',
      weight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.005em',
    },
    h3: {
      size: '28px',
      weight: 600,
      lineHeight: 1.25,
      letterSpacing: '0em',
    },
    h4: {
      size: '24px',
      weight: 600,
      lineHeight: 1.3,
      letterSpacing: '0em',
    },
    body: {
      size: '16px',
      weight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.005em',
    },
    bodyLarge: {
      size: '18px',
      weight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.003em',
    },
    small: {
      size: '14px',
      weight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.003em',
    },
    caption: {
      size: '12px',
      weight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.005em',
    },
  },

  // Border radius sistemático
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },

  // Sombras por elevación
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.10)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 40px rgba(0, 0, 0, 0.15)',
    '2xl': '0 20px 60px rgba(0, 0, 0, 0.18)',
  },

  // Transiciones
  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },

  // Breakpoints responsive
  breakpoints: {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1536,
  },
} as const;

// Helpers para usar los tokens
export const getSpacing = (category: keyof typeof tokens.spacing, size: string) => {
  return tokens.spacing[category][size as keyof typeof tokens.spacing[typeof category]];
};

export const getColor = (path: string) => {
  const parts = path.split('.');
  let current: any = tokens.colors;
  for (const part of parts) {
    current = current[part];
  }
  return current;
};

export const getTypography = (variant: keyof typeof tokens.typography) => {
  return tokens.typography[variant];
};

// Tipos para TypeScript
export type ColorPath = 
  | 'customBooks.primary'
  | 'customBooks.accent'
  | 'customBooks.hover'
  | 'customBooks.light'
  | 'photobooks.primary'
  | 'photobooks.accent'
  | 'photobooks.hover'
  | 'photobooks.light'
  | 'neutral.text.primary'
  | 'neutral.text.secondary'
  | 'neutral.text.tertiary'
  | 'neutral.text.muted'
  | 'neutral.surface.base'
  | 'neutral.surface.subtle'
  | 'neutral.surface.border';

export type TypographyVariant = keyof typeof tokens.typography;
