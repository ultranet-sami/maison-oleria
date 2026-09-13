# Guide de Test - Deploiement Vercel + GitHub

Ce guide explique comment pousser le code sur GitHub, le deployer sur Vercel, puis tester toutes les fonctionnalites du site Maison Oleria.

---

## 1. Pousser le code sur GitHub

Si le depot n'existe pas encore :

```bash
cd maison-oleria
git init
git add .
git commit -m "Site complet : paiements, admin, IA"
git branch -M main
git remote add origin https://github.com/<votre-utilisateur>/<votre-repo>.git
git push -u origin main
```

Si le depot existe deja et que vous avez juste des modifications :

```bash
git add .
git commit -m "Ajout paiements Stripe/Klarna, admin, assistant IA"
git push
```

## 2. Connecter/Deployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) -> **Add New -> Project**.
2. Importez votre depot GitHub `maison-oleria` (si ce n'est pas deja fait).
3. Vercel detecte automatiquement Next.js — laissez les reglages par defaut (Build command: `next build`, Output: `.next`).
4. **Ne cliquez pas encore sur "Deploy"** si vous n'avez pas configure les variables d'environnement — sinon le premier build fonctionnera quand meme (les fonctionnalites optionnelles sont "best-effort"), mais rien ne sera fonctionnel (paiement, email, admin, IA).

## 3. Configurer les variables d'environnement dans Vercel

Allez dans **Project Settings -> Environment Variables** et ajoutez (au minimum) :

| Variable | Obligatoire pour | Reference |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Redirections Stripe | PAYMENTS_SETUP.md |
| `STRIPE_SECRET_KEY` | Paiement carte/Klarna | PAYMENTS_SETUP.md |
| `STRIPE_WEBHOOK_SECRET` | Confirmation de paiement | PAYMENTS_SETUP.md (etape 5, a faire APRES le premier deploiement, voir ci-dessous) |
| `RESEND_API_KEY` | Emails (contact, newsletter, confirmation paiement) | EMAIL_SETUP.md |
| `MAILCHIMP_API_KEY` / `MAILCHIMP_AUDIENCE_ID` / `MAILCHIMP_SERVER` | Newsletter (optionnel) | EMAIL_SETUP.md |
| `ADMIN_EMAIL` | Connexion admin | ADMIN_AI_SETUP.md |
| `ADMIN_PASSWORD_HASH` | Connexion admin | ADMIN_AI_SETUP.md |
| `SESSION_SECRET` | Connexion admin | ADMIN_AI_SETUP.md |
| `AI_PROVIDER` + cle correspondante (`OPENAI_API_KEY`, etc.) | Assistant IA admin | ADMIN_AI_SETUP.md |

Cliquez sur **Deploy** (ou **Redeploy** si le projet existait deja).

## 4. Recuperer l'URL de deploiement

Une fois le build termine, Vercel affiche l'URL (ex : `https://maison-oleria.vercel.app` ou votre domaine personnalise si configure).

Mettez a jour `NEXT_PUBLIC_SITE_URL` avec cette URL exacte si vous ne l'aviez pas encore fait, puis **redeployez** (Vercel -> Deployments -> ... -> Redeploy) pour que la variable soit prise en compte.

## 5. Configurer le webhook Stripe avec l'URL live

Maintenant que le site est en ligne :

1. Dashboard Stripe -> **Developers -> Webhooks -> Add endpoint**.
2. URL : `https://<votre-domaine-vercel>/api/webhook`
3. Evenements : `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`.
4. Copiez le **Signing secret** (`whsec_...`) -> ajoutez-le dans Vercel comme `STRIPE_WEBHOOK_SECRET`.
5. **Redeployez** le projet une fois cette variable ajoutee (les variables d'environnement ne sont prises en compte qu'au prochain build/redeploy).

---

## 6. Checklist de test end-to-end (sur l'URL live)

### a. Formulaire de contact
1. Allez sur `/contact`, remplissez et envoyez le formulaire.
2. Verifiez le message de succes cote client.
3. Connectez-vous sur `/admin` (voir etape "e" plus bas) et verifiez que le lead apparait dans le tableau avec le type "contact".
4. Si `RESEND_API_KEY` configure : verifiez la reception de l'email de notification.

### b. Newsletter
1. Sur le footer ou la section newsletter, inscrivez un email de test.
2. Verifiez le lead type "newsletter" dans `/admin`.
3. Si Mailchimp configure : verifiez que le contact apparait dans votre audience Mailchimp.
4. Si Resend configure : verifiez l'email de bienvenue.

### c. Reservation + paiement (carte)
1. Allez sur `/reserver`, choisissez une formule payante, avancez jusqu'a l'etape de paiement.
2. Cliquez sur le bouton de paiement -> vous devez etre redirige vers la page Stripe Checkout.
3. Utilisez la carte de test Stripe : `4242 4242 4242 4242`, date future, CVC quelconque, code postal quelconque.
4. Validez -> vous devez etre redirige vers `/reserver?payment=success&leadId=...` avec le message de confirmation (Etape 8).
5. Verifiez dans `/admin` que le lead a `paymentStatus = paid`.
6. Verifiez la reception de l'email de confirmation de paiement (si Resend configure).

### d. Reservation + paiement (Klarna)
1. Refaites le meme parcours, mais choisissez Klarna a la caisse Stripe (si l'option apparait — elle depend du montant, de la devise EUR et du pays du compte Stripe).
2. Utilisez les identifiants de test Klarna fournis par Stripe en mode test (Stripe affiche des instructions de test directement sur la page Klarna en mode test).
3. Verifiez le meme resultat que pour la carte (redirection succes, lead `paid`, email).

### e. Paiement annule
1. Sur la page Stripe Checkout, cliquez sur "Retour" / annulez le paiement.
2. Vous devez revenir sur `/reserver?payment=cancelled&leadId=...` avec un message d'erreur/annulation a l'etape 6, permettant de reessayer.

### f. Connexion admin
1. Allez sur `/admin/login`.
2. Connectez-vous avec `ADMIN_EMAIL` et le mot de passe correspondant a `ADMIN_PASSWORD_HASH`.
3. Vous devez etre redirige vers `/admin` (tableau de bord avec les stats et la liste des leads).
4. Essayez d'acceder directement a `/admin` dans un navigateur en navigation privee (sans etre connecte) -> vous devez etre redirige vers `/admin/login`.
5. Testez la deconnexion (bouton dans le header admin) -> vous devez etre redirige vers `/admin/login` et ne plus pouvoir acceder a `/admin`.

### g. Assistant IA admin
1. Une fois connecte, allez sur `/admin/assistant`.
2. Verifiez que le fournisseur actif s'affiche correctement (ex: "openai").
3. Envoyez un message test, par exemple : "Quelles formules ont ete reservees recemment ?"
4. Verifiez que l'assistant repond en tenant compte des leads reels (crees lors des tests precedents).
5. Si aucune cle IA n'est configuree, verifiez que l'assistant renvoie un message d'erreur clair plutot qu'un crash.

---

## 7. Point d'attention important : stockage des leads sur Vercel

Le fichier `src/lib/leads.ts` enregistre actuellement les leads dans `data/leads.json` sur le systeme de fichiers du serveur. **Ceci fonctionne en local, mais est peu fiable sur Vercel** :

- Le systeme de fichiers de Vercel (fonctions serverless) est **ephemere** : il peut etre reinitialise a chaque nouveau deploiement, et n'est pas necessairement partage entre plusieurs instances/regions.
- Resultat possible : des leads enregistres peuvent disparaitre apres un redeploiement, ou ne pas apparaitre immediatement dans `/admin` si une autre instance serverless a traite la requete.

**Recommandation** : pour un usage de test/demo, cela reste acceptable a court terme. Mais pour une utilisation en production fiable, il est recommande de remplacer ce stockage fichier par une vraie base de donnees (ex: Vercel Postgres, Supabase, PlanetScale...). Ce n'est pas necessaire pour valider le fonctionnement general du site en test, mais a garder en tete avant une mise en production serieuse.

<!-- File contains AI-generated response based on internal company sources -->
