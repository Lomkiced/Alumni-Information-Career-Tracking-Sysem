"use client";
// app/(dashboard)/alumni/announcements/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Megaphone, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  published_at: string;
  expires_at?: string;
  profiles: { full_name: string };
}

const CATEGORIES = ["general", "event", "job_fair", "seminar", "alumni_news"] as const;

const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  general:    { label: "General",        color: "bg-slate-500/15 text-slate-400 border-slate-500/20" },
  event:      { label: "Event",          color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  job_fair:   { label: "Job Fair",       color: "bg-purple-500/15 text-purple-400 border-purple-500/20" },
  seminar:    { label: "Seminar",        color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  alumni_news:{ label: "Alumni News",    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
};

export default function AlumniAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (category) params.set("category", category);
    const res = await fetch(`/api/alumni/announcements?${params}`);
    const { data, count } = await res.json();
    setAnnouncements(data ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [page, category]);

  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);

  return (
    <div className="space-y-6">
      <PageHeader icon={Megaphone} title="Announcements" description="Stay updated with the latest news from PCLU" />

      {/* Category Filter */}
      <div className="flex items-center gap-3">
        <Select value={category} onValueChange={v => { setCategory(v === "all" ? "" : (v || "")); setPage(1); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(c => <SelectItem key={c} value={c}>{CATEGORY_CONFIG[c].label}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{total} announcement{total !== 1 ? "s" : ""}</span>
      </div>

      {/* Announcements */}
      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : announcements.length === 0 ? (
        <EmptyState icon={Megaphone} title="No Announcements" description="There are no announcements at the moment. Check back later!" />
      ) : (
        <>
          <div className="space-y-4">
            {announcements.map(ann => {
              const cfg = CATEGORY_CONFIG[ann.category] ?? CATEGORY_CONFIG.general;
              const isExpanded = expandedId === ann.id;
              return (
                <div key={ann.id} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-sm transition-shadow">
                  {/* Image */}
                  {ann.image_url && (
                    <img src={ann.image_url} alt={ann.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${cfg.color}`}>
                            {cfg.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(ann.published_at), "MMMM d, yyyy")}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground text-base">{ann.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Posted by {ann.profiles?.full_name}</p>

                        <div className={`mt-3 text-sm text-muted-foreground leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}>
                          {ann.content}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ann.id)}
                      className="flex items-center gap-1 mt-3 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {isExpanded ? <><ChevronUp size={13} />Show Less</> : <><ChevronDown size={13} />Read More</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {total > 10 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {((page - 1) * 10) + 1}–{Math.min(page * 10, total)} of {total}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page * 10 >= total}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
