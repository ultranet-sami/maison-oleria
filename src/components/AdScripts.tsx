"use client";

import { useEffect, useState } from "react";
import { getAdPlatformsConfig } from "@/lib/ads/config";
import { readConsent } from "@/lib/consent/storage";
import type { ConsentState } from "@/lib/consent/config";

/**
 * Consent-gated, modular ad platform script loader (Phase 4 + 5).
 * -------------------------------------------------------------
 * Replaces the old unconditional pixel injection in layout.tsx.
 * Each platform script is only injected if:
 *   1. It is enabled + configured via env vars (Phase 5), AND
 *   2. The visitor has granted "advertising" consent (Phase 4).
 * Listens for consent updates so scripts load immediately after
 * the visitor accepts, without a page reload.
 * -------------------------------------------------------------
 */
export default function AdScripts() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    function onUpdate(e: Event) {
      setConsent((e as CustomEvent<ConsentState>).detail);
    }
    window.addEventListener("oleria:consent-updated", onUpdate);
    return () => window.removeEventListener("oleria:consent-updated", onUpdate);
  }, []);

  const advertisingGranted = consent?.advertising === true;
  const analyticsGranted = consent?.analytics === true;
  if (!advertisingGranted && !analyticsGranted) return null;

  const platforms = getAdPlatformsConfig();
  const google = platforms.find((p) => p.key === "google");
  const meta = platforms.find((p) => p.key === "meta");
  const tiktok = platforms.find((p) => p.key === "tiktok");
  const linkedin = platforms.find((p) => p.key === "linkedin");
  const microsoft = platforms.find((p) => p.key === "microsoft");

  return (
    <>
      {/* Google Ads / GA4 — gated by analytics OR advertising consent */}
      {(analyticsGranted || advertisingGranted) && google?.enabled && google.ids.gaMeasurementId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${google.ids.gaMeasurementId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${google.ids.gaMeasurementId}');`,
            }}
          />
        </>
      )}

      {/* Meta Pixel — advertising consent only */}
      {advertisingGranted && meta?.enabled && meta.ids.pixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${meta.ids.pixelId}');fbq('track','PageView');
            `,
          }}
        />
      )}

      {/* TikTok Pixel — advertising consent only */}
      {advertisingGranted && tiktok?.enabled && tiktok.ids.pixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktok.ids.pixelId}');ttq.page();}(window,document,'ttq');
            `,
          }}
        />
      )}

      {/* LinkedIn Insight Tag — advertising consent only */}
      {advertisingGranted && linkedin?.enabled && linkedin.ids.partnerId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "${linkedin.ids.partnerId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);
            `,
          }}
        />
      )}

      {/* Microsoft (Bing) UET Tag — advertising consent only */}
      {advertisingGranted && microsoft?.enabled && microsoft.ids.uetTagId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${microsoft.ids.uetTagId}"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
            `,
          }}
        />
      )}
    </>
  );
}

// File contains AI-generated response based on internal company sources
