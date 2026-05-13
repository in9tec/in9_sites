import type {
  Article,
  ContactLink,
  PortfolioItem,
  Service,
  Stat,
  Tool,
} from "@/lib/types";

export const COPY = {
  headline: "Tecnologia além\ndo código",
  subheadline:
    "O que realmente faz diferença na sua carreira, nas equipes e em sistemas reais.",
  heroDescription:
    "Experiência prática em todo fluxo de desenvolvimento, implantação, estabilização de sistemas, planejamento e gestão de equipes.",
};

export const STATS: Stat[] = [
  { n: "10+", l: "Anos em tecnologia" },
  { n: "40+", l: "Sistemas em produção" },
  { n: "15", l: "Times acompanhados" },
  { n: "∞", l: "Deploys quebrados resolvidos" },
];

export const ARTICLES: Article[] = [
  { n: "01", tag: "Carreira", title: "O que eu gostaria que tivessem me dito antes da faculdade", read: "8 min" },
  { n: "02", tag: "Carreira", title: "Ser bom tecnicamente não garante crescimento", read: "6 min" },
  { n: "03", tag: "Soft skills", title: "O profissional que resolve problemas sempre se destaca", read: "5 min" },
  { n: "04", tag: "Processos", title: "Onde processos falham no desenvolvimento de sistemas", read: "9 min" },
  { n: "05", tag: "Entrega", title: "Problemas comuns em deploy e como evitá-los", read: "7 min" },
  { n: "06", tag: "Sistemas", title: "Por que sistemas quebram após implantação", read: "10 min" },
  { n: "07", tag: "Times", title: "Como melhorar a comunicação entre times técnicos", read: "6 min" },
  { n: "08", tag: "Liderança", title: "Erros comuns na organização de equipes de tecnologia", read: "8 min" },
];

export const TOOLS: Tool[] = [
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

export const SERVICES: Service[] = [
  { n: "01", t: "Consultoria de processos", d: "Diagnóstico e redesenho do fluxo de desenvolvimento — do planejamento ao deploy. Para times que entregam pouco e travam muito.", icon: "process" },
  { n: "02", t: "Mentoria de carreira", d: "Sessões individuais para profissionais que querem evoluir além do técnico. Decisão, comunicação e posicionamento.", icon: "person" },
  { n: "03", t: "Estabilização de sistemas", d: "Apoio prático para times com sistemas instáveis em produção. Diagnóstico, priorização e plano de ação direto.", icon: "stabilize" },
  { n: "04", t: "Assessoria a líderes", d: "Acompanhamento contínuo para tech leads e gerentes que precisam destravar entregas e organizar times sob pressão.", icon: "leader" },
];

export const HELP: string[] = [
  "Falhas no processo de desenvolvimento",
  "Dificuldade na estabilização de sistemas",
  "Falta de organização e fluxo em equipes",
  "Decisão de tecnologias adequadas",
  "Baixa eficiência na entrega de software",
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    kind: "Palestra",
    year: "2024",
    title: "Tecnologia além do código — para 400+ pessoas",
    place: "Auditório universitário",
    desc: "Sobre carreira, decisão técnica e por que sistemas reais exigem mais do que escrever código.",
    image: "/images/palestra-1.jpg",
    feature: true,
  },
  {
    kind: "Projeto",
    year: "2023",
    title: "Estabilização de plataforma com 30M req/dia",
    place: "Empresa de mídia",
    desc: "Diagnóstico, priorização e plano de ação direto. De alertas todo dia para semanas sem incidente.",
  },
  {
    kind: "Mentoria",
    year: "2023→",
    title: "Acompanhamento de tech leads",
    place: "Programa contínuo",
    desc: "Sessões individuais com tech leads em transição para gerência. Decisão, comunicação e priorização.",
  },
  {
    kind: "Workshop",
    year: "2024",
    title: "Processos de entrega para times em crescimento",
    place: "Time de produto · 25 pessoas",
    desc: "Redesenho do fluxo do planejamento ao deploy. Reuniões, papéis, métricas e ritos.",
  },
  {
    kind: "Consultoria",
    year: "2022",
    title: "Migração de monólito legado",
    place: "Fintech early-stage",
    desc: "Decisão de arquitetura, faseamento e gestão de risco em produção. Sem big-bang.",
  },
  {
    kind: "Palestra",
    year: "2024",
    title: "O que ninguém te conta sobre liderar times técnicos",
    place: "Meetup interno",
    desc: "Erros comuns na organização de equipes de tecnologia — e o que realmente funciona.",
  },
];

// TODO: substituir placeholders por contatos reais.
export const CONTACT_LINKS: ContactLink[] = [
  { label: "WhatsApp", handle: "+55 (11) 0 0000-0000", href: "https://wa.me/5500000000000" },
  { label: "LinkedIn", handle: "in/novasconcelos", href: "https://linkedin.com/in/novasconcelos" },
  { label: "Instagram", handle: "@novasconcelos", href: "https://instagram.com/novasconcelos" },
  { label: "E-mail", handle: "contato@novasconcelos.com.br", href: "mailto:contato@novasconcelos.com.br" },
];
