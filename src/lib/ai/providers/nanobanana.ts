import type { ChatMessage } from "./types";

/**
 * NanoBanana (custom/self-hosted) provider.
 * Talks to an OpenAI-compatible chat completions endpoint hosted at
 * NANOBANANA_BASE_URL, authenticated with NANOBANANA_API_KEY. This
 * covers most self-hosted / third-party inference gateways that
 * mirror the OpenAI chat completions schema.
 *
 * Required env vars:
 *  - NANOBANANA_API_KEY
 *  - NANOBANANA_BASE_URL (e.g. "https://my-gateway.example.com/v1")
 * Optional:
 *  - NANOBANANA_MODEL (defaults to "default")
 */
export async function askNanoBanana(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.NANOBANANA_API_KEY;
  const baseUrl = (process.env.NANOBANANA_BASE_URL || "").replace(/\/+$/, "");
  const model = process.env.NANOBANANA_MODEL || "default";

  if (!baseUrl) {
    throw new Error("NANOBANANA_BASE_URL is not set.");
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
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
    throw new Error(`NanoBanana API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? data?.content ?? data?.response;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("NanoBanana API returned an empty response.");
  }
  return content.trim();
}

// File contains AI-generated response based on internal company sources
