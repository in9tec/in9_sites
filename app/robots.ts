import type { MetadataRoute } from "next";

// Bloqueia rotas internas (painel/auth) dos crawlers e aponta o sitemap.
// O domínio vem de NEXT_PUBLIC_SITE_URL (mesma env usada no resto do app);
// fallback para o domínio do in9.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://in9.studio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
