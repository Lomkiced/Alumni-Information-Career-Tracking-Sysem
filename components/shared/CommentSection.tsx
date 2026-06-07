"use client";

import { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Send, Trash2, Reply, CornerDownRight, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatInitials } from "@/lib/utils/format";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CommentProfile {
  full_name: string;
  profile_photo_url: string | null;
  role: string;
}

export interface Comment {
  id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  user_id: string;
  profiles: CommentProfile;
}

interface CommentSectionProps {
  announcementId: string;
}

export function CommentSection({ announcementId }: CommentSectionProps) {
  const { profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/announcements/${announcementId}/comments`);
      if (res.ok) {
        const { data } = await res.json();
        setComments(data ?? []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [announcementId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (parentId: string | null = null) => {
    const text = parentId ? newComment : newComment; // In a more complex setup, we'd have separate states for replies
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/announcements/${announcementId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, parent_id: parentId }),
      });

      if (res.ok) {
        const { data } = await res.json();
        setComments((prev) => [...prev, data]);
        setNewComment("");
        setReplyingTo(null);
        toast.success("Comment posted");
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Failed to post comment");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const res = await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId && c.parent_id !== commentId));
        toast.success("Comment deleted");
      } else {
        const json = await res.json();
        toast.error(json.error ?? "Failed to delete comment");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  // Organize comments into a tree (1 level deep for simplicity: parent -> children)
  const rootComments = comments.filter((c) => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter((c) => c.parent_id === parentId);

  const renderComment = (comment: Comment, isReply = false) => {
    const isOwner = profile?.id === comment.user_id;
    const isAdmin = profile?.role === "admin";
    const canDelete = isOwner || isAdmin;
    const isAuthorEmployer = comment.profiles?.role === "employer";
    const isAuthorAdmin = comment.profiles?.role === "admin";

    return (
      <div key={comment.id} className={`flex gap-3 ${isReply ? "mt-4 ml-8 relative" : "mt-6"}`}>
        {isReply && (
          <div className="absolute -left-5 top-4 border-l-2 border-b-2 border-border w-4 h-4 rounded-bl-xl opacity-50" />
        )}
        
        <Avatar className={`shrink-0 ${isReply ? "w-8 h-8" : "w-10 h-10"} ring-2 ring-background`}>
          <AvatarImage src={comment.profiles?.profile_photo_url ?? ""} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {formatInitials(comment.profiles?.full_name ?? "Unknown User")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted/40 rounded-2xl px-4 py-3 border border-border/50 relative group">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-foreground">
                  {comment.profiles?.full_name ?? "Unknown User"}
                </span>
                {isAuthorAdmin && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-primary/10 text-primary">Admin</span>
                )}
                {isAuthorEmployer && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600">Employer</span>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              
              {canDelete && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors outline-none cursor-pointer flex items-center justify-center">
                      <MoreVertical size={14} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => handleDelete(comment.id)}>
                        <Trash2 size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            
            <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {comment.content}
            </p>
          </div>

          {!isReply && (
            <div className="mt-1.5 ml-2">
              <button 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Reply size={12} /> Reply
              </button>
            </div>
          )}

          {/* Reply Input */}
          {replyingTo === comment.id && !isReply && (
            <div className="mt-3 flex gap-3 animate-in fade-in slide-in-from-top-2">
              <Avatar className="shrink-0 w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {formatInitials(profile?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Textarea 
                  autoFocus
                  placeholder={`Reply to ${comment.profiles?.full_name ?? "User"}...`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-y text-sm bg-background border-primary/20 focus-visible:ring-primary/30"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(comment.id);
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex gap-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => { setReplyingTo(null); setNewComment(""); }}>
                    Cancel
                  </Button>
                  <Button size="sm" className="h-7 px-3 text-xs gap-1.5" onClick={() => handleSubmit(comment.id)} disabled={!newComment.trim() || submitting}>
                    {submitting ? "Replying..." : "Reply"} <Send size={12} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Render nested replies */}
          {!isReply && getReplies(comment.id).map(reply => renderComment(reply, true))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6 pt-6 border-t border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={18} className="text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">Discussion <span className="text-muted-foreground font-normal text-sm">({comments.length})</span></h3>
      </div>

      {/* Main Comment Input */}
      {replyingTo === null && (
        <div className="flex gap-3 mb-8">
          <Avatar className="shrink-0 w-10 h-10 ring-2 ring-background">
            <AvatarImage src={profile?.profile_photo_url ?? ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {formatInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 relative group">
            <Textarea 
              placeholder="Join the conversation..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-y text-sm bg-card transition-all focus-visible:ring-primary/30"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(null);
                }
              }}
            />
            <div className="absolute right-3 bottom-3 opacity-0 group-focus-within:opacity-100 transition-opacity flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground hidden sm:inline-block">Press Enter to post</span>
              <Button size="sm" className="h-8 gap-1.5 shadow-sm" onClick={() => handleSubmit(null)} disabled={!newComment.trim() || submitting}>
                {submitting ? "Posting..." : "Post"} <Send size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-20 bg-muted rounded-2xl w-full" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : rootComments.length === 0 ? (
        <div className="text-center py-10 px-4 bg-muted/20 rounded-2xl border border-dashed border-border">
          <MessageSquare size={32} className="mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-foreground">No comments yet</p>
          <p className="text-xs text-muted-foreground mt-1">Be the first to start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rootComments.map(c => renderComment(c))}
        </div>
      )}
    </div>
  );
}
