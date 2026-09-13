import * as Sentry from "@sentry/nextjs";

/**
 * Phase 8 — Monitoring: Sentry client-side configuration.
 * -------------------------------------------------------------
 * Loaded automatically by @sentry/nextjs on the browser bundle.
 * Only activates if NEXT_PUBLIC_SENTRY_DSN is set — silently no-ops
 * otherwise, so local dev without a DSN is unaffected.
 * -------------------------------------------------------------
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.5,
  environment: process.env.NODE_ENV,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
});

// File contains AI-generated response based on internal company sources
