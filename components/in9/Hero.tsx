"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import type { In9HeroContent } from "@/lib/db/types";

function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!time) return <span>SP · --:--:--</span>;

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <span>
      SP · {hh}:{mm}:<span style={{ color: "var(--fg-2)" }}>{ss}</span>
    </span>
  );
}

interface Props {
  content: In9HeroContent;
}

export function Hero({ content }: Props) {
  return (
    <section id="top" className="in9-hero">
      <div className="container in9-hero__body">
        <div className="in9-hero__grid">
          {/* Left: brand wordmark + tagline */}
          <div className="in9-hero__left">
            <div className="in9-hero__mark">
              <Logo size={180} withTagline />
            </div>
            <p className="in9-hero__mark-note">
              {content.note.split("\n").map((line, i) => (
                <span key={i}>{line}{i < content.note.split("\n").length - 1 && <br />}</span>
              ))}
            </p>
          </div>

          {/* Right: headline + lede + CTAs */}
          <div className="in9-hero__right">
            <h1 className="in9-hero__title">
              <span>Produtos</span>
              <span>digitais</span>
              <span>
                feitos com{" "}
                <em className="in9-hero__em">intenção.</em>
              </span>
            </h1>

            <div className="in9-hero__lede-wrap">
              <span className="in9-hero__rule" />
              <p className="in9-hero__lede">{content.lede}</p>
            </div>

            <div className="in9-hero__ctas">
              <a href="#diagnostico" className="in9-btn in9-btn--primary">
                Ver soluções <span className="in9-btn__arrow">→</span>
              </a>
              <a href="#contato" className="in9-btn">
                Agendar reunião
              </a>
              <span className="in9-hero__status">
                <span className="in9-pulse" aria-hidden="true" />
                {content.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
