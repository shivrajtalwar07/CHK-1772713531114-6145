import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/login",{
      email:email,
      password:password
    }).then((res)=>{
      toast.success("Login successful");
      navigate("/dashboard");
    }).catch((err)=>{
      toast.error("Invalid credentials");
    })
  }

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex w-1/2 bg-[#1E3A8A] text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">DataPortal </h1>
        <p className="text-lg text-blue-100">
        A web platform that allows users to explore and visualize public datasets using interactive charts, filters, and dashboards.        </p>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-[#E5E7EB]">

          <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-[#64748B] mb-6">
            Login to Continue to DataPortal
          </p>

          {/* EMAIL */}
          <form onSubmit={(e)=>handleLogin(e)}>
          <div className="mb-4">
            <label className="text-sm text-[#0F172A]">Email</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <Mail size={18} className="text-[#64748B]" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-2 py-2 outline-none"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-sm text-[#0F172A]">Password</label>
            <div className="flex items-center border rounded-lg px-3 mt-1">
              <Lock size={18} className="text-[#64748B]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-2 py-2 outline-none"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-2 rounded-lg transition">
            Sign in
          </button>
          </form>
          {/* FOOTER */}
          <p className="text-sm text-center text-[#64748B] mt-6">
            Don’t have an account?{" "}
            <span className="text-[#22C55E] cursor-pointer font-medium">
              <Link to="/register">Sign up</Link>
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
