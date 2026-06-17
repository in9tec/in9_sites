"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "solucoes", label: "Soluções" },
  { id: "processo", label: "Processo" },
  { id: "por-que", label: "Quem somos" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  // scroll-spy: marca o link da seção que cruza o meio da viewport
  useEffect(() => {
    const sections = LINKS
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="in9-nav" role="navigation" aria-label="Principal">
      <a href="#top" className="in9-nav__brand">
        <Logo size={36} />
      </a>
      <nav className="in9-nav__links">
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : undefined}>
            {l.label}
          </a>
        ))}
      </nav>
      <button className="in9-nav__cta" onClick={() => scrollTo("contato")}>
        Agendar conversa →
      </button>
    </header>
  );
}
