import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "A Propos",
  description: "Decouvrez l'histoire, la mission et la philosophie de Maison Oleria, maison de conseil en image inspiree de l'elegance francaise.",
};

const values = [
  { title: "Elegance", desc: "L'elegance intemporelle comme boussole stylistique." },
  { title: "Confiance", desc: "Reveiller la confiance interieure par l'image exterieure." },
  { title: "Authenticite", desc: "Un style qui reflète votre identite veritable." },
  { title: "Sophistication", desc: "Le raffinement dans chaque detail, chaque choix." },
  { title: "Harmonie", desc: "L'accord parfait entre vous et votre apparence." },
  { title: "Excellence", desc: "Un service premium sans compromis sur la qualite." },
];

const credentials = [
  "Certification en Conseil en Image (AICI)",
  "Formation en Analyse Colorimetrique Systemique",
  "Diplome de Stylisme et Creation de Mode",
  "Certification en Coaching Personnel",
  "Formation en Psychologie de l'Image",
  "Membre de l'Association des Professionnels du Conseil en Image",
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4">Notre Histoire</p>
          <h1 className="section-title max-w-2xl mb-6">
            La Maison qui Reveille<br />
            <em className="text-gold">Votre Elegance Interieure</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-black/60 max-w-2xl leading-relaxed">
            Maison Oleria est bien plus qu&apos;une maison de conseil en image. C&apos;est un espace de transformation
            ou chaque individu decouvre la version la plus raffinee de lui-meme.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-subtitle mb-4">Notre Histoire</p>
            <h2 className="section-title mb-6">Nee de la Passion<br />pour l&apos;Elegance Francaise</h2>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              Maison Oleria est nee d&apos;une conviction profonde : l&apos;image que nous projetons au monde
              influence notre confiance, nos relations et nos opportunites. Fondee a Paris, au coeur
              de la capitale mondiale du style, notre maison s&apos;inspire de l&apos;heritage culturel francais
              pour offrir un conseil en image d&apos;exception.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              Notre fondatrice, formee dans les meilleures maisons parisiennes et certifiee
              internationalement, a developpe une methode unique qui allie science des couleurs,
              psychologie du style et art de vivre a la francaise.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed">
              Aujourd&apos;hui, Maison Oleria accompagne une clientele exigeante en France et a
              l&apos;international, avec toujours la meme promesse : vous aider a rayonner avec
              authenticite et elegance.
            </p>
          </div>
          <div className="bg-ivory p-12 border-l-4 border-gold">
            <p className="font-playfair text-2xl italic text-black leading-relaxed mb-6">
              &ldquo;L&apos;elegance n&apos;est pas une question de prix ou de marque. C&apos;est l&apos;art d&apos;etre
              parfaitement soi-meme, dans le respect de son essence et de sa singularite.&rdquo;
            </p>
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold">
              — La Fondatrice de Maison Oleria
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border border-gold/20 p-12">
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Notre Mission</div>
            <h3 className="font-playfair text-3xl text-[#FCFAF7] mb-6">Revelez Votre Meilleure Version</h3>
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed">
              Aider chaque individu a construire une image authentique, elegante et alignee avec
              ses objectifs de vie — personnels et professionnels — a travers un conseil expert,
              personnalise et bienveillant.
            </p>
          </div>
          <div className="border border-gold/20 p-12">
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Notre Vision</div>
            <h3 className="font-playfair text-3xl text-[#FCFAF7] mb-6">L&apos;Excellence du Style pour Tous</h3>
            <p className="font-montserrat text-sm text-[#C8B8A6] leading-relaxed">
              Etre la reference europenne du conseil en image de luxe, reconnue pour notre
              approche holistique, notre expertise scientifique et notre sensibilite artistique
              inspiree de l&apos;heritage francais.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Ce Qui Nous Guide</p>
            <h2 className="section-title mb-4">Nos Valeurs</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-8 border-b-2 border-transparent hover:border-gold transition-all duration-300">
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-playfair text-xl mb-3">{v.title}</h3>
                <p className="font-montserrat text-sm text-black/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-subtitle mb-4">Notre Philosophie</p>
            <h2 className="section-title mb-6">L&apos;Art de Vivre a la Francaise</h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mt-8 mb-6">
              La philosophie de Maison Oleria s&apos;inspire de cette tradition francaise unique : l&apos;art
              de s&apos;habiller avec intentionnalite, de choisir la qualite sur la quantite, et d&apos;exprimer
              sa personnalite avec subtilite et raffinement.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              Nous croyons que le style est un langage silencieux. Bien maitrise, il communique
              votre confiance, votre competence et votre personnalite avant meme que vous ayez
              prononce un mot.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed">
              Notre approche est holistique : nous considerons votre morphologie, votre colorimetrie,
              votre personnalite, votre mode de vie et vos objectifs pour creer une image coherente,
              authentique et magnetique.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="bg-taupe/20 aspect-[4/5] flex items-center justify-center">
            <div className="text-center">
              <div className="font-playfair text-4xl text-gold/40 mb-4">MA</div>
              <div className="font-montserrat text-xs tracking-widest uppercase text-black/30">Photo a venir</div>
            </div>
          </div>
          <div>
            <p className="section-subtitle mb-4">La Fondatrice</p>
            <h2 className="section-title mb-2">Sophie Allure</h2>
            <div className="font-montserrat text-xs tracking-[0.2em] uppercase text-gold mb-6">
              Conseil en Image Certifiee & Styliste Personnelle
            </div>
            <span className="block w-16 h-px bg-gold mb-8" />
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
              Avec plus de 10 ans d&apos;experience dans le conseil en image et le stylisme personnel,
              Sophie a accompagne plus de 500 clients vers une image plus confiante et authentique.
              Sa formation combine psychologie, arts visuels et sciences de la couleur.
            </p>
            <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-8">
              Formee a Paris et certifiee par l&apos;AICI (Association of Image Consultants International),
              elle apporte une expertise rare alliant rigueur scientifique et sensibilite artistique.
            </p>
            <div>
              <h4 className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Certifications & Formations</h4>
              <ul className="space-y-2">
                {credentials.map((c) => (
                  <li key={c} className="flex items-center gap-3">
                    <Check size={12} className="text-gold shrink-0" />
                    <span className="font-montserrat text-xs text-black/70">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4 text-gold">Notre Methodologie</p>
            <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-4">Une Approche Holistique & Personnalisee</h2>
            <span className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Ecoute & Analyse", desc: "Nous commen\u00e7ons par une ecoute profonde de votre histoire, vos besoins et vos aspirations. Chaque client est unique." },
              { title: "Science & Expertise", desc: "Analyse colorimetrique rigoureuse, etude morphologique et evaluation stylistique basees sur des methodes certifiees internationalement." },
              { title: "Transformation Durable", desc: "Nous ne creeons pas un look temporaire. Nous vous donnons les cles pour maintenir et evoluer votre image en toute autonomie." },
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

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">Commen\u00e7ons Votre Transformation</h2>
          <p className="font-montserrat text-sm text-black/70 mb-10">
            Rencontrons-nous pour une consultation initiale et decouvrez comment Maison Oleria peut
            transformer votre image et votre confiance.
          </p>
          <Link href="/contact" className="btn-primary">
            Prendre Rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}
