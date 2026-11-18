
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { schoolImages } from "../lib/schoolImages";
const PriPrimaryImage = schoolImages["student-Profile/Pri-Primary-image.png"];
const PrimaryImage = schoolImages["student-Profile/Primary-image.png"];
const MiddleImage = schoolImages["student-Profile/6-8 image.png"];
const SeniorImage = schoolImages["student-Profile/9-12-image.png"];
gsap.registerPlugin(ScrollTrigger);


// =====================================================
// 1. FOUR CURRICULUM STAGES
// =====================================================

const stages = [
  {
    id: "pre-primary",
    name: "Pre-Primary",
    wing: "Pre-Primary Wing",
    classes: "Nursery · LKG · UKG",
    age: "Early Years",
    icon: "🧸",
    accent: "#F28A61",
    soft: "#FFF0E9",
    heading: "Big Dreams Begin With Little Steps.",
    description:
      "A joyful environment where little learners explore, play, express themselves and discover the world through everyday experiences.",
    focus: "Play-based learning & early development",
    image: PriPrimaryImage,
  },
  {
    id: "primary",
    name: "Primary",
    wing: "Primary Wing",
    classes: "Classes I – V",
    age: "Primary Learning",
    icon: "📚",
    accent: "#3985E9",
    soft: "#EAF3FF",
    heading: "Building Strong Foundations for Life.",
    description:
      "Developing confident readers, creative thinkers and curious learners through foundational concepts and experiential education.",
    focus: "Foundational concepts & experiential learning",
    image: PrimaryImage,
  },
  {
    id: "middle",
    name: "Middle",
    wing: "Middle Wing",
    classes: "Classes VI – VIII",
    age: "Exploration & Discovery",
    icon: "🔬",
    accent: "#8B72D9",
    soft: "#F1EDFF",
    heading: "Think Deeper. Explore Further.",
    description:
      "Encouraging independent thinking, scientific curiosity, practical applications and interdisciplinary exploration.",
    focus: "Conceptual depth & practical application",
    image: MiddleImage ,
  },
  {
    id: "secondary",
    name: "Secondary",
    wing: "Secondary & Senior Secondary",
    classes: "Classes IX – XII",
    age: "Future Readiness",
    icon: "🎓",
    accent: "#269B83",
    soft: "#E7F7F2",
    heading: "Turning Ambitions Into Achievements.",
    description:
      "Preparing students for board examinations, higher education, career choices and the opportunities of tomorrow.",
    focus: "Academic excellence & career readiness",
    image: SeniorImage,
  },
];


// =====================================================
// 2. PRE-PRIMARY SUBJECTS
// =====================================================

const prePrimarySubjects = [
  {
    icon: "🔤",
    title: "Phonics & Early Literacy",
    text: "English and Hindi alphabets, sounds, vocabulary, picture reading and storytelling.",
    tag: "LANGUAGE",
  },
  {
    icon: "🔢",
    title: "Basic Numeracy & Maths",
    text: "Numbers, counting, patterns, shapes, colours and early mathematical concepts.",
    tag: "MATHEMATICS",
  },
  {
    icon: "🌱",
    title: "Environmental Awareness",
    text: "Nature, animals, plants, seasons and surroundings through fun EVS activities.",
    tag: "EVS",
  },
  {
    icon: "🎨",
    title: "Creative Arts & Expression",
    text: "Art, craft, music, storytelling, rhymes, dance and imaginative activities.",
    tag: "CREATIVITY",
  },
];


// =====================================================
// 3. PRE-PRIMARY ACTIVITY GALLERY
// Add actual school photos to public/images/curriculum
// =====================================================

const activityGallery = [
  {
    image: "/images/curriculum/kids-activity.jpg",
    title: "Creative Activity Zone",
    category: "ART & CREATIVITY",
    size: "large",
  },
  {
    image: "/images/curriculum/kids-play.jpg",
    title: "Indoor Play Arena",
    category: "FUN & MOVEMENT",
    size: "normal",
  },
  {
    image: "/images/curriculum/kids-reading.jpg",
    title: "Little Reading Corner",
    category: "EARLY LITERACY",
    size: "normal",
  },
];


// =====================================================
// 4. INTERACTIVE PRE-PRIMARY DAILY SCHEDULE
// =====================================================

const dailyRoutine = [
  {
    time: "08:30 AM",
    title: "Welcome & Free Play",
    icon: "☀️",
    text: "A warm welcome, settling in, supervised play and interaction with friends.",
  },
  {
    time: "09:00 AM",
    title: "Morning Circle",
    icon: "👋",
    text: "Greetings, attendance, calendar activities, prayers or songs and conversation.",
  },
  {
    time: "09:30 AM",
    title: "Little Learning Time",
    icon: "📖",
    text: "Early literacy, phonics, numbers, shapes and interactive learning activities.",
  },
  {
    time: "10:15 AM",
    title: "Healthy Snack Break",
    icon: "🍎",
    text: "A supervised break with handwashing and healthy eating habits.",
  },
  {
    time: "10:45 AM",
    title: "Creative Discovery",
    icon: "🎨",
    text: "Art, music, craft, rhymes, sensory activities and storytelling.",
  },
  {
    time: "11:30 AM",
    title: "Outdoor Exploration",
    icon: "🌳",
    text: "Age-appropriate movement, supervised play and group activities.",
  },
  {
    time: "12:15 PM",
    title: "Story & Goodbye",
    icon: "🎒",
    text: "Story time, packing up and a supervised departure routine.",
  },
];


// =====================================================
// 5. SAFETY & HYGIENE
// =====================================================

const safetyItems = [
  {
    icon: "🛡️",
    title: "Child Supervision",
    text: "Responsible adult supervision during classroom activities, movement and play.",
  },
  {
    icon: "🔐",
    title: "Campus Security",
    text: "Controlled visitor access and appropriate student arrival and departure procedures.",
  },
  {
    icon: "🧼",
    title: "Hygiene Practices",
    text: "Handwashing, clean washrooms and healthy daily hygiene habits.",
  },
  {
    icon: "✨",
    title: "Clean Activity Zones",
    text: "Regular cleaning of classrooms, toys, furniture and shared learning spaces.",
  },
];


// =====================================================
// 6. PRIMARY WING
// =====================================================

const primarySubjects = [
  {
    icon: "🗣️",
    title: "Languages",
    text: "English, Hindi and regional language.",
  },
  {
    icon: "➗",
    title: "Mathematics",
    text: "Mental maths, calculations and problem-solving.",
  },
  {
    icon: "🌍",
    title: "Environmental Studies",
    text: "EVS, nature, society and environmental awareness.",
  },
  {
    icon: "💻",
    title: "Computer Basics",
    text: "Digital literacy, computer fundamentals and responsible technology use.",
  },
  {
    icon: "🎨",
    title: "Art Education",
    text: "Drawing, craft, music and creative expression.",
  },
  {
    icon: "⚽",
    title: "Physical Education",
    text: "Sports, fitness, physical activities and teamwork.",
  },
  {
    icon: "🤝",
    title: "Value Education",
    text: "Discipline, empathy, respect and good habits.",
  },
];

const primaryClubs = [
  { icon: "💻", name: "Coding Club" },
  { icon: "🏺", name: "Clay Modelling" },
  { icon: "🤖", name: "Robotics Club" },
  { icon: "🎨", name: "Creative Arts" },
  { icon: "♟️", name: "Chess Club" },
  { icon: "🌿", name: "Nature Club" },
];


// =====================================================
// 7. MIDDLE WING
// =====================================================

const middleSubjects = [
  {
    icon: "🗣️",
    title: "Languages",
    text: "English, Hindi and a third language such as Sanskrit, French, German or a regional language, as offered.",
  },
  {
    icon: "📐",
    title: "Mathematics",
    text: "Algebra, Geometry, Data Handling and logical reasoning.",
  },
  {
    icon: "🧪",
    title: "Integrated Science",
    text: "Physics, Chemistry and Biology concepts through practical exploration.",
  },
  {
    icon: "🌏",
    title: "Social Science",
    text: "History, Geography, Civics and Political Science.",
  },
  {
    icon: "💻",
    title: "Computer Science & IT",
    text: "Digital literacy, technology fundamentals and computing.",
  },
  {
    icon: "🚀",
    title: "Vocational & Skill Learning",
    text: "Introduction to AI, Coding, Financial Literacy and practical skills.",
  },
];

const middleLabs = [
  {
    icon: "🔬",
    title: "Science Laboratory",
    text: "Experiments, observation, demonstrations and practical scientific learning.",
  },
  {
    icon: "📊",
    title: "Mathematics Lab",
    text: "Geometrical models, logical puzzles, measurement and hands-on activities.",
  },
  {
    icon: "💻",
    title: "Technology Lab",
    text: "Computer skills, coding fundamentals and digital creativity.",
  },
];

const skillModules = [
  "Artificial Intelligence",
  "Coding Fundamentals",
  "Financial Literacy",
  "Computational Thinking",
  "Vocational Exposure",
  "Digital Citizenship",
];


// =====================================================
// 8. SECONDARY WING - CLASS IX & X
// =====================================================

const secondarySubjects = [
  "English Communicative / Language & Literature",
  "Mathematics - Standard / Basic (as applicable)",
  "Science",
  "Social Science",
  "Second Language",
];

const electiveSubjects = [
  "Artificial Intelligence",
  "Information Technology",
  "Data Science",
  "Retail",
  "Marketing",
];


// =====================================================
// 9. SENIOR SECONDARY STREAM SELECTOR
// =====================================================

const streams = [
  {
    id: "pcm",
    category: "SCIENCE",
    label: "Science",
    subtitle: "Non-Medical · PCM",
    icon: "⚙️",
    accent: "#3789E8",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science / IP / Physical Education",
      "English",
    ],
    careers: [
      "Engineering",
      "Computer Science",
      "Architecture",
      "Data Science",
      "Research",
    ],
    exams: ["JEE", "CUET"],
  },
  {
    id: "pcb",
    category: "SCIENCE",
    label: "Science",
    subtitle: "Medical · PCB",
    icon: "🧬",
    accent: "#269B83",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Psychology / Biotechnology / Physical Education",
      "English",
    ],
    careers: [
      "Medicine",
      "Healthcare",
      "Biotechnology",
      "Life Sciences",
      "Research",
    ],
    exams: ["NEET", "CUET"],
  },
  {
    id: "commerce",
    category: "COMMERCE",
    label: "Commerce",
    subtitle: "Business & Finance",
    icon: "📈",
    accent: "#B87935",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Applied Mathematics / Core Mathematics",
      "Informatics Practices",
    ],
    careers: [
      "Chartered Accountancy",
      "Finance",
      "Banking",
      "Business Management",
      "Economics",
    ],
    exams: ["CUET", "CA Foundation"],
  },
  {
    id: "humanities",
    category: "HUMANITIES",
    label: "Humanities / Arts",
    subtitle: "People & Society",
    icon: "🌐",
    accent: "#9974D6",
    subjects: [
      "History",
      "Political Science",
      "Psychology",
      "Sociology",
      "Economics / Fine Arts",
    ],
    careers: [
      "Law",
      "Civil Services",
      "Psychology",
      "Journalism",
      "Design & Social Sciences",
    ],
    exams: ["CUET", "CLAT"],
  },
];


// =====================================================
// 10. BOARD RESULT CAROUSEL PLACEHOLDERS
// Replace with verified school results before publishing.
// =====================================================

const resultSlides = [
  {
    year: "ACADEMIC YEAR",
    title: "Class X Topper",
    name: "Add Verified Student Name",
    score: "--%",
    label: "Add Verified Percentage",
  },
  {
    year: "ACADEMIC YEAR",
    title: "Class XII Science Topper",
    name: "Add Verified Student Name",
    score: "--%",
    label: "Add Verified Percentage",
  },
  {
    year: "ACADEMIC YEAR",
    title: "Class XII Commerce Topper",
    name: "Add Verified Student Name",
    score: "--%",
    label: "Add Verified Percentage",
  },
];


// =====================================================
// 11. REUSABLE COMPONENTS
// =====================================================

const SectionLabel = ({ children, color = "#E47B53" }) => (
  <span
    className="text-[10px] font-extrabold uppercase tracking-[2.5px] sm:text-xs"
    style={{ color }}
  >
    {children}
  </span>
);


const SubjectCard = ({ item, index, accent }) => (
  <div className="curriculum-subject-card group flex min-w-0 gap-3 rounded-2xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5">

    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
      style={{ backgroundColor: `${accent}16` }}
    >
      {item.icon}
    </span>

    <div className="min-w-0">

      <p className="mb-1 text-[9px] font-bold tracking-[1.5px] text-slate-400">
        MODULE {String(index + 1).padStart(2, "0")}
      </p>

      <h4 className="text-sm font-bold leading-5 text-[#172A46]">
        {item.title}
      </h4>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {item.text}
      </p>

    </div>
  </div>
);


const ContentHeading = ({ label, title, description }) => (
  <div className="mb-7">

    <SectionLabel>{label}</SectionLabel>

    <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#172A46] sm:text-3xl">
      {title}
    </h3>

    {description && (
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
        {description}
      </p>
    )}

  </div>
);


// =====================================================
// 12. PRE-PRIMARY CONTENT
// =====================================================

const PrePrimaryContent = ({ activeRoutine, setActiveRoutine }) => {

  const currentRoutine = dailyRoutine[activeRoutine];

  return (
    <div className="space-y-16 sm:space-y-20">

      {/* SUBJECTS */}

      <div>

        <ContentHeading
          label="01 / EARLY DEVELOPMENT"
          title="Learning Starts With Curiosity."
          description="A balanced combination of foundational learning, creative activities and everyday discovery."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {prePrimarySubjects.map((item, index) => (
            <SubjectCard
              key={item.title}
              item={item}
              index={index}
              accent="#F28A61"
            />
          ))}

        </div>
      </div>


      {/* ACTIVITY GALLERY */}

      <div>

        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <ContentHeading
              label="02 / EXPLORE & PLAY"
              title="Little Spaces. Big Adventures."
              description="Activity zones that inspire creativity, imagination, movement and joyful learning."
            />
          </div>

          <span className="mb-8 text-[10px] font-bold tracking-widest text-slate-400">
            OUR ACTIVITY ZONES ↗
          </span>

        </div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {activityGallery.map((item, index) => (

            <div
              key={item.title}
              className={`curriculum-gallery group relative isolate min-h-58.75 overflow-hidden rounded-3xl bg-linear-to-br from-orange-100 via-amber-50 to-blue-100 sm:min-h-75 ${
                index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >

              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#152541]/90 via-[#152541]/10 to-transparent" />

              <span className="absolute right-5 top-5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[9px] font-bold tracking-widest text-white backdrop-blur-md">
                0{index + 1}
              </span>

              <div className="absolute bottom-0 p-6">

                <span className="text-[9px] font-bold tracking-[2px] text-orange-200">
                  {item.category}
                </span>

                <h4 className="mt-2 text-xl font-extrabold text-white">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs text-white/75">
                  Discover, explore & grow ↗
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* DAY IN THE LIFE TIMELINE */}

      <div className="overflow-hidden rounded-[28px] bg-[#152541] p-5 sm:p-9 lg:p-11">

        <div className="mb-9">

          <SectionLabel color="#F49A79">
            03 / A DAY AT SCHOOL
          </SectionLabel>

          <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            Every Day Is a New Adventure.
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Take a peek into a typical day filled with learning,
            laughter, creativity and discovery.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_0.9fr]">

          {/* TIMELINE */}

          <div className="relative">

            <div className="absolute bottom-5 left-4.25 top-5 w-px bg-white/15" />

            <div className="space-y-1">

              {dailyRoutine.map((item, index) => {

                const selected = activeRoutine === index;

                return (
                  <button
                    type="button"
                    key={item.time}
                    onClick={() => setActiveRoutine(index)}
                    aria-pressed={selected}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-all duration-300 sm:gap-4 sm:px-3 ${
                      selected
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >

                    <span
                      className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-4 border-[#152541] text-sm ${
                        selected
                          ? "bg-[#F28A61] text-white"
                          : "bg-[#34445D] text-slate-300"
                      }`}
                    >
                      {selected ? "✓" : item.icon}
                    </span>

                    <span className="min-w-0 flex-1">

                      <span className="block text-[9px] font-bold tracking-[1.5px] text-[#F49A79]">
                        {item.time}
                      </span>

                      <span className={`mt-1 block text-xs font-bold sm:text-sm ${
                        selected ? "text-white" : "text-slate-300"
                      }`}>
                        {item.title}
                      </span>

                    </span>

                    <span className={`text-lg ${
                      selected ? "text-orange-300" : "text-slate-500"
                    }`}>
                      →
                    </span>

                  </button>
                );
              })}

            </div>
          </div>


          {/* ACTIVE ACTIVITY */}

          <div className="flex min-h-68.75 flex-col justify-between rounded-3xl border border-white/10 bg-linear-to-br from-[#263F62] to-[#192B46] p-7 sm:p-9">

            <div>

              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[9px] font-bold tracking-[2px] text-blue-200">
                THE MOMENT
              </span>

              <div className="mt-9 text-5xl">
                {currentRoutine.icon}
              </div>

              <p className="mt-6 text-xs font-bold tracking-[2px] text-orange-300">
                {currentRoutine.time}
              </p>

              <h4 className="mt-3 text-2xl font-extrabold text-white">
                {currentRoutine.title}
              </h4>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {currentRoutine.text}
              </p>

            </div>


            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

              <span className="text-[10px] font-medium text-slate-400">
                ACTIVITY {activeRoutine + 1} / {dailyRoutine.length}
              </span>

              <div className="flex gap-2">

                <button
                  type="button"
                  aria-label="Previous routine"
                  onClick={() =>
                    setActiveRoutine((activeRoutine - 1 + dailyRoutine.length) % dailyRoutine.length)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#152541]"
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Next routine"
                  onClick={() =>
                    setActiveRoutine((activeRoutine + 1) % dailyRoutine.length)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F28A61] text-white transition hover:bg-orange-400"
                >
                  →
                </button>

              </div>

            </div>
          </div>

        </div>

      </div>


      {/* SAFETY */}

      <div>

        <div className="mb-8 text-center">

          <SectionLabel color="#269B83">
            04 / CARE & WELLBEING
          </SectionLabel>

          <h3 className="mt-3 text-2xl font-extrabold text-[#172A46] sm:text-3xl">
            Safe Hands. Happy Hearts.
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            A caring and hygienic environment where children's
            wellbeing remains an important priority.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {safetyItems.map((item, index) => (

            <div
              key={item.title}
              className="group rounded-2xl border border-teal-100 bg-[#F2FAF7] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-teal-950/5 sm:p-6"
            >

              <div className="flex items-center justify-between">

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  {item.icon}
                </span>

                <span className="text-xs font-bold text-teal-200">
                  0{index + 1}
                </span>

              </div>

              <h4 className="mt-5 text-base font-bold text-[#172A46]">
                {item.title}
              </h4>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};


// =====================================================
// 13. PRIMARY WING CONTENT
// =====================================================

const PrimaryContent = () => {

  return (
    <div className="space-y-14">

      {/* SUBJECTS */}

      <div>

        <ContentHeading
          label="01 / CORE CURRICULUM"
          title="Learning Beyond the Textbook."
          description="Building reading, writing, mathematical understanding and real-world awareness."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {primarySubjects.map((item, index) => (

            <SubjectCard
              key={item.title}
              item={item}
              index={index}
              accent="#3985E9"
            />

          ))}

        </div>

      </div>


      {/* CLUBS */}

      <div className="rounded-[28px] bg-[#EAF3FF] p-6 sm:p-9">

        <SectionLabel color="#3985E9">
          02 / BEYOND CLASSROOMS
        </SectionLabel>

        <h3 className="mt-3 text-2xl font-extrabold text-[#172A46]">
          Discover Their Hidden Talents.
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
          Co-curricular opportunities that promote creativity,
          collaboration, innovation and independent thinking.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {primaryClubs.map((club) => (

            <div
              key={club.name}
              className="flex min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-white bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">
                {club.icon}
              </span>

              <span className="text-xs font-bold text-[#172A46]">
                {club.name}
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* ASSESSMENT */}

      <div>

        <ContentHeading
          label="03 / STUDENT ASSESSMENT"
          title="Progress, Not Just Marks."
          description="A balanced assessment approach that tracks conceptual understanding, participation and academic growth."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-7">

            <span className="text-3xl">📝</span>

            <p className="mt-5 text-[10px] font-bold tracking-[2px] text-blue-600">
              CONTINUOUS ASSESSMENT
            </p>

            <h4 className="mt-2 text-xl font-extrabold text-[#172A46]">
              Formative Assessment
            </h4>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Class participation, worksheets, activities, projects,
              observation and regular feedback to support learning.
            </p>

          </div>


          <div className="rounded-3xl border border-orange-100 bg-linear-to-br from-orange-50 to-white p-7">

            <span className="text-3xl">📋</span>

            <p className="mt-5 text-[10px] font-bold tracking-[2px] text-orange-600">
              PERIODIC ASSESSMENT
            </p>

            <h4 className="mt-2 text-xl font-extrabold text-[#172A46]">
              Summative Assessment
            </h4>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Periodic written assessments, term examinations,
              subject understanding and overall learning outcomes.
            </p>

          </div>

        </div>

        <p className="mt-4 text-xs leading-6 text-slate-400">
          Assessment formats and weightage can be customized according
          to the school's board affiliation and academic policy.
        </p>

      </div>

    </div>
  );
};


// =====================================================
// 14. MIDDLE WING CONTENT
// =====================================================

const MiddleContent = () => {

  return (
    <div className="space-y-14">

      {/* SUBJECTS */}

      <div>

        <ContentHeading
          label="01 / MIDDLE SCHOOL CURRICULUM"
          title="Connect Knowledge With Reality."
          description="Students move towards deeper concepts, subject-based learning, experiments and interdisciplinary understanding."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {middleSubjects.map((item, index) => (

            <SubjectCard
              key={item.title}
              item={item}
              index={index}
              accent="#8B72D9"
            />

          ))}

        </div>

      </div>


      {/* LABORATORIES */}

      <div>

        <div className="mb-7">

          <SectionLabel color="#8B72D9">
            02 / EXPERIMENT & INNOVATE
          </SectionLabel>

          <h3 className="mt-3 text-2xl font-extrabold text-[#172A46] sm:text-3xl">
            Think Like a Scientist.
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Hands-on experiences that encourage students to
            experiment, discover and solve real-world problems.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {middleLabs.map((lab, index) => (

            <div
              key={lab.title}
              className="rounded-3xl border border-violet-100 bg-[#F5F2FF] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-950/5"
            >

              <span className="text-4xl">
                {lab.icon}
              </span>

              <span className="mt-6 block text-[10px] font-bold tracking-widest text-violet-500">
                LEARNING LAB 0{index + 1}
              </span>

              <h4 className="mt-2 text-lg font-bold text-[#172A46]">
                {lab.title}
              </h4>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {lab.text}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* VOCATIONAL SKILLS */}

      <div className="rounded-[28px] bg-[#172A46] p-7 sm:p-10">

        <SectionLabel color="#BCA6FF">
          03 / 21ST CENTURY SKILLS
        </SectionLabel>

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">

          <div>

            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Skills for a Changing World.
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Early exposure to computational thinking, financial
              awareness, artificial intelligence and vocational
              learning helps students discover their interests.
            </p>

            <span className="mt-6 inline-flex rounded-full border border-violet-300/30 bg-violet-400/10 px-4 py-2 text-[10px] font-bold tracking-widest text-violet-200">
              NEP 2020-ALIGNED LEARNING THEMES
            </span>

          </div>


          <div className="flex flex-wrap gap-3">

            {skillModules.map((skill, index) => (

              <span
                key={skill}
                className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-violet-500/30"
              >
                <span className="mr-2 text-violet-300">
                  0{index + 1}
                </span>

                {skill}
              </span>

            ))}

          </div>

        </div>

        <p className="mt-5 text-[11px] leading-6 text-slate-400">
          Actual vocational modules, laboratory facilities and third-language
          offerings depend on school resources, board rules and approved
          academic plans. These themes do not by themselves certify NEP compliance.
        </p>

      </div>

    </div>
  );
};


// =====================================================
// 15. SECONDARY & SENIOR SECONDARY CONTENT
// =====================================================

const SecondaryContent = ({
  activeStream,
  setActiveStream,
  activeResult,
  setActiveResult,
}) => {

  const selectedStream =
    streams.find((stream) => stream.id === activeStream) || streams[0];

  const result = resultSlides[activeResult];

  return (
    <div className="space-y-14">

      {/* CLASS IX & X */}

      <div>

        <ContentHeading
          label="01 / CLASSES IX & X"
          title="Stronger Concepts. Greater Confidence."
          description="A structured academic foundation with subject depth, analytical thinking and preparation for board examinations."
        />


        <div className="rounded-3xl border border-emerald-100 bg-[#F0F8F5] p-6 sm:p-8">

          <div className="flex flex-col gap-7 lg:flex-row">

            <div className="flex-1">

              <span className="text-[10px] font-bold tracking-widest text-emerald-700">
                CORE SUBJECTS
              </span>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {secondarySubjects.map((subject, index) => (

                  <div
                    key={subject}
                    className="flex items-start gap-3 rounded-xl bg-white p-4"
                  >
                    <span className="font-extrabold text-emerald-600">
                      0{index + 1}
                    </span>

                    <span className="text-xs font-semibold leading-5 text-[#172A46]">
                      {subject}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            <div className="w-full lg:w-62.5">

              <span className="text-[10px] font-bold tracking-widest text-emerald-700">
                ELECTIVE / SKILL AREAS
              </span>

              <div className="mt-5 flex flex-wrap gap-2">

                {electiveSubjects.map((subject) => (

                  <span
                    key={subject}
                    className="rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    {subject}
                  </span>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* STREAM SELECTOR */}

      <div>

        <ContentHeading
          label="02 / CLASSES XI & XII"
          title="Choose a Stream. Discover Your Future."
          description="Explore subject combinations and possible career directions through our interactive stream selector."
        />


        {/* FOUR OPTIONS VISIBLE */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          {streams.map((stream) => {

            const selected = activeStream === stream.id;

            return (
              <button
                key={stream.id}
                type="button"
                onClick={() => setActiveStream(stream.id)}
                aria-pressed={selected}
                className={`rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                  selected
                    ? "border-[#172A46] bg-[#172A46] shadow-lg"
                    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                }`}
              >

                <span className="text-2xl">
                  {stream.icon}
                </span>

                <h4 className={`mt-3 text-sm font-extrabold sm:text-base ${
                  selected ? "text-white" : "text-[#172A46]"
                }`}>
                  {stream.label}
                </h4>

                <p className={`mt-1 text-[10px] leading-5 sm:text-xs ${
                  selected ? "text-slate-300" : "text-slate-500"
                }`}>
                  {stream.subtitle}
                </p>

                <span className="mt-4 block text-[9px] font-bold tracking-widest"
                  style={{ color: selected ? "#A7D8C8" : stream.accent }}
                >
                  {selected ? "SELECTED ✓" : "EXPLORE →"}
                </span>

              </button>
            );

          })}

        </div>


        {/* SELECTED STREAM DETAILS */}

        <div
          className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-[#FAFBFC] p-6 sm:p-9"
          style={{
            borderTop: `4px solid ${selectedStream.accent}`,
          }}
        >

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <span
                className="text-[10px] font-extrabold tracking-[2px]"
                style={{ color: selectedStream.accent }}
              >
                SELECTED ACADEMIC PATH
              </span>

              <h3 className="mt-2 text-2xl font-extrabold text-[#172A46]">
                {selectedStream.subtitle}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Classes XI & XII · Indicative subject combination
              </p>

            </div>

            <span className="text-5xl">
              {selectedStream.icon}
            </span>

          </div>


          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* SUBJECTS */}

            <div>

              <h4 className="text-sm font-extrabold text-[#172A46]">
                Subject Combination
              </h4>

              <div className="mt-4 space-y-3">

                {selectedStream.subjects.map((subject, index) => (

                  <div
                    key={subject}
                    className="flex items-center gap-3 text-xs font-medium text-slate-600"
                  >

                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
                      style={{
                        backgroundColor: `${selectedStream.accent}18`,
                        color: selectedStream.accent,
                      }}
                    >
                      {index + 1}
                    </span>

                    {subject}

                  </div>

                ))}

              </div>

            </div>


            {/* CAREER PATHS */}

            <div>

              <h4 className="text-sm font-extrabold text-[#172A46]">
                Possible Career Directions
              </h4>

              <div className="mt-4 flex flex-wrap gap-2">

                {selectedStream.careers.map((career) => (

                  <span
                    key={career}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    {career}
                  </span>

                ))}

              </div>


              <h4 className="mt-7 text-sm font-extrabold text-[#172A46]">
                Related Entrance Examinations
              </h4>

              <div className="mt-3 flex flex-wrap gap-2">

                {selectedStream.exams.map((exam) => (

                  <span
                    key={exam}
                    className="rounded-lg px-4 py-2 text-xs font-bold text-white"
                    style={{ backgroundColor: selectedStream.accent }}
                  >
                    {exam}
                  </span>

                ))}

              </div>

            </div>

          </div>

          <p className="mt-7 border-t border-slate-200 pt-5 text-[11px] leading-6 text-slate-400">
            These are indicative choices, not a guaranteed subject combination
            or entrance eligibility statement. Final subjects and combinations
            depend on board regulations, school availability and current
            university/examination requirements.
          </p>

        </div>

      </div>


      {/* BOARD RESULTS CAROUSEL */}

      <div className="overflow-hidden rounded-[28px] bg-linear-to-br from-[#152541] to-[#203C62] p-6 sm:p-10">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <SectionLabel color="#A8CCFF">
              03 / ACADEMIC ACHIEVEMENTS
            </SectionLabel>

            <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              Celebrating Student Success.
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
              Recognising hard work, dedication and academic achievement.
            </p>

          </div>

          <div className="flex gap-2">

            <button
              type="button"
              aria-label="Previous result"
              onClick={() =>
                setActiveResult((activeResult - 1 + resultSlides.length) % resultSlides.length)
              }
              className="h-11 w-11 rounded-full border border-white/20 text-white hover:bg-white hover:text-[#152541]"
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Next result"
              onClick={() =>
                setActiveResult((activeResult + 1) % resultSlides.length)
              }
              className="h-11 w-11 rounded-full bg-[#3978E8] text-white hover:bg-blue-500"
            >
              →
            </button>

          </div>

        </div>


        <div className="mt-9 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:flex-row sm:text-left sm:p-8">

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-dashed border-blue-300/50 bg-blue-400/10 text-3xl">
            🏆
          </div>

          <div className="flex-1">

            <span className="text-[10px] font-bold tracking-[2px] text-blue-200">
              {result.year}
            </span>

            <h4 className="mt-2 text-xl font-extrabold text-white">
              {result.title}
            </h4>

            <p className="mt-2 text-sm text-slate-300">
              {result.name}
            </p>

            <p className="mt-2 text-[10px] text-slate-400">
              {result.label}
            </p>

          </div>

          <div>

            <p className="text-4xl font-black text-[#8FB7FF]">
              {result.score}
            </p>

            <p className="mt-1 text-[9px] font-bold tracking-widest text-slate-400">
              VERIFIED RESULT
            </p>

          </div>

        </div>


        <div className="mt-5 flex justify-center gap-2">

          {resultSlides.map((slide, index) => (

            <button
              type="button"
              key={slide.title}
              onClick={() => setActiveResult(index)}
              aria-label={`View result ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                activeResult === index
                  ? "w-8 bg-blue-400"
                  : "w-3 bg-white/30"
              }`}
            />

          ))}

        </div>

      </div>

    </div>
  );
};


// =====================================================
// 16. MAIN SCHOOL CURRICULUM SECTION
// =====================================================

const SchoolCurriculum = () => {

  const sectionRef = useRef(null);
  const stageGridRef = useRef(null);
  const panelRef = useRef(null);

  const [activeStageId, setActiveStageId] = useState("pre-primary");

  const [activeRoutine, setActiveRoutine] = useState(0);

  const [activeStream, setActiveStream] = useState("pcm");

  const [activeResult, setActiveResult] = useState(0);


  const activeStage =
    stages.find((stage) => stage.id === activeStageId) || stages[0];


  // =================================
  // GSAP SCROLL REVEAL ANIMATIONS
  // =================================

  useLayoutEffect(() => {

    const context = gsap.context(() => {

      gsap.fromTo(
        ".curriculum-heading",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );


      gsap.fromTo(
        ".curriculum-stage-card",
        {
          opacity: 0,
          y: 55,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stageGridRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

    }, sectionRef);

    return () => context.revert();

  }, []);


  // =================================
  // ACTIVE PANEL TRANSITION
  // =================================

  useLayoutEffect(() => {

    if (!panelRef.current) return;

    const animation = gsap.fromTo(
      panelRef.current,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    return () => animation.kill();

  }, [activeStageId]);


  // =================================
  // CHANGE CURRICULUM STAGE
  // =================================

  const handleStageChange = (stageId) => {

    setActiveStageId(stageId);

    setActiveRoutine(0);

    setActiveStream("pcm");

    setActiveResult(0);

  };


  return (

    <section
      id="academic"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#F8F8F5] py-16 sm:py-20 lg:py-28"
    >

      {/* BACKGROUND DECORATIONS */}

      <div className="pointer-events-none absolute -left-40 top-32 h-80 w-80 rounded-full bg-orange-100/60 blur-[110px]" />

      <div className="pointer-events-none absolute -right-40 bottom-32 h-96 w-96 rounded-full bg-blue-100/60 blur-[120px]" />


      <div className="relative mx-auto max-w-7xl px-4 sm:px-7 lg:px-10">


        {/* ================================= */}
        {/* MAIN SECTION HEADING */}
        {/* ================================= */}

        <div className="curriculum-heading mb-10 text-center sm:mb-14">

          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-[9px] font-extrabold tracking-[2px] text-orange-600 sm:text-xs">

            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />

            OUR ACADEMIC JOURNEY

          </span>


          <h2 className="mt-5 text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.08] tracking-tighter text-[#172A46]">

            Learning Today.
            <span className="block bg-linear-to-r from-[#E77B52] via-[#E58A59] to-[#B77D9D] bg-clip-text text-transparent">
              Leading Tomorrow.
            </span>

          </h2>


          <p className="mx-auto mt-5 max-w-2xl text-xs leading-7 text-slate-500 sm:text-sm lg:text-base">

            A thoughtfully structured learning journey that
            nurtures curiosity, develops knowledge and prepares
            every student for a world of possibilities.

          </p>

        </div>


        {/* ================================= */}
        {/* ALL FOUR BUCKETS ALWAYS VISIBLE */}
        {/* ================================= */}

        <div
          ref={stageGridRef}
          className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4"
        >

          {stages.map((stage) => {

            const selected = activeStageId === stage.id;

            return (

              <button
                key={stage.id}
                type="button"
                onClick={() => handleStageChange(stage.id)}
                aria-pressed={selected}
                className="curriculum-stage-card group relative min-w-0 overflow-hidden rounded-[18px] border p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[25px] sm:p-5 lg:p-6"
                style={{
                  backgroundColor: selected ? stage.soft : "#FFFFFF",
                  borderColor: selected ? stage.accent : "#E8EAF0",
                  boxShadow: selected
                    ? `0 12px 35px ${stage.accent}20`
                    : "none",
                }}
              >

                {/* CARD NUMBER */}

                <div className="flex items-center justify-between">

                  <span
                    className="text-2xl font-black tracking-tighter sm:text-4xl"
                    style={{
                      color: selected ? stage.accent : "#E5E7EB",
                    }}
                  >
                    {stage.number}
                  </span>

                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm sm:h-10 sm:w-10 sm:text-xl"
                    style={{
                      backgroundColor: `${stage.accent}17`,
                    }}
                  >
                    {stage.icon}
                  </span>

                </div>


                {/* STAGE INFO */}

                <div className="mt-4 sm:mt-7">

                  <p
                    className="mb-1 text-[8px] font-extrabold tracking-[1.3px] sm:text-[10px] sm:tracking-[2px]"
                    style={{ color: stage.accent }}
                  >
                    {stage.wing.toUpperCase()}
                  </p>

                  <h3 className="text-[13px] font-black leading-tight text-[#172A46] sm:text-xl lg:text-2xl">
                    {stage.name}
                  </h3>

                  <p className="mt-2 text-[9px] font-semibold leading-4 text-slate-500 sm:text-xs sm:leading-5">
                    {stage.classes}
                  </p>

                </div>


                {/* BOTTOM DESCRIPTION */}

                <div className="mt-4 border-t border-slate-200/70 pt-3 sm:mt-6 sm:pt-4">

                  <p className="hidden text-[11px] leading-5 text-slate-500 sm:block">
                    {stage.focus}
                  </p>

                  <div
                    className="mt-1 flex items-center gap-1.5 text-[9px] font-extrabold sm:mt-3 sm:text-[10px]"
                    style={{ color: stage.accent }}
                  >
                    {selected ? "VIEWING STAGE" : "EXPLORE STAGE"}
                    <span>↗</span>
                  </div>

                </div>


                {/* ACTIVE BAR */}

                {selected && (
                  <span
                    className="absolute bottom-0 left-0 h-1 w-full"
                    style={{ backgroundColor: stage.accent }}
                  />
                )}

              </button>

            );

          })}

        </div>


        {/* ================================= */}
        {/* NEP STRUCTURE NOTE */}
        {/* ================================= */}

        {/* <div className="curriculum-heading mt-5 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-4">

          <p className="text-[10px] leading-5 text-blue-900 sm:text-xs">
            <strong>NEP 2020 structure:</strong> Foundational Stage covers
            3 years of preschool plus Classes I–II; Preparatory covers
            Classes III–V; Middle covers VI–VIII; Secondary covers IX–XII.
            The school wings above are operational groupings.
          </p>

        </div> */}


        {/* ================================= */}
        {/* ACTIVE STAGE DETAIL PANEL */}
        {/* ================================= */}

        <div
          ref={panelRef}
          className="mt-9 overflow-hidden rounded-[25px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(23,42,70,0.06)] sm:mt-12 sm:rounded-4xl"
        >

          {/* PANEL HEADER */}

          <div
            className="relative overflow-hidden p-6 sm:p-9 lg:p-12"
            style={{
              background: `linear-gradient(120deg, ${activeStage.soft}, #FFFFFF 85%)`,
            }}
          >

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-center">

              <div>

                <span
                  className="inline-flex rounded-full px-3 py-2 text-[9px] font-extrabold tracking-[2px]"
                  style={{
                    backgroundColor: `${activeStage.accent}20`,
                    color: activeStage.accent,
                  }}
                >
                  STAGE {activeStage.number} / 04
                </span>


                <h3 className="mt-5 text-2xl font-black tracking-tight text-[#172A46] sm:text-3xl lg:text-4xl">
                  {activeStage.heading}
                </h3>

                <p className="mt-3 text-[10px] font-bold tracking-wider text-slate-400 sm:text-xs">
                  {activeStage.wing.toUpperCase()} · {activeStage.classes}
                </p>

                <p className="mt-4 max-w-2xl text-xs leading-7 text-slate-600 sm:text-sm">
                  {activeStage.description}
                </p>

              </div>


              <img
                src={activeStage.image}
                alt={`${activeStage.name} students`}
                className="hidden h-40 w-40 rounded-[30px] object-cover shadow-lg sm:block lg:h-48 lg:w-48"
              />

            </div>

          </div>


          {/* DYNAMIC STAGE BODY */}

          {/* <div className="border-t border-slate-100 p-5 sm:p-8 lg:p-12">

            {activeStageId === "pre-primary" && (

              <PrePrimaryContent
                activeRoutine={activeRoutine}
                setActiveRoutine={setActiveRoutine}
              />

            )}

            {activeStageId === "primary" && (

              <PrimaryContent />

            )}

            {activeStageId === "middle" && (

              <MiddleContent />

            )}

            {activeStageId === "secondary" && (

              <SecondaryContent
                activeStream={activeStream}
                setActiveStream={setActiveStream}
                activeResult={activeResult}
                setActiveResult={setActiveResult}
              />

            )}

          </div> */}

        </div>


        {/* ================================= */}
        {/* BOTTOM ADMISSION CTA */}
        {/* ================================= */}

        <div className="mt-9 flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#152541] p-6 sm:flex-row sm:items-center sm:p-9">

          <div>

            <SectionLabel color="#F49A79">
              TAKE THE NEXT STEP
            </SectionLabel>

            <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
              Every Great Journey Starts Here.
            </h3>

            <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">
              Explore admission opportunities and become part
              of our learning community.
            </p>

          </div>


          <a
            href="/admmisson"
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#F0805A] px-6 py-4 text-xs font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-[#E66C43] hover:shadow-lg hover:shadow-orange-500/20"
          >
            Admission Enquiry
            <span>↗</span>
          </a>

        </div>

      </div>

    </section>

  );

};


export default SchoolCurriculum;



