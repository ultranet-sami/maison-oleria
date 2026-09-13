import type { ChatMessage } from "./types";

/**
 * Gemini (Google) provider.
 * Uses the Generative Language REST API directly via fetch.
 *
 * Required env vars:
 *  - GEMINI_API_KEY
 * Optional:
 *  - GEMINI_MODEL (defaults to "gemini-1.5-flash")
 *
 * Gemini does not have a native "system" role in the same shape as
 * OpenAI/Claude, so system messages are folded into the first user
 * turn as plain instructions.
 */
export async function askGemini(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  const systemText = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");

  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // Prepend system instructions to the first user turn, if present.
  if (systemText && contents.length > 0) {
    contents[0].parts[0].text = `${systemText}\n\n${contents[0].parts[0].text}`;
  } else if (systemText) {
    contents.push({ role: "user", parts: [{ text: systemText }] });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Gemini API returned an empty response.");
  }
  return content.trim();
}

// File contains AI-generated response based on internal company sources
