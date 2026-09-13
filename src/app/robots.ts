import type { MetadataRoute } from "next";

/**
 * Phase 10 — SEO Enterprise: robots.txt.
 * Next.js auto-serves this at /robots.txt. Admin and API routes are
 * disallowed from crawling; everything else is public.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://maison-oleria.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

// File contains AI-generated response based on internal company sources
