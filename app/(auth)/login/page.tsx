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
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pclu-sky-400 to-pclu-sky-600 flex items-center justify-center shadow-lg">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">PCLU</p>
            <p className="text-pclu-sky-400 text-sm font-medium">AICTS</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-5xl xl:text-6xl font-bold text-white leading-tight">
              Track. Connect.
              <br />
              <span className="text-pclu-sky-400">Grow Together.</span>
            </h1>
            <p className="mt-6 text-slate-300 text-xl leading-relaxed max-w-lg">
              The Alumni Information Career Tracking System of Polytechnic College of La Union — your bridge from graduation to career success.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-xl p-6 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-pclu-sky-500/20 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-pclu-sky-400" />
                </div>
                <p className="text-white text-base font-semibold">{title}</p>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Polytechnic College of La Union · Alumni Affairs Office
        </p>
      </div>

      {/* ── Login Panel ─────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pclu-sky-400 to-pclu-sky-600 flex items-center justify-center">
              <Award size={20} className="text-white" />
            </div>
            <p className="text-white font-bold text-base">PCLU · AICTS</p>
          </div>

          {/* Card */}
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pclu-sky-500/20 to-pclu-navy-500/20 blur-xl opacity-50" />
            
            <div className="glass relative rounded-3xl p-10 shadow-2xl shadow-black/50 border border-white/10">
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-bold text-white">Welcome back</h2>
              <p className="text-slate-400 text-base mt-2">Sign in to your AICTS account</p>
            </div>
              <LoginForm />
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
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
