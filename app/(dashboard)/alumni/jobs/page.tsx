"use client";
// app/(dashboard)/alumni/jobs/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Briefcase, Search, MapPin, Clock, DollarSign, X, Loader2, Send } from "lucide-react";
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
  const [applying, setApplying] = useState(false);

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

  const handleApply = async () => {
    if (!applyJob) return;
    setApplying(true);
    const res = await fetch("/api/alumni/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: applyJob.id, cover_letter: coverLetter }),
    });
    const json = await res.json();
    setApplying(false);
    if (!res.ok) { toast.error(json.error ?? "Application failed"); return; }
    toast.success("Application submitted successfully!");
    setApplyJob(null);
    setCoverLetter("");
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setApplyJob(null)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-foreground">{applyJob.title}</h3>
                <p className="text-sm text-primary">{applyJob.employers?.company_name}</p>
              </div>
              <button onClick={() => setApplyJob(null)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Cover Letter <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Textarea
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  rows={5}
                  placeholder="Briefly introduce yourself and explain why you're a great fit for this role..."
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">{coverLetter.length}/2000</p>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setApplyJob(null)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleApply} disabled={applying}>
                  {applying && <Loader2 size={14} className="animate-spin mr-1.5" />}
                  <Send size={14} className="mr-1.5" /> Submit Application
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
