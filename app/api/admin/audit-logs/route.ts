// app/api/admin/audit-logs/route.ts
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single() as { data: { role: string } | null };

    if (profile?.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const action = searchParams.get("action") ?? "";
    const dateFrom = searchParams.get("from") ?? "";
    const dateTo = searchParams.get("to") ?? "";
    const limit = parseInt(searchParams.get("limit") ?? "20");
    const offset = (page - 1) * limit;

    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = (adminClient as any)
      .from("audit_logs")
      .select(`
        id, user_id, action, table_name, record_id, old_values, new_values, created_at,
        profiles!audit_logs_user_id_fkey(full_name, email, role)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (action) query = query.eq("action", action);
    if (dateFrom) query = query.gte("created_at", dateFrom);
    if (dateTo) query = query.lte("created_at", dateTo + "T23:59:59Z");

    const { data, count, error } = await query;
    if (error) throw error;

    return Response.json({ data: data ?? [], count: count ?? 0 });
  } catch (error) {
    console.error("Audit logs error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
