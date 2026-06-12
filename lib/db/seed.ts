// Seed inicial do mock — popula o tenant "nathan" com o conteúdo da v1
// e cria um super-admin "dev" usado pela camada de auth mock.

import { randomUUID } from "node:crypto";
import type {
  Article,
  ContactLink,
  ContentMap,
  PortfolioItem,
  Profile,
  SectionId,
  Service,
  Stat,
  Tenant,
  TenantContent,
  TenantDomain,
  TenantInvite,
  TenantMember,
  TenantSection,
  TenantTheme,
  Tool,
} from "./types";
import { DEFAULT_SECTION_ORDER } from "./types";

export const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";

const NATHAN_ID = "00000000-0000-0000-0000-00000000000a";
const IN9_ID    = "00000000-0000-0000-0000-00000000000b";

const COPY: ContentMap["copy"] = {
  headline: "Tecnologia além\ndo código",
  subheadline: "O que realmente faz diferença na sua carreira, nas equipes e em sistemas reais.",
  heroDescription:
    "Experiência prática em todo fluxo de desenvolvimento, implantação, estabilização de sistemas, planejamento e gestão de equipes.",
};

const STATS: Stat[] = [
  { n: "10+", l: "Anos em tecnologia" },
  { n: "40+", l: "Sistemas em produção" },
  { n: "15", l: "Times acompanhados" },
  { n: "∞", l: "Deploys quebrados resolvidos" },
];

const ARTICLES: Article[] = [
  { n: "01", tag: "Carreira", title: "O que eu gostaria que tivessem me dito antes da faculdade", read: "8 min" },
  { n: "02", tag: "Carreira", title: "Ser bom tecnicamente não garante crescimento", read: "6 min" },
  { n: "03", tag: "Soft skills", title: "O profissional que resolve problemas sempre se destaca", read: "5 min" },
  { n: "04", tag: "Processos", title: "Onde processos falham no desenvolvimento de sistemas", read: "9 min" },
  { n: "05", tag: "Entrega", title: "Problemas comuns em deploy e como evitá-los", read: "7 min" },
  { n: "06", tag: "Sistemas", title: "Por que sistemas quebram após implantação", read: "10 min" },
  { n: "07", tag: "Times", title: "Como melhorar a comunicação entre times técnicos", read: "6 min" },
  { n: "08", tag: "Liderança", title: "Erros comuns na organização de equipes de tecnologia", read: "8 min" },
];

const TOOLS: Tool[] = [
  { name: "VS Code", icon: "vscode" },
  { name: "Cursor", icon: "cursor" },
  { name: "Claude", icon: "claude" },
  { name: "GPT", icon: "gpt" },
  { name: "Linear", icon: "linear" },
  { name: "Notion", icon: "notion" },
  { name: "Figma", icon: "figma" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "Postgres", icon: "postgres" },
  { name: "AWS", icon: "aws" },
  { name: "Vercel", icon: "vercel" },
  { name: "Slack", icon: "slack" },
  { name: "Datadog", icon: "datadog" },
  { name: "E outros…", icon: "plus" },
];

const SERVICES: Service[] = [
  { n: "01", t: "Consultoria de processos", d: "Diagnóstico e redesenho do fluxo de desenvolvimento — do planejamento ao deploy. Para times que entregam pouco e travam muito.", icon: "process" },
  { n: "02", t: "Mentoria de carreira", d: "Sessões individuais para profissionais que querem evoluir além do técnico. Decisão, comunicação e posicionamento.", icon: "person" },
  { n: "03", t: "Estabilização de sistemas", d: "Apoio prático para times com sistemas instáveis em produção. Diagnóstico, priorização e plano de ação direto.", icon: "stabilize" },
  { n: "04", t: "Assessoria a líderes", d: "Acompanhamento contínuo para tech leads e gerentes que precisam destravar entregas e organizar times sob pressão.", icon: "leader" },
];

const HELP: string[] = [
  "Falhas no processo de desenvolvimento",
  "Dificuldade na estabilização de sistemas",
  "Falta de organização e fluxo em equipes",
  "Decisão de tecnologias adequadas",
  "Baixa eficiência na entrega de software",
];

const PORTFOLIO: PortfolioItem[] = [
  { kind: "Palestra", year: "2024", title: "Tecnologia além do código — para 400+ pessoas", place: "Auditório universitário", desc: "Sobre carreira, decisão técnica e por que sistemas reais exigem mais do que escrever código.", image: "/images/palestra-1.jpg", feature: true },
  { kind: "Projeto", year: "2023", title: "Estabilização de plataforma com 30M req/dia", place: "Empresa de mídia", desc: "Diagnóstico, priorização e plano de ação direto. De alertas todo dia para semanas sem incidente." },
  { kind: "Mentoria", year: "2023→", title: "Acompanhamento de tech leads", place: "Programa contínuo", desc: "Sessões individuais com tech leads em transição para gerência. Decisão, comunicação e priorização." },
  { kind: "Workshop", year: "2024", title: "Processos de entrega para times em crescimento", place: "Time de produto · 25 pessoas", desc: "Redesenho do fluxo do planejamento ao deploy. Reuniões, papéis, métricas e ritos." },
  { kind: "Consultoria", year: "2022", title: "Migração de monólito legado", place: "Fintech early-stage", desc: "Decisão de arquitetura, faseamento e gestão de risco em produção. Sem big-bang." },
  { kind: "Palestra", year: "2024", title: "O que ninguém te conta sobre liderar times técnicos", place: "Meetup interno", desc: "Erros comuns na organização de equipes de tecnologia — e o que realmente funciona." },
];

const CONTACT_LINKS: ContactLink[] = [
  { label: "WhatsApp", handle: "+55 (11) 0 0000-0000", href: "https://wa.me/5500000000000" },
  { label: "LinkedIn", handle: "in/novasconcelos", href: "https://linkedin.com/in/novasconcelos" },
  { label: "Instagram", handle: "@novasconcelos", href: "https://instagram.com/novasconcelos" },
  { label: "E-mail", handle: "contato@novasconcelos.com.br", href: "mailto:contato@novasconcelos.com.br" },
];

const SOBRE: ContentMap["sobre"] = {
  facts: [
    { dt: "Atuação", dd: "Desenvolvimento, arquitetura, liderança técnica" },
    { dt: "Foco", dd: "Processos, estabilização, decisão técnica" },
    { dt: "Escrita", dd: "Carreira, soft skills, operação" },
    { dt: "Base", dd: "Brasil" },
  ],
};

const THEME_NATHAN = {
  tokens: {
    accent: "#C8A97A", // dourado levemente mais brilhante para contrastar no preto
    bg: "#0A0A0A",    // preto quase puro
    fg: "#F1EFE9",    // branco quente
    muted: "#8C887E", // cinza médio
  },
  mode: "dark" as const,
};

// ── In9 Tecnologia ──────────────────────────────────────────────────────────

const IN9_SECTIONS: { id: SectionId; enabled: boolean }[] = [
  { id: "diagnostico",  enabled: true  },
  { id: "solucoes",     enabled: true  },
  { id: "processo",     enabled: true  }, // posição 03 — após Soluções
  { id: "projetos",     enabled: true  },
  { id: "porqueinov",   enabled: true  },
  { id: "testimonials", enabled: false }, // oculto até haver depoimentos reais
  { id: "finalcta",     enabled: true  },
];

const IN9_THEME = {
  tokens: {
    "bg":          "oklch(0.15 0.01 255)",
    "bg-2":        "oklch(0.185 0.012 252)",
    "bg-3":        "oklch(0.225 0.013 250)",
    "line":        "oklch(0.34 0.014 250 / 0.5)",
    "line-soft":   "oklch(0.34 0.014 250 / 0.24)",
    "fg":          "oklch(0.96 0.006 240)",
    "fg-2":        "oklch(0.75 0.01 245)",
    "fg-3":        "oklch(0.55 0.012 250)",
    "muted":       "oklch(0.55 0.012 250)",
    "accent":      "oklch(0.68 0.15 250)",
    "accent-2":    "oklch(0.75 0.13 240)",
    "accent-soft": "oklch(0.68 0.15 250 / 0.14)",
    "glow":        "oklch(0.68 0.15 250 / 0.26)",
    "radius":      "14px",
    "radius-lg":   "22px",
  },
  mode: "dark" as const,
};

const IN9_HERO = {
  note: "+14 anos transformando ideia em produto.",
  lede: "Sites, sistemas e plataformas sob medida — projetados para organizar sua operação, vender mais e crescer sem refazer tudo depois.",
  status: "Disponível para novos projetos",
};

const IN9_PROJETOS = [
  { cat: "Loja virtual",         name: "E-commerce completo",     sector: "Catálogo · Pagamentos · Estoque", body: "Loja online ponta a ponta: catálogo, checkout com pagamento integrado e gestão de estoque em tempo real.", hue: 245, year: "2026" },
  { cat: "Sistema interno",      name: "Painel administrativo",   sector: "Dashboard · Insights · Relatórios", body: "Central de controle do negócio: indicadores ao vivo, insights automáticos e relatórios prontos pra decisão.", hue: 210, year: "2026" },
];

const IN9_TESTIMONIALS = [
  { q: "A In9 entregou em seis semanas o que outra equipe não conseguiu em seis meses. Postura sênior do começo ao fim.", name: "Rafael Coutinho", role: "CEO · Norte Materiais" },
  { q: "Cuidaram do produto como se fosse deles. O resultado fala por si: dobramos as marcações no primeiro mês.",       name: "Vivian Aoki",     role: "Sócia · Clínica Vitruvio" },
];

const IN9_CTA = {
  title: "Seu próximo produto começa aqui.",
  lede:  "Conte sobre o seu projeto. Em até 24 horas devolvemos um diagnóstico inicial com escopo, prazo e estimativa — sem custo, sem pressão.",
  vagas: "3 vagas para Q3 / 2026",
};

const IN9_DIAGNOSTICO = {
  problemHeadline: "O jeito antigo está custando **caro** para você.",
  problemLede:     "Processos manuais, informações espalhadas e ferramentas desconectadas geram perda de tempo, erros e oportunidades perdidas.",
  solutionLede:    "Centralizamos a informação, eliminamos o trabalho manual e devolvemos o controle do que importa: seus resultados e clientes bem atendidos.",
  bannerHeadline:  "Menos bagunça. Mais controle. Mais tempo. Mais resultado.",
  bannerDesc:      "In9 é o sistema que trabalha por você, enquanto você foca no que faz sua empresa crescer.",
  features: ["Menos trabalho manual", "Mais agilidade e produtividade", "Decisões com dados reais", "Mais controle, menos risco"],
  cards: [
    { n: "01", tone: "blue",   icon: "creditcard", title: "Chega de caixa fechado.",               desc: "Acompanhe entradas, saídas e DRE em tempo real. Tenha clareza total do seu financeiro, sempre atualizado.",         result: "Decisões mais rápidas e lucratividade real." },
    { n: "02", tone: "violet", icon: "box",        title: "Estoque inteligente, nada de achismo.",  desc: "Inventário em tempo real, alertas de mínimo e integração com vendas. Tenha o produto certo na hora certa.",         result: "Menos falta, menos excesso, mais giro." },
    { n: "03", tone: "green",  icon: "users",      title: "Operação alinhada, time no controle.",   desc: "Processos claros dentro do sistema. Sua equipe segue o fluxo — sem ruídos e sem retrabalho.",                       result: "Mais eficiência e menos confusão." },
    { n: "04", tone: "amber",  icon: "trending",   title: "Crescer com estrutura não é sorte, é sistema.", desc: "Arquitetura escalável para atender 10 ou 10 mil clientes — sem precisar refazer nada no caminho.",           result: "Crescimento sustentável sem limites." },
    { n: "05", tone: "blue",   icon: "calendar",   title: "Agendamento online, acabou o vai e vem.", desc: "Seu cliente agenda, recebe lembrete e você organiza tudo automaticamente. Sem WhatsApp, sem planilhas.",           result: "Mais tempo para o que importa: seu cliente." },
  ],
};

const IN9_SOLUCOES = [
  { n: "01", t: "Sites institucionais",       d: "Presenças digitais que comunicam posicionamento, com performance e SEO de fábrica.",                  tags: "Alta performance, Fácil de editar, Aparece no Google" },
  { n: "02", t: "Catálogos de produto",       d: "Vitrines navegáveis com filtros inteligentes, integração de estoque e checkout.",                     tags: "Loja online, Estoque integrado, Checkout rápido" },
  { n: "03", t: "Plataformas de agendamento", d: "Sistemas de marcação com confirmação automática, lembretes e gestão de agenda.",                      tags: "Agenda online, Confirmação automática, WhatsApp" },
  { n: "04", t: "Sistemas personalizados",    d: "Software interno feito sob medida para o jeito que sua operação realmente funciona.",                 tags: "Painel de controle, Login seguro, Dados em tempo real" },
  { n: "05", t: "UX & UI Design",             d: "Design de interfaces e design systems que escalam com o produto e o time.",                           tags: "Protótipo navegável, Pesquisa com usuários, Guia de estilo" },
];

const IN9_PORQUEINOV = [
  { n: "01", t: "Abordagem personalizada",      d: "Cada projeto começa com uma imersão real no negócio. Sem templates, sem decks genéricos." },
  { n: "02", t: "Arquitetura escalável",         d: "Stack moderna pensada para crescer com você — Next.js, TypeScript, Postgres, edge." },
  { n: "03", t: "Tecnologias modernas",          d: "Trabalhamos com o estado da arte. React Server Components, IA aplicada, design tokens." },
  { n: "04", t: "Pensamento estratégico",        d: "Engenharia + produto + negócio na mesma sala. Decisões com contexto, não opiniões soltas." },
  { n: "05", t: "Entrega rápida com qualidade",  d: "Sprints curtos, releases semanais e revisão técnica em cada pull request." },
];

const IN9_PROCESSO = [
  { n: "01", t: "Descoberta",      d: "Imersão no negócio, entrevistas, mapeamento de jornadas e benchmarks.",                          dur: "~1 sem." },
  { n: "02", t: "Estratégia",      d: "Definição de escopo, arquitetura da informação e métricas de sucesso.",                          dur: "~1 sem." },
  { n: "03", t: "Design",          d: "Fluxos, wireframes, protótipos de alta fidelidade e design system.",                             dur: "~2 sem." },
  { n: "04", t: "Desenvolvimento", d: "Engenharia em sprints curtos com revisão contínua e testes automatizados.",                      dur: "~3 sem." },
  { n: "05", t: "Lançamento",      d: "Deploy, monitoramento, treinamento do time e ciclo de evolução contínua.",                       dur: "~1 sem." },
];

export function seed() {
  const now = new Date().toISOString();

  const tenants: Tenant[] = [
    { id: NATHAN_ID, slug: "nathan", name: "Nathan Vasconcelos", layout_type: "personal",  created_at: now },
    { id: IN9_ID,    slug: "in9",    name: "In9 Tecnologia",     layout_type: "corporate", created_at: now },
  ];

  const domains: TenantDomain[] = [
    // Mock para futuramente apontar nathanvasc.com.br
    // { id: randomUUID(), tenant_id: NATHAN_ID, host: "nathanvasc.com.br", verified_at: null },
  ];

  const profiles: Profile[] = [
    { id: DEV_USER_ID, email: "dev@local", full_name: "Dev Super-Admin", avatar_url: null, is_super: true },
  ];

  const members: TenantMember[] = [
    { tenant_id: NATHAN_ID, user_id: DEV_USER_ID, role: "owner" },
    { tenant_id: IN9_ID,    user_id: DEV_USER_ID, role: "owner" },
  ];

  const invites: TenantInvite[] = [];

  const sections: TenantSection[] = [
    // Nathan
    ...DEFAULT_SECTION_ORDER.map((id, i) => ({
      tenant_id: NATHAN_ID,
      section_id: id,
      enabled: true,
      position: i,
    })),
    // In9
    ...IN9_SECTIONS.map(({ id, enabled }, i) => ({
      tenant_id: IN9_ID,
      section_id: id,
      enabled,
      position: i,
    })),
  ];

  const content: TenantContent[] = [
    // Nathan
    { tenant_id: NATHAN_ID, key: "copy",      value: COPY,          updated_at: now },
    { tenant_id: NATHAN_ID, key: "stats",     value: STATS,         updated_at: now },
    { tenant_id: NATHAN_ID, key: "articles",  value: ARTICLES,      updated_at: now },
    { tenant_id: NATHAN_ID, key: "tools",     value: TOOLS,         updated_at: now },
    { tenant_id: NATHAN_ID, key: "services",  value: SERVICES,      updated_at: now },
    { tenant_id: NATHAN_ID, key: "help",      value: HELP,          updated_at: now },
    { tenant_id: NATHAN_ID, key: "portfolio", value: PORTFOLIO,     updated_at: now },
    { tenant_id: NATHAN_ID, key: "contact",   value: CONTACT_LINKS, updated_at: now },
    { tenant_id: NATHAN_ID, key: "sobre",     value: SOBRE,         updated_at: now },
    // In9
    { tenant_id: IN9_ID, key: "in9-hero",         value: IN9_HERO,         updated_at: now },
    { tenant_id: IN9_ID, key: "in9-projetos",      value: IN9_PROJETOS,     updated_at: now },
    { tenant_id: IN9_ID, key: "in9-testimonials",  value: IN9_TESTIMONIALS, updated_at: now },
    { tenant_id: IN9_ID, key: "in9-cta",           value: IN9_CTA,          updated_at: now },
    { tenant_id: IN9_ID, key: "in9-diagnostico",   value: IN9_DIAGNOSTICO,  updated_at: now },
    { tenant_id: IN9_ID, key: "in9-solucoes",      value: IN9_SOLUCOES,     updated_at: now },
    { tenant_id: IN9_ID, key: "in9-porqueinov",    value: IN9_PORQUEINOV,   updated_at: now },
    { tenant_id: IN9_ID, key: "in9-processo",      value: IN9_PROCESSO,     updated_at: now },
  ];

  const themes: TenantTheme[] = [
    { tenant_id: NATHAN_ID, tokens: THEME_NATHAN.tokens, mode: THEME_NATHAN.mode },
    { tenant_id: IN9_ID,    tokens: IN9_THEME.tokens,    mode: IN9_THEME.mode    },
  ];

  return { tenants, domains, profiles, members, invites, sections, content, themes };
}

// Pequeno helper só pra evitar import cíclico em quem só quer o UUID.
export const SEED_TENANT_IDS = { nathan: NATHAN_ID, in9: IN9_ID };

// O import abaixo é necessário só para tipo, mas mantém referência viva
// para `randomUUID` (impede tree-shake quando o arquivo é importado em rotas server).
void randomUUID;
