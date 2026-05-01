"use client";
// app/(dashboard)/admin/announcements/new/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Megaphone, ArrowLeft, Loader2, Send, Save } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.enum(["general", "event", "job_fair", "seminar", "alumni_news"]),
  expires_at: z.string().optional(),
  is_published: z.boolean().default(false),
});

type FormInput = z.infer<typeof schema>;

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "event", label: "Event" },
  { value: "job_fair", label: "Job Fair" },
  { value: "seminar", label: "Seminar / Workshop" },
  { value: "alumni_news", label: "Alumni News" },
];

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<FormInput, any, FormInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: { title: "", content: "", category: "general", is_published: false },
  });

  const save = async (data: FormInput, publish: boolean) => {
    setPublishing(publish);
    const res = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, is_published: publish }),
    });
    const json = await res.json();
    if (!res.ok) { toast.error(json.error ?? "Failed to save"); setPublishing(false); return; }
    toast.success(publish ? "Announcement published! All alumni notified." : "Draft saved.");
    router.push("/admin/announcements");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader icon={Megaphone} title="New Announcement" description="Create and publish an announcement to alumni">
        <Link href="/admin/announcements" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft size={14} className="mr-1.5" /> Back
        </Link>
      </PageHeader>

      <Form {...form}>
        <form className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. PCLU Alumni Homecoming 2026" className="text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="expires_at" render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
                  <FormControl><Input {...field} type="date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="content" render={({ field }) => (
              <FormItem>
                <FormLabel>Content *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={8}
                    placeholder="Write the full announcement content here..."
                    className="resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="flex items-center gap-3 justify-end">
            <Button type="button" variant="outline" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(d => save(d as any, false))}>
              {form.formState.isSubmitting && !publishing && <Loader2 size={14} className="animate-spin mr-1.5" />}
              <Save size={14} className="mr-1.5" /> Save as Draft
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting} className="bg-primary hover:bg-primary/90" onClick={form.handleSubmit(d => save(d as any, true))}>
              {publishing && <Loader2 size={14} className="animate-spin mr-1.5" />}
              <Send size={14} className="mr-1.5" /> Publish & Notify Alumni
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
