"use client";

import { Logo } from "./Logo";

export function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="in9-nav" role="navigation" aria-label="Principal">
      <a href="#top" className="in9-nav__brand">
        <Logo size={22} />
      </a>
      <nav className="in9-nav__links">
        <a href="#diagnostico">Diagnóstico</a>
        <a href="#solucoes">Soluções</a>
        <a href="#processo">Processo</a>
        <a href="#por-que">Manifesto</a>
      </nav>
      <button className="in9-nav__cta" onClick={() => scrollTo("contato")}>
        Agendar conversa →
      </button>
    </header>
  );
}
