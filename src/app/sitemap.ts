import type { MetadataRoute } from "next";

/**
 * Phase 10 — SEO Enterprise: dynamic sitemap.
 * Next.js auto-serves this at /sitemap.xml. Extend the `routes`
 * array as new static pages are added; dynamic Storyblok pages can
 * be appended here later by fetching the story list server-side.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://maison-oleria.com";

  const routes = [
    "",
    "/reserver",
    "/confidentialite",
    "/mentions-legales",
    "/cgv",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}

// File contains AI-generated response based on internal company sources
