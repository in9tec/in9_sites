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
  | "contato";

export type Role = "owner" | "editor";
export type InviteStatus = "pending" | "accepted" | "revoked" | "expired";

export interface Tenant {
  id: string;
  slug: string;
  name: string;
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

export interface Article {
  n: string;
  tag: string;
  title: string;
  read: string;
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
