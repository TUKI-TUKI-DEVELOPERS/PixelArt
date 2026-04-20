export function StarBright() {
  return (
    <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="starGrad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fff9c4" />
          <stop offset="60%" stopColor="#ffeb3b" />
          <stop offset="100%" stopColor="#ffd700" />
        </radialGradient>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="saturate" values="1.8" />
        </filter>
      </defs>
      {/* Outer glow */}
      <circle
        cx="32.5"
        cy="32.5"
        r="28"
        fill="url(#starGrad)"
        filter="url(#starGlow)"
        opacity="0.5"
      />
      {/* Star shape */}
      <path
        d="M32.5,8 L37,25 L55,25 L41,36 L46,53 L32.5,42 L19,53 L24,36 L10,25 L28,25 Z"
        fill="url(#starGrad)"
      />
      {/* Centro brillante */}
      <circle cx="32.5" cy="32.5" r="8" fill="white" opacity="0.8" />
      {/* Sparkle lines */}
      <line x1="32.5" y1="5" x2="32.5" y2="12" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="32.5" y1="53" x2="32.5" y2="60" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="5" y1="32.5" x2="12" y2="32.5" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="53" y1="32.5" x2="60" y2="32.5" stroke="white" strokeWidth="2" opacity="0.7" />
      <line x1="12" y1="12" x2="18" y2="18" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="47" y1="47" x2="53" y2="53" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="47" y1="18" x2="53" y2="12" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="12" y1="47" x2="18" y2="53" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export function StarCluster() {
  return (
    <svg viewBox="0 0 85 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="clusterGrad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffe082" />
          <stop offset="100%" stopColor="#ffd54f" />
        </radialGradient>
      </defs>
      {/* Estrella grande */}
      <path
        d="M45,10 L48,20 L58,20 L50,27 L53,37 L45,30 L37,37 L40,27 L32,20 L42,20 Z"
        fill="url(#clusterGrad)"
        opacity="0.9"
      />
      <circle cx="45" cy="25" r="3" fill="white" opacity="0.6" />
      {/* Estrella mediana */}
      <path
        d="M25,25 L27,32 L35,32 L29,37 L31,44 L25,39 L19,44 L21,37 L15,32 L23,32 Z"
        fill="url(#clusterGrad)"
        opacity="0.75"
      />
      <circle cx="25" cy="34" r="2" fill="white" opacity="0.5" />
      {/* Estrella pequeña 1 */}
      <path
        d="M65,20 L66.5,25 L72,25 L67.5,28.5 L69,33 L65,29.5 L61,33 L62.5,28.5 L58,25 L63.5,25 Z"
        fill="url(#clusterGrad)"
        opacity="0.6"
      />
      {/* Estrella pequeña 2 */}
      <path
        d="M20,45 L21.5,50 L27,50 L22.5,53.5 L24,58 L20,54.5 L16,58 L17.5,53.5 L13,50 L18.5,50 Z"
        fill="url(#clusterGrad)"
        opacity="0.55"
      />
      {/* Mini sparkles */}
      <circle cx="55" cy="35" r="1.5" fill="#fff9c4" opacity="0.7" />
      <circle cx="70" cy="40" r="1" fill="#fff9c4" opacity="0.6" />
      <circle cx="35" cy="15" r="1.2" fill="#fff9c4" opacity="0.65" />
    </svg>
  );
}
