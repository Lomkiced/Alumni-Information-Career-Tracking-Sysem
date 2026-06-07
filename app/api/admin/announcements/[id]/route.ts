// app/api/admin/announcements/[id]/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  content: z.string().min(10).optional(),
  category: z.enum(["general", "event", "job_fair", "seminar", "alumni_news"]).optional(),
  image_url: z.string().optional(),
  is_published: z.boolean().optional(),
  is_pinned: z.boolean().optional(),
  expires_at: z.string().optional(),
});

// PATCH /api/admin/announcements/[id]
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
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    const d = parsed.data;
    const adminClient = createAdminClient();

    // Check pinned limit
    if (d.is_pinned === true) {
      const { count, error: countErr } = await (adminClient as any)
        .from("announcements")
        .select("*", { count: "exact", head: true })
        .eq("is_pinned", true);
      
      if (countErr) throw countErr;
      if (count !== null && count >= 3) {
        return Response.json({ error: "Maximum of 3 announcements can be pinned at a time." }, { status: 400 });
      }
    }

    // Check if being published for first time
    const { data: existing } = (await adminClient
      .from("announcements")
      .select("is_published, title")
      .eq("id", id)
      .single()) as { data: { is_published: boolean; title: string } | null };

    const updateData: Record<string, unknown> = { ...d, updated_at: new Date().toISOString() };
    if (d.is_published && !existing?.is_published) {
      updateData.published_at = new Date().toISOString();

      // Batch notify all alumni
      const { data: allAlumni } = await (adminClient as any).from("profiles").select("id").eq("role", "alumni");
      if (allAlumni && allAlumni.length > 0) {
        const title = d.title ?? existing?.title ?? "New Announcement";
        const notifications = allAlumni.map((a: any) => ({
          user_id: a.id,
          title: `New Announcement: ${title}`,
          message: d.content?.slice(0, 120) ?? "",
          type: "announcement" as const,
          action_url: "/alumni/announcements",
        }));
        for (let i = 0; i < notifications.length; i += 500) {
          await (adminClient as any).from("notifications").insert(notifications.slice(i, i + 500));
        }
      }
    }

    const { error: updateErr } = await (adminClient as any).from("announcements").update(updateData).eq("id", id);
    if (updateErr) throw updateErr;

    await logAudit({
      userId: user.id,
      action: d.is_published ? AUDIT_ACTIONS.PUBLISH_ANNOUNCEMENT : AUDIT_ACTIONS.UPDATE_ANNOUNCEMENT,
      tableName: "announcements",
      recordId: id,
      newValues: d,
    });

    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[PATCH /api/admin/announcements/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/announcements/[id]
export async function DELETE(
  _request: NextRequest,
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
    const { error } = await adminClient.from("announcements").delete().eq("id", id);
    if (error) throw error;

    await logAudit({ userId: user.id, action: AUDIT_ACTIONS.DELETE_ANNOUNCEMENT, tableName: "announcements", recordId: id });
    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/admin/announcements/[id]]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
