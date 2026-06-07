"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center font-sans">
          <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mb-8 shadow-sm border border-destructive/20">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground tracking-tight mb-3">
            Critical System Error
          </h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto mb-10">
            A critical error occurred that prevented the application from loading. We have been notified and are looking into it.
          </p>
          <div className="flex gap-4">
            <Button size="lg" onClick={() => window.location.reload()} variant="outline">
              Reload Page
            </Button>
            <Button size="lg" onClick={() => reset()} className="bg-primary hover:bg-primary/90">
              Try Again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
