import { headers } from "next/headers";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminSearchBar from "@/components/layout/AdminSearchBar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <AdminSidebar />
      <main style={{ flex: 1, minWidth: 0, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <AdminSearchBar />
        <div style={{ flex: 1 }}>{children}</div>
      </main>
    </div>
  );
}
