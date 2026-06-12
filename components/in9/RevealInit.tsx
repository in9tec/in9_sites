"use client";

import { useEffect } from "react";

// Ativa o scroll-reveal dos elementos [data-reveal] (CSS em in9.css).
// Sem JS a classe .in9--js não existe e nada fica invisível.
export function RevealInit() {
  useEffect(() => {
    const root = document.querySelector(".in9");
    if (!root) return;
    root.classList.add("in9--js");

    const els = Array.from(root.querySelectorAll("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
