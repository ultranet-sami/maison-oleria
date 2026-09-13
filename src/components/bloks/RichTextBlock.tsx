import { storyblokEditable, StoryblokRichText, ISbRichtext } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface RichTextFields {
  content?: ISbRichtext;
}

export default function RichTextBlock({ blok }: BaseBlokProps<RichTextFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)} className="prose max-w-3xl mx-auto font-montserrat text-black/80">
        {blok.content && <StoryblokRichText doc={blok.content} />}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
