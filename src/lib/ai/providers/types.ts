/**
 * Shared types for AI providers (Phase 7 — Admin AI Layer).
 * Kept in its own module to avoid circular imports between
 * index.ts, config.ts, and each provider file.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProvider {
  name: string;
  isConfigured: () => boolean;
  ask: (messages: ChatMessage[]) => Promise<string>;
}

// File contains AI-generated response based on internal company sources
