import { storyblokEditable, StoryblokRichText, ISbRichtext, StoryblokRichTextNode } from "@storyblok/react";
import { ReactElement, JSXElementConstructor } from "react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface RichTextFields {
  content?: ISbRichtext;
}

// The Storyblok management API types content.type as a generic `string`,
// while the StoryblokRichText renderer expects the narrower
// StoryblokRichTextNodeTypes union. The runtime shape is always valid
// rich-text JSON coming straight from Storyblok, so a targeted cast here
// is safe and avoids widening types across the rest of the file.
type RichTextDoc = StoryblokRichTextNode<ReactElement<unknown, string | JSXElementConstructor<unknown>>>;

export default function RichTextBlock({ blok }: BaseBlokProps<RichTextFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)} className="prose max-w-3xl mx-auto font-montserrat text-black/80">
        {blok.content && <StoryblokRichText doc={blok.content as unknown as RichTextDoc} />}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
