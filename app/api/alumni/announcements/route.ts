// app/api/alumni/announcements/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/alumni/announcements — published, non-expired announcements
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? "";
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = 10;
    const from = (page - 1) * pageSize;

    let query = supabase
      .from("announcements")
      .select("id, title, content, category, image_url, published_at, expires_at, profiles(full_name)", { count: "exact" })
      .eq("is_published", true)
      .or(`expires_at.is.null,expires_at.gte.${new Date().toISOString()}`);

    if (category) query = query.eq("category", category);

    const { data, count, error } = await query
      .order("published_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error) throw error;
    return Response.json({ data, count, page, pageSize });
  } catch (error) {
    console.error("[GET /api/alumni/announcements]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
