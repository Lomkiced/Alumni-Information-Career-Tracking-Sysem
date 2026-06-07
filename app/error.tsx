"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Sentry here
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight mb-2">
        Something went wrong!
      </h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        We apologize for the inconvenience. An unexpected error has occurred while loading this page.
      </p>
      <div className="flex items-center gap-3">
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh Page
        </Button>
        <Button onClick={() => reset()} className="bg-primary hover:bg-primary/90">
          Try Again
        </Button>
      </div>
    </div>
  );
}
