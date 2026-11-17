import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/photobooks',
}));

import NavbarClient from './NavbarClient';

const PRINT_LABEL = '¿Deseas imprimir con nosotros?';
const CUSTOM_PHOTOBOOK_HREF = '/photobooks/a-medida';

function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: width });
}

describe('NavbarClient', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: false, media: query,
      addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(),
    })));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    setViewportWidth(1024);
    document.body.style.overflow = '';
  });

  describe('on desktop', () => {
    beforeEach(() => setViewportWidth(1360));

    it('no longer links to Instagram or Facebook', () => {
      render(<NavbarClient />);
      expect(screen.queryByRole('link', { name: /instagram/i })).toBeNull();
      expect(screen.queryByRole('link', { name: /facebook/i })).toBeNull();
    });

    it('keeps the WhatsApp link, pointing at the PixelArt chat', () => {
      render(<NavbarClient />);
      const link = screen.getByRole('link', { name: 'WhatsApp' });
      expect(link.getAttribute('href')).toBe('https://wa.me/51941452953');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('links the print-with-us pill to the custom photobook page', () => {
      render(<NavbarClient />);
      const link = screen.getByRole('link', { name: PRINT_LABEL });
      expect(link.getAttribute('href')).toBe(CUSTOM_PHOTOBOOK_HREF);
      expect(screen.queryByRole('button', { name: PRINT_LABEL })).toBeNull();
    });
  });

  describe('on mobile', () => {
    beforeEach(() => setViewportWidth(390));

    it('links to the custom photobook page from the menu and closes the menu on click', () => {
      render(<NavbarClient />);
      fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));

      const menu = screen.getByRole('dialog', { name: 'Menú de navegación' });
      expect(menu.querySelector('a[aria-label="Instagram"], a[aria-label="Facebook"]')).toBeNull();

      const link = screen.getByRole('link', { name: PRINT_LABEL });
      expect(link.getAttribute('href')).toBe(CUSTOM_PHOTOBOOK_HREF);

      // jsdom cannot navigate; cancel the default so only the drawer's onClick runs.
      link.addEventListener('click', (event) => event.preventDefault());
      fireEvent.click(link);

      expect(screen.getByRole('button', { name: 'Abrir menú' }).getAttribute('aria-expanded')).toBe('false');
    });
  });
});
