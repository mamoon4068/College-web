
import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  Images,
  Camera,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
  Maximize2,
  Image as ImageIcon,
  Play,
  Grid3X3,
  Heart,
} from "lucide-react";
import { schoolImages } from "../lib/schoolImages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ======================================================
// IMAGE CATEGORY DETECTION
// Category is detected from the image filename.
// ======================================================

const detectCategory = (filename) => {
  const name = filename.toLowerCase();

  if (/event|annual|function|celebration|festival|farewell|cultural/.test(name)) {
    return "Events";
  }

  if (/sport|game|football|cricket|athletic|competition|yoga/.test(name)) {
    return "Sports";
  }

  if (/classroom|teacher|teaching|lesson|student|study/.test(name)) {
    return "Academics";
  }

  if (/building|campus|school|library|lab|laboratory|computer/.test(name)) {
    return "Campus";
  }

  if (/activity|art|dance|music|drawing|craft|workshop/.test(name)) {
    return "Activities";
  }

  return "General";
};

// ======================================================
// CONVERT ASSETS INTO GALLERY DATA
// ======================================================

const galleryImages = Object.entries(schoolImages)
  .map(([path, src], index) => {
    const filename = path.split("/").pop();

    const title = filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return {
      id: `${index}-${filename}`,
      src,
      title,
      category: detectCategory(filename),
      filename,
    };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename));

// ======================================================
// GALLERY PAGE
// ======================================================

const GalleryPage = () => {
  const containerRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // ----------------------------------------------------
  // FILTER CATEGORIES
  // ----------------------------------------------------

  const categories = useMemo(() => {
    const available = [
      ...new Set(galleryImages.map((image) => image.category)),
    ];

    const priority = [
      "Events",
      "Academics",
      "Sports",
      "Campus",
      "Activities",
      "General",
    ];

    return [
      "All",
      ...priority.filter((category) => available.includes(category)),
    ];
  }, []);

  // ----------------------------------------------------
  // FILTER IMAGES
  // ----------------------------------------------------

  const filteredImages = useMemo(() => {
    return galleryImages.filter((image) => {
      const matchesCategory =
        activeCategory === "All" ||
        image.category === activeCategory;

      const matchesSearch = image.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  // ----------------------------------------------------
  // LIGHTBOX
  // ----------------------------------------------------

  const activeImage =
    selectedIndex !== null
      ? filteredImages[selectedIndex]
      : null;

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + 1) % filteredImages.length
    );
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + filteredImages.length) %
          filteredImages.length
    );
  };

  // Reset lightbox if filter changes.
  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory, searchTerm]);

  // Keyboard navigation and body scroll lock.
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, filteredImages.length]);

  // ----------------------------------------------------
  // GSAP HERO ANIMATION
  // ----------------------------------------------------

  useGSAP(
    () => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".gallery-eyebrow", {
          y: 25,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".gallery-heading",
          {
            y: 55,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".gallery-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".gallery-hero-card",
          {
            scale: 0.8,
            opacity: 0,
            rotationY: 15,
            stagger: 0.15,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".gallery-scroll-indicator",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.3"
        );

      gsap.to(".gallery-orbit", {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });

    },
    { scope: containerRef }
  );

  // ----------------------------------------------------
  // GSAP SCROLL REVEAL
  // ----------------------------------------------------

  useGSAP(
    () => {
      gsap.from(".gallery-intro", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-intro",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".gallery-filter", {
        y: 20,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-filters",
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".gallery-card", {
        y: 45,
        opacity: 0,
        scale: 0.94,
        stagger: 0.09,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".gallery-bottom", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".gallery-bottom",
          start: "top 90%",
          once: true,
        },
      });

    },
    {
      scope: containerRef,
      dependencies: [activeCategory, searchTerm],
      revertOnUpdate: true,
    }
  );

  // ----------------------------------------------------
  // 3D CARD TILT USING GSAP
  // ----------------------------------------------------

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const rotateY = (x / bounds.width - 0.5) * 12;
    const rotateX = (0.5 - y / bounds.height) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center",
    });
  };

  const handleCardLeave = (event) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // ----------------------------------------------------
  // JSX
  // ----------------------------------------------------

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden bg-[#F5F7FB] font-sans text-[#102C50]"
    >

      {/* ============================================
          HERO SECTION
      ============================================ */}

      <section className="relative isolate overflow-hidden bg-[#102C50] px-5 pb-16 pt-16 text-white sm:px-8 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">

        {/* Background Effects */}

        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        {/* Orbit Decoration */}

        <div className="gallery-orbit pointer-events-none absolute right-[5%] top-1/2 hidden h-117.5 w-117.5 -translate-y-1/2 rounded-full border border-dashed border-white/10 lg:block" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Hero Text */}

          <div>

            <div className="gallery-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E7B85B] backdrop-blur-md">
              <Sparkles size={15} />
              Moments That Inspire
            </div>

            <h1 className="gallery-heading max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]">

              Every Picture

              <span className="mt-2 block text-[#E7B85B]">
                Tells a Story.
              </span>

            </h1>

            <p className="gallery-description mt-6 max-w-xl text-sm leading-8 text-blue-100 sm:text-base">
              Explore the memorable moments, academic achievements,
              vibrant celebrations and unforgettable experiences
              of Gayatri Shiksha Niketan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">

              <a
                href="#school-gallery"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#E7B85B] px-6 py-4 text-sm font-bold text-[#102C50] shadow-xl shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Gallery
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <div className="flex items-center gap-3 text-xs text-blue-200">

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Camera size={19} />
                </div>

                Explore Our Memories

              </div>

            </div>

            {/* Stats */}

            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">

              <div>
                <h3 className="text-3xl font-bold text-[#E7B85B]">
                  {galleryImages.length}+
                </h3>
                <p className="mt-1 text-xs text-blue-200">
                  School Photos
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#E7B85B]">
                  {categories.length - 1}
                </h3>
                <p className="mt-1 text-xs text-blue-200">
                  Categories
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#E7B85B]">
                  3D
                </h3>
                <p className="mt-1 text-xs text-blue-200">
                  Interactive View
                </p>
              </div>

            </div>

          </div>

          {/* 3D Hero Image Composition */}

          <div className="relative mx-auto h-82.5 w-full max-w-130 sm:h-107.5">

            {galleryImages.length > 0 ? (

              <>

                {/* Main Image */}

                <div className="gallery-hero-card absolute left-[17%] top-[8%] z-20 h-[78%] w-[65%] overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-2 shadow-2xl shadow-black/30">

                  <div className="h-full w-full overflow-hidden rounded-2xl">

                    <img
                      src={galleryImages[0].src}
                      alt={galleryImages[0].title}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="absolute inset-x-2 bottom-2 rounded-b-2xl bg-linear-to-t from-[#102C50] via-[#102C50]/60 to-transparent px-5 pb-5 pt-14">

                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E7B85B]">
                      Our Memories
                    </span>

                    <h3 className="mt-1 text-lg font-bold text-white">
                      Life at Our School
                    </h3>

                  </div>

                </div>

                {/* Floating Left Image */}

                {galleryImages.length > 1 && (

                  <div className="gallery-hero-card absolute -left-1 top-[28%] z-30 h-[42%] w-[35%] -rotate-6 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">

                    <img
                      src={galleryImages[1].src}
                      alt={galleryImages[1].title}
                      className="h-full w-full object-cover"
                    />

                  </div>

                )}

                {/* Floating Right Image */}

                {galleryImages.length > 2 && (

                  <div className="gallery-hero-card absolute -right-1 bottom-[5%] z-30 h-[40%] w-[34%] rotate-6 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">

                    <img
                      src={galleryImages[2].src}
                      alt={galleryImages[2].title}
                      className="h-full w-full object-cover"
                    />

                  </div>

                )}

                {/* Decorative Floating Badge */}

                <div className="gallery-hero-card absolute -right-2 top-[5%] z-40 flex items-center gap-2 rounded-xl border border-white/20 bg-[#E7B85B] px-4 py-3 text-[#102C50] shadow-xl sm:-right-5">

                  <Camera size={20} />

                  <span className="text-xs font-bold">
                    Our Gallery
                  </span>

                </div>

              </>

            ) : (

              <div className="flex h-full items-center justify-center rounded-3xl border border-white/20 bg-white/5">

                <div className="text-center">
                  <ImageIcon size={55} className="mx-auto text-[#E7B85B]" />
                  <p className="mt-4 text-sm text-blue-100">
                    No photos available
                  </p>
                </div>

              </div>

            )}

          </div>

        </div>

        <div className="gallery-scroll-indicator relative z-10 mt-10 flex justify-center">

          {/* <a
            href="#school-gallery"
            className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200 transition-colors hover:text-[#E7B85B]"
          >
            Scroll To Explore

            <span className="h-10 w-px bg-linear-to-b from-[#E7B85B] to-transparent" />

          </a> */}

        </div>

      </section>

      {/* ============================================
          GALLERY INTRO
      ============================================ */}

      <section
        id="school-gallery"
        className="gallery-intro scroll-mt-20 px-5 pb-6 pt-14 sm:px-8 lg:pt-20"
      >

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            {/* <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2457A7]">
              <Images size={16} />
              Explore Our Collection
            </div> */}

            <h2 className="text-3xl font-bold tracking-tight text-[#102C50] sm:text-4xl lg:text-5xl">
              School Life in Pictures
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              From everyday classroom learning to special school
              celebrations, discover the experiences that make
              our school community special.
            </p>

          </div>

        </div>

      </section>

      {/* ============================================
          FILTER AND SEARCH
      ============================================ */}

      <section className="gallery-filters px-5 pt-7 sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row lg:items-center">



          {/* Search */}

          <div className="relative w-full lg:max-w-xs">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search school memories..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-[#102C50] outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />

          </div>

        </div>

      </section>

      {/* ============================================
          3D GALLERY GRID
      ============================================ */}

      <section className="px-5 pb-16 pt-8 sm:px-8 lg:pb-24 lg:pt-12">

        <div className="gallery-grid mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredImages.map((image, index) => (

            <article
              key={image.id}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              className="gallery-card group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-950/15"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              onClick={() => openImage(index)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${image.title}`}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openImage(index);
                }
              }}
            >

              {/* Image */}

              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  aspectRatio: "4 / 3",
                }}
              >

                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-linear-to-t from-[#102C50]/90 via-[#102C50]/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category */}

                <div className="absolute left-4 top-4">

                  <span className="rounded-full border border-white/30 bg-[#102C50]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {image.category}
                  </span>

                </div>

                {/* Zoom Icon */}

                <div className="absolute right-4 top-4 flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">

                  <Maximize2 size={18} />

                </div>

                {/* Bottom Content */}

                <div
                  className="absolute inset-x-0 bottom-0 p-5"
                  style={{ transform: "translateZ(25px)" }}
                >

                  <div className="flex items-end justify-between gap-3">

                    <div className="min-w-0">

                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#E7B85B]">
                        School Memories
                      </p>

                      <h3 className="truncate text-lg font-bold text-white">
                        {image.title}
                      </h3>

                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-all duration-300 group-hover:border-[#E7B85B] group-hover:bg-[#E7B85B] group-hover:text-[#102C50]">

                      <ArrowUpRight size={18} />

                    </div>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

        {/* Empty State */}

        {filteredImages.length === 0 && (

          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2457A7]">
              <ImageIcon size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#102C50]">
              No Photos Found
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              No images match your search. Try another keyword
              or choose a different category.
            </p>

            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchTerm("");
              }}
              className="mt-6 rounded-lg bg-[#102C50] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Show All Photos
            </button>

          </div>

        )}

      </section>

      {/* ============================================
          3D LIGHTBOX
      ============================================ */}

      {activeImage && (

        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#07182D]/95 px-4 py-8 backdrop-blur-xl"
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >

          {/* Close Button */}

          <button
            onClick={closeImage}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:rotate-90 hover:bg-white/20"
          >
            <X size={23} />
          </button>

          {/* Previous */}

          {filteredImages.length > 1 && (

            <button
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#E7B85B] hover:text-[#102C50] sm:left-8 sm:h-14 sm:w-14"
            >
              <ChevronLeft size={26} />
            </button>

          )}

          {/* Image Display */}

          <div
            className="lightbox-content relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-2 shadow-2xl sm:p-3">

              <img
                key={activeImage.id}
                src={activeImage.src}
                alt={activeImage.title}
                className="mx-auto max-h-[72vh] w-full rounded-xl object-contain"
              />

            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-2 text-white">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7B85B]">
                  {activeImage.category}
                </p>

                <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                  {activeImage.title}
                </h3>

              </div>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-blue-100">
                {selectedIndex + 1} / {filteredImages.length}
              </span>

            </div>

          </div>

          {/* Next */}

          {filteredImages.length > 1 && (

            <button
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#E7B85B] hover:text-[#102C50] sm:right-8 sm:h-14 sm:w-14"
            >
              <ChevronRight size={26} />
            </button>

          )}

        </div>

      )}

      {/* ============================================
          BOTTOM CTA
      ============================================ */}

      <section className="gallery-bottom px-5 pb-16 sm:px-8 lg:pb-24">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#102C50] px-6 py-12 text-center text-white sm:px-12 sm:py-16">

          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-400/15 blur-[90px]" />

          <div className="relative z-10">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7B85B] text-[#102C50] shadow-lg">
              <GraduationCap size={30} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E7B85B]">
              Gayatri Shiksha Niketan
            </span>

            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              Creating Memories.
              <span className="block text-[#E7B85B]">
                Building Bright Futures.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100">
              Every moment is an opportunity to learn, grow
              and create something extraordinary.
            </p>

            <a
              href="https://gsnonline.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#E7B85B] px-7 py-4 text-sm font-bold text-[#102C50] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Discover Our School
              <ArrowUpRight size={19} />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default GalleryPage;

