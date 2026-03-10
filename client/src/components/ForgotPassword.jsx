import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setIsLoading(true);
        try {
            await axios.post("http://localhost:3000/api/auth/reset-password", {
                email: email,
                password: password
            });
            toast.success("Password reset successful! You can now login with your new password.");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
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
                        Reset Your <br />
                        <span className="text-blue-400">Password.</span>
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-lg leading-relaxed">
                        Lost your access? No worries. Provide your email and set a new password to get back to your dashboard in seconds.
                    </p>

                </div>
            </div>

            {/* RIGHT RESET SECTION */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E5E7EB] fade-up">
                    <div className="mb-10 text-center md:text-left">
                        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:text-blue-700 transition-colors">
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
                            Reset Password
                        </h2>
                        <p className="text-[#64748B]">
                            Enter your email and a new password below
                        </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-6">
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

                        {/* NEW PASSWORD */}
                        <div>
                            <label className="text-sm font-semibold text-[#334155] mb-1.5 block">New Password</label>
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

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <label className="text-sm font-semibold text-[#334155] mb-1.5 block">Confirm New Password</label>
                            <div className="group flex items-center border border-[#E2E8F0] rounded-2xl px-4 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                                <Lock size={18} className="text-[#94A3B8] group-focus-within:text-blue-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-3 py-3.5 outline-none bg-transparent placeholder:text-[#94A3B8] text-[#1E293B]"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={isLoading}
                            className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? "Updating..." : (
                                <>
                                    Update Password
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
