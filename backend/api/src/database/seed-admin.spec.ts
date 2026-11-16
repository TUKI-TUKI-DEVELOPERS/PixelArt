import { resolveSeedAdminCredentials, LOCAL_DEFAULT_ADMIN_EMAIL } from './seed-admin';

describe('resolveSeedAdminCredentials', () => {
  it('uses SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD when both are set, in any environment', () => {
    expect(resolveSeedAdminCredentials({
      NODE_ENV: 'production',
      SEED_ADMIN_EMAIL: ' owner@pixelart.pe ',
      SEED_ADMIN_PASSWORD: 'a-real-strong-password',
    })).toEqual({ email: 'owner@pixelart.pe', password: 'a-real-strong-password', source: 'env' });
  });

  it.each([
    {},
    { SEED_ADMIN_EMAIL: 'owner@pixelart.pe' },
    { SEED_ADMIN_PASSWORD: 'a-real-strong-password' },
    { SEED_ADMIN_EMAIL: '', SEED_ADMIN_PASSWORD: '' },
  ])('creates no admin in production without both env vars (%#)', (vars) => {
    expect(resolveSeedAdminCredentials({ NODE_ENV: 'production', ...vars })).toBeNull();
  });

  it.each(['development', 'test', undefined])('falls back to the local default admin when NODE_ENV=%p', (nodeEnv) => {
    expect(resolveSeedAdminCredentials({ NODE_ENV: nodeEnv })).toEqual({
      email: LOCAL_DEFAULT_ADMIN_EMAIL,
      password: expect.any(String),
      source: 'local-default',
    });
  });
});
