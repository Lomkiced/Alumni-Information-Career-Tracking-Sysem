"use client";
// app/(dashboard)/alumni/profile/page.tsx
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Camera, Loader2, Save, Globe, Phone, MapPin, Link2, Eye, EyeOff, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  profile_photo_url?: string; cover_photo_url?: string; is_verified: boolean;
  student_id?: string; course?: string; major?: string;
  batch_year?: number; graduation_year?: number;
  address?: string; city?: string; province?: string;
  linkedin_url?: string; is_profile_public: boolean;
  resume_url?: string;
}

export default function AlumniProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const resumeRef = useRef<HTMLInputElement>(null);

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
            resume_url: data.resume_url ?? undefined,
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
      const freshUrl = `${publicUrl}?t=${Date.now()}`;
      await (supabase as any).from("profiles").update({ profile_photo_url: freshUrl }).eq("id", user!.id);
      setProfile(prev => prev ? { ...prev, profile_photo_url: freshUrl } : prev);
      toast.success("Photo updated!");
      router.refresh();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5MB"); return; }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { toast.error("Only JPG, PNG, WebP allowed"); return; }

    setUploadingCover(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const ext = file.name.split(".").pop();
      const path = `avatars/${user!.id}/cover.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
      const freshUrl = `${publicUrl}?t=${Date.now()}`;
      await (supabase as any).from("profiles").update({ cover_photo_url: freshUrl }).eq("id", user!.id);
      setProfile(prev => prev ? { ...prev, cover_photo_url: freshUrl } : prev);
      toast.success("Cover photo updated!");
      router.refresh();
    } catch {
      toast.error("Cover upload failed. Please try again.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5MB"); return; }
    if (![".pdf", ".doc", ".docx"].some(ext => file.name.toLowerCase().endsWith(ext))) { toast.error("Only PDF, DOC, DOCX allowed"); return; }

    setUploadingResume(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const ext = file.name.split(".").pop();
      const path = `applications/default_${user!.id}_${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, file);
      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage.from("resumes").getPublicUrl(path);
      
      const currentProfileData = form.getValues();
      const res = await fetch("/api/alumni/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentProfileData, resume_url: publicUrl }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("API Error Response:", errorData);
        throw new Error(errorData?.error || "Failed to save resume URL");
      }

      setProfile(prev => prev ? { ...prev, resume_url: publicUrl } : prev);
      toast.success("Resume updated!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploadingResume(false);
      if (resumeRef.current) resumeRef.current.value = "";
    }
  };

  const handleDeleteResume = async () => {
    try {
      const currentProfileData = form.getValues();
      const res = await fetch("/api/alumni/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentProfileData, resume_url: "" }),
      });
      if (!res.ok) throw new Error("Failed to remove resume");
      
      setProfile(prev => prev ? { ...prev, resume_url: undefined } : prev);
      toast.success("Resume removed");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove resume");
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
        <div className="rounded-xl border border-border bg-card p-0 flex flex-col items-center overflow-hidden h-fit">
          {/* Cover Photo */}
          <div className="w-full h-64 sm:h-80 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative group">
            {profile?.cover_photo_url && (
              <img src={profile.cover_photo_url} alt="Cover" className="w-full h-full object-cover object-[center_25%]" />
            )}
            <button
              onClick={() => coverRef.current?.click()}
              disabled={uploadingCover}
              className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-sm font-medium backdrop-blur-[2px]"
            >
              {uploadingCover ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Camera size={16} /> Edit Cover Photo</>}
            </button>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
          </div>

          <div className="px-6 pb-6 -mt-12 flex flex-col items-center w-full gap-4">
            <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-border">
              <AvatarImage src={profile?.profile_photo_url || undefined} alt={profile?.full_name} />
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

          {/* Career Documents */}
          <div className="w-full space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Career Documents</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Saved Resume</p>
              {!profile?.resume_url ? (
                <label className="relative border-2 border-dashed border-border rounded-xl p-4 hover:bg-muted/50 hover:border-primary/50 transition-colors text-center cursor-pointer group block">
                  <input
                    ref={resumeRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    disabled={uploadingResume}
                  />
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      {uploadingResume ? <Loader2 size={14} className="animate-spin" /> : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>}
                    </div>
                    <p className="text-xs font-medium text-foreground mt-0.5">{uploadingResume ? "Uploading..." : "Upload Resume"}</p>
                    <p className="text-[10px] text-muted-foreground">PDF, DOC, DOCX</p>
                  </div>
                </label>
              ) : (
                <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">Saved_Resume</p>
                      <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline">View Document</a>
                    </div>
                  </div>
                  <button onClick={handleDeleteResume} className="text-muted-foreground hover:text-destructive p-1.5 shrink-0 transition-colors bg-muted hover:bg-destructive/10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
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
