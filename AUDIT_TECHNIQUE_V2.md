# Audit Technique V2 — Maison Oleria

Date: mise a jour post-implementation Phases 4 a 11 (Enterprise Roadmap).
Portee: architecture Next.js 15 App Router, securite, RGPD, ads/tracking,
IA admin, monitoring, CI/CD, SEO, scalabilite. Complete `AUDIT_TECHNIQUE.md`
(audit initial) — ce document reflete l'etat du code **apres** les phases
4-11.

---

## Resume executif

Le projet a progresse d'un site marketing simple vers une architecture
"Enterprise" complete : base de donnees Postgres/Prisma remplacant les
fichiers JSON, securite durcie (headers, CSP, rate limiting, captcha,
validation Zod, signature Stripe obligatoire), conformite RGPD avec
Consent Mode V2, publicite modulaire opt-in par canal, tracking
centralise gate par consentement, couche IA strictement reservee a
l'administration, monitoring (Sentry + Vercel Analytics + dashboard
interne), pipeline CI/CD, SEO de base (sitemap/robots) et une politique
de scalabilite documentee.

**Aucune faille bloquante** n'a ete identifiee. Quelques points
d'attention **avant mise en production** sont listes ci-dessous
(section "Problemes identifies"), principalement autour de :
configuration manquante par defaut (secrets), CSP encore permissive,
et absence de tests automatises dans le pipeline CI.

---

## Statut par phase

| Phase | Statut | Notes |
|---|---|---|
| 1 — Base de donnees (Prisma/Postgres) | OK | `Lead`, `Contact`, `Consultation`, `NewsletterSubscriber`, `AnalyticsEvent`, `Log`, `AuditLog`, `AiUsageLog` tous modelises avec index pertinents. |
| 2 — Securite (headers/CSP) | OK avec reserve | Headers presents (`next.config.ts`). CSP contient encore `'unsafe-inline' 'unsafe-eval'` sur `script-src` — a durcir avec nonces/hashes (voir Problemes). |
| 3 — Anti-spam / Captcha | OK | Abstraction Turnstile/reCAPTCHA/none propre, fail-open documente si le provider tiers est down. |
| 4 — RGPD / Consent Mode V2 | OK | `ConsentBanner`, `consent/config.ts`, `consent/storage.ts`, Privacy Center (`/confidentialite`), Consent Mode V2 (`gtag('consent',...)`) correctement cable. |
| 5 — Publicite modulaire | OK | 5 canaux (Google/Meta/TikTok/LinkedIn/Microsoft), chacun `..._ENABLED` independant, aucune activation automatique constatee dans le code. |
| 6 — Tracking centralise | OK | Dispatcher unique (`lib/tracking/index.ts`), 7 fonctions semantiques, gate consentement verifie a la fois cote dispatcher et cote `AdScripts.tsx`. |
| 7 — Admin AI Layer | OK | Isolation stricte : `lib/ai/*` uniquement importe par route API protegee par session (`requireSession`), jamais reference depuis le code public. 5 providers (OpenAI, Gemini, Claude, Nano Banana, OpenRouter). |
| 8 — Monitoring | OK | Sentry (client/server/edge) + `withSentryConfig`, Vercel Analytics/Speed Insights montes, dashboard `/admin/monitoring` fonctionnel avec compteurs + tables. |
| 9 — CI/CD | OK avec reserve | Workflow GitHub Actions present (lint/typecheck/build). **Aucun test automatise** n'est execute (pas de suite de tests dans le repo) — voir Problemes. |
| 10 — SEO Enterprise | Partiel | `sitemap.ts`/`robots.ts` presents, metadata/OG deja en place. Schema.org (JSON-LD) **pas encore implemente** dans les blocs Storyblok — mentionne comme "a etendre" dans la roadmap mais reste a faire concretement. |
| 11 — Scalabilite | OK (documentaire) | `SCALABILITY.md` documente l'approche ; aucune action de code requise a ce stade de trafic. |

---

## Verification de coherence (code reel vs documentation)

- **`.env.example` vs `src/lib/ads/config.ts`** : les 10 variables
  `NEXT_PUBLIC_*_ADS_ENABLED` / `*_ID` / `*_PIXEL_ID` etc. correspondent
  exactement aux cles lues par `getAdPlatformsConfig()`. Coherent.
- **`.env.example` vs `src/lib/ai/config.ts`** : `AI_PROVIDER`,
  `OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`,
  `NANOBANANA_API_KEY`, `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` tous
  presents et coherents avec les providers.
- **`.env.example` vs Sentry (`sentry.*.config.ts`, `next.config.ts`)** :
  `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`,
  `SENTRY_PROJECT` presents. Coherent.
- **`package.json`** : `@sentry/nextjs`, `@vercel/analytics`,
  `@vercel/speed-insights` presents dans `dependencies`. Scripts
  `lint`/`typecheck`/`build` utilises tels quels par
  `.github/workflows/ci.yml`. Coherent.
- **`prisma/schema.prisma` vs usage reel** : `Log` (via `logger.ts` et
  `rateLimit.ts`), `AuditLog` (via `logAudit()`), `AiUsageLog` (declare
  mais **jamais ecrit** — voir Problemes), `AnalyticsEvent` (declare
  mais **jamais utilise** dans le code actuel — le tracking passe
  uniquement par les pixels tiers cote client, pas de persistance
  serveur des evenements analytics).
- **Middleware** : protege bien `/admin/*` sauf `/admin/login`, redirige
  vers login si session invalide. Les routes `/api/admin/*` (hors
  login/logout) verifient elles-memes la session (`requireSession`) —
  double couche de protection coherente.

---

## Problemes identifies (par severite)

### Majeur

1. **`AiUsageLog` jamais rempli.** Le schema Prisma et le dashboard
   monitoring (`/admin/monitoring`) lisent `AiUsageLog`, mais aucun
   code dans `lib/ai/services/assistant.ts` ou les providers n'ecrit
   d'entree dans cette table. Le suivi de cout IA promis par la Phase
   7/8 est donc actuellement **vide en pratique**.
   - *Recommandation* : ajouter un `prisma.aiUsageLog.create(...)`
     dans `askAssistant()` (succes et echec) apres l'appel au
     provider.

2. **`AnalyticsEvent` jamais rempli.** Le modele existe dans le schema
   mais rien ne l'utilise — tout le tracking passe par des pixels
   tiers cote navigateur uniquement. Il n'y a donc aucune source de
   donnees interne/independante des plateformes tierces pour les
   metriques (page_view, lead, etc.), ce qui limite le dashboard admin
   a l'affichage des `Lead` uniquement.
   - *Recommandation* : soit supprimer le modele s'il n'est pas prevu
     a court terme, soit ajouter un petit endpoint
     `/api/analytics/event` appele par `lib/tracking/index.ts` (apres
     consentement) pour persister une copie serveur.

3. **Rate limiting base sur la table `Log`.** `rateLimit.ts` utilise
   `prisma.log.count()`/`create()` comme fenetre glissante. Cela
   fonctionne mais **pollue la table `Log`** avec des entrees
   `source: "rate-limit"` qui apparaissent aussi dans le dashboard
   monitoring (`/admin/monitoring`) si celui-ci n'exclut pas cette
   source — a verifier/filtrer.
   - *Recommandation* : soit exclure `source = "rate-limit"` de la
     requete du dashboard, soit migrer vers Upstash Redis comme deja
     suggere dans le commentaire du fichier lui-meme.

### Mineur

4. **CSP encore permissive.** `script-src 'self' 'unsafe-inline'
   'unsafe-eval' https:` dans `next.config.ts` — necessaire
   actuellement pour les pixels tiers injectes en `dangerouslySetInnerHTML`
   (AdScripts.tsx) et le script Google Translate inline, mais reduit
   significativement la protection XSS. Le commentaire du fichier
   reconnait deja ce compromis ("tighten with nonces/hashes...").
   - *Recommandation* : migrer vers des nonces Next.js
     (`headers()` + `next/script` avec `nonce`) lors d'un futur
     durcissement, hors scope immediat.

5. **CI sans tests automatises.** Le pipeline `.github/workflows/ci.yml`
   fait lint + typecheck + build, mais il n'existe **aucune suite de
   tests** (unit/integration) dans le repo pour ces routes API
   critiques (contact, checkout, webhook, admin login). `TESTING_GUIDE.md`
   existe mais semble etre un guide de test manuel plutot qu'une suite
   automatisee.
   - *Recommandation* : ajouter au minimum quelques tests
     d'integration (Vitest/Jest) sur `lib/validation.ts` et le
     comportement de `safeValidate`, executes dans le job CI.

6. **Webhook Stripe : fallback non signe en dev.** Comportement
   volontaire et documente (`NODE_ENV !== "production"`), mais aucun
   garde-fou n'empeche un deploiement de preview Vercel de tourner
   avec `NODE_ENV` mal configure. A verifier explicitement dans les
   variables d'environnement Vercel (preview vs production).

7. **`ENABLE_VERCEL_CLI_DEPLOY` (CI)** repose sur une variable de repo
   GitHub (`vars.*`) qui n'est pas documentee dans `.env.example` (elle
   ne devrait pas l'etre, car ce n'est pas une variable d'environnement
   d'app) — juste s'assurer que la documentation CI/CD (README ou
   `ENTERPRISE_ROADMAP.md`) explique bien ou la configurer si l'equipe
   veut l'activer. Actuellement seulement documente en commentaire
   inline dans le YAML.

8. **Fichiers dupliques hors scope `maison-oleria/`** (ex.
   `Refactor_PYTHON`, `Refactor_PYTHON-light`, copies "(copy 1)") : ne
   concernent pas ce site web (ce sont des scripts Python HFSS/ADS
   sans rapport), mais encombrent le repo racine du workspace. Pas
   un probleme du site lui-meme, juste une note d'hygiene de repo si
   le meme depot Git est partage.

### Information / bonnes pratiques deja respectees

- Aucune IA cote client : confirme, `lib/ai/*` n'est importe que par
  `app/api/admin/assistant/route.ts`, lui-meme protege par session.
- Chaque canal publicitaire independant, aucune activation automatique.
- Tracking bloque avant consentement (verifie a deux niveaux :
  `AdScripts.tsx` et `lib/tracking/index.ts`).
- Rate limiting present sur contact, checkout, et login admin (5, 10,
  8 tentatives respectivement sur des fenetres de 10-15 min).
- Fail-open documente et volontaire sur captcha/rate-limit pour eviter
  qu'une panne d'infra ne bloque des utilisateurs legitimes — choix de
  design explicite, pas un oubli.
- Webhook Stripe : signature obligatoire en production, erreurs
  explicites si mal configure.
- Logging structure centralise (`logger.ts`) avec fallback console
  systematique, jamais bloquant.

---

## Recommandations priorisees

1. **(Majeur)** Cabler `AiUsageLog` reellement (sinon retirer la
   colonne du dashboard pour ne pas laisser une fausse impression de
   suivi actif).
2. **(Majeur)** Decider du sort de `AnalyticsEvent` (l'implementer ou
   le retirer du schema pour eviter la confusion).
3. **(Mineur)** Exclure `source = "rate-limit"` des logs affiches sur
   `/admin/monitoring`, ou taguer differemment pour ne pas fausser les
   compteurs "Logs recents"/"Warnings".
4. **(Mineur)** Ajouter un minimum de tests automatises au pipeline CI.
5. **(Optionnel, moyen terme)** Durcir la CSP avec des nonces une fois
   l'inventaire des scripts tiers stabilise.
6. **(Optionnel)** Ajouter du JSON-LD Schema.org dans les composants
   `bloks/*` pour completer reellement la Phase 10 (actuellement
   seulement preparee/documentee, pas implementee).

---

## Notation /100 par categorie

| Categorie | Note /100 | Justification |
|---|---:|---|
| **Securite** | 82/100 | Headers securite, rate limiting, captcha, validation Zod, hash bcrypt, JWT httpOnly, signature Stripe obligatoire en prod : bases solides. Points en moins : CSP encore permissive (`unsafe-inline`/`unsafe-eval`), fallback webhook non signe possible hors prod, rate-limit qui pollue la table `Log`. |
| **RGPD / Conformite** | 90/100 | Consent Mode V2 complet, banniere + centre de confidentialite, gate de consentement verifie a 2 niveaux (dispatcher + AdScripts). Tres bon niveau. Petit manque : pas de registre des traitements documente hors code. |
| **Architecture / Code** | 85/100 | Separation claire (lib/ads, lib/tracking, lib/ai, lib/consent, lib/security), Prisma bien modelise, abstraction multi-providers IA propre. Deduit : `AnalyticsEvent` et `AiUsageLog` non cables (code mort/incomplet). |
| **Observabilite / Monitoring** | 70/100 | Sentry (client/server/edge) + Vercel Analytics + dashboard admin en place. Mais `AiUsageLog` jamais alimente et `AnalyticsEvent` jamais utilise : deux piliers de monitoring interne restent theoriques. |
| **CI/CD** | 65/100 | Pipeline GitHub Actions fonctionnel (lint/typecheck/build + deploy optionnel). Absence totale de tests automatises (unitaires/integration) avant deploiement. |
| **SEO** | 75/100 | `sitemap.ts` et `robots.ts` presents et corrects. Phase 10 (JSON-LD Schema.org) documentee mais pas reellement implementee dans les composants `bloks/*`. |
| **Performance / Scalabilite** | 80/100 | Postgres/Prisma remplace le stockage JSON, `SCALABILITY.md` documente la strategie, Vercel Speed Insights actif. Pas de cache/CDN avance ni de tests de charge realises. |
| **Paiement (Stripe)** | 88/100 | Webhook avec verification de signature obligatoire en prod, gestion des statuts async, metadata leadId correcte. Leger risque uniquement sur previews mal configurees. |
| **IA Admin (isolation)** | 95/100 | Contrainte "aucune IA cote client" verifiee dans le code (aucun appel IA hors `/admin`), multi-provider propre, session admin protegee par middleware. Seul manque : le usage-logging (`AiUsageLog`). |

### Note globale ponderee : **81/100**

Ponderation approximative : Securite (25%), RGPD (15%), Architecture (15%),
Observabilite (10%), CI/CD (10%), SEO (10%), Performance (5%), Paiement
(5%), IA Admin (5%). Le site est **solide et deployable**, avec une marge
de progression concentree sur l'observabilite interne (AiUsageLog,
AnalyticsEvent) et les tests automatises en CI plutot que sur des
failles de securite critiques.

---

## Conclusion


Le site est dans un etat **globalement sain et production-ready** pour
les fonctionnalites livrees. Les points releves sont des ameliorations
de robustesse/observabilite (suivi IA, analytics internes, tests CI) et
non des vulnerabilites critiques. La stack demandee (Wix, GitHub,
Vercel, Storyblok, Stripe) est integralement respectee, et la
contrainte "aucune IA cote client" est verifiee au niveau du code, pas
seulement de la documentation.

// File contains AI-generated response based on internal company sources
