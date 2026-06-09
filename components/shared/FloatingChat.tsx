// components/shared/FloatingChat.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { ChatWindow } from "./ChatWindow";

export function FloatingChat() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { profile } = useAuth();
  const supabase = createClient();

  const [activeChats, setActiveChats] = useState<{ id: string; isMinimized: boolean }[]>([]);

  // Use a ref to access latest state inside the global listener without triggering reconnects
  const activeChatsRef = useRef(activeChats);
  useEffect(() => {
    activeChatsRef.current = activeChats;
  }, [activeChats]);

  // Helper to ensure we never have too many open windows going off-screen
  const enforceMaxOpenChats = (chats: { id: string; isMinimized: boolean }[], newlyOpenedId: string) => {
    const MAX_OPEN = 2; // Safely fits on standard screens without overflowing
    let newState = [...chats];
    
    // Count open chats
    const openChats = newState.filter(c => !c.isMinimized);
    if (openChats.length > MAX_OPEN) {
      // Find the oldest open chat that isn't the one we JUST opened
      const oldestOpenIndex = newState.findIndex(c => !c.isMinimized && c.id !== newlyOpenedId);
      if (oldestOpenIndex !== -1) {
        newState[oldestOpenIndex] = { ...newState[oldestOpenIndex], isMinimized: true };
      }
    }
    return newState;
  };

  useEffect(() => {
    const targetUserId = searchParams.get("chat");
    if (targetUserId && profile && targetUserId !== profile.id) {
      setActiveChats(prev => {
        let newState;
        if (prev.some(c => c.id === targetUserId)) {
          // If already open, just bring it up
          newState = prev.map(c => c.id === targetUserId ? { ...c, isMinimized: false } : c);
        } else {
          newState = [...prev, { id: targetUserId, isMinimized: false }];
        }
        return enforceMaxOpenChats(newState, targetUserId);
      });
      // Clear URL param immediately so next clicks work cleanly
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("chat");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, profile, router]);

  // Global listener for ALL incoming messages to show a toast if chat is closed or minimized
  useEffect(() => {
    if (!profile) return;
    const globalChannel = supabase
      .channel('global_messages_listener')
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMsg = payload.new;
          if (newMsg.sender_id === profile.id) return; // Ignore our own outgoing messages
          
          const chatWindow = activeChatsRef.current.find(c => c.id === newMsg.sender_id);
          
          if (!chatWindow || chatWindow.isMinimized) {
            // Show toast
            const { data } = await supabase.from('profiles').select('full_name').eq('id', newMsg.sender_id).single();
            if (data) {
              toast(`New message from ${(data as any).full_name}`, {
                action: {
                  label: "Reply",
                  onClick: () => {
                    setActiveChats(prev => {
                      let newState;
                      if (prev.some(c => c.id === newMsg.sender_id)) {
                        newState = prev.map(c => c.id === newMsg.sender_id ? { ...c, isMinimized: false } : c);
                      } else {
                        newState = [...prev, { id: newMsg.sender_id, isMinimized: false }];
                      }
                      return enforceMaxOpenChats(newState, newMsg.sender_id);
                    });
                  }
                }
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(globalChannel);
    };
  }, [profile, supabase]);

  if (activeChats.length === 0 || !profile) return null;

  const openChats = activeChats.filter(c => !c.isMinimized);
  const minimizedChats = activeChats.filter(c => c.isMinimized);

  const handleClose = (id: string) => {
    setActiveChats(prev => prev.filter(c => c.id !== id));
  };

  const handleMinimize = (id: string) => {
    setActiveChats(prev => prev.map(c => c.id === id ? { ...c, isMinimized: true } : c));
  };

  const handleMaximize = (id: string) => {
    setActiveChats(prev => {
      const newState = prev.map(c => c.id === id ? { ...c, isMinimized: false } : c);
      return enforceMaxOpenChats(newState, id);
    });
  };

  return (
    <>
      {/* Maximize/Open Windows */}
      {openChats.map((chat, idx) => (
        <ChatWindow 
          key={`open-${chat.id}`}
          targetUserId={chat.id}
          profile={profile}
          isMinimized={false}
          index={idx}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
      ))}

      {/* Minimized Bubbles (Chat Heads) */}
      {minimizedChats.map((chat, idx) => (
        <ChatWindow 
          key={`min-${chat.id}`}
          targetUserId={chat.id}
          profile={profile}
          isMinimized={true}
          index={idx}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
      ))}
    </>
  );
}
