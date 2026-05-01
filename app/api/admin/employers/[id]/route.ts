// app/api/admin/employers/[id]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// PATCH /api/admin/employers/[id] — approve or reject employer
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const { action, rejection_reason } = body as { action: "approve" | "reject"; rejection_reason?: string };

    if (!["approve", "reject"].includes(action)) return Response.json({ error: "Invalid action" }, { status: 422 });
    if (action === "reject" && !rejection_reason?.trim()) return Response.json({ error: "Rejection reason is required" }, { status: 422 });

    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = adminClient as any;

    const updateData =
      action === "approve"
        ? { approval_status: "approved", approved_at: new Date().toISOString(), approved_by: user.id, rejection_reason: null }
        : { approval_status: "rejected", rejection_reason: rejection_reason?.trim() };

    const { error: updateErr } = await db.from("employers").update(updateData).eq("id", id);
    if (updateErr) throw updateErr;

    const { data: empProfile } = await db.from("profiles").select("email, full_name").eq("id", id).single();

    await db.from("notifications").insert({
      user_id: id,
      title: action === "approve" ? "Account Approved!" : "Account Application Update",
      message: action === "approve"
        ? "Your employer account has been approved. You can now post jobs."
        : `Your employer account application was not approved. Reason: ${rejection_reason}`,
      type: "account",
      action_url: action === "approve" ? "/employer/jobs" : "/login",
    });

    await logAudit({
      userId: user.id,
      action: action === "approve" ? AUDIT_ACTIONS.APPROVE_EMPLOYER : AUDIT_ACTIONS.REJECT_EMPLOYER,
      tableName: "employers",
      recordId: id,
      newValues: updateData,
    });

    return Response.json({ data: { success: true, employer_email: empProfile?.email } });
  } catch (error) {
    console.error("[PATCH /api/admin/employers/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
