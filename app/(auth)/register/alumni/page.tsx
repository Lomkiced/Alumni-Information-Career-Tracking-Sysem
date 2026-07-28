import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AlumniRegisterForm } from "@/components/auth/AlumniRegisterForm";

export const metadata: Metadata = {
  title: "Alumni Registration",
};

export default function AlumniRegisterPage() {
  return (
    <>
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
    </>
  );
}
