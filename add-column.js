const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function addColumn() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  await client.connect();
  const sql = `ALTER TABLE employers ADD COLUMN IF NOT EXISTS company_description TEXT;`;
  await client.query(sql);
  console.log('Added company_description column successfully!');
  await client.end();
}

addColumn().catch(console.error);
