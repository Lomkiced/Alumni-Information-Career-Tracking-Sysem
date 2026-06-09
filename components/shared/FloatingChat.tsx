"use client";
// components/shared/FloatingChat.tsx
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, Send, Loader2, MinusSquare, MessageCircle, Check, CheckCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { formatInitials } from "@/lib/utils/format";

export function FloatingChat() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const targetUserId = searchParams.get("chat");
  const { profile } = useAuth();
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetProfile, setTargetProfile] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetUserId && profile && targetUserId !== profile.id) {
      setIsOpen(true);
      setIsMinimized(false);
      loadConversation(targetUserId);
    }
  }, [targetUserId, profile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Global listener for ALL incoming messages to show a toast if chat is closed
  useEffect(() => {
    if (!profile) return;
    
    const globalChannel = supabase
      .channel('global_messages_listener')
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const newMsg = payload.new;
          // Ignore our own messages
          if (newMsg.sender_id === profile.id) return;
          
          // If we are NOT currently chatting with this person
          if (!isOpen || newMsg.conversation_id !== conversationId) {
            // Fetch sender profile info to show toast
            const { data } = await supabase.from('profiles').select('full_name').eq('id', newMsg.sender_id).single();
            if (data) {
              toast(`New message from ${(data as any).full_name}`, {
                action: {
                  label: "Reply",
                  onClick: () => {
                    const newParams = new URLSearchParams(searchParams.toString());
                    newParams.set("chat", newMsg.sender_id);
                    router.replace(`?${newParams.toString()}`, { scroll: false });
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
  }, [profile, isOpen, conversationId, supabase, router, searchParams]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`chat_${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) => {
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) => 
            prev.map(m => m.id === payload.new.id ? payload.new : m)
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) => 
            prev.filter(m => m.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  const loadConversation = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages?userId=${userId}`);
      const json = await res.json();
      if (res.ok && json.data) {
        setConversationId(json.data.conversation.id);
        setMessages(json.data.messages || []);
        setTargetProfile(json.data.targetProfile);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setConversationId(null);
    setMessages([]);
    setTargetProfile(null);
    // Remove query param
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("chat");
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !conversationId || !profile) return;

    const tempMsg = {
      id: `temp-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: profile.id,
      content: content.trim(),
      created_at: new Date().toISOString(),
      is_read: false,
    };
    setMessages(prev => [...prev, tempMsg]);
    setContent("");
    setSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: conversationId, content: tempMsg.content })
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setMessages(prev => {
          // If Realtime already delivered this exact message ID, just drop the temp message
          if (prev.some(m => m.id === json.data.id && m.id !== tempMsg.id)) {
            return prev.filter(m => m.id !== tempMsg.id);
          }
          // Otherwise, replace the temp message with the real one
          return prev.map(m => m.id === tempMsg.id ? json.data : m);
        });
      }
    } catch (err) {
      console.error("Failed to send", err);
      // Remove temp message on failure
      setMessages(prev => prev.filter(m => m.id !== tempMsg.id));
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    // Optimistic UI update
    setMessages(prev => prev.filter(m => m.id !== messageId));
    
    try {
      const res = await fetch(`/api/messages?messageId=${messageId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Failed to delete message");
      }
    } catch (err) {
      console.error("Failed to delete message", err);
      // If we failed, we might want to reload the conversation, but for simplicity we'll just show a toast
      toast.error("Could not delete the message. It may have already been removed.");
      loadConversation(targetUserId!);
    }
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:scale-105 hover:shadow-primary/50 transition-all duration-300"
        title={`Chat with ${targetProfile?.full_name || 'Loading...'}`}
      >
        <MessageCircle size={24} />
        {messages.some(m => m.sender_id !== profile?.id && !m.is_read) && (
          <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-destructive border-2 border-primary rounded-full animate-pulse" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col bg-card border border-border shadow-2xl rounded-t-xl rounded-b-md overflow-hidden transition-all duration-300 ease-in-out h-[450px] w-80 sm:w-96">
      {/* Header */}
      <div 
        className="bg-primary text-primary-foreground p-3 flex items-center justify-between cursor-pointer shrink-0 z-10"
        onClick={() => setIsMinimized(true)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {targetProfile ? (
            <Avatar className="h-8 w-8 border border-primary-foreground/20 shrink-0">
              <AvatarImage src={targetProfile.profile_photo_url || ""} />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                {formatInitials(targetProfile.full_name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 animate-pulse shrink-0" />
          )}
          <span className="font-medium text-sm truncate">
            {targetProfile ? targetProfile.full_name : "Loading..."}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}>
            <MinusSquare size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={(e) => { e.stopPropagation(); handleClose(); }}>
            <X size={18} />
          </Button>
        </div>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1 min-h-0 p-4 bg-muted/10">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-primary opacity-50" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm mt-10">
                Send a message to start chatting!
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => {
                  const isMe = msg.sender_id === profile?.id;
                  const showAvatar = !isMe && (idx === 0 || messages[idx - 1].sender_id !== msg.sender_id);
                  
                  return (
                    <div key={msg.id} className={`flex gap-2 group ${isMe ? "justify-end" : "justify-start"}`}>
                      {!isMe && showAvatar ? (
                        <Avatar className="h-6 w-6 mt-1 shrink-0">
                          <AvatarImage src={targetProfile?.profile_photo_url || ""} />
                          <AvatarFallback className="text-[10px]">{formatInitials(targetProfile?.full_name)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-6 shrink-0" /> // spacer
                      )}
                      
                      {isMe && !msg.id.startsWith('temp-') && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive transition-all self-center rounded-full hover:bg-muted"
                          title="Unsend Message"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}

                      <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                        {isMe && (
                          <div className="flex justify-end mt-1 items-center gap-1">
                            <span className="text-[10px] opacity-70">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {msg.id.startsWith('temp-') ? (
                              <Check size={12} className="opacity-50" />
                            ) : msg.is_read ? (
                              <span title="Seen" className="flex"><CheckCheck size={14} className="text-blue-300" /></span>
                            ) : (
                              <span title="Delivered" className="flex"><Check size={12} className="opacity-90" /></span>
                            )}
                          </div>
                        )}
                        {!isMe && (
                          <div className="flex justify-start mt-1">
                            <span className="text-[10px] opacity-50">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {!isMe && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive transition-all self-center rounded-full hover:bg-muted"
                          title="Delete for me"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card shrink-0 z-10">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 rounded-full bg-muted/50 focus-visible:ring-1"
                disabled={loading || sending}
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!content.trim() || loading || sending}>
                <Send size={16} className="ml-1" />
              </Button>
            </form>
          </div>
    </div>
  );
}
