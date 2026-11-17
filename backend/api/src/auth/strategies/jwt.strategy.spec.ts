import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  const strong = 'k3Jq9vLx2Rb7TzWm4Np8Hs6Yc1Fd5Ga0Ue';
  const config = { get: (key: string) => ({ JWT_SECRET: strong, NODE_ENV: 'production' } as Record<string, string>)[key] };

  it('pins verification to HS256 so tokens cannot pick their own algorithm', () => {
    const strategy = new JwtStrategy(config as never, { execute: jest.fn() } as never);
    expect((strategy as unknown as { _verifOpts: { algorithms: string[] } })._verifOpts.algorithms).toEqual(['HS256']);
  });

  it('re-validates the token subject against the database instead of trusting the payload', async () => {
    const principal = { sub: 7, email: 'ops@pixelart.pe', role: 'OPERATOR' };
    const validateUser = { execute: jest.fn().mockResolvedValue(principal) };
    const strategy = new JwtStrategy(config as never, validateUser as never);

    await expect(strategy.validate({ sub: 7, email: 'ops@pixelart.pe', role: 'ADMIN' })).resolves.toEqual(principal);
    expect(validateUser.execute).toHaveBeenCalledWith({ sub: 7, email: 'ops@pixelart.pe', role: 'ADMIN' });
  });
});
