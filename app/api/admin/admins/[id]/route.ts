import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/utils/audit";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: targetAdminId } = await params;
    const supabase = await createClient();
    const adminClient = await createAdminClient();
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role Check
    const { data: profileData } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
      
    const profile = profileData as { role: string } | null;

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (targetAdminId === user.id) {
      return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
    }

    // Verify target is actually an admin
    const { data: targetProfileData, error: targetError } = await supabase
      .from("profiles")
      .select("role, email, full_name, is_active")
      .eq("id", targetAdminId)
      .single();
      
    const targetProfile = targetProfileData as { role: string; email: string; full_name: string; is_active: boolean } | null;

    if (targetError || !targetProfile) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (targetProfile.role !== "admin") {
      return NextResponse.json({ error: "Target user is not an admin" }, { status: 400 });
    }

    // PRE-DELETION REASSIGNMENT PROTOCOL
    // Use Prisma transaction to ensure all relations are gracefully handled before deletion
    await prisma.$transaction([
      // 1. Reassign Announcements
      prisma.announcement.updateMany({
        where: { admin_id: targetAdminId },
        data: { admin_id: user.id }
      }),
      
      // 2. Reassign Employer Approvals
      prisma.employer.updateMany({
        where: { approved_by: targetAdminId },
        data: { approved_by: user.id }
      }),

      // 3. Nullify Audit Logs
      prisma.auditLog.updateMany({
        where: { user_id: targetAdminId },
        data: { user_id: null }
      }),

      // 4. Delete the public profile (this also cascades to notifications, conversations, messages via Prisma)
      prisma.profile.delete({
        where: { id: targetAdminId }
      })
    ]);

    // 5. Hard Delete from Supabase Auth
    const { error: deleteAuthError } = await adminClient.auth.admin.deleteUser(targetAdminId);
    
    if (deleteAuthError) {
      console.error("[Auth Deletion Error]", deleteAuthError);
      // Even if this fails, their public profile is already wiped, but log it.
    }

    // 6. Log Audit (Under the current admin's ID)
    await logAudit({
      userId: user.id,
      action: "UPDATE_PROFILE", // Logged as an update/delete action
      tableName: "profiles",
      recordId: targetAdminId,
      oldValues: { email: targetProfile.email, role: "admin" },
      newValues: { action: "HARD_DELETE_ADMIN_ACCOUNT" }
    });

    return NextResponse.json({ message: "Admin account permanently deleted." }, { status: 200 });

  } catch (error: any) {
    console.error("[DELETE /api/admin/admins/[id]]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
