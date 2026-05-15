"use client";

import { useRef, useEffect, useState } from "react";
import interact from "interactjs";

// Module-level flag — once the user uses pan mode once, hide all hints
let panHintDismissed = false;

/* ── Types ── */
type SlotPhoto = {
  id: number;
  preview: string;
  contentHash: string;
  width?: number | null;
  height?: number | null;
} | null;

type PageData = {
  pageNumber: number;
  layoutKey: string;
  slots: SlotPhoto[];
  slotPositions?: Record<number, { x: number; y: number }>;
};

type LayoutOption = { key: string; label: string; slots: number };

type Props = {
  pages: PageData[];
  accent: string;
  layouts: LayoutOption[];
  onChangeLayout: (pageIdx: number, layoutKey: string) => void;
  onAssignPhoto: (pageIdx: number, slotIdx: number, photoId: number) => void;
  onRemovePhoto: (pageIdx: number, slotIdx: number) => void;
  onDeletePage: (pageIdx: number) => void;
  onDuplicatePage: (pageIdx: number) => void;
  onReorderPages: (fromIdx: number, toIdx: number) => void;
  onClickPage: (pageIdx: number) => void;
  onSwapSlots: (pageIdx: number, fromSlot: number, toSlot: number) => void;
  onUpdateSlotPosition: (pageIdx: number, slotIdx: number, x: number, y: number) => void;
  coverUrl: string | null;
  backCoverUrl: string | null;
  /* Mobile props */
  isMobile?: boolean;
  mobilePageIdx?: number;
  selectedSlotId?: string | null;
  onSlotTap?: (pageIdx: number, slotIdx: number) => void;
};

const PAGE_W = 380;
const PAGE_H = 500;
const SLOT_GAP = 6;
const PAGE_PAD = 14;

/* ── Layout engine ── */
type GridDef = { columns: string; rows: string; areas: string[]; template: string };

function getGridDef(layoutKey: string): GridDef {
  switch (layoutKey) {
    case "FULL_1":
      return { columns: "1fr", rows: "1fr", areas: ["a"], template: `"a"` };
    case "GRID_2":
      return { columns: "1fr", rows: "1fr 1fr", areas: ["a", "b"], template: `"a" "b"` };
    case "GRID_3":
      return { columns: "1fr 1fr", rows: "3fr 2fr", areas: ["a", "b", "c"], template: `"a a" "b c"` };
    case "GRID_4":
    default:
      return { columns: "1fr 1fr", rows: "1fr 1fr", areas: ["a", "b", "c", "d"], template: `"a b" "c d"` };
  }
}

/* ── Drop zone slot ── */
function DropSlot({
  photo, slotIdx, pageIdx, gridArea, onRemove, accent,
  isMobile, isSelected, onTap,
  position, onUpdatePosition,
}: {
  photo: SlotPhoto; slotIdx: number; pageIdx: number; gridArea: string;
  onRemove: (si: number) => void; accent: string;
  isMobile?: boolean; isSelected?: boolean; onTap?: () => void;
  position?: { x: number; y: number };
  onUpdatePosition?: (x: number, y: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prevPhotoId = useRef<number | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const lastTapRef = useRef(0);
  const [showHint, setShowHint] = useState(false);

  const pos = position ?? { x: 50, y: 50 };

  // Show hint 4s after a photo lands — only until the user discovers pan mode
  useEffect(() => {
    if (!photo || panHintDismissed) { setShowHint(false); return; }
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, [photo?.id]);

  // Drop pop animation
  useEffect(() => {
    const curId = photo?.id ?? null;
    if (curId && curId !== prevPhotoId.current && ref.current) {
      ref.current.classList.add("pb-drop-pop");
      const t = setTimeout(() => ref.current?.classList.remove("pb-drop-pop"), 300);
      prevPhotoId.current = curId;
      return () => clearTimeout(t);
    }
    prevPhotoId.current = curId;
  }, [photo?.id]);

  // interact.js — desktop only
  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;

    const interactable = interact(el)
      .dropzone({
        accept: ".draggable-photo, .draggable-slot",
        overlap: 0.3,
        ondragenter: (event) => {
          const t = event.target as HTMLElement;
          t.style.borderColor = accent;
          t.style.background = `${accent}12`;
          t.style.transform = "scale(1.02)";
        },
        ondragleave: (event) => {
          const t = event.target as HTMLElement;
          t.style.borderColor = "#c4b8a8";
          t.style.background = "#f7f4f0";
          t.style.transform = "scale(1)";
        },
        ondrop: (event) => {
          const t = event.target as HTMLElement;
          t.style.borderColor = "#c4b8a8";
          t.style.background = "#f7f4f0";
          t.style.transform = "scale(1)";

          const related = event.relatedTarget as HTMLElement | null;
          if (!related) return;

          const photoId = related.getAttribute("data-photo-id");
          if (photoId) {
            el.dispatchEvent(new CustomEvent("photoDropped", {
              bubbles: true,
              detail: { pageIdx, slotIdx, photoId: Number(photoId) },
            }));
            return;
          }

          const fromPage = related.getAttribute("data-page-idx");
          const fromSlot = related.getAttribute("data-slot-idx");
          if (fromPage !== null && fromSlot !== null) {
            el.dispatchEvent(new CustomEvent("slotSwapped", {
              bubbles: true,
              detail: { pageIdx: Number(fromPage), fromSlot: Number(fromSlot), toPageIdx: pageIdx, toSlot: slotIdx },
            }));
          }
        },
      })
      .draggable({
        enabled: !!photo,
        inertia: false,
        autoScroll: false,
        ignoreFrom: ".pb-move-btn",
        listeners: {
          start(event) {
            const t = event.target as HTMLElement;
            t.style.zIndex = "50";
            t.style.opacity = "0.7";
            t.style.boxShadow = "0 4px 16px rgba(0,0,0,0.3)";
            t.classList.add("draggable-slot");
          },
          move(event) {
            const t = event.target as HTMLElement;
            const x = (parseFloat(t.getAttribute("data-sx") || "0")) + event.dx;
            const y = (parseFloat(t.getAttribute("data-sy") || "0")) + event.dy;
            t.style.translate = `${x}px ${y}px`;
            t.setAttribute("data-sx", String(x));
            t.setAttribute("data-sy", String(y));
          },
          end(event) {
            const t = event.target as HTMLElement;
            t.style.zIndex = "";
            t.style.opacity = "";
            t.style.boxShadow = "";
            t.style.translate = "";
            t.setAttribute("data-sx", "0");
            t.setAttribute("data-sy", "0");
            t.classList.remove("draggable-slot");
          },
        },
      });

    return () => { interactable.unset(); };
  }, [isMobile, pageIdx, slotIdx, accent, photo?.id]);

  // Disable slot-swap drag while panning so they don't conflict
  useEffect(() => {
    if (isMobile || !ref.current || !photo) return;
    interact(ref.current).draggable({ enabled: !isPanning });
  }, [isPanning, isMobile, photo]);

  // Click outside the slot → exit pan mode
  useEffect(() => {
    if (!isPanning) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsPanning(false);
        panRef.current = null;
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isPanning]);

  // ── Pan helpers ──
  function enterPanMode() {
    setIsPanning(true);
    setShowHint(false);
    panHintDismissed = true;
  }

  function exitPanMode() {
    setIsPanning(false);
    panRef.current = null;
  }

  function startPan(clientX: number, clientY: number) {
    panRef.current = { startX: clientX, startY: clientY, posX: pos.x, posY: pos.y };
  }

  function movePan(clientX: number, clientY: number) {
    if (!panRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Sensitivity ~1.5× so small drags produce visible movement
    const dx = (clientX - panRef.current.startX) / rect.width * 100 * 1.5;
    const dy = (clientY - panRef.current.startY) / rect.height * 100 * 1.5;
    const newX = Math.max(0, Math.min(100, panRef.current.posX - dx));
    const newY = Math.max(0, Math.min(100, panRef.current.posY - dy));
    onUpdatePosition?.(newX, newY);
  }

  // Mobile: single tap → select, double tap → pan mode
  function handleMobileClick(e: React.MouseEvent) {
    const now = Date.now();
    if (photo && now - lastTapRef.current < 350) {
      e.stopPropagation();
      enterPanMode();
      return;
    }
    lastTapRef.current = now;
    onTap?.();
  }

  /* ── Mobile render ── */
  if (isMobile) {
    return (
      <div
        ref={ref}
        className="pb-drop-slot"
        onClick={handleMobileClick}
        style={{
          gridArea, borderRadius: 4, overflow: "hidden", position: "relative",
          border: isPanning
            ? `2px solid ${accent}`
            : isSelected
              ? "2px solid #049eff"
              : photo ? "none" : "2px dashed #c4b8a8",
          background: isSelected && !isPanning
            ? "rgba(4,158,255,0.06)"
            : photo ? "transparent" : "#f7f4f0",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: 0,
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        {photo ? (
          <>
            <img
              src={photo.preview} alt="" draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${pos.x}% ${pos.y}%`, display: "block", pointerEvents: "none" }}
            />
            {isSelected && !isPanning && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(4,158,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  background: "#049eff", borderRadius: "50%",
                  width: 32, height: 32,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 16,
                }}>↓</div>
              </div>
            )}
            {/* Pan overlay — touch events only, prevents scroll conflict */}
            {isPanning && (
              <div
                style={{
                  position: "absolute", inset: 0, zIndex: 10,
                  background: "transparent", cursor: "move", touchAction: "none",
                }}
                onTouchStart={(e) => { e.stopPropagation(); startPan(e.touches[0].clientX, e.touches[0].clientY); }}
                onTouchMove={(e) => { e.stopPropagation(); movePan(e.touches[0].clientX, e.touches[0].clientY); }}
                onTouchEnd={(e) => { e.stopPropagation(); panRef.current = null; }}
              >
                <div style={{
                  position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.65)", color: "#fff",
                  borderRadius: 20, padding: "4px 10px", fontSize: 10, fontWeight: 600,
                  whiteSpace: "nowrap", pointerEvents: "none",
                }}>Arrastrá · Toca afuera para salir</div>
              </div>
            )}
            {/* Hint */}
            {showHint && !isPanning && (
              <div style={{
                position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.55)", color: "#fff",
                borderRadius: 20, padding: "3px 8px", fontSize: 10, fontWeight: 600,
                whiteSpace: "nowrap", pointerEvents: "none",
              }}>⟲ doble tap · mover</div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); isPanning ? exitPanMode() : onRemove(slotIdx); }}
              style={{
                position: "absolute", top: 4, right: 4, zIndex: 20,
                width: 26, height: 26, borderRadius: "50%",
                border: "none",
                background: isPanning ? accent : "rgba(0,0,0,0.6)",
                color: "#fff", fontSize: isPanning ? 14 : 13, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >{isPanning ? "✓" : "×"}</button>
          </>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: isSelected ? "#049eff" : "#b0a898",
            fontSize: 12, fontWeight: 600, textAlign: "center",
            pointerEvents: "none",
          }}>
            {isSelected ? (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span>Elige foto</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>Toca aquí</span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop render ── */
  return (
    <div
      ref={ref}
      data-page-idx={pageIdx}
      data-slot-idx={slotIdx}
      className="pb-drop-slot"
      style={{
        gridArea, borderRadius: 4, overflow: "hidden", position: "relative",
        border: isPanning ? `2px solid ${accent}` : photo ? "none" : "2px dashed #c4b8a8",
        background: photo ? "transparent" : "#f7f4f0",
        transition: "border-color 0.2s, background 0.2s, transform 0.15s",
        display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0,
        cursor: photo ? (isPanning ? "move" : "grab") : "default",
        touchAction: photo ? "none" : "auto",
      }}
    >
      {photo ? (
        <>
          <img
            src={photo.preview} alt="" draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${pos.x}% ${pos.y}%`, display: "block", pointerEvents: "none" }}
          />
          {/* Pan overlay — sits on top and captures mouse events */}
          {isPanning && (
            <div
              style={{
                position: "absolute", inset: 0, zIndex: 10,
                background: "transparent", cursor: "move",
              }}
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); startPan(e.clientX, e.clientY); }}
              onMouseMove={(e) => movePan(e.clientX, e.clientY)}
              onMouseUp={() => { panRef.current = null; }}
              onMouseLeave={() => { panRef.current = null; }}
            >
              <div style={{
                position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.65)", color: "#fff",
                borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 600,
                whiteSpace: "nowrap", pointerEvents: "none",
              }}>Arrastrá para mover la foto</div>
              {/* Confirm button replaces the × while panning */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); exitPanMode(); }}
                style={{
                  position: "absolute", top: 4, right: 4, zIndex: 20,
                  width: 24, height: 24, borderRadius: "50%",
                  border: "none", background: accent, color: "#fff",
                  fontSize: 14, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >✓</button>
            </div>
          )}
          {/* Move button — visible on hover, enters pan mode */}
          {!isPanning && (
            <button
              onClick={(e) => { e.stopPropagation(); enterPanMode(); }}
              className="pb-move-btn"
              title="Mover foto"
              style={{
                position: "absolute", top: 4, left: 4,
                width: 22, height: 22, borderRadius: "50%",
                border: "none", background: "rgba(0,0,0,0.55)", color: "#fff",
                cursor: "move", display: "flex",
                alignItems: "center", justifyContent: "center",
                zIndex: 5,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M12 3v18M3 12h18" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(slotIdx); }}
            className="pb-remove-btn"
            style={{
              position: "absolute", top: 4, right: 4,
              width: 22, height: 22, borderRadius: "50%",
              border: "none", background: "rgba(0,0,0,0.55)", color: "#fff",
              fontSize: 12, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", fontFamily: "inherit",
              zIndex: isPanning ? 0 : 5,
            }}
          >x</button>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: "#b0a898", fontSize: 11, fontWeight: 500, pointerEvents: "none" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span>Arrastra aquí</span>
        </div>
      )}
    </div>
  );
}

/* ── Page renderer ── */
function PageEditor({
  page, pageIdx, layouts, accent, onRemovePhoto, onClickPage, side,
  isMobile, selectedSlotId, onSlotTap, onUpdateSlotPosition,
}: {
  page: PageData; pageIdx: number; layouts: LayoutOption[]; accent: string;
  onRemovePhoto: (pageIdx: number, slotIdx: number) => void;
  onClickPage: (pageIdx: number) => void;
  side: "left" | "right";
  isMobile?: boolean;
  selectedSlotId?: string | null;
  onSlotTap?: (pageIdx: number, slotIdx: number) => void;
  onUpdateSlotPosition: (pageIdx: number, slotIdx: number, x: number, y: number) => void;
}) {
  const grid = getGridDef(page.layoutKey);
  const slotCount = layouts.find((l) => l.key === page.layoutKey)?.slots ?? 1;
  const slots: SlotPhoto[] = [];
  for (let i = 0; i < slotCount; i++) slots.push(page.slots[i] ?? null);

  return (
    <div style={{ width: PAGE_W, height: PAGE_H, position: "relative" }}>
      <div
        className={`spread-page ${isMobile ? "left-page" : `${side}-page`}`}
        style={{ width: "100%", height: "100%", borderRadius: isMobile ? 4 : side === "left" ? "4px 0 0 4px" : "0 4px 4px 0" }}
      >
        <div style={{
          width: "100%", height: "100%", padding: PAGE_PAD,
          display: "grid", gridTemplateColumns: grid.columns, gridTemplateRows: grid.rows,
          gridTemplateAreas: grid.template, gap: SLOT_GAP,
        }}>
          {slots.map((slot, si) => {
            const isSelected = !!isMobile && selectedSlotId === `${pageIdx}-${si}`;
            return (
              <DropSlot
                key={si}
                photo={slot}
                slotIdx={si}
                pageIdx={pageIdx}
                gridArea={grid.areas[si]}
                onRemove={(s) => onRemovePhoto(pageIdx, s)}
                accent={accent}
                isMobile={isMobile}
                isSelected={isSelected}
                onTap={isMobile ? () => onSlotTap?.(pageIdx, si) : undefined}
                position={page.slotPositions?.[si]}
                onUpdatePosition={(x, y) => onUpdateSlotPosition(pageIdx, si, x, y)}
              />
            );
          })}
        </div>
        <div style={{ position: "absolute", bottom: 6, [side === "left" || isMobile ? "left" : "right"]: 12, fontSize: 11, color: "#b0a898", fontFamily: "'Playfair Display', serif" }}>
          {page.pageNumber}
        </div>
        <div style={{ position: "absolute", bottom: 6, [side === "left" || isMobile ? "right" : "left"]: 12, fontSize: 10, color: "#c4b8a8" }}>
          {slots.filter(Boolean).length}/{slotCount}
        </div>
        {/* Zoom button — desktop only */}
        {!isMobile && (
          <button
            onClick={() => onClickPage(pageIdx)}
            title="Vista ampliada"
            style={{
              position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
              width: 24, height: 24, borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255,254,249,0.85)",
              color: "#8c7e6e", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: 0.6, transition: "opacity 0.15s",
              zIndex: 3,
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "0.6"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Layout toolbar ── */
function SpreadToolbar({
  leftPage, rightPage, leftIdx, rightIdx, layouts, accent, onChangeLayout, onDeletePage, onDuplicatePage,
}: {
  leftPage: PageData; rightPage: PageData | null;
  leftIdx: number; rightIdx: number | null;
  layouts: LayoutOption[]; accent: string;
  onChangeLayout: (pageIdx: number, layoutKey: string) => void;
  onDeletePage: (pageIdx: number) => void;
  onDuplicatePage: (pageIdx: number) => void;
}) {
  const pageToolbar = (page: PageData, idx: number) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 10, color: "#999", fontWeight: 600 }}>P{page.pageNumber}:</span>
      <div style={{ display: "flex", gap: 3 }}>
        {layouts.map((l) => {
          const active = page.layoutKey === l.key;
          return (
            <button key={l.key} className="spread-layout-btn" onClick={() => onChangeLayout(idx, l.key)} style={{
              border: active ? `1.5px solid ${accent}` : "1px solid #e0dcd6",
              background: active ? `${accent}15` : "#fff",
              color: active ? accent : "#8c7e6e",
            }}>{l.label}</button>
          );
        })}
      </div>
      <button onClick={() => onDuplicatePage(idx)} title="Duplicar página" style={{
        width: 22, height: 22, borderRadius: 4, border: "1px solid #e0dcd6",
        background: "#fff", color: "#8c7e6e", fontSize: 12, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit",
      }}>⧉</button>
      <button onClick={() => onDeletePage(idx)} title="Eliminar página" style={{
        width: 22, height: 22, borderRadius: 4, border: "1px solid #e0dcd6",
        background: "#fff", color: "#dc2626", fontSize: 12, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit",
      }}>✕</button>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 8, padding: "6px 0", flexWrap: "wrap" }}>
      {pageToolbar(leftPage, leftIdx)}
      {rightPage && rightIdx !== null && pageToolbar(rightPage, rightIdx)}
    </div>
  );
}

/* ── Main component ── */
export default function PhotobookSpreadEditor({
  pages, accent, layouts,
  onChangeLayout, onAssignPhoto, onRemovePhoto,
  onDeletePage, onDuplicatePage, onReorderPages, onClickPage, onSwapSlots,
  onUpdateSlotPosition,
  coverUrl, backCoverUrl,
  isMobile, mobilePageIdx, selectedSlotId, onSlotTap,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const [currentSpread, setCurrentSpread] = useState(0);
  const totalSpreads = Math.ceil(pages.length / 2);

  // Mobile canvas scale
  const [mobileScale, setMobileScale] = useState(1);
  useEffect(() => {
    if (!isMobile) return;
    const update = () => {
      const el = mobileContainerRef.current;
      if (el) setMobileScale(el.clientWidth / PAGE_W);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isMobile]);

  // Listen for drop events
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const { pageIdx, slotIdx, photoId } = (e as CustomEvent).detail;
      onAssignPhoto(pageIdx, slotIdx, photoId);
    };
    el.addEventListener("photoDropped", handler);
    return () => el.removeEventListener("photoDropped", handler);
  }, [onAssignPhoto]);

  // Listen for slot swap events
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const { pageIdx, fromSlot, toPageIdx, toSlot } = (e as CustomEvent).detail;
      if (pageIdx === toPageIdx) onSwapSlots(pageIdx, fromSlot, toSlot);
    };
    el.addEventListener("slotSwapped", handler);
    return () => el.removeEventListener("slotSwapped", handler);
  }, [onSwapSlots]);

  // Track scroll for mini-map
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const cardWidth = PAGE_W * 2 + 20 + 40;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setCurrentSpread(Math.max(0, Math.min(idx, totalSpreads - 1)));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [totalSpreads]);

  function goToSpread(idx: number) {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = PAGE_W * 2 + 20 + 40;
    el.scrollTo({ left: (idx + 1) * cardWidth, behavior: "smooth" });
    setCurrentSpread(idx);
  }

  // Spread reorder — desktop only
  useEffect(() => {
    if (isMobile) return;
    const interactable = interact(".reorderable-spread").draggable({
      inertia: false,
      autoScroll: { container: scrollRef.current!, speed: 300 },
      ignoreFrom: ".pb-drop-slot",
      listeners: {
        start(event) {
          const t = event.target as HTMLElement;
          t.style.opacity = "0.5";
          t.style.zIndex = "100";
        },
        move(event) {
          const t = event.target as HTMLElement;
          const x = (parseFloat(t.getAttribute("data-rx") || "0")) + event.dx;
          t.style.translate = `${x}px 0`;
          t.setAttribute("data-rx", String(x));
        },
        end(event) {
          const t = event.target as HTMLElement;
          t.style.opacity = "";
          t.style.zIndex = "";
          t.style.translate = "";
          t.setAttribute("data-rx", "0");
          const fromSpread = Number(t.getAttribute("data-spread-idx"));
          const rect = t.getBoundingClientRect();
          const allCards = containerRef.current?.querySelectorAll(".reorderable-spread");
          if (!allCards) return;
          let toSpread = fromSpread;
          allCards.forEach((card, i) => {
            if (i === fromSpread) return;
            const cr = card.getBoundingClientRect();
            if (rect.left > cr.left && rect.left < cr.right) toSpread = i;
          });
          if (fromSpread !== toSpread) {
            const fromPageIdx = fromSpread * 2;
            const toPageIdx = toSpread * 2;
            onReorderPages(fromPageIdx, toPageIdx);
            if (fromSpread * 2 + 1 < pages.length) {
              onReorderPages(
                fromPageIdx < toPageIdx ? fromPageIdx : fromPageIdx + 1,
                fromPageIdx < toPageIdx ? toPageIdx + 1 : toPageIdx + 1,
              );
            }
          }
        },
      },
    });
    return () => interactable.unset();
  }, [isMobile, pages.length, onReorderPages]);

  const sharedStyles = `
    @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900&display=swap');
    .spread-page {
      background-color: #FFFEF9;
      background-image: linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 3%, transparent 97%, rgba(0,0,0,0.02) 100%);
      position: relative;
    }
    .spread-page.left-page {
      background-image: linear-gradient(-90deg, rgba(220,215,205,0.5) 0%, transparent 8%), linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 3%, transparent 97%, rgba(0,0,0,0.02) 100%);
    }
    .spread-page.right-page {
      background-image: linear-gradient(90deg, rgba(220,215,205,0.5) 0%, transparent 8%), linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 3%, transparent 97%, rgba(0,0,0,0.02) 100%);
    }
    .spread-layout-btn { padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.15s; }
    .pb-drop-slot { transition: border-color 0.2s, background 0.2s, transform 0.15s; }
    .pb-remove-btn { opacity: 0; transition: opacity 0.15s; }
    .pb-drop-slot:hover .pb-remove-btn { opacity: 1; }
    .pb-move-btn { opacity: 0; transition: opacity 0.15s; }
    .pb-drop-slot:hover .pb-move-btn { opacity: 1; }
    @keyframes dropPop { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
    .pb-drop-pop { animation: dropPop 0.25s ease-out; }
    .spread-dot { width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.15s; padding: 0; }
  `;

  /* ══════════════════════════════════
     MOBILE RENDER — single scaled page
     ══════════════════════════════════ */
  if (isMobile && mobilePageIdx !== undefined) {
    const pageData = pages[mobilePageIdx];
    if (!pageData) return <div ref={mobileContainerRef} style={{ width: "100%" }} />;

    const scaledWidth = PAGE_W * mobileScale;
    const scaledHeight = PAGE_H * mobileScale;

    return (
      <div
        ref={mobileContainerRef}
        style={{ userSelect: "none", WebkitUserSelect: "none", width: "100%" }}
      >
        <style>{sharedStyles}</style>
        {/* Scaled page canvas */}
        <div style={{
          width: scaledWidth,
          height: scaledHeight,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          borderRadius: 8,
        }}>
          <div style={{
            width: PAGE_W,
            height: PAGE_H,
            transform: `scale(${mobileScale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}>
            <PageEditor
              page={pageData}
              pageIdx={mobilePageIdx}
              layouts={layouts}
              accent={accent}
              onRemovePhoto={onRemovePhoto}
              onClickPage={onClickPage}
              side="left"
              isMobile={true}
              selectedSlotId={selectedSlotId}
              onSlotTap={onSlotTap}
              onUpdateSlotPosition={onUpdateSlotPosition}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════
     DESKTOP RENDER — horizontal scroll
     ══════════════════════════════════ */
  type Spread = { left: { page: PageData; idx: number }; right: { page: PageData; idx: number } | null };
  const spreads: Spread[] = [];
  for (let i = 0; i < pages.length; i += 2) {
    spreads.push({
      left: { page: pages[i], idx: i },
      right: i + 1 < pages.length ? { page: pages[i + 1], idx: i + 1 } : null,
    });
  }

  return (
    <div ref={containerRef} style={{ userSelect: "none", WebkitUserSelect: "none" }}>
      <style>{`
        ${sharedStyles}
        .spread-editor-scroll {
          overflow-x: auto; overflow-y: visible;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 32px 0 24px;
          scrollbar-width: thin; scrollbar-color: #d4c9b8 transparent;
        }
        .spread-editor-scroll::-webkit-scrollbar { height: 6px; }
        .spread-editor-scroll::-webkit-scrollbar-track { background: transparent; }
        .spread-editor-scroll::-webkit-scrollbar-thumb { background: #d4c9b8; border-radius: 3px; }
        .spread-card { scroll-snap-align: center; flex-shrink: 0; }
      `}</style>

      <div ref={scrollRef} className="spread-editor-scroll">
        <div style={{ display: "flex", gap: 40, padding: "0 48px", width: "fit-content" }}>

          {/* Front cover */}
          <div className="spread-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Portada</div>
            {coverUrl ? (
              <div style={{ width: PAGE_W, height: PAGE_H, borderRadius: "4px 6px 6px 4px", overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,0.3)" }}>
                <img src={coverUrl} alt="Portada" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ) : (
              <div style={{
                width: PAGE_W, height: PAGE_H,
                background: "linear-gradient(135deg, #a0522d 0%, #8B4513 40%, #6b3410 100%)",
                borderRadius: "4px 6px 6px 4px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                color: "#f5e6c8", padding: 40, textAlign: "center",
                boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
              }}>
                <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, opacity: 0.7 }}>PIXELART</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>Mi Photobook</div>
                <div style={{ width: 36, height: 2, background: "#d4a574", margin: "10px auto", borderRadius: 1 }} />
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>{pages.length} páginas</div>
              </div>
            )}
          </div>

          {/* Spreads */}
          {spreads.map((spread, si) => (
            <div key={si} className="spread-card reorderable-spread" data-spread-idx={si} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#999" }}>
                {spread.right ? `Pág. ${spread.left.page.pageNumber} – ${spread.right.page.pageNumber}` : `Pág. ${spread.left.page.pageNumber}`}
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -10, borderRadius: 6, background: "#8B4513", boxShadow: "0 6px 30px rgba(0,0,0,0.3)", zIndex: 0 }} />
                <div style={{ position: "absolute", top: -10, bottom: -10, left: "50%", transform: "translateX(-50%)", width: 24, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.35) 49%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.35) 51%, rgba(0,0,0,0.12) 70%, transparent 100%)" }} />
                <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
                  <PageEditor page={spread.left.page} pageIdx={spread.left.idx} layouts={layouts} accent={accent} onRemovePhoto={onRemovePhoto} onClickPage={onClickPage} side="left" onUpdateSlotPosition={onUpdateSlotPosition} />
                  {spread.right ? (
                    <PageEditor page={spread.right.page} pageIdx={spread.right.idx} layouts={layouts} accent={accent} onRemovePhoto={onRemovePhoto} onClickPage={onClickPage} side="right" onUpdateSlotPosition={onUpdateSlotPosition} />
                  ) : (
                    <div style={{ width: PAGE_W, height: PAGE_H, background: "#FFFEF9", borderRadius: "0 4px 4px 0", display: "flex", alignItems: "center", justifyContent: "center", color: "#d4c9b8", fontSize: 13 }}>
                      Página vacía
                    </div>
                  )}
                </div>
              </div>
              <SpreadToolbar
                leftPage={spread.left.page} rightPage={spread.right?.page ?? null}
                leftIdx={spread.left.idx} rightIdx={spread.right?.idx ?? null}
                layouts={layouts} accent={accent}
                onChangeLayout={onChangeLayout}
                onDeletePage={onDeletePage}
                onDuplicatePage={onDuplicatePage}
              />
            </div>
          ))}

          {/* Back cover */}
          <div className="spread-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Contraportada</div>
            {backCoverUrl ? (
              <div style={{ width: PAGE_W, height: PAGE_H, borderRadius: "6px 4px 4px 6px", overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,0.3)" }}>
                <img src={backCoverUrl} alt="Contraportada" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ) : (
              <div style={{
                width: PAGE_W, height: PAGE_H,
                background: "linear-gradient(225deg, #a0522d 0%, #8B4513 40%, #6b3410 100%)",
                borderRadius: "6px 4px 4px 6px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#d4a574", fontSize: 13, letterSpacing: 2, textTransform: "uppercase",
                boxShadow: "0 6px 30px rgba(0,0,0,0.3)",
              }}>
                PIXELART
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mini-map navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6 }}>
        <button
          onClick={() => currentSpread > 0 && goToSpread(currentSpread - 1)}
          disabled={currentSpread <= 0}
          style={{ border: "none", background: "none", cursor: currentSpread > 0 ? "pointer" : "default", color: currentSpread > 0 ? "#8c7e6e" : "#ddd", fontSize: 16, fontFamily: "inherit", padding: "2px 6px" }}
        >‹</button>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {spreads.map((_, i) => (
            <button
              key={i}
              className="spread-dot"
              onClick={() => goToSpread(i)}
              style={{ background: i === currentSpread ? accent : "#d4c9b8" }}
            />
          ))}
        </div>
        <button
          onClick={() => currentSpread < totalSpreads - 1 && goToSpread(currentSpread + 1)}
          disabled={currentSpread >= totalSpreads - 1}
          style={{ border: "none", background: "none", cursor: currentSpread < totalSpreads - 1 ? "pointer" : "default", color: currentSpread < totalSpreads - 1 ? "#8c7e6e" : "#ddd", fontSize: 16, fontFamily: "inherit", padding: "2px 6px" }}
        >›</button>
        <span style={{ fontSize: 11, color: "#999", marginLeft: 4 }}>
          Spread {currentSpread + 1} de {totalSpreads}
        </span>
      </div>
    </div>
  );
}
