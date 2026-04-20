"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";

type Proposal = {
  templateId: number;
  templateName: string | null;
  imageUrl: string;
  protectionMode: string;
};

const PAGE_W = 360;
const PAGE_H = 360;

export default function ProposalBook({ proposals }: { proposals: Proposal[] }) {
  const bookRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<PageFlip | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [ready, setReady] = useState(false);

  const pageData = proposals.flatMap((p, idx) => [
    { proposal: p, idx, side: "left" as const },
    { proposal: p, idx, side: "right" as const },
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
      clickEventForward: false,
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
  }, [proposals.length]);

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
      <div style={{ position: "relative", maxWidth: `${PAGE_W * 2 + 40}px`, margin: "0 auto 20px", padding: "0 28px" }}>

        {/* Left arrow */}
        <button
          onClick={flipPrev}
          aria-label="Anterior"
          disabled={currentSpread <= 0}
          style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20,
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid #e5e7eb", background: "#fff", color: "#374151",
            cursor: currentSpread <= 0 ? "default" : "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
            opacity: currentSpread <= 0 ? 0.3 : 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={flipNext}
          aria-label="Siguiente"
          disabled={currentSpread >= proposals.length - 1}
          style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20,
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid #e5e7eb", background: "#fff", color: "#374151",
            cursor: currentSpread >= proposals.length - 1 ? "default" : "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
            opacity: currentSpread >= proposals.length - 1 ? 0.3 : 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Book */}
        <div style={{ boxShadow: "0 0 60px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
          <div ref={bookRef} style={{ width: "100%", minHeight: `${PAGE_H}px` }}>
            {pageData.map((p) => {
              const { proposal, idx, side } = p;
              return (
                <div
                  key={`${proposal.templateId}-${side}`}
                  className="pf-page"
                  data-density="soft"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <div style={{
                    width: "100%", height: "100%", position: "relative", overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                    backgroundImage: side === "left"
                      ? "linear-gradient(-90deg, rgba(220,220,220,0.6) 0%, rgba(247,247,247,0) 12%)"
                      : "linear-gradient(90deg, rgba(220,220,220,0.6) 0%, rgba(247,247,247,0) 12%)",
                  }}>

                    {/* Proposal image — left or right half */}
                    <img
                      src={proposal.imageUrl}
                      alt={proposal.templateName ?? `Propuesta ${idx + 1}`}
                      draggable={false}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: side === "left" ? 0 : "-100%",
                        width: "200%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Protection badge — top right of right page */}
                    {side === "right" && (
                      <div style={{
                        position: "absolute", top: "8px", right: "8px",
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "6px",
                        padding: "3px 9px",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#fff",
                        zIndex: 5,
                      }}>
                        {proposal.protectionMode === "WATERMARK" ? "Marca de agua" : "Baja calidad"}
                      </div>
                    )}

                    {/* Proposal number badge — top left of left page */}
                    {side === "left" && (
                      <div style={{
                        position: "absolute", top: "8px", left: "8px",
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(4px)",
                        color: "#fff",
                        fontSize: "12px", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "2px solid rgba(255,255,255,0.4)",
                        zIndex: 5,
                      }}>
                        {idx + 1}
                      </div>
                    )}

                    {/* Template name — bottom of left page */}
                    {side === "left" && (
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        padding: "24px 10px 8px",
                        background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
                      }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.6)", lineHeight: 1.3 }}>
                          {proposal.templateName ?? `Propuesta ${idx + 1}`}
                        </div>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                          {idx + 1} / {proposals.length}
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
          Propuesta {currentSpread + 1} de {proposals.length}
          <span style={{ margin: "0 8px", color: "#d1d5db" }}>|</span>
          Arrastrá las esquinas o usá las flechas
        </div>
      )}
    </div>
  );
}
