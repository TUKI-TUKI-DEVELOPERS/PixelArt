"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Order = { id: number; channel: string; status: string; customerFullName: string; customerEmail: string; totalAmountCents: number; createdAt: string };

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e", label: "Esperando Pago" },
  UNDER_PAYMENT_REVIEW: { bg: "#dbeafe", text: "#1e40af", label: "Revisando Pago" },
  PAYMENT_VERIFIED: { bg: "#d1fae5", text: "#065f46", label: "Pago Verificado" },
  IN_PRODUCTION: { bg: "#ede9fe", text: "#5b21b6", label: "En Producción" },
  SHIPPED: { bg: "#e0e7ff", text: "#3730a3", label: "Enviado" },
  DELIVERED: { bg: "#d1fae5", text: "#065f46", label: "Entregado" },
  CANCELLED: { bg: "#fee2e2", text: "#991b1b", label: "Cancelada" },
  REJECTED: { bg: "#fee2e2", text: "#991b1b", label: "Rechazada" },
};

export default function OrdenesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/orders`).then((r) => r.json()).then(setOrders).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Órdenes</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Todas las órdenes del sistema</p>
      </div>

      {loading ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>Cargando...</div>
      ) : orders.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>No hay órdenes aún.</div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["#", "Cliente", "Tipo", "Total", "Estado", "Fecha", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const st = STATUS_MAP[o.status] ?? { bg: "#f3f4f6", text: "#374151", label: o.status };
                return (
                  <tr key={o.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
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
                    <td style={{ padding: "14px 16px", fontSize: "12px", color: "#9ca3af" }}>{new Date(o.createdAt).toLocaleDateString("es-PE")}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Link href={`/admin/ordenes/${o.id}`} style={{ fontSize: "13px", fontWeight: 600, color: "#3b82f6", textDecoration: "none" }}>Ver</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
