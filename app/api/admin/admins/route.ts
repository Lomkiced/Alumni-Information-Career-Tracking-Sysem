import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Auth Check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role Check
    const { data: profileData } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const profile = profileData as { role: string } | null;

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all admins
    const { data: admins, error: fetchError } = await supabase
      .from("profiles")
      .select("id, full_name, email, is_active, created_at, role")
      .eq("role", "admin")
      .order("created_at", { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ data: admins }, { status: 200 });

  } catch (error: any) {
    console.error("[GET /api/admin/admins]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
