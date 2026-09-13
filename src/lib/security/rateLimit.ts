import { prisma } from "@/lib/db";

/**
 * Database-backed rate limiter.
 * -------------------------------------------------------------
 * Works across all Vercel serverless instances/regions (unlike an
 * in-memory Map, which is per-instance and useless for real
 * protection in a serverless environment). Uses the `Log` table as
 * a lightweight sliding-window counter store to avoid introducing
 * a new dependency; for high-traffic production use, swap this for
 * Upstash Redis (@upstash/ratelimit) — same function signature.
 * -------------------------------------------------------------
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export async function rateLimit(key: string, opts: { limit: number; windowMs: number }): Promise<RateLimitResult> {
  const since = new Date(Date.now() - opts.windowMs);
  const resetAt = new Date(Date.now() + opts.windowMs);

  try {
    const count = await prisma.log.count({
      where: {
        source: "rate-limit",
        message: key,
        createdAt: { gte: since },
      },
    });

    if (count >= opts.limit) {
      return { allowed: false, remaining: 0, resetAt };
    }

    // Record this attempt.
    await prisma.log.create({
      data: { level: "INFO", source: "rate-limit", message: key },
    });

    return { allowed: true, remaining: Math.max(0, opts.limit - count - 1), resetAt };
  } catch (err) {
    // Fail-open on infra errors so a DB hiccup does not take down the
    // whole site, but log loudly so it gets noticed.
    console.error("[rateLimit] DB error, failing open:", err);
    return { allowed: true, remaining: opts.limit, resetAt };
  }
}

/** Convenience helper: rate-limit by IP + route name. */
export async function rateLimitByIp(ip: string, route: string, opts: { limit: number; windowMs: number }) {
  return rateLimit(`${route}:${ip}`, opts);
}

// File contains AI-generated response based on internal company sources
