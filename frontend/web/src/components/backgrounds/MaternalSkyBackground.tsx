'use client';

/**
 * Maternal Sky Background - "Ascending to Heaven"
 * 
 * Background fotorrealista de nubes celestiales, como si estuvieras
 * ascendiendo al cielo. Nubes volumétricas, esponjosas y realistas
 * que enmarcan un centro luminoso y despejado.
 * 
 * Técnica: SVG con múltiples filters (turbulence, blur, lighting)
 * para simular nubes 3D realistas con profundidad y volumen.
 */

interface MaternalSkyBackgroundProps {
  className?: string;
}

export default function MaternalSkyBackground({ 
  className = '' 
}: MaternalSkyBackgroundProps) {
  return (
    <div 
      className={`maternal-sky-background ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 1,
        background: 'linear-gradient(180deg, #FFF9F0 0%, #FFF5EB 30%, #FFFBF8 100%)',
      }}
    >
      {/* SVG con nubes realistas */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Filter para nubes realistas con volumen */}
          <filter id="realistic-clouds" x="-50%" y="-50%" width="200%" height="200%">
            {/* Turbulencia para textura de nube */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="8"
              seed="1"
              stitchTiles="noStitch"
              result="turbulence"
            />
            
            {/* Displacement para volumen */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="120"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            
            {/* Color de nubes cremosas */}
            <feColorMatrix
              in="turbulence"
              type="matrix"
              values="1 0 0 0 0.98
                      1 0 0 0 0.96
                      1 0 0 0 0.94
                      0 0 0 1 0"
              result="coloredClouds"
            />
            
            {/* Blur para suavidad */}
            <feGaussianBlur
              in="coloredClouds"
              stdDeviation="2.5"
              result="blurredClouds"
            />
            
            {/* Lighting para profundidad 3D */}
            <feDiffuseLighting
              in="blurredClouds"
              surfaceScale="12"
              diffuseConstant="1.2"
              lighting-color="#FFFFFF"
              result="litClouds"
            >
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            
            {/* Composite para integrar */}
            <feComposite
              in="litClouds"
              in2="blurredClouds"
              operator="arithmetic"
              k1="0.8"
              k2="0.4"
              k3="0.3"
              k4="0"
              result="compositeClouds"
            />
            
            {/* Blur final para suavidad extrema */}
            <feGaussianBlur
              in="compositeClouds"
              stdDeviation="1.8"
            />
          </filter>

          {/* Filter para nubes top (más ligeras) */}
          <filter id="clouds-top" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="6"
              seed="2"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.99
                      1 0 0 0 0.97
                      1 0 0 0 0.95
                      0 0 0 0.7 0"
            />
            <feGaussianBlur stdDeviation="3" />
          </filter>

          {/* Filter para nubes bottom (más densas) */}
          <filter id="clouds-bottom" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.010"
              numOctaves="7"
              seed="3"
            />
            <feColorMatrix
              type="matrix"
              values="0.95 0 0 0 0.93
                      0.95 0 0 0 0.91
                      0.95 0 0 0 0.89
                      0 0 0 0.85 0"
            />
            <feGaussianBlur stdDeviation="4" />
          </filter>

          {/* Filter para nubes laterales */}
          <filter id="clouds-sides" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011"
              numOctaves="7"
              seed="4"
            />
            <feColorMatrix
              type="matrix"
              values="0.96 0 0 0 0.94
                      0.96 0 0 0 0.92
                      0.96 0 0 0 0.90
                      0 0 0 0.75 0"
            />
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          {/* Radial gradient para luz central */}
          <radialGradient id="heaven-light" cx="50%" cy="25%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FFF9F0" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#FFF5EB" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Luz central desde arriba */}
        <ellipse
          cx="50%"
          cy="20%"
          rx="45%"
          ry="35%"
          fill="url(#heaven-light)"
        />

        {/* Layer 2: Nubes top (ligeras, esponjosas) */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="40%"
          fill="#FFF5EB"
          filter="url(#clouds-top)"
          opacity="0.7"
        />

        {/* Layer 3: Nubes laterales izquierda */}
        <rect
          x="0"
          y="25%"
          width="35%"
          height="60%"
          fill="#FFE8DC"
          filter="url(#clouds-sides)"
          opacity="0.8"
        />

        {/* Layer 4: Nubes laterales derecha */}
        <rect
          x="65%"
          y="25%"
          width="35%"
          height="60%"
          fill="#FFE8DC"
          filter="url(#clouds-sides)"
          opacity="0.8"
        />

        {/* Layer 5: Nubes bottom (densas, profundas) */}
        <rect
          x="0"
          y="65%"
          width="100%"
          height="45%"
          fill="#F8F3E8"
          filter="url(#clouds-bottom)"
          opacity="0.85"
        />

        {/* Layer 6: Nubes volumétricas centrales (más realismo) */}
        <ellipse
          cx="30%"
          cy="45%"
          rx="25%"
          ry="18%"
          fill="#FFEEF0"
          filter="url(#realistic-clouds)"
          opacity="0.6"
        />
        <ellipse
          cx="70%"
          cy="50%"
          rx="28%"
          ry="20%"
          fill="#FFF8F0"
          filter="url(#realistic-clouds)"
          opacity="0.5"
        />
        <ellipse
          cx="50%"
          cy="75%"
          rx="40%"
          ry="22%"
          fill="#FFE8DC"
          filter="url(#realistic-clouds)"
          opacity="0.7"
        />

        {/* Overlay suave para integración */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#heaven-light)"
          opacity="0.3"
        />
      </svg>

      {/* Overlay para tono cálido final */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 20%, rgba(255, 249, 240, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
