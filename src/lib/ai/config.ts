/**
 * Phase 7 — Admin AI Layer: provider registry & configuration.
 * -------------------------------------------------------------
 * This module is the single source of truth for which AI providers
 * exist, how to detect if they are configured, and which one is
 * active by default (via AI_PROVIDER env var).
 *
 * Admin-only: this code is imported exclusively from
 * /api/admin/assistant/route.ts and /lib/ai/services, both of which
 * are gated behind admin session authentication. It is never
 * imported from any client-facing page/component.
 * -------------------------------------------------------------
 */

import type { AIProvider } from "./providers/types";
import { askOpenAI } from "./providers/openai";
import { askGemini } from "./providers/gemini";
import { askClaude } from "./providers/claude";
import { askNanoBanana } from "./providers/nanobanana";
import { askOpenRouter } from "./providers/openrouter";

export const PROVIDERS: Record<string, AIProvider> = {
  openai: {
    name: "ChatGPT (OpenAI)",
    isConfigured: () => Boolean(process.env.OPENAI_API_KEY),
    ask: askOpenAI,
  },
  gemini: {
    name: "Gemini (Google)",
    isConfigured: () => Boolean(process.env.GEMINI_API_KEY),
    ask: askGemini,
  },
  claude: {
    name: "Claude (Anthropic)",
    isConfigured: () => Boolean(process.env.ANTHROPIC_API_KEY),
    ask: askClaude,
  },
  nanobanana: {
    name: "NanoBanana (custom)",
    isConfigured: () => Boolean(process.env.NANOBANANA_API_KEY && process.env.NANOBANANA_BASE_URL),
    ask: askNanoBanana,
  },
  openrouter: {
    name: "OpenRouter (aggregator)",
    isConfigured: () => Boolean(process.env.OPENROUTER_API_KEY),
    ask: askOpenRouter,
  },
};

export function getActiveProviderName(): string {
  return process.env.AI_PROVIDER || "openai";
}

export function listProviders(): { key: string; name: string; configured: boolean }[] {
  return Object.entries(PROVIDERS).map(([key, p]) => ({
    key,
    name: p.name,
    configured: p.isConfigured(),
  }));
}

export function getProvider(key?: string): { key: string; provider: AIProvider | undefined } {
  const resolvedKey = key || getActiveProviderName();
  return { key: resolvedKey, provider: PROVIDERS[resolvedKey] };
}

// File contains AI-generated response based on internal company sources
