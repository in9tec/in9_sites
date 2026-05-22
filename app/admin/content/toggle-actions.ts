"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";

export async function toggleSectionsAction(formData: FormData) {
  const slug = String(formData.get("__tenant") || "");
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const sections = await db.getSections(tenant.id);
  const updates = sections.map((s) => ({
    section_id: s.section_id,
    enabled: formData.get(`section-${s.section_id}`) === "on",
  }));
  await db.setSectionsBulk(tenant.id, updates);

  revalidatePath(`/${slug}`);
  redirect(`/admin/content?tenant=${slug}&saved=1`);
}
