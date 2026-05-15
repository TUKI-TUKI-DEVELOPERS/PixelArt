// Crescent moons — square 80x80 viewBox for FloatingElement container.
// Crescent shape: filled circle masked by an offset circle.

export function MoonCrescent() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="moon1Grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e8f4fc" />
          <stop offset="50%" stopColor="#93ccf0" />
          <stop offset="100%" stopColor="#2d8fd5" />
        </radialGradient>
        <mask id="moon1Mask">
          <rect width="80" height="80" fill="white" />
          {/* Bite circle — offset up-right to carve the crescent */}
          <circle cx="50" cy="30" r="24" fill="black" />
        </mask>
        <filter id="moon1Glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Soft outer glow */}
      <circle cx="40" cy="42" r="27" fill="rgba(79,151,207,0.25)" filter="url(#moon1Glow)" />
      {/* Moon body */}
      <circle cx="40" cy="42" r="26" fill="url(#moon1Grad)" mask="url(#moon1Mask)" />
      {/* Inner edge highlight */}
      <circle
        cx="40" cy="42" r="26"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        mask="url(#moon1Mask)"
      />
      {/* Top-left shine */}
      <ellipse cx="28" cy="32" rx="7" ry="5" fill="white" opacity="0.3" mask="url(#moon1Mask)" transform="rotate(-20 28 32)" />
    </svg>
  );
}

export function MoonThin() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="moon2Grad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f0f8fe" />
          <stop offset="40%" stopColor="#6bb3e0" />
          <stop offset="100%" stopColor="#1a5f8a" />
        </radialGradient>
        {/* Larger bite → thinner crescent */}
        <mask id="moon2Mask">
          <rect width="80" height="80" fill="white" />
          <circle cx="52" cy="32" r="26" fill="black" />
        </mask>
        <filter id="moon2Glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="40" cy="42" r="27" fill="rgba(107,179,224,0.2)" filter="url(#moon2Glow)" />
      <circle cx="40" cy="42" r="26" fill="url(#moon2Grad)" mask="url(#moon2Mask)" />
      <circle
        cx="40" cy="42" r="26"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        mask="url(#moon2Mask)"
      />
      {/* Small star near the tips */}
      <path
        d="M 62,18 L 63.5,22 L 67,23 L 63.5,24 L 62,28 L 60.5,24 L 57,23 L 60.5,22 Z"
        fill="white"
        opacity="0.7"
        filter="url(#moon2Glow)"
      />
    </svg>
  );
}

export function MoonGlow() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="moon3Grad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#c8e6f7" />
          <stop offset="75%" stopColor="#4f97cf" />
          <stop offset="100%" stopColor="#1a5080" />
        </radialGradient>
        <radialGradient id="moon3Halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(147,204,240,0.5)" />
          <stop offset="100%" stopColor="rgba(79,151,207,0)" />
        </radialGradient>
        <mask id="moon3Mask">
          <rect width="80" height="80" fill="white" />
          <circle cx="51" cy="31" r="25" fill="black" />
        </mask>
        <filter id="moon3Glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Wide halo */}
      <circle cx="40" cy="42" r="34" fill="url(#moon3Halo)" />
      {/* Glow layer */}
      <circle cx="40" cy="42" r="27" fill="rgba(147,204,240,0.35)" filter="url(#moon3Glow)" mask="url(#moon3Mask)" />
      {/* Moon body */}
      <circle cx="40" cy="42" r="26" fill="url(#moon3Grad)" mask="url(#moon3Mask)" />
      {/* Highlight */}
      <ellipse cx="27" cy="31" rx="8" ry="5" fill="white" opacity="0.4" mask="url(#moon3Mask)" transform="rotate(-25 27 31)" />
    </svg>
  );
}
