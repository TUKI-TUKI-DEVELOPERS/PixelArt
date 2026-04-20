export function CameraVintage() {
  return (
    <svg viewBox="0 0 85 75" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="vintageBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9a9a9a" />
          <stop offset="50%" stopColor="#7a7a7a" />
          <stop offset="100%" stopColor="#5a5a5a" />
        </linearGradient>
        <radialGradient id="lensGrad">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="70%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
      </defs>
      {/* Camera body */}
      <rect
        x="8"
        y="20"
        width="69"
        height="50"
        rx="6"
        fill="url(#vintageBodyGrad)"
        stroke="#4a4a4a"
        strokeWidth="1.5"
      />
      {/* Rainbow stripe (Polaroid signature) */}
      <rect x="8" y="22" width="69" height="8" fill="#ff6b6b" opacity="0.7" />
      <rect x="8" y="22" width="17" height="8" fill="#ff6b6b" opacity="0.8" />
      <rect x="25" y="22" width="17" height="8" fill="#4ecdc4" opacity="0.8" />
      <rect x="42" y="22" width="17" height="8" fill="#ffe66d" opacity="0.8" />
      <rect x="59" y="22" width="18" height="8" fill="#95e1d3" opacity="0.8" />
      {/* Lens housing */}
      <circle cx="42.5" cy="50" r="20" fill="#3a3a3a" />
      {/* Lens glass */}
      <circle cx="42.5" cy="50" r="16" fill="url(#lensGrad)" />
      {/* Lens reflection */}
      <circle cx="38" cy="45" r="6" fill="white" opacity="0.3" />
      <circle cx="47" cy="52" r="3" fill="white" opacity="0.2" />
      {/* Flash */}
      <rect x="65" y="35" width="8" height="6" rx="1" fill="#f5f5f5" opacity="0.9" />
      {/* Red button */}
      <circle cx="18" cy="42" r="3" fill="#ff4444" />
      {/* Logo area */}
      <rect x="12" y="58" width="20" height="8" rx="2" fill="#6a6a6a" opacity="0.5" />
    </svg>
  );
}

export function CameraDSLR() {
  return (
    <svg viewBox="0 0 95 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="dslrBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="50%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <radialGradient id="dslrLensGrad">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>
      {/* Camera body */}
      <path
        d="M15,30 L70,30 L70,70 L55,70 L55,75 L35,75 L35,70 L15,70 Z"
        fill="url(#dslrBodyGrad)"
        stroke="#0a0a0a"
        strokeWidth="1"
      />
      {/* Pentaprism */}
      <path d="M30,20 L55,20 L60,30 L25,30 Z" fill="#2a2a2a" stroke="#0a0a0a" strokeWidth="1" />
      {/* Viewfinder */}
      <rect x="38" y="22" width="9" height="5" rx="1" fill="#0a0a0a" />
      {/* Lens mount */}
      <circle cx="50" cy="50" r="22" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1.5" />
      {/* Lens */}
      <circle cx="50" cy="50" r="18" fill="url(#dslrLensGrad)" />
      {/* Lens rings */}
      <circle cx="50" cy="50" r="15" fill="none" stroke="#3a3a3a" strokeWidth="1" />
      <circle cx="50" cy="50" r="12" fill="none" stroke="#3a3a3a" strokeWidth="0.5" />
      {/* Lens reflection */}
      <circle cx="45" cy="45" r="7" fill="white" opacity="0.25" />
      <circle cx="54" cy="52" r="4" fill="white" opacity="0.15" />
      {/* Grip texture */}
      <rect x="18" y="45" width="8" height="20" fill="#2a2a2a" opacity="0.8" />
      <line x1="19" y1="48" x2="19" y2="63" stroke="#1a1a1a" strokeWidth="0.5" />
      <line x1="21" y1="48" x2="21" y2="63" stroke="#1a1a1a" strokeWidth="0.5" />
      <line x1="23" y1="48" x2="23" y2="63" stroke="#1a1a1a" strokeWidth="0.5" />
      <line x1="25" y1="48" x2="25" y2="63" stroke="#1a1a1a" strokeWidth="0.5" />
      {/* Dial */}
      <circle cx="65" cy="40" r="4" fill="#2a2a2a" stroke="#0a0a0a" strokeWidth="1" />
      {/* Buttons */}
      <circle cx="22" cy="35" r="2" fill="#444" />
      <rect x="28" y="33" width="3" height="4" rx="0.5" fill="#444" />
    </svg>
  );
}

export function CameraInstant() {
  return (
    <svg viewBox="0 0 70 65" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="instantBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7ec2e3" />
          <stop offset="100%" stopColor="#6bb3e0" />
        </linearGradient>
        <radialGradient id="instantLensGrad">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </radialGradient>
      </defs>
      {/* Camera body */}
      <rect
        x="5"
        y="15"
        width="60"
        height="45"
        rx="8"
        fill="url(#instantBodyGrad)"
        stroke="#5a9fc9"
        strokeWidth="1.5"
      />
      {/* White front panel */}
      <rect x="8" y="18" width="54" height="15" rx="3" fill="white" opacity="0.3" />
      {/* Lens housing */}
      <circle cx="28" cy="38" r="12" fill="#4a4a4a" />
      {/* Lens glass */}
      <circle cx="28" cy="38" r="10" fill="url(#instantLensGrad)" />
      {/* Lens reflection */}
      <circle cx="25" cy="35" r="4" fill="white" opacity="0.5" />
      {/* Flash */}
      <circle cx="50" cy="25" r="4" fill="#f5f5f5" opacity="0.9" />
      <circle cx="50" cy="25" r="2.5" fill="#fff9c4" opacity="0.7" />
      {/* Viewfinder */}
      <rect x="48" y="38" width="8" height="6" rx="1" fill="#2a2a2a" />
      {/* Shutter button */}
      <circle cx="60" cy="10" r="3" fill="#ff6b6b" />
      <circle cx="60" cy="10" r="1.5" fill="#ff4444" />
      {/* Brand strip */}
      <rect x="10" y="50" width="30" height="6" rx="1" fill="white" opacity="0.2" />
    </svg>
  );
}
