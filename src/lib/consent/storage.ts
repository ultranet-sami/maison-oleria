"use client";

import { CONSENT_COOKIE_NAME, CONSENT_MAX_AGE_DAYS, CONSENT_VERSION, DEFAULT_CONSENT, type ConsentState } from "./config";

/**
 * Client-side helpers to read/write the consent cookie and notify
 * the rest of the app (Google Consent Mode V2 + tracking/ads layers)
 * whenever the visitor updates their preferences (Phase 4).
 */

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${CONSENT_COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null; // force re-consent after policy changes
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(partial: Partial<Omit<ConsentState, "necessary" | "version" | "timestamp">>): ConsentState {
  const next: ConsentState = {
    ...DEFAULT_CONSENT,
    ...partial,
    necessary: true,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };
  if (typeof document !== "undefined") {
    const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(next))}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
  applyGoogleConsentMode(next);
  window.dispatchEvent(new CustomEvent("oleria:consent-updated", { detail: next }));
  return next;
}

export function acceptAll(): ConsentState {
  return writeConsent({ analytics: true, advertising: true, personalization: true });
}

export function rejectAll(): ConsentState {
  return writeConsent({ analytics: false, advertising: false, personalization: false });
}

/** Pushes the current consent state into Google's Consent Mode V2 (gtag). */
export function applyGoogleConsentMode(state: ConsentState): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    ad_storage: state.advertising ? "granted" : "denied",
    ad_user_data: state.advertising ? "granted" : "denied",
    ad_personalization: state.advertising ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
    personalization_storage: state.personalization ? "granted" : "denied",
    security_storage: "granted",
  });
}

// File contains AI-generated response based on internal company sources
