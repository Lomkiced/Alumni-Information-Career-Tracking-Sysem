require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
async function test() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  // 1. Find Alumni to delete
  const { data: users } = await supabase.auth.admin.listUsers();
  const alumni = users.users.find(u => u.email === 'alumni@alumni.com');
  if (!alumni) return console.log('Alumni not found');
  console.log('Found alumni ID:', alumni.id);

  const { PrismaClient } = require('./generated/prisma');
  const { PrismaPg } = require('@prisma/adapter-pg');
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Attempting Prisma profile.delete...');
  try {
    await prisma.profile.delete({ where: { id: alumni.id } });
    console.log('Prisma delete succeeded!');
  } catch (err) {
    console.error('Prisma delete failed:', err.message);
  }

  console.log('Attempting Supabase deleteUser...');
  const { error } = await supabase.auth.admin.deleteUser(alumni.id);
  console.log('Supabase delete error:', error);

  await prisma.$disconnect();
  await pool.end();
}
test().catch(console.error);
