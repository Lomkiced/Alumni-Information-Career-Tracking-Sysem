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

    // 1. Delete from Prisma using raw SQL transaction to ensure all tables are cleared (even those missing from Prisma schema)
    await prisma.$transaction([
      prisma.$executeRaw`DELETE FROM comments WHERE user_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM notifications WHERE user_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM audit_logs WHERE user_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM messages WHERE sender_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM conversations WHERE user1_id = ${id}::uuid OR user2_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM job_applications WHERE alumni_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM career_records WHERE alumni_id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM alumni WHERE id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM employers WHERE id = ${id}::uuid`,
      prisma.$executeRaw`DELETE FROM profiles WHERE id = ${id}::uuid`
    ]).catch(() => {
      // Ignored if they don't exist
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
