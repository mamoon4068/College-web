
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import collegePhoto from "../assets/AboutUs-College-image.jpg";
import PrincipalDr from "../assets/Principal.png";
import Directorpic from "../assets/Director-pic.png";

gsap.registerPlugin(ScrollTrigger);

/* ---------- College Details ---------- */

const COLLEGE = {
  name: "गायत्री शिक्षा निकेतन",
  tagline: "Jahan seekhna sirf degree nahi, zindagi banane ka safar hai.",
  established: 1998,

  stats: [
    { value: 25, suffix: "+", label: "Saal ka bharosa" },
    { value: 1200, suffix: "+", label: "Alumni" },
    { value: 800, suffix: "+", label: "Happy Parents" },
    { value: 120, suffix: "+", label: "Faculty members" },
  ],
};

/* ---------- College Story ---------- */

const STORY = {
  title: "Ek chhote classroom se bade sapno tak",

  paragraphs: [
    `Humne ${COLLEGE.established} mein sirf kuch students aur ek chhoti si building ke saath shuruaat ki thi. Humare paas sansadhan kam the, lekin seekhne aur sikhane ka junoon bahut tha.`,

    "Aaj humare students doctor, engineer, teacher, entrepreneur aur sarkari adhikari ban kar desh ke alag-alag hisson mein naam roshan kar rahe hain.",

    "Hamari sabse badi safalta koi award nahi, balki woh pehli peedhi ke students hain jo apne parivar mein graduate hone wale pehle insaan bane.",
  ],

  highlight:
    "Pehli peedhi ke graduates hamari sabse badi pehchaan hain.",
};

/* ---------- Director & Principal Details ---------- */

const LEADERS = [
  {
    key: "director",
    role: "Manager / Director",
    name: "Dr. Ashtosh Sinha",
    image: Directorpic,
    quote: "Sapne wahi pure hote hain jinke peeche mehnat khadi hoti hai.",

    message: [
      "Mere liye college sirf imaarat nahi, ek ummeed hai. Har subah jab main students ko gate se andar aate dekhta hoon, to mujhe unke andar ka future dikhta hai.",

      "Asafalta rukne ka naam hai, girne ka nahi. Aap girein, seekhein aur dobara uthein. Hum aapke saath hain, har kadam par.",
    ],
  },

  {
    key: "principal",
    role: "Principal",
    name: "Dr. Neelam Sinha",
    image: PrincipalDr,
    quote: "Shiksha woh hai jo aapko sawaal poochhna sikhaye.",

    message: [
      "Humara maqsad hai ki har student sirf kitabi gyaan na le, balki sochna, samajhna aur samasya hal karna seekhe. Anushasan aur imandari humari neev hain.",

      "Aap sabhi ko meri shubhkamnayein. Apni kshamta par vishwas rakhein, kyunki aapki safalta hi is sansthan ki safalta hai.",
    ],
  },
];

export default function AboutUs() {
  const root = useRef(null);

  /* ---------- GSAP Animations ---------- */

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray("[data-count]");

      if (reduce) return;

      // Hero Animation
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-hero-line]", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
      })
        .from(
          "[data-hero-sub]",
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-photo]",
          {
            clipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power4.inOut",
          },
          0.1
        )
        .from(
          "[data-hero-img]",
          {
            scale: 1.25,
            duration: 1.6,
          },
          0.1
        );

      // Stats Counter Animation
      counters.forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { n: 0 };

        gsap.to(obj, {
          n: end,
          duration: 1.6,
          ease: "power2.out",

          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },

          onUpdate: () => {
            el.textContent = Math.round(obj.n).toLocaleString("en-IN");
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="bg-[#F6F7F9] text-[#12263F] font-['Source_Serif_4',serif]"
    >
      {/* ---------- Hero Section ---------- */}

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:py-24">

        <div>
          <h1 className="font-['Bricolage_Grotesque',sans-serif] text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">

            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                About
              </span>
            </span>

            {/* <span className="block overflow-hidden">
              <span data-hero-line className="block">
                {COLLEGE.name}
              </span>
            </span> */}

  <span className="block overflow-hidden py-3">
  <span
    data-hero-line
    className="block leading-[1.2] whitespace-normal"
  >
    {COLLEGE.name}
  </span>
</span>

          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-md text-lg leading-relaxed text-[#12263F]/80"
          >
            {COLLEGE.tagline}
          </p>

          <p
            data-hero-sub
            className="mt-4 inline-block border-l-4 border-[#F2A900] pl-3 font-semibold"
          >
            Established {COLLEGE.established}
          </p>
        </div>

        <div
          data-hero-photo
          className="aspect-4/3 overflow-hidden rounded-sm bg-[#12263F]/10"
        >
          <img
            data-hero-img
            src={collegePhoto}
            alt={`${COLLEGE.name} campus`}
            className="h-full w-full object-cover"
          />
        </div>

      </section>

      {/* ---------- Stats Section ---------- */}

      <section className="bg-[#12263F] text-[#F6F7F9]">

        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4">

          {COLLEGE.stats.map((s) => (
            <div key={s.label}>

              <dt className="order-2 mt-1 text-sm text-[#F6F7F9]/70">
                {s.label}
              </dt>

              <dd className="font-['Bricolage_Grotesque',sans-serif] text-4xl font-extrabold text-[#F2A900] md:text-5xl">

                <span data-count={s.value}>
                  {s.value.toLocaleString("en-IN")}
                </span>

                {s.suffix}

              </dd>

            </div>
          ))}

        </dl>

      </section>

      {/* ---------- Success Story ---------- */}

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">

        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">

          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-bold leading-tight md:text-4xl">
            {STORY.title}
          </h2>

          <div className="space-y-5 text-lg leading-8">

            {STORY.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <blockquote className="border-l-4 border-[#F2A900] bg-white px-5 py-4 font-semibold">
              {STORY.highlight}
            </blockquote>

          </div>

        </div>

      </section>

      {/* ---------- Director & Principal Section ---------- */}

      <section className="bg-white">

        <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 md:py-24">

          {LEADERS.map((p, i) => (

            <article
              key={p.key}
              className={`grid gap-8 md:grid-cols-[220px_1fr] md:items-start ${
                i % 2 ? "md:[direction:rtl]" : ""
              }`}
            >

              {/* Leader Image */}

              <div className="aspect-square w-40 overflow-hidden rounded-sm bg-[#12263F]/10 md:w-full md:[direction:ltr]">

                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />

              </div>

              {/* Leader Details */}

              <div className="md:[direction:ltr]">

                <p className="font-semibold text-[#12263F]/70">
                  {p.role}
                </p>

                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold md:text-3xl">
                  {p.name}
                </h3>

                <p className="mt-5 font-['Bricolage_Grotesque',sans-serif] text-2xl font-semibold leading-snug">
                  “{p.quote}”
                </p>

                <div className="mt-5 max-w-prose space-y-4 text-lg leading-8">

                  {p.message.map((m, j) => (
                    <p key={j}>{m}</p>
                  ))}

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}


