import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Temoignages",
  description: "Decouvrez les temoignages et histoires de transformation de nos clients Maison Oleria. Resultats reels, experiences authentiques.",
};

const testimonials = [
  {
    name: "Sophie M.",
    role: "Directrice Marketing, Paris",
    rating: 5,
    service: "Conseil en Image Complet",
    text: "Maison Oleria a litteralement transforme ma façon de m'habiller et de me presenter. Mon image professionnelle a gagne en impact et en coherence. Je me sens enfin alignee avec qui je suis vraiment. En 3 mois, j'ai obtenu une promotion que j'attendais depuis 2 ans. Coincidence ? Je ne crois pas.",
    result: "Promotion obtenue 3 mois apres la transformation",
  },
  {
    name: "Laurent D.",
    role: "Entrepreneur, Lyon",
    rating: 5,
    service: "Image Professionnelle",
    text: "En tant qu'homme, je n'aurais jamais imagine faire appel a un conseil en image. C'etait la meilleure decision de ma carriere. Mon image est maintenant un atout majeur dans mes negociations. Mes clients me font davantage confiance des le premier rendez-vous. Le ROI est incroyable.",
    result: "Taux de conversion clients augmente de 40%",
  },
  {
    name: "Isabelle R.",
    role: "Avocate, Paris",
    rating: 5,
    service: "Analyse Colorimetrique",
    text: "L'analyse colorimetrique a ete une revelation absolue. Je portais les mauvaises couleurs depuis des annees sans le savoir ! Maintenant je porte les couleurs qui me subliment et je recois des compliments chaque jour. Mes clients me disent que j'ai l'air plus en forme et plus confiante. C'est une vraie transformation.",
    result: "Confiance renforcee, compliments quotidiens",
  },
  {
    name: "Marie-Claire B.",
    role: "Chef d'Entreprise, Bordeaux",
    rating: 5,
    service: "Stylisme Personnel & Shopping",
    text: "J'avais une garde-robe pleine mais je n'avais jamais rien a me mettre ! Apres la session avec Maison Oleria, j'ai realise que 80% de mes vetements etaient les mauvaises couleurs ou les mauvaises coupes pour ma silhouette. Maintenant avec 30% moins de vetements, j'ai 3 fois plus de tenues. Magique.",
    result: "Garde-robe optimisee, 30% moins de pieces pour 3x plus de tenues",
  },
  {
    name: "Thomas V.",
    role: "Cadre Bancaire, Paris",
    rating: 5,
    service: "Image Professionnelle",
    text: "J'avais un entretien pour un poste de direction tres convoite. La preparation avec Maison Oleria a ete decisive. Non seulement ma tenue etait parfaite pour le secteur, mais la confiance que j'avais en moi etait visible. J'ai obtenu le poste. Je recommande sans hesitation.",
    result: "Poste de direction obtenu",
  },
  {
    name: "Amelia G.",
    role: "Mariee, Paris",
    rating: 5,
    service: "Stylisme Mariage Complet",
    text: "Maison Oleria a rendu mon mariage parfait. L'analyse colorimetrique m'a aidee a choisir la teinte de blanc la plus harmonieuse avec mon teint. Le cortege etait visuellement coherent et magnifique. Nos photos de mariage sont a couper le souffle. Un investissement que je ne regretterai jamais.",
    result: "Mariage visuellement parfait, photos inoubliables",
  },
  {
    name: "Nathalie P.",
    role: "DRH, Toulouse",
    rating: 5,
    service: "Conseil en Image & Stylisme",
    text: "A 47 ans, je pensais que le style n'etait plus pour moi. Maison Oleria m'a prouve le contraire. J'ai decouvert que l'elegance n'a pas d'age et que les bonnes couleurs et les bonnes coupes peuvent transformer completement une apparence. Je me sens plus jeune, plus confiante et plus moi-meme.",
    result: "Renaissance stylistique a 47 ans",
  },
  {
    name: "Julien K.",
    role: "Consultant, Paris",
    rating: 5,
    service: "Personal Branding & Image Pro",
    text: "Mon profil LinkedIn avant Maison Oleria etait quelconque. Apres le coaching image et le shooting conseil, mes vues ont multiplie par 8. Les clients me contactent maintenant spontanement. L'image professionnelle est vraiment le premier filtre dans le monde du business.",
    result: "Vues LinkedIn multipliees par 8",
  },
  {
    name: "Caroline F.",
    role: "Reconversion Professionnelle, Paris",
    rating: 5,
    service: "Image Professionnelle & Entretien",
    text: "Je changeais de secteur apres 15 ans. J'avais besoin d'une image qui projette ma nouvelle identite professionnelle tout en restant credible. Maison Oleria a cree une strategie image parfaite pour ma reconversion. J'ai ete recrutee dans mon nouveau secteur du premier coup.",
    result: "Reconversion reussie du premier coup",
  },
];

const beforeAfter = [
  {
    name: "Marie, 38 ans",
    before: "Se sentait invisible en reunion. Portait du noir par defaut. Trouvait que le style n'etait pas pour elle.",
    after: "Porte une palette harmonieuse qui sublimes son teint. Reçoit des compliments reguliers. A ete choisie pour representer son entreprise a l'international.",
    service: "Conseil en Image Complet",
  },
  {
    name: "Pierre, 45 ans",
    before: "Image brouillon malgre des vetements de qualite. Peinait a imposer son autorite en reunion.",
    after: "Image de dirigeant affirme et coherent. Inspire confiance immediatement. Associes l'ecoutent davantage.",
    service: "Image Professionnelle Executive",
  },
  {
    name: "Sophie, 32 ans",
    before: "Shopping compulsif, garde-robe surchargee, sentiment de n'avoir rien a se mettre.",
    after: "Garde-robe capsule de 40 pieces parfaitement coordonnees. Ne fait plus que des achats juste et durables.",
    service: "Stylisme Personnel & Garde-Robe Capsule",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4">Temoignages</p>
          <h1 className="section-title max-w-2xl mb-6">
            Des Transformations<br />
            <em className="text-gold">Qui Parlent d&apos;Elles-Memes</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-black/60 max-w-xl leading-relaxed">
            Plus de 500 clients ont fait confiance a Maison Oleria. Voici leurs histoires,
            leurs transformations et les resultats concrets obtenus.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "500+", label: "Clients Accompagnes" },
            { num: "98%", label: "Taux de Satisfaction" },
            { num: "4.9/5", label: "Note Moyenne" },
            { num: "10+", label: "Annees d'Experience" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-playfair text-4xl text-gold mb-2">{s.num}</div>
              <div className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#C8B8A6]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Ils Nous Font Confiance</p>
            <h2 className="section-title mb-4">Ce Que Disent Nos Clients</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-ivory p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <div className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-gold mb-4">{t.service}</div>
                <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6 italic flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-taupe/20 pt-4">
                  <div className="font-playfair text-base mb-0.5">{t.name}</div>
                  <div className="font-montserrat text-[10px] tracking-widest uppercase text-taupe mb-2">{t.role}</div>
                  <div className="font-montserrat text-[10px] text-gold">{t.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Transformations</p>
            <h2 className="section-title mb-4">Avant & Apres Maison Oleria</h2>
            <span className="gold-divider" />
          </div>
          <div className="space-y-8">
            {beforeAfter.map((item) => (
              <div key={item.name} className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white">
                <div className="p-8 bg-taupe/10 border-r border-taupe/20">
                  <div className="font-playfair text-xl mb-1">{item.name}</div>
                  <div className="font-montserrat text-[9px] tracking-widest uppercase text-gold mb-4">{item.service}</div>
                </div>
                <div className="p-8 border-r border-taupe/20">
                  <div className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-black/40 mb-3">Avant</div>
                  <p className="font-montserrat text-sm text-black/60 leading-relaxed">{item.before}</p>
                </div>
                <div className="p-8 border-l-2 border-gold">
                  <div className="font-montserrat text-[9px] tracking-[0.2em] uppercase text-gold mb-3">Apres</div>
                  <p className="font-montserrat text-sm text-black/70 leading-relaxed font-medium">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">Votre Histoire Commence Ici</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Rejoignez nos 500+ clients transformes et ecrivez votre propre histoire de succes avec Maison Oleria.
          </p>
          <Link href="/contact" className="btn-primary">
            Reserver Ma Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
