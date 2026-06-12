import type { In9Testimonial } from "@/lib/db/types";

interface Props {
  testimonials: In9Testimonial[];
}

export function Testimonials({ testimonials }: Props) {
  return (
    <section id="depoimentos" style={{ paddingTop: 0 }}>
      <div className="container">
        <div data-reveal style={{ textAlign: "center", maxWidth: "48ch", margin: "0 auto 48px" }}>
          <span className="in9-eyebrow" style={{ justifyContent: "center" }}>
            <span className="in9-eyebrow__bar" />
            <span className="in9-eyebrow__num">06</span> — Confiança
          </span>
          <h2 className="in9-h-title" style={{ fontSize: "clamp(34px, 4.2vw, 56px)", marginBottom: 0 }}>
            Quem contratou, <em>recomenda.</em>
          </h2>
        </div>
        <div className="in9-testi-grid">
          {testimonials.map((q, i) => (
            <figure
              key={i}
              data-reveal
              style={{
                ["--reveal-delay" as string]: `${i * 70}ms`,
                margin: 0,
                padding: "40px 36px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                background: "oklch(0.185 0.012 252 / 0.4)",
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
                &ldquo;
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
                <div style={{ display: "flex", gap: 2 }} role="img" aria-label="Avaliação 5 de 5">
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
