"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

// ---------------------------------------------------------------
// CONFIGURATION — Modifiez ici pour personnaliser l'offre
// ---------------------------------------------------------------
const TOTAL_SPOTS = 50;          // Nombre total de places
const SPOTS_TAKEN = 23;          // Nombre de places deja prises (mettre a jour manuellement)
const DISCOUNT = 50;             // Pourcentage de reduction
const PROMO_CODE = "FIRST50";    // Code promo a utiliser
const OFFER_END_DATE = "2026-12-31T23:59:59"; // Date de fin de l'offre
// ---------------------------------------------------------------

export default function LaunchBanner() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const spotsLeft = TOTAL_SPOTS - SPOTS_TAKEN;

  useEffect(() => {
    const dismissed = sessionStorage.getItem("launch-banner-dismissed");
    if (dismissed) setVisible(false);
  }, []);

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const end = new Date(OFFER_END_DATE).getTime();
      const diff = end - now;
      if (diff <= 0) { setVisible(false); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("launch-banner-dismissed", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-black border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Offer */}
        <div className="flex items-center gap-3">
          <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold animate-pulse">
            Offre de Lancement
          </div>
          <div className="font-playfair text-sm text-[#FCFAF7]">
            <span className="text-gold font-bold">-{DISCOUNT}%</span> pour les{" "}
            <span className="text-gold font-bold">{TOTAL_SPOTS} premiers clients</span>
          </div>
          {/* Spots counter */}
          <div className="hidden md:flex items-center gap-1.5 bg-gold/10 border border-gold/30 px-3 py-1">
            <div className="flex gap-0.5">
              {Array.from({ length: TOTAL_SPOTS }).map((_, i) => (
                <div key={i} className={`w-1 h-3 ${i < SPOTS_TAKEN ? "bg-gold" : "bg-gold/20"}`} />
              ))}
            </div>
            <span className="font-montserrat text-[9px] text-gold ml-2">{spotsLeft} places restantes</span>
          </div>
          {/* Promo code */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="font-montserrat text-[9px] text-[#C8B8A6]">Code :</span>
            <span className="font-montserrat text-[10px] font-bold text-gold border border-gold/40 px-2 py-0.5 tracking-widest">
              {PROMO_CODE}
            </span>
          </div>
        </div>

        {/* Center: Countdown */}
        <div className="flex items-center gap-2">
          {[
            { val: timeLeft.days, label: "J" },
            { val: timeLeft.hours, label: "H" },
            { val: timeLeft.minutes, label: "M" },
            { val: timeLeft.seconds, label: "S" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="font-playfair text-base text-gold w-8 text-center">
                {String(val).padStart(2, "0")}
              </div>
              <div className="font-montserrat text-[8px] text-[#C8B8A6] tracking-widest">{label}</div>
            </div>
          ))}
        </div>

        {/* Right: CTA + Close */}
        <div className="flex items-center gap-3">
          <Link
            href="/reserver"
            className="font-montserrat text-[9px] tracking-[0.2em] uppercase bg-gold text-black px-4 py-2 hover:bg-[#A8894E] transition-colors duration-200"
          >
            Profiter
          </Link>
          <button onClick={dismiss} className="text-[#C8B8A6] hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// File contains AI-generated response based on internal company sources
