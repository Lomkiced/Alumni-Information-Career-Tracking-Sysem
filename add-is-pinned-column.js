const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function addColumn() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  await client.connect();
  const sql = `ALTER TABLE announcements ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;`;
  await client.query(sql);
  console.log('Added is_pinned column successfully!');
  await client.end();
}

addColumn().catch(console.error);
