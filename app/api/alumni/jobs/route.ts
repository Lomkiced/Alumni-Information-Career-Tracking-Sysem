// app/api/alumni/jobs/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jobApplicationSchema } from "@/lib/validations/job.schema";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// GET /api/alumni/jobs — fetch active job postings
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? "";
    const jobType = searchParams.get("job_type") ?? "";
    const industry = searchParams.get("industry") ?? "";
    const pageSize = 20;
    const from = (page - 1) * pageSize;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase as any)
      .from("job_postings")
      .select(`
        id, title, job_type, industry, location, is_remote,
        salary_min, salary_max, slots, expires_at, status, created_at,
        employers!inner(company_name, company_logo_url)
      `, { count: "exact" })
      .eq("status", "active")
      .gte("expires_at", new Date().toISOString());

    if (search) query = query.ilike("title", `%${search}%`);
    if (jobType) query = query.eq("job_type", jobType);
    if (industry) query = query.eq("industry", industry);

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error) throw error;
    return Response.json({ data, count, page, pageSize });
  } catch (error) {
    console.error("[GET /api/alumni/jobs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/alumni/jobs — apply to a job
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "alumni") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const { job_id, cover_letter, resume_url } = body;
    if (!job_id) return Response.json({ error: "job_id is required" }, { status: 422 });

    const parsed = jobApplicationSchema.safeParse({ cover_letter, resume_url });
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    // Check not already applied
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (supabase as any)
      .from("job_applications")
      .select("id")
      .eq("job_id", job_id)
      .eq("alumni_id", user.id)
      .single();
    if (existing) return Response.json({ error: "You have already applied to this job." }, { status: 409 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: application, error: insertErr } = await (supabase as any)
      .from("job_applications")
      .insert({
        job_id,
        alumni_id: user.id,
        cover_letter: parsed.data.cover_letter || null,
        resume_url: parsed.data.resume_url || null,
      })
      .select("id")
      .single();

    if (insertErr) throw insertErr;

    // Create notification for employer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: job } = (await (supabase as any)
      .from("job_postings")
      .select("title, employer_id")
      .eq("id", job_id)
      .single()) as { data: { title: string; employer_id: string } | null };

    if (job?.employer_id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("notifications").insert({
        user_id: job.employer_id,
        title: "New Job Application",
        message: `Someone applied to your job posting: ${job.title}`,
        type: "job_application",
        action_url: "/employer/applicants",
      });
    }

    await logAudit({ userId: user.id, action: AUDIT_ACTIONS.CREATE_APPLICATION, tableName: "job_applications", recordId: application.id });

    return Response.json({ data: application }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/alumni/jobs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
