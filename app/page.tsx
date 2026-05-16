import Link from "next/link";
import { db } from "@/lib/db";
import { isDev } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const tenants = await db.listTenants();
  return (
    <main className="landing">
      <div className="landing__inner">
        <p className="landing__eyebrow tabular">— Plataforma</p>
        <h1 className="landing__title">Sites pessoais editoriais.</h1>
        <p className="landing__sub">
          Plataforma para criar e gerenciar sites pessoais com seções configuráveis, tema próprio e conteúdo gerenciável.
        </p>

        {isDev() && (
          <div className="landing__dev">
            <p className="eyebrow tabular">— Dev mode</p>
            <ul className="landing__tenants">
              {tenants.map((t) => (
                <li key={t.id}>
                  <Link href={`/${t.slug}`} className="link-row">
                    <span className="link-row__label">{t.slug}</span>
                    <span className="link-row__handle">{t.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/admin" className="btn btn--ghost btn--sm">Painel admin</Link>
          </div>
        )}
      </div>
    </main>
  );
}
