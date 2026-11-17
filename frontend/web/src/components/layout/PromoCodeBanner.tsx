"use client";

import { useEffect, useState } from "react";
import { promoBannerMessage, type PublicPromoCode } from "@/lib/promotions/public-codes";

export type ManualBanner = { text: string; color: string; enabled: boolean } | null;

const ROTATE_MS = 4500;
const DEFAULT_COLOR = "#1a1a2e";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

/**
 * Top site banner. Valid coded promotions take priority and rotate; with none,
 * the manual site-config text is shown when enabled. With reduced motion the
 * banner never rotates and lists every code at once.
 */
export default function PromoCodeBanner({ codes, fallback }: { codes: PublicPromoCode[]; fallback: ManualBanner }) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const rotates = codes.length > 1 && !reduceMotion;
  useEffect(() => {
    if (!rotates || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % codes.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [rotates, paused, codes.length]);

  let text: string | null = null;
  if (codes.length > 0) {
    text = reduceMotion
      ? codes.map(promoBannerMessage).join(" · ")
      : promoBannerMessage(codes[index % codes.length]);
  } else if (fallback?.enabled && fallback.text) {
    text = fallback.text;
  }
  if (!text) return null;

  return (
    <div
      className="promo-code-banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{
        width: "100%",
        background: fallback?.color || DEFAULT_COLOR,
        textAlign: "center",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.3px",
      }}
    >
      <style>{`
        .promo-code-banner { padding: 10px 48px; font-size: 14px; }
        @media (max-width: 767px) { .promo-code-banner { padding: 8px 16px; font-size: 12px; } }
        @keyframes promo-code-banner-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .promo-code-banner-text { display: inline-block; animation: promo-code-banner-in 420ms ease-out; }
        @media (prefers-reduced-motion: reduce) { .promo-code-banner-text { animation: none; } }
      `}</style>
      <span key={rotates ? index : "static"} className="promo-code-banner-text">{text}</span>
    </div>
  );
}
