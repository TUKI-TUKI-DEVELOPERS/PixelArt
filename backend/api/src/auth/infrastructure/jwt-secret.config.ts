import { findJwtSecretProblems, JWT_SECRET_MIN_LENGTH, JwtSecretProblem } from '../domain/policies/jwt-secret.policy';

type JwtSecretEnv = { JWT_SECRET?: string; NODE_ENV?: string };
type WarnLogger = { warn(message: string): void };

const DESCRIPTIONS: Record<JwtSecretProblem, string> = {
  missing: 'is not set',
  too_short: `is shorter than ${JWT_SECRET_MIN_LENGTH} characters`,
  placeholder: 'looks like a placeholder/example value',
};

/**
 * Boot-time guard for the JWT signing secret. Production fails hard on any
 * problem; other environments only fail when the secret is missing and log a
 * loud warning otherwise, so a weak local secret does not block development.
 * Messages never include the secret value.
 */
export function resolveJwtSecret(env: JwtSecretEnv, logger: WarnLogger = console): string {
  const problems = findJwtSecretProblems(env.JWT_SECRET);
  if (problems.length === 0) return env.JWT_SECRET as string;

  const reason = `JWT_SECRET ${problems.map((problem) => DESCRIPTIONS[problem]).join(' and ')}. ` +
    `Generate one with: openssl rand -base64 48`;

  if (env.NODE_ENV === 'production' || problems.includes('missing')) {
    throw new Error(`Refusing to start: ${reason}`);
  }

  logger.warn(`\n${'!'.repeat(72)}\n  INSECURE ${reason}\n  Allowed only because NODE_ENV is not "production".\n${'!'.repeat(72)}`);
  return env.JWT_SECRET as string;
}

export function resolveJwtSecretFromConfig(config: { get<T = string>(key: string): T | undefined }, logger?: WarnLogger): string {
  return resolveJwtSecret(
    { JWT_SECRET: config.get<string>('JWT_SECRET'), NODE_ENV: config.get<string>('NODE_ENV') },
    logger,
  );
}
