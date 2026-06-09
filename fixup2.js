const { Client } = require('pg');
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
  console.log("Adding column directly via PG...");
  const connectionString = envVars['DIRECT_URL'] || envVars['DATABASE_URL'];
  if (!connectionString) {
    console.error("No database URL found");
    return;
  }
  
  const client = new Client({ connectionString });
  try {
    await client.connect();
    // Add column if not exists
    await client.query(`
      ALTER TABLE employers 
      ADD COLUMN IF NOT EXISTS company_cover_photo_url text;
    `);
    console.log("Column company_cover_photo_url ensured on employers table!");
  } catch(e) {
    console.error("PG error:", e);
  } finally {
    await client.end();
  }

  console.log("Ensuring buckets exist...");
  const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];
  
  if(supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check and create avatars bucket
    const { data: buckets, error: getErr } = await supabase.storage.listBuckets();
    if(getErr) {
      console.error("Error fetching buckets:", getErr);
      return;
    }
    
    for (const b of ['avatars', 'resumes']) {
      if(!buckets.find(bucket => bucket.name === b)) {
        console.log(`Creating '${b}' bucket...`);
        const { error } = await supabase.storage.createBucket(b, {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        if(error) console.error(`Error creating ${b} bucket:`, error);
        else console.log(`Created ${b} bucket successfully.`);
      } else {
        console.log(`'${b}' bucket already exists.`);
      }
    }
  } else {
    console.log("Missing Supabase credentials for bucket setup.");
  }
  console.log("Done!");
}

main();
