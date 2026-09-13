import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface TimelineStep {
  _uid: string;
  step?: string;
  title?: string;
  description?: string;
}
interface TimelineFields {
  title?: string;
  subtitle?: string;
  steps?: TimelineStep[];
}

export default function Timeline({ blok }: BaseBlokProps<TimelineFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-ivory">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blok.steps?.map((s) => (
            <div key={s._uid}>
              <div className="font-playfair text-6xl text-gold/15 mb-4">{s.step}</div>
              <div className="w-8 h-px bg-gold mb-4" />
              <h3 className="font-playfair text-xl mb-3">{s.title}</h3>
              <p className="font-montserrat text-xs text-black/60 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
