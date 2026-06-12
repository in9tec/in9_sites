"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";
import type { ContentKey, ContentMap } from "@/lib/db/types";

function getCount(formData: FormData, prefix: string): number {
  return parseInt(String(formData.get(`${prefix}__count`) || "0"), 10);
}

function getItem(formData: FormData, prefix: string, idx: number, fields: string[]): Record<string, string> {
  return Object.fromEntries(
    fields.map((f) => [f, String(formData.get(`${prefix}__${idx}__${f}`) ?? "")])
  );
}

function getItemWithCheckbox(formData: FormData, prefix: string, idx: number, fields: string[], checkboxFields: string[]): Record<string, string | boolean> {
  const item: Record<string, string | boolean> = {};
  for (const f of fields) {
    item[f] = String(formData.get(`${prefix}__${idx}__${f}`) ?? "");
  }
  for (const f of checkboxFields) {
    item[f] = formData.get(`${prefix}__${idx}__${f}`) === "true" || formData.get(`${prefix}__${idx}__${f}`) !== null && formData.get(`${prefix}__${idx}__${f}`) !== "false";
  }
  return item;
}

export async function saveContentAction(formData: FormData) {
  const slug = String(formData.get("__tenant") || "");
  const key = String(formData.get("__key") || "") as ContentKey;

  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  let value: ContentMap[ContentKey];

  switch (key) {
    case "copy": {
      value = {
        headline: String(formData.get("headline") ?? ""),
        subheadline: String(formData.get("subheadline") ?? ""),
        heroDescription: String(formData.get("heroDescription") ?? ""),
      };
      break;
    }

    case "sobre": {
      const count = getCount(formData, "facts");
      value = {
        facts: Array.from({ length: count }, (_, i) => {
          const item = getItem(formData, "facts", i, ["dt", "dd"]);
          return { dt: item.dt, dd: item.dd };
        }),
      };
      break;
    }

    case "stats": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["n", "l"]);
        return { n: item.n, l: item.l };
      });
      break;
    }

    case "help": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["value"]);
        return item.value;
      });
      break;
    }

    case "contact": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["label", "handle", "href"]);
        return { label: item.label, handle: item.handle, href: item.href };
      });
      break;
    }

    case "tools": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["name", "icon"]);
        return { name: item.name, icon: item.icon };
      });
      break;
    }

    case "articles": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["n", "tag", "title", "read"]);
        return { n: item.n, tag: item.tag, title: item.title, read: item.read };
      });
      break;
    }

    case "services": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["n", "t", "d", "icon"]);
        return { n: item.n, t: item.t, d: item.d, icon: item.icon };
      });
      break;
    }

    case "portfolio": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const base = getItem(formData, "items", i, ["kind", "year", "title", "place", "desc", "image"]);
        const feature = formData.get(`items__${i}__feature`) === "on";
        const result: ContentMap["portfolio"][number] = {
          kind: base.kind,
          year: base.year,
          title: base.title,
          place: base.place,
          desc: base.desc,
        };
        if (base.image) result.image = base.image;
        if (feature) result.feature = true;
        return result;
      });
      break;
    }

    case "in9-hero": {
      value = {
        note: String(formData.get("note") ?? ""),
        lede: String(formData.get("lede") ?? ""),
        status: String(formData.get("status") ?? ""),
      };
      break;
    }

    case "in9-projetos": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["cat", "name", "sector", "body", "hue", "year"]);
        return {
          cat: item.cat,
          name: item.name,
          sector: item.sector,
          body: item.body,
          hue: parseInt(item.hue, 10) || 245,
          year: item.year,
        };
      });
      break;
    }

    case "in9-testimonials": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["q", "name", "role"]);
        return { q: item.q, name: item.name, role: item.role };
      });
      break;
    }

    case "in9-cta": {
      value = {
        title: String(formData.get("title") ?? ""),
        lede: String(formData.get("lede") ?? ""),
        vagas: String(formData.get("vagas") ?? ""),
      };
      break;
    }

    case "in9-diagnostico": {
      const featCount = getCount(formData, "features");
      value = {
        problemHeadline: String(formData.get("problemHeadline") ?? ""),
        problemLede: String(formData.get("problemLede") ?? ""),
        solutionLede: String(formData.get("solutionLede") ?? ""),
        bannerHeadline: String(formData.get("bannerHeadline") ?? ""),
        bannerDesc: String(formData.get("bannerDesc") ?? ""),
        features: Array.from({ length: featCount }, (_, i) => String(formData.get(`features__${i}__label`) ?? "")),
      };
      break;
    }

    case "in9-solucoes": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["n", "t", "d", "tags"]);
        return { n: item.n, t: item.t, d: item.d, tags: item.tags };
      });
      break;
    }

    case "in9-porqueinov": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["n", "t", "d"]);
        return { n: item.n, t: item.t, d: item.d };
      });
      break;
    }

    case "in9-processo": {
      const count = getCount(formData, "items");
      value = Array.from({ length: count }, (_, i) => {
        const item = getItem(formData, "items", i, ["n", "t", "d", "dur"]);
        return { n: item.n, t: item.t, d: item.d, dur: item.dur };
      });
      break;
    }

    default:
      redirect(`/admin/content?tenant=${slug}`);
  }

  await db.setContent(tenant.id, key, value as never);

  revalidatePath(`/${slug}`);
  redirect(`/admin/content/${key}?tenant=${slug}&saved=1`);
}
