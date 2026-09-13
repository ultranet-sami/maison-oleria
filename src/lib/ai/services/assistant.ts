/**
 * Phase 7 — Admin AI Layer: assistant service.
 * -------------------------------------------------------------
 * Higher-level orchestration used by /api/admin/assistant/route.ts.
 * Builds the leads context, assembles the prompt, and delegates the
 * actual provider call to config.ts's askAssistant().
 *
 * Admin-only: never imported from client-facing code.
 * -------------------------------------------------------------
 */

import { readLeads } from "@/lib/leads";
import type { ChatMessage } from "../providers/types";
import { getProvider } from "../config";
import { buildAdminAssistantSystemPrompt, NO_LEADS_MESSAGE } from "../prompts";

export async function buildLeadsContext(): Promise<string> {
  const leads = (await readLeads()).slice(0, 50);
  if (leads.length === 0) return NO_LEADS_MESSAGE;
  const lines = leads.map((l) => {
    const parts = [
      `[${l.type}]`,
      l.name ? `nom=${l.name}` : null,
      `email=${l.email}`,
      l.service ? `service=${l.service}` : null,
      l.price != null ? `prix=${l.price}` : null,
      l.paymentStatus ? `paiement=${l.paymentStatus}` : null,
      l.occasion ? `occasion=${l.occasion}` : null,
      l.morpho ? `morpho=${l.morpho}` : null,
      `date=${l.createdAt}`,
    ].filter(Boolean);
    return parts.join(", ");
  });
  return `Voici les ${leads.length} leads les plus recents (contact, newsletter, reservation) :\n${lines.join("\n")}`;
}

export async function askAssistant(messages: ChatMessage[], providerKey?: string): Promise<string> {
  const { key, provider } = getProvider(providerKey);
  if (!provider) {
    return `Unknown AI provider "${key}". Check AI_PROVIDER in your environment variables.`;
  }
  if (!provider.isConfigured()) {
    return `${provider.name} is not configured yet. Add its API key in Vercel Environment Variables (see ADMIN_AI_SETUP.md) to activate it.`;
  }
  try {
    return await provider.ask(messages);
  } catch (err) {
    console.error(`AI provider "${key}" error:`, err);
    return "An error occurred while contacting the AI provider. Check server logs for details.";
  }
}

/**
 * Convenience helper combining lead-context building + prompt assembly,
 * used directly by the admin assistant API route.
 */
export async function askAdminAssistant(
  userMessage: string,
  history: ChatMessage[] = [],
  providerKey?: string
): Promise<string> {
  const leadsContext = await buildLeadsContext();
  const messages: ChatMessage[] = [
    { role: "system", content: buildAdminAssistantSystemPrompt(leadsContext) },
    ...history.slice(-10),
    { role: "user", content: userMessage },
  ];
  return askAssistant(messages, providerKey);
}

// File contains AI-generated response based on internal company sources
