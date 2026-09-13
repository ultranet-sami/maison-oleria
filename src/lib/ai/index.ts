/**
 * Multi-provider AI connector — Maison Oleria Admin Assistant
 * -------------------------------------------------------------
 * This module is used ONLY by the private /admin area. Visitors
 * never call this code (the public Chatbot.tsx is fully separate
 * and rule-based, with no AI/API keys involved).
 *
 * Phase 7 restructuring: this file is now a thin public barrel that
 * re-exports from the dedicated submodules:
 *  - ./providers/types    -> shared ChatMessage / AIProvider types
 *  - ./config              -> provider registry, active provider selection
 *  - ./prompts             -> system prompt templates
 *  - ./services/assistant  -> higher-level orchestration (leads context + ask)
 *
 * Switch providers anytime by changing AI_PROVIDER in Vercel env
 * vars — no code changes needed. Supported: openai | gemini |
 * claude | nanobanana | openrouter.
 *
 * If no key is configured for the active provider, ask() returns
 * a friendly placeholder message instead of throwing, so the
 * rest of the admin page still works.
 * -------------------------------------------------------------
 */

export type { ChatMessage, AIProvider } from "./providers/types";
export { getActiveProviderName, listProviders, getProvider, PROVIDERS } from "./config";
export { askAssistant, askAdminAssistant, buildLeadsContext } from "./services/assistant";

// File contains AI-generated response based on internal company sources
