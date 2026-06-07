import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase env variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing basic employers query...");
  const { data: d1, error: e1 } = await supabase.from('employers').select('*').limit(2);
  console.log("D1:", d1?.length, "Error:", e1);

  console.log("\nTesting join with profiles...");
  const { data: d2, error: e2 } = await supabase.from('employers').select(`
    id, company_name, industry,
    profiles!inner(full_name, email)
  `).limit(2);
  console.log("D2:", d2?.length, "Error:", e2);
  
  if (e2) {
    console.log("\nTesting explicit foreign key...");
    const { data: d3, error: e3 } = await supabase.from('employers').select(`
      id, company_name, industry,
      profiles!employers_id_fkey(full_name, email)
    `).limit(2);
    console.log("D3:", d3?.length, "Error:", e3);
  }
}

test();
