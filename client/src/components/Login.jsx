import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password
      });
      toast.success("Welcome back! Login successful");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex w-1/2 bg-[#1E3A8A] text-white flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -ml-32 -mb-32"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20">
              <div className="w-5 h-5 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight">DataPortal</span>
          </div>

          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Comprehensive <br />
            <span className="text-blue-400">Public Datasets.</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-lg leading-relaxed">
            Explore, analyze, and download India's most detailed public datasets through interactive visualizations and powerful tools.
          </p>

        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E5E7EB] fade-up">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
              Welcome back
            </h2>
            <p className="text-[#64748B]">
              Login to continue to your DataPortal account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-[#334155] mb-1.5 block">Email Address</label>
              <div className="group flex items-center border border-[#E2E8F0] rounded-2xl px-4 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                <Mail size={18} className="text-[#94A3B8] group-focus-within:text-blue-500" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-3 py-3.5 outline-none bg-transparent placeholder:text-[#94A3B8] text-[#1E293B]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-[#334155]">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot password?</Link>
              </div>
              <div className="group flex items-center border border-[#E2E8F0] rounded-2xl px-4 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                <Lock size={18} className="text-[#94A3B8] group-focus-within:text-blue-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3 py-3.5 outline-none bg-transparent placeholder:text-[#94A3B8] text-[#1E293B]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={isLoading}
              className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
              {isLoading ? "Signing in..." : (
                <>
                  Sign in
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 text-center">
            <p className="text-[#64748B] text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold ml-1 transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

