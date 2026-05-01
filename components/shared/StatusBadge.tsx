// components/shared/StatusBadge.tsx
import { cn } from "@/lib/utils";

type EmploymentStatus = "employed" | "self_employed" | "unemployed" | "ofw" | "further_study" | "retired";
type ApprovalStatus = "pending" | "approved" | "rejected";
type JobStatus = "pending" | "active" | "expired" | "closed" | "rejected";
type ApplicationStatus = "pending" | "viewed" | "shortlisted" | "for_interview" | "hired" | "rejected";

type StatusType = EmploymentStatus | ApprovalStatus | JobStatus | ApplicationStatus;

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  // Employment
  employed:       { label: "Employed",       className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  self_employed:  { label: "Self-Employed",  className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  unemployed:     { label: "Unemployed",     className: "bg-red-500/15 text-red-400 border-red-500/30" },
  ofw:            { label: "OFW",            className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  further_study:  { label: "Further Study",  className: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  retired:        { label: "Retired",        className: "bg-slate-500/15 text-slate-400 border-slate-500/30" },
  // Approval / Job
  pending:        { label: "Pending",        className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  approved:       { label: "Approved",       className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  rejected:       { label: "Rejected",       className: "bg-red-500/15 text-red-400 border-red-500/30" },
  active:         { label: "Active",         className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  expired:        { label: "Expired",        className: "bg-slate-500/15 text-slate-400 border-slate-500/30" },
  closed:         { label: "Closed",         className: "bg-slate-500/15 text-slate-400 border-slate-500/30" },
  // Application
  viewed:         { label: "Viewed",         className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  shortlisted:    { label: "Shortlisted",    className: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  for_interview:  { label: "For Interview",  className: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
  hired:          { label: "Hired",          className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
};

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { label: status, className: "bg-slate-500/15 text-slate-400 border-slate-500/30" };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
