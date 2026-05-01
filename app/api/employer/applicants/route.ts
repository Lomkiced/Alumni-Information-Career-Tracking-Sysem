// app/api/employer/applicants/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/employer/applicants — list all applicants for employer's jobs
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "employer") return Response.json({ error: "Forbidden" }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("job_id") ?? "";
    const status = searchParams.get("status") ?? "";

    let query = supabase
      .from("job_applications")
      .select(`
        id, application_status, cover_letter, resume_url, employer_notes, applied_at, updated_at,
        job_postings!inner(id, title, employer_id),
        alumni!inner(id, course, batch_year,
          profiles!inner(full_name, email, phone)
        )
      `)
      .eq("job_postings.employer_id", user.id);

    if (jobId) query = query.eq("job_id", jobId);
    if (status) query = query.eq("application_status", status);

    const { data, error } = await query.order("applied_at", { ascending: false });
    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/employer/applicants]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
