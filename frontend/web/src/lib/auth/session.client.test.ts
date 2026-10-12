import { describe, it, expect, beforeEach } from 'vitest';
import { getTokenClient, setTokenClient, clearTokenClient } from './session.client';

const TOKEN_KEY = 'pa_admin_token';

describe('session.client token storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns null when no token is stored', () => {
    expect(getTokenClient()).toBeNull();
  });

  it('stores the token under the pa_admin_token key', () => {
    setTokenClient('jwt-abc');
    expect(window.localStorage.getItem(TOKEN_KEY)).toBe('jwt-abc');
  });

  it('reads back a stored token', () => {
    setTokenClient('jwt-abc');
    expect(getTokenClient()).toBe('jwt-abc');
  });

  it('overwrites a previously stored token', () => {
    setTokenClient('first');
    setTokenClient('second');
    expect(getTokenClient()).toBe('second');
  });

  it('clears the stored token', () => {
    setTokenClient('jwt-abc');
    clearTokenClient();
    expect(getTokenClient()).toBeNull();
    expect(window.localStorage.getItem(TOKEN_KEY)).toBeNull();
  });

  it('clearing when nothing is stored is a no-op', () => {
    expect(() => clearTokenClient()).not.toThrow();
    expect(getTokenClient()).toBeNull();
  });
});
