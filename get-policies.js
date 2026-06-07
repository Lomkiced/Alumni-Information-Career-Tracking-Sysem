require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  await client.connect();
  const res = await client.query(`
    SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE tablename = 'profiles';
  `);
  console.table(res.rows);
  await client.end();
}
run();
