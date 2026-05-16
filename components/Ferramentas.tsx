import type { Tool } from "@/lib/db/types";
import { ToolIcon } from "./ToolIcon";

export function Ferramentas({ items }: { items: Tool[] }) {
  return (
    <section id="ferramentas" className="ferramentas" data-screen-label="04 Ferramentas">
      <div className="container">
        <div className="centered-head">
          <span className="centered-head__bar" aria-hidden="true" />
          <p className="eyebrow tabular eyebrow--centered">Ferramentas</p>
          <span className="centered-head__bar" aria-hidden="true" />
        </div>
        <h2 className="h2 h2--center">As ferramentas que uso todos os dias</h2>
        <p className="ferramentas__sub">
          Editor, IA, infra, observabilidade e gestão. Esse é o stack que sustenta as decisões — e os problemas que escrevo por aqui.
        </p>

        <ul className="tools-grid">
          {items.map((t, i) => (
            <li className={`tool ${t.icon === "plus" ? "tool--more" : ""}`} key={i}>
              <span className="tool__icon"><ToolIcon id={t.icon} /></span>
              <span className="tool__name">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
