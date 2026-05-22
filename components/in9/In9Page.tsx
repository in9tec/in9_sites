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
import type {
  SectionId,
  In9HeroContent,
  In9Projeto,
  In9Testimonial,
  In9CtaContent,
  In9DiagContent,
  In9SolucaoItem,
  In9WhyItem,
  In9ProcessoStep,
} from "@/lib/db/types";

interface Props {
  enabledSections: SectionId[];
  heroContent: In9HeroContent;
  projetos: In9Projeto[];
  testimonials: In9Testimonial[];
  ctaContent: In9CtaContent;
  diagContent: In9DiagContent;
  solucoes: In9SolucaoItem[];
  whyItems: In9WhyItem[];
  processoSteps: In9ProcessoStep[];
}

const isOn = (enabled: SectionId[], id: SectionId) => enabled.includes(id);

export function In9Page({
  enabledSections,
  heroContent,
  projetos,
  testimonials,
  ctaContent,
  diagContent,
  solucoes,
  whyItems,
  processoSteps,
}: Props) {
  return (
    <div className="in9">
      <div className="in9__grid-bg" aria-hidden="true" />
      <div className="in9__glow-bg" aria-hidden="true" />

      <Nav />

      <main>
        <Hero content={heroContent} />
        {isOn(enabledSections, "diagnostico") && <Diagnostico content={diagContent} />}
        {isOn(enabledSections, "solucoes") && <Solucoes items={solucoes} />}
        {isOn(enabledSections, "processo") && <Processo steps={processoSteps} />}
        {isOn(enabledSections, "projetos") && <Projetos projetos={projetos} />}
        {isOn(enabledSections, "porqueinov") && <PorQueInov items={whyItems} />}
        {isOn(enabledSections, "testimonials") && <Testimonials testimonials={testimonials} />}
        {isOn(enabledSections, "finalcta") && <FinalCTA content={ctaContent} />}
      </main>

      <In9Footer />
    </div>
  );
}
