
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  Microscope,
  PencilRuler,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Trophy,
  FlaskConical,
  Calculator,
  Palette,
  Globe,
  Heart,
  Menu,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ----------------------------------
// Academic Learning Stages
// ----------------------------------

const academicStages = [
  {
    number: "01",
    title: "Foundational Stage",
    classes: "Nursery – Class II",
    age: "Early Childhood",
    color: "amber",
    description:
      "Building strong foundations through play, exploration, stories and joyful learning experiences.",
    subjects: [
      "Language Development",
      "Early Mathematics",
      "Environmental Awareness",
      "Creative Activities",
      "Physical Development",
    ],
    icon: Heart,
  },
  {
    number: "02",
    title: "Preparatory Stage",
    classes: "Class III – V",
    age: "Primary Learning",
    color: "teal",
    description:
      "Developing curiosity, communication, logical thinking and a deeper understanding of everyday concepts.",
    subjects: [
      "Languages",
      "Mathematics",
      "Environmental Studies",
      "Art & Craft",
      "Computer Awareness",
    ],
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Middle Stage",
    classes: "Class VI – VIII",
    age: "Concept Development",
    color: "blue",
    description:
      "Encouraging independent thinking through subject-based learning, practical activities and problem-solving.",
    subjects: [
      "Languages",
      "Mathematics",
      "Science",
      "Social Science",
      "Computer Education",
    ],
    icon: Brain,
  },
  {
    number: "04",
    title: "Secondary Stage",
    classes: "Class IX – XII",
    age: "Academic Excellence",
    color: "purple",
    description:
      "Preparing students for higher education through advanced subject knowledge, critical thinking and academic guidance.",
    subjects: [
      "Languages",
      "Mathematics",
      "Science",
      "Social Science",
      "Senior Secondary Electives",
    ],
    icon: GraduationCap,
  },
];

// ----------------------------------
// Teaching Methodology
// ----------------------------------

const learningMethods = [
  {
    icon: Lightbulb,
    title: "Concept-Based Learning",
    description:
      "Understanding the why behind every concept instead of simply memorising information.",
  },
  {
    icon: Microscope,
    title: "Practical Learning",
    description:
      "Connecting classroom knowledge with experiments, demonstrations and real-life examples.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description:
      "Encouraging teamwork, communication, discussion and peer-to-peer learning.",
  },
  {
    icon: Brain,
    title: "Critical Thinking",
    description:
      "Developing creativity, analytical thinking and independent problem-solving abilities.",
  },
];

// ----------------------------------
// Academic Values
// ----------------------------------

const academicValues = [
  {
    icon: ShieldCheck,
    title: "Strong Foundation",
    description:
      "Building essential academic skills and positive learning habits.",
  },
  {
    icon: Target,
    title: "Individual Progress",
    description:
      "Recognising different learning needs and supporting student development.",
  },
  {
    icon: Trophy,
    title: "Holistic Development",
    description:
      "Balancing academics, creativity, physical education and life skills.",
  },
];

// ----------------------------------
// Assessment System
// ----------------------------------

const assessments = [
  {
    title: "Classroom Participation",
    description:
      "Regular observation of student engagement, communication and classroom activities.",
  },
  {
    title: "Assignments & Projects",
    description:
      "Activities that encourage research, creativity and practical understanding.",
  },
  {
    title: "Periodic Assessments",
    description:
      "Assessing learning progress at suitable intervals throughout the academic year.",
  },
  {
    title: "Term-End Examinations",
    description:
      "Evaluating subject understanding and overall academic progress.",
  },
];

// ----------------------------------
// Academic Page Component
// ----------------------------------

export default function Academics() {
  const pageRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [openAssessment, setOpenAssessment] = useState(0);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Hero animation
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        heroTimeline
          .from(".academic-tag", {
            y: 20,
            opacity: 0,
            duration: 0.7,
          })
          .from(
            ".academic-heading",
            {
              y: 55,
              opacity: 0,
              duration: 1,
            },
            "-=0.4"
          )
          .from(
            ".academic-description",
            {
              y: 25,
              opacity: 0,
              duration: 0.8,
            },
            "-=0.5"
          )
          .from(
            ".academic-hero-image",
            {
              scale: 0.92,
              opacity: 0,
              duration: 1.1,
            },
            "-=0.6"
          );

        // Scroll reveal animations
        gsap.utils.toArray(".reveal-section").forEach((element) => {
          gsap.from(element, {
            y: 45,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });

        // Cards stagger animation
        gsap.utils.toArray(".stage-card").forEach((element, index) => {
          gsap.from(element, {
            y: 45,
            opacity: 0,
            duration: 0.75,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          });
        });

        // Floating hero decoration
        gsap.to(".floating-decoration", {
          y: -14,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.3,
        });

      }, pageRef);

      return () => ctx.revert();
    },
    { scope: pageRef }
  );

  return (
    <main
      ref={pageRef}
      className="overflow-hidden bg-[#F7F9FC] text-[#142C4E]"
    >

      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="relative isolate overflow-hidden bg-[#102B4E] px-5 pb-20 pt-24 text-white sm:px-8 lg:px-16 lg:pb-28 lg:pt-32">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-87.5 w-87.5 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#18A99A]/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">

          {/* Hero Content */}
          <div className="max-w-2xl">

            {/* <div className="academic-tag mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9FE6DC]">
              <Sparkles size={15} />
              Academic Excellence
            </div> */}

            <h1 className="academic-heading text-4xl font-bold leading-[1.13] tracking-tight sm:text-5xl lg:text-7xl">
              Learning Today,
              <span className="mt-2 block text-[#65D5C5]">
                Leading Tomorrow.
              </span>
            </h1>

            <p className="academic-description mt-7 max-w-xl text-base leading-8 text-blue-100/80 sm:text-lg">
              At Gayatri Shiksha Niketan, we believe education is more
              than textbooks. We focus on building knowledge, confidence,
              creativity and values at every stage of a student's journey.
            </p>

            <div className="academic-description mt-9 flex flex-wrap gap-4">

              <a
                href="#learning-stages"
                className="group inline-flex items-center gap-3 rounded-full bg-[#EABF68] px-7 py-4 text-sm font-bold text-[#142C4E] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Academics
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#teaching-methodology"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#65D5C5] hover:bg-white/10"
              >
                Our Approach
                <ArrowUpRight size={17} />
              </a>

            </div>

            {/* Hero Highlights */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5 border-t border-white/15 pt-7">

              <div>
                <p className="text-2xl font-bold text-white">Nursery</p>
                <p className="mt-1 text-xs text-blue-100/60">
                  Early Learning
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">Class XII</p>
                <p className="mt-1 text-xs text-blue-100/60">
                  Senior Education
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">CBSE</p>
                <p className="mt-1 text-xs text-blue-100/60">
                  Curriculum Framework
                </p>
              </div>

            </div>
          </div>

          {/* Hero Image */}
          <div className="academic-hero-image relative mx-auto w-full max-w-xl">

            <div className="relative overflow-hidden rounded-4xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30">

              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
                alt="Students learning together in a classroom"
                className="h-87.5 w-full rounded-3xl object-cover sm:h-110"
              />

              <div className="absolute inset-3 rounded-3xl bg-linear-to-t from-[#102B4E]/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9FE6DC]">
                  Every Student Matters
                </span>

                <h3 className="mt-2 max-w-sm text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Every child deserves the opportunity to shine.
                </h3>

              </div>
            </div>

            {/* Floating Decoration */}
            {/* <div className="floating-decoration absolute -left-5 top-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EABF68] text-[#102B4E] shadow-xl sm:-left-8 sm:h-20 sm:w-20">
              <GraduationCap size={35} />
            </div> */}

            {/* <div className="floating-decoration absolute -bottom-5 -right-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-[#159E92] text-white shadow-xl sm:-right-7 sm:h-20 sm:w-20">
              <BookOpen size={32} />
            </div> */}

          </div>
        </div>
      </section>


      {/* =========================
          INTRODUCTION
      ========================== */}

      <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">

        <div className="reveal-section mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
              Our Academic Philosophy
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#102B4E] sm:text-4xl lg:text-5xl">
              Education That Builds
              <span className="text-[#159E92]"> More Than Knowledge.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              We believe every student has unique abilities and potential.
              Our academic approach aims to provide a supportive learning
              environment where children can explore ideas, ask questions,
              develop skills and grow with confidence.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              From the early years to senior secondary education, learning
              experiences should be age-appropriate, meaningful and aligned
              with the applicable CBSE curriculum and school guidelines.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            {academicValues.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`rounded-3xl border border-slate-200/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    index === 1
                      ? "mt-8 bg-[#E9F7F5]"
                      : "bg-white"
                  } ${index === 2 ? "col-span-2" : ""}`}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102B4E] text-[#65D5C5]">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-lg font-bold text-[#102B4E]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =========================
          LEARNING STAGES
      ========================== */}

      <section
        id="learning-stages"
        className="bg-white px-5 py-20 sm:px-8 lg:px-16 lg:py-28"
      >

        <div className="reveal-section mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
              Academic Journey
            </span>

            <h2 className="mt-4 text-3xl font-bold text-[#102B4E] sm:text-4xl lg:text-5xl">
              Learning at Every Stage
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-500">
              A progressive learning journey from early childhood to
              senior secondary education.
            </p>

          </div>

          {/* Stage Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {academicStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = activeStage === index;

              return (
                <button
                  key={stage.number}
                  onClick={() => setActiveStage(index)}
                  className={`stage-card group relative flex h-full flex-col rounded-3xl border p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    isActive
                      ? "border-[#159E92] bg-[#102B4E] text-white shadow-xl shadow-[#102B4E]/15"
                      : "border-slate-200 bg-[#F8FAFC] text-[#102B4E] hover:border-[#159E92]/50"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span className={`text-xs font-bold tracking-[0.2em] ${
                      isActive ? "text-[#65D5C5]" : "text-[#159E92]"
                    }`}>
                      STAGE {stage.number}
                    </span>

                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isActive
                        ? "bg-white/10 text-[#65D5C5]"
                        : "bg-[#E5F5F2] text-[#159E92]"
                    }`}>
                      <Icon size={23} />
                    </div>

                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    {stage.title}
                  </h3>

                  <p className={`mt-2 text-sm font-bold ${
                    isActive ? "text-[#65D5C5]" : "text-[#159E92]"
                  }`}>
                    {stage.classes}
                  </p>

                  <p className={`mt-5 flex-1 text-sm leading-7 ${
                    isActive ? "text-blue-100/75" : "text-slate-500"
                  }`}>
                    {stage.description}
                  </p>

                  <div className={`mt-7 flex items-center justify-between border-t pt-5 ${
                    isActive ? "border-white/15" : "border-slate-200"
                  }`}>

                    <span className="text-xs font-semibold">
                      {stage.age}
                    </span>

                    <ArrowUpRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />

                  </div>

                </button>
              );
            })}

          </div>

          {/* Selected Stage Details */}
          <div className="mt-8 rounded-3xl border border-[#159E92]/20 bg-[#EAF7F5] p-6 sm:p-9">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
                  Explore Selected Stage
                </span>

                <h3 className="mt-3 text-2xl font-bold text-[#102B4E]">
                  {academicStages[activeStage].title}
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {academicStages[activeStage].classes}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102B4E] text-white">
                {(() => {
                  const Icon = academicStages[activeStage].icon;
                  return <Icon size={27} />;
                })()}
              </div>

            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {academicStages[activeStage].subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center gap-3 rounded-xl border border-white bg-white p-4"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#159E92]"
                  />

                  <span className="text-sm font-semibold text-[#102B4E]">
                    {subject}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          TEACHING METHODOLOGY
      ========================== */}

      <section
        id="teaching-methodology"
        className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28"
      >

        <div className="mx-auto max-w-7xl">

          <div className="reveal-section mb-14 max-w-2xl">

            {/* <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
              How We Teach
            </span> */}

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102B4E] sm:text-4xl lg:text-5xl">
              Making Learning
              <span className="text-[#159E92]"> Meaningful.</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-500">
              Effective education combines knowledge, experience,
              curiosity and the opportunity to apply learning in
              everyday life.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {learningMethods.map((method) => {
              const Icon = method.icon;

              return (
                <div
                  key={method.title}
                  className="reveal-section group rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#159E92]/50 hover:shadow-xl"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F6F3] text-[#159E92] transition-all duration-300 group-hover:bg-[#102B4E] group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#102B4E]">
                    {method.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {method.description}
                  </p>

                  <div className="mt-7 h-1 w-10 rounded-full bg-[#159E92] transition-all duration-300 group-hover:w-20" />

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =========================
          LEARNING ENVIRONMENT
      ========================== */}

      <section className="bg-[#102B4E] px-5 py-20 text-white sm:px-8 lg:px-16 lg:py-24">

        <div className="reveal-section mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#65D5C5]">
              Beyond The Classroom
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Learning That Goes
              <span className="text-[#65D5C5]"> Beyond Books.</span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-blue-100/70">
              Education is a continuous process of discovering
              abilities and developing life skills. A balanced
              academic journey also gives importance to creativity,
              physical activity, teamwork and responsible citizenship.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-5">

              {[
                { icon: Palette, label: "Creative Expression" },
                { icon: FlaskConical, label: "Practical Exploration" },
                { icon: Globe, label: "Social Awareness" },
                { icon: Calculator, label: "Logical Thinking" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#65D5C5]">
                      <Icon size={20} />
                    </div>

                    <span className="text-sm font-semibold text-blue-50">
                      {item.label}
                    </span>
                  </div>
                );
              })}

            </div>

          </div>

          <div className="relative">

            <div className="overflow-hidden rounded-4xl border border-white/10 p-3">

              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85"
                alt="Students participating in classroom learning"
                className="h-87.5 w-full rounded-3xl object-cover sm:h-107.5"
              />

            </div>

            <div className="floating-decoration absolute -bottom-5 -left-3 max-w-57.5 rounded-2xl bg-[#EABF68] p-5 text-[#102B4E] shadow-xl sm:-left-8">

              <Sparkles size={22} />

              <p className="mt-3 text-lg font-bold">
                Discover. Learn. Grow.
              </p>

              <p className="mt-1 text-xs leading-5 text-[#102B4E]/70">
                Encouraging every student to explore their potential.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          ASSESSMENT SYSTEM
      ========================== */}

      <section
        id="assessment"
        className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28"
      >

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">

          <div className="reveal-section">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
              Student Evaluation
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102B4E] sm:text-4xl lg:text-5xl">
              Assessment for
              <span className="text-[#159E92]"> Better Learning.</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-500">
              Assessment helps teachers understand student progress
              and identify areas where additional learning support
              may be helpful.
            </p>

            <div className="mt-8 rounded-3xl bg-[#102B4E] p-7 text-white">

              <div className="flex items-center gap-3">
                <Target className="text-[#65D5C5]" size={26} />
                <h3 className="text-xl font-bold">
                  Our Focus
                </h3>
              </div>

              <p className="mt-4 text-sm leading-7 text-blue-100/75">
                Encourage progress, build confidence and support
                students in achieving their learning goals through
                appropriate feedback and guidance.
              </p>

            </div>

          </div>

          {/* Assessment Accordion */}
          <div className="reveal-section space-y-4">

            {assessments.map((item, index) => {
              const isOpen = openAssessment === index;

              return (
                <div
                  key={item.title}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#159E92]/40 bg-white shadow-lg"
                      : "border-slate-200 bg-white"
                  }`}
                >

                  <button
                    onClick={() =>
                      setOpenAssessment(isOpen ? -1 : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >

                    <div className="flex items-center gap-4">

                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        isOpen
                          ? "bg-[#102B4E] text-[#65D5C5]"
                          : "bg-[#EAF7F5] text-[#159E92]"
                      }`}>
                        0{index + 1}
                      </span>

                      <span className="font-bold text-[#102B4E]">
                        {item.title}
                      </span>

                    </div>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#159E92] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />

                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-19 text-sm leading-7 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =========================
          FINAL CTA
      ========================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">

        <div className="reveal-section relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#E8F5F2] px-7 py-14 text-center sm:px-14 sm:py-20">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#159E92]/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102B4E] text-[#65D5C5]">
              <School size={28} />
            </div>

            <span className="mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
              Begin Their Journey
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102B4E] sm:text-4xl lg:text-5xl">
              Every Great Future
              <span className="text-[#159E92]"> Starts With Learning.</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Give your child an opportunity to learn, grow,
              explore and build a brighter future.
            </p>

            <a
              href="/admission"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#102B4E] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#159E92] hover:shadow-xl"
            >
              Explore Admissions
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
