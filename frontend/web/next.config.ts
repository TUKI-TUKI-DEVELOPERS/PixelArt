import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Disable telemetry in Docker
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  // Optimización de imágenes real (resize + WebP) habilitada.
  // getAssetUrl() devuelve rutas relativas ("/assets/...") en vez de URLs
  // absolutas a MinIO — app/assets/[...path]/route.ts las sirve server-side
  // desde MINIO_INTERNAL_URL (http://minio:9000 dentro de Docker), solo para
  // prefijos públicos. Como son rutas del mismo origen, el optimizador de Next
  // las resuelve sin remotePatterns (y pasa por el mismo allowlist).
  images: {},
  // Baseline security headers for every route. Deliberately NO enforcing
  // site-wide CSP: GSAP, Three.js, fonts and remote images rely on defaults.
  // /assets/* additionally gets `CSP: sandbox` from app/assets/[...path]/route.ts.
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    ];
    // HSTS only in production (served behind TLS); never on local http.
    if (process.env.NODE_ENV === 'production') {
      securityHeaders.push({ key: 'Strict-Transport-Security', value: 'max-age=31536000' });
    }
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // API URL rewrite (proxies /api/* → NestJS)
  // API_INTERNAL_URL: usado por el proceso Next.js server-side (en Docker: http://api:3001)
  // NEXT_PUBLIC_API_URL: usado por el browser (siempre apunta a localhost:3001)
  async rewrites() {
    const apiBase =
      process.env.API_INTERNAL_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
      // NO /assets/* rewrite here: it would expose the whole bucket and, as an
      // afterFiles rewrite, shadow the gated app/assets/[...path] route handler.
    ];
  },
};

export default nextConfig;
