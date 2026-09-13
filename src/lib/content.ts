/**
 * CMS-Agnostic Content Layer — Maison Oleria
 * -------------------------------------------
 * Switch CMS by updating only this file.
 * Configure Storyblok: add STORYBLOK_API_TOKEN in Vercel env vars.
 */

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
  video_url?: string;
  image_url?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  service?: string;
  result?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  image_url?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  hours: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface SiteContent {
  hero: HeroContent;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  blog_posts: BlogPost[];
  contact: ContactInfo;
}

export const defaultContent: SiteContent = {
  hero: {
    title: "L'Art de Reveler Votre Elegance Naturelle",
    subtitle: "Maison de Conseil en Image",
    description:
      "Inspiree de l'elegance francaise intemporelle, Maison Oleria vous accompagne dans la revelation de votre style unique.",
    cta_primary: "Prendre Rendez-vous",
    cta_secondary: "Decouvrir Nos Services",
    video_url: "/hero.mp4",
    image_url: "/hero-poster.jpg",
  },
  services: [
    {
      id: "color-analysis",
      title: "Analyse Colorimetrique",
      description: "Decouvrez la palette de couleurs qui sublime votre teint et votre personnalite.",
      href: "/color-analysis",
    },
    {
      id: "personal-styling",
      title: "Stylisme Personnel",
      description: "Construisez un style authentique et elegant en harmonie avec qui vous etes.",
      href: "/personal-styling",
    },
    {
      id: "professional-image",
      title: "Image Professionnelle",
      description: "Affirmez votre leadership avec une image forte et une presence executive.",
      href: "/professional-image",
    },
    {
      id: "wedding-styling",
      title: "Stylisme Mariage",
      description: "Vivez le plus beau jour de votre vie avec un style parfaitement orchestre.",
      href: "/wedding-styling",
    },
    {
      id: "shopping",
      title: "Shopping Accompagne",
      description: "Des selections personnalisees pour une garde-robe qui vous ressemble.",
      href: "/services",
    },
    {
      id: "capsule",
      title: "Garde-Robe Capsule",
      description: "Une garde-robe essentielle, coherente et eternellement chic.",
      href: "/services",
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "Sophie M.",
      role: "Directrice Marketing",
      text: "Maison Oleria a litteralement transforme ma facon de me presenter. Je me sens enfin alignee avec qui je suis vraiment.",
      rating: 5,
      service: "Conseil en Image",
    },
    {
      id: "2",
      name: "Laurent D.",
      role: "Entrepreneur",
      text: "La meilleure decision de ma carriere. Mon image est maintenant un atout majeur dans mes negociations.",
      rating: 5,
      service: "Image Professionnelle",
    },
    {
      id: "3",
      name: "Isabelle R.",
      role: "Avocate",
      text: "L'analyse colorimetrique a ete une revelation. Je porte maintenant les couleurs qui me subliment chaque jour.",
      rating: 5,
      service: "Analyse Colorimetrique",
    },
  ],
  blog_posts: [
    {
      id: "1",
      slug: "guide-analyse-colorimetrique",
      title: "Guide Complet de l'Analyse Colorimetrique",
      excerpt: "Decouvrez tout ce qu'il faut savoir sur l'analyse colorimetrique : les 4 saisons et comment identifier votre palette.",
      category: "Analyse Colorimetrique",
      date: "15 Janvier 2026",
      readTime: "8 min",
      featured: true,
    },
    {
      id: "2",
      slug: "elegance-parisienne",
      title: "Les 10 Regles d'Or de l'Elegance Parisienne",
      excerpt: "Qu'est-ce qui rend les Parisiennes si chic ? Les secrets de l'elegance a la francaise.",
      category: "Elegance Francaise",
      date: "8 Janvier 2026",
      readTime: "6 min",
      featured: true,
    },
  ],
  contact: {
    phone: "+33 6 00 00 00 00",
    email: "info.oleria@maison-oleria.com",
    address: "Paris",
    city: "France",
    hours: "Lundi - Samedi : 9h - 19h",
    instagram: "https://instagram.com/maison.oleria",
    facebook: "https://facebook.com/maisonoleria",
    linkedin: "https://linkedin.com/company/maison-oleria",
  },
};

async function fetchFromStoryblok(slug: string) {
  const token = process.env.STORYBLOK_API_TOKEN;
  const version = process.env.STORYBLOK_VERSION || "published";
  if (!token) return null;
  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${token}&version=${version}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.story?.content || null;
  } catch {
    return null;
  }
}

export async function getHeroContent(): Promise<HeroContent> {
  const sb = await fetchFromStoryblok("home/hero");
  if (sb) {
    return {
      title: sb.title || defaultContent.hero.title,
      subtitle: sb.subtitle || defaultContent.hero.subtitle,
      description: sb.description || defaultContent.hero.description,
      cta_primary: sb.cta_primary || defaultContent.hero.cta_primary,
      cta_secondary: sb.cta_secondary || defaultContent.hero.cta_secondary,
      video_url: sb.video?.filename || defaultContent.hero.video_url,
      image_url: sb.image?.filename || defaultContent.hero.image_url,
    };
  }
  return defaultContent.hero;
}

export async function getServices(): Promise<ServiceItem[]> {
  const sb = await fetchFromStoryblok("home/services");
  if (sb?.items?.length) {
    return sb.items.map((item: Record<string, string>) => ({
      id: item._uid || item.id,
      title: item.title,
      description: item.description,
      href: item.href || "/services",
    }));
  }
  return defaultContent.services;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const sb = await fetchFromStoryblok("home/testimonials");
  if (sb?.items?.length) {
    return sb.items.map((item: Record<string, string | number>) => ({
      id: item._uid as string || item.id as string,
      name: item.name as string,
      role: item.role as string,
      text: item.text as string,
      rating: item.rating as number || 5,
      service: item.service as string,
      result: item.result as string,
    }));
  }
  return defaultContent.testimonials;
}

export async function getBlogPosts(featured?: boolean): Promise<BlogPost[]> {
  const sb = await fetchFromStoryblok("blog");
  if (sb?.posts?.length) {
    const posts: BlogPost[] = sb.posts.map((item: Record<string, string | boolean>) => ({
      id: item._uid as string || item.id as string,
      slug: item.slug as string,
      title: item.title as string,
      excerpt: item.excerpt as string,
      category: item.category as string,
      date: item.date as string,
      readTime: item.readTime as string,
      featured: Boolean(item.featured),
      image_url: item.image_url as string,
    }));
    return featured !== undefined ? posts.filter((p) => p.featured === featured) : posts;
  }
  const posts = defaultContent.blog_posts;
  return featured !== undefined ? posts.filter((p) => p.featured === featured) : posts;
}

export async function getContactInfo(): Promise<ContactInfo> {
  const sb = await fetchFromStoryblok("contact");
  if (sb) {
    return {
      phone: sb.phone || defaultContent.contact.phone,
      email: sb.email || defaultContent.contact.email,
      address: sb.address || defaultContent.contact.address,
      city: sb.city || defaultContent.contact.city,
      hours: sb.hours || defaultContent.contact.hours,
      instagram: sb.instagram || defaultContent.contact.instagram,
      facebook: sb.facebook || defaultContent.contact.facebook,
      linkedin: sb.linkedin || defaultContent.contact.linkedin,
    };
  }
  return defaultContent.contact;
}
