const QUOTES = [
  {
    q: "A In9 entregou em seis semanas o que outra equipe não conseguiu em seis meses. Postura sênior do começo ao fim.",
    name: "Rafael Coutinho",
    role: "CEO · Norte Materiais",
  },
  {
    q: "Cuidaram do produto como se fosse deles. O resultado fala por si: dobramos as marcações no primeiro mês.",
    name: "Vivian Aoki",
    role: "Sócia · Clínica Vitruvio",
  },
];

export function Testimonials() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="in9-eyebrow" style={{ justifyContent: "center" }}>
            <span className="in9-eyebrow__bar" />
            <span className="in9-eyebrow__num">06</span> — Confiança
          </span>
        </div>
        <div className="in9-testi-grid">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                padding: "40px 36px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                background: "oklch(0.16 0.014 265 / 0.4)",
                backdropFilter: "blur(14px)",
                display: "flex",
                flexDirection: "column",
                gap: 32,
              }}
            >
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: 64,
                lineHeight: 1,
                color: "var(--accent)",
                height: 32,
                display: "block",
              }}>
                "
              </span>
              <blockquote style={{
                margin: 0,
                fontSize: 20,
                lineHeight: 1.45,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--fg)",
              }}>
                {q.q}
              </blockquote>
              <figcaption style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 24,
                borderTop: "1px solid var(--line)",
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{q.name}</div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--fg-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginTop: 4,
                  }}>
                    {q.role}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <span key={s} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "block" }} />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
