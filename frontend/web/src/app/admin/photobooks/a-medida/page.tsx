"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CustomRequest = {
  id: number;
  status: string;
  occasion: string;
  requestedTheme: string;
  coverTitle: string | null;
  coverMode: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  referenceAssetIds: number[];
  createdAt: string;
};

const STATUS: Record<string, { label: string; background: string; color: string }> = {
  PENDING_REVIEW: { label: "Por revisar", background: "#fff7ed", color: "#9a3412" },
  DESIGN_IN_PROGRESS: { label: "Diseño en curso", background: "#eff6ff", color: "#1d4ed8" },
  AWAITING_CUSTOMER: { label: "Esperando cliente", background: "#fefce8", color: "#854d0e" },
  CHANGES_REQUESTED: { label: "Ajustes solicitados", background: "#fff1f2", color: "#9f1239" },
  EDITOR_READY: { label: "Editor listo", background: "#ecfdf5", color: "#047857" },
  EDITOR_IN_PROGRESS: { label: "Editando interior", background: "#eef2ff", color: "#4338ca" },
  AWAITING_PAYMENT: { label: "Pendiente de pago", background: "#fef3c7", color: "#92400e" },
  READY_FOR_PRODUCTION: { label: "Listo para producción", background: "#f0fdf4", color: "#166534" },
  CLOSED: { label: "Cerrada", background: "#f3f4f6", color: "#4b5563" },
};

const COVER_MODE: Record<string, string> = {
  PIXELART_DESIGNED: "Diseño por PixelArt",
  CUSTOMER_ARTWORK: "Arte propio",
  PHOTO_BASED: "Tapa con fotos",
};

export default function CustomPhotobookRequestsPage() {
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin-api/photobook/custom-requests")
      .then((response) => response.ok ? response.json() : [])
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", marginBottom: "28px" }}>
        <div>
          <p style={{ margin: "0 0 8px", color: "#2d8fd5", fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Photobooks</p>
          <h1 style={{ margin: 0, color: "#111", fontSize: "30px", fontWeight: 800, letterSpacing: "-0.03em" }}>Solicitudes a medida</h1>
          <p style={{ margin: "8px 0 0", color: "#666", fontSize: "14px" }}>Ideas que requieren tapa y contratapa fuera del catálogo.</p>
        </div>
        {!loading && <span style={{ color: "#666", fontSize: "13px", fontWeight: 700 }}>{requests.length} solicitud{requests.length === 1 ? "" : "es"}</span>}
      </div>

      <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: "12px", background: "#fff" }}>
        <table style={{ width: "100%", minWidth: "780px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              {["Solicitud", "Cliente", "Idea", "Cubierta", "Estado", "Fecha", ""].map((heading) => (
                <th key={heading} style={{ padding: "13px 16px", borderBottom: "1px solid #e5e7eb", color: "#666", fontSize: "11px", fontWeight: 800, letterSpacing: "0.06em", textAlign: "left", textTransform: "uppercase" }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f1f1f1" }}>
                {Array.from({ length: 7 }).map((__, cell) => <td key={cell} style={{ padding: "16px" }}><span style={{ display: "block", width: cell === 2 ? "170px" : "80px", height: "12px", borderRadius: "4px", background: "#f0f0f0" }} /></td>)}
              </tr>
            ))}
            {!loading && requests.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "56px 24px", color: "#777", fontSize: "14px", textAlign: "center" }}>Aún no hay solicitudes de photobook a medida.</td></tr>
            )}
            {!loading && requests.map((request) => {
              const status = STATUS[request.status] ?? { label: request.status, background: "#f3f4f6", color: "#4b5563" };
              return (
                <tr key={request.id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={{ padding: "16px", color: "#111", fontSize: "13px", fontWeight: 800 }}>#{request.id}</td>
                  <td style={{ padding: "16px" }}><div style={{ color: "#111", fontSize: "13px", fontWeight: 700 }}>{request.customerFullName}</div><div style={{ marginTop: "3px", color: "#777", fontSize: "12px" }}>{request.customerEmail}</div></td>
                  <td style={{ padding: "16px" }}><div style={{ color: "#111", fontSize: "13px", fontWeight: 700 }}>{request.requestedTheme}</div><div style={{ marginTop: "3px", color: "#777", fontSize: "12px" }}>{request.occasion}</div></td>
                  <td style={{ padding: "16px", color: "#555", fontSize: "13px" }}>{COVER_MODE[request.coverMode] ?? request.coverMode}</td>
                  <td style={{ padding: "16px" }}><span style={{ display: "inline-flex", padding: "5px 9px", borderRadius: "999px", background: status.background, color: status.color, fontSize: "11px", fontWeight: 800 }}>{status.label}</span></td>
                  <td style={{ padding: "16px", color: "#777", fontSize: "12px" }}>{new Date(request.createdAt).toLocaleDateString("es-PE")}</td>
                  <td style={{ padding: "16px" }}><Link href={`/admin/photobooks/a-medida/${request.id}`} style={{ color: "#176fae", fontSize: "13px", fontWeight: 800, textDecoration: "none" }}>Revisar →</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
