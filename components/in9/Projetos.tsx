"use client";

import { useState } from "react";

const PROJECTS = [
  {
    cat: "Catálogo / B2B",
    name: "Norte Materiais",
    sector: "Construção · Manaus, AM",
    body: "Catálogo digital com 4.200 SKUs, busca instantânea e cotação por WhatsApp.",
    hue: 245,
    year: "2025",
  },
  {
    cat: "Agendamento",
    name: "Clínica Vitruvio",
    sector: "Saúde estética · Curitiba, PR",
    body: "Plataforma de agendamento multi-profissional com confirmação automática.",
    hue: 295,
    year: "2025",
  },
  {
    cat: "Site institucional",
    name: "Cintia Arquitetura",
    sector: "Arquitetura · São Paulo, SP",
    body: "Portfólio editorial com gestão de cases pelo cliente e SEO orgânico.",
    hue: 75,
    year: "2024",
  },
];

function ProjectRow({ p, idx }: { p: typeof PROJECTS[0]; idx: number }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="in9-project-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        border: `1px solid ${hover ? "oklch(0.5 0.05 260)" : "var(--line)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "oklch(0.16 0.014 265 / 0.5)",
        backdropFilter: "blur(14px)",
        transition: "border-color 0.3s, transform 0.3s",
      }}
    >
      {/* Mockup placeholder */}
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        background: `linear-gradient(135deg, oklch(0.22 0.04 ${p.hue}) 0%, oklch(0.15 0.02 ${p.hue}) 100%)`,
        overflow: "hidden",
      }}>
        {/* Browser chrome */}
        <div style={{
          position: "absolute",
          top: 14,
          left: 14,
          display: "flex",
          gap: 6,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "oklch(1 0 0 / 0.4)",
          alignItems: "center",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.18)", display: "block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.18)", display: "block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.18)", display: "block" }} />
          <span style={{ marginLeft: 14 }}>{p.name.toLowerCase().replace(/\s/g, "")}.com.br</span>
        </div>
        {/* Striped mock */}
        <div style={{
          position: "absolute",
          inset: "48px 32px 32px 32px",
          borderRadius: 10,
          border: "1px solid oklch(1 0 0 / 0.06)",
          background: "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.03) 0, oklch(1 0 0 / 0.03) 12px, transparent 12px, transparent 24px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "oklch(1 0 0 / 0.45)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            ↳ mockup do produto
          </div>
          <div style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 500, color: "oklch(1 0 0 / 0.85)", letterSpacing: "-0.03em" }}>
            {p.name}
          </div>
        </div>
        {/* Glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 300px at ${hover ? "70% 30%" : "50% 100%"}, oklch(0.7 0.2 ${p.hue} / 0.35), transparent 70%)`,
          transition: "background 0.6s",
          pointerEvents: "none",
        }} />
      </div>

      {/* Meta */}
      <div style={{ padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <span>
            <span style={{ color: "var(--accent)" }}>{String(idx + 1).padStart(2, "0")}</span> · {p.cat}
          </span>
          <span>{p.year}</span>
        </div>
        <div>
          <h3 style={{ fontSize: "clamp(26px, 2.8vw, 36px)", fontWeight: 500, letterSpacing: "-0.025em", margin: "0 0 8px" }}>{p.name}</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 22px" }}>{p.sector}</p>
          <p style={{ color: "var(--fg-2)", fontSize: 16, lineHeight: 1.55, margin: 0, maxWidth: "40ch" }}>{p.body}</p>
        </div>
        <div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-2)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid var(--line)",
            transform: hover ? "translateX(4px)" : "none",
            transition: "transform 0.3s",
          }}>
            Estudo de caso →
          </span>
        </div>
      </div>
    </article>
  );
}

export function Projetos() {
  return (
    <section id="projetos">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: "52ch" }}>
            <span className="in9-eyebrow">
              <span className="in9-eyebrow__bar" />
              <span className="in9-eyebrow__num">03</span> — Selecionados
            </span>
            <h2 className="in9-h-title" style={{ fontSize: "clamp(34px, 4.2vw, 56px)" }}>
              Alguns produtos que<br /> chegaram <em>ao mundo.</em>
            </h2>
          </div>
          <a
            href="#contato"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-2)", letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Ver todos →
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={i} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
