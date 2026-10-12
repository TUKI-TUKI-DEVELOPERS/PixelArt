import { PublicLink } from './public-link';

const HOUR_MS = 60 * 60 * 1000;

function makeLink(overrides: { expiresAt?: Date; revokedAt?: Date | null } = {}): PublicLink {
  return new PublicLink(
    1,
    'CHECKOUT',
    'token-abc',
    overrides.expiresAt ?? new Date(Date.now() + HOUR_MS),
    overrides.revokedAt !== undefined ? overrides.revokedAt : null,
    null,
    42,
    null,
    new Date(Date.now() - HOUR_MS),
  );
}

describe('PublicLink.isExpired', () => {
  it('is false while expiresAt is in the future', () => {
    expect(makeLink().isExpired).toBe(false);
  });

  it('is true once expiresAt is in the past', () => {
    expect(makeLink({ expiresAt: new Date(Date.now() - HOUR_MS) }).isExpired).toBe(true);
  });
});

describe('PublicLink.isRevoked', () => {
  it('is false when revokedAt is null', () => {
    expect(makeLink().isRevoked).toBe(false);
  });

  it('is true when revokedAt is set, even to a future date', () => {
    expect(makeLink({ revokedAt: new Date(Date.now() - HOUR_MS) }).isRevoked).toBe(true);
    expect(makeLink({ revokedAt: new Date(Date.now() + HOUR_MS) }).isRevoked).toBe(true);
  });
});

describe('PublicLink.isValid', () => {
  it('is true when neither expired nor revoked', () => {
    expect(makeLink().isValid).toBe(true);
  });

  it('is false when expired', () => {
    expect(makeLink({ expiresAt: new Date(Date.now() - HOUR_MS) }).isValid).toBe(false);
  });

  it('is false when revoked', () => {
    expect(makeLink({ revokedAt: new Date(Date.now() - HOUR_MS) }).isValid).toBe(false);
  });

  it('is false when both expired and revoked', () => {
    const link = makeLink({
      expiresAt: new Date(Date.now() - HOUR_MS),
      revokedAt: new Date(Date.now() - HOUR_MS),
    });
    expect(link.isValid).toBe(false);
  });
});
