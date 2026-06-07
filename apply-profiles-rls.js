require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');
const fs = require('fs');

async function fix() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  await client.connect();
  const sql = fs.readFileSync('fix-profiles-rls.sql', 'utf8');
  await client.query(sql);
  console.log('Profiles RLS policy applied successfully!');
  await client.end();
}

fix().catch(console.error);
