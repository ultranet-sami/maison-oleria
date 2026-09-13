/**
 * Modular Advertising configuration (Phase 5).
 * -------------------------------------------------------------
 * Each ad platform is independently enabled/disabled/configured via
 * env vars — no code changes required to turn a channel on or off,
 * and nothing loads automatically. `lib/tracking` reads this config
 * to decide which platforms to route events to, and only after the
 * visitor has granted "advertising" consent (Phase 4).
 * -------------------------------------------------------------
 */

export type AdPlatformKey = "google" | "meta" | "tiktok" | "linkedin" | "microsoft";

export interface AdPlatformConfig {
  key: AdPlatformKey;
  label: string;
  enabled: boolean;
  ids: Record<string, string | undefined>;
}

function bool(v: string | undefined): boolean {
  return (v ?? "false").toLowerCase() === "true";
}

export function getAdPlatformsConfig(): AdPlatformConfig[] {
  return [
    {
      key: "google",
      label: "Google Ads",
      enabled: bool(process.env.NEXT_PUBLIC_GOOGLE_ADS_ENABLED),
      ids: {
        adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
        gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      },
    },
    {
      key: "meta",
      label: "Meta Ads (Facebook/Instagram)",
      enabled: bool(process.env.NEXT_PUBLIC_META_ADS_ENABLED),
      ids: { pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID },
    },
    {
      key: "tiktok",
      label: "TikTok Ads",
      enabled: bool(process.env.NEXT_PUBLIC_TIKTOK_ADS_ENABLED),
      ids: { pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID },
    },
    {
      key: "linkedin",
      label: "LinkedIn Ads",
      enabled: bool(process.env.NEXT_PUBLIC_LINKEDIN_ADS_ENABLED),
      ids: { partnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID },
    },
    {
      key: "microsoft",
      label: "Microsoft Ads",
      enabled: bool(process.env.NEXT_PUBLIC_MICROSOFT_ADS_ENABLED),
      ids: { uetTagId: process.env.NEXT_PUBLIC_MICROSOFT_UET_TAG_ID },
    },
  ];
}

export function isPlatformEnabled(key: AdPlatformKey): boolean {
  const cfg = getAdPlatformsConfig().find((p) => p.key === key);
  return Boolean(cfg?.enabled && Object.values(cfg.ids).some(Boolean));
}

// File contains AI-generated response based on internal company sources
