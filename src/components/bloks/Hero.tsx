import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokAsset, StoryblokLink, resolveLink } from "./types";

interface HeroFields {
  title?: string;
  subtitle?: string;
  description?: string;
  cta_primary_label?: string;
  cta_primary_link?: StoryblokLink;
  cta_secondary_label?: string;
  cta_secondary_link?: StoryblokLink;
  background_image?: StoryblokAsset;
  video_url?: string;
}

export default function Hero({ blok }: BaseBlokProps<HeroFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-[#1F1F1F]" className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div {...storyblokEditable(blok)} className="relative max-w-3xl">
        {blok.background_image?.filename && (
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{ backgroundImage: `url(${blok.background_image.filename})`, backgroundSize: "cover" }}
          />
        )}
        {blok.subtitle && (
          <p className="section-subtitle mb-6 text-gold">{blok.subtitle}</p>
        )}
        {blok.title && (
          <h1 className="font-playfair text-5xl md:text-7xl font-normal text-[#FCFAF7] leading-[1.1] mb-8">
            {blok.title}
          </h1>
        )}
        {blok.description && (
          <p className="font-montserrat text-base text-[#C8B8A6] leading-relaxed mb-12 max-w-xl">
            {blok.description}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {blok.cta_primary_label && (
            <Link href={resolveLink(blok.cta_primary_link)} className="btn-gold">
              {blok.cta_primary_label}
            </Link>
          )}
          {blok.cta_secondary_label && (
            <Link
              href={resolveLink(blok.cta_secondary_link)}
              className="btn-outline border-[#FCFAF7] text-[#FCFAF7] hover:bg-[#FCFAF7] hover:text-black"
            >
              {blok.cta_secondary_label}
            </Link>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
