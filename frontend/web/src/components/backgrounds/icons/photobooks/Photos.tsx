export function PolaroidEmpty() {
  return (
    <svg viewBox="0 0 70 85" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <filter id="polaroidShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Polaroid frame */}
      <rect
        x="5"
        y="5"
        width="60"
        height="75"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="1"
        filter="url(#polaroidShadow)"
      />
      {/* Photo area */}
      <rect x="10" y="10" width="50" height="50" fill="#f5f5f5" />
      {/* Bottom space for writing */}
      <rect x="10" y="60" width="50" height="15" fill="white" />
      {/* Subtle border */}
      <rect
        x="10"
        y="10"
        width="50"
        height="50"
        fill="none"
        stroke="#d0d0d0"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function PolaroidLandscape() {
  return (
    <svg viewBox="0 0 70 85" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87ceeb" />
          <stop offset="100%" stopColor="#4f97cf" />
        </linearGradient>
        <filter id="polaroidShadow2">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Polaroid frame */}
      <rect
        x="5"
        y="5"
        width="60"
        height="75"
        fill="white"
        stroke="#e0e0e0"
        strokeWidth="1"
        filter="url(#polaroidShadow2)"
      />
      {/* Sky */}
      <rect x="10" y="10" width="50" height="30" fill="url(#skyGrad)" />
      {/* Mountains */}
      <path d="M10,35 L25,20 L35,30 L45,18 L60,35 Z" fill="#6bb3e0" opacity="0.7" />
      <path d="M10,40 L20,25 L32,35 L48,22 L60,40 Z" fill="#4f97cf" opacity="0.8" />
      {/* Ground */}
      <rect x="10" y="40" width="50" height="20" fill="#95e1d3" opacity="0.6" />
      {/* Sun */}
      <circle cx="52" cy="18" r="6" fill="#ffe66d" opacity="0.9" />
      {/* Bottom space */}
      <rect x="10" y="60" width="50" height="15" fill="white" />
    </svg>
  );
}

export function FrameRectangle() {
  return (
    <svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b6f47" />
          <stop offset="50%" stopColor="#6f5539" />
          <stop offset="100%" stopColor="#5a432e" />
        </linearGradient>
        <pattern id="woodTexture" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#5a432e" strokeWidth="0.3" opacity="0.5" />
        </pattern>
      </defs>
      {/* Outer frame */}
      <rect
        x="5"
        y="5"
        width="70"
        height="90"
        fill="url(#woodGrad)"
        stroke="#4a3520"
        strokeWidth="1.5"
      />
      {/* Wood texture */}
      <rect x="5" y="5" width="70" height="90" fill="url(#woodTexture)" />
      {/* Inner bevel */}
      <rect
        x="12"
        y="12"
        width="56"
        height="76"
        fill="none"
        stroke="#9b7f57"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Inner opening */}
      <rect x="15" y="15" width="50" height="70" fill="#2a2a2a" opacity="0.3" />
      {/* Corner decorations */}
      <circle cx="12" cy="12" r="2" fill="#9b7f57" opacity="0.8" />
      <circle cx="68" cy="12" r="2" fill="#9b7f57" opacity="0.8" />
      <circle cx="12" cy="88" r="2" fill="#9b7f57" opacity="0.8" />
      <circle cx="68" cy="88" r="2" fill="#9b7f57" opacity="0.8" />
    </svg>
  );
}

export function FrameCircle() {
  return (
    <svg viewBox="0 0 85 85" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="bronzeGrad">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#c19a2e" />
          <stop offset="100%" stopColor="#9b7922" />
        </radialGradient>
        <filter id="metallic">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="0" dy="1" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer frame */}
      <circle
        cx="42.5"
        cy="42.5"
        r="38"
        fill="url(#bronzeGrad)"
        stroke="#8b6914"
        strokeWidth="2"
        filter="url(#metallic)"
      />
      {/* Ornamental pattern */}
      <circle cx="42.5" cy="42.5" r="35" fill="none" stroke="#ecd89d" strokeWidth="0.8" opacity="0.6" />
      <circle cx="42.5" cy="42.5" r="32" fill="none" stroke="#8b6914" strokeWidth="0.5" />
      {/* Inner opening */}
      <circle cx="42.5" cy="42.5" r="28" fill="#2a2a2a" opacity="0.3" />
      {/* Highlights */}
      <path
        d="M20,25 Q30,20 40,22"
        stroke="#ecd89d"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      {/* Decorative dots */}
      <circle cx="42.5" cy="8" r="1.5" fill="#ecd89d" opacity="0.7" />
      <circle cx="42.5" cy="77" r="1.5" fill="#ecd89d" opacity="0.7" />
      <circle cx="8" cy="42.5" r="1.5" fill="#ecd89d" opacity="0.7" />
      <circle cx="77" cy="42.5" r="1.5" fill="#ecd89d" opacity="0.7" />
    </svg>
  );
}
