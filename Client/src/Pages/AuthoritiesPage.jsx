// import React from 'react';
// import { Mail, Phone, Award, ShieldCheck } from 'lucide-react';

// const AuthoritiesPage = () => {
//   const leadership = [
//     {
//       name: "Dr. R. K. Choudhary",
//       role: "Patron & Founder",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
//       bio: "Visionary educationist dedicated to bringing holistic rural education to Saharsa, Bihar.",
//       email: "patron@gsnonline.org"
//     },
//     {
//       name: "Rajesh Kumar Verma",
//       role: "Principal",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
//       bio: "Over 18 years of academic leadership experience focusing on CBSE curriculum excellence.",
//       email: "principal@gsnonline.org"
//     },
//     {
//       name: "Sunita Sharma",
//       role: "Vice-Principal",
//       image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
//       bio: "Specialist in child psychology and progressive interactive learning methodologies.",
//       email: "viceprincipal@gsnonline.org"
//     }
//   ];

//   const committeeMembers = [
//     { name: "Anand Mohan Singh", designation: "President", qualification: "M.Sc., B.Ed." },
//     { name: "Pooja Kumari", designation: "Secretary", qualification: "M.A. Public Administration" },
//     { name: "Manoj Kumar Sah", designation: "Treasurer", qualification: "B.Com, CA (Inter)" },
//     { name: "Dr. Alok Ranjan", designation: "Educational Advisor", qualification: "Ph.D. in Education" },
//   ];

//   return (
//     <div className="bg-slate-50 min-h-screen text-slate-1100 font-sans">
      
//       {/* Hero Section */}
//       <section className="bg-linear-to-r from-blue-900 to-blue-950 text-white py-16 px-6 text-center">
//         <div className="max-w-4xl mx-auto">
//           {/* <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
//             Governance & Leadership
//           </span> */}
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
//             School Authorities & Management
//           </h1>
//           <p className="text-slate-300 text-lg max-w-2xl mx-auto">
//             Meet the experienced leaders and governing members guiding Gayatri Shiksha Niketan toward a brighter, future-ready tomorrow.
//           </p>
//         </div>
//       </section>

//       {/* Main Leadership Grid */}
//       <section className="max-w-7xl mx-auto px-6 pt-8 pb-16">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-blue-950 mb-2">Key Administrative Leaders</h2>
//           {/* <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div> */}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {leadership.map((leader, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
//             >
//               <div className="h-64 overflow-hidden relative">
//                 <img 
//                   src={leader.image} 
//                   alt={leader.name} 
//                   className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute bottom-3 left-3 bg-blue-900/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-md font-medium">
//                   {leader.role}
//                 </div>
//               </div>
//               <div className="p-6 flex-1 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-blue-950 mb-1">{leader.name}</h3>
//                   <p className="text-slate-600 text-sm mb-4 leading-relaxed">{leader.bio}</p>
//                 </div>
//                 <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
//                   <a 
//                     href={`mailto:${leader.email}`} 
//                     className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
//                   >
//                     <Mail size={16} /> {leader.email}
//                   </a>
//                   <Award className="text-amber-500" size={18} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Managing Committee Table Section */}
//       <section className="bg-white py-16 border-y border-slate-200">
//         <div className="max-w-5xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-blue-950 mb-2">School Managing Committee</h2>
//             <p className="text-slate-600">Committed professionals overseeing ethical administration and development</p>
//           </div>

//           <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-blue-900 text-white text-sm uppercase tracking-wider">
//                   <th className="py-4 px-6 font-semibold">Member Name</th>
//                   <th className="py-4 px-6 font-semibold">Designation</th>
//                   <th className="py-4 px-6 font-semibold">Qualification</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
//                 {committeeMembers.map((member, idx) => (
//                   <tr key={idx} className="hover:bg-slate-50 transition-colors">
//                     <td className="py-4 px-6 font-medium text-blue-950">{member.name}</td>
//                     <td className="py-4 px-6">
//                       <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
//                         {member.designation}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 text-slate-600">{member.qualification}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>

//       {/* Compliance / Note Box */}
//       <section className="max-w-4xl mx-auto px-6 py-16">
//         <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex items-start gap-4">
//           <div className="bg-blue-600 text-white p-3 rounded-xl shrink-0">
//             <ShieldCheck size={28} />
//           </div>
//           <div>
//             <h3 className="text-lg font-bold text-blue-950 mb-1">Administrative Transparency & Compliance</h3>
//             <p className="text-slate-600 text-sm leading-relaxed">
//               In accordance with CBSE guidelines and institutional governance standards, all administrative structures, fee committees, and grievance redressal cells operate with full transparency. For official correspondence, you can reach out via the [Contact Page](https://gsnonline.org/) or call the school administrative office directly.
//             </p>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default AuthoritiesPage;




import React from "react";
import { Mail, Award, ShieldCheck } from "lucide-react";

const AuthoritiesPage = () => {
  // Leadership Members
  const leadership = [
    {
      name: "Dr. R. K. Choudhary",
      role: "Patron & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      bio: "Visionary educationist dedicated to bringing holistic rural education to Saharsa, Bihar.",
      email: "patron@gsnonline.org",
    },
    {
      name: "Rajesh Kumar Verma",
      role: "Principal",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      bio: "Over 18 years of academic leadership experience focusing on CBSE curriculum excellence.",
      email: "principal@gsnonline.org",
    },
    {
      name: "Sunita Sharma",
      role: "Vice-Principal",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      bio: "Specialist in child psychology and progressive interactive learning methodologies.",
      email: "viceprincipal@gsnonline.org",
    },
  ];

  // Managing Committee Members
  const committeeMembers = [
    {
      name: "Anand Mohan Singh",
      designation: "President",
      qualification: "M.Sc., B.Ed.",
    },
    {
      name: "Pooja Kumari",
      designation: "Secretary",
      qualification: "M.A. Public Administration",
    },
    {
      name: "Manoj Kumar Sah",
      designation: "Treasurer",
      qualification: "B.Com, CA (Inter)",
    },
    {
      name: "Dr. Alok Ranjan",
      designation: "Educational Advisor",
      qualification: "Ph.D. in Education",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-950 via-blue-900 to-blue-950 px-5 py-10 sm:py-12 md:py-14 text-center text-white">

        {/* Background Decoration */}
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl">

          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-200 mb-3">
            Governance & Leadership
          </span>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            School Authorities & Management
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base md:text-lg">
            Meet the experienced leaders and governing members guiding
            Gayatri Shiksha Niketan toward a brighter, future-ready tomorrow.
          </p>

        </div>
      </section>

      {/* ================= LEADERSHIP SECTION ================= */}
      <section className="mx-auto max-w-7xl px-5 pt-7 pb-10 sm:px-6 md:pt-9 md:pb-12">

        {/* Section Heading */}
        <div className="mb-7 text-center">

          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Our Leadership
          </span>

          <h2 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
            Key Administrative Leaders
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Meet the people behind our institution's vision and success.
          </p>

        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

          {leadership.map((leader, index) => (
            <article
              key={index}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-60 overflow-hidden sm:h-64">

                <img
                  src={leader.image}
                  alt={leader.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/60 via-transparent to-transparent" />

                {/* Role Badge */}
                <span className="absolute bottom-4 left-4 rounded-lg bg-blue-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                  {leader.role}
                </span>

              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">

                <div>

                  <h3 className="text-xl font-bold text-blue-950">
                    {leader.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {leader.bio}
                  </p>

                </div>

                {/* Email Footer */}
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">

                  <a
                    href={`mailto:${leader.email}`}
                    className="inline-flex min-w-0 items-center gap-2 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-900"
                  >
                    <Mail size={16} className="shrink-0" />

                    <span className="truncate">
                      {leader.email}
                    </span>
                  </a>

                  <Award
                    size={20}
                    className="shrink-0 text-amber-500"
                  />

                </div>

              </div>

            </article>
          ))}

        </div>
      </section>

      {/* ================= MANAGING COMMITTEE ================= */}
      <section className="border-y border-slate-200 bg-white px-5 py-10 sm:px-6 md:py-12">

        <div className="mx-auto max-w-5xl">

          {/* Heading */}
          <div className="mb-7 text-center">

            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Administration
            </span>

            <h2 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
              School Managing Committee
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Committed professionals overseeing ethical administration
              and institutional development.
            </p>

          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">

            <table className="w-full min-w-150 border-collapse text-left">

              <thead>
                <tr className="bg-blue-950 text-sm uppercase tracking-wider text-white">

                  <th className="px-6 py-4 font-semibold">
                    Member Name
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Designation
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Qualification
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">

                {committeeMembers.map((member, index) => (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-blue-50/70"
                  >

                    <td className="px-6 py-4 font-semibold text-blue-950">
                      {member.name}
                    </td>

                    <td className="px-6 py-4">

                      <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {member.designation}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {member.qualification}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      </section>

      {/* ================= COMPLIANCE SECTION ================= */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 md:py-12">

        <div className="flex flex-col gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:flex-row sm:items-start sm:p-7">

          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">

            <ShieldCheck size={26} />

          </div>

          {/* Content */}
          <div>

            <h3 className="text-lg font-bold text-blue-950">
              Administrative Transparency & Compliance
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              In accordance with CBSE guidelines and institutional governance
              standards, all administrative structures, fee committees, and
              grievance redressal cells operate with transparency.
              For official correspondence, please visit our{" "}
              <a
                href="https://gsnonline.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-950"
              >
                Contact Page
              </a>{" "}
              or contact the school administrative office directly.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
};

export default AuthoritiesPage;
