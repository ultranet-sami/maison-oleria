import type { ChatMessage } from "./types";

/**
 * OpenAI (ChatGPT) provider.
 * Uses the Chat Completions REST API directly via fetch, so no extra
 * SDK dependency is required.
 *
 * Required env vars:
 *  - OPENAI_API_KEY
 * Optional:
 *  - OPENAI_MODEL (defaults to "gpt-4o-mini")
 */
export async function askOpenAI(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenAI API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("OpenAI API returned an empty response.");
  }
  return content.trim();
}

// File contains AI-generated response based on internal company sources
