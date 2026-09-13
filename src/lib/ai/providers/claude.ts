import type { ChatMessage } from "./types";

/**
 * Claude (Anthropic) provider.
 * Uses the Messages REST API directly via fetch.
 *
 * Required env vars:
 *  - ANTHROPIC_API_KEY
 * Optional:
 *  - ANTHROPIC_MODEL (defaults to "claude-3-5-sonnet-20241022")
 *
 * Anthropic's Messages API takes "system" as a top-level string,
 * separate from the messages array (which may only contain
 * "user"/"assistant" roles).
 */
export async function askClaude(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022";

  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");

  const chatMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: system || undefined,
      messages: chatMessages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Claude API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data?.content?.[0]?.text;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Claude API returned an empty response.");
  }
  return content.trim();
}

// File contains AI-generated response based on internal company sources
