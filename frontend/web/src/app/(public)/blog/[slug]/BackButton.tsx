'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Disparar el loader ANTES de navegar — el listener en PageTransitionLoader
    // lo captura y muestra la animación, luego navegamos un frame después.
    window.dispatchEvent(new Event('pixelart:nav-start'));
    requestAnimationFrame(() => router.back());
  };

  return (
    <button
      onClick={handleBack}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '9999px',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.25)',
        color: '#fff',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        letterSpacing: '0.01em',
      }}
    >
      ← Volver
    </button>
  );
}
