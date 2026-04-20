"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { usePhotoUpload, UploadedPhoto } from "@/hooks/usePhotoUpload";
import { useWindowSize } from "@/hooks/useWindowSize";
import PhotobookPreview from "@/components/PhotobookPreview";
import PhotobookSpreadEditor from "@/components/PhotobookSpreadEditor";
import interact from "interactjs";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const ACCENT = "#804187";
const LOW_RES_THRESHOLD = 1000;

const LAYOUTS: { key: string; label: string; slots: number }[] = [
  { key: "FULL_1", label: "1 foto", slots: 1 },
  { key: "GRID_2", label: "2 fotos", slots: 2 },
  { key: "GRID_3", label: "3 fotos", slots: 3 },
  { key: "GRID_4", label: "4 fotos", slots: 4 },
];

type PageData = {
  pageNumber: number;
  layoutKey: string;
  slots: (UploadedPhoto | null)[];
};

type Product = { id: number; name: string; pricePerPageCents: number; minPages: number; currency: string; allowsCustomDimensions: boolean };

type Props = {
  temaSlug: string;
  temaNombre: string;
  themeId: number | null;
  products: Product[];
  coverUrl: string | null;
  backCoverUrl: string | null;
};

const STEPS = [
  { number: 1, label: "Subir Fotos" },
  { number: 2, label: "Editor" },
  { number: 3, label: "Preview" },
  { number: 4, label: "Datos" },
  { number: 5, label: "Confirmar" },
];

/* ── localStorage helpers ── */
function saveDraft(key: string, data: object) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* quota */ }
}
function loadDraft(key: string) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
function clearDraft(key: string) {
  try { localStorage.removeItem(key); } catch { /* */ }
}

export default function PhotobookEditorClient({ temaSlug, temaNombre, themeId, products, coverUrl, backCoverUrl }: Props) {
  const draftKey = `photobook_draft_${temaSlug}`;
  const { isMobile } = useWindowSize();

  const [step, setStep] = useState(1);
  const [mobilePageIdx, setMobilePageIdx] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const { photos, uploading, progress, uploadFiles, removePhoto } = usePhotoUpload("uploads/photobooks");

  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id ?? 0);

  const [form, setForm] = useState({ name: "", email: "", phone: "", deliveryAddress: "", deliveryDistrict: "", customerDni: "" });
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // #2 Filter toggle
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // #6 Duplicate alert
  const [dupAlert, setDupAlert] = useState<string | null>(null);
  const dupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // #12 Zoom modal
  const [zoomPageIdx, setZoomPageIdx] = useState<number | null>(null);

  // #13 Draft restored flag
  const [hasDraft, setHasDraft] = useState(false);

  // #3 Drag-over sidebar
  const [sidebarDragOver, setSidebarDragOver] = useState(false);

  const product = products.find((p) => p.id === selectedProduct);
  const minPages = product?.minPages ?? 25;
  const pricePerPage = product?.pricePerPageCents ?? 0;
  const totalPages = pages.length;
  const totalCents = totalPages * pricePerPage;

  // Derive placed photo IDs
  const placedPhotoIds = useMemo(() => {
    const ids = new Set<number>();
    for (const page of pages) {
      for (const slot of page.slots) {
        if (slot) ids.add(slot.id);
      }
    }
    return ids;
  }, [pages]);

  // #2 Filtered photos for sidebar
  const visiblePhotos = useMemo(() => {
    if (!showOnlyAvailable) return photos;
    return photos.filter((p) => !placedPhotoIds.has(p.id));
  }, [photos, placedPhotoIds, showOnlyAvailable]);

  // Refs for latest state
  const photosRef = useRef(photos);
  photosRef.current = photos;
  const pagesRef = useRef(pages);
  pagesRef.current = pages;

  // #13 Load draft on mount
  useEffect(() => {
    const draft = loadDraft(draftKey);
    if (draft && draft.pages?.length > 0) {
      setHasDraft(true);
    }
  }, [draftKey]);

  function restoreDraft() {
    const draft = loadDraft(draftKey);
    if (!draft) return;
    if (draft.pages) setPages(draft.pages);
    if (draft.step) setStep(draft.step);
    if (draft.form) setForm(draft.form);
    if (draft.selectedProduct) setSelectedProduct(draft.selectedProduct);
    if (draft.customWidth) setCustomWidth(draft.customWidth);
    if (draft.customHeight) setCustomHeight(draft.customHeight);
    setHasDraft(false);
  }

  function discardDraft() {
    clearDraft(draftKey);
    setHasDraft(false);
  }

  // #13 Auto-save draft on changes
  useEffect(() => {
    if (pages.length === 0 && step <= 1) return;
    const timer = setTimeout(() => {
      saveDraft(draftKey, {
        pages: pages.map((p) => ({
          ...p,
          slots: p.slots.map((s) => s ? { id: s.id, contentHash: s.contentHash, preview: s.url || s.preview, url: s.url, thumbnailUrl: s.thumbnailUrl, width: s.width, height: s.height, originalFilename: s.originalFilename, storageKey: s.storageKey } : null),
        })),
        step,
        form,
        selectedProduct,
        customWidth,
        customHeight,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [pages, step, form, selectedProduct, customWidth, customHeight, draftKey]);

  // Auto-distribute
  function autoDistribute() {
    const allPhotos = [...photos];
    const newPages: PageData[] = [];
    let photoIdx = 0;
    let pageNum = 1;

    while (photoIdx < allPhotos.length) {
      const remaining = allPhotos.length - photoIdx;
      const slotsCount = remaining >= 4 ? 4 : remaining >= 3 ? 3 : remaining >= 2 ? 2 : 1;
      const layout = LAYOUTS.find((l) => l.slots === slotsCount)!;
      const slots: (UploadedPhoto | null)[] = [];
      for (let i = 0; i < slotsCount; i++) {
        slots.push(allPhotos[photoIdx] ?? null);
        photoIdx++;
      }
      newPages.push({ pageNumber: pageNum, layoutKey: layout.key, slots });
      pageNum++;
    }

    while (newPages.length < minPages) {
      newPages.push({ pageNumber: newPages.length + 1, layoutKey: "FULL_1", slots: [null] });
    }

    setPages(newPages);
  }

  function addPage() {
    setPages((prev) => [...prev, { pageNumber: prev.length + 1, layoutKey: "FULL_1", slots: [null] }]);
  }

  function changeLayout(pageIdx: number, layoutKey: string) {
    const layout = LAYOUTS.find((l) => l.key === layoutKey)!;
    setPages((prev) => {
      const copy = [...prev];
      const oldSlots = copy[pageIdx].slots;
      const newSlots: (UploadedPhoto | null)[] = [];
      for (let i = 0; i < layout.slots; i++) {
        newSlots.push(oldSlots[i] ?? null);
      }
      copy[pageIdx] = { ...copy[pageIdx], layoutKey, slots: newSlots };
      return copy;
    });
  }

  // #6 Check duplicate and show alert
  function showDupAlertIfNeeded(photo: UploadedPhoto) {
    if (placedPhotoIds.has(photo.id)) {
      if (dupTimerRef.current) clearTimeout(dupTimerRef.current);
      setDupAlert(`"${photo.originalFilename}" ya está en otra página`);
      dupTimerRef.current = setTimeout(() => setDupAlert(null), 3000);
    }
  }

  function assignPhoto(pageIdx: number, slotIdx: number, photo: UploadedPhoto) {
    showDupAlertIfNeeded(photo);
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIdx] = {
        ...copy[pageIdx],
        slots: copy[pageIdx].slots.map((s, i) => i === slotIdx ? photo : s),
      };
      return copy;
    });
  }

  const assignPhotoById = useCallback((pageIdx: number, slotIdx: number, photoId: number) => {
    const photo = photosRef.current.find((p) => p.id === photoId);
    if (photo) assignPhoto(pageIdx, slotIdx, photo);
  }, []);

  // Clamp mobilePageIdx when pages are deleted
  useEffect(() => {
    if (pages.length > 0 && mobilePageIdx >= pages.length) {
      setMobilePageIdx(pages.length - 1);
    }
  }, [pages.length, mobilePageIdx]);

  // Mobile: tap on a slot selects it (or deselects if same)
  function handleMobileSlotTap(pageIdx: number, slotIdx: number) {
    const id = `${pageIdx}-${slotIdx}`;
    setSelectedSlotId((prev) => (prev === id ? null : id));
  }

  // Mobile: tap a photo from the strip
  function handleMobilePhotoTap(photo: UploadedPhoto) {
    if (selectedSlotId) {
      const [pageIdx, slotIdx] = selectedSlotId.split("-").map(Number);
      assignPhoto(pageIdx, slotIdx, photo);
      setSelectedSlotId(null);
      return;
    }
    // No slot selected → assign to first empty slot of current page
    const page = pagesRef.current[mobilePageIdx];
    if (!page) return;
    const emptyIdx = page.slots.findIndex((s) => s === null);
    if (emptyIdx !== -1) {
      assignPhoto(mobilePageIdx, emptyIdx, photo);
    }
  }

  const handleRemoveFromPage = useCallback((pageIdx: number, slotIdx: number) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIdx] = {
        ...copy[pageIdx],
        slots: copy[pageIdx].slots.map((s, i) => i === slotIdx ? null : s),
      };
      return copy;
    });
  }, []);

  // Swap two slots within the same page
  const handleSwapSlots = useCallback((pageIdx: number, fromSlot: number, toSlot: number) => {
    if (fromSlot === toSlot) return;
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx], slots: [...copy[pageIdx].slots] };
      const temp = page.slots[fromSlot];
      page.slots[fromSlot] = page.slots[toSlot];
      page.slots[toSlot] = temp;
      copy[pageIdx] = page;
      return copy;
    });
  }, []);

  function handleDeletePhoto(contentHash: string) {
    const photo = photos.find((p) => p.contentHash === contentHash);
    if (photo) {
      setPages((prev) =>
        prev.map((page) => ({
          ...page,
          slots: page.slots.map((s) => (s && s.id === photo.id ? null : s)),
        }))
      );
    }
    removePhoto(contentHash);
  }

  // #7 Delete page
  function handleDeletePage(pageIdx: number) {
    const page = pages[pageIdx];
    const hasPhotos = page?.slots.some(Boolean);
    if (hasPhotos && !confirm("Esta página tiene fotos. ¿Eliminarla?")) return;
    setPages((prev) => {
      const copy = prev.filter((_, i) => i !== pageIdx);
      return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  }

  // #8 Duplicate page
  function handleDuplicatePage(pageIdx: number) {
    setPages((prev) => {
      const page = prev[pageIdx];
      const newPage = { ...page, pageNumber: prev.length + 1, slots: [...page.slots] };
      const copy = [...prev];
      copy.splice(pageIdx + 1, 0, newPage);
      return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  }

  // #9 Reorder pages
  function handleReorderPages(fromIdx: number, toIdx: number) {
    if (fromIdx === toIdx) return;
    setPages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  }

  // interact.js drag
  useEffect(() => {
    if (step !== 2) return;
    const timer = setTimeout(() => {
      interact(".draggable-photo").draggable({
        inertia: true,
        autoScroll: true,
        listeners: {
          start(event) {
            const t = event.target as HTMLElement;
            t.style.zIndex = "9999";
            t.style.opacity = "0.75";
            t.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
          },
          move(event) {
            const t = event.target as HTMLElement;
            const x = (parseFloat(t.getAttribute("data-x") || "0")) + event.dx;
            const y = (parseFloat(t.getAttribute("data-y") || "0")) + event.dy;
            t.style.translate = `${x}px ${y}px`;
            t.setAttribute("data-x", String(x));
            t.setAttribute("data-y", String(y));
          },
          end(event) {
            const t = event.target as HTMLElement;
            t.style.zIndex = "";
            t.style.opacity = "";
            t.style.boxShadow = "";
            t.style.translate = "";
            t.setAttribute("data-x", "0");
            t.setAttribute("data-y", "0");
          },
        },
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [step]);

  async function handleSubmit() {
    if (!themeId || !product) return;
    setSubmitting(true);
    try {
      const body = {
        photobookProductId: product.id,
        photobookThemeId: themeId,
        customerEmail: form.email,
        customerFullName: form.name,
        customerPhone: form.phone,
        deliveryAddress: form.deliveryAddress,
        ...(form.deliveryDistrict ? { deliveryDistrict: form.deliveryDistrict } : {}),
        ...(form.customerDni ? { customerDni: form.customerDni } : {}),
        ...(product.allowsCustomDimensions && customWidth && customHeight ? { customWidthCm: parseFloat(customWidth), customHeightCm: parseFloat(customHeight) } : {}),
        pricePerPageCents: product.pricePerPageCents,
        pages: pages.map((p) => ({
          pageNumber: p.pageNumber,
          layoutKey: p.layoutKey,
          slots: p.slots.filter(Boolean).map((s, i) => ({ assetId: s!.id, slotIndex: i })),
        })),
        assetIds: photos.map((p) => p.id),
      };
      const res = await fetch(`${API}/api/photobook/projects`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error((err as { message?: string }).message ?? "Error"); }
      setSubmitted(true);
      clearDraft(draftKey); // #13
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  // #3 Sidebar drag-over handlers for OS file drop
  function handleSidebarDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes("Files")) setSidebarDragOver(true);
  }
  function handleSidebarDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setSidebarDragOver(false);
  }
  function handleSidebarDrop(e: React.DragEvent) {
    e.preventDefault();
    setSidebarDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) uploadFiles(Array.from(files));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8fa" }}>
      {/* #13 Draft restoration banner */}
      {hasDraft && step === 1 && (
        <div style={{ background: "#fef3c7", borderBottom: "1px solid #fde68a", padding: "10px 48px", display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#92400e" }}>Tienes un borrador guardado.</span>
          <button onClick={restoreDraft} style={{ padding: "5px 14px", borderRadius: 6, border: "none", background: ACCENT, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Restaurar</button>
          <button onClick={discardDraft} style={{ padding: "5px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", color: "#666", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Descartar</button>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: isMobile ? "10px 16px" : "14px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: ACCENT, textTransform: "uppercase", letterSpacing: "1px" }}>PHOTOBOOK</div>
          <div style={{ fontSize: isMobile ? "13px" : "16px", fontWeight: 700, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{temaNombre}</div>
        </div>
        {/* Steps — show icons only on mobile */}
        <div style={{ display: "flex", gap: isMobile ? "6px" : "4px" }}>
          {STEPS.map((s) => (
            <button key={s.number} onClick={() => s.number <= step && setStep(s.number)} style={{ display: "flex", alignItems: "center", gap: "4px", padding: isMobile ? "4px 6px" : "6px 10px", borderRadius: "8px", border: step === s.number ? `2px solid ${ACCENT}` : "1px solid #e5e7eb", background: step === s.number ? `${ACCENT}10` : step > s.number ? "#f0fdf4" : "#fff", cursor: s.number <= step ? "pointer" : "default", fontFamily: "inherit" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: step === s.number ? ACCENT : step > s.number ? "#22c55e" : "#d0d0d0", color: "#fff", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{step > s.number ? "✓" : s.number}</span>
              {!isMobile && <span style={{ fontSize: "11px", fontWeight: 600, color: step === s.number ? ACCENT : "#999" }}>{s.label}</span>}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#999", flexShrink: 0 }}>Paso {step}/5</div>
      </div>

      <div style={{ maxWidth: step === 2 ? "none" : "1000px", margin: "0 auto", padding: step === 2 ? (isMobile ? "16px 12px 160px" : "32px 16px 120px") : (isMobile ? "16px 16px 120px" : "32px 48px 120px") }}>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: isMobile ? "20px" : "24px", fontWeight: 800 }}>Sube tus fotos</h2>
            <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#666" }}>Mínimo {minPages} fotos. Puedes subir más para tener opciones.</p>
            <div
              onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) uploadFiles(Array.from(files)); }; input.click(); }}
              style={{ width: "100%", minHeight: isMobile ? "80px" : "120px", borderRadius: "16px", border: "2px dashed #d0d0d0", background: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px", cursor: "pointer", marginBottom: "16px" }}
            >
              <div style={{ fontSize: "24px" }}>+</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#555" }}>{isMobile ? "Subir fotos" : "Agregar Fotos"}</div>
              {!isMobile && <div style={{ fontSize: "12px", color: "#999" }}>o arrastra aquí</div>}
            </div>
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
                  <div key={p.contentHash} style={{ position: "relative", aspectRatio: "1", borderRadius: "8px", overflow: "hidden" }}>
                    <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button onClick={() => removePhoto(p.contentHash)} style={{ position: "absolute", top: "3px", right: "3px", width: isMobile ? "24px" : "20px", height: isMobile ? "24px" : "20px", borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>{photos.length} fotos subidas</div>
          </div>
        )}

        {/* Step 2: Editor — Desktop */}
        {step === 2 && !isMobile && (
          <div style={{ display: "flex", gap: 0, minHeight: "calc(100vh - 180px)", userSelect: "none", WebkitUserSelect: "none" }}>
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
                overflow: "hidden", marginRight: 16,
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#111", marginBottom: 10 }}>Mis Fotos</div>
                <div
                  onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) uploadFiles(Array.from(files)); }; input.click(); }}
                  style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: `2px dashed ${ACCENT}40`, background: sidebarDragOver ? `${ACCENT}15` : `${ACCENT}08`, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", transition: "background 0.15s" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>{sidebarDragOver ? "Suelta aquí" : "Subir fotos"}</span>
                  <span style={{ fontSize: 10, color: "#999" }}>PC, celular o tablet</span>
                </div>
                {uploading && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Subiendo... {progress}%</div>
                    <div style={{ width: "100%", height: 4, borderRadius: 2, background: "#eee", overflow: "hidden" }}>
                      <div style={{ width: `${progress}%`, height: "100%", background: ACCENT, borderRadius: 2, transition: "width 0.3s" }} />
                    </div>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
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
                          <div key={p.contentHash} className="draggable-photo" data-photo-id={p.id} title={`${p.originalFilename}${p.width && p.height ? ` — ${p.width}×${p.height}` : ""}`} style={{ position: "relative", aspectRatio: "1", borderRadius: 6, overflow: "hidden", cursor: "grab", touchAction: "none", border: isPlaced ? `2px solid ${ACCENT}` : "2px solid transparent", opacity: isPlaced ? 0.7 : 1 }}>
                            <img src={p.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
                            {isPlaced && <div style={{ position: "absolute", top: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>✓</div>}
                            {isLowRes && !isPlaced && <div style={{ position: "absolute", top: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>!</div>}
                            {isLowRes && isPlaced && <div style={{ position: "absolute", bottom: 3, left: 3, width: 18, height: 18, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>!</div>}
                            <button onClick={(e) => { e.stopPropagation(); handleDeletePhoto(p.contentHash); }} style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
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
                {totalPages > 0 && <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textAlign: "center", marginBottom: 2 }}>{totalPages} págs × S/ {(pricePerPage / 100).toFixed(2)} = S/ {(totalCents / 100).toFixed(2)}</div>}
                <button onClick={autoDistribute} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "none", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-distribuir</button>
                <button onClick={addPage} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Agregar página</button>
              </div>
            </div>

            {/* ── Right: spread editor ── */}
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
              {dupAlert && (
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 50, padding: "8px 20px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 12, fontWeight: 600, color: "#92400e", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  {dupAlert}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "0 8px" }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111" }}>Editor de Páginas</h2>
                <span style={{ fontSize: 13, color: "#999" }}>{pages.length} páginas</span>
              </div>
              {pages.length > 0 ? (
                <PhotobookSpreadEditor pages={pages} accent={ACCENT} layouts={LAYOUTS} onChangeLayout={changeLayout} onAssignPhoto={assignPhotoById} onRemovePhoto={handleRemoveFromPage} onDeletePage={handleDeletePage} onDuplicatePage={handleDuplicatePage} onReorderPages={handleReorderPages} onClickPage={(idx) => setZoomPageIdx(idx)} onSwapSlots={handleSwapSlots} coverUrl={coverUrl} backCoverUrl={backCoverUrl} />
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
          <div style={{ display: "flex", flexDirection: "column", gap: 0, userSelect: "none", WebkitUserSelect: "none" }}>
            {/* Dup alert */}
            {dupAlert && (
              <div style={{ padding: "8px 16px", borderRadius: 8, background: "#fef3c7", border: "1px solid #fde68a", fontSize: 12, fontWeight: 600, color: "#92400e", marginBottom: 8 }}>
                {dupAlert}
              </div>
            )}

            {/* Canvas area */}
            {pages.length > 0 ? (
              <>
                <div style={{ textAlign: "center", fontSize: 12, color: "#999", marginBottom: 8 }}>
                  Página {mobilePageIdx + 1} de {pages.length}
                </div>
                <PhotobookSpreadEditor
                  pages={pages} accent={ACCENT} layouts={LAYOUTS}
                  isMobile={true} mobilePageIdx={mobilePageIdx}
                  selectedSlotId={selectedSlotId} onSlotTap={handleMobileSlotTap}
                  onChangeLayout={changeLayout} onAssignPhoto={assignPhotoById}
                  onRemovePhoto={handleRemoveFromPage} onDeletePage={handleDeletePage}
                  onDuplicatePage={handleDuplicatePage} onReorderPages={handleReorderPages}
                  onClickPage={(idx) => setZoomPageIdx(idx)} onSwapSlots={handleSwapSlots}
                  coverUrl={coverUrl} backCoverUrl={backCoverUrl}
                />

                {/* Page navigation */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "10px 0 4px" }}>
                  <button
                    onClick={() => setMobilePageIdx((p) => Math.max(0, p - 1))}
                    disabled={mobilePageIdx === 0}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e5e7eb", background: mobilePageIdx === 0 ? "#f5f5f5" : "#fff", color: mobilePageIdx === 0 ? "#ccc" : "#555", fontSize: 18, cursor: mobilePageIdx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >‹</button>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", maxWidth: 200, overflowX: "auto" }}>
                    {pages.map((_, i) => (
                      <button key={i} onClick={() => setMobilePageIdx(i)} style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: i === mobilePageIdx ? ACCENT : "#d4c9b8", border: "none", padding: 0, cursor: "pointer" }} />
                    ))}
                  </div>
                  <button
                    onClick={() => setMobilePageIdx((p) => Math.min(pages.length - 1, p + 1))}
                    disabled={mobilePageIdx >= pages.length - 1}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e5e7eb", background: mobilePageIdx >= pages.length - 1 ? "#f5f5f5" : "#fff", color: mobilePageIdx >= pages.length - 1 ? "#ccc" : "#555", fontSize: 18, cursor: mobilePageIdx >= pages.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >›</button>
                </div>

                {/* Layout toolbar */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, padding: "8px 16px 4px", background: "#fff", borderRadius: 12, border: "1px solid #eee", margin: "6px 0" }}>
                  {LAYOUTS.map((l) => {
                    const active = pages[mobilePageIdx]?.layoutKey === l.key;
                    return (
                      <button key={l.key} onClick={() => changeLayout(mobilePageIdx, l.key)} style={{ padding: "8px 10px", borderRadius: 8, border: active ? `1.5px solid ${ACCENT}` : "1px solid #e0dcd6", background: active ? `${ACCENT}15` : "#fff", color: active ? ACCENT : "#8c7e6e", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{l.label}</button>
                    );
                  })}
                  <button onClick={() => handleDuplicatePage(mobilePageIdx)} title="Duplicar" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #e0dcd6", background: "#fff", color: "#8c7e6e", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>⧉</button>
                  <button onClick={() => handleDeletePage(mobilePageIdx)} title="Eliminar" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #fecaca", background: "#fff", color: "#dc2626", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 24px", color: "#999", background: "#fff", borderRadius: 14, border: "1px solid #eee", marginBottom: 12 }}>
                <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.4 }}>+</div>
                <div style={{ fontSize: 14 }}>Sube fotos y presiona Auto-distribuir</div>
              </div>
            )}

            {/* Photo strip */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #eee", padding: "14px 16px", marginTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#888" }}>{placedPhotoIds.size}/{photos.length} colocadas</span>
                {totalPages > 0 && <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{totalPages} págs · S/ {(totalCents / 100).toFixed(2)}</span>}
              </div>

              {selectedSlotId && (
                <div style={{ fontSize: 12, color: "#049eff", fontWeight: 600, marginBottom: 8 }}>
                  Toca una foto para colocarla ↓
                </div>
              )}

              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
                {visiblePhotos.map((p) => {
                  const isPlaced = placedPhotoIds.has(p.id);
                  const isLowRes = (p.width && p.width < LOW_RES_THRESHOLD) || (p.height && p.height < LOW_RES_THRESHOLD);
                  return (
                    <div key={p.contentHash} onClick={() => handleMobilePhotoTap(p)} style={{ flexShrink: 0, width: 68, height: 68, borderRadius: 10, overflow: "hidden", position: "relative", cursor: "pointer", border: isPlaced ? `2px solid ${ACCENT}` : "2px solid transparent", opacity: isPlaced ? 0.75 : 1 }}>
                      <img src={p.preview} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {isPlaced && <div style={{ position: "absolute", top: 2, left: 2, width: 16, height: 16, borderRadius: "50%", background: ACCENT, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>}
                      {isLowRes && !isPlaced && <div style={{ position: "absolute", top: 2, left: 2, width: 16, height: 16, borderRadius: "50%", background: "#f59e0b", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>!</div>}
                    </div>
                  );
                })}
                {/* Add photos button */}
                <div
                  onClick={() => { const input = document.createElement("input"); input.type = "file"; input.accept = "image/*"; input.multiple = true; input.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files) uploadFiles(Array.from(files)); }; input.click(); }}
                  style={{ flexShrink: 0, width: 68, height: 68, borderRadius: 10, border: `2px dashed ${ACCENT}50`, background: `${ACCENT}08`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 2 }}
                >
                  <span style={{ fontSize: 20, color: ACCENT, lineHeight: 1 }}>+</span>
                  <span style={{ fontSize: 10, color: ACCENT, fontWeight: 600 }}>Fotos</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={autoDistribute} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "none", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Auto-distribuir</button>
                <button onClick={addPage} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>+ Página</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3-5 unchanged */}
        {step === 3 && (
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: 800 }}>Preview del Photobook</h2>
            <p style={{ margin: "0 0 24px", fontSize: "14px", color: "#666" }}>Hojea tu libro arrastrando las esquinas de las páginas.</p>
            <PhotobookPreview pages={pages} accent={ACCENT} coverUrl={coverUrl} backCoverUrl={backCoverUrl} />
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #eee", padding: "20px", marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", marginBottom: "8px" }}>
                <span style={{ color: "#666" }}>Páginas</span><span style={{ fontWeight: 700 }}>{totalPages}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", marginBottom: "8px" }}>
                <span style={{ color: "#666" }}>Precio por página</span><span>S/ {(pricePerPage / 100).toFixed(2)}</span>
              </div>
              <div style={{ height: "1px", background: "#eee", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800 }}>
                <span>Total</span><span style={{ color: ACCENT }}>S/ {(totalCents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ margin: "0 0 20px", fontSize: "24px", fontWeight: 800 }}>Tus datos</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "500px" }}>
              {[
                { label: "Nombre completo", key: "name", type: "text", required: true },
                { label: "Email", key: "email", type: "email", required: true },
                { label: "Teléfono", key: "phone", type: "tel", required: true },
                { label: "Dirección de entrega", key: "deliveryAddress", type: "text", required: true },
                { label: "Distrito", key: "deliveryDistrict", type: "text", required: false },
                { label: "DNI", key: "customerDni", type: "text", required: false },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                    {f.label}{f.required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
                  </label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    maxLength={f.key === "customerDni" ? 8 : undefined}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <div style={{ marginTop: "8px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>Producto<span style={{ color: "#ef4444", marginLeft: 2 }}>*</span></label>
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(Number(e.target.value))} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }}>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — S/ {(p.pricePerPageCents / 100).toFixed(2)}/pág (mín {p.minPages})</option>
                  ))}
                </select>
              </div>
              {product?.allowsCustomDimensions && (
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "4px" }}>
                    Dimensiones personalizadas (cm)<span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="number" placeholder="Ancho" value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      min="1" max="100" step="0.5"
                      style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }}
                    />
                    <span style={{ fontSize: "16px", color: "#6b7280", flexShrink: 0 }}>×</span>
                    <input
                      type="number" placeholder="Alto" value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      min="1" max="100" step="0.5"
                      style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit" }}
                    />
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#f59e0b", fontWeight: 500 }}>* Las dimensiones personalizadas pueden tener un costo adicional.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 5 && !submitted && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📷</div>
            <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>Confirmar Photobook</h2>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>{totalPages} páginas — S/ {(totalCents / 100).toFixed(2)} — {temaNombre}</p>
            <button disabled={submitting} onClick={handleSubmit} style={{ padding: "14px 36px", borderRadius: "12px", border: "none", background: submitting ? "#ccc" : ACCENT, color: "#fff", fontSize: "16px", fontWeight: 700, cursor: submitting ? "wait" : "pointer", fontFamily: "inherit" }}>
              {submitting ? "Creando..." : "Confirmar Pedido"}
            </button>
          </div>
        )}

        {submitted && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#065f46", marginBottom: "12px" }}>Photobook creado</h2>
            <p style={{ fontSize: "16px", color: "#666" }}>Tu proyecto fue confirmado. Recibirás un link de pago en tu correo.</p>
          </div>
        )}
      </div>

      {/* Nav bar */}
      {!submitted && zoomPageIdx === null && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #eee", padding: isMobile ? "10px 16px" : "14px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100 }}>
          <button onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1} style={{ padding: "10px 24px", borderRadius: "10px", border: step === 1 ? "1px solid #e5e7eb" : `1px solid ${ACCENT}`, background: "#fff", color: step === 1 ? "#ccc" : ACCENT, fontSize: "14px", fontWeight: 600, cursor: step === 1 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Anterior</button>
          <span style={{ fontSize: "13px", color: "#999" }}>{STEPS[step - 1]?.label}</span>
          {step < 5 ? (
            <button onClick={() => {
              if (step === 1 && photos.length === 0) return;
              if (step === 2 && pages.length < minPages) { alert(`Mínimo ${minPages} páginas`); return; }
              if (step === 4 && (!form.name || !form.email || !form.phone || !form.deliveryAddress)) { alert("Completá nombre, email, teléfono y dirección de entrega"); return; }
              if (step === 4 && product?.allowsCustomDimensions && (!customWidth || !customHeight)) { alert("Ingresá las dimensiones del photobook personalizado"); return; }
              setStep(step + 1);
              if (step === 1 && pages.length === 0) autoDistribute();
            }} style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: ACCENT, color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Siguiente</button>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* #12 Zoom modal — at root level so it covers everything */}
      {zoomPageIdx !== null && pages[zoomPageIdx] && (
        <div onClick={() => setZoomPageIdx(null)} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "zoom-out",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#FFFEF9", borderRadius: 8,
            width: "min(600px, 90vw)", height: "min(780px, 85vh)", padding: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            position: "relative", cursor: "default",
            display: "grid",
            ...(() => {
              const lk = pages[zoomPageIdx].layoutKey;
              switch (lk) {
                case "FULL_1": return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr" };
                case "GRID_2": return { gridTemplateColumns: "1fr", gridTemplateRows: "1fr 1fr" };
                case "GRID_3": return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "3fr 2fr" };
                case "GRID_4": default: return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
              }
            })(),
            gridTemplateAreas: (() => {
              const lk = pages[zoomPageIdx].layoutKey;
              switch (lk) {
                case "FULL_1": return `"a"`;
                case "GRID_2": return `"a" "b"`;
                case "GRID_3": return `"a a" "b c"`;
                case "GRID_4": default: return `"a b" "c d"`;
              }
            })(),
            gap: 10,
          }}>
            {pages[zoomPageIdx].slots.map((s, i) => {
              const areas = ["a", "b", "c", "d"];
              return (
                <div key={i} style={{
                  borderRadius: 6, overflow: "hidden", background: "#f0ede8",
                  gridArea: areas[i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {s ? (
                    <img src={s.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <span style={{ color: "#ccc", fontSize: 14 }}>Vacío</span>
                  )}
                </div>
              );
            })}
            <button onClick={() => setZoomPageIdx(null)} style={{
              position: "absolute", top: -12, right: -12,
              width: 32, height: 32, borderRadius: "50%",
              border: "none", background: "#fff", color: "#333",
              fontSize: 16, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
            <div style={{ position: "absolute", bottom: -32, left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: 13 }}>
              Página {pages[zoomPageIdx].pageNumber}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
