# Workflow automatise Git + Vercel - Maison Oleria

Ce document explique comment utiliser les scripts d'automatisation
fournis dans ce projet pour deployer tes changements sans avoir a
retaper les commandes git manuellement.

## Fichiers ajoutes

| Fichier | Role |
|---|---|
| `deploy.ps1` / `deploy.bat` | Envoie tes changements vers ta branche de travail (Preview Vercel) |
| `merge-to-main.ps1` / `merge-to-main.bat` | Publie la version validee en production (branche `main`) |
| `.gitignore` | Empeche `node_modules/`, `.next/`, `.env`, etc. d'etre envoyes sur GitHub |

## Utilisation au quotidien

### 1. Tu modifies ton projet
Modifie le code, les textes, les images, etc. normalement dans le dossier.

### 2. Tu envoies tes changements en test (Preview)
Double-clique sur **`deploy.bat`** (ou tape `.\deploy.ps1` dans PowerShell).

Le script va automatiquement :
1. Verifier que le depot git est valide
2. Ajouter tous les fichiers modifies (`git add -A`)
3. Te demander une courte description du changement
4. Creer le commit
5. Pousser vers GitHub sur ta branche actuelle (ex: `nouvelle-version`)

### 3. Tu verifies le resultat sur Vercel
Va sur https://vercel.com/dashboard -> ton projet `maison-oleria`.
Vercel cree automatiquement une URL de Preview pour ta branche.
Teste bien le site sur cette URL avant de continuer.

### 4. Tu publies en production (seulement si tout est valide)
Double-clique sur **`merge-to-main.bat`** (ou tape `.\merge-to-main.ps1`).

Le script va automatiquement :
1. Basculer sur la branche `main`
2. Recuperer la derniere version de `main`
3. Fusionner ta branche de travail dedans
4. Pousser vers GitHub -> Vercel redeploie automatiquement le site en ligne
5. Te remettre sur ta branche de travail pour continuer a developper

## Regles importantes

- Ne travaille jamais directement sur `main`. Reste toujours sur ta
  branche de travail (`nouvelle-version` ou une nouvelle branche
  `feature/...` pour chaque gros changement).
- Verifie toujours le Preview Vercel avant de lancer `merge-to-main`.
- Si `merge-to-main.ps1` signale un conflit, ne panique pas : ouvre les
  fichiers en conflit (marques avec `<<<<<<<`), garde la bonne version,
  puis relance manuellement :
  ```
  git add -A
  git commit -m "Resolution conflits"
  git push origin main
  ```

## Creer une nouvelle branche de travail pour un gros changement (optionnel)

Si tu veux isoler un gros changement (ex: nouvelle fonctionnalite),
tu peux creer une branche dediee avant de commencer :

```powershell
git checkout main
git pull origin main
git checkout -b feature/nom-du-changement
```

Puis utilise `deploy.ps1` comme d'habitude : il detecte automatiquement
le nom de la branche sur laquelle tu es et pousse au bon endroit.
