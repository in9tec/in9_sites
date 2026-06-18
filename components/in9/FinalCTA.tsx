import type { In9CtaContent } from "@/lib/db/types";

interface Props {
  content: In9CtaContent;
}

export function FinalCTA({ content }: Props) {
  return (
    <section id="contato" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="container">
        <div style={{
          position: "relative",
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid var(--line)",
          padding: "clamp(48px, 8vw, 96px) clamp(32px, 6vw, 80px)",
          background: "linear-gradient(160deg, oklch(0.2 0.013 252) 0%, oklch(0.14 0.01 255) 100%)",
        }}>
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

          <div data-reveal style={{ position: "relative" }}>
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
              {content.title.split(" ").slice(0, -2).join(" ")}<br />
              <em style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--accent)",
              }}>
                {content.title.split(" ").slice(-2).join(" ")}
              </em>
            </h2>
            <p className="in9-lede" style={{ maxWidth: "52ch", marginBottom: 40 }}>
              {content.lede}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a href="mailto:contatoin9tec@gmail.com" className="in9-btn in9-btn--primary">
                Agendar conversa <span className="in9-btn__arrow">→</span>
              </a>
              <a href="mailto:contatoin9tec@gmail.com" className="in9-btn">
                contatoin9tec@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
