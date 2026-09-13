"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/tracking";

/**
 * Phase 6 — global trackPageView() wiring.
 * -------------------------------------------------------------
 * Mounted once in the root layout. Fires trackPageView() on the
 * initial load and on every client-side route change (App Router
 * navigations do not trigger full page reloads, so we listen to
 * pathname/search param changes instead of a "load" event).
 *
 * trackPageView() itself is consent + platform gated (see
 * src/lib/tracking/index.ts), so this component is safe to mount
 * unconditionally.
 * -------------------------------------------------------------
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    trackPageView({ contentName: query ? `${pathname}?${query}` : pathname || "/" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}

// File contains AI-generated response based on internal company sources
