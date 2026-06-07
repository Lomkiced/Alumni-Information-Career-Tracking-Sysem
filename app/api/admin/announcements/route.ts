// app/api/admin/announcements/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";
import { z } from "zod";

const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.enum(["general", "event", "job_fair", "seminar", "alumni_news"]).default("general"),
  image_url: z.string().optional(),
  is_published: z.boolean().default(false),
  is_pinned: z.boolean().default(false),
  expires_at: z.string().optional(),
});

// GET /api/admin/announcements
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = adminClient as any;

    const { data, error } = await db
      .from("announcements")
      .select("id, title, category, is_published, is_pinned, published_at, expires_at, created_at, profiles(full_name)")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/admin/announcements]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/announcements
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json();
    const parsed = announcementSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    const d = parsed.data;
    const adminClient = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = adminClient as any;

    const { data: announcement, error: insertErr } = await db
      .from("announcements")
      .insert({
        admin_id: user.id,
        title: d.title,
        content: d.content,
        category: d.category,
        image_url: d.image_url || null,
        is_published: d.is_published,
        is_pinned: d.is_pinned,
        published_at: d.is_published ? new Date().toISOString() : null,
        expires_at: d.expires_at || null,
      })
      .select("id")
      .single();

    if (insertErr) throw insertErr;

    if (d.is_published) {
      const { data: allAlumni } = await db.from("profiles").select("id").eq("role", "alumni");
      if (allAlumni && allAlumni.length > 0) {
        const notifications = allAlumni.map((a: { id: string }) => ({
          user_id: a.id,
          title: `New Announcement: ${d.title}`,
          message: d.content.slice(0, 120) + (d.content.length > 120 ? "..." : ""),
          type: "announcement",
          action_url: "/alumni/announcements",
        }));
        for (let i = 0; i < notifications.length; i += 500) {
          await db.from("notifications").insert(notifications.slice(i, i + 500));
        }
      }
    }

    await logAudit({
      userId: user.id,
      action: d.is_published ? AUDIT_ACTIONS.PUBLISH_ANNOUNCEMENT : AUDIT_ACTIONS.CREATE_ANNOUNCEMENT,
      tableName: "announcements",
      recordId: announcement.id,
      newValues: { title: d.title, is_published: d.is_published },
    });

    return Response.json({ data: announcement }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/announcements]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
