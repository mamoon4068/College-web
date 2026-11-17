
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  GraduationCap, Mail, LockKeyhole,
  Eye, EyeOff, ArrowRight, ShieldCheck,
  Sparkles, LoaderCircle,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { getError } from "../lib/api";
import useGSAPReveal from "../hooks/useGSAPReveal";

export default function AdminLogin() {
  const ref = useGSAPReveal();
  const navigate = useNavigate();
  const { admin, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (admin) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(getError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#edf3fc] p-4 sm:p-8"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 animate-pulse rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 animate-pulse rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-[0_25px_90px_rgba(16,44,80,0.15)] md:grid-cols-2">

        <section className="relative hidden min-h-142.5 flex-col justify-between overflow-hidden bg-[#102C50] p-10 text-white md:flex lg:p-14">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-55 border-blue-400/10" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-500/10 blur-2xl" />

          <div data-gsap-reveal className="relative flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <GraduationCap size={28} />
            </div>
            <span className="text-xl font-black tracking-tight">
              GSN Admin
            </span>
          </div>

          <div className="relative">
            <div data-gsap-reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs">
              <Sparkles size={15} />
              Smart School Management
            </div>

            <h1 data-gsap-reveal className="text-4xl font-black leading-[1.2] lg:text-5xl">
              Everything your school needs.
              <span className="mt-2 block text-blue-300">
                One dashboard.
              </span>
            </h1>

            <p data-gsap-reveal className="mt-6 max-w-sm leading-7 text-blue-100/80">
              Manage announcements, school events and
              gallery memories with a modern content
              management system.
            </p>
          </div>

          <div data-gsap-reveal className="relative flex items-center gap-2 text-sm text-blue-100">
            <ShieldCheck size={18} />
            Secure administration portal
          </div>
        </section>

        <section className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
          <div data-gsap-reveal className="mb-8 flex items-center gap-2 text-[#102C50] md:hidden">
            <GraduationCap size={28} />
            <span className="text-xl font-black">GSN Admin</span>
          </div>

          <div data-gsap-reveal className="mb-8">
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              ADMIN ACCESS
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[#102C50] sm:text-4xl">
              Welcome back!
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your credentials to manage your school.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div data-gsap-reveal>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.edu"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div data-gsap-reveal>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <LockKeyhole size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              data-gsap-reveal
              disabled={busy}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 disabled:opacity-60"
            >
              {busy ? <LoaderCircle size={20} className="animate-spin" /> : <>Sign In <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" /></>}
            </button>
          </form>

          <p data-gsap-reveal className="mt-10 text-center text-xs text-slate-400">
            Authorized school administrators only
          </p>
        </section>
      </div>
    </main>
  );
}
