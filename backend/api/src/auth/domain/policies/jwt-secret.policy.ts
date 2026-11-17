export const JWT_SECRET_MIN_LENGTH = 32;

export type JwtSecretProblem = 'missing' | 'too_short' | 'placeholder';

/** Exact values that have shipped as examples/fallbacks and must never sign real tokens. */
const KNOWN_PLACEHOLDERS = new Set([
  'dev_secret',
  'secret',
  'changeme',
  'jwt_secret',
  'supersecret',
  'super_secret',
  'your_jwt_secret',
  'your-jwt-secret',
  'your_secret_key',
]);

/** Typical wording of example secrets in .env templates (change_me, your_..., placeholder, xxxx...). */
const PLACEHOLDER_PATTERNS = [
  /change[\s_-]?(me|this|it)/i,
  /replace[\s_-]?(me|this|with)/i,
  /^your[\s_-]/i,
  /placeholder/i,
  /example/i,
  /^(.)\1+$/,
];

/**
 * Pure policy: lists why a JWT signing secret is unsafe. Never returns or
 * embeds the secret itself so callers can log the result safely.
 */
export function findJwtSecretProblems(secret: string | undefined | null): JwtSecretProblem[] {
  const value = secret?.trim() ?? '';
  if (!value) return ['missing'];

  const problems: JwtSecretProblem[] = [];
  if (value.length < JWT_SECRET_MIN_LENGTH) problems.push('too_short');
  if (KNOWN_PLACEHOLDERS.has(value.toLowerCase()) || PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value))) {
    problems.push('placeholder');
  }
  return problems;
}
