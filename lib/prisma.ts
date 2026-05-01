// lib/prisma.ts
// Prisma Client singleton with pg adapter (Prisma v7 requirement)
// Uses connection pooling via Supabase pgbouncer

import { PrismaClient, Prisma } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// Re-export Prisma namespace for use in other files
export { Prisma };

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
