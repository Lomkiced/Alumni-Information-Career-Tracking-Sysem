const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
async function check() {
  const client = new Client({ connectionString: process.env.DIRECT_URL });
  await client.connect();
  try {
    const res = await client.query(`DELETE FROM auth.users WHERE email = 'alumni@alumni.com';`);
    console.log("Deleted", res.rowCount);
  } catch (err) {
    console.error("SQL Error:", err.message);
  }
  await client.end();
}
check().catch(console.error);
