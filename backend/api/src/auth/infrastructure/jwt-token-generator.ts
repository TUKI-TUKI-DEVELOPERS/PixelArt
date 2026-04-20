import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenGeneratorPort } from '../domain/ports/token-generator.port';

@Injectable()
export class JwtTokenGenerator implements TokenGeneratorPort {
  constructor(private readonly jwt: JwtService) {}

  async signAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwt.signAsync(payload);
  }
}