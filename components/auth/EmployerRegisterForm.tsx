"use client";
// components/auth/EmployerRegisterForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import { employerRegisterSchema, type EmployerRegisterInput } from "@/lib/validations/auth.schema";
import { INDUSTRIES, COMPANY_SIZES } from "@/lib/constants/industries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EmployerRegisterForm() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EmployerRegisterInput>({
    resolver: zodResolver(employerRegisterSchema) as any,
    defaultValues: { full_name: "", email: "", password: "", confirm_password: "", company_name: "", industry: "", company_size: "", business_permit_number: "", company_address: "", company_website: "" } as any,
  });

  const onSubmit = async (data: EmployerRegisterInput) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/register/employer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Registration failed."); return; }
      setSuccess(true);
      toast.success("Registration submitted! Awaiting admin approval.");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const onInvalid = (errors: any) => {
    console.log("Validation Errors:", errors);
    toast.error("Please fill in all required fields correctly.");
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto">
          <Clock size={32} className="text-amber-400" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white">Registration Submitted!</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Your employer account is pending admin approval. You'll receive an email notification once reviewed — typically within 1–2 business days.
        </p>
        <Button onClick={() => router.push("/login")} className="bg-pclu-sky-600 hover:bg-pclu-sky-500 text-white">
          Back to Login
        </Button>
      </div>
    );
  }

  const inputCls = "bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-pclu-sky-400 h-10";
  const labelCls = "text-slate-200 text-sm font-medium";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-5">
        {error && <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-300 text-sm">{error}</div>}

        <div className="space-y-1 pb-1">
          <p className="text-pclu-sky-400 text-xs font-semibold uppercase tracking-wider">Account Information</p>
          <div className="h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="full_name" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className={labelCls}>Full Name *</FormLabel>
              <FormControl><Input {...field} id="employer-full-name" placeholder="Juan dela Cruz" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className={labelCls}>Email Address *</FormLabel>
              <FormControl><Input {...field} id="employer-email" type="email" placeholder="hr@company.com" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} id="employer-password" type={showPwd ? "text" : "password"} placeholder="Min. 8 characters" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"><Eye size={15} /></button>
                </div>
              </FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="confirm_password" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Confirm Password *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} id="employer-confirm-password" type={showConfirm ? "text" : "password"} placeholder="Repeat password" className={`${inputCls} pr-10`} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"><EyeOff size={15} /></button>
                </div>
              </FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
        </div>

        <div className="space-y-1 pb-1 pt-2">
          <p className="text-pclu-sky-400 text-xs font-semibold uppercase tracking-wider">Company Information</p>
          <div className="h-px bg-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="company_name" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className={labelCls}>Company Name *</FormLabel>
              <FormControl><Input {...field} id="employer-company-name" placeholder="Acme Corporation" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="industry" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Industry *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="employer-industry" className={`${inputCls} w-full`}><SelectValue placeholder="Select industry" /></SelectTrigger>
                </FormControl>
                <SelectContent>{INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="company_size" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Company Size *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="employer-size" className={`${inputCls} w-full`}><SelectValue placeholder="Select size" /></SelectTrigger>
                </FormControl>
                <SelectContent>{COMPANY_SIZES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="business_permit_number" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Business Permit No. <span className="text-slate-500">(optional)</span></FormLabel>
              <FormControl><Input {...field} id="employer-permit" placeholder="BP-2024-XXXXX" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="company_website" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Company Website <span className="text-slate-500">(optional)</span></FormLabel>
              <FormControl><Input {...field} id="employer-website" placeholder="https://company.com" className={inputCls} /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
          <FormField control={form.control} name="company_address" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className={labelCls}>Company Address *</FormLabel>
              <FormControl><Textarea {...field} id="employer-address" placeholder="Complete company address" className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-pclu-sky-400 resize-none h-20" /></FormControl>
              <FormMessage className="text-red-300 text-xs" />
            </FormItem>
          )} />
        </div>

        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-4 py-3">
          <p className="text-amber-300 text-xs leading-relaxed">
            <span className="font-semibold">Note:</span> Your account will be reviewed by the PCLU Alumni Affairs Office before activation. This process typically takes 1–2 business days.
          </p>
        </div>

        <Button id="employer-register-submit" type="submit" disabled={form.formState.isSubmitting} className="w-full h-11 bg-gradient-to-r from-pclu-sky-600 to-pclu-sky-500 hover:from-pclu-sky-500 hover:to-pclu-sky-400 text-white font-semibold shadow-lg">
          {form.formState.isSubmitting ? <><Loader2 size={16} className="animate-spin mr-2" />Submitting...</> : "Submit Employer Registration"}
        </Button>
      </form>
    </Form>
  );
}
