import { notFound } from "next/navigation";
import { Conteudos } from "@/components/Conteudos";
import { Consultoria } from "@/components/Consultoria";
import { Contato } from "@/components/Contato";
import { Ferramentas } from "@/components/Ferramentas";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Sobre } from "@/components/Sobre";
import { Stats } from "@/components/Stats";
import { TopBar } from "@/components/TopBar";
import { In9Page } from "@/components/in9/In9Page";
import { db } from "@/lib/db";
import type { ContentMap, SectionId } from "@/lib/db/types";

export const dynamic = "force-dynamic";

export default async function TenantHome({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) notFound();

  // in9 — renders its own full-page component
  if (slug === "in9") {
    const sections = await db.getSections(tenant.id);
    const enabled = sections.filter((s) => s.enabled).map((s) => s.section_id);
    return <In9Page enabledSections={enabled} />;
  }

  const [sections, copy, stats, articles, tools, services, help, portfolio, contact, sobre] = await Promise.all([
    db.getSections(tenant.id),
    db.getContent(tenant.id, "copy"),
    db.getContent(tenant.id, "stats"),
    db.getContent(tenant.id, "articles"),
    db.getContent(tenant.id, "tools"),
    db.getContent(tenant.id, "services"),
    db.getContent(tenant.id, "help"),
    db.getContent(tenant.id, "portfolio"),
    db.getContent(tenant.id, "contact"),
    db.getContent(tenant.id, "sobre"),
  ]);

  const enabled = new Set(sections.filter((s) => s.enabled).map((s) => s.section_id));
  const isOn = (id: SectionId) => enabled.has(id);

  const brand = { name: tenant.name, handle: `/ ${tenant.slug}` };

  // Defaults para evitar UI quebrada quando o tenant ainda não preencheu uma chave
  const _copy: ContentMap["copy"] = copy ?? { headline: "—", subheadline: "", heroDescription: "" };
  const _stats = stats ?? [];
  const _articles = articles ?? [];
  const _tools = tools ?? [];
  const _services = services ?? [];
  const _help = help ?? [];
  const _portfolio = portfolio ?? [];
  const _contact = contact ?? [];
  const _sobre = sobre ?? { facts: [] };

  return (
    <div className="site">
      <TopBar
        brand={brand}
        enabledSections={[...enabled] as SectionId[]}
      />
      <main>
        {isOn("hero") && <Hero copy={_copy} />}
        {isOn("stats") && <Stats items={_stats} />}
        {isOn("sobre") && <Sobre content={_sobre} />}
        {isOn("conteudos") && <Conteudos articles={_articles} />}
        {isOn("ferramentas") && <Ferramentas items={_tools} />}
        {isOn("consultoria") && <Consultoria services={_services} help={_help} />}
        {isOn("portfolio") && <Portfolio items={_portfolio} />}
        {isOn("contato") && <Contato links={_contact} />}
      </main>
      <Footer brand={brand} />
    </div>
  );
}
