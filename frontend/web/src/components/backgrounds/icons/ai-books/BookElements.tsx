export function PageTurning() {
  return (
    <svg viewBox="0 0 70 85" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f8f8f8" />
          <stop offset="100%" stopColor="#eeeeee" />
        </linearGradient>
        <filter id="pageShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="3" dy="2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Sombra de página */}
      <path
        d="M10,10 L50,10 Q60,10 65,20 L65,75 Q60,70 50,70 L10,70 Z"
        fill="#d0d0d0"
        opacity="0.5"
      />
      {/* Página principal con curva 3D */}
      <path
        d="M12,12 L52,12 Q62,12 67,22 L67,77 Q62,72 52,72 L12,72 Z"
        fill="url(#pageGrad)"
        filter="url(#pageShadow)"
      />
      {/* Líneas de texto simuladas */}
      <line x1="18" y1="20" x2="55" y2="20" stroke="#999" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="27" x2="58" y2="27" stroke="#999" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="34" x2="52" y2="34" stroke="#999" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="41" x2="56" y2="41" stroke="#999" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="48" x2="50" y2="48" stroke="#999" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="55" x2="54" y2="55" stroke="#999" strokeWidth="1" opacity="0.4" />
      {/* Borde curvo destacado */}
      <path
        d="M52,12 Q62,12 67,22 L67,77 Q62,72 52,72"
        fill="none"
        stroke="#ddd"
        strokeWidth="1.5"
      />
      {/* Curl highlight */}
      <path
        d="M60,15 Q64,18 64,25"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function OpenBook() {
  return (
    <svg viewBox="0 0 95 70" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="leftPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="rightPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f0f0" />
        </linearGradient>
      </defs>
      {/* Libro base (spine shadow) */}
      <rect x="45" y="15" width="5" height="50" fill="#ccc" opacity="0.6" />
      {/* Página izquierda */}
      <path d="M10,20 L45,15 L45,65 L10,68 Z" fill="url(#leftPageGrad)" />
      {/* Página derecha */}
      <path d="M50,15 L85,20 L85,68 L50,65 Z" fill="url(#rightPageGrad)" />
      {/* Texto página izquierda */}
      <line x1="15" y1="25" x2="38" y2="23" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="32" x2="40" y2="30" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="39" x2="36" y2="37" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      <line x1="15" y1="46" x2="38" y2="44" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      {/* Texto página derecha */}
      <line x1="55" y1="23" x2="78" y2="25" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="30" x2="80" y2="32" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="37" x2="76" y2="39" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="44" x2="78" y2="46" stroke="#aaa" strokeWidth="0.8" opacity="0.5" />
      {/* Spine central */}
      <line x1="47.5" y1="15" x2="47.5" y2="65" stroke="#999" strokeWidth="1.5" />
      {/* Highlights en bordes */}
      <path d="M10,20 L45,15" stroke="white" strokeWidth="1" opacity="0.4" />
      <path d="M50,15 L85,20" stroke="white" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
