'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { adminLogin } from '../../../lib/api/admin';
import PixelArtLogo from '../../../components/layout/PixelArtLogo';
import { PIXELART_COLORS } from '../../../lib/colors';

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'login-spin 0.8s linear infinite' }}>
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS keyframes + styles                                             */
/* ------------------------------------------------------------------ */
const cssText = `
  @keyframes login-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes login-gradient {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes login-fadeIn {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes login-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }

  @keyframes login-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes login-shake {
    0%, 100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }

  @keyframes login-glow-pulse {
    0%, 100% { opacity: 0.4; }
    50%      { opacity: 0.7; }
  }

  /* ========== Full-screen gradient background ========== */
  .login-immersive {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      ${PIXELART_COLORS.P_RED},
      ${PIXELART_COLORS.R_PINK},
      ${PIXELART_COLORS.L_PURPLE},
      ${PIXELART_COLORS.A_BLUE},
      ${PIXELART_COLORS.T_TURQUOISE},
      ${PIXELART_COLORS.E_GREEN},
      ${PIXELART_COLORS.X_YELLOW},
      ${PIXELART_COLORS.I_ORANGE},
      ${PIXELART_COLORS.P_RED}
    );
    background-size: 500% 500%;
    animation: login-gradient 20s ease infinite;
  }

  /* Radial light overlays for depth */
  .login-immersive::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 80%, rgba(255,255,255,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 80% 20%, rgba(255,255,255,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,0,0,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ========== Floating particles ========== */
  .login-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .login-particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    animation: login-float 6s ease-in-out infinite;
  }

  /* ========== Glassmorphism card ========== */
  .login-glass {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background: rgba(15, 15, 25, 0.55);
    backdrop-filter: blur(40px) saturate(1.6);
    -webkit-backdrop-filter: blur(40px) saturate(1.6);
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    border-top-color: rgba(255, 255, 255, 0.30);
    border-left-color: rgba(255, 255, 255, 0.22);
    border-radius: 24px;
    padding: 40px 36px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.35),
      0 24px 60px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    animation: login-fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* Soft glow ring behind card */
  .login-glass::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 27px;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,0.18),
      rgba(255,255,255,0.03),
      rgba(255,255,255,0.12)
    );
    z-index: -1;
    opacity: 0.6;
    animation: login-glow-pulse 4s ease-in-out infinite;
  }

  /* Extra depth shadow underneath */
  .login-glass::after {
    content: '';
    position: absolute;
    inset: 8px 16px -8px 16px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.3);
    filter: blur(20px);
    z-index: -2;
  }

  /* ========== Logo area ========== */
  .login-logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 28px;
  }

  .login-logo-area svg {
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
  }

  .login-logo-area h1 {
    margin: 16px 0 4px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 6px rgba(0,0,0,0.15);
    letter-spacing: -0.3px;
  }

  .login-logo-area .subtitle {
    margin: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  /* ========== Divider ========== */
  .login-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    margin-bottom: 24px;
  }

  /* ========== Form ========== */
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* ========== Input group ========== */
  .login-input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .login-input-group label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .login-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .login-input-icon {
    position: absolute;
    left: 14px;
    color: rgba(255, 255, 255, 0.45);
    display: flex;
    align-items: center;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  .login-input-wrap input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    font-size: 14px;
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }

  .login-input-wrap input::placeholder {
    color: rgba(255, 255, 255, 0.30);
  }

  .login-input-wrap input:focus {
    border-color: rgba(255, 255, 255, 0.45);
    background: rgba(255, 255, 255, 0.10);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
  }

  .login-input-wrap:focus-within .login-input-icon {
    color: rgba(255, 255, 255, 0.85);
  }

  .login-toggle-pw {
    position: absolute;
    right: 8px;
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    border-radius: 8px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .login-toggle-pw:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.08);
  }

  /* ========== Error ========== */
  .login-error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #fecaca;
    font-size: 13px;
    animation: login-shake 0.4s ease;
    backdrop-filter: blur(8px);
  }

  .login-error svg {
    flex-shrink: 0;
    color: #fca5a5;
  }

  /* ========== Submit button ========== */
  .login-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px 20px;
    margin-top: 4px;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.92);
    box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    overflow: hidden;
  }

  .login-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.6) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    pointer-events: none;
  }

  .login-btn:hover:not(:disabled)::after {
    animation: login-shimmer 0.8s ease;
  }

  .login-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .login-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .login-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .login-btn svg {
    color: #111827;
  }

  /* ========== Footer ========== */
  .login-footer {
    position: relative;
    z-index: 1;
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.45);
  }

  /* ========== Responsive ========== */
  @media (max-width: 480px) {
    .login-glass {
      padding: 32px 24px;
      border-radius: 20px;
    }

    .login-logo-area h1 {
      font-size: 20px;
    }
  }
`;

/* ------------------------------------------------------------------ */
/*  Floating particles (deterministic)                                 */
/* ------------------------------------------------------------------ */
const PARTICLES = [
  { top: '8%',  left: '12%', size: 6,  delay: '0s',   dur: '7s' },
  { top: '15%', left: '80%', size: 4,  delay: '1s',   dur: '5s' },
  { top: '30%', left: '6%',  size: 8,  delay: '2s',   dur: '8s' },
  { top: '45%', left: '90%', size: 5,  delay: '0.5s', dur: '6s' },
  { top: '60%', left: '18%', size: 7,  delay: '3s',   dur: '7s' },
  { top: '70%', left: '75%', size: 4,  delay: '1.5s', dur: '5.5s' },
  { top: '85%', left: '30%', size: 6,  delay: '2.5s', dur: '6.5s' },
  { top: '20%', left: '55%', size: 3,  delay: '0.8s', dur: '5s' },
  { top: '52%', left: '42%', size: 5,  delay: '3.5s', dur: '7.5s' },
  { top: '78%', left: '60%', size: 7,  delay: '1.2s', dur: '6s' },
  { top: '92%', left: '85%', size: 4,  delay: '2.2s', dur: '5.5s' },
  { top: '5%',  left: '40%', size: 5,  delay: '4s',   dur: '8s' },
  { top: '38%', left: '70%', size: 6,  delay: '0.3s', dur: '6s' },
  { top: '65%', left: '8%',  size: 3,  delay: '1.8s', dur: '5s' },
  { top: '88%', left: '50%', size: 8,  delay: '3.2s', dur: '7s' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';

  const [email, setEmail] = useState('admin@pixelart.local');
  const [password, setPassword] = useState('Admin123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await adminLogin(email, password);
      window.location.href = next;
    } catch (err: any) {
      setError(err?.message ?? 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssText }} />

      <div className="login-immersive">
        {/* Floating particles */}
        <div className="login-particles">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="login-particle"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.dur,
              }}
            />
          ))}
        </div>

        {/* Glass card */}
        <div className="login-glass">
          {/* Logo + heading */}
          <div className="login-logo-area">
            <PixelArtLogo size="default" />
            <h1>Bienvenido de vuelta</h1>
            <p className="subtitle">Ingresa al panel de administración</p>
          </div>

          <div className="login-divider" />

          {/* Form */}
          <form className="login-form" onSubmit={onSubmit} noValidate>
            {/* Email */}
            <div className="login-input-group">
              <label htmlFor="login-email">Correo electrónico</label>
              <div className="login-input-wrap">
                <span className="login-input-icon"><MailIcon /></span>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pixelart.local"
                  required
                  autoComplete="email"
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-input-group">
              <label htmlFor="login-password">Contraseña</label>
              <div className="login-input-wrap">
                <span className="login-input-icon"><LockIcon /></span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  aria-label="Contraseña"
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  className="login-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="login-error" role="alert" aria-live="assertive">
                <AlertIcon />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading && <SpinnerIcon />}
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          PIXELART &copy; {new Date().getFullYear()} &middot; Libros personalizados
        </div>
      </div>
    </>
  );
}
