import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentSocialLogin from "../component/auth/StudentSocialLogin";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,

  ShieldCheck,
  CheckCircle2,
} from "lucide-react";






















export default function StudentLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


const [email, setEmail] = useState("");
const [password, setPassword] = useState(""); 
const navigate = useNavigate();




// teeno backend ka setup hai
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Connect your backend login API here.
    console.log("Student login:", {
      email: formData.email,
      rememberMe,
    });

    setError("Backend authentication is not connected yet.");
  };

  const handleSocialLogin = (provider) => {
    setError(`${provider} authentication is not configured yet.`);
  };


  // Backend setup code recomendent from AI
const handleStudentLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/student/auth/login`,
      {
        email,
        password,
      }
    );

    const { token, student } = response.data;

    // JWT token save karein
    sessionStorage.setItem("studentToken", token);

    console.log("Student Login:", student);

    // Dashboard par redirect
    navigate("/student/dashboard");

  } catch (error) {
    console.error(
      error.response?.data?.message ||
      "Student login failed"
    );
  }
};

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto grid min-h-170 max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#102C50] p-10 text-white lg:flex xl:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#102C50]">
              <GraduationCap size={28} />
            </div>
            <div>
              <h2 className="font-bold">Gayatri Shiksha Niketan</h2>
              <p className="text-xs text-blue-200">Student Portal</p>
            </div>
          </div>

          <div className="relative z-10 my-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs">
              <ShieldCheck size={15} />
              Secure Student Access
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight xl:text-5xl">
              Your Learning Journey
              <span className="mt-2 block text-cyan-300">
                Starts Here.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-blue-100">
              Access your academic dashboard, attendance,
              assignments, examination results and school updates
              from one place.
            </p>

            <div className="mt-9 space-y-5">
              {[
                "Access your academic information",
                "Track attendance and examination results",
                "Stay updated with school announcements",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="shrink-0 text-cyan-300" size={19} />
                  <span className="text-sm text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/15 pt-6 text-xs text-blue-200">
            © {new Date().getFullYear()} Gayatri Shiksha Niketan
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#102C50] text-white">
                <GraduationCap size={27} />
              </div>
              <div>
                <h2 className="font-bold text-[#102C50]">
                  Gayatri Shiksha Niketan
                </h2>
                <p className="text-xs text-slate-500">Student Portal</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Welcome Back
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Student Login
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your registered credentials to access your
                student account.
              </p>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50"
              >
                <span className="text-lg font-bold text-blue-600">G</span>
                Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50"
              >
                <span className="text-lg font-bold text-blue-600">f</span>
                Facebook
              </button>
            </div>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleStudentLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="student-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="student-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="student-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="student-password"
                    type={password}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    minLength={8}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>
                <span className="text-xs text-slate-400">
                  Secure Login
                </span>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#102C50] px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-800"
              >
                Login to Student Portal
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have a student account?{" "}
              <a
                href="/contact"
                className="font-bold text-blue-600 hover:text-blue-800"
              >
                Contact School
              </a>
            </p>

            <div className="mt-9 border-t border-slate-100 pt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} />
                Your information is protected
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-slate-500">
                <a href="/privacy-policy" className="hover:text-blue-600">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
                <a href="/contact" className="hover:text-blue-600">
                  Help & Support
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
    
  );
}









// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import StudentSocialLogin from "../component/auth/StudentSocialLogin";

// // import {
// //   GraduationCap,
// //   Mail,
// //   Lock,
// //   Eye,
// //   EyeOff,
// //   ArrowRight,
// //   ShieldCheck,
// //   CheckCircle2,
// // } from "lucide-react";

// // export default function StudentLogin() {
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // Student login API
// //   const handleStudentLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!email.trim() || !password) {
// //       setError("Please enter your email and password.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const response = await axios.post(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/student/auth/login`,
// //         {
// //           email: email.trim(),
// //           password,
// //         }
// //       );

// //       const { token } = response.data;

// //       sessionStorage.setItem("studentToken", token);

// //       navigate("/student/dashboard");

// //     } catch (error) {
// //       setError(
// //         error.response?.data?.message ||
// //         "Login failed. Please check your credentials."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">

// //       <div className="mx-auto grid min-h-170 max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

// //         {/* LEFT PANEL */}

// //         <div className="relative hidden flex-col justify-between overflow-hidden bg-[#102C50] p-10 text-white lg:flex xl:p-14">

// //           <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

// //           <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-white/10" />

// //           <div className="relative z-10 flex items-center gap-3">

// //             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#102C50]">
// //               <GraduationCap size={28} />
// //             </div>

// //             <div>
// //               <h2 className="font-bold">
// //                 Gayatri Shiksha Niketan
// //               </h2>

// //               <p className="text-xs text-blue-200">
// //                 Student Portal
// //               </p>
// //             </div>

// //           </div>

// //           <div className="relative z-10 my-10">

// //             <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs">
// //               <ShieldCheck size={15} />
// //               Secure Student Access
// //             </span>

// //             <h1 className="mt-6 text-4xl font-bold leading-tight xl:text-5xl">
// //               Your Learning Journey

// //               <span className="mt-2 block text-cyan-300">
// //                 Starts Here.
// //               </span>
// //             </h1>

// //             <p className="mt-6 max-w-md text-sm leading-7 text-blue-100">
// //               Access your academic dashboard, attendance,
// //               assignments, examination results and school updates
// //               from one place.
// //             </p>

// //             <div className="mt-9 space-y-5">

// //               {[
// //                 "Access your academic information",
// //                 "Track attendance and examination results",
// //                 "Stay updated with school announcements",
// //               ].map((item) => (

// //                 <div key={item} className="flex items-center gap-3">
// //                   <CheckCircle2
// //                     className="shrink-0 text-cyan-300"
// //                     size={19}
// //                   />

// //                   <span className="text-sm text-blue-50">
// //                     {item}
// //                   </span>
// //                 </div>

// //               ))}

// //             </div>

// //           </div>

// //           <div className="relative z-10 border-t border-white/15 pt-6 text-xs text-blue-200">
// //             © {new Date().getFullYear()} Gayatri Shiksha Niketan
// //           </div>

// //         </div>

// //         {/* RIGHT PANEL */}

// //         <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

// //           <div className="w-full max-w-md">

// //             {/* MOBILE LOGO */}

// //             <div className="mb-8 flex items-center gap-3 lg:hidden">

// //               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#102C50] text-white">
// //                 <GraduationCap size={27} />
// //               </div>

// //               <div>
// //                 <h2 className="font-bold text-[#102C50]">
// //                   Gayatri Shiksha Niketan
// //                 </h2>

// //                 <p className="text-xs text-slate-500">
// //                   Student Portal
// //                 </p>
// //               </div>

// //             </div>

// //             {/* LOGIN HEADING */}

// //             <div className="mb-8">

// //               <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
// //                 Welcome Back
// //               </p>

// //               <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
// //                 Student Login
// //               </h2>

// //               <p className="mt-3 text-sm leading-6 text-slate-500">
// //                 Enter your registered credentials to access your
// //                 student account.
// //               </p>

// //             </div>

// //             {/* SOCIAL LOGIN - GOOGLE + FACEBOOK */}

// //             <div className="grid grid-cols-2 items-center gap-3">

// //               {/* GOOGLE LOGIN */}

// //               <div className="min-w-0">
                
// //               </div>

// //               {/* FACEBOOK LOGIN */}

// //               <button
// //                 type="button"
// //                 className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50"
// //                 onClick={() =>
// //                   setError("Facebook authentication is not configured yet.")
// //                 }
// //               >
// //                 <span className="text-lg font-bold text-blue-600">
// //                   f
// //                 </span>

// //                 Facebook
// //               </button>

// //             </div>

// //             {/* DIVIDER */}

// //             <div className="my-7 flex items-center gap-4">

// //               <div className="h-px flex-1 bg-slate-200" />

// //               <span className="text-xs text-slate-400">
// //                 OR CONTINUE WITH EMAIL
// //               </span>

// //               <div className="h-px flex-1 bg-slate-200" />

// //             </div>

// //             {/* LOGIN FORM */}

// //             <form
// //               onSubmit={handleStudentLogin}
// //               className="space-y-5"
// //             >

// //               {/* EMAIL */}

// //               <div>

// //                 <label
// //                   htmlFor="student-email"
// //                   className="mb-2 block text-sm font-semibold text-slate-700"
// //                 >
// //                   Email Address <span className="text-red-500">*</span>
// //                 </label>

// //                 <div className="relative">

// //                   <Mail
// //                     size={19}
// //                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
// //                   />

// //                   <input
// //                     id="student-email"
// //                     type="email"
// //                     name="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                     placeholder="Enter your registered email"
// //                     autoComplete="email"
// //                     className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
// //                   />

// //                 </div>

// //               </div>

// //               {/* PASSWORD */}

// //               <div>

// //                 <div className="mb-2 flex items-center justify-between">

// //                   <label
// //                     htmlFor="student-password"
// //                     className="text-sm font-semibold text-slate-700"
// //                   >
// //                     Password <span className="text-red-500">*</span>
// //                   </label>

// //                   <a
// //                     href="/forgot-password"
// //                     className="text-xs font-semibold text-blue-600 hover:text-blue-800"
// //                   >
// //                     Forgot Password?
// //                   </a>

// //                 </div>

// //                 <div className="relative">

// //                   <Lock
// //                     size={19}
// //                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
// //                   />

// //                   <input
// //                     id="student-password"
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                     placeholder="Enter your password"
// //                     autoComplete="current-password"
// //                     className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
// //                   />

// //                   {/* SHOW / HIDE PASSWORD */}

// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     aria-label={showPassword ? "Hide password" : "Show password"}
// //                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
// //                   >
// //                     {showPassword ? (
// //                       <EyeOff size={19} />
// //                     ) : (
// //                       <Eye size={19} />
// //                     )}
// //                   </button>

// //                 </div>

// //               </div>

// //               {/* ERROR MESSAGE */}

// //               {error && (
// //                 <div
// //                   role="alert"
// //                   className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
// //                 >
// //                   {error}
// //                 </div>
// //               )}

// //               {/* LOGIN BUTTON */}

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#102C50] px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
// //               >
// //                 {loading ? "Logging in..." : "Login to Student Portal"}

// //                 {!loading && (
// //                   <ArrowRight
// //                     size={18}
// //                     className="transition group-hover:translate-x-1"
// //                   />
// //                 )}
// //               </button>

// //             </form>

// //             {/* CONTACT SCHOOL */}

// //             <p className="mt-7 text-center text-sm text-slate-500">
// //               Don't have a student account?{" "}

// //               <a
// //                 href="/contact"
// //                 className="font-bold text-blue-600 hover:text-blue-800"
// //               >
// //                 Contact School
// //               </a>
// //             </p>

// //             {/* FOOTER */}

// //             <div className="mt-9 border-t border-slate-100 pt-6 text-center">

// //               <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
// //                 <ShieldCheck size={15} />
// //                 Your information is protected
// //               </div>

// //               <div className="mt-4 flex flex-wrap justify-center gap-5 text-xs text-slate-500">

// //                 <a href="/privacy-policy" className="hover:text-blue-600">
// //                   Privacy Policy
// //                 </a>

// //                 <a href="/terms" className="hover:text-blue-600">
// //                   Terms & Conditions
// //                 </a>

// //                 <a href="/contact" className="hover:text-blue-600">
// //                   Help & Support
// //                 </a>

// //               </div>

// //             </div>

// //           </div>

// //         </div>

// //       </div>

// //     </section>
// //   );
// // }
