import { storyblokEditable } from "@storyblok/react";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokAsset } from "./types";

interface TeamMember {
  _uid: string;
  name?: string;
  role?: string;
  photo?: StoryblokAsset;
  bio?: string;
}
interface TeamFields {
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

export default function Team({ blok }: BaseBlokProps<TeamFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-white">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blok.members?.map((m) => (
            <div key={m._uid} className="text-center">
              {m.photo?.filename && (
                <img src={m.photo.filename} alt={m.photo.alt || m.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
              )}
              <h3 className="font-playfair text-lg">{m.name}</h3>
              <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold mb-3">{m.role}</p>
              <p className="font-montserrat text-sm text-black/60">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
