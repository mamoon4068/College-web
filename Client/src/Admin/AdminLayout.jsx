
import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  GraduationCap, LayoutDashboard, Images,
  Megaphone, CalendarDays, Menu, X,
  LogOut, ShieldCheck, ChevronRight,
} from "lucide-react";
import { useAuth } from "./AuthContext";

const menu = [
  { path: "/admin", name: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/admin/gallery", name: "Gallery", icon: Images },
  { path: "/admin/notices", name: "Notices", icon: Megaphone },
  { path: "/admin/events", name: "Events", icon: CalendarDays },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const sidebar = useRef(null);
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  useEffect(() => {
    if (!sidebar.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sidebar-item",
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.07,
          duration: 0.45,
          ease: "power2.out",
        }
      );
    }, sidebar);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  async function signOut() {
    setBusy(true);
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fc] md:flex">
      {open && (
        <button
          aria-label="Close sidebar overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        ref={sidebar}
        className={`fixed inset-y-0 left-0 z-40 flex w-67.5 flex-col bg-[#102C50] text-white shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500 p-2.5">
              <GraduationCap size={25} />
            </div>
            <div>
              <p className="text-lg font-black">GSN Admin</p>
              <p className="text-[11px] text-blue-200">Management Portal</p>
            </div>
          </div>
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="md:hidden">
            <X size={22} />
          </button>
        </div>

        <div className="px-6 pb-3 pt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200/60">
          Main Menu
        </div>

        <nav aria-label="Admin navigation" className="flex-1 space-y-2 px-4">
          {menu.map(({ path, name, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `sidebar-item group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-blue-100/80 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="flex-1">{name}</span>
              <ChevronRight size={16} className="opacity-50" />
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-500 font-bold">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{admin?.name || "Administrator"}</p>
              <p className="text-xs text-blue-200">School Admin</p>
            </div>
          </div>

          <button
            disabled={busy}
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/15"
          >
            <LogOut size={19} />
            {busy ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 md:ml-67.5">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="rounded-xl bg-slate-100 p-2.5 text-[#102C50] md:hidden"
            >
              <Menu size={23} />
            </button>
            <div>
              <h2 className="text-sm font-extrabold text-[#102C50] sm:text-lg">
                School Administration
              </h2>
              <p className="hidden text-xs text-slate-400 sm:block">
                Manage your school content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            <ShieldCheck size={16} />
            <span className="hidden sm:inline">Admin Portal</span>
          </div>
        </header>

        <main className="mx-auto max-w-375 p-4 sm:p-7 lg:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
