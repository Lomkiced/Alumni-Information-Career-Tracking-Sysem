"use client";
// app/(dashboard)/admin/reports/error.tsx
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
        <AlertTriangle size={28} className="text-red-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Failed to load reports</h2>
        <p className="text-sm text-muted-foreground mt-1">Something went wrong while fetching analytics data.</p>
      </div>
      <Button onClick={reset} size="sm">Try Again</Button>
    </div>
  );
}
