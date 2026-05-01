"use client";
// app/(dashboard)/admin/reports/page.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { BarChart3, Download, RefreshCw, Users, Building2, Briefcase, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { EmploymentRateChart } from "@/components/admin/charts/EmploymentRateChart";
import { IndustryPieChart } from "@/components/admin/charts/IndustryPieChart";
import { BatchAreaChart } from "@/components/admin/charts/BatchAreaChart";
import { StatusBreakdownChart } from "@/components/admin/charts/StatusBreakdownChart";
import { TopEmployersChart } from "@/components/admin/charts/TopEmployersChart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReportData {
  summaryStats: {
    totalAlumni: number;
    approvedEmployers: number;
    activeJobPostings: number;
    totalApplications: number;
    overallEmploymentRate: number;
  };
  employmentByBatchYear: Array<{ batch_year: string; employed_pct: number; unemployed_pct: number; total: number; employed: number }>;
  industryDistribution: Array<{ industry: string; count: number; percentage: number }>;
  alumniPerBatchYear: Array<{ batch_year: string; count: number }>;
  employmentStatusBreakdown: Array<{ status: string; label: string; count: number }>;
  topHiringEmployers: Array<{ employer: string; count: number }>;
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/reports");
    if (res.ok) {
      const json = await res.json();
      setData(json);
    } else {
      toast.error("Failed to load analytics data");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const today = new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

      // Header
      doc.setFillColor(13, 43, 90);
      doc.rect(0, 0, 210, 32, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("AICTS Analytics Report", 14, 14);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Polytechnic College of La Union", 14, 22);
      doc.text(`Generated: ${today}`, 14, 28);

      // Summary Stats
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Summary Statistics", 14, 44);

      autoTable(doc, {
        startY: 48,
        head: [["Metric", "Value"]],
        body: [
          ["Total Registered Alumni", String(data?.summaryStats.totalAlumni ?? 0)],
          ["Approved Employers", String(data?.summaryStats.approvedEmployers ?? 0)],
          ["Active Job Postings", String(data?.summaryStats.activeJobPostings ?? 0)],
          ["Total Applications", String(data?.summaryStats.totalApplications ?? 0)],
          ["Overall Employment Rate", `${data?.summaryStats.overallEmploymentRate ?? 0}%`],
        ],
        headStyles: { fillColor: [13, 43, 90], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 245, 255] },
        styles: { fontSize: 10 },
      });

      // Employment by Batch Year
      let y = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Employment Rate by Batch Year", 14, y);

      autoTable(doc, {
        startY: y + 4,
        head: [["Batch Year", "Total Alumni", "Employed", "Employed %", "Unemployed %"]],
        body: (data?.employmentByBatchYear ?? []).map(r => [
          r.batch_year, r.total, r.employed,
          `${r.employed_pct}%`, `${r.unemployed_pct}%`
        ]),
        headStyles: { fillColor: [13, 43, 90], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 245, 255] },
        styles: { fontSize: 9 },
      });

      // Industry Distribution
      y = (doc as any).lastAutoTable.finalY + 10;
      if (y > 250) { doc.addPage(); y = 14; }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Industry Distribution (Top 10)", 14, y);

      autoTable(doc, {
        startY: y + 4,
        head: [["Industry", "Alumni Count", "Percentage"]],
        body: (data?.industryDistribution ?? []).map(r => [r.industry, r.count, `${r.percentage}%`]),
        headStyles: { fillColor: [13, 43, 90], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 245, 255] },
        styles: { fontSize: 9 },
      });

      // Top Employers
      y = (doc as any).lastAutoTable.finalY + 10;
      if (y > 250) { doc.addPage(); y = 14; }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Top Hiring Employers", 14, y);

      autoTable(doc, {
        startY: y + 4,
        head: [["Employer", "Alumni Hired"]],
        body: (data?.topHiringEmployers ?? []).map(r => [r.employer, r.count]),
        headStyles: { fillColor: [13, 43, 90], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 245, 255] },
        styles: { fontSize: 9 },
      });

      // Employment Status Breakdown
      y = (doc as any).lastAutoTable.finalY + 10;
      if (y > 250) { doc.addPage(); y = 14; }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Employment Status Breakdown", 14, y);

      autoTable(doc, {
        startY: y + 4,
        head: [["Status", "Alumni Count"]],
        body: (data?.employmentStatusBreakdown ?? []).map(r => [r.label, r.count]),
        headStyles: { fillColor: [13, 43, 90], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 245, 255] },
        styles: { fontSize: 9 },
      });

      doc.save(`AICTS_Report_${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("Report exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6" ref={printRef}>
      <PageHeader
        icon={BarChart3}
        title="Reports & Analytics"
        description="Comprehensive employment and alumni statistics — Polytechnic College of La Union"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw size={14} className={loading ? "animate-spin mr-1.5" : "mr-1.5"} />
            Refresh
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleExportPDF} disabled={exporting || loading || !data}>
            <Download size={14} className="mr-1.5" />
            {exporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </PageHeader>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard title="Total Alumni" value={loading ? "—" : data?.summaryStats.totalAlumni ?? 0} icon={Users} color="blue" loading={loading} />
        <StatsCard title="Employers" value={loading ? "—" : data?.summaryStats.approvedEmployers ?? 0} icon={Building2} color="green" loading={loading} />
        <StatsCard title="Active Jobs" value={loading ? "—" : data?.summaryStats.activeJobPostings ?? 0} icon={Briefcase} color="amber" loading={loading} />
        <StatsCard title="Applications" value={loading ? "—" : data?.summaryStats.totalApplications ?? 0} icon={BarChart3} color="purple" loading={loading} />
        <StatsCard title="Employment Rate" value={loading ? "—" : `${data?.summaryStats.overallEmploymentRate ?? 0}%`} icon={TrendingUp} color="cyan" loading={loading} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard
          title="Employment Rate by Batch Year"
          subtitle="Percentage of employed vs. unemployed per batch"
        >
          {loading ? <div className="h-64 bg-muted animate-pulse rounded-lg" /> : (
            <EmploymentRateChart data={data?.employmentByBatchYear ?? []} />
          )}
        </ChartCard>

        <ChartCard
          title="Industry Distribution"
          subtitle="Current alumni employment across industries"
        >
          {loading ? <div className="h-64 bg-muted animate-pulse rounded-lg" /> : (
            <IndustryPieChart data={data?.industryDistribution ?? []} />
          )}
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard
          title="Alumni Growth by Batch Year"
          subtitle="Number of registered alumni per batch year"
        >
          {loading ? <div className="h-64 bg-muted animate-pulse rounded-lg" /> : (
            <BatchAreaChart data={data?.alumniPerBatchYear ?? []} />
          )}
        </ChartCard>

        <ChartCard
          title="Employment Status Breakdown"
          subtitle="Count of alumni by current employment status"
        >
          {loading ? <div className="h-64 bg-muted animate-pulse rounded-lg" /> : (
            <StatusBreakdownChart data={data?.employmentStatusBreakdown ?? []} />
          )}
        </ChartCard>
      </div>

      {/* Charts Row 3 */}
      <ChartCard
        title="Top Hiring Employers"
        subtitle="Companies employing the most PCLU alumni (from career records)"
      >
        {loading ? <div className="h-64 bg-muted animate-pulse rounded-lg" /> : (
          <TopEmployersChart data={data?.topHiringEmployers ?? []} />
        )}
      </ChartCard>
    </div>
  );
}
