import { SectionHeader } from "./SectionHeader";

export function Sobre() {
  return (
    <section id="sobre" className="sobre" data-screen-label="02 Sobre">
      <div className="container section-grid">
        <SectionHeader num="01" label="Sobre" />
        <div className="sobre__content">
          <p className="lead">
            <span className="dropcap">N</span>ão é sobre onde comecei. É sobre o que aprendi lidando com sistemas reais, falhas em produção, pressão de entrega e decisões que impactam equipes inteiras.
          </p>
          <p>
            Ao longo da minha trajetória, percebi que o maior diferencial na tecnologia não é apenas saber código — é saber <em>estruturar processos</em>, lidar com <em>pessoas</em> e tomar <em>decisões em cenários complexos</em>.
          </p>
          <p>Aqui eu compartilho o que realmente faz diferença na prática.</p>

          <dl className="facts">
            <div><dt>Atuação</dt><dd>Desenvolvimento, arquitetura, liderança técnica</dd></div>
            <div><dt>Foco</dt><dd>Processos, estabilização, decisão técnica</dd></div>
            <div><dt>Escrita</dt><dd>Carreira, soft skills, operação</dd></div>
            <div><dt>Base</dt><dd>Brasil</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
