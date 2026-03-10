import { Mail, Lock, User } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
const navigate = useNavigate();
const [error , setError] = useState("");


  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      toast.error(error);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error(error);
      return;
    }

    // register user
    if(error === ""){
      axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Registration successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed");
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex w-1/2 bg-[#1E3A8A] text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">DataPortal</h1>
        <p className="text-lg text-blue-100">
          A platform to visualize and explore public data through interactive charts.
        </p>
      </div>

      {/* RIGHT REGISTER SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-[#E5E7EB]">

          <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
            Create an account
          </h2>
          <p className="text-sm text-[#64748B] mb-6">
            Start managing your DataPortal
          </p>

          <form onSubmit={handleRegister}>
            {/* FULL NAME */}
            <div className="mb-4">
              <label className="text-sm text-[#0F172A]">Full Name</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <User size={18} className="text-[#64748B]" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-2 py-2 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-sm text-[#0F172A]">Email</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <Mail size={18} className="text-[#64748B]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-2 py-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="text-sm text-[#0F172A]">Password</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <Lock size={18} className="text-[#64748B]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-2 py-2 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-6">
              <label className="text-sm text-[#0F172A]">Confirm Password</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <Lock size={18} className="text-[#64748B]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-2 py-2 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-2 rounded-lg transition">
              Create account
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-center text-[#64748B] mt-6">
            Already have an account?{" "}
            <span className="text-[#22C55E] cursor-pointer font-medium">
              <Link to="/">Sign in</Link>
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
