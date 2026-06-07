// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") ?? "";

    if (query.trim().length < 2) {
      return NextResponse.json({ data: [] });
    }

    // Use Supabase admin client — bypasses RLS, no cookie dependency
    const adminClient = createAdminClient();
    const { data: results, error: dbErr } = await adminClient
      .from("profiles")
      .select(`
        id,
        full_name,
        role,
        profile_photo_url,
        alumni!alumni_id_fkey(course, batch_year),
        employers!employers_id_fkey(company_name, industry)
      `)
      .eq("is_searchable", true)
      .eq("is_active", true)
      .ilike("full_name", `%${query}%`)
      .limit(10);

    if (dbErr) {
      console.error("[GET /api/search] DB error:", dbErr);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Normalize: Supabase returns 1-to-1 relations as arrays in some versions
    const normalized = (results ?? []).map((r: any) => ({
      id: r.id,
      full_name: r.full_name,
      role: r.role,
      profile_photo_url: r.profile_photo_url ?? null,
      alumni: Array.isArray(r.alumni) ? (r.alumni[0] ?? null) : r.alumni,
      employer: Array.isArray(r.employers) ? (r.employers[0] ?? null) : r.employers,
    }));

    console.log(`[API Search] query="${query}" found=${normalized.length}`);
    return NextResponse.json({ data: normalized });
  } catch (error) {
    console.error("[GET /api/search]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
