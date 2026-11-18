import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import { json, urlencoded } from 'express';

export function configureBodyParsers(app: { use: (...handlers: any[]) => any }) {
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true }));
}

/**
 * Client IP for rate limiting and logs (req.ip).
 *
 * Production chain: browser -> nginx -> Next (rewrite / BFF) -> Nest.
 * nginx appends the real client address to X-Forwarded-For; Next's rewrite
 * proxy (http-proxy without xfwd) and our BFF routes pass that header through
 * WITHOUT appending their own hop. So exactly one hop is trusted: req.ip is
 * the RIGHTMOST X-Forwarded-For entry (written by nginx), and any value a
 * client injects further left is ignored. Requests without the header (Next
 * server-side rendering calls) fall back to the socket address.
 *
 * Assumes nginx sets `X-Forwarded-For $proxy_add_x_forwarded_for` (or
 * $remote_addr) and that Next/Nest are not reachable without nginx in front;
 * otherwise the header is client-controlled.
 */
export function configureTrustProxy(app: { set: (setting: string, value: unknown) => unknown }) {
  app.set('trust proxy', 1);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });
  configureBodyParsers(app);
  configureTrustProxy(app);

  // C3: Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  // C3: Gzip compression for responses
  app.use(compression());

  // C3: Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.setGlobalPrefix('api');

  // C7: Restrict CORS to allowed origins
  app.enableCors({
    origin: (process.env.CORS_ORIGINS || 'http://localhost:3000')
      .split(',')
      .map((s) => s.trim()),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  });

  const port = process.env.API_PORT ?? 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`PixelArt API running on http://0.0.0.0:${port}/api`);

  // Opcional: ejecutar seeds automáticamente al iniciar.
  // Activar con SEED_ON_BOOT=true en .env.docker (solo en desarrollo).
  if (process.env.SEED_ON_BOOT === 'true') {
    console.log('[seed] SEED_ON_BOOT=true — ejecutando seeds...');
    const { runSeed } = await import('./database/seed');
    await runSeed().catch((err) => {
      console.error('[seed] Error durante seeds:', err);
    });
  }
}

if (require.main === module) {
  // Not awaited on purpose: a startup failure stays an unhandled rejection,
  // which crashes the process (Node's default), exactly as before.
  void bootstrap();
}
