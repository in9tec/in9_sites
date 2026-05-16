"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAuth, requireTenantMember } from "@/lib/auth";
import type { Role } from "@/lib/db/types";

export async function createInviteAction(formData: FormData) {
  const slug = String(formData.get("__tenant") || "");
  const mode = String(formData.get("mode") || "code"); // 'email' | 'code'
  const role = String(formData.get("role") || "editor") as Role;
  const email = String(formData.get("email") || "").trim() || undefined;

  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  const { session } = await requireTenantMember(tenant.id);

  await db.createInvite({
    tenant_id: tenant.id,
    role,
    email: mode === "email" ? email : undefined,
    created_by: session.user.id,
  });

  revalidatePath(`/admin/members?tenant=${slug}`);
  redirect(`/admin/members?tenant=${slug}`);
}

export async function revokeInviteAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const slug = String(formData.get("__tenant") || "");
  await requireAuth();
  await db.revokeInvite(id);
  revalidatePath(`/admin/members?tenant=${slug}`);
  redirect(`/admin/members?tenant=${slug}`);
}

export async function removeMemberAction(formData: FormData) {
  const slug = String(formData.get("__tenant") || "");
  const userId = String(formData.get("userId") || "");
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);
  await db.removeMember(tenant.id, userId);
  revalidatePath(`/admin/members?tenant=${slug}`);
  redirect(`/admin/members?tenant=${slug}`);
}
