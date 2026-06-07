"use client";
// app/(dashboard)/alumni/jobs/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Briefcase, Search, MapPin, Clock, DollarSign, X, Loader2, Send, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INDUSTRIES } from "@/lib/constants/courses";
import { createClient } from "@/lib/supabase/client";

interface JobPosting {
  id: string;
  title: string;
  job_type: string;
  industry: string;
  location?: string;
  is_remote: boolean;
  salary_min?: number;
  salary_max?: number;
  slots: number;
  expires_at: string;
  created_at: string;
  employers: { company_name: string; company_logo_url?: string };
}

const JOB_TYPES = ["full_time", "part_time", "contractual", "internship", "freelance"] as const;
const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: "Full-time", part_time: "Part-time", contractual: "Contractual",
  internship: "Internship", freelance: "Freelance",
};

export default function AlumniJobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [applyJob, setApplyJob] = useState<JobPosting | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterMode, setCoverLetterMode] = useState<"text" | "upload">("text");
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [savedResumeUrl, setSavedResumeUrl] = useState<string | null>(null);
  const [useSavedResume, setUseSavedResume] = useState(false);
  const [applying, setApplying] = useState(false);

  const supabase = createClient();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (jobType) params.set("job_type", jobType);
    if (industry) params.set("industry", industry);
    const res = await fetch(`/api/alumni/jobs?${params}`);
    const { data, count } = await res.json();
    setJobs(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [page, search, jobType, industry]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  useEffect(() => {
    fetch("/api/alumni/profile")
      .then(res => res.json())
      .then(json => {
        if (json.data?.resume_url) {
          setSavedResumeUrl(json.data.resume_url);
          setUseSavedResume(true);
        }
      })
      .catch(console.error);
  }, []);

  const handleApply = async () => {
    if (!applyJob) return;

    if (!useSavedResume && !resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    if (coverLetterMode === "text" && !coverLetter.trim()) {
      toast.error("Please provide a cover letter.");
      return;
    }

    if (coverLetterMode === "upload" && !coverLetterFile) {
      toast.error("Please upload your cover letter.");
      return;
    }

    setApplying(true);

    let resume_url = useSavedResume && savedResumeUrl ? savedResumeUrl : "";
    if (!useSavedResume && resumeFile) {
      if (resumeFile.size > 5 * 1024 * 1024) {
        toast.error("Resume file must be under 5MB");
        setApplying(false);
        return;
      }
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const ext = resumeFile.name.split(".").pop();
        const path = `applications/${user.id}_${applyJob.id}_${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, resumeFile);
        
        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage.from("resumes").getPublicUrl(path);
        resume_url = publicUrl;
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload resume. Please try again.");
        setApplying(false);
        return;
      }
    }

    let finalCoverLetter = coverLetter;
    if (coverLetterMode === "upload" && coverLetterFile) {
      if (coverLetterFile.size > 5 * 1024 * 1024) {
        toast.error("Cover letter file must be under 5MB");
        setApplying(false);
        return;
      }
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const ext = coverLetterFile.name.split(".").pop();
        const path = `applications/cover_${user.id}_${applyJob.id}_${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, coverLetterFile);
        
        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage.from("resumes").getPublicUrl(path);
        finalCoverLetter = publicUrl;
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload cover letter. Please try again.");
        setApplying(false);
        return;
      }
    }

    const res = await fetch("/api/alumni/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        job_id: applyJob.id, 
        cover_letter: finalCoverLetter,
        ...(resume_url && { resume_url })
      }),
    });
    const json = await res.json();
    setApplying(false);
    if (!res.ok) { toast.error(json.error ?? "Application failed"); return; }
    toast.success("Application submitted successfully!");
    setApplyJob(null);
    setCoverLetter("");
    setCoverLetterFile(null);
    setCoverLetterMode("text");
    setResumeFile(null);
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const fmt = (n: number) => `₱${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${fmt(min)}–${fmt(max)}`;
    return min ? `From ${fmt(min)}` : `Up to ${fmt(max!)}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Briefcase} title="Job Board" description={`${total} active job listings for PCLU alumni`} />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search jobs or companies..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={jobType} onValueChange={v => { setJobType(v === "all" ? "" : (v || "")); setPage(1); }}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Job Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {JOB_TYPES.map(t => <SelectItem key={t} value={t}>{JOB_TYPE_LABELS[t]}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={industry} onValueChange={v => { setIndustry(v === "all" ? "" : (v || "")); setPage(1); }}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Industry" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Job Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-52 rounded-xl bg-muted animate-pulse" />)}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState icon={Briefcase} title="No Jobs Found" description="No active job listings match your filters. Check back soon!" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map(job => (
              <div key={job.id} className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground leading-snug line-clamp-2">{job.title}</p>
                    <p className="text-sm text-primary font-medium mt-0.5">{job.employers?.company_name}</p>
                  </div>
                  <StatusBadge status={job.job_type} className="shrink-0" />
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={11} />{job.industry}
                  </div>
                  {(job.location || job.is_remote) && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {job.is_remote ? "Remote" : job.location}
                    </div>
                  )}
                  {formatSalary(job.salary_min, job.salary_max) && (
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={11} />{formatSalary(job.salary_min, job.salary_max)}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} />Expires {format(new Date(job.expires_at), "MMM d, yyyy")}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="mt-auto bg-primary hover:bg-primary/90 w-full"
                  onClick={() => setApplyJob(job)}
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>

          {total > 20 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {((page - 1) * 20) + 1}–{Math.min(page * 20, total)} of {total}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page * 20 >= total}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Apply Modal */}
      {applyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setApplyJob(null)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border/50 bg-card p-0 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-border/50 bg-muted/20 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground leading-tight">{applyJob.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{applyJob.employers?.company_name}</p>
                </div>
              </div>
              <button onClick={() => setApplyJob(null)} className="text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted transition-colors">
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">
                    Resume
                  </label>
                  {savedResumeUrl && (
                    <div className="flex bg-muted/50 rounded-lg p-0.5 border border-border/50">
                      <button 
                        onClick={() => setUseSavedResume(true)} 
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${useSavedResume ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Use Saved Resume
                      </button>
                      <button 
                        onClick={() => setUseSavedResume(false)} 
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${!useSavedResume ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        Upload Different
                      </button>
                    </div>
                  )}
                </div>

                {useSavedResume ? (
                  <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-border/50">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Paperclip size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Saved_Resume</p>
                        <p className="text-xs text-primary mt-0.5">Attached from Profile</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {!resumeFile ? (
                      <label className="relative border-2 border-dashed border-border rounded-xl p-6 hover:bg-muted/50 hover:border-primary/50 transition-colors text-center cursor-pointer group block">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={e => setResumeFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Paperclip size={18} />
                          </div>
                          <p className="text-sm font-medium text-foreground mt-1">Click to upload resume</p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-primary/20 shadow-sm ring-1 ring-primary/10">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Paperclip size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{resumeFile.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => setResumeFile(null)} className="text-muted-foreground hover:text-destructive p-2 shrink-0 transition-colors bg-muted/50 hover:bg-destructive/10 rounded-full">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">
                    Cover Letter
                  </label>
                  <div className="flex bg-muted/50 rounded-lg p-0.5 border border-border/50">
                    <button 
                      onClick={() => setCoverLetterMode("text")} 
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${coverLetterMode === "text" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Write Text
                    </button>
                    <button 
                      onClick={() => setCoverLetterMode("upload")} 
                      className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${coverLetterMode === "upload" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Upload File
                    </button>
                  </div>
                </div>

                {coverLetterMode === "text" ? (
                  <>
                    <Textarea
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      rows={4}
                      placeholder="Briefly introduce yourself and explain why you're a great fit for this role..."
                      className="resize-none focus-visible:ring-primary/30"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5 text-right">{coverLetter.length}/2000</p>
                  </>
                ) : (
                  <>
                    {!coverLetterFile ? (
                      <label className="relative border-2 border-dashed border-border rounded-xl p-6 hover:bg-muted/50 hover:border-primary/50 transition-colors text-center cursor-pointer group block">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={e => setCoverLetterFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Paperclip size={18} />
                          </div>
                          <p className="text-sm font-medium text-foreground mt-1">Click to upload cover letter</p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-primary/20 shadow-sm ring-1 ring-primary/10">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Paperclip size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{coverLetterFile.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => setCoverLetterFile(null)} className="text-muted-foreground hover:text-destructive p-2 shrink-0 transition-colors bg-muted/50 hover:bg-destructive/10 rounded-full">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-muted/20 border-t border-border/50 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setApplyJob(null)} className="border-border/50">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90 shadow-sm" onClick={handleApply} disabled={applying}>
                {applying ? <Loader2 size={16} className="animate-spin mr-2" /> : <Send size={16} className="mr-2" />} 
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
