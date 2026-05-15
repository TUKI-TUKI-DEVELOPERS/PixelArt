export default function LibroDetalleLoading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#faf8f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {/* Letras PIXELART animadas */}
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        .loading-letter {
          animation: skeletonPulse 1.4s ease-in-out infinite;
        }
        .loading-letter:nth-child(1) { animation-delay: 0s;     }
        .loading-letter:nth-child(2) { animation-delay: 0.175s; }
        .loading-letter:nth-child(3) { animation-delay: 0.35s;  }
        .loading-letter:nth-child(4) { animation-delay: 0.525s; }
        .loading-letter:nth-child(5) { animation-delay: 0.7s;   }
        .loading-letter:nth-child(6) { animation-delay: 0.875s; }
        .loading-letter:nth-child(7) { animation-delay: 1.05s;  }
        .loading-letter:nth-child(8) { animation-delay: 1.225s; }
      `}</style>

      <div style={{ display: 'flex', gap: '2px' }}>
        {[
          ['P', '#B72020'],
          ['I', '#e8703a'],
          ['X', '#e8b83a'],
          ['E', '#4caf7d'],
          ['L', '#9b59b6'],
          ['A', '#4f97cf'],
          ['R', '#e84393'],
          ['T', '#2bb5c8'],
        ].map(([letter, color]) => (
          <span
            key={letter}
            className="loading-letter"
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              color,
              fontFamily: '"Courier New", Courier, monospace',
              display: 'inline-block',
              width: '30px',
              textAlign: 'center',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Barra de progreso indeterminada */}
      <style>{`
        @keyframes indeterminate {
          0%   { left: -40%; width: 40%; }
          60%  { left: 100%; width: 40%; }
          100% { left: 100%; width: 40%; }
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          width: '260px',
          height: '3px',
          background: '#e8e0d8',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            height: '100%',
            background: 'linear-gradient(90deg, #B72020, #e8453c)',
            borderRadius: '2px',
            animation: 'indeterminate 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
