import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";
import { toggleSectionsAction } from "./toggle-actions";
import type { ContentKey, SectionId } from "@/lib/db/types";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  stats: "Estatísticas",
  sobre: "Sobre",
  conteudos: "Conteúdos",
  ferramentas: "Ferramentas",
  consultoria: "Consultoria",
  portfolio: "Portfólio",
  contato: "Contato",
  diagnostico: "Diagnóstico",
  solucoes: "Soluções",
  projetos: "Projetos",
  porqueinov: "Por que In9",
  processo: "Processo",
  testimonials: "Depoimentos",
  finalcta: "CTA Final",
};

// Mapeia section_id → content keys editáveis
const SECTION_CONTENT: Partial<Record<SectionId, ContentKey[]>> = {
  hero: ["copy"],
  stats: ["stats"],
  sobre: ["sobre"],
  conteudos: ["articles"],
  ferramentas: ["tools"],
  consultoria: ["services", "help"],
  portfolio: ["portfolio"],
  contato: ["contact"],
  diagnostico: ["in9-diagnostico"],
  solucoes: ["in9-solucoes"],
  projetos: ["in9-projetos"],
  porqueinov: ["in9-porqueinov"],
  processo: ["in9-processo"],
  testimonials: ["in9-testimonials"],
  finalcta: ["in9-cta"],
};

const CONTENT_LABELS: Partial<Record<ContentKey, string>> = {
  copy: "Copy",
  stats: "Stats",
  sobre: "Sobre",
  articles: "Artigos",
  tools: "Ferramentas",
  services: "Serviços",
  help: "Ajuda",
  portfolio: "Portfólio",
  contact: "Contato",
  "in9-hero": "Hero",
  "in9-diagnostico": "Diagnóstico",
  "in9-solucoes": "Soluções",
  "in9-projetos": "Projetos",
  "in9-porqueinov": "Por que In9",
  "in9-processo": "Processo",
  "in9-testimonials": "Depoimentos",
  "in9-cta": "CTA Final",
};

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string; saved?: string }>;
}) {
  const sp = await searchParams;
  if (!sp.tenant) redirect("/admin");
  const tenant = await db.getTenantBySlug(sp.tenant);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const [sections, contentRows] = await Promise.all([
    db.getSections(tenant.id),
    db.getAllContent(tenant.id),
  ]);

  const enabledMap = new Map(sections.map((s) => [s.section_id, s.enabled]));
  const updatedMap = new Map(contentRows.map((r) => [r.key, r.updated_at]));

  const sortedSections = [...sections].sort((a, b) => a.position - b.position);
  const slug = tenant.slug;

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <p className="eyebrow tabular">— {tenant.name}</p>
          <h1 className="admin-page__title">Seções e Conteúdo</h1>
          <p className="muted">Ative seções e edite o conteúdo de cada uma.</p>
        </div>
        <Link href={`/${slug}`} target="_blank" className="btn btn--ghost btn--sm">Ver site</Link>
      </div>

      {sp.saved && <p className="admin__ok">Salvo.</p>}

      <form action={toggleSectionsAction}>
        <input type="hidden" name="__tenant" value={slug} />

        {/* in9: hero row without toggle (always on) */}
        {slug === "in9" && (
          <div className="admin__row admin__row--content">
            <span className="admin__row-toggle" />
            <span className="admin__row-label">Hero</span>
            <div className="admin__row-actions">
              <EditBtn contentKey="in9-hero" slug={slug} updatedMap={updatedMap} label="Hero" />
            </div>
          </div>
        )}

        {sortedSections.map((s) => {
          const contentKeys = SECTION_CONTENT[s.section_id as SectionId] ?? [];
          return (
            <div key={s.section_id} className="admin__row admin__row--content">
              <label className="admin__row-toggle" title="Ativar / desativar seção">
                <input
                  type="checkbox"
                  name={`section-${s.section_id}`}
                  defaultChecked={enabledMap.get(s.section_id as SectionId) !== false}
                />
              </label>
              <span className="admin__row-label">{SECTION_LABELS[s.section_id] ?? s.section_id}</span>
              <div className="admin__row-actions">
                {contentKeys.map((key) => (
                  <EditBtn key={key} contentKey={key} slug={slug} updatedMap={updatedMap} label={CONTENT_LABELS[key] ?? key} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="admin__actions">
          <button type="submit" className="btn btn--primary">Salvar seções</button>
        </div>
      </form>
    </div>
  );
}

function EditBtn({
  contentKey,
  slug,
  updatedMap,
  label,
}: {
  contentKey: ContentKey;
  slug: string;
  updatedMap: Map<string, string>;
  label: string;
}) {
  const updatedAt = updatedMap.get(contentKey);
  return (
    <Link
      href={`/admin/content/${contentKey}?tenant=${slug}`}
      className="btn btn--ghost btn--sm"
      title={updatedAt ? `Atualizado: ${new Date(updatedAt).toLocaleString("pt-BR")}` : undefined}
    >
      Editar {label}
    </Link>
  );
}
