import Link from "next/link";
import { db } from "@/lib/db";
import { requireSuper } from "@/lib/auth";
import { createTenantAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function SuperPage() {
  await requireSuper();
  const tenants = await db.listTenants();

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Super-admin</h1>
      <p className="muted">Criar tenants, gerenciar domínios.</p>

      <h2 className="admin-page__h2">Novo tenant</h2>
      <form action={createTenantAction} className="admin__form admin__form--row">
        <label className="admin__field">
          <span>Slug</span>
          <input name="slug" required pattern="[a-z0-9-]+" placeholder="joao" />
        </label>
        <label className="admin__field">
          <span>Nome</span>
          <input name="name" required placeholder="João Silva" />
        </label>
        <label className="admin__field">
          <span>Layout</span>
          <select name="layout_type" defaultValue="personal">
            <option value="personal">Personal</option>
            <option value="corporate">Corporate</option>
          </select>
        </label>
        <button type="submit" className="btn btn--primary">Criar</button>
      </form>

      <h2 className="admin-page__h2">Tenants existentes</h2>
      <ul className="admin-list">
        {tenants.map((t) => (
          <li key={t.id} className="admin-list__row">
            <div>
              <strong>{t.name}</strong>
              <code className="admin-list__code">/{t.slug}</code>
            </div>
            <div className="admin-list__actions">
              <Link href={`/${t.slug}`} target="_blank" className="btn btn--ghost btn--sm">Ver</Link>
              <Link href={`/admin/content?tenant=${t.slug}`} className="btn btn--ghost btn--sm">Conteúdo</Link>
              <Link href={`/admin/members?tenant=${t.slug}`} className="btn btn--ghost btn--sm">Membros</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
