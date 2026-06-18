import type { SobreContent } from "@/lib/db/types";
import { SectionHeader } from "./SectionHeader";

export function Sobre({ content }: { content: SobreContent }) {
  return (
    <section id="sobre" className="sobre" data-screen-label="02 Sobre">
      <div className="container section-grid">
        <SectionHeader num="01" label="Sobre" />
        <div className="sobre__content">
          <p className="lead">
            <span className="dropcap">O</span> que me formou não está no currículo. Está nas falhas em produção, nas entregas sob pressão e nas decisões que impactam equipes inteiras.
          </p>
          <p>
            Ao longo da minha trajetória, percebi que o maior diferencial na tecnologia não é apenas saber código — é saber <em>estruturar processos</em>, lidar com <em>pessoas</em> e tomar <em>decisões em cenários complexos</em>.
          </p>
          <p>Aqui eu compartilho o que realmente faz diferença na prática.</p>

          <dl className="facts">
            {content.facts.map((f, i) => (
              <div key={i}>
                <dt>{f.dt}</dt>
                <dd>{f.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
