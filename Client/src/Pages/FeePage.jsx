
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  BookOpen,
  School,
  Award,
  Bus,
  CalendarDays,
  Wallet,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  IndianRupee,
  FileText,
  ChevronDown,
  Sparkles,
  Calculator,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// SAMPLE FEE DATA
// Replace these amounts with your school's approved fees.
// All amounts are in INR.
// ======================================================

const feeData = [
  {
    category: "Pre-Primary",
    classes: [
      { name: "Nursery", admission: 2500, monthly: 1800, annual: 3000, exam: 0, previousMonthly: 1700 },
      { name: "LKG", admission: 2500, monthly: 1900, annual: 3000, exam: 0, previousMonthly: 1800 },
      { name: "UKG", admission: 2500, monthly: 2000, annual: 3200, exam: 0, previousMonthly: 1900 },
    ],
  },
  {
    category: "Primary",
    classes: [
      { name: "Class I", admission: 3000, monthly: 2200, annual: 3500, exam: 500, previousMonthly: 2100 },
      { name: "Class II", admission: 3000, monthly: 2200, annual: 3500, exam: 500, previousMonthly: 2100 },
      { name: "Class III", admission: 3000, monthly: 2300, annual: 3500, exam: 500, previousMonthly: 2200 },
      { name: "Class IV", admission: 3000, monthly: 2400, annual: 3800, exam: 500, previousMonthly: 2300 },
      { name: "Class V", admission: 3000, monthly: 2500, annual: 3800, exam: 500, previousMonthly: 2400 },
    ],
  },
  {
    category: "Middle",
    classes: [
      { name: "Class VI", admission: 3500, monthly: 2700, annual: 4000, exam: 700, previousMonthly: 2600 },
      { name: "Class VII", admission: 3500, monthly: 2800, annual: 4000, exam: 700, previousMonthly: 2700 },
      { name: "Class VIII", admission: 3500, monthly: 2900, annual: 4200, exam: 700, previousMonthly: 2800 },
    ],
  },
  {
    category: "Secondary",
    classes: [
      { name: "Class IX", admission: 4000, monthly: 3200, annual: 4500, exam: 1200, previousMonthly: 3000 },
      { name: "Class X", admission: 4000, monthly: 3300, annual: 4500, exam: 1500, previousMonthly: 3100 },
    ],
  },
  {
    category: "Senior Secondary",
    classes: [
      { name: "Class XI - Science", admission: 5000, monthly: 3800, annual: 5000, exam: 1500, previousMonthly: 3600 },
      { name: "Class XI - Commerce", admission: 5000, monthly: 3500, annual: 5000, exam: 1500, previousMonthly: 3300 },
      { name: "Class XI - Arts", admission: 5000, monthly: 3400, annual: 5000, exam: 1500, previousMonthly: 3200 },
      { name: "Class XII - Science", admission: 5000, monthly: 3900, annual: 5000, exam: 1800, previousMonthly: 3700 },
      { name: "Class XII - Commerce", admission: 5000, monthly: 3600, annual: 5000, exam: 1800, previousMonthly: 3400 },
      { name: "Class XII - Arts", admission: 5000, monthly: 3500, annual: 5000, exam: 1800, previousMonthly: 3300 },
    ],
  },
];

const categories = [
  "All Classes",
  "Pre-Primary",
  "Primary",
  "Middle",
  "Secondary",
  "Senior Secondary",
];

const formatPrice = (amount) =>
  `₹${amount.toLocaleString("en-IN")}`;

const calculateTotal = (item) =>
  item.admission + item.annual + item.exam + item.monthly * 12;

// ======================================================
// MAIN COMPONENT
// ======================================================

const FeesPage = () => {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All Classes");
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [transport, setTransport] = useState("0");

  // Flatten class data
  const allClasses = useMemo(
    () => feeData.flatMap((group) => group.classes),
    []
  );

  // Filter class data
  const filteredGroups = useMemo(() => {
    if (activeCategory === "All Classes") return feeData;

    return feeData.filter(
      (group) => group.category === activeCategory
    );
  }, [activeCategory]);

  // Selected class calculation
  const selectedFee = allClasses.find(
    (item) => item.name === selectedClass
  ) || allClasses[0];

  const yearlyTuition = selectedFee.monthly * 12;
  const annualTotal = calculateTotal(selectedFee);
  const transportAmount = Number(transport) || 0;

  const estimatedTotal = annualTotal + transportAmount * 12;

  // ======================================================
  // GSAP ANIMATIONS
  // ======================================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".hero-label", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".hero-title",
          {
            y: 45,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          {
            y: 25,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.3"
        );

      gsap.utils.toArray(".reveal-section").forEach((element) => {
        gsap.from(element, {
          y: 45,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.from(".fee-card", {
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fee-table-wrapper",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".calculator-card", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".calculator-card",
          start: "top 85%",
          once: true,
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // ======================================================
  // JSX
  // ======================================================

  return (
    <main
      ref={pageRef}
      className="w-full overflow-hidden bg-[#F5F7FB] font-sans text-[#172B4D]"
    >

      {/* ================================================
          HERO SECTION
      ================================================ */}

      <section className="relative isolate overflow-hidden bg-[#102C50] px-5 pb-12 pt-14 text-white sm:px-8 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">

        {/* Background Decorations */}

        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[110px]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Hero Content */}

            <div>

              <div className="hero-label mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-md">
                <Sparkles size={14} />
                Academic Session 2026–27
              </div>

              <h1 className="hero-title max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">

                Transparent Fee Structure for

                <span className="mt-2 block text-[#E7B85B]">
                  Bright Futures.
                </span>

              </h1>

              <p className="hero-description mt-6 max-w-xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                Quality education with transparent and clearly explained
                fee details. Explore our academic fee structure from
                Nursery to Class XII at Gayatri Shiksha Niketan.
              </p>

              <div className="hero-buttons mt-8 flex flex-wrap gap-4">

                <a
                  href="#fee-structure"
                  className="group inline-flex items-center gap-3 rounded-lg bg-[#E7B85B] px-6 py-3.5 text-sm font-bold text-[#102C50] shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Explore Fee Structure
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#fee-calculator"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-amber-300 hover:bg-white/10"
                >
                  <Calculator size={17} />
                  Fee Calculator
                </a>

              </div>

              {/* Hero Stats */}

              <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-7">

                {[
                  { value: "Nursery", label: "Starting From" },
                  { value: "XII", label: "Up To Class" },
                  { value: "CBSE", label: "Board" },
                ].map((item) => (
                  <div className="hero-stat" key={item.label}>
                    <h3 className="text-xl font-bold text-[#E7B85B] sm:text-2xl">
                      {item.value}
                    </h3>
                    <p className="mt-1 text-[10px] text-blue-200 sm:text-xs">
                      {item.label}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            {/* Hero Right Card */}

            <div className="relative mx-auto w-full max-w-md">

              <div className="absolute -inset-5 rounded-[35px] bg-blue-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                <div className="mb-7 flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7B85B] text-[#102C50]">
                    <GraduationCap size={28} />
                  </div>

                  <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Fee Transparency
                  </span>

                </div>

                <h3 className="text-2xl font-bold">
                  Invest in Education
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Clear fee components. Easy payment planning.
                  A better learning journey.
                </p>

                <div className="mt-7 space-y-4">

                  {[
                    { icon: BookOpen, title: "Academic Excellence", text: "Nursery to Class XII" },
                    { icon: ShieldCheck, title: "Transparent Charges", text: "Clearly listed fee heads" },
                    { icon: Wallet, title: "Payment Flexibility", text: "Understand payment schedules" },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="flex items-center gap-4 border-t border-white/10 pt-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#E7B85B]">
                          <Icon size={21} />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs text-blue-200">
                            {item.text}
                          </p>
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================
          FEE HIGHLIGHTS
      ================================================ */}

      <section className="relative z-20 mx-auto -mt-1 max-w-7xl px-5 py-8 sm:px-8">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              icon: School,
              title: "Pre-Primary",
              subtitle: "Nursery to UKG",
            },
            {
              icon: BookOpen,
              title: "Primary",
              subtitle: "Class I to V",
            },
            {
              icon: Award,
              title: "Middle & Secondary",
              subtitle: "Class VI to X",
            },
            {
              icon: GraduationCap,
              title: "Senior Secondary",
              subtitle: "Class XI to XII",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="reveal-section group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FA] text-[#2457A7] transition-colors group-hover:bg-[#102C50] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#102C50]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.subtitle}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* ================================================
          FEE STRUCTURE
      ================================================ */}

      <section
        id="fee-structure"
        className="reveal-section scroll-mt-20 px-5 py-12 sm:px-8 lg:py-16"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2457A7]">
                Academic Fee Details
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102C50] sm:text-4xl">
                School Fee Structure
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Select your child's academic level to explore
                admission, tuition, annual and examination fees.
              </p>

            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-3 text-xs font-semibold text-[#2457A7] shadow-sm">
              <CalendarDays size={17} />
              Session 2026–27
            </div>

          </div>

          {/* Category Filters */}

          <div className="mb-7 flex gap-2 overflow-x-auto pb-3">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-lg px-5 py-3 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  activeCategory === category
                    ? "bg-[#102C50] text-white shadow-lg shadow-blue-950/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-[#2457A7]"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

          {/* Fee Table */}

          <div className="fee-table-wrapper overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 bg-[#102C50] px-5 py-5 text-white sm:px-7">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div>
                  <h3 className="text-lg font-bold">
                    Class-wise Fee Details
                  </h3>
                  <p className="mt-1 text-xs text-blue-200">
                    All amounts are in Indian Rupees (INR)
                  </p>
                </div>

                <span className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-[#E7B85B]">
                  Academic Year 2026–27
                </span>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-237.5 border-collapse text-left">

                <thead>
                  <tr className="bg-[#F0F4FA] text-xs uppercase tracking-wide text-[#102C50]">

                    <th className="px-5 py-5 font-bold">Class / Stream</th>
                    <th className="px-5 py-5 font-bold">Admission Fee</th>
                    <th className="px-5 py-5 font-bold">Monthly Tuition</th>
                    <th className="px-5 py-5 font-bold">Annual Charges</th>
                    <th className="px-5 py-5 font-bold">Exam Fee</th>
                    <th className="px-5 py-5 font-bold">Estimated First Year</th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredGroups.map((group) => (

                    <React.Fragment key={group.category}>

                      <tr className="bg-blue-50/70">

                        <td
                          colSpan={6}
                          className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#2457A7]"
                        >
                          {group.category}
                        </td>

                      </tr>

                      {group.classes.map((item) => (

                        <tr
                          key={item.name}
                          className="fee-card transition-colors duration-200 hover:bg-blue-50/60"
                        >

                          <td className="px-5 py-5 text-sm font-bold text-[#102C50]">
                            {item.name}
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-600">
                            {formatPrice(item.admission)}
                          </td>

                          <td className="px-5 py-5 text-sm font-semibold text-[#2457A7]">
                            {formatPrice(item.monthly)}
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-600">
                            {formatPrice(item.annual)}
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-600">
                            {formatPrice(item.exam)}
                          </td>

                          <td className="px-5 py-5">

                            <span className="inline-flex whitespace-nowrap rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                              {formatPrice(calculateTotal(item))}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </React.Fragment>

                  ))}

                </tbody>

              </table>

            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
              <p className="text-xs leading-6 text-slate-500">
                * First-year estimate includes one-time admission fee,
                12 months of tuition, annual charges and examination
                fee where applicable. Transport, books and uniform
                are not included.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================
          FEE CALCULATOR
      ================================================ */}

      <section
        id="fee-calculator"
        className="reveal-section scroll-mt-20 bg-[#EAF0F8] px-5 py-14 sm:px-8 lg:py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-9 text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2457A7]">
              Plan Your Budget
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#102C50] sm:text-4xl">
              Estimate Your School Fees
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Choose a class and enter an optional monthly transport
              amount to calculate the estimated first-year expense.
            </p>

          </div>

          <div className="calculator-card mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">

            {/* Calculator Inputs */}

            <div className="p-6 sm:p-9">

              <div className="mb-7 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#102C50] text-white">
                  <Calculator size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-[#102C50]">
                    Fee Calculator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize your estimate
                  </p>
                </div>

              </div>

              <label className="mb-2 block text-xs font-bold text-slate-600">
                Select Class
              </label>

              <div className="relative mb-6">

                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 pr-10 text-sm font-semibold text-[#102C50] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {allClasses.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

              </div>

              <label className="mb-2 block text-xs font-bold text-slate-600">
                Monthly Transport Fee (Optional)
              </label>

              <div className="relative">

                <IndianRupee
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  placeholder="Enter transport amount"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm font-semibold text-[#102C50] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div className="mt-6 flex items-start gap-2 rounded-xl bg-blue-50 p-4 text-xs leading-6 text-blue-800">
                <ShieldCheck size={17} className="mt-0.5 shrink-0" />
                <p>
                  This is an estimate based on the sample fee data.
                  Contact the school office for the actual payable amount.
                </p>
              </div>

            </div>

            {/* Calculation Result */}

            <div className="relative overflow-hidden bg-[#102C50] p-6 text-white sm:p-9">

              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative">

                <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">
                  Estimated First-Year Fee
                </span>

                <h3 className="mt-4 text-4xl font-bold tracking-tight text-[#E7B85B] sm:text-5xl">
                  {formatPrice(estimatedTotal)}
                </h3>

                <p className="mt-2 text-xs text-blue-200">
                  For {selectedClass} · Academic Session 2026–27
                </p>

                <div className="my-8 h-px bg-white/15" />

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between gap-3">
                    <span className="text-blue-200">Admission Fee</span>
                    <span className="font-semibold">
                      {formatPrice(selectedFee.admission)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-blue-200">Tuition (12 Months)</span>
                    <span className="font-semibold">
                      {formatPrice(yearlyTuition)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-blue-200">Annual Charges</span>
                    <span className="font-semibold">
                      {formatPrice(selectedFee.annual)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-blue-200">Examination Fee</span>
                    <span className="font-semibold">
                      {formatPrice(selectedFee.exam)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-blue-200">Transport (12 Months)</span>
                    <span className="font-semibold">
                      {formatPrice(transportAmount * 12)}
                    </span>
                  </div>

                </div>

                <div className="my-6 h-px bg-white/15" />

                <div className="flex items-center justify-between gap-3">

                  <span className="text-sm font-bold">
                    Total Estimated Fee
                  </span>

                  <span className="text-xl font-bold text-[#E7B85B]">
                    {formatPrice(estimatedTotal)}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================
          PAYMENT GUIDELINES
      ================================================ */}

      <section className="reveal-section px-5 py-14 sm:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2457A7]">
              Parent Information
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#102C50] sm:text-4xl">
              Fee Payment Guidelines
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Important information for parents and guardians.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: CalendarDays,
                title: "Payment Schedule",
                description:
                  "Please follow the payment dates and installment schedule officially notified by the school.",
              },
              {
                icon: CreditCard,
                title: "Payment Methods",
                description:
                  "Contact the school office to confirm available payment methods and accepted payment channels.",
              },
              {
                icon: FileText,
                title: "Fee Receipt",
                description:
                  "Always collect and preserve an official fee receipt for every payment made to the school.",
              },
              {
                icon: Clock,
                title: "Late Payment",
                description:
                  "Please refer to the school's officially published rules regarding delayed fee payments.",
              },
              {
                icon: Bus,
                title: "Transport Charges",
                description:
                  "Transport charges, if applicable, depend on the selected route and school transport policy.",
              },
              {
                icon: ShieldCheck,
                title: "Fee Transparency",
                description:
                  "All applicable fee components and revisions should be communicated transparently.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF0FA] text-[#2457A7] transition-all duration-300 group-hover:bg-[#102C50] group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-base font-bold text-[#102C50]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ================================================
          IMPORTANT FEE NOTES
      ================================================ */}

      <section className="reveal-section px-5 pb-14 sm:px-8 lg:pb-20">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#102C50] p-6 text-white sm:p-10">

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">

            <div>

              <div className="mb-4 flex items-center gap-2 text-[#E7B85B]">
                <ShieldCheck size={21} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Important Information
                </span>
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Clear Fees. Better Planning.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                The displayed amounts are illustrative sample figures
                for website development. Actual fees, concessions,
                applicable charges, payment dates and refund policies
                will be governed by the school's approved fee schedule
                and applicable government regulations.
              </p>

            </div>

            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#E7B85B] px-6 py-4 text-sm font-bold text-[#102C50] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Contact School Office
              <ArrowRight size={18} />
            </a>

          </div>

        </div>

      </section>

      {/* ================================================
          BOTTOM TRUST STRIP
      ================================================ */}

      <section className="border-t border-slate-200 bg-white px-5 py-7 sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div className="flex items-center gap-3">

            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102C50] text-[#E7B85B]">
              <GraduationCap size={22} />
            </div> */}

            {/* <div>
              <h3 className="text-sm font-bold text-[#102C50]">
                Gayatri Shiksha Niketan
              </h3>
              <p className="text-xs text-slate-500">
                Excellence in Education
              </p>
            </div> */}

          </div>

          {/* <p className="text-xs text-slate-500">
            Academic Session 2026–27 · Nursery to Class XII
          </p> */}

        </div>

      </section>

    </main>
  );
};

export default FeesPage;
