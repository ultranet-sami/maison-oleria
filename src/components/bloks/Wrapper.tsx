/**
 * Wrapper — shared section shell applying StyleOptions to any Blok.
 */
import { ReactNode } from "react";
import { storyblokEditable } from "@storyblok/react";
import { SbBlokData } from "@storyblok/react";
import {
  StyleOptions,
  spacingToPadding,
  borderToClass,
  shadowToClass,
  visibilityClass,
} from "./types";

export default function Wrapper({
  blok,
  children,
  defaultBg = "bg-white",
  className = "",
}: {
  blok: SbBlokData & StyleOptions;
  children: ReactNode;
  defaultBg?: string;
  className?: string;
}) {
  if (blok.disabled) return null;
  const bg = blok.bg_color ? "" : defaultBg;
  const style: React.CSSProperties = {};
  if (blok.bg_color) style.backgroundColor = blok.bg_color;
  if (blok.text_color) style.color = blok.text_color;

  return (
    <section
      {...storyblokEditable(blok)}
      style={style}
      className={`${bg} ${spacingToPadding(blok.spacing)} ${borderToClass(blok.border)} ${shadowToClass(blok.shadow)} ${visibilityClass(blok)} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}

// File contains AI-generated response based on internal company sources
