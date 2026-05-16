import type { ContactLink } from "@/lib/db/types";
import { Arrow } from "./Arrow";
import { SectionHeader } from "./SectionHeader";

export function Contato({ links }: { links: ContactLink[] }) {
  return (
    <section id="contato" className="contato" data-screen-label="07 Contato">
      <div className="container section-grid">
        <SectionHeader num="04" label="Contato" />
        <div className="contato__content">
          <h2 className="h2">Direto, sem fricção.</h2>
          <p className="lead">Escolha o canal mais conveniente. Eu respondo pessoalmente.</p>
          <ul className="links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="link-row">
                  <span className="link-row__label">{l.label}</span>
                  <span className="link-row__handle">{l.handle}</span>
                  <span className="link-row__arrow"><Arrow /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
