import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

// Sitemap derivado dos tenants cadastrados. Na v1 (rotas path-based) gera a
// home e uma entrada por tenant (ex.: /in9). O domínio vem de
// NEXT_PUBLIC_SITE_URL; fallback para o domínio do in9.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://in9.studio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tenants = await db.listTenants();
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...tenants.map((t) => ({
      url: `${SITE_URL}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
