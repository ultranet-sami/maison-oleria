# Configuration des Emails (Resend + Mailchimp)

## 1. Resend (envoi d'emails transactionnels)

Utilise pour : notifications de contact, email de bienvenue newsletter, confirmation de paiement.

1. Creez un compte sur [resend.com](https://resend.com) (connexion possible via GitHub).
2. Allez dans **Domains** -> ajoutez votre domaine (ex: `maison-oleria.com`) -> suivez les instructions DNS (SPF/DKIM).
3. Allez dans **API Keys** -> creez une cle -> copiez-la.
4. Dans **Vercel -> Project Settings -> Environment Variables**, ajoutez :

   | Variable | Description |
   |---|---|
   | `RESEND_API_KEY` | Votre cle API Resend (`re_...`) |

Sans domaine verifie, Resend limite l'envoi a l'adresse email associee au compte — suffisant pour les tests.

## 2. Mailchimp (liste newsletter, optionnel)

1. Creez un compte sur [mailchimp.com](https://mailchimp.com).
2. Creez une liste/audience dediee a Maison Oleria.
3. Recuperez votre **API Key** et votre **Audience ID** (Settings -> Audience name and defaults).
4. Ajoutez dans Vercel :

   | Variable | Description |
   |---|---|
   | `MAILCHIMP_API_KEY` | Votre cle API Mailchimp |
   | `MAILCHIMP_AUDIENCE_ID` | L'ID de votre audience/liste |
   | `MAILCHIMP_SERVER` | Le prefixe serveur de votre compte (ex: `us1`, `us21`...) visible dans l'URL du dashboard |

## Comment ca fonctionne dans le code

- `src/app/api/contact/route.ts` — valide et enregistre chaque soumission du formulaire de contact via `saveLead()` (voir `src/lib/leads.ts`), puis envoie une notification interne par email si `RESEND_API_KEY` est configure.
- `src/app/api/newsletter/route.ts` — valide et enregistre chaque inscription newsletter via `saveLead()`, puis (si configures) synchronise avec Mailchimp et envoie un email de bienvenue via Resend.
- `src/app/api/webhook/route.ts` — envoie un email de confirmation de paiement via Resend une fois qu'un paiement Stripe est confirme.

Toutes ces integrations sont **best-effort** : si les cles ne sont pas configurees, le lead est tout de meme enregistre localement (dans `data/leads.json`) et aucune erreur n'est renvoyee au visiteur.

<!-- File contains AI-generated response based on internal company sources -->
