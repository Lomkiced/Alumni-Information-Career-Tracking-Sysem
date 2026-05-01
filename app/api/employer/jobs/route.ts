// app/api/employer/jobs/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jobPostingSchema } from "@/lib/validations/job.schema";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// GET /api/employer/jobs — list employer's own job postings
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "employer") return Response.json({ error: "Forbidden" }, { status: 403 });

    const { data, error } = await supabase
      .from("job_postings")
      .select("id, title, job_type, industry, location, is_remote, salary_min, salary_max, slots, expires_at, status, created_at")
      .eq("employer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/employer/jobs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/employer/jobs — create new job posting
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "employer") return Response.json({ error: "Forbidden" }, { status: 403 });

    // Check employer is approved
    const { data: employer } = await supabase
      .from("employers")
      .select("approval_status")
      .eq("id", user.id)
      .single<{ approval_status: string }>();
    if (employer?.approval_status !== "approved") {
      return Response.json({ error: "Your employer account is not yet approved." }, { status: 403 });
    }

    const body = await request.json();
    const parsed = jobPostingSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    const d = parsed.data;
    const { data: job, error: insertErr } = (await (supabase as any)
      .from("job_postings")
      .insert({
        employer_id: user.id,
        title: d.title,
        description: d.description,
        requirements: d.requirements || null,
        job_type: d.job_type,
        industry: d.industry,
        location: d.location || null,
        is_remote: d.is_remote,
        salary_min: d.salary_min || null,
        salary_max: d.salary_max || null,
        preferred_courses: d.preferred_courses,
        slots: d.slots,
        expires_at: d.expires_at,
        status: "pending",
      })
      .select("id")
      .single()) as { data: { id: string } | null; error: any };

    if (insertErr) throw insertErr;

    await logAudit({
      userId: user.id,
      action: AUDIT_ACTIONS.CREATE_JOB,
      tableName: "job_postings",
      recordId: job?.id || "",
      newValues: { title: d.title },
    });

    return Response.json({ data: job }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/employer/jobs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
