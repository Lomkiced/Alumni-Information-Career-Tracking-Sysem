"use client";
// components/auth/LoginForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2, GraduationCap, Briefcase, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const ROLE_REDIRECTS: Record<string, string> = {
  alumni: "/alumni/profile",
  admin: "/admin/dashboard",
  employer: "/employer/jobs",
};

export function LoginForm() {
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);

    // Step 1: Sign in with Supabase
    const { data: auth, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : authError.message
      );
      return;
    }

    // Step 2: Fetch the user's role from profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", auth.user.id)
      .single<{ role: string }>();

    if (profileError || !profile) {
      // Profile doesn't exist yet — might be a newly created user without a profile row
      setError(
        "Your account profile was not found. Please contact the system administrator."
      );
      // Sign them back out to avoid a stuck session
      await supabase.auth.signOut();
      return;
    }

    const destination = ROLE_REDIRECTS[profile.role] ?? "/login";

    toast.success(`Welcome back! Redirecting to your dashboard…`, {
      duration: 2000,
    });

    // Step 3: Hard redirect — guarantees auth cookie is committed before navigation.
    // Using window.location.href instead of router.push() to avoid the race condition
    // where the middleware reads the session before Supabase finishes setting cookies.
    setTimeout(() => {
      window.location.href = destination;
    }, 400);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Error alert */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3 text-red-300 text-sm">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200 text-sm font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-pclu-sky-400 focus:ring-2 focus:ring-pclu-sky-400/20 h-11 transition-all"
                />
              </FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1">
                <FormLabel className="text-slate-200 text-sm font-medium">
                  Password
                </FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs text-pclu-sky-400 hover:text-pclu-sky-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-pclu-sky-400 focus:ring-2 focus:ring-pclu-sky-400/20 pr-10 h-11 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          id="login-submit"
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-11 bg-gradient-to-r from-pclu-sky-600 to-pclu-sky-500 hover:from-pclu-sky-500 hover:to-pclu-sky-400 text-white font-semibold text-sm shadow-lg shadow-pclu-sky-900/30 transition-all duration-200 mt-2"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Signing in…
            </>
          ) : (
            "Sign In to AICTS"
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-400 font-medium">New to AICTS?</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Register links */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/register/alumni" id="register-alumni-link">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 border-white/20 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white text-xs font-medium gap-1.5 transition-all"
            >
              <GraduationCap size={14} /> Register as Alumni
            </Button>
          </Link>
          <Link href="/register/employer" id="register-employer-link">
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 border-white/20 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white text-xs font-medium gap-1.5 transition-all"
            >
              <Briefcase size={14} /> Register as Employer
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
