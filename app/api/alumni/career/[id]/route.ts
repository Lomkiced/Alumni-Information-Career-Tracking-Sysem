// app/api/alumni/career/[id]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { careerRecordSchema } from "@/lib/validations/career.schema";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// PATCH /api/alumni/career/[id] — update career record
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;

    const { data: existing, error: fetchErr } = await db
      .from("career_records")
      .select("id, alumni_id")
      .eq("id", id)
      .single();

    if (fetchErr || !existing) return Response.json({ error: "Not found" }, { status: 404 });
    if (existing.alumni_id !== user.id) return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const parsed = careerRecordSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    const data = parsed.data;
    if (data.is_current) {
      await db.from("career_records").update({ is_current: false }).eq("alumni_id", user.id).neq("id", id);
    }

    const { error: updateErr } = await db
      .from("career_records")
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (updateErr) throw updateErr;

    await logAudit({ userId: user.id, action: AUDIT_ACTIONS.UPDATE_CAREER_RECORD, tableName: "career_records", recordId: id, newValues: data });
    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[PATCH /api/alumni/career/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/alumni/career/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    const { data: existing } = await db.from("career_records").select("alumni_id").eq("id", id).single();
    if (!existing) return Response.json({ error: "Not found" }, { status: 404 });
    if (existing.alumni_id !== user.id) return Response.json({ error: "Forbidden" }, { status: 403 });

    const { error } = await db.from("career_records").delete().eq("id", id);
    if (error) throw error;

    await logAudit({ userId: user.id, action: AUDIT_ACTIONS.DELETE_CAREER_RECORD, tableName: "career_records", recordId: id });
    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/alumni/career/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
