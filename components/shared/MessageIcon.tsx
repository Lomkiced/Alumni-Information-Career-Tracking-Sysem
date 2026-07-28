"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUnreadMessages } from "@/providers/UnreadMessagesProvider";

export function MessageIcon() {
  const { unreadCount } = useUnreadMessages();

  return (
    <Link href="/messages">
      <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground">
        <MessageCircle size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground animate-in zoom-in spin-in-2 duration-300">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
