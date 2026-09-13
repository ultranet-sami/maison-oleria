import { prisma } from "@/lib/db";

/**
 * Centralized structured logging.
 * -------------------------------------------------------------
 * Writes to the `Log` table (Postgres) so entries survive across
 * serverless invocations/redeploys, and are queryable from the
 * admin dashboard instead of being lost in ephemeral Vercel console
 * output. Never throws: logging failures must not break the
 * request that triggered them.
 * -------------------------------------------------------------
 */
export type LogLevel = "INFO" | "WARN" | "ERROR" | "SECURITY";

export interface LogInput {
  level?: LogLevel;
  source: string;
  message: string;
  metadata?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}

export async function log(input: LogInput): Promise<void> {
  const { level = "INFO", source, message, metadata, ip, userAgent } = input;
  // Always mirror to console so Vercel's real-time function logs still
  // show activity even if the DB write fails or DB isn't configured yet.
  const consoleFn = level === "ERROR" || level === "SECURITY" ? console.error : console.log;
  consoleFn(`[${level}] [${source}] ${message}`, metadata || "");

  try {
    await prisma.log.create({
      data: {
        level,
        source,
        message,
        metadata: metadata ? (metadata as object) : undefined,
        ip: ip || undefined,
        userAgent: userAgent || undefined,
      },
    });
  } catch (err) {
    // Do not throw from the logger itself.
    console.error("[logger] Failed to persist log entry:", err);
  }
}

export async function logSecurity(source: string, message: string, metadata?: Record<string, unknown>, req?: Request) {
  await log({
    level: "SECURITY",
    source,
    message,
    metadata,
    ip: req ? getClientIp(req) : undefined,
    userAgent: req?.headers.get("user-agent") || undefined,
  });
}

export async function logAudit(actor: string, action: string, opts?: { leadId?: string; metadata?: Record<string, unknown>; ip?: string | null }) {
  try {
    await prisma.auditLog.create({
      data: {
        actor,
        action,
        leadId: opts?.leadId,
        metadata: opts?.metadata ? (opts.metadata as object) : undefined,
        ip: opts?.ip || undefined,
      },
    });
  } catch (err) {
    console.error("[logger] Failed to persist audit log:", err);
  }
}

/** Best-effort extraction of the client IP behind Vercel/Cloudflare proxies. */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf;
  return "unknown";
}

// File contains AI-generated response based on internal company sources
