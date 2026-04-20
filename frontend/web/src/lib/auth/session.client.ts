'use client';

const TOKEN_KEY = 'pa_admin_token';

export function getTokenClient() {
  return typeof window === 'undefined' ? null : window.localStorage.getItem(TOKEN_KEY);
}

export function setTokenClient(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearTokenClient() {
  window.localStorage.removeItem(TOKEN_KEY);
}