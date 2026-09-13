# =============================================================
# deploy.ps1 - Mise a jour automatique du projet maison-oleria
# =============================================================
# Ce script automatise : git add -A -> git commit -> git push
# vers la branche de travail actuelle (ex: nouvelle-version).
# Il ne touche jamais a la branche main/production directement.
#
# Utilisation :
#   .\deploy.ps1
# =============================================================

Write-Host ""
Write-Host "=== ETAPE 1/5 : Verification du depot git ===" -ForegroundColor Cyan

if (!(Test-Path ".git")) {
    Write-Host "ERREUR: aucun dossier .git trouve dans ce dossier." -ForegroundColor Red
    Write-Host "Assure-toi d'executer ce script depuis la racine du projet maison-oleria." -ForegroundColor Red
    exit 1
}

$branch = git rev-parse --abbrev-ref HEAD 2>$null
if ([string]::IsNullOrWhiteSpace($branch)) {
    Write-Host "ERREUR: impossible de determiner la branche git actuelle." -ForegroundColor Red
    exit 1
}
Write-Host "Branche actuelle : $branch" -ForegroundColor Green

if ($branch -eq "main" -or $branch -eq "master") {
    Write-Host ""
    Write-Host "ATTENTION: tu es actuellement sur la branche '$branch' (PRODUCTION)." -ForegroundColor Yellow
    $confirm = Read-Host "Veux-tu vraiment pousser directement en production ? (oui/non)"
    if ($confirm -ne "oui") {
        Write-Host "Annule. Aucune modification envoyee." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "=== ETAPE 2/5 : Ajout des fichiers modifies ===" -ForegroundColor Cyan
git add -A

Write-Host ""
Write-Host "=== ETAPE 3/5 : Fichiers detectes ===" -ForegroundColor Cyan
git status --short

$hasChanges = git status --short
if ([string]::IsNullOrWhiteSpace($hasChanges)) {
    Write-Host ""
    Write-Host "Aucun changement a envoyer. Rien a faire." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "=== ETAPE 4/5 : Message de commit ===" -ForegroundColor Cyan
$message = Read-Host "Decris brievement ce que tu as change (ou appuie sur Entree pour un message automatique)"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Mise a jour automatique - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

git commit -m "$message"

Write-Host ""
Write-Host "=== ETAPE 5/5 : Envoi vers GitHub (branche '$branch') ===" -ForegroundColor Cyan
git push -u origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES : le code a ete envoye sur GitHub (branche '$branch')." -ForegroundColor Green
    Write-Host "Va sur https://vercel.com/dashboard pour verifier le deploiement Preview." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "ERREUR lors du push. Verifie le message ci-dessus (probleme d'authentification GitHub ?)." -ForegroundColor Red
}
Write-Host ""

# File contains AI-generated response based on internal company sources
