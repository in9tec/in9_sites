import type { In9WhyItem } from "@/lib/db/types";

interface Props {
  items: In9WhyItem[];
}

export function PorQueInov({ items }: Props) {
  return (
    <section
      id="por-que"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "linear-gradient(180deg, transparent, oklch(0.13 0.01 255 / 0.5))",
      }}
    >
      <div className="container">
        <div className="in9-why-grid">
          <div data-reveal style={{ position: "sticky", top: 120, alignSelf: "start" }}>
            <span className="in9-eyebrow">
              <span className="in9-eyebrow__bar" />
              <span className="in9-eyebrow__num">05</span> — Por que In9
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
            {items.map((it, i) => (
              <div
                key={i}
                data-reveal
                style={{
                  ["--reveal-delay" as string]: `${i * 70}ms`,
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
