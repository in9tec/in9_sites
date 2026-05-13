import Image from "next/image";
import { COPY } from "@/content/site";
import { Arrow } from "./Arrow";

export function Hero() {
  return (
    <section id="hero" className="hero" data-screen-label="01 Hero">
      <div className="hero__grid">
        <div className="hero__lede">
          <div className="kicker">
            <span className="kicker__num tabular">00 / Início</span>
            <span className="kicker__bar" aria-hidden="true" />
            <span className="kicker__avail">
              <span className="dot dot--live" aria-hidden="false" />
           
            </span>
          </div>
          <h1 className="display">{COPY.headline}</h1>
          <p className="display__sub">{COPY.subheadline}</p>
          <p className="hero__sub">{COPY.heroDescription}</p>
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
              alt="Nathan Vasconcelos"
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
