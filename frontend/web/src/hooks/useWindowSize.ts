"use client";

import { useState, useEffect } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isCompact: width < 1024,
  };
}
