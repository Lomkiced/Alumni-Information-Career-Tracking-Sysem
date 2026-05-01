// app/(dashboard)/admin/reports/loading.tsx
export default function ReportsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-16 bg-muted/50 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => <div key={i} className="h-[120px] bg-muted/50 rounded-2xl animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {[...Array(4)].map((_, i) => <div key={i} className="h-[320px] bg-muted/50 rounded-xl animate-pulse" />)}
      </div>
      <div className="h-[320px] bg-muted/50 rounded-xl animate-pulse" />
    </div>
  );
}
