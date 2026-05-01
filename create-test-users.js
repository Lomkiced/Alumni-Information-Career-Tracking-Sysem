require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function createAccount(email, password, role, fullName) {
  // Check if exists
  const { data: users } = await supabase.auth.admin.listUsers();
  const existing = users.users.find(u => u.email === email);
  
  let userId;
  
  if (existing) {
    console.log(`User ${email} already exists. Updating password and role...`);
    await supabase.auth.admin.updateUserById(existing.id, { password, email_confirm: true });
    userId = existing.id;
  } else {
    console.log(`Creating user ${email}...`);
    const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (authErr) {
      console.error(`Error creating auth user ${email}:`, authErr);
      return;
    }
    userId = authUser.user.id;
  }

  // Update profile
  const { error: profileErr } = await supabase.from("profiles").upsert({
    id: userId,
    email: email,
    full_name: fullName,
    role: role,
    is_verified: true,
  });

  if (profileErr) {
    console.error(`Error updating profile for ${email}:`, profileErr);
  }

  // If employer, ensure approved in employers table
  if (role === "employer") {
    const { error: empErr } = await supabase.from("employers").upsert({
      id: userId,
      company_name: "Tech Solutions Inc.",
      industry: "Technology",
      approval_status: "approved",
      approved_at: new Date().toISOString(),
    });
    if (empErr) {
      console.error(`Error updating employer record for ${email}:`, empErr);
    }
  }

  // If alumni, ensure alumni record exists
  if (role === "alumni") {
    const { error: alumErr } = await supabase.from("alumni").upsert({
      id: userId,
      course: "BS Information Technology",
      batch_year: 2024,
      graduation_year: 2024,
      is_profile_public: true,
    });
    if (alumErr) {
      console.error(`Error updating alumni record for ${email}:`, alumErr);
    }
  }

  console.log(`✅ Successfully set up ${role}: ${email}`);
}

async function main() {
  await createAccount("admin@pclu.edu.ph", "password123", "admin", "System Administrator");
  await createAccount("employer@company.com", "password123", "employer", "Employer HR");
  await createAccount("alumni@alumni.com", "password123", "alumni", "Juan Alumni");
  
  console.log("\n=================================");
  console.log("Credentials Ready:");
  console.log("---------------------------------");
  console.log("ADMIN");
  console.log("Email: admin@pclu.edu.ph");
  console.log("Pass : password123");
  console.log("---------------------------------");
  console.log("EMPLOYER");
  console.log("Email: employer@company.com");
  console.log("Pass : password123");
  console.log("---------------------------------");
  console.log("ALUMNI");
  console.log("Email: alumni@alumni.com");
  console.log("Pass : password123");
  console.log("=================================");
}

main().catch(console.error);
