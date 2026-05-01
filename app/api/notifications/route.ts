// app/api/notifications/route.ts
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await (supabase as any)
      .from("notifications")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(30) as { data: any[] | null; error: any };

    if (error) throw error;
    return Response.json({ data: data ?? [] });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { error } = await (supabase as any)
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", session.user.id)
      .eq("is_read", false);

    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
