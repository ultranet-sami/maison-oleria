/**
 * Storyblok CMS bootstrap — Maison Oleria
 * ----------------------------------------------------------------
 * Central place where the Storyblok SDK is configured and every
 * Bloks (components) is registered against its Storyblok
 * component technical name. Add a new line in `components` every
 * time you create a new Blok component under src/components/bloks.
 * ----------------------------------------------------------------
 */
import { storyblokInit, apiPlugin, ISbStoryData } from "@storyblok/react";

import Page from "@/components/bloks/Page";
import Hero from "@/components/bloks/Hero";
import Features from "@/components/bloks/Features";
import Services from "@/components/bloks/Services";
import Faq from "@/components/bloks/Faq";
import Testimonials from "@/components/bloks/Testimonials";
import Pricing from "@/components/bloks/Pricing";
import Team from "@/components/bloks/Team";
import BlogPosts from "@/components/bloks/BlogPosts";
import CtaSection from "@/components/bloks/CtaSection";
import Gallery from "@/components/bloks/Gallery";
import VideoBlock from "@/components/bloks/VideoBlock";
import RichTextBlock from "@/components/bloks/RichTextBlock";
import Statistics from "@/components/bloks/Statistics";
import Timeline from "@/components/bloks/Timeline";
import ContactSection from "@/components/bloks/ContactSection";
import NewsletterSection from "@/components/bloks/NewsletterSection";
import Banner from "@/components/bloks/Banner";
import PopupBlock from "@/components/bloks/PopupBlock";

export const STORYBLOK_VERSION: "draft" | "published" =
  (process.env.STORYBLOK_VERSION as "draft" | "published") || "published";

export function isStoryblokConfigured(): boolean {
  return Boolean(process.env.STORYBLOK_API_TOKEN);
}

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      region: (process.env.STORYBLOK_REGION as "eu" | "us") || "eu",
    },
    components: {
      page: Page,
      hero: Hero,
      features: Features,
      services: Services,
      faq: Faq,
      testimonials: Testimonials,
      pricing: Pricing,
      team: Team,
      blog_posts: BlogPosts,
      cta_section: CtaSection,
      gallery: Gallery,
      video_block: VideoBlock,
      rich_text_block: RichTextBlock,
      statistics: Statistics,
      timeline: Timeline,
      contact_section: ContactSection,
      newsletter_section: NewsletterSection,
      banner: Banner,
      popup: PopupBlock,
    },
  });
}

/**
 * Server-side fetch helper for a single Storyblok story.
 * `slug` examples: "home", "blog/mon-article", "config/navigation".
 * Returns null if Storyblok is not configured or the story is missing,
 * so calling code can always fall back to static/default content.
 */
export async function getStory<T = Record<string, unknown>>(
  slug: string,
  extraParams: Record<string, string> = {}
): Promise<ISbStoryData<T> | null> {
  if (!isStoryblokConfigured()) return null;
  const StoryblokClient = (await import("storyblok-js-client")).default;
  const client = new StoryblokClient({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    region: (process.env.STORYBLOK_REGION as "eu" | "us") || "eu",
  });
  try {
    const { data } = await client.get(`cdn/stories/${slug}`, {
      version: STORYBLOK_VERSION,
      resolve_relations: "featured_posts,related_posts",
      ...extraParams,
    });
    return data.story as ISbStoryData<T>;
  } catch {
    return null;
  }
}

/** List all stories under a given starts_with path (e.g. "blog/"). */
export async function getStories<T = Record<string, unknown>>(
  startsWith: string,
  extraParams: Record<string, string> = {}
): Promise<ISbStoryData<T>[]> {
  if (!isStoryblokConfigured()) return [];
  const StoryblokClient = (await import("storyblok-js-client")).default;
  const client = new StoryblokClient({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    region: (process.env.STORYBLOK_REGION as "eu" | "us") || "eu",
  });
  try {
    const { data } = await client.get("cdn/stories", {
      version: STORYBLOK_VERSION,
      starts_with: startsWith,
      per_page: 100,
      ...extraParams,
    });
    return (data.stories as ISbStoryData<T>[]) || [];
  } catch {
    return [];
  }
}

// File contains AI-generated response based on internal company sources
