"use client";
// components/shared/Navbar.tsx
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Sidebar } from "@/components/shared/Sidebar";
import { formatInitials } from "@/lib/utils/format";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/60 bg-background/95 backdrop-blur-sm px-4 lg:px-6">
        {/* Mobile hamburger */}
        <Button
          id="mobile-menu-button"
          variant="ghost"
          size="sm"
          className="lg:hidden h-8 w-8 p-0 text-muted-foreground"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={18} />
        </Button>

        {/* Page title */}
        {title && (
          <div className="flex-1">
            <h1 className="font-heading font-semibold text-base text-foreground">{title}</h1>
          </div>
        )}
        {!title && <div className="flex-1" />}

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <NotificationBell userId={profile?.id} />
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all">
            <AvatarImage src={profile?.profile_photo_url ?? ""} alt={profile?.full_name ?? ""} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {formatInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Mobile sidebar sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r-0">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
