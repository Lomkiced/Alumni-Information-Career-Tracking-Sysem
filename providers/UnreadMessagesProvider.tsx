"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface UnreadMessagesContextType {
  unreadCount: number;
  decrementUnreadCount: (amount: number) => void;
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType>({ 
  unreadCount: 0,
  decrementUnreadCount: () => {}
});

export const useUnreadMessages = () => useContext(UnreadMessagesContext);

export function UnreadMessagesProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { profile, loading } = useAuth();
  const supabase = createClient();

  const decrementUnreadCount = (amount: number) => {
    setUnreadCount((prev) => Math.max(0, prev - amount));
  };

  useEffect(() => {
    if (loading || !profile?.id) return;

    // 1. Fetch initial unread count
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/messages/unread");
        const data = await res.json();
        if (data && typeof data.count === "number") {
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch unread messages count", error);
      }
    };

    fetchUnreadCount();

    // 2. Subscribe to real-time message changes
    const channel = supabase
      .channel("global_unread_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new as { sender_id: string; is_read: boolean };
          // If a new message is inserted, it's not read, and we didn't send it, increment count
          if (!newMsg.is_read && newMsg.sender_id !== profile.id) {
            setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        () => {
          // When a message is updated (e.g. marked as read), just recalculate the total
          // to guarantee perfect synchronization.
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, loading, supabase]);

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, decrementUnreadCount }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
}
