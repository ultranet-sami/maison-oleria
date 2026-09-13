import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Occasions & Evenements",
  description: "Maison Oleria vous accompagne pour tous les evenements de votre vie : mariage, soiree chic, gala, business, celebrations et evenements VIP.",
};

const occasions = [
  {
    id: "mariage",
    emoji: "💍",
    title: "Mariage",
    subtitle: "Le plus beau jour — pour toute la famille",
    description:
      "Chaque role merite son eclat. Que vous soyez la mariee, un temoin, un invite ou la famille, Maison Oleria orchestre une harmonie visuelle parfaite pour que chaque photo soit inoubliable.",
    profiles: ["La Mariee", "Le Marie", "Temoins & Demoiselles d'honneur", "Mere de la mariee", "Invites & Famille", "Mariage a destination"],
    dresscode: "De la robe de mariee sur mesure au style invitee irreprochable — nous guidons chaque detail.",
    color: "from-[#C6A46A]/20 to-transparent",
    href: "/wedding-styling",
  },
  {
    id: "soiree",
    emoji: "✨",
    title: "Soiree & Diner Chic",
    subtitle: "Briller en toutes circonstances",
    description:
      "Restaurants etoiles, rooftops, clubs prives, soirees exclusives — chaque lieu a son code vestimentaire. Nous vous habillons pour etre la personne la plus memorable dans la salle.",
    profiles: ["Soiree privee", "Restaurant haut de gamme", "Rooftop & bar de luxe", "Club & soiree", "Cocktail d'inauguration"],
    dresscode: "Smart casual elegant a formal chic — nous decryptons le code vestimentaire de chaque occasion.",
    color: "from-[#1F1F1F]/10 to-transparent",
    href: "/contact",
  },
  {
    id: "gala",
    emoji: "🎭",
    title: "Gala & Black Tie",
    subtitle: "L'excellence du grand soir",
    description:
      "Soirees de gala, galas de charite, remises de prix, evenements de prestige — le Black Tie et le White Tie sont des codes exigeants. Nous vous guidons vers la perfection absolue.",
    profiles: ["Gala de charite", "Remise de prix", "Ceremonie officielle", "Soiree prestige", "Opera & Theatre"],
    dresscode: "Black Tie, White Tie, Creative Black Tie — maitrise totale des codes de grand soir.",
    color: "from-[#1F1F1F]/20 to-transparent",
    href: "/contact",
  },
  {
    id: "business",
    emoji: "💼",
    title: "Business & Carriere",
    subtitle: "Votre image, votre premier atout",
    description:
      "Dans le monde professionnel, votre apparence communique avant vos mots. Entretiens, presentations clients, networking, conferences — nous vous habillons pour reussir.",
    profiles: ["Entretien d'embauche", "Rendez-vous client important", "Networking & Conference", "Diner d'affaires", "Prise de parole publique", "Photo LinkedIn & profil"],
    dresscode: "Du business formal au smart casual, adapte a votre secteur et vos objectifs.",
    color: "from-[#C8B8A6]/30 to-transparent",
    href: "/professional-image",
  },
  {
    id: "celebrations",
    emoji: "🥂",
    title: "Grandes Celebrations",
    subtitle: "Chaque moment merite le sublime",
    description:
      "Anniversaires marquants, remises de diplomes, fiancailles, baptemes, bar-mitzvahs — chaque grande etape de la vie merite une tenue qui capture l'essence du moment.",
    profiles: ["Anniversaire prestige (30, 40, 50 ans...)", "Remise de diplome", "Fiancailles", "Bapteme & Communion", "Bar-Mitzva", "Reunion de famille officielle"],
    dresscode: "Festif et elegant, entre emotion et celebration — nous capturons le bon equilibre.",
    color: "from-[#C6A46A]/15 to-transparent",
    href: "/contact",
  },
  {
    id: "vip",
    emoji: "👑",
    title: "Luxe & VIP",
    subtitle: "L'art de s'habiller pour l'exception",
    description:
      "Fashion Week, palaces, yachts, salons automobiles, ventes aux encheres, soirees privees de haute societe — ces univers ont leurs propres codes. Nous vous y introduisons avec perfection.",
    profiles: ["Fashion Week Paris", "Sejour palace (5 etoiles)", "Yacht & croisiere de luxe", "Vente aux encheres Sotheby's/Christie's", "Soiree privee haute societe", "Evenement automobile prestige"],
    dresscode: "Ultra-prestige, editorial, statement — pour ceux qui savent que le style est un langage de pouvoir.",
    color: "from-[#C6A46A]/30 to-transparent",
    href: "/contact",
  },
];

const stats = [
  { num: "500+", label: "Clients accompagnes" },
  { num: "6", label: "Categories d'occasions" },
  { num: "98%", label: "Clients ravis" },
  { num: "12", label: "Mois par an a vos cotes" },
];

export default function EvenementsPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #C6A46A 0, #C6A46A 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4 text-gold">Occasions & Evenements</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-[#FCFAF7] mb-6 max-w-3xl leading-tight">
            Nous Vous Accompagnons pour<br />
            <em className="text-gold">Tous les Moments de Votre Vie</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-[#C8B8A6] max-w-xl leading-relaxed mb-10">
            Des mariages aux soirees VIP, des entretiens d&apos;embauche aux galas de prestige —
            Maison Oleria vous prepare pour briller dans chaque occasion, avec un style
            parfaitement adapte au moment et a vos ambitions.
          </p>
          <Link href="/reserver" className="btn-gold">
            Reserver Ma Consultation
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-gold">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-playfair text-4xl text-black mb-1">{s.num}</div>
              <div className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-black/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-4">Nos Specialites</p>
            <h2 className="section-title mb-4">
              Chaque Occasion a son<br />
              <em className="text-gold">Code Vestimentaire</em>
            </h2>
            <span className="gold-divider" />
            <p className="font-montserrat text-sm text-black/60 max-w-xl mx-auto mt-6">
              Maitrisez l&apos;art de vous habiller pour chaque moment de votre vie.
              Nous decrypteons et appliquons pour vous les codes de chaque univers.
            </p>
          </div>

          <div className="space-y-2">
            {occasions.map((occ, i) => (
              <div
                key={occ.id}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-0 ${i % 2 === 0 ? "bg-ivory" : "bg-white"}`}
              >
                {/* Left: Title */}
                <div className={`p-10 flex flex-col justify-center border-r border-taupe/10 bg-gradient-to-br ${occ.color}`}>
                  <div className="text-4xl mb-4">{occ.emoji}</div>
                  <h3 className="font-playfair text-3xl mb-2">{occ.title}</h3>
                  <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold mb-4">{occ.subtitle}</p>
                  <Link
                    href={occ.href}
                    className="inline-flex items-center gap-2 font-montserrat text-[10px] tracking-[0.2em] uppercase text-black hover:text-gold transition-colors duration-300 mt-2"
                  >
                    En savoir plus →
                  </Link>
                </div>

                {/* Middle: Description */}
                <div className="p-10 border-r border-taupe/10">
                  <p className="font-montserrat text-sm text-black/70 leading-relaxed mb-6">
                    {occ.description}
                  </p>
                  <div className="border-l-2 border-gold pl-4">
                    <p className="font-montserrat text-xs text-black/60 italic leading-relaxed">
                      {occ.dresscode}
                    </p>
                  </div>
                </div>

                {/* Right: Profiles */}
                <div className="p-10">
                  <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
                    Profils accompagnes
                  </div>
                  <ul className="space-y-2">
                    {occ.profiles.map((profile) => (
                      <li key={profile} className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                        <span className="font-montserrat text-xs text-black/70">{profile}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALENDAR SECTION */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-subtitle mb-4 text-gold">Notre Agenda</p>
          <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-6">
            Planifiez a l&apos;Avance,<br />
            <em className="text-gold">Rayonnez le Jour J</em>
          </h2>
          <span className="gold-divider" />
          <p className="font-montserrat text-sm text-[#C8B8A6] mt-8 mb-10 max-w-xl mx-auto leading-relaxed">
            Les grandes occasions se preparent. Plus vous anticipez, plus la transformation
            sera profonde et memorisable. Nous recommandons de nous contacter :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { delai: "6 mois avant", occasion: "Mariage & Gala", desc: "Pour un accompagnement complet de A a Z" },
              { delai: "2-4 semaines", occasion: "Business & Soiree", desc: "Pour un coaching intensif et efficace" },
              { delai: "En urgence", occasion: "Tout evenement", desc: "Nous nous adaptons a vos contraintes" },
            ].map((item) => (
              <div key={item.delai} className="border border-gold/20 p-8 hover:border-gold transition-colors duration-300">
                <div className="font-playfair text-xl text-gold mb-2">{item.delai}</div>
                <div className="font-montserrat text-xs tracking-[0.2em] uppercase text-[#FCFAF7] mb-3">{item.occasion}</div>
                <p className="font-montserrat text-xs text-[#C8B8A6]">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/reserver" className="btn-gold">
            Commencer Ma Preparation
          </Link>
        </div>
      </section>

      {/* TESTIMONIAL MARIAGE */}
      <section className="py-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-playfair text-6xl text-gold/20 mb-6">&ldquo;</div>
          <p className="font-playfair text-2xl italic text-black leading-relaxed mb-8">
            Maison Oleria a transforme mon mariage en un tableau vivant. Chaque membre
            du cortege etait parfaitement coordonne. Les photos sont absolument
            somptueuses. Un investissement qui durera toute une vie.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <div className="font-playfair text-base">Amelia G.</div>
          <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold">
            Mariee — Paris
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gold">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl text-black mb-6">
            Votre Prochain Evenement Approche ?
          </h2>
          <p className="font-montserrat text-sm text-black/70 mb-10 max-w-xl mx-auto">
            Ne laissez pas le hasard decider de votre image ce jour-la. Contactez-nous
            aujourd&apos;hui et construisons ensemble la tenue qui vous rendra inoubliable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/reserver" className="btn-primary">
              Reserver Ma Consultation
            </Link>
            <Link href="/contact" className="btn-outline">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
