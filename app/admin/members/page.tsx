import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";
import { createInviteAction, revokeInviteAction, removeMemberAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string }>;
}) {
  const sp = await searchParams;
  if (!sp.tenant) redirect("/admin");
  const tenant = await db.getTenantBySlug(sp.tenant);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const [members, invites] = await Promise.all([
    db.listMembers(tenant.id),
    db.listInvites(tenant.id),
  ]);

  const pendingInvites = invites.filter((i) => i.status === "pending");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <div className="admin-page">
      <p className="eyebrow tabular">— {tenant.name}</p>
      <h1 className="admin-page__title">Membros</h1>

      <h2 className="admin-page__h2">Atuais</h2>
      <ul className="admin-list">
        {members.map((m) => (
          <li key={m.user_id} className="admin-list__row">
            <div>
              <strong>{m.profile?.full_name || m.profile?.email || m.user_id}</strong>
              <code className="admin-list__code">{m.role}</code>
            </div>
            <form action={removeMemberAction}>
              <input type="hidden" name="__tenant" value={tenant.slug} />
              <input type="hidden" name="userId" value={m.user_id} />
              <button type="submit" className="btn btn--ghost btn--sm">Remover</button>
            </form>
          </li>
        ))}
      </ul>

      <h2 className="admin-page__h2">Convidar</h2>
      <form action={createInviteAction} className="admin__form admin__form--row">
        <input type="hidden" name="__tenant" value={tenant.slug} />
        <label className="admin__field">
          <span>Modo</span>
          <select name="mode" defaultValue="code">
            <option value="email">Email</option>
            <option value="code">Código</option>
          </select>
        </label>
        <label className="admin__field">
          <span>Papel</span>
          <select name="role" defaultValue="editor">
            <option value="editor">Editor</option>
            <option value="owner">Owner</option>
          </select>
        </label>
        <label className="admin__field">
          <span>Email (modo email)</span>
          <input name="email" type="email" placeholder="pessoa@exemplo.com" />
        </label>
        <button type="submit" className="btn btn--primary">Gerar convite</button>
      </form>

      <h2 className="admin-page__h2">Convites pendentes</h2>
      <ul className="admin-list">
        {pendingInvites.length === 0 && <p className="muted">Nenhum.</p>}
        {pendingInvites.map((inv) => (
          <li key={inv.id} className="admin-list__row">
            <div>
              <strong>{inv.email || inv.code}</strong>
              <code className="admin-list__code">{inv.role}</code>
              {inv.code && (
                <code className="admin-list__code">
                  {siteUrl}/auth/signup?code={inv.code}
                </code>
              )}
              <span className="muted tabular"> · expira {new Date(inv.expires_at).toLocaleDateString("pt-BR")}</span>
            </div>
            <form action={revokeInviteAction}>
              <input type="hidden" name="__tenant" value={tenant.slug} />
              <input type="hidden" name="id" value={inv.id} />
              <button type="submit" className="btn btn--ghost btn--sm">Revogar</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
