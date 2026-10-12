import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import { useWindowSize } from './useWindowSize';

function setInnerWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
}

function renderAtWidth(width: number) {
  setInnerWidth(width);
  return renderHook(() => useWindowSize());
}

describe('useWindowSize', () => {
  afterEach(() => {
    cleanup();
  });

  it('treats width 0 (unmeasured/SSR) as mobile and compact, but not small-mobile or tablet', () => {
    const { result } = renderAtWidth(0);
    expect(result.current).toEqual({
      isMobile: true,
      isSmallMobile: false,
      isTablet: false,
      isCompact: true,
    });
  });

  it('flags small mobile below 375px', () => {
    const { result } = renderAtWidth(374);
    expect(result.current).toEqual({
      isMobile: true,
      isSmallMobile: true,
      isTablet: false,
      isCompact: true,
    });
  });

  it('drops small mobile exactly at 375px but stays mobile', () => {
    const { result } = renderAtWidth(375);
    expect(result.current).toEqual({
      isMobile: true,
      isSmallMobile: false,
      isTablet: false,
      isCompact: true,
    });
  });

  it('is still mobile at 767px', () => {
    const { result } = renderAtWidth(767);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isCompact).toBe(true);
  });

  it('becomes tablet exactly at 768px', () => {
    const { result } = renderAtWidth(768);
    expect(result.current).toEqual({
      isMobile: false,
      isSmallMobile: false,
      isTablet: true,
      isCompact: true,
    });
  });

  it('is still tablet and compact at 1023px', () => {
    const { result } = renderAtWidth(1023);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isCompact).toBe(true);
  });

  it('is desktop (all flags false) exactly at 1024px', () => {
    const { result } = renderAtWidth(1024);
    expect(result.current).toEqual({
      isMobile: false,
      isSmallMobile: false,
      isTablet: false,
      isCompact: false,
    });
  });

  it('updates breakpoints on window resize events', () => {
    const { result } = renderAtWidth(1200);
    expect(result.current.isMobile).toBe(false);

    act(() => {
      setInnerWidth(600);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isCompact).toBe(true);

    act(() => {
      setInnerWidth(900);
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
  });

  it('removes the resize listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderAtWidth(1024);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
