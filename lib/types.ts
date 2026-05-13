export type SectionId =
  | "hero"
  | "stats"
  | "sobre"
  | "conteudos"
  | "ferramentas"
  | "consultoria"
  | "portfolio"
  | "contato";

export type SectionsConfig = Record<SectionId, boolean>;

export type Stat = { n: string; l: string };
export type Article = { n: string; tag: string; title: string; read: string };
export type Tool = { name: string; icon: string };
export type Service = { n: string; t: string; d: string; icon: string };
export type PortfolioItem = {
  kind: string;
  year: string;
  title: string;
  place: string;
  desc: string;
  image?: string;
  feature?: boolean;
};
export type ContactLink = { label: string; handle: string; href: string };

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Hero",
  stats: "Stats",
  sobre: "Sobre",
  conteudos: "Conteúdos",
  ferramentas: "Ferramentas",
  consultoria: "Consultoria",
  portfolio: "Portfólio",
  contato: "Contato",
};

export const NAV_SECTIONS: SectionId[] = [
  "sobre",
  "conteudos",
  "ferramentas",
  "consultoria",
  "portfolio",
  "contato",
];
