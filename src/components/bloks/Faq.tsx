"use client";
import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import { ChevronDown } from "lucide-react";
import Wrapper from "./Wrapper";
import { BaseBlokProps } from "./types";

interface FaqItem {
  _uid: string;
  question?: string;
  answer?: string;
}
interface FaqFields {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

export default function Faq({ blok }: BaseBlokProps<FaqFields>) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Wrapper blok={blok} defaultBg="bg-ivory">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="max-w-2xl mx-auto divide-y divide-taupe/20">
          {blok.items?.map((item) => (
            <div key={item._uid} className="py-4">
              <button
                className="w-full flex items-center justify-between text-left font-montserrat text-sm font-medium"
                onClick={() => setOpen(open === item._uid ? null : item._uid)}
              >
                {item.question}
                <ChevronDown size={16} className={open === item._uid ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              {open === item._uid && (
                <p className="mt-3 font-montserrat text-sm text-black/60">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
