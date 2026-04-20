import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

bootstrap();
