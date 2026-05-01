// app/(auth)/register/alumni/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Award, ArrowLeft } from "lucide-react";
import { AlumniRegisterForm } from "@/components/auth/AlumniRegisterForm";

export const metadata: Metadata = {
  title: "Alumni Registration",
  description: "Create your PCLU alumni account on AICTS.",
};

export default function AlumniRegisterPage() {
  return (
    <div className="w-full flex items-start justify-center p-6 lg:p-12 overflow-y-auto">
      <div className="w-full max-w-xl py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pclu-sky-400 to-pclu-sky-600 flex items-center justify-center">
            <Award size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Polytechnic College of La Union</p>
            <p className="text-pclu-sky-400 text-xs">Alumni Information Career Tracking System</p>
          </div>
        </div>

        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pclu-sky-500/20 to-pclu-navy-500/20 blur-xl opacity-50" />
          
          <div className="glass relative rounded-2xl p-8 shadow-2xl shadow-black/50 border border-white/10">
          <div className="mb-6">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Login
            </Link>
            <h1 className="font-heading text-2xl font-bold text-white">Alumni Registration</h1>
            <p className="text-slate-400 text-sm mt-1">Create your account to join the AICTS network</p>
          </div>
          <AlumniRegisterForm />
          <p className="text-center text-slate-500 text-xs mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-pclu-sky-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
