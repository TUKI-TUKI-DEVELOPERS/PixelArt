import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DEFAULT_THROTTLE } from './common/decorators/throttle.decorators';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AssetsModule } from './assets/assets.module';
import { CatalogModule } from './catalog/catalog.module';
import { PersonalizedModule } from './personalized/personalized.module';
import { DemoModule } from './demo/demo.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PhotobookModule } from './photobook/photobook.module';
import { SiteConfigModule } from './site-config/site-config.module';
import { CheckoutModule } from './checkout/checkout.module';
import { PromotionsModule } from './promotions/promotion.module';
import { secretFromEnv } from './common/config/secret-env';

@Module({
  imports: [
    // Per client IP (see configureTrustProxy in main.ts). Stricter limits are
    // set per route with the decorators in common/decorators/throttle.decorators.ts.
    ThrottlerModule.forRoot([DEFAULT_THROTTLE]),
    UsersModule,
    AuthModule,
    AssetsModule,
    CatalogModule,
    PersonalizedModule,
    DemoModule,
    OrdersModule,
    PaymentsModule,
    FeedbackModule,
    PhotobookModule,
    SiteConfigModule,
    CheckoutModule,
    PromotionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST', 'localhost'),
        port: config.get<number>('POSTGRES_PORT', 5432),
        database: config.get('POSTGRES_DB', 'pixelart'),
        username: config.get('POSTGRES_USER', 'pixelart'),
        // Local default only outside production — prod refuses to boot without it.
        password: secretFromEnv('POSTGRES_PASSWORD', 'pixelart_secret', (key) => config.get<string>(key)),
        // Schema is managed via schemaPixelart.sql — never let TypeORM touch it
        synchronize: false,
        autoLoadEntities: true,
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
