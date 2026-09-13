import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface StatItem {
  _uid: string;
  number?: string;
  label?: string;
}
interface StatisticsFields {
  items?: StatItem[];
}

export default function Statistics({ blok }: BaseBlokProps<StatisticsFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-black" className="border-y border-gold/20">
      <div {...storyblokEditable(blok)} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {blok.items?.map((s) => (
          <div key={s._uid}>
            <div className="font-playfair text-3xl text-gold mb-1">{s.number}</div>
            <div className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-[#C8B8A6]">{s.label}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
