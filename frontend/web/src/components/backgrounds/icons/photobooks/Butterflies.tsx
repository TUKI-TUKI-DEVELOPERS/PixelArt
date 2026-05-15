export function ButterflyBlue() {
  return (
    <svg viewBox="0 0 90 75" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="wingGradTop" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#93ccf0" />
          <stop offset="50%" stopColor="#4f97cf" />
          <stop offset="100%" stopColor="#2d6ea0" />
        </radialGradient>
        <radialGradient id="wingGradBot" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#6bb3e0" />
          <stop offset="60%" stopColor="#3a84bc" />
          <stop offset="100%" stopColor="#1f5c8a" />
        </radialGradient>
        <filter id="butterflyGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Left upper wing */}
      <ellipse
        cx="28" cy="26"
        rx="24" ry="18"
        fill="url(#wingGradTop)"
        opacity="0.88"
        transform="rotate(-20 28 26)"
        filter="url(#butterflyGlow)"
      />
      {/* Right upper wing */}
      <ellipse
        cx="62" cy="26"
        rx="24" ry="18"
        fill="url(#wingGradTop)"
        opacity="0.88"
        transform="rotate(20 62 26)"
        filter="url(#butterflyGlow)"
      />
      {/* Left lower wing */}
      <ellipse
        cx="26" cy="50"
        rx="18" ry="14"
        fill="url(#wingGradBot)"
        opacity="0.78"
        transform="rotate(15 26 50)"
      />
      {/* Right lower wing */}
      <ellipse
        cx="64" cy="50"
        rx="18" ry="14"
        fill="url(#wingGradBot)"
        opacity="0.78"
        transform="rotate(-15 64 50)"
      />
      {/* Wing highlights */}
      <ellipse cx="24" cy="22" rx="10" ry="7" fill="white" opacity="0.25" transform="rotate(-20 24 22)" />
      <ellipse cx="66" cy="22" rx="10" ry="7" fill="white" opacity="0.25" transform="rotate(20 66 22)" />
      {/* Wing pattern dots */}
      <circle cx="30" cy="28" r="4" fill="white" opacity="0.3" />
      <circle cx="60" cy="28" r="4" fill="white" opacity="0.3" />
      <circle cx="27" cy="50" r="3" fill="white" opacity="0.2" />
      <circle cx="63" cy="50" r="3" fill="white" opacity="0.2" />
      {/* Body */}
      <ellipse cx="45" cy="38" rx="3" ry="18" fill="#1a4f7a" />
      {/* Head */}
      <circle cx="45" cy="18" r="4" fill="#1a4f7a" />
      {/* Antennae */}
      <path d="M45,16 Q38,8 34,4" stroke="#2d6ea0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M45,16 Q52,8 56,4" stroke="#2d6ea0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="4" r="2" fill="#4f97cf" />
      <circle cx="56" cy="4" r="2" fill="#4f97cf" />
    </svg>
  );
}

export function ButterflyOutline() {
  return (
    <svg viewBox="0 0 80 68" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="outlineWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93ccf0" />
          <stop offset="100%" stopColor="#2d8fd5" />
        </linearGradient>
        <filter id="outlineGlowBf">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Left upper wing outline */}
      <ellipse
        cx="24" cy="24"
        rx="20" ry="16"
        fill="rgba(79,151,207,0.15)"
        stroke="url(#outlineWingGrad)"
        strokeWidth="2"
        transform="rotate(-18 24 24)"
        filter="url(#outlineGlowBf)"
      />
      {/* Right upper wing outline */}
      <ellipse
        cx="56" cy="24"
        rx="20" ry="16"
        fill="rgba(79,151,207,0.15)"
        stroke="url(#outlineWingGrad)"
        strokeWidth="2"
        transform="rotate(18 56 24)"
        filter="url(#outlineGlowBf)"
      />
      {/* Left lower wing outline */}
      <ellipse
        cx="23" cy="46"
        rx="14" ry="11"
        fill="rgba(79,151,207,0.1)"
        stroke="url(#outlineWingGrad)"
        strokeWidth="1.5"
        transform="rotate(12 23 46)"
      />
      {/* Right lower wing outline */}
      <ellipse
        cx="57" cy="46"
        rx="14" ry="11"
        fill="rgba(79,151,207,0.1)"
        stroke="url(#outlineWingGrad)"
        strokeWidth="1.5"
        transform="rotate(-12 57 46)"
      />
      {/* Body */}
      <ellipse cx="40" cy="36" rx="2.5" ry="15" fill="#4f97cf" opacity="0.7" />
      {/* Antennae */}
      <path d="M40,20 Q34,12 30,8" stroke="#4f97cf" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M40,20 Q46,12 50,8" stroke="#4f97cf" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <circle cx="30" cy="8" r="1.5" fill="#6bb3e0" opacity="0.8" />
      <circle cx="50" cy="8" r="1.5" fill="#6bb3e0" opacity="0.8" />
    </svg>
  );
}
