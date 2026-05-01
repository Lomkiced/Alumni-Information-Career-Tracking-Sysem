"use client";
// app/(auth)/forgot-password/page.tsx
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, ArrowLeft, CheckCircle, Award } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotPasswordInput) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=/reset-password`,
    });
    if (error) { toast.error(error.message); return; }
    setSent(true);
  };

  return (
    <div className="w-full flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pclu-sky-400 to-pclu-sky-600 flex items-center justify-center">
            <Award size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">PCLU · AICTS</p>
          </div>
        </div>

        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pclu-sky-500/20 to-pclu-navy-500/20 blur-xl opacity-50" />
          
          <div className="glass relative rounded-2xl p-8 shadow-2xl shadow-black/50 border border-white/10">
          {sent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-pclu-sky-500/20 flex items-center justify-center mx-auto">
                <CheckCircle size={28} className="text-pclu-sky-400" />
              </div>
              <h2 className="font-heading text-xl font-bold text-white">Check Your Email</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                If an account exists for that email, you'll receive a password reset link shortly.
              </p>
              <Link href="/login">
                <Button className="bg-pclu-sky-600 hover:bg-pclu-sky-500 text-white w-full mt-2">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-4">
                  <ArrowLeft size={14} /> Back to Login
                </Link>
                <h1 className="font-heading text-2xl font-bold text-white">Forgot Password</h1>
                <p className="text-slate-400 text-sm mt-1">Enter your email to receive a reset link.</p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200 text-sm font-medium">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <Input {...field} id="forgot-email" type="email" placeholder="you@example.com" className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-11 pl-9" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs" />
                    </FormItem>
                  )} />
                  <Button id="forgot-submit" type="submit" disabled={form.formState.isSubmitting} className="w-full h-11 bg-gradient-to-r from-pclu-sky-600 to-pclu-sky-500 hover:from-pclu-sky-500 hover:to-pclu-sky-400 text-white font-semibold">
                    {form.formState.isSubmitting ? <><Loader2 size={16} className="animate-spin mr-2" />Sending...</> : "Send Reset Link"}
                  </Button>
                </form>
              </Form>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
