"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireSuper } from "@/lib/auth";
import { DEFAULT_SECTION_ORDER } from "@/lib/db/types";
import { CreateTenantSchema } from "@/lib/validation";

export async function createTenantAction(formData: FormData) {
  await requireSuper();

  const parsed = CreateTenantSchema.safeParse({
    slug:        String(formData.get("slug") || "").trim().toLowerCase(),
    name:        String(formData.get("name") || "").trim(),
    layout_type: formData.get("layout_type") ?? "personal",
  });
  if (!parsed.success) redirect("/admin/super");

  const { slug, name, layout_type } = parsed.data;
  const tenant = await db.createTenant({ slug, name, layout_type });

  // Seções padrão (layout personal). Layout corporate tem seções próprias — definir manualmente depois.
  await db.setSectionsBulk(
    tenant.id,
    DEFAULT_SECTION_ORDER.map((id) => ({ section_id: id, enabled: true }))
  );

  await db.setTheme(tenant.id, {
    tokens: { accent: "#B8895A", bg: "#F5F3EE", fg: "#161513", muted: "#6E6A62" },
    mode: "light",
  });

  revalidatePath("/admin/super");
  redirect(`/admin/content?tenant=${slug}`);
}
