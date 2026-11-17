import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

const pathname = vi.hoisted(() => ({ current: '/' }));

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import WhatsAppButton from './WhatsAppButton';

function renderAt(path: string) {
  pathname.current = path;
  return render(<WhatsAppButton />);
}

describe('WhatsAppButton', () => {
  afterEach(cleanup);

  it('links to the PixelArt WhatsApp chat in a new tab', () => {
    renderAt('/libros-personalizados');

    const link = screen.getByRole('link', { name: 'Contactar por WhatsApp' });
    expect(link.getAttribute('href')).toBe('https://wa.me/51941452953');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it.each(['/photobooks/viaje/editor', '/photobooks/viaje/configurar', '/photobooks/mi-photobook'])(
    'is hidden in the photobook editors, which have their own bottom bar (%s)',
    (path) => {
      renderAt(path);
      expect(screen.queryByRole('link', { name: 'Contactar por WhatsApp' })).toBeNull();
    },
  );

  it('is raised on mobile only in checkout, where it would cover the confirm button', () => {
    renderAt('/checkout/ae0346f6-f267-43bb-926c-e1ea3987de4b');
    expect(screen.getByRole('link', { name: 'Contactar por WhatsApp' }).className).toContain('wa-float-raised');

    cleanup();
    renderAt('/');
    expect(screen.getByRole('link', { name: 'Contactar por WhatsApp' }).className).not.toContain('wa-float-raised');
  });

  it('stays below overlays such as the promo sheet and the mobile menu', () => {
    const { container } = renderAt('/');

    const css = container.querySelector('style')?.textContent ?? '';
    const zIndex = Number(/\.wa-float \{[^}]*z-index:\s*(\d+)/.exec(css)?.[1]);
    expect(zIndex).toBeLessThan(100);
  });
});
