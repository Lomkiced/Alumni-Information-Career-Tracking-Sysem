"use client";
// app/(dashboard)/employer/jobs/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Briefcase, Plus, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button, buttonVariants } from "@/components/ui/button";

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
  status: string;
  created_at: string;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: "Full-time", part_time: "Part-time", contractual: "Contractual",
  internship: "Internship", freelance: "Freelance",
};

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/employer/jobs");
    const { data } = await res.json();
    setJobs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "Salary not disclosed";
    const fmt = (n: number) => `₱${(n / 1000).toFixed(0)}k`;
    return min && max ? `${fmt(min)}–${fmt(max)}` : min ? `From ${fmt(min)}` : `Up to ${fmt(max!)}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Briefcase} title="My Job Postings" description="Manage all your job listings">
        <Link href="/employer/jobs/new" className={buttonVariants({ size: "sm", className: "gap-1.5" })}>
          <Plus size={14} /> Post a Job
        </Link>
      </PageHeader>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No Job Postings Yet"
          description="Create your first job posting to start receiving applications from PCLU alumni."
          action={
            <Link href="/employer/jobs/new" className={buttonVariants({ size: "sm", className: "gap-1.5" })}>
              <Plus size={14} /> Post First Job
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <StatusBadge status={job.status} />
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {JOB_TYPE_LABELS[job.job_type]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{job.industry} · {job.is_remote ? "Remote" : (job.location ?? "On-site")}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                    <span className="flex items-center gap-1"><Users size={11} />{job.slots} slot{job.slots !== 1 ? "s" : ""}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />Expires {format(new Date(job.expires_at), "MMM d, yyyy")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/employer/applicants" className={buttonVariants({ variant: "outline", size: "sm" })}>
                    View Applicants
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
