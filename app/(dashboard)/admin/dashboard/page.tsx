"use client";
// app/(dashboard)/admin/dashboard/page.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Users, Building2, Briefcase, TrendingUp, AlertCircle,
  Clock, LayoutDashboard, ChevronRight, ScrollText, UserPlus, FileEdit, Trash2, Mail
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from "recharts";

interface SummaryStats {
  totalAlumni: number;
  approvedEmployers: number;
  activeJobPostings: number;
  totalApplications: number;
  overallEmploymentRate: number;
}

interface AuditLog {
  id: string;
  action: string;
  created_at: string;
  profiles: { full_name: string; role: string };
}

interface ChartData {
  employmentStatusBreakdown: any[];
  employmentByBatchYear: any[];
}

const PIE_COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e", "#64748b"];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [charts, setCharts] = useState<ChartData | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/reports").then(r => r.json()),
      fetch("/api/admin/audit-logs?limit=5").then(r => r.json())
    ]).then(([reportsData, auditData]) => {
      setStats(reportsData.summaryStats);
      setCharts({
        employmentStatusBreakdown: reportsData.employmentStatusBreakdown,
        employmentByBatchYear: reportsData.employmentByBatchYear
      });
      setAuditLogs(auditData.data || []);
      setLoading(false);
    }).catch(error => {
      console.error("Dashboard fetch error:", error);
      setLoading(false);
    });
  }, []);

  const quickActions = [
    { href: "/admin/employers", label: "Review Employers", icon: Building2, color: "text-amber-500", glow: "group-hover:bg-amber-500/10" },
    { href: "/admin/jobs", label: "Moderate Jobs", icon: Briefcase, color: "text-violet-500", glow: "group-hover:bg-violet-500/10" },
    { href: "/admin/alumni", label: "Manage Alumni", icon: Users, color: "text-cyan-500", glow: "group-hover:bg-cyan-500/10" },
    { href: "/admin/announcements/new", label: "New Announcement", icon: AlertCircle, color: "text-emerald-500", glow: "group-hover:bg-emerald-500/10" },
  ];

  const getActionIcon = (action: string) => {
    if (action.includes("CREATE") || action.includes("APPROVE")) return <UserPlus size={14} className="text-emerald-500" />;
    if (action.includes("UPDATE") || action.includes("EDIT")) return <FileEdit size={14} className="text-amber-500" />;
    if (action.includes("DELETE") || action.includes("REVOKE") || action.includes("REJECT")) return <Trash2 size={14} className="text-red-500" />;
    if (action.includes("MESSAGE") || action.includes("EMAIL")) return <Mail size={14} className="text-blue-500" />;
    return <ScrollText size={14} className="text-muted-foreground" />;
  };

  const getActionFormat = (action: string) => {
    return action.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          icon={LayoutDashboard}
          title="Command Center"
          description="AICTS Central Administrative Dashboard"
        />
        <Link href="/admin/reports" className={cn(buttonVariants({ size: "default" }), "bg-pclu-sky-600 hover:bg-pclu-sky-700 shadow-md shadow-pclu-sky-500/20")}>
          <TrendingUp size={16} className="mr-2" /> Full Analytics
        </Link>
      </div>

      {/* High-End Stats Grid */}
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Live Analytics (Charts) - Spans 2 Columns */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pclu-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center gap-2 relative z-10">
              <TrendingUp className="text-pclu-sky-500" size={20} /> System Analytics Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {/* Pie Chart: Employment Status */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">Employment Status</h3>
                {loading ? (
                  <div className="h-[250px] flex items-center justify-center">
                    <Skeleton className="w-[200px] h-[200px] rounded-full" />
                  </div>
                ) : (
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={charts?.employmentStatusBreakdown?.filter(d => d.count > 0)}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                          nameKey="label"
                          stroke="none"
                        >
                          {charts?.employmentStatusBreakdown?.filter(d => d.count > 0).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {/* Custom Legend */}
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {charts?.employmentStatusBreakdown?.filter(d => d.count > 0).map((entry, index) => (
                    <div key={entry.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                      {entry.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart: Employment Rate by Batch */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">Employment Rate by Batch</h3>
                {loading ? (
                  <div className="h-[250px] w-full flex items-end gap-2 pb-4">
                    <Skeleton className="w-full h-1/2" /><Skeleton className="w-full h-full" /><Skeleton className="w-full h-3/4" /><Skeleton className="w-full h-1/4" />
                  </div>
                ) : (
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={charts?.employmentByBatchYear?.slice(-5)}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="batch_year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                        <RechartsTooltip 
                          cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="employed_pct" name="Employed %" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Command Center Actions & Feed */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-3">
              {quickActions.map(({ href, label, icon: Icon, color, glow }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 overflow-hidden",
                    glow
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon size={24} className={cn("transition-transform group-hover:scale-110 relative z-10", color)} />
                  <span className="text-xs font-semibold text-foreground text-center relative z-10">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Live System Activity (Audit Logs) */}
          <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden flex flex-col h-[350px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pclu-yellow-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Clock size={16} /> Live System Feed
              </h2>
              <Link href="/admin/audit-logs" className="text-xs text-pclu-sky-500 hover:underline flex items-center">
                View all <ChevronRight size={12} />
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 relative z-10 custom-scrollbar">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-muted shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-3/4 bg-muted rounded" />
                      <div className="h-2 w-1/2 bg-muted rounded" />
                    </div>
                  </div>
                ))
              ) : auditLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                  <ScrollText size={32} className="mb-2" />
                  <p className="text-sm">No recent activity</p>
                </div>
              ) : (
                auditLogs.map((log, index) => (
                  <div key={log.id} className="relative flex gap-3 group">
                    {/* Timeline connecting line */}
                    {index !== auditLogs.length - 1 && (
                      <div className="absolute top-8 left-4 w-px h-full bg-border -ml-px group-hover:bg-primary/20 transition-colors" />
                    )}
                    
                    <div className="relative z-10 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 shadow-sm">
                      {getActionIcon(log.action)}
                    </div>
                    
                    <div className="flex-1 min-w-0 pb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {log.profiles?.full_name || "System"} <span className="font-normal text-muted-foreground">performed</span> {getActionFormat(log.action)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
