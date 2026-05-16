# Plano v2 — Plataforma multi-cliente

## Contexto

O site v1 (Next.js + TS + Tailwind) está rodando localmente para o tenant "nathan", com homepage editorial, toggles de seção via `content/sections.json` e admin protegido por senha. A v2 transforma essa base em **produto multi-cliente** — várias pessoas usam o mesmo deploy, cada uma com seu próprio conteúdo, paleta e seções ligadas/desligadas.

**Decisões já tomadas:**
- Stack: **Next.js (App Router) + Supabase** (Postgres + Auth + Storage).
- Tenancy: **path-based** (`/[tenant]/...`) **+ domínio custom** (`nathanvasc.com.br` aponta para o mesmo deploy). Subdomínio fica fora.
- Deploy: Vercel.

**Bloqueante atual:** `content/sections.json` é escrito em runtime — não funciona em Vercel (FS read-only). Resolver via Supabase é parte da Fase 1.

---

## Modelo de tenancy

### Resolução do tenant

```
Request → middleware.ts
  1. Se host está em `tenant_domains` → resolve tenant por domínio, reescreve URL para /[tenant]/...
  2. Senão, pega primeiro segmento do path como slug do tenant
  3. Anexa tenantId em request header (x-tenant-id) para Server Components
```

Rotas:
- `/[tenant]` → home do tenant
- `/[tenant]/blog/[slug]` → artigo (fase 4)
- `/admin` → painel (auth obrigatória, escopo definido pelo `tenant_id` do usuário)
- `/app/*` → área autenticada de finanças (fase 4, escopo pessoal, não por tenant)
- `/` (root sem tenant) → landing do produto explicando o serviço

### Domínio custom

Cliente aponta CNAME/A para Vercel. Vercel já roteia para o app. O middleware consulta `tenant_domains` para mapear `host → tenant_id` antes de cair no resolver por path.

---

## Modelo de dados (Supabase)

```sql
-- Identidade do tenant
tenants (
  id          uuid pk default gen_random_uuid(),
  slug        text unique not null,          -- "nathan", "joao"
  name        text not null,                 -- "Nathan Vasconcelos"
  created_at  timestamptz default now()
)

tenant_domains (
  id          uuid pk,
  tenant_id   uuid fk → tenants,
  host        text unique not null,          -- "nathanvasc.com.br"
  verified_at timestamptz
)

-- Quem pode editar o tenant
profiles (
  id          uuid pk references auth.users,
  full_name   text,
  avatar_url  text,
  is_super    boolean default false          -- super-admin (eu) acessa tudo
)

tenant_members (
  tenant_id   uuid fk,
  user_id     uuid fk,
  role        text check (role in ('owner','editor')),
  primary key (tenant_id, user_id)
)

-- Conteúdo
tenant_sections (
  tenant_id   uuid fk,
  section_id  text,                          -- 'hero', 'sobre', ...
  enabled     boolean default true,
  position    int,                           -- ordem custom
  primary key (tenant_id, section_id)
)

tenant_content (
  tenant_id   uuid fk,
  key         text,                          -- 'copy.headline', 'stats', 'articles', ...
  value       jsonb not null,                -- conteúdo livre (text, array, etc)
  updated_at  timestamptz default now(),
  primary key (tenant_id, key)
)

tenant_theme (
  tenant_id   uuid pk fk,
  tokens      jsonb not null                 -- { accent: "#B8895A", bg: "#F5F3EE", ... }
)

-- Storage: bucket `tenant-assets/<tenant_id>/...` para imagens (Supabase Storage)
```

**RLS:**
- `tenants`, `tenant_*`: select público se a aplicação precisa renderizar o site (anon read), mas writes só pelos membros do tenant ou super-admin.
- `profiles`: usuário lê o próprio, super-admin lê tudo.
- Política template: `tenant_id IN (SELECT tenant_id FROM tenant_members WHERE user_id = auth.uid()) OR (SELECT is_super FROM profiles WHERE id = auth.uid())`.

---

## Auth

- **Supabase Auth com email + senha** (sem OAuth na fase 2 — Google fica como opção futura se algum cliente pedir).
- Confirmação de email obrigatória antes de liberar `/admin` (padrão do Supabase).
- Reset de senha via `resetPasswordForEmail()` → página `/auth/reset`.
- Senha validada com Zod no client: mín. 8 chars, pelo menos 1 número.
- Rate limiting do Supabase já cobre brute-force.
- Magic link fica habilitado no provider mas **não exposto na UI** — serve como fallback de suporte (você manda `signInWithOtp` se cliente esquecer a senha).

### Fluxo de convite (sem signup público)

Cadastro aberto fica **desligado**. Só super-admin cria membros, por dois caminhos paralelos:

**A. Convite por email** (caminho recomendado, mais limpo)
- Super-admin no `/admin/_super/tenants/[id]/members` clica "Convidar" → digita email + papel.
- Server action chama `supabase.auth.admin.inviteUserByEmail(email, { redirectTo: "/auth/accept" })` com service role.
- Insere linha em `tenant_invites` com `tenant_id`, `email`, `role`, `status='pending'`.
- Cliente recebe email do Supabase com link → cai em `/auth/accept?token=...` → define senha → trigger associa usuário ao `tenant_members` com o `role` do convite, marca convite como `accepted`.

**B. Código de convite** (útil para casos sem email confiável, ou compartilhar via WhatsApp)
- Super-admin gera convite sem email: escolhe tenant + role → sistema cria registro em `tenant_invites` com `code` (slug curto tipo `xK7-9PQ-4M`), `expires_at` (default 7 dias), `max_uses=1`.
- UI mostra o código e link `seusite.com/auth/signup?code=xK7-9PQ-4M`.
- Pessoa acessa o link → form pede email + senha → server action valida código (não expirado, não usado), cria usuário via `signUp`, associa ao tenant, marca código como usado.
- Mesma tabela `tenant_invites` cobre os dois fluxos — só muda quais colunas estão preenchidas.

### Schema adicional

```sql
tenant_invites (
  id          uuid pk default gen_random_uuid(),
  tenant_id   uuid fk → tenants,
  role        text check (role in ('owner','editor')),
  email       text,                          -- preenchido no fluxo A
  code        text unique,                   -- preenchido no fluxo B
  status      text check (status in ('pending','accepted','revoked','expired')) default 'pending',
  max_uses    int default 1,
  uses        int default 0,
  expires_at  timestamptz default now() + interval '7 days',
  created_by  uuid fk → auth.users,
  created_at  timestamptz default now(),
  accepted_by uuid fk → auth.users,
  accepted_at timestamptz,
  check (email is not null or code is not null)
)
```

RLS: super-admin lê/escreve tudo; owner do tenant lê/escreve convites do próprio tenant; código de convite é validado por edge function/server action com service role (sem expor lista).

### Rotas de auth

- `/auth/login` — email + senha.
- `/auth/signup?code=...` — só funciona com código válido (fluxo B).
- `/auth/accept?token=...` — finaliza convite por email (fluxo A).
- `/auth/reset` — pede email; `/auth/reset/confirm?token=...` define nova senha.
- `/auth/logout` — server action.

### Guards

- `RequireAuth` — server component que checa session, redireciona para `/auth/login`.
- `RequireTenantMember(tenantId)` — checa membership.
- `RequireSuper` — checa `profiles.is_super`.

Super-admin (`/admin/_super`) cria tenants, mapeia domínios, envia convites, revoga acessos.

---

## Arquitetura de código (Next.js App Router)

```
app/
├─ layout.tsx                     # providers globais (Supabase, theme via tokens dinâmicos)
├─ page.tsx                       # landing do produto (sem tenant)
├─ [tenant]/
│  ├─ layout.tsx                  # injeta theme tokens, busca config do tenant
│  ├─ page.tsx                    # home renderizando seções habilitadas
│  └─ blog/
│     ├─ page.tsx                 # listagem
│     └─ [slug]/page.tsx          # artigo
├─ admin/
│  ├─ layout.tsx                  # gate de auth
│  ├─ page.tsx                    # dashboard do tenant do usuário logado
│  ├─ sections/page.tsx           # toggles
│  ├─ content/[key]/page.tsx      # editores por chave
│  ├─ theme/page.tsx              # color pickers, fontes
│  ├─ media/page.tsx              # upload de imagens
│  └─ _super/                     # rotas só para super-admin
│     ├─ tenants/page.tsx
│     └─ domains/page.tsx
├─ app/                           # área autenticada de finanças (fase 4)
│  └─ ...
└─ api/                           # webhooks (Stripe etc) quando precisar

components/
├─ sections/                      # Hero, Stats, Sobre, ... (recebem props tipadas, sem dados hardcoded)
├─ admin/                         # forms, dialogs do painel
└─ ui/                            # primitives (button, input, dialog) — Radix opcional

lib/
├─ supabase/
│  ├─ server.ts                   # createServerClient (lê cookies)
│  ├─ browser.ts                  # createBrowserClient
│  └─ admin.ts                    # service role (só em server actions/edge)
├─ tenant.ts                      # resolveTenant(host, pathname) + getTenantContext()
├─ content.ts                     # getSections(tenantId), getContent(tenantId, key)
├─ theme.ts                       # tokens → CSS vars inline
└─ types/
   └─ database.ts                 # tipos gerados via `supabase gen types`

middleware.ts                     # tenant resolver

content/                          # REMOVE — migrar para Supabase
```

### Padrão de hooks (espelhando seu projeto de finanças)

```ts
// hooks/useTenantContent.ts
export function useTenantContent<T>(key: string) {
  const { tenantId } = useTenantContext();
  return useQuery({
    queryKey: ["content", tenantId, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenant_content")
        .select("value")
        .eq("tenant_id", tenantId)
        .eq("key", key)
        .single();
      if (error) throw error;
      return data.value as T;
    },
  });
}

export function useUpdateContent(key: string) {
  const qc = useQueryClient();
  const { tenantId } = useTenantContext();
  return useMutation({
    mutationFn: async (value: unknown) => {
      const { error } = await supabase
        .from("tenant_content")
        .upsert({ tenant_id: tenantId, key, value });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["content", tenantId, key] }),
  });
}
```

No server (Server Components) usa client server direto, sem React Query. React Query só no admin (client).

---

## Tema dinâmico por tenant

`tenant_theme.tokens` é um JSON tipo `{ accent: "#B8895A", bg: "#F5F3EE", fg: "#161513", ... }`.

No `app/[tenant]/layout.tsx`:

```tsx
const theme = await getTenantTheme(tenantId);
return (
  <html lang="pt-BR" style={cssVars(theme.tokens)} data-theme={theme.mode}>
    ...
  </html>
);
```

`cssVars` gera `style={{ "--bg": "...", "--fg": "...", "--accent": "..." }}`. Globals.css continua usando as vars — zero código novo.

---

## Fases de execução

### Fase 1 — Fundação multi-tenant (destrava deploy)

**Objetivo:** site do Nathan rodando em produção na Vercel, com dados no Supabase, sem regressão visual.

- Setup Supabase (projeto dev + prod).
- Migrations das 6 tabelas acima.
- `lib/supabase/*` + tipos gerados.
- `middleware.ts` com resolver path + domínio.
- Reestruturar `app/page.tsx` → `app/[tenant]/page.tsx`.
- Migrar `content/site.ts` + `sections.json` → seed SQL para tenant "nathan".
- Componentes de seção recebem props (parar de importar de `content/site.ts`).
- Admin atual (cookie + senha) **continua** temporariamente, mas escreve no Supabase em vez de arquivo.
- Deploy na Vercel. Domínio `nathanvasc.com.br` (quando você comprar) aponta para lá.

**Entrega:** `nathanvasc.com.br` e `app.seusite.com/nathan` mostram o mesmo site, conteúdo vem do banco.

### Fase 2 — Auth real + painel por tenant

- Supabase Auth com Google.
- `RequireAuth`, `RequireTenantMember`, `RequireSuper` (HOCs server-side).
- `/admin` substitui senha em env por login real; filtra dados pelo `tenant_id` do usuário.
- Painel super-admin (`/admin/_super`) para criar tenants e mapear domínios.
- RLS habilitado em todas as tabelas.

**Entrega:** outros usuários podem fazer login e gerenciar o próprio tenant; você administra tudo via `_super`.

### Fase 3 — Editor de conteúdo + tema + mídia

- Forms tipados (Zod + react-hook-form) para cada chave de conteúdo: copy do hero, stats, artigos, portfolio, ferramentas, contatos.
- Color picker + fonte por tenant (`tenant_theme`).
- Upload de imagens via Supabase Storage (bucket `tenant-assets/<id>/`), com policies por tenant.
- Preview ao vivo no admin (iframe da home com `?preview=draft`).

**Entrega:** cliente novo consegue, sem código, montar o site dele inteiro pelo admin.

### Fase 4 — Blog, newsletter e área de finanças

- `app/[tenant]/blog/[slug]` com MDX vindo do Supabase (tabela `articles`).
- Newsletter via **Resend** (subscribe form + double opt-in + envio de novos posts).
- `/app/*` autenticada com seus projetos de finanças (escopo do usuário, não do tenant).
- Mesma instância Supabase, schemas separados (`public` para o site, `finance` para finanças).

**Entrega:** produto completo.

---

## Boas práticas que vamos aplicar (alinhadas ao seu padrão)

- **TypeScript strict** + tipos gerados do Supabase (`supabase gen types typescript`).
- **Validação com Zod** antes de qualquer mutation/server action.
- **Sem `any`**, sem `console.log` em produção.
- **Hooks por entidade** em `hooks/use[Entidade].ts` (React Query no client).
- **Tipos centralizados** em `lib/types/database.ts`.
- **Sentry** quando der prejuízo (não na fase 1).
- **GA4** wrapper em `lib/analytics.ts`.
- **RLS sempre ativo**; `GRANT` explícito para toda tabela nova.
- **Service role key** apenas em Server Actions/Edge Functions; **anon key** no client.
- **Variáveis públicas** com prefixo `NEXT_PUBLIC_` apenas para o que pode vazar (URL do Supabase, GA ID).
- **Code splitting** automático do Next + `dynamic()` para o painel admin.
- **Imagens** via `next/image` (substitui o `<Img>` do seu padrão Vite).
- **SEO**: `generateMetadata` por rota, `next-sitemap` quando blog entrar.
- **Testes**: Vitest para utils/hooks; Playwright para fluxos críticos (login, salvar conteúdo, render do tenant).

---

## Variáveis de ambiente

Públicas (`NEXT_PUBLIC_*`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID` (quando entrar)

Privadas (Vercel/Edge):
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` (fase 4)
- `SENTRY_AUTH_TOKEN` (quando entrar)

`ADMIN_PASSWORD` é removido na fase 2.

---

## Migração concreta do que existe hoje

1. `content/sections.json` → seed SQL `insert into tenant_sections values ('nathan', 'hero', true, 0), ...`.
2. `content/site.ts` → seed SQL `insert into tenant_content values ('nathan', 'copy', '{"headline":"..."}'::jsonb), ...`.
3. Cores do `globals.css` → seed em `tenant_theme.tokens`.
4. Imagens em `public/images/` → upload para `tenant-assets/<nathan-id>/`.
5. Componentes em `components/` viram o que estão hoje + props (remover imports diretos de `content/`).
6. `app/page.tsx` move para `app/[tenant]/page.tsx`; root vira landing do produto.

---

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Schema do conteúdo muda e quebra tenants antigos | Validar `value` jsonb com Zod por chave; versionar com `schema_version` em `tenant_content` quando necessário |
| Custos do Supabase escalam com clientes | Plano free aguenta dezenas de tenants leves; migrar para Pro só quando necessário |
| Domínio custom de cliente sem SSL | Vercel emite Let's Encrypt automático; documentar onboarding |
| RLS escapando bug | Testes automáticos com diferentes `auth.uid()` mockados |
| Cold start no SSR derruba SEO | ISR (`revalidate: 60`) na home + blog |

---

## Decisões abertas (resolver quando chegarmos lá)

1. **Pricing/billing**: Stripe Subscriptions vs. cobrar manualmente no início. Recomendo manual nos primeiros 5-10 clientes.
2. **Onboarding self-service vs. white-glove**: começar white-glove (você cria o tenant), abrir self-service quando o admin estiver bom.
3. **Component library**: Radix UI + cn() (como seu padrão) ou shadcn/ui (mais opinativo). Recomendo shadcn — converge rápido.
4. **Estado client global**: Zustand (seu padrão) ou só React Query + URL state. Provavelmente Zustand entra só quando carrinho/checkout de finanças aparecer.

---

## Próximo passo recomendado

Começar **Fase 1**. Ordem das primeiras 3 sessões:

1. Criar projeto Supabase + rodar migrations + seed do tenant "nathan".
2. Wirar `lib/supabase/*`, middleware e mover `app/page.tsx` → `app/[tenant]/page.tsx` com dados do banco.
3. Deploy na Vercel + smoke test.

Depois disso entramos em Fase 2 (auth real).
