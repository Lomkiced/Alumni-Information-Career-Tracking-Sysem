// app/api/notifications/[id]/route.ts
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { error } = await (supabase as any)
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
