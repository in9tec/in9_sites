"use client";

import { useState } from "react";

const ITEMS = [
  {
    n: "01", t: "Sites institucionais",
    d: "Presenças digitais que comunicam posicionamento, com performance e SEO de fábrica.",
    tags: ["Next.js", "CMS", "SEO"],
  },
  {
    n: "02", t: "Catálogos de produto",
    d: "Vitrines navegáveis com filtros inteligentes, integração de estoque e checkout.",
    tags: ["E-commerce", "API", "Headless"],
  },
  {
    n: "03", t: "Plataformas de agendamento",
    d: "Sistemas de marcação com confirmação automática, lembretes e gestão de agenda.",
    tags: ["SaaS", "Webhooks", "WhatsApp"],
  },
  {
    n: "04", t: "Sistemas personalizados",
    d: "Software interno feito sob medida para o jeito que sua operação realmente funciona.",
    tags: ["Dashboards", "Auth", "PostgreSQL"],
  },
  {
    n: "05", t: "UX & UI Design",
    d: "Design de interfaces e design systems que escalam com o produto e o time.",
    tags: ["Figma", "Research", "Design System"],
  },
];

function SolutionCard({ item, large }: { item: typeof ITEMS[0]; large: boolean }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, oklch(0.18 0.014 265 / 0.65), oklch(0.15 0.014 265 / 0.4))",
        backdropFilter: "blur(14px)",
        border: `1px solid ${hover ? "oklch(0.55 0.05 260)" : "var(--line)"}`,
        borderRadius: "var(--radius-lg)",
        padding: large ? "40px 36px" : "28px 26px",
        minHeight: large ? 420 : 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transition: "border-color 0.3s, transform 0.3s",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      {/* glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "var(--radius-lg)",
          background: `radial-gradient(circle 240px at ${hover ? "50% 0%" : "50% 100%"}, var(--accent-soft), transparent 70%)`,
          opacity: hover ? 1 : 0.35,
          transition: "opacity 0.4s, background 0.4s",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.06em" }}>
          {item.n}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.06em" }}>
          SERVIÇO
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, marginTop: large ? 40 : 24 }}>
        <h3 style={{
          fontSize: large ? "clamp(28px, 3vw, 40px)" : 22,
          fontWeight: 500,
          letterSpacing: "-0.025em",
          margin: "0 0 14px",
          lineHeight: 1.1,
        }}>
          {item.t}
        </h3>
        <p style={{
          color: "var(--fg-2)",
          fontSize: large ? 16 : 14,
          lineHeight: 1.55,
          margin: "0 0 24px",
          maxWidth: "40ch",
        }}>
          {item.d}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {item.tags.map((tag, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.04em",
              padding: "5px 10px",
              borderRadius: 999,
              border: "1px solid var(--line)",
              color: "var(--fg-2)",
              background: "oklch(0.18 0.014 265 / 0.6)",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Solucoes() {
  return (
    <section id="solucoes">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: "52ch" }}>
            <span className="in9-eyebrow">
              <span className="in9-eyebrow__bar" />
              <span className="in9-eyebrow__num">02</span> — Soluções
            </span>
            <h2 className="in9-h-title" style={{ fontSize: "clamp(34px, 4.2vw, 56px)" }}>
              Cinco maneiras de transformar<br />
              ideias em <em>produto</em>.
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-3)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            maxWidth: "24ch",
            textAlign: "right",
          }}>
            Cada serviço é um ponto de partida — não um pacote fechado.
          </p>
        </div>

        <div className="in9-sol-grid">
          {ITEMS.map((item, i) => (
            <SolutionCard key={i} item={item} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
