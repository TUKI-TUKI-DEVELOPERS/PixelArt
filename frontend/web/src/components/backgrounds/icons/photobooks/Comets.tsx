// All viewBoxes are square (80x80) — FloatingElement renders in a square container.
// Comets are drawn diagonally so the trail uses the full diagonal space without distortion.

export function ShootingStar() {
  // Trail: thin triangle from bottom-left (tail) to top-right (head)
  // Tail tip: (8,72)  Head center: (72,8)
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="ss1Grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(45,143,213,0)" />
          <stop offset="55%" stopColor="rgba(107,179,224,0.5)" />
          <stop offset="85%" stopColor="rgba(200,230,248,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
        </linearGradient>
        <filter id="ss1Glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Trail: sharp triangle. Tail = single point (8,72). Head = wide edge. */}
      <path
        d="M 8,72 L 68,4 L 76,12 Z"
        fill="url(#ss1Grad)"
        filter="url(#ss1Glow)"
      />
      {/* Head: 4-pointed star */}
      <path
        d="M 72,2 L 74,7 L 79,9 L 74,11 L 72,16 L 70,11 L 65,9 L 70,7 Z"
        fill="white"
        filter="url(#ss1Glow)"
      />
      {/* Bright core */}
      <circle cx="72" cy="9" r="3" fill="white" />
    </svg>
  );
}

export function CometDiagonal() {
  // Different angle — goes from bottom-right (tail) to top-left (head)
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="cd1Grad" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(45,143,213,0)" />
          <stop offset="50%" stopColor="rgba(107,179,224,0.45)" />
          <stop offset="88%" stopColor="rgba(200,230,248,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
        </linearGradient>
        <filter id="cd1Glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Trail: tail at (72,72), head at (8,8) */}
      <path
        d="M 72,72 L 4,12 L 12,4 Z"
        fill="url(#cd1Grad)"
        filter="url(#cd1Glow)"
      />
      {/* Head: 4-pointed star */}
      <path
        d="M 8,1 L 10,6 L 15,8 L 10,10 L 8,15 L 6,10 L 1,8 L 6,6 Z"
        fill="white"
        filter="url(#cd1Glow)"
      />
      <circle cx="8" cy="8" r="3" fill="white" />
    </svg>
  );
}

export function MiniComet() {
  // Steeper angle — goes from bottom-left to upper-right, shorter trail
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="mc1Grad" x1="0%" y1="100%" x2="100%" y2="10%">
          <stop offset="0%" stopColor="rgba(45,143,213,0)" />
          <stop offset="50%" stopColor="rgba(107,179,224,0.4)" />
          <stop offset="85%" stopColor="rgba(200,230,248,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
        </linearGradient>
        <filter id="mc1Glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Trail: tail at (10,70), head at (70,14) — slightly less steep */}
      <path
        d="M 10,70 L 66,9 L 74,17 Z"
        fill="url(#mc1Grad)"
        filter="url(#mc1Glow)"
      />
      {/* Head: small 4-pointed star */}
      <path
        d="M 70,8 L 72,12 L 76,14 L 72,16 L 70,20 L 68,16 L 64,14 L 68,12 Z"
        fill="white"
        filter="url(#mc1Glow)"
      />
      <circle cx="70" cy="14" r="2.5" fill="white" />
    </svg>
  );
}
