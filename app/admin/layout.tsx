import Link from "next/link";
import { requireAuth, isDev } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-shell__nav">
        <div className="admin-shell__brand">
          <span className="brand__name">Admin</span>
          {isDev() && <span className="admin-shell__devbadge tabular">DEV</span>}
        </div>
        <nav className="admin-shell__links">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/sections">Seções</Link>
          <Link href="/admin/content">Conteúdo</Link>
          <Link href="/admin/members">Membros</Link>
          {session.isSuper && <Link href="/admin/super">Super-admin</Link>}
        </nav>
        <div className="admin-shell__user">
          <span className="muted tabular">{session.user.email}</span>
        </div>
      </aside>
      <div className="admin-shell__main">{children}</div>
    </div>
  );
}
