import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Send,
  GraduationCap,
  MessageCircle,
  Navigation,
  User,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ==========================================
// 1. SCHOOL CONTACT DETAILS
// Add your official details here
// ==========================================

const schoolContact = {
  name: "Gayatri Shiksha Niketan",
  address:
    "Nepal Road, Simri Bakhtiyarpur, Saharsa, Bihar, India",

  phone: ["9308708751, 6200182382"],
  email: "gsnsimribakhtiyarpur@gmail.com​",
  timing: "Please confirm school timings",

  mapQuery:
    "Gayatri Shiksha Niketan S.B.PUR Nepal Road Simri Bakhtiyarpur Saharsa Bihar",
};

// ==========================================
// 2. CONTACT INFORMATION
// ==========================================

const contactItems = [
  {
    icon: MapPin,
    title: "Our School Address",
    value: schoolContact.address,
    action: "Get Directions",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      schoolContact.mapQuery
    )}`,
    external: true,
  },
  {
    icon: Clock,
    title: "School Timing",
    value: schoolContact.timing,
    action: "School Hours",
    href: null,
  },
  {
    icon: Phone,
    title: "Call Us",
    value:
      schoolContact.phone || "Official phone number to be added",
    action: schoolContact.phone ? "Call Now" : "Contact details pending",
    href: schoolContact.phone
      ? `tel:${schoolContact.phone}`
      : null,
  },
  {
    icon: Mail,
    title: "Email Address",
    value:
      schoolContact.email || "Official email to be added",
    action: schoolContact.email ? "Send Email" : "Email pending",
    href: schoolContact.email
      ? `mailto:${schoolContact.email}`
      : null,
  },
];

// ==========================================
// 3. MAIN CONTACT COMPONENT
// ==========================================

export default function ContactSection() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  // ========================================
  // 4. GSAP ANIMATIONS - FIXED
  // ========================================

  useGSAP(
    () => {
      // Heading animation
      gsap.fromTo(
        ".contact-heading",
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 90%",
            once: true,
          },
        }
      );

      // IMPORTANT FIX:
      // Contact cards are animated only when their
      // parent section enters the viewport.

      const contactCards = gsap.utils.toArray(
        ".contact-card",
        sectionRef.current
      );

      gsap.fromTo(
        contactCards,
        {
          y: 35,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,

          // Remove temporary animation styles
          onComplete: () => {
            gsap.set(contactCards, {
              clearProps: "transform,opacity,visibility",
            });
          },

          scrollTrigger: {
            trigger: ".contact-cards",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Left information panel
      gsap.fromTo(
        ".contact-info-panel",
        {
          x: -35,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: ".contact-layout",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Contact form
      gsap.fromTo(
        ".contact-form",
        {
          x: 35,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: ".contact-layout",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Google map
      gsap.fromTo(
        ".contact-map",
        {
          y: 35,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: ".contact-map",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Floating graduation icon
      gsap.to(".contact-floating-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Refresh trigger positions after setup
      ScrollTrigger.refresh();

    },
    {
      scope: sectionRef,
      dependencies: [],
      revertOnUpdate: true,
    }
  );

  // ========================================
  // 5. INPUT HANDLER
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setFormStatus("");
  };

  // ========================================
  // 6. FORM SUBMISSION
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!schoolContact.email) {
      setFormStatus(
        "School email is not configured. Please add the official email in schoolContact."
      );
      return;
    }

    const subject = encodeURIComponent(
      `Website Enquiry - ${formData.fullName}`
    );

    const body = encodeURIComponent(
      `Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`
    );

    const mailtoLink =
      `mailto:${schoolContact.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setFormStatus(
      "Your email application is opening. Please send the prepared enquiry to the school."
    );
  };

  // ========================================
  // 7. JSX
  // ========================================

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate overflow-hidden bg-[#F7F9FC] px-5 py-20 sm:px-8 lg:px-16 lg:py-28"
    >
      {/* Background Decorations */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#159E92]/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#EABF68]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* ==================================
            SECTION HEADING
        =================================== */}

        <div className="contact-heading mb-12 mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#159E92]/20 bg-[#E8F5F2] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#159E92]">
            <MessageCircle size={15} />
            Contact Our School
          </div>

          <h2 className="text-3xl font-bold leading-tight text-[#102B4E] sm:text-4xl lg:text-6xl">
            Let's Connect &
            <span className="block text-[#159E92]">
              Build a Bright Future.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Have questions about admissions, academics or school
            activities? Get in touch with Gayatri Shiksha Niketan.
            Our team will be happy to assist you.
          </p>

        </div>

        {/* ==================================
            CONTACT INFORMATION CARDS
        =================================== */}

        <div className="contact-cards mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="contact-card group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#159E92]/40 hover:shadow-xl"
              >

                <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5F2] text-[#159E92] transition-all duration-300 group-hover:bg-[#102B4E] group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="text-lg font-bold text-[#102B4E]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-12 flex-1 wrap-break-word text-sm leading-6 text-slate-500">
                  {item.value}
                </p>

                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#159E92] transition-all hover:gap-3"
                  >
                    {item.action}
                    <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400">
                    {item.action}
                  </span>
                )}

              </div>
            );
          })}

        </div>

        {/* ==================================
            CONTACT FORM + INFORMATION
        =================================== */}

        <div className="contact-layout grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT INFORMATION PANEL */}

          <div className="contact-info-panel relative flex flex-col justify-between overflow-hidden rounded-4xl bg-[#102B4E] p-8 text-white sm:p-10">

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

            <div className="relative">

              <div className="contact-floating-icon mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#159E92] text-white shadow-lg shadow-black/20">
                <GraduationCap size={32} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#65D5C5]">
                Get in Touch
              </span>

              <h3 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                We Are Here
                <span className="block text-[#65D5C5]">
                  To Help You.
                </span>
              </h3>

              <p className="mt-6 leading-8 text-blue-100/75">
                Whether you are a parent looking for admission
                information or someone interested in our school,
                feel free to contact us.
              </p>

              <div className="mt-10 space-y-6">

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#65D5C5]">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h4 className="font-bold">
                      Visit Our Campus
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-blue-100/70">
                      {schoolContact.address}
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#65D5C5]">
                    <Clock size={21} />
                  </div>

                  <div>
                    <h4 className="font-bold">
                      School Hours
                    </h4>

                    <p className="mt-2 text-sm text-blue-100/70">
                      {schoolContact.timing}
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#65D5C5]">
                    <Mail size={21} />
                  </div>

                  <div>
                    <h4 className="font-bold">
                      Email Support
                    </h4>

                    <p className="mt-2 break-all text-sm text-blue-100/70">
                      {schoolContact.email || "Official email to be added"}
                    </p>
                  </div>

                </div>

                {schoolContact.phone && (
                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#65D5C5]">
                      <Phone size={21} />
                    </div>

                    <div>
                      <h4 className="font-bold">
                        Call Our School
                      </h4>

                      <a
                        href={`tel:${schoolContact.phone}`}
                        className="mt-2 block text-sm text-blue-100/70 hover:text-white"
                      >
                        {schoolContact.phone}
                      </a>
                    </div>

                  </div>
                )}

              </div>
            </div>

            <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-sm font-semibold text-[#65D5C5]">
                Education Begins With Trust.
              </p>

              <p className="mt-2 text-xs leading-6 text-blue-100/65">
                Gayatri Shiksha Niketan — nurturing young minds
                through education, values and opportunities.
              </p>

            </div>

          </div>

          {/* RIGHT CONTACT FORM */}

          <div className="contact-form rounded-4xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">

            <div className="mb-9">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
                Send Us a Message
              </span>

              <h3 className="mt-3 text-3xl font-bold text-[#102B4E]">
                Get in Touch
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Fill in the details below and share your enquiry
                with our school.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* FULL NAME */}

              <div>

                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-bold text-[#102B4E]"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-4 pl-12 pr-4 text-sm text-[#102B4E] outline-none transition-all placeholder:text-slate-400 focus:border-[#159E92] focus:bg-white focus:ring-4 focus:ring-[#159E92]/10"
                  />

                </div>
              </div>

              {/* EMAIL + PHONE */}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-[#102B4E]"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-4 pl-11 pr-3 text-sm text-[#102B4E] outline-none transition-all placeholder:text-slate-400 focus:border-[#159E92] focus:bg-white focus:ring-4 focus:ring-[#159E92]/10"
                    />

                  </div>
                </div>

                <div>

                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-[#102B4E]"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      autoComplete="tel"
                      pattern="[0-9+\-\s()]{7,20}"
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-4 pl-11 pr-3 text-sm text-[#102B4E] outline-none transition-all placeholder:text-slate-400 focus:border-[#159E92] focus:bg-white focus:ring-4 focus:ring-[#159E92]/10"
                    />

                  </div>
                </div>

              </div>

              {/* MESSAGE */}

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold text-[#102B4E]"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message or enquiry here..."
                  rows={5}
                  required
                  className="w-full resize-y rounded-xl border border-slate-200 bg-[#F8FAFC] px-5 py-4 text-sm text-[#102B4E] outline-none transition-all placeholder:text-slate-400 focus:border-[#159E92] focus:bg-white focus:ring-4 focus:ring-[#159E92]/10"
                />

              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#159E92] px-7 py-4 font-bold text-white shadow-lg shadow-[#159E92]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#102B4E] hover:shadow-xl"
              >
                Submit Enquiry

                <Send
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              {/* FORM STATUS */}

              {formStatus && (
                <div
                  role="status"
                  className="rounded-xl border border-[#159E92]/20 bg-[#E8F5F2] p-4 text-sm leading-6 text-[#102B4E]"
                >
                  {formStatus}
                </div>
              )}

              <p className="text-center text-xs leading-6 text-slate-400">
                Your information should only be used to respond
                to your enquiry.
              </p>

            </form>

          </div>

        </div>

        {/* ==================================
            GOOGLE MAP SECTION
        =================================== */}

        <div className="contact-map mt-20">

          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#159E92]">
                Find Our Location
              </span>

              <h3 className="mt-3 text-3xl font-bold text-[#102B4E] sm:text-4xl">
                Visit Our School
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                We welcome parents and visitors to our campus.
              </p>

            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                schoolContact.mapQuery
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#159E92]/30 bg-white px-6 py-3 text-sm font-bold text-[#159E92] transition-all hover:bg-[#159E92] hover:text-white sm:self-auto"
            >
              <Navigation size={17} />
              Open in Google Maps
              <ArrowUpRight size={17} />
            </a>

          </div>

          <div className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-2 shadow-xl">

            <iframe
              title="Gayatri Shiksha Niketan School Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                schoolContact.mapQuery
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="430"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="rounded-3xl grayscale-15 transition-all duration-700 group-hover:grayscale-0"
            />

            <div className="pointer-events-none absolute bottom-7 left-7 hidden max-w-sm rounded-2xl border border-white/50 bg-white/95 p-5 shadow-xl backdrop-blur-md sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5F2] text-[#159E92]">
                  <MapPin size={22} />
                </div>

                <div>

                  <p className="font-bold text-[#102B4E]">
                    {schoolContact.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Simri Bakhtiyarpur, Saharsa
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}



