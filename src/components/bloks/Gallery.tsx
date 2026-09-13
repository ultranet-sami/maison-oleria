import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokAsset } from "./types";

interface GalleryFields {
  title?: string;
  images?: StoryblokAsset[];
}

export default function Gallery({ blok }: BaseBlokProps<GalleryFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)}>
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {blok.images?.map((img, i) => (
            <img
              key={i}
              src={img.filename}
              alt={img.alt || ""}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
