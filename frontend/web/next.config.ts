import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable telemetry in Docker
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  // Allow images from MinIO (localhost and minio container)
  // unoptimized: images are served directly from MinIO with Cache-Control headers.
  // Next.js image optimization proxy can't reach MinIO from inside Docker (localhost ≠ minio).
  // Lazy loading, sizes, and priority props still work with unoptimized.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '9000' },
      { protocol: 'http', hostname: 'minio', port: '9000' },
    ],
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
    ];
  },
};

export default nextConfig;
