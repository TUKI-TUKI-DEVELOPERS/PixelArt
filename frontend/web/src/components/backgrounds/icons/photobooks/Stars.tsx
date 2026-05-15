export function StarFour() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="starFourGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#93ccf0" />
          <stop offset="100%" stopColor="#4f97cf" />
        </radialGradient>
        <filter id="starFourGlow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 4-pointed star */}
      <path
        d="M40,8 C40,8 44,28 60,32 C44,36 40,56 40,56 C40,56 36,36 20,32 C36,28 40,8 40,8 Z"
        fill="url(#starFourGrad)"
        filter="url(#starFourGlow)"
      />
      {/* Center bright */}
      <circle cx="40" cy="32" r="5" fill="white" opacity="0.8" />
    </svg>
  );
}

export function StarSix() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="starSixGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#6bb3e0" />
          <stop offset="100%" stopColor="#2d8fd5" />
        </radialGradient>
        <filter id="starSixGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 6-pointed sparkle */}
      <path
        d="M40,6 C40,6 43,24 58,28 C43,32 40,50 40,50 C40,50 37,32 22,28 C37,24 40,6 40,6 Z"
        fill="url(#starSixGrad)"
        filter="url(#starSixGlow)"
      />
      <path
        d="M12,28 C12,28 28,25 32,10 C36,25 52,28 52,28 C52,28 36,31 32,46 C28,31 12,28 12,28 Z"
        fill="url(#starSixGrad)"
        opacity="0.6"
        filter="url(#starSixGlow)"
        transform="translate(8, 0)"
      />
      <circle cx="40" cy="28" r="4" fill="white" opacity="0.9" />
    </svg>
  );
}

export function StarGlow() {
  return (
    <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="starGlowOuter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="50%" stopColor="rgba(147,204,240,0.5)" />
          <stop offset="100%" stopColor="rgba(79,151,207,0)" />
        </radialGradient>
        <radialGradient id="starGlowCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#93ccf0" />
          <stop offset="100%" stopColor="#4f97cf" />
        </radialGradient>
      </defs>
      {/* Outer glow halo */}
      <circle cx="45" cy="45" r="40" fill="url(#starGlowOuter)" opacity="0.5" />
      {/* Star shape */}
      <path
        d="M45,10 C45,10 49,32 68,38 C49,44 45,66 45,66 C45,66 41,44 22,38 C41,32 45,10 45,10 Z"
        fill="url(#starGlowCore)"
      />
      {/* Secondary cross arms */}
      <path
        d="M45,22 C45,22 47,36 56,38 C47,40 45,54 45,54 C45,54 43,40 34,38 C43,36 45,22 45,22 Z"
        fill="white"
        opacity="0.6"
        transform="rotate(45 45 38)"
      />
      <circle cx="45" cy="38" r="6" fill="white" opacity="0.95" />
    </svg>
  );
}
