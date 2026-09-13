import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conseils en image, style personnel, analyse colorimetrique et elegance francaise. Le blog de Maison Oleria pour sublimer votre image au quotidien.",
};

const categories = [
  "Tous les Articles",
  "Conseil en Image",
  "Style Personnel",
  "Analyse Colorimetrique",
  "Image Professionnelle",
  "Style Mariage",
  "Elegance Francaise",
  "Art de Vivre",
];

const articles = [
  {
    slug: "guide-analyse-colorimetrique-debutantes",
    category: "Analyse Colorimetrique",
    title: "Guide Complet de l'Analyse Colorimetrique pour Debutantes",
    excerpt: "Decouvrez tout ce qu'il faut savoir sur l'analyse colorimetrique : les 4 saisons, les sous-tonalites et comment identifier votre palette personnelle.",
    date: "15 Janvier 2026",
    readTime: "8 min",
    featured: true,
  },
  {
    slug: "10-regles-dor-elegance-parisienne",
    category: "Elegance Francaise",
    title: "Les 10 Regles d'Or de l'Elegance Parisienne",
    excerpt: "Qu'est-ce qui rend les Parisiennes si chic ? Nous revelons les secrets de l'elegance a la francaise que vous pouvez appliquer des aujourd'hui.",
    date: "8 Janvier 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "construire-garde-robe-capsule-parfaite",
    category: "Style Personnel",
    title: "Comment Construire une Garde-Robe Capsule Parfaite",
    excerpt: "La methode pas-a-pas pour creer une garde-robe essentielle et versatile avec uniquement des pieces qui vous subliment et se coordonnent parfaitement.",
    date: "2 Janvier 2026",
    readTime: "10 min",
    featured: true,
  },
  {
    slug: "image-professionnelle-premiere-impression",
    category: "Image Professionnelle",
    title: "L'Image Professionnelle : Les 7 Secondes qui Changent Tout",
    excerpt: "La science de la premiere impression et comment optimiser votre image professionnelle pour maximiser votre impact des les premiers instants.",
    date: "28 Decembre 2025",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "erreurs-style-eviter",
    category: "Style Personnel",
    title: "Les 15 Erreurs de Style que Vous Faites Probablement",
    excerpt: "De la mauvaise taille aux couleurs qui ternissent le teint : les erreurs les plus communes et comment les corriger facilement.",
    date: "20 Decembre 2025",
    readTime: "9 min",
    featured: false,
  },
  {
    slug: "choisir-couleur-entretien",
    category: "Image Professionnelle",
    title: "Quelle Couleur Porter en Entretien d'Embauche ?",
    excerpt: "La psychologie des couleurs appliquee a l'entretien professionnel. Ce que chaque couleur communique et comment choisir la teinte ideale.",
    date: "15 Decembre 2025",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "morphologie-feminine-guide-complet",
    category: "Conseil en Image",
    title: "Guide Complet des Morphologies Feminines",
    excerpt: "Identifiez votre morphologie et decouvrez les coupes, les silhouettes et les pieces qui valorisent parfaitement votre silhouette.",
    date: "10 Decembre 2025",
    readTime: "12 min",
    featured: false,
  },
  {
    slug: "tendances-mariage-2026",
    category: "Style Mariage",
    title: "Les Tendances Mariage 2026 : Ce que Nous Aimons (et Moins)",
    excerpt: "Notre analyse des tendances de la saison des mariages 2026 et comment les adapter intelligemment a votre style personnel.",
    date: "5 Decembre 2025",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "investir-qualite-vs-quantite",
    category: "Art de Vivre",
    title: "Investir dans la Qualite : Pourquoi Moins c'est Toujours Plus",
    excerpt: "La philosophie du mieux contre davantage appliquee a la mode : comment investir intelligemment dans des pieces durables et rentables.",
    date: "1 Decembre 2025",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "maquillage-harmonie-colorimetrique",
    category: "Analyse Colorimetrique",
    title: "Maquillage & Colorimetrie : Choisir les Bonnes Teintes",
    excerpt: "Comment appliquer votre palette colorimetrique a votre maquillage pour un resultat parfaitement harmonieux avec votre teint naturel.",
    date: "25 Novembre 2025",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "linkedin-photo-professionnelle",
    category: "Image Professionnelle",
    title: "Photo LinkedIn : Le Guide pour une Image Professionnelle Parfaite",
    excerpt: "Votre photo LinkedIn est votre premiere impression digitale. Nos conseils experts pour une photo qui attire clients et recruteurs.",
    date: "20 Novembre 2025",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "art-de-vivre-francais-style",
    category: "Elegance Francaise",
    title: "L'Art de Vivre Francais et Son Influence sur le Style",
    excerpt: "Pourquoi le style francais est universellement admire et comment incorporer cet art de vivre dans votre quotidien, ou que vous soyez.",
    date: "15 Novembre 2025",
    readTime: "9 min",
    featured: false,
  },
  {
    slug: "reconversion-image-professionnelle",
    category: "Image Professionnelle",
    title: "Reconversion Professionnelle : Construire une Nouvelle Image",
    excerpt: "Comment adapter votre image pour une reconversion reussie. Les cles pour projeter votre nouvelle identite professionnelle avec credibilite.",
    date: "10 Novembre 2025",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "homme-conseil-image",
    category: "Conseil en Image",
    title: "Conseil en Image pour Hommes : Le Guide Complet",
    excerpt: "Le conseil en image n'est pas reserve aux femmes. Guide complet pour les hommes qui souhaitent ameliorer leur style et leur presence.",
    date: "5 Novembre 2025",
    readTime: "10 min",
    featured: false,
  },
  {
    slug: "budget-mode-intelligent",
    category: "Art de Vivre",
    title: "Budget Mode Intelligent : Depenser Moins, S'Habiller Mieux",
    excerpt: "Nos strategies pour optimiser votre budget mode sans sacrifier la qualite ou le style. L'art de l'investissement vestimentaire rentable.",
    date: "1 Novembre 2025",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "accessoires-transformer-tenue",
    category: "Style Personnel",
    title: "Comment les Accessoires Transforment une Tenue Simple en Look Elegant",
    excerpt: "L'art d'accessoiriser avec intention. Les pieces cles qui elevent instantanement n'importe quelle tenue basique.",
    date: "25 Octobre 2025",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "printemps-saison-colorimetrique",
    category: "Analyse Colorimetrique",
    title: "La Saison Printemps : Tout Savoir sur Cette Colorimetrie",
    excerpt: "Profil complet de la saison Printemps : traits caracteristiques, palette de couleurs ideale, couleurs a eviter et conseils mode.",
    date: "20 Octobre 2025",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "capsule-voyage-style",
    category: "Art de Vivre",
    title: "La Valise Parfaite : Voyager avec Style sans se Surcharger",
    excerpt: "Nos secrets pour preparer une valise capsule elegante et versatile quelle que soit votre destination.",
    date: "15 Octobre 2025",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "mariage-tenue-invitee",
    category: "Style Mariage",
    title: "Comment S'Habiller en Tant qu'Invitee : Les Regles Essentielles",
    excerpt: "Tout ce qu'il faut savoir et eviter pour etre elegant en tant qu'invitee a un mariage. Nos conseils par type de ceremonie.",
    date: "10 Octobre 2025",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "confiance-image-psychologie",
    category: "Conseil en Image",
    title: "Psychologie de l'Image : Comment Votre Style Influence Votre Confiance",
    excerpt: "La science derriere l'effet d'habit et l'enaction du vetement. Comment ce que vous portez change litteralement qui vous etes.",
    date: "5 Octobre 2025",
    readTime: "9 min",
    featured: false,
  },
];

const featuredArticles = articles.filter((a) => a.featured);
const regularArticles = articles.filter((a) => !a.featured);

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-4 text-gold">Le Blog Maison Oleria</p>
          <h1 className="font-playfair text-5xl md:text-6xl text-[#FCFAF7] mb-6 max-w-2xl">
            Conseils Style &<br />
            <em className="text-gold">Elegance au Quotidien</em>
          </h1>
          <span className="block w-16 h-px bg-gold mb-8" />
          <p className="font-montserrat text-sm text-[#C8B8A6] max-w-xl leading-relaxed">
            Conseils d&apos;experts, inspirations parisiennes et guides pratiques pour
            sublimer votre image jour apres jour.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-8 bg-ivory border-b border-taupe/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`font-montserrat text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-4 py-2 transition-all duration-200 ${
                  cat === "Tous les Articles"
                    ? "bg-black text-[#FCFAF7]"
                    : "border border-taupe/40 text-black hover:border-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-8">A La Une</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((a) => (
              <div key={a.slug} className="group cursor-pointer">
                <div className="bg-ivory aspect-[16/9] mb-6 flex items-center justify-center border border-taupe/10 group-hover:border-gold transition-colors duration-300">
                  <div className="font-playfair text-4xl text-gold/20">MA</div>
                </div>
                <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">{a.category}</div>
                <h2 className="font-playfair text-xl mb-3 group-hover:text-gold transition-colors duration-300 leading-snug">{a.title}</h2>
                <p className="font-montserrat text-xs text-black/60 leading-relaxed mb-4">{a.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="font-montserrat text-[10px] text-black/40">{a.date} · {a.readTime} de lecture</div>
                  <span className="inline-flex items-center gap-1 font-montserrat text-[10px] tracking-[0.2em] uppercase text-gold group-hover:gap-3 transition-all duration-300">
                    Lire <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL ARTICLES */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-subtitle mb-8">Tous les Articles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularArticles.map((a) => (
              <div key={a.slug} className="bg-white p-8 flex gap-6 group cursor-pointer hover:shadow-sm transition-shadow duration-300">
                <div className="bg-ivory w-20 h-20 shrink-0 flex items-center justify-center border border-taupe/10">
                  <div className="font-playfair text-xl text-gold/30">MA</div>
                </div>
                <div className="flex-1">
                  <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-1">{a.category}</div>
                  <h3 className="font-playfair text-base mb-2 group-hover:text-gold transition-colors duration-300 leading-snug">{a.title}</h3>
                  <p className="font-montserrat text-xs text-black/60 leading-relaxed mb-3">{a.excerpt.substring(0, 80)}...</p>
                  <div className="font-montserrat text-[9px] text-black/40">{a.date} · {a.readTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 bg-black">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="section-subtitle mb-4 text-gold">Newsletter</p>
          <h2 className="font-playfair text-4xl text-[#FCFAF7] mb-4">
            Conseils Style Directs dans Votre Boite Mail
          </h2>
          <span className="gold-divider" />
          <p className="font-montserrat text-sm text-[#C8B8A6] mt-8 mb-8 leading-relaxed">
            Recevez chaque semaine nos conseils d&apos;experts, inspirations et guides
            exclusifs pour sublimer votre image. 100% gratuit, 0% spam.
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-transparent border border-gold/30 px-4 py-3 font-montserrat text-sm text-[#FCFAF7] placeholder-[#C8B8A6]/50 focus:border-gold focus:outline-none"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              S&apos;abonner
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
