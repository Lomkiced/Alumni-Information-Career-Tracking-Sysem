// app/api/auth/register/alumni/route.ts
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { alumniRegisterSchema } from "@/lib/validations/auth.schema";
import { resend, FROM_EMAIL } from "@/lib/email/resend";
import { welcomeAlumniHtml } from "@/lib/email/templates/welcome-alumni";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = alumniRegisterSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, password, full_name, student_id, course, batch_year, graduation_year } = parsed.data;
    const adminClient = createAdminClient();

    // 1. Create auth user
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email, password, email_confirm: false, user_metadata: { full_name },
    });
    if (authError || !authData.user) {
      const msg = authError?.message?.includes("already registered") ? "Email already registered." : (authError?.message ?? "Registration failed");
      return NextResponse.json({ error: msg }, { status: authError?.message?.includes("already") ? 409 : 400 });
    }

    const userId = authData.user.id;

    // 2. Insert into profiles (use any to bypass admin client typing)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: profileError } = await (adminClient as any).from("profiles").insert({
      id: userId, role: "alumni", full_name, email, is_verified: false, is_active: true,
    });
    if (profileError) {
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
    }

    // 3. Insert into alumni
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: alumniError } = await (adminClient as any).from("alumni").insert({
      id: userId, student_id: student_id || null, course, batch_year, graduation_year, is_profile_public: true,
    });
    if (alumniError) {
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Failed to create alumni record" }, { status: 500 });
    }

    // 4. Send welcome email (non-blocking)
    resend.emails.send({ from: FROM_EMAIL, to: email, subject: "Welcome to AICTS — Verify Your Email", html: welcomeAlumniHtml({ full_name, email }) })
      .catch((e) => console.error("[Resend]", e));

    // 5. Audit
    await logAudit({ userId, action: AUDIT_ACTIONS.CREATE_ALUMNI, tableName: "alumni", recordId: userId, newValues: { email, course, batch_year } });

    return NextResponse.json({ data: { userId, email }, error: null }, { status: 201 });
  } catch (err) {
    console.error("[register/alumni]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
