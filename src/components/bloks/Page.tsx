/**
 * Page Blok — root component for any Storyblok "page" content type.
 * Renders the ordered list of Bloks in `body` via StoryblokComponent.
 */
import { storyblokEditable, StoryblokComponent, SbBlokData } from "@storyblok/react";

interface PageStoryblok extends SbBlokData {
  body?: SbBlokData[];
}

export default function Page({ blok }: { blok: PageStoryblok }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}

// File contains AI-generated response based on internal company sources
