import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE = 'sigma_admin';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_SECONDS * 1000;
const DEV_SECRET = 'sigma-admin-dev-secret-change-me';

let warnedAboutDevSecret = false;

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? 'admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin',
  };
}

export function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? DEV_SECRET;

  if (secret === DEV_SECRET && !warnedAboutDevSecret) {
    warnedAboutDevSecret = true;
    console.warn(
      'ADMIN_SESSION_SECRET is not set. Using development admin session secret.',
    );
  }

  return secret;
}

function toBase64Url(value: string | Buffer) {
  return Buffer.from(value).toString('base64url');
}

function fromBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf-8');
}

function signatureFor(encodedPayload: string) {
  return createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');
}

function timingSafeStringEqual(left: string, right: string) {
  const leftDigest = createHmac('sha256', getSessionSecret()).update(left).digest();
  const rightDigest = createHmac('sha256', getSessionSecret()).update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function signSession(payload: string): string {
  const encodedPayload = toBase64Url(payload);
  return `${encodedPayload}.${signatureFor(encodedPayload)}`;
}

export function verifySession(token: string): string | null {
  const [encodedPayload, signature, extra] = token.split('.');

  if (!encodedPayload || !signature || extra) {
    return null;
  }

  const expectedSignature = signatureFor(encodedPayload);
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }

  try {
    return fromBase64Url(encodedPayload);
  } catch {
    return null;
  }
}

export function createSessionToken(username: string): string {
  return signSession(JSON.stringify({ u: username, iat: Date.now() }));
}

export function verifySessionToken(
  token: string | undefined,
): { username: string } | null {
  if (!token) {
    return null;
  }

  const payload = verifySession(token);
  if (!payload) {
    return null;
  }

  try {
    const parsed = JSON.parse(payload) as { u?: unknown; iat?: unknown };

    if (typeof parsed.u !== 'string' || typeof parsed.iat !== 'number') {
      return null;
    }

    if (Date.now() - parsed.iat > SESSION_MAX_AGE_MS) {
      return null;
    }

    return { username: parsed.u };
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<{ username: string } | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin(): Promise<{ username: string }> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return admin;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/admin',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: SESSION_COOKIE,
    path: '/admin',
  });
}

export function verifyCredentials(username: string, password: string): boolean {
  const credentials = getAdminCredentials();
  const usernameMatches = timingSafeStringEqual(username, credentials.username);
  const passwordMatches = timingSafeStringEqual(password, credentials.password);

  return usernameMatches && passwordMatches;
}
