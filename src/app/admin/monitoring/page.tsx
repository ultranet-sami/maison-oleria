import { prisma } from "@/lib/db";

/**
 * Admin Monitoring Dashboard (Phase 8).
 * -------------------------------------------------------------
 * Server-rendered, admin-only (protected by the /admin layout's
 * session check + middleware). Reads directly from Prisma's Log
 * and AuditLog tables to give a lightweight, self-hosted view of
 * system health without depending on the Sentry UI for everyday
 * checks. Sentry (sentry.*.config.ts) remains the source of truth
 * for stack traces / alerting; this page is a fast internal
 * complement for recent activity and error volume.
 * -------------------------------------------------------------
 */

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  return new Date(d).toLocaleString("fr-FR");
}

export default async function MonitoringPage() {
  const [recentLogs, errorCount24h, recentAudit, aiUsage] = await Promise.all([
    prisma.log.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.log.count({
      where: {
        level: { in: ["ERROR", "SECURITY"] },
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.aiUsageLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const stats = {
    total: recentLogs.length,
    errors24h: errorCount24h,
    warnings: recentLogs.filter((l) => l.level === "WARN").length,
    security: recentLogs.filter((l) => l.level === "SECURITY").length,
  };

  return (
    <div>
      <h1 className="font-playfair text-3xl mb-2">Monitoring</h1>
      <p className="font-montserrat text-xs text-white/50 mb-8">
        Logs applicatifs, audit trail et usage IA. Pour le suivi des
        erreurs frontend/backend en temps reel et les alertes, voir le
        dashboard Sentry.{" "}
        {process.env.SENTRY_ORG && process.env.SENTRY_PROJECT ? (
          <a
            href={`https://sentry.io/organizations/${process.env.SENTRY_ORG}/projects/${process.env.SENTRY_PROJECT}/`}
            target="_blank"
            rel="noreferrer"
            className="text-gold underline"
          >
            Ouvrir Sentry
          </a>
        ) : (
          "(SENTRY_ORG / SENTRY_PROJECT non configures)"
        )}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          ["Logs recents", stats.total],
          ["Erreurs (24h)", stats.errors24h],
          ["Warnings", stats.warnings],
          ["Securite", stats.security],
        ].map(([label, value]) => (
          <div key={label as string} className="bg-[#1F1F1F] border border-gold/20 p-5 text-center">
            <div className="font-playfair text-2xl text-gold">{value as number}</div>
            <div className="font-montserrat text-[9px] tracking-widest uppercase text-white/50 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-playfair text-xl mb-4">Logs recents</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gold/20 text-left">
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Date</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Niveau</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Source</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Message</th>
            </tr>
          </thead>
          <tbody>
            {recentLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-white/40 font-montserrat text-xs">
                  Aucun log pour le moment.
                </td>
              </tr>
            ) : (
              recentLogs.map((log) => (
                <tr key={log.id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white/60 text-xs whitespace-nowrap">{formatDate(log.createdAt)}</td>
                  <td className="py-2 pr-4 text-xs">
                    <span
                      className={
                        log.level === "ERROR" || log.level === "SECURITY"
                          ? "text-red-400"
                          : log.level === "WARN"
                            ? "text-yellow-400"
                            : "text-white/70"
                      }
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{log.source}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{log.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="font-playfair text-xl mb-4">Audit trail (actions admin)</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gold/20 text-left">
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Date</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Acteur</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Action</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">IP</th>
            </tr>
          </thead>
          <tbody>
            {recentAudit.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-white/40 font-montserrat text-xs">
                  Aucune entree d&apos;audit pour le moment.
                </td>
              </tr>
            ) : (
              recentAudit.map((entry) => (
                <tr key={entry.id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white/60 text-xs whitespace-nowrap">{formatDate(entry.createdAt)}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{entry.actor}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{entry.action}</td>
                  <td className="py-2 pr-4 text-white/60 text-xs">{entry.ip || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="font-playfair text-xl mb-4">Usage IA (admin)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gold/20 text-left">
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Date</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Provider</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Modele</th>
              <th className="py-2 pr-4 font-montserrat text-[9px] tracking-widest uppercase text-white/40">Succes</th>
            </tr>
          </thead>
          <tbody>
            {aiUsage.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-white/40 font-montserrat text-xs">
                  Aucun usage IA pour le moment.
                </td>
              </tr>
            ) : (
              aiUsage.map((entry) => (
                <tr key={entry.id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white/60 text-xs whitespace-nowrap">{formatDate(entry.createdAt)}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{entry.provider}</td>
                  <td className="py-2 pr-4 text-white/80 text-xs">{entry.model || "-"}</td>
                  <td className="py-2 pr-4 text-xs">
                    <span className={entry.success ? "text-green-400" : "text-red-400"}>
                      {entry.success ? "OK" : "Echec"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
