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
      .single<{ full_name: string; phone: string | null }>();

    const { data: employer, error: employerErr } = await supabase
      .from("employers")
      .select("*")
      .eq("id", user.id)
      .single<any>();

    if (employerErr || !employer) {
      return NextResponse.json({ error: "Employer profile not found" }, { status: 404 });
    }

    const emp = employer as any;
    const formattedData = {
      full_name: (profile as any)?.full_name || "",
      phone: (profile as any)?.phone || "",
      company_name: emp.company_name,
      industry: emp.industry,
      company_size: emp.company_size || "",
      business_permit_number: emp.business_permit_number || "",
      company_address: emp.company_address || "",
      company_website: emp.company_website || "",
      company_description: emp.company_description || "",
      company_logo_url: emp.company_logo_url || "",
      company_cover_photo_url: emp.company_cover_photo_url || "",
      approval_status: emp.approval_status,
      rejection_reason: emp.rejection_reason,
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
    const { error: profileErr } = await (supabase.from("profiles") as any)
      .update({
        full_name: data.full_name,
        phone: data.phone || null,
      })
      .eq("id", user.id);

    if (profileErr) throw profileErr;

    // Update Employer
    const { error: employerErr } = await (supabase.from("employers") as any)
      .update({
        company_name: data.company_name,
        industry: data.industry,
        company_size: data.company_size || null,
        business_permit_number: data.business_permit_number || null,
        company_address: data.company_address || null,
        company_website: data.company_website || null,
        company_description: data.company_description || null,
        company_logo_url: data.company_logo_url || null,
        company_cover_photo_url: data.company_cover_photo_url || null,
      })
      .eq("id", user.id);

    if (employerErr) {
      console.error("Employer Update Error:", employerErr);
      throw employerErr;
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating employer profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
