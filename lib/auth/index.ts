// Camada de auth — interface única que hoje usa mock e amanhã Supabase Auth.
// Em DEV_MODE=true, qualquer chamada de session retorna o super-admin do seed,
// permitindo navegar pelo painel sem precisar autenticar de verdade.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Profile, Role } from "@/lib/db/types";
import { DEV_USER_ID } from "@/lib/db/seed";

const SESSION_COOKIE = "session_user_id";

function isDevMode(): boolean {
  // Trava de segurança: o bypass de auth NUNCA vale em produção, mesmo que a
  // env esteja setada como "true" por engano no deploy.
  if (process.env.NODE_ENV === "production") return false;
  return process.env.NEXT_PUBLIC_DEV_MODE === "true";
}

export interface Session {
  user: Profile;
  isSuper: boolean;
}

export async function getSession(): Promise<Session | null> {
  if (isDevMode()) {
    const profile = await db.getProfile(DEV_USER_ID);
    if (!profile) return null;
    return { user: profile, isSuper: profile.is_super };
  }
  const c = await cookies();
  const userId = c.get(SESSION_COOKIE)?.value;
  if (!userId) return null;
  const profile = await db.getProfile(userId);
  if (!profile) return null;
  return { user: profile, isSuper: profile.is_super };
}

export async function signInAs(userId: string): Promise<void> {
  // Usado pelo mock /auth/login. Em produção será substituído por
  // supabase.auth.signInWithPassword().
  const c = await cookies();
  c.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function signOut(): Promise<void> {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

// ============================================================
// Guards (server-side)
// ============================================================

export async function requireAuth(): Promise<Session> {
  const s = await getSession();
  if (!s) redirect("/auth/login");
  return s;
}

export async function requireSuper(): Promise<Session> {
  const s = await requireAuth();
  if (!s.isSuper) redirect("/admin");
  return s;
}

export async function requireTenantMember(tenantId: string): Promise<{ session: Session; role: Role | "super" }> {
  const s = await requireAuth();
  if (s.isSuper) return { session: s, role: "super" };
  const members = await db.listMembers(tenantId);
  const me = members.find((m) => m.user_id === s.user.id);
  if (!me) redirect("/admin");
  return { session: s, role: me!.role };
}

export function isDev(): boolean {
  return isDevMode();
}
