'use client';

import { BASE_COLORS } from '@/lib/colors';

interface HamburgerIconProps {
  open: boolean;
  onClick: () => void;
}

/**
 * Icono de hamburguesa con animación a X
 * 
 * Tres líneas que se transforman en X cuando open=true.
 * Usado para el menú mobile.
 */
export default function HamburgerIcon({ open, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={open}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '18px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Línea superior */}
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: BASE_COLORS.inkSepia,
            borderRadius: '2px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: open ? 'rotate(45deg) translateY(8px)' : 'rotate(0) translateY(0)',
            transformOrigin: 'center',
          }}
        />
        
        {/* Línea media */}
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: BASE_COLORS.inkSepia,
            borderRadius: '2px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: open ? 0 : 1,
            transform: open ? 'translateX(-10px)' : 'translateX(0)',
          }}
        />
        
        {/* Línea inferior */}
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: BASE_COLORS.inkSepia,
            borderRadius: '2px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: open ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0) translateY(0)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </button>
  );
}
