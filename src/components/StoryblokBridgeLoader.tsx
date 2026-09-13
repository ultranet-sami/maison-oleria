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
  // useStoryblokBridge is a React hook and must be called directly at the
  // top level of the component (not inside a useEffect callback body).
  // It internally guards against running when storyId is falsy and wires
  // up its own listener/cleanup, so no manual useEffect wrapper is needed.
  useStoryblokBridge(storyId, () => {
    window.location.reload();
  });
  return null;
}


// File contains AI-generated response based on internal company sources
