


import React from "react";
import { schoolImages } from "../lib/schoolImages";
const collegeLogo = schoolImages["college-logo.jpg"];
const college = {
  name: "Gayatri Shiksha Niketan S.B.PUR",
  shortName: "",
  logo: collegeLogo,

  tagline: "Inspiring Excellence Through Education",

  description:
    "Committed to quality education, innovation and student success. Building confident minds for a better tomorrow.",

  phone: "9308708751, 6200182382",
  email: "admissions@yourcollege.edu",

  address:
    "Gayatri Shiksha Niketan High School Nepal Road, Simri Bakhtiyarpur Saharsa, Bihar, Pin - 852127",

  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  linkedin: "https://linkedin.com/",
  youtube: "https://youtube.com/",
  whatsapp: "https://wa.me/919876543210",
};


// =======================================
// INLINE SVG ICONS
// No external icon package required
// =======================================

const Icon = ({ name, size = 20 }) => {
  const icons = {
    cap: (
      <>
        <path d="m2 10 10-5 10 5-10 5-10-5Z" />
        <path d="M6 12v5c4 3 8 3 12 0v-5" />
        <path d="M22 10v6" />
      </>
    ),

    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1.1.4 2.2.8 3.2a2 2 0 0 1-.5 2.1L8.1 10.3a16 16 0 0 0 5.6 5.6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .4 2.1.7 3.2.8a2 2 0 0 1 1.7 2Z" />
    ),

    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    arrow: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),

    chevron: <path d="m9 18 6-6-6-6" />,

    up: (
      <>
        <path d="m18 15-6-6-6 6" />
        <path d="M12 9v12" />
      </>
    ),

    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
      </>
    ),

    facebook: (
      <path
        fill="currentColor"
        stroke="none"
        d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z"
      />
    ),

    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),

    youtube: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
      </>
    ),

    whatsapp: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-4.7A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8 8.5c.5 3 2.5 5 5.5 6l1.3-1.3 2 1c-.5 1.5-1.5 2-3 1.5-3-.8-5.3-3.1-6-6-.3-1.1.2-2.2 1.3-2.5l1 2L8 8.5Z" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};


// =======================================
// NAVIGATION LINKS
// =======================================

const exploreLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Authority", href: "#authority" },
  { name: "Admission", href: "#admission" },
];

const academicLinks = [
  { name: "Fee Structure", href: "#fees" },
  { name: "Gallery", href: "#gallery" },
  { name: "Academic", href: "#academic" },
  { name: "Contact", href: "#contact" },
];


// =======================================
// REUSABLE LINK GROUP
// =======================================

const LinkGroup = ({ title, links }) => (
  <div>
    <h3 className="mb-6 text-sm font-bold uppercase tracking-[2px] text-white">
      {title}
    </h3>

    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="group flex items-center gap-2 text-sm text-white transition-colors duration-200 hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-blue-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/50 transition-colors group-hover:bg-blue-400" />

            {link.name}

            <span className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
              ?
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);


// =======================================
// MAIN FOOTER
// =======================================

const Footer = () => {
  const year = new Date().getFullYear();

  const phoneLink = college.phone.replace(/[^\d+]/g, "");

  const socialLinks = [
    { name: "Instagram", icon: "instagram", url: college.instagram },
    { name: "Facebook", icon: "facebook", url: college.facebook },
    { name: "LinkedIn", icon: "linkedin", url: college.linkedin },
    { name: "YouTube", icon: "youtube", url: college.youtube },
    { name: "WhatsApp", icon: "whatsapp", url: college.whatsapp },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#071B3A]">

      

      {/* MAIN FOOTER CONTENT */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_0.8fr_0.85fr_1.15fr] lg:gap-10 lg:px-8 lg:py-20">

        {/* COLLEGE BRAND */}

        <div>

          <a
            href="#home"
            className="mb-6 inline-flex items-center gap-3"
          >

            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#14264B] text-white shadow-lg shadow-blue-950/15">

              {college.logo ? (
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Icon name="cap" size={28} />
                  <span className="text-[9px] font-bold">
                    {college.shortName}
                  </span>
                </div>
              )}

            </div>

            <div className="min-w-0">

              <h3 className="wrap-break-word text-lg font-extrabold leading-tight text-[#e4e8f0] sm:text-xl">
                {college.name}
              </h3>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#e4e8f0]">
                {college.tagline}
              </p>

            </div>

          </a>

          <p className="max-w-sm text-sm leading-7 text-[#e4e8f0]">
            {college.description}
          </p>

          <div className="mt-7">

            <h4 className="mb-4 text-xs font-bold uppercase tracking-[2px] text-[#416fca]">
              Follow Our Journey
            </h4>

            <div className="flex flex-wrap gap-2">

              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#26488d] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#3975F6] hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  <Icon name={item.icon} size={18} />
                </a>
              ))}

            </div> 
          </div>
        </div>


        {/* EXPLORE */}

        <LinkGroup
          title="Explore"
          links={exploreLinks}
        />


        {/* ACADEMIC */}

        <LinkGroup
          title="Quick Links"
          links={academicLinks}
        />


        {/* CONTACT INFORMATION */}

        <div className="min-w-0">

          <h3 className="mb-6 text-sm font-bold uppercase tracking-[2px] text-[#e4e8f0]">
            Get In Touch
          </h3>

          <div className="space-y-4">

            {/* PHONE */}

            <a
              href={`tel:${phoneLink}`}
              className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md hover:shadow-slate-200/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon name="phone" />
              </span>

              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Inquiry Number
                </span>

                <span className="mt-1 block break-all text-sm font-bold text-[#14264B] group-hover:text-blue-600">
                  {college.phone}
                </span>
              </span>
            </a>


            {/* EMAIL */}

            <a
              href={`mailto:${college.email}`}
              className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md hover:shadow-slate-200/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon name="mail" />
              </span>

              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </span>

                <span className="mt-1 block break-all text-sm font-bold text-[#14264B] group-hover:text-blue-600">
                  {college.email}
                </span>
              </span>
            </a>


            {/* ADDRESS */}

            <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon name="pin" />
              </span>

              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Campus Address
                </span>

                <span className="mt-1 block text-sm leading-6 text-[#14264B]">
                  {college.address}
                </span>
              </span>

            </div>

          </div>
        </div>

      </div>


      {/* COPYRIGHT BAR */}

      <div className="bg-[#14264B]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">

          <p className="text-xs leading-6 text-slate-300 sm:text-sm">
    
            <span className="font-bold text-white">
              {college.name}
            </span>
            . All Rights Reserved.
          </p>
          <span className="text-white font-bold text-xs sm:text-sm md:text-base pr-2 sm:pr-4 whitespace-nowrap">
  Design by Earthix
</span>

          {/* <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 transition-colors hover:text-white"
          >
            Back to top
            <Icon name="up" size={16} />
          </a> */}
            
<a
  href="#top"
  onClick={(e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }}
  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 transition-colors hover:text-white"
>
  Back to top
  <Icon name="up" size={16} />
</a>


        </div>

      </div>

    </footer>
  );
};

export default Footer;




