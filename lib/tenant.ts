import { headers } from "next/headers";
import { db } from "@/lib/db";
import type { Tenant } from "@/lib/db/types";

export const TENANT_SLUG_HEADER = "x-tenant-slug";
export const RESERVED_PATHS = new Set(["admin", "auth", "app", "api", "_next", "favicon.ico"]);

/**
 * Resolve o tenant da request atual. Pela ordem:
 *   1. Header `x-tenant-slug` injetado pelo middleware
 *   2. Fallback: pega o slug do primeiro segmento de pathname
 *
 * Server Components devem usar `getCurrentTenant()`.
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  const h = await headers();
  const slug = h.get(TENANT_SLUG_HEADER);
  if (!slug) return null;
  return db.getTenantBySlug(slug);
}

export async function requireCurrentTenant(): Promise<Tenant> {
  const t = await getCurrentTenant();
  if (!t) throw new Error("Tenant não encontrado para esta request");
  return t;
}

/**
 * Resolução pura (sem next/headers) — usada pelo middleware.
 */
export async function resolveTenant(host: string | null, pathname: string): Promise<{ slug: string | null; rewriteTo: string | null }> {
  // 1) por host (domínio custom)
  if (host) {
    const bare = host.split(":")[0].toLowerCase();
    const t = await db.getTenantByHost(bare);
    if (t) {
      // pathname original já é "/algo"; reescreve para /[slug]/algo
      const rewriteTo = pathname === "/" ? `/${t.slug}` : `/${t.slug}${pathname}`;
      return { slug: t.slug, rewriteTo };
    }
  }
  // 2) por path
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (!first) return { slug: null, rewriteTo: null };
  if (RESERVED_PATHS.has(first)) return { slug: null, rewriteTo: null };
  // Aceita o slug mesmo que ainda não exista — o layout do tenant cuida do 404.
  return { slug: first, rewriteTo: null };
}
