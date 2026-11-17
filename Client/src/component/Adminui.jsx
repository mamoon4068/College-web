
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, LoaderCircle, Inbox } from "lucide-react";
import useGSAPReveal from "../hooks/useGSAPReveal";

export const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-50";

export const panelClass =
  "rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(16,44,80,0.04)]";

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-[#102C50] sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function Reveal({ children, watch }) {
  const ref = useGSAPReveal([watch]);
  return <div ref={ref}>{children}</div>;
}

export function Modal({ title, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const ctx = gsap.context(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(
          ".admin-modal",
          { autoAlpha: 0, y: 35, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.3)" }
        );
      }
    }, ref);

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="admin-modal max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#102C50]">{title}</h2>
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="rounded-xl bg-slate-100 p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function Alert({ message, success = false }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={`mb-5 rounded-xl border p-4 text-sm ${
        success
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {message}
    </p>
  );
}

export function Loading() {
  return (
    <div className="flex items-center justify-center gap-3 py-20 text-slate-500">
      <LoaderCircle className="animate-spin text-blue-600" size={26} />
      Loading content...
    </div>
  );
}

export function Empty({ message }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 rounded-2xl bg-slate-100 p-5 text-slate-400">
        <Inbox size={35} />
      </div>
      <p className="font-semibold text-slate-500">{message}</p>
    </div>
  );
}

export function Status({ published }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        published
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
