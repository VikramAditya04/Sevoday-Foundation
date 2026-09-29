import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
import useAuth from "../hooks/useAuth";
import { clearAuthUser, updateAuthUser } from "../store/authStore";
import { apiRequest } from "../services/api";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
      clearAuthUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      clearAuthUser();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f6f7f3] text-slate-800">
      <div className="flex h-screen gap-0">
        <div
          className={[
            "fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 lg:static lg:z-auto",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
            sidebarCollapsed ? "lg:w-20" : "lg:w-72",
            "w-72",
          ].join(" ")}
        >
          <AdminSidebar
            collapsed={sidebarCollapsed}
            onClose={() => setSidebarOpen(false)}
            onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
          />
        </div>

        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close side menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          />
        ) : null}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <AdminHeader
            onMenuToggle={() => setSidebarOpen(true)}
            onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
            user={user}
            onLogout={logout}
            onProfileUpdated={updateAuthUser}
          />

          <main className="min-h-0 flex-1 overflow-y-auto bg-[#f6f7f3] scrollbar-none">
            <div className="mx-auto max-w-[1600px] px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
              <Outlet />
              <AdminFooter />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
