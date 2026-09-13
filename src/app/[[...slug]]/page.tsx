/**
 * Storyblok-driven dynamic page catch-all.
 * ----------------------------------------------------------------
 * This route renders ANY page created in Storyblok under the
 * "pages" content type (technical name "page") using the slug as
 * the Storyblok story full_slug. Example:
 *  - Story slug "home"          -> "/"
 *  - Story slug "a-propos"      -> "/a-propos"
 *  - Story slug "promo/soldes"  -> "/promo/soldes"
 *
 * If Storyblok is not configured or the story doesn't exist, this
 * route returns null and Next.js falls through to any statically
 * defined page at the same path (e.g. src/app/about/page.tsx),
 * so existing hand-written pages keep working unchanged.
 *
 * IMPORTANT: because this is a catch-all at the root, make sure no
 * other route collides. Existing static routes like /about,
 * /services, /contact etc. take precedence over this dynamic route
 * for their exact path since Next.js prefers more specific routes.
 * ----------------------------------------------------------------
 */
import { notFound } from "next/navigation";
import { StoryblokComponent } from "@storyblok/react";
import { getStory, isStoryblokConfigured } from "@/lib/storyblok";
import StoryblokBridgeLoader from "@/components/StoryblokBridgeLoader";

interface Params {
  slug?: string[];
}

export const revalidate = 30;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const fullSlug = slug?.join("/") || "home";
  const story = await getStory(fullSlug);
  const seo = (story?.content as Record<string, unknown>)?.seo as
    | { title?: string; description?: string; og_image?: { filename?: string } }
    | undefined;
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.og_image?.filename ? { images: [seo.og_image.filename] } : undefined,
  };
}

export default async function CatchAllPage({ params }: { params: Promise<Params> }) {
  if (!isStoryblokConfigured()) notFound();

  const { slug } = await params;
  const fullSlug = slug?.join("/") || "home";
  const story = await getStory(fullSlug);

  if (!story) notFound();

  return (
    <>
      <StoryblokBridgeLoader storyId={story.id} />
      <StoryblokComponent blok={story.content} />
    </>
  );
}

// File contains AI-generated response based on internal company sources
