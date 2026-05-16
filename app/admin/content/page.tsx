import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string }>;
}) {
  const sp = await searchParams;
  if (!sp.tenant) redirect("/admin");
  const tenant = await db.getTenantBySlug(sp.tenant);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const rows = await db.getAllContent(tenant.id);

  return (
    <div className="admin-page">
      <p className="eyebrow tabular">— {tenant.name}</p>
      <h1 className="admin-page__title">Conteúdo</h1>
      <p className="muted">Em breve: editores tipados por chave. Por enquanto, leitura.</p>
      <ul className="admin-list">
        {rows.map((r) => (
          <li key={r.key} className="admin-list__row">
            <div>
              <strong>{r.key}</strong>
              <code className="admin-list__code">{new Date(r.updated_at).toLocaleString("pt-BR")}</code>
            </div>
            <details>
              <summary className="muted tabular">ver</summary>
              <pre className="admin-pre">{JSON.stringify(r.value, null, 2)}</pre>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
