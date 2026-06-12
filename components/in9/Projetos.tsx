"use client";

import { useState } from "react";
import type { In9Projeto } from "@/lib/db/types";

type Tint = (alpha: number) => string;

// Mockup: vitrine de e-commerce — busca no topo + grade de produtos
function ShopBody({ tint }: { tint: Tint }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderBottom: "1px solid oklch(1 0 0 / 0.06)", flexShrink: 0 }}>
        <span style={{ width: 14, height: 14, borderRadius: 4, background: tint(0.45), display: "block" }} />
        <span style={{ flex: 1, height: 12, borderRadius: 999, background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.08)", display: "block" }} />
        <span style={{ width: 14, height: 14, borderRadius: 4, background: "oklch(1 0 0 / 0.12)", display: "block" }} />
        <span style={{ width: 28, height: 14, borderRadius: 999, background: tint(0.4), display: "block" }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridAutoRows: "1fr", gap: 8 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 5, minHeight: 0 }}>
            <span style={{ flex: 1, minHeight: 0, borderRadius: 6, display: "block", background: i % 3 === 0 ? `linear-gradient(160deg, ${tint(0.3)}, ${tint(0.08)})` : "oklch(1 0 0 / 0.05)" }} />
            <span style={{ width: "80%", height: 5, borderRadius: 3, background: "oklch(1 0 0 / 0.14)", display: "block" }} />
            <span style={{ width: "45%", height: 5, borderRadius: 3, background: tint(0.5), display: "block" }} />
          </div>
        ))}
      </div>
    </>
  );
}

// Mockup: painel administrativo — sidebar + cards de indicador + gráfico
function DashBody({ tint }: { tint: Tint }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderBottom: "1px solid oklch(1 0 0 / 0.06)", flexShrink: 0 }}>
        <span style={{ width: 14, height: 14, borderRadius: 4, background: tint(0.45), display: "block" }} />
        <span style={{ width: 64, height: 6, borderRadius: 3, background: "oklch(1 0 0 / 0.14)", display: "block" }} />
        <span style={{ width: 40, height: 6, borderRadius: 3, background: "oklch(1 0 0 / 0.08)", display: "block" }} />
        <span style={{ marginLeft: "auto", width: 46, height: 14, borderRadius: 999, background: tint(0.35), display: "block" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", flex: 1, minHeight: 0 }}>
        <div style={{ borderRight: "1px solid oklch(1 0 0 / 0.06)", padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ height: 6, borderRadius: 3, background: tint(0.4), display: "block" }} />
          <span style={{ height: 6, borderRadius: 3, background: "oklch(1 0 0 / 0.1)", display: "block" }} />
          <span style={{ height: 6, borderRadius: 3, background: "oklch(1 0 0 / 0.1)", display: "block" }} />
          <span style={{ height: 6, borderRadius: 3, background: "oklch(1 0 0 / 0.06)", display: "block" }} />
        </div>
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ padding: 8, borderRadius: 6, background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.05)", display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ width: "60%", height: 4, borderRadius: 2, background: "oklch(1 0 0 / 0.1)", display: "block" }} />
                <span style={{ width: "45%", height: 9, borderRadius: 3, background: i === 0 ? tint(0.55) : "oklch(1 0 0 / 0.2)", display: "block" }} />
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minHeight: 0, borderRadius: 6, background: "oklch(1 0 0 / 0.03)", border: "1px solid oklch(1 0 0 / 0.05)", padding: 10, display: "flex", alignItems: "flex-end", gap: 6 }}>
            {[0.4, 0.7, 0.5, 0.85, 0.6, 1, 0.75].map((h, i) => (
              <span key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: 3, display: "block", background: i === 5 ? tint(0.6) : `linear-gradient(to top, ${tint(0.25)}, ${tint(0.08)})` }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectRow({ p, idx }: { p: In9Projeto; idx: number }) {
  const [hover, setHover] = useState(false);
  // tinta elementos do mockup com o hue próprio do projeto
  const tint = (alpha: number) => `oklch(0.68 0.15 ${p.hue} / ${alpha})`;
  const variant: "shop" | "dash" = /loja|commerce|e-?comm|virtual/i.test(p.cat) ? "shop" : "dash";

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="in9-project-row"
      data-reveal
      style={{
        ["--reveal-delay" as string]: `${idx * 70}ms`,
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        border: `1px solid ${hover ? "oklch(0.5 0.06 250)" : "var(--line)"}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "oklch(0.185 0.012 252 / 0.5)",
        backdropFilter: "blur(14px)",
        transition: "border-color 0.3s, transform 0.3s",
      }}
    >
      {/* Mockup placeholder */}
      <div style={{
        position: "relative",
        aspectRatio: "16/10",
        background: "linear-gradient(135deg, oklch(0.24 0.016 250) 0%, oklch(0.16 0.012 254) 100%)",
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
        {/* UI skeleton abstrato */}
        <div style={{
          position: "absolute",
          inset: "48px 32px 32px 32px",
          borderRadius: 10,
          border: "1px solid oklch(1 0 0 / 0.07)",
          background: "oklch(1 0 0 / 0.02)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
          {variant === "shop" ? <ShopBody tint={tint} /> : <DashBody tint={tint} />}
          {/* label do projeto */}
          <div style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "oklch(1 0 0 / 0.5)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: tint(0.8), display: "block" }} />
            {p.name}
          </div>
        </div>
        {/* Glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 300px at ${hover ? "70% 30%" : "50% 100%"}, ${tint(0.16)}, transparent 70%)`,
          opacity: hover ? 1 : 0,
          transition: "background 0.6s, opacity 0.4s",
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
            Quero algo assim →
          </span>
        </div>
      </div>
    </article>
  );
}

interface Props {
  projetos: In9Projeto[];
}

export function Projetos({ projetos }: Props) {
  return (
    <section id="projetos">
      <div className="container">
        <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: "52ch" }}>
            <span className="in9-eyebrow">
              <span className="in9-eyebrow__bar" />
              <span className="in9-eyebrow__num">04</span> — Selecionados
            </span>
            <h2 className="in9-h-title" style={{ fontSize: "clamp(34px, 4.2vw, 56px)" }}>
              Do catálogo ao painel,<br /> construímos <em>de ponta a ponta.</em>
            </h2>
          </div>
          <a
            href="#contato"
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-2)", letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Tenho um projeto →
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {projetos.map((p, i) => (
            <ProjectRow key={i} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
