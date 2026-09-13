import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokLink, resolveLink } from "./types";

interface CtaFields {
  title?: string;
  description?: string;
  cta_label?: string;
  cta_link?: StoryblokLink;
}

export default function CtaSection({ blok }: BaseBlokProps<CtaFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-gold" className="text-center">
      <div {...storyblokEditable(blok)}>
        {blok.title && <h2 className="font-playfair text-4xl md:text-5xl text-[#1F1F1F] mb-6">{blok.title}</h2>}
        {blok.description && <p className="font-montserrat text-sm text-[#1F1F1F]/70 mb-10 max-w-xl mx-auto">{blok.description}</p>}
        {blok.cta_label && (
          <Link href={resolveLink(blok.cta_link)} className="btn-primary">
            {blok.cta_label}
          </Link>
        )}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
