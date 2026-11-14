
import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,

  ShieldCheck,
  CheckCircle2,
  BriefcaseBusiness,
  IdCard,
  UserCheck,
} from "lucide-react";

export default function StaffLogin() {
  const [formData, setFormData] = useState({
    staffId: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.staffId.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("Please fill all mandatory fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid official email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Connect your staff authentication API here.
    setLoading(true);

    try {
      console.log("Staff Login Details:", {
        staffId: formData.staffId,
        email: formData.email,
        rememberMe,
      });

      setError(
        "Staff authentication API is not connected yet. Please contact the administrator."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError(`${provider} staff login is not configured yet.`);
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto grid min-h-170 max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/50 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#102C50] p-10 text-white lg:flex xl:p-14">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute right-10 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

          {/* SCHOOL BRANDING */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#102C50]">
              <GraduationCap size={28} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Gayatri Shiksha Niketan
              </h2>
              <p className="text-xs text-blue-200">
                Staff Portal
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 my-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-blue-100">
              <ShieldCheck size={15} />
              Authorized Staff Access
            </span>

            <h1 className="mt-6 max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
              Welcome to Your
              <span className="mt-2 block text-cyan-300">
                Staff Workspace.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-blue-100/80">
              Manage your academic responsibilities, student
              records, attendance and school activities through
              your dedicated staff portal.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Manage student information and records",
                "Access attendance and academic activities",
                "Stay connected with school administration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-cyan-300"
                  />
                  <span className="text-sm text-blue-50">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/15 pt-6 text-xs text-blue-200">
            © {new Date().getFullYear()} Gayatri Shiksha Niketan
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

          <div className="w-full max-w-md">

            {/* MOBILE BRANDING */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#102C50] text-white">
                <GraduationCap size={27} />
              </div>

              <div>
                <h2 className="font-bold text-[#102C50]">
                  Gayatri Shiksha Niketan
                </h2>
                <p className="text-xs text-slate-500">
                  Staff Portal
                </p>
              </div>
            </div>

            {/* HEADING */}
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Staff Access
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Staff Login
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in using your registered staff credentials
                to access your school workspace.
              </p>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-lg font-bold text-blue-600">
                  G
                </span>
                Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-lg font-bold text-blue-600">f</span>
                Facebook
              </button>

            </div>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">
                OR LOGIN WITH STAFF DETAILS
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* STAFF ID */}
              <div>
                <label
                  htmlFor="staff-id"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Staff ID <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <IdCard
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="staff-id"
                    type="text"
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleChange}
                    placeholder="Enter your staff ID"
                    autoComplete="username"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="staff-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Official Email Address{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="staff-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your official email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="staff-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>

                  <a
                    href="/staff-forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="staff-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>

                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <ShieldCheck size={14} />
                  Secure Login
                </span>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#102C50] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Login to Staff Portal"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                )}
              </button>

            </form>

            {/* SUPPORT */}
            <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="flex items-start gap-3">
                <UserCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-700"
                />

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Need Staff Access?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    If you do not have your staff credentials,
                    please contact the school administration.
                  </p>

                  <a
                    href="/contact"
                    className="mt-2 inline-block text-xs font-bold text-blue-700 hover:text-blue-900"
                  >
                    Contact Administration 
                  </a>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} />
                Your information is protected
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-slate-500">
                <a href="/privacy-policy" className="hover:text-blue-600">
                  Privacy Policy
                </a>

                <a href="/terms" className="hover:text-blue-600">
                  Terms & Conditions
                </a>

                <a href="/contact" className="hover:text-blue-600">
                  Help & Support
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

