"use client";

import { useEffect, useState } from "react";

export function Footer({ brand }: { brand: { name: string; handle: string } }) {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const timeStr = time
    ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }) + " BRT"
    : "—";
  const giant = brand.handle.replace(/^\/\s*/, "");

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <span className="brand__name">{brand.name}</span>
          <span className="muted">{brand.handle}</span>
        </div>
        <div className="footer__col">
          <span className="muted">BRT</span>
          <span className="tabular">{timeStr}</span>
        </div>
        <div className="footer__col">
          <span className="muted tabular">© {new Date().getFullYear()} — Todos os direitos reservados</span>
        </div>
      </div>
      <div className="footer__giant" aria-hidden="true">{giant}</div>
    </footer>
  );
}
