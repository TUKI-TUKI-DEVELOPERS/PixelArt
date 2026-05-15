// Leaves — horizontal orientation (like falling), wavy edges, 80x80 viewBox.

export function LeafSimple() {
  // Lanceolate horizontal — narrow, pointed both ends, gentle wavy edges
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="ls1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8dff5" />
          <stop offset="45%" stopColor="#4f97cf" />
          <stop offset="100%" stopColor="#1a5080" />
        </linearGradient>
        <filter id="ls1Glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Horizontal lanceolate — tip at left (13,40), base at right (67,40)
          Wavy top and bottom edges with 2 undulations each */}
      <path
        d="M 13,40
           C 18,30 28,24 36,27
           C 42,28 46,21 54,24
           C 60,26 65,32 67,40
           C 65,48 60,54 54,56
           C 46,59 42,52 36,53
           C 28,56 18,50 13,40 Z"
        fill="url(#ls1Grad)"
        filter="url(#ls1Glow)"
      />
      {/* Midrib — left tip to right base */}
      <path
        d="M 13,40 C 30,39 50,40 67,40"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pinnate veins — upper */}
      <path d="M 28,37 Q 30,30 34,27" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 40,37 Q 42,29 46,25" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 54,38 Q 56,31 59,28" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Pinnate veins — lower */}
      <path d="M 28,43 Q 30,50 34,53" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 40,43 Q 42,51 46,55" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 54,42 Q 56,49 59,52" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Highlight — lit upper edge */}
      <path
        d="M 18,34 C 28,26 40,23 52,26"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LeafRound() {
  // Cordate horizontal — wide heart-shaped, notch on left (base), tip on right
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="lr1Grad" cx="60%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#c8e6f7" />
          <stop offset="50%" stopColor="#4f97cf" />
          <stop offset="100%" stopColor="#1a5080" />
        </radialGradient>
        <filter id="lr1Glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Cordate horizontal — notch at left (base), tip at right
          Upper lobe: top-left bump; lower lobe: bottom-left bump; tip at right */}
      <path
        d="M 15,40
           C 14,33 17,24 25,20
           C 32,16 40,18 44,21
           C 46,18 50,14 56,15
           C 63,16 68,22 68,30
           C 70,34 70,38 68,40
           C 70,42 70,46 68,50
           C 68,58 63,64 56,65
           C 50,66 46,62 44,59
           C 40,62 32,64 25,60
           C 17,56 14,47 15,40 Z"
        fill="url(#lr1Grad)"
        filter="url(#lr1Glow)"
      />
      {/* Stem from notch */}
      <path
        d="M 15,40 Q 10,40 6,38"
        stroke="#1a5080"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Midrib */}
      <path
        d="M 15,40 C 35,39 55,40 68,40"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Palmate veins — upper lobes */}
      <path d="M 22,36 Q 24,26 30,21" stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 34,33 Q 38,24 44,20" stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 48,32 Q 54,24 60,20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Palmate veins — lower lobes */}
      <path d="M 22,44 Q 24,54 30,59" stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 34,47 Q 38,56 44,60" stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M 48,48 Q 54,56 60,60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Highlight */}
      <ellipse cx="50" cy="26" rx="9" ry="5" fill="white" opacity="0.14" transform="rotate(20 50 26)" />
    </svg>
  );
}

export function LeafFalling() {
  // Ovate horizontal — egg-shaped, wider near base (left), pointed tip (right),
  // tilted ~15° downward, most wavy edges, with stem. Classic falling leaf.
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="lf1Grad" x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#93ccf0" />
          <stop offset="40%" stopColor="#3a84bc" />
          <stop offset="100%" stopColor="#1a4a72" />
        </linearGradient>
        <filter id="lf1Glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Ovate horizontal — base left, tip right, tilted ~15°, wavy edges
          3 undulations on each side for organic feel */}
      <path
        d="M 13,42
           C 16,30 24,22 33,22
           C 38,20 42,25 46,22
           C 52,19 58,22 63,27
           C 67,30 68,36 67,42
           C 68,48 67,54 63,57
           C 58,62 52,65 46,62
           C 42,59 38,64 33,62
           C 24,62 16,54 13,42 Z"
        fill="url(#lf1Grad)"
        filter="url(#lf1Glow)"
        transform="rotate(-12 40 42)"
      />
      {/* Stem */}
      <path
        d="M 13,42 Q 8,44 4,48"
        stroke="#1a4a72"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-12 40 42)"
      />
      {/* Midrib */}
      <path
        d="M 13,42 C 32,41 52,42 67,42"
        stroke="rgba(255,255,255,0.52)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-12 40 42)"
      />
      {/* Pinnate veins — upper */}
      <path d="M 26,38 Q 28,30 33,24" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" transform="rotate(-12 40 42)" />
      <path d="M 38,37 Q 40,28 44,24" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" transform="rotate(-12 40 42)" />
      <path d="M 52,37 Q 55,29 59,26" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" fill="none" strokeLinecap="round" transform="rotate(-12 40 42)" />
      {/* Pinnate veins — lower */}
      <path d="M 26,46 Q 28,54 33,60" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" transform="rotate(-12 40 42)" />
      <path d="M 38,47 Q 40,56 44,60" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" fill="none" strokeLinecap="round" transform="rotate(-12 40 42)" />
      <path d="M 52,47 Q 55,55 59,58" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" fill="none" strokeLinecap="round" transform="rotate(-12 40 42)" />
      {/* Highlight */}
      <path
        d="M 20,34 C 30,24 46,21 58,24"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-12 40 42)"
      />
    </svg>
  );
}
