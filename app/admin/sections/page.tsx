import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";
import { DEFAULT_SECTION_ORDER, SECTION_LABELS } from "@/lib/db/types";
import { saveSectionsAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function SectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string; saved?: string }>;
}) {
  const sp = await searchParams;
  if (!sp.tenant) redirect("/admin");
  const tenant = await db.getTenantBySlug(sp.tenant);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const sections = await db.getSections(tenant.id);
  const map = new Map(sections.map((s) => [s.section_id, s.enabled] as const));

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <p className="eyebrow tabular">— {tenant.name}</p>
          <h1 className="admin-page__title">Seções do site</h1>
          <p className="muted">Marque o que deve aparecer na home.</p>
        </div>
        <Link href={`/${tenant.slug}`} target="_blank" className="btn btn--ghost btn--sm">Ver site</Link>
      </div>

      {sp.saved && <p className="admin__ok">Salvo.</p>}

      <form action={saveSectionsAction} className="admin__sections">
        <input type="hidden" name="__tenant" value={tenant.slug} />
        {DEFAULT_SECTION_ORDER.map((id) => (
          <label key={id} className="admin__row">
            <input type="checkbox" name={`section-${id}`} defaultChecked={map.get(id) !== false} />
            <span className="admin__row-label">{SECTION_LABELS[id]}</span>
            <code className="admin__row-id">{id}</code>
          </label>
        ))}
        <div className="admin__actions">
          <button type="submit" className="btn btn--primary">Salvar</button>
        </div>
      </form>
    </div>
  );
}
