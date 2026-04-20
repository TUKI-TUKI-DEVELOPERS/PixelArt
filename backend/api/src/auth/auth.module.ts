import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtTokenGenerator } from './infrastructure/jwt-token-generator';
import { TOKEN_GENERATOR } from './domain/ports/token-generator.port';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'dev_secret',
        signOptions: { expiresIn: 60 * 60 * 24 },
        }),
            }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUseCase,
    JwtStrategy,
    { provide: TOKEN_GENERATOR, useClass: JwtTokenGenerator },
  ],
  exports: [AuthService],
})
export class AuthModule {}