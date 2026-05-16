import Image from "next/image";
import type { CopyContent } from "@/lib/db/types";
import { Arrow } from "./Arrow";

export function Hero({ copy }: { copy: CopyContent }) {
  return (
    <section id="hero" className="hero" data-screen-label="01 Hero">
      <div className="hero__grid">
        <div className="hero__lede">
          <div className="kicker">
            <span className="kicker__num tabular">00 / Início</span>
            <span className="kicker__bar" aria-hidden="true" />
            <span className="kicker__avail">
              <span className="dot dot--live" aria-hidden="true" />
              Disponível para consultoria
            </span>
          </div>
          <h1 className="display">{copy.headline}</h1>
          <p className="display__sub">{copy.subheadline}</p>
          <p className="hero__sub">{copy.heroDescription}</p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#conteudos">
              <span>Ver conteúdos</span><Arrow />
            </a>
            <a className="btn btn--ghost" href="#contato">
              <span>Falar comigo</span><Arrow />
            </a>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="portrait-frame">
            <Image
              src="/images/nathan-portrait.jpg"
              alt="Retrato"
              width={800}
              height={1000}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%" }}
            />
          </div>
          <figcaption className="portrait-cap">
            <span className="tabular">N. Vasconcelos</span>
            <span className="portrait-cap__role">Tech · Carreira · Processos</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
