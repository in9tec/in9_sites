"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, loginAdmin, logoutAdmin } from "@/lib/auth";
import { getSections, setSections } from "@/lib/sections";
import { SECTION_LABELS, type SectionId, type SectionsConfig } from "@/lib/types";

export async function loginAction(formData: FormData) {
  const pw = String(formData.get("password") || "");
  const ok = await loginAdmin(pw);
  if (!ok) redirect("/admin?error=1");
  redirect("/admin");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin");
}

export async function saveSectionsAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const current = await getSections();
  const next: SectionsConfig = { ...current };
  for (const id of Object.keys(SECTION_LABELS) as SectionId[]) {
    next[id] = formData.get(`section-${id}`) === "on";
  }
  await setSections(next);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?saved=1");
}
