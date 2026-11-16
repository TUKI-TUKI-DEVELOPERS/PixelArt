import { jwtModuleOptionsFactory } from './auth.module';

describe('jwtModuleOptionsFactory', () => {
  const strong = 'k3Jq9vLx2Rb7TzWm4Np8Hs6Yc1Fd5Ga0Ue';
  const config = (values: Record<string, string | undefined>) => ({ get: (key: string) => values[key] });

  it('signs HS256 tokens that expire after 24h with the configured secret', () => {
    expect(jwtModuleOptionsFactory(config({ JWT_SECRET: strong, NODE_ENV: 'production' }) as never)).toEqual({
      secret: strong,
      signOptions: { expiresIn: 60 * 60 * 24, algorithm: 'HS256' },
      verifyOptions: { algorithms: ['HS256'] },
    });
  });

  it('never falls back to a hardcoded development secret', () => {
    expect(() => jwtModuleOptionsFactory(config({ NODE_ENV: 'development' }) as never)).toThrow(/JWT_SECRET/);
  });
});
