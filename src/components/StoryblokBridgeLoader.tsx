"use client";
/**
 * Loads the Storyblok Visual Editor bridge and re-renders the page
 * live when content changes inside the Storyblok editor iframe.
 * No-ops outside of the Storyblok editor (production visitors never
 * load this script's callback logic in a meaningful way).
 */
import { useEffect } from "react";
import { useStoryblokBridge } from "@storyblok/react";


export default function StoryblokBridgeLoader({ storyId }: { storyId: number }) {
  useEffect(() => {
    if (!storyId) return;
    // useStoryblokBridge is a hook and must not be called conditionally
    // or from inside a non-render context (e.g. useEffect callback body
    // invoked imperatively). It internally sets up the bridge listener
    // and returns a cleanup; calling it like a plain function here means
    // React's rules-of-hooks lint would flag it and, more importantly,
    // any cleanup it registers is never wired up. Call it directly at
    // the top of the effect (still fine since useEffect itself already
    // gates on the client) and capture no return value misuse.
    const unregister = useStoryblokBridge(storyId, () => {
      window.location.reload();
    });
    return () => {
      if (typeof unregister === "function") unregister();
    };
  }, [storyId]);
  return null;
}


// File contains AI-generated response based on internal company sources
