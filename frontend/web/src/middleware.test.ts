import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { config, middleware } from './middleware';

const request = (path: string, init?: { method?: string; headers?: Record<string, string> }) =>
  new NextRequest(`http://localhost:3000${path}`, init);

const passesThrough = (response: Response) => response.headers.get('x-middleware-next') === '1';

describe('middleware: /assets/* public allowlist', () => {
  it('runs for every /assets path', () => {
    expect(config.matcher).toContain('/assets/:path*');
  });

  it('lets allowlisted public assets through to the /assets route handler', () => {
    expect(passesThrough(middleware(request('/assets/IA_Books/Backgrounds/Background_IA_Books_Pet_Book_Page.png')))).toBe(true);
  });

  it('keeps the ?v= cache buster working', () => {
    expect(passesThrough(middleware(request('/assets/uploads/proposals/12_40.jpg?v=1712345')))).toBe(true);
  });

  it.each([
    '/assets/uploads/vouchers/31.jpg',
    '/assets/generated/originals/12_40.png',
    '/assets/custom-books/print-assets/31/cover.png',
    '/assets/photobook-renders/79.pdf',
    '/assets/uploads/customers/%2e%2e/vouchers/31.jpg',
    '/assets/unknown.png',
  ])('denies %s with 404 before routing', (path) => {
    const response = middleware(request(path));
    expect(passesThrough(response)).toBe(false);
    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('denies S3 response overrides on public assets', () => {
    const response = middleware(request('/assets/Home/x.png?response-content-type=text%2Fhtml'));
    expect(passesThrough(response)).toBe(false);
    expect(response.status).toBe(404);
  });

  it.each(['POST', 'PUT', 'DELETE'])('rejects %s', (method) => {
    const response = middleware(request('/assets/Home/x.png', { method }));
    expect(passesThrough(response)).toBe(false);
    expect(response.status).toBe(405);
  });

  it('allows HEAD on public assets', () => {
    expect(passesThrough(middleware(request('/assets/Home/x.png', { method: 'HEAD' })))).toBe(true);
  });
});

describe('middleware: admin pages', () => {
  it('still redirects anonymous admin page visits to the login', () => {
    const response = middleware(request('/admin/ordenes/5'));
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost:3000/admin/login?next=%2Fadmin%2Fordenes%2F5');
  });
});
