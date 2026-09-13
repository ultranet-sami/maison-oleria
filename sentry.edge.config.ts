import * as Sentry from "@sentry/nextjs";

/**
 * Phase 8 — Monitoring: Sentry Edge runtime configuration.
 * -------------------------------------------------------------
 * Loaded automatically by @sentry/nextjs for code running on the
 * Edge runtime (e.g. middleware.ts). Only activates if
 * NEXT_PUBLIC_SENTRY_DSN is set.
 * -------------------------------------------------------------
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.2,
  environment: process.env.NODE_ENV,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});

// File contains AI-generated response based on internal company sources
