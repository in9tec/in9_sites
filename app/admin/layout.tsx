import { Suspense } from "react";
import { requireAuth, isDev } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminNav } from "@/components/admin/AdminNav";
import type { Tenant } from "@/lib/db/types";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();

  // Super vê todos os tenants; membro vê só aqueles em que é membro.
  const allTenants = await db.listTenants();
  let tenants: Tenant[] = allTenants;
  if (!session.isSuper) {
    const checked = await Promise.all(
      allTenants.map(async (t) => {
        const members = await db.listMembers(t.id);
        return members.some((m) => m.user_id === session.user.id) ? t : null;
      })
    );
    tenants = checked.filter((t): t is Tenant => t !== null);
  }

  return (
    <div className="admin-shell">
      <aside className="admin-shell__nav">
        <div className="admin-shell__brand">
          <span className="brand__name">Admin</span>
          {isDev() && <span className="admin-shell__devbadge tabular">DEV</span>}
        </div>
        <Suspense fallback={null}>
          <AdminNav isSuper={session.isSuper} tenants={tenants} />
        </Suspense>
        <div className="admin-shell__user">
          <span className="muted tabular">{session.user.email}</span>
        </div>
      </aside>
      <div className="admin-shell__main">{children}</div>
    </div>
  );
}
