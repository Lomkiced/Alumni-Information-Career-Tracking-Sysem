"use client";
// app/(dashboard)/admin/audit-logs/page.tsx
import { useState, useEffect, useCallback } from "react";
import { ScrollText, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  created_at: string;
  profiles: { full_name: string; email: string; role: string } | null;
}

const ACTION_TYPES = [
  "CREATE_CAREER_RECORD",
  "UPDATE_CAREER_RECORD",
  "DELETE_CAREER_RECORD",
  "APPROVE_EMPLOYER",
  "REJECT_EMPLOYER",
  "APPROVE_JOB",
  "REJECT_JOB",
  "CREATE_JOB",
  "CREATE_ANNOUNCEMENT",
  "UPDATE_ANNOUNCEMENT",
  "UPDATE_PROFILE",
];

const ACTION_COLORS: Record<string, string> = {
  APPROVE_EMPLOYER: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  APPROVE_JOB: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  REJECT_EMPLOYER: "bg-red-500/10 text-red-500 border-red-500/20",
  REJECT_JOB: "bg-red-500/10 text-red-500 border-red-500/20",
  DELETE_CAREER_RECORD: "bg-red-500/10 text-red-500 border-red-500/20",
  CREATE_JOB: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  CREATE_CAREER_RECORD: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  CREATE_ANNOUNCEMENT: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  UPDATE_ANNOUNCEMENT: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [action, setAction] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (action) params.set("action", action);
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);
    const res = await fetch(`/api/admin/audit-logs?${params}`);
    if (res.ok) {
      const { data, count } = await res.json();
      setLogs(data ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [page, limit, action, dateFrom, dateTo]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  return (
    <div className="space-y-6">
      <PageHeader icon={ScrollText} title="Audit Logs" description="Complete record of all system actions and mutations" />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={action} onValueChange={v => { setAction(v === "all" ? "" : (v || "")); setPage(1); }}>
          <SelectTrigger className="w-[220px]">
            <Filter size={14} className="mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {ACTION_TYPES.map(a => (
              <SelectItem key={a} value={a}>{a.replace(/_/g, " ")}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateFrom}
            onChange={e => { setDateFrom(e.target.value); setPage(1); }}
            className="w-[160px] text-sm"
            placeholder="From date"
          />
          <span className="text-muted-foreground text-sm">to</span>
          <Input
            type="date"
            value={dateTo}
            onChange={e => { setDateTo(e.target.value); setPage(1); }}
            className="w-[160px] text-sm"
            placeholder="To date"
          />
        </div>

        {(action || dateFrom || dateTo) && (
          <Button variant="ghost" size="sm" onClick={() => { setAction(""); setDateFrom(""); setDateTo(""); setPage(1); }}>
            Clear Filters
          </Button>
        )}
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <EmptyState icon={ScrollText} title="No Audit Logs" description="No system actions have been recorded yet." />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_2fr_1.5fr_1.5fr_1fr] gap-3 px-4 py-3 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Timestamp</span>
            <span>User</span>
            <span>Action</span>
            <span>Table</span>
            <span>Record</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {logs.map(log => (
              <div
                key={log.id}
                className="grid grid-cols-[1fr_2fr_1.5fr_1.5fr_1fr] gap-3 px-4 py-3 items-center hover:bg-muted/20 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(log.created_at), "MMM d, yyyy")}
                  </p>
                  <p className="text-[11px] text-muted-foreground/60">
                    {format(new Date(log.created_at), "h:mm a")}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {log.profiles?.full_name ?? "System"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {log.profiles?.email ?? log.user_id}
                  </p>
                </div>

                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ACTION_COLORS[log.action] ?? "bg-muted text-muted-foreground border-border"}`}>
                    {log.action.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground font-mono truncate">
                  {log.table_name ?? "—"}
                </p>

                <p className="text-xs text-muted-foreground font-mono truncate">
                  {log.record_id ? log.record_id.slice(0, 8) + "…" : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {total > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3">
            <span>Showing {((page - 1) * limit) + 1}–{Math.min(page * limit, total)} of {total} logs</span>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <Select value={String(limit)} onValueChange={(v) => { setLimit(Number(v)); setPage(1); }}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1} className="h-8">
              <ChevronLeft size={14} className="mr-1" /> Previous
            </Button>
            <div className="flex items-center px-2 font-medium text-foreground text-xs">
              Page {page} of {Math.ceil(total / limit)}
            </div>
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page * limit >= total} className="h-8">
              Next <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
