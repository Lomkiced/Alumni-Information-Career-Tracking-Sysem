const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envLocal = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envLocal.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if(match) {
    envVars[match[1]] = match[2].replace(/^"|"$/g, '').trim();
  }
});

async function main() {
  console.log("Syncing email verification status...");
  const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];
  
  if(!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Fetch all users from Supabase Auth
  const { data: { users }, error: authErr } = await supabase.auth.admin.listUsers();
  
  if (authErr) {
    console.error("Error fetching auth users:", authErr);
    return;
  }
  
  const verifiedUserIds = users
    .filter(u => u.email_confirmed_at != null)
    .map(u => u.id);
    
  console.log(`Found ${verifiedUserIds.length} verified users in auth.users`);
  
  if (verifiedUserIds.length > 0) {
    // Update profiles table for all these users
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_verified: true })
      .in('id', verifiedUserIds);
      
    if (error) {
      console.error("Error updating profiles:", error);
    } else {
      console.log(`Successfully synced is_verified = true for ${verifiedUserIds.length} profiles!`);
    }
  } else {
    console.log("No verified users to sync.");
  }
}

main();
