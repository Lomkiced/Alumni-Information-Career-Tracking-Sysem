import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";
import { prisma } from "@/lib/prisma";

// DELETE /api/admin/alumni/[id] — delete alumni account
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
      newValues: { role: "alumni", deleted: true },
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
      await tx.jobApplication.deleteMany({ where: { alumni_id: id } });
      await tx.careerRecord.deleteMany({ where: { alumni_id: id } });

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
    console.error("[DELETE /api/admin/alumni/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
