"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ChevronRight, HelpCircle, Clock, Star, Shield, Info } from "lucide-react";
import { trackConsultation, trackAppointment, trackPurchase, trackLead } from "@/lib/tracking";


// ---------------------------------------------------------------
// CONFIGURATION — Mettez a jour vos prix et formules ici
// ---------------------------------------------------------------
const FORMULES = [
  {
    id: "decouverte",
    name: "Consultation Decouverte",
    duration: "20 min",
    price: 0,
    priceLabel: "Gratuit",
    description: "Un premier echange pour comprendre vos besoins et decouvrir comment nous pouvons vous aider.",
    includes: ["Bilan rapide de votre situation", "Presentation de nos services", "Recommandations initiales", "Sans engagement"],
    popular: false,
    deposit: 0,
    installments: false,
  },
  {
    id: "colorimetrie",
    name: "Analyse Colorimetrique",
    duration: "3-4 heures",
    price: 150,
    priceLabel: "150 €",
    description: "Decouvrez votre palette de couleurs personnelle et repartez avec votre guide complet.",
    includes: ["Analyse complete des 80 echantillons", "Identification de votre saison", "Palette personnelle de 40 couleurs", "Guide d'utilisation inclus", "Conseils maquillage et accessoires"],
    popular: false,
    deposit: 50,
    installments: false,
  },
  {
    id: "conseil-complet",
    name: "Conseil en Image Complet",
    duration: "Journee complete",
    price: 350,
    priceLabel: "350 €",
    description: "Notre accompagnement signature — analyse colorimetrique + morphologie + guide de style personnalise.",
    includes: ["Analyse colorimetrique complete", "Bilan morphologique detaille", "Guide de style personnalise", "Conseils shopping", "Suivi par email 30 jours"],
    popular: true,
    deposit: 50,
    installments: true,
  },
  {
    id: "image-pro",
    name: "Image Professionnelle",
    duration: "Demi-journee",
    price: 280,
    priceLabel: "280 €",
    description: "Construisez une image executive percutante pour accelerer votre carriere.",
    includes: ["Audit de votre image actuelle", "Strategie image par objectif", "Guide tenues par contexte", "Preparation entretiens/prises de parole", "Conseils LinkedIn"],
    popular: false,
    deposit: 50,
    installments: true,
  },
  {
    id: "mariage",
    name: "Stylisme Mariage",
    duration: "Accompagnement complet",
    price: 0,
    priceLabel: "Sur devis",
    description: "Accompagnement premium pour que vous rayonniez le jour le plus precieux de votre vie.",
    includes: ["Analyse colorimetrique", "Shopping robe et accessoires", "Coordination du cortege", "Preparation jour J", "Suivi complet"],
    popular: false,
    deposit: 50,
    installments: true,
  },
];

const OCCASIONS = [
  { id: "quotidien", label: "Style au quotidien" },
  { id: "mariage", label: "Mariage" },
  { id: "soiree", label: "Soiree & Diner chic" },
  { id: "gala", label: "Gala & Black Tie" },
  { id: "business", label: "Business & Carriere" },
  { id: "celebrations", label: "Anniversaire / Diplome / Fiancailles" },
  { id: "vip", label: "Evenement Luxe & VIP" },
  { id: "autre", label: "Autre occasion" },
];

const SIZE_CHART = {
  women: [
    { eu: "34", fr: "34", uk: "6", us: "2", it: "38", chest: "80-82", waist: "60-62", hips: "84-86" },
    { eu: "36", fr: "36", uk: "8", us: "4", it: "40", chest: "83-85", waist: "63-65", hips: "87-89" },
    { eu: "38", fr: "38", uk: "10", us: "6", it: "42", chest: "86-88", waist: "66-68", hips: "90-92" },
    { eu: "40", fr: "40", uk: "12", us: "8", it: "44", chest: "89-91", waist: "69-71", hips: "93-95" },
    { eu: "42", fr: "42", uk: "14", us: "10", it: "46", chest: "92-94", waist: "72-74", hips: "96-98" },
    { eu: "44", fr: "44", uk: "16", us: "12", it: "48", chest: "95-97", waist: "75-77", hips: "99-101" },
    { eu: "46", fr: "46", uk: "18", us: "14", it: "50", chest: "98-101", waist: "78-81", hips: "102-105" },
    { eu: "48", fr: "48", uk: "20", us: "16", it: "52", chest: "102-106", waist: "82-86", hips: "106-110" },
  ],
  men: [
    { eu: "44", fr: "44", uk: "34", us: "34", it: "44", chest: "86-88", waist: "70-72" },
    { eu: "46", fr: "46", uk: "36", us: "36", it: "46", chest: "89-92", waist: "73-76" },
    { eu: "48", fr: "48", uk: "38", us: "38", it: "48", chest: "93-96", waist: "77-80" },
    { eu: "50", fr: "50", uk: "40", us: "40", it: "50", chest: "97-100", waist: "81-84" },
    { eu: "52", fr: "52", uk: "42", us: "42", it: "52", chest: "101-104", waist: "85-88" },
    { eu: "54", fr: "54", uk: "44", us: "44", it: "54", chest: "105-108", waist: "89-92" },
  ],
};

// Morphology calculator
function detectMorphology(chest: number, waist: number, hips: number, gender: string): { type: string; desc: string; tips: string } {
  if (gender === "homme") {
    if (chest > hips + 5) return { type: "Triangulaire inverse", desc: "Epaules larges, hanches etroites", tips: "Privilegiez les coupes qui equilibrent avec du volume en bas." };
    if (Math.abs(chest - hips) <= 5 && waist < chest - 10) return { type: "Athletique / Sablier", desc: "Silhouette bien proportionnee", tips: "Presque toutes les coupes vous conviennent." };
    if (waist >= chest - 5) return { type: "Ovale", desc: "Ventre prominent", tips: "Coupes droites et fluides, evitez les pieces trop ajustees a la taille." };
    return { type: "Rectangulaire", desc: "Silhouette droite et equilibree", tips: "Creez de la structure avec des coupes structurees." };
  }
  const ratio = waist / hips;
  const chestHipDiff = Math.abs(chest - hips);
  if (chestHipDiff <= 5 && ratio < 0.75) return { type: "Sablier", desc: "Silhouette idealement proportionnee", tips: "Toutes les coupes vous conviennent. Valorisez votre taille." };
  if (hips > chest + 3) return { type: "Poire", desc: "Hanches plus larges que les epaules", tips: "Elargissez visuellement les epaules et allongez le buste." };
  if (chest > hips + 3) return { type: "Triangulaire inverse", desc: "Epaules plus larges que les hanches", tips: "Equilibrez avec du volume en bas. Jupes evasees, pantalons larges." };
  if (waist >= chest - 5 || waist >= hips - 5) return { type: "Pomme / Ronde", desc: "Tour de taille marque", tips: "Coupes fluides, decoltes V, pieces qui allongent la silhouette." };
  return { type: "Rectangulaire", desc: "Silhouette droite et equilibree", tips: "Creez des courbes avec des ceintures et des coupes structurees." };
}

// AI Style recommendations
function getStyleReco(profile: { saison?: string; morpho?: string; occasion?: string; gender?: string }) {
  const recos = [];
  if (profile.saison === "automne") recos.push("Privilegiez les teintes terreuses : rouille, camel, olive, bordeaux.");
  if (profile.saison === "printemps") recos.push("Portez des couleurs chaudes et lumineuses : corail, peche, turquoise doux.");
  if (profile.saison === "ete") recos.push("Les pastels poudrés vous subliment : lavande, rose brume, bleu ciel.");
  if (profile.saison === "hiver") recos.push("Les contrastes forts vous valorisent : noir, blanc pur, rouge vif, marine.");
  if (profile.morpho === "Sablier") recos.push("Votre silhouette est ideale — valorisez votre taille avec des ceintures et coupes ajustees.");
  if (profile.morpho === "Poire") recos.push("Portez des hauts structures et des couleurs vives pour equilibrer votre silhouette.");
  if (profile.occasion === "business") recos.push("Pour le business : Privilegiez les couleurs institutionnelles (navy, gris, noir) et les coupes impeccables.");
  if (profile.occasion === "mariage") recos.push("Pour un mariage : Evitez le blanc/creme (reserve a la mariee) et misez sur une couleur harmonieuse avec la palette du mariage.");
  if (profile.occasion === "gala") recos.push("Pour un gala Black Tie : La robe longue est de mise, privilegiez les matieres nobles (soie, velours, crepe).");
  return recos.length > 0 ? recos : ["Completez votre profil pour recevoir des recommandations personnalisees."];
}

export default function ReserverPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "cancelled" | null>(null);

  const [formule, setFormule] = useState<typeof FORMULES[0] | null>(null);
  const [paymentMode, setPaymentMode] = useState<"full" | "deposit" | "installments">("full");
  const [gender, setGender] = useState("femme");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [profile, setProfile] = useState({
    prenom: "", email: "", phone: "",
    genre: "femme", age: "",
    chest: "", waist: "", hips: "", height: "", weight: "",
    shoe: "",
    saison: "", morpho: "", morphoDesc: "", morphoTips: "",
    occasion: "", styleGoal: "",
    payment: "",
  });
  const [aiRecos, setAiRecos] = useState<string[]>([]);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);


  const updateProfile = (key: string, val: string) => {
    setProfile((p) => ({ ...p, [key]: val }));
  };

  const calcMorpho = () => {
    const c = parseFloat(profile.chest);
    const w = parseFloat(profile.waist);
    const h = parseFloat(profile.hips);
    if (c && w && h) {
      const result = detectMorphology(c, w, h, profile.genre);
      setProfile((p) => ({ ...p, morpho: result.type, morphoDesc: result.desc, morphoTips: result.tips }));
    }
  };

  const generateRecos = () => {
    const recos = getStyleReco({ saison: profile.saison, morpho: profile.morpho, occasion: profile.occasion, gender: profile.genre });
    setAiRecos(recos);
  };

  // Compute the amount due now based on the selected payment mode.
  const getAmountDue = (): number => {
    if (!formule || formule.price <= 0) return 0;
    if (paymentMode === "full") return Math.round(formule.price * 0.95 * 100) / 100;
    if (paymentMode === "deposit") return formule.deposit;
    if (paymentMode === "installments") return Math.round((formule.price / 3) * 100) / 100;
    return formule.price;
  };

  const startCheckout = async () => {
    if (!formule) return;
    const amount = getAmountDue();
    if (amount <= 0) {
      // Free consultation — skip payment, go straight to booking.
      trackLead({ contentName: formule.name });
      trackConsultation({ contentName: formule.name });
      setStep(7);
      return;
    }
    setIsPaying(true);
    setPayError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formuleId: formule.id,
          formuleName: formule.name,
          amount,
          paymentMode,
          email: profile.email,
          name: profile.prenom,
          occasion: profile.occasion,
          morpho: profile.morpho,
          saison: profile.saison,
          styleGoal: profile.styleGoal,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setPayError(data.error || "Le paiement n'a pas pu etre initie. Veuillez reessayer.");
        setIsPaying(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setPayError("Une erreur reseau est survenue. Veuillez reessayer.");
      setIsPaying(false);
    }
  };


  // Handle return from Stripe Checkout: ?payment=success|cancelled&leadId=...
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setPaymentStatus("success");
      setStep(8);
      trackPurchase({ value: getAmountDue(), currency: "EUR", contentName: formule?.name });
    } else if (payment === "cancelled") {
      setPaymentStatus("cancelled");
      setPayError("Le paiement a ete annule. Vous pouvez reessayer ci-dessous.");
      setStep(6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepTitles = [
    "Votre Formule",

    "Votre Profil",
    "Vos Mesures",
    "Votre Style",
    "Resultats IA",
    "Paiement",
    "Votre Creneau",
    "Confirmation",
  ];

  // -------------------------------------------------------
  // STEP 1 : Choose formule
  // -------------------------------------------------------
  const Step1 = () => (
    <div>
      <div className="text-center mb-12">
        <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Places limitees</div>
        <h2 className="font-playfair text-3xl mb-4">Choisissez Votre Formule</h2>
        <p className="font-montserrat text-sm text-black/60 max-w-xl mx-auto">
          Chaque formule inclut une consultation personnalisee avec votre experte image.
          <br />
          <span className="text-gold font-medium">Il ne reste que 3 places ce mois-ci.</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FORMULES.map((f) => (
          <div
            key={f.id}
            onClick={() => { setFormule(f); setStep(2); }}
            className={`relative p-8 cursor-pointer border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              f.popular ? "border-gold bg-black text-[#FCFAF7]" : "border-taupe/30 bg-white hover:border-gold"
            }`}
          >
            {f.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black font-montserrat text-[9px] tracking-[0.3em] uppercase px-4 py-1">
                Le Plus Populaire
              </div>
            )}
            <div className="mb-4">
              <div className={`font-montserrat text-[10px] tracking-[0.2em] uppercase mb-1 ${f.popular ? "text-gold" : "text-gold"}`}>
                {f.duration}
              </div>
              <h3 className={`font-playfair text-xl mb-2 ${f.popular ? "text-[#FCFAF7]" : "text-black"}`}>{f.name}</h3>
              <div className={`font-playfair text-3xl ${f.popular ? "text-gold" : "text-black"}`}>{f.priceLabel}</div>
              {f.installments && f.price > 0 && (
                <div className={`font-montserrat text-[10px] mt-1 ${f.popular ? "text-[#C8B8A6]" : "text-black/50"}`}>
                  ou 3 x {Math.round(f.price / 3)}€
                </div>
              )}
            </div>
            <p className={`font-montserrat text-xs leading-relaxed mb-6 ${f.popular ? "text-[#C8B8A6]" : "text-black/60"}`}>
              {f.description}
            </p>
            <ul className="space-y-2 mb-8">
              {f.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2">
                  <Check size={11} className="text-gold mt-0.5 shrink-0" />
                  <span className={`font-montserrat text-[10px] ${f.popular ? "text-[#C8B8A6]" : "text-black/60"}`}>{inc}</span>
                </li>
              ))}
            </ul>
            <div className={`w-full text-center py-3 font-montserrat text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
              f.popular ? "bg-gold text-black hover:bg-[#A8894E]" : "border border-gold text-gold hover:bg-gold hover:text-white"
            }`}>
              Choisir cette formule
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // -------------------------------------------------------
  // STEP 2 : Personal info + occasion
  // -------------------------------------------------------
  const Step2 = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-playfair text-3xl mb-8 text-center">Votre Profil</h2>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-field">Prenom *</label>
            <input type="text" value={profile.prenom} onChange={(e) => updateProfile("prenom", e.target.value)} className="input-field" placeholder="Votre prenom" />
          </div>
          <div>
            <label className="label-field">Age</label>
            <input type="number" value={profile.age} onChange={(e) => updateProfile("age", e.target.value)} className="input-field" placeholder="Votre age" />
          </div>
        </div>
        <div>
          <label className="label-field">Email *</label>
          <input type="email" value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} className="input-field" placeholder="votre@email.com" />
        </div>
        <div>
          <label className="label-field">Genre</label>
          <div className="grid grid-cols-2 gap-3">
            {["femme", "homme"].map((g) => (
              <button key={g} onClick={() => { updateProfile("genre", g); setGender(g); }}
                className={`py-3 font-montserrat text-xs tracking-[0.2em] uppercase border transition-all duration-200 ${profile.genre === g ? "border-gold bg-gold/10 text-gold" : "border-taupe/30 text-black hover:border-gold"}`}>
                {g === "femme" ? "Femme" : "Homme"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="label-field">Pour quelle occasion ?</label>
          <div className="grid grid-cols-2 gap-2">
            {OCCASIONS.map((occ) => (
              <button key={occ.id} onClick={() => updateProfile("occasion", occ.id)}
                className={`py-2.5 px-3 font-montserrat text-[10px] tracking-widest uppercase border text-left transition-all duration-200 ${profile.occasion === occ.id ? "border-gold bg-gold/10 text-gold" : "border-taupe/30 text-black hover:border-gold"}`}>
                {occ.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => { if (profile.prenom && profile.email) setStep(3); }}
        className="btn-primary w-full mt-8"
        disabled={!profile.prenom || !profile.email}
      >
        Continuer <ChevronRight size={14} className="inline ml-2" />
      </button>
    </div>
  );

  // -------------------------------------------------------
  // STEP 3 : Measurements with AI inline tutorials
  // -------------------------------------------------------
  const measureFields = [
    {
      key: "chest", label: "Tour de Poitrine", unit: "cm",
      instructions: [
        "Portez votre soutien-gorge habituel ou un T-shirt fin",
        "Placez le ruban mesureur horizontalement sur la partie la plus large de votre poitrine",
        "Verifiez que le ruban est bien horizontal dans le dos",
        "Inspirez normalement et lisez la mesure",
      ],
      visual: "⟷  —  POITRINE  —  ⟷",
      example: "Ex: 88 cm",
    },
    {
      key: "waist", label: "Tour de Taille", unit: "cm",
      instructions: [
        "Repérez la partie la plus etroite de votre taille (2 cm au-dessus du nombril)",
        "Placez le ruban a cet endroit, ni trop serre ni trop lache",
        "Expirez normalement et ne rentrez pas le ventre",
        "Lisez la mesure",
      ],
      visual: "⟷  —  TAILLE  —  ⟷",
      example: "Ex: 68 cm",
    },
    ...(gender === "femme" ? [{
      key: "hips", label: "Tour de Hanches", unit: "cm",
      instructions: [
        "Placez-vous debout, pieds joints",
        "Mesurez autour de la partie la plus large de vos hanches et fessiers",
        "Generalement 20-23 cm en dessous de la taille",
        "Le ruban doit etre horizontal et passer sur la partie la plus proeminente",
      ],
      visual: "⟷  —  HANCHES  —  ⟷",
      example: "Ex: 96 cm",
    }] : []),
    {
      key: "height", label: "Taille (hauteur)", unit: "cm",
      instructions: [
        "Enlevez vos chaussures",
        "Placez-vous debout dos au mur, pieds joints et talons contre le mur",
        "Tete droite, regard horizontal",
        "Posez un livre plat sur la tete et marquez le mur — mesurez la distance jusqu'au sol",
      ],
      visual: "↕  HAUTEUR  ↕",
      example: "Ex: 165 cm",
    },
    {
      key: "shoe", label: "Pointure", unit: "EU",
      instructions: [
        "Indiquez votre pointure habituelle en taille europeenne",
        "Si vous etes entre deux tailles, indiquez la plus grande",
        "Exemple : 38, 40, 42...",
      ],
      visual: "EU — UK — US",
      example: "Ex: 38",
    },
  ];

  const [activeTip, setActiveTip] = useState<string | null>(null);

  const Step3 = () => (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-playfair text-3xl mb-4 text-center">Vos Mesures</h2>
      <p className="font-montserrat text-sm text-black/60 text-center mb-4">
        Ces informations permettent a notre IA de calculer votre morphologie.
        Cliquez sur <strong className="text-gold">?</strong> pour voir comment prendre chaque mesure.
      </p>

      {/* AI tip banner */}
      <div className="bg-gold/10 border border-gold/30 p-4 mb-8 flex items-start gap-3">
        <Info size={16} className="text-gold shrink-0 mt-0.5" />
        <p className="font-montserrat text-xs text-black/70">
          <strong>Conseil IA :</strong> Prenez vos mesures avec un ruban de couture souple (pas une regle rigide).
          Mesurez en sous-vetements ou avec des vetements tres fins pour plus de precision.
        </p>
      </div>

      {/* Size chart toggle */}
      <button onClick={() => setShowSizeChart(!showSizeChart)}
        className="w-full border border-gold/30 py-3 font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold hover:bg-gold/5 transition-colors mb-8">
        {showSizeChart ? "Masquer" : "Voir"} le Tableau de Tailles International (EU/FR/UK/US/IT)
      </button>

      {showSizeChart && (
        <div className="mb-8 overflow-x-auto">
          <div className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold mb-3">
            {gender === "femme" ? "Femme" : "Homme"} — Conversion des Tailles
          </div>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-black text-[#FCFAF7]">
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">EU</th>
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">FR</th>
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">UK</th>
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">US</th>
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">IT</th>
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">Poitrine</th>
                <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">Taille</th>
                {gender === "femme" && <th className="px-3 py-2 font-montserrat text-[9px] tracking-widest uppercase">Hanches</th>}
              </tr>
            </thead>
            <tbody>
              {(gender === "femme" ? SIZE_CHART.women : SIZE_CHART.men).map((row, i) => (
                <tr key={row.eu} className={i % 2 === 0 ? "bg-ivory" : "bg-white"}>
                  <td className="px-3 py-2 text-center font-semibold">{row.eu}</td>
                  <td className="px-3 py-2 text-center text-black/70">{row.fr}</td>
                  <td className="px-3 py-2 text-center text-black/70">{row.uk}</td>
                  <td className="px-3 py-2 text-center text-black/70">{row.us}</td>
                  <td className="px-3 py-2 text-center text-black/70">{row.it}</td>
                  <td className="px-3 py-2 text-center text-black/70">{row.chest} cm</td>
                  <td className="px-3 py-2 text-center text-black/70">{row.waist} cm</td>
                  {"hips" in row && gender === "femme" && <td className="px-3 py-2 text-center text-black/70">{(row as {hips: string}).hips} cm</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-4">
        {measureFields.map((field) => (
          <div key={field.key} className="bg-ivory border border-taupe/10">
            {/* Main row */}
            <div className="p-5 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <label className="font-playfair text-lg">{field.label}</label>
                  <button
                    type="button"
                    onClick={() => setActiveTip(activeTip === field.key ? null : field.key)}
                    className="w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-200"
                  >
                    <HelpCircle size={11} className="text-gold" />
                  </button>
                </div>
                <p className="font-montserrat text-[10px] text-black/40">{field.example}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={profile[field.key as keyof typeof profile] as string}
                  onChange={(e) => updateProfile(field.key, e.target.value)}
                  placeholder="--"
                  className="input-field w-24 text-center"
                />
                <span className="font-montserrat text-xs text-black/50 w-8">{field.unit}</span>
              </div>
            </div>

            {/* AI Tutorial panel (expandable) */}
            {activeTip === field.key && (
              <div className="border-t border-gold/20 bg-white p-5">
                <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-4 flex items-center gap-2">
                  <Info size={11} />
                  Guide IA — Comment mesurer : {field.label}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Visual illustration */}
                  <div className="bg-ivory border border-taupe/20 p-6 flex items-center justify-center min-h-[120px]">
                    <div className="text-center">
                      <div className="font-montserrat text-lg text-gold/60 mb-2">{field.visual}</div>
                      <div className="font-montserrat text-[10px] text-black/40">Illustration schematique</div>
                    </div>
                  </div>
                  {/* Step by step */}
                  <div>
                    <ol className="space-y-2">
                      {field.instructions.map((instr, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="font-playfair text-gold text-base leading-tight shrink-0">{idx + 1}.</span>
                          <span className="font-montserrat text-xs text-black/70 leading-relaxed">{instr}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTip(null)}
                  className="mt-4 font-montserrat text-[9px] tracking-widest uppercase text-black/40 hover:text-gold transition-colors"
                >
                  Fermer le guide
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button onClick={() => setStep(2)} className="btn-outline flex-1">Retour</button>
        <button onClick={() => { calcMorpho(); setStep(4); }} className="btn-primary flex-1">
          Continuer <ChevronRight size={14} className="inline ml-2" />
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------
  // STEP 4 : Style quiz
  // -------------------------------------------------------
  const Step4 = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-playfair text-3xl mb-4 text-center">Votre Style</h2>
      <p className="font-montserrat text-sm text-black/60 text-center mb-10">
        Ces informations permettent a notre IA de vous proposer des recommandations vraiment personnalisees.
      </p>
      <div className="space-y-8">
        <div>
          <label className="font-playfair text-lg block mb-4">Quelle est votre saison colorimetrique ? (si vous la connaissez)</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "printemps", label: "Printemps", desc: "Teint dore, yeux clairs, cheveux blonds" },
              { id: "ete", label: "Ete", desc: "Teint rose/beige, yeux bleus/gris, cheveux cendres" },
              { id: "automne", label: "Automne", desc: "Teint dore/olive, yeux ambre, cheveux roux" },
              { id: "hiver", label: "Hiver", desc: "Teint pale ou fonce, contraste fort" },
              { id: "inconnue", label: "Je ne sais pas", desc: "L'analyse colorimetrique le determinera" },
            ].map((s) => (
              <button key={s.id} onClick={() => updateProfile("saison", s.id)}
                className={`p-4 border text-left transition-all duration-200 ${profile.saison === s.id ? "border-gold bg-gold/10" : "border-taupe/30 hover:border-gold"}`}>
                <div className="font-playfair text-base mb-1">{s.label}</div>
                <div className="font-montserrat text-[10px] text-black/50">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="font-playfair text-lg block mb-4">Quel est votre principal objectif de style ?</label>
          <div className="space-y-2">
            {[
              "Etre plus confiante et affirmer ma personnalite",
              "Ameliorer mon image professionnelle",
              "Trouver mon style signature unique",
              "Optimiser ma garde-robe et stopper le shopping compulsif",
              "Me preparer pour un evenement specifique",
              "Moderniser mon style et me sentir a jour",
            ].map((goal) => (
              <button key={goal} onClick={() => updateProfile("styleGoal", goal)}
                className={`w-full text-left p-4 border font-montserrat text-xs transition-all duration-200 ${profile.styleGoal === goal ? "border-gold bg-gold/10 text-gold" : "border-taupe/30 hover:border-gold text-black/70"}`}>
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button onClick={() => setStep(3)} className="btn-outline flex-1">Retour</button>
        <button onClick={() => { generateRecos(); setStep(5); }} className="btn-primary flex-1">
          Voir mes Resultats IA <ChevronRight size={14} className="inline ml-2" />
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------
  // STEP 5 : AI Results
  // -------------------------------------------------------
  const Step5 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Analyse Personnalisee</div>
        <h2 className="font-playfair text-3xl mb-4">Votre Profil Style</h2>
        <p className="font-montserrat text-sm text-black/60">
          Voici un apercu de votre identite stylistique. Votre experte Maison Oleria
          completera cette analyse lors de votre consultation.
        </p>
      </div>

      {/* Morphology result */}
      {profile.morpho && (
        <div className="bg-black text-[#FCFAF7] p-8 mb-6">
          <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">Votre Morphologie</div>
          <div className="font-playfair text-2xl mb-2">{profile.morpho}</div>
          <div className="font-montserrat text-sm text-[#C8B8A6] mb-4">{profile.morphoDesc}</div>
          <div className="border-l-2 border-gold pl-4">
            <p className="font-montserrat text-xs text-[#C8B8A6] italic">{profile.morphoTips}</p>
          </div>
        </div>
      )}

      {/* AI recommendations */}
      <div className="bg-ivory p-8 mb-6">
        <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-4">Recommandations Personnalisees</div>
        <ul className="space-y-3">
          {aiRecos.map((reco, i) => (
            <li key={i} className="flex items-start gap-3">
              <Star size={12} className="text-gold mt-1 shrink-0" />
              <span className="font-montserrat text-sm text-black/70">{reco}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Teaser - more in consultation */}
      <div className="border border-gold/30 p-6 text-center mb-8">
        <div className="font-playfair text-lg mb-2">
          Votre analyse complete vous attend lors de la consultation
        </div>
        <p className="font-montserrat text-xs text-black/60">
          Palette colorimetrique complete · Guide de style · Conseils morphologie · Shopping personnalise
        </p>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setStep(4)} className="btn-outline flex-1">Retour</button>
        <button onClick={() => setStep(6)} className="btn-primary flex-1">
          Finaliser ma Reservation <ChevronRight size={14} className="inline ml-2" />
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------
  // STEP 6 : Payment
  // -------------------------------------------------------
  const Step6 = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-playfair text-3xl mb-4 text-center">Mode de Paiement</h2>
      <p className="font-montserrat text-sm text-black/60 text-center mb-10">
        Choisissez la formule qui vous convient le mieux.
      </p>

      {/* Selected formule recap */}
      <div className="bg-ivory p-6 mb-8 border-l-4 border-gold">
        <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-1">Votre selection</div>
        <div className="font-playfair text-xl">{formule?.name}</div>
        <div className="font-playfair text-2xl text-gold mt-1">{formule?.priceLabel}</div>
      </div>

      {formule && formule.price > 0 ? (
        <div className="space-y-4 mb-8">
          {/* Full payment */}
          <button
            onClick={() => setPaymentMode("full")}
            className={`w-full p-6 border-2 text-left transition-all duration-300 ${paymentMode === "full" ? "border-gold bg-gold/5" : "border-taupe/20 hover:border-gold/50"}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-playfair text-lg">Paiement complet</div>
                <div className="font-montserrat text-xs text-black/60 mt-1">Remise de 5% incluse</div>
              </div>
              <div className="font-playfair text-2xl text-gold">{Math.round(formule.price * 0.95)} €</div>
            </div>
          </button>

          {/* Deposit */}
          {formule.deposit > 0 && (
            <button
              onClick={() => setPaymentMode("deposit")}
              className={`w-full p-6 border-2 text-left transition-all duration-300 ${paymentMode === "deposit" ? "border-gold bg-gold/5" : "border-taupe/20 hover:border-gold/50"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-playfair text-lg">Acompte de reservation</div>
                  <div className="font-montserrat text-xs text-black/60 mt-1">Solde de {formule.price - formule.deposit}€ apres la consultation</div>
                </div>
                <div className="font-playfair text-2xl text-gold">{formule.deposit} € maintenant</div>
              </div>
            </button>
          )}

          {/* Installments */}
          {formule.installments && (
            <button
              onClick={() => setPaymentMode("installments")}
              className={`w-full p-6 border-2 text-left transition-all duration-300 ${paymentMode === "installments" ? "border-gold bg-gold/5" : "border-taupe/20 hover:border-gold/50"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-playfair text-lg">Paiement en 3 fois</div>
                  <div className="font-montserrat text-xs text-black/60 mt-1">Sans frais — sur 3 mois</div>
                </div>
                <div className="font-playfair text-2xl text-gold">3 x {Math.round(formule.price / 3)} €</div>
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 p-6 mb-8 text-center">
          <div className="font-playfair text-xl text-green-700 mb-2">Consultation Gratuite</div>
          <p className="font-montserrat text-sm text-green-600">Aucun paiement requis. Reservez simplement votre creneau.</p>
        </div>
      )}

      {/* Security badges */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-gold" />
          <span className="font-montserrat text-[10px] text-black/50">Paiement securise Stripe</span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={14} className="text-gold" />
          <span className="font-montserrat text-[10px] text-black/50">Remboursement si annulation 48h avant</span>
        </div>
      </div>

      {payError && (
        <div className="bg-red-50 border border-red-200 p-4 text-center mb-6">
          <div className="font-montserrat text-xs text-red-600">{payError}</div>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={() => setStep(5)} className="btn-outline flex-1" disabled={isPaying}>Retour</button>
        <button onClick={startCheckout} className="btn-gold flex-1" disabled={isPaying}>
          {isPaying
            ? "Redirection vers le paiement..."
            : formule && formule.price > 0
              ? <>Payer et Choisir mon Creneau <ChevronRight size={14} className="inline ml-2" /></>
              : <>Confirmer et Choisir mon Creneau <ChevronRight size={14} className="inline ml-2" /></>}
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------
  // STEP 7 : Calendly
  // -------------------------------------------------------
  const CALENDLY_URL = "https://calendly.com/votre-username/consultation-maison-allure";


  const Step7 = () => (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="font-playfair text-3xl mb-4">Choisissez Votre Creneau</h2>
      <p className="font-montserrat text-sm text-black/60 mb-10">
        Selectionnez la date et l&apos;heure qui vous conviennent le mieux.
        Un email de confirmation vous sera envoye immediatement.
      </p>

      {/* Calendly embed placeholder */}
      <div className="border border-taupe/30 bg-ivory aspect-video flex items-center justify-center mb-8">
        <div className="text-center">
          <Clock size={32} className="text-gold mx-auto mb-4" />
          <div className="font-playfair text-xl mb-2">Agenda Maison Oleria</div>
          <p className="font-montserrat text-sm text-black/60 mb-6 max-w-xs mx-auto">
            Configurez votre URL Calendly dans le code pour afficher le calendrier ici.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block"
          >
            Ouvrir le Calendrier
          </a>
          <p className="font-montserrat text-[10px] text-black/40 mt-4">
            Remplacez CALENDLY_URL dans src/app/reserver/page.tsx par votre vrai lien Calendly
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setStep(6)} className="btn-outline flex-1">Retour</button>
        <button
          onClick={() => {
            trackAppointment({ contentName: formule?.name });
            setStep(8);
          }}
          className="btn-primary flex-1"
        >
          Confirmer <ChevronRight size={14} className="inline ml-2" />
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------
  // STEP 8 : Confirmation
  // -------------------------------------------------------
  const Step8 = () => (
    <div className="max-w-xl mx-auto text-center">
      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={28} className="text-gold" />
      </div>
      <h2 className="font-playfair text-4xl mb-4">
        Merci, {profile.prenom || "Chere Cliente"} !
      </h2>
      <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-8">
        {paymentStatus === "success"
          ? <>Votre paiement a ete confirme et votre reservation est validee. Un email de confirmation a ete envoye a <strong>{profile.email || "votre adresse"}</strong>.</>
          : <>Votre reservation est confirmee. Un email de confirmation avec les details de votre consultation a ete envoye a <strong>{profile.email}</strong>.</>}
      </p>

      <div className="bg-ivory p-8 mb-8 text-left">
        <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-4">Recapitulatif</div>
        <div className="space-y-2 font-montserrat text-sm">
          <div className="flex justify-between"><span className="text-black/60">Formule</span><span className="font-medium">{formule?.name}</span></div>
          <div className="flex justify-between"><span className="text-black/60">Occasion</span><span className="font-medium">{OCCASIONS.find(o => o.id === profile.occasion)?.label || "Non specifie"}</span></div>
          {profile.morpho && <div className="flex justify-between"><span className="text-black/60">Morphologie detectee</span><span className="font-medium">{profile.morpho}</span></div>}
        </div>
      </div>
      <div className="space-y-3">
        <Link href="/" className="btn-primary block w-full text-center">
          Retour a l&apos;Accueil
        </Link>
        <Link href="/contact" className="btn-outline block w-full text-center">
          Nous Contacter
        </Link>
      </div>
    </div>
  );

  const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8];
  const CurrentStep = steps[step - 1];

  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-8 bg-ivory border-b border-taupe/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="section-subtitle mb-1">Reserver</p>
              <h1 className="font-playfair text-3xl">{stepTitles[step - 1]}</h1>
            </div>
            {formule && step > 1 && (
              <div className="hidden md:block text-right">
                <div className="font-montserrat text-[9px] tracking-widest uppercase text-black/40">Formule selectionnee</div>
                <div className="font-playfair text-lg">{formule.name}</div>
                <div className="font-playfair text-gold">{formule.priceLabel}</div>
              </div>
            )}
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-1">
            {stepTitles.map((_, i) => (
              <div key={i} className={`h-1 flex-1 transition-all duration-300 ${i < step ? "bg-gold" : "bg-taupe/30"}`} />
            ))}
          </div>
          <div className="font-montserrat text-[10px] text-black/40 mt-2">Etape {step} sur {stepTitles.length}</div>
        </div>
      </section>

      {/* STEP CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <style>{`
            .input-field { width: 100%; border: 1px solid rgba(200,184,166,0.4); padding: 12px 16px; font-family: 'Montserrat', sans-serif; font-size: 14px; outline: none; background: transparent; }
            .input-field:focus { border-color: #C6A46A; }
            .label-field { display: block; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(31,31,31,0.4); margin-bottom: 8px; }
          `}</style>
          <CurrentStep />
        </div>
      </section>
    </>
  );
}

// File contains AI-generated response based on internal company sources
