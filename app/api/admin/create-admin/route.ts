import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { adminRegisterSchema } from "@/lib/validations/auth.schema";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify current user is an admin
    const { data: profileData } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    
    const profile = profileData as { role: string } | null;

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = adminRegisterSchema.safeParse(body);
    
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, password, full_name } = parsed.data;
    const adminClient = await createAdminClient();

    // 1. Create auth user with auto-confirmed email (since an admin is creating them)
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (authError || !authData.user) {
      const msg = authError?.message?.includes("already registered") 
        ? "Email already registered." 
        : (authError?.message ?? "Failed to create admin");
      return NextResponse.json({ error: msg }, { status: authError?.message?.includes("already") ? 409 : 400 });
    }

    const newAdminId = authData.user.id;

    // 2. Create the profile for the new admin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: profileError } = await (adminClient as any).from("profiles").insert({
      id: newAdminId,
      role: "admin",
      full_name,
      email,
      is_verified: true, // Auto-verify since created by another admin
      is_active: true,
    });

    if (profileError) {
      // Rollback auth user creation if profile fails
      await adminClient.auth.admin.deleteUser(newAdminId);
      return NextResponse.json({ error: "Failed to create admin profile" }, { status: 500 });
    }

    // 3. Log Audit
    await logAudit({
      userId: user.id,
      action: "REGISTER", // Using REGISTER since CREATE_ADMIN is not defined
      tableName: "profiles",
      recordId: newAdminId,
      newValues: { email, role: "admin", full_name }
    });

    return NextResponse.json({ data: { userId: newAdminId, email }, error: null }, { status: 201 });
  } catch (err) {
    console.error("[create-admin]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
