"use client";
// app/(dashboard)/error.tsx
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[DashboardError]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
        <AlertTriangle size={28} className="text-destructive" />
      </div>
      <h2 className="font-heading font-semibold text-foreground text-xl">Something went wrong</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mt-2 font-mono">Error ID: {error.digest}</p>
      )}
      <Button onClick={reset} className="mt-6 bg-primary hover:bg-primary/90">
        Try Again
      </Button>
    </div>
  );
}
