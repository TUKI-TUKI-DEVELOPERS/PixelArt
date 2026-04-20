export function FlashStarburst() {
  return (
    <svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="starburstGrad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffe082" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* Central bright spot */}
      <circle cx="37.5" cy="37.5" r="8" fill="white" opacity="0.9" />
      {/* Main rays (8 primary) */}
      <path
        d="M37.5,37.5 L37.5,5"
        stroke="url(#starburstGrad)"
        strokeWidth="4"
        opacity="0.8"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L37.5,70"
        stroke="url(#starburstGrad)"
        strokeWidth="4"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L5,37.5"
        stroke="url(#starburstGrad)"
        strokeWidth="4"
        opacity="0.8"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L70,37.5"
        stroke="url(#starburstGrad)"
        strokeWidth="4"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L10,10"
        stroke="url(#starburstGrad)"
        strokeWidth="3"
        opacity="0.75"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L65,65"
        stroke="url(#starburstGrad)"
        strokeWidth="3"
        opacity="0.65"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L65,10"
        stroke="url(#starburstGrad)"
        strokeWidth="3"
        opacity="0.75"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L10,65"
        stroke="url(#starburstGrad)"
        strokeWidth="3"
        opacity="0.65"
        strokeLinecap="round"
      />
      {/* Secondary rays (4 smaller) */}
      <path
        d="M37.5,37.5 L20,15"
        stroke="url(#starburstGrad)"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L55,15"
        stroke="url(#starburstGrad)"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L20,60"
        stroke="url(#starburstGrad)"
        strokeWidth="2"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M37.5,37.5 L55,60"
        stroke="url(#starburstGrad)"
        strokeWidth="2"
        opacity="0.55"
        strokeLinecap="round"
      />
      {/* Core glow */}
      <circle cx="37.5" cy="37.5" r="12" fill="url(#starburstGrad)" opacity="0.5" />
    </svg>
  );
}

export function FlashGlow() {
  return (
    <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="glowGrad1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="glowGrad2">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="60%" stopColor="rgba(255,249,196,0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      {/* Outer glow circle */}
      <circle
        cx="45"
        cy="45"
        r="40"
        fill="url(#glowGrad2)"
        filter="url(#softGlow)"
        opacity="0.4"
      />
      {/* Mid glow circle */}
      <circle
        cx="45"
        cy="45"
        r="28"
        fill="url(#glowGrad1)"
        filter="url(#softGlow)"
        opacity="0.6"
      />
      {/* Inner bright circle */}
      <circle cx="45" cy="45" r="15" fill="url(#glowGrad1)" opacity="0.8" />
      {/* Core white spot */}
      <circle cx="45" cy="45" r="8" fill="white" opacity="0.9" />
      {/* Lens flare accent */}
      <ellipse
        cx="35"
        cy="38"
        rx="8"
        ry="5"
        fill="white"
        opacity="0.3"
        transform="rotate(-30 35 38)"
      />
    </svg>
  );
}
