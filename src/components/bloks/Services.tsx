import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokLink, resolveLink } from "./types";

interface ServiceItem {
  _uid: string;
  title?: string;
  description?: string;
  link?: StoryblokLink;
}
interface ServicesFields {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: ServiceItem[];
}

export default function Services({ blok }: BaseBlokProps<ServicesFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)}>
        <div className="text-center mb-16">
          {blok.subtitle && <p className="section-subtitle mb-4">{blok.subtitle}</p>}
          {blok.title && <h2 className="section-title mb-4">{blok.title}</h2>}
          {blok.description && (
            <p className="font-montserrat text-sm text-black/60 max-w-xl mx-auto mt-4">{blok.description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-taupe/20">
          {blok.items?.map((item) => (
            <div key={item._uid} className="bg-white p-10 group">
              <span className="block w-8 h-px bg-gold mb-6" />
              <h3 className="font-playfair text-xl mb-3">{item.title}</h3>
              <p className="font-montserrat text-sm text-black/60 leading-relaxed mb-6">{item.description}</p>
              {item.link && (
                <Link
                  href={resolveLink(item.link)}
                  className="inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold"
                >
                  Decouvrir <ArrowRight size={12} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
