"use client";

import type { In9DiagContent } from "@/lib/db/types";

function IconAlert() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><line x1="12" y1="7.5" x2="12" y2="13" /><circle cx="12" cy="16.5" r="0.6" fill="currentColor" /></svg>;
}
function IconClock() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><polyline points="12 6.5 12 12 16 14" /></svg>;
}
function IconRocket() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
}
function IconBarChart() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
}
function IconShield() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}

const FEATURE_ICONS = [<IconClock key="0" />, <IconRocket key="1" />, <IconBarChart key="2" />, <IconShield key="3" />];

// Trechos entre **…** ganham o accent (.in9-diag__h-em); o resto fica branco.
function renderAccent(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className="in9-diag__h-em">{part.slice(2, -2)}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

interface Props {
  content: In9DiagContent;
}

export function Diagnostico({ content }: Props) {
  return (
    <section id="diagnostico" className="in9-diag">
      <div className="container">
        <div className="in9-eyebrow" style={{ marginBottom: 0, padding: "32px 0 0" }}>
          <span className="in9-eyebrow__bar" />
          <span className="in9-eyebrow__num">01</span> — Diagnóstico
        </div>

        <div className="in9-diag__split">
          {/* LEFT — O Problema */}
          <div className="in9-diag__half" data-reveal>
            <span className="in9-diag__pill">O Problema</span>
            <h2 className="in9-diag__h">{renderAccent(content.problemHeadline)}</h2>
            <p className="in9-diag__lede">{content.problemLede}</p>
            <div className="in9-diag__alert">
              <span className="in9-diag__alert-icon"><IconAlert /></span>
              <p>
                Esses custos não chegam por fatura.<br />
                Mas cobram todo mês: em tempo, erro e venda perdida.
              </p>
            </div>
          </div>

          {/* RIGHT — A Solução */}
          <div className="in9-diag__half" data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            <span className="in9-diag__pill in9-diag__pill--solution">A Solução</span>
            <h2 className="in9-diag__h">
              <span className="in9-diag__h-em in9-diag__h-em--in9">In9</span> organiza,<br />
              automatiza e faz<br />
              seu negócio crescer.
            </h2>
            <p className="in9-diag__lede">{content.solutionLede}</p>
            <div className="in9-diag__features">
              {content.features.map((label, i) => (
                <div key={i} className="in9-diag-feat">
                  <span className="in9-diag-feat__icon">{FEATURE_ICONS[i % FEATURE_ICONS.length]}</span>
                  <span className="in9-diag-feat__label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="in9-diag__banner" data-reveal>
          <div className="in9-diag__banner-bg" aria-hidden="true" />
          <div className="in9-diag__banner-text">
            <p className="in9-diag__banner-h">{content.bannerHeadline}</p>
            <p className="in9-diag__banner-d">{content.bannerDesc}</p>
          </div>
          <a href="#contato" className="in9-btn in9-btn--primary in9-diag__banner-cta">
            Falar com especialista <span className="in9-btn__arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
