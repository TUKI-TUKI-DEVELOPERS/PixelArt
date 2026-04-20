"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type DemoRequest = {
  id: number;
  customerFullName: string;
  customerEmail: string;
  personalizedModelId: number;
  catalogBookVariantId: number;
  wantsCustomDedication: boolean;
  status: string;
  createdAt: string;
};

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  RECEIVED: { bg: "#dbeafe", text: "#1e40af", label: "Recibida" },
  PROPOSALS_SENT: { bg: "#d1fae5", text: "#065f46", label: "Propuestas Enviadas" },
  CANCELLED: { bg: "#fee2e2", text: "#991b1b", label: "Cancelada" },
};

export default function SolicitudesPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/demo/requests`)
      .then((r) => r.json())
      .then(setRequests)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Solicitudes Demo</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Solicitudes de libros personalizados pendientes de generar propuestas</p>
      </div>

      {loading ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>Cargando...</div>
      ) : requests.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>No hay solicitudes aún.</div>
      ) : (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["#", "Cliente", "Email", "Dedicatoria", "Estado", "Fecha", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                const st = STATUS_MAP[req.status] ?? { bg: "#f3f4f6", text: "#374151", label: req.status };
                return (
                  <tr key={req.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600, color: "#111" }}>{req.id}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600, color: "#111" }}>{req.customerFullName}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280" }}>{req.customerEmail}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: req.wantsCustomDedication ? "#22c55e" : "#9ca3af" }}>{req.wantsCustomDedication ? "Sí" : "No"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", background: st.bg, color: st.text, fontSize: "11px", fontWeight: 600 }}>{st.label}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", color: "#9ca3af" }}>{new Date(req.createdAt).toLocaleDateString("es-PE")}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <Link href={`/admin/libros-personalizados/solicitudes/${req.id}`} style={{ fontSize: "13px", fontWeight: 600, color: "#3b82f6", textDecoration: "none" }}>Ver detalle</Link>
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
