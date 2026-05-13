import Image from "next/image";
import { PORTFOLIO } from "@/content/site";

export function Portfolio() {
  return (
    <section id="portfolio" className="portfolio" data-screen-label="06 Portfólio">
      <div className="container">
        <div className="portfolio__head">
          <p className="eyebrow tabular">— Portfólio</p>
          <h2 className="h2">Experiências, palestras e projetos.</h2>
          <p className="portfolio__sub">
            Uma seleção do que já fiz — do palco à sala de guerra de produção.
          </p>
        </div>

        <ul className="portfolio-grid">
          {PORTFOLIO.map((p, i) => (
            <li key={i} className={`port ${p.feature ? "port--feature" : ""}`}>
              {p.image && (
                <div className="port__img">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={1200}
                    height={800}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="port__body">
                <div className="port__top">
                  <span className="port__kind tabular">{p.kind}</span>
                  <span className="port__year tabular">{p.year}</span>
                </div>
                <h3 className="port__t">{p.title}</h3>
                <p className="port__place">{p.place}</p>
                <p className="port__d">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
