import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import AdminProfileModal from "./AdminProfileModal";

export default function AdminHeader({
  onMenuToggle,
  onToggleSidebar,
  user,
  onLogout,
  onProfileUpdated,
}) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const userName = user?.fullName || user?.name || "Super Admin";

  return (
    <header className="sticky top-0 z-20 border-b border-[#dfe8df] bg-[#fdfcf7]/90 backdrop-blur-sm">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-5 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dde7dc] bg-[#f4f7f0] text-[#1f4a2c] transition hover:border-[#cfe0d1] hover:bg-[#edf4ec] lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#dde7dc] bg-[#f4f7f0] text-[#1f4a2c] transition hover:border-[#cfe0d1] hover:bg-[#edf4ec] lg:flex"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        <div
          className="relative ml-auto"
          onMouseEnter={() => setProfileMenuOpen(true)}
          onMouseLeave={() => setProfileMenuOpen(false)}
        >
          <button
            type="button"
            onClick={() => setProfileMenuOpen((value) => !value)}
            className="flex items-center gap-3 rounded-xl border border-[#dde7dc] bg-[#f4f7f0] px-2 py-1.5 text-left transition hover:border-[#cfe0d1]"
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
          >
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Admin profile"
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f4a2c] text-sm font-semibold text-white">
                {userName.slice(0, 2).toUpperCase() || "SA"}
              </div>
            )}

            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold text-slate-900">
                {userName}
              </div>
              <div className="text-[11px] text-slate-500">Super Admin</div>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {profileMenuOpen ? (
            <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-[#dde7dc] bg-white shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  setProfileModalOpen(true);
                }}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-[#f4f7f0]"
              >
                <span>Edit Profile</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <span>Logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {profileModalOpen ? (
        <AdminProfileModal
          user={user}
          onClose={() => setProfileModalOpen(false)}
          onSaved={onProfileUpdated}
        />
      ) : null}
    </header>
  );
}
