
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { Link } from "react-router-dom";


// const navLinks = [
//   { name: "Home", href: "#home" },
//   { name: "About Us", href: "/AboutUs" },
//   { name: "Authority", href: "#authority" },
//   { name: "Admission", href: "#admission" },
//   { name: "Fee Structure", href: "#fees" },
//   { name: "Gallery", href: "#gallery" },
//   { name: "Academic", href: "#academic" },
//   { name: "Contact", href: "/contact" },
// ];

// const loginLinks = [
//   { name: "Student Login", href: "/student-login", icon: "🎓" },
//   { name: "Staff Login", href: "/staff-login", icon: "👨‍🏫" },
//   { name: "Admin Login", href: "/admin-login", icon: "🔐" },
// ];

// const Navbar = () => {
//   const navRef = useRef(null);
//   const mobileMenuRef = useRef(null);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // GSAP entrance animation
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".nav-logo", {
//         x: -20,
//         duration: 0.7,
//         ease: "power3.out",
//       });

//       gsap.from(".nav-link", {
//         y: -12,
//         duration: 0.5,
//         stagger: 0.05,
//         delay: 0.1,
//         ease: "power3.out",
//       });
//     }, navRef);

//     return () => ctx.revert();
//   }, []);

//   // Mobile menu animation
//   useEffect(() => {
//     if (!mobileOpen || !mobileMenuRef.current) return;

//     const animation = gsap.fromTo(
//       mobileMenuRef.current,
//       { y: -12, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
//     );

//     return () => animation.kill();
//   }, [mobileOpen]);

//   const closeMenu = () => setMobileOpen(false);

//   return (
//     <header
//       ref={navRef}
//       className="sticky top-0 z-50 mx-auto w-full max-w-7xl border-b border-gray-200 bg-white shadow-md"
//     >
//       {/* ================= DESKTOP NAVBAR ================= */}
//       <nav className="hidden lg:grid w-full max-w-[1800px] mx-auto grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 xl:px-6">

//         {/* College Logo */}
//         <a href="#home" className="nav-logo shrink-0">
//           <img
//             src={collegeLogo}
//             alt="College Logo"
//             className="h-11 w-11 rounded-lg object-contain"
//           />
//         </a>

//         {/* Navigation Links */}
//         <div className="flex min-w-0 items-center justify-center gap-x-2 xl:gap-x-3 2xl:gap-x-4">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//                className="nav-link group relative whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-blue-700 xl:text-base 3xl:text-lg"            >
//               {link.name}

//               <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-700 transition-all duration-300 group-hover:w-full" />
//             </a>
//           ))}
//         </div>

//         {/* FIXED DESKTOP LOGIN SECTION */}
//         <div className="flex shrink-0 items-center justify-self-end gap-1.5 xl:gap-2">

//           {loginLinks.map((login) => (
//             <a
//               key={login.name}
//               href={login.href}
//               className="inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-blue-200 bg-blue-50 px-2 py-2.5 text-xs font-bold text-blue-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-800 hover:bg-blue-800 hover:text-white xl:px-2.5 xl:text-sm 2xl:px-3 2xl:text-base"
//             >
//               <span className="text-sm">{login.icon}</span>
//               {login.name}
//             </a>
//           ))}

//         </div>
//       </nav>

//       {/* ================= MOBILE NAVBAR ================= */}
//       <nav className="flex lg:hidden items-center justify-between px-4 py-3">

//         <a href="#home" className="flex items-center">
//           <img
//             src={collegeLogo}
//             alt="College Logo"
//             className="h-11 w-11 rounded-lg object-contain"
//           />
//         </a>

//         <button
//           onClick={() => setMobileOpen((prev) => !prev)}
//           aria-label="Toggle navigation menu"
//           aria-expanded={mobileOpen}
//           className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900"
//         >
//           <div className="flex w-6 flex-col gap-1.5">
//             <span
//               className={`h-0.5 w-full bg-current transition-all duration-300 ${
//                 mobileOpen ? "translate-y-2 rotate-45" : ""
//               }`}
//             />
//             <span
//               className={`h-0.5 w-full bg-current transition-all duration-300 ${
//                 mobileOpen ? "opacity-0" : ""
//               }`}
//             />
//             <span
//               className={`h-0.5 w-full bg-current transition-all duration-300 ${
//                 mobileOpen ? "-translate-y-2 -rotate-45" : ""
//               }`}
//             />
//           </div>
//         </button>
//       </nav>

//       {/* ================= MOBILE MENU ================= */}
//       {mobileOpen && (
//         <div
//           ref={mobileMenuRef}
//           className="absolute left-0 top-full w-full border-t border-gray-200 bg-white px-5 py-4 shadow-xl lg:hidden"
//         >
//           <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={closeMenu}
//                 className="rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>

//           {/* Mobile Login Buttons */}
//           <div className="mt-4 border-t border-gray-200 pt-4">
//             <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
//               Login Portals
//             </p>

//             <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
//               {loginLinks.map((login) => (
//                 <a
//                   key={login.name}
//                   href={login.href}
//                   onClick={closeMenu}
//                   className="flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-3 py-3 text-base font-semibold text-white transition hover:bg-blue-950"
//                 >
//                   <span>{login.icon}</span>
//                   {login.name}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;





import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { schoolImages } from "../lib/schoolImages";
const collegeLogo = schoolImages["college-logo.jpg"];
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Authority", href: "/authoritiespage" },
  { name: "Admission", href: "/admmisson" },
  { name: "Fee Structure", href: "/fees" },
  { name: "Gallery", href: "/gallerypage" },
  { name: "Academic", href: "/academics" },
  { name: "Contact", href: "/contact" },
];

const loginLinks = [
  { name: "Student Login", href: "/student-login", icon: "🎓" },
  { name: "Staff Login", href: "/staff-login", icon: "👨‍🏫" },
  { name: "Admin Login", href: "/adminlogin", icon: "🔐" },
];

const Navbar = () => {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-logo", {
        x: -20,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".nav-link", {
        y: -12,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.1,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;

    const animation = gsap.fromTo(
      mobileMenuRef.current,
      { y: -12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      }
    );

    return () => animation.kill();
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  // Navigation link renderer
  const renderNavLink = (link, mobile = false) => {
    const className = mobile
      ? "rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
      : "nav-link group relative whitespace-nowrap text-sm font-semibold text-gray-700 transition-colors duration-300 hover:text-blue-700 xl:text-base 3xl:text-lg";

    // React Router navigation for separate pages
    if (link.href.startsWith("/")) {
      return (
        <Link
          key={link.name}
          to={link.href}
          onClick={mobile ? closeMenu : undefined}
          className={className}
        >
          {link.name}

          {!mobile && (
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-700 transition-all duration-300 group-hover:w-full" />
          )}
        </Link>
      );
    }

    // Normal anchor navigation for Home sections
    return (
      <a
        key={link.name}
        href={link.href}
        onClick={mobile ? closeMenu : undefined}
        className={className}
      >
        {link.name}

        {!mobile && (
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-blue-700 transition-all duration-300 group-hover:w-full" />
        )}
      </a>
    );
  };

  return (
    <header
      ref={navRef}
      className="relative top-0 z-50 mx-auto  w-full max-w-7xl border-b border-gray-200 bg-white shadow-md"
    >
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="hidden lg:grid w-full max-w-[1800px] text-8xl mx-auto grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 xl:px-6">

        {/* College Logo */}
        <Link to="/" onClick={closeMenu} className="nav-logo shrink-0">
          <img
            src={collegeLogo}
            alt="College Logo"
            className="h-11 w-11 rounded-lg object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex min-w-0  items-center justify-center gap-x-2 xl:gap-x-3 2xl:gap-x-4">
          {navLinks.map((link) => renderNavLink(link))}
        </div>

        {/* Desktop Login Section */}
        <div className="flex shrink-0 items-center justify-self-end gap-1.5 xl:gap-2">
          {loginLinks.map((login) => (
            <a
              key={login.name}
              href={login.href}
              className="inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-blue-200 bg-blue-50 px-2 py-2.5 text-xs font-bold text-blue-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-800 hover:bg-blue-800 hover:text-white xl:px-2.5 xl:text-sm 2xl:px-3 2xl:text-base"
            >
              <span className="text-sm">{login.icon}</span>
              {login.name}
            </a>
          ))}
        </div>
      </nav>

      {/* ================= MOBILE NAVBAR ================= */}
      <nav className="flex lg:hidden items-center justify-between px-4 py-3">

        <Link to="/" onClick={closeMenu} className="flex items-center">
          <img
            src={collegeLogo}
            alt="College Logo"
            className="h-11 w-11 rounded-lg object-contain"
          />
        </Link>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900"
        >
          <div className="flex w-6 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute left-0 top-full w-full border-t border-gray-200 bg-white px-5 py-4 shadow-xl lg:hidden"
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {navLinks.map((link) => renderNavLink(link, true))}
          </div>

          {/* Mobile Login Buttons */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
              Login Portals
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {loginLinks.map((login) => (
                <a
                  key={login.name}
                  href={login.href}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-3 py-3 text-base font-semibold text-white transition hover:bg-blue-950"
                >
                  <span>{login.icon}</span>
                  {login.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;







