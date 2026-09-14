import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { LanguageProvider } from "@/context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    "shopping accompagne",
    "garde-robe capsule",
    "stylisme mariage",
    "image consulting",
    "personal stylist",
    "color analysis",
    "french elegance",
    "maison oleria",
  ],
  authors: [{ name: "Maison Oleria" }],
  creator: "Maison Oleria",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.maison-oleria.com",
    siteName: "Maison Oleria",
    title: "Maison Oleria | Conseil en Image & Stylisme Personnel de Luxe",
    description:
      "Revelez votre style unique avec Maison Oleria. Conseil en image, analyse colorimetrique et stylisme personnel inspires de l'elegance parisienne.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Oleria | Conseil en Image de Luxe",
    description: "Sublimez votre image avec l'elegance francaise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr">
      <head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black font-montserrat">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
        <SpeedInsights />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </body>
    </html>
  );
}
