import { NextResponse } from "next/server";
import { verifyCredentials, createSessionToken, isAdminAuthConfigured, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";
import { rateLimitByIp } from "@/lib/security/rateLimit";
import { verifyCaptcha } from "@/lib/security/captcha";
import { loginSchema, safeValidate } from "@/lib/validation";
import { getClientIp, logSecurity } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // Strict rate limit on login to mitigate brute-force attacks.
    const limit = await rateLimitByIp(ip, "admin-login", { limit: 8, windowMs: 15 * 60 * 1000 });
    if (!limit.allowed) {
      await logSecurity("admin-login", "Rate limit exceeded", { ip }, req);
      return NextResponse.json({ error: "Trop de tentatives. Veuillez reessayer plus tard." }, { status: 429 });
    }

    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { error: "L'authentification admin n'est pas encore configuree. Voir ADMIN_AI_SETUP.md" },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Requete invalide." }, { status: 400 });
    }

    const validation = safeValidate(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
    }
    const { email, password, captchaToken } = validation.data;

    const captcha = await verifyCaptcha(captchaToken, ip);
    if (!captcha.success) {
      await logSecurity("admin-login", "Captcha verification failed", { ip, email }, req);
      return NextResponse.json({ error: "Verification anti-spam echouee." }, { status: 403 });
    }

    const ok = await verifyCredentials(email, password);
    if (!ok) {
      await logSecurity("admin-login", "Failed login attempt", { ip, email }, req);
      return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
    }

    const token = await createSessionToken(email);
    await logSecurity("admin-login", "Successful login", { ip, email }, req);
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}

// File contains AI-generated response based on internal company sources
