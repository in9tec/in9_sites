import { Conteudos } from "@/components/Conteudos";
import { Consultoria } from "@/components/Consultoria";
import { Contato } from "@/components/Contato";
import { Ferramentas } from "@/components/Ferramentas";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Sobre } from "@/components/Sobre";
import { Stats } from "@/components/Stats";
import { TopBar } from "@/components/TopBar";
import { getSections, isEnabled } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cfg = await getSections();
  return (
    <div className="site">
      <TopBar sections={cfg} />
      <main>
        {isEnabled(cfg, "hero") && <Hero />}
        {isEnabled(cfg, "stats") && <Stats />}
        {isEnabled(cfg, "sobre") && <Sobre />}
        {isEnabled(cfg, "conteudos") && <Conteudos />}
        {isEnabled(cfg, "ferramentas") && <Ferramentas />}
        {isEnabled(cfg, "consultoria") && <Consultoria />}
        {isEnabled(cfg, "portfolio") && <Portfolio />}
        {isEnabled(cfg, "contato") && <Contato />}
      </main>
      <Footer />
    </div>
  );
}
