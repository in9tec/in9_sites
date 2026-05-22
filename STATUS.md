# Status do Projeto — Site Nathan v2 Multi-tenant

**Última atualização:** 2026-05-20  
**Estado atual:** ✅ Fase 1 (Mock-local) — COMPLETA

---

## O que foi feito (Fase 1)

### ✅ Arquitetura multi-tenant path-based
- Middleware resolve tenant por path (`/[tenant]`) → busca slug em DB → injeta `x-tenant-slug` em request headers
- Suporte para custom domain (hardcoded em `HOST_MAP` por agora)
- 404 se tenant não existe
- `RESERVED_PATHS` (`admin`, `auth`, `app`, `_next`) pulam resolução de tenant

### ✅ DB Adapter pattern (zero risco de reescrita)
- `lib/db/adapter.ts` — Interface abstrata com 23 operations
- `lib/db/mock.ts` — Implementação file-based (`.data/db.json`)
- `lib/db/seed.ts` — Seed automático: tenant "nathan" + dev super-admin + todo conteúdo v1
- **Próximo passo:** Trocar `lib/db/mock.ts` por `lib/db/supabase.ts` — zero mudança em componentes

### ✅ Auth DEV_MODE
- `NEXT_PUBLIC_DEV_MODE=true` → `getSession()` retorna seed super-admin automaticamente
- Sem login necessário em dev
- `/auth/login` mostra botão "Entrar como dev"
- Pronto para trocar por auth real Supabase na Fase 2

### ✅ Seções por tenant
- 15 seções no total: 8 nathan (`HERO, STATS, SOBRE, CONTEUDOS, FERRAMENTAS, CONSULTORIA, PORTFOLIO, CONTATO`) + 7 in9 (`IN9_HERO, IN9_DIAGNOSTICO, IN9_SOLUCOES, IN9_PORQUEINOV, IN9_PROCESSO, IN9_PROJETOS, IN9_CTA`)
- Toggles salvos em `tenant_sections` (upsert pattern), isolados por tenant
- `/admin/content` — seções + editor de conteúdo unificados (checkboxes + links de edição por seção)
- `toggleSectionsAction` usa `db.getSections(tenant.id)` — correto, por tenant

### ✅ Layout multi-tipo (`layout_type`)
- `Tenant.layout_type: "personal" | "corporate"` — controla qual layout renderizar
- `app/[tenant]/page.tsx` faz branch: corporate → componentes in9, personal → seções nathan
- Novo tenant criado via `/admin/super` já recebe `layout_type` no form

### ✅ Tema dinâmico
- `tenant_theme.tokens` (accent, bg, fg, muted) injetado como CSS vars inline no `<div>`
- `tokensToStyle()` converte JSON → style object
- `[data-theme="dark"]` selector funciona em div (não só em `<html>`)
- Nathan: tema dark (`#0A0A0A` bg / `#F1EFE9` fg / `#C8A97A` accent)
- In9: tokens oklch (`oklch(0.15 0.02 265)` bg / `oklch(0.97 0.005 80)` fg)

### ✅ Conteúdo tipado
- Seed com conteúdo nathan v1: STATS, ARTICLES, TOOLS, SERVICES, HELP, PORTFOLIO, CONTACT_LINKS, COPY
- Seed in9: IN9_HERO, IN9_PROJETOS, IN9_TESTIMONIALS, IN9_CTA, IN9_DIAGNOSTICO, IN9_SOLUCOES, IN9_PORQUEINOV, IN9_PROCESSO
- Tabela `tenant_content` na schema (pronta para Supabase)
- Mock já salva/carrega do `.data/db.json`

### ✅ Sistema de convites (design, não implementado no frontend)
- `tenant_invites` schema com dois fluxos:
  - **Email invite:** `inviteUserByEmail(email, role)` → cria row com `invite_code`
  - **Code invite:** `createInvite(mode: 'code', role)` → slug curto + expira em 7 dias
- `/auth/accept` + `/auth/signup?code=` → páginas prontas pra aceitar
- Admin pode listar/revogar convites em `/admin/members`

### ✅ Página admin completa
- **`/admin`** — Dashboard (placeholder)
- **`/admin/content`** — Seções + conteúdo unificados: checkboxes por seção + links "Editar" para cada content_key
- **`/admin/content/[key]`** — Editor tipado para cada content_key (17 chaves suportadas)
- **`/admin/members`** — Lista membros, form criar convite (email/code), lista convites pendentes
- **`/admin/super`** — Criar novo tenant com `layout_type` (super-admin only)
- Sidebar com `AdminNav`: dropdown de tenant (multi) ou nome fixo (single), links, DEV badge, email

### ✅ Componentes refatorados
Todos recebem props tipadas, zero imports de `content/`:
- Nathan: `Hero`, `Stats`, `Sobre`, `Conteudos`, `Ferramentas`, `Consultoria`, `Portfolio`, `Contato`
- In9: `In9Layout` com seções próprias em `components/in9/`
- `TopBar` — IntersectionObserver, seções ativas, "use client"
- `Footer` — Relógio ao vivo, "use client"
- `SectionHeader`, `Arrow` — utilitários

### ✅ Validação Zod em todas as mutations
- `lib/validation.ts` — schemas para todas as server actions
- `CreateTenantSchema`, `SaveSectionsSchema`, `CreateInviteSchema`, `RevokeInviteSchema`, `RemoveMemberSchema`
- Sem mutações sem Zod safeParse

### ✅ Build + routes
- Sem erros de tipo (`npm run build` passa)
- Smoke tests: todos os routes retornam 200

### ✅ Arquivo de plano detalhado
- `PLAN-v2.md` — 5 páginas, DB schema completo, auth flows, 4 fases, migration steps

---

## Estado atual

### Estrutura
```
nathan-site/
├─ app/
│  ├─ layout.tsx                    # Provider, fontes, @font-face
│  ├─ globals.css                   # Tailwind + site.css + admin + auth
│  ├─ page.tsx                      # Redirect pra /nathan (dev default)
│  ├─ not-found.tsx                 # 404 editorial
│  ├─ [tenant]/
│  │  ├─ layout.tsx                 # Tenant gate, theme injection (data-theme + CSS vars)
│  │  └─ page.tsx                   # Branch: layout_type="corporate" → In9Layout, else → Personal
│  ├─ admin/
│  │  ├─ layout.tsx                 # Auth gate, sidebar, tenant switcher
│  │  ├─ page.tsx                   # Dashboard
│  │  ├─ content/
│  │  │  ├─ page.tsx                # Seções (checkboxes) + links "Editar" por seção
│  │  │  ├─ toggle-actions.ts       # toggleSectionsAction — usa db.getSections(tenant.id)
│  │  │  └─ [key]/page.tsx          # Editor tipado por content_key (17 chaves)
│  │  ├─ members/
│  │  │  ├─ page.tsx
│  │  │  └─ actions.ts              # createInvite, revokeInvite, removeMember (Zod)
│  │  └─ super/
│  │     ├─ page.tsx
│  │     └─ actions.ts              # createTenantAction (Zod + layout_type)
│  └─ auth/
│     ├─ login/page.tsx
│     ├─ signup/page.tsx
│     ├─ accept/page.tsx
│     ├─ reset/page.tsx
│     └─ logout/route.ts
├─ components/
│  ├─ (nathan) Hero, Stats, Sobre, Conteudos, Ferramentas, Consultoria, Portfolio, Contato
│  ├─ in9/                          # Componentes isolados do tenant in9
│  │  ├─ In9Layout.tsx
│  │  ├─ in9.css
│  │  └─ ... (seções in9)
│  ├─ admin/
│  │  ├─ AdminNav.tsx               # "use client", dropdown de tenant, links
│  │  └─ ... (MembersTable, InviteForm, etc.)
│  ├─ TopBar, Footer
│  ├─ ToolIcon, ServiceIcon
│  └─ SectionHeader, Arrow
├─ lib/
│  ├─ db/
│  │  ├─ adapter.ts                 # Interface (23 operations)
│  │  ├─ mock.ts                    # File-based, `.data/db.json`
│  │  ├─ seed.ts                    # nathan + in9 + dev super-admin + conteúdo
│  │  ├─ types.ts                   # Tenant, TenantMember, LayoutType, SectionId (15), etc.
│  │  └─ index.ts                   # Re-export `mock.adapter` → swap aqui pra Supabase
│  ├─ auth/
│  │  └─ index.ts                   # getSession(), signInAs(), signOut(), guards
│  ├─ validation.ts                 # Zod schemas para todas as server actions
│  ├─ tenant.ts                     # getCurrentTenant(), resolveTenant()
│  ├─ theme.ts                      # tokensToStyle()
│  └─ types.ts                      # CopyContent, Article, Tool, Service, etc.
├─ middleware.ts                     # Resolve tenant, set x-tenant-slug
├─ .env.local                        # NEXT_PUBLIC_DEV_MODE=true
├─ .data/
│  └─ db.json                        # Mock DB (gitignored, criado auto pelo seed)
├─ tailwind.config.ts
├─ next.config.ts
├─ tsconfig.json
├─ package.json
├─ PLAN-v2.md                        # Plano 5-página, 4 fases
└─ STATUS.md                         # Este arquivo
```

### DB mock (`.data/db.json`)
```json
{
  "tenants": [
    { "id": "...000a", "slug": "nathan", "name": "Nathan", "layout_type": "personal" },
    { "id": "...000b", "slug": "in9",    "name": "In9 Tecnologia", "layout_type": "corporate" }
  ],
  "profiles": [
    { "user_id": "...0001", "email": "dev@local", "is_super": true }
  ],
  "tenant_members": [ ... ],
  "tenant_sections": [
    { "tenant_id": "...000a", "section_id": "HERO", "enabled": true },
    { "tenant_id": "...000b", "section_id": "IN9_HERO", "enabled": true },
    ...
  ],
  "tenant_content": [
    { "tenant_id": "...000a", "content_key": "hero.headline", "value": "..." },
    { "tenant_id": "...000b", "content_key": "in9.hero.headline", "value": "..." },
    ...
  ],
  "tenant_theme": [
    { "tenant_id": "...000a", "tokens": { "accent": "#C8A97A", "bg": "#0A0A0A", "fg": "#F1EFE9", "muted": "#8C887E", "mode": "dark" } },
    { "tenant_id": "...000b", "tokens": { "accent": "oklch(...)", "bg": "oklch(...)", ... } }
  ]
}
```

### Rotas ativas
```
GET  /                              → Redirect /nathan
GET  /nathan                        → Home nathan (Personal layout, dark theme)
GET  /in9                           → Home in9 (Corporate/In9 layout, oklch dark theme)
GET  /admin                         → Dashboard
GET  /admin/content?tenant=nathan   → Seções + links "Editar" (nathan)
GET  /admin/content?tenant=in9      → Seções + links "Editar" (in9)
GET  /admin/content/[key]           → Editor de content_key
GET  /admin/members?tenant=...      → Lista membros + form convite
GET  /admin/super                   → Form criar tenant (super-admin only)
GET  /auth/login                    → Dev: "Entrar como dev"
GET  /auth/signup                   → Código de convite
GET  /auth/accept                   → Email invite
GET  /auth/reset                    → Reset senha (placeholder)
```

---

## Próximos passos (Fase 2)

### 2.1 Setup Supabase
- [ ] Criar projeto Supabase (dev + prod)
- [ ] Copiar `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Adicionar a `.env.local`

### 2.2 Migrations (8 tabelas)
- [ ] `tenants`
- [ ] `tenant_domains`
- [ ] `profiles` (trigger de `auth.users`)
- [ ] `tenant_members`
- [ ] `tenant_invites`
- [ ] `tenant_sections`
- [ ] `tenant_content`
- [ ] `tenant_theme`
- [ ] RLS policies em todas

### 2.3 TypeScript
- [ ] `supabase gen types typescript` → `lib/types/database.ts`

### 2.4 Adapter Supabase
- [ ] Criar `lib/db/supabase.ts` (mesma interface)
- [ ] Trocar import em `lib/db/index.ts` → **Zero mudança em componentes**

### 2.5 Auth Supabase
- [ ] Criar `lib/auth/supabase.ts`
- [ ] `getSession()` usa `supabase.auth.getUser()`
- [ ] Implementar `/auth/login` com form email+senha
- [ ] Implementar `/auth/reset` (magic link ou password reset)
- [ ] Ativar `inviteUserByEmail()` no `/admin/members`

### 2.6 Deploy
- [ ] Vercel: adicionar env vars
- [ ] Testar login real em staging
- [ ] Domínio `nathanvasc.com.br` → apontado pra Vercel

---

## Decisões registradas

- **Stack:** Next.js 15 App Router + TypeScript strict + Tailwind 3 + Supabase (Postgres + Auth)
- **Tenancy:** Path-based (`/[tenant]`) + custom domain (`nathanvasc.com.br`)
- **Auth:** Supabase email+senha (sem Google OAuth)
- **Convites:** Email invite + code invite, mesma tabela
- **Persistência:** File-based mock (v1) → Supabase Postgres (Fase 2)
- **CSS:** Tailwind + CSS vars dinâmicas (`--accent`, `--bg`, `--fg`, `--muted`)
- **Componentes:** Props tipadas, zero business logic, server components por padrão

---

## Referências

- `PLAN-v2.md` — Plano completo 5 páginas, schema detalhado, fases 2-4
- `lib/db/types.ts` — Tipos de dados (row-by-row)
- `lib/db/adapter.ts` — Interface, assinaturas de 23 operations
- `lib/db/seed.ts` — Seed automático (tenant + super-admin + conteúdo v1)
- `.env.local` — Variáveis de ambiente

---

## Próxima ação sugerida

**Fase 2 — Supabase.** A Fase 1 está completa e limpa. Para iniciar:
1. Criar projeto Supabase → copiar `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
2. Gerar as migrations SQL (8 tabelas + RLS) → colar no SQL Editor do Supabase
3. `supabase gen types typescript` → `lib/types/database.ts`
4. Implementar `lib/db/supabase.ts` (mesma interface do mock)
5. Trocar 1 linha em `lib/db/index.ts` → **zero mudança em componentes**
