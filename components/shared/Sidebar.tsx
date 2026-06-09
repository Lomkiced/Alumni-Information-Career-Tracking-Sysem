"use client";
// components/shared/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User, Briefcase, Megaphone, LayoutDashboard, Users,
  Building2, FileText, BarChart3, ScrollText, Award,
  PlusCircle, UserCheck, ChevronRight, LogOut, X, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatInitials } from "@/lib/utils/format";

const ALUMNI_MENU = [
  { href: "/alumni/profile", icon: User, label: "My Profile" },
  { href: "/alumni/career", icon: Briefcase, label: "Career History" },
  { href: "/alumni/jobs", icon: FileText, label: "Job Board" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/alumni/announcements", icon: Megaphone, label: "Announcements" },
];

const EMPLOYER_MENU = [
  { href: "/employer/jobs", icon: Briefcase, label: "My Job Postings" },
  { href: "/employer/applicants", icon: UserCheck, label: "Applicants" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/employer/profile", icon: Building2, label: "Company Profile" },
  { href: "/employer/announcements", icon: Megaphone, label: "Announcements" },
];

const ADMIN_MENU = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/alumni", icon: Users, label: "Alumni" },
  { href: "/admin/employers", icon: Building2, label: "Employers" },
  { href: "/admin/jobs", icon: Briefcase, label: "Job Moderation" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/admin/reports", icon: BarChart3, label: "Reports & Analytics" },
  { href: "/admin/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/admin/audit-logs", icon: ScrollText, label: "Audit Logs" },
];

const ROLE_MENUS: Record<string, typeof ALUMNI_MENU> = {
  alumni: ALUMNI_MENU,
  employer: EMPLOYER_MENU,
  admin: ADMIN_MENU,
};

const ROLE_LABELS: Record<string, string> = {
  alumni: "Alumni Portal",
  employer: "Employer Portal",
  admin: "Admin Portal",
};

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { profile, loading, signOut } = useAuth();
  
  if (loading) {
    return (
      <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground p-4 animate-pulse">
        <div className="h-10 bg-sidebar-accent rounded-lg mb-6" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-sidebar-accent rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const role = profile?.role ?? "alumni";
  const menu = ROLE_MENUS[role] ?? ALUMNI_MENU;

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center shadow-sm">
            <Award size={20} className="text-sidebar-primary-foreground" />
          </div>
          <div>
            <p className="text-sidebar-foreground font-bold text-base leading-none">AICTS</p>
            <p className="text-sidebar-primary text-xs font-medium mt-1">{ROLE_LABELS[role]}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {menu.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon size={20} className={cn("shrink-0", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground")} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={16} className="opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <Avatar className="h-10 w-10 ring-2 ring-sidebar-primary/40">
            <AvatarImage src={profile?.profile_photo_url || undefined} alt={profile?.full_name || undefined} />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
              {formatInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-foreground text-base font-medium truncate">{profile?.full_name ?? "Loading..."}</p>
            <p className="text-sidebar-foreground/50 text-sm truncate">{profile?.email ?? ""}</p>
          </div>
        </div>
        <Button
          onClick={signOut}
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2.5 text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/10 px-3"
        >
          <LogOut size={18} />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
