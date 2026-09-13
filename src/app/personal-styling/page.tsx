import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Stylisme Personnel",
  description: "Developpez votre identite de style unique avec notre service de stylisme personnel. Analyse morphologique, style board et accompagnement personnalise.",
};

const bodyShapes = [
  { name: "Silhouette en Sablier", ratio: "Epaules = Hanches, Taille Marquee", tips: "Valorisez votre taille, portez des coupes ajustees. Vous etes la silhouette ideale pour presque toutes les coupes." },
  { name: "Silhouette en Poire", ratio: "Hanches > Epaules", tips: "Elargissez visuellement les epaules, allongez le buste. Privilegiez les hauts structures et les decoltes V." },
  { name: "Silhouette en Pomme", ratio: "Ventre Saillant, Epaules Larges", tips: "Allongez la silhouette, minimisez l'abdomen. Optez pour des coupes fluides, des decoltes V profonds." },
  { name: "Silhouette Rectangulaire", ratio: "Epaules = Hanches = Taille", tips: "Creez des courbes et de la structure. Portez des ceintures, des robes evasees, des coupes avec volume." },
  { name: "Silhouette en Triangle Inverse", ratio: "Epaules > Hanches", tips: "Equilibrez avec du volume en bas. Privilegiez les jupes evasees, les pantalons larges, les bas structures." },
];

const faceShapes = [
  { name: "Visage Ovale", desc: "La forme de visage la plus polyvalente. Toutes les coupes de cheveux et montures de lunettes lui conviennent." },
  { name: "Visage Rond", desc: "Allongez visuellement. Privilegiez les coupes longues, les decoltes en V, les pieces verticales." },
  { name: "Visage Carre", desc: "Adoucissez les angles. Optez pour des coupes avec du volume, des cols arrondis, des bijoux courbes." },
  { name: "Visage Long", desc: "Raccourcissez visuellement. Privilegiez les coupes avec du volume lateral, les cols larges, les foulards." },
  { name: "Visage en Coeur", desc: "Equilibrez le menton. Portez du volume sur les hanches, des cols en V, des encolures elegantes." },
  { name: "Visage Diamant", desc: "Adoucissez les pommettes. Optez pour des coupes avec du volume en haut et en bas du visage." },
];

const stylePersonalities = [
  { name: "Classique Elegant", icon: "CE", desc: "Intemporel, raffine, sobre. Coupes impeccables, couleurs neutres, matieres nobles. Votre image : credibilite et autorite." },
  { name: "Romantique Feminin", icon: "RF", desc: "Doux, delicat, poetique. Dentelles, fleurs, coupes fluides. Votre image : feminite et douceur accessibles." },
  { name: "Dramatique Avant-Garde", icon: "DA", desc: "Fort, audacieux, original. Contrastes, coupes architecturales, accessoires statement. Votre image : impact et memorisation." },
  { name: "Naturel Decontracte", icon: "ND", desc: "Simple, confortable, authentique. Matieres naturelles, coupes relachees. Votre image : accessibilite et sincerite." },
  { name: "Sportif Moderne", icon: "SM", desc: "Dynamique, pratique, contemporain. Coupes fonctionnelles, matieres techniques. Votre image : vitalite et modernite." },
  { name: "Creatif Artistique", icon: "CA", desc: "Unique, expressif, colore. Melanges inattendus, pieces artisanales. Votre image : creativite et distinction." },
];

export default function PersonalStylingPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4 text-gold">Stylisme Personnel</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-[#FCFAF7] mb-6 max-w-2xl">
            Votre Style,<br />
            <em className="text-gold">Votre Identite</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-[#C8B8A6] max-w-xl leading-relaxed mb-8">
            Le stylisme personnel va au-dela de la mode. C&apos;est la construction d&apos;une
            identite visuelle unique qui vous represente, vous valorise et vous donne confiance.
          </p>
          <Link href="/contact" className="btn-gold">
            Commencer Ma Transformation
          </Link>
        </div>
      </section>

      {/* STYLE ASSESSMENT */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Notre Approche</p>
            <h2 className="section-title mb-4">L&apos;Evaluation de Votre Style</h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-black/60 max-w-xl mx-auto mt-6">
              Avant toute transformation, nous effectuons un bilan complet de votre style actuel,
              vos besoins, vos inspirations et vos contraintes de vie.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Audit de Votre Garde-Robe", desc: "Inventaire complet de vos vetements actuels, identification des pieces a conserver, a modifier ou a remplacer." },
              { title: "Analyse de Vos Besoins", desc: "Etude de votre mode de vie, vos activites, vos occasions de sortie pour une garde-robe parfaitement adaptee." },
              { title: "Exploration de Vos Inspirations", desc: "Creation d'un mood board de vos inspirations stylistiques pour identifier vos preferences esthetiques profondes." },
              { title: "Evaluation de Votre Budget", desc: "Definition d'une strategie d'investissement dans votre garde-robe, avec priorites et selections rentables." },
              { title: "Diagnostic de Votre Image Actuelle", desc: "Analyse objective de l'image que vous projetez actuellement et de l'ecart avec l'image souhaitee." },
              { title: "Definition de Vos Objectifs", desc: "Identification claire de ce que vous souhaitez atteindre : confiance, impact, seduction, autorité, raffinement." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8">
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-playfair text-lg mb-3">{item.title}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY SHAPE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Valorisez Votre Silhouette</p>
            <h2 className="section-title mb-4">Analyse Morphologique</h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-black/60 max-w-xl mx-auto mt-6">
              Chaque silhouette est unique et magnifique. Notre expertise vous apprend
              a choisir des coupes qui la valorisent naturellement.
            </p>
          </div>
          <div className="space-y-4">
            {bodyShapes.map((s, i) => (
              <div key={s.name} className={`grid grid-cols-1 md:grid-cols-3 gap-0 ${i % 2 === 0 ? "bg-ivory" : "bg-white border border-taupe/10"}`}>
                <div className="p-8 border-r border-taupe/10">
                  <div className="font-playfair text-xl mb-1">{s.name}</div>
                  <div className="font-montserrat text-[10px] tracking-widest uppercase text-gold">{s.ratio}</div>
                </div>
                <div className="p-8 col-span-2">
                  <div className="flex items-start gap-3">
                    <Check size={14} className="text-gold mt-0.5 shrink-0" />
                    <p className="font-montserrat text-sm text-black/70">{s.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACE SHAPE */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Sublimez Votre Visage</p>
            <h2 className="section-title mb-4">Analyse de la Forme du Visage</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faceShapes.map((f) => (
              <div key={f.name} className="bg-white p-8 border-b-2 border-transparent hover:border-gold transition-all duration-300">
                <h3 className="font-playfair text-lg mb-3">{f.name}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STYLE IDENTITY */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4 text-gold">Votre ADN Stylistique</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-4">Developpez Votre Style Signature</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stylePersonalities.map((s) => (
              <div key={s.name} className="border border-gold/20 p-8 hover:border-gold transition-colors duration-300">
                <div className="font-playfair text-3xl text-gold/30 mb-4">{s.icon}</div>
                <h3 className="font-playfair text-lg text-[#FCFAF7] mb-3">{s.name}</h3>
                <p className="font-montserrat text-xs text-[#C8B8A6] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARDROBE OPTIMIZATION */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-subtitle mb-4">Optimisation de Garde-Robe</p>
            <h2 className="section-title mb-6">Transformez ce que vous Avez Deja</h2>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              La transformation n&apos;implique pas necessairement de tout racheter. Notre expertise
              consiste a maximiser le potentiel de ce que vous possedez deja et d&apos;identifier
              les investissements strategiques manquants.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Tri et reorganisation de votre garde-robe",
                "Identification des pieces clefs a conserver",
                "Nouvelles coordinations que vous ne voyiez pas",
                "Liste precise des pieces a acquérir en priorite",
                "Conseils pour allonger la vie de vos vetements",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="font-montserrat text-sm text-black/70">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary">
              Optimiser Ma Garde-Robe
            </Link>
          </div>
          <div className="bg-black p-12">
            <div className="font-playfair text-2xl text-[#FCFAF7] italic mb-8 leading-relaxed">
              &ldquo;La mode se demode, le style jamais.&rdquo;
            </div>
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-8">— Coco Chanel</div>
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed">
              Notre philosophie du style capsule s&apos;inspire de la lecon de Chanel :
              quelques pieces essentielles et parfaitement choisies valent mieux qu&apos;une
              garde-robe surchargee de tendances ephemeres.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">Construisez Votre Style Signature</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Commencez votre voyage vers un style authentique et elegant
            qui vous represente et vous donne confiance.
          </p>
          <Link href="/contact" className="btn-primary">
            Reserver Ma Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
