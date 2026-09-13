import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

/**
 * Admin authentication (email + password) with a signed JWT
 * session cookie.
 * -------------------------------------------------------------
 * Required environment variables (see ADMIN_AI_SETUP.md):
 *   ADMIN_EMAIL          - the single admin's login email
 *   ADMIN_PASSWORD_HASH  - bcrypt hash of the admin password
 *                          (generate with: node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))")
 *   SESSION_SECRET       - any long random string, used to sign
 *                          the session JWT (e.g. `openssl rand -hex 32`)
 *
 * There is intentionally no user database / signup flow: this is
 * a solo-admin site, so a single email+hash pair in env vars is
 * enough and avoids storing credentials in the repo or a DB.
 * -------------------------------------------------------------
 */

export const SESSION_COOKIE_NAME = "oleria_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not configured. See ADMIN_AI_SETUP.md.");
  }
  return new TextEncoder().encode(secret);
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET);
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminHash) return false;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return false;
  return bcrypt.compare(password, adminHash);
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export interface SessionPayload {
  email: string;
  role: string;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role !== "admin" || typeof payload.email !== "string") return null;
    return { email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;

// File contains AI-generated response based on internal company sources
