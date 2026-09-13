# Configuration des Paiements (Stripe + Klarna)

Ce guide explique comment activer les paiements en ligne (carte bancaire et Klarna) sur le site Maison Oleria.

## 1. Creer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com) et creez un compte (ou connectez-vous).
2. Completez les informations de votre entreprise (Stripe peut fonctionner en mode Test sans verification complete).

## 2. Recuperer vos cles API

1. Dans le Dashboard Stripe, allez dans **Developers -> API keys**.
2. Copiez :
   - **Secret key** (`sk_test_...` en mode test, `sk_live_...` en production)

## 3. Activer Klarna

1. Dans le Dashboard Stripe, allez dans **Settings -> Payment methods**.
2. Activez **Klarna** (disponible pour les paiements en EUR selon le pays de votre compte).
3. Klarna a ses propres regles de montant minimum/maximum et de devise ; Stripe filtre automatiquement l'affichage de Klarna a la caisse si les criteres ne sont pas remplis. Aucune configuration supplementaire n'est necessaire dans le code.

## 4. Variables d'environnement (Vercel)

Dans **Vercel -> Project Settings -> Environment Variables**, ajoutez :

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Votre cle secrete Stripe (`sk_test_...` ou `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook (voir etape 5) |
| `NEXT_PUBLIC_SITE_URL` | URL publique de votre site (ex: `https://maison-oleria.com`), utilisee pour les redirections apres paiement |

## 5. Configurer le Webhook Stripe

1. Dans le Dashboard Stripe, allez dans **Developers -> Webhooks -> Add endpoint**.
2. URL de l'endpoint : `https://votre-domaine.com/api/webhook`
3. Evenements a envoyer :
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
4. Une fois cree, copiez le **Signing secret** (`whsec_...`) et ajoutez-le comme `STRIPE_WEBHOOK_SECRET` dans Vercel.

## 6. Tester en local (optionnel)

Utilisez la Stripe CLI pour transferer les evenements webhook vers votre serveur local :

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## Comment ca fonctionne dans le code

- `src/lib/stripe.ts` — client Stripe partage (server-side uniquement).
- `src/app/api/checkout/route.ts` — cree une Stripe Checkout Session (carte + Klarna) et enregistre un lead "pending" via `src/lib/leads.ts`.
- `src/app/api/webhook/route.ts` — recoit les evenements Stripe, met a jour le statut du lead (`paid`/`failed`) et envoie un email de confirmation (via Resend, si configure).
- `src/app/reserver/page.tsx` (Etape 6) — appelle `/api/checkout`, redirige le client vers la page de paiement Stripe, puis revient sur `/reserver?payment=success|cancelled&leadId=...`.

Sans `STRIPE_SECRET_KEY` configure, l'API `/api/checkout` renvoie une erreur claire (503) au lieu de planter, pour que le reste du site continue de fonctionner normalement.

<!-- File contains AI-generated response based on internal company sources -->
