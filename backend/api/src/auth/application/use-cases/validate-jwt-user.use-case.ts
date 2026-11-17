import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FindUserByIdUseCase } from '../../../users/application/use-cases/find-user-by-id.use-case';
import { JwtPayload } from '../../domain/ports/token-generator.port';

/** What ends up in req.user for an authenticated request. */
export type AuthenticatedPrincipal = JwtPayload;

/**
 * A valid signature only proves the token was issued by us at some point.
 * Re-reads the user so deleted/deactivated accounts lose access immediately
 * and authorization always uses the CURRENT role, not the one in the token.
 */
@Injectable()
export class ValidateJwtUserUseCase {
  constructor(private readonly findUserById: FindUserByIdUseCase) {}

  async execute(payload: Partial<JwtPayload> | null | undefined): Promise<AuthenticatedPrincipal> {
    const userId = payload?.sub;
    if (typeof userId !== 'number' || !Number.isSafeInteger(userId) || userId <= 0) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.findUserById.execute(userId);
    if (!user || !user.isActive) throw new UnauthorizedException('Invalid token');

    return { sub: user.id, email: user.email, role: user.role };
  }
}
