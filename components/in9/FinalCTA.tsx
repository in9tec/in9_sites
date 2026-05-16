export function FinalCTA() {
  return (
    <section id="contato" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="container">
        <div style={{
          position: "relative",
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid var(--line)",
          padding: "clamp(48px, 8vw, 96px) clamp(32px, 6vw, 80px)",
          background: "linear-gradient(160deg, oklch(0.18 0.018 265) 0%, oklch(0.13 0.01 265) 100%)",
        }}>
          {/* Glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(ellipse 60% 80% at 80% 100%, var(--accent-soft), transparent 65%), radial-gradient(ellipse 50% 70% at 10% 0%, oklch(0.65 0.22 295 / 0.18), transparent 65%)",
            }}
          />
          {/* Grid */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(to right, var(--line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--line-soft) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
              opacity: 0.5,
            }}
          />

          <div style={{ position: "relative" }}>
            <span className="in9-eyebrow">
              <span className="in9-eyebrow__bar" />
              <span className="in9-eyebrow__num">07</span> — Próximo passo
            </span>
            <h2 style={{
              fontSize: "clamp(48px, 7vw, 104px)",
              lineHeight: 0.98,
              margin: "24px 0 36px",
              maxWidth: "16ch",
              fontWeight: 500,
              letterSpacing: "-0.035em",
            }}>
              Vamos construir sua<br />
              <em style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                backgroundImage: "linear-gradient(110deg, var(--accent), var(--accent-2))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
                experiência digital.
              </em>
            </h2>
            <p className="in9-lede" style={{ maxWidth: "52ch", marginBottom: 40 }}>
              Conte sobre o seu projeto. Em até 24 horas devolvemos um diagnóstico
              inicial com escopo, prazo e estimativa — sem custo, sem pressão.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a href="mailto:ola@in9.studio" className="in9-btn in9-btn--primary">
                Agendar conversa <span className="in9-btn__arrow">→</span>
              </a>
              <a href="mailto:ola@in9.studio" className="in9-btn">
                ola@in9.studio
              </a>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginLeft: 8,
              }}>
                <span className="in9-pulse" aria-hidden="true" />
                3 vagas para Q3 / 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
