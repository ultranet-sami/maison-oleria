/**
 * Phase 7 — Admin AI Layer: prompt templates.
 * -------------------------------------------------------------
 * Centralizes the system prompts / instructions used by the admin
 * assistant so wording can be tuned in one place without touching
 * route handlers or provider code.
 * -------------------------------------------------------------
 */

/**
 * Base system prompt for the private admin assistant. Leads context
 * (recent contact/newsletter/reservation entries) is appended by the
 * caller (see services/assistant.ts -> buildLeadsContext()).
 */
export function buildAdminAssistantSystemPrompt(leadsContext: string): string {
  return (
    "Tu es l'assistant prive de la gerante de Maison Oleria, une entreprise de conseil en image et stylisme. " +
    "Utilise le contexte des leads fournis pour repondre de facon precise et actionnable (statistiques, relances clients, redaction d'emails, etc.). " +
    "Reponds en francais, de facon concise et professionnelle.\n\n" +
    leadsContext
  );
}

/** Prompt used when no leads exist yet, kept separate so it can be localized/tuned independently. */
export const NO_LEADS_MESSAGE = "Aucun lead enregistre pour le moment.";

// File contains AI-generated response based on internal company sources
