import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { askAdminAssistant, listProviders, getActiveProviderName, type ChatMessage } from "@/lib/ai";

/**
 * Private admin AI assistant endpoint.
 * -------------------------------------------------------------
 * Requires a valid admin session cookie (set via /api/admin/login).
 * Delegates prompt assembly (leads context injection) and provider
 * dispatch to src/lib/ai/services/assistant.ts (Phase 7 restructure).
 * -------------------------------------------------------------
 */
async function requireSession(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  const token = match?.[1];
  if (!token) return null;
  return verifySessionToken(decodeURIComponent(token));
}

export async function GET(req: Request) {
  const session = await requireSession(req);
  if (!session) return NextResponse.json({ error: "Non authentifie." }, { status: 401 });
  return NextResponse.json({
    activeProvider: getActiveProviderName(),
    providers: listProviders(),
  });
}

export async function POST(req: Request) {
  const session = await requireSession(req);
  if (!session) return NextResponse.json({ error: "Non authentifie." }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requete invalide." }, { status: 400 });
  }

  const { message, history } = body as { message?: string; history?: ChatMessage[] };
  if (!message) return NextResponse.json({ error: "Message requis." }, { status: 400 });

  const reply = await askAdminAssistant(message, Array.isArray(history) ? history : []);
  return NextResponse.json({ reply });
}

// File contains AI-generated response based on internal company sources
