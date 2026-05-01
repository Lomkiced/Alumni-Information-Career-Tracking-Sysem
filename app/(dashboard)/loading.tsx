// app/(dashboard)/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-5 w-40 bg-muted animate-pulse rounded" />
          <div className="h-3 w-64 bg-muted animate-pulse rounded" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}
