// app/api/alumni/career/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { careerRecordSchema } from "@/lib/validations/career.schema";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// GET /api/alumni/career — fetch own career records
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("career_records")
      .select("id, employment_status, employer_name, job_title, industry, employment_type, salary_range, start_date, end_date, is_current, country, city, job_description, created_at")
      .eq("alumni_id", user.id)
      .order("start_date", { ascending: false });

    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/alumni/career]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/alumni/career — create new career record
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "alumni") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const parsed = careerRecordSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    const data = parsed.data;

    // If new record is current, mark all others as not current
    if (data.is_current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("career_records").update({ is_current: false }).eq("alumni_id", user.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: record, error: insertErr } = await (supabase as any)
      .from("career_records")
      .insert({
        alumni_id: user.id,
        employment_status: data.employment_status,
        employer_name: data.employer_name || null,
        job_title: data.job_title || null,
        industry: data.industry || null,
        employment_type: data.employment_type || null,
        salary_range: data.salary_range || null,
        start_date: data.start_date || null,
        end_date: data.is_current ? null : (data.end_date || null),
        is_current: data.is_current,
        country: data.country,
        city: data.city || null,
        job_description: data.job_description || null,
      })
      .select("id")
      .single();

    if (insertErr) throw insertErr;

    await logAudit({
      userId: user.id,
      action: AUDIT_ACTIONS.CREATE_CAREER_RECORD,
      tableName: "career_records",
      recordId: record.id,
      newValues: data,
      ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
    });

    return Response.json({ data: record }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/alumni/career]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
