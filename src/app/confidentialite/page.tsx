"use client";

import { useState } from "react";
import { acceptAll, rejectAll, writeConsent, readConsent } from "@/lib/consent/storage";

/**
 * Privacy Center (Phase 4 — RGPD).
 * -------------------------------------------------------------
 * Lets visitors review and change their consent choices at any
 * time (not just on first visit), as required by RGPD. Linked from
 * the Footer and from the Consent Banner.
 * -------------------------------------------------------------
 */
export default function PrivacyCenterPage() {
  const existing = readConsent();
  const [prefs, setPrefs] = useState({
    analytics: existing?.analytics ?? false,
    advertising: existing?.advertising ?? false,
    personalization: existing?.personalization ?? false,
  });
  const [saved, setSaved] = useState(false);

  function save() {
    writeConsent(prefs);
    setSaved(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-playfair text-3xl mb-6">Centre de confidentialite</h1>
      <p className="text-white/70 text-sm leading-relaxed mb-10">
        Maison Oleria respecte votre vie privee. Vous pouvez a tout moment consulter, modifier ou
        retirer votre consentement concernant l&apos;utilisation de vos donnees, conformement au
        Reglement General sur la Protection des Donnees (RGPD). Pour toute question, contactez-nous
        a{" "}
        <a href={`mailto:${process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL || "privacy@maison-oleria.com"}`} className="text-gold underline">
          {process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL || "privacy@maison-oleria.com"}
        </a>
        .
      </p>

      <div className="space-y-6 mb-10">
        {[
          { key: "necessary" as const, label: "Cookies necessaires", desc: "Indispensables au fonctionnement du site (paiement, session, securite). Toujours actifs.", locked: true },
          { key: "analytics" as const, label: "Analytics", desc: "Mesure d'audience anonymisee (Google Analytics)." },
          { key: "advertising" as const, label: "Publicite", desc: "Personnalisation publicitaire (Google Ads, Meta, TikTok, LinkedIn, Microsoft Ads)." },
          { key: "personalization" as const, label: "Personnalisation", desc: "Adaptation du contenu affiche selon vos preferences." },
        ].map((cat) => (
          <label key={cat.key} className="flex items-start gap-4 border border-gold/20 p-4">
            <input
              type="checkbox"
              disabled={cat.locked}
              checked={cat.locked ? true : (prefs as Record<string, boolean>)[cat.key]}
              onChange={(e) => setPrefs((p) => ({ ...p, [cat.key]: e.target.checked }))}
              className="mt-1"
            />
            <span>
              <span className="font-montserrat text-xs uppercase tracking-widest">{cat.label}</span>
              <br />
              <span className="text-white/60 text-xs">{cat.desc}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        <button onClick={save} className="font-montserrat text-[10px] tracking-widest uppercase bg-gold text-black px-6 py-3">
          Enregistrer mes preferences
        </button>
        <button
          onClick={() => {
            acceptAll();
            setSaved(true);
          }}
          className="font-montserrat text-[10px] tracking-widest uppercase border border-white/30 px-6 py-3"
        >
          Tout accepter
        </button>
        <button
          onClick={() => {
            rejectAll();
            setSaved(true);
          }}
          className="font-montserrat text-[10px] tracking-widest uppercase border border-white/30 px-6 py-3"
        >
          Tout refuser
        </button>
      </div>

      {saved && <p className="text-gold text-xs mt-4 font-montserrat">Vos preferences ont ete enregistrees.</p>}
    </div>
  );
}

// File contains AI-generated response based on internal company sources
