import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-8 shadow-sm border border-border">
        <SearchX className="w-10 h-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold font-heading text-foreground tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
        Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
      </p>
      <Link href="/">
        <Button size="lg" className="px-8 shadow-sm">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
