"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Loader2, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatInitials } from "@/lib/utils/format";

import { Suspense } from "react";

function MessagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/messages/conversations");
      const json = await res.json();
      if (res.ok && json.data) {
        setConversations(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  const openChat = (userId: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("chat", userId);
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <MessageCircle className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground text-sm">Your active conversations</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary opacity-50 w-8 h-8" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border shadow-sm">
          <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground">No messages yet</h3>
          <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
            When you contact alumni or employers, your conversations will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden divide-y divide-border">
          {conversations.map((conv) => {
            const user = conv.otherUser;
            const latest = conv.latestMessage;
            return (
              <div 
                key={conv.id}
                onClick={() => openChat(user.id)}
                className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors relative"
              >
                <Avatar className="w-12 h-12 shrink-0 border border-border">
                  <AvatarImage src={user.profile_photo_url || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {formatInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground truncate pr-4">
                      {user.full_name}
                      <span className="ml-2 text-xs font-normal text-muted-foreground px-2 py-0.5 rounded-full bg-muted border border-border capitalize">
                        {user.role}
                      </span>
                    </h4>
                    {latest && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {formatDistanceToNow(new Date(latest.created_at), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm truncate ${conv.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {latest ? latest.content : "No messages yet"}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary opacity-50 w-8 h-8" />
      </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}
