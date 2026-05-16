"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/lib/db/types";
import { Arrow } from "./Arrow";

export function Conteudos({ articles }: { articles: Article[] }) {
  const tags = useMemo(() => ["Tudo", ...Array.from(new Set(articles.map((a) => a.tag)))], [articles]);
  const [tag, setTag] = useState("Tudo");
  const list = tag === "Tudo" ? articles : articles.filter((a) => a.tag === tag);

  return (
    <section id="conteudos" className="conteudos" data-screen-label="03 Conteúdos">
      <div className="container">
        <div className="conteudos__head">
          <p className="eyebrow tabular">— Conteúdos</p>
          <h2 className="h2">Reflexões e aprendizados de quem opera sistemas reais.</h2>
          <p className="conteudos__sub">Tópicos sobre carreira, processos e estabilização — sem fórmulas mágicas.</p>
          <div className="filters">
            {tags.map((t) => (
              <button key={t} onClick={() => setTag(t)} className={`filter ${tag === t ? "is-on" : ""}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <ul className="article-grid">
          {list.map((a) => (
            <li className="card-art" key={a.n} tabIndex={0}>
              <div className="card-art__top">
                <span className="card-art__n tabular">{a.n}</span>
                <span className="card-art__tag">{a.tag}</span>
              </div>
              <h3 className="card-art__t">{a.title}</h3>
              <div className="card-art__bot">
                <span className="card-art__read tabular">{a.read} de leitura</span>
                <span className="card-art__arrow"><Arrow /></span>
              </div>
            </li>
          ))}
        </ul>

        <div className="conteudos__foot">
          <span className="muted">Novos conteúdos publicados regularmente</span>
          <button className="btn btn--ghost btn--sm">
            <span>Inscreva-se na newsletter</span><Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}
