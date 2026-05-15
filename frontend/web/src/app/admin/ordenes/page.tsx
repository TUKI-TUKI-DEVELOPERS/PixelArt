"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Order = { id: number; channel: string; status: string; customerFullName: string; customerEmail: string; totalAmountCents: number; createdAt: string };

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e", label: "Esperando Pago" },
  UNDER_PAYMENT_REVIEW:   { bg: "#dbeafe", text: "#1e40af", label: "Revisando Pago" },
  PAYMENT_VERIFIED:       { bg: "#d1fae5", text: "#065f46", label: "Pago Verificado" },
  IN_PRODUCTION:          { bg: "#ede9fe", text: "#5b21b6", label: "En Producción"   },
  SHIPPED:                { bg: "#e0e7ff", text: "#3730a3", label: "Enviado"          },
  DELIVERED:              { bg: "#d1fae5", text: "#065f46", label: "Entregado"        },
  CANCELLED:              { bg: "#fee2e2", text: "#991b1b", label: "Cancelada"        },
  REJECTED:               { bg: "#fee2e2", text: "#991b1b", label: "Rechazada"        },
};

const NEXT_STATUS: Record<string, string> = {
  PAYMENT_VERIFIED: "IN_PRODUCTION",
  IN_PRODUCTION:    "SHIPPED",
  SHIPPED:          "DELIVERED",
};

const KANBAN_COLUMNS = [
  { status: "AWAITING_PAYMENT_PROOF", label: "Esperando Pago", accent: "#f59e0b", dim: "#fef9ee" },
  { status: "UNDER_PAYMENT_REVIEW",   label: "Revisando Pago", accent: "#3b82f6", dim: "#eff6ff" },
  { status: "PAYMENT_VERIFIED",       label: "Pago Verificado", accent: "#22c55e", dim: "#f0fdf4" },
  { status: "IN_PRODUCTION",          label: "En Producción",  accent: "#8b5cf6", dim: "#f5f3ff" },
  { status: "SHIPPED",                label: "Enviado",         accent: "#6366f1", dim: "#eef2ff" },
  { status: "DELIVERED",              label: "Entregado",       accent: "#10b981", dim: "#f0fdf4" },
];

const ACTION_STATUSES = ["AWAITING_PAYMENT_PROOF", "UNDER_PAYMENT_REVIEW"];
const ACTIVE_STATUSES = ["PAYMENT_VERIFIED", "IN_PRODUCTION", "SHIPPED"];
const DONE_STATUSES   = ["DELIVERED", "CANCELLED", "REJECTED"];

type FilterKey = "all" | "action" | "active" | "done";
type ViewKey   = "table" | "kanban";

const FILTERS: { key: FilterKey; label: string; statuses?: string[] }[] = [
  { key: "all",    label: "Todas"             },
  { key: "action", label: "Acción requerida", statuses: ACTION_STATUSES },
  { key: "active", label: "En curso",         statuses: ACTIVE_STATUSES },
  { key: "done",   label: "Finalizadas",      statuses: DONE_STATUSES   },
];

function timeAgo(iso: string): { text: string; color: string } {
  const ms   = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days === 0) return { text: "Hoy",         color: "#22c55e" };
  if (days === 1) return { text: "Ayer",         color: "#6b7280" };
  if (days <= 3)  return { text: `${days} días`, color: "#f59e0b" };
  return             { text: `${days} días`, color: "#ef4444" };
}

// ─── Kanban Card ────────────────────────────────────────────────────────────
function KanbanCard({ o, acting, onApprove, onReject, onAdvance }: {
  o: Order;
  acting: number | null;
  onApprove: (id: number) => void;
  onReject:  (id: number) => void;
  onAdvance: (id: number, next: string) => void;
}) {
  const isActing  = acting === o.id;
  const nextSt    = NEXT_STATUS[o.status];
  const nextLabel = nextSt ? (STATUS_MAP[nextSt]?.label ?? nextSt) : null;
  const age       = timeAgo(o.createdAt);

  return (
    <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", padding: "12px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af" }}>#{o.id}</span>
        <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: o.channel === "CUSTOM_BOOK" ? "#fef3c7" : "#ede9fe", color: o.channel === "CUSTOM_BOOK" ? "#92400e" : "#5b21b6" }}>
          {o.channel === "CUSTOM_BOOK" ? "Custom" : "Photo"}
        </span>
      </div>

      {/* Cliente */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#111", lineHeight: 1.3 }}>{o.customerFullName}</div>
        <div style={{ fontSize: "11px", color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.customerEmail}</div>
      </div>

      {/* Monto + tiempo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>S/ {(o.totalAmountCents / 100).toFixed(2)}</span>
        <span style={{ fontSize: "11px", fontWeight: 600, color: age.color }}>{age.text}</span>
      </div>

      {/* Acciones */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", paddingTop: "4px", borderTop: "1px solid #f3f4f6" }}>
        {o.status === "UNDER_PAYMENT_REVIEW" && (
          <>
            <button disabled={isActing} onClick={() => onApprove(o.id)}
              style={{ flex: 1, padding: "5px 0", borderRadius: "6px", border: "none", background: isActing ? "#d1fae5" : "#22c55e", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: isActing ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isActing ? 0.6 : 1 }}>
              {isActing ? "…" : "✓ Aprobar"}
            </button>
            <button disabled={isActing} onClick={() => onReject(o.id)}
              style={{ padding: "5px 8px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#ef4444", fontSize: "11px", fontWeight: 700, cursor: isActing ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isActing ? 0.6 : 1 }}>
              ✕
            </button>
          </>
        )}
        {nextLabel && o.status !== "UNDER_PAYMENT_REVIEW" && (
          <button disabled={isActing} onClick={() => onAdvance(o.id, nextSt!)}
            style={{ flex: 1, padding: "5px 0", borderRadius: "6px", border: "none", background: isActing ? "#dbeafe" : "#3b82f6", color: "#fff", fontSize: "11px", fontWeight: 700, cursor: isActing ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isActing ? 0.6 : 1, whiteSpace: "nowrap" }}>
            {isActing ? "…" : `→ ${nextLabel}`}
          </button>
        )}
        <Link href={`/admin/ordenes/${o.id}`}
          style={{ padding: "5px 8px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: "11px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          Ver
        </Link>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function OrdenesPage() {
  const [orders,  setOrders]  = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState<FilterKey>("all");
  const [view,    setView]    = useState<ViewKey>("table");
  const [acting,  setActing]  = useState<number | null>(null);

  function loadOrders() {
    fetch(`${API}/api/admin/orders`)
      .then((r) => r.json())
      .then((data) => setOrders(Array.isArray(data) ? data : data.data ?? []))
      .catch(() => {});
  }

  useEffect(() => { loadOrders(); setLoading(false); }, []);

  async function reviewPayment(orderId: number, action: "APPROVE" | "REJECT") {
    setActing(orderId);
    try {
      const res = await fetch(`${API}/api/admin/orders/${orderId}/review-payment`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, rejectionReason: action === "REJECT" ? "Voucher no válido" : undefined }),
      });
      if (!res.ok) throw new Error();
      loadOrders();
    } catch { alert("Error al procesar el pago. Revisá el detalle de la orden."); }
    finally { setActing(null); }
  }

  async function advanceStatus(orderId: number, nextStatus: string) {
    setActing(orderId);
    try {
      const res = await fetch(`${API}/api/admin/orders/${orderId}/advance-status`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newStatus: nextStatus }),
      });
      if (!res.ok) throw new Error();
      loadOrders();
    } catch { alert("Error al avanzar el estado."); }
    finally { setActing(null); }
  }

  const filtered = filter === "all"
    ? orders
    : orders.filter((o) => FILTERS.find((f) => f.key === filter)?.statuses?.includes(o.status));

  const counts: Record<FilterKey, number> = {
    all:    orders.length,
    action: orders.filter((o) => ACTION_STATUSES.includes(o.status)).length,
    active: orders.filter((o) => ACTIVE_STATUSES.includes(o.status)).length,
    done:   orders.filter((o) => DONE_STATUSES.includes(o.status)).length,
  };

  const TH: React.CSSProperties = { textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" };

  return (
    <div style={{ padding: "32px" }}>
      <style>{`@keyframes sk-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Órdenes</h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Todas las órdenes del sistema</p>
        </div>
        {/* Toggle vista */}
        {!loading && (
          <div style={{ display: "flex", borderRadius: "8px", border: "1px solid #e5e7eb", overflow: "hidden", background: "#fff" }}>
            {(["table", "kanban"] as ViewKey[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding: "8px 14px", border: "none", background: view === v ? "#111" : "#fff", color: view === v ? "#fff" : "#6b7280", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                {v === "table" ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                    Tabla
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="18" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>
                    Kanban
                  </>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtros — solo en vista tabla */}
      {!loading && view === "table" && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            const isUrgent = f.key === "action" && counts.action > 0;
            return (
              <button key={f.key} onClick={() => setFilter(f.key)}
                style={{ padding: "7px 16px", borderRadius: "8px", border: isActive ? "none" : "1px solid #e5e7eb", background: isActive ? "#111" : "#fff", color: isActive ? "#fff" : "#374151", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                {f.label}
                <span style={{ background: isActive ? "rgba(255,255,255,0.2)" : isUrgent ? "#ef4444" : "#f3f4f6", color: isActive ? "#fff" : isUrgent ? "#fff" : "#6b7280", fontSize: "11px", fontWeight: 700, borderRadius: "999px", padding: "1px 6px", minWidth: "18px", textAlign: "center" }}>
                  {counts[f.key]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ─── Vista Tabla ─────────────────────────────────────────────────── */}
      {view === "table" && (
        loading ? (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#f9fafb" }}>{["#", "Cliente", "Tipo", "Total", "Estado", "Espera", "Acción"].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {[40, 140, 55, 65, 90, 60, 120].map((w, j) => (
                      <td key={j} style={{ padding: "14px 16px" }}>
                        <div style={{ height: 13, width: w, borderRadius: 4, background: "#f0f0f0", animation: "sk-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.05}s` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#999", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            No hay órdenes en esta categoría.
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#f9fafb" }}>{["#", "Cliente", "Tipo", "Total", "Estado", "Espera", "Acción"].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map((o) => {
                  const st        = STATUS_MAP[o.status] ?? { bg: "#f3f4f6", text: "#374151", label: o.status };
                  const age       = timeAgo(o.createdAt);
                  const isActing  = acting === o.id;
                  const nextSt    = NEXT_STATUS[o.status];
                  const nextLabel = nextSt ? (STATUS_MAP[nextSt]?.label ?? nextSt) : null;
                  return (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f3f4f6", background: o.status === "UNDER_PAYMENT_REVIEW" ? "#fefce8" : "transparent" }}>
                      <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600 }}>{o.id}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{o.customerFullName}</div>
                        <div style={{ fontSize: "12px", color: "#9ca3af" }}>{o.customerEmail}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px", background: o.channel === "CUSTOM_BOOK" ? "#fef3c7" : "#ede9fe", color: o.channel === "CUSTOM_BOOK" ? "#92400e" : "#5b21b6" }}>
                          {o.channel === "CUSTOM_BOOK" ? "Custom" : "Photo"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600 }}>S/ {(o.totalAmountCents / 100).toFixed(2)}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "11px", fontWeight: 600 }}>{st.label}</span>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "12px", fontWeight: 600, color: age.color }}>{age.text}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          {o.status === "UNDER_PAYMENT_REVIEW" && (
                            <>
                              <button disabled={isActing} onClick={() => reviewPayment(o.id, "APPROVE")}
                                style={{ padding: "5px 10px", borderRadius: "6px", border: "none", background: isActing ? "#d1fae5" : "#22c55e", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: isActing ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isActing ? 0.6 : 1 }}>
                                {isActing ? "…" : "✓ Aprobar"}
                              </button>
                              <button disabled={isActing} onClick={() => reviewPayment(o.id, "REJECT")}
                                style={{ padding: "5px 10px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fff", color: "#ef4444", fontSize: "12px", fontWeight: 700, cursor: isActing ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isActing ? 0.6 : 1 }}>
                                ✕
                              </button>
                            </>
                          )}
                          {nextLabel && o.status !== "UNDER_PAYMENT_REVIEW" && (
                            <button disabled={isActing} onClick={() => advanceStatus(o.id, nextSt!)}
                              style={{ padding: "5px 10px", borderRadius: "6px", border: "none", background: isActing ? "#dbeafe" : "#3b82f6", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: isActing ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isActing ? 0.6 : 1, whiteSpace: "nowrap" }}>
                              {isActing ? "…" : `→ ${nextLabel}`}
                            </button>
                          )}
                          <Link href={`/admin/ordenes/${o.id}`}
                            style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", textDecoration: "none", padding: "5px 8px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", whiteSpace: "nowrap" }}>
                            Ver
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* ─── Vista Kanban ─────────────────────────────────────────────────── */}
      {view === "kanban" && (
        loading ? (
          <div style={{ display: "flex", gap: "16px" }}>
            {KANBAN_COLUMNS.map((col) => (
              <div key={col.status} style={{ minWidth: "220px", background: "#f9fafb", borderRadius: "12px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ height: "20px", width: "120px", borderRadius: "4px", background: "#e5e7eb", animation: "sk-pulse 1.4s ease-in-out infinite" }} />
                {[1, 2].map((i) => <div key={i} style={{ height: "110px", borderRadius: "10px", background: "#e5e7eb", animation: "sk-pulse 1.4s ease-in-out infinite" }} />)}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto", paddingBottom: "16px" }}>
            <div style={{ display: "flex", gap: "14px", minWidth: "max-content", alignItems: "flex-start" }}>
              {KANBAN_COLUMNS.map((col) => {
                const colOrders = orders.filter((o) => o.status === col.status);
                return (
                  <div key={col.status} style={{ width: "232px", flexShrink: 0, background: col.dim, borderRadius: "12px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {/* Column header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: col.accent, flexShrink: 0 }} />
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>{col.label}</span>
                      </div>
                      <span style={{ background: colOrders.length > 0 ? col.accent : "#e5e7eb", color: colOrders.length > 0 ? "#fff" : "#9ca3af", fontSize: "11px", fontWeight: 700, borderRadius: "999px", padding: "1px 7px", minWidth: "20px", textAlign: "center" }}>
                        {colOrders.length}
                      </span>
                    </div>

                    {/* Cards */}
                    {colOrders.length === 0 ? (
                      <div style={{ padding: "24px 0", textAlign: "center", fontSize: "12px", color: "#d1d5db" }}>Sin órdenes</div>
                    ) : (
                      colOrders.map((o) => (
                        <KanbanCard
                          key={o.id}
                          o={o}
                          acting={acting}
                          onApprove={(id) => reviewPayment(id, "APPROVE")}
                          onReject={(id)  => reviewPayment(id, "REJECT")}
                          onAdvance={(id, next) => advanceStatus(id, next)}
                        />
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
}
