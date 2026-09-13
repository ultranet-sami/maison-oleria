"use client";

import { isPlatformEnabled } from "@/lib/ads/config";
import { readConsent } from "@/lib/consent/storage";

/**
 * Centralized tracking layer (Phase 6).
 * -------------------------------------------------------------
 * Single set of semantic functions the app calls (trackPageView,
 * trackLead, trackContact, trackNewsletter, trackConsultation,
 * trackAppointment, trackPurchase) which automatically fan out to
 * whichever ad platforms are enabled (Phase 5) AND for which the
 * visitor has granted advertising/analytics consent (Phase 4).
 *
 * No page/component should call gtag/fbq/ttq/etc directly anymore —
 * always go through these functions so consent + platform toggles
 * are respected consistently everywhere.
 * -------------------------------------------------------------
 */

type Win = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
  lintrk?: (action: string, data?: Record<string, unknown>) => void;
  uetq?: unknown[];
};

export type TrackEventName =
  | "page_view"
  | "lead"
  | "contact"
  | "newsletter_signup"
  | "consultation_request"
  | "appointment_booked"
  | "purchase";

export interface TrackPayload {
  value?: number;
  currency?: string;
  contentName?: string;
  [key: string]: unknown;
}

function hasConsent(): { analytics: boolean; advertising: boolean } {
  const c = readConsent();
  return { analytics: c?.analytics === true, advertising: c?.advertising === true };
}

function dispatch(event: TrackEventName, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  const { analytics, advertising } = hasConsent();
  if (!analytics && !advertising) return; // Phase 4: no tracking before consent

  // Google (GA4 + Google Ads) — analytics OR advertising consent
  if ((analytics || advertising) && isPlatformEnabled("google") && typeof w.gtag === "function") {
    w.gtag("event", event, {
      value: payload.value,
      currency: payload.currency || "EUR",
      content_name: payload.contentName,
    });
  }

  // Advertising-only platforms below
  if (!advertising) return;

  if (isPlatformEnabled("meta") && typeof w.fbq === "function") {
    const metaEventMap: Partial<Record<TrackEventName, string>> = {
      page_view: "PageView",
      lead: "Lead",
      contact: "Contact",
      newsletter_signup: "CompleteRegistration",
      consultation_request: "Schedule",
      appointment_booked: "Schedule",
      purchase: "Purchase",
    };
    const metaEvent = metaEventMap[event] || "CustomEvent";
    w.fbq("track", metaEvent, { value: payload.value, currency: payload.currency || "EUR" });
  }

  if (isPlatformEnabled("tiktok") && w.ttq) {
    w.ttq.track(event, { value: payload.value, currency: payload.currency || "EUR" });
  }

  if (isPlatformEnabled("linkedin") && typeof w.lintrk === "function") {
    w.lintrk("track", { conversion_id: event });
  }

  if (isPlatformEnabled("microsoft")) {
    w.uetq = w.uetq || [];
    w.uetq.push("event", event, { event_category: "conversion", event_value: payload.value });
  }
}

export function trackPageView(payload: TrackPayload = {}) {
  dispatch("page_view", payload);
}
export function trackLead(payload: TrackPayload = {}) {
  dispatch("lead", payload);
}
export function trackContact(payload: TrackPayload = {}) {
  dispatch("contact", payload);
}
export function trackNewsletter(payload: TrackPayload = {}) {
  dispatch("newsletter_signup", payload);
}
export function trackConsultation(payload: TrackPayload = {}) {
  dispatch("consultation_request", payload);
}
export function trackAppointment(payload: TrackPayload = {}) {
  dispatch("appointment_booked", payload);
}
export function trackPurchase(payload: TrackPayload = {}) {
  dispatch("purchase", payload);
}

// File contains AI-generated response based on internal company sources
