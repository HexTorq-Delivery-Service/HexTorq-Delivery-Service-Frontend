"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RunnerLogo } from "@/components/RunnerLogo";
import { Eye, EyeOff, Mail, Lock, User, Phone, IdCard, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    studentId: "",
    password: "",
    confirm: "",
  });

  const passwordsMatch = form.password && form.confirm && form.password === form.confirm;
  const passwordStrong = form.password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    setLoading(true);
    // Simulate signup — replace with real auth later
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email: form.email, name: form.name, mobile: form.mobile }));
      router.push("/");
    }, 1400);
  };

  const field = (
    icon: React.ReactNode,
    type: string,
    placeholder: string,
    key: keyof typeof form,
    extra?: React.ReactNode
  ) => (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full h-12 pl-11 pr-4 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none font-medium text-gray-900 placeholder:text-gray-400 transition-all"
      />
      {extra}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF6B00]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#FFB347]/10 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-3">
            <RunnerLogo />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Join CampusRunner</h1>
          <p className="text-gray-500 mt-1 font-medium">Order food from your campus — fast & easy</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[28px] shadow-[0_8px_40px_rgba(255,107,0,0.10)] p-8">

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 font-bold text-gray-700 transition-all duration-200 hover:border-gray-300 mb-6 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            {field(<User className="w-4 h-4" />, "text", "Full name", "name")}

            {/* Email */}
            {field(<Mail className="w-4 h-4" />, "email", "Email address", "email")}

            {/* Mobile */}
            {field(<Phone className="w-4 h-4" />, "tel", "Mobile number", "mobile")}

            {/* Student ID */}
            {field(<IdCard className="w-4 h-4" />, "text", "Student ID (e.g. 22CS001)", "studentId")}

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password (min. 8 characters)"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full h-12 pl-11 pr-12 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#FF6B00] outline-none font-medium text-gray-900 placeholder:text-gray-400 transition-all"
              />
              <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength */}
            {form.password && (
              <div className="flex gap-1 px-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${
                    form.password.length >= i * 2
                      ? i <= 2 ? "bg-red-400" : i === 3 ? "bg-yellow-400" : "bg-green-500"
                      : "bg-gray-200"
                  }`} />
                ))}
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Confirm password"
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                className={`w-full h-12 pl-11 pr-12 rounded-2xl border-2 bg-gray-50 focus:bg-white outline-none font-medium text-gray-900 placeholder:text-gray-400 transition-all ${
                  form.confirm ? (passwordsMatch ? "border-green-500" : "border-red-400") : "border-gray-200 focus:border-[#FF6B00]"
                }`}
              />
              {passwordsMatch ? (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              ) : (
                <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400 font-medium px-1">
              By signing up you agree to our{" "}
              <span className="text-[#FF6B00] font-bold cursor-pointer hover:underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-[#FF6B00] font-bold cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !passwordStrong || form.password !== form.confirm}
              className="w-full rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-black text-base shadow-lg shadow-[#FF6B00]/30 hover:shadow-[#FF6B00]/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3.5 mt-1"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="text-center text-gray-500 font-medium mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FF6B00] font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
