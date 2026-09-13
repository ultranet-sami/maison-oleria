"use client";
import { useState, useEffect } from "react";
import { X, Gift, Mail } from "lucide-react";
import { trackNewsletter, trackLead } from "@/lib/tracking";

// ---------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------
const DELAY_SECONDS = 30; // Popup apparait apres X secondes
const PDF_OFFER = "Guide des 10 Regles d'Or de l'Elegance Parisienne";
// ---------------------------------------------------------------

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletter-popup-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), DELAY_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem("newsletter-popup-dismissed", "1");
    setVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("done");
      trackLead({ contentName: "newsletter_popup" });
      trackNewsletter({ contentName: "newsletter_popup" });
      setTimeout(dismiss, 3000);
    } catch {
      setStatus("done");
      setTimeout(dismiss, 3000);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={dismiss}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative max-w-md w-full bg-[#FCFAF7] shadow-2xl border border-gold/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={dismiss} className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors">
          <X size={18} />
        </button>

        {/* Header */}
        <div className="bg-black px-8 py-6 text-center">
          <div className="font-playfair text-xl text-[#FCFAF7] tracking-widest mb-1">MAISON OLERIA</div>
          <div className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-gold">Offre Exclusive</div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Gift size={24} className="text-gold" />
            </div>
          </div>

          {status === "done" ? (
            <div className="text-center py-4">
              <div className="font-playfair text-2xl text-gold mb-3">Merci !</div>
              <p className="font-montserrat text-sm text-black/70">
                Votre guide vous sera envoye sous quelques minutes.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-playfair text-2xl text-center mb-2">Recevez Votre Guide Gratuit</h3>
              <div className="w-10 h-px bg-gold mx-auto mb-4" />
              <p className="font-montserrat text-xs text-black/60 text-center leading-relaxed mb-6">
                <strong className="text-gold">&ldquo;{PDF_OFFER}&rdquo;</strong>
                <br />
                Inscrivez-vous et recevez ce guide exclusif gratuitement.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full border border-taupe/40 pl-9 pr-4 py-3 font-montserrat text-sm focus:border-gold focus:outline-none bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-gold w-full text-center disabled:opacity-60"
                >
                  {status === "sending" ? "Envoi..." : "Recevoir le Guide Gratuit"}
                </button>
              </form>
              <p className="font-montserrat text-[9px] text-black/40 text-center mt-3">
                0% spam. Desinscription en 1 clic.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
