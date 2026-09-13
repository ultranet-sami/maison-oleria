import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokAsset } from "./types";

interface FeatureItem {
  _uid: string;
  title?: string;
  description?: string;
  icon?: StoryblokAsset;
}
interface FeaturesFields {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
}

export default function Features({ blok }: BaseBlokProps<FeaturesFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blok.items?.map((item) => (
            <div key={item._uid} className="p-8 border border-taupe/20 text-center">
              {item.icon?.filename && (
                <img src={item.icon.filename} alt={item.icon.alt || ""} className="w-10 h-10 mx-auto mb-4" />
              )}
              <h3 className="font-playfair text-xl mb-3">{item.title}</h3>
              <p className="font-montserrat text-sm text-black/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
