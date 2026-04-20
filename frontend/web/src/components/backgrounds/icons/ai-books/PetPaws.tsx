export function DogPaw() {
  return (
    <svg viewBox="0 0 60 68" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="dogPawGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B72020" />
          <stop offset="100%" stopColor="#d92d34" />
        </linearGradient>
        <filter id="pawShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main pad */}
      <ellipse
        cx="30"
        cy="45"
        rx="18"
        ry="20"
        fill="url(#dogPawGrad)"
        filter="url(#pawShadow)"
      />
      {/* Toe pad 1 (left) */}
      <ellipse
        cx="15"
        cy="22"
        rx="8"
        ry="11"
        fill="url(#dogPawGrad)"
        filter="url(#pawShadow)"
      />
      {/* Toe pad 2 (mid-left) */}
      <ellipse
        cx="25"
        cy="15"
        rx="8"
        ry="12"
        fill="url(#dogPawGrad)"
        filter="url(#pawShadow)"
      />
      {/* Toe pad 3 (mid-right) */}
      <ellipse
        cx="35"
        cy="15"
        rx="8"
        ry="12"
        fill="url(#dogPawGrad)"
        filter="url(#pawShadow)"
      />
      {/* Toe pad 4 (right) */}
      <ellipse
        cx="45"
        cy="22"
        rx="8"
        ry="11"
        fill="url(#dogPawGrad)"
        filter="url(#pawShadow)"
      />
      {/* Highlights */}
      <ellipse cx="30" cy="40" rx="6" ry="7" fill="white" opacity="0.2" />
      <ellipse cx="25" cy="12" rx="3" ry="4" fill="white" opacity="0.15" />
    </svg>
  );
}

export function CatPaw() {
  return (
    <svg viewBox="0 0 55 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="catPawGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e85858" />
          <stop offset="100%" stopColor="#f5d6d6" />
        </linearGradient>
        <filter id="catPawShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="1.5" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Main pad */}
      <ellipse
        cx="27.5"
        cy="40"
        rx="15"
        ry="17"
        fill="url(#catPawGrad)"
        filter="url(#catPawShadow)"
      />
      {/* Toe pad 1 (left) */}
      <ellipse
        cx="14"
        cy="20"
        rx="6"
        ry="9"
        fill="url(#catPawGrad)"
        filter="url(#catPawShadow)"
      />
      {/* Toe pad 2 (mid-left) */}
      <ellipse
        cx="22"
        cy="14"
        rx="6"
        ry="10"
        fill="url(#catPawGrad)"
        filter="url(#catPawShadow)"
      />
      {/* Toe pad 3 (mid-right) */}
      <ellipse
        cx="33"
        cy="14"
        rx="6"
        ry="10"
        fill="url(#catPawGrad)"
        filter="url(#catPawShadow)"
      />
      {/* Toe pad 4 (right) */}
      <ellipse
        cx="41"
        cy="20"
        rx="6"
        ry="9"
        fill="url(#catPawGrad)"
        filter="url(#catPawShadow)"
      />
      {/* Highlights */}
      <ellipse cx="27.5" cy="36" rx="5" ry="6" fill="white" opacity="0.25" />
      <ellipse cx="22" cy="11" rx="2.5" ry="3" fill="white" opacity="0.2" />
    </svg>
  );
}
