// lib/prisma.ts
// Prisma Client singleton with pg adapter (Prisma v7 requirement)
// Uses connection pooling via Supabase pgbouncer

import { PrismaClient, Prisma } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// Re-export Prisma namespace for use in other files
export { Prisma };

import { Pool } from "pg";

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

const globalForPrisma2 = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma2.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma2.prisma = prisma;
