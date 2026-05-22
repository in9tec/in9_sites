"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Tenant } from "@/lib/db/types";

const LINKS = [
  { href: "/admin",         label: "Dashboard", exact: true },
  { href: "/admin/content", label: "Seções e Conteúdo" },
  { href: "/admin/members", label: "Membros" },
];

interface Props {
  isSuper: boolean;
  tenants: Pick<Tenant, "slug" | "name">[];
}

export function AdminNav({ isSuper, tenants }: Props) {
  const sp = useSearchParams();
  const router = useRouter();
  const tenant = sp.get("tenant") ?? (tenants[0]?.slug ?? "");
  const suffix = tenant ? `?tenant=${tenant}` : "";

  function handleTenantChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const slug = e.target.value;
    // Mantém a rota atual, só troca o ?tenant=
    const path = window.location.pathname;
    router.push(`${path}?tenant=${slug}`);
  }

  return (
    <nav className="admin-shell__links">
      {tenants.length > 1 && (
        <div className="admin-shell__tenant-switcher">
          <label className="admin-shell__tenant-label">Tenant</label>
          <select
            className="admin-shell__tenant-select"
            value={tenant}
            onChange={handleTenantChange}
          >
            {tenants.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {tenants.length === 1 && (
        <div className="admin-shell__tenant-single">
          <span className="muted tabular">/{tenants[0].slug}</span>
        </div>
      )}
      {LINKS.map(({ href, label, exact }) => (
        <Link key={href} href={exact ? href : `${href}${suffix}`}>
          {label}
        </Link>
      ))}
      {isSuper && <Link href="/admin/super">Super-admin</Link>}
    </nav>
  );
}
