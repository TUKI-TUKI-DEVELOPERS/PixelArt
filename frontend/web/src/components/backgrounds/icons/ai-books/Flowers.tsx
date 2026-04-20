export function Rose() {
  return (
    <svg viewBox="0 0 75 90" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="roseGrad">
          <stop offset="0%" stopColor="#ff6b9d" />
          <stop offset="50%" stopColor="#ff8fab" />
          <stop offset="100%" stopColor="#ffc1d4" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5a8a5a" />
          <stop offset="100%" stopColor="#4a7c59" />
        </linearGradient>
      </defs>
      {/* Stem */}
      <path
        d="M37,45 Q35,60 38,90"
        stroke="url(#stemGrad)"
        strokeWidth="3"
        fill="none"
      />
      {/* Leaf */}
      <ellipse
        cx="32"
        cy="65"
        rx="8"
        ry="5"
        fill="#5a8a5a"
        opacity="0.8"
        transform="rotate(-25 32 65)"
      />
      {/* Outer petals */}
      <ellipse
        cx="25"
        cy="28"
        rx="12"
        ry="15"
        fill="url(#roseGrad)"
        opacity="0.7"
        transform="rotate(-30 25 28)"
      />
      <ellipse
        cx="50"
        cy="28"
        rx="12"
        ry="15"
        fill="url(#roseGrad)"
        opacity="0.7"
        transform="rotate(30 50 28)"
      />
      <ellipse
        cx="37.5"
        cy="15"
        rx="12"
        ry="15"
        fill="url(#roseGrad)"
        opacity="0.75"
      />
      <ellipse
        cx="37.5"
        cy="40"
        rx="12"
        ry="15"
        fill="url(#roseGrad)"
        opacity="0.75"
      />
      {/* Mid petals */}
      <ellipse
        cx="30"
        cy="25"
        rx="10"
        ry="12"
        fill="url(#roseGrad)"
        opacity="0.85"
        transform="rotate(-20 30 25)"
      />
      <ellipse
        cx="45"
        cy="25"
        rx="10"
        ry="12"
        fill="url(#roseGrad)"
        opacity="0.85"
        transform="rotate(20 45 25)"
      />
      {/* Inner petals */}
      <ellipse
        cx="37.5"
        cy="22"
        rx="8"
        ry="10"
        fill="url(#roseGrad)"
        opacity="0.9"
      />
      <ellipse
        cx="37.5"
        cy="30"
        rx="8"
        ry="10"
        fill="url(#roseGrad)"
        opacity="0.9"
      />
      {/* Center */}
      <circle cx="37.5" cy="26" r="5" fill="#ffe082" opacity="0.8" />
      <circle cx="37.5" cy="26" r="2.5" fill="#ffd700" />
    </svg>
  );
}

export function SimpleFlower() {
  return (
    <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="petalGrad">
          <stop offset="0%" stopColor="#ffccd4" />
          <stop offset="100%" stopColor="#f8b8b8" />
        </radialGradient>
      </defs>
      {/* Petals (5 círculos alrededor) */}
      <circle cx="32.5" cy="12" r="12" fill="url(#petalGrad)" opacity="0.9" />
      <circle cx="50" cy="20" r="12" fill="url(#petalGrad)" opacity="0.9" />
      <circle cx="52" cy="40" r="12" fill="url(#petalGrad)" opacity="0.9" />
      <circle cx="32.5" cy="53" r="12" fill="url(#petalGrad)" opacity="0.9" />
      <circle cx="13" cy="40" r="12" fill="url(#petalGrad)" opacity="0.9" />
      <circle cx="15" cy="20" r="12" fill="url(#petalGrad)" opacity="0.9" />
      {/* Center */}
      <circle cx="32.5" cy="32.5" r="10" fill="#ffe082" />
      <circle cx="32.5" cy="32.5" r="7" fill="#ffd700" opacity="0.8" />
      {/* Center details */}
      <circle cx="29" cy="30" r="1.5" fill="#ffb300" opacity="0.6" />
      <circle cx="36" cy="30" r="1.5" fill="#ffb300" opacity="0.6" />
      <circle cx="32.5" cy="35" r="1.5" fill="#ffb300" opacity="0.6" />
    </svg>
  );
}
