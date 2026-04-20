"use client";

import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type FeedbackItem = { id: number; orderId: number; stars: number; ratingX2: number; comment: string | null; redirectedToGoogle: boolean; createdAt: string };

export default function FeedbackAdminPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/feedback`).then((r) => r.json()).then(setItems).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const avgRating = items.length > 0 ? items.reduce((s, f) => s + f.stars, 0) / items.length : 0;
  const highRatings = items.filter((f) => f.stars >= 4.5);
  const lowRatings = items.filter((f) => f.stars < 4.5);

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Feedback</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Rating ≥4.5 redirige a Google, &lt;4.5 queda aquí para mejorar</p>
      </div>

      {loading ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>Cargando...</div>
      ) : items.length === 0 ? (
        <div style={{ padding: "48px", textAlign: "center", color: "#999" }}>No hay feedbacks aún.</div>
      ) : (
        <>
          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#111" }}>{avgRating.toFixed(1)}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>Promedio General</div>
            </div>
            <div style={{ background: "#d1fae5", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>{highRatings.length}</div>
              <div style={{ fontSize: "13px", color: "#065f46" }}>Redirigidos a Google (≥4.5)</div>
            </div>
            <div style={{ background: "#fef3c7", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#92400e" }}>{lowRatings.length}</div>
              <div style={{ fontSize: "13px", color: "#92400e" }}>Para mejorar (&lt;4.5)</div>
            </div>
          </div>

          {/* Low ratings alert */}
          {lowRatings.length > 0 && (
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #fde68a", padding: "24px", marginBottom: "24px" }}>
              <h2 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "#92400e" }}>Requieren Atención</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {lowRatings.map((f) => (
                  <div key={f.id} style={{ padding: "14px", borderRadius: "10px", background: "#fffbeb", border: "1px solid #fde68a" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>Orden #{f.orderId}</span>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "#92400e" }}>{f.stars} / 5</span>
                    </div>
                    {f.comment && <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{f.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All feedback table */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {["Orden", "Rating", "Comentario", "Google", "Fecha"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((f) => (
                  <tr key={f.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 600 }}>#{f.orderId}</td>
                    <td style={{ padding: "14px 16px", fontSize: "15px", fontWeight: 700, color: f.stars >= 4.5 ? "#22c55e" : "#f59e0b" }}>{f.stars}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#6b7280", maxWidth: "300px" }}>{f.comment ?? "—"}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px", background: f.redirectedToGoogle ? "#d1fae5" : "#f3f4f6", color: f.redirectedToGoogle ? "#065f46" : "#9ca3af" }}>
                        {f.redirectedToGoogle ? "Sí" : "No"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "12px", color: "#9ca3af" }}>{new Date(f.createdAt).toLocaleDateString("es-PE")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
