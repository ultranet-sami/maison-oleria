import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Analyse Colorimetrique",
  description: "Decouvrez votre palette de couleurs personnelle avec notre analyse colorimetrique par saisons. Sublimez votre teint et votre apparence avec les couleurs qui vous correspondent.",
};

const seasons = [
  {
    name: "Printemps",
    sub: "Chaud & Clair",
    colors: ["#E8B87D", "#F4C87A", "#E07A5F", "#9E6240", "#C8A882"],
    desc: "Teinte chaude et lumineuse. Palette de couleurs vives, claires et chaudes — corail, peche, dore, vert tendre.",
    traits: "Teint dore ou peche, yeux clairs ou noisette, cheveux blonds ou chatains dores.",
  },
  {
    name: "Ete",
    sub: "Froid & Doux",
    colors: ["#C4B7CB", "#A8BACA", "#D4A5A5", "#8B9BB4", "#C9C0D3"],
    desc: "Teinte fraiche et douce. Palette de couleurs pastels, poudrees et froides — lavande, rose pousse, bleu brume.",
    traits: "Teint rose ou beige froid, yeux bleus ou gris, cheveux cendres ou cendrés.",
  },
  {
    name: "Automne",
    sub: "Chaud & Profond",
    colors: ["#8B4513", "#CD853F", "#A0522D", "#D2691E", "#6B3A2A"],
    desc: "Teinte chaude et profonde. Palette de couleurs riches et terreuses — rouille, ocre, olive, brun chocolat.",
    traits: "Teint dore ou ivoire chaud, yeux ambre ou verts, cheveux roux ou chatains fonces.",
  },
  {
    name: "Hiver",
    sub: "Froid & Contraste",
    colors: ["#1F1F1F", "#2C3E50", "#8B0000", "#1A1A2E", "#C0C0C0"],
    desc: "Teinte froide et contrastee. Palette de couleurs pures et intenses — noir, blanc pur, rouge vif, marine profond.",
    traits: "Teint clair ou fonce tres contraste, yeux sombres ou clairs perçants, cheveux noirs ou tres fonces.",
  },
];

const benefits = [
  { title: "Teint Lumineux", desc: "Les bonnes couleurs illuminent naturellement votre visage et effacent les cernes." },
  { title: "Harmonie Totale", desc: "Vos tenues, votre maquillage et vos accessoires en parfaite coherence." },
  { title: "Achats Rentables", desc: "Plus jamais de pieces qui ne s'assemblent pas. Chaque achat est juste." },
  { title: "Gain de Temps", desc: "Votre garde-robe devient simple et rapide a coordonner chaque matin." },
  { title: "Confiance Renforcee", desc: "Porter les bonnes couleurs amplifie votre presence et votre magnetisme." },
  { title: "Style Durable", desc: "Les couleurs de votre palette ne se demodent jamais car elles sont les votres." },
];

const process = [
  { step: "01", title: "Preparation", desc: "Arrivez sans maquillage, cheveux naturels. Vetements neutres recommandes." },
  { step: "02", title: "Drape de Couleurs", desc: "Application systematique de 80 echantillons de couleurs draipes pres du visage." },
  { step: "03", title: "Analyse", desc: "Observation rigoureuse de l'effet de chaque couleur sur votre teint, vos yeux et votre visage." },
  { step: "04", title: "Revelation", desc: "Identification de votre saison et de vos sous-tonalites specifiques." },
  { step: "05", title: "Votre Palette", desc: "Remise de votre palette personnelle de 40 couleurs avec guide d'utilisation complet." },
];

export default function ColorAnalysisPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4">Analyse Colorimetrique</p>
          <h1 className="section-title max-w-2xl mb-6">
            Decouvrez les Couleurs<br />
            <em className="text-gold">Qui Vous Subliment</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-black/60 max-w-xl leading-relaxed mb-8">
            L&apos;analyse colorimetrique est la base de tout conseil en image reussi. Elle identifie
            les couleurs qui harmonisent avec votre teint naturel pour un effet lumineux et sublime.
          </p>
          <Link href="/contact" className="btn-primary">
            Reserver Mon Analyse
          </Link>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-subtitle mb-4">La Science des Couleurs</p>
            <h2 className="section-title mb-6">Qu&apos;est-ce que l&apos;Analyse Colorimetrique ?</h2>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              L&apos;analyse colorimetrique est une methode scientifique qui determine les couleurs
              les plus harmonieuses pour votre carnation naturelle. Basee sur la theorie des
              saisons (Printemps, Ete, Automne, Hiver), elle identifie vos sous-tonalites
              de teint, la profondeur de votre coloration et votre niveau de contraste naturel.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              En portant vos couleurs, votre teint apparait plus lumineux, vos traits sont adoucis,
              vos yeux brillent davantage. A l&apos;inverse, les mauvaises couleurs peuvent ternir
              votre teint, accentuer les imperfections et vieillir votre apparence.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed">
              C&apos;est la base indispensable d&apos;un style reussi : toutes les autres decisions
              stylistiques seront guidees par votre palette colorimetrique personnelle.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-ivory p-8 text-center">
              <div className="font-playfair text-5xl text-gold mb-2">12</div>
              <div className="font-montserrat text-[10px] tracking-widest uppercase text-black/50">Saisons Colorimetriques</div>
            </div>
            <div className="bg-ivory p-8 text-center">
              <div className="font-playfair text-5xl text-gold mb-2">40</div>
              <div className="font-montserrat text-[10px] tracking-widest uppercase text-black/50">Couleurs dans Votre Palette</div>
            </div>
            <div className="bg-ivory p-8 text-center">
              <div className="font-playfair text-5xl text-gold mb-2">80+</div>
              <div className="font-montserrat text-[10px] tracking-widest uppercase text-black/50">Echantillons Testes</div>
            </div>
            <div className="bg-ivory p-8 text-center">
              <div className="font-playfair text-5xl text-gold mb-2">3-4h</div>
              <div className="font-montserrat text-[10px] tracking-widest uppercase text-black/50">Duree de la Seance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 SEASONS */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4 text-gold">Les 4 Saisons Colorimetriques</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-4">Quelle est Votre Saison ?</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((s) => (
              <div key={s.name} className="border border-gold/20 p-8 hover:border-gold transition-colors duration-300">
                <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-1">{s.sub}</div>
                <h3 className="font-playfair text-2xl text-[#FCFAF7] mb-4">{s.name}</h3>
                <div className="flex gap-2 mb-4">
                  {s.colors.map((c) => (
                    <div key={c} className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="font-montserrat text-xs text-[#C8B8A6] leading-relaxed mb-4">{s.desc}</p>
                <p className="font-montserrat text-[10px] text-[#C8B8A6]/60 leading-relaxed italic">{s.traits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNDERTONES */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Comprendre Votre Teint</p>
            <h2 className="section-title mb-4">Les Sous-Tonalites de Peau</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Sous-Tonalite Chaude", color: "#E8B87D", desc: "Reflets dores, peches ou cuivres dans la peau. Veines apparemment vertes. S&apos;illumine au soleil. Harmonie avec les couleurs chaudes : or, rouille, olive, corail." },
              { title: "Sous-Tonalite Froide", color: "#C4B7CB", desc: "Reflets roses, bleus ou violaces dans la peau. Veines apparemment bleues ou violettes. Harmonie avec les couleurs froides : argent, marine, lavande, rose vif." },
              { title: "Sous-Tonalite Neutre", color: "#C8B8A6", desc: "Mix de reflets chauds et froids. Veines bleu-vert. Grande versatilite colorimetrique. Peut porter une large gamme de couleurs chaudes et froides." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8">
                <div className="w-12 h-12 rounded-full mb-4 border border-taupe/20" style={{ backgroundColor: item.color }} />
                <h3 className="font-playfair text-xl mb-4">{item.title}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLOR PSYCHOLOGY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-subtitle mb-4">Psychologie des Couleurs</p>
              <h2 className="section-title mb-4">Les Couleurs Parlent pour Vous</h2>
              <span className="gold-divider" />
            </div>
            <div className="space-y-6">
              {[
                { color: "#1F1F1F", name: "Noir", msg: "Autorite, elegance, mystere. La couleur du pouvoir et du raffinement." },
                { color: "#FCFAF7", name: "Blanc Casse", msg: "Purete, simplicite, sophistication. L&apos;elegance parisienne par excellence." },
                { color: "#C6A46A", name: "Or & Dore", msg: "Succes, chaleur, prestige. Evoque l&apos;opulence et la confiance." },
                { color: "#2C3E50", name: "Marine Profond", msg: "Credibilite, fiabilite, intelligence. La couleur de confiance profesionnelle." },
                { color: "#8B0000", name: "Rouge Bordeaux", msg: "Passion, determination, leadership. Une presence forte et memorisable." },
                { color: "#C4B7CB", name: "Lavande Douce", msg: "Creativite, intuition, raffinement. La couleur de la feminite sophistiquee." },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-6 p-4 border border-taupe/20 hover:border-gold transition-colors duration-300">
                  <div className="w-8 h-8 shrink-0 border border-taupe/20" style={{ backgroundColor: c.color }} />
                  <div>
                    <div className="font-playfair text-base mb-1">{c.name}</div>
                    <p className="font-montserrat text-xs text-black/60">{c.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Notre Methode</p>
            <h2 className="section-title mb-4">Le Deroulement de la Seance</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((p) => (
              <div key={p.step} className="text-center">
                <div className="font-playfair text-4xl text-gold/30 mb-3">{p.step}</div>
                <div className="w-8 h-px bg-gold mx-auto mb-4" />
                <h3 className="font-playfair text-base mb-2">{p.title}</h3>
                <p className="font-montserrat text-xs text-black/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4 text-gold">Ce que vous Gagnez</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-4">Les Benefices de l&apos;Analyse Colorimetrique</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="border border-gold/20 p-8 hover:border-gold transition-colors duration-300">
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-playfair text-lg text-[#FCFAF7] mb-3">{b.title}</h3>
                <p className="font-montserrat text-xs text-[#C8B8A6] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">Decouvrez Vos Couleurs</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Reservez votre seance d&apos;analyse colorimetrique et repartez avec votre palette
            personnelle de 40 couleurs.
          </p>
          <Link href="/contact" className="btn-primary">
            Reserver Mon Analyse
          </Link>
        </div>
      </section>
    </>
  );
}
