import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client, safe for Next.js/Vercel serverless.
 * -------------------------------------------------------------
 * In dev, Next.js hot-reloads modules, which would otherwise create
 * a new PrismaClient (and a new DB connection) on every reload.
 * We cache the client on the global object to avoid connection
 * exhaustion. In production (serverless), each cold start gets a
 * fresh client, which is expected; use a pooled DATABASE_URL
 * (Supabase pgbouncer / Neon pooled endpoint) to handle concurrency.
 * -------------------------------------------------------------
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// File contains AI-generated response based on internal company sources
