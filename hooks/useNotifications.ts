"use client";
// hooks/useNotifications.ts
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string | null;
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

export function useNotifications(userId: string | null | undefined) {
  const supabase = createClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("notifications")
      .select("id,user_id,title,message,type,is_read,action_url,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20)
      .returns<Notification[]>();
    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.is_read).length);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
    if (!userId) return;
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` }, () => fetchNotifications())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    await supabase.from("notifications").update({ is_read: true } as never).eq("id", id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    await supabase.from("notifications").update({ is_read: true } as never).eq("user_id", userId).eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  }, [userId]);

  return { notifications, unreadCount, markAsRead, markAllAsRead, refresh: fetchNotifications };
}
