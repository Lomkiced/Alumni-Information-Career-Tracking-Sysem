const { PrismaClient } = require('./generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const id = '7d863d04-7bf8-494c-b8fb-3e63a2dc173f';
    console.log("Attempting to delete profile for", id);
    const result = await prisma.profile.delete({ where: { id } });
    console.log("Successfully deleted profile:", result);
  } catch (err) {
    console.error("Failed to delete profile:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}
main();
