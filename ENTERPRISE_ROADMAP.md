# Maison Oleria — Roadmap Enterprise (Phases 4 a 11)

Statut : **Phases 4, 5, 6, 7, 8, 9, 10, 11 implementees.**
Stack conservee : Wix (domaine), GitHub (code), Vercel (hebergement),
Storyblok (CMS), Stripe (paiements). Aucune IA cote client — l'IA
reste strictement reservee a l'administration (`/admin/assistant`,
protege par session admin).

---

## Phase 4 — RGPD + Consent Mode V2

- `src/lib/consent/config.ts` — categories de consentement (necessaire,
  analytics, ads, personalisation).
- `src/lib/consent/storage.ts` — persistance du choix utilisateur
  (cookie), lecture/ecriture cote client et serveur.
- `src/components/ConsentBanner.tsx` — banniere de consentement +
  Google Consent Mode V2 (`gtag('consent', ...)`).
- `src/app/confidentialite/page.tsx` — Centre de confidentialite
  (Privacy Center) : preferences par categorie.
- `src/app/mentions-legales/page.tsx`, `src/app/cgv/page.tsx` — pages
  legales referencees depuis `Footer.tsx`.
- Aucun tracking (ads/analytics) ne se declenche avant consentement
  explicite — verifie via `AdScripts.tsx` (Phase 5) qui lit l'etat de
  consentement avant d'injecter le moindre script tiers.
- Compatible France/UE (texte FR, categories explicites, refus =
  defaut).

## Phase 5 — Publicite modulaire

- `src/lib/ads/config.ts` — configuration independante par canal :
  Google Ads, Meta (Facebook/Instagram), TikTok, LinkedIn, Microsoft
  Ads. Chaque canal a son propre flag `..._ENABLED` (`.env.example`)
  — aucune activation automatique, tout est opt-in via variables
  d'environnement.
- `src/components/AdScripts.tsx` — injection conditionnelle des
  scripts (gate : consentement + flag d'activation du canal).

## Phase 6 — Tracking centralise

- `src/lib/tracking/index.ts` — dispatcher unique exposant
  `trackPageView`, `trackLead`, `trackConsultation`, `trackContact`,
  `trackNewsletter`, `trackAppointment`, `trackPurchase`. Chaque
  fonction route automatiquement l'evenement vers les canaux actives
  (Phase 5) et consentis (Phase 4).
- `src/components/PageViewTracker.tsx` — monte globalement dans
  `layout.tsx` (dans un `Suspense`), appelle `trackPageView()` a
  chaque changement de route.
- `trackLead()` appele aux 4 points de creation de lead : formulaire
  de contact, section newsletter, popup newsletter, reservation
  consultation gratuite.
- `trackContact`, `trackNewsletter`, `trackConsultation`,
  `trackAppointment`, `trackPurchase` deja cables dans leurs flux
  respectifs (contact, newsletter, `/reserver`, webhook Stripe).

## Phase 7 — Admin AI Layer (jamais cote visiteur)

Structure isolee sous `src/lib/ai/`, importee uniquement par
`src/app/api/admin/assistant/route.ts` (protege par
`requireSession()`), et affichee sur `src/app/admin/assistant/page.tsx` :

- `providers/types.ts` — types partages `ChatMessage`, `AIProvider`.
- `providers/{openai,gemini,claude,nanobanana,openrouter}.ts` —
  implementation par fournisseur (GPT, Claude, Gemini, Nano Banana,
  OpenRouter).
- `config.ts` — registre des providers + `getActiveProviderName()`
  (env `AI_PROVIDER`), `getProvider()`, `listProviders()`.
- `prompts/index.ts` — prompt systeme de l'assistant admin.
- `services/assistant.ts` — orchestration : contexte leads +
  historique + appel provider (`askAssistant`, `askAdminAssistant`).
- `index.ts` — barrel public re-exportant l'ensemble.
- Cles API via variables d'environnement uniquement
  (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`,
  `NANOBANANA_API_KEY`, `OPENROUTER_API_KEY`).
- `AiUsageLog` (Prisma) trace l'usage par provider pour suivi de
  cout — visible sur `/admin/monitoring`.

## Phase 8 — Sentry + Monitoring

- `sentry.client.config.ts`, `sentry.server.config.ts`,
  `sentry.edge.config.ts` — initialisation Sentry (DSN via
  `NEXT_PUBLIC_SENTRY_DSN`), desactive automatiquement si le DSN
  n'est pas configure.
- `next.config.ts` — enveloppe avec `withSentryConfig()`
  (`SENTRY_ORG`, `SENTRY_PROJECT`).
- `@vercel/analytics` + `@vercel/speed-insights` ajoutes a
  `package.json`, montes dans `src/app/layout.tsx`
  (`<Analytics />`, `<SpeedInsights />`).
- `src/app/admin/monitoring/page.tsx` — dashboard admin lisant
  Prisma `Log`, `AuditLog`, `AiUsageLog` : compteurs (erreurs 24h,
  warnings, evenements securite), table de logs recents, audit trail
  des actions admin, usage IA. Lien direct vers le projet Sentry si
  configure.
- Lien "Monitoring" ajoute a la navigation admin
  (`src/app/admin/layout.tsx`).

## Phase 9 — GitHub Actions + CI/CD

- `.github/workflows/ci.yml` :
  - Declenche sur push/PR vers `main`.
  - Etapes : install (`npm ci`) -> lint (`next lint`) -> typecheck
    (`tsc --noEmit`) -> `prisma generate` -> build (`next build`,
    avec variables d'environnement factices pour permettre le build
    sans secrets reels).
  - Job optionnel `deploy-vercel` (desactive par defaut via variable
    de repo `ENABLE_VERCEL_CLI_DEPLOY`) pour un deploiement explicite
    par CLI si l'integration Git native de Vercel est desactivee.
  - Le chemin recommande reste l'auto-deploy Vercel natif (push sur
    `main` = production, PR = preview) ; ce pipeline agit comme garde-
    fou qualite avant tout merge.

## Phase 10 — SEO Enterprise

- `metadata` (Open Graph, titre/template, keywords, robots) deja
  present dans `src/app/layout.tsx` et etendu page par page.
- `src/app/sitemap.ts` — sitemap dynamique (`/sitemap.xml`),
  extensible aux pages Storyblok.
- `src/app/robots.ts` — `/robots.txt`, `disallow` sur `/admin` et
  `/api`, reference le sitemap.
- Schema.org : a etendre via JSON-LD dans les templates de blocs
  (`bloks/*`) au fur et a mesure du contenu Storyblok — structure
  deja compatible (chaque blok peut injecter son propre `<script
  type="application/ld+json">`).
- Canonicals : geres nativement par Next.js Metadata API
  (`alternates.canonical` a ajouter par page si des variantes d'URL
  apparaissent).
- Objectif Lighthouse > 90 : deja favorise par le rendu
  serveur/statique Next.js, les headers de securite (Phase 2) et le
  chargement paresseux/consenti des scripts tiers (Phases 4/5) qui
  evite un blocage du thread principal par des pixels non essentiels.

## Phase 11 — Scalabilite

Voir `SCALABILITY.md` pour le detail complet. Resume : hebergement
serverless (Vercel) scalant horizontalement sans intervention,
Postgres avec URL poolee, index Prisma deja en place, rate limiting
existant, tracking/ads cote navigateur (sans cout serveur), IA
reservee admin (cout non correle au trafic public), monitoring
(Sentry + Analytics) pour detecter toute degradation, et CI/CD pour
deployer frequemment sans risque de regression. Le projet supporte
10 a 10 000 utilisateurs/jour sans refonte architecturale.

---

## Arborescence finale (fichiers ajoutes/modifies pour les phases 4-11)

```
maison-oleria/
├── .env.example                              # variables Phase 4/5/7/8 documentees
├── .github/
│   └── workflows/
│       └── ci.yml                            # Phase 9 — CI/CD
├── ENTERPRISE_ROADMAP.md                     # ce document
├── SCALABILITY.md                            # Phase 11
├── next.config.ts                            # Phase 8 — withSentryConfig()
├── package.json                              # + @sentry/nextjs, @vercel/analytics, @vercel/speed-insights
├── sentry.client.config.ts                   # Phase 8
├── sentry.server.config.ts                   # Phase 8
├── sentry.edge.config.ts                     # Phase 8
├── prisma/
│   └── schema.prisma                         # Log, AuditLog, AiUsageLog, AnalyticsEvent...
└── src/
    ├── app/
    │   ├── layout.tsx                        # PageViewTracker, Analytics, SpeedInsights, AdScripts
    │   ├── sitemap.ts                        # Phase 10
    │   ├── robots.ts                         # Phase 10
    │   ├── confidentialite/page.tsx          # Phase 4 — Privacy Center
    │   ├── mentions-legales/page.tsx         # Phase 4
    │   ├── cgv/page.tsx                      # Phase 4
    │   ├── reserver/page.tsx                 # trackLead/trackConsultation (Phase 6)
    │   ├── admin/
    │   │   ├── layout.tsx                    # + lien Monitoring
    │   │   ├── page.tsx                      # dashboard leads
    │   │   ├── monitoring/page.tsx           # Phase 8 — dashboard Log/AuditLog/AiUsageLog
    │   │   └── assistant/page.tsx            # Phase 7 — UI assistant admin
    │   └── api/
    │       └── admin/
    │           └── assistant/route.ts        # Phase 7 — askAdminAssistant()
    ├── components/
    │   ├── AdScripts.tsx                     # Phase 5
    │   ├── ConsentBanner.tsx                 # Phase 4
    │   ├── PageViewTracker.tsx               # Phase 6
    │   ├── NewsletterPopup.tsx               # + trackLead
    │   └── bloks/
    │       ├── ContactSection.tsx            # + trackLead
    │       └── NewsletterSection.tsx         # + trackLead
    └── lib/
        ├── consent/
        │   ├── config.ts                     # Phase 4
        │   └── storage.ts                    # Phase 4
        ├── ads/
        │   └── config.ts                      # Phase 5
        ├── tracking/
        │   └── index.ts                       # Phase 6 — dispatcher
        └── ai/                                 # Phase 7 — admin-only
            ├── index.ts                        # barrel public
            ├── config.ts                       # registre providers
            ├── prompts/
            │   └── index.ts
            ├── services/
            │   └── assistant.ts
            └── providers/
                ├── types.ts
                ├── openai.ts
                ├── gemini.ts
                ├── claude.ts
                ├── nanobanana.ts
                └── openrouter.ts
```

---

## Recapitulatif des contraintes respectees

- Wix, GitHub, Vercel, Storyblok, Stripe : **conserves**, aucun
  changement de fournisseur.
- **Aucune IA cote client** : tout le code IA vit sous `src/lib/ai/`,
  importe uniquement par une route API protegee par session admin
  (`requireSession()`), elle-meme affichee uniquement sous
  `/admin/assistant` (layout admin, jamais dans les pages publiques).
- Chaque canal publicitaire (Phase 5) est **independamment**
  activable/desactivable via `.env` — aucune activation automatique.
- Le tracking (Phase 6) ne se declenche **qu'apres consentement**
  (Phase 4), verifie a la fois dans `AdScripts.tsx` et dans le
  dispatcher `lib/tracking/index.ts`.

// File contains AI-generated response based on internal company sources
