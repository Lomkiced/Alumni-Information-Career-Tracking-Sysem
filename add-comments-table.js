const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  await client.connect();
  const sql = `
    CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS comments_announcement_id_idx ON comments(announcement_id);
    CREATE INDEX IF NOT EXISTS comments_user_id_idx ON comments(user_id);
  `;
  await client.query(sql);
  console.log('Comments table created successfully!');
  await client.end();
}

migrate().catch(console.error);
