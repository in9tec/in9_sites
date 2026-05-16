const ITEMS = [
  { n: "01", t: "Abordagem personalizada", d: "Cada projeto começa com uma imersão real no negócio. Sem templates, sem decks genéricos." },
  { n: "02", t: "Arquitetura escalável",   d: "Stack moderna pensada para crescer com você — Next.js, TypeScript, Postgres, edge." },
  { n: "03", t: "Tecnologias modernas",    d: "Trabalhamos com o estado da arte. React Server Components, IA aplicada, design tokens." },
  { n: "04", t: "Pensamento estratégico",  d: "Engenharia + produto + negócio na mesma sala. Decisões com contexto, não opiniões soltas." },
  { n: "05", t: "Entrega rápida com qualidade", d: "Sprints curtos, releases semanais e revisão técnica em cada pull request." },
];

export function PorQueInov() {
  return (
    <section
      id="por-que"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "linear-gradient(180deg, transparent, oklch(0.12 0.012 265 / 0.5))",
      }}
    >
      <div className="container">
        <div className="in9-why-grid">
          <div style={{ position: "sticky", top: 120, alignSelf: "start" }}>
            <span className="in9-eyebrow">
              <span className="in9-eyebrow__bar" />
              <span className="in9-eyebrow__num">04</span> — Por que In9
            </span>
            <h2 className="in9-h-title" style={{ fontSize: "clamp(34px, 4.2vw, 56px)" }}>
              Um estúdio,<br /> não uma <em>fábrica</em>.
            </h2>
            <p className="in9-lede" style={{ maxWidth: "40ch" }}>
              Trabalhamos com poucos clientes por vez para cuidar de cada detalhe.
              É assim que mantemos a qualidade.
            </p>
          </div>

          <div>
            {ITEMS.map((it, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 32,
                  padding: "32px 0",
                  borderTop: i === 0 ? "1px solid var(--line)" : "none",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)", letterSpacing: "0.04em" }}>
                  {it.n}
                </div>
                <div>
                  <h3 style={{ fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
                    {it.t}
                  </h3>
                  <p style={{ color: "var(--fg-2)", fontSize: 15.5, lineHeight: 1.55, margin: 0, maxWidth: "56ch" }}>
                    {it.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
