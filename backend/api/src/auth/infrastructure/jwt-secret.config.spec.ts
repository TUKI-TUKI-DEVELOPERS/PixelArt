import { resolveJwtSecret } from './jwt-secret.config';

describe('resolveJwtSecret', () => {
  const strong = 'k3Jq9vLx2Rb7TzWm4Np8Hs6Yc1Fd5Ga0Ue';
  const weak = 'change_this_to_a_long_random_secret_in_production';
  const logger = () => ({ warn: jest.fn() });

  it('returns a strong secret in production without warning', () => {
    const log = logger();
    expect(resolveJwtSecret({ JWT_SECRET: strong, NODE_ENV: 'production' }, log)).toBe(strong);
    expect(log.warn).not.toHaveBeenCalled();
  });

  it.each([
    ['missing', undefined],
    ['short', 'short-secret'],
    ['placeholder', weak],
  ])('fails hard in production when the secret is %s, without echoing it', (_label, secret) => {
    const run = () => resolveJwtSecret({ JWT_SECRET: secret, NODE_ENV: 'production' }, logger());
    expect(run).toThrow(/JWT_SECRET/);
    if (secret) {
      try { run(); } catch (error) { expect((error as Error).message).not.toContain(secret); }
    }
  });

  it('fails hard outside production when the secret is missing (nothing to sign with)', () => {
    expect(() => resolveJwtSecret({ JWT_SECRET: undefined, NODE_ENV: 'development' }, logger())).toThrow(/JWT_SECRET/);
  });

  it.each(['development', undefined])('only warns loudly for a weak secret when NODE_ENV=%p', (nodeEnv) => {
    const log = logger();
    expect(resolveJwtSecret({ JWT_SECRET: weak, NODE_ENV: nodeEnv }, log)).toBe(weak);
    expect(log.warn).toHaveBeenCalledWith(expect.stringMatching(/JWT_SECRET/));
    expect(log.warn.mock.calls.flat().join(' ')).not.toContain(weak);
  });
});
