"use client";
// components/shared/NotificationBell.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { Bell, Check, CheckCheck, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

const TYPE_COLORS: Record<string, string> = {
  job_application: "bg-blue-500",
  job_status: "bg-violet-500",
  announcement: "bg-amber-500",
  account: "bg-emerald-500",
  career: "bg-cyan-500",
};

interface NotificationBellProps {
  userId?: string;
}

export function NotificationBell({ userId }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const res = await fetch("/api/notifications");
    if (res.ok) {
      const { data } = await res.json();
      setNotifications(data ?? []);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
    // Poll every 60 seconds
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const markOne = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    await fetch(`/api/notifications/${id}`, { method: "PATCH" });
  };

  const markAll = async () => {
    setMarkingAll(true);
    await fetch("/api/notifications", { method: "PATCH" });
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setMarkingAll(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        id="notification-bell"
        onClick={() => { setOpen(o => !o); if (!open) fetchNotifications(); }}
        className="relative h-9 w-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-32px)] z-50 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-primary" />
              <span className="font-semibold text-sm text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAll}
                  disabled={markingAll}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
                >
                  {markingAll ? <Loader2 size={11} className="animate-spin" /> : <CheckCheck size={11} />}
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Loader2 size={20} className="animate-spin" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <Bell size={28} className="mb-2 opacity-30" />
                <p className="text-sm font-medium">No notifications yet</p>
                <p className="text-xs mt-0.5">You're all caught up!</p>
              </div>
            ) : (
              <div>
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={cn(
                      "flex gap-3 px-4 py-3 border-b border-border/50 transition-colors group",
                      !n.is_read ? "bg-primary/5 hover:bg-primary/8" : "hover:bg-muted/30"
                    )}
                  >
                    {/* Type indicator */}
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", TYPE_COLORS[n.type] ?? "bg-slate-400")} />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {n.action_url ? (
                        <Link
                          href={n.action_url}
                          onClick={() => { markOne(n.id); setOpen(false); }}
                          className="block"
                        >
                          <p className={cn("text-sm leading-snug", !n.is_read ? "font-semibold text-foreground" : "font-medium text-muted-foreground")}>
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                        </Link>
                      ) : (
                        <>
                          <p className={cn("text-sm leading-snug", !n.is_read ? "font-semibold text-foreground" : "font-medium text-muted-foreground")}>
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                        </>
                      )}
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        {format(new Date(n.created_at), "MMM d, h:mm a")}
                      </p>
                    </div>

                    {/* Mark read button */}
                    {!n.is_read && (
                      <button
                        onClick={() => markOne(n.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-1 rounded hover:bg-primary/10 text-primary"
                        title="Mark as read"
                      >
                        <Check size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-2.5 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">Showing last {notifications.length} notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
