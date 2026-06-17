"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import type { In9HeroContent } from "@/lib/db/types";

const ROT_WORDS = ["intenção.", "precisão.", "estratégia.", "propósito."];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cycle = setInterval(() => {
      setLeaving(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROT_WORDS.length);
        setLeaving(false);
      }, 250);
    }, 2600);
    return () => clearInterval(cycle);
  }, []);

  return (
    <span className={`in9-hero__rot${leaving ? " in9-hero__rot--leaving" : ""}`}>
      {ROT_WORDS[index]}
    </span>
  );
}

interface Props {
  content: In9HeroContent;
}

export function Hero({ content }: Props) {
  const spotRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const spot = spotRef.current;
    if (!spot) return;
    const r = e.currentTarget.getBoundingClientRect();
    spot.style.left = `${e.clientX - r.left}px`;
    spot.style.top = `${e.clientY - r.top}px`;
    spot.style.opacity = "1";
  };

  return (
    <section id="top" className="in9-hero" onMouseMove={onMouseMove}>
      <div ref={spotRef} className="in9-hero__spot" aria-hidden="true" />
      <div className="container in9-hero__body">
        <div className="in9-hero__grid">
          {/* Left: brand wordmark + tagline */}
          <div className="in9-hero__left" data-reveal>
            <div className="in9-hero__mark">
              <Logo size={184} withTagline />
            </div>
          </div>

          {/* Right: headline + lede + CTAs */}
          <div className="in9-hero__right" data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            <h1 className="in9-hero__title">
              <span>Produtos digitais</span>
              <span>
                feitos com{" "}
                <em className="in9-hero__em"><RotatingWord /></em>
              </span>
            </h1>

            <div className="in9-hero__lede-wrap">
              <span className="in9-hero__rule" />
              <p className="in9-hero__lede">{content.lede}</p>
            </div>

            <div className="in9-hero__ctas">
              <a href="#contato" className="in9-btn in9-btn--primary">
                Agendar conversa <span className="in9-btn__arrow">→</span>
              </a>
              <a href="#solucoes" className="in9-btn">
                Ver soluções
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
