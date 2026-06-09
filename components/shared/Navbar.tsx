"use client";
// components/shared/Navbar.tsx
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Sidebar } from "@/components/shared/Sidebar";
import { GlobalSearch } from "@/components/shared/GlobalSearch";
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
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-background/95 backdrop-blur-sm px-4 lg:px-8">
        {/* Mobile hamburger */}
        <Button
          id="mobile-menu-button"
          variant="ghost"
          size="sm"
          className="lg:hidden h-10 w-10 p-0 text-muted-foreground"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </Button>

        {/* Page title */}
        {title && (
          <div className="flex-1 shrink-0">
            <h1 className="font-heading font-semibold text-lg text-foreground">{title}</h1>
          </div>
        )}
        {!title && <div className="flex-1 shrink-0" />}

        {/* Global Search */}
        <div className="flex-1 flex justify-center max-w-2xl w-full">
          <GlobalSearch />
        </div>

        {/* Right actions */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <NotificationBell userId={profile?.id} />
          <Avatar className="h-10 w-10 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all">
            <AvatarImage src={profile?.profile_photo_url || undefined} alt={profile?.full_name || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
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
