"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Order = {
  id: number;
  channel: string;
  status: string;
  customerFullName: string;
  totalAmountCents: number;
  createdAt: string;
};

type DemoRequest = {
  id: number;
  customerFullName: string;
  status: string;
  createdAt: string;
};

type FeedbackRecord = {
  id: number;
  stars: number;
};

const INACTIVE_STATUSES = ["DELIVERED", "CANCELLED", "REJECTED"];

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e",  label: "Esperando Pago"   },
  UNDER_PAYMENT_REVIEW:   { bg: "#dbeafe", text: "#1e40af",  label: "Revisando Pago"   },
  PAYMENT_VERIFIED:       { bg: "#d1fae5", text: "#065f46",  label: "Pago Verificado"  },
  IN_PRODUCTION:          { bg: "#ede9fe", text: "#5b21b6",  label: "En Producción"    },
  SHIPPED:                { bg: "#e0e7ff", text: "#3730a3",  label: "Enviado"           },
  DELIVERED:              { bg: "#d1fae5", text: "#065f46",  label: "Entregado"         },
  CANCELLED:              { bg: "#fee2e2", text: "#991b1b",  label: "Cancelada"         },
  REJECTED:               { bg: "#fee2e2", text: "#991b1b",  label: "Rechazada"         },
};

function formatPrice(cents: number) {
  return `S/ ${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

function timeAgo(iso: string): { text: string; color: string } {
  const ms   = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days === 0) return { text: "Hoy",         color: "#22c55e" };
  if (days === 1) return { text: "Ayer",         color: "#6b7280" };
  if (days <= 3)  return { text: `${days} días`, color: "#f59e0b" };
  return             { text: `${days} días`, color: "#ef4444" };
}

export default function DashboardPage() {
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [demos,    setDemos]    = useState<DemoRequest[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/orders`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/admin/demo/requests`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/admin/feedback`).then((r) => r.json()).catch(() => []),
    ]).then(([ordersData, demosData, feedbackData]) => {
      setOrders(Array.isArray(ordersData) ? ordersData : ordersData.data ?? []);
      setDemos(Array.isArray(demosData) ? demosData : demosData.data ?? []);
      setFeedback(Array.isArray(feedbackData) ? feedbackData : feedbackData.data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  // KPIs
  const pendingRequests = demos.filter((d) => d.status === "RECEIVED").length;
  const activeOrders    = orders.filter((o) => !INACTIVE_STATUSES.includes(o.status)).length;
  const pendingPayments = orders.filter((o) => o.status === "UNDER_PAYMENT_REVIEW");
  const pendingPayAmt   = pendingPayments.reduce((sum, o) => sum + o.totalAmountCents, 0);
  const avgRating       = feedback.length
    ? (feedback.reduce((sum, f) => sum + f.stars, 0) / feedback.length).toFixed(1)
    : "—";

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  // Panel "Requiere tu atención" — pagos primero (más urgentes), luego demos sin propuesta
  type AttentionItem =
    | { kind: "payment"; order: Order }
    | { kind: "demo";    demo: DemoRequest };

  const attentionItems: AttentionItem[] = [
    ...orders
      .filter((o) => o.status === "UNDER_PAYMENT_REVIEW")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((o): AttentionItem => ({ kind: "payment", order: o })),
    ...demos
      .filter((d) => d.status === "RECEIVED")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((d): AttentionItem => ({ kind: "demo", demo: d })),
  ];

  const STATS = [
    { label: "Solicitudes Pendientes", value: loading ? "…" : String(pendingRequests),       change: "Por generar propuesta",                                                                              color: "#3b82f6" },
    { label: "Órdenes Activas",        value: loading ? "…" : String(activeOrders),           change: "En curso",                                                                                          color: "#8b5cf6" },
    { label: "Pagos por Revisar",      value: loading ? "…" : String(pendingPayments.length), change: loading ? "" : pendingPayAmt > 0 ? formatPrice(pendingPayAmt) : "Sin montos pendientes",             color: "#f59e0b" },
    { label: "Feedback Promedio",      value: loading ? "…" : String(avgRating),              change: loading ? "" : feedback.length > 0 ? `${feedback.length} reseñas` : "Sin reseñas aún",             color: "#22c55e" },
  ];

  const KPI_ICONS = [
    /* Solicitudes */ (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
    ),
    /* Órdenes Activas */ (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    /* Pagos */ (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    /* Feedback */ (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  ];

  return (
    <div style={{ padding: "32px" }}>
      <style>{`@keyframes sk-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "16px", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: stat.color, borderRadius: "12px 0 0 12px" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#9ca3af", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.4px" }}>{stat.label}</div>
              <div style={{ fontSize: "30px", fontWeight: 800, color: "#111", lineHeight: 1, marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: stat.color, fontWeight: 600 }}>{stat.change}</div>
            </div>
            <div style={{ color: stat.color, opacity: 0.25, flexShrink: 0, marginTop: "2px" }}>{KPI_ICONS[i]}</div>
          </div>
        ))}
      </div>

      {/* Requiere tu atención — horizontal strip */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#111" }}>Requiere tu atención</h2>
          {!loading && attentionItems.length > 0 && (
            <span style={{ background: "#ef4444", color: "#fff", fontSize: "11px", fontWeight: 700, borderRadius: "999px", padding: "1px 7px" }}>
              {attentionItems.length}
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ display: "flex", gap: "12px" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ minWidth: "240px", height: "88px", borderRadius: "10px", background: "#f3f4f6", animation: "sk-pulse 1.4s ease-in-out infinite", flexShrink: 0 }} />
            ))}
          </div>
        ) : attentionItems.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "18px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#22c55e" }}>Todo al día</div>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>Sin acciones pendientes</div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
            {attentionItems.map((item) => {
              if (item.kind === "payment") {
                const age = timeAgo(item.order.createdAt);
                return (
                  <div key={`pay-${item.order.id}`} style={{ minWidth: "240px", maxWidth: "280px", flexShrink: 0, borderRadius: "10px", border: "1px solid #fecaca", background: "#fff5f5", overflow: "hidden", display: "flex" }}>
                    <div style={{ width: "4px", background: "#ef4444", flexShrink: 0 }} />
                    <div style={{ padding: "14px 16px", flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px", gap: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.order.customerFullName}</span>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: age.color, flexShrink: 0 }}>{age.text}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>Pago por verificar — {formatPrice(item.order.totalAmountCents)}</div>
                      <Link href={`/admin/ordenes/${item.order.id}`} style={{ fontSize: "12px", fontWeight: 700, color: "#ef4444", textDecoration: "none" }}>Revisar →</Link>
                    </div>
                  </div>
                );
              }
              const age = timeAgo(item.demo.createdAt);
              return (
                <div key={`demo-${item.demo.id}`} style={{ minWidth: "240px", maxWidth: "280px", flexShrink: 0, borderRadius: "10px", border: "1px solid #bfdbfe", background: "#eff6ff", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: "4px", background: "#3b82f6", flexShrink: 0 }} />
                  <div style={{ padding: "14px 16px", flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px", gap: "8px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.demo.customerFullName}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: age.color, flexShrink: 0 }}>{age.text}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>Solicitud sin propuesta enviada</div>
                    <Link href={`/admin/libros-personalizados/solicitudes/${item.demo.id}`} style={{ fontSize: "12px", fontWeight: 700, color: "#3b82f6", textDecoration: "none" }}>Ver solicitud →</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Órdenes Recientes — full width */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#111" }}>Órdenes Recientes</h2>
          <Link href="/admin/ordenes" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>Ver todas →</Link>
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ height: "44px", borderRadius: "8px", background: "#f3f4f6", animation: "sk-pulse 1.4s ease-in-out infinite" }} />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", fontSize: "14px" }}>No hay órdenes aún</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["#", "Cliente", "Tipo", "Monto", "Estado", "Espera"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: "11px", fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #f3f4f6", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const status = STATUS_MAP[order.status] ?? { bg: "#f3f4f6", text: "#374151", label: order.status };
                const age    = timeAgo(order.createdAt);
                return (
                  <tr key={order.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td style={{ padding: "11px 12px", fontSize: "13px", fontWeight: 600, color: "#111" }}>
                      <Link href={`/admin/ordenes/${order.id}`} style={{ color: "#111", textDecoration: "none" }}>#{order.id}</Link>
                    </td>
                    <td style={{ padding: "11px 12px", fontSize: "13px", color: "#374151", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.customerFullName}</td>
                    <td style={{ padding: "11px 12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "5px", background: order.channel === "CUSTOM_BOOK" ? "#fef3c7" : "#dbeafe", color: order.channel === "CUSTOM_BOOK" ? "#92400e" : "#1e40af" }}>
                        {order.channel === "CUSTOM_BOOK" ? "Libro" : "Photo"}
                      </span>
                    </td>
                    <td style={{ padding: "11px 12px", fontSize: "13px", color: "#374151", fontWeight: 500 }}>{formatPrice(order.totalAmountCents)}</td>
                    <td style={{ padding: "11px 12px" }}>
                      <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "5px", background: status.bg, color: status.text, fontSize: "11px", fontWeight: 600 }}>{status.label}</span>
                    </td>
                    <td style={{ padding: "11px 12px", fontSize: "12px", fontWeight: 600, color: age.color }}>{age.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
