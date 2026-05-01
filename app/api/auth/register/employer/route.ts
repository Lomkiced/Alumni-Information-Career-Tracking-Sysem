// app/api/auth/register/employer/route.ts
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { employerRegisterSchema } from "@/lib/validations/auth.schema";
import { resend, FROM_EMAIL } from "@/lib/email/resend";
import { welcomeEmployerHtml } from "@/lib/email/templates/welcome-employer";
import { logAudit, AUDIT_ACTIONS } from "@/lib/utils/audit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = employerRegisterSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, password, full_name, company_name, industry, company_size, business_permit_number, company_address, company_website } = parsed.data;
    const adminClient = createAdminClient();

    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email, password, email_confirm: false, user_metadata: { full_name },
    });
    if (authError || !authData.user) {
      const msg = authError?.message?.includes("already registered") ? "Email already registered." : (authError?.message ?? "Registration failed");
      return NextResponse.json({ error: msg }, { status: authError?.message?.includes("already") ? 409 : 400 });
    }

    const userId = authData.user.id;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: profileError } = await (adminClient as any).from("profiles").insert({
      id: userId, role: "employer", full_name, email, is_verified: false, is_active: true,
    });
    if (profileError) {
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: employerError } = await (adminClient as any).from("employers").insert({
      id: userId, company_name, industry, company_size: company_size || null,
      business_permit_number: business_permit_number || null, company_address: company_address || null,
      company_website: company_website || null, approval_status: "pending",
    });
    if (employerError) {
      await adminClient.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: "Failed to create employer record" }, { status: 500 });
    }

    resend.emails.send({ from: FROM_EMAIL, to: email, subject: "AICTS — Employer Registration Received", html: welcomeEmployerHtml({ full_name, company_name }) })
      .catch((e) => console.error("[Resend]", e));

    await logAudit({ userId, action: AUDIT_ACTIONS.CREATE_EMPLOYER, tableName: "employers", recordId: userId, newValues: { company_name, industry } });

    return NextResponse.json({ data: { userId, email }, error: null }, { status: 201 });
  } catch (err) {
    console.error("[register/employer]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
