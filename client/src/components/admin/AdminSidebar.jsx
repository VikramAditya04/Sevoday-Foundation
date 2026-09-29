import {
  BadgeCheck,
  BellRing,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Circle,
  FileText,
  FolderKanban,
  HandCoins,
  Home,
  Landmark,
  MessageSquareText,
  Newspaper,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/images/logo.png";

const iconMap = {
  home: Home,
  content: FileText,
  news: Newspaper,
  notices: BellRing,
  projects: FolderKanban,
  campaigns: HandCoins,
  careers: BriefcaseBusiness,
  messages: MessageSquareText,
  members: Users,
  people: UserRound,
  finance: Landmark,
  partners: BadgeCheck,
  users: ShieldCheck,
  settings: Settings,
};

const accent = {
  home: "bg-[#2ec4b6] text-white",
  content: "bg-[#6aa5ff] text-white",
  news: "bg-[#f7b267] text-white",
  notices: "bg-[#ff6b6b] text-white",
  projects: "bg-[#9b87f5] text-white",
  campaigns: "bg-[#3ab0ff] text-white",
  careers: "bg-[#5875f4] text-white",
  messages: "bg-[#5ab1c7] text-white",
  members: "bg-[#ff7c8b] text-white",
  people: "bg-[#6dd3a0] text-white",
  finance: "bg-[#f5c96a] text-white",
  partners: "bg-[#d7895a] text-white",
  users: "bg-[#7bc3ff] text-white",
  settings: "bg-[#a7b7c8] text-white",
};

const bullet = {
  home: "bg-[#2ec4b6]",
  content: "bg-[#6aa5ff]",
  news: "bg-[#f7b267]",
  notices: "bg-[#ff6b6b]",
  projects: "bg-[#9b87f5]",
  campaigns: "bg-[#3ab0ff]",
  careers: "bg-[#5875f4]",
  messages: "bg-[#5ab1c7]",
  members: "bg-[#ff7c8b]",
  people: "bg-[#6dd3a0]",
  finance: "bg-[#f5c96a]",
  partners: "bg-[#d7895a]",
  users: "bg-[#7bc3ff]",
  settings: "bg-[#a7b7c8]",
};

const defaultOpen = {
  content: true,
  careers: true,
  members: true,
  settings: true,
};

export default function AdminSidebar({ collapsed, onClose, onToggleCollapse }) {
  const [expanded, setExpanded] = useState(defaultOpen);

  const navGroups = [
    { key: "home", label: "Home", path: "/admin/dashboard", icon: "home" },
    {
      key: "content",
      label: "Content",
      icon: "content",
      children: [
        { label: "Slider", path: "/admin/content/slider" },
        { label: "About", path: "/admin/content/about" },
        { label: "Gallery", path: "/admin/content/gallery" },
        { label: "Certificates", path: "/admin/content/certificates" },
        { label: "Achievements", path: "/admin/content/achievements" },
        { label: "Policies", path: "/admin/content/policies" },
      ],
    },
    { key: "news", label: "News", path: "/admin/news", icon: "news" },
    { key: "notices", label: "Notices", path: "/admin/notices", icon: "notices" },
    { key: "projects", label: "Projects", path: "/admin/projects", icon: "projects" },
    { key: "campaigns", label: "Campaigns", path: "/admin/campaigns", icon: "campaigns" },
    {
      key: "careers",
      label: "Careers",
      icon: "careers",
      children: [
        { label: "Jobs", path: "/admin/careers/jobs" },
        { label: "Interns", path: "/admin/careers/interns" },
        { label: "Employees", path: "/admin/careers/employees" },
        { label: "Applications", path: "/admin/careers/applications" },
      ],
    },
    { key: "messages", label: "Messages", path: "/admin/messages", icon: "messages" },
    {
      key: "members",
      label: "Members",
      icon: "members",
      children: [
        { label: "All Members", path: "/admin/members/all" },
        { label: "Member Requests", path: "/admin/members/requests" },
        { label: "Membership Fees", path: "/admin/members/fees" },
        { label: "Designations", path: "/admin/members/designations" },
      ],
    },
    {
      key: "people",
      label: "People",
      icon: "people",
      children: [
        { label: "Volunteers", path: "/admin/people/volunteers" },
        { label: "Staff", path: "/admin/people/staff" },
      ],
    },
    { key: "finance", label: "Finance", path: "/admin/finance", icon: "finance" },
    { key: "partners", label: "Partners", path: "/admin/partners", icon: "partners" },
    { key: "users", label: "Users", path: "/admin/users", icon: "users" },
    {
      key: "settings",
      label: "Settings",
      icon: "settings",
      children: [
        { label: "Organization", path: "/admin/settings/organization" },
        { label: "SMTP Settings", path: "/admin/settings/smtp" },
        { label: "Payment Gateways", path: "/admin/settings/payments" },
      ],
    },
  ];

  return (
    <aside className={`flex h-screen flex-col bg-[#081e35] text-slate-200 shadow-xl ${collapsed ? "w-20" : "w-72 lg:w-64"}`}>
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} border-b border-[#1b3550] px-3 py-4`}>
        {collapsed ? (
          <img src={Logo} alt="Sevoday Foundation" className="h-8 w-auto" />
        ) : (
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Sevoday Foundation" className="h-9 w-auto" />
            <div>
              <div className="text-lg font-bold tracking-tight text-white">Sevoday</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-slate-300">Foundation</div>
            </div>
          </div>
        )}

        {!collapsed ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-300 transition hover:bg-[#123552] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-2 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {navGroups.map((group) => {
          const Icon = group.icon ? iconMap[group.icon] : null;
          const hasChildren = Boolean(group.children?.length);
          const isExpanded = expanded[group.key];

          if (!hasChildren) {
            return (
              <NavLink
                key={group.key}
                to={group.path}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "flex items-center rounded-md px-2.5 py-2.5 text-sm font-medium transition-colors",
                    collapsed ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-[#123552] text-white"
                      : "text-slate-300 hover:bg-[#123552] hover:text-white",
                  ].join(" ")
                }
                title={collapsed ? group.label : undefined}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-md ${accent[group.icon] || "bg-slate-600 text-white"}`}>
                  {Icon ? <Icon className="h-4 w-4" /> : <Circle className="h-3.5 w-3.5" />}
                </span>
                {!collapsed ? <span>{group.label}</span> : null}
              </NavLink>
            );
          }

          return (
            <div key={group.key} className="space-y-1">
              <button
                type="button"
                onClick={() => setExpanded((current) => ({ ...current, [group.key]: !current[group.key] }))}
                className={[
                  "flex w-full items-center rounded-md px-2.5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-[#123552] hover:text-white",
                  collapsed ? "justify-center" : "justify-between",
                ].join(" ")}
                aria-expanded={isExpanded}
                title={collapsed ? group.label : undefined}
              >
                <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-md ${accent[group.icon] || "bg-slate-600 text-white"}`}>
                    {Icon ? <Icon className="h-4 w-4" /> : <Circle className="h-3.5 w-3.5" />}
                  </span>
                  {!collapsed ? <span>{group.label}</span> : null}
                </span>
                {!collapsed ? (
                  isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                ) : null}
              </button>

              {!collapsed && isExpanded ? (
                <div className="space-y-1 pl-4">
                  {group.children.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          "flex items-center rounded-md px-2.5 py-2 text-sm transition-colors",
                          isActive ? "bg-[#123552] text-white" : "text-slate-300 hover:bg-[#123552] hover:text-white",
                        ].join(" ")
                      }
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${bullet[group.key] || "bg-slate-400"}`} />
                      <span className="ml-2.5">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
