"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Badges = { demos: number; payments: number };

const NAV_SECTIONS = [
  {
    title: "General",
    items: [
      { label: "Dashboard", href: "/admin", icon: "grid" },
    ],
  },
  {
    title: "Libros Personalizados",
    items: [
      { label: "Solicitudes Demo", href: "/admin/libros-personalizados/solicitudes", icon: "inbox", badgeKey: "demos" as keyof Badges },
    ],
  },
  {
    title: "Photobooks",
    items: [
      { label: "Solicitudes Photobooks", href: "/admin/photobooks/proyectos", icon: "camera" },
    ],
  },
  {
    title: "Gestión",
    items: [
      { label: "Órdenes", href: "/admin/ordenes", icon: "package", badgeKey: "payments" as keyof Badges },
      { label: "Feedback", href: "/admin/feedback", icon: "star" },
      { label: "Promociones", href: "/admin/promociones", icon: "tag" },
    ],
  },
];

function NavIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>,
    package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>,
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      {icons[name] ?? null}
    </svg>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [badges, setBadges] = useState<Badges>({ demos: 0, payments: 0 });

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/demo/requests`).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/admin/orders`).then((r) => r.json()).catch(() => []),
    ]).then(([demosData, ordersData]) => {
      const demos  = (Array.isArray(demosData)  ? demosData  : demosData.data  ?? []) as { status: string }[];
      const orders = (Array.isArray(ordersData) ? ordersData : ordersData.data ?? []) as { status: string }[];
      setBadges({
        demos:    demos.filter((d) => d.status === "RECEIVED").length,
        payments: orders.filter((o) => o.status === "UNDER_PAYMENT_REVIEW").length,
      });
    });
  }, [pathname]); // re-fetch al navegar para mantener actualizado

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside
      style={{
        width: collapsed ? "64px" : "260px",
        minHeight: "100vh",
        background: "#111827",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: collapsed ? "20px 12px" : "20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "1px" }}>PIXELART</div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Panel Admin</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: "6px",
            width: "28px",
            height: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} style={{ marginBottom: "8px" }}>
            {!collapsed && (
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", padding: "8px 20px 4px" }}>
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const badge = item.badgeKey ? badges[item.badgeKey] : 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: collapsed ? "0" : "10px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "10px" : "8px 20px",
                    margin: "2px 8px",
                    borderRadius: "8px",
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    color: isActive ? "#fff" : "#9ca3af",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <NavIcon name={item.icon} color={isActive ? "#fff" : "#6b7280"} />
                    {collapsed && badge > 0 && (
                      <span style={{
                        position: "absolute", top: "-5px", right: "-5px",
                        background: "#ef4444", color: "#fff",
                        fontSize: "10px", fontWeight: 700,
                        borderRadius: "999px", padding: "0 4px",
                        minWidth: "16px", height: "16px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                      }}>
                        {badge > 99 ? "99+" : badge}
                      </span>
                    )}
                  </div>
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {badge > 0 && (
                        <span style={{
                          background: "#ef4444", color: "#fff",
                          fontSize: "11px", fontWeight: 700,
                          borderRadius: "999px", padding: "1px 7px",
                          minWidth: "20px", textAlign: "center",
                        }}>
                          {badge > 99 ? "99+" : badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div
        style={{
          padding: collapsed ? "12px" : "12px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {!collapsed && (
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            admin@pixelart.local
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: collapsed ? "0" : "8px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%",
            padding: collapsed ? "8px" : "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(239,68,68,0.1)",
            color: "#f87171",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!collapsed && "Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}
