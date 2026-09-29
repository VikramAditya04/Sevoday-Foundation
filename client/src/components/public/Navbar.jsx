import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Lock,
  Heart,
  Info,
  BadgeCheck,
  Trophy,
  HeartHandshake,
  Images,
  Newspaper,
  BellRing,
  Users,
  UserPlus,
  Briefcase,
} from "lucide-react";
import Logo from "../../assets/images/logo.png";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about", icon: Info },
      { label: "Certificates", href: "/certificates", icon: BadgeCheck },
      { label: "Achievements", href: "/achievements", icon: Trophy },
      { label: "Beneficiaries", href: "/beneficiaries", icon: HeartHandshake },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "Gallery", href: "/gallery", icon: Images },
      { label: "News", href: "/news", icon: Newspaper },
      { label: "Notices", href: "/notices", icon: BellRing },
    ],
  },
  {
    label: "Get Involved",
    children: [
      { label: "Our Members", href: "/members", icon: Users },
      { label: "Become a Member", href: "/become-a-member", icon: UserPlus },
      { divider: true },
      { label: "Careers", href: "/careers", icon: Briefcase },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contact", href: "/contact" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6b3f] focus-visible:ring-offset-2";


function DropdownLinks({ items, onNavigate }) {
  return items.map((c, i) =>
    c.divider ? (
      <hr key={i} className="mx-2 my-1.5 border-t border-[#e4e2d8]" />
    ) : (
      <a
        key={c.label}
        href={c.href}
        onClick={onNavigate}
        className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[15px] font-medium text-slate-600 transition-colors hover:bg-[#f1f6f2] hover:text-[#2f6b3f] ${focusRing}`}
      >
        <c.icon size={18} className="shrink-0 text-[#1f4a2c]" />
        {c.label}
      </a>
    ),
  );
}

export default function Navbar({ onLogin, onDonate }) {
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const navRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const closeTimer = useRef(null);

  // Close on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileSection(null);
        mobileToggleRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const handleLogin = (e) => {
    if (onLogin) {
      e.preventDefault();
      onLogin();
    }
  };
  const handleDonate = (e) => {
    if (onDonate) {
      e.preventDefault();
      onDonate();
    }
  };

  const loginBtn =
    "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#2f6b3f] px-5 text-[15px] font-bold text-white transition hover:bg-[#1f4a2c] active:scale-95 " +
    focusRing;
  const donateBtn =
    "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#F2A900] px-7 text-[15px] font-bold text-[#123524] transition hover:bg-[#D99A00] active:scale-95 " +
    focusRing;

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b-4 border-[#F2A900] bg-[#FDFCF7] font-sans"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:h-18 lg:gap-8 lg:px-6">
        <a
          href="/"
          aria-label="Sevoday Foundation home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <img src={Logo} alt="Sevoday Foundation Logo" className="h-10 w-auto lg:h-12" /> 
        </a>

        {/* Desktop links */}
        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:text-[#2f6b3f] xl:px-3 ${
                    openMenu === item.label
                      ? "text-[#2f6b3f]"
                      : "text-slate-600"
                  } ${focusRing}`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-0 top-full mt-1.5 min-w-56.5 rounded-2xl bg-white p-2 shadow-xl shadow-[#123524]/15 transition duration-150 ${
                    openMenu === item.label
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1.5 opacity-0"
                  }`}
                >
                  <DropdownLinks
                    items={item.children}
                    onNavigate={() => setOpenMenu(null)}
                  />
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-600 transition-colors hover:text-[#2f6b3f] ${focusRing}`}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href="/login" onClick={handleLogin} className={loginBtn}>
            <Lock size={15} />
            Login
          </a>
          <a href="/donate" onClick={handleDonate} className={donateBtn}>
            <Heart size={17} fill="currentColor" />
            Donate Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          ref={mobileToggleRef}
          onClick={() => setMobileOpen((v) => !v)}
          className={`ml-auto rounded-lg p-2 text-[#123524] lg:hidden ${focusRing}`}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-[#fdfcf7] px-4 pb-8 pt-3 transition duration-200 lg:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                type="button"
                aria-expanded={mobileSection === item.label}
                onClick={() =>
                  setMobileSection(
                    mobileSection === item.label ? null : item.label,
                  )
                }
                className={`flex w-full items-center justify-between border-b border-[#e4e2d8] px-2 py-4 text-left text-[17px] font-medium text-[#123524] ${focusRing}`}
              >
                {item.label}
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSection === item.label && (
                <div className="my-2 rounded-xl bg-white p-1.5">
                  <DropdownLinks
                    items={item.children}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              )}
            </div>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex w-full items-center border-b border-[#e4e2d8] px-2 py-4 text-[17px] font-medium text-[#123524] ${focusRing}`}
            >
              {item.label}
            </a>
          ),
        )}

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="/login"
            onClick={handleLogin}
            className={`${loginBtn} w-full`}
          >
            <Lock size={15} />
            Login
          </a>
          <a
            href="/donate"
            onClick={handleDonate}
            className={`${donateBtn} w-full`}
          >
            <Heart size={17} fill="currentColor" />
            Donate Now
          </a>
        </div>
      </div>
    </header>
  );
}
