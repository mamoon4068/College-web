
import {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. SCHOOL EVENTS DATA
// ==========================================

const schoolEvents = [
  {
    id: 1,
    title: "Children's Day Celebration",
    date: "2026-11-14",
    category: "Celebration",
    description:
      "A special celebration dedicated to our beloved students. The day includes cultural performances, fun activities, games and memorable moments.",
    venue: "School Campus",
    time: "09:00 AM - 01:00 PM",
    icon: "🎉",
  },
  {
    id: 2,
    title: "Constitution Day",
    date: "2026-11-26",
    category: "Academic",
    description:
      "Students will participate in speeches, quizzes and activities to understand the importance of the Indian Constitution and its values.",
    venue: "School Auditorium",
    time: "10:00 AM - 12:00 PM",
    icon: "🇮🇳",
  },
  {
    id: 3,
    title: "Parent Teacher Meeting",
    date: "2026-12-05",
    category: "Meeting",
    description:
      "Parents are invited to discuss their child's academic progress, classroom performance, attendance and overall development with teachers.",
    venue: "Respective Classrooms",
    time: "10:00 AM - 02:00 PM",
    icon: "👨‍👩‍👧",
  },
  {
    id: 4,
    title: "Annual Sports Day",
    date: "2026-12-20",
    category: "Sports",
    description:
      "An exciting day of sports competitions, team activities, athletics and awards to encourage teamwork, discipline and sportsmanship.",
    venue: "School Playground",
    time: "08:30 AM - 02:00 PM",
    icon: "🏆",
  },
];

// ==========================================
// 2. SCHOOL NOTICES DATA
// ==========================================

const schoolNotices = [
  {
    id: 1,
    title: "Important Fee Submission Notice",
    date: "2026-11-10",
    category: "Fees",
    description:
      "All parents are requested to submit the pending school fees within the prescribed deadline. Please contact the school office for fee-related queries.",
    priority: "Important",
  },
  {
    id: 2,
    title: "School Discipline Guidelines",
    date: "2026-11-08",
    category: "General",
    description:
      "Students must maintain discipline, follow school rules, respect teachers and maintain cleanliness throughout the school campus.",
    priority: "General",
  },
  {
    id: 3,
    title: "Attendance and Punctuality",
    date: "2026-11-06",
    category: "Academic",
    description:
      "Students are expected to attend school regularly and arrive before the morning assembly. Parents should inform the school in case of absence.",
    priority: "Important",
  },
  {
    id: 4,
    title: "School Uniform Guidelines",
    date: "2026-11-04",
    category: "General",
    description:
      "All students must wear the prescribed school uniform, proper shoes and identity card. Students should maintain a neat and clean appearance.",
    priority: "General",
  },
  {
    id: 5,
    title: "Academic Session Updates",
    date: "2026-11-01",
    category: "Academic",
    description:
      "Students should regularly complete their assignments, revise classroom lessons and follow the academic schedule shared by their respective teachers.",
    priority: "General",
  },
];

// ==========================================
// 3. DATE FORMATTER
// ==========================================

const formatEventDate = (date) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==========================================
// 4. GSAP ACCORDION
// Actual height animation - no extra spacing
// ==========================================

const AccordionContent = ({ expanded, children, id }) => {
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const element = wrapperRef.current;

    if (!element) return;

    // Stop previous animation before starting another.
    gsap.killTweensOf(element);

    if (expanded) {
      // Measure actual content height.
      const targetHeight = element.scrollHeight;

      gsap.fromTo(
        element,
        {
          height: element.getBoundingClientRect().height,
        },
        {
          height: targetHeight,
          duration: 0.35,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            // Auto height allows content to determine its own size.
            gsap.set(element, { height: "auto" });
          },
        }
      );
    } else {
      // Read current visible height before closing.
      const currentHeight = element.getBoundingClientRect().height;

      gsap.fromTo(
        element,
        {
          height: currentHeight,
        },
        {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: true,
        }
      );
    }

    return () => {
      gsap.killTweensOf(element);
    };
  }, [expanded]);

  return (
    <div
      ref={wrapperRef}
      id={id}
      aria-hidden={!expanded}
      inert={!expanded}
      style={{
        height: 0,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

// ==========================================
// 5. EVENT CARD
// ==========================================

const EventCard = ({ event, expanded, onToggle }) => {
  const detailsId = `event-details-${event.id}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-md">

      {/* Event Header */}
      <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">

        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F3F8] text-2xl sm:h-14 sm:w-14">
          {event.icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <div className="mb-2 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-[#EEF2F8] px-3 py-1 text-[11px] font-bold text-[#14264B]">
              {event.category}
            </span>

            <span className="text-xs font-medium text-slate-500">
              {formatEventDate(event.date)}
            </span>

          </div>

          <h4 className="text-sm font-bold leading-snug text-[#14264B] sm:text-base">
            {event.title}
          </h4>

          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
            {event.description}
          </p>

        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={detailsId}
          aria-label={expanded ? "Close event details" : "View event details"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg text-[#14264B] transition-all duration-300 hover:border-[#14264B] hover:bg-[#14264B] hover:text-white"
        >
          {expanded ? "−" : "+"}
        </button>

      </div>

      {/* Event Details */}
      <AccordionContent expanded={expanded} id={detailsId}>

        <div className="border-t border-slate-200 bg-[#F8F9FB] px-4 py-4 sm:px-5">

          <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#14264B]">
            Event Details
          </h5>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Date
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {formatEventDate(event.date)}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Time
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {event.time}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Venue
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {event.venue}
              </p>
            </div>

          </div>

        </div>

      </AccordionContent>

    </article>
  );
};

// ==========================================
// 6. NOTICE CARD
// ==========================================

const NoticeCard = ({ notice, expanded, onToggle }) => {
  const detailsId = `notice-details-${notice.id}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-md">

      {/* Notice Header */}
      <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">

        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EA] text-xl">
          📢
        </div>

        {/* Notice Content */}
        <div className="min-w-0 flex-1">

          <div className="mb-2 flex flex-wrap items-center gap-2">

            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                notice.priority === "Important"
                  ? "bg-red-50 text-red-600"
                  : "bg-[#EEF2F8] text-[#14264B]"
              }`}
            >
              {notice.priority}
            </span>

            <span className="text-xs font-medium text-slate-500">
              {formatEventDate(notice.date)}
            </span>

          </div>

          <h4 className="text-sm font-bold leading-snug text-[#14264B] sm:text-base">
            {notice.title}
          </h4>

          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
            {notice.description}
          </p>

        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={detailsId}
          aria-label={expanded ? "Close notice details" : "View notice details"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg text-[#14264B] transition-all duration-300 hover:border-[#14264B] hover:bg-[#14264B] hover:text-white"
        >
          {expanded ? "−" : "+"}
        </button>

      </div>

      {/* Notice Details */}
      <AccordionContent expanded={expanded} id={detailsId}>

        <div className="border-t border-slate-200 bg-[#F8F9FB] px-4 py-4 sm:px-5">

          <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#14264B]">
            Notice Information
          </h5>

          <p className="text-sm leading-relaxed text-slate-600">
            {notice.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

            <span className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600">
              Category: {notice.category}
            </span>

            <span className="text-xs text-slate-500">
              Published: {formatEventDate(notice.date)}
            </span>

          </div>

        </div>

      </AccordionContent>

    </article>
  );
};

// ==========================================
// 7. MAIN EVENTS & NOTICES COMPONENT
// ==========================================

const EventsNotices = () => {
  const sectionRef = useRef(null);

  // Default: all cards closed.
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [expandedNotice, setExpandedNotice] = useState(null);

  const [activeFilter, setActiveFilter] = useState("All");

  // Notice filters
  const filters = ["All", "Academic", "Fees", "General"];

  const filteredNotices = useMemo(() => {
    if (activeFilter === "All") {
      return schoolNotices;
    }

    return schoolNotices.filter(
      (notice) => notice.category === activeFilter
    );
  }, [activeFilter]);

  // ==========================================
  // GSAP SECTION ANIMATION
  // ==========================================

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".events-heading");
      const eventPanel = section.querySelector(".events-events-panel");
      const noticePanel = section.querySelector(".events-notice-panel");
      const bottomCTA = section.querySelector(".events-bottom-cta");

      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        [eventPanel, noticePanel],
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eventPanel,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        bottomCTA,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomCTA,
            start: "top 90%",
            once: true,
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // EVENT TOGGLE
  // ==========================================

  const handleEventToggle = (id) => {
    setExpandedEvent((previous) =>
      previous === id ? null : id
    );
  };

  // ==========================================
  // NOTICE TOGGLE
  // ==========================================

  const handleNoticeToggle = (id) => {
    setExpandedNotice((previous) =>
      previous === id ? null : id
    );
  };

  // ==========================================
  // MAIN JSX
  // ==========================================

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F8F5] py-16 sm:py-20 lg:py-28"
    >

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#E8EDF5]/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#EFEAE0]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">

        {/* ======================================
            SECTION HEADING
        ====================================== */}

        <div className="events-heading mb-10 text-center sm:mb-12">

          <span className="inline-flex rounded-full border border-[#DCE3ED] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14264B] sm:text-xs">
            School Updates
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#14264B] sm:text-4xl lg:text-5xl">
            Events & Notices
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Stay informed about upcoming school activities,
            important announcements and the latest updates.
          </p>

        </div>

        {/* ======================================
            MAIN TWO COLUMN LAYOUT
        ====================================== */}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">

          {/* ======================================
              LEFT: EVENTS PANEL
          ====================================== */}

          <div className="events-events-panel min-w-0 self-start overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm sm:rounded-[30px]">

            {/* Panel Header */}
            <div className="flex items-center justify-between gap-3 bg-[#14264B] px-5 py-5 sm:px-7 sm:py-6">

              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Upcoming Events
                </h3>

                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  School activities and celebrations
                </p>
              </div>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white">
                {schoolEvents.length} Events
              </span>

            </div>

            {/* Events List */}
            <div className="space-y-3 p-4 sm:p-5">

              {schoolEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  expanded={expandedEvent === event.id}
                  onToggle={() => handleEventToggle(event.id)}
                />
              ))}

            </div>

          </div>

          {/* ======================================
              RIGHT: NOTICES PANEL
          ====================================== */}

          <div className="events-notice-panel min-w-0 self-start overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm sm:rounded-[30px]">

            {/* Panel Header */}
            <div className="flex items-center justify-between gap-3 bg-[#071B3A] px-5 py-5 sm:px-7 sm:py-6">

              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Latest Notices
                </h3>

                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  Important school announcements
                </p>
              </div>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white">
                {filteredNotices.length} Notices
              </span>

            </div>

            {/* Notice Filters */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-4 sm:px-5">

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#14264B] text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#14264B] hover:text-[#14264B]"
                  }`}
                >
                  {filter}
                </button>
              ))}

            </div>

            {/* Notices List */}
            <div className="space-y-3 p-4 sm:p-5">

              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    expanded={expandedNotice === notice.id}
                    onToggle={() => handleNoticeToggle(notice.id)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-[#F8F9FB] p-8 text-center">
                  <p className="text-sm text-slate-500">
                    No notices available in this category.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ======================================
            BOTTOM CTA
        ====================================== */}

        <div className="events-bottom-cta mt-8 overflow-hidden rounded-[26px] bg-[#14264B] px-5 py-8 text-center sm:rounded-[30px] sm:px-10 sm:py-10">

          <h3 className="text-xl font-extrabold text-white sm:text-2xl">
            Stay Connected With Our School
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            For more information about school activities, events
            and announcements, please contact our school administration.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#14264B] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 hover:shadow-lg"
          >
            Contact Us
            <span className="ml-2">→</span>
          </a>

        </div>

      </div>

    </section>
  );
};

export default EventsNotices;
