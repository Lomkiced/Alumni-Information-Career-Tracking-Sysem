// app/api/admin/employers/route.ts
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

// GET /api/admin/employers — list all employers with profile data
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("employers")
      .select(`
        id, company_name, industry, company_size, approval_status,
        rejection_reason, approved_at, created_at,
        profiles!employers_id_fkey!inner(full_name, email)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/admin/employers]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
