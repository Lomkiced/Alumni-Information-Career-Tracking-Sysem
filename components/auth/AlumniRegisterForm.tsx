"use client";
// components/auth/AlumniRegisterForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { alumniRegisterSchema, type AlumniRegisterInput } from "@/lib/validations/auth.schema";
import { PCLU_COURSES, BATCH_YEARS, GRADUATION_YEARS } from "@/lib/constants/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AlumniRegisterForm() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AlumniRegisterInput>({
    resolver: zodResolver(alumniRegisterSchema),
    defaultValues: { full_name: "", email: "", password: "", confirm_password: "", student_id: "", course: undefined, batch_year: "", graduation_year: "" } as any,
  });

  const onSubmit = async (data: AlumniRegisterInput) => {
    setError(null);
    const res = await fetch("/api/auth/register/alumni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error ?? "Registration failed. Please try again."); return; }
    setSuccess(true);
    toast.success("Account created! Please check your email to verify.");
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-pclu-sky-500/20 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-pclu-sky-400" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white">Check Your Email!</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          We've sent a verification link to your email address. Please click the link to activate your account.
        </p>
        <Button onClick={() => router.push("/login")} className="bg-pclu-sky-600 hover:bg-pclu-sky-500 text-white">
          Back to Login
        </Button>
      </div>
    );
  }

  const inputCls = "bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-pclu-sky-400 h-10";
  const labelCls = "text-slate-200 text-sm font-medium";
  const control = form.control as any;

  return (
          <div className="h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="full_name" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className={labelCls}>Full Name *</FormLabel>
              <FormControl><Input {...field} id="alumni-full-name" placeholder="Juan dela Cruz" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={control} name="email" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className={labelCls}>Email Address *</FormLabel>
              <FormControl><Input {...field} id="alumni-email" type="email" placeholder="juan@email.com" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} id="alumni-password" type={showPwd ? "text" : "password"} placeholder="Min. 8 characters" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={control} name="confirm_password" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Confirm Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} id="alumni-confirm-password" type={showConfirm ? "text" : "password"} placeholder="Repeat password" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
        </div>

        {/* Section 2: Academic */}
        <div className="space-y-1 pb-1 pt-2">
          <p className="text-pclu-sky-400 text-xs font-semibold uppercase tracking-wider">Academic Information</p>
          <div className="h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="student_id" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Student ID <span className="text-slate-500">(optional)</span></FormLabel>
              <FormControl><Input {...field} id="alumni-student-id" placeholder="e.g. 2019-12345" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={control} name="course" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Course *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger id="alumni-course" className={`${inputCls} w-full`}>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PCLU_COURSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={control} name="batch_year" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Batch Year *</FormLabel>
              <FormControl><Input {...field} value={field.value ?? ""} type="number" id="alumni-batch-year" placeholder="e.g. 2020" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={control} name="graduation_year" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Graduation Year *</FormLabel>
              <FormControl><Input {...field} value={field.value ?? ""} type="number" id="alumni-grad-year" placeholder="e.g. 2024" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />

        </div>

        <Button id="alumni-register-submit" type="submit" disabled={form.formState.isSubmitting} className="w-full h-11 bg-gradient-to-r from-pclu-sky-600 to-pclu-sky-500 hover:from-pclu-sky-500 hover:to-pclu-sky-400 text-white font-semibold shadow-lg">
          {form.formState.isSubmitting ? <><Loader2 size={16} className="animate-spin mr-2" />Creating Account...</> : "Create Alumni Account"}
        </Button>
      </form>
    </Form>
  );
}
