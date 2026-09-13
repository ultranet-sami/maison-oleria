import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Security Headers (Phase 2 — Enterprise security hardening).
 * -------------------------------------------------------------
 * Applied to every response via Next.js `headers()`. CSP allow-lists
 * are kept as permissive as the current third-party integrations
 * require (Stripe.js, Storyblok, GA/Meta/TikTok pixels, Turnstile/
 * reCAPTCHA) — tighten further as integrations are audited.
 * Cloudflare/WAF can sit in front of this without any code change
 * (headers are additive, not overridden by upstream proxies).
 * -------------------------------------------------------------
 */
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",
  // 'unsafe-inline'/'unsafe-eval' kept for Next.js dev + third-party pixel scripts;
  // tighten with nonces/hashes once all script sources are finalized (Phase 5/6).
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https://js.stripe.com https://challenges.cloudflare.com https://www.google.com",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: cspDirectives },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

// ---------------------------------------------------------------
// Phase 8 — Sentry monitoring wrapper.
// Only active in CI/production when SENTRY_ORG/SENTRY_PROJECT are
// configured; withSentryConfig is safe to apply unconditionally
// since it becomes a no-op without an auth token at build time.
// ---------------------------------------------------------------
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  disableLogger: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  tunnelRoute: undefined,
  autoInstrumentServerFunctions: true,
});

// File contains AI-generated response based on internal company sources

