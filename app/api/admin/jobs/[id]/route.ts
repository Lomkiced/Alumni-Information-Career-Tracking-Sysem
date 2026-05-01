// app/api/admin/jobs/[id]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// PATCH /api/admin/jobs/[id] — approve or reject a job posting
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

    const { data: job } = (await db.from("job_postings").select("title, employer_id").eq("id", id).single()) as { data: { title: string; employer_id: string } | null };

    const updateData =
      action === "approve"
        ? { status: "active", rejection_reason: null }
        : { status: "rejected", rejection_reason: rejection_reason?.trim() };

    const { error: updateErr } = await db.from("job_postings").update(updateData).eq("id", id);
    if (updateErr) throw updateErr;

    if (job?.employer_id) {
      await db.from("notifications").insert({
        user_id: job.employer_id,
        title: action === "approve" ? "Job Posting Approved!" : "Job Posting Update",
        message: action === "approve"
          ? `Your job posting "${job.title}" is now live.`
          : `Your job posting "${job.title}" was not approved. Reason: ${rejection_reason}`,
        type: "job_status",
        action_url: "/employer/jobs",
      });
    }

    await logAudit({
      userId: user.id,
      action: action === "approve" ? AUDIT_ACTIONS.APPROVE_JOB : AUDIT_ACTIONS.REJECT_JOB,
      tableName: "job_postings",
      recordId: id,
      newValues: updateData,
    });

    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[PATCH /api/admin/jobs/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
