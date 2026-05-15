export function CloudSoft() {
  return (
    <svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="cloudSoftGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#e8f4fc" />
          <stop offset="100%" stopColor="#c8e6f7" />
        </radialGradient>
        <filter id="cloudSoftShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Cloud body */}
      <ellipse cx="50" cy="42" rx="42" ry="18" fill="url(#cloudSoftGrad)" filter="url(#cloudSoftShadow)" />
      <circle cx="32" cy="36" r="18" fill="url(#cloudSoftGrad)" filter="url(#cloudSoftShadow)" />
      <circle cx="54" cy="30" r="22" fill="url(#cloudSoftGrad)" filter="url(#cloudSoftShadow)" />
      <circle cx="72" cy="38" r="15" fill="url(#cloudSoftGrad)" filter="url(#cloudSoftShadow)" />
      {/* Highlight */}
      <ellipse cx="46" cy="26" rx="14" ry="8" fill="white" opacity="0.6" />
    </svg>
  );
}

export function CloudTiny() {
  return (
    <svg viewBox="0 0 70 45" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="cloudTinyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d8eef8" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="32" rx="30" ry="12" fill="url(#cloudTinyGrad)" />
      <circle cx="24" cy="26" r="13" fill="url(#cloudTinyGrad)" />
      <circle cx="42" cy="22" r="16" fill="url(#cloudTinyGrad)" />
      <circle cx="56" cy="28" r="10" fill="url(#cloudTinyGrad)" />
      <ellipse cx="38" cy="19" rx="10" ry="6" fill="white" opacity="0.55" />
    </svg>
  );
}

export function CloudWithStar() {
  return (
    <svg viewBox="0 0 110 75" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="cloudStarGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c8e6f7" />
        </radialGradient>
        <radialGradient id="starOnCloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#4f97cf" />
        </radialGradient>
      </defs>
      {/* Cloud */}
      <ellipse cx="55" cy="52" rx="44" ry="18" fill="url(#cloudStarGrad)" />
      <circle cx="36" cy="46" r="18" fill="url(#cloudStarGrad)" />
      <circle cx="58" cy="38" r="22" fill="url(#cloudStarGrad)" />
      <circle cx="78" cy="46" r="15" fill="url(#cloudStarGrad)" />
      {/* Highlight on cloud */}
      <ellipse cx="50" cy="34" rx="14" ry="8" fill="white" opacity="0.55" />
      {/* Star above cloud */}
      <path
        d="M85,8 C85,8 87,16 94,18 C87,20 85,28 85,28 C85,28 83,20 76,18 C83,16 85,8 85,8 Z"
        fill="url(#starOnCloud)"
        opacity="0.9"
      />
      <circle cx="85" cy="18" r="2.5" fill="white" opacity="0.95" />
    </svg>
  );
}
