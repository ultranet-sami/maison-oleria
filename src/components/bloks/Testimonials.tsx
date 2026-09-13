import { storyblokEditable } from "@storyblok/react";
import { Star } from "lucide-react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface TestimonialItem {
  _uid: string;
  name?: string;
  role?: string;
  text?: string;
  rating?: number;
}
interface TestimonialsFields {
  title?: string;
  subtitle?: string;
  items?: TestimonialItem[];
}

export default function Testimonials({ blok }: BaseBlokProps<TestimonialsFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blok.items?.map((t) => (
            <div key={t._uid} className="bg-ivory p-10 border-b-2 border-gold">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                  <Star key={idx} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-8 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="font-playfair text-base">{t.name}</div>
                <div className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
