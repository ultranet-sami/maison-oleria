# =============================================================
# merge-to-main.ps1 - Publier la version validee en PRODUCTION
# =============================================================
# A utiliser UNIQUEMENT quand tu as verifie que le deploiement
# Preview Vercel de ta branche de travail fonctionne correctement.
#
# Ce script fusionne ta branche de travail (ex: nouvelle-version)
# dans "main" et pousse vers GitHub, ce qui declenche automatiquement
# le redeploiement en PRODUCTION sur Vercel.
#
# Utilisation :
#   .\merge-to-main.ps1
# =============================================================

Write-Host ""
Write-Host "=== Publication vers la PRODUCTION (branche main) ===" -ForegroundColor Cyan

if (!(Test-Path ".git")) {
    Write-Host "ERREUR: aucun depot git trouve ici." -ForegroundColor Red
    exit 1
}

$workBranch = git rev-parse --abbrev-ref HEAD 2>$null
if ([string]::IsNullOrWhiteSpace($workBranch)) {
    Write-Host "ERREUR: impossible de determiner la branche actuelle." -ForegroundColor Red
    exit 1
}

if ($workBranch -eq "main" -or $workBranch -eq "master") {
    Write-Host "Tu es deja sur la branche main. Rien a fusionner." -ForegroundColor Yellow
    exit 0
}

Write-Host "Branche de travail detectee : $workBranch" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT : As-tu deja verifie que le deploiement Preview" -ForegroundColor Yellow
Write-Host "de cette branche fonctionne bien sur vercel.com/dashboard ?" -ForegroundColor Yellow
$confirm = Read-Host "Confirmer et publier en production maintenant ? (oui/non)"
if ($confirm -ne "oui") {
    Write-Host "Annule. Rien n'a ete publie." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "=== ETAPE 1/4 : Passage sur main ===" -ForegroundColor Cyan
git checkout main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR: impossible de basculer sur main. As-tu bien 'main' comme nom de branche par defaut ?" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== ETAPE 2/4 : Recuperation de la derniere version de main ===" -ForegroundColor Cyan
git pull origin main

Write-Host ""
Write-Host "=== ETAPE 3/4 : Fusion de '$workBranch' dans main ===" -ForegroundColor Cyan
git merge $workBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "CONFLIT DETECTE : resous les conflits manuellement, puis relance :" -ForegroundColor Red
    Write-Host "  git add -A" -ForegroundColor Red
    Write-Host "  git commit -m 'Resolution conflits'" -ForegroundColor Red
    Write-Host "  git push origin main" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== ETAPE 4/4 : Publication sur GitHub (main) ===" -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCES : la production a ete mise a jour !" -ForegroundColor Green
    Write-Host "Vercel va redeployer automatiquement ton site en ligne." -ForegroundColor Green
    Write-Host ""
    Write-Host "Retour sur la branche de travail '$workBranch'..." -ForegroundColor Cyan
    git checkout $workBranch
} else {
    Write-Host ""
    Write-Host "ERREUR lors du push vers main. Verifie le message ci-dessus." -ForegroundColor Red
}
Write-Host ""

# File contains AI-generated response based on internal company sources
