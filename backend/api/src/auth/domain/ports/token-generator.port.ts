export const TOKEN_GENERATOR = Symbol('TOKEN_GENERATOR');

export type JwtPayload = {
  sub: number;   // users.id (BIGINT)
  email: string;
  role: 'ADMIN' | 'OPERATOR' | 'VIEWER';
};

export interface TokenGeneratorPort {
  signAccessToken(payload: JwtPayload): Promise<string>;
}