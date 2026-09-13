# Guide Storyblok — Editeur Visuel pour Maison Allure

Avec Storyblok, vous pouvez modifier tout le contenu de votre site
(textes, photos, services, temoignages, blog) sans toucher au code.

---

## ETAPE 1 : Creer votre compte Storyblok (GRATUIT)

1. Aller sur **https://app.storyblok.com**
2. Cliquer **Sign Up** (inscription gratuite)
3. Valider votre email

---

## ETAPE 2 : Creer votre espace

1. Apres connexion, cliquer **Create new Space**
2. Nommer l'espace : `maison-allure`
3. Choisir **Community** (gratuit) → **Create**

---

## ETAPE 3 : Obtenir votre Access Token

1. Dans le menu gauche, cliquer **Settings**
2. Cliquer l'onglet **API-Keys**
3. Vous verrez un token sous "Public token" — copier ce texte
   (ressemble a : `abc123def456...`)

---

## ETAPE 4 : Ajouter le token dans Vercel

1. Aller sur **vercel.com** → votre projet `maison-allure`
2. Cliquer **Settings** (en haut)
3. Cliquer **Environment Variables** (dans le menu gauche)
4. Ajouter ces 2 variables :
   - Nom : `STORYBLOK_API_TOKEN` — Valeur : votre token copie
   - Nom : `STORYBLOK_VERSION` — Valeur : `published`
5. Cliquer **Save** pour chacune

---

## ETAPE 5 : Creer votre contenu dans Storyblok

### Creer les "Stories" (pages de contenu) :

Dans Storyblok, aller dans **Content** → **+ New Story**

Creer ces stories :
- `home/hero` — Titre, description, boutons du Hero
- `home/services` — Liste des services
- `home/testimonials` — Temoignages clients
- `contact` — Informations de contact
- `blog` — Articles du blog

### Pour chaque story, vous pouvez ajouter :
- Textes (titres, descriptions)
- Images (glisser-deposer vos photos)
- URLs des boutons

---

## ETAPE 6 : Redeplover sur Vercel

Apres avoir ajoute les variables d'environnement :
1. Aller dans **Vercel > votre projet > Deployments**
2. Cliquer les 3 points sur le dernier deploiement
3. Cliquer **Redeploy**

Votre site lira maintenant le contenu depuis Storyblok !

---

## Comment modifier le contenu au quotidien

1. Aller sur **app.storyblok.com**
2. Ouvrir votre espace "maison-allure"
3. Cliquer sur la story a modifier (ex: "home/hero")
4. Modifier le texte ou remplacer la photo
5. Cliquer **Save** puis **Publish**
6. Le site se met a jour automatiquement !

---

## Sans Storyblok (fallback automatique)

Si vous ne configurez pas Storyblok, le site utilise automatiquement
le contenu par defaut defini dans `src/lib/content.ts`.

Vous pouvez modifier directement ce fichier pour changer le contenu
sans avoir besoin de Storyblok.

---

## Passer a un autre CMS plus tard

Si dans le futur vous voulez utiliser Sanity, Contentful ou autre :
1. Modifier seulement le fichier `src/lib/content.ts`
2. Remplacer la fonction `fetchFromStoryblok` par votre nouveau CMS
3. Le reste du site ne change pas

---

*Maison Allure — Architecture CMS-Agnostique*
