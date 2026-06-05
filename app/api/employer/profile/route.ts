import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { employerProfileSchema } from "@/lib/validations/employer.schema";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .single();

    const { data: employer, error: employerErr } = await supabase
      .from("employers")
      .select("*")
      .eq("id", user.id)
      .single();

    if (employerErr || !employer) {
      return NextResponse.json({ error: "Employer profile not found" }, { status: 404 });
    }

    const formattedData = {
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
      company_name: employer.company_name,
      industry: employer.industry,
      company_size: employer.company_size || "",
      business_permit_number: employer.business_permit_number || "",
      company_address: employer.company_address || "",
      company_website: employer.company_website || "",
      company_description: employer.company_description || "",
      company_logo_url: employer.company_logo_url || "",
      approval_status: employer.approval_status,
      rejection_reason: employer.rejection_reason,
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching employer profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Validate input using Zod
    const validationResult = employerProfileSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;

    // Update Profile
    const { error: profileErr } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        phone: data.phone || null,
      })
      .eq("id", user.id);

    if (profileErr) throw profileErr;

    // Update Employer
    const { error: employerErr } = await supabase
      .from("employers")
      .update({
        company_name: data.company_name,
        industry: data.industry,
        company_size: data.company_size || null,
        business_permit_number: data.business_permit_number || null,
        company_address: data.company_address || null,
        company_website: data.company_website || null,
        company_description: data.company_description || null,
        company_logo_url: data.company_logo_url || null,
      })
      .eq("id", user.id);

    if (employerErr) throw employerErr;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating employer profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
