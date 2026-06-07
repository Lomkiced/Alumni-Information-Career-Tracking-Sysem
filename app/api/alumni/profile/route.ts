// app/api/alumni/profile/route.ts
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { alumniProfileSchema } from "@/lib/validations/alumni.schema";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

// GET /api/alumni/profile — fetch own profile + alumni data
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, profile_photo_url, role, is_verified, created_at")
      .eq("id", user.id)
      .single<{ id: string; full_name: string; email: string; phone: string | null; profile_photo_url: string | null; role: string; is_verified: boolean; created_at: string }>();
    if (profileErr) throw profileErr;

    const { data: alumni, error: alumniErr } = await supabase
      .from("alumni")
      .select("student_id, course, major, batch_year, graduation_year, address, city, province, linkedin_url, resume_url, is_profile_public")
      .eq("id", user.id)
      .single<{ student_id: string | null; course: string; major: string | null; batch_year: number; graduation_year: number; address: string | null; city: string | null; province: string | null; linkedin_url: string | null; resume_url: string | null; is_profile_public: boolean }>();
    if (alumniErr && alumniErr.code !== "PGRST116") throw alumniErr;

    return Response.json({ data: { ...profile, ...alumni } });
  } catch (error) {
    console.error("[GET /api/alumni/profile]", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/alumni/profile — update profile + alumni row
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = alumniProfileSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });

    const { full_name, phone, address, city, province, linkedin_url, resume_url, major, is_profile_public, course } = parsed.data;

    // Get old values for audit
    const { data: oldProfile } = await supabase.from("profiles").select("full_name, phone").eq("id", user.id).single();

    // Update profiles table
    const { error: profileErr } = await (supabase.from("profiles") as any)
      .update({ full_name, phone: phone || null, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (profileErr) {
      console.error("Profile Update Error:", profileErr);
      throw profileErr;
    }

    // Update alumni table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: alumniErr } = await (supabase.from("alumni") as any)
      .update({
        address: address || null,
        city: city || null,
        province: province || null,
        linkedin_url: linkedin_url || null,
        resume_url: resume_url || null,
        major: major || null,
        is_profile_public,
        course: course || undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    if (alumniErr) {
      console.error("Alumni Update Error:", alumniErr);
      throw alumniErr;
    }

    await logAudit({
      userId: user.id,
      action: AUDIT_ACTIONS.UPDATE_PROFILE,
      tableName: "profiles",
      recordId: user.id,
      oldValues: oldProfile ?? undefined,
      newValues: { full_name, phone },
      ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return Response.json({ data: { success: true } });
  } catch (error: any) {
    console.error("[PATCH /api/alumni/profile] ERROR DETAILS:", error);
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
