// Gems & Diamonds — square 80x80 viewBox. Blue tones for photobooks palette.

export function DiamondGem() {
  // Classic diamond cut — top crown + bottom pavilion, front view
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="dg1Top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8f6ff" />
          <stop offset="100%" stopColor="#93ccf0" />
        </linearGradient>
        <linearGradient id="dg1Left" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6bb3e0" />
          <stop offset="100%" stopColor="#2d6ea0" />
        </linearGradient>
        <linearGradient id="dg1Right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f97cf" />
          <stop offset="100%" stopColor="#1a4f7a" />
        </linearGradient>
        <linearGradient id="dg1Bot" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d8fd5" />
          <stop offset="100%" stopColor="#0e3a5e" />
        </linearGradient>
        <filter id="dg1Glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Crown — top trapezoid with table facets */}
      {/* Table (top flat face) */}
      <polygon points="30,16 50,16 58,26 22,26" fill="url(#dg1Top)" />
      {/* Crown left facet */}
      <polygon points="16,32 22,26 30,16 22,32" fill="url(#dg1Left)" />
      {/* Crown right facet */}
      <polygon points="64,32 58,26 50,16 58,32" fill="url(#dg1Right)" />
      {/* Crown front-left facet */}
      <polygon points="16,32 22,26 40,26 40,32" fill="url(#dg1Left)" opacity="0.85" />
      {/* Crown front-right facet */}
      <polygon points="64,32 58,26 40,26 40,32" fill="url(#dg1Right)" opacity="0.85" />
      {/* Girdle line */}
      <line x1="16" y1="32" x2="64" y2="32" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      {/* Pavilion — bottom triangle with facets */}
      {/* Pavilion left */}
      <polygon points="16,32 40,32 40,64" fill="url(#dg1Left)" />
      {/* Pavilion right */}
      <polygon points="64,32 40,32 40,64" fill="url(#dg1Bot)" />
      {/* Pavilion center line */}
      <line x1="40" y1="32" x2="40" y2="64" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      {/* Inner facet lines on crown */}
      <line x1="22" y1="26" x2="40" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />
      <line x1="58" y1="26" x2="40" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />
      {/* Highlight on table */}
      <polygon points="33,17 47,17 53,24 27,24" fill="white" opacity="0.25" />
      {/* Sparkle top */}
      <path d="M 40,9 L 41,12 L 44,13 L 41,14 L 40,17 L 39,14 L 36,13 L 39,12 Z" fill="white" opacity="0.8" filter="url(#dg1Glow)" />
    </svg>
  );
}

export function CrystalGem() {
  // Hexagonal crystal gem — like an emerald cut viewed from above with depth
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="cg1A" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cce8f8" />
          <stop offset="100%" stopColor="#4f97cf" />
        </linearGradient>
        <linearGradient id="cg1B" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a84bc" />
          <stop offset="100%" stopColor="#1a4a72" />
        </linearGradient>
        <linearGradient id="cg1C" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a3a5e" />
          <stop offset="100%" stopColor="#2d6ea0" />
        </linearGradient>
        <filter id="cg1Glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer hexagon shape */}
      {/* Top-left face */}
      <polygon points="40,14 58,24 40,34 22,24" fill="url(#cg1A)" />
      {/* Left face */}
      <polygon points="22,24 40,34 40,54 22,44" fill="url(#cg1B)" />
      {/* Right face */}
      <polygon points="58,24 40,34 40,54 58,44" fill="url(#cg1C)" />
      {/* Bottom face */}
      <polygon points="22,44 40,54 58,44 40,66" fill="url(#cg1B)" opacity="0.8" />
      {/* Inner facet lines */}
      <line x1="40" y1="14" x2="40" y2="34" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
      <line x1="22" y1="24" x2="58" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <line x1="58" y1="24" x2="22" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <line x1="40" y1="34" x2="40" y2="54" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <line x1="40" y1="34" x2="22" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      <line x1="40" y1="34" x2="58" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
      {/* Edge outlines */}
      <polygon points="40,14 58,24 58,44 40,66 22,44 22,24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      {/* Top highlight */}
      <polygon points="40,15 55,23 40,30 25,23" fill="white" opacity="0.2" />
      {/* Sparkle */}
      <path d="M 40,7 L 41,10 L 44,11 L 41,12 L 40,15 L 39,12 L 36,11 L 39,10 Z" fill="white" opacity="0.85" filter="url(#cg1Glow)" />
    </svg>
  );
}

export function GemFaceted() {
  // Oval/pear cut gem — teardrop shape with many facets
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="gf1Grad" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#e0f2fc" />
          <stop offset="35%" stopColor="#93ccf0" />
          <stop offset="70%" stopColor="#2d8fd5" />
          <stop offset="100%" stopColor="#0e3a5e" />
        </radialGradient>
        <linearGradient id="gf1Side" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f97cf" />
          <stop offset="100%" stopColor="#1a4a72" />
        </linearGradient>
        <filter id="gf1Glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer glow */}
      <ellipse cx="40" cy="40" r="28" fill="rgba(79,151,207,0.2)" filter="url(#gf1Glow)" />
      {/* Main gem body — rounded rectangle (emerald cut) */}
      <rect x="18" y="22" width="44" height="36" rx="6" fill="url(#gf1Grad)" />
      {/* Inner table facet */}
      <rect x="26" y="29" width="28" height="22" rx="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      {/* Corner facet lines */}
      <line x1="18" y1="22" x2="26" y2="29" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <line x1="62" y1="22" x2="54" y2="29" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <line x1="18" y1="58" x2="26" y2="51" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <line x1="62" y1="58" x2="54" y2="51" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      {/* Center cross facets */}
      <line x1="26" y1="29" x2="54" y2="51" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
      <line x1="54" y1="29" x2="26" y2="51" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
      {/* Top highlight */}
      <rect x="22" y="24" width="26" height="12" rx="4" fill="white" opacity="0.16" />
      {/* Sparkles on corners */}
      <path d="M 40,13 L 41,16 L 44,17 L 41,18 L 40,21 L 39,18 L 36,17 L 39,16 Z" fill="white" opacity="0.85" filter="url(#gf1Glow)" />
      <circle cx="14" cy="40" r="2" fill="white" opacity="0.5" filter="url(#gf1Glow)" />
      <circle cx="66" cy="40" r="2" fill="white" opacity="0.5" filter="url(#gf1Glow)" />
    </svg>
  );
}
