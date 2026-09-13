@echo off
REM =============================================================
REM deploy.bat - Double-cliquer pour lancer la mise a jour
REM automatique du projet maison-oleria vers GitHub/Vercel.
REM =============================================================
title Deploiement Maison-Oleria
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"
echo.
pause

REM File contains AI-generated response based on internal company sources
