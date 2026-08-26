import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logAudit } from "@/lib/utils/audit";

// PATCH /api/alumni/career/[id]/restore — Restore an archived career record
export async function PATCH(
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

    // Restore the record
    const { error } = await db
      .from("career_records")
      .update({ is_archived: false })
      .eq("id", id);
      
    if (error) throw error;

    await logAudit({ userId: user.id, action: "RESTORE_CAREER_RECORD", tableName: "career_records", recordId: id });
    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[PATCH /api/alumni/career/[id]/restore]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
