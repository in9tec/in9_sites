"use client";

import type { In9DiagContent } from "@/lib/db/types";

/* SVG icons */
function IconCreditCard() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><line x1="2.5" y1="10" x2="21.5" y2="10" /><line x1="6" y1="15" x2="10" y2="15" /></svg>;
}
function IconBox() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.3 7 12 12 20.7 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>;
}
function IconUsers() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="3.5" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function IconTrendingUp() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
}
function IconCalendar() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2.5" /><line x1="16" y1="2.5" x2="16" y2="6.5" /><line x1="8" y1="2.5" x2="8" y2="6.5" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
}
function IconCheck() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}
function IconAlert() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><line x1="12" y1="7.5" x2="12" y2="13" /><circle cx="12" cy="16.5" r="0.6" fill="currentColor" /></svg>;
}
function IconSparkle() {
  return <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 1.5l1.7 7.3 7.3 1.7-7.3 1.7L12 19.5l-1.7-7.3L3 10.5l7.3-1.7L12 1.5z" /><path d="M19 3l.6 2.4L22 6l-2.4.6L19 9l-.6-2.4L16 6l2.4-.6L19 3z" opacity="0.65" /></svg>;
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

const CARD_ICON_MAP: Record<string, React.ReactNode> = {
  creditcard: <IconCreditCard />,
  box: <IconBox />,
  users: <IconUsers />,
  trending: <IconTrendingUp />,
  calendar: <IconCalendar />,
};

const FEATURE_ICONS = [<IconClock key="0" />, <IconRocket key="1" />, <IconBarChart key="2" />, <IconShield key="3" />];

interface Props {
  content: In9DiagContent;
}

export function Diagnostico({ content }: Props) {
  return (
    <section id="diagnostico" className="in9-diag">
      <div className="in9-diag__bg" aria-hidden="true" />
      <div className="container">
        <div className="in9-eyebrow" style={{ marginBottom: 24 }}>
          <span className="in9-eyebrow__bar" />
          <span className="in9-eyebrow__num">01</span> — Diagnóstico
        </div>

        <div className="in9-diag__grid">
          {/* LEFT — Problem → Solution */}
          <div className="in9-diag__left">
            <div>
              <span className="in9-diag__pill">O Problema</span>
              <h2 className="in9-diag__h">
                <span className="in9-diag__h-em">{content.problemHeadline}</span>
              </h2>
              <p className="in9-diag__lede">{content.problemLede}</p>
              <div className="in9-diag__alert">
                <span className="in9-diag__alert-icon"><IconAlert /></span>
                <p>
                  Enquanto você perde tempo organizando,<br />
                  seu concorrente está fechando negócio.
                </p>
              </div>
            </div>

            <div>
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

          {/* RIGHT — Cards */}
          <ol className="in9-diag__cards">
            {content.cards.map((c) => (
              <li key={c.n} className={`in9-diag-card in9-tone-${c.tone}`}>
                <div className="in9-diag-card__inner">
                  <span className="in9-diag-card__num">{c.n}</span>
                  <div className="in9-diag-card__icon-wrap">
                    <span style={{ display: "inline-flex" }}>{CARD_ICON_MAP[c.icon] ?? <IconCreditCard />}</span>
                  </div>
                  <div className="in9-diag-card__body">
                    <h3 className="in9-diag-card__title">{c.title}</h3>
                    <p className="in9-diag-card__desc">{c.desc}</p>
                  </div>
                  <div className="in9-diag-card__result">
                    <span className="in9-diag-card__result-label">
                      <span className="in9-diag-card__result-plus">+</span>RESULTADO
                    </span>
                    <div className="in9-diag-card__result-line">
                      <span className="in9-diag-card__check"><IconCheck /></span>
                      <p>{c.result}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom banner */}
        <div className="in9-diag__banner">
          <div className="in9-diag__banner-bg" aria-hidden="true" />
          <div className="in9-diag__banner-spark"><IconSparkle /></div>
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
