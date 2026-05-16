# Status do Projeto — Site Nathan v2 Multi-tenant

**Última atualização:** 2026-05-15  
**Modelo:** Claude Haiku 4.5  
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
- 8 seções padrão: `HERO, STATS, SOBRE, CONTEUDOS, FERRAMENTAS, CONSULTORIA, PORTFOLIO, CONTATO`
- Toggles salvos em `tenant.sections` (upsert pattern)
- `/admin/sections` — interface com checkboxes
- `saveSectionsAction` persiste em DB

### ✅ Tema dinâmico
- `tenant_theme.tokens` (accent, bg, fg, muted) injetado como CSS vars inline
- `tokensToStyle()` converte JSON → style object
- Aplicado no `<div>` do layout, fontes e cores herdam automaticamente

### ✅ Conteúdo tipado
- Seed com todo conteúdo v1: STATS, ARTICLES, TOOLS, SERVICES, HELP, PORTFOLIO, CONTACT_LINKS, COPY
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
- **`/admin/sections`** — Seções com checkboxes
- **`/admin/members`** — Lista membros, form criar convite (email/code), lista convites pendentes
- **`/admin/content`** — Placeholder (editor vem na Fase 3)
- **`/admin/super`** — Criar novo tenant (super-admin only)
- Sidebar navegação, DEV badge, logout, email do usuário

### ✅ Componentes refatorados
Todos recebem props tipadas, zero imports de `content/`:
- `Hero`, `Stats`, `Sobre`, `Conteudos`, `Ferramentas`, `Consultoria`, `Portfolio`, `Contato`
- `TopBar` — IntersectionObserver, seções ativas, "use client"
- `Footer` — Relógio ao vivo, "use client"
- `SectionHeader`, `Arrow` — utilitários

### ✅ Build + routes
- 13 rotas: `/`, `/[tenant]`, `/admin/*` (5), `/auth/*` (4), `/api/admin/*` (2)
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
│  ├─ [tenant]/
│  │  ├─ layout.tsx                 # Tenant gate, theme injection
│  │  ├─ page.tsx                   # Main — fetch content, render sections
│  │  └─ (marketing)/
│  │     ├─ layout.tsx
│  │     └─ page.tsx                # Mesma coisa (redundante, refatorar)
│  ├─ admin/
│  │  ├─ layout.tsx                 # Auth gate, sidebar
│  │  ├─ page.tsx                   # Dashboard
│  │  ├─ sections/
│  │  │  ├─ page.tsx
│  │  │  └─ actions.ts
│  │  ├─ members/
│  │  │  ├─ page.tsx
│  │  │  └─ actions.ts
│  │  ├─ content/
│  │  │  └─ page.tsx                # Placeholder
│  │  └─ super/
│  │     ├─ page.tsx
│  │     └─ actions.ts
│  └─ auth/
│     ├─ login/page.tsx
│     ├─ signup/page.tsx
│     ├─ accept/page.tsx
│     ├─ reset/page.tsx
│     └─ logout/route.ts
├─ components/                       # Todos tipados, zero imports content/
│  ├─ (seções) Hero, Stats, Sobre, Conteudos, Ferramentas, Consultoria, Portfolio, Contato
│  ├─ TopBar, Footer
│  ├─ ToolIcon, ServiceIcon
│  ├─ SectionHeader, Arrow
│  └─ (admin) MembersTable, InviteForm, etc. (simples, sem client state complexo)
├─ lib/
│  ├─ db/
│  │  ├─ adapter.ts                 # Interface (23 operations)
│  │  ├─ mock.ts                    # File-based, `.data/db.json`
│  │  ├─ seed.ts                    # tenant:nathan + dev super-admin + conteúdo
│  │  ├─ types.ts                   # Row types: Tenant, TenantMember, etc.
│  │  └─ index.ts                   # Re-export `mock.adapter` → swap aqui
│  ├─ auth/
│  │  └─ index.ts                   # getSession(), signInAs(), signOut(), guards
│  ├─ tenant.ts                     # getCurrentTenant(), resolveTenant()
│  ├─ theme.ts                      # tokensToStyle()
│  └─ types.ts                      # CopyContent, Article, Tool, Service, etc.
├─ middleware.ts                     # Resolve tenant, set x-tenant-slug
├─ .env.local                        # NEXT_PUBLIC_DEV_MODE=true
├─ .data/
│  └─ db.json                        # Mock DB (gitignored, criado auto)
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
    { "id": "00000000-0000-0000-0000-00000000000a", "slug": "nathan", "name": "Nathan" }
  ],
  "profiles": [
    { "user_id": "00000000-0000-0000-0000-000000000001", "email": "dev@local", "is_super": true }
  ],
  "tenant_members": [
    { "user_id": "...", "tenant_id": "...", "role": "admin" }
  ],
  "tenant_sections": [
    { "tenant_id": "...", "section_id": "HERO", "enabled": true },
    ...
  ],
  "tenant_content": [
    { "tenant_id": "...", "content_key": "hero.headline", "value": "Tecnologia além..." }
  ],
  "tenant_theme": [
    { "tenant_id": "...", "tokens": { "accent": "#B8895A", "bg": "#F5F3EE", ... } }
  ]
}
```

### Rotas testadas (200 OK)
```
GET  /                        → Redirect /nathan
GET  /nathan                  → Home (Hero, Stats, Sobre, Conteudos, Ferramentas, Consultoria, Portfolio, Contato)
GET  /admin                   → Dashboard
GET  /admin/sections          → Checkboxes seções
GET  /admin/members           → Lista membros + form convite
GET  /admin/content           → Placeholder
GET  /admin/super             → Form criar tenant
GET  /auth/login              → Dev: "Entrar como dev"
GET  /auth/signup             → Placeholder (reroute em produção)
GET  /auth/accept             → Placeholder
GET  /auth/reset              → Placeholder
GET  /auth/logout             → POST handler
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

**Opção recomendada:** Começar Fase 2 já — setup Supabase + migrations + adapter. Quer que eu:
1. Gere todas as migrations SQL prontas pra colar? 
2. Implemente `lib/db/supabase.ts` completo?
3. Faça tudo em sequência?
