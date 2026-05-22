import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireTenantMember } from "@/lib/auth";
import { DynamicList } from "@/components/admin/DynamicList";
import { saveContentAction } from "./actions";
import type { ContentKey } from "@/lib/db/types";

export const dynamic = "force-dynamic";

const VALID_KEYS: ContentKey[] = [
  "copy", "stats", "articles", "tools", "services", "help",
  "portfolio", "contact", "sobre",
  "in9-hero", "in9-diagnostico", "in9-solucoes", "in9-projetos",
  "in9-porqueinov", "in9-processo", "in9-testimonials", "in9-cta",
];

const CONTENT_LABELS: Record<string, string> = {
  copy: "Copy / Hero",
  stats: "Estatísticas",
  articles: "Artigos",
  "in9-diagnostico": "Diagnóstico (In9)",
  "in9-solucoes": "Soluções (In9)",
  "in9-porqueinov": "Por que In9",
  "in9-processo": "Processo (In9)",
  tools: "Ferramentas",
  services: "Serviços",
  help: "Como posso ajudar",
  portfolio: "Portfólio",
  contact: "Contato",
  sobre: "Sobre",
  "in9-hero": "Hero (In9)",
  "in9-projetos": "Projetos (In9)",
  "in9-testimonials": "Depoimentos (In9)",
  "in9-cta": "CTA Final (In9)",
};

export default async function ContentKeyPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ tenant?: string; saved?: string }>;
}) {
  const [{ key }, sp] = await Promise.all([params, searchParams]);

  if (!sp.tenant) redirect("/admin");
  if (!VALID_KEYS.includes(key as ContentKey)) notFound();

  const contentKey = key as ContentKey;
  const tenant = await db.getTenantBySlug(sp.tenant);
  if (!tenant) redirect("/admin");
  await requireTenantMember(tenant.id);

  const value = await db.getContent(tenant.id, contentKey);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <p className="eyebrow tabular">— {tenant.name}</p>
          <h1 className="admin-page__title">{CONTENT_LABELS[contentKey] ?? contentKey}</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href={`/admin/content?tenant=${tenant.slug}`} className="btn btn--ghost btn--sm">← Voltar</Link>
          <Link href={`/${tenant.slug}`} target="_blank" className="btn btn--ghost btn--sm">Ver site</Link>
        </div>
      </div>

      {sp.saved && <p className="admin__ok">Salvo.</p>}

      <form action={saveContentAction} className="admin__form">
        <input type="hidden" name="__tenant" value={tenant.slug} />
        <input type="hidden" name="__key" value={contentKey} />
        <ContentEditor contentKey={contentKey} value={value} />
        <div className="admin__actions">
          <button type="submit" className="btn btn--primary">Salvar</button>
        </div>
      </form>
    </div>
  );
}

function ContentEditor({ contentKey, value }: { contentKey: ContentKey; value: unknown }) {
  switch (contentKey) {
    case "copy": {
      const v = (value as { headline?: string; subheadline?: string; heroDescription?: string }) ?? {};
      return (
        <div className="admin__form">
          <label className="admin__field">
            <span>Headline</span>
            <textarea name="headline" defaultValue={v.headline ?? ""} rows={3} />
          </label>
          <label className="admin__field">
            <span>Sub-headline</span>
            <textarea name="subheadline" defaultValue={v.subheadline ?? ""} rows={2} />
          </label>
          <label className="admin__field">
            <span>Descrição hero</span>
            <textarea name="heroDescription" defaultValue={v.heroDescription ?? ""} rows={3} />
          </label>
        </div>
      );
    }

    case "sobre": {
      const v = (value as { facts?: { dt: string; dd: string }[] }) ?? {};
      const facts = v.facts ?? [];
      return (
        <DynamicList
          prefix="facts"
          fields={[
            { name: "dt", label: "Rótulo (dt)" },
            { name: "dd", label: "Valor (dd)" },
          ]}
          initialItems={facts}
        />
      );
    }

    case "stats": {
      const items = (value as { n: string; l: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "n", label: "Número" },
            { name: "l", label: "Label" },
          ]}
          initialItems={items}
        />
      );
    }

    case "help": {
      const items = (value as string[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[{ name: "value", label: "Item" }]}
          initialItems={items.map((s) => ({ value: s }))}
        />
      );
    }

    case "contact": {
      const items = (value as { label: string; handle: string; href: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "label", label: "Label" },
            { name: "handle", label: "Handle" },
            { name: "href", label: "URL" },
          ]}
          initialItems={items}
        />
      );
    }

    case "tools": {
      const items = (value as { name: string; icon: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "name", label: "Nome" },
            { name: "icon", label: "Ícone (slug)" },
          ]}
          initialItems={items}
        />
      );
    }

    case "articles": {
      const items = (value as { n: string; tag: string; title: string; read: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "n", label: "Nº" },
            { name: "tag", label: "Tag" },
            { name: "title", label: "Título", wide: true },
            { name: "read", label: "Tempo de leitura" },
          ]}
          initialItems={items}
        />
      );
    }

    case "services": {
      const items = (value as { n: string; t: string; d: string; icon: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "n", label: "Nº" },
            { name: "t", label: "Título" },
            { name: "d", label: "Descrição", type: "textarea", wide: true },
            { name: "icon", label: "Ícone (slug)" },
          ]}
          initialItems={items}
        />
      );
    }

    case "portfolio": {
      const items = (value as { kind: string; year: string; title: string; place: string; desc: string; image?: string; feature?: boolean }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "kind", label: "Tipo" },
            { name: "year", label: "Ano" },
            { name: "title", label: "Título", wide: true },
            { name: "place", label: "Local / Evento" },
            { name: "desc", label: "Descrição", type: "textarea", wide: true },
            { name: "image", label: "Imagem (path)" },
            { name: "feature", label: "Destaque", type: "checkbox" },
          ]}
          initialItems={items.map((i) => ({ ...i, image: i.image ?? "", feature: i.feature ?? false }))}
        />
      );
    }

    case "in9-hero": {
      const v = (value as { note?: string; lede?: string; status?: string }) ?? {};
      return (
        <div className="admin__form">
          <label className="admin__field">
            <span>Nota lateral (note)</span>
            <textarea name="note" defaultValue={v.note ?? ""} rows={3} />
          </label>
          <label className="admin__field">
            <span>Lede (parágrafo hero)</span>
            <textarea name="lede" defaultValue={v.lede ?? ""} rows={4} />
          </label>
          <label className="admin__field">
            <span>Status (badge "Aceitando projetos")</span>
            <input type="text" name="status" defaultValue={v.status ?? ""} />
          </label>
        </div>
      );
    }

    case "in9-projetos": {
      const items = (value as { cat: string; name: string; sector: string; body: string; hue: number; year: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "cat", label: "Categoria" },
            { name: "name", label: "Nome do projeto" },
            { name: "sector", label: "Setor / cidade" },
            { name: "body", label: "Descrição", type: "textarea", wide: true },
            { name: "hue", label: "Hue (cor 0–360)", type: "number" },
            { name: "year", label: "Ano" },
          ]}
          initialItems={items}
        />
      );
    }

    case "in9-testimonials": {
      const items = (value as { q: string; name: string; role: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "q", label: "Depoimento", type: "textarea", wide: true },
            { name: "name", label: "Nome" },
            { name: "role", label: "Cargo / empresa" },
          ]}
          initialItems={items}
        />
      );
    }

    case "in9-cta": {
      const v = (value as { title?: string; lede?: string; vagas?: string }) ?? {};
      return (
        <div className="admin__form">
          <label className="admin__field">
            <span>Título</span>
            <input type="text" name="title" defaultValue={v.title ?? ""} />
          </label>
          <label className="admin__field">
            <span>Lede (parágrafo CTA)</span>
            <textarea name="lede" defaultValue={v.lede ?? ""} rows={3} />
          </label>
          <label className="admin__field">
            <span>Badge de vagas</span>
            <input type="text" name="vagas" defaultValue={v.vagas ?? ""} />
          </label>
        </div>
      );
    }

    case "in9-diagnostico": {
      const v = (value as { problemHeadline?: string; problemLede?: string; solutionLede?: string; bannerHeadline?: string; bannerDesc?: string; features?: string[]; cards?: { n: string; tone: string; icon: string; title: string; desc: string; result: string }[] }) ?? {};
      return (
        <div className="admin__form">
          <h2 className="admin-page__h2">Coluna esquerda</h2>
          <label className="admin__field">
            <span>Headline do problema</span>
            <input type="text" name="problemHeadline" defaultValue={v.problemHeadline ?? ""} />
          </label>
          <label className="admin__field">
            <span>Lede do problema</span>
            <textarea name="problemLede" defaultValue={v.problemLede ?? ""} rows={3} />
          </label>
          <label className="admin__field">
            <span>Lede da solução</span>
            <textarea name="solutionLede" defaultValue={v.solutionLede ?? ""} rows={3} />
          </label>
          <h2 className="admin-page__h2">Features (ícones fixos, textos editáveis)</h2>
          <DynamicList
            prefix="features"
            fields={[{ name: "label", label: "Label" }]}
            initialItems={(v.features ?? []).map((f) => ({ label: f }))}
          />
          <h2 className="admin-page__h2">Cards</h2>
          <DynamicList
            prefix="cards"
            fields={[
              { name: "n", label: "Nº" },
              { name: "tone", label: "Cor (blue/violet/green/amber)" },
              { name: "icon", label: "Ícone (creditcard/box/users/trending/calendar)" },
              { name: "title", label: "Título", wide: true },
              { name: "desc", label: "Descrição", type: "textarea", wide: true },
              { name: "result", label: "Resultado" },
            ]}
            initialItems={v.cards ?? []}
          />
          <h2 className="admin-page__h2">Banner inferior</h2>
          <label className="admin__field">
            <span>Headline do banner</span>
            <input type="text" name="bannerHeadline" defaultValue={v.bannerHeadline ?? ""} />
          </label>
          <label className="admin__field">
            <span>Descrição do banner</span>
            <textarea name="bannerDesc" defaultValue={v.bannerDesc ?? ""} rows={2} />
          </label>
        </div>
      );
    }

    case "in9-solucoes": {
      const items = (value as { n: string; t: string; d: string; tags: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "n", label: "Nº" },
            { name: "t", label: "Título" },
            { name: "d", label: "Descrição", type: "textarea", wide: true },
            { name: "tags", label: "Tags (separadas por vírgula)", wide: true },
          ]}
          initialItems={items}
        />
      );
    }

    case "in9-porqueinov": {
      const items = (value as { n: string; t: string; d: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "n", label: "Nº" },
            { name: "t", label: "Título" },
            { name: "d", label: "Descrição", type: "textarea", wide: true },
          ]}
          initialItems={items}
        />
      );
    }

    case "in9-processo": {
      const items = (value as { n: string; t: string; d: string; dur: string }[]) ?? [];
      return (
        <DynamicList
          prefix="items"
          fields={[
            { name: "n", label: "Nº" },
            { name: "t", label: "Nome da fase" },
            { name: "d", label: "Descrição", type: "textarea", wide: true },
            { name: "dur", label: "Duração (ex: ~2 sem.)" },
          ]}
          initialItems={items}
        />
      );
    }
  }
}
