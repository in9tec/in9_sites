import { NextRequest, NextResponse } from "next/server";

// Resolve o tenant da request e injeta `x-tenant-slug` nos request headers,
// para que Server Components possam ler via `headers()`.
//
// Estratégia atual (mock/dev):
//   1) Domínios custom via HOST_MAP (hardcoded).
//   2) Caso contrário, primeiro segmento do path = slug.
//
// Em produção com Supabase: lookup de host vai usar Edge Config / KV.

const RESERVED = new Set([
  "admin",
  "auth",
  "app",
  "api",
  "_next",
  "favicon.ico",
  "images",
  "robots.txt",
  "sitemap.xml",
]);

const HOST_MAP: Record<string, string> = {
  "in9.studio":                "in9",
  "www.in9.studio":            "in9",
  "novasconcelos.com.br":      "nathan",
  "www.novasconcelos.com.br":  "nathan",
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host")?.split(":")[0].toLowerCase();
  const pathname = url.pathname;

  const requestHeaders = new Headers(req.headers);

  // 1) Host custom — reescreve para /[slug]/...
  if (host && HOST_MAP[host]) {
    const slug = HOST_MAP[host];
    requestHeaders.set("x-tenant-slug", slug);
    const rewritten = url.clone();
    rewritten.pathname = pathname === "/" ? `/${slug}` : `/${slug}${pathname}`;
    return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
  }

  // 2) Path-based: /[slug]/...
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (first && !RESERVED.has(first)) {
    requestHeaders.set("x-tenant-slug", first);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
