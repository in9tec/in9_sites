import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { LinkedInEmbed } from "@/components/LinkedInEmbed";
import type { Article, SectionId } from "@/lib/db/types";

export const dynamic = "force-dynamic";

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ tenant: string; slug: string }>;
}) {
  const { tenant: tenantSlug, slug } = await params;
  const tenant = await db.getTenantBySlug(tenantSlug);
  if (!tenant) notFound();

  const [sections, articles] = await Promise.all([
    db.getSections(tenant.id),
    db.getContent(tenant.id, "articles"),
  ]);

  const article = (articles as Article[] | null)?.find((a) => a.slug === slug);
  if (!article?.body) notFound();

  const enabled = sections.filter((s) => s.enabled).map((s) => s.section_id);
  // Wordmark exibido ao lado da logo — decoupled do slug de rota.
  const wordmark = tenant.slug === "nathan" ? "novasconcelos" : tenant.slug;
  const brand = { name: tenant.name, handle: `/ ${wordmark}` };

  return (
    <div className="site">
      <TopBar brand={brand} enabledSections={enabled as SectionId[]} />
      <main>
        <article className="artigo">
          <div className="container artigo__container">
            <Link href={`/${tenantSlug}#conteudos`} className="artigo__back tabular">
              ← Conteúdos
            </Link>
            <header className="artigo__header">
              <span className="artigo__tag">{article.tag}</span>
              <h1 className="artigo__title">{article.title}</h1>
              <span className="artigo__read tabular">{article.read} de leitura</span>
            </header>
            <div className="artigo__body">
              {article.body.map((section, i) => (
                <section key={i} className="artigo__section">
                  {section.heading && (
                    <h2 className="artigo__heading">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="artigo__p">{p}</p>
                  ))}
                </section>
              ))}
            </div>
            {article.linkedinEmbedUrl && <LinkedInEmbed url={article.linkedinEmbedUrl} />}
          </div>
        </article>
      </main>
      <Footer brand={brand} />
    </div>
  );
}
