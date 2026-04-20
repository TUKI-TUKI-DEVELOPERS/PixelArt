export function Film35mm() {
  return (
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="filmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="50%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      {/* Film strip base */}
      <rect x="5" y="8" width="90" height="34" fill="url(#filmGrad)" rx="2" />
      {/* Top perforations */}
      <rect x="8" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="15" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="22" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="38" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="45" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="52" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="68" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="75" y="10" width="4" height="3" fill="#0a0a0a" />
      <rect x="82" y="10" width="4" height="3" fill="#0a0a0a" />
      {/* Bottom perforations */}
      <rect x="8" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="15" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="22" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="38" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="45" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="52" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="68" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="75" y="37" width="4" height="3" fill="#0a0a0a" />
      <rect x="82" y="37" width="4" height="3" fill="#0a0a0a" />
      {/* Frame divisions */}
      <line x1="32" y1="14" x2="32" y2="36" stroke="#0a0a0a" strokeWidth="1" />
      <line x1="62" y1="14" x2="62" y2="36" stroke="#0a0a0a" strokeWidth="1" />
      {/* Frames with slight transparency */}
      <rect x="10" y="16" width="20" height="18" fill="#3a3a3a" opacity="0.5" />
      <rect x="34" y="16" width="26" height="18" fill="#3a3a3a" opacity="0.5" />
      <rect x="64" y="16" width="26" height="18" fill="#3a3a3a" opacity="0.5" />
      {/* Highlight reflection on top */}
      <rect x="5" y="8" width="90" height="4" fill="white" opacity="0.1" />
    </svg>
  );
}

export function FilmRoll() {
  return (
    <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="rollGrad">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
        <linearGradient id="filmStripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#4a4a4a" />
        </linearGradient>
      </defs>
      {/* Outer reel */}
      <circle cx="32.5" cy="32.5" r="28" fill="url(#rollGrad)" stroke="#0a0a0a" strokeWidth="1.5" />
      {/* Inner reel */}
      <circle cx="32.5" cy="32.5" r="22" fill="#2a2a2a" />
      {/* Center hub */}
      <circle cx="32.5" cy="32.5" r="8" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1" />
      {/* Film wound lines */}
      <circle cx="32.5" cy="32.5" r="25" fill="none" stroke="#3a3a3a" strokeWidth="0.5" />
      <circle cx="32.5" cy="32.5" r="20" fill="none" stroke="#3a3a3a" strokeWidth="0.5" />
      <circle cx="32.5" cy="32.5" r="15" fill="none" stroke="#3a3a3a" strokeWidth="0.5" />
      <circle cx="32.5" cy="32.5" r="12" fill="none" stroke="#3a3a3a" strokeWidth="0.5" />
      {/* Film strip coming out */}
      <rect x="50" y="28" width="12" height="9" fill="url(#filmStripGrad)" rx="1" />
      {/* Perforations on visible film */}
      <rect x="51" y="29" width="1.5" height="1" fill="#0a0a0a" />
      <rect x="53" y="29" width="1.5" height="1" fill="#0a0a0a" />
      <rect x="55" y="29" width="1.5" height="1" fill="#0a0a0a" />
      <rect x="51" y="35" width="1.5" height="1" fill="#0a0a0a" />
      <rect x="53" y="35" width="1.5" height="1" fill="#0a0a0a" />
      <rect x="55" y="35" width="1.5" height="1" fill="#0a0a0a" />
      {/* Metallic highlights */}
      <path d="M15,18 Q25,12 35,15" stroke="#5a5a5a" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="32.5" cy="32.5" r="5" fill="white" opacity="0.1" />
    </svg>
  );
}
