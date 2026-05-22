import Link from "next/link";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await requireAuth();
  const tenants = await db.listTenants();
  // No mock dev, super-admin vê todos; usuário comum só os seus.
  const visible = session.isSuper
    ? tenants
    : (await Promise.all(tenants.map(async (t) => ({ t, m: await db.listMembers(t.id) }))))
        .filter(({ m }) => m.some((mem) => mem.user_id === session.user.id))
        .map(({ t }) => t);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Tenants</h1>
      <p className="muted">Selecione o tenant para gerenciar.</p>
      <ul className="admin-list">
        {visible.map((t) => (
          <li key={t.id} className="admin-list__row">
            <div>
              <strong>{t.name}</strong>
              <code className="admin-list__code">/{t.slug}</code>
            </div>
            <div className="admin-list__actions">
              <Link href={`/${t.slug}`} target="_blank" className="btn btn--ghost btn--sm">Ver site</Link>
              <Link href={`/admin/content?tenant=${t.slug}`} className="btn btn--primary btn--sm">Gerenciar</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
