// app/(auth)/login/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users, TrendingUp, Award } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your AICTS account.",
};

const features = [
  { icon: BookOpen, title: "Career Tracking", desc: "Log and showcase your professional journey" },
  { icon: Users, title: "Alumni Network", desc: "Connect with thousands of PCLU graduates" },
  { icon: TrendingUp, title: "Job Board", desc: "Exclusive job listings from verified employers" },
  { icon: Award, title: "Institutional Analytics", desc: "Data-driven insights for career planning" },
];

export default function LoginPage() {
  return (
    <div className="w-full flex min-h-screen">
      {/* ── Brand Panel (hidden on mobile) ─────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pclu-sky-400 to-pclu-sky-600 flex items-center justify-center shadow-lg">
            <Award size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">PCLU</p>
            <p className="text-pclu-sky-400 text-xs font-medium">AICTS</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-4xl xl:text-5xl font-bold text-white leading-tight">
              Track. Connect.
              <br />
              <span className="text-pclu-sky-400">Grow Together.</span>
            </h1>
            <p className="mt-4 text-slate-300 text-lg leading-relaxed max-w-md">
              The Alumni Information Career Tracking System of Polytechnic College of La Union — your bridge from graduation to career success.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-xl p-4 hover-lift">
                <div className="w-8 h-8 rounded-lg bg-pclu-sky-500/20 flex items-center justify-center mb-3">
                  <Icon size={16} className="text-pclu-sky-400" />
                </div>
                <p className="text-white text-sm font-semibold">{title}</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Polytechnic College of La Union · Alumni Affairs Office
        </p>
      </div>

      {/* ── Login Panel ─────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pclu-sky-400 to-pclu-sky-600 flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <p className="text-white font-bold text-sm">PCLU · AICTS</p>
          </div>

          {/* Card */}
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pclu-sky-500/20 to-pclu-navy-500/20 blur-xl opacity-50" />
            
            <div className="glass relative rounded-2xl p-8 shadow-2xl shadow-black/50 border border-white/10">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-white">Welcome back</h2>
              <p className="text-slate-400 text-sm mt-1">Sign in to your AICTS account</p>
            </div>
              <LoginForm />
            </div>
          </div>

          <p className="text-center text-slate-500 text-xs mt-6">
            By signing in, you agree to the{" "}
            <Link href="#" className="text-pclu-sky-400 hover:underline">Terms of Use</Link>
            {" "}and{" "}
            <Link href="#" className="text-pclu-sky-400 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
