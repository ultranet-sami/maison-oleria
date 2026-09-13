/**
 * RGPD / Consent Mode V2 — configuration & types (Phase 4).
 * -------------------------------------------------------------
 * Defines the consent categories used across the site. Nothing in
 * `lib/tracking` or `lib/ads` fires until the visitor has explicitly
 * granted the relevant category, keeping the site compliant with
 * France/EU RGPD requirements and Google's Consent Mode V2.
 * -------------------------------------------------------------
 */

export type ConsentCategory = "necessary" | "analytics" | "advertising" | "personalization";

export interface ConsentState {
  necessary: true; // always granted, required for the site to function
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
  timestamp: string;
  version: number;
}

export const CONSENT_COOKIE_NAME = "oleria_consent";
export const CONSENT_VERSION = 1; // bump to force re-consent after a policy change
export const CONSENT_MAX_AGE_DAYS = 180;

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  advertising: false,
  personalization: false,
  timestamp: "",
  version: CONSENT_VERSION,
};

/** Google Consent Mode V2 mapping: which gtag consent signals each category controls. */
export const GOOGLE_CONSENT_MAP: Record<ConsentCategory, string[]> = {
  necessary: ["security_storage"],
  analytics: ["analytics_storage"],
  advertising: ["ad_storage", "ad_user_data", "ad_personalization"],
  personalization: ["personalization_storage"],
};

export function isConsentRequired(): boolean {
  return (process.env.NEXT_PUBLIC_COOKIE_CONSENT_REQUIRED ?? "true") !== "false";
}

// File contains AI-generated response based on internal company sources
