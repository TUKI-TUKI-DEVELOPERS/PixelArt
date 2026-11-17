/**
 * Decides which (if any) admin account the seed may create.
 *
 * - SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD set: use them (any environment).
 * - Otherwise, outside production only: the well-known local development admin.
 * - Production without both variables: no admin is created.
 *
 * The seed only INSERTs when the email does not exist yet; existing users are
 * never modified (no password resets on redeploy).
 */
export const LOCAL_DEFAULT_ADMIN_EMAIL = 'admin@pixelart.local';
const LOCAL_DEFAULT_ADMIN_PASSWORD = 'Admin123!';

export type SeedAdminCredentials = {
  email: string;
  password: string;
  source: 'env' | 'local-default';
};

type SeedAdminEnv = {
  NODE_ENV?: string;
  SEED_ADMIN_EMAIL?: string;
  SEED_ADMIN_PASSWORD?: string;
};

export function resolveSeedAdminCredentials(env: SeedAdminEnv): SeedAdminCredentials | null {
  const email = env.SEED_ADMIN_EMAIL?.trim();
  const password = env.SEED_ADMIN_PASSWORD;
  if (email && password) return { email, password, source: 'env' };

  if (env.NODE_ENV === 'production') return null;
  return { email: LOCAL_DEFAULT_ADMIN_EMAIL, password: LOCAL_DEFAULT_ADMIN_PASSWORD, source: 'local-default' };
}
