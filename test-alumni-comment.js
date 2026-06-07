require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  // Let's try to login as alumni
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'alumni1@example.com',
    password: 'password123'
  });
  
  if (authError) {
    return console.error("Login failed:", authError);
  }

  const user = authData.user;
  console.log("Logged in as:", user.id);

  // Get an announcement
  const { data: announcements } = await supabase.from('announcements').select('id').limit(1);
  if (!announcements || announcements.length === 0) {
    return console.log("No announcements found");
  }
  const annId = announcements[0].id;

  console.log(`Inserting comment for user ${user.id} and announcement ${annId}`);
  const { data, error } = await supabase
    .from('comments')
    .insert({
      announcement_id: annId,
      user_id: user.id,
      content: 'Test comment as alumni'
    })
    .select(`
      id,
      profiles (
        full_name
      )
    `);
    
  console.log("Result:", data);
  console.log("Error:", JSON.stringify(error, null, 2));
}

test();
