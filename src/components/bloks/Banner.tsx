"use client";
import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import { X } from "lucide-react";
import { BaseBlokProps } from "./types";

interface BannerFields {
  text?: string;
  link_label?: string;
  link_url?: string;
  dismissible?: boolean;
}

export default function Banner({ blok }: BaseBlokProps<BannerFields>) {
  const [visible, setVisible] = useState(true);
  if (blok.disabled || !visible) return null;
  return (
    <div
      {...storyblokEditable(blok)}
      style={{ backgroundColor: blok.bg_color || "#C6A46A", color: blok.text_color || "#1F1F1F" }}
      className="w-full py-2 px-4 flex items-center justify-center gap-3 text-xs font-montserrat"
    >
      <span>{blok.text}</span>
      {blok.link_label && blok.link_url && (
        <a href={blok.link_url} className="underline font-semibold">
          {blok.link_label}
        </a>
      )}
      {blok.dismissible !== false && (
        <button onClick={() => setVisible(false)} className="ml-2">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// File contains AI-generated response based on internal company sources
