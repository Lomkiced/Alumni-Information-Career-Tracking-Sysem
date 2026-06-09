"use client";
// components/alumni/CareerRecordDialog.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { careerRecordSchema, type CareerRecordInput } from "@/lib/validations/career.schema";
import { INDUSTRIES } from "@/lib/constants/courses";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CareerRecordDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CareerRecordInput, id?: string) => Promise<void>;
  editData?: Partial<CareerRecordInput & { id: string }>;
}

const EMPLOYMENT_STATUSES = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "ofw", label: "OFW" },
  { value: "further_study", label: "Further Study" },
  { value: "retired", label: "Retired" },
];

const EMP_TYPES = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contractual", label: "Contractual" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const SALARY_RANGES = [
  { value: "below_15k", label: "Below ₱15,000" },
  { value: "15k_25k", label: "₱15,000 – ₱25,000" },
  { value: "25k_35k", label: "₱25,000 – ₱35,000" },
  { value: "35k_50k", label: "₱35,000 – ₱50,000" },
  { value: "50k_75k", label: "₱50,000 – ₱75,000" },
  { value: "above_75k", label: "Above ₱75,000" },
];

export function CareerRecordDialog({ open, onClose, onSave, editData }: CareerRecordDialogProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<CareerRecordInput, any, CareerRecordInput>({
    resolver: zodResolver(careerRecordSchema) as any,
    defaultValues: {
      employment_status: "employed",
      employer_name: "",
      job_title: "",
      industry: "",
      employment_type: undefined,
      salary_range: undefined,
      start_date: "",
      end_date: "",
      is_current: true,
      country: "Philippines",
      city: "",
      job_description: "",
    },
  });

  const status = form.watch("employment_status");
  const isCurrent = form.watch("is_current");
  const needsEmployer = !["unemployed", "further_study", "retired"].includes(status);

  useEffect(() => {
    if (editData) {
      form.reset({
        employment_status: editData.employment_status as CareerRecordInput["employment_status"] ?? "employed",
        employer_name: editData.employer_name ?? "",
        job_title: editData.job_title ?? "",
        industry: editData.industry ?? "",
        employment_type: editData.employment_type as CareerRecordInput["employment_type"],
        salary_range: editData.salary_range as CareerRecordInput["salary_range"],
        start_date: editData.start_date ?? "",
        end_date: editData.end_date ?? "",
        is_current: editData.is_current ?? true,
        country: editData.country ?? "Philippines",
        city: editData.city ?? "",
        job_description: editData.job_description ?? "",
      });
    } else {
      form.reset({ 
        employment_status: "employed", 
        employer_name: "",
        job_title: "",
        industry: "",
        employment_type: undefined,
        salary_range: undefined,
        start_date: "",
        end_date: "",
        is_current: true, 
        country: "Philippines",
        city: "",
        job_description: "",
      });
    }
  }, [editData, open, form]);

  const onSubmit = async (data: CareerRecordInput) => {
    await onSave(data, editData?.id);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-heading font-semibold text-foreground">
            {editData ? "Edit Career Record" : "Add Career Record"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 space-y-4">
            {/* Status + Current */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="employment_status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {EMPLOYMENT_STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="is_current" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <div className="flex items-center gap-3 h-10 px-3 rounded-md border border-input">
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors ${field.value ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${field.value ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm text-muted-foreground">{field.value ? "Currently active" : "Past position"}</span>
                  </div>
                </FormItem>
              )} />
            </div>

            {needsEmployer && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="employer_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer / Company *</FormLabel>
                    <FormControl><Input {...field} placeholder="ABC Corporation" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="job_title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl><Input {...field} placeholder="Software Engineer" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="employment_type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                      <SelectContent>{EMP_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="salary_range" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                      <SelectContent>{SALARY_RANGES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {/* Industry */}
            <FormField control={form.control} name="industry" render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="start_date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl><Input {...field} type="date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {!isCurrent && (
                <FormField control={form.control} name="end_date" render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date *</FormLabel>
                    <FormControl><Input {...field} type="date" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl><Input {...field} placeholder="Philippines" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl><Input {...field} placeholder="Manila" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Description */}
            <FormField control={form.control} name="job_description" render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Description <span className="text-muted-foreground">(optional)</span></FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="Briefly describe your role and responsibilities..." className="resize-none" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-2 border-t border-border">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary hover:bg-primary/90">
                {form.formState.isSubmitting && <Loader2 size={14} className="animate-spin mr-1.5" />}
                {editData ? "Save Changes" : "Add Record"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
