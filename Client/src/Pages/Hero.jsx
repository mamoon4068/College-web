
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { schoolImages } from "../lib/schoolImages";
const heroStaffImage = schoolImages["hero-staff-image.jpeg"];
const heroComputerImage = schoolImages["hero-computer-image.jpeg"];
const heroKnowledgePower = schoolImages["hero-section govt-image.jpeg"];
const heroAdmissonImage = schoolImages["hero-prayer-2 image.jpeg"];

const student1Image = schoolImages["student-Profile/student-01.png"];
const student2Image = schoolImages["student-Profile/student-08.png"];
const student3Image = schoolImages["student-Profile/student-03.png"];
const student4Image = schoolImages["student-Profile/student-04.png"];
const student5Image = schoolImages["student-Profile/student-05.png"];
const student6Image = schoolImages["student-Profile/student-06.png"];
import SchoolCurriculum from "./SchoolCurriculum";
import EventsNotices from "../component/EventsNotices";
gsap.registerPlugin(ScrollTrigger);


// Six hero slides
const slideData = {
  campus: {
    eyebrow: "WELCOME TO OUR CAMPUS",
    title: "Your Future Begins With Quality Education",
    description:
      "Discover an inspiring learning environment where knowledge, creativity and practical skills come together to prepare you for tomorrow.",
    primaryButton: "Explore Academics",
    primaryLink: "/academics",
    secondaryButton: "About Our College",
    secondaryLink: "/about",
    image:
      heroStaffImage,
    imagePosition: "center",
  },

  learning: {
    eyebrow: "LEARN â€¢ GROW â€¢ SUCCEED",
    title: "Learning That Creates New Possibilities",
    description:
      "Build strong foundations through engaging teaching, collaborative learning and opportunities to discover your true potential.",
    primaryButton: "Explore Courses",
    primaryLink: "/fees",
    secondaryButton: "View Admission",
    secondaryLink: "/admmisson",
    image:
      heroComputerImage,
    imagePosition: "center",
  },

  library: {
    eyebrow: "KNOWLEDGE IS POWER",
    title: "A Place Where Ideas Become Achievements",
    description:
      "Explore a learning experience that encourages curiosity, independent thinking and a lifelong passion for knowledge.",
    primaryButton: "Explore Facilities",
    primaryLink: "/gallerypage",
    secondaryButton: "Know More",
    secondaryLink: "/about",
    image:
      heroKnowledgePower,
    imagePosition: "center",
  },

  classroom: {
    eyebrow: "MODERN LEARNING EXPERIENCE",
    title: "Learn Today. Lead Tomorrow.",
    description:
      "Experience interactive classrooms, supportive teaching and a learning environment designed to help every student progress.",
    primaryButton: "Discover Academics",
    primaryLink: "/academics",
    secondaryButton: "Meet Our Authority",
    secondaryLink: "/authoritiespage",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=85",
    imagePosition: "center",
  },

  students: {
    eyebrow: "MORE THAN JUST EDUCATION",
    title: "Explore Your Talent Beyond The Classroom",
    description:
      "Take part in campus activities, teamwork and student experiences that develop confidence, leadership and creativity.",
    primaryButton: "Explore Gallery",
    primaryLink: "/gallerypage",
    secondaryButton: "Student Life",
    secondaryLink: "/about",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2200&q=85",
    imagePosition: "center",
  },

  admission: {
    eyebrow: "ADMISSIONS 2026â€“27",
    title: "Take The First Step Towards Your Dreams",
    description:
      "Start your academic journey with us. Explore admission opportunities and discover the right path for your future.",
    primaryButton: "Apply For Admission",
    primaryLink: "/admmisson",
    secondaryButton: "View Fee Structure",
    secondaryLink: "/fees",
    image:
      heroAdmissonImage,
    imagePosition: "center",
  },
};

const slides = Object.values(slideData);

const ArrowIcon = ({ direction = "right" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    {direction === "left" ? (
      <path d="M19 12H5M12 19l-7-7 7-7" />
    ) : (
      <path d="M5 12h14m-7-7 7 7-7 7" />
    )}
  </svg>
);

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const rotateButtonRef = useRef(null);
  const sectionRef = useRef(null);

  const activeSlide = slides[activeIndex];

  // Detect reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);

      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
    };

    updateMotionPreference();

    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  // Preload all six images
  useEffect(() => {
    slides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  // Automatic slide change
  useEffect(() => {
    if (!isPlaying || isHovered || reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPlaying, isHovered, reducedMotion]);

  // GSAP slide animations
  useEffect(() => {
    const background = backgroundRef.current;
    const content = contentRef.current;

    if (!background || !content) return;

    const contentItems = Array.from(content.children);
    const animationTargets = [background, ...contentItems];

    gsap.killTweensOf(animationTargets);
    gsap.set(animationTargets, {
      clearProps: "opacity,transform",
    });

    // Disable entrance motion when requested by the user device
    if (reducedMotion) return;

    const timeline = gsap.timeline();

    timeline.fromTo(
      background,
      {
        scale: 1.08,
        opacity: 0.65,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
      }
    );

    timeline.fromTo(
      contentItems,
      {
        y: 25,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
      },
      "-=0.7"
    );

    return () => timeline.kill();
  }, [activeIndex, reducedMotion]);

  // Previous slide
  const previousSlide = () => {
    setActiveIndex(
      (previous) => (previous - 1 + slides.length) % slides.length
    );
  };

  // Next slide
  const nextSlide = () => {
    setActiveIndex(
      (previous) => (previous + 1) % slides.length
    );
  };

  // Select particular slide
  const goToSlide = (index) => {
    setActiveIndex(index);
  };





const successStories = {
  neet: {
    exam: "NEET UG",
    category: "Medical Entrance",
    name: "Amit Patel",
    image: student1Image,
    metricLabel: "NEET Entrance Score",
    value: 685,
    prefix: "",
    suffix: "/720",
    decimals: 0,
    icon: "🩺",
    description: "Outstanding performance in the NEET entrance examination.",
    gradient: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-50 text-emerald-700",
  },

  jeeMain: {
    exam: "JEE MAIN",
    category: "Engineering Entrance",
    name: "Sameer Khan",
    image: student2Image,
    metricLabel: "JEE Main Percentile",
    value: 99.84,
    prefix: "",
    suffix: "%",
    decimals: 2,
    icon: "⚙️",
    description: "Excellent achievement in the JEE Main examination.",
    gradient: "from-blue-500 to-cyan-500",
    badge: "bg-blue-50 text-blue-700",
  },

  jeeAdvanced: {
    exam: "JEE ADVANCED",
    category: "Engineering Entrance",
    name: "Adarsh Singh",
    image: student3Image,
    metricLabel: "All India Rank",
    value: 142,
    prefix: "AIR ",
    suffix: "",
    decimals: 0,
    icon: "🏆",
    description: "Remarkable achievement in the JEE Advanced examination.",
    gradient: "from-violet-500 to-purple-500",
    badge: "bg-violet-50 text-violet-700",
  },

  stateBoard12: {
    exam: "STATE BOARD",
    category: "Class XII • Science",
    name: "Komal Kumari",
    image: student4Image,
    metricLabel: "Board Examination Result",
    value: 98.6,
    prefix: "",
    suffix: "%",
    decimals: 2,
    icon: "📚",
    description: "Outstanding performance in the State Board Class XII examination.",
    gradient: "from-orange-500 to-amber-500",
    badge: "bg-orange-50 text-orange-700",
  },

  cbse12: {
    exam: "CBSE",
    category: "Central Board • Class XII",
    name: "Naim Ansari",
    image: student5Image,
    metricLabel: "CBSE Examination Result",
    value: 97.8,
    prefix: "",
    suffix: "%",
    decimals: 2,
    icon: "🎓",
    description: "Excellent performance in the CBSE Class XII examination.",
    gradient: "from-pink-500 to-rose-500",
    badge: "bg-pink-50 text-pink-700",
  },

  stateBoard10: {
    exam: "STATE BOARD",
    category: "Class X • Board Examination",
    name: "Adil Khan",
    image: student6Image,
    metricLabel: "Board Examination Result",
    value: 97.4,
    prefix: "",
    suffix: "%",
    decimals: 2,
    icon: "⭐",
    description: "Excellent achievement in the Class X Board examination.",
    gradient: "from-indigo-500 to-blue-500",
    badge: "bg-indigo-50 text-indigo-700",
  },
};


  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect the user's reduced motion preference
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".success-heading",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Description animation
      gsap.fromTo(
        ".success-intro",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Cards entrance animation
      gsap.fromTo(
        ".success-card",
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".success-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animated score counters
      const counters = section.querySelectorAll(".success-number");

      counters.forEach((counter) => {
        const targetValue = Number(counter.dataset.value);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";
        const decimals = Number(counter.dataset.decimals || 0);

        const counterObject = { value: 0 };

        gsap.to(counterObject, {
          value: targetValue,
          duration: 2,
          delay: 0.3,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent =
              prefix + counterObject.value.toFixed(decimals) + suffix;
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const stories = Object.values(successStories);










  return (
    <>
    <section
      id="home"
      className="relative isolate flex min-h-155 h-[calc(100svh-120px)] max-h-212.5 w-full items-center overflow-hidden bg-slate-950 text-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="College highlights"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={(event) => {
        // Stop rotation when keyboard focus moves into the carousel.
        // The rotation button itself remains usable.
        if (event.target !== rotateButtonRef.current) {
          setIsPlaying(false);
        }
      }}
    >
      {/* Background Image */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${activeSlide.image}")`,
          backgroundPosition: activeSlide.imagePosition,
        }}
      />

      {/* Dark Gradient Overlay for Readable Text */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-slate-950/95 via-slate-950/75 to-slate-950/25" />

      <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950/55 via-transparent to-slate-950/20" />

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-32 top-1/4 z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-20 mx-auto w-full max-w-360 px-12 py-24 sm:px-16 md:px-20 lg:px-28 xl:px-32"
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${slides.length}: ${activeSlide.title}`}
        aria-live={isPlaying ? "off" : "polite"}
      >
       

        {/* Main Heading */}
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {activeSlide.title}
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 md:text-lg">
          {activeSlide.description}
        </p>

        {/* Two CTA Buttons */}
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">

          {/* Primary Button */}
          <a
            href={activeSlide.primaryLink}
            className="group inline-flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/15 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300"
          >
            {activeSlide.primaryButton}

            <ArrowIcon />
          </a>

          {/* Secondary Button */}
          <a
            href={activeSlide.secondaryLink}
            className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-slate-950"
          >
            {activeSlide.secondaryButton}

            <ArrowIcon />
          </a>
        </div>

     
      </div>

      {/* Previous Arrow - Desktop */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950 md:flex lg:left-8"
      >
        <ArrowIcon direction="left" />
      </button>

      {/* Next Arrow - Desktop */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950 md:flex lg:right-8"
      >
        <ArrowIcon />
      </button>

      {/* Bottom Slider Controls */}
      <div className="absolute bottom-5 left-0 right-0 z-30 mx-auto flex w-full max-w-360 items-center justify-between gap-4 px-5 sm:px-12 lg:px-20">

        

        {/* Play / Pause and Mobile Arrows */}
        <div className="flex items-center gap-2">
          {/* Mobile Previous */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-amber-400 hover:text-slate-950 md:hidden"
          >
            <ArrowIcon direction="left" />
          </button>

          {/* Mobile Next */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-amber-400 hover:text-slate-950 md:hidden"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>







    <section
      ref={sectionRef}
      id="success-stories"
      className="relative overflow-hidden bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-200/30 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-purple-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-325">

        {/* Section Heading */}
        <div className="mx-auto  mb-14 max-w-3xl text-center">

          {/* <span className="success-heading inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[2px] text-blue-700 shadow-sm">
            🏆 Celebrating Excellence
          </span> */}

          <h2 className="success-heading mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Our Pride, Our{" "}
            <span className="bg-linear-to-r  bg-clip-text ">
              Success Stories
            </span>
          </h2>

          <p className="success-intro mx-auto mt-5 max-w-5xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Every achievement represents dedication, determination and hard
            work. We celebrate our students who inspire the next generation
            through their academic excellence.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div className="success-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {stories.map((student, index) => (
            <article
              key={student.exam + index}
              className="success-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 sm:p-7"
            >
              {/* Top Gradient Line */}
              <div
                className={`absolute left-0 top-0 h-1 w-full bg-linear-to-r ${student.gradient}`}
              />

              <img
                src={student.image}
                alt={student.name}
                className="mb-5 h-48 w-full rounded-xl object-cover object-center"
                loading="lazy"
              />

              {/* Card Top */}
              <div className="flex items-center justify-between gap-3">

                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-xl text-2xl ${student.badge}`}
                >
                  {student.icon}
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${student.badge}`}
                >
                  {student.exam}
                </span>
              </div>

              {/* Student Information */}
              <div className="mt-7">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Student Achievement
                </p>

                <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                  {student.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {student.category}
                </p>
              </div>

              {/* Result Metric */}
              <div className="mt-7 rounded-xl bg-slate-50 p-5 transition-colors duration-300 group-hover:bg-blue-50/70">

                <p className="text-xs font-semibold text-slate-500">
                  {student.metricLabel}
                </p>

                <div
                  className={`success-number mt-2 bg-linear-to-r ${student.gradient} bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl`}
                  data-value={student.value}
                  data-prefix={student.prefix}
                  data-suffix={student.suffix}
                  data-decimals={student.decimals}
                >
                  {student.prefix}
                  {student.value.toFixed(student.decimals)}
                  {student.suffix}
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 text-sm leading-6 text-slate-600">
                {student.description}
              </p>

              {/* Bottom Decoration */}
              {/* <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

                <span className="text-xs font-semibold text-slate-400">
                  Academic Excellence
                </span>

                <span
                  className={`h-2.5 w-2.5 rounded-full bg-linear-to-r ${student.gradient}`}
                />
              </div> */}

            </article>
          ))}

        </div>
      </div>
    </section>
    <SchoolCurriculum/>
    <EventsNotices/>



    </>
  );
};

export default Hero;