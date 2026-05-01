"use client";
// app/(dashboard)/admin/jobs/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Briefcase, Search, CheckCircle2, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobPosting {
  id: string;
  title: string;
  job_type: string;
  industry: string;
  location?: string;
  is_remote: boolean;
  status: string;
  created_at: string;
  expires_at: string;
  rejection_reason?: string;
  employers: { company_name: string };
}

const FILTER_TABS = ["all", "pending", "active", "rejected", "expired"] as const;

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filtered, setFiltered] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<typeof FILTER_TABS[number]>("pending");
  const [actionId, setActionId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [detailJob, setDetailJob] = useState<JobPosting | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/jobs");
    const { data } = await res.json();
    setJobs(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  useEffect(() => {
    let result = jobs;
    if (tab !== "all") result = result.filter(j => j.status === tab);
    if (search) result = result.filter(j =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.employers?.company_name?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [jobs, tab, search]);

  const handleAction = async (reason?: string) => {
    if (!actionId || !actionType) return;
    const res = await fetch(`/api/admin/jobs/${actionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: actionType, rejection_reason: reason }),
    });
    if (!res.ok) { toast.error("Action failed"); return; }
    toast.success(actionType === "approve" ? "Job posting approved and is now live!" : "Job posting rejected");
    await fetchJobs();
    setActionId(null);
    setActionType(null);
  };

  const JOB_TYPE_LABEL: Record<string, string> = {
    full_time: "Full-time", part_time: "Part-time", contractual: "Contractual",
    internship: "Internship", freelance: "Freelance",
  };

  const counts = {
    all: jobs.length,
    pending: jobs.filter(j => j.status === "pending").length,
    active: jobs.filter(j => j.status === "active").length,
    rejected: jobs.filter(j => j.status === "rejected").length,
    expired: jobs.filter(j => j.status === "expired").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Briefcase} title="Job Moderation" description="Review and approve job postings from employers" />

      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit flex-wrap">
        {FILTER_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t} <span className="ml-1 text-xs opacity-60">({counts[t]})</span>
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Briefcase} title="No Job Postings Found" description="No job postings match your current filter." />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Job Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Company</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Expires</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.industry}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{job.employers?.company_name}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                    {JOB_TYPE_LABEL[job.job_type] ?? job.job_type}
                    {job.is_remote && <span className="ml-1 text-xs text-primary">(Remote)</span>}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={job.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {format(new Date(job.expires_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {job.status === "pending" && (
                        <>
                          <Button size="sm" variant="ghost" className="h-8 text-emerald-500 hover:bg-emerald-500/10"
                            onClick={() => { setActionId(job.id); setActionType("approve"); }}>
                            <CheckCircle2 size={13} className="mr-1" />Approve
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-destructive hover:bg-destructive/10"
                            onClick={() => { setActionId(job.id); setActionType("reject"); }}>
                            <XCircle size={13} className="mr-1" />Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!actionId && actionType === "approve"}
        onClose={() => { setActionId(null); setActionType(null); }}
        onConfirm={handleAction}
        title="Approve Job Posting"
        description="This will make the job posting live and visible to all alumni."
        confirmLabel="Approve & Publish"
        confirmVariant="default"
      />
      <ConfirmDialog
        open={!!actionId && actionType === "reject"}
        onClose={() => { setActionId(null); setActionType(null); }}
        onConfirm={handleAction}
        title="Reject Job Posting"
        description="Please provide a reason. The employer will be notified."
        confirmLabel="Reject"
        confirmVariant="destructive"
        requireReason
        reasonLabel="Rejection Reason"
        reasonPlaceholder="e.g. Job description is incomplete..."
      />
    </div>
  );
}
