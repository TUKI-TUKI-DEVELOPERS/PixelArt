import { secretFromEnv } from './secret-env';

describe('secretFromEnv', () => {
  const reader = (env: Record<string, string | undefined>) => (key: string) => env[key];

  it('returns the configured value', () => {
    expect(secretFromEnv('MINIO_SECRET_KEY', 'dev-default', reader({ MINIO_SECRET_KEY: 'real', NODE_ENV: 'production' }))).toBe('real');
  });

  it('falls back to the dev default outside production', () => {
    expect(secretFromEnv('MINIO_SECRET_KEY', 'dev-default', reader({ NODE_ENV: 'development' }))).toBe('dev-default');
    expect(secretFromEnv('MINIO_SECRET_KEY', 'dev-default', reader({}))).toBe('dev-default');
  });

  it.each([undefined, '', '   '])('refuses to start in production when the value is %j', (value) => {
    expect(() => secretFromEnv('POSTGRES_PASSWORD', 'pixelart_secret', reader({ POSTGRES_PASSWORD: value, NODE_ENV: 'production' })))
      .toThrow('Refusing to start: POSTGRES_PASSWORD must be set in production');
  });

  it('never echoes the dev default in the error message', () => {
    expect(() => secretFromEnv('POSTGRES_PASSWORD', 'pixelart_secret', reader({ NODE_ENV: 'production' })))
      .toThrow(expect.objectContaining({ message: expect.not.stringContaining('pixelart_secret') }));
  });

  it('reads process.env by default', () => {
    const previous = process.env.PIXELART_TEST_SECRET;
    process.env.PIXELART_TEST_SECRET = 'from-process';
    try {
      expect(secretFromEnv('PIXELART_TEST_SECRET', 'dev-default')).toBe('from-process');
    } finally {
      if (previous === undefined) delete process.env.PIXELART_TEST_SECRET;
      else process.env.PIXELART_TEST_SECRET = previous;
    }
  });
});
