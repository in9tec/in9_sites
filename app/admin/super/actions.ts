"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireSuper } from "@/lib/auth";
import { DEFAULT_SECTION_ORDER } from "@/lib/db/types";

export async function createTenantAction(formData: FormData) {
  await requireSuper();
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim();
  if (!/^[a-z0-9-]+$/.test(slug)) redirect("/admin/super");
  if (!name) redirect("/admin/super");

  const tenant = await db.createTenant({ slug, name });

  // Cria as 8 seções habilitadas por padrão
  await db.setSectionsBulk(
    tenant.id,
    DEFAULT_SECTION_ORDER.map((id) => ({ section_id: id, enabled: true }))
  );

  await db.setTheme(tenant.id, {
    tokens: { accent: "#B8895A", bg: "#F5F3EE", fg: "#161513", muted: "#6E6A62" },
    mode: "light",
  });

  revalidatePath("/admin/super");
  redirect(`/admin/sections?tenant=${slug}`);
}
