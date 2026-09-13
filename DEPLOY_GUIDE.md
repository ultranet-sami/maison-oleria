# Guide Complet : Laptop -> GitHub -> Vercel -> Site en Ligne

---

## ETAPE 1 : Copier le Projet sur Votre Laptop

### Depuis ce serveur NXP, telecharger le ZIP :

Le fichier ZIP se trouve ici sur le serveur NXP :
```
/home/shark8x8_c28_workareas/work/nxg01886/workdir/Surrogate_Spiral_wrk/maison-allure.zip
```

Copiez-le sur votre laptop via SCP, SFTP, ou votre methode habituelle de transfert de fichiers NXP.

---

## ETAPE 2 : Installer Node.js sur Votre Laptop

Si Node.js n'est pas installe sur votre laptop :

1. Aller sur https://nodejs.org
2. Telecharger **Node.js LTS** (version 20.x recommandee)
3. Installer (Windows : double-clic sur .msi / Mac : double-clic sur .pkg)
4. Verifier l'installation :
   ```bash
   node --version   # doit afficher v20.x.x
   npm --version    # doit afficher 10.x.x
   ```

---

## ETAPE 3 : Lancer le Site en Local

```bash
# 1. Decompresser le ZIP et aller dans le dossier
unzip maison-allure.zip
cd maison-allure

# 2. Installer les dependances (1 seule fois)
npm install

# 3. Lancer le serveur de developpement
npm run dev
```

Ouvrir dans le navigateur : **http://localhost:3000**

Votre site Maison Allure est visible ! Toutes les 10 pages sont accessibles.

---

## ETAPE 4 : Pousser sur GitHub

### 4.1 Creer un compte GitHub (si pas encore fait)
Aller sur https://github.com et creer un compte gratuit.

### 4.2 Installer Git sur votre laptop
- Windows : https://git-scm.com/download/win
- Mac : `brew install git` ou via Xcode

### 4.3 Creer un nouveau depot GitHub
1. Aller sur https://github.com/new
2. Nom du depot : `maison-allure`
3. Visibilite : **Public** (requis pour Vercel gratuit) ou Private
4. NE PAS cocher "Initialize with README"
5. Cliquer **Create repository**

### 4.4 Initialiser Git et pousser le code

```bash
# Dans le dossier maison-allure/ sur votre laptop :

# Creer un fichier .gitignore
cat > .gitignore << 'EOF'
node_modules/
.next/
.env.local
.env
*.log
.npmrc
EOF

# Initialiser Git
git init
git add .
git commit -m "Initial commit: Maison Allure website"

# Connecter au depot GitHub (remplacer VOTRE_USERNAME par votre nom GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/maison-allure.git
git branch -M main
git push -u origin main
```

Votre code est maintenant sur GitHub !

---

## ETAPE 5 : Deployer sur Vercel (Site en Ligne)

### 5.1 Creer un compte Vercel
1. Aller sur https://vercel.com
2. Cliquer **Sign Up**
3. Choisir **Continue with GitHub** (recommande - lie directement votre compte GitHub)

### 5.2 Importer le projet depuis GitHub
1. Dans le dashboard Vercel, cliquer **Add New... > Project**
2. Sous "Import Git Repository", vous verrez votre repo `maison-allure`
3. Cliquer **Import** a cote de `maison-allure`

### 5.3 Configurer le deploiement
Vercel detecte automatiquement Next.js. Laisser tous les parametres par defaut :
- Framework Preset : **Next.js** (auto-detecte)
- Build Command : `npm run build` (auto)
- Output Directory : `.next` (auto)
- Node.js Version : 20.x

Cliquer **Deploy** !

### 5.4 Votre site est en ligne !
Apres ~2 minutes, Vercel vous donne une URL :
```
https://maison-allure-xxxxxxx.vercel.app
```
Votre site est maintenant accessible publiquement dans le monde entier !

---

## ETAPE 6 : Connecter Votre Propre Domaine (Optionnel)

### 6.1 Acheter un domaine
Recommande : `maison-allure.fr` ou `maisonallure.com`

Registrars (achat domaine) :
- OVH : https://www.ovh.com (le plus simple en France)
- Gandi : https://www.gandi.net
- Namecheap : https://www.namecheap.com

### 6.2 Ajouter le domaine dans Vercel
1. Dans votre projet Vercel, aller dans **Settings > Domains**
2. Taper votre domaine : `maison-allure.fr`
3. Cliquer **Add**
4. Vercel vous donne des enregistrements DNS a ajouter

### 6.3 Configurer le DNS chez votre registrar
Dans l'interface de votre registrar (ex: OVH), ajouter :
- Type **A** : `@` pointe vers `76.76.21.21` (IP Vercel)
- Type **CNAME** : `www` pointe vers `cname.vercel-dns.com`

Attendre 5-30 minutes pour la propagation DNS.

Votre site sera accessible sur `https://maison-allure.fr` avec HTTPS automatique !

---

## ETAPE 7 : Soumettre a Google (SEO)

Pour apparaitre sur Google :

1. Aller sur https://search.google.com/search-console
2. Cliquer **Ajouter une propriete**
3. Entrer votre URL : `https://maison-allure.fr`
4. Choisir la verification par **prefixe d'URL**
5. Telecharger le fichier HTML de verification et l'ajouter dans `maison-allure/public/`
6. Pousser le changement sur GitHub (Vercel redeploit automatiquement)
7. Valider dans Google Search Console
8. Cliquer **Sitemaps** et soumettre : `https://maison-allure.fr/sitemap.xml`

Google indexe generalement le site en 1-7 jours.

---

## ETAPE 8 : Mises a Jour Futures

Chaque fois que vous modifiez le code :

```bash
# Modifier vos fichiers...

# Pousser les changements sur GitHub
git add .
git commit -m "Description de vos modifications"
git push

# Vercel redeploie AUTOMATIQUEMENT en 1-2 minutes !
```

---

## Recapitulatif des URLs

| Service | URL |
|---------|-----|
| Site local | http://localhost:3000 |
| Site Vercel | https://maison-allure-xxx.vercel.app |
| Site domaine perso | https://maison-allure.fr |
| Dashboard Vercel | https://vercel.com/dashboard |
| GitHub repo | https://github.com/VOTRE_USERNAME/maison-allure |
| Google Search Console | https://search.google.com/search-console |

---

## En Cas de Probleme

### npm install echoue
```bash
# Essayer de supprimer le cache npm
npm cache clean --force
npm install
```

### Page blanche sur Vercel
Verifier les logs de deploiement dans Vercel > votre projet > Deployments > cliquer le deploiement > voir les logs

### Domaine ne fonctionne pas
Attendre 30-60 minutes pour la propagation DNS. Tester sur https://dnschecker.org

---

*Maison Allure - Complete en 10 pages, TypeScript, Next.js 15, Tailwind CSS*
