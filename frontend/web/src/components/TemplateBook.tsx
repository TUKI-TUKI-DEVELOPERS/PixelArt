"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";
import { CheckCircle2 } from "lucide-react";

type Template = { id: number; name: string | null; previewUrl: string };

type Props = {
  templates: Template[];
  selectedIds: number[];
  maxSelections: number;
  accent: string;
  onToggle: (id: number) => void;
};

/* ── Book dimensions ──
   Each template image is landscape (~2:1).
   We split each template into LEFT and RIGHT halves so that
   one open spread = one full template image.
   PageFlip page size = half of the spread.
*/
const PAGE_W = 360;
const PAGE_H = 360;

export default function TemplateBook({ templates, selectedIds, maxSelections, accent, onToggle }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<PageFlip | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [ready, setReady] = useState(false);

  /* Build flat page list: for each template, create LEFT page + RIGHT page */
  const pageData = templates.flatMap((tpl, idx) => [
    { tpl, idx, side: "left" as const },
    { tpl, idx, side: "right" as const },
  ]);

  const init = useCallback(() => {
    if (!bookRef.current || pfRef.current) return;
    const el = bookRef.current;
    const pages = el.querySelectorAll(".pf-page");
    if (pages.length === 0) return;

    const pf = new PageFlip(el, {
      width: PAGE_W,
      height: PAGE_H,
      size: "stretch",
      minWidth: 260,
      minHeight: 260,
      maxWidth: 500,
      maxHeight: 500,
      maxShadowOpacity: 0.4,
      showCover: false,
      mobileScrollSupport: false,
      drawShadow: true,
      flippingTime: 700,
      usePortrait: false,
      startZIndex: 0,
      autoSize: true,
      startPage: 0,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 30,
      showPageCorners: true,
    });

    pf.loadFromHTML(pages as unknown as HTMLElement[]);
    pfRef.current = pf;
    setReady(true);
    setCurrentSpread(0);

    pf.on("flip", (e) => {
      setCurrentSpread(Math.floor((e.data as number) / 2));
    });
  }, [templates.length]);

  useEffect(() => {
    const t = setTimeout(init, 150);
    return () => {
      clearTimeout(t);
      if (pfRef.current) { pfRef.current.destroy(); pfRef.current = null; }
      setReady(false);
    };
  }, [init]);

  function flipPrev() { pfRef.current?.flipPrev(); }
  function flipNext() { pfRef.current?.flipNext(); }

  return (
    <div>
      {/* Wrapper: constrains width and centers */}
      <div style={{ position: "relative", maxWidth: `${PAGE_W * 2 + 40}px`, margin: "0 auto 20px", padding: "0 28px" }}>

        {/* Left arrow */}
        <button onClick={flipPrev} aria-label="Anterior" disabled={currentSpread <= 0}
          style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20,
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid #e5e7eb", background: "#fff", color: "#374151",
            cursor: currentSpread <= 0 ? "default" : "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
            opacity: currentSpread <= 0 ? 0.3 : 1,
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        {/* Right arrow */}
        <button onClick={flipNext} aria-label="Siguiente" disabled={currentSpread >= templates.length - 1}
          style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20,
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid #e5e7eb", background: "#fff", color: "#374151",
            cursor: currentSpread >= templates.length - 1 ? "default" : "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
            opacity: currentSpread >= templates.length - 1 ? 0.3 : 1,
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        {/* Book */}
        <div style={{ boxShadow: "0 0 60px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
          <div ref={bookRef} style={{ width: "100%", minHeight: `${PAGE_H}px` }}>
            {pageData.map((p, i) => {
              const { tpl, idx, side } = p;
              const isSelected = selectedIds.includes(tpl.id);
              const selIdx = selectedIds.indexOf(tpl.id);
              const isDisabled = !isSelected && selectedIds.length >= maxSelections;

              return (
                <div key={`${tpl.id}-${side}`} className="pf-page" data-density="soft"
                  style={{ backgroundColor: "#F5F5F5" }}>
                  <div style={{
                    width: "100%", height: "100%", position: "relative", overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                    backgroundImage: side === "left"
                      ? "linear-gradient(-90deg, rgba(220,220,220,0.6) 0%, rgba(247,247,247,0) 12%)"
                      : "linear-gradient(90deg, rgba(220,220,220,0.6) 0%, rgba(247,247,247,0) 12%)",
                  }}>
                    {/* Template image — show left or right half */}
                    <img
                      src={tpl.previewUrl}
                      alt={tpl.name ?? `Escenario ${idx + 1}`}
                      draggable={false}
                      style={{
                        position: "absolute",
                        top: 0,
                        /* Left page shows left half, right page shows right half */
                        left: side === "left" ? 0 : "-100%",
                        width: "200%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isDisabled ? 0.35 : 1,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Selection badge — only on right page to avoid duplication */}
                    {side === "right" && isSelected && (
                      <div style={{
                        position: "absolute", top: "8px", right: "8px",
                        width: "30px", height: "30px", borderRadius: "50%",
                        background: accent, color: "#fff",
                        fontSize: "13px", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        border: "2px solid #fff", zIndex: 5,
                      }}>
                        {selIdx + 1}
                      </div>
                    )}

                    {/* Select button — only on right page */}
                    {side === "right" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); if (!isDisabled) onToggle(tpl.id); }}
                        disabled={isDisabled}
                        style={{
                          position: "absolute", bottom: "10px", right: "10px", zIndex: 6,
                          padding: "6px 14px", borderRadius: "8px",
                          border: "none",
                          background: isSelected ? accent : "rgba(0,0,0,0.6)",
                          color: "#fff", fontSize: "11px", fontWeight: 700,
                          cursor: isDisabled ? "not-allowed" : "pointer",
                          fontFamily: "inherit",
                          backdropFilter: "blur(4px)",
                          display: "flex", alignItems: "center", gap: "4px",
                          opacity: isDisabled ? 0.4 : 1,
                        }}
                      >
                        {isSelected ? <><CheckCircle2 size={13} /> Seleccionado</> : "Seleccionar"}
                      </button>
                    )}

                    {/* Info — only on left page bottom */}
                    {side === "left" && (
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "24px 10px 8px",
                        background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                      }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.6)", lineHeight: 1.3 }}>
                          {tpl.name ?? `Escenario ${idx + 1}`}
                        </div>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                          {idx + 1} / {templates.length}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page indicator */}
      {ready && (
        <div style={{ textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
          Escenario {currentSpread + 1} de {templates.length}
          <span style={{ margin: "0 8px", color: "#d1d5db" }}>|</span>
          Arrastra las esquinas o usa las flechas
        </div>
      )}
    </div>
  );
}
