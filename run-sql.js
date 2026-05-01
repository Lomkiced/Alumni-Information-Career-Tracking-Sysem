const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  await client.connect();
  const sql = fs.readFileSync('fix-rls.sql', 'utf8');
  await client.query(sql);
  console.log('Fixed RLS successfully!');
  await client.end();
}

fix().catch(console.error);
