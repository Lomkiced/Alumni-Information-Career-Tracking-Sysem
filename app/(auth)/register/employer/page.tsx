import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmployerRegisterForm } from "@/components/auth/EmployerRegisterForm";

export const metadata: Metadata = {
  title: "Employer Registration",
};

export default function EmployerRegisterPage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Login
        </Link>
        <h1 className="font-heading text-2xl font-bold text-white">Employer Registration</h1>
        <p className="text-slate-400 text-sm mt-1">Register your company to post job listings</p>
      </div>
      <EmployerRegisterForm />
      <p className="text-center text-slate-500 text-xs mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-pclu-sky-400 hover:underline font-medium">Sign in</Link>
      </p>
    </>
  );
}
