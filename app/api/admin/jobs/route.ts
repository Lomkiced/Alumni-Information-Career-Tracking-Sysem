// app/api/admin/jobs/route.ts
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

// GET /api/admin/jobs — list all job postings
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("job_postings")
      .select(`
        id, title, job_type, industry, location, is_remote, status,
        rejection_reason, expires_at, created_at, slots,
        employers!inner(company_name)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return Response.json({ data });
  } catch (error) {
    console.error("[GET /api/admin/jobs]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
