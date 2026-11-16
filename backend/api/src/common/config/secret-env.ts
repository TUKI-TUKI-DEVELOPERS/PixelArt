type EnvReader = (key: string) => string | undefined;

const readProcessEnv: EnvReader = (key) => process.env[key];

/**
 * Credential lookup that keeps the convenient local default for development
 * but refuses to boot in production when the variable is missing, so a prod
 * deploy can never silently run on a well-known default credential.
 * The error names the variable only, never a value.
 */
export function secretFromEnv(name: string, devDefault: string, read: EnvReader = readProcessEnv): string {
  const value = read(name);
  if (value !== undefined && value.trim() !== '') return value;
  if (read('NODE_ENV') === 'production') {
    throw new Error(`Refusing to start: ${name} must be set in production`);
  }
  return devDefault;
}
