"use client";
import { useEffect, useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import { X } from "lucide-react";
import { BaseBlokProps } from "./types";

interface PopupFields {
  title?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  delay_seconds?: string;
}

export default function PopupBlock({ blok }: BaseBlokProps<PopupFields>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (blok.disabled) return;
    const delay = Number(blok.delay_seconds || 5) * 1000;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, [blok.disabled, blok.delay_seconds]);

  if (blok.disabled || !open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
      <div
        {...storyblokEditable(blok)}
        className="bg-white max-w-md w-full p-10 relative text-center"
      >
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4">
          <X size={18} />
        </button>
        {blok.title && <h3 className="font-playfair text-2xl mb-3">{blok.title}</h3>}
        {blok.description && <p className="font-montserrat text-sm text-black/60 mb-6">{blok.description}</p>}
        {blok.cta_label && blok.cta_url && (
          <a href={blok.cta_url} className="btn-primary">
            {blok.cta_label}
          </a>
        )}
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
