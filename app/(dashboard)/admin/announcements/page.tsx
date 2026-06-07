"use client";
// app/(dashboard)/admin/announcements/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Megaphone, Plus, Trash2, Eye, EyeOff, MessageSquare, Pin, PinOff } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { CommentSection } from "@/components/shared/CommentSection";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button, buttonVariants } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  category: string;
  is_published: boolean;
  is_pinned: boolean;
  published_at?: string;
  expires_at?: string;
  created_at: string;
  profiles: { full_name: string };
}

const CATEGORY_COLORS: Record<string, string> = {
  general: "bg-slate-500/15 text-slate-400",
  event: "bg-blue-500/15 text-blue-400",
  job_fair: "bg-purple-500/15 text-purple-400",
  seminar: "bg-amber-500/15 text-amber-400",
  alumni_news: "bg-emerald-500/15 text-emerald-400",
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/announcements");
    const { data } = await res.json();
    setAnnouncements(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/admin/announcements/${deleteId}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete"); return; }
    toast.success("Announcement deleted");
    setAnnouncements(prev => prev.filter(a => a.id !== deleteId));
    setDeleteId(null);
  };

  const handlePublishToggle = async (id: string, currentlyPublished: boolean) => {
    const res = await fetch(`/api/admin/announcements/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !currentlyPublished }),
    });
    if (!res.ok) { toast.error("Failed to update"); return; }
    toast.success(!currentlyPublished ? "Announcement published! Alumni notified." : "Announcement unpublished");
    await fetchAnnouncements();
  };

  const handlePinToggle = async (id: string, currentlyPinned: boolean) => {
    const res = await fetch(`/api/admin/announcements/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_pinned: !currentlyPinned }),
    });
    if (!res.ok) { 
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Failed to update pin status"); 
      return; 
    }
    toast.success(!currentlyPinned ? "Announcement pinned!" : "Announcement unpinned");
    await fetchAnnouncements();
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Megaphone} title="Announcements" description="Manage and publish announcements for alumni">
        <Link href="/admin/announcements/new" className={buttonVariants({ size: "sm", className: "gap-1.5" })}>
          <Plus size={14} /> New Announcement
        </Link>
      </PageHeader>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No Announcements Yet"
          description="Create your first announcement to share with alumni."
          action={
            <Link href="/admin/announcements/new" className={buttonVariants({ size: "sm", className: "gap-1.5" })}>
              <Plus size={14} /> Create Announcement
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {announcements.map(ann => {
            const isExpanded = expandedId === ann.id;
            return (
              <div key={ann.id} className={`rounded-xl border ${ann.is_pinned ? "border-amber-500/50 bg-amber-50/10 dark:bg-amber-950/20" : "border-border bg-card"} overflow-hidden hover:shadow-sm transition-shadow`}>
                <div className="p-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {ann.is_pinned && (
                        <span className="text-xs text-amber-500 font-medium flex items-center gap-1">
                          <Pin size={10} className="fill-amber-500" /> Pinned
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[ann.category] ?? CATEGORY_COLORS.general}`}>
                        {ann.category.replace("_", " ")}
                      </span>
                      {ann.is_published ? (
                        <span className="text-xs text-emerald-500 font-medium">● Published</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">○ Draft</span>
                      )}
                    </div>
                    <p className="font-medium text-foreground truncate">{ann.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      By {ann.profiles?.full_name} · {format(new Date(ann.created_at), "MMM d, yyyy")}
                      {ann.expires_at && ` · Expires ${format(new Date(ann.expires_at), "MMM d, yyyy")}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5"
                      onClick={() => setExpandedId(isExpanded ? null : ann.id)}
                    >
                      <MessageSquare size={13} /> Discussions
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 gap-1.5 ${ann.is_pinned ? "text-amber-500 hover:bg-amber-500/10" : "text-muted-foreground"}`}
                      onClick={() => handlePinToggle(ann.id, ann.is_pinned)}
                    >
                      {ann.is_pinned ? <PinOff size={13} /> : <Pin size={13} />}
                      {ann.is_pinned ? "Unpin" : "Pin"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 gap-1.5 ${ann.is_published ? "text-muted-foreground" : "text-emerald-500 hover:bg-emerald-500/10"}`}
                      onClick={() => handlePublishToggle(ann.id, ann.is_published)}
                    >
                      {ann.is_published ? <EyeOff size={13} /> : <Eye size={13} />}
                      {ann.is_published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteId(ann.id)}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-4">
                    <CommentSection announcementId={ann.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Announcement"
        description="Are you sure you want to permanently delete this announcement?"
        confirmLabel="Delete"
        confirmVariant="destructive"
      />
    </div>
  );
}
