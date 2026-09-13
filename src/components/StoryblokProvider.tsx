"use client";
/**
 * Client-side Storyblok initializer.
 * Must run once, client-side, before any StoryblokComponent renders,
 * so the Visual Editor bridge (bridge.js) can attach and components
 * are registered in the browser bundle too.
 */
import { useEffect } from "react";
import { initStoryblok } from "@/lib/storyblok";

let initialized = false;

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!initialized) {
      initStoryblok();
      initialized = true;
    }
  }, []);
  return <>{children}</>;
}

// File contains AI-generated response based on internal company sources
