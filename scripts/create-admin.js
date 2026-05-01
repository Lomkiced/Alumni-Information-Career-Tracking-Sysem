const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  console.log("Creating default admin account...");
  
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@pclu.edu.ph',
    password: 'AdminPassword123!',
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes('already been registered')) {
        console.log("Admin account already exists. You can log in with admin@pclu.edu.ph / AdminPassword123!");
        return;
    }
    console.error('Error creating user auth:', error);
    return;
  }

  const userId = data.user.id;
  
  // Insert profile
  const { error: profileError } = await supabase.from('profiles').insert([
    {
      id: userId,
      role: 'admin',
      full_name: 'System Administrator',
      email: 'admin@pclu.edu.ph',
      is_verified: true,
      is_active: true
    }
  ]);

  if (profileError) {
    console.error('Error creating profile:', profileError);
  } else {
    console.log('\n✅ Admin user successfully created!');
    console.log('Email: admin@pclu.edu.ph');
    console.log('Password: AdminPassword123!');
  }
}

createAdmin();
