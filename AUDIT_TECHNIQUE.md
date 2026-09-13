# Audit Technique Complet — Maison Oleria
Date: 2026-09-08 | Perimetre: repertoire `maison-oleria/` (Next.js 15 / React 19 / App Router)

Objectif de l'audit: determiner si l'architecture actuelle est prete a evoluer vers une
plateforme moderne, scalable, "AI-Ready" (pour l'administrateur uniquement, pas pour les
visiteurs) et "Marketing-Ready" (publicite modulaire, tracking centralise), tout en
renforcant la securite (anti-hacking, anti-fraude, anti-spam).

---

## PARTIE 1 — AUDIT DE L'ARCHITECTURE

| Categorie | Score /100 | Constat principal |
|---|---|---|
| Structure du projet | 70 | App Router propre, separation `lib/`, `components/bloks/`, mais pas de couche `services/`, `repositories/`, ni de dossier `config/` centralise. |
| Securite | 45 | Auth JWT correcte, mais aucune protection anti-bot/anti-spam, aucun rate limiting, pas de headers de securite (CSP, HSTS), webhook Stripe utilisable sans signature si `STRIPE_WEBHOOK_SECRET` absent. |
| Performance | 65 | `revalidate = 30` sur la page catch-all Storyblok, mais lecture de fichier JSON synchrone (`fs.readFileSync`) sur chaque requete admin — bloquant, non scalable en serverless. |
| Scalabilite | 30 | Stockage des leads en fichier JSON local (`data/leads.json`) — incompatible avec le systeme de fichiers ephemere/multi-instance de Vercel (deja documente dans TESTING_GUIDE.md). Aucune base de donnees. |
| API Layer | 60 | Routes REST Next.js claires (`/api/contact`, `/api/newsletter`, `/api/checkout`, `/api/webhook`, `/api/admin/*`), mais pas de couche d'abstraction commune (validation, erreurs, versioning), pas de schema de validation (Zod absent). |
| Variables d'environnement | 55 | Bien documentees (PAYMENTS_SETUP.md, ADMIN_AI_SETUP.md, EMAIL_SETUP.md) mais aucune validation au demarrage (pas de `env.ts` avec schema Zod) — une variable manquante n'est detectee qu'a l'usage. |
| Authentification | 65 | JWT signe (jose) + bcrypt + cookie httpOnly/secure/sameSite=lax — bonnes pratiques de base. Mais un seul compte admin en dur (pas de MFA, pas de rotation de secret, pas de verrouillage apres echecs). |
| Gestion des roles | 20 | Un seul role "admin" hard-code. Aucun modele de roles/permissions (RBAC) pour une future equipe (ex: redacteur, marketing, support). |
| Monitoring | 10 | Aucun monitoring applicatif (pas de Sentry, pas de healthcheck, pas de metriques). |
| Logging | 20 | Uniquement `console.log`/`console.error` — pas de logs structures, pas de correlation ID, pas de centralisation (Vercel logs ephemeres uniquement). |
| SEO | 75 | `generateMetadata` dynamique via Storyblok, `openGraph`, `robots`, structure App Router propre. Manque: sitemap.xml, robots.txt explicite, JSON-LD, canonical URLs. |
| Base de donnees | 10 | Aucune base de donnees — stockage fichier JSON uniquement (`leads.ts`). Point de blocage majeur pour la scalabilite. |
| Gestion des medias | 40 | `next/image` configure pour `images.unsplash.com` uniquement + Storyblok pour le CMS ; pas de pipeline d'upload/optimisation propre (pas de S3/Cloudinary), pas de validation de type/taille de fichier cote serveur. |
| CMS (Storyblok) | 80 | Integration propre: `storyblokInit`, mapping composants/Bloks, fallback statique si non configure, bridge visual editor avec cleanup (corrige). Tres bonne base. |

**Score moyen Architecture: ~45/100** — le point le plus critique est l'absence de base de donnees et de monitoring/logging, qui bloquent toute scalabilite reelle.

---

## PARTIE 2 — PREPARATION IA (ADMIN UNIQUEMENT)

Constat: `src/lib/ai/index.ts` fournit deja une **bonne base de Provider Abstraction Layer** :
interface `AIProvider` commune (`name`, `isConfigured`, `ask`), switch par variable
d'environnement `AI_PROVIDER`, fallback propre si non configure. C'est exactement le pattern
recherche pour changer de fournisseur sans reecrire le reste de l'app.

| Brique demandee | Etat actuel | Pret ? |
|---|---|---|
| AI Service Layer | `askAssistant()` centralise dans `lib/ai/index.ts` | Oui (base) |
| Provider Abstraction Layer | Interface `AIProvider` + registre `PROVIDERS` | Oui (base), a etendre |
| Support fournisseurs | openai, gemini, claude, nanobanana geres. **Manquants: Grok, Mistral, DeepSeek, Azure OpenAI, OpenRouter, HuggingFace** | Partiel |
| Prompt Management Layer | Absent — le prompt systeme est ecrit en dur dans la route (`admin/assistant/route.ts`) | Non |
| Secure API Key Storage | Cles en variables d'environnement Vercel (correct pour un MVP) mais aucun chiffrement/rotation, pas de secret manager (Vault, Vercel encrypted env suffit pour l'instant) | Partiel |
| Usage Monitoring | Absent | Non |
| Cost Monitoring | Absent | Non |
| Error Handling | Present et correct (`try/catch` + message utilisateur propre) | Oui |
| Rate Limiting | Absent (l'endpoint `/api/admin/assistant` peut etre appele sans limite, meme authentifie) | Non |
| Audit Logs | Absent (aucune trace des questions/reponses admin) | Non |

### Score AI Readiness (Admin only): **55/100**
La fondation (abstraction multi-provider) est deja la et bien pensee — c'est le point fort du
projet. Il manque la couche "operationnelle" autour (prompts versionnes, quotas, couts, logs).

### Ce qui NE doit rien changer
Le `Chatbot.tsx` cote visiteur est confirme **100% rule-based, sans IA, sans cle API** — aligne
avec votre exigence de ne rien exposer aux visiteurs. Aucune action requise ici.

---

## PARTIE 3 — CAS D'USAGE IA ADMINISTRATEUR

Actuellement seul un chat generique existe (`/admin/assistant`). Aucun des cas d'usage
suivants n'est implemente comme fonction dediee, mais l'architecture (Provider layer) permet
de les ajouter sans refonte:

- Generation SEO — absent
- Generation d'articles — absent
- Generation de contenu marketing — absent
- Traduction — absent (bien qu'il existe un widget Google Translate cote visiteur, non lie a l'IA admin)
- Resume automatique — absent
- Analyse de contenu — absent
- Suggestions d'amelioration — absent
- Optimisation SEO — absent

**Recommandation**: transformer `askAssistant(messages)` en une serie de "taches" nommees
(`generateSeoMeta()`, `summarizeContent()`, etc.) qui construisent un prompt via une couche
**Prompt Management Layer** (templates versionnes), plutot que du texte libre dans la route.

---

## PARTIE 4 — PUBLICITE MODULAIRE

Etat actuel: **aucune architecture modulaire de publicite n'existe**. Seuls des pixels
inconditionnels sont injectes en dur dans `layout.tsx` (Google Analytics, Meta Pixel, TikTok
Pixel), actives simplement si la variable d'env correspondante existe — mais:
- Pas de toggle admin par plateforme (seulement present/absent via env var au build).
- Pas d'abstraction commune ; chaque script est copie-colle a la main dans le `<head>`.
- Google Ads, Instagram Ads, LinkedIn Ads, Microsoft Ads: absents.
- **Aucun consentement (RGPD) verifie avant chargement** des pixels — voir Partie 6.

### Score Marketing Readiness (publicite modulaire): **15/100**

---

## PARTIE 5 — TRACKING CENTRALISE

Etat actuel: **inexistant**. Aucune fonction `trackPageView()`, `trackSignup()`, `trackLead()`,
etc. Le code appelle Google Analytics / Meta / TikTok directement et de facon disparate (rien
n'est appele cote applicatif au moment des vrais evenements metier comme la creation d'un
lead ou un paiement reussi — les pixels ne trackent que le PageView initial).

### Score Tracking: **5/100**

---

## PARTIE 6 — RGPD ET CONFORMITE

| Element | Etat |
|---|---|
| Banniere cookies | **Absente** |
| Consent Mode v2 | **Absent** |
| Gestion des preferences utilisateur | **Absente** |
| Activation des pixels apres consentement uniquement | **Non respectee** — GA/Meta/TikTok se chargent inconditionnellement dans `layout.tsx` des que la variable d'env existe, sans attendre de consentement |
| Politique de confidentialite | A verifier (page non trouvee dans `src/app/*` listees) |
| Conformite RGPD globale | **Non conforme** en l'etat (pixels tiers + emails sans consentement trace) |

### Score RGPD: **10/100** — Risque juridique reel si mise en production avec des pixels actifs sans consentement (amendes CNIL possibles pour tout site visant des visiteurs UE).

---

## PARTIE 7 — EVOLUTIVITE E-COMMERCE

- Stripe est bien isole dans `lib/stripe.ts` (`getStripe()`, `isStripeConfigured()`) — bon pattern.
- Cependant, la logique metier (creation de session checkout, calcul de montant, metadata) est
  ecrite directement dans la route `/api/checkout`, sans couche `PaymentProvider` abstraite.
- Ajouter Shopify/PayPal/Commerce Layer/WooCommerce demanderait aujourd'hui de dupliquer toute
  la route plutot que d'implementer une nouvelle classe derriere une interface commune.

### Score E-commerce Readiness: **35/100**

---

## PARTIE 8 — DEVOPS

| Element | Etat |
|---|---|
| Docker | Absent (pas de Dockerfile) |
| CI/CD | Absent (pas de `.github/workflows/`) |
| GitHub Actions | Absent |
| Monitoring | Absent |
| Logs centralises | Absent (console uniquement) |
| Alerting | Absent |
| Sentry | Absent |
| Sauvegardes | N/A (pas de DB) mais `data/leads.json` n'est jamais sauvegarde |
| Gestion des secrets | Variables d'environnement Vercel (correct), mais aucune rotation/scan de secrets (ex: gitleaks) |

### Score DevOps: **10/100**

---

## PARTIE 9 — LIVRABLES

### 1. Audit complet
Voir sections 1 a 8 et 10-12 ci-dessus/ci-dessous.

### 2. Score Architecture: **45/100**
### 3. Score AI Readiness (Admin Only): **55/100**
### 4. Score Marketing Readiness: **15/100**
### 5. Score Scalabilite: **25/100**
(stockage fichier JSON + absence de cache/CDN de donnees + absence de monitoring = plafond bas)

### 6. Liste des problemes detectes (principaux)
1. Stockage des leads en fichier JSON local — perte de donnees possible sur Vercel (deja documente).
2. Aucune base de donnees.
3. Webhook Stripe accepte des requetes non signees si `STRIPE_WEBHOOK_SECRET` absent (fallback dangereux en prod).
4. Aucun rate limiting sur les routes publiques (`/api/contact`, `/api/newsletter`, `/api/checkout`, `/api/admin/login`).
5. Aucune protection anti-bot/anti-spam (pas de captcha) sur les formulaires sensibles.
6. Aucun header de securite (CSP, X-Frame-Options, Strict-Transport-Security, Referrer-Policy).
7. Pixels marketing charges sans consentement RGPD.
8. Un seul role admin, pas de RBAC, pas de MFA.
9. Aucun monitoring/alerting (Sentry, uptime, logs structures).
10. Aucune CI/CD, pas de tests automatises visibles.
11. Prompt IA en dur dans le code de la route plutot que dans une couche dediee.
12. Pas de validation de schema (Zod/Yup) sur les payloads des API routes — validation manuelle partielle uniquement.
13. Emails envoyes de facon "best effort" sans file de retry (si Resend echoue, aucune tentative de rattrapage).

### 7. Liste des risques
- **Risque eleve**: perte de leads/paiements suite a redeploiement Vercel (fichier JSON ephemere).
- **Risque eleve**: non-conformite RGPD (amende potentielle, blocage juridique en cas de controle).
- **Risque moyen**: spam/faux leads via formulaires sans captcha ni rate limiting.
- **Risque moyen**: compte admin unique compromis = acces total sans detection (pas d'audit log, pas d'alerte de connexion suspecte).
- **Risque moyen**: webhook Stripe falsifiable si le secret n'est pas configure en production.
- **Risque faible/moyen**: absence totale de monitoring — un incident (crash, erreur 500 en masse) peut passer inapercu.

### 8. Correctifs recommandes (prioritaires -> secondaires)
1. Migrer `leads.ts` vers une vraie base de donnees (Postgres/Supabase/Vercel Postgres) — **priorite 1**.
2. Forcer l'erreur (ne pas fallback) si `STRIPE_WEBHOOK_SECRET` est absent en production.
3. Ajouter reCAPTCHA v3 ou Cloudflare Turnstile sur `/api/contact`, `/api/newsletter`, `/api/checkout`, `/admin/login`.
4. Ajouter un rate limiter (ex: Upstash Ratelimit, ou middleware IP-based) sur toutes les routes API publiques.
5. Ajouter des Security Headers via `next.config.ts` (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
6. Implementer une banniere de consentement (Consent Mode v2) avant de charger GA/Meta/TikTok.
7. Ajouter Sentry (ou equivalent) pour le monitoring des erreurs + Vercel Analytics pour les performances.
8. Ajouter Zod pour valider tous les payloads d'API.
9. Introduire une couche `PromptManager` et un registre de "taches IA" (SEO, resume, traduction...) au-dessus du Provider layer existant.
10. Introduire un modele RBAC minimal (meme avec un seul admin aujourd'hui) pour anticiper une equipe.
11. Ajouter CI (GitHub Actions: lint + build + tests) avant tout deploiement.

### 9. Architecture cible
Voir diagramme texte ci-dessous (Partie "Architecture cible").

### 10. Plan d'evolution
Voir "Plan de durcissement" en fin de document (Partie 12).

---

## ARCHITECTURE CIBLE (vue logique)

```
Client (visiteur)                     Admin (vous uniquement)
     |                                        |
     v                                        v
 Next.js App Router  <——— Storyblok CMS   /admin (RBAC minimal, MFA optionnel)
     |                                        |
     v                                        v
 API Layer (Zod validation + rate limit + captcha)
     |
     +--> Payment Abstraction Layer (Stripe today, Shopify/PayPal-ready)
     +--> Lead/Data Layer  ---> Base de donnees (Postgres/Supabase)
     +--> Tracking Layer   ---> trackX() ---> [Google | Meta | TikTok | LinkedIn ...] (config admin)
     +--> AI Service Layer ---> Provider Abstraction ---> [OpenAI|Claude|Gemini|Grok|Mistral|...]
                                     |
                                     +--> Prompt Management Layer
                                     +--> Usage/Cost Monitoring + Audit Logs
     |
     v
 Observabilite: Sentry + Logs structures + Alerting
```

Principes cles:
- **Aucun changement d'usage cote visiteur** : Chatbot reste rule-based, aucune IA visible publiquement.
- **Tout changement de fournisseur (IA, pub, paiement) se fait via configuration**, pas via reecriture de code.
- **Chaque plateforme publicitaire/tracking est un plugin optionnel**, active individuellement par l'admin.

---

## PARTIE 10 — SECURITE, ANTI-HACKING ET ANTI-FRAUDE

### Analyse OWASP Top 10 (synthese)

| Vulnerabilite | Expose ? | Detail |
|---|---|---|
| Injection (SQL/NoSQL) | Non applicable actuellement | Pas de base de donnees; deviendra pertinent apres migration DB — a traiter avec un ORM parametre (Prisma/Drizzle). |
| XSS | Risque faible-moyen | `dangerouslySetInnerHTML` utilise plusieurs fois dans `layout.tsx` pour des scripts tiers en dur (contenu controle, faible risque) ; le contenu Storyblok (`RichTextBlock`) merite verification d'echappement. |
| CSRF | Risque moyen | Les routes API n'ont pas de protection CSRF explicite ; le cookie de session est `sameSite: lax`, ce qui attenue mais ne supprime pas le risque sur certaines requetes GET. |
| SSRF | Faible | Aucun appel serveur vers une URL fournie par l'utilisateur. |
| Brute Force / Credential Stuffing | **Risque eleve** | `/api/admin/login` n'a **aucun rate limiting ni verrouillage** apres echecs repetes — un attaquant peut tenter un nombre illimite de mots de passe. |
| Session Hijacking | Faible-moyen | JWT httpOnly/secure/sameSite correct, mais pas de rotation de session, pas de revocation cote serveur (JWT stateless = impossible de "deconnecter a distance" avant expiration). |
| API Security | Moyen | Pas de validation de schema stricte, pas de rate limiting, pas de versioning. |
| Secrets Exposure | Faible | Secrets bien en variables d'environnement, aucun secret trouve en dur dans le code audite. |
| File Upload Security | N/A | Aucun upload de fichier cote application detecte (medias via Storyblok/Unsplash uniquement). |
| Authentication Security | Moyen | bcrypt + JWT correct, mais mono-facteur, mono-compte, sans politique de mot de passe visible. |
| Authorization Security | Faible-moyen | Modele simple (un seul role "admin"), pas de granularite, donc pas de faille de type "privilege escalation" possible aujourd'hui, mais non extensible. |
| Account Takeover | Moyen | Sans MFA ni alerte de connexion, une fuite du mot de passe = prise de controle totale et silencieuse. |
| Spam Protection | **Faible (absent)** | Aucune protection sur formulaires. |
| Bot Protection | **Faible (absent)** | Aucun captcha, aucun honeypot, aucune limite de frequence. |

### Verifications techniques

| Element | Etat |
|---|---|
| HTTPS obligatoire | Assure par Vercel par defaut (a confirmer en prod, HSTS non force explicitement dans le code) |
| Security Headers | **Absents** (aucun `headers()` dans `next.config.ts`) |
| CSP | **Absente** |
| Rate Limiting | **Absent** |
| IP Rate Limiting | **Absent** |
| WAF Compatibility | Compatible Vercel/Cloudflare en frontal (rien ne l'empeche), mais rien de specifique configure |
| Protection DDoS | Depend de la plateforme d'hebergement (Vercel a une protection de base), rien d'applicatif |
| Secure Cookies | **Oui** (httpOnly, secure en prod, sameSite=lax) — bon point |
| JWT Security | Correct (HS256, expiration 8h, secret via env) mais pas de rotation de cle, pas de `jti`/revocation |
| Password Hashing | **Oui**, bcrypt — bon point |
| Audit Logs | **Absents** |
| Activity Logs | **Absents** |
| Failed Login Monitoring | **Absent** |
| Suspicious Activity Detection | **Absent** |

### Security Score global: **35/100**
### Niveau de risque global: **Eleve** (principalement du a l'absence de rate limiting/captcha sur l'authentification et les formulaires publics, et l'absence totale de monitoring/logs de securite)

---

## PARTIE 11 — PROTECTION DES FORMULAIRES ET PRISE DE RENDEZ-VOUS

| Formulaire | Fichier | Captcha | Rate limit | Validation serveur | Validation client |
|---|---|---|---|---|---|
| Contact | `/api/contact` | Non | Non | Basique (regex email, champs requis) | A verifier cote UI |
| Newsletter | `/api/newsletter` | Non | Non | Basique (regex email) | A verifier cote UI |
| Reservation/Checkout | `/api/checkout` | Non | Non | Basique (types/valeurs positives) | Multi-etapes (`/reserver`) |
| Connexion admin | `/api/admin/login` | Non | **Non — critique** | Oui (via `verifyCredentials`) | Oui |

**Aucun** des mecanismes suivants n'est implemente actuellement:
- "I'm not a robot" / reCAPTCHA v3 / Enterprise
- Cloudflare Turnstile
- hCaptcha
- Honeypot anti-spam
- Limitation du nombre de soumissions par IP/session

### Consequence directe
Le systeme est aujourd'hui vulnerable a: rendez-vous frauduleux automatises, spam de masse sur
le formulaire de contact/newsletter, et brute force illimite sur la connexion admin.

### Recommandation immediate (priorite 1)
Ajouter Cloudflare Turnstile (gratuit, respectueux RGPD, sans "puzzle" visible) sur les 4
formulaires ci-dessus, plus un rate limiter IP (ex: Upstash Ratelimit — compatible Vercel Edge)
sur `/api/admin/login` (ex: 5 tentatives / 10 min / IP+email).

---

## PARTIE 12 — PROTECTION BUSINESS

| Element | Etat |
|---|---|
| Blacklist d'IPs | Absente |
| Whitelist d'administrateurs | Absente (un seul compte, pas de restriction IP) |
| Blocage geographique optionnel | Absent |
| Detection d'activites suspectes | Absente |
| Alertes de securite | Absentes |
| Journalisation des actions sensibles | Absente (aucune trace de connexion admin, modification de lead, etc.) |

### Recommandation
Ajouter une table `audit_logs` (apres migration DB) enregistrant: connexions admin (succes/echec,
IP, user-agent), actions sensibles (export de leads, changement de statut de paiement), et
appels a l'assistant IA (pour le cout et la tracabilite). Brancher une alerte email/Slack sur
tout echec de connexion admin repete.

---

## RAPPORT FINAL DE SECURITE

1. **Security Score: 35/100**
2. **Vulnerabilites detectees**: absence de rate limiting (login + formulaires), absence de
   captcha, absence de security headers/CSP, webhook Stripe potentiellement non verifie,
   absence d'audit logs, mono-facteur admin.
3. **Niveau de risque global: Eleve**
4. **Recommandations de securite**: voir Parties 10-12.
5. **Correctifs prioritaires**:
   1. Rate limiting + captcha sur `/api/admin/login` (critique).
   2. Forcer la verification de signature Stripe en production (pas de fallback silencieux).
   3. Captcha (Turnstile) sur contact/newsletter/checkout.
   4. Security headers + CSP dans `next.config.ts`.
   5. Migration base de donnees + audit logs.
6. **Architecture de securite recommandee**: Cloudflare (WAF + Turnstile + DDoS) en frontal de
   Vercel, rate limiting Edge (Upstash), DB avec logs d'audit, Sentry pour la remontee d'incident,
   MFA optionnel sur le compte admin (TOTP) a moyen terme.
7. **Plan de durcissement (Hardening Plan)**:
   - **Semaine 1**: rate limiting + captcha (login, formulaires), correction du fallback webhook, security headers/CSP.
   - **Semaine 2-3**: migration DB (leads + audit logs), Sentry, GitHub Actions CI (lint/build).
   - **Mois 2**: RBAC minimal, MFA admin (TOTP), Provider Abstraction publicite/tracking, consentement RGPD (Consent Mode v2) avant chargement des pixels.
   - **Mois 3**: Prompt Management Layer + Usage/Cost Monitoring IA, e-commerce abstraction (multi-PSP-ready).

---

*Ce document est un audit technique base sur l'analyse statique du code source presente dans
le repertoire `maison-oleria/` a la date indiquee. Il ne remplace pas un test d'intrusion
(pentest) professionnel avant une mise en production a grande echelle.*
