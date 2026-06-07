require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Fetching profiles and announcements...");
  const { data: users } = await supabase.from('profiles').select('id').limit(1);
  const userId = users[0].id;
  
  const { data: announcements } = await supabase.from('announcements').select('id').limit(1);
  const annId = announcements[0].id;

  console.log(`Inserting comment for user ${userId} and announcement ${annId}`);
  const { data, error } = await supabase
    .from('comments')
    .insert({
      announcement_id: annId,
      user_id: userId,
      content: 'Test comment'
    })
    .select(`
      id,
      profiles (
        full_name
      )
    `);
    
  console.log("Result:", data, "Error:", JSON.stringify(error, null, 2));
}

test();
