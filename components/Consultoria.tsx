import type { Service } from "@/lib/db/types";
import { Arrow } from "./Arrow";
import { ServiceIcon } from "./ServiceIcon";

export function Consultoria({ services, help }: { services: Service[]; help: string[] }) {
  return (
    <section id="consultoria" className="consultoria" data-screen-label="05 Consultoria">
      <div className="container">
        <div className="centered-head">
          <span className="centered-head__bar centered-head__bar--invert" aria-hidden="true" />
          <p className="eyebrow tabular eyebrow--centered eyebrow--invert">Consultoria</p>
          <span className="centered-head__bar centered-head__bar--invert" aria-hidden="true" />
        </div>
        <h2 className="h2 h2--center h2--invert">Mentoria, processos e consultoria técnica</h2>
        <p className="consultoria__sub">
          De sessões individuais a acompanhamento de times inteiros. Cada formato pensado para o seu momento e desafio.
        </p>

        <ul className="services-grid">
          {services.map((s) => (
            <li className="card-srv" key={s.n}>
              <div className="card-srv__top">
                <span className="card-srv__n tabular">{s.n}</span>
                <span className="card-srv__icon"><ServiceIcon id={s.icon} /></span>
              </div>
              <h3 className="card-srv__t">{s.t}</h3>
              <p className="card-srv__d">{s.d}</p>
            </li>
          ))}
        </ul>

        <div className="consultoria__problems">
          <p className="eyebrow eyebrow--invert tabular">— O que eu ajudo a resolver</p>
          <ul className="problems">
            {help.map((h, i) => (
              <li key={i}>
                <span className="problems__n tabular">{String(i + 1).padStart(2, "0")}</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="consult-cta">
          <a className="btn btn--invert" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
            <span>Quero evoluir na prática</span><Arrow />
          </a>
          <span className="consult-cta__note">Resposta em até 24h via WhatsApp</span>
        </div>
      </div>
    </section>
  );
}
