const { Client } = require('pg');
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
  console.log("Setting up Supabase Storage RLS policies...");
  const connectionString = envVars['DIRECT_URL'] || envVars['DATABASE_URL'];
  if (!connectionString) {
    console.error("No database URL found");
    return;
  }
  
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    // Create RLS policies for storage.objects
    await client.query(`
      -- Drop policies if they exist to avoid duplication errors
      DROP POLICY IF EXISTS "Avatars are publicly accessible." ON storage.objects;
      DROP POLICY IF EXISTS "Anyone can upload an avatar." ON storage.objects;
      DROP POLICY IF EXISTS "Anyone can update an avatar." ON storage.objects;
      DROP POLICY IF EXISTS "Anyone can delete an avatar." ON storage.objects;

      -- Create new policies for avatars
      CREATE POLICY "Avatars are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
      CREATE POLICY "Anyone can upload an avatar." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
      CREATE POLICY "Anyone can update an avatar." ON storage.objects FOR UPDATE WITH CHECK (bucket_id = 'avatars');
      CREATE POLICY "Anyone can delete an avatar." ON storage.objects FOR DELETE USING (bucket_id = 'avatars');
      
      -- Do the same for resumes to prevent future issues!
      DROP POLICY IF EXISTS "Resumes are publicly accessible." ON storage.objects;
      DROP POLICY IF EXISTS "Anyone can upload a resume." ON storage.objects;
      DROP POLICY IF EXISTS "Anyone can update a resume." ON storage.objects;
      DROP POLICY IF EXISTS "Anyone can delete a resume." ON storage.objects;

      CREATE POLICY "Resumes are publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'resumes');
      CREATE POLICY "Anyone can upload a resume." ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
      CREATE POLICY "Anyone can update a resume." ON storage.objects FOR UPDATE WITH CHECK (bucket_id = 'resumes');
      CREATE POLICY "Anyone can delete a resume." ON storage.objects FOR DELETE USING (bucket_id = 'resumes');
    `);
    
    console.log("Storage RLS policies applied successfully!");
  } catch(e) {
    console.error("PG error:", e);
  } finally {
    await client.end();
  }
}

main();
