"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";
import { CheckCircle2 } from "lucide-react";
import { useWindowSize } from "@/hooks/useWindowSize";

type Template = { id: number; name: string | null; previewUrl: string };

type Props = {
  templates: Template[];
  selectedIds: number[];
  maxSelections: number;
  accent: string;
  onToggle: (id: number) => void;
};

const PAGE_W = 360;
const PAGE_H = 360;

export default function TemplateBook({ templates, selectedIds, maxSelections, accent, onToggle }: Props) {
  const { isMobile, isTablet } = useWindowSize();
  const bookRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<PageFlip | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [ready, setReady] = useState(false);

  const isCompact = isMobile || isTablet;

  /* Mobile/tablet: show a simple responsive grid instead of page-flip */
  if (isMobile) {
    return (
      <MobileGrid
        templates={templates}
        selectedIds={selectedIds}
        maxSelections={maxSelections}
        accent={accent}
        onToggle={onToggle}
        columns={2}
      />
    );
  }

  if (isTablet) {
    return (
      <MobileGrid
        templates={templates}
        selectedIds={selectedIds}
        maxSelections={maxSelections}
        accent={accent}
        onToggle={onToggle}
        columns={3}
      />
    );
  }

  /* Desktop: page-flip book */
  return (
    <DesktopBook
      templates={templates}
      selectedIds={selectedIds}
      maxSelections={maxSelections}
      accent={accent}
      onToggle={onToggle}
    />
  );
}

/* ── Desktop page-flip book ── */
function DesktopBook({ templates, selectedIds, maxSelections, accent, onToggle }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<PageFlip | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (prevCountRef.current === 0 && selectedIds.length === 1) {
      setShowHint(true);
      const t = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(t);
    }
    prevCountRef.current = selectedIds.length;
  }, [selectedIds.length]);

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
      width: PAGE_W, height: PAGE_H,
      size: "stretch",
      minWidth: 260, minHeight: 260,
      maxWidth: 500, maxHeight: 500,
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
    pf.on("flip", (e) => { setCurrentSpread(Math.floor((e.data as number) / 2)); });
  }, [templates.length]);

  useEffect(() => {
    const t = setTimeout(init, 150);
    return () => {
      clearTimeout(t);
      if (pfRef.current) { pfRef.current.destroy(); pfRef.current = null; }
      setReady(false);
    };
  }, [init]);

  const current = templates[currentSpread];
  const isSelected = current ? selectedIds.includes(current.id) : false;
  const isDisabled = current ? (!isSelected && selectedIds.length >= maxSelections) : false;

  return (
    <div>
      {/* Book + arrows */}
      <div style={{ position: "relative", maxWidth: `${PAGE_W * 2 + 80}px`, margin: "0 auto", padding: "0 44px" }}>
        <NavArrow direction="left" onClick={() => pfRef.current?.flipPrev()} disabled={currentSpread <= 0} />
        <NavArrow direction="right" onClick={() => pfRef.current?.flipNext()} disabled={currentSpread >= templates.length - 1} />

        <div style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.18)", borderRadius: "4px" }}>
          <div ref={bookRef} style={{ width: "100%", minHeight: `${PAGE_H}px` }}>
            {pageData.map((p) => {
              const { tpl, idx, side } = p;
              const sel = selectedIds.includes(tpl.id);
              const selIdx = selectedIds.indexOf(tpl.id);
              const dis = !sel && selectedIds.length >= maxSelections;
              return (
                <div key={`${tpl.id}-${side}`} className="pf-page" data-density="soft" style={{ backgroundColor: "#F5F5F5" }}>
                  <div style={{
                    width: "100%", height: "100%", position: "relative", overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                    backgroundImage: side === "left"
                      ? "linear-gradient(-90deg, rgba(220,220,220,0.6) 0%, rgba(247,247,247,0) 12%)"
                      : "linear-gradient(90deg, rgba(220,220,220,0.6) 0%, rgba(247,247,247,0) 12%)",
                  }}>
                    <img src={tpl.previewUrl} alt={tpl.name ?? `Escenario ${idx + 1}`} draggable={false}
                      style={{ position: "absolute", top: 0, left: side === "left" ? 0 : "-100%", width: "200%", height: "100%", objectFit: "cover", opacity: dis ? 0.35 : 1, pointerEvents: "none" }} />

                    {side === "right" && sel && (
                      <div style={{
                        position: "absolute", top: "10px", right: "10px",
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: accent, color: "#fff", fontSize: "13px", fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)", border: "2px solid #fff", zIndex: 5,
                      }}>
                        {selIdx + 1}
                      </div>
                    )}

                    {side === "left" && (
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 12px 10px", background: "linear-gradient(transparent, rgba(0,0,0,0.55))" }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.6)", lineHeight: 1.3 }}>{tpl.name ?? `Escenario ${idx + 1}`}</div>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{idx + 1} / {templates.length}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selection bar — separated with clear spacing */}
      {ready && current && (
        <div style={{ marginTop: "28px" }}>
          {/* Hint */}
          <div style={{ textAlign: "center", fontSize: "11px", color: "#b0b7c3", marginBottom: "14px", letterSpacing: "0.3px" }}>
            Arrastra las esquinas o usa las flechas para hojear
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: "16px",
            background: isSelected ? `${accent}08` : "#f9fafb",
            border: `1.5px solid ${isSelected ? accent + "35" : "#e5e7eb"}`,
            borderRadius: "16px", padding: "14px 18px",
            transition: "all 0.25s ease",
            boxShadow: isSelected ? `0 4px 20px ${accent}18` : "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            {/* Thumbnail */}
            <div style={{
              flexShrink: 0, width: "52px", height: "52px", borderRadius: "10px", overflow: "hidden",
              border: `2px solid ${isSelected ? accent + "50" : "#e5e7eb"}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>
              <img src={current.previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#111", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {current.name ?? `Escenario ${currentSpread + 1}`}
              </div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>
                Escenario {currentSpread + 1} de {templates.length}
              </div>
            </div>

            {/* Selected slots — clickable to deselect */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              {/* First-time hint tooltip */}
              <div style={{
                position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
                transform: `translateX(-50%) translateY(${showHint ? "0px" : "-6px"})`,
                opacity: showHint ? 1 : 0,
                transition: "opacity 0.35s ease, transform 0.35s ease",
                pointerEvents: "none", whiteSpace: "nowrap",
                background: "#111", color: "#fff",
                fontSize: "12px", fontWeight: 600,
                padding: "7px 12px", borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.18)", zIndex: 10,
              }}>
                Haz clic en una miniatura para quitarla
                <div style={{
                  position: "absolute", top: "100%", left: "50%",
                  transform: "translateX(-50%)",
                  width: 0, height: 0,
                  borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
                  borderTop: "6px solid #111",
                }} />
              </div>
              {/* Slots grid */}
              {(() => {
                const sz = maxSelections <= 3 ? 44 : maxSelections <= 7 ? 36 : 26;
                const gap = maxSelections <= 3 ? 6 : maxSelections <= 7 ? 5 : 3;
                const br = maxSelections <= 3 ? 10 : 7;
                const badgeSz = maxSelections <= 7 ? 16 : 12;
                const badgeFt = maxSelections <= 7 ? 9 : 7;
                const cols = maxSelections > 7 ? Math.ceil(maxSelections / 2) : maxSelections;
                return (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, ${sz}px)`,
                    gap: `${gap}px`,
                  }}>
                    {Array.from({ length: maxSelections }, (_, slotIdx) => {
                      const selectedId = selectedIds[slotIdx];
                      const slotTpl = selectedId !== undefined ? templates.find((t) => t.id === selectedId) : undefined;
                      if (slotTpl) {
                        return (
                          <button
                            key={slotIdx}
                            onClick={() => onToggle(slotTpl.id)}
                            title={`Quitar "${slotTpl.name}"`}
                            style={{
                              position: "relative", width: `${sz}px`, height: `${sz}px`,
                              borderRadius: `${br}px`, overflow: "hidden",
                              border: `2px solid ${accent}`,
                              cursor: "pointer", padding: 0, background: "none",
                              boxShadow: `0 2px 8px ${accent}30`,
                              transition: "transform 0.15s ease",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                          >
                            <img src={slotTpl.previewUrl} alt={slotTpl.name ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            <div style={{
                              position: "absolute", inset: 0,
                              background: "rgba(0,0,0,0.45)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              opacity: 0, transition: "opacity 0.15s ease",
                            }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </div>
                            <div style={{
                              position: "absolute", top: "2px", left: "2px",
                              width: `${badgeSz}px`, height: `${badgeSz}px`, borderRadius: "50%",
                              background: accent, color: "#fff",
                              fontSize: `${badgeFt}px`, fontWeight: 700,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              border: "1.5px solid #fff",
                            }}>
                              {slotIdx + 1}
                            </div>
                          </button>
                        );
                      }
                      return (
                        <div key={slotIdx} style={{
                          width: `${sz}px`, height: `${sz}px`, borderRadius: `${br}px`,
                          border: "2px dashed #e5e7eb", background: "#f9fafb",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <span style={{ fontSize: `${badgeFt + 2}px`, fontWeight: 700, color: "#d1d5db" }}>{slotIdx + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Button */}
            <button
              onClick={() => { if (!isDisabled) onToggle(current.id); }}
              disabled={isDisabled}
              style={{
                flexShrink: 0, padding: "10px 22px", borderRadius: "12px",
                border: "none",
                background: isSelected ? accent : isDisabled ? "#f3f4f6" : "#111",
                color: isDisabled ? "#ccc" : "#fff",
                fontSize: "13px", fontWeight: 700,
                cursor: isDisabled ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: "6px",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? `0 4px 16px ${accent}40` : isDisabled ? "none" : "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {isSelected ? <><CheckCircle2 size={14} /> Seleccionado</> : "Seleccionar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Mobile / Tablet grid ── */
function MobileGrid({ templates, selectedIds, maxSelections, accent, onToggle, columns }: Props & { columns: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px", marginBottom: "8px" }}>
      {templates.map((tpl, idx) => {
        const isSelected = selectedIds.includes(tpl.id);
        const selIdx = selectedIds.indexOf(tpl.id);
        const isDisabled = !isSelected && selectedIds.length >= maxSelections;
        return (
          <div
            key={tpl.id}
            onClick={() => !isDisabled && onToggle(tpl.id)}
            style={{
              position: "relative", borderRadius: "14px", overflow: "hidden",
              aspectRatio: "3/2",
              border: isSelected ? `2.5px solid ${accent}` : "2px solid transparent",
              opacity: isDisabled ? 0.4 : 1,
              cursor: isDisabled ? "not-allowed" : "pointer",
              boxShadow: isSelected
                ? `0 0 0 3px ${accent}30, 0 4px 16px rgba(0,0,0,0.12)`
                : "0 2px 10px rgba(0,0,0,0.08)",
              transition: "all 0.2s ease",
            }}
          >
            <img src={tpl.previewUrl} alt={tpl.name ?? `Escenario ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

            {/* Selected badge */}
            {isSelected && (
              <div style={{
                position: "absolute", top: "8px", right: "8px",
                width: "26px", height: "26px", borderRadius: "50%",
                background: accent, color: "#fff", fontSize: "12px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              }}>
                {selIdx + 1}
              </div>
            )}

            {/* Overlay gradient + name */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "20px 10px 8px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
            }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                {tpl.name ?? `Escenario ${idx + 1}`}
              </div>
            </div>

            {/* Selected overlay */}
            {isSelected && (
              <div style={{
                position: "absolute", inset: 0,
                background: `${accent}15`,
                pointerEvents: "none",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Shared nav arrow ── */
function NavArrow({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Anterior" : "Siguiente"}
      style={{
        position: "absolute",
        [direction]: 0,
        top: "50%", transform: "translateY(-50%)", zIndex: 20,
        width: "44px", height: "44px", borderRadius: "50%",
        border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151",
        cursor: disabled ? "default" : "pointer", fontFamily: "inherit",
        boxShadow: disabled ? "none" : "0 4px 16px rgba(0,0,0,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.25 : 1,
        transition: "all 0.2s ease",
      }}
    >
      {direction === "left"
        ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
      }
    </button>
  );
}
