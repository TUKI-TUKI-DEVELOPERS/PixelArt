import { Logger, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ValidateJwtUserUseCase } from './application/use-cases/validate-jwt-user.use-case';
import { resolveJwtSecretFromConfig } from './infrastructure/jwt-secret.config';
import { JwtTokenGenerator } from './infrastructure/jwt-token-generator';
import { TOKEN_GENERATOR } from './domain/ports/token-generator.port';

/** Access tokens live 24h; the admin cookie lifetime is derived from the token's exp claim. */
export const ACCESS_TOKEN_TTL_SECONDS = 60 * 60 * 24;

/** Fails fast at boot when JWT_SECRET is unsafe (see resolveJwtSecret). No hardcoded fallback. */
export function jwtModuleOptionsFactory(config: ConfigService): JwtModuleOptions {
  return {
    secret: resolveJwtSecretFromConfig(config, new Logger('AuthModule')),
    signOptions: { expiresIn: ACCESS_TOKEN_TTL_SECONDS, algorithm: 'HS256' },
    verifyOptions: { algorithms: ['HS256'] },
  };
}

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtModuleOptionsFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUseCase,
    ValidateJwtUserUseCase,
    JwtStrategy,
    { provide: TOKEN_GENERATOR, useClass: JwtTokenGenerator },
  ],
  exports: [AuthService],
})
export class AuthModule {}