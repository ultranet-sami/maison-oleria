"use client";

import { useEffect, useState } from "react";
import { acceptAll, readConsent, rejectAll, writeConsent } from "@/lib/consent/storage";
import { isConsentRequired, type ConsentState } from "@/lib/consent/config";

/**
 * Cookie Consent Banner + Preferences panel (Phase 4 — RGPD).
 * -------------------------------------------------------------
 * Shown on first visit (or after a consent-version bump). Nothing
 * in lib/tracking or lib/ads is allowed to fire before the visitor
 * makes a choice here. Also exposes a "Personnaliser" panel so
 * visitors can grant/revoke categories individually, and this same
 * component is reused inside the Privacy Center page.
 * -------------------------------------------------------------
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, advertising: false, personalization: false });

  useEffect(() => {
    if (!isConsentRequired()) return;
    const existing = readConsent();
    if (!existing) setVisible(true);
  }, []);

  function handleAcceptAll() {
    acceptAll();
    setVisible(false);
  }

  function handleRejectAll() {
    rejectAll();
    setVisible(false);
  }

  function handleSavePrefs() {
    writeConsent(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#1F1F1F] border-t border-gold/30 text-white p-5 md:p-6">
      <div className="max-w-5xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <p className="font-montserrat text-xs md:text-sm text-white/80 leading-relaxed">
              Nous utilisons des cookies pour ameliorer votre experience, mesurer l&apos;audience et,
              si vous l&apos;acceptez, personnaliser la publicite. Vous pouvez modifier vos choix a
              tout moment depuis notre{" "}
              <a href="/confidentialite" className="text-gold underline">
                Centre de confidentialite
              </a>
              .
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="font-montserrat text-[10px] tracking-widest uppercase border border-white/30 px-4 py-2 hover:border-gold transition"
              >
                Personnaliser
              </button>
              <button
                onClick={handleRejectAll}
                className="font-montserrat text-[10px] tracking-widest uppercase border border-white/30 px-4 py-2 hover:border-gold transition"
              >
                Refuser
              </button>
              <button
                onClick={handleAcceptAll}
                className="font-montserrat text-[10px] tracking-widest uppercase bg-gold text-black px-5 py-2 hover:bg-gold/90 transition"
              >
                Tout accepter
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-playfair text-lg text-gold">Preferences de confidentialite</h3>
            {[
              { key: "necessary" as const, label: "Necessaires", desc: "Indispensables au fonctionnement du site (toujours actifs).", locked: true },
              { key: "analytics" as const, label: "Analytics", desc: "Nous aident a comprendre l'utilisation du site (Google Analytics)." },
              { key: "advertising" as const, label: "Publicite", desc: "Personnalisation des annonces (Google Ads, Meta, TikTok, LinkedIn, Microsoft)." },
              { key: "personalization" as const, label: "Personnalisation", desc: "Adapte le contenu affiche a vos preferences." },
            ].map((cat) => (
              <label key={cat.key} className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  disabled={cat.locked}
                  checked={cat.locked ? true : (prefs as Record<string, boolean>)[cat.key]}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))
                  }
                  className="mt-1"
                />
                <span>
                  <span className="font-montserrat text-xs uppercase tracking-widest text-white">{cat.label}</span>
                  <br />
                  <span className="text-white/60 text-xs">{cat.desc}</span>
                </span>
              </label>
            ))}
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowDetails(false)}
                className="font-montserrat text-[10px] tracking-widest uppercase border border-white/30 px-4 py-2"
              >
                Retour
              </button>
              <button
                onClick={handleSavePrefs}
                className="font-montserrat text-[10px] tracking-widest uppercase bg-gold text-black px-5 py-2"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export type { ConsentState };

// File contains AI-generated response based on internal company sources
