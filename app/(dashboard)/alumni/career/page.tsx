"use client";
// app/(dashboard)/alumni/career/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Briefcase, Plus, Pencil, Trash2, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { CareerRecordDialog } from "@/components/alumni/CareerRecordDialog";
import { Button } from "@/components/ui/button";
import type { CareerRecordInput } from "@/lib/validations/career.schema";

interface CareerRecord {
  id: string;
  employment_status: "employed" | "self_employed" | "unemployed" | "ofw" | "further_study" | "retired";
  employer_name?: string;
  job_title?: string;
  industry?: string;
  employment_type?: string;
  salary_range?: string;
  start_date?: string;
  end_date?: string;
  is_current: boolean;
  country: string;
  city?: string;
  job_description?: string;
  created_at: string;
}

const SALARY_LABELS: Record<string, string> = {
  below_15k: "Below ₱15k",
  "15k_25k": "₱15k–₱25k",
  "25k_35k": "₱25k–₱35k",
  "35k_50k": "₱35k–₱50k",
  "50k_75k": "₱50k–₱75k",
  above_75k: "Above ₱75k",
};

const EMP_TYPE_LABELS: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contractual: "Contractual",
  freelance: "Freelance",
  internship: "Internship",
};

export default function AlumniCareerPage() {
  const [records, setRecords] = useState<CareerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<CareerRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/alumni/career");
    const { data } = await res.json();
    setRecords(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const handleSave = async (data: CareerRecordInput, id?: string) => {
    const res = await fetch(id ? `/api/alumni/career/${id}` : "/api/alumni/career", {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { toast.error("Failed to save record"); throw new Error(JSON.stringify(json.error)); }
    toast.success(id ? "Career record updated!" : "Career record added!");
    await fetchRecords();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/alumni/career/${deleteId}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete"); return; }
    toast.success("Record deleted");
    setRecords(prev => prev.filter(r => r.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Briefcase} title="Career History" description="Track and manage your professional journey">
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90"
          onClick={() => { setEditRecord(null); setDialogOpen(true); }}
        >
          <Plus size={14} className="mr-1.5" /> Add Record
        </Button>
      </PageHeader>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />)}
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No Career Records Yet"
          description="Start building your professional history by adding your first career record."
          action={
            <Button size="sm" className="bg-primary" onClick={() => { setEditRecord(null); setDialogOpen(true); }}>
              <Plus size={14} className="mr-1.5" /> Add Your First Record
            </Button>
          }
        />
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border ml-0.5 hidden sm:block" />

          <div className="space-y-4">
            {records.map((record, idx) => (
              <div key={record.id} className="relative sm:pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-0 top-5 hidden sm:flex w-11 h-11 rounded-full border-2 items-center justify-center ${record.is_current ? "bg-primary border-primary" : "bg-card border-border"}`}>
                  {record.is_current ? (
                    <CheckCircle size={16} className="text-primary-foreground" />
                  ) : (
                    <Briefcase size={14} className="text-muted-foreground" />
                  )}
                </div>

                <div className={`rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md ${record.is_current ? "border-primary/30 ring-1 ring-primary/10" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={record.employment_status} />
                        {record.is_current && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mt-2">
                        {record.job_title ?? record.employment_status.replace("_", " ")}
                      </h3>
                      {record.employer_name && (
                        <p className="text-sm text-primary font-medium">{record.employer_name}</p>
                      )}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        {record.industry && <span>{record.industry}</span>}
                        {record.employment_type && <span>{EMP_TYPE_LABELS[record.employment_type]}</span>}
                        {record.salary_range && <span>{SALARY_LABELS[record.salary_range]}</span>}
                        {record.city && <span>{record.city}, {record.country}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {record.start_date ? format(new Date(record.start_date), "MMM yyyy") : "—"}
                        {" → "}
                        {record.is_current ? "Present" : (record.end_date ? format(new Date(record.end_date), "MMM yyyy") : "—")}
                      </p>
                      {record.job_description && (
                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{record.job_description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted"
                        onClick={() => { setEditRecord(record); setDialogOpen(true); }}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteId(record.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CareerRecordDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditRecord(null); }}
        onSave={handleSave}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        editData={(editRecord as any) ?? undefined}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Career Record"
        description="Are you sure you want to delete this record? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="destructive"
      />
    </div>
  );
}
