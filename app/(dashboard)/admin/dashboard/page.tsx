"use client";
// app/(dashboard)/admin/dashboard/page.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users, Building2, Briefcase, FileCheck, TrendingUp,
  LayoutDashboard, ChevronRight, Clock, AlertCircle,
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SummaryStats {
  totalAlumni: number;
  approvedEmployers: number;
  activeJobPostings: number;
  totalApplications: number;
  overallEmploymentRate: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then(r => r.json())
      .then(({ summaryStats }) => {
        setStats(summaryStats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const quickActions = [
    { href: "/admin/employers", label: "Review Employer Applications", icon: Building2, color: "text-amber-500", description: "Approve or reject pending employers" },
    { href: "/admin/jobs", label: "Moderate Job Postings", icon: Briefcase, color: "text-violet-500", description: "Approve or reject job postings" },
    { href: "/admin/alumni", label: "Manage Alumni Records", icon: Users, color: "text-cyan-500", description: "Search, filter, and export alumni data" },
    { href: "/admin/announcements/new", label: "Create Announcement", icon: AlertCircle, color: "text-emerald-500", description: "Publish an update to all alumni" },
    { href: "/admin/reports", label: "View Full Analytics", icon: TrendingUp, color: "text-blue-500", description: "Charts, reports, and PDF export" },
    { href: "/admin/audit-logs", label: "Audit Logs", icon: Clock, color: "text-slate-400", description: "Review all system activity" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        icon={LayoutDashboard}
        title="Admin Dashboard"
        description="AICTS Administrative Control Center — Polytechnic College of La Union"
      >
        <Link href="/admin/reports" className={cn(buttonVariants({ size: "sm" }), "bg-primary hover:bg-primary/90")}>
          <TrendingUp size={14} className="mr-1.5" /> Full Analytics
        </Link>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Alumni"
          value={loading ? "—" : stats?.totalAlumni ?? 0}
          icon={Users}
          color="blue"
          description="Registered graduates"
          loading={loading}
        />
        <StatsCard
          title="Approved Employers"
          value={loading ? "—" : stats?.approvedEmployers ?? 0}
          icon={Building2}
          color="green"
          description="Verified companies"
          loading={loading}
        />
        <StatsCard
          title="Active Job Posts"
          value={loading ? "—" : stats?.activeJobPostings ?? 0}
          icon={Briefcase}
          color="amber"
          description="Live on job board"
          loading={loading}
        />
        <StatsCard
          title="Employment Rate"
          value={loading ? "—" : `${stats?.overallEmploymentRate ?? 0}%`}
          icon={TrendingUp}
          color="purple"
          description="Based on current records"
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map(({ href, label, icon: Icon, color, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all duration-200"
            >
              <div className={cn("w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", color)}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity note */}
      <div className="rounded-xl border border-border bg-card/60 p-5">
        <div className="flex items-center gap-3 mb-2">
          <FileCheck size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">System Status</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          All systems operational. Visit <Link href="/admin/reports" className="text-primary hover:underline font-medium">Reports & Analytics</Link> for full charts, or <Link href="/admin/audit-logs" className="text-primary hover:underline font-medium">Audit Logs</Link> to review recent administrative actions.
        </p>
      </div>
    </div>
  );
}
