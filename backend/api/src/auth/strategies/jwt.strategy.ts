import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { resolveJwtSecretFromConfig } from '../infrastructure/jwt-secret.config';
import { JwtPayload } from '../domain/ports/token-generator.port';
import { AuthenticatedPrincipal, ValidateJwtUserUseCase } from '../application/use-cases/validate-jwt-user.use-case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private readonly validateJwtUser: ValidateJwtUserUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // The module factory already warned about a weak non-production secret.
      secretOrKey: resolveJwtSecretFromConfig(config, { warn: () => undefined }),
      // Pin the algorithm so a token cannot choose how it is verified.
      algorithms: ['HS256'],
      ignoreExpiration: false,
    });
  }

  /** The returned principal becomes req.user. */
  validate(payload: JwtPayload): Promise<AuthenticatedPrincipal> {
    return this.validateJwtUser.execute(payload);
  }
}
