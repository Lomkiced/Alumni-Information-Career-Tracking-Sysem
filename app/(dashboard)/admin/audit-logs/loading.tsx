// app/(dashboard)/admin/audit-logs/loading.tsx
export default function AuditLogsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-16 bg-muted/50 rounded-2xl animate-pulse" />
      <div className="flex gap-3">
        <div className="h-10 w-[220px] bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-10 w-[360px] bg-muted/50 rounded-lg animate-pulse" />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="h-12 bg-muted animate-pulse" />
        {[...Array(8)].map((_, i) => <div key={i} className="h-14 border-t border-border bg-muted/20 animate-pulse" />)}
      </div>
    </div>
  );
}
