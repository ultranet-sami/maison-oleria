import type { ChatMessage } from "./types";

/**
 * OpenRouter provider.
 * OpenRouter exposes an OpenAI-compatible chat completions API that
 * proxies to many underlying models (GPT, Claude, Gemini, Llama, etc.)
 * through a single key — useful as a fallback/aggregator provider.
 *
 * Required env vars:
 *  - OPENROUTER_API_KEY
 * Optional:
 *  - OPENROUTER_MODEL (defaults to "openai/gpt-4o-mini")
 */
export async function askOpenRouter(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://maison-oleria.com",
      "X-Title": "Maison Oleria Admin Assistant",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenRouter API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("OpenRouter API returned an empty response.");
  }
  return content.trim();
}

// File contains AI-generated response based on internal company sources
