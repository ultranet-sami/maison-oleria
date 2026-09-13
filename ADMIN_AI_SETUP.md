# Configuration de l'Administration & de l'Assistant IA

Ce guide couvre deux choses distinctes :
1. **L'authentification admin** (email + mot de passe) pour acceder a `/admin`.
2. **L'assistant IA prive** (`/admin/assistant`), utilisable avec le fournisseur de votre choix (OpenAI, Gemini, Claude, ou une passerelle personnalisee "NanoBanana").

> Le chatbot public du site (`src/components/Chatbot.tsx`) est completement separe et ne necessite aucune cle API — il n'est pas concerne par ce document.

---

## 1. Authentification Admin

Il n'y a pas de base de donnees d'utilisateurs : un seul compte admin est defini via des variables d'environnement.

### Variables requises (Vercel -> Project Settings -> Environment Variables)

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | L'email de connexion de l'admin |
| `ADMIN_PASSWORD_HASH` | Le hash bcrypt du mot de passe admin |
| `SESSION_SECRET` | Une longue chaine aleatoire utilisee pour signer le cookie de session (JWT) |

### Generer le hash du mot de passe

En local, avec Node.js installe :

```bash
node -e "console.log(require('bcryptjs').hashSync('votre_mot_de_passe', 10))"
```

Copiez le resultat (commence par `$2a$` ou `$2b$`) dans `ADMIN_PASSWORD_HASH`.

### Generer SESSION_SECRET

```bash
openssl rand -hex 32
```

### Comment ca fonctionne

- `POST /api/admin/login` verifie l'email/mot de passe et pose un cookie httpOnly signe (`oleria_admin_session`).
- `src/middleware.ts` protege toutes les pages sous `/admin/*` (sauf `/admin/login`) : sans session valide, l'utilisateur est redirige vers `/admin/login`.
- `POST /api/admin/logout` supprime le cookie de session.

Sans ces 3 variables configurees, `/api/admin/login` renvoie une erreur claire (503) au lieu de planter.

---

## 2. Assistant IA (multi-fournisseur)

Choisissez **un** fournisseur en definissant `AI_PROVIDER` dans Vercel (`openai`, `gemini`, `claude`, ou `nanobanana`), puis ajoutez la cle correspondante.

### OpenAI (ChatGPT)

| Variable | Description |
|---|---|
| `AI_PROVIDER` | `openai` |
| `OPENAI_API_KEY` | Cle API depuis [platform.openai.com](https://platform.openai.com/api-keys) |
| `OPENAI_MODEL` | (optionnel) Modele a utiliser, defaut : `gpt-4o-mini` |

### Google Gemini

| Variable | Description |
|---|---|
| `AI_PROVIDER` | `gemini` |
| `GEMINI_API_KEY` | Cle API depuis [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| `GEMINI_MODEL` | (optionnel) defaut : `gemini-1.5-flash` |

### Anthropic Claude

| Variable | Description |
|---|---|
| `AI_PROVIDER` | `claude` |
| `ANTHROPIC_API_KEY` | Cle API depuis [console.anthropic.com](https://console.anthropic.com) |
| `ANTHROPIC_MODEL` | (optionnel) defaut : `claude-3-5-sonnet-20241022` |

### Passerelle personnalisee ("NanoBanana")

Pour utiliser une passerelle interne ou tout service compatible avec l'API OpenAI (chat completions) :

| Variable | Description |
|---|---|
| `AI_PROVIDER` | `nanobanana` |
| `NANOBANANA_API_KEY` | Cle API de votre passerelle |
| `NANOBANANA_BASE_URL` | URL de base de l'API (ex: `https://votre-gateway.com/v1`) |
| `NANOBANANA_MODEL` | (optionnel) defaut : `default` |

### Comment ca fonctionne

- `src/lib/ai/index.ts` centralise la selection du fournisseur actif et expose `askAssistant()`.
- `src/lib/ai/providers/*.ts` contient une implementation REST independante par fournisseur (aucun SDK supplementaire requis).
- `POST /api/admin/assistant` construit un contexte a partir des leads recents (`src/lib/leads.ts`) et l'injecte comme message systeme, permettant a l'assistant de repondre a des questions comme "Quelles formules sont les plus demandees ce mois-ci ?" ou de rediger un email de relance pour un client precis.
- La page `/admin/assistant` fournit une interface de chat simple pour interagir avec l'assistant.

Si aucune cle n'est configuree pour le fournisseur actif, l'assistant repond avec un message explicite au lieu de planter.

<!-- File contains AI-generated response based on internal company sources -->
