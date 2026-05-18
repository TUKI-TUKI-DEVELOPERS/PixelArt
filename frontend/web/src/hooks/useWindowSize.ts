"use client";

import { useState, useEffect } from "react";

export function useWindowSize() {
  // Default to 0 (unmeasured). The mobile-first defaults below ensure the SSR
  // HTML is compact — this prevents Chrome Android from expanding the layout
  // viewport when it sees desktop-wide content before JS hydrates.
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // width === 0 means we're on the server (SSR) or haven't measured yet.
  // Default to mobile/compact so the initial HTML is narrow.
  const measured = width > 0;
  return {
    isMobile: !measured || width < 768,
    isTablet: measured && width >= 768 && width < 1024,
    isCompact: !measured || width < 1024,
  };
}
