import { Injectable, UnauthorizedException,Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FindUserByEmailUseCase } from '../../../users/application/use-cases/find-user-by-email.use-case';
import { JwtPayload, TokenGeneratorPort } from '../../domain/ports/token-generator.port';
import { TOKEN_GENERATOR } from '../../domain/ports/token-generator.port';


@Injectable()
export class LoginUseCase {
  constructor(
  private readonly findUserByEmail: FindUserByEmailUseCase,
  @Inject(TOKEN_GENERATOR) private readonly tokenGenerator: TokenGeneratorPort,
) {}

  async execute(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.findUserByEmail.execute(email);
    if (!user || !user.isActive) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = {
      sub: Number(user.id),
      email: user.email,
      role: user.role as any,
    };

    const accessToken = await this.tokenGenerator.signAccessToken(payload);
    return { accessToken };
  }
}