import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// Vitest runs from frontend/web (see vitest.config.ts).
const SRC = join(process.cwd(), 'src');

/** Next route handlers that legitimately live under /api/admin (not rewritten to Nest). */
const NEXT_OWNED_ADMIN_ROUTES = ['/api/admin/login', '/api/admin/logout', '/api/admin/upload-asset'];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) return sourceFiles(fullPath);
    if (!/\.(ts|tsx)$/.test(entry) || /\.(test|spec)\.tsx?$/.test(entry)) return [];
    return [fullPath];
  });
}

const browserSources = sourceFiles(SRC)
  .filter((file) => !relative(SRC, file).startsWith(join('app', 'admin-api')) && !relative(SRC, file).startsWith(join('app', 'api')))
  .map((file) => ({ file: relative(SRC, file), source: readFileSync(file, 'utf8') }));

describe('admin browser callers', () => {
  it('never call the guarded Nest admin API directly (the httpOnly token only reaches it through /admin-api)', () => {
    const offenders = browserSources.flatMap(({ file, source }) =>
      [...source.matchAll(/\/api\/admin\/[A-Za-z0-9_\-/]*/g)]
        .map((match) => match[0])
        .filter((path) => !NEXT_OWNED_ADMIN_ROUTES.some((route) => path.startsWith(route)))
        .map((path) => `${file}: ${path}`),
    );
    expect(offenders).toEqual([]);
  });

  it('resolve asset URLs through the authenticated BFF', () => {
    const offenders = browserSources
      .filter(({ source }) => /\/api\/assets\/\$\{[^}]+\}\/url/.test(source))
      .map(({ file }) => file);
    expect(offenders).toEqual([]);
  });

  it('do not ship default admin credentials in the login page', () => {
    const login = browserSources.find(({ file }) => file === join('app', 'admin', 'login', 'page.tsx'));
    expect(login?.source).not.toContain('Admin123!');
    expect(login?.source).not.toContain('admin@pixelart.local');
    expect(login?.source).toContain('getSafeAdminRedirect');
  });
});
