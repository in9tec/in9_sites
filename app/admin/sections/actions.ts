"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";
import { DEFAULT_SECTION_ORDER, type SectionId } from "@/lib/db/types";

export async function saveSectionsAction(formData: FormData) {
  const slug = String(formData.get("__tenant") || "");
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const updates = DEFAULT_SECTION_ORDER.map((id) => ({
    section_id: id as SectionId,
    enabled: formData.get(`section-${id}`) === "on",
  }));
  await db.setSectionsBulk(tenant.id, updates);

  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/sections`);
  redirect(`/admin/sections?tenant=${slug}&saved=1`);
}
