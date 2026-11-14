
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   GraduationCap,
//   FileText,
//   User,
//   MapPin,
//   CheckCircle2,
//   ArrowRight,
//   ShieldCheck,
//   BookOpen,
//   Clock,
//   Building2,
//   CalendarDays,
//   ClipboardCheck,
//   Camera,
//   IdCard,
//   FileCheck,
// } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// const offlineDocuments = [
//   { name: "10th Marksheet & Certificate", note: "For academic verification" },
//   { name: "12th Marksheet & Certificate", note: "For applicable courses" },
//   { name: "Aadhaar Card", note: "Bring original and photocopy" },
//   { name: "Passport-size Photographs", note: "Carry 4–6 recent photographs" },
//   { name: "Transfer Certificate (TC)", note: "From the previous institution" },
//   { name: "Character Certificate", note: "From the previous institution" },
//   { name: "Migration Certificate", note: "If applicable" },
//   { name: "Caste / EWS Certificate", note: "If applicable" },
//   { name: "PAN Card", note: "Only if requested by the college" },
//   { name: "Graduation Marksheet", note: "For postgraduate admission, if applicable" },
// ];

// const initialForm = {
//   firstName: "",
//   lastName: "",
//   surname: "",
//   fatherName: "",
//   motherName: "",
//   aadhaar: "",
//   dob: "",
//   gender: "",
//   mobile: "",
//   email: "",
//   address: "",
//   district: "",
//   state: "",
//   pin: "",
//   course: "",
//   passingYear10: "",
//   percentage10: "",
//   passingYear12: "",
//   percentage12: "",
// };

// const inputClass =
//   "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100";

// const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

// function InputField({
//   label,
//   name,
//   value,
//   onChange,
//   required = false,
//   type = "text",
//   placeholder,
//   maxLength,
// }) {
//   return (
//     <div>
//       <label className={labelClass} htmlFor={name}>
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         required={required}
//         maxLength={maxLength}
//         placeholder={placeholder || `Enter ${label}`}
//         className={inputClass}
//       />
//     </div>
//   );
// }

// export default function Admission() {
//   const sectionRef = useRef(null);
//   const [mode, setMode] = useState("online");
//   const [form, setForm] = useState(initialForm);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".admission-hero", {
//         y: 45,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.15,
//         ease: "power3.out",
//       });

//       gsap.from(".admission-card", {
//         y: 50,
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.15,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".admission-options",
//           start: "top 85%",
//         },
//       });

//       gsap.utils.toArray(".admission-reveal").forEach((item) => {
//         gsap.from(item, {
//           y: 35,
//           opacity: 0,
//           duration: 0.75,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: item,
//             start: "top 88%",
//           },
//         });
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   // Animate the selected admission panel when the user changes mode.
//   useEffect(() => {
//     const activePanel = document.querySelector(".admission-active-panel");

//     if (activePanel) {
//       gsap.fromTo(
//         activePanel,
//         { y: 18, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
//       );
//     }
//   }, [mode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const selectMode = (selectedMode, scrollToPanel = false) => {
//     setMode(selectedMode);
//     setSubmitted(false);

//     if (scrollToPanel) {
//       window.setTimeout(() => {
//         document.getElementById("admission-details")?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 80);
//     }
//   };

//   return (
//     <main ref={sectionRef} className="min-h-screen bg-[#F8FAFC]">
//       {/* HERO SECTION */}
//       <section className="relative overflow-hidden bg-[#102C50] px-5 pt-24 pb-12 text-white sm:px-10 lg:pt-32 lg:pb-16">
//         <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

//         <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
//           <div>
//             {/* <span className="admission-hero inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-amber-300">
//               <GraduationCap size={18} />
//               ADMISSIONS INFORMATION
//             </span> */}

//             <h1 className="admission-hero mt-7 text-4xl font-extrabold leading-tight  sm:text-5xl lg:text-6xl">
//               Your Future
//               <span className="block text-[#F2A900]">Starts Here.</span>
//             </h1>

//             <p className="admission-hero mt-6 max-w-lg text-base leading-8 text-blue-100 sm:text-lg">
//               Take the first step towards your dream career. Choose online
//               registration or visit our college campus for offline admission.
//             </p>

//             <div className="admission-hero mt-9 flex flex-wrap gap-4">
//               <button
//                 type="button"
//                 onClick={() => selectMode("online", true)}
//                 className="flex items-center gap-2 rounded-xl bg-[#F2A900] px-7 py-4 font-bold text-[#102C50] transition hover:-translate-y-1 hover:bg-amber-300"
//               >
//                 Apply Online <ArrowRight size={19} />
//               </button>

//               <button
//                 type="button"
//                 onClick={() => selectMode("offline", true)}
//                 className="rounded-xl border border-white/30 px-7 py-4 font-semibold transition hover:bg-white hover:text-[#102C50]"
//               >
//                 Offline Admission
//               </button>
//             </div>
//           </div>

//           <div className="admission-hero relative mx-auto w-full max-w-md">
//             <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-lg">
//               <div className="rounded-2xl bg-white p-8 text-[#102C50]">
//                 <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
//                   <GraduationCap size={35} />
//                 </div>
//                 <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
//                   Admission Portal
//                 </p>
//                 <h2 className="mt-3 text-3xl font-extrabold">
//                   Begin Your Journey
//                 </h2>
//                 <p className="mt-3 leading-7 text-slate-500">
//                   Choose the admission method that is convenient for you and
//                   follow the instructions provided by the college.
//                 </p>

//                 <div className="mt-8 space-y-4">
//                   {[
//                     "Online Registration",
//                     "Offline Campus Visit",
//                     "Document Verification",
//                   ].map((item) => (
//                     <div key={item} className="flex items-center gap-3">
//                       <CheckCircle2 className="text-green-600" size={21} />
//                       <span className="font-semibold">{item}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ADMISSION OPTIONS */}
//       <section
//         id="admission-options"
//         className="admission-options mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-10 lg:pt-12"
//       >
//         {/* <div className="admission-reveal mb-12 text-center">
//           <span className="font-bold uppercase tracking-widest text-blue-600">
//             Admission Process
//           </span>
//           <h2 className="mt-3 text-3xl font-extrabold text-[#102C50] sm:text-4xl">
//             Choose Your Admission Mode
//           </h2>
//           <p className="mx-auto mt-4 max-w-xl text-slate-500">
//             Select an option below to view the complete admission instructions.
//           </p>
//         </div> */}

//         <div className="grid gap-7 md:grid-cols-2">
//           <button
//             type="button"
//             onClick={() => selectMode("online", true)}
//             aria-pressed={mode === "online"}
//             className={`admission-card rounded-3xl border-2 bg-white p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
//               mode === "online"
//                 ? "border-blue-600 shadow-xl"
//                 : "border-slate-200"
//             }`}
//           >
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
//               <FileText size={32} />
//             </div>
//             <h3 className="mt-6 text-2xl font-bold text-[#102C50]">
//               Online Admission
//             </h3>
//             <p className="mt-3 leading-7 text-slate-500">
//               Fill out your application form digitally from anywhere and submit
//               your admission request.
//             </p>
//             <ul className="mt-6 space-y-3 text-sm text-slate-600">
//               <li>✓ Online registration form</li>
//               <li>✓ Personal and academic details</li>
//               <li>✓ Application submission</li>
//               <li>✓ Admission office follow-up</li>
//             </ul>
//             <span className="mt-8 flex items-center gap-2 font-bold text-blue-700">
//               Select Online <ArrowRight size={18} />
//             </span>
//           </button>

//           <button
//             type="button"
//             onClick={() => selectMode("offline", true)}
//             aria-pressed={mode === "offline"}
//             className={`admission-card rounded-3xl border-2 bg-white p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
//               mode === "offline"
//                 ? "border-amber-500 shadow-xl"
//                 : "border-slate-200"
//             }`}
//           >
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
//               <Building2 size={32} />
//             </div>
//             <h3 className="mt-6 text-2xl font-bold text-[#102C50]">
//               Offline Admission
//             </h3>
//             <p className="mt-3 leading-7 text-slate-500">
//               Visit the college admission office with the required documents
//               and complete the admission process in person.
//             </p>
//             <ul className="mt-6 space-y-3 text-sm text-slate-600">
//               <li>✓ Visit the college campus</li>
//               <li>✓ Collect and fill out the admission form</li>
//               <li>✓ Submit required documents</li>
//               <li>✓ Complete document verification</li>
//             </ul>
//             <span className="mt-8 flex items-center gap-2 font-bold text-amber-600">
//               Select Offline <ArrowRight size={18} />
//             </span>
//           </button>
//         </div>
//       </section>

//       {/* SELECTED ADMISSION DETAILS */}
//       <section
//         id="admission-details"
//         className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-10"
//       >
//         {mode === "online" ? (
//           <div className="admission-active-panel">
//             <div className="mb-9 text-center">
//               <span className="font-bold uppercase tracking-widest text-blue-600">
//                 Student Registration
//               </span>
//               <h2 className="mt-3 text-3xl font-extrabold text-[#102C50] sm:text-4xl">
//                 Online Admission Form
//               </h2>
//               <p className="mt-3 text-slate-500">
//                 Fill in the details carefully. Fields marked * are mandatory.
//               </p>
//             </div>

//             <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
//               <div className="flex flex-wrap items-center justify-between gap-4 bg-[#102C50] p-6 text-white sm:px-9">
//                 <div>
//                   <h3 className="text-xl font-bold">Application Details</h3>
//                   <p className="mt-1 text-sm text-blue-100">
//                     Academic Session • Admission Registration
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm">
//                   <ShieldCheck size={18} />
//                   Secure Form
//                 </div>
//               </div>

//               {submitted ? (
//                 <div className="p-10 text-center sm:p-16">
//                   <CheckCircle2
//                     className="mx-auto text-green-500"
//                     size={65}
//                   />
//                   <h3 className="mt-5 text-2xl font-bold text-[#102C50]">
//                     Form Validated Successfully!
//                   </h3>
//                   <p className="mt-3 text-slate-500">
//                     This is a frontend demo. Connect the backend to save the
//                     application and generate an official application number.
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setForm(initialForm);
//                       setSubmitted(false);
//                     }}
//                     className="mt-7 rounded-xl bg-blue-700 px-7 py-3 font-bold text-white transition hover:bg-blue-800"
//                   >
//                     Fill Another Form
//                   </button>
//                 </div>
//               ) : (
//                 <form
//                   onSubmit={handleSubmit}
//                   className="space-y-10 p-6 sm:p-9"
//                 >
//                   {/* PERSONAL DETAILS */}
//                   <div>
//                     <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#102C50]">
//                       <User className="text-blue-600" />
//                       Personal Information
//                     </h3>

//                     <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                       <InputField
//                         label="First Name"
//                         name="firstName"
//                         value={form.firstName}
//                         onChange={handleChange}
//                         required
//                       />
//                       <InputField
//                         label="Last Name"
//                         name="lastName"
//                         value={form.lastName}
//                         onChange={handleChange}
//                         required
//                       />
//                       <InputField
//                         label="Surname"
//                         name="surname"
//                         value={form.surname}
//                         onChange={handleChange}
//                       />
//                       <InputField
//                         label="Father's Name"
//                         name="fatherName"
//                         value={form.fatherName}
//                         onChange={handleChange}
//                         required
//                       />
//                       <InputField
//                         label="Mother's Name"
//                         name="motherName"
//                         value={form.motherName}
//                         onChange={handleChange}
//                       />
//                       <InputField
//                         label="Aadhaar Number"
//                         name="aadhaar"
//                         value={form.aadhaar}
//                         onChange={handleChange}
//                         required
//                         placeholder="12 digit Aadhaar number"
//                         maxLength={12}
//                       />
//                       <InputField
//                         label="Date of Birth"
//                         name="dob"
//                         value={form.dob}
//                         onChange={handleChange}
//                         type="date"
//                       />

//                       <div>
//                         <label className={labelClass} htmlFor="gender">
//                           Gender
//                         </label>
//                         <select
//                           id="gender"
//                           name="gender"
//                           value={form.gender}
//                           onChange={handleChange}
//                           className={inputClass}
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ADDRESS */}
//                   <div>
//                     <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#102C50]">
//                       <MapPin className="text-blue-600" />
//                       Address & Contact Details
//                     </h3>

//                     <div className="grid gap-5 sm:grid-cols-2">
//                       <InputField
//                         label="Mobile Number"
//                         name="mobile"
//                         value={form.mobile}
//                         onChange={handleChange}
//                         required
//                         placeholder="10 digit mobile number"
//                         maxLength={10}
//                       />
//                       <InputField
//                         label="Email Address"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         type="email"
//                       />

//                       <div className="sm:col-span-2">
//                         <label className={labelClass} htmlFor="address">
//                           Full Address <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           id="address"
//                           name="address"
//                           value={form.address}
//                           onChange={handleChange}
//                           required
//                           rows="3"
//                           placeholder="House number, street, village, locality..."
//                           className={inputClass}
//                         />
//                       </div>

//                       <InputField
//                         label="District"
//                         name="district"
//                         value={form.district}
//                         onChange={handleChange}
//                         required
//                       />
//                       <InputField
//                         label="State"
//                         name="state"
//                         value={form.state}
//                         onChange={handleChange}
//                         required
//                       />
//                       <InputField
//                         label="PIN Code"
//                         name="pin"
//                         value={form.pin}
//                         onChange={handleChange}
//                         required
//                         placeholder="6 digit PIN code"
//                         maxLength={6}
//                       />
//                     </div>
//                   </div>

//                   {/* ACADEMIC DETAILS */}
//                   <div>
//                     <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#102C50]">
//                       <BookOpen className="text-blue-600" />
//                       Academic Information
//                     </h3>

//                     <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                       <div className="sm:col-span-2 lg:col-span-3">
//                         <label className={labelClass} htmlFor="course">
//                           Select Course{" "}
//                           <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           id="course"
//                           name="course"
//                           value={form.course}
//                           onChange={handleChange}
//                           required
//                           className={inputClass}
//                         >
//                           <option value="">Choose Your Course</option>
//                           <option value="B.A.">B.A.</option>
//                           <option value="B.Sc.">B.Sc.</option>
//                           <option value="B.Com.">B.Com.</option>
//                           <option value="BCA">BCA</option>
//                           <option value="BBA">BBA</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>

//                       <InputField
//                         label="10th Passing Year"
//                         name="passingYear10"
//                         value={form.passingYear10}
//                         onChange={handleChange}
//                       />
//                       <InputField
//                         label="10th Percentage"
//                         name="percentage10"
//                         value={form.percentage10}
//                         onChange={handleChange}
//                       />
//                       <InputField
//                         label="12th Passing Year"
//                         name="passingYear12"
//                         value={form.passingYear12}
//                         onChange={handleChange}
//                       />
//                       <InputField
//                         label="12th Percentage"
//                         name="percentage12"
//                         value={form.percentage12}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>

//                   {/* DECLARATION */}
//                   <div className="rounded-2xl bg-blue-50 p-5">
//                     <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
//                       <input
//                         type="checkbox"
//                         required
//                         className="mt-1 h-4 w-4 accent-blue-700"
//                       />
//                       I declare that the information provided above is correct
//                       and complete to the best of my knowledge.
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#102C50] px-7 py-4 font-bold text-white transition hover:bg-blue-700 hover:shadow-lg sm:w-auto"
//                   >
//                     Submit Application <ArrowRight size={19} />
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         ) : (
//           /* OFFLINE ADMISSION PROCESS */
//           <div className="admission-active-panel">
//             <div className="mb-10 text-center">
//               <span className="font-bold uppercase tracking-widest text-amber-600">
//                 Offline Admission
//               </span>
//               <h2 className="mt-3 text-3xl font-extrabold text-[#102C50] sm:text-4xl">
//                 Visit Our College for Admission
//               </h2>
//               <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
//                 Students who wish to apply through the offline process should
//                 visit the college admission office before the start of the next
//                 academic session with the required documents.
//               </p>
//             </div>

//             <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
//               <div className="flex flex-wrap items-center justify-between gap-4 bg-[#102C50] p-6 text-white sm:px-9">
//                 <div>
//                   <h3 className="text-xl font-bold">Offline Admission Details</h3>
//                   <p className="mt-1 text-sm text-blue-100">
//                     Campus Visit • Document Verification
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm">
//                   <Building2 size={18} />
//                   Visit Required
//                 </div>
//               </div>
//               <div className="space-y-10 p-6 sm:p-9">
//             {/* IMPORTANT VISIT NOTICE */}
//             <div className="mb-8 overflow-hidden rounded-3xl bg-[#102C50] p-7 text-white shadow-xl sm:p-9">
//               <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
//                 <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F2A900] text-[#102C50]">
//                   <CalendarDays size={32} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
//                     Important Admission Information
//                   </p>
//                   <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
//                     Visit the College Before the Next Academic Session
//                   </h3>
//                   <p className="mt-3 max-w-3xl leading-7 text-blue-100">
//                     Please visit the college campus before the commencement of
//                     the next academic session. Contact the admission office to
//                     confirm the admission schedule, office timings and course
//                     availability before your visit.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* OFFLINE STEPS */}
//             <div className="mb-10">
//               <div className="mb-7 text-center">
//                 <h3 className="text-2xl font-extrabold text-[#102C50]">
//                   How to Complete Offline Admission
//                 </h3>
//                 <p className="mt-2 text-slate-500">
//                   Follow these simple steps to complete your admission.
//                 </p>
//               </div>

//               <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                 {[
//                   {
//                     number: "01",
//                     title: "Visit College",
//                     description:
//                       "Visit the college admission office before the next academic session.",
//                     icon: Building2,
//                   },
//                   {
//                     number: "02",
//                     title: "Collect Form",
//                     description:
//                       "Get the admission form from the college office and fill in your details.",
//                     icon: FileText,
//                   },
//                   {
//                     number: "03",
//                     title: "Submit Documents",
//                     description:
//                       "Submit the required documents and photocopies for verification.",
//                     icon: ClipboardCheck,
//                   },
//                   {
//                     number: "04",
//                     title: "Complete Admission",
//                     description:
//                       "Complete verification and follow the college instructions for confirmation.",
//                     icon: CheckCircle2,
//                   },
//                 ].map((step) => {
//                   const StepIcon = step.icon;

//                   return (
//                     <div
//                       key={step.number}
//                       className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
//                     >
//                       <div className="flex items-center justify-between">
//                         <span className="text-3xl font-extrabold text-amber-500">
//                           {step.number}
//                         </span>
//                         <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
//                           <StepIcon size={23} />
//                         </div>
//                       </div>
//                       <h4 className="mt-5 text-lg font-bold text-[#102C50]">
//                         {step.title}
//                       </h4>
//                       <p className="mt-2 text-sm leading-6 text-slate-500">
//                         {step.description}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* DOCUMENT CHECKLIST */}
//             <div className="grid gap-8 lg:grid-cols-5">
//               <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
//                 <div className="flex items-center gap-4">
//                   <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
//                     <FileCheck size={27} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-[#102C50]">
//                       Documents to Bring
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                       Keep these documents ready before visiting.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-7 space-y-4">
//                   {offlineDocuments.map((doc, index) => (
//                     <div
//                       key={doc.name}
//                       className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0"
//                     >
//                       <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
//                         {index + 1}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <p className="font-semibold text-slate-800">
//                           {doc.name}
//                         </p>
//                         <p className="mt-1 text-sm text-slate-500">
//                           {doc.note}
//                         </p>
//                       </div>
//                       <CheckCircle2
//                         className="mt-1 shrink-0 text-green-600"
//                         size={19}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
//                   <strong>Note:</strong> The final document requirements may
//                   vary according to the selected course and college rules.
//                   Please confirm the checklist with the admission office.
//                 </div>
//               </div>

//               {/* VISIT GUIDELINES */}
//               <div className="flex flex-col rounded-3xl bg-[#102C50] p-7 text-white sm:p-8 lg:col-span-2">
//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-[#102C50]">
//                   <Building2 size={29} />
//                 </div>

//                 <h3 className="mt-6 text-2xl font-bold">
//                   Before You Visit
//                 </h3>
//                 <p className="mt-3 leading-7 text-blue-100">
//                   To make your admission process smooth, please follow these
//                   instructions.
//                 </p>

//                 <div className="mt-7 space-y-5">
//                   <div className="flex gap-3">
//                     <IdCard className="shrink-0 text-amber-400" size={21} />
//                     <p className="text-sm leading-6 text-blue-100">
//                       Carry original documents along with self-attested
//                       photocopies.
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <Camera className="shrink-0 text-amber-400" size={21} />
//                     <p className="text-sm leading-6 text-blue-100">
//                       Carry 4–6 recent passport-size photographs.
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <Clock className="shrink-0 text-amber-400" size={21} />
//                     <p className="text-sm leading-6 text-blue-100">
//                       Confirm admission office timings before visiting.
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <ShieldCheck
//                       className="shrink-0 text-amber-400"
//                       size={21}
//                     />
//                     <p className="text-sm leading-6 text-blue-100">
//                       Ask the admission office about course eligibility, fees
//                       and the last date.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-auto pt-8">
//                   <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
//                     <p className="font-bold text-amber-300">
//                       Important Reminder
//                     </p>
//                     <p className="mt-2 text-sm leading-6 text-blue-100">
//                       Admission will be subject to document verification,
//                       eligibility criteria and the college's official admission
//                       schedule.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
//               <p className="font-semibold text-[#102C50]">
//                 Need help with admission?
//               </p>
//               <p className="mt-1 text-sm leading-6 text-slate-600">
//                 Contact the college admission office for the exact visit date,
//                 office hours, available courses and fee details.
//               </p>
//             </div> */}
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }




import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  FileText,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Clock,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Camera,
  IdCard,
  FileCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// OFFLINE ADMISSION DOCUMENTS
// ==========================================

const offlineDocuments = [
  {
    name: "10th Marksheet & Certificate",
    note: "For academic verification",
  },
  {
    name: "12th Marksheet & Certificate",
    note: "For applicable courses",
  },
  {
    name: "Aadhaar Card",
    note: "Bring original and photocopy",
  },
  {
    name: "Passport-size Photographs",
    note: "Carry 4–6 recent photographs",
  },
  {
    name: "Transfer Certificate (TC)",
    note: "From the previous institution",
  },
  {
    name: "Character Certificate",
    note: "From the previous institution",
  },
  {
    name: "Migration Certificate",
    note: "If applicable",
  },
  {
    name: "Caste / EWS Certificate",
    note: "If applicable",
  },
  {
    name: "PAN Card",
    note: "Only if requested by the college",
  },
  {
    name: "Graduation Marksheet",
    note: "For postgraduate admission, if applicable",
  },
];

// ==========================================
// OFFLINE ADMISSION STEPS
// ==========================================

const offlineSteps = [
  {
    number: "01",
    title: "Visit College",
    description:
      "Visit the college admission office before the next academic session.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Collect Form",
    description:
      "Get the admission form from the college office and fill in your details.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Submit Documents",
    description:
      "Submit the required documents and photocopies for verification.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Complete Admission",
    description:
      "Complete verification and follow the college instructions for confirmation.",
    icon: CheckCircle2,
  },
];

// ==========================================
// INITIAL FORM DATA
// ==========================================

const initialForm = {
  firstName: "",
  lastName: "",
  surname: "",
  fatherName: "",
  motherName: "",
  aadhaar: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  address: "",
  district: "",
  state: "",
  pin: "",
  course: "",
  passingYear10: "",
  percentage10: "",
  passingYear12: "",
  percentage12: "",
};

// ==========================================
// COMMON STYLES
// ==========================================

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

// ==========================================
// REUSABLE INPUT COMPONENT
// ==========================================

function InputField({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
  maxLength,
  inputMode,
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass} htmlFor={name}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        inputMode={inputMode}
        placeholder={placeholder || `Enter ${label}`}
        className={inputClass}
      />
    </div>
  );
}

// ==========================================
// REUSABLE SECTION HEADING
// ==========================================

function FormSectionHeading({ icon: Icon, children }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-[#102C50]">
      <Icon className="shrink-0 text-blue-600" size={24} />
      {children}
    </h3>
  );
}

// ==========================================
// ONLINE ADMISSION FORM
// ==========================================

function OnlineAdmission({
  form,
  handleChange,
  submitted,
  resetForm,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    resetForm(true);
  };

  return (
    <div className="admission-active-panel min-w-0">
      <div className="mb-9 text-center">
        <span className="font-bold uppercase tracking-widest text-blue-600">
          Student Registration
        </span>

        <h2 className="mt-3 text-3xl font-extrabold text-[#102C50] sm:text-4xl">
          Online Admission Form
        </h2>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          Fill in the details carefully. Fields marked * are mandatory.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        {/* FORM HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#102C50] p-5 text-white sm:px-9 sm:py-6">
          <div>
            <h3 className="text-xl font-bold">
              Application Details
            </h3>

            <p className="mt-1 text-sm text-blue-100">
              Academic Session • Admission Registration
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck size={18} />
            Secure Form
          </div>
        </div>

        {/* SUCCESS MESSAGE */}

        {submitted ? (
          <div className="p-8 text-center sm:p-16">
            <CheckCircle2
              className="mx-auto text-green-500"
              size={65}
            />

            <h3 className="mt-5 text-2xl font-bold text-[#102C50]">
              Form Validated Successfully!
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              This is currently a frontend demo. Connect the backend
              to save applications in MongoDB and generate an official
              application number.
            </p>

            <button
              type="button"
              onClick={() => resetForm(false)}
              className="mt-7 rounded-xl bg-blue-700 px-7 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              Fill Another Form
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-10 p-5 sm:p-9"
          >
            {/* PERSONAL INFORMATION */}

            <div>
              <FormSectionHeading icon={User}>
                Personal Information
              </FormSectionHeading>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Surname"
                  name="surname"
                  value={form.surname}
                  onChange={handleChange}
                />

                <InputField
                  label="Father's Name"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Mother's Name"
                  name="motherName"
                  value={form.motherName}
                  onChange={handleChange}
                />

                <InputField
                  label="Aadhaar Number"
                  name="aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange}
                  required
                  maxLength={12}
                  inputMode="numeric"
                  placeholder="12 digit Aadhaar number"
                />

                <InputField
                  label="Date of Birth"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  type="date"
                />

                <div>
                  <label className={labelClass} htmlFor="gender">
                    Gender
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ADDRESS AND CONTACT */}

            <div>
              <FormSectionHeading icon={MapPin}>
                Address & Contact Details
              </FormSectionHeading>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField
                  label="Mobile Number"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="10 digit mobile number"
                />

                <InputField
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                />

                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="address">
                    Full Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="House number, street, village, locality..."
                    className={inputClass}
                  />
                </div>

                <InputField
                  label="District"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="PIN Code"
                  name="pin"
                  value={form.pin}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  inputMode="numeric"
                  placeholder="6 digit PIN code"
                />
              </div>
            </div>

            {/* ACADEMIC INFORMATION */}

            <div>
              <FormSectionHeading icon={BookOpen}>
                Academic Information
              </FormSectionHeading>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className={labelClass} htmlFor="course">
                    Select Course
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <select
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Choose Your Course</option>
                    <option value="B.A.">B.A.</option>
                    <option value="B.Sc.">B.Sc.</option>
                    <option value="B.Com.">B.Com.</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <InputField
                  label="10th Passing Year"
                  name="passingYear10"
                  value={form.passingYear10}
                  onChange={handleChange}
                  inputMode="numeric"
                />

                <InputField
                  label="10th Percentage"
                  name="percentage10"
                  value={form.percentage10}
                  onChange={handleChange}
                  inputMode="decimal"
                />

                <InputField
                  label="12th Passing Year"
                  name="passingYear12"
                  value={form.passingYear12}
                  onChange={handleChange}
                  inputMode="numeric"
                />

                <InputField
                  label="12th Percentage"
                  name="percentage12"
                  value={form.percentage12}
                  onChange={handleChange}
                  inputMode="decimal"
                />
              </div>
            </div>

            {/* DECLARATION */}

            <div className="rounded-2xl bg-blue-50 p-5">
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                />

                <span>
                  I declare that the information provided above is
                  correct and complete to the best of my knowledge.
                </span>
              </label>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#102C50] px-7 py-4 font-bold text-white transition hover:bg-blue-700 hover:shadow-lg sm:w-auto"
            >
              Submit Application
              <ArrowRight size={19} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// OFFLINE ADMISSION COMPONENT
// ==========================================

function OfflineAdmission() {
  return (
    <div className="admission-active-panel min-w-0">
      {/* PAGE HEADING */}

      <div className="mb-10 text-center">
        <span className="font-bold uppercase tracking-widest text-amber-600">
          Offline Admission
        </span>

        <h2 className="mt-3 text-3xl font-extrabold text-[#102C50] sm:text-4xl">
          Visit Our College for Admission
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Students who wish to apply through the offline process
          should visit the college admission office before the start
          of the next academic session with the required documents.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        {/* HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#102C50] p-5 text-white sm:px-9 sm:py-6">
          <div>
            <h3 className="text-xl font-bold">
              Offline Admission Details
            </h3>

            <p className="mt-1 text-sm text-blue-100">
              Campus Visit • Document Verification
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm">
            <Building2 size={18} />
            Visit Required
          </div>
        </div>

        <div className="space-y-10 p-5 sm:p-9">
          {/* IMPORTANT NOTICE */}

          <div className="overflow-hidden rounded-3xl bg-[#102C50] p-6 text-white shadow-xl sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F2A900] text-[#102C50]">
                <CalendarDays size={32} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
                  Important Admission Information
                </p>

                <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Visit the College Before the Next Academic Session
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
                  Please visit the college campus before the
                  commencement of the next academic session. Contact
                  the admission office to confirm the admission
                  schedule, office timings and course availability
                  before your visit.
                </p>
              </div>
            </div>
          </div>

          {/* ADMISSION STEPS */}

          <div>
            <div className="mb-7 text-center">
              <h3 className="text-2xl font-extrabold text-[#102C50]">
                How to Complete Offline Admission
              </h3>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Follow these simple steps to complete your admission.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {offlineSteps.map((step) => {
                const StepIcon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-amber-500">
                        {step.number}
                      </span>

                      <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                        <StepIcon size={23} />
                      </div>
                    </div>

                    <h4 className="mt-5 text-lg font-bold text-[#102C50]">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DOCUMENTS AND VISIT GUIDELINES */}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* DOCUMENT CHECKLIST */}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:col-span-3">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                  <FileCheck size={27} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#102C50]">
                    Documents to Bring
                  </h3>

                  <p className="text-sm text-slate-500">
                    Keep these documents ready before visiting.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {offlineDocuments.map((doc, index) => (
                  <div
                    key={doc.name}
                    className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800">
                        {doc.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {doc.note}
                      </p>
                    </div>

                    <CheckCircle2
                      className="mt-1 shrink-0 text-green-600"
                      size={19}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <strong>Note:</strong> The final document requirements
                may vary according to the selected course and college
                rules. Please confirm the checklist with the admission
                office.
              </div>
            </div>

            {/* VISIT GUIDELINES */}

            <div className="flex flex-col rounded-3xl bg-[#102C50] p-6 text-white sm:p-8 lg:col-span-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-[#102C50]">
                <Building2 size={29} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Before You Visit
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100 sm:text-base">
                To make your admission process smooth, please follow
                these instructions.
              </p>

              <div className="mt-7 space-y-5">
                <div className="flex gap-3">
                  <IdCard
                    className="shrink-0 text-amber-400"
                    size={21}
                  />

                  <p className="text-sm leading-6 text-blue-100">
                    Carry original documents along with self-attested
                    photocopies.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Camera
                    className="shrink-0 text-amber-400"
                    size={21}
                  />

                  <p className="text-sm leading-6 text-blue-100">
                    Carry 4–6 recent passport-size photographs.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Clock
                    className="shrink-0 text-amber-400"
                    size={21}
                  />

                  <p className="text-sm leading-6 text-blue-100">
                    Confirm admission office timings before visiting.
                  </p>
                </div>

                <div className="flex gap-3">
                  <ShieldCheck
                    className="shrink-0 text-amber-400"
                    size={21}
                  />

                  <p className="text-sm leading-6 text-blue-100">
                    Ask the admission office about course eligibility,
                    fees and the last date.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
                  <p className="font-bold text-amber-300">
                    Important Reminder
                  </p>

                  <p className="mt-2 text-sm leading-6 text-blue-100">
                    Admission will be subject to document verification,
                    eligibility criteria and the college's official
                    admission schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN ADMISSION PAGE
// ==========================================

export default function Admission() {
  const sectionRef = useRef(null);

  const [mode, setMode] = useState("online");
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  // ----------------------------------------
  // GSAP ANIMATIONS
  // ----------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation

      gsap.fromTo(
        ".admission-hero",
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Admission cards animation
      // Cards remain visible even before ScrollTrigger starts.

      gsap.from(".admission-card", {
        y: 25,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".admission-options",
          start: "top 95%",
          once: true,
        },
      });
    }, sectionRef);

    // Refresh ScrollTrigger after initial render.

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  // ----------------------------------------
  // ACTIVE PANEL ANIMATION
  // ----------------------------------------

  useEffect(() => {
    const activePanel =
      sectionRef.current?.querySelector(".admission-active-panel");

    if (activePanel) {
      gsap.fromTo(
        activePanel,
        {
          y: 14,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );
    }

    // Update scroll positions after switching panels.

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [mode]);

  // ----------------------------------------
  // FORM CHANGE HANDLER
  // ----------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // ----------------------------------------
  // RESET FORM
  // ----------------------------------------

  const resetForm = (isSubmitted = false) => {
    if (!isSubmitted) {
      setForm(initialForm);
    }

    setSubmitted(isSubmitted);
  };

  // ----------------------------------------
  // ONLINE / OFFLINE MODE SELECTOR
  // ----------------------------------------

  const selectMode = (selectedMode, scrollToPanel = false) => {
    setMode(selectedMode);
    setSubmitted(false);

    if (scrollToPanel) {
      requestAnimationFrame(() => {
        document.getElementById("admission-details")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <main
      ref={sectionRef}
      className="min-h-screen w-full overflow-x-clip bg-[#F8FAFC] font-[inherit]"
    >
      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section className="relative overflow-hidden bg-[#102C50] px-5 pb-0 pt-20 text-white sm:px-10 sm:pb-12 sm:pt-28 lg:pt-32">
        {/* BACKGROUND EFFECTS */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT CONTENT */}

          <div className="min-w-0">
            <h1 className="admission-hero mt-2 text-4xl font-extrabold leading-tight sm:mt-7 sm:text-5xl lg:text-6xl">
              Your Future
              <span className="block text-[#F2A900]">
                Starts Here.
              </span>
            </h1>

            <p className="admission-hero mt-5 max-w-lg text-sm leading-7 text-blue-100 sm:mt-6 sm:text-lg sm:leading-8">
              Take the first step towards your dream career. Choose
              online registration or visit our college campus for
              offline admission.
            </p>

            {/* HERO BUTTONS */}

            <div className="admission-hero mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
              <button
                type="button"
                onClick={() => selectMode("online", true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2A900] px-6 py-3.5 font-bold text-[#102C50] transition hover:-translate-y-1 hover:bg-amber-300 sm:w-auto sm:px-7 sm:py-4"
              >
                Apply Online
                <ArrowRight size={19} />
              </button>

              <button
                type="button"
                onClick={() => selectMode("offline", true)}
                className="w-full rounded-xl border border-white/30 px-6 py-3.5 font-semibold transition hover:bg-white hover:text-[#102C50] sm:w-auto sm:px-7 sm:py-4"
              >
                Offline Admission
              </button>
            </div>
          </div>

          {/* RIGHT ADMISSION CARD */}

          <div className="admission-hero relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-lg sm:p-4">
              <div className="rounded-2xl bg-white p-6 text-[#102C50] sm:p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <GraduationCap size={35} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  Admission Portal
                </p>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Begin Your Journey
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                  Choose the admission method that is convenient for
                  you and follow the instructions provided by the
                  college.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Online Registration",
                    "Offline Campus Visit",
                    "Document Verification",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2
                        className="shrink-0 text-green-600"
                        size={21}
                      />

                      <span className="text-sm font-semibold sm:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          ADMISSION OPTIONS
      ====================================== */}

      <section
        id="admission-options"
        className="admission-options mx-auto max-w-7xl px-5 pb-12 pt-0 sm:px-10 sm:pb-20 sm:pt-10"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
          {/* ONLINE CARD */}

          <button
            type="button"
            onClick={() => selectMode("online", true)}
            aria-pressed={mode === "online"}
            className={`admission-card w-full rounded-3xl border-2 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8 ${
              mode === "online"
                ? "border-blue-600 shadow-xl"
                : "border-slate-200"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <FileText size={32} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#102C50]">
              Online Admission
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              Fill out your application form digitally from anywhere
              and submit your admission request.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✓ Online registration form</li>
              <li>✓ Personal and academic details</li>
              <li>✓ Application submission</li>
              <li>✓ Admission office follow-up</li>
            </ul>

            <span className="mt-8 flex items-center gap-2 font-bold text-blue-700">
              Select Online
              <ArrowRight size={18} />
            </span>
          </button>

          {/* OFFLINE CARD */}

          <button
            type="button"
            onClick={() => selectMode("offline", true)}
            aria-pressed={mode === "offline"}
            className={`admission-card w-full rounded-3xl border-2 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8 ${
              mode === "offline"
                ? "border-amber-500 shadow-xl"
                : "border-slate-200"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Building2 size={32} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#102C50]">
              Offline Admission
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              Visit the college admission office with the required
              documents and complete the admission process in person.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✓ Visit the college campus</li>
              <li>✓ Collect and fill out the admission form</li>
              <li>✓ Submit required documents</li>
              <li>✓ Complete document verification</li>
            </ul>

            <span className="mt-8 flex items-center gap-2 font-bold text-amber-600">
              Select Offline
              <ArrowRight size={18} />
            </span>
          </button>
        </div>
      </section>

      {/* =====================================
          SELECTED ADMISSION DETAILS
      ====================================== */}

      <section
        id="admission-details"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-16 sm:px-10 sm:pb-20"
      >
        {/* DIRECT MODE SWITCHER */}

        <div className="mb-8 flex justify-center">
          <div className="flex w-full max-w-md rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => selectMode("online")}
              aria-pressed={mode === "online"}
              className={`flex-1 rounded-lg px-3 py-3 text-sm font-bold transition ${
                mode === "online"
                  ? "bg-[#102C50] text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Online Admission
            </button>

            <button
              type="button"
              onClick={() => selectMode("offline")}
              aria-pressed={mode === "offline"}
              className={`flex-1 rounded-lg px-3 py-3 text-sm font-bold transition ${
                mode === "offline"
                  ? "bg-[#F2A900] text-[#102C50] shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Offline Admission
            </button>
          </div>
        </div>

        {/* CONDITIONAL CONTENT */}

        {mode === "online" ? (
          <OnlineAdmission
            form={form}
            handleChange={handleChange}
            submitted={submitted}
            resetForm={resetForm}
          />
        ) : (
          <OfflineAdmission />
        )}
      </section>
    </main>
  );
}

