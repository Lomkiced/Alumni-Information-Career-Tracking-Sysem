const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
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
  console.log("Pushing schema...");
  try {
    execSync('npx prisma db push --accept-data-loss', {
      env: { ...process.env, ...envVars },
      stdio: 'inherit'
    });
    console.log("Prisma db push success.");
    execSync('npx prisma generate', {
      env: { ...process.env, ...envVars },
      stdio: 'inherit'
    });
    console.log("Prisma generate success.");
  } catch(e) {
    console.error("Prisma error:", e);
  }

  console.log("Ensuring buckets exist...");
  const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY']; // Must use service_role to create buckets
  
  if(supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check and create avatars bucket
    const { data: buckets, error: getErr } = await supabase.storage.listBuckets();
    if(getErr) {
      console.error("Error fetching buckets:", getErr);
      return;
    }
    
    const hasAvatars = buckets.find(b => b.name === 'avatars');
    if(!hasAvatars) {
      console.log("Creating 'avatars' bucket...");
      const { data, error } = await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
      });
      if(error) console.error("Error creating avatars bucket:", error);
      else console.log("Created avatars bucket successfully.");
    } else {
      console.log("'avatars' bucket already exists.");
    }

    // Since resumes is also used in alumni profile, let's create it too if missing
    const hasResumes = buckets.find(b => b.name === 'resumes');
    if(!hasResumes) {
      console.log("Creating 'resumes' bucket...");
      const { data, error } = await supabase.storage.createBucket('resumes', {
        public: true,
        fileSizeLimit: 5242880,
        allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      });
      if(error) console.error("Error creating resumes bucket:", error);
      else console.log("Created resumes bucket successfully.");
    } else {
      console.log("'resumes' bucket already exists.");
    }
  } else {
    console.log("Missing Supabase credentials for bucket setup.");
  }
}

main();
