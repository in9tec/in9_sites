import { cookies } from "next/headers";

const COOKIE = "admin_auth";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

export async function isAdmin(): Promise<boolean> {
  const pw = adminPassword();
  if (!pw) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === pw;
}

export async function loginAdmin(value: string): Promise<boolean> {
  const pw = adminPassword();
  if (!pw || value !== pw) return false;
  const c = await cookies();
  c.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}
