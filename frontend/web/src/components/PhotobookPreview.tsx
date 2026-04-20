"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";

type SlotPhoto = { preview: string } | null;
type PageData = {
  pageNumber: number;
  layoutKey: string;
  slots: SlotPhoto[];
};

type Props = {
  pages: PageData[];
  accent: string;
  coverUrl?: string | null;
  backCoverUrl?: string | null;
};

const PAGE_W = 400;
const PAGE_H = 520;

function renderSlots(slots: SlotPhoto[], layoutKey: string) {
  const filled = slots.filter(Boolean) as { preview: string }[];
  const count = filled.length || 1;

  if (layoutKey === "FULL_1" || count === 1) {
    const photo = filled[0];
    return (
      <div style={{ width: "100%", height: "100%", padding: "16px" }}>
        {photo ? (
          <img src={photo.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#f0ede8", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#c4b8a8", fontSize: "13px" }}>
            Página vacía
          </div>
        )}
      </div>
    );
  }

  if (layoutKey === "GRID_2" || count === 2) {
    return (
      <div style={{ width: "100%", height: "100%", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {slots.slice(0, 2).map((s, i) => (
          <div key={i} style={{ flex: 1, borderRadius: "4px", overflow: "hidden", background: "#f0ede8" }}>
            {s ? <img src={s.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
          </div>
        ))}
      </div>
    );
  }

  if (layoutKey === "GRID_3" || count === 3) {
    return (
      <div style={{ width: "100%", height: "100%", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "6px" }}>
        <div style={{ gridColumn: "1 / -1", borderRadius: "4px", overflow: "hidden", background: "#f0ede8" }}>
          {slots[0] ? <img src={slots[0].preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
        </div>
        {slots.slice(1, 3).map((s, i) => (
          <div key={i} style={{ borderRadius: "4px", overflow: "hidden", background: "#f0ede8" }}>
            {s ? <img src={s.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
          </div>
        ))}
      </div>
    );
  }

  // GRID_4
  return (
    <div style={{ width: "100%", height: "100%", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "6px" }}>
      {slots.slice(0, 4).map((s, i) => (
        <div key={i} style={{ borderRadius: "4px", overflow: "hidden", background: "#f0ede8" }}>
          {s ? <img src={s.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
        </div>
      ))}
    </div>
  );
}

export default function PhotobookPreview({ pages, accent, coverUrl, backCoverUrl }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<PageFlip | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPfPages, setTotalPfPages] = useState(0);
  const [ready, setReady] = useState(false);

  const init = useCallback(() => {
    if (!bookRef.current || pfRef.current) return;
    const el = bookRef.current;
    const pageEls = el.querySelectorAll(".pb-page");
    if (pageEls.length === 0) return;

    const pf = new PageFlip(el, {
      width: PAGE_W,
      height: PAGE_H,
      size: "stretch",
      minWidth: 280,
      minHeight: 360,
      maxWidth: 500,
      maxHeight: 650,
      maxShadowOpacity: 0.35,
      showCover: true,
      mobileScrollSupport: false,
      drawShadow: true,
      flippingTime: 800,
      usePortrait: false,
      startZIndex: 0,
      autoSize: true,
      startPage: 0,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 30,
      showPageCorners: true,
    });

    pf.loadFromHTML(pageEls as unknown as HTMLElement[]);
    pfRef.current = pf;
    setTotalPfPages(pf.getPageCount());
    setCurrentPage(0);
    setReady(true);

    pf.on("flip", (e) => {
      setCurrentPage(e.data as number);
    });
  }, [pages.length]);

  useEffect(() => {
    const t = setTimeout(init, 200);
    return () => {
      clearTimeout(t);
      if (pfRef.current) { pfRef.current.destroy(); pfRef.current = null; }
      setReady(false);
    };
  }, [init]);

  function flipPrev() { pfRef.current?.flipPrev(); }
  function flipNext() { pfRef.current?.flipNext(); }

  const spreadIdx = Math.floor(currentPage / 2);
  const totalSpreads = Math.ceil(pages.length / 2) + 1; // +1 for cover

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900&display=swap');

        .photobook-wrap {
          position: relative;
          max-width: ${PAGE_W * 2 + 80}px;
          margin: 0 auto 24px;
          padding: 0 36px;
        }

        /* Open book leather cover */
        .photobook-cover {
          position: relative;
          padding: 0;
          border-radius: 6px;
        }

        @media (min-width: 50em) {
          .photobook-cover::before {
            background-color: #8B4513;
            border-radius: 6px;
            bottom: -12px;
            content: '';
            left: -12px;
            position: absolute;
            right: -12px;
            top: -12px;
            z-index: -1;
            box-shadow: 0 8px 40px rgba(0,0,0,0.4);
          }

          /* Center spine shadow */
          .photobook-cover::after {
            background: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 44%, rgba(0,0,0,0.4) 49%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 51%, rgba(0,0,0,0.15) 56%, transparent 100%);
            bottom: -12px;
            content: '';
            left: 50%;
            position: absolute;
            top: -12px;
            transform: translate(-50%, 0);
            width: 3em;
            z-index: 2;
            pointer-events: none;
          }
        }

        /* Page paper texture */
        .pb-page-inner {
          background-color: #FFFEF9;
          background-image:
            linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 3%, transparent 97%, rgba(0,0,0,0.02) 100%);
          position: relative;
        }

        .pb-page-inner.left-page {
          background-image:
            linear-gradient(-90deg, rgba(220,215,205,0.5) 0%, transparent 8%),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 3%, transparent 97%, rgba(0,0,0,0.02) 100%);
        }

        .pb-page-inner.right-page {
          background-image:
            linear-gradient(90deg, rgba(220,215,205,0.5) 0%, transparent 8%),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 3%, transparent 97%, rgba(0,0,0,0.02) 100%);
        }
      `}</style>

      <div className="photobook-wrap">
        {/* Navigation */}
        <button onClick={flipPrev} disabled={currentPage <= 0}
          style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20,
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid #d4c9b8", background: "#fff", color: "#5c4a3a",
            cursor: currentPage <= 0 ? "default" : "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: currentPage <= 0 ? 0.3 : 1,
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <button onClick={flipNext} disabled={currentPage >= totalPfPages - 2}
          style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20,
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1px solid #d4c9b8", background: "#fff", color: "#5c4a3a",
            cursor: currentPage >= totalPfPages - 2 ? "default" : "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: currentPage >= totalPfPages - 2 ? 0.3 : 1,
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        {/* Book */}
        <div className="photobook-cover">
          <div ref={bookRef}>
            {/* Front cover */}
            <div className="pb-page" data-density="hard" style={{ backgroundColor: "#8B4513" }}>
              {coverUrl ? (
                <div style={{ width: "100%", height: "100%", borderRadius: "0 4px 4px 0", overflow: "hidden" }}>
                  <img src={coverUrl} alt="Portada" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  background: "linear-gradient(135deg, #a0522d 0%, #8B4513 40%, #6b3410 100%)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  color: "#f5e6c8", padding: "40px", textAlign: "center",
                  borderRadius: "0 4px 4px 0",
                }}>
                  <div style={{ fontSize: "14px", fontWeight: 400, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px", opacity: 0.7 }}>PIXELART</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, lineHeight: 1.3, marginBottom: "12px" }}>Mi Photobook</div>
                  <div style={{ width: "40px", height: "2px", background: "#d4a574", margin: "12px auto", borderRadius: "1px" }} />
                  <div style={{ fontSize: "13px", opacity: 0.6, marginTop: "8px" }}>{pages.length} páginas</div>
                </div>
              )}
            </div>

            {/* Content pages */}
            {pages.map((page, idx) => (
              <div key={idx} className="pb-page" data-density="soft" style={{ backgroundColor: "#FFFEF9" }}>
                <div className={`pb-page-inner ${idx % 2 === 0 ? "right-page" : "left-page"}`}
                  style={{ width: "100%", height: "100%", position: "relative" }}>
                  {renderSlots(page.slots, page.layoutKey)}
                  {/* Page number */}
                  <div style={{
                    position: "absolute", bottom: "6px",
                    left: idx % 2 === 0 ? "auto" : "12px",
                    right: idx % 2 === 0 ? "12px" : "auto",
                    fontSize: "11px", color: "#b0a898",
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    {page.pageNumber}
                  </div>
                </div>
              </div>
            ))}

            {/* Back cover */}
            <div className="pb-page" data-density="hard" style={{ backgroundColor: "#8B4513" }}>
              {backCoverUrl ? (
                <div style={{ width: "100%", height: "100%", borderRadius: "4px 0 0 4px", overflow: "hidden" }}>
                  <img src={backCoverUrl} alt="Contraportada" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  background: "linear-gradient(225deg, #a0522d 0%, #8B4513 40%, #6b3410 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#d4a574", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase",
                  borderRadius: "4px 0 0 4px",
                }}>
                  PIXELART
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Indicator */}
      {ready && (
        <div style={{ textAlign: "center", fontSize: "13px", color: "#8c7e6e", fontFamily: "'Playfair Display', serif" }}>
          {currentPage === 0 ? "Portada" : currentPage >= totalPfPages - 1 ? "Contraportada" : `Páginas ${currentPage} – ${Math.min(currentPage + 1, pages.length)}`}
          <span style={{ margin: "0 10px", color: "#d4c9b8" }}>·</span>
          {pages.length} páginas en total
          <span style={{ margin: "0 10px", color: "#d4c9b8" }}>·</span>
          <span style={{ fontSize: "12px" }}>Arrastra las esquinas para hojear</span>
        </div>
      )}
    </div>
  );
}
