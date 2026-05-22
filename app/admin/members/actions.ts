"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAuth, requireTenantMember } from "@/lib/auth";
import { CreateInviteSchema, RevokeInviteSchema, RemoveMemberSchema } from "@/lib/validation";

export async function createInviteAction(formData: FormData) {
  const parsed = CreateInviteSchema.safeParse({
    __tenant: formData.get("__tenant"),
    mode:     formData.get("mode") ?? "code",
    role:     formData.get("role") ?? "editor",
    email:    formData.get("email") ?? "",
  });
  if (!parsed.success) redirect("/admin");

  const { __tenant: slug, mode, role, email } = parsed.data;
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  const { session } = await requireTenantMember(tenant.id);

  await db.createInvite({
    tenant_id:  tenant.id,
    role,
    email:      mode === "email" && email ? email : undefined,
    created_by: session.user.id,
  });

  revalidatePath(`/admin/members?tenant=${slug}`);
  redirect(`/admin/members?tenant=${slug}`);
}

export async function revokeInviteAction(formData: FormData) {
  const parsed = RevokeInviteSchema.safeParse({
    id:       formData.get("id"),
    __tenant: formData.get("__tenant"),
  });
  if (!parsed.success) redirect("/admin");

  await requireAuth();
  await db.revokeInvite(parsed.data.id);
  revalidatePath(`/admin/members?tenant=${parsed.data.__tenant}`);
  redirect(`/admin/members?tenant=${parsed.data.__tenant}`);
}

export async function removeMemberAction(formData: FormData) {
  const parsed = RemoveMemberSchema.safeParse({
    __tenant: formData.get("__tenant"),
    userId:   formData.get("userId"),
  });
  if (!parsed.success) redirect("/admin");

  const { __tenant: slug, userId } = parsed.data;
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);
  await db.removeMember(tenant.id, userId);
  revalidatePath(`/admin/members?tenant=${slug}`);
  redirect(`/admin/members?tenant=${slug}`);
}
