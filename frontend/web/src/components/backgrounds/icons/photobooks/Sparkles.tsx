export function SparkleCross() {
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="sparkleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#6bb3e0" />
        </linearGradient>
        <filter id="sparkleGlow1">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main cross sparkle */}
      <path
        d="M30,4 C30,4 32,18 44,22 C32,26 30,40 30,40 C30,40 28,26 16,22 C28,18 30,4 30,4 Z"
        fill="url(#sparkleGrad1)"
        filter="url(#sparkleGlow1)"
      />
      {/* Diagonal cross */}
      <path
        d="M30,4 C30,4 32,18 44,22 C32,26 30,40 30,40 C30,40 28,26 16,22 C28,18 30,4 30,4 Z"
        fill="url(#sparkleGrad1)"
        opacity="0.5"
        transform="rotate(45 30 22)"
      />
      <circle cx="30" cy="22" r="3" fill="white" opacity="0.95" />
    </svg>
  );
}

export function SparkleBurst() {
  return (
    <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="burstGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#93ccf0" />
          <stop offset="100%" stopColor="#2d8fd5" />
        </radialGradient>
        <filter id="burstGlow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 8-point burst */}
      <path
        d="M35,5 C35,5 37,20 50,22 C37,24 35,39 35,39 C35,39 33,24 20,22 C33,20 35,5 35,5 Z"
        fill="url(#burstGrad)"
        filter="url(#burstGlow)"
      />
      <path
        d="M35,5 C35,5 37,20 50,22 C37,24 35,39 35,39 C35,39 33,24 20,22 C33,20 35,5 35,5 Z"
        fill="url(#burstGrad)"
        opacity="0.7"
        transform="rotate(45 35 22)"
        filter="url(#burstGlow)"
      />
      {/* Small dots around center */}
      <circle cx="35" cy="10" r="2" fill="white" opacity="0.7" />
      <circle cx="48" cy="16" r="1.5" fill="white" opacity="0.6" />
      <circle cx="48" cy="28" r="1.5" fill="white" opacity="0.6" />
      <circle cx="35" cy="34" r="2" fill="white" opacity="0.7" />
      <circle cx="22" cy="28" r="1.5" fill="white" opacity="0.6" />
      <circle cx="22" cy="16" r="1.5" fill="white" opacity="0.6" />
      {/* Center */}
      <circle cx="35" cy="22" r="4" fill="white" opacity="0.95" />
    </svg>
  );
}

export function SparkleTrail() {
  return (
    <svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(79,151,207,0)" />
          <stop offset="60%" stopColor="rgba(147,204,240,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
        </linearGradient>
      </defs>
      {/* Trail line */}
      <path
        d="M10,25 Q35,18 65,25"
        stroke="url(#trailGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* End sparkle */}
      <path
        d="M68,25 C68,25 70,18 76,17 C70,16 68,9 68,9 C68,9 66,16 60,17 C66,18 68,25 68,25 Z"
        fill="white"
        opacity="0.9"
      />
      {/* Small sparkles along trail */}
      <circle cx="30" cy="21" r="1.5" fill="#93ccf0" opacity="0.7" />
      <circle cx="48" cy="23" r="1" fill="#6bb3e0" opacity="0.6" />
    </svg>
  );
}
