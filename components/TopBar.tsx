"use client";

import { useEffect, useMemo, useState } from "react";
import {
  NAV_SECTIONS,
  SECTION_LABELS,
  type SectionId,
} from "@/lib/db/types";

export function TopBar({
  enabledSections,
  brand,
}: {
  enabledSections: SectionId[];
  brand: { name: string; handle: string };
}) {
  const [active, setActive] = useState<SectionId>("hero");
  const [navOpen, setNavOpen] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    enabledSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [enabledSections]);

  const items = useMemo(
    () =>
      NAV_SECTIONS.filter((id) => enabledSections.includes(id)).map((id) => ({
        id,
        label: SECTION_LABELS[id],
      })),
    [enabledSections]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  const timeStr = time
    ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }) + " BRT"
    : "—";

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <button className="brand" onClick={() => scrollTo("hero")} aria-label="Início">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M3 21V3l18 18V3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <span className="brand__name">{brand.name}</span>
          <span className="brand__handle">{brand.handle}</span>
        </button>
        <nav className="nav" aria-label="Principal">
          {items.map((it) => (
            <button
              key={it.id}
              className={`nav__item ${active === it.id ? "is-active" : ""}`}
              onClick={() => scrollTo(it.id)}
            >
              <span className="nav__dot" aria-hidden="true" />
              {it.label}
            </button>
          ))}
        </nav>
        <div className="topbar__meta">
          <span className="meta__time tabular">{timeStr}</span>
        </div>
        <button className={`burger ${navOpen ? "is-open" : ""}`} aria-label="Menu" onClick={() => setNavOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
      {navOpen && (
        <div className="mobile-nav">
          {items.map((it) => (
            <button key={it.id} onClick={() => scrollTo(it.id)} className="mobile-nav__item">
              {it.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
