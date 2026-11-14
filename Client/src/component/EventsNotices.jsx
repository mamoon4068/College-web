
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ================================================
// 1. SCHOOL EVENTS
// ================================================

const schoolEvents = [
  {
    id: "childrens-day",
    date: "2026-11-14",
    title: "Children's Day Celebration",
    category: "Celebration",
    icon: "🎈",
    audience: "Nursery to Class XII",
    shortDescription:
      "Celebrate childhood through creative activities, games and performances that make every student feel valued, included and inspired.",
    details:
      "Children's Day is observed on 14 November in India. The school may organise special activities, performances and creative experiences. Please follow the official school circular for programme timings, venue and participation details.",
    status: "OBSERVANCE",
  },
  {
    id: "constitution-day",
    date: "2026-11-26",
    title: "Constitution Day",
    category: "Academic",
    icon: "🇮🇳",
    audience: "Classes I to XII",
    shortDescription:
      "Explore India's Constitution, democratic values, fundamental rights and duties through age-appropriate discussions and learning activities.",
    details:
      "Students can participate in educational activities focused on the Constitution of India, democratic principles, fundamental rights, duties and responsible citizenship. Programme details are subject to the official school schedule.",
    status: "OBSERVANCE",
  },
  {
    id: "ptm",
    date: "2026-12-05",
    title: "Parent–Teacher Meeting",
    category: "Meeting",
    icon: "👨‍👩‍👧",
    audience: "All Classes",
    shortDescription:
      "Parents and teachers discuss academic progress, classroom participation, student wellbeing and practical ways to support learning at home.",
    details:
      "The proposed meeting provides an opportunity to discuss student performance, attendance, classroom behaviour, strengths and areas for improvement. Confirm the date and individual meeting slots through the school office.",
    status: "SAMPLE",
  },
  {
    id: "sports-day",
    date: "2026-12-12",
    title: "Sports & Activity Day",
    category: "Activities",
    icon: "🏆",
    audience: "Nursery to Class XII",
    shortDescription:
      "Promote teamwork, fitness and fair play through age-appropriate games, friendly competitions and enjoyable group activities.",
    details:
      "A proposed sports and activity event to encourage physical fitness, teamwork, confidence and healthy competition. Event participation, reporting time and venue should be confirmed through the official school notice.",
    status: "SAMPLE",
  },
];


// ================================================
// 2. SCHOOL NOTICE BOARD
// ================================================

const schoolNotices = [
  {
    id: "fees",
    category: "Fees",
    priority: "IMPORTANT",
    icon: "💳",
    title: "Fee Submission & Outstanding Dues",
    audience: "Parents · Nursery to Class XII",
    reference: "ACCOUNTS / FEE CIRCULAR",
    summary:
      "Parents are requested to follow the published school fee schedule and clear outstanding dues within the communicated deadline.",
    details: [
      "Please check the fee schedule issued by the school office or accounts department.",
      "Keep the payment receipt safely for future reference.",
      "For fee-related queries, contact the school accounts office.",
      "Any late fee or administrative action must follow the school's approved and communicated fee policy.",
    ],
    action:
      "Please refer to the latest official fee circular for the actual due date and payment instructions.",
  },
  {
    id: "discipline",
    category: "Discipline",
    priority: "STRICT REMINDER",
    icon: "⚖️",
    title: "Student Discipline & Code of Conduct",
    audience: "All Students · Nursery to Class XII",
    reference: "DISCIPLINE / SCHOOL RULES",
    summary:
      "Every student is expected to maintain discipline, respect teachers and classmates, and follow school rules.",
    details: [
      "Bullying, abusive language, fighting and disrespectful behaviour are not acceptable.",
      "Students must respect school property and maintain cleanliness.",
      "Repeated or serious misconduct will be reviewed by the school administration.",
      "Parents or guardians may be called for a meeting, and appropriate action may be taken according to the school's published disciplinary policy.",
    ],
    action:
      "Students and parents are requested to read and follow the school's code of conduct.",
  },
  {
    id: "attendance",
    category: "Discipline",
    priority: "MANDATORY",
    icon: "⏰",
    title: "Attendance & Punctuality",
    audience: "All Classes",
    reference: "ATTENDANCE / CIRCULAR",
    summary:
      "Regular attendance and arriving on time are essential for maintaining academic continuity.",
    details: [
      "Students should reach school before the prescribed reporting time.",
      "Parents should inform the school about absence through the approved procedure.",
      "Leave applications should be submitted according to school rules.",
      "Repeated late arrival or unexplained absence may require a parent meeting and further action under the attendance policy.",
    ],
    action:
      "Follow the official school timetable and attendance requirements.",
  },
  {
    id: "uniform",
    category: "Discipline",
    priority: "SCHOOL GUIDELINE",
    icon: "👔",
    title: "School Uniform & Identity Card",
    audience: "Nursery to Class XII",
    reference: "STUDENT / GUIDELINES",
    summary:
      "Students should attend school in the prescribed uniform and carry their valid identity card.",
    details: [
      "Wear the prescribed school uniform on regular working days.",
      "Follow the specified sports or activity uniform schedule.",
      "Carry your school identity card.",
      "Parents should contact the school office if a student is unable to follow the prescribed uniform requirements.",
    ],
    action:
      "Please follow the latest uniform guidelines issued by the school.",
  },
  {
    id: "academic",
    category: "Academic",
    priority: "ACADEMIC UPDATE",
    icon: "📚",
    title: "Homework & Examination Guidelines",
    audience: "Classes I to XII",
    reference: "ACADEMICS / STUDENTS",
    summary:
      "Students are encouraged to complete assignments on time and prepare regularly for assessments.",
    details: [
      "Complete classwork and homework within the given deadline.",
      "Bring the required books, notebooks and learning materials.",
      "Follow examination instructions issued by the school.",
      "Contact the class teacher for academic clarification.",
    ],
    action:
      "Check the school diary and official examination timetable for updates.",
  },
];


// ================================================
// 3. DATE FORMATTER
// ================================================

const formatEventDate = (dateString) => {
  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Date to be announced";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


// ================================================
// 4. EVENT CARD COMPONENT
// ================================================

const EventCard = ({ event, expanded, onToggle }) => {
  const detailsId = `event-details-${event.id}`;
  const isSample = event.status === "SAMPLE";

  return (
    <article
      className={`events-event-card group overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        expanded
          ? "border-blue-300 shadow-lg shadow-blue-900/5"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">

        {/* Event Icon */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#14264B] text-2xl shadow-md sm:h-14 sm:w-14">
          {event.icon}
        </div>

        {/* Event Information */}

        <div className="min-w-0 flex-1">

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#3975F6]">
              {event.category}
            </span>

            <span
              className={`rounded-full px-2 py-1 text-[8px] font-bold ${
                isSample
                  ? "bg-orange-50 text-orange-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {event.status}
            </span>
          </div>

          <h4 className="text-sm font-extrabold leading-5 text-[#14264B] sm:text-base">
            {event.title}
          </h4>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              📅 {formatEventDate(event.date)}
            </span>

            <span className="text-[10px] font-semibold text-slate-400">
              {event.audience}
            </span>
          </div>

          <p className="mt-3 text-xs leading-6 text-slate-500">
            {event.shortDescription}
          </p>
        </div>

        {/* Expand Button */}

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            expanded
              ? `Close ${event.title} details`
              : `View ${event.title} details`
          }
          aria-expanded={expanded}
          aria-controls={detailsId}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
            expanded
              ? "bg-[#F0805A]"
              : "bg-[#3975F6] hover:bg-[#14264B]"
          }`}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {expanded ? (
              <path d="M5 12h14" />
            ) : (
              <>
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Event Expanded Details */}

      <div
        id={detailsId}
        aria-hidden={!expanded}
        className={`grid transition-all duration-300 ease-in-out ${
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-4 border-t border-slate-100 py-4 sm:mx-5">

            <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#3975F6]">
              Event Details
            </span>

            <p className="mt-3 text-xs leading-7 text-slate-600">
              {event.details}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#F3F7FF] p-3">
              <span className="text-[10px] font-bold text-[#14264B]">
                {event.audience}
              </span>

              <span className="text-[10px] font-bold text-[#3975F6]">
                {formatEventDate(event.date)}
              </span>
            </div>

            {isSample && (
              <p className="mt-3 text-[10px] font-semibold leading-5 text-orange-700">
                Demo entry: replace this date and programme with a school-approved event before publishing.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};


// ================================================
// 5. NOTICE CARD COMPONENT
// ================================================

const NoticeCard = ({ notice, expanded, onToggle }) => {
  const detailsId = `notice-details-${notice.id}`;

  return (
    <article
      className={`notice-card overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md ${
        expanded
          ? "border-blue-300 shadow-md shadow-blue-900/5"
          : "border-slate-200"
      }`}
    >

      {/* Notice Header */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="flex w-full items-start gap-3 p-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 sm:p-5"
      >

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF3FF] text-xl">
          {notice.icon}
        </span>

        <span className="min-w-0 flex-1">

          <span className="mb-2 flex flex-wrap items-center gap-2">

            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#3975F6]">
              {notice.category}
            </span>

            <span className="rounded-full bg-orange-50 px-2 py-1 text-[8px] font-bold text-orange-600">
              {notice.priority}
            </span>

          </span>

          <span className="block text-sm font-extrabold leading-5 text-[#14264B]">
            {notice.title}
          </span>

          <span className="mt-1 block text-[10px] font-medium text-slate-400">
            {notice.audience}
          </span>

        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white transition-colors ${
            expanded
              ? "bg-[#F0805A]"
              : "bg-[#3975F6]"
          }`}
          aria-hidden="true"
        >
          {expanded ? "−" : "+"}
        </span>

      </button>

      {/* Notice Details */}

      <div
        id={detailsId}
        aria-hidden={!expanded}
        className={`grid transition-all duration-300 ease-in-out ${
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-slate-100 px-5 py-5">

            <div className="mb-4 rounded-xl bg-[#F5F7FB] p-4">
              <p className="text-xs leading-6 text-slate-600">
                {notice.summary}
              </p>
            </div>

            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#14264B]">
              Notice Details
            </p>

            <ul className="space-y-3">
              {notice.details.map((detail, index) => (
                <li
                  key={`${notice.id}-${index}`}
                  className="flex items-start gap-2 text-xs leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F0805A]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-4">

              <p className="text-[9px] font-extrabold uppercase tracking-widest text-orange-700">
                Important Reminder
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-700">
                {notice.action}
              </p>

            </div>

            <p className="mt-4 text-[9px] font-bold tracking-wider text-slate-400">
              {notice.reference}
            </p>

          </div>
        </div>
      </div>

    </article>
  );
};


// ================================================
// 6. MAIN EVENTS & NOTICES COMPONENT
// ================================================

const EventsNotices = () => {

  const sectionRef = useRef(null);

  // Event accordion
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Notice filters
  const [activeFilter, setActiveFilter] = useState("All");

  // Notice accordion
  const [expandedNotice, setExpandedNotice] = useState("fees");


  const filters = [
    "All",
    "Fees",
    "Discipline",
    "Academic",
  ];


  // Filter Notices

  const filteredNotices = useMemo(() => {

    if (activeFilter === "All") {
      return schoolNotices;
    }

    return schoolNotices.filter(
      (notice) => notice.category === activeFilter
    );

  }, [activeFilter]);


  // ================================================
  // GSAP SCROLL ANIMATIONS
  // ================================================

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      // Heading Animation

      gsap.fromTo(
        ".events-heading",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );


      // Events Panel Animation

      gsap.fromTo(
        ".events-events-panel",
        {
          autoAlpha: 0,
          x: -35,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            once: true,
          },
        }
      );


      // Notice Panel Animation

      gsap.fromTo(
        ".events-notice-panel",
        {
          autoAlpha: 0,
          x: 35,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            once: true,
          },
        }
      );


      // Individual Event Card Animation

      gsap.fromTo(
        ".events-event-card",
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".events-events-panel",
            start: "top 82%",
            once: true,
          },
        }
      );


      // Bottom CTA Animation

      gsap.fromTo(
        ".events-bottom-cta",
        {
          autoAlpha: 0,
          y: 25,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".events-bottom-cta",
            start: "top 92%",
            once: true,
          },
        }
      );

    }, sectionRef);


    return () => ctx.revert();

  }, []);


  // ================================================
  // MAIN JSX
  // ================================================

  return (

    <section
      ref={sectionRef}
      id="events-notices"
      className="relative isolate overflow-hidden bg-[#f1f0ec] py-16 sm:py-20 lg:py-10"
    >

      {/* BACKGROUND DECORATIONS */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-[110px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-orange-100/50 blur-[110px]" />


      <div className="relative mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">


        {/* ====================================== */}
        {/* SECTION HEADING */}
        {/* ====================================== */}

        <div className="events-heading mb-10 text-center sm:mb-14">

          {/* <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[9px] font-extrabold tracking-[2px] text-[#3975F6] sm:text-xs">

            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />

            SCHOOL LIFE · EVENTS & CIRCULARS

          </span> */}


          <h2 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-black leading-tight tracking-[-0.04em] text-[#071B3A]">

            Stay Informed.

            <span className="block text-[#3975F6]">
              Stay Involved.
            </span>

          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-xs leading-7 text-slate-600 sm:text-sm lg:text-base">

            Discover school celebrations, important academic
            activities and essential updates for parents and
            students from Nursery to Class XII.

          </p>


          {/* <div className="mt-6 flex flex-wrap justify-center gap-2">

            <span className="rounded-full bg-white px-4 py-2 text-[9px] font-bold text-[#14264B] shadow-sm sm:text-xs">
              🎒 Nursery – Class XII
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-[9px] font-bold text-[#14264B] shadow-sm sm:text-xs">
              🎉 Campus Events
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-[9px] font-bold text-[#14264B] shadow-sm sm:text-xs">
              🔔 Important Notices
            </span>

          </div> */}

        </div>


        {/* ====================================== */}
        {/* EVENTS + NOTICE BOARD */}
        {/* ====================================== */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-7">


          {/* ================================== */}
          {/* LEFT: UPCOMING EVENTS */}
          {/* ================================== */}

          <div className="events-events-panel overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(23,42,70,0.06)] sm:rounded-[30px]">


            {/* EVENTS HEADER */}

            <div className="relative overflow-hidden bg-[#14264B] p-5 sm:p-7">

              <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative flex items-center justify-between gap-3">

                <div>

                  <span className="text-[9px] font-bold tracking-[2px] text-blue-200">
                    CAMPUS HAPPENINGS
                  </span>

                  <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                    Upcoming Events
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    Discover what's happening at our school.
                  </p>

                </div>

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl">
                  🎉
                </span>

              </div>


              {/* <div className="relative mt-6 flex items-center justify-between gap-2 border-t border-white/15 pt-4">

                <span className="text-[10px] font-bold tracking-wider text-slate-300">
                  EVENTS & ACTIVITIES
                </span>

                <span className="rounded-full bg-[#F0805A] px-3 py-1.5 text-[9px] font-extrabold text-white">
                  {schoolEvents.length} EVENTS
                </span>

              </div> */}

            </div>


            {/* EVENT LIST */}

            <div className="space-y-3 p-4 sm:p-6">

              {schoolEvents.map((event) => (

                <EventCard
                  key={event.id}
                  event={event}
                  expanded={expandedEvent === event.id}
                  onToggle={() =>
                    setExpandedEvent((current) =>
                      current === event.id
                        ? null
                        : event.id
                    )
                  }
                />

              ))}

            </div>


            {/* EVENTS FOOTER */}

            {/* <div className="border-t border-slate-100 bg-[#F8FAFC] px-5 py-4">

              <p className="text-center text-[10px] leading-5 text-slate-500">

                Event timings, venues and participation
                instructions will be shared through the
                school's official circulars.

              </p>

            </div> */}

          </div>


          {/* ================================== */}
          {/* RIGHT: NOTICE BOARD */}
          {/* ================================== */}

          <div className="events-notice-panel overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(23,42,70,0.06)] sm:rounded-[30px]">


            {/* NOTICE HEADER */}

            <div className="bg-[#14264B] p-5 sm:p-7">

              <div className="flex items-start justify-between gap-3">

                <div>

                  <span className="text-[9px] font-bold tracking-[2px] text-blue-200">
                    PARENTS & STUDENTS
                  </span>

                  <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                    Notice Board
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    Important circulars, reminders and school guidelines.
                  </p>

                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  📢
                </span>

              </div>

            </div>


            <div className="p-4 sm:p-6">


              {/* NOTICE FILTERS */}

              <div className="mb-5">

                <p className="mb-3 text-[9px] font-extrabold uppercase tracking-[1.5px] text-slate-400">
                  Filter Notices
                </p>


                <div className="flex flex-wrap gap-2">

                  {filters.map((filter) => {

                    const active = activeFilter === filter;

                    return (

                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        aria-pressed={active}
                        className={`rounded-full border px-3 py-2 text-[9px] font-bold transition-all duration-200 sm:text-[10px] ${
                          active
                            ? "border-[#14264B] bg-[#14264B] text-white shadow-md"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600"
                        }`}
                      >

                        {filter}

                      </button>

                    );

                  })}

                </div>

              </div>


              {/* INFORMATION */}

              <div className="mb-5 flex items-start gap-2 rounded-xl border border-orange-100 bg-orange-50 p-3">

                <span aria-hidden="true">ℹ️</span>

                <p className="text-[10px] leading-5 text-orange-800">

                  These are editable notice templates.
                  Replace them with the school's approved
                  circulars, dates and policies before publishing.

                </p>

              </div>


              {/* NOTICE LIST */}

              <div className="space-y-3">

                {filteredNotices.map((notice) => (

                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    expanded={expandedNotice === notice.id}
                    onToggle={() =>
                      setExpandedNotice((current) =>
                        current === notice.id
                          ? null
                          : notice.id
                      )
                    }
                  />

                ))}


                {filteredNotices.length === 0 && (

                  <div className="rounded-2xl bg-slate-50 p-8 text-center">

                    <span className="text-3xl">
                      📭
                    </span>

                    <p className="mt-3 text-sm font-bold text-[#14264B]">
                      No notices found
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Try another category.
                    </p>

                  </div>

                )}

              </div>


              {/* NOTICE FOOTER */}

              {/* <div className="mt-5 border-t border-slate-100 pt-4">

                <p className="text-[10px] leading-6 text-slate-500">

                  For official clarification, parents and
                  students should contact the school office
                  or refer to the latest signed circular.

                </p>

              </div> */}

            </div>

          </div>

        </div>


        {/* ====================================== */}
        {/* BOTTOM CALL TO ACTION */}
        {/* ====================================== */}

        <div className="events-bottom-cta mt-8 flex flex-col justify-between gap-5 overflow-hidden rounded-3xl bg-linear-to-r from-[#14264B] to-[#203F69] p-6 sm:p-9 lg:flex-row lg:items-center">

          <div>

            <span className="text-[9px] font-extrabold tracking-[2px] text-[#F49A79]">
              STAY CONNECTED
            </span>

            <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              Never Miss an Important Update.
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">

              For event details, fee clarification and
              official school notices, connect with our
              administration.

            </p>

          </div>


          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#F0805A] px-6 py-4 text-xs font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#E76B43] hover:shadow-lg hover:shadow-orange-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >

            Contact School Office

            <span aria-hidden="true">
              ↗
            </span>

          </a>

        </div>


        {/* FOOTNOTE */}

        {/* <p className="mt-6 text-center text-[9px] leading-5 text-slate-500">

          Event dates and notice templates are illustrative
          until confirmed and published by the school administration.

        </p> */}

      </div>

    </section>

  );
};

export default EventsNotices;

