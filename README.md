# Maison Allure - Site Web Officiel

Maison de Conseil en Image & Stylisme Personnel de Luxe

---

## Architecture du Projet

```
maison-allure/
  src/
    app/
      layout.tsx              # Layout global (Navbar + Footer + SEO)
      globals.css             # Design system, Google Fonts, Tailwind
      page.tsx                # Page d'accueil (Home)
      about/page.tsx          # A Propos
      services/page.tsx       # Tous les services
      color-analysis/page.tsx # Analyse Colorimetrique
      personal-styling/page.tsx # Stylisme Personnel
      professional-image/page.tsx # Image Professionnelle
      wedding-styling/page.tsx    # Stylisme Mariage
      testimonials/page.tsx       # Temoignages
      blog/page.tsx               # Blog (20 articles)
      contact/page.tsx            # Contact + Formulaire
    components/
      Navbar.tsx              # Navigation responsive avec dropdown
      Footer.tsx              # Footer complet
  tailwind.config.ts          # Palette de couleurs + typographies
  next.config.ts
  package.json
```

## Palette de Couleurs

| Nom       | Hex       | Usage                     |
|-----------|-----------|---------------------------|
| Ivory     | #F6F2EA   | Fonds de sections claires |
| Black     | #1F1F1F   | Texte principal, sections sombres |
| Gold      | #C6A46A   | Accents, CTA, subtitles   |
| Taupe     | #C8B8A6   | Texte secondaire, bordures |
| White     | #FCFAF7   | Fond principal            |

## Typographie

- **Titres** : Playfair Display (serif, Google Fonts)
- **Corps** : Montserrat (sans-serif, Google Fonts)

---

## Installation & Lancement Local

### Prerequis

- Node.js >= 18.x
- npm ou yarn

### Etapes

```bash
# 1. Aller dans le dossier du projet
cd maison-allure

# 2. Installer les dependances
npm install

# 3. Lancer en developpement
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:3000
```

### Build de Production

```bash
npm run build
npm run start
```

---

## Deploiement en Production (Options)

### Option 1 : Vercel (Recommande - Le Plus Simple)

Vercel est la plateforme creee par l'equipe Next.js. Deploiement en 2 minutes.

1. Creer un compte sur [vercel.com](https://vercel.com)
2. Installer Vercel CLI : `npm install -g vercel`
3. Dans le dossier `maison-allure/` : `vercel`
4. Suivre les instructions
5. Votre site sera en ligne sur `https://votre-projet.vercel.app`
6. **Connecter votre domaine** dans les parametres Vercel

### Option 2 : Netlify

1. Creer un compte sur [netlify.com](https://netlify.com)
2. Glisser-deposer le dossier `maison-allure/` dans Netlify Drop
3. Ou connecter votre repo GitHub pour le deploiement automatique

### Option 3 : Serveur VPS (OVH, Hetzner, etc.)

```bash
# Sur le serveur
npm install
npm run build

# Avec PM2
npm install -g pm2
pm2 start npm --name "maison-allure" -- start
pm2 save
pm2 startup
```

---

## Configuration Domaine & Google

### 1. Acheter un Nom de Domaine

Recommande : `maison-allure.fr` ou `maisonallure.fr`

Registrars : OVH, Gandi, Namecheap, Google Domains

### 2. Configurer le DNS

Pointer votre domaine vers votre hebergeur (Vercel, Netlify, etc.)
- Pour Vercel : ajouter un enregistrement A ou CNAME dans votre DNS

### 3. Soumettre a Google

1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter votre propriete (URL de votre site)
3. Verifier la propriete (via DNS ou HTML)
4. Soumettre le sitemap : `https://votre-domaine.fr/sitemap.xml`

### 4. Ajouter le Sitemap

Creer `src/app/sitemap.ts` :

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://maison-allure.fr', lastModified: new Date() },
    { url: 'https://maison-allure.fr/about', lastModified: new Date() },
    { url: 'https://maison-allure.fr/services', lastModified: new Date() },
    { url: 'https://maison-allure.fr/color-analysis', lastModified: new Date() },
    { url: 'https://maison-allure.fr/personal-styling', lastModified: new Date() },
    { url: 'https://maison-allure.fr/professional-image', lastModified: new Date() },
    { url: 'https://maison-allure.fr/wedding-styling', lastModified: new Date() },
    { url: 'https://maison-allure.fr/testimonials', lastModified: new Date() },
    { url: 'https://maison-allure.fr/blog', lastModified: new Date() },
    { url: 'https://maison-allure.fr/contact', lastModified: new Date() },
  ]
}
```

---

## Personnalisations Recommandees

### A Faire Avant Lancement

1. **Photos** : Remplacer les placeholders par de vraies photos professionnelles
   - Chercher sur [Unsplash](https://unsplash.com) les mots "fashion editorial", "parisian style"
   - Utiliser le composant `<Image>` de Next.js avec `images.unsplash.com`

2. **Coordonnees** : Mettre a jour dans `Footer.tsx` et `contact/page.tsx`
   - Adresse precise
   - Numero de telephone reel
   - Email de contact reel

3. **Reseaux Sociaux** : Ajouter les vrais liens dans `Footer.tsx`

4. **Google Maps** : Remplacer le placeholder dans `contact/page.tsx` par un vrai embed Google Maps

5. **Formulaire de Contact** : Connecter a un service email
   - [Resend](https://resend.com) ou [SendGrid](https://sendgrid.com)
   - Ou utiliser [Formspree](https://formspree.io) (le plus simple)

6. **Analytics** : Ajouter Google Analytics ou Plausible dans `layout.tsx`

7. **Cookies** : Ajouter une banniere RGPD

---

## SEO - Mots-Cles Cibles

- conseil en image paris
- styliste personnel paris
- analyse colorimetrique
- coaching image professionnelle
- relooking paris
- image professionnelle femme
- stylisme mariage paris
- garde-robe capsule
- shopping accompagne paris

---

## Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styles** : Tailwind CSS v3
- **Icons** : Lucide React
- **Fonts** : Google Fonts (Playfair Display + Montserrat)
- **SEO** : Metadata API Next.js native

---

*Maison Allure - L'Art de Reveler Votre Elegance*
