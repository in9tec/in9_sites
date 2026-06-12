import type { In9ProcessoStep } from "@/lib/db/types";

interface Props {
  steps: In9ProcessoStep[];
}

export function Processo({ steps }: Props) {
  return (
    <section id="processo">
      <div className="container">
        <div data-reveal style={{ textAlign: "center", maxWidth: "48ch", margin: "0 auto 72px" }}>
          <span className="in9-eyebrow" style={{ justifyContent: "center" }}>
            <span className="in9-eyebrow__bar" />
            <span className="in9-eyebrow__num">03</span> — Processo
          </span>
          <h2 className="in9-h-title" style={{ fontSize: "clamp(34px, 4.2vw, 56px)" }}>
            Cinco passos.<br /> Zero <em>surpresas.</em>
          </h2>
        </div>

        <div className="in9-process-rail">
          {steps.map((s, i) => (
            <div key={i} className="in9-process-step" data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <div className="in9-process-step__line" aria-hidden="true" />
              <div style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "var(--bg)",
                border: "2px solid var(--accent)",
                boxShadow: "0 0 12px var(--glow)",
                position: "relative",
                zIndex: 1,
                marginBottom: 24,
              }} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.06em", marginBottom: 10 }}>
                FASE {s.n}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 12px" }}>{s.t}</h3>
              <p style={{ color: "var(--fg-2)", fontSize: 14, lineHeight: 1.5, margin: "0 0 16px" }}>{s.d}</p>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
                padding: "5px 10px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                display: "inline-block",
              }}>
                {s.dur}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
