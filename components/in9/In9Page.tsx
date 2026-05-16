import "./in9.css";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Diagnostico } from "./Diagnostico";
import { Solucoes } from "./Solucoes";
import { Projetos } from "./Projetos";
import { PorQueInov } from "./PorQueInov";
import { Processo } from "./Processo";
import { Testimonials } from "./Testimonials";
import { FinalCTA } from "./FinalCTA";
import { In9Footer } from "./In9Footer";
import type { SectionId } from "@/lib/db/types";

interface Props {
  enabledSections: SectionId[];
}

const isOn = (enabled: SectionId[], id: SectionId) => enabled.includes(id);

export function In9Page({ enabledSections }: Props) {
  return (
    <div className="in9">
      <div className="in9__grid-bg" aria-hidden="true" />
      <div className="in9__glow-bg" aria-hidden="true" />

      <Nav />

      <main>
        <Hero />
        {isOn(enabledSections, "diagnostico") && <Diagnostico />}
        {isOn(enabledSections, "solucoes") && <Solucoes />}
        {isOn(enabledSections, "projetos") && <Projetos />}
        {isOn(enabledSections, "porqueinov") && <PorQueInov />}
        {isOn(enabledSections, "processo") && <Processo />}
        {isOn(enabledSections, "testimonials") && <Testimonials />}
        {isOn(enabledSections, "finalcta") && <FinalCTA />}
      </main>

      <In9Footer />
    </div>
  );
}
