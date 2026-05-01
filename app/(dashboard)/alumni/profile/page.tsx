"use client";
// app/(dashboard)/alumni/profile/page.tsx
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Camera, Loader2, Save, Globe, Phone, MapPin, Link2, Eye, EyeOff, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { alumniProfileSchema, type AlumniProfileInput } from "@/lib/validations/alumni.schema";
import { PCLU_COURSES } from "@/lib/constants/courses";
import { PageHeader } from "@/components/shared/PageHeader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatInitials } from "@/lib/utils/format";

interface ProfileData {
  id: string; full_name: string; email: string; phone?: string;
  profile_photo_url?: string; is_verified: boolean;
  student_id?: string; course?: string; major?: string;
  batch_year?: number; graduation_year?: number;
  address?: string; city?: string; province?: string;
  linkedin_url?: string; is_profile_public: boolean;
}

export default function AlumniProfilePage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<AlumniProfileInput, any, AlumniProfileInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(alumniProfileSchema) as any,
    defaultValues: { full_name: "", phone: "", address: "", city: "", province: "", linkedin_url: "", major: "", is_profile_public: true },
  });

  useEffect(() => {
    fetch("/api/alumni/profile")
      .then(r => r.json())
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          form.reset({
            full_name: data.full_name ?? "",
            phone: data.phone ?? "",
            address: data.address ?? "",
            city: data.city ?? "",
            province: data.province ?? "",
            linkedin_url: data.linkedin_url ?? "",
            major: data.major ?? "",
            is_profile_public: data.is_profile_public ?? true,
            course: data.course ?? undefined,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [form]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5MB"); return; }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { toast.error("Only JPG, PNG, WebP allowed"); return; }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const ext = file.name.split(".").pop();
      const path = `avatars/${user!.id}/avatar.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
      await (supabase as any).from("profiles").update({ profile_photo_url: publicUrl }).eq("id", user!.id);
      setProfile(prev => prev ? { ...prev, profile_photo_url: publicUrl } : prev);
      toast.success("Photo updated!");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: AlumniProfileInput) => {
    const res = await fetch("/api/alumni/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { toast.error(json.error ?? "Failed to save"); return; }
    toast.success("Profile saved successfully!");
    setProfile(prev => prev ? { ...prev, ...data } : prev);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader icon={User} title="My Profile" description="Manage your alumni profile" />
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader icon={User} title="My Profile" description="Update your personal and academic information">
        <Button form="profile-form" type="submit" disabled={form.formState.isSubmitting} size="sm" className="bg-primary hover:bg-primary/90">
          {form.formState.isSubmitting ? <><Loader2 size={14} className="animate-spin mr-1.5" />Saving…</> : <><Save size={14} className="mr-1.5" />Save Changes</>}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo Card */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-border">
              <AvatarImage src={profile?.profile_photo_url ?? ""} alt={profile?.full_name} />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {formatInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">{profile?.full_name}</p>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            {profile?.is_verified && (
              <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Academic info (read-only) */}
          <div className="w-full space-y-2 pt-2 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Academic Info</p>
            {profile?.student_id && <p className="text-xs text-muted-foreground">ID: {profile.student_id}</p>}
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><GraduationCap size={12} />{profile?.course ?? "—"}</p>
            {profile?.batch_year && <p className="text-xs text-muted-foreground">Batch: {profile.batch_year}</p>}
            {profile?.graduation_year && <p className="text-xs text-muted-foreground">Graduated: {profile.graduation_year}</p>}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Personal Info */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <User size={15} className="text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="full_name" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl><Input {...field} placeholder="Juan dela Cruz" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel><span className="flex items-center gap-1.5"><Phone size={12} />Phone</span></FormLabel>
                      <FormControl><Input {...field} placeholder="+63 9XX XXX XXXX" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="linkedin_url" render={({ field }) => (
                    <FormItem>
                      <FormLabel><span className="flex items-center gap-1.5"><Link2 size={12} />LinkedIn</span></FormLabel>
                      <FormControl><Input {...field} placeholder="https://linkedin.com/in/..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* Location */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <MapPin size={15} className="text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">Location</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input {...field} placeholder="123 Sample Street, Barangay" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City / Municipality</FormLabel>
                      <FormControl><Input {...field} placeholder="San Fernando" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="province" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl><Input {...field} placeholder="La Union" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* Academic & Privacy */}
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <GraduationCap size={15} className="text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">Academic & Privacy</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="major" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major / Specialization</FormLabel>
                      <FormControl><Input {...field} placeholder="e.g. Web Development" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="course" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PCLU_COURSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="is_profile_public" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="flex items-center gap-3">
                          {field.value ? <Eye size={16} className="text-primary" /> : <EyeOff size={16} className="text-muted-foreground" />}
                          <div>
                            <p className="text-sm font-medium text-foreground">Public Profile</p>
                            <p className="text-xs text-muted-foreground">Visible to employers and other users when enabled</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none ${field.value ? "bg-primary" : "bg-muted"}`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${field.value ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
