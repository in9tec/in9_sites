// Row types — espelham o schema Supabase planejado em PLAN-v2.md.
// Quando migrarmos para Supabase de verdade, estes tipos serão gerados via
// `supabase gen types typescript`.

export type SectionId =
  | "hero"
  | "stats"
  | "sobre"
  | "conteudos"
  | "ferramentas"
  | "consultoria"
  | "portfolio"
  | "contato"
  // in9 sections
  | "diagnostico"
  | "solucoes"
  | "projetos"
  | "porqueinov"
  | "processo"
  | "testimonials"
  | "finalcta";

export type Role = "owner" | "editor";
export type InviteStatus = "pending" | "accepted" | "revoked" | "expired";

export type LayoutType = "personal" | "corporate";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  layout_type: LayoutType;
  created_at: string;
}

export interface TenantDomain {
  id: string;
  tenant_id: string;
  host: string;
  verified_at: string | null;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  is_super: boolean;
}

export interface TenantMember {
  tenant_id: string;
  user_id: string;
  role: Role;
}

export interface TenantInvite {
  id: string;
  tenant_id: string;
  role: Role;
  email: string | null;
  code: string | null;
  status: InviteStatus;
  max_uses: number;
  uses: number;
  expires_at: string;
  created_by: string;
  created_at: string;
  accepted_by: string | null;
  accepted_at: string | null;
}

export interface TenantSection {
  tenant_id: string;
  section_id: SectionId;
  enabled: boolean;
  position: number;
}

export interface TenantContent<T = unknown> {
  tenant_id: string;
  key: string;
  value: T;
  updated_at: string;
}

export interface TenantTheme {
  tenant_id: string;
  tokens: ThemeTokens;
  mode: "light" | "dark";
}

export interface ThemeTokens {
  accent: string;
  bg: string;
  fg: string;
  muted: string;
  // outros tokens opcionais permitidos
  [key: string]: string;
}

// ============================================================
// Shapes do conteúdo por chave (validados com Zod no editor)
// ============================================================

export interface CopyContent {
  headline: string;
  subheadline: string;
  heroDescription: string;
}

export interface Stat {
  n: string;
  l: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  n: string;
  tag: string;
  title: string;
  read: string;
  slug?: string;
  body?: ArticleSection[];
  linkedinEmbedUrl?: string; // URL do embed oficial: https://www.linkedin.com/embed/feed/update/urn:li:share:...
}

export interface Tool {
  name: string;
  icon: string;
}

export interface Service {
  n: string;
  t: string;
  d: string;
  icon: string;
}

export interface PortfolioItem {
  kind: string;
  year: string;
  title: string;
  place: string;
  desc: string;
  image?: string;
  feature?: boolean;
}

export interface ContactLink {
  label: string;
  handle: string;
  href: string;
}

export interface SobreContent {
  facts: { dt: string; dd: string }[];
}

// ============================================================
// Shapes do conteúdo in9 (editáveis via admin)
// ============================================================

export interface In9HeroContent {
  note: string;
  lede: string;
  status: string;
}

export interface In9Projeto {
  cat: string;
  name: string;
  sector: string;
  body: string;
  hue: number;
  year: string;
}

export interface In9Testimonial {
  q: string;
  name: string;
  role: string;
}

export interface In9CtaContent {
  title: string;
  lede: string;
  vagas: string;
}

export interface In9DiagContent {
  problemHeadline: string;
  problemLede: string;
  solutionLede: string;
  bannerHeadline: string;
  bannerDesc: string;
  features: string[];
}

export interface In9SolucaoItem {
  n: string;
  t: string;
  d: string;
  tags: string;
}

export interface In9WhyItem {
  n: string;
  t: string;
  d: string;
}

export interface In9ProcessoStep {
  n: string;
  t: string;
  d: string;
  dur: string;
}

// Mapa de chave → shape esperado (referência para o editor)
export type ContentMap = {
  copy: CopyContent;
  stats: Stat[];
  articles: Article[];
  tools: Tool[];
  services: Service[];
  help: string[];
  portfolio: PortfolioItem[];
  contact: ContactLink[];
  sobre: SobreContent;
  // in9 keys
  "in9-hero": In9HeroContent;
  "in9-projetos": In9Projeto[];
  "in9-testimonials": In9Testimonial[];
  "in9-cta": In9CtaContent;
  "in9-diagnostico": In9DiagContent;
  "in9-solucoes": In9SolucaoItem[];
  "in9-porqueinov": In9WhyItem[];
  "in9-processo": In9ProcessoStep[];
};

export type ContentKey = keyof ContentMap;

export const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Hero",
  stats: "Stats",
  sobre: "Sobre",
  conteudos: "Conteúdos",
  ferramentas: "Ferramentas",
  consultoria: "Consultoria",
  portfolio: "Portfólio",
  contato: "Contato",
  // in9 sections
  diagnostico: "Diagnóstico",
  solucoes: "Soluções",
  projetos: "Projetos",
  porqueinov: "Por que In9",
  processo: "Processo",
  testimonials: "Depoimentos",
  finalcta: "CTA Final",
};

export const NAV_SECTIONS: SectionId[] = [
  "sobre",
  "conteudos",
  "ferramentas",
  "consultoria",
  "portfolio",
  "contato",
];

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  "hero",
  "stats",
  "sobre",
  "conteudos",
  "ferramentas",
  "consultoria",
  "portfolio",
  "contato",
];
