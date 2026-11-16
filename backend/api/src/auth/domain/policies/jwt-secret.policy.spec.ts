import { findJwtSecretProblems, JWT_SECRET_MIN_LENGTH } from './jwt-secret.policy';

describe('findJwtSecretProblems', () => {
  const strong = 'k3Jq9vLx2Rb7TzWm4Np8Hs6Yc1Fd5Ga0Ue';

  it('accepts a random secret of at least 32 characters', () => {
    expect(strong.length).toBeGreaterThanOrEqual(JWT_SECRET_MIN_LENGTH);
    expect(findJwtSecretProblems(strong)).toEqual([]);
  });

  it.each([undefined, '', '   '])('reports a missing secret for %p', (secret) => {
    expect(findJwtSecretProblems(secret)).toEqual(['missing']);
  });

  it('reports a secret shorter than 32 characters', () => {
    const secret = 'abcdefghijklmnopqrstuvwxyz01234';
    expect(secret).toHaveLength(31);
    expect(findJwtSecretProblems(secret)).toEqual(['too_short']);
  });

  it.each([
    'dev_secret',
    'change_this_to_a_long_random_secret_in_production',
    'CHANGE-ME-generate-with-openssl-rand-base64-48-now',
    'your_super_secret_jwt_key_here_minimum_32_chars',
    'replace_me_with_a_real_secret_before_deploying_it',
    'placeholder-jwt-secret-value-do-not-use-in-prod',
    'example_jwt_secret_for_local_development_only_x',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  ])('reports a well-known placeholder (%#)', (secret) => {
    expect(findJwtSecretProblems(secret)).toContain('placeholder');
  });
});
