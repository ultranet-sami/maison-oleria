@echo off
REM =============================================================
REM merge-to-main.bat - Publier la version validee en PRODUCTION
REM =============================================================
title Publication Production - Maison-Oleria
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0merge-to-main.ps1"
echo.
pause

REM File contains AI-generated response based on internal company sources
