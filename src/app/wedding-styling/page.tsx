import type { Metadata } from "next";
import Link from "next/link";
import { Check, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Stylisme Mariage",
  description: "Rayonnez lors de votre mariage avec le stylisme mariage Maison Oleria. Accompagnement de la mariee, families, temoins et invites pour un mariage visuellement harmonieux.",
};

const packages = [
  {
    title: "La Mariee",
    tagline: "Le plus beau jour de votre vie",
    services: [
      "Analyse colorimetrique complete",
      "Definition de votre vision et style de mariage",
      "Accompagnement shopping robe, accessoires, voile",
      "Conseils lingerie et sous-vetements",
      "Consultation coiffure et maquillage",
      "Essayage final et validation complete",
      "Guide de soin beaute pre-mariage",
      "Assistance le jour J (optionnel)",
    ],
    highlight: true,
  },
  {
    title: "La Mere de la Mariee",
    tagline: "Radieuse et harmonieuse",
    services: [
      "Analyse colorimetrique adaptee",
      "Harmonie avec la palette de la mariee",
      "Shopping accompagne tenue et accessoires",
      "Conseils coiffure et maquillage",
      "Coordination avec les autres tenues du cortege",
    ],
    highlight: false,
  },
  {
    title: "Les Temoins",
    tagline: "Complices et elegantes",
    services: [
      "Coordination colorimetrique du groupe",
      "Selection des tenues en coherence avec le theme",
      "Conseils accessoires et coiffure",
      "Harmonie avec les couleurs du mariage",
    ],
    highlight: false,
  },
  {
    title: "Les Invitees",
    tagline: "Chic et respectueuses",
    services: [
      "Consultation individuelle tenue de mariage",
      "Conseils etiquette vestimentaire mariage",
      "Selection personnalisee selon le theme",
      "Harmonie avec la palette des photos",
    ],
    highlight: false,
  },
];

const steps = [
  { num: "01", title: "Vision du Mariage", desc: "Premier rendez-vous pour comprendre votre vision, le theme, les couleurs et l'ambiance de votre mariage." },
  { num: "02", title: "Analyse Colorimetrique", desc: "Determination de votre palette de couleurs pour que le blanc ou ivoire de votre robe soit parfaitement harmonieux avec votre teint." },
  { num: "03", title: "Style & Silhouette", desc: "Identification du style de robe ideal selon votre silhouette, votre personnalite et l'ambiance du mariage." },
  { num: "04", title: "Shopping Robe", desc: "Accompagnement en boutiques selectionnees pour trouver la robe de vos reves dans les meilleures conditions." },
  { num: "05", title: "Accessoires & Details", desc: "Selection de votre voile, bijoux, chaussures et tout ce qui completera parfaitement votre look." },
  { num: "06", title: "Preparation Finale", desc: "Dernier essayage complet avec l'ensemble des elements du look. Coordination avec coiffeuse et maquilleuse." },
];

export default function WeddingStylingPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={14} className="text-gold" />
            <p className="section-subtitle">Stylisme Mariage</p>
          </div>
          <h1 className="section-title max-w-2xl mb-6">
            Rayonnez le Jour<br />
            <em className="text-gold">le Plus Precieux de Votre Vie</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-black/60 max-w-xl leading-relaxed mb-8">
            Votre mariage merite une preparation image exceptionnelle. Maison Oleria vous
            accompagne pour que chaque membre du cortege soit parfaitement elegant, en harmonie
            et rayonnant lors de ce jour inoubliable.
          </p>
          <Link href="/contact" className="btn-primary">
            Reserver une Consultation Mariage
          </Link>
        </div>
      </section>

      {/* BRIDE PROMISE */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-subtitle mb-4 text-gold">Notre Promesse</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-6">
              Une Mariee Sereine,<br />
              <em className="text-gold">Rayonnante & Memorisable</em>
            </h2>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed mb-6">
              Le stress de trouver la robe parfaite, de coordonner les tenues du cortege,
              de s&apos;assurer que tout le monde soit a son avantage sur les photos... Nous
              prenons tout cela en charge pour vous.
            </p>
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed">
              Notre expertise garantit une coherence visuelle parfaite pour tout votre entourage,
              des photos de mariage qui resteront magnifiques pour l&apos;eternite, et une mariee
              sereine et confiante le jour J.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { stat: "100%", label: "Mariees satisfaites de leur look" },
              { stat: "6 mois", label: "D'accompagnement en moyenne" },
              { stat: "3-5", label: "Boutiques visitees par mariee" },
              { stat: "360°", label: "Coordination visuelle du cortege" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-6 border border-gold/20 p-6">
                <div className="font-playfair text-3xl text-gold w-24 shrink-0">{s.stat}</div>
                <div className="font-montserrat text-xs tracking-[0.1em] uppercase text-[#C8B8A6]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Nos Formules</p>
            <h2 className="section-title mb-4">Un Accompagnement pour Chacune</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((p) => (
              <div key={p.title} className={`p-8 ${p.highlight ? "bg-black text-[#FCFAF7] border-2 border-gold" : "bg-ivory"}`}>
                {p.highlight && (
                  <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-4">Le Plus Populaire</div>
                )}
                <h3 className={`font-playfair text-xl mb-2 ${p.highlight ? "text-[#FCFAF7]" : ""}`}>{p.title}</h3>
                <p className={`font-montserrat text-[10px] tracking-[0.1em] uppercase mb-6 ${p.highlight ? "text-gold" : "text-gold"}`}>{p.tagline}</p>
                <ul className="space-y-2 mb-8">
                  {p.services.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <Check size={11} className="text-gold mt-0.5 shrink-0" />
                      <span className={`font-montserrat text-xs leading-relaxed ${p.highlight ? "text-[#C8B8A6]" : "text-black/70"}`}>{s}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={p.highlight ? "btn-gold w-full block text-center" : "btn-outline w-full block text-center"}>
                  Demander un Devis
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Notre Methode</p>
            <h2 className="section-title mb-4">Le Parcours de la Mariee</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="bg-white p-8">
                <div className="font-playfair text-4xl text-gold/20 mb-3">{s.num}</div>
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-playfair text-lg mb-3">{s.title}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATION WEDDINGS */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-subtitle mb-4 text-gold">Mariages a Destination</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-6">
              Mariages Internationaux<br />& a Destination
            </h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed mt-8 mb-6">
              Vous vous mariez a Cannes, Santorini, Bali ou New York ? Nous vous accompagnons
              en visioconference pour toute la preparation, avec des recommandations locales
              et un suivi a distance impeccable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "Consultation Distance", desc: "Preparation complete en visio, adaptee aux contraintes de voyage." },
                { title: "Guide Local", desc: "Recommandations de boutiques et prestataires sur place." },
                { title: "Coordination Complete", desc: "Suivi de l'ensemble du cortege malgre la distance." },
              ].map((item) => (
                <div key={item.title} className="border border-gold/20 p-6 hover:border-gold transition-colors duration-300">
                  <div className="w-6 h-px bg-gold mb-4" />
                  <h3 className="font-playfair text-base text-[#FCFAF7] mb-2">{item.title}</h3>
                  <p className="font-montserrat text-xs text-[#C8B8A6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Heart size={24} className="text-black mx-auto mb-6" />
          <h2 className="font-playfair text-4xl text-black mb-6">Votre Jour Parfait Commence Ici</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Contactez-nous pour une consultation decouverte gratuite et discutons ensemble
            de la vision de votre plus beau jour.
          </p>
          <Link href="/contact" className="btn-primary">
            Reserver Ma Consultation Mariage
          </Link>
        </div>
      </section>
    </>
  );
}
