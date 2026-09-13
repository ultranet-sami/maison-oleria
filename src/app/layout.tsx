import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import LaunchBanner from "@/components/LaunchBanner";
import NewsletterPopup from "@/components/NewsletterPopup";
import ConsentBanner from "@/components/ConsentBanner";
import AdScripts from "@/components/AdScripts";
import PageViewTracker from "@/components/PageViewTracker";
import { LanguageProvider } from "@/context/LanguageContext";

// ---------------------------------------------------------------
// TRACKING CONFIGURATION (Phase 4/5/6) — configure dans .env.example
// Ad platform scripts are now loaded exclusively via <AdScripts />,
// which is consent-gated (RGPD, Phase 4) and reads the modular ads
// config from src/lib/ads/config.ts (Phase 5). No pixel is ever
// injected unconditionally anymore — see git history for the old
// direct gtag/fbq/ttq injection that used to live here.
// ---------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    default: "Maison Oleria | Conseil en Image & Stylisme Personnel de Luxe",
    template: "%s | Maison Oleria",
  },
  description:
    "Maison Oleria est une maison de conseil en image et stylisme personnel inspiree de l'elegance francaise. Sublimez votre image avec notre expertise en analyse colorimetrique, coaching image et style personnel.",
  keywords: [
    "conseil en image",
    "styliste personnel",
    "analyse colorimetrique",
    "coaching image",
    "elegance francaise",
    "relooking",
    "image professionnelle",
    "maison oleria",
    "stylisme mariage",
  ],
  authors: [{ name: "Maison Oleria" }],
  creator: "Maison Oleria",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.maison-oleria.com",
    siteName: "Maison Oleria",
    title: "Maison Oleria | Conseil en Image & Stylisme Personnel de Luxe",
    description: "Revelez votre style unique avec Maison Oleria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Calendly CSS */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

        {/* Google Translate */}
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
        <script dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'fr',
              includedLanguages: 'en,es,de,it,pt,nl,no,zh-CN,ru,ar',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}} />

        {/* Consent-gated ad/analytics platform scripts (Phase 4/5/6) */}
        <AdScripts />
      </head>
      <body className="bg-white text-black font-montserrat">
        {/* Hidden Google Translate element */}
        <div id="google_translate_element" style={{ display: "none" }} />

        <LanguageProvider>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
          <LaunchBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
          <NewsletterPopup />
          <ConsentBanner />
        </LanguageProvider>

        <script src="https://assets.calendly.com/assets/external/widget.js" async />

        {/* Phase 8 — Monitoring: Vercel Analytics + Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


// File contains AI-generated response based on internal company sources
