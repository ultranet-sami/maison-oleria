# Scalabilite — Maison Oleria (Phase 11)

Ce document decrit comment le projet actuel scale de 10 a 10 000
utilisateurs/jour **sans refonte majeure**, en s'appuyant uniquement
sur la stack conservee (Vercel, Storyblok, Prisma/Postgres, Stripe).

## 1. Hebergement (Vercel)

- Next.js App Router deploye sur Vercel : scaling horizontal automatique,
  fonctions serverless/Edge par route, pas de serveur a dimensionner
  manuellement.
- Pages statiques (marketing, mentions legales, CGV, confidentialite)
  sont pre-rendues / ISR — cout constant quel que soit le trafic.
- `sitemap.ts` / `robots.ts` (Phase 10) sont generes a la demande, pas
  de cout de build supplementaire notable.

## 2. Base de donnees (PostgreSQL via Prisma)

- Utiliser une URL **pooled** (Supabase pgbouncer / Neon pooled
  endpoint) pour `DATABASE_URL` afin d'eviter l'epuisement de
  connexions en environnement serverless (deja documente dans
  `prisma/schema.prisma` et `.env.example`).
- Index deja presents sur les colonnes de recherche frequentes
  (`email`, `type`, `createdAt`, `level`, `source`, `actor`, `action`)
  couvrent les requetes actuelles (`admin` dashboard, `monitoring`
  dashboard) jusqu'a plusieurs millions de lignes sans optimisation
  additionnelle.
- Prochaine etape naturelle si le volume de `Log`/`AnalyticsEvent`
  devient tres important : partitionner par date ou purger/archiver
  les entrees anciennes (job cron Vercel ou Supabase Edge Function) —
  aucun changement de schema requis, seulement une politique de
  retention.

## 3. Rate limiting & anti-spam

- `src/lib/security/rateLimit.ts` et l'abstraction Turnstile/reCAPTCHA
  (`src/lib/security/captcha.ts`) protegent deja les endpoints publics
  (contact, newsletter, checkout, admin login) contre les pics de
  trafic abusif independamment du volume d'utilisateurs legitimes.

## 4. Tracking & Ads (Phase 5/6)

- Le dispatcher centralise (`src/lib/tracking/index.ts`) et
  `AdScripts.tsx` chargent les scripts tiers de facon paresseuse et
  conditionnee au consentement — aucun cout serveur, le scaling est
  entierement cote navigateur/plateformes tierces (Google/Meta/etc.).

## 5. IA Admin (Phase 7)

- L'IA est strictement reservee a l'administration (jamais exposee
  aux visiteurs), donc son cout/latence n'est pas correle au trafic
  public. Le modele multi-provider (`src/lib/ai/config.ts`) permet de
  changer de fournisseur (cout/latence) sans changement de code.
- `AiUsageLog` (Prisma) permet de suivre la consommation et d'alerter
  avant un depassement de budget.

## 6. Monitoring (Phase 8)

- Sentry (client/server/edge) + Vercel Analytics/Speed Insights
  donnent une visibilite immediate sur toute degradation de
  performance liee a la charge, sans instrumentation supplementaire
  a ajouter en cas de pic de trafic.
- Le dashboard `/admin/monitoring` (Prisma `Log`/`AuditLog`) reste
  performant grace aux index existants et a une limite de lecture
  (`take: 50` / `take: 20`) qui ne degrade pas avec la volumetrie.

## 7. CI/CD (Phase 9)

- Le pipeline GitHub Actions (`.github/workflows/ci.yml`) garantit
  qu'aucune regression de build/typecheck/lint n'atteint la
  production, quel que soit le rythme de deploiement (plusieurs fois
  par jour en cas de forte activite de l'equipe).

## Palier suivant (si necessaire au-dela de 10 000/jour)

- Passage a un plan Vercel/Postgres avec plus de connexions/CPU
  (changement de configuration, pas de code).
- Mise en cache HTTP/CDN plus agressive sur les pages Storyblok via
  `revalidate` ISR.
- Deplacer les logs volumineux (`Log`, `AnalyticsEvent`) vers un
  entrepot dedie (ex. ClickHouse, BigQuery) si le dashboard interne
  devient trop lourd — optionnel, non requis pour l'echelle actuelle.

// File contains AI-generated response based on internal company sources
