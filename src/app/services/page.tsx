import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Decouvrez tous nos services de conseil en image : analyse colorimetrique, stylisme personnel, image professionnelle, shopping accompagne et bien plus.",
};

const services = [
  {
    id: "conseil-image",
    title: "Conseil en Image Personnalise",
    subtitle: "Le coeur de notre expertise",
    desc: "Un accompagnement global et sur mesure pour construire une image coherente, elegante et authentique en accord avec votre personnalite et vos objectifs.",
    benefits: ["Analyse complete de votre profil image", "Guide personnalise couleurs et styles", "Optimisation de votre garde-robe existante", "Regles morphologiques adaptes"],
    process: ["Entretien de decouverte (1h)", "Analyse colorimetrique et morphologique", "Creation de votre guide de style", "Seance de mise en pratique"],
    results: "Une image alignee avec qui vous etes, des choix vestimentaires plus rapides et assures, une confiance renforcee.",
    duration: "Journee complete",
    href: "/contact",
  },
  {
    id: "color-analysis",
    title: "Analyse Colorimetrique",
    subtitle: "Votre palette de couleurs personnelle",
    desc: "Decouvrez les couleurs qui subliment votre teint, vos yeux et votre chevelure grace a une analyse scientifique rigoureuse basee sur les saisons.",
    benefits: ["Identification de votre saison colorimetrique", "Palette personnelle de 40 couleurs", "Guide couleurs pour chaque occasion", "Conseils maquillage et accessoires"],
    process: ["Preparation (sans maquillage)", "Drape de couleurs systematique", "Analyse et revelation de votre saison", "Remise de votre palette personnelle"],
    results: "Un teint lumineux, des tenues harmonieuses, plus jamais de mauvaises achats couleur.",
    duration: "3 a 4 heures",
    href: "/color-analysis",
  },
  {
    id: "style-personnel",
    title: "Stylisme Personnel",
    subtitle: "Votre identite de style",
    desc: "Developpez une identite de style unique qui vous ressemble, en harmonie avec votre morphologie, votre personnalite et votre mode de vie.",
    benefits: ["Style board personnalise", "Analyse de votre morphologie", "Definition de votre style signature", "Conseils coupes et matieres"],
    process: ["Questionnaire de style approfondi", "Analyse morphologique detaillee", "Exploration de vos inspirations", "Creation de votre profil de style"],
    results: "Un style coherent et signature, des tenues qui valorisent votre silhouette, une expression authentique de vous-meme.",
    duration: "Demi-journee",
    href: "/personal-styling",
  },
  {
    id: "image-pro",
    title: "Image Professionnelle",
    subtitle: "Votre capital image au service de votre carriere",
    desc: "Construisez une image professionnelle percutante qui reflète votre expertise, renforce votre autorite et accelere votre carriere.",
    benefits: ["Audit de votre image actuelle", "Strategie image par objectif", "Guide tenues par contexte professionnel", "Preparation entretiens et prises de parole"],
    process: ["Bilan image professionnel", "Definition de vos objectifs de carriere", "Creation de votre strategie image", "Mise en oeuvre et suivi"],
    results: "Une presence executive affirmee, plus d'impact dans vos interactions professionnelles, confiance et autorite naturelle.",
    duration: "Sur devis",
    href: "/professional-image",
  },
  {
    id: "mariage",
    title: "Stylisme Mariage",
    subtitle: "Le plus beau jour de votre vie",
    desc: "Un accompagnement complet pour que vous rayonniez lors de votre mariage et de tous les evenements qui l'entourent.",
    benefits: ["Accompagnement de la mariee et de l'entourage", "Coherence visuelle du jour J", "Preparation beaute et image", "Shopping accompagne robe et accessoires"],
    process: ["Consultation initiale et vision du mariage", "Analyse colorimetrique et style", "Recherche et selection des tenues", "Preparation finale et jour J"],
    results: "Un style de mariage coherent et memorable, une mariee rayonnante et sereine, des photos dont vous serez fiere pour toujours.",
    duration: "Forfait personnalise",
    href: "/wedding-styling",
  },
  {
    id: "shopping",
    title: "Shopping Accompagne",
    subtitle: "Shoppez avec expertise et plaisir",
    desc: "Beneficiez d'une seance de shopping sur mesure avec votre consultante pour constituer ou completer une garde-robe parfaitement adaptee.",
    benefits: ["Selection personnalisee des boutiques", "Choix expert de chaque piece", "Optimisation du budget", "Coherence avec votre guide de style"],
    process: ["Preparation du plan shopping", "Seance en boutiques selectionnees", "Essayages et conseils en temps reel", "Bilan et coordination des achats"],
    results: "Des achats juste et rentables, une garde-robe coherente, plus jamais de sentiment de n'avoir rien a se mettre.",
    duration: "Demi-journee ou journee",
    href: "/contact",
  },
  {
    id: "capsule",
    title: "Garde-Robe Capsule",
    subtitle: "L'essentiel chic et eternel",
    desc: "Concevez une garde-robe capsule minimaliste et versatile avec des pieces de qualite qui se coordonnent parfaitement pour toutes les occasions.",
    benefits: ["Audit complet de votre garde-robe", "Selection des pieces essentielles", "Coordination maximale des tenues", "Liste d'achats prioritaires"],
    process: ["Grand menage et desencombrement", "Identification des pieces manquantes", "Selection de pieces capsule adaptees", "Creation d'un lookbook de coordinations"],
    results: "Une garde-robe epuree et fonctionnelle, des dizaines de tenues avec peu de pieces, du temps et de l'argent economies.",
    duration: "Journee complete",
    href: "/contact",
  },
  {
    id: "travel",
    title: "Stylisme Voyage",
    subtitle: "Voyagez avec style et elegance",
    desc: "Preparez une valise parfaite pour chaque voyage : versatile, elegante et parfaitement adaptee a votre destination et programme.",
    benefits: ["Selection de pieces polyvalentes", "Coordination couleurs optimisee", "Conseils valise et rangement", "Tenues par occasion de voyage"],
    process: ["Briefing sur votre voyage", "Selection des pieces de la garde-robe", "Creation des coordinations", "Packing professionnel"],
    results: "Une valise legere et complete, un style impeccable en toutes circonstances, la fin du stress de la valise.",
    duration: "2 a 3 heures",
    href: "/contact",
  },
  {
    id: "seasonal",
    title: "Planning Saisonnier",
    subtitle: "Votre garde-robe au fil des saisons",
    desc: "Un suivi regulier pour adapter votre garde-robe aux nouvelles saisons, tendances et evolutions de votre vie.",
    benefits: ["Transition saisonniere organisee", "Mises a jour de votre style", "Anticipation des besoins", "Budget mode maitrise"],
    process: ["Bilan de saison", "Identification des manques", "Planning d'achats saisonniers", "Shopping guide (optionnel)"],
    results: "Une garde-robe toujours actuelle et adaptee, un budget mode sous controle, un style qui evolue avec vous.",
    duration: "2 heures par saison",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4 text-gold">Notre Expertise</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-[#FCFAF7] mb-6 max-w-2xl">
            Services de Conseil<br />en <em className="text-gold">Image de Luxe</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-[#C8B8A6] max-w-xl leading-relaxed">
            Un accompagnement complet et sur mesure pour chaque etape de votre transformation.
            Chaque service est personnalise selon votre profil unique.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-1">
          {services.map((s, i) => (
            <div key={s.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${i % 2 === 0 ? "" : ""}`}>
              <div className={`p-12 ${i % 2 === 0 ? "bg-ivory" : "bg-white"}`}>
                <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-2">{s.subtitle}</div>
                <h2 className="font-playfair text-3xl mb-4">{s.title}</h2>
                <span className="block w-12 h-px bg-gold mb-6" />
                <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">{s.desc}</p>
                <div className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/40 mb-2">Duree : {s.duration}</div>
                <Link href={s.href} className="inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold hover:gap-4 transition-all duration-300 mt-4">
                  Reserver <ArrowRight size={12} />
                </Link>
              </div>
              <div className={`p-12 ${i % 2 === 0 ? "bg-white" : "bg-ivory"}`}>
                <div className="mb-8">
                  <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-black/40 mb-4">Benefices</h4>
                  <ul className="space-y-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check size={12} className="text-gold mt-0.5 shrink-0" />
                        <span className="font-montserrat text-xs text-black/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-taupe/20 pt-6">
                  <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3">Resultat Attendu</h4>
                  <p className="font-montserrat text-xs text-black/60 leading-relaxed italic">{s.results}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">Quel Service Vous Convient ?</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Incertaine du service adapte a votre situation ? Contactez-nous pour une
            consultation gratuite de 20 minutes afin d&apos;identifier vos besoins.
          </p>
          <Link href="/contact" className="btn-primary">
            Consultation Gratuite
          </Link>
        </div>
      </section>
    </>
  );
}
