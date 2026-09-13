/**
 * Shared types for Storyblok Bloks (Maison Oleria)
 * ----------------------------------------------------------------
 * Every Blok component receives a `blok` prop shaped like SbBlokData
 * plus whatever custom fields you defined in the Storyblok schema.
 * `StyleOptions` are the common "design" fields we add to almost
 * every component's schema so non-developers can restyle sections
 * without touching code (background, text color, spacing, etc.)
 * ----------------------------------------------------------------
 */
import { SbBlokData } from "@storyblok/react";

export interface StyleOptions {
  bg_color?: string; // hex or tailwind-ish token, e.g. "#1F1F1F" or "ivory"
  text_color?: string;
  button_style?: "gold" | "outline" | "dark" | "minimal";
  title_size?: "sm" | "md" | "lg" | "xl";
  animation?: "none" | "fade" | "fade-up" | "zoom";
  border?: "none" | "top" | "bottom" | "full";
  shadow?: "none" | "sm" | "md" | "lg";
  spacing?: "compact" | "normal" | "spacious";
  visible_mobile?: boolean;
  visible_tablet?: boolean;
  visible_desktop?: boolean;
  disabled?: boolean;
}

export type StoryblokAsset = {
  filename?: string;
  alt?: string;
  title?: string;
};

export type StoryblokLink = {
  cached_url?: string;
  url?: string;
  linktype?: "story" | "url" | "email";
};

export interface BaseBlokProps<T = Record<string, unknown>> {
  blok: SbBlokData & StyleOptions & T;
}

export function resolveLink(link?: StoryblokLink): string {
  if (!link) return "#";
  if (link.linktype === "url" || link.linktype === "email") return link.url || "#";
  const cached = link.cached_url || "";
  return cached.startsWith("/") ? cached : `/${cached}`;
}

export function spacingToPadding(spacing?: StyleOptions["spacing"]): string {
  switch (spacing) {
    case "compact":
      return "py-12";
    case "spacious":
      return "py-40";
    default:
      return "py-24";
  }
}

export function borderToClass(border?: StyleOptions["border"]): string {
  switch (border) {
    case "top":
      return "border-t border-gold/20";
    case "bottom":
      return "border-b border-gold/20";
    case "full":
      return "border-y border-gold/20";
    default:
      return "";
  }
}

export function shadowToClass(shadow?: StyleOptions["shadow"]): string {
  switch (shadow) {
    case "sm":
      return "shadow-sm";
    case "md":
      return "shadow-md";
    case "lg":
      return "shadow-xl";
    default:
      return "";
  }
}

export function visibilityClass(o: StyleOptions): string {
  const classes: string[] = [];
  if (o.visible_mobile === false) classes.push("hidden sm:block");
  if (o.visible_tablet === false) classes.push("md:hidden");
  if (o.visible_desktop === false) classes.push("lg:hidden");
  return classes.join(" ");
}

// File contains AI-generated response based on internal company sources
