"use client";

import { useState, useEffect, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type TargetType = "model" | "models" | "category" | "all";
type DiscountType = "percent" | "fixed_cents";

type Promotion = {
  id: number;
  label: string;
  targetType: TargetType;
  targetId: number | null;
  targetIds: number[];
  discountType: DiscountType;
  discountValue: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
};

type CatalogBook = { id: number; name: string };

const EMPTY_FORM = {
  label: "",
  targetType: "model" as TargetType,
  targetId: "" as string,
  targetIds: [] as number[],
  discountType: "percent" as DiscountType,
  discountValue: "" as string,
  validFrom: "",
  validUntil: "",
  isActive: true,
};

function toLocalDatetime(iso: string) {
  return iso ? iso.slice(0, 16) : "";
}

function formatDiscount(p: Promotion) {
  return p.discountType === "percent"
    ? `${p.discountValue}%`
    : `S/ ${(p.discountValue / 100).toFixed(2)}`;
}

function promoStatus(p: Promotion): { label: string; bg: string; text: string } {
  const now = new Date();
  const from = new Date(p.validFrom);
  const until = new Date(p.validUntil);
  if (!p.isActive) return { label: "Inactiva", bg: "#f3f4f6", text: "#6b7280" };
  if (now < from)  return { label: "Próxima",  bg: "#dbeafe", text: "#1e40af" };
  if (now > until) return { label: "Expirada", bg: "#fee2e2", text: "#991b1b" };
  return { label: "Activa", bg: "#d1fae5", text: "#065f46" };
}

function targetLabel(p: Promotion, catalogBooks: CatalogBook[]) {
  if (p.targetType === "all") return "Todos los libros";
  if (p.targetType === "models") {
    if (!p.targetIds?.length) return "Libros específicos (sin selección)";
    const names = p.targetIds.map(id => catalogBooks.find(b => b.id === id)?.name ?? `#${id}`);
    return names.join(", ");
  }
  const book = catalogBooks.find((b) => b.id === p.targetId);
  return book ? `Libro: ${book.name}` : `Libro #${p.targetId}`;
}

export default function PromocionesPage() {
  const [promos, setPromos]           = useState<Promotion[]>([]);
  const [catalogBooks, setCatalogBooks] = useState<CatalogBook[]>([]);
  const [loading, setLoading]         = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState<Promotion | null>(null);
  const [form, setForm]           = useState({ ...EMPTY_FORM });
  const [saving, setSaving]             = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [deleting, setDeleting]         = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Promotion | null>(null);
  const [conflictAccepted, setConflictAccepted] = useState(false);

  // Banner
  const [bannerText, setBannerText]       = useState("");
  const [bannerColor, setBannerColor]     = useState("#1a1a2e");
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [bannerSaving, setBannerSaving]   = useState(false);
  const [bannerLoaded, setBannerLoaded]   = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [promosRes, booksRes] = await Promise.all([
      fetch(`${API}/api/admin/promotions`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/catalog/books`).then((r) => r.json()).catch(() => []),
    ]);
    setPromos(promosRes);
    const books: CatalogBook[] = (booksRes?.data ?? booksRes ?? []).map((b: { id: number | string; name: string }) => ({
      id: Number(b.id),
      name: b.name,
    }));
    setCatalogBooks(books);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch(`${API}/api/site-config/promo_banner`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.value) {
          setBannerText(data.value.text ?? "");
          setBannerColor(data.value.color ?? "#1a1a2e");
          setBannerEnabled(data.value.enabled ?? true);
        }
        setBannerLoaded(true);
      })
      .catch(() => setBannerLoaded(true));
  }, []);

  async function saveBanner(overrides?: { enabled?: boolean }) {
    setBannerSaving(true);
    await fetch(`${API}/api/admin/site-config/promo_banner`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { text: bannerText, color: bannerColor, enabled: bannerEnabled, ...overrides } }),
    });
    setBannerSaving(false);
  }

  async function toggleBanner() {
    const next = !bannerEnabled;
    setBannerEnabled(next);
    await saveBanner({ enabled: next });
  }

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setError(null);
    setConflictAccepted(false);
    setShowModal(true);
  }

  function openEdit(p: Promotion) {
    setEditing(p);
    setConflictAccepted(false);
    setForm({
      label:         p.label,
      targetType:    p.targetType,
      targetId:      p.targetId ? String(p.targetId) : "",
      targetIds:     p.targetIds ?? [],
      discountType:  p.discountType,
      discountValue: String(p.discountValue),
      validFrom:     toLocalDatetime(p.validFrom),
      validUntil:    toLocalDatetime(p.validUntil),
      isActive:      p.isActive,
    });
    setError(null);
    setShowModal(true);
  }

  function getConflicts(): { bookId: number; bookName: string; promo: Promotion }[] {
    const selectedIds =
      form.targetType === "model" && form.targetId
        ? [Number(form.targetId)]
        : form.targetType === "models"
          ? form.targetIds
          : [];
    if (!selectedIds.length) return [];

    const activePromos = promos.filter(
      (p) => ["Activa", "Próxima"].includes(promoStatus(p).label) && p.id !== editing?.id,
    );

    return selectedIds.flatMap((bookId) => {
      const conflict = activePromos.find(
        (p) =>
          p.targetType === "all" ||
          (p.targetType === "model" && p.targetId === bookId) ||
          (p.targetType === "models" && p.targetIds?.includes(bookId)),
      );
      if (!conflict) return [];
      const book = catalogBooks.find((b) => b.id === bookId);
      return [{ bookId, bookName: book?.name ?? `#${bookId}`, promo: conflict }];
    });
  }

  async function handleSave() {
    if (!form.label.trim())        return setError("El nombre es obligatorio");
    if (!form.discountValue)       return setError("El descuento es obligatorio");
    if (!form.validFrom)           return setError("La fecha de inicio es obligatoria");
    if (!form.validUntil)          return setError("La fecha de fin es obligatoria");
    if (form.targetType === "models" && form.targetIds.length === 0) return setError("Seleccioná al menos un libro");
    if (form.targetType === "model" && !form.targetId) return setError("Seleccioná el libro destino");

    const conflicts = getConflicts();
    if (conflicts.length && !conflictAccepted) {
      return setError("Hay conflictos con otras promociones. Confirmá el reemplazo antes de guardar.");
    }

    setSaving(true);
    setError(null);

    // Desactivar promos conflictivas si el admin aceptó el reemplazo
    if (conflictAccepted && conflicts.length) {
      const idsToDeactivate = [...new Set(conflicts.map((c) => c.promo.id))];
      await Promise.all(
        idsToDeactivate.map((id) =>
          fetch(`${API}/api/admin/promotions/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: false }),
          }),
        ),
      );
    }

    const body = {
      label:         form.label.trim(),
      targetType:    form.targetType,
      targetId:      form.targetType === "model" ? Number(form.targetId) : null,
      targetIds:     form.targetType === "models" ? form.targetIds : [],
      discountType:  form.discountType,
      discountValue: Number(form.discountValue),
      validFrom:     new Date(form.validFrom).toISOString(),
      validUntil:    new Date(form.validUntil).toISOString(),
      isActive:      form.isActive,
    };

    const url = editing
      ? `${API}/api/admin/promotions/${editing.id}`
      : `${API}/api/admin/promotions`;

    const res = await fetch(url, {
      method:  editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });

    setSaving(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return setError(err.message ?? "Error al guardar");
    }

    setShowModal(false);
    load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(deleteTarget.id);
    setDeleteTarget(null);
    await fetch(`${API}/api/admin/promotions/${deleteTarget.id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  }

  const activeCount   = promos.filter((p) => promoStatus(p).label === "Activa").length;
  const upcomingCount = promos.filter((p) => promoStatus(p).label === "Próxima").length;
  const expiredCount  = promos.filter((p) => promoStatus(p).label === "Expirada").length;
  const conflicts     = getConflicts();

  return (
    <div style={{ padding: "32px" }}>
      <style>{`@keyframes sk-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 800, color: "#111" }}>Promociones</h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
            Descuentos por libro, categoría o global con rango de fechas
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "10px", border: "none",
            background: "#111", color: "#fff", fontSize: "14px",
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Nueva Promoción
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        <div style={{ background: "#d1fae5", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#065f46" }}>{activeCount}</div>
          <div style={{ fontSize: "13px", color: "#065f46", marginTop: "2px" }}>Activas ahora</div>
        </div>
        <div style={{ background: "#dbeafe", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#1e40af" }}>{upcomingCount}</div>
          <div style={{ fontSize: "13px", color: "#1e40af", marginTop: "2px" }}>Próximas</div>
        </div>
        <div style={{ background: "#f3f4f6", borderRadius: "12px", padding: "20px 24px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, color: "#374151" }}>{expiredCount}</div>
          <div style={{ fontSize: "13px", color: "#374151", marginTop: "2px" }}>Expiradas / Inactivas</div>
        </div>
      </div>

      {/* Tabla */}
      {loading ? (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Nombre", "Destino", "Descuento", "Vigencia", "Estado", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {[160, 140, 70, 160, 70, 60].map((w, j) => (
                    <td key={j} style={{ padding: "14px 16px" }}>
                      <div style={{ height: 13, width: w, borderRadius: 4, background: "#f0f0f0", animation: "sk-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.06}s` }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : promos.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "64px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏷️</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>Sin promociones</div>
          <div style={{ fontSize: "14px", color: "#9ca3af" }}>Creá la primera y empezará a aplicarse automáticamente</div>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Nombre", "Destino", "Descuento", "Vigencia", "Estado", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {promos.map((p) => {
                const st = promoStatus(p);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>{p.label}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "13px", color: "#6b7280" }}>{targetLabel(p, catalogBooks)}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: "20px", background: "#ede9fe", color: "#5b21b6", fontSize: "13px", fontWeight: 700 }}>
                        {formatDiscount(p)}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: "12px", color: "#374151" }}>
                        {new Date(p.validFrom).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                        → {new Date(p.validUntil).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: "20px", background: st.bg, color: st.text, fontSize: "12px", fontWeight: 700 }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => openEdit(p)}
                          style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          disabled={deleting === p.id}
                          style={{ padding: "6px 14px", borderRadius: "8px", border: "none", background: "#fee2e2", color: "#991b1b", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: deleting === p.id ? 0.5 : 1 }}
                        >
                          {deleting === p.id ? "..." : "Eliminar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Banner del sitio */}
      {bannerLoaded && (
        <div style={{ marginTop: "32px" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 700, color: "#111" }}>Banner del sitio</h2>
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={labelStyle}>Texto del banner</label>
                <button
                  onClick={toggleBanner}
                  disabled={bannerSaving}
                  style={{ padding: "4px 12px", borderRadius: "6px", border: "none", background: bannerEnabled ? "#22c55e" : "#e5e7eb", color: bannerEnabled ? "#fff" : "#6b7280", fontSize: "12px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: bannerSaving ? 0.6 : 1 }}
                >
                  {bannerEnabled ? "Activo" : "Inactivo"}
                </button>
              </div>
              <input
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Ej: ¡Envío gratis en pedidos mayores a S/ 100!"
                style={inputStyle}
              />
              <div>
                <label style={labelStyle}>Color de fondo</label>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="color" value={bannerColor} onChange={(e) => setBannerColor(e.target.value)} style={{ width: "40px", height: "40px", border: "none", borderRadius: "8px", cursor: "pointer", padding: 0 }} />
                  <input value={bannerColor} onChange={(e) => setBannerColor(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                </div>
              </div>
              <button
                onClick={() => saveBanner()}
                disabled={bannerSaving}
                style={{ padding: "10px", borderRadius: "8px", border: "none", background: "#111", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: bannerSaving ? 0.6 : 1 }}
              >
                {bannerSaving ? "Guardando..." : "Guardar banner"}
              </button>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Vista previa</div>
              <div style={{ padding: "12px 16px", borderRadius: "8px", background: bannerColor, color: "#fff", fontSize: "13px", fontWeight: 600, textAlign: "center", opacity: bannerEnabled ? 1 : 0.4 }}>
                {bannerText || "(sin texto)"}
              </div>
              {!bannerEnabled && (
                <div style={{ marginTop: "8px", fontSize: "12px", color: "#9ca3af" }}>El banner está desactivado y no se mostrará en el sitio.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      {deleteTarget && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTarget(null); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1100, padding: "20px",
          }}
        >
          <div style={{
            background: "#fff", borderRadius: "16px", width: "100%",
            maxWidth: "420px", boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}>
            {/* Franja roja superior */}
            <div style={{ background: "#fee2e2", padding: "20px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#fca5a5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#991b1b" }}>Eliminar promoción</div>
                <div style={{ fontSize: "13px", color: "#b91c1c", marginTop: "2px" }}>Esta acción no se puede deshacer</div>
              </div>
            </div>

            {/* Cuerpo */}
            <div style={{ padding: "20px 24px" }}>
              <p style={{ margin: "0 0 6px", fontSize: "14px", color: "#374151" }}>
                Estás por eliminar la promoción:
              </p>
              <p style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700, color: "#111" }}>
                "{deleteTarget.label}"
              </p>
              <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #e5e7eb", fontSize: "13px", color: "#6b7280" }}>
                {targetLabel(deleteTarget, catalogBooks)} · {formatDiscount(deleteTarget)} · <span style={{ ...{ display: "inline-flex", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, background: promoStatus(deleteTarget).bg, color: promoStatus(deleteTarget).text } }}>{promoStatus(deleteTarget).label}</span>
              </div>
            </div>

            {/* Acciones */}
            <div style={{ display: "flex", gap: "10px", padding: "0 24px 24px" }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "none", background: "#dc2626", color: "#fff", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal crear/editar */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "20px",
          }}
        >
          <div style={{
            background: "#fff", borderRadius: "16px", width: "100%",
            maxWidth: "520px", maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          }}>
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 24px 0" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#111" }}>
                {editing ? "Editar Promoción" : "Nueva Promoción"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: "20px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Nombre */}
              <div>
                <label style={labelStyle}>Nombre de la promoción</label>
                <input
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  placeholder="Ej: Día de la Madre — 20% OFF"
                  style={inputStyle}
                />
              </div>

              {/* Target type */}
              <div>
                <label style={labelStyle}>Aplicar a</label>
                <select
                  value={form.targetType}
                  onChange={(e) => { setForm((f) => ({ ...f, targetType: e.target.value as TargetType, targetId: "", targetIds: [] })); setConflictAccepted(false); }}
                  style={inputStyle}
                >
                  <option value="model">Un libro específico</option>
                  <option value="models">Varios libros específicos</option>
                  <option value="all">Todos los libros</option>
                </select>
              </div>

              {/* Un solo libro */}
              {form.targetType === "model" && (
                <div>
                  <label style={labelStyle}>Libro</label>
                  <select
                    value={form.targetId}
                    onChange={(e) => { setForm((f) => ({ ...f, targetId: e.target.value })); setConflictAccepted(false); }}
                    style={inputStyle}
                  >
                    <option value="">Seleccioná un libro</option>
                    {catalogBooks.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Múltiples libros */}
              {form.targetType === "models" && (
                <div>
                  <label style={labelStyle}>
                    Libros ({form.targetIds.length} seleccionados)
                  </label>
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", padding: "4px 0" }}>
                    {catalogBooks.map((b) => {
                      const checked = form.targetIds.includes(b.id);
                      return (
                        <label
                          key={b.id}
                          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", cursor: "pointer", background: checked ? "#f5f3ff" : "transparent" }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => { setConflictAccepted(false); setForm((f) => ({
                              ...f,
                              targetIds: checked
                                ? f.targetIds.filter(id => id !== b.id)
                                : [...f.targetIds, b.id],
                            })); }}
                            style={{ width: "16px", height: "16px", accentColor: "#7c3aed", cursor: "pointer" }}
                          />
                          <span style={{ fontSize: "14px", color: checked ? "#5b21b6" : "#111", fontWeight: checked ? 600 : 400 }}>
                            {b.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Aviso de conflictos */}
              {(() => {
                if (!conflicts.length) return null;
                if (conflictAccepted) {
                  return (
                    <div style={{ padding: "12px 16px", borderRadius: "10px", background: "#f0fdf4", border: "1px solid #86efac", display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#15803d" }}>
                        Confirmado — la promoción anterior será desactivada al guardar.
                      </span>
                    </div>
                  );
                }
                return (
                  <div style={{ padding: "14px 16px", borderRadius: "10px", background: "#fff7ed", border: "2px solid #fb923c" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#9a3412" }}>
                        {conflicts.length === 1 ? "Este libro ya tiene una promoción activa" : "Algunos libros ya tienen promociones activas"}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                      {conflicts.map(({ bookId, bookName, promo }) => (
                        <div key={bookId} style={{ fontSize: "12px", color: "#7c2d12", paddingLeft: "24px" }}>
                          <span style={{ fontWeight: 700 }}>{bookName}</span>
                          {" → "}<span style={{ fontStyle: "italic" }}>"{promo.label}"</span>
                          {" · "}{formatDiscount(promo)}
                        </div>
                      ))}
                    </div>
                    <div style={{ paddingLeft: "24px", fontSize: "12px", color: "#9a3412", marginBottom: "14px" }}>
                      Para continuar, confirmá que querés reemplazar {conflicts.length === 1 ? "esa promoción" : "esas promociones"}. La{conflicts.length === 1 ? "" : "s"} anterior{conflicts.length === 1 ? "" : "es"} quedará{conflicts.length === 1 ? "" : "n"} desactivada{conflicts.length === 1 ? "" : "s"}.
                    </div>
                    <button
                      onClick={() => setConflictAccepted(true)}
                      style={{
                        marginLeft: "24px", padding: "7px 16px", borderRadius: "8px",
                        border: "none", background: "#ea580c", color: "#fff",
                        fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      Sí, reemplazar la promoción anterior
                    </button>
                  </div>
                );
              })()}

              {/* Tipo de descuento */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Tipo de descuento</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm((f) => ({ ...f, discountType: e.target.value as DiscountType, discountValue: "" }))}
                    style={inputStyle}
                  >
                    <option value="percent">Porcentaje (%)</option>
                    <option value="fixed_cents">Monto fijo (S/)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>
                    {form.discountType === "percent" ? "Descuento (%)" : "Monto (en centavos)"}
                  </label>
                  <input
                    type="number"
                    value={form.discountValue}
                    onChange={(e) => setForm((f) => ({ ...f, discountValue: e.target.value }))}
                    placeholder={form.discountType === "percent" ? "Ej: 20" : "Ej: 2000 = S/20"}
                    min={1}
                    max={form.discountType === "percent" ? 100 : undefined}
                    style={inputStyle}
                  />
                </div>
              </div>

              {form.discountType === "fixed_cents" && form.discountValue && (
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "-8px" }}>
                  Equivale a S/ {(Number(form.discountValue) / 100).toFixed(2)}
                </div>
              )}

              {/* Fechas */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Válida desde</label>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                      id="input-valid-from"
                      type="datetime-local"
                      value={form.validFrom}
                      onChange={(e) => setForm((f) => ({ ...f, validFrom: e.target.value }))}
                      style={{ ...inputStyle, flex: 1, width: "auto", minWidth: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("input-valid-from") as HTMLInputElement)?.blur()}
                      style={{ padding: "0 12px", height: "40px", borderRadius: "8px", border: "1px solid #d1d5db", background: form.validFrom ? "#111" : "#f3f4f6", color: form.validFrom ? "#fff" : "#9ca3af", fontSize: "13px", fontWeight: 700, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}
                    >
                      OK
                    </button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Válida hasta</label>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                      id="input-valid-until"
                      type="datetime-local"
                      value={form.validUntil}
                      onChange={(e) => setForm((f) => ({ ...f, validUntil: e.target.value }))}
                      style={{ ...inputStyle, flex: 1, width: "auto", minWidth: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("input-valid-until") as HTMLInputElement)?.blur()}
                      style={{ padding: "0 12px", height: "40px", borderRadius: "8px", border: "1px solid #d1d5db", background: form.validUntil ? "#111" : "#f3f4f6", color: form.validUntil ? "#fff" : "#9ca3af", fontSize: "13px", fontWeight: 700, cursor: "pointer", flexShrink: 0, fontFamily: "inherit" }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>

              {/* Activa */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                  style={{
                    padding: "6px 16px", borderRadius: "8px", border: "none",
                    background: form.isActive ? "#22c55e" : "#e5e7eb",
                    color: form.isActive ? "#fff" : "#6b7280",
                    fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {form.isActive ? "Activa" : "Inactiva"}
                </button>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                  {form.isActive ? "Se aplicará dentro del rango de fechas" : "No se mostrará aunque esté en fechas"}
                </span>
              </div>

              {error && (
                <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#fee2e2", color: "#991b1b", fontSize: "13px", fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {/* Acciones */}
              <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1, padding: "11px", borderRadius: "10px", border: "1px solid #e5e7eb",
                    background: "#fff", color: "#374151", fontSize: "14px",
                    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || (conflicts.length > 0 && !conflictAccepted)}
                  style={{
                    flex: 2, padding: "11px", borderRadius: "10px", border: "none",
                    background: (conflicts.length > 0 && !conflictAccepted) ? "#9ca3af" : "#111",
                    color: "#fff", fontSize: "14px",
                    fontWeight: 700, cursor: (conflicts.length > 0 && !conflictAccepted) ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear Promoción"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "13px", fontWeight: 600,
  color: "#374151", marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px", borderRadius: "8px",
  border: "1px solid #e5e7eb", fontSize: "14px",
  fontFamily: "inherit", boxSizing: "border-box",
  background: "#fff", color: "#111",
};
