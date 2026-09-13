/**
 * Captcha abstraction layer (Phase 3 — Anti-Spam / Anti-Bot).
 * -------------------------------------------------------------
 * Supports Cloudflare Turnstile, Google reCAPTCHA v3, or no
 * captcha at all, selected purely via the CAPTCHA_PROVIDER env
 * var — no code changes required to switch providers.
 *
 * Usage (server-side, inside an API route):
 *   const result = await verifyCaptcha(token, getClientIp(req));
 *   if (!result.success) return NextResponse.json({ error: "..." }, { status: 403 });
 * -------------------------------------------------------------
 */

export type CaptchaProvider = "turnstile" | "recaptcha" | "none";

export interface CaptchaVerifyResult {
  success: boolean;
  provider: CaptchaProvider;
  score?: number;
  reason?: string;
}

export function getCaptchaProvider(): CaptchaProvider {
  const p = (process.env.CAPTCHA_PROVIDER || "none").toLowerCase();
  if (p === "turnstile" || p === "recaptcha") return p;
  return "none";
}

/** Client-side public site key for the active provider, or null if disabled. */
export function getCaptchaSiteKey(): string | null {
  const provider = getCaptchaProvider();
  if (provider === "turnstile") return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
  if (provider === "recaptcha") return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || null;
  return null;
}

async function verifyTurnstile(token: string, ip?: string): Promise<CaptchaVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { success: true, provider: "turnstile", reason: "not-configured" };
  try {
    const form = new URLSearchParams();
    form.append("secret", secret);
    form.append("response", token);
    if (ip) form.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const data = await res.json();
    return { success: !!data.success, provider: "turnstile", reason: data["error-codes"]?.join(",") };
  } catch (err) {
    console.error("[captcha] Turnstile verification error:", err);
    // Fail open: don't block real users if the captcha provider itself is down.
    return { success: true, provider: "turnstile", reason: "verify-error" };
  }
}

async function verifyRecaptcha(token: string, ip?: string): Promise<CaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { success: true, provider: "recaptcha", reason: "not-configured" };
  try {
    const form = new URLSearchParams();
    form.append("secret", secret);
    form.append("response", token);
    if (ip) form.append("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const data = await res.json();
    const score = typeof data.score === "number" ? data.score : undefined;
    const success = !!data.success && (score === undefined || score >= 0.5);
    return { success, provider: "recaptcha", score, reason: data["error-codes"]?.join(",") };
  } catch (err) {
    console.error("[captcha] reCAPTCHA verification error:", err);
    return { success: true, provider: "recaptcha", reason: "verify-error" };
  }
}

/**
 * Verifies a captcha token against the currently configured provider.
 * If CAPTCHA_PROVIDER=none, always succeeds (captcha disabled by design).
 * If a provider is selected but no token is provided, fails closed.
 */
export async function verifyCaptcha(token: string | null | undefined, ip?: string): Promise<CaptchaVerifyResult> {
  const provider = getCaptchaProvider();
  if (provider === "none") return { success: true, provider: "none" };
  if (!token) return { success: false, provider, reason: "missing-token" };

  if (provider === "turnstile") return verifyTurnstile(token, ip);
  if (provider === "recaptcha") return verifyRecaptcha(token, ip);
  return { success: true, provider: "none" };
}

// File contains AI-generated response based on internal company sources
