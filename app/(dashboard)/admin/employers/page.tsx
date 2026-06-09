"use client";
// app/(dashboard)/admin/employers/page.tsx
import { useState, useEffect, useCallback } from "react";
import { Building2, Search, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAdminClient } from "@/lib/supabase/server";

interface Employer {
  id: string;
  company_name: string;
  industry: string;
  company_size?: string;
  approval_status: string;
  created_at: string;
  approved_at?: string;
  rejection_reason?: string;
  profiles: { full_name: string; email: string };
}

const FILTER_TABS = ["all", "pending", "approved", "rejected"] as const;

export default function AdminEmployersPage() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [filtered, setFiltered] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<typeof FILTER_TABS[number]>("all");

  const fetchEmployers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/employers");
    const { data } = await res.json();
    setEmployers(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEmployers(); }, [fetchEmployers]);

  useEffect(() => {
    let result = employers;
    if (tab !== "all") result = result.filter(e => e.approval_status === tab);
    if (search) result = result.filter(e =>
      e.company_name.toLowerCase().includes(search.toLowerCase()) ||
      e.profiles?.full_name?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [employers, tab, search]);

  const counts = {
    all: employers.length,
    pending: employers.filter(e => e.approval_status === "pending").length,
    approved: employers.filter(e => e.approval_status === "approved").length,
    rejected: employers.filter(e => e.approval_status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={Building2} title="Employer Management" description="Review and approve employer registrations" />

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {FILTER_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t} <span className="ml-1.5 text-xs opacity-60">({counts[t]})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search employers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Building2} title="No Employers Found" description="No employer registrations match your current filter." />
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Company</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Industry</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Registered</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{emp.company_name}</p>
                    {emp.company_size && <p className="text-xs text-muted-foreground">{emp.company_size} employees</p>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-foreground">{emp.profiles?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{emp.profiles?.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{emp.industry}</td>
                  <td className="px-4 py-3"><StatusBadge status={emp.approval_status} /></td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {format(new Date(emp.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/employers/${emp.id}`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0"
                          title="Review Employer"
                        >
                          <Eye size={16} />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
