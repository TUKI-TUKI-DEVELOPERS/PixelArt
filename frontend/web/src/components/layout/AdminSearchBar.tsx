"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type OrderResult = { id: number; customerFullName: string; customerEmail: string; status: string; channel: string };
type DemoResult  = { id: number; customerFullName: string; customerEmail: string; status: string };
type SearchData  = { orders: OrderResult[]; demos: DemoResult[] };

const STATUS_LABELS: Record<string, string> = {
  AWAITING_PAYMENT_PROOF: "Esperando Pago",  UNDER_PAYMENT_REVIEW: "Revisando Pago",
  PAYMENT_VERIFIED: "Pago Verificado",        IN_PRODUCTION: "En Producción",
  SHIPPED: "Enviado",                         DELIVERED: "Entregado",
  CANCELLED: "Cancelada",                     REJECTED: "Rechazada",
  RECEIVED: "Recibida",                       PROPOSALS_SENT: "Propuestas Enviadas",
};

const PAGE_LABELS: { prefix: string; label: string }[] = [
  { prefix: "/admin/libros-personalizados/solicitudes", label: "Solicitudes Demo"      },
  { prefix: "/admin/libros-personalizados",             label: "Libros Personalizados" },
  { prefix: "/admin/photobooks/proyectos",              label: "Photobooks"            },
  { prefix: "/admin/ordenes",                           label: "Órdenes"               },
  { prefix: "/admin/feedback",                          label: "Feedback"              },
  { prefix: "/admin/promociones",                       label: "Promociones"           },
  { prefix: "/admin",                                   label: "Dashboard"             },
];

function match(q: string, ...fields: string[]): boolean {
  const lower = q.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(lower));
}

export default function AdminSearchBar() {
  const router   = useRouter();
  const pathname = usePathname();

  const [query,   setQuery]   = useState("");
  const [data,    setData]    = useState<SearchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLInputElement>(null);

  const pageLabel = PAGE_LABELS.find((p) => pathname.startsWith(p.prefix))?.label ?? "Admin";

  const loadData = useCallback(async () => {
    if (data || loading) return;
    setLoading(true);
    try {
      const [ordersRes, demosRes] = await Promise.all([
        fetch(`${API}/api/admin/orders`).then((r) => r.json()).catch(() => []),
        fetch(`${API}/api/admin/demo/requests`).then((r) => r.json()).catch(() => []),
      ]);
      setData({
        orders: Array.isArray(ordersRes) ? ordersRes : ordersRes.data ?? [],
        demos:  Array.isArray(demosRes)  ? demosRes  : demosRes.data  ?? [],
      });
    } finally { setLoading(false); }
  }, [data, loading]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); setQuery(""); inputRef.current?.blur(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); inputRef.current?.focus(); setOpen(true); loadData(); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [loadData]);

  const q = query.trim();
  const matchedOrders = q && data ? data.orders.filter((o) => match(q, o.customerFullName, o.customerEmail, String(o.id))).slice(0, 6) : [];
  const matchedDemos  = q && data ? data.demos.filter((d)  => match(q, d.customerFullName, d.customerEmail, String(d.id))).slice(0, 6) : [];
  const hasResults    = matchedOrders.length > 0 || matchedDemos.length > 0;
  const showDropdown  = open && q.length > 0;

  function navigate(href: string) { setOpen(false); setQuery(""); router.push(href); }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      height: "60px", display: "flex", alignItems: "center",
      padding: "0 28px", gap: "20px",
    }}>

      {/* Sección actual */}
      <div style={{ minWidth: "160px", flexShrink: 0 }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>{pageLabel}</span>
      </div>

      {/* Search */}
      <div ref={containerRef} style={{ flex: 1, maxWidth: "480px", position: "relative", display: "flex", alignItems: "center", background: "#f9fafb", borderRadius: "10px", border: "1px solid #e5e7eb", padding: "0 12px", gap: "8px", height: "38px" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Buscar cliente, email, #orden… (⌘K)"
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { setOpen(true); loadData(); }}
          style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", color: "#111", background: "transparent", fontFamily: "inherit" }}
        />
        {loading && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, animation: "admin-spin 1s linear infinite" }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
        )}
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
            style={{ border: "none", background: "none", cursor: "pointer", color: "#9ca3af", padding: "2px", display: "flex", alignItems: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 500, maxHeight: "400px", overflowY: "auto" }}>
            {!hasResults ? (
              <div style={{ padding: "24px", textAlign: "center", fontSize: "14px", color: "#9ca3af" }}>Sin resultados para &ldquo;{q}&rdquo;</div>
            ) : (
              <>
                {matchedOrders.length > 0 && (
                  <div>
                    <div style={{ padding: "10px 16px 4px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Órdenes</div>
                    {matchedOrders.map((o) => (
                      <button key={o.id} onClick={() => navigate(`/admin/ordenes/${o.id}`)}
                        style={{ width: "100%", padding: "9px 16px", border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", fontFamily: "inherit" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: o.channel === "CUSTOM_BOOK" ? "#fef3c7" : "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={o.channel === "CUSTOM_BOOK" ? "#92400e" : "#5b21b6"} strokeWidth="2" strokeLinecap="round">
                            {o.channel === "CUSTOM_BOOK" ? <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></> : <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>}
                          </svg>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.customerFullName}</div>
                          <div style={{ fontSize: "11px", color: "#9ca3af" }}>{o.customerEmail}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>#{o.id}</div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{STATUS_LABELS[o.status] ?? o.status}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {matchedDemos.length > 0 && (
                  <div style={{ borderTop: matchedOrders.length > 0 ? "1px solid #f3f4f6" : "none" }}>
                    <div style={{ padding: "10px 16px 4px", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>Solicitudes</div>
                    {matchedDemos.map((d) => (
                      <button key={d.id} onClick={() => navigate(`/admin/libros-personalizados/solicitudes/${d.id}`)}
                        style={{ width: "100%", padding: "9px 16px", border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", fontFamily: "inherit" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round">
                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                          </svg>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.customerFullName}</div>
                          <div style={{ fontSize: "11px", color: "#9ca3af" }}>{d.customerEmail}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "11px", color: "#6b7280" }}>#{d.id}</div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{STATUS_LABELS[d.status] ?? d.status}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* User + logout */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #e5e7eb" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#374151" }}>Admin</span>
        </div>
        <button onClick={handleLogout}
          title="Cerrar sesión"
          style={{ width: "34px", height: "34px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.borderColor = "#fca5a5"; e.currentTarget.style.color = "#ef4444"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#9ca3af"; }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>

      <style>{`@keyframes admin-spin{to{transform:rotate(360deg)}}`}</style>
    </header>
  );
}
