export function HeartSolid() {
  return (
    <svg viewBox="0 0 80 72" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="heartGrad1">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="50%" stopColor="#e85858" />
          <stop offset="100%" stopColor="#d92d34" />
        </radialGradient>
        <filter id="heartShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Sombra base */}
      <path
        d="M40,65 C40,65 10,40 10,25 C10,15 15,10 22,10 C30,10 35,15 40,22 C45,15 50,10 58,10 C65,10 70,15 70,25 C70,40 40,65 40,65 Z"
        fill="#B72020"
        opacity="0.4"
        filter="url(#heartShadow)"
      />
      {/* Corazón principal */}
      <path
        d="M40,65 C40,65 10,40 10,25 C10,15 15,10 22,10 C30,10 35,15 40,22 C45,15 50,10 58,10 C65,10 70,15 70,25 C70,40 40,65 40,65 Z"
        fill="url(#heartGrad1)"
      />
      {/* Highlight superior izquierdo */}
      <ellipse cx="25" cy="18" rx="8" ry="6" fill="white" opacity="0.35" />
      {/* Shine line */}
      <path
        d="M28,15 Q32,20 35,28"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
}

export function HeartOutline() {
  return (
    <svg viewBox="0 0 90 82" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="heartOutlineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#d92d34" />
        </linearGradient>
        <filter id="outlineGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Corazón outline */}
      <path
        d="M45,72 C45,72 12,45 12,28 C12,16 18,10 26,10 C35,10 40,16 45,24 C50,16 55,10 64,10 C72,10 78,16 78,28 C78,45 45,72 45,72 Z"
        fill="none"
        stroke="url(#heartOutlineGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#outlineGlow)"
      />
      {/* Inner highlight line */}
      <path
        d="M45,70 C45,70 15,46 15,30 C15,19 20,13 27,13 C34,13 39,18 45,25"
        fill="none"
        stroke="#ff8a8a"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

export function HeartGlow() {
  return (
    <svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="glowGrad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ff6b6b" />
          <stop offset="70%" stopColor="#e85858" />
          <stop offset="100%" stopColor="#d92d34" />
        </radialGradient>
        <filter id="heartGlow">
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="saturate" values="1.5" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
        </filter>
      </defs>
      {/* Outer glow layer */}
      <path
        d="M50,80 C50,80 15,50 15,30 C15,18 21,12 29,12 C38,12 44,18 50,27 C56,18 62,12 71,12 C79,12 85,18 85,30 C85,50 50,80 50,80 Z"
        fill="url(#glowGrad)"
        filter="url(#heartGlow)"
        opacity="0.8"
      />
      {/* Core heart */}
      <path
        d="M50,78 C50,78 17,49 17,31 C17,20 22,14 29,14 C37,14 43,20 50,28 C57,20 63,14 71,14 C78,14 83,20 83,31 C83,49 50,78 50,78 Z"
        fill="url(#glowGrad)"
      />
      {/* Central bright spot */}
      <ellipse cx="50" cy="35" rx="12" ry="10" fill="white" opacity="0.4" />
      {/* Sparkle points */}
      <circle cx="35" cy="25" r="2" fill="white" opacity="0.7" />
      <circle cx="65" cy="28" r="1.5" fill="white" opacity="0.6" />
      <circle cx="50" cy="20" r="2.5" fill="white" opacity="0.8" />
    </svg>
  );
}
