"use client";
// app/(dashboard)/employer/applicants/page.tsx
import { useState, useEffect, useCallback } from "react";
import { UserCheck, Search, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Application {
  id: string;
  application_status: string;
  cover_letter?: string;
  resume_url?: string;
  employer_notes?: string;
  applied_at: string;
  job_postings: { id: string; title: string };
  alumni: {
    course: string;
    batch_year: number;
    profiles: { full_name: string; email: string; phone?: string };
  };
}

const STATUSES = ["pending", "viewed", "shortlisted", "for_interview", "hired", "rejected"] as const;
const STATUS_LABELS: Record<string, string> = {
  pending: "Pending", viewed: "Viewed", shortlisted: "Shortlisted",
  for_interview: "For Interview", hired: "Hired", rejected: "Rejected",
};

export default function EmployerApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/employer/applicants");
    const { data } = await res.json();
    const apps: Application[] = data ?? [];
    setApplications(apps);
    const initialNotes: Record<string, string> = {};
    apps.forEach(a => { initialNotes[a.id] = a.employer_notes ?? ""; });
    setNotes(initialNotes);
    setLoading(false);
  }, []);

  useEffect(() => { fetchApplicants(); }, [fetchApplicants]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    const res = await fetch(`/api/employer/applicants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application_status: status, employer_notes: notes[id] }),
    });
    if (!res.ok) { toast.error("Failed to update"); } else {
      toast.success("Status updated!");
      setApplications(prev => prev.map(a => a.id === id ? { ...a, application_status: status } : a));
    }
    setUpdating(null);
  };

  const saveNotes = async (id: string) => {
    setUpdating(id);
    await fetch(`/api/employer/applicants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employer_notes: notes[id] }),
    });
    toast.success("Notes saved");
    setUpdating(null);
  };

  const filtered = applications.filter(a => {
    const name = a.alumni?.profiles?.full_name?.toLowerCase() ?? "";
    const searchMatch = !search || name.includes(search.toLowerCase()) || a.job_postings?.title?.toLowerCase().includes(search.toLowerCase());
    const statusMatch = !statusFilter || a.application_status === statusFilter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <PageHeader icon={UserCheck} title="Applicants" description={`${applications.length} total application${applications.length !== 1 ? "s" : ""}`} />

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search applicants..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v === "all" ? "" : (v || ""))}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="All Statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={UserCheck} title="No Applicants Yet" description="When alumni apply to your job postings, they will appear here." />
      ) : (
        <div className="space-y-3">
          {filtered.map(app => {
            const isExpanded = expandedId === app.id;
            return (
              <div key={app.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <div
                  className="flex items-start justify-between gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : app.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground">{app.alumni?.profiles?.full_name}</p>
                      <StatusBadge status={app.application_status} />
                    </div>
                    <p className="text-sm text-primary font-medium mt-0.5">{app.job_postings?.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {app.alumni?.course} · Batch {app.alumni?.batch_year} · Applied {format(new Date(app.applied_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <ChevronDown size={16} className={`text-muted-foreground transition-transform shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`} />
                </div>

                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Contact</p>
                        <p className="text-sm text-foreground">{app.alumni?.profiles?.email}</p>
                        {app.alumni?.profiles?.phone && <p className="text-sm text-muted-foreground">{app.alumni.profiles.phone}</p>}
                      </div>
                      {app.resume_url && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Resume</p>
                          <a href={app.resume_url} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline">View Resume</a>
                        </div>
                      )}
                    </div>
                    {app.cover_letter && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Cover Letter</p>
                        {app.cover_letter.startsWith("http") ? (
                          <a href={app.cover_letter} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1.5 mt-1">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                            </span>
                            View Cover Letter
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed bg-muted rounded-lg p-3 whitespace-pre-wrap">{app.cover_letter}</p>
                        )}
                      </div>
                    )}

                    {/* Status Update */}
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-medium text-muted-foreground">Update Status:</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUSES.map(s => (
                          <button key={s}
                            onClick={() => updateStatus(app.id, s)}
                            disabled={updating === app.id || app.application_status === s}
                            className={`text-xs px-3 py-1 rounded-full border font-medium transition-all disabled:opacity-50 ${app.application_status === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
                          >
                            {STATUS_LABELS[s]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Employer Notes */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Internal Notes</p>
                      <Textarea
                        value={notes[app.id] ?? ""}
                        onChange={e => setNotes(prev => ({ ...prev, [app.id]: e.target.value }))}
                        rows={2}
                        placeholder="Add private notes about this applicant..."
                        className="resize-none text-sm"
                      />
                      <Button size="sm" variant="outline" className="mt-2" onClick={() => saveNotes(app.id)} disabled={updating === app.id}>
                        Save Notes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
