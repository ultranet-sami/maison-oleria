# Plan Enterprise Grade — Maison Oleria

Objectif : faire evoluer le projet de "Production Ready" (score global
81/100) vers "Enterprise Grade" (cibles ci-dessous), sans refonte
majeure, en s'appuyant sur l'architecture existante (Next.js 15,
Prisma/Postgres, Sentry, Vercel, Storyblok, Stripe).

---

## 1. Score actuel -> Score cible -> Ecart

| Categorie | Actuel | Cible | Ecart |
|---|---:|---:|---:|
| Securite | 82 | >95 | +13 |
| Monitoring / Observabilite | 70 | >95 | +25 |
| CI/CD | 65 | >90 | +25 |
| SEO | 75 | >95 | +20 |
| Scalabilite | 80 | >90 | +10 |
| Architecture | 85 | >95 | +10 |
| RGPD (non demande, deja fort) | 90 | 90 | 0 |
| Paiement Stripe (non demande) | 88 | 88 | 0 |
| IA Admin (non demande) | 95 | 95 | 0 |

Les 6 categories prioritaires demandees representent l'essentiel du
travail. RGPD/Stripe/IA Admin restent stables (deja >88), on ne les
degrade pas mais on en profite pour renforcer securite/monitoring qui
les traversent (ex: logs Stripe, logs IA).

---

## 2. PARTIE 1 — Observabilite avancee

### A faire
- **Sentry complet** : activer `tracesSampleRate`/`profilesSampleRate`
  reels (actuellement bas ou 0 en dev), `Sentry.captureException` dans
  tous les catch critiques (webhook Stripe, IA, Storyblok fetch),
  `Sentry.setTag`/`setContext` par domaine (stripe/storyblok/ai/api).
- **Logs structures** : etendre `lib/logger.ts` pour accepter un champ
  `domain` (`api`|`stripe`|`storyblok`|`ai`|`auth`|`security`) et un
  `severity` normalise, au lieu du `source` libre actuel.
- **Error Tracking par domaine** : wrapper dedie
  `lib/monitoring/reportError.ts` qui logge en DB (`Log`) ET envoie a
  Sentry avec contexte (route, userId/session, payload sanitize).
- **Distributed Tracing** : utiliser les spans automatiques Sentry
  Next.js (deja disponibles via `@sentry/nextjs`) + spans manuels
  autour des appels externes (Stripe, Storyblok CMA/CDN, providers IA)
  via `Sentry.startSpan()`.
- **Performance Monitoring** : activer Web Vitals (déjà partiellement
  via Vercel Speed Insights) + Sentry Performance sur les routes API
  lentes (checkout, webhook, assistant IA).
- **Alerting** : configurer des alertes Sentry (taux d'erreur > seuil,
  latence P95 > seuil) + une alerte custom (email/webhook) sur echec
  paiement Stripe ou echec provider IA repete.
- **Dashboard Administration** : etendre `/admin/monitoring` avec
  widgets par domaine (API errors, Stripe errors, Storyblok errors, IA
  errors, anomalies utilisateur/rate-limit) au lieu du flux global
  actuel.

### Fichiers a modifier/creer
- `src/lib/monitoring/reportError.ts` (nouveau)
- `src/lib/logger.ts` (etendre schema domain/severity)
- `prisma/schema.prisma` (ajouter champ `domain` sur `Log`, migration)
- `sentry.client.config.ts` / `sentry.server.config.ts` / `sentry.edge.config.ts` (tracesSampleRate reel, tags par defaut)
- `src/app/api/webhook/route.ts`, `src/app/api/admin/assistant/route.ts`, `src/lib/storyblok.ts` (brancher reportError)
- `src/app/admin/monitoring/page.tsx` (widgets par domaine)

### Priorite / Impact / Temps
- Priorite : **Haute**
- Impact : Monitoring 70 -> 90+ (visibilite reelle sur incidents prod)
- Temps estime : 3-4 jours

---

## 3. PARTIE 2 — Audit Logs

### A faire
- `AuditLog` existe deja (Prisma) mais sous-utilise -> etendre son
  usage a **toutes** les actions sensibles (pas seulement quelques
  unes).
- Creer 2 nouveaux modeles dedies pour clarifier la lecture du
  dashboard, plutot que de tout entasser dans `Log`/`AuditLog` :
  - `AdminActionLog` (adminId, action, target, metadata, ip, createdAt)
  - `SecurityLog` (type: login_success/login_fail/rate_limited/suspicious, ip, userAgent, metadata, createdAt)
- Journaliser explicitement :
  - Connexions admin (succes) -> `SecurityLog`
  - Echecs de connexion -> `SecurityLog` (+ compteur pour detection brute-force)
  - Modifications Storyblok (si webhook Storyblok -> revalidation) -> `AdminActionLog`
  - Creation de rendez-vous (`/reserver`, `Consultation`) -> `AdminActionLog` ou `AuditLog` deja partiellement fait
  - Actions administrateur (login, logout, changement config IA, envoi manuel email) -> `AdminActionLog`
  - Paiements Stripe (webhook events) -> `AuditLog` deja fait pour partie, a systematiser pour tous les types d'evenements Stripe traites
  - Activites suspectes (rate-limit depasse, captcha echoue repete, IP bannie) -> `SecurityLog`

### Fichiers a modifier/creer
- `prisma/schema.prisma` (ajout `AdminActionLog`, `SecurityLog` + migration)
- `src/lib/security/auditTrail.ts` (nouveau, helpers `logAdminAction()`, `logSecurityEvent()`)
- `src/app/api/admin/login/route.ts` (log success/fail)
- `src/app/api/webhook/route.ts` (log paiement systematique)
- `src/lib/security/rateLimit.ts` (log securite si seuil depasse)
- `src/app/admin/monitoring/page.tsx` (nouvel onglet "Securite/Audit")

### Priorite / Impact / Temps
- Priorite : **Haute** (impacte Securite + Monitoring)
- Impact : Securite 82 -> 90+, Monitoring +
- Temps estime : 2-3 jours

---

## 4. PARTIE 3 — Tests automatises

### A faire
- **Unit Tests (Vitest)** : `lib/validation.ts` (schemas Zod),
  `lib/ads/config.ts` (isPlatformEnabled), `lib/tracking/index.ts`
  (dispatch + gating consentement), `lib/security/rateLimit.ts`
  (logique fenetre), `lib/consent/storage.ts`.
- **Integration Tests (Vitest + supertest-like via Next test utils ou
  Playwright API testing)** : routes `/api/contact`, `/api/checkout`
  (mock Stripe), `/api/webhook` (signature valide/invalide),
  `/api/admin/login` (succes/echec/rate-limit).
- **End-to-End Tests (Playwright)** : parcours cle : consultation de
  la home, consentement cookies, envoi formulaire contact, tentative
  connexion admin, navigation `/admin` proteg­ee.
- Objectif : bloquer toute regression fonctionnelle avant deploiement.

### Fichiers a creer
- `vitest.config.ts`, `tests/unit/*.test.ts`
- `tests/integration/api/*.test.ts`
- `playwright.config.ts`, `tests/e2e/*.spec.ts`
- `package.json` (scripts `test`, `test:e2e`)

### Priorite / Impact / Temps
- Priorite : **Haute**
- Impact : CI/CD 65 -> 85+, Architecture +5 (fiabilite/maintenabilite)
- Temps estime : 5-7 jours (couverture raisonnable, pas exhaustive)

---

## 5. PARTIE 4 — CI/CD professionnel

### A faire
- Etendre `.github/workflows/ci.yml` :
  - Jobs `lint`, `typecheck`, `test:unit`, `test:integration`,
    `test:e2e` (Playwright, sur PR uniquement ou nightly si trop long),
    `build`.
  - **Scan de vulnerabilites** : `npm audit --audit-level=high` ou
    integration Snyk/GitHub Dependabot alerts + `CodeQL` (GitHub natif,
    gratuit sur repos publics/prive avec Advanced Security).
  - **Blocage de deploiement** : le job `deploy` (Vercel CLI) doit
    dependre (`needs:`) de tous les jobs precedents ; si build, tests
    ou scan echouent -> deploiement bloque automatiquement (deja le
    comportement naturel de GitHub Actions avec `needs`, a verifier
    explicitement dans le fichier actuel).
  - Ajouter un job `security-scan` avec seuil configurable (bloque si
    vulnerabilite **critique**, warning seulement si moyenne/faible).

### Fichiers a modifier
- `.github/workflows/ci.yml` (jobs supplementaires + `needs` stricts)
- `package.json` (scripts `audit`, `test:unit`, `test:e2e`)

### Priorite / Impact / Temps
- Priorite : **Haute**
- Impact : CI/CD 65 -> 90+
- Temps estime : 1-2 jours (une fois les tests de Partie 3 en place)

---

## 6. PARTIE 5 — Backups et reprise d'activite

### A faire
- **Sauvegardes automatiques** : activer les backups automatiques du
  provider Postgres (Neon/Supabase/Vercel Postgres selon l'hebergeur
  choisi) — point de config infra, pas de code.
- **Strategie de restauration** : documenter la procedure exacte
  (point-in-time recovery si disponible, export `pg_dump` hebdomadaire
  vers stockage externe en complement).
- **Disaster Recovery Plan** : document dedie avec RTO/RPO cibles,
  scenarios (perte DB, perte Vercel, compromission secrets, panne
  Stripe/Storyblok), contacts et procedure pas-a-pas.

### Fichiers a creer
- `DISASTER_RECOVERY.md` (RTO/RPO, procedure restauration, risques
  metiers, contacts, checklist post-incident)

### Priorite / Impact / Temps
- Priorite : **Moyenne** (critique en cas d'incident, mais pas visible
  dans les scores demandes directement — impacte indirectement
  Scalabilite/Architecture)
- Impact : Scalabilite +5, confiance operationnelle
- Temps estime : 1 jour (documentation) + config infra hebergeur (hors code)

---

## 7. PARTIE 6 — SEO avance

### A faire
- **Sitemap dynamique** : verifier que `sitemap.ts` tire les slugs
  Storyblok en temps reel (pas une liste statique) — a etendre si figee.
- **Metadata Storyblok** : s'assurer que chaque page genere `metadata`
  (title/description) depuis les champs Storyblok, pas un fallback
  générique partout.
- **Open Graph / Twitter Cards** : ajouter systematiquement
  `openGraph`/`twitter` dans `generateMetadata()` de
  `app/[[...slug]]/page.tsx`.
- **Schema.org** : ajouter JSON-LD :
  - `Organization`/`LocalBusiness` (global, layout)
  - `FAQPage` (dans `bloks/Faq.tsx`)
  - `BreadcrumbList` (fil d'ariane si present, sinon a ajouter)
  - `Service` pour les pages prestations

### Fichiers a modifier/creer
- `src/app/[[...slug]]/page.tsx` (generateMetadata enrichi)
- `src/components/bloks/Faq.tsx` (JSON-LD FAQPage)
- `src/components/JsonLd/*.tsx` (nouveau : Organization, Breadcrumb, Service)
- `src/app/sitemap.ts` (verifier dynamisme)

### Priorite / Impact / Temps
- Priorite : **Moyenne-Haute**
- Impact : SEO 75 -> 90+
- Temps estime : 2-3 jours

---

## 8. PARTIE 7 — Analytics metier

### A faire
- Cabler enfin `AnalyticsEvent` (deja identifie dans l'audit V2) :
  endpoint `/api/analytics/event` appele par
  `lib/tracking/index.ts` (uniquement si consentement analytics), qui
  persiste `type` (visite/lead/formulaire/consultation/reservation/
  conversion), `source`/`utm`, `metadata`.
- Dashboard admin dedie : taux de conversion (leads/visites), nombre
  de leads par periode, sources de trafic (utm_source agrege), pages
  les plus performantes (par `path` sur `AnalyticsEvent`).

### Fichiers a creer/modifier
- `src/app/api/analytics/event/route.ts` (nouveau)
- `src/lib/tracking/index.ts` (appel serveur en plus des pixels)
- `src/app/admin/analytics/page.tsx` (nouveau dashboard dedie)

### Priorite / Impact / Temps
- Priorite : **Haute** (deja identifie comme Majeur dans l'audit V2)
- Impact : Monitoring +, Architecture + (retire le "code mort")
- Temps estime : 2-3 jours

---

## 9. PARTIE 8 — Securite avancee

### A faire
- **CSP** : retirer `unsafe-inline`/`unsafe-eval` en migrant vers
  nonces (`next/script` + header `nonce` genere par requete dans
  `middleware.ts`).
- **Permissions-Policy** : ajouter/durcir (camera, microphone,
  geolocation -> `()` si non utilises).
- **JWT Security** : verifier duree de vie courte + rotation de la
  cle `JWT_SECRET`, envisager refresh token si sessions longues
  necessaires.
- **Secret Management** : documenter la rotation des secrets
  (Stripe, Storyblok, IA providers, JWT) — utiliser Vercel
  Environment Variables avec rotation planifiee, pas de secrets en
  clair dans les logs (verifier `logger.ts` sanitize deja les payloads
  sensibles).
- **Detection d'activites suspectes** : etendre `SecurityLog` (Partie
  2) avec regles simples (X echecs login en Y minutes -> alerte),
  IP a surveiller.
- **Alertes securite** : brancher sur Sentry ou email (Resend) pour
  notifier l'admin en cas de pattern suspect.

### Fichiers a modifier
- `src/middleware.ts` (nonce CSP par requete)
- `next.config.ts` (CSP avec nonce, Permissions-Policy durcie)
- `src/lib/auth.ts` (revue duree JWT)
- `src/lib/security/auditTrail.ts` (regles de detection, cf Partie 2)

### Priorite / Impact / Temps
- Priorite : **Haute**
- Impact : Securite 82 -> 95+
- Temps estime : 3-4 jours

---

## 10. PARTIE 9 — Administration centralisee

### A faire
- Unifier la navigation admin (`src/app/admin/layout.tsx`) pour
  regrouper en un seul menu : Logs, Formulaires/Leads, Consultations,
  Paiements, Analytics (Partie 7), Parametres, Fournisseurs IA,
  Securite/Audit (Partie 2).
- Chaque section = une route `/admin/<section>` deja existante pour
  certaines (`/admin`, `/admin/monitoring`, `/admin/assistant`) —
  ajouter les manquantes (`/admin/analytics`, `/admin/security`,
  `/admin/settings`).

### Fichiers a modifier/creer
- `src/app/admin/layout.tsx` (navigation unifiee)
- `src/app/admin/security/page.tsx` (nouveau)
- `src/app/admin/settings/page.tsx` (nouveau, si pas deja present)

### Priorite / Impact / Temps
- Priorite : **Moyenne**
- Impact : Architecture +, experience admin
- Temps estime : 1-2 jours

---

## 11. Synthese — Priorites et impact

| # | Amelioration | Priorite | Categories impactees | Impact estime | Temps |
|---|---|---|---|---|---|
| 1 | Observabilite avancee (Sentry, tracing, dashboard) | Haute | Monitoring, Securite | Monitoring 70->90+ | 3-4 j |
| 2 | Audit Logs (AdminActionLog, SecurityLog) | Haute | Securite, Monitoring | Securite +8 | 2-3 j |
| 3 | Tests automatises (Vitest/Playwright) | Haute | CI/CD, Architecture | CI/CD 65->85+ | 5-7 j |
| 4 | CI/CD pro (scan vuln, blocage strict) | Haute | CI/CD | CI/CD ->90+ | 1-2 j |
| 5 | Backups / DR Plan | Moyenne | Scalabilite | Scalabilite +5 | 1 j + infra |
| 6 | SEO avance (JSON-LD, OG, sitemap dynamique) | Moyenne-Haute | SEO | SEO 75->90+ | 2-3 j |
| 7 | Analytics metier (AnalyticsEvent cable) | Haute | Monitoring, Architecture | Monitoring +, dette technique resolue | 2-3 j |
| 8 | Securite avancee (CSP nonce, detection) | Haute | Securite | Securite ->95+ | 3-4 j |
| 9 | Administration centralisee | Moyenne | Architecture | Architecture ->90+ | 1-2 j |

**Total estime : ~20-29 jours-homme** pour couvrir l'ensemble des 6
categories cibles (Securite, Monitoring, CI/CD, SEO, Scalabilite,
Architecture), realisable en sprints iteratifs (chaque partie est
independante et deployable seule).

### Ordre d'execution recommande
1. Partie 3 (Tests) + Partie 4 (CI/CD) en parallele — fondation avant
   tout le reste, evite les regressions pendant les phases suivantes.
2. Partie 1 (Observabilite) + Partie 2 (Audit Logs) — visibilite avant
   d'attaquer la securite.
3. Partie 8 (Securite avancee) + Partie 7 (Analytics) — corrige les
   points Majeurs identifies dans l'audit V2.
4. Partie 6 (SEO) + Partie 9 (Administration) — finition.
5. Partie 5 (Backup/DR) — a documenter en parallele de tout, sans
   dependance technique.

---

## 12. Score cible projete apres mise en oeuvre complete

| Categorie | Avant | Apres (projete) |
|---|---:|---:|
| Securite | 82 | 96 |
| Monitoring | 70 | 95 |
| CI/CD | 65 | 92 |
| SEO | 75 | 93 |
| Scalabilite | 80 | 90 |
| Architecture | 85 | 95 |

Ces projections sont des estimations qualitatives basees sur la
couverture fonctionnelle des ameliorations listees ; une revalidation
par audit V3 est recommandee apres chaque grande phase (1-4) pour
mesurer le score reel.

// File contains AI-generated response based on internal company sources
