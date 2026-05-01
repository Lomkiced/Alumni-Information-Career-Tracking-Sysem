// app/api/admin/alumni/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

// GET /api/admin/alumni — list all alumni with latest career record
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>();
    if (profile?.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? "";
    const course = searchParams.get("course") ?? "";
    const batchYear = searchParams.get("batch_year") ?? "";
    const pageSize = 20;
    const from = (page - 1) * pageSize;

    const adminClient = createAdminClient();

    let query = adminClient
      .from("alumni")
      .select(`
        id, student_id, course, batch_year, graduation_year, city, province, is_profile_public, created_at,
        profiles!inner(full_name, email, phone, is_verified, is_active),
        career_records(employment_status, employer_name, job_title, is_current)
      `, { count: "exact" });

    if (search) {
      // Filter through profiles.full_name — use the join
      query = query.ilike("profiles.full_name", `%${search}%`);
    }
    if (course) query = query.eq("course", course);
    if (batchYear) query = query.eq("batch_year", parseInt(batchYear));

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error) throw error;
    return Response.json({ data, count, page, pageSize });
  } catch (error) {
    console.error("[GET /api/admin/alumni]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
