// app/api/reports/route.ts
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single() as { data: { role: string } | null };

    if (profile?.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ── Run all queries in parallel ───────────────────────────────────────────
    const [
      alumniCountRes,
      employersRes,
      activeJobsRes,
      applicationsRes,
      careerRecordsRes,
      allAlumniRes,
      topEmployersRes,
      batchYearsRes,
    ] = await Promise.all([
      // 1. Total alumni
      (adminClient as any).from("alumni").select("id", { count: "exact", head: true }),
      // 2. Approved employers count
      (adminClient as any).from("employers").select("id", { count: "exact", head: true }).eq("approval_status", "approved"),
      // 3. Active job postings
      (adminClient as any).from("job_postings").select("id", { count: "exact", head: true }).eq("status", "active"),
      // 4. Total applications (new = last 30 days)
      (adminClient as any).from("job_applications").select("id", { count: "exact", head: true }),
      // 5. Career records for employment analytics
      (adminClient as any).from("career_records").select("employment_status, industry, employer_name").eq("is_current", true),
      // 6. All alumni with batch_year for batch breakdown
      (adminClient as any).from("alumni").select("batch_year, id"),
      // 7. Top employers (career records with employer_name)
      (adminClient as any).from("career_records").select("employer_name").eq("is_current", true).not("employer_name", "is", null),
      // 8. Alumni registered per batch year
      (adminClient as any).from("alumni").select("batch_year, id").order("batch_year", { ascending: true }),
    ]);

    // ── Summary Stats ─────────────────────────────────────────────────────────
    const summaryStats = {
      totalAlumni: alumniCountRes.count ?? 0,
      approvedEmployers: employersRes.count ?? 0,
      activeJobPostings: activeJobsRes.count ?? 0,
      totalApplications: applicationsRes.count ?? 0,
    };

    // ── Employment Rate by Batch Year ─────────────────────────────────────────
    const allAlumniData: { batch_year: number; id: string }[] = allAlumniRes.data ?? [];
    const careerData: { employment_status: string; industry: string; employer_name: string | null }[] = careerRecordsRes.data ?? [];

    // Map alumni IDs to batch years
    const batchYearMap = new Map<number, { total: number; employed: number }>();
    for (const a of allAlumniData) {
      if (!a.batch_year) continue;
      if (!batchYearMap.has(a.batch_year)) {
        batchYearMap.set(a.batch_year, { total: 0, employed: 0 });
      }
      batchYearMap.get(a.batch_year)!.total++;
    }

    // For employment rate we use career records joined on alumni
    const careerWithBatch = await (adminClient as any)
      .from("career_records")
      .select("alumni_id, employment_status, is_current, alumni!inner(batch_year)")
      .eq("is_current", true) as { data: Array<{ alumni_id: string; employment_status: string; is_current: boolean; alumni: { batch_year: number } }> | null };

    const batchEmploymentMap = new Map<number, { total: number; employed: number }>();
    for (const a of allAlumniData) {
      if (!a.batch_year) continue;
      if (!batchEmploymentMap.has(a.batch_year)) {
        batchEmploymentMap.set(a.batch_year, { total: 0, employed: 0 });
      }
      batchEmploymentMap.get(a.batch_year)!.total++;
    }
    for (const r of (careerWithBatch.data ?? [])) {
      const by = r.alumni?.batch_year;
      if (!by) continue;
      if (!batchEmploymentMap.has(by)) batchEmploymentMap.set(by, { total: 0, employed: 0 });
      if (["employed", "self_employed", "ofw"].includes(r.employment_status)) {
        batchEmploymentMap.get(by)!.employed++;
      }
    }

    const employmentByBatchYear = Array.from(batchEmploymentMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([batch_year, { total, employed }]) => ({
        batch_year: String(batch_year),
        employed_pct: total > 0 ? Math.round((employed / total) * 100) : 0,
        unemployed_pct: total > 0 ? Math.round(((total - employed) / total) * 100) : 0,
        total,
        employed,
      }));

    // ── Industry Distribution ─────────────────────────────────────────────────
    const industryCount = new Map<string, number>();
    for (const r of careerData) {
      if (!r.industry) continue;
      industryCount.set(r.industry, (industryCount.get(r.industry) ?? 0) + 1);
    }
    const totalWithIndustry = Array.from(industryCount.values()).reduce((a, b) => a + b, 0);
    const industryDistribution = Array.from(industryCount.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([industry, count]) => ({
        industry,
        count,
        percentage: totalWithIndustry > 0 ? Math.round((count / totalWithIndustry) * 100) : 0,
      }));

    // ── Alumni Registered per Batch Year ─────────────────────────────────────
    const batchCount = new Map<number, number>();
    for (const a of (batchYearsRes.data ?? [])) {
      if (!a.batch_year) continue;
      batchCount.set(a.batch_year, (batchCount.get(a.batch_year) ?? 0) + 1);
    }
    const alumniPerBatchYear = Array.from(batchCount.entries())
      .sort(([a], [b]) => a - b)
      .map(([batch_year, count]) => ({ batch_year: String(batch_year), count }));

    // ── Employment Status Breakdown ───────────────────────────────────────────
    const statusCount = new Map<string, number>();
    for (const r of careerData) {
      statusCount.set(r.employment_status, (statusCount.get(r.employment_status) ?? 0) + 1);
    }
    const employmentStatusBreakdown = [
      "employed", "self_employed", "unemployed", "ofw", "further_study", "retired"
    ].map(status => ({
      status,
      label: status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      count: statusCount.get(status) ?? 0,
    }));

    // ── Top Hiring Employers ──────────────────────────────────────────────────
    const employerCount = new Map<string, number>();
    for (const r of (topEmployersRes.data ?? [])) {
      if (!r.employer_name) continue;
      employerCount.set(r.employer_name, (employerCount.get(r.employer_name) ?? 0) + 1);
    }
    const topHiringEmployers = Array.from(employerCount.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([employer, count]) => ({ employer, count }));

    // ── Overall Employment Rate ───────────────────────────────────────────────
    const employed = careerData.filter(r =>
      ["employed", "self_employed", "ofw"].includes(r.employment_status)
    ).length;
    const overallRate = careerData.length > 0
      ? Math.round((employed / careerData.length) * 100)
      : 0;

    return Response.json({
      summaryStats: { ...summaryStats, overallEmploymentRate: overallRate },
      employmentByBatchYear,
      industryDistribution,
      alumniPerBatchYear,
      employmentStatusBreakdown,
      topHiringEmployers,
    });
  } catch (error) {
    console.error("Reports API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
