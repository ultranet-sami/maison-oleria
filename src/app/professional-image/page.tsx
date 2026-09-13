import type { Metadata } from "next";
import Link from "next/link";
import { Check, TrendingUp, Award, Users, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Professionnelle",
  description: "Construisez une image professionnelle puissante avec Maison Oleria. Presence executive, coaching image leadership, preparation entretiens et personal branding.",
};

const contexts = [
  { title: "Reunions & Negociations", desc: "Habiller votre autorite naturelle. Tenues qui inspirent confiance et credibilite sans ecarter vos interlocuteurs.", icon: Users },
  { title: "Prises de Parole Publiques", desc: "Maximiser votre impact visuel en conference, formation ou media. Couleurs videogeniques, coupes qui projettent.", icon: TrendingUp },
  { title: "Entretiens d'Embauche", desc: "La premiere impression est decisive. Tenue parfaitement calibree pour votre secteur et le poste vise.", icon: Briefcase },
  { title: "LinkedIn & Personal Branding", desc: "Votre photo de profil et votre image digitale sont votre carte de visite 24/7. Optimisez-les.", icon: Award },
];

const executives = [
  { role: "Dirigeants & PDG", need: "Image de leadership fort et visionnaire. Rigueur et modernite dans un meme ensemble.", tips: ["Costumes coupes sur mesure ou tres bien ajustes", "Couleurs profondes et autoritaires", "Accessoires de qualite et subtils", "Coherence parfaite entre image et vision de l'entreprise"] },
  { role: "Cadres Superieurs", need: "Crédibilite professionnelle et aspiration au leadership. Image ascendante et confiante.", tips: ["Pieces structurees et de qualite", "Palette de couleurs professionnelle", "Equilibre entre sobriete et personnalite", "Tenue adaptee a chaque type de reunion"] },
  { role: "Entrepreneurs", need: "Image qui reflete leur vision unique. Distinguer leur singularite tout en inspirant confiance.", tips: ["Style personnel affirme mais code", "Audace controlee et intentionnelle", "Coherence avec les valeurs de leur marque", "Versatilite selon les contextes"] },
  { role: "Candidats en Reconversion", need: "Projeter une image alignee avec leur nouvelle ambition professionnelle.", tips: ["Adapter l'image au nouveau secteur cible", "Tenue d'entretien percutante et memorisable", "Dossier image pour les agences et RH", "Confiance immediate dans la nouvelle identite"] },
];

export default function ProfessionalImagePage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle mb-4">Image Professionnelle</p>
            <h1 className="section-title mb-6">
              Votre Image,<br />
              <em className="text-gold">Votre Plus Grand Atout</em><br />
              Professionnel
            </h1>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-8">
              Dans le monde professionnel, votre image est un levier de pouvoir. Bien
              maitrisee, elle accelere votre carriere, renforce votre influence et ouvre
              des portes. Maison Oleria vous aide a en faire un vrai atout strategique.
            </p>
            <Link href="/contact" className="btn-primary">
              Booster Mon Image Pro
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "93%", label: "de la communication est non verbale" },
              { num: "7sec", label: "pour former une premiere impression" },
              { num: "55%", label: "de notre message passe par l'image" },
              { num: "3x", label: "plus de chances en entretien avec la bonne image" },
            ].map((s) => (
              <div key={s.label} className="bg-black p-8 text-center">
                <div className="font-playfair text-3xl text-gold mb-2">{s.num}</div>
                <div className="font-montserrat text-[10px] tracking-[0.1em] uppercase text-[#C8B8A6]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE PRESENCE */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4 text-gold">Leadership & Presence</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-4">Developpez Votre Presence Executive</h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-[#C8B8A6] max-w-xl mx-auto mt-6">
              La presence executive n&apos;est pas une question de titre. C&apos;est une combinaison
              d&apos;image, de langage corporel et de confiance qui inspire le respect naturellement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Projection d'Autorite", desc: "Les bons vetements activent ce qu'on appelle l'effet d'habit : ils modifient votre posture, votre voix et votre facon de vous comporter." },
              { title: "Coherence de Marque", desc: "Votre image personnelle doit etre en alignement avec votre mission professionnelle et les valeurs que vous portez." },
              { title: "Impact Memorable", desc: "Les gens ne se souviennent pas de ce que vous dites mais de ce qu'ils ont ressenti en votre presence. Soignez cette premiere impression." },
            ].map((item) => (
              <div key={item.title} className="border border-gold/20 p-10 hover:border-gold transition-colors duration-300">
                <div className="w-8 h-px bg-gold mb-6" />
                <h3 className="font-playfair text-xl text-[#FCFAF7] mb-4">{item.title}</h3>
                <p className="font-montserrat text-xs text-[#C8B8A6] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Chaque Contexte, une Strategie</p>
            <h2 className="section-title mb-4">Tenue Juste pour Chaque Situation</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contexts.map((c) => (
              <div key={c.title} className="flex gap-6 p-8 bg-ivory">
                <div className="shrink-0">
                  <c.icon size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl mb-3">{c.title}</h3>
                  <p className="font-montserrat text-sm text-black/60 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILES */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Accompagnement Personnalise</p>
            <h2 className="section-title mb-4">Un Programme pour Chaque Profil</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executives.map((e) => (
              <div key={e.role} className="bg-white p-10">
                <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Profil</div>
                <h3 className="font-playfair text-2xl mb-3">{e.role}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed mb-6 italic">{e.need}</p>
                <ul className="space-y-2">
                  {e.tips.map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check size={12} className="text-gold mt-0.5 shrink-0" />
                      <span className="font-montserrat text-xs text-black/70">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERVIEW */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-subtitle mb-4 text-gold">Preparation Entretien</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-6">
              Maximisez Vos Chances<br />en Entretien
            </h2>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed mb-6">
              Les 7 premieres secondes d&apos;un entretien sont decisives. Avant que vous
              n&apos;ayez dit un mot, votre tenue a deja communique votre professionnalisme,
              votre motivation et votre culture de l&apos;entreprise.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Tenue calibree selon le secteur et la culture d'entreprise",
                "Couleurs qui inspirent confiance et competence",
                "Accessoires qui renforcent votre message sans le distraire",
                "Conseils coiffure et maquillage professionnels",
                "Simulation complete en conditions reelles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={12} className="text-gold mt-0.5 shrink-0" />
                  <span className="font-montserrat text-xs text-[#C8B8A6]">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-gold">
              Preparer Mon Entretien
            </Link>
          </div>
          <div className="border border-gold/20 p-10">
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Conseils Entretien par Secteur</div>
            <div className="space-y-4">
              {[
                { sector: "Finance & Banque", code: "Tres formel. Costume sombre, chemise/chemisier blanc, accessoires discrets." },
                { sector: "Startups & Tech", code: "Business casual intelligent. Smart casual avec une touche de personnalite." },
                { sector: "Luxe & Mode", code: "Image soignee avec une touche distinctive. Montrer sa culture mode." },
                { sector: "Conseil & Juridique", code: "Autorite et serieux. Couleurs institutionnelles, coupes impeccables." },
                { sector: "Marketing & Communication", code: "Creatif mais professionnel. Une piece distinctive dans un ensemble code." },
              ].map((s) => (
                <div key={s.sector} className="border-b border-gold/10 pb-4">
                  <div className="font-playfair text-sm text-[#FCFAF7] mb-1">{s.sector}</div>
                  <div className="font-montserrat text-xs text-[#C8B8A6]">{s.code}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LINKEDIN */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-subtitle mb-4">Personal Branding Digital</p>
            <h2 className="section-title mb-6">Votre Image sur LinkedIn & Reseaux</h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mt-8 mb-6">
              Votre profil LinkedIn est votre vitrine professionnelle 24/7. Une photo de qualite
              avec une tenue appropriee peut multiplier par 10 les consultations de votre profil.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { title: "Shooting Profil", desc: "Conseils styling complets pour votre seance photo LinkedIn et professionnelle." },
                { title: "Coherence de Marque", desc: "Alignement entre votre image physique, digitale et vos messages professionnels." },
                { title: "Personal Branding", desc: "Construire une image de marque personnelle reconnaissable et percutante." },
              ].map((item) => (
                <div key={item.title} className="bg-white p-6 text-left">
                  <div className="w-6 h-px bg-gold mb-4" />
                  <h3 className="font-playfair text-base mb-2">{item.title}</h3>
                  <p className="font-montserrat text-xs text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">Faites de Votre Image un Levier</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Investissez dans votre image professionnelle. Le retour sur investissement est immediat
            et durable — en opportunites, en confiance et en reconnaissance.
          </p>
          <Link href="/contact" className="btn-primary">
            Prendre Rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}
