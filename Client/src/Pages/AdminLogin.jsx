

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Small reusable icons
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {visible ? (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.5 1.2-1.4 2.5-2.7 3.6" />
        <path d="M6.2 6.2C3.9 7.7 2.7 10 2.5 12c.8 2.2 4.3 7 9.5 7 1.1 0 2.2-.2 3.1-.6" />
      </>
    ) : (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const AdminLogin = ({ onLogin }) => {
  const containerRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // GSAP Animation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        ".admin-intro",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ".feature-item",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .fromTo(
          ".login-card",
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!onLogin) {
      setMessage(
        "Login UI is ready. Connect your admin authentication API."
      );
      return;
    }

    try {
      setLoading(true);

      await onLogin({
        email,
        password,
        rememberMe,
      });
    } catch (error) {
      setMessage(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgotPassword = () => {
    setMessage(
      "Please contact your school's IT administrator to reset your password."
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#F3F7FC] lg:grid lg:grid-cols-2"
    >
      {/* LEFT SIDE */}
      <section className="relative flex min-h-95 flex-col justify-between overflow-hidden bg-linear-to-br from-[#102C50] via-[#153E6B] to-[#087EAE] px-6 py-9 text-white sm:px-10 lg:min-h-screen lg:px-14 lg:py-12">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Brand Logo */}
        <div className="admin-intro relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl font-extrabold text-[#12375C] shadow-lg">
            S
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-wide">
              SCHOOL PORTAL
            </h2>
            <p className="text-xs tracking-[2px] text-blue-200">
              MANAGEMENT SYSTEM
            </p>
          </div>
        </div>

        {/* Main Introduction */}
        <div className="relative z-10 my-12 max-w-xl">
          <div className="admin-intro mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wider text-cyan-100 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            ADMINISTRATION PORTAL
          </div>

          <div className="admin-intro">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl xl:text-6xl">
              Manage Your
              <span className="mt-2 block text-cyan-300">
                School Smarter.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-blue-100 sm:text-base">
              Welcome to your school administration dashboard.
              Manage students, staff, academic activities and
              school operations from one secure platform.
            </p>
          </div>

          {/* Features */}
          <div className="mt-10 space-y-5">
            <div className="feature-item flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl">
                🎓
              </div>
              <div>
                <h3 className="font-semibold">Student Management</h3>
                <p className="text-xs text-blue-200">
                  Manage student records and admissions.
                </p>
              </div>
            </div>

            <div className="feature-item flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl">
                👨‍🏫
              </div>
              <div>
                <h3 className="font-semibold">Staff Management</h3>
                <p className="text-xs text-blue-200">
                  Manage teachers and school employees.
                </p>
              </div>
            </div>

            <div className="feature-item flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl">
                📊
              </div>
              <div>
                <h3 className="font-semibold">Reports & Analytics</h3>
                <p className="text-xs text-blue-200">
                  Monitor school performance and activities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-blue-200">
          <p>© {new Date().getFullYear()} School Portal</p>
          <p>Secure Administration Access</p>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex min-h-150 items-center justify-center px-5 py-12 sm:px-10 lg:min-h-screen lg:px-12">
        <div className="login-card w-full max-w-115 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(15,44,80,0.10)] sm:p-10">

          {/* Top Heading */}
          <div className="mb-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🛡️
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1486B7]">
              Administrator Login
            </p>

            <h2 className="text-3xl font-bold text-[#102C50] sm:text-4xl">
              Welcome Back!
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Please enter your admin credentials to access
              the school dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="adminEmail"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Admin Email Address
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <MailIcon />
                </span>

                <input
                  id="adminEmail"
                  type="email"
                  name="email"
                  required
                  autoComplete="username"
                  placeholder="admin@school.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label
                  htmlFor="adminPassword"
                  className="text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <LockIcon />
                </span>

                <input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-blue-600"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-blue-600 transition-colors hover:text-[#102C50]"
              >
                Forgot Password?
              </button>
            </div>

            {/* Message */}
            {message && (
              <p
                role="status"
                className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700"
              >
                {message}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#102C50] to-[#087EAE] px-6 py-4 font-semibold text-white shadow-lg shadow-blue-900/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Login to Dashboard"}

              {!loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>

          {/* Security Message */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <span className="text-lg">🔐</span>

              <div>
                <h3 className="text-xs font-bold text-[#102C50]">
                  Secure Admin Access
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  This portal is intended for authorized school
                  administrators only.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Protected School Management System
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
