// app/api/admin/employers/[id]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// GET /api/admin/employers/[id] — get single employer
export async function GET(
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

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("employers")
      .select(`
        *,
        profiles!employers_id_fkey ( full_name, email )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("[GET /api/admin/employers/[id]] Supabase Error:", error);
    }

    if (error || !data) return Response.json({ error: "Employer not found" }, { status: 404 });

    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/admin/employers/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

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
    const { action, rejection_reason } = body as { action: "approve" | "reject" | "disapprove"; rejection_reason?: string };

    if (!["approve", "reject", "disapprove"].includes(action)) return Response.json({ error: "Invalid action" }, { status: 422 });
    if (action === "reject" && !rejection_reason?.trim()) return Response.json({ error: "Rejection reason is required" }, { status: 422 });

    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = adminClient as any;

    const updateData =
      action === "approve"
        ? { approval_status: "approved", approved_at: new Date().toISOString(), approved_by: user.id, rejection_reason: null }
        : action === "disapprove"
        ? { approval_status: "pending", approved_at: null, approved_by: null, rejection_reason: null }
        : { approval_status: "rejected", rejection_reason: rejection_reason?.trim() };

    const { error: updateErr } = await db.from("employers").update(updateData).eq("id", id);
    if (updateErr) throw updateErr;

    const { data: empProfile } = await db.from("profiles").select("email, full_name").eq("id", id).single();

    await db.from("notifications").insert({
      user_id: id,
      title: action === "approve" ? "Account Approved!" : action === "disapprove" ? "Account Re-review Required" : "Account Application Update",
      message: action === "approve"
        ? "Your employer account has been approved. You can now post jobs."
        : action === "disapprove"
        ? "Your employer account has been set back to Pending and requires re-review."
        : `Your employer account application was not approved. Reason: ${rejection_reason}`,
      type: "account",
      action_url: action === "approve" ? "/employer/jobs" : "/login",
    });

    await logAudit({
      userId: user.id,
      action: action === "approve" ? AUDIT_ACTIONS.APPROVE_EMPLOYER : action === "disapprove" ? AUDIT_ACTIONS.UPDATE_EMPLOYER : AUDIT_ACTIONS.REJECT_EMPLOYER,
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

import { prisma } from "@/lib/prisma";

// DELETE /api/admin/employers/[id] — delete employer account
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Authenticate user
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // Verify admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    // Ensure we aren't deleting ourselves somehow
    if (id === user.id) return Response.json({ error: "Cannot delete your own account" }, { status: 400 });

    const adminClient = createAdminClient();

    // Log audit before we delete the record
    await logAudit({
      userId: user.id,
      action: "DELETE_USER" as any, // fallback if AUDIT_ACTIONS doesn't have it
      tableName: "profiles",
      recordId: id,
      newValues: { role: "employer", deleted: true },
    });

    // 1. Delete from Prisma using interactive transaction with Prisma client methods
    await prisma.$transaction(async (tx) => {
      // Delete child records explicitly to handle relations safely
      await tx.auditLog.deleteMany({ where: { user_id: id } });
      await tx.notification.deleteMany({ where: { user_id: id } });
      await tx.message.deleteMany({ where: { sender_id: id } });
      await tx.conversation.deleteMany({
        where: { OR: [{ user1_id: id }, { user2_id: id }] },
      });

      // Get all job postings for this employer to delete their applications
      const employerJobs = await tx.jobPosting.findMany({
        where: { employer_id: id },
        select: { id: true },
      });
      const jobIds = employerJobs.map(j => j.id);
      
      if (jobIds.length > 0) {
        await tx.jobApplication.deleteMany({
          where: { job_id: { in: jobIds } },
        });
      }
      
      await tx.jobPosting.deleteMany({ where: { employer_id: id } });

      // Delete specific profile types
      await tx.alumni.deleteMany({ where: { id } });
      await tx.employer.deleteMany({ where: { id } });

      // Finally, delete the root profile
      await tx.profile.deleteMany({ where: { id } });
    });

    // 2. Delete from Supabase Auth (purges the actual user login)
    const { error: deleteErr } = await adminClient.auth.admin.deleteUser(id);
    if (deleteErr) throw deleteErr;

    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/admin/employers/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
