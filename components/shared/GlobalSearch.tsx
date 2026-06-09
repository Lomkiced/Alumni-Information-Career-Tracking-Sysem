"use client";
// components/shared/GlobalSearch.tsx
import { useState, useEffect, useRef } from "react";
import { Search, Loader2, User, Building, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatInitials } from "@/lib/utils/format";
import { useRouter } from "next/navigation";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        setResults(json.data || []);
        setOpen(true);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleResultClick = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/network/${id}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto hidden md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for alumni, employers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.trim().length >= 2) setOpen(true); }}
          className="w-full pl-9 bg-muted/50 border-border/50 focus-visible:bg-background rounded-full"
        />
        {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
      </div>
      
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-popover rounded-xl border border-border shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {results.map((r) => (
              <div
                key={r.id}
                onClick={() => handleResultClick(r.id)}
                className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/50 last:border-0"
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={r.profile_photo_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {formatInitials(r.full_name || (r.role === "employer" ? r.employer?.company_name : "?"))}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {r.full_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                    {r.role === "employer" ? (
                      <><Building size={12} /> Employer {r.employer?.company_name ? `· ${r.employer.company_name}` : ""}</>
                    ) : r.role === "alumni" ? (
                      <><GraduationCap size={12} /> Alumni {r.alumni?.course ? `· ${r.alumni.course}` : ""}</>
                    ) : (
                      <><User size={12} /> <span className="capitalize">{r.role}</span></>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {open && results.length === 0 && !loading && query.trim().length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-popover rounded-xl border shadow-lg p-4 text-center z-50">
          <p className="text-sm text-muted-foreground">No profiles found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
