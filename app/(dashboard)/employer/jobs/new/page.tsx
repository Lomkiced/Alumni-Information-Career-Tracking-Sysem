"use client";
// app/(dashboard)/employer/jobs/new/page.tsx
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { jobPostingSchema, type JobPostingInput } from "@/lib/validations/job.schema";
import { INDUSTRIES, PCLU_COURSES } from "@/lib/constants/courses";
import { PageHeader } from "@/components/shared/PageHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function NewJobPage() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<JobPostingInput, any, JobPostingInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(jobPostingSchema) as any,
    defaultValues: {
      title: "", description: "", requirements: "", job_type: "full_time",
      industry: "", location: "", is_remote: false,
      slots: 1, preferred_courses: [], expires_at: "",
    },
  });

  const isRemote = form.watch("is_remote");

  const toggleCourse = (course: string) => {
    const next = selectedCourses.includes(course)
      ? selectedCourses.filter(c => c !== course)
      : [...selectedCourses, course];
    setSelectedCourses(next);
    form.setValue("preferred_courses", next);
  };

  const onSubmit = async (data: JobPostingInput) => {
    const res = await fetch("/api/employer/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, preferred_courses: selectedCourses }),
    });
    const json = await res.json();
    if (!res.ok) { toast.error(json.error ?? "Failed to submit job posting"); return; }
    toast.success("Job posting submitted for admin review!");
    router.push("/employer/jobs");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader icon={Briefcase} title="Post a Job" description="Submit a job posting for PCLU alumni">
        <Link href="/employer/jobs" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft size={14} className="mr-1.5" /> Back
        </Link>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Basic Info */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-semibold text-sm text-foreground border-b border-border pb-2">Basic Information</h3>
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title *</FormLabel>
                <FormControl><Input {...field} placeholder="e.g. Software Engineer" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="job_type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {["full_time","part_time","contractual","internship","freelance"].map(t => (
                        <SelectItem key={t} value={t}>{t.replace("_"," ").replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl>
                    <SelectContent>{INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="slots" render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Slots *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1}
                      onChange={e => field.onChange(parseInt(e.target.value) || 1)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="expires_at" render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline *</FormLabel>
                  <FormControl><Input {...field} type="date" min={new Date().toISOString().split("T")[0]} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          {/* Location & Salary */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-semibold text-sm text-foreground border-b border-border pb-2">Location & Compensation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="is_remote" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${field.value ? "bg-primary" : "bg-muted"}`}>
                      <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${field.value ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm font-medium text-foreground">Remote / Work from home</span>
                  </div>
                </FormItem>
              )} />
              {!isRemote && (
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Job Location</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g. San Fernando, La Union" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
              <FormField control={form.control} name="salary_min" render={({ field }) => (
                <FormItem>
                  <FormLabel>Min. Salary (₱)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="e.g. 20000"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="salary_max" render={({ field }) => (
                <FormItem>
                  <FormLabel>Max. Salary (₱)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="e.g. 40000"
                      onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-semibold text-sm text-foreground border-b border-border pb-2">Job Details</h3>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description * <span className="text-muted-foreground font-normal text-xs">(min. 50 characters)</span></FormLabel>
                <FormControl><Textarea {...field} rows={5} placeholder="Describe the role, responsibilities, and what the ideal candidate will do day-to-day..." className="resize-y" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="requirements" render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements <span className="text-muted-foreground font-normal text-xs">(optional)</span></FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="List qualifications, experience, and skills required..." className="resize-y" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          {/* Preferred Courses */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="border-b border-border pb-2">
              <h3 className="font-semibold text-sm text-foreground">Preferred Courses <span className="text-muted-foreground font-normal text-xs">(optional)</span></h3>
              <p className="text-xs text-muted-foreground mt-0.5">Select PCLU courses that are most relevant to this role</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PCLU_COURSES.map(course => {
                const selected = selectedCourses.includes(course);
                return (
                  <button
                    key={course}
                    type="button"
                    onClick={() => toggleCourse(course)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${selected ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
                  >
                    {course}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Link href="/employer/jobs" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
            <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary hover:bg-primary/90">
              {form.formState.isSubmitting && <Loader2 size={14} className="animate-spin mr-1.5" />}
              Submit for Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
