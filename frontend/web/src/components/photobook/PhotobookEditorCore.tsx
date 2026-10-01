"use client";

import React from "react";
import PhotobookPreview from "@/components/PhotobookPreview";
import PhotobookSpreadEditor from "@/components/PhotobookSpreadEditor";

type Props = Record<string, any>;

/**
 * Shared, controlled rendering core for the first three photobook steps.
 * State and persistence belong to the calling flow, so catalog and custom
 * photobooks can use distinct save mechanisms without duplicating the wizard.
 */
export default function PhotobookEditorCore(ctx: Props) {
  const { ACCENT, hasDraft, restoreDraft, discardDraft, isMobile, step, setStep, pages, coverType, hojas,
    MIN_HOJAS, MIN_CARAS, MAX_PHOTOS, photoLimitReached, handleUploadFiles, pendingDuplicates,
    resolveDuplicate, uploading, progress, photos, removePhoto, handleSidebarDragOver,
    handleSidebarDragLeave, handleSidebarDrop, sidebarDragOver, showOnlyAvailable,
    setShowOnlyAvailable, visiblePhotos, placedPhotoIds, totalPages, totalCents, fmtPrice,
    openAutoDistribute, addPage, dupAlert, LAYOUTS, changeLayout, assignPhotoById,
    handleRemoveFromPage, handleDeletePage, handleDuplicatePage, handleReorderPages,
    setZoomPageIdx, handleSwapSlots, updateSlotPosition, coverUrl, backCoverUrl, mobilePageIdx,
    setMobilePageIdx, selectedSlotId, handleMobileSlotTap, LOW_RES_THRESHOLD, handleMobilePhotoTap,
    temaNombre } = ctx;

  return <>
{/* Step 1 */}
{step === 1 && (
  <div>
    <h2 style={{ margin: "0 0 8px", fontSize: isMobile ? "20px" : "24px", fontWeight: 800 }}>Sube tus fotos</h2>
    {pages.length > 0 && (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${ACCENT}12`, border: `1px solid ${ACCENT}30`, borderRadius: 8, padding: "6px 12px", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: ACCENT }}>{coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada"}</span>
        <span style={{ color: "#ccc" }}>·</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>{hojas} hoja{hojas !== 1 ? "s" : ""} ({pages.length} caras)</span>
      </div>
    )}
    <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#666" }}>Mínimo {MIN_CARAS} fotos · Máximo {MAX_PHOTOS} fotos. Sube más de las que necesitas para tener opciones.</p>

    {photoLimitReached && (
      <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 13, fontWeight: 600, color: "#92400e" }}>
        Límite alcanzado — ya subiste el máximo de {MAX_PHOTOS} fotos. Elimina alguna si necesitas reemplazarla.
      </div>
    )}
    <div
      onClick={() => { if (photoLimitReached) return; const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.style.display = "none"; document.body.appendChild(input); input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) handleUploadFiles(Array.from(files)); document.body.removeChild(input); }; input.click(); }}
      style={{ width: "100%", minHeight: isMobile ? "80px" : "120px", borderRadius: "16px", border: `2px dashed ${photoLimitReached ? "#e5e7eb" : "#d0d0d0"}`, background: photoLimitReached ? "#f3f4f6" : "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px", cursor: photoLimitReached ? "not-allowed" : "pointer", marginBottom: "16px", opacity: photoLimitReached ? 0.6 : 1 }}
    >
      {photoLimitReached ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      ) : (
        <div style={{ fontSize: "24px" }}>+</div>
      )}
      <div style={{ fontSize: "14px", fontWeight: 600, color: photoLimitReached ? "#9ca3af" : "#555" }}>{photoLimitReached ? `Máximo ${MAX_PHOTOS} fotos alcanzado` : (isMobile ? "Subir fotos" : "Agregar Fotos")}</div>
      {!isMobile && !photoLimitReached && <div style={{ fontSize: "12px", color: "#999" }}>o arrastra aquí</div>}
    </div>

    {/* Avisos de fotos duplicadas */}
    {pendingDuplicates.length > 0 && (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
        {pendingDuplicates.map((d) => (
          <div key={d.photo.uid} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "12px", background: "#fffbeb", border: "1px solid #fcd34d" }}>
            <img src={d.photo.preview} alt="" style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#92400e", marginBottom: "2px" }}>
                Ya subiste esta foto
              </div>
              <div style={{ fontSize: "12px", color: "#b45309", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.existingFilename}</div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              <button onClick={() => resolveDuplicate(d.photo.uid, "add")} style={{ padding: "5px 12px", borderRadius: "8px", border: "none", background: ACCENT, color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Agregar igual
              </button>
              <button onClick={() => resolveDuplicate(d.photo.uid, "skip")} style={{ padding: "5px 10px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Ignorar
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {uploading && (
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "13px", color: "#999", marginBottom: 4 }}>Subiendo... {progress}%</div>
        <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
      </div>
    )}
    {photos.length > 0 && (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: "8px", marginBottom: "16px" }}>
        {photos.map((p) => (
          <div key={p.uid} style={{ position: "relative", aspectRatio: "1", borderRadius: "8px", overflow: "hidden" }}>
            <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button onClick={() => removePhoto(p.uid)} style={{ position: "absolute", top: "3px", right: "3px", width: isMobile ? "24px" : "20px", height: isMobile ? "24px" : "20px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
        ))}
      </div>
    )}
    <div style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>{photos.length} fotos subidas</div>
  </div>
)}

{/* Step 2: Editor — Desktop */}
{step === 2 && !isMobile && (
  <div style={{ display: "flex", gap: 0, alignItems: "flex-start", userSelect: "none", WebkitUserSelect: "none" }}>
    {/* ── Left sidebar ── */}
    <div
      onDragOver={handleSidebarDragOver}
      onDragLeave={handleSidebarDragLeave}
      onDrop={handleSidebarDrop}
      style={{
        width: 280, flexShrink: 0,
        background: "#fff", borderRadius: "14px",
        border: sidebarDragOver ? `2px solid ${ACCENT}` : "1px solid #eee",
        display: "flex", flexDirection: "column",
        marginRight: 16,
        transition: "border-color 0.2s",
      }}
    >
      <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#111", marginBottom: 10 }}>Mis Fotos</div>
        {photoLimitReached && (
          <div style={{ margin: "0 0 8px", padding: "7px 10px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 11, fontWeight: 600, color: "#92400e" }}>
            Límite de {MAX_PHOTOS} fotos alcanzado
          </div>
        )}
        <div
          onClick={() => { if (photoLimitReached) return; const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.style.display = "none"; document.body.appendChild(input); input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) handleUploadFiles(Array.from(files)); document.body.removeChild(input); }; input.click(); }}
          style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: photoLimitReached ? "2px dashed #e5e7eb" : `2px dashed ${ACCENT}40`, background: photoLimitReached ? "#f3f4f6" : (sidebarDragOver ? `${ACCENT}15` : `${ACCENT}08`), display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: photoLimitReached ? "not-allowed" : "pointer", transition: "background 0.15s", opacity: photoLimitReached ? 0.6 : 1 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={photoLimitReached ? "#9ca3af" : ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: photoLimitReached ? "#9ca3af" : ACCENT }}>{photoLimitReached ? "Límite alcanzado" : (sidebarDragOver ? "Suelta aquí" : "Subir fotos")}</span>
          {!photoLimitReached && <span style={{ fontSize: 10, color: "#999" }}>PC, celular o tablet</span>}
        </div>
        {uploading && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Subiendo... {progress}%</div>
            <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
            </div>
          </div>
        )}
        {pendingDuplicates.length > 0 && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {pendingDuplicates.map((d) => (
              <div key={d.photo.uid} style={{ padding: "8px 10px", borderRadius: 10, background: "#fffbeb", border: "1px solid #fcd34d" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <img src={d.photo.preview} alt="" style={{ width: 32, height: 32, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e" }}>Ya subiste esta foto</div>
                    <div style={{ fontSize: 10, color: "#b45309", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.existingFilename}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button onClick={() => resolveDuplicate(d.photo.uid, "add")} style={{ flex: 1, padding: "4px 0", borderRadius: 7, border: "none", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Agregar igual
                  </button>
                  <button onClick={() => resolveDuplicate(d.photo.uid, "skip")} style={{ flex: 1, padding: "4px 0", borderRadius: 7, border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    Ignorar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: 12 }}>
        {photos.length > 0 ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Fotos ({visiblePhotos.length})</div>
              <button onClick={() => setShowOnlyAvailable((v) => !v)} style={{ fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: "2px 8px", borderRadius: 4, border: showOnlyAvailable ? `1px solid ${ACCENT}` : "1px solid #ddd", background: showOnlyAvailable ? `${ACCENT}15` : "#fff", color: showOnlyAvailable ? ACCENT : "#999" }}>
                {showOnlyAvailable ? "Todas" : "Disponibles"}
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {visiblePhotos.map((p) => {
                const isPlaced = placedPhotoIds.has(p.id);
                const isLowRes = (p.width && p.width < LOW_RES_THRESHOLD) || (p.height && p.height < LOW_RES_THRESHOLD);
                return (
                  <div key={p.uid} className="draggable-photo" data-photo-id={p.id} title={`${p.originalFilename}${p.width && p.height ? ` — ${p.width}×${p.height}` : ""}`} style={{ position: "relative", aspectRatio: "1", borderRadius: 6, overflow: "hidden", cursor: "grab", touchAction: "none", border: isPlaced ? `2px solid ${ACCENT}` : "2px solid transparent", opacity: isPlaced ? 0.7 : 1 }}>
                    <img src={p.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
                    {isPlaced && <div style={{ position: "absolute", top: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>✓</div>}
                    {isLowRes && <div title="Resolución baja — esta foto puede verse borrosa en impresión. Se recomienda un mínimo de 2000×2000px." style={{ position: "absolute", top: isPlaced ? "auto" : 3, bottom: isPlaced ? 3 : "auto", left: 3, zIndex: 2, width: 18, height: 18, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)", cursor: "help" }}>!</div>}
                    <button onClick={(e) => { e.stopPropagation(); handleDeletePhoto(p.uid); }} style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 8px", color: "#bbb", fontSize: 13 }}>Sube fotos para comenzar</div>
        )}
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 11, color: "#999", textAlign: "center" }}>{placedPhotoIds.size} de {photos.length} colocadas</div>
        {totalPages > 0 && (
          <div style={{ textAlign: "center", marginBottom: 2 }}>
            <div style={{ fontSize: 11, color: "#999" }}>{hojas} hoja{hojas !== 1 ? "s" : ""} · {coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada"}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: totalCents > 0 ? ACCENT : "#f59e0b" }}>
              {totalCents > 0 ? fmtPrice(totalCents) : `Mín ${MIN_HOJAS} hojas`}
            </div>
          </div>
        )}
        <button onClick={openAutoDistribute} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "none", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-distribuir</button>
        <button onClick={addPage} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Agregar página</button>
      </div>
    </div>

    {/* ── Right: spread editor ── */}
    <div style={{ flex: 1, minWidth: 0, position: "sticky", top: 16, maxHeight: "calc(100vh - 32px)", overflowY: "auto" }}>
      {dupAlert && (
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 50, padding: "8px 20px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 12, fontWeight: 600, color: "#92400e", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          {dupAlert}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "0 8px" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111" }}>Editor de Páginas</h2>
        <span style={{ fontSize: 13, color: "#999" }}>{pages.length} páginas</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", marginBottom: 12, marginLeft: 8, background: `${ACCENT}0d`, border: `1px solid ${ACCENT}30`, borderRadius: 10, fontSize: 12, color: "#555" }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
        <span>Presione el <strong style={{ color: ACCENT }}>ícono de movimiento</strong> sobre una foto para ajustar el encuadre, ubicado en la parte superior izquierda de cada foto. Además puedes enfocar personas o espacios determinados al usar los botones <strong style={{ color: ACCENT }}>−/+</strong> o la rueda del mouse para hacer zoom.</span>
      </div>
      {pages.length > 0 ? (
        <PhotobookSpreadEditor pages={pages} accent={ACCENT} layouts={LAYOUTS} onChangeLayout={changeLayout} onAssignPhoto={assignPhotoById} onRemovePhoto={handleRemoveFromPage} onDeletePage={handleDeletePage} onDuplicatePage={handleDuplicatePage} onReorderPages={handleReorderPages} onClickPage={(idx) => setZoomPageIdx(idx)} onSwapSlots={handleSwapSlots} onUpdateSlotPosition={updateSlotPosition} coverUrl={coverUrl} backCoverUrl={backCoverUrl} />
      ) : (
        <div style={{ textAlign: "center", padding: "80px 24px", color: "#999", background: "#fff", borderRadius: 14, border: "1px solid #eee" }}>
          <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>+</div>
          <div style={{ fontSize: 14 }}>Sube fotos y presiona &quot;Auto-distribuir&quot;</div>
        </div>
      )}
    </div>
  </div>
)}

{/* Step 2: Editor — Mobile */}
{step === 2 && isMobile && (
  <div style={{ display: "flex", flexDirection: "column", userSelect: "none", WebkitUserSelect: "none" }}>

    {dupAlert && (
      <div style={{ margin: "10px 16px 0", padding: "10px 14px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 13, fontWeight: 600, color: "#92400e" }}>
        {dupAlert}
      </div>
    )}

    {/* ── Canvas full-bleed ── */}
    <div style={{ background: "#ede8e0", paddingTop: 12, paddingBottom: 16 }}>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: "#8c7e6e", marginBottom: 10, letterSpacing: 0.3 }}>
        {pages.length > 0 ? `Página ${mobilePageIdx + 1} de ${pages.length}` : "Sin páginas"}
      </div>

      {pages.length > 0 ? (
        <div style={{ width: "100%", padding: "0 48px" }}>
          <PhotobookSpreadEditor
            pages={pages} accent={ACCENT} layouts={LAYOUTS}
            isMobile={true} mobilePageIdx={mobilePageIdx}
            selectedSlotId={selectedSlotId} onSlotTap={handleMobileSlotTap}
            onChangeLayout={changeLayout} onAssignPhoto={assignPhotoById}
            onRemovePhoto={handleRemoveFromPage} onDeletePage={handleDeletePage}
            onDuplicatePage={handleDuplicatePage} onReorderPages={handleReorderPages}
            onClickPage={(idx) => setZoomPageIdx(idx)} onSwapSlots={handleSwapSlots}
            onUpdateSlotPosition={updateSlotPosition}
            coverUrl={coverUrl} backCoverUrl={backCoverUrl}
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "32px 24px", color: "#a09080", fontSize: 14 }}>
          Sube fotos y presioná Auto-distribuir
        </div>
      )}

      {/* Page navigation */}
      {pages.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 14 }}>
          <button
            onClick={() => setMobilePageIdx((p) => Math.max(0, p - 1))}
            disabled={mobilePageIdx === 0}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: mobilePageIdx === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)", color: mobilePageIdx === 0 ? "#c4b8a8" : "#555", fontSize: 22, cursor: mobilePageIdx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: mobilePageIdx === 0 ? "none" : "0 2px 8px rgba(0,0,0,0.12)" }}
          >‹</button>
          <div style={{ display: "flex", gap: 6, alignItems: "center", maxWidth: "55vw", overflowX: "auto" }}>
            {pages.map((_, i) => (
              <button key={i} onClick={() => setMobilePageIdx(i)} style={{ flexShrink: 0, width: i === mobilePageIdx ? 20 : 8, height: 8, borderRadius: 4, background: i === mobilePageIdx ? ACCENT : "rgba(255,255,255,0.6)", border: "none", padding: 0, cursor: "pointer", transition: "width 0.2s, background 0.2s" }} />
            ))}
          </div>
          <button
            onClick={() => setMobilePageIdx((p) => Math.min(pages.length - 1, p + 1))}
            disabled={mobilePageIdx >= pages.length - 1}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: mobilePageIdx >= pages.length - 1 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)", color: mobilePageIdx >= pages.length - 1 ? "#c4b8a8" : "#555", fontSize: 22, cursor: mobilePageIdx >= pages.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: mobilePageIdx >= pages.length - 1 ? "none" : "0 2px 8px rgba(0,0,0,0.12)" }}
          >›</button>
        </div>
      )}
    </div>

    {/* ── Layout toolbar ── */}
    {pages.length > 0 && (
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, overflowX: "auto" } as React.CSSProperties}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 0.5, flexShrink: 0 }}>Layout</span>
        {LAYOUTS.map((l) => {
          const active = pages[mobilePageIdx]?.layoutKey === l.key;
          return (
            <button key={l.key} onClick={() => changeLayout(mobilePageIdx, l.key)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: active ? `2px solid ${ACCENT}` : "1.5px solid #e0dcd6", background: active ? `${ACCENT}15` : "#fafaf9", color: active ? ACCENT : "#6b5e52", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{l.label}</button>
          );
        })}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, flexShrink: 0 }}>
          <button onClick={() => handleDuplicatePage(mobilePageIdx)} title="Duplicar página" style={{ width: 38, height: 38, borderRadius: 8, border: "1.5px solid #e0dcd6", background: "#fafaf9", color: "#6b5e52", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⧉</button>
          <button onClick={() => handleDeletePage(mobilePageIdx)} title="Eliminar página" style={{ width: 38, height: 38, borderRadius: 8, border: "1.5px solid #fecaca", background: "#fff5f5", color: "#dc2626", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
      </div>
    )}

    {/* ── Photo strip panel ── */}
    <div style={{ background: "#fff", padding: "14px 16px 16px" }}>

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#111" }}>Mis fotos</div>
          <div style={{ fontSize: 14, color: "#999", marginTop: 2 }}>{placedPhotoIds.size} de {photos.length} colocadas</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {totalPages > 0 && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: totalCents > 0 ? ACCENT : "#f59e0b" }}>
                {totalCents > 0 ? fmtPrice(totalCents) : `Mín ${MIN_HOJAS}h`}
              </div>
              <div style={{ fontSize: 11, color: "#999" }}>{hojas} hojas</div>
            </div>
          )}
          <button
            onClick={() => setShowOnlyAvailable((v) => !v)}
            style={{ padding: "8px 14px", borderRadius: 10, border: showOnlyAvailable ? `1.5px solid ${ACCENT}` : "1.5px solid #ddd", background: showOnlyAvailable ? `${ACCENT}15` : "#f5f5f5", color: showOnlyAvailable ? ACCENT : "#666", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
          >{showOnlyAvailable ? "Todas" : "Libres"}</button>
        </div>
      </div>

      {selectedSlotId && (
        <div style={{ padding: "10px 16px", borderRadius: 10, background: "#e8f4ff", border: "1px solid #93c5fd", fontSize: 14, fontWeight: 600, color: "#1d4ed8", marginBottom: 12 }}>
          Elige una foto para colocarla ↓
        </div>
      )}

      {/* Photo thumbnails */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 10, WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        {visiblePhotos.map((p) => {
          const isPlaced = placedPhotoIds.has(p.id);
          const isLowRes = (p.width && p.width < LOW_RES_THRESHOLD) || (p.height && p.height < LOW_RES_THRESHOLD);
          return (
            <div key={p.uid} onClick={() => handleMobilePhotoTap(p)} style={{ flexShrink: 0, width: 100, height: 100, borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer", border: isPlaced ? `2.5px solid ${ACCENT}` : selectedSlotId ? "2.5px solid #93c5fd" : "2.5px solid transparent", boxShadow: "0 2px 10px rgba(0,0,0,0.12)", opacity: isPlaced ? 0.65 : 1, transition: "opacity 0.2s" }}>
              <img src={p.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {isPlaced && (
                <div style={{ position: "absolute", top: 5, left: 5, width: 22, height: 22, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>✓</div>
              )}
              {isLowRes && (
                <div style={{ position: "absolute", bottom: 5, right: 5, width: 22, height: 22, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>!</div>
              )}
            </div>
          );
        })}

        {/* Add more photos */}
        <div
          onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.style.display = "none"; document.body.appendChild(input); input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) handleUploadFiles(Array.from(files)); document.body.removeChild(input); }; input.click(); }}
          style={{ flexShrink: 0, width: 100, height: 100, borderRadius: 14, border: `2px dashed ${ACCENT}60`, background: `${ACCENT}0a`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 4 }}
        >
          <span style={{ fontSize: 30, color: ACCENT, lineHeight: 1 }}>+</span>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>Agregar</span>
        </div>
      </div>

      {uploading && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Subiendo... {progress}%</div>
          <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={openAutoDistribute} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: ACCENT, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-distribuir</button>
        <button onClick={addPage} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Página</button>
      </div>
    </div>
  </div>
)}

{/* Step 3-5 unchanged */}
{step === 3 && (
  <div>
    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <h2 style={{ margin: "0 0 10px", fontSize: isMobile ? "22px" : "28px", fontWeight: 900, color: "#111" }}>
        Tu photobook está listo para revisar
      </h2>
      <p style={{ margin: 0, fontSize: isMobile ? "14px" : "15px", color: "#888", maxWidth: "460px", marginLeft: "auto", marginRight: "auto" }}>
        Hojea cada página antes de continuar. Puedes volver al editor si necesitas ajustar algo.
      </p>
    </div>

    {/* Warning de páginas vacías */}
    {(() => {
      const emptyCount = pages.filter((p) => p.slots.every((s) => s === null)).length;
      if (emptyCount === 0) return null;
      return (
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: "12px", padding: "14px 18px", borderRadius: "12px", background: "#fffbeb", border: "1px solid #fcd34d", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: "20px", flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#92400e" }}>
                {emptyCount} página{emptyCount !== 1 ? "s" : ""} sin foto
              </div>
              <div style={{ fontSize: "13px", color: "#b45309" }}>
                Puedes continuar, pero quedarán vacías en tu libro impreso.
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "#f59e0b", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, alignSelf: isMobile ? "stretch" : "auto", textAlign: "center" }}
          >
            Volver al editor
          </button>
        </div>
      );
    })()}

    {/* Libro a tamaño completo */}
    <div style={{ marginBottom: "28px" }}>
      <PhotobookPreview pages={pages} accent={ACCENT} coverUrl={coverUrl} backCoverUrl={backCoverUrl} />
    </div>

    {/* Tarjeta de resumen pre-checkout */}
    <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #eee", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", maxWidth: "480px", margin: "0 auto" }}>
      {/* Precio hero */}
      <div style={{ background: `linear-gradient(135deg, ${ACCENT}0a 0%, ${ACCENT}18 100%)`, padding: isMobile ? "20px 16px" : "24px", borderBottom: "1px solid #f0f0f0", textAlign: "center" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px" }}>Total a pagar</div>
        <div style={{ fontSize: isMobile ? "38px" : "48px", fontWeight: 900, color: totalCents > 0 ? ACCENT : "#f59e0b", lineHeight: 1 }}>
          {totalCents > 0 ? fmtPrice(totalCents) : `Mín ${MIN_HOJAS} hojas`}
        </div>
      </div>
      {/* Detalles */}
      <div style={{ padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {[
          { label: "Hojas", value: `${hojas} hojas · ${totalPages} caras` },
          { label: "Tipo de tapa", value: coverType === "TAPA_GRUESA" ? "Tapa Gruesa" : "Tapa Delgada" },
          { label: "Tema", value: temaNombre },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", color: "#888", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#111", textAlign: "right", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
          </div>
        ))}
        <div style={{ height: "1px", background: "#f0f0f0" }} />
        <div style={{ fontSize: "12px", color: "#bbb", textAlign: "center" }}>
          El costo de envío se calcula al confirmar el pedido
        </div>
      </div>
    </div>
  </div>
)}

  </>;
}
