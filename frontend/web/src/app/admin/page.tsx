"use client";

const STATS = [
  { label: "Solicitudes Pendientes", value: "12", change: "+3 hoy", color: "#3b82f6" },
  { label: "Órdenes Activas", value: "8", change: "2 por verificar", color: "#8b5cf6" },
  { label: "Pagos por Revisar", value: "5", change: "S/ 1,240", color: "#f59e0b" },
  { label: "Feedback Promedio", value: "4.7", change: "↑ 0.2 este mes", color: "#22c55e" },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "María González", product: "10 Razones Por Las Que Te Amo", type: "CUSTOM_BOOK", status: "AWAITING_PAYMENT_PROOF", date: "19 Mar 2026" },
  { id: "ORD-002", customer: "Carlos Ruiz", product: "Photobook Coliseo Romano", type: "PHOTOBOOK", status: "UNDER_PAYMENT_REVIEW", date: "18 Mar 2026" },
  { id: "ORD-003", customer: "Ana Torres", product: "Papá, Mi Héroe", type: "CUSTOM_BOOK", status: "IN_PRODUCTION", date: "17 Mar 2026" },
  { id: "ORD-004", customer: "Luis Mendoza", product: "Photobook Machu Picchu", type: "PHOTOBOOK", status: "SHIPPED", date: "16 Mar 2026" },
  { id: "ORD-005", customer: "Sofía Vargas", product: "Mi Amor", type: "CUSTOM_BOOK", status: "DELIVERED", date: "15 Mar 2026" },
];

const PENDING_DEMOS = [
  { id: 1, customer: "Andrea López", book: "1025 Días Enamorándome De Ti", templates: 3, date: "19 Mar 2026" },
  { id: 2, customer: "Roberto Silva", book: "Nuestro Ángel de 4 Patas", templates: 3, date: "18 Mar 2026" },
  { id: 3, customer: "Diana Castro", book: "El Mejor Equipo", templates: 3, date: "18 Mar 2026" },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  AWAITING_PAYMENT_PROOF: { bg: "#fef3c7", text: "#92400e", label: "Esperando Pago" },
  UNDER_PAYMENT_REVIEW: { bg: "#dbeafe", text: "#1e40af", label: "Revisando Pago" },
  PAYMENT_VERIFIED: { bg: "#d1fae5", text: "#065f46", label: "Pago Verificado" },
  IN_PRODUCTION: { bg: "#ede9fe", text: "#5b21b6", label: "En Producción" },
  SHIPPED: { bg: "#e0e7ff", text: "#3730a3", label: "Enviado" },
  DELIVERED: { bg: "#d1fae5", text: "#065f46", label: "Entregado" },
};

export default function DashboardPage() {
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "28px", fontWeight: 800, color: "#111" }}>Dashboard</h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Resumen general de PixelArt</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        {STATS.map((stat) => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280", marginBottom: "8px" }}>{stat.label}</div>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#111", marginBottom: "4px" }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: stat.color, fontWeight: 600 }}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Recent Orders */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>Órdenes Recientes</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ID", "Cliente", "Producto", "Estado", "Fecha"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: "12px", fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #f3f4f6", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => {
                const status = STATUS_COLORS[order.status] ?? { bg: "#f3f4f6", text: "#374151", label: order.status };
                return (
                  <tr key={order.id}>
                    <td style={{ padding: "12px", fontSize: "13px", fontWeight: 600, color: "#111" }}>{order.id}</td>
                    <td style={{ padding: "12px", fontSize: "13px", color: "#374151" }}>{order.customer}</td>
                    <td style={{ padding: "12px", fontSize: "13px", color: "#374151" }}>{order.product}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "6px", background: status.bg, color: status.text, fontSize: "11px", fontWeight: 600 }}>{status.label}</span>
                    </td>
                    <td style={{ padding: "12px", fontSize: "13px", color: "#6b7280" }}>{order.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pending Demos */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 700, color: "#111" }}>Demos Pendientes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {PENDING_DEMOS.map((demo) => (
              <div key={demo.id} style={{ padding: "14px", borderRadius: "10px", border: "1px solid #f3f4f6", background: "#fafafa" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>{demo.customer}</div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>{demo.book}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#3b82f6", fontWeight: 600 }}>{demo.templates} plantillas</span>
                  <span style={{ fontSize: "11px", color: "#9ca3af" }}>{demo.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
