# Criar Página para Empresa — Guia de Decisão

**Data:** 2026-05-20  
**Contexto:** Sistema multi-tenant já está pronto. Cada empresa (`/empresa`) tem suas próprias seções, conteúdo e tema.

---

## Antes de começar: qual é o caso?

| Caso | Abordagem | Quando usar |
|------|-----------|-------------|
| **A — Mesmo layout, copy diferente** | Criar tenant, editar conteúdo | Consultoria, portfólio de empresa |
| **B — Layout alternativo** | `layout_type` no DB + novo componente | Landing SaaS, LP de produto |
| **C — Totalmente custom** | Nova pasta `app/[tenant]/layouts/nome/` | Sites muito diferentes entre si |

---

## Caso A — Mesmo layout, conteúdo diferente (hoje mesmo)

### Passo 1: Criar o tenant

```
GET /admin/super
→ slug: "empresa"  (ex: accenture, minha-empresa, startupX)
→ name: "Nome da Empresa"
→ Salvar
→ Sistema cria 8 seções padrão + tema default
→ Acessar em /empresa
```

### Passo 2: Decidir quais seções aparecem

```
GET /admin/content?tenant=empresa
→ Desabilitar o que não faz sentido (ex: Portfolio pessoal, Sobre pessoal)
→ Habilitar só o que fica
→ Salvar
```

Exemplo para uma consultoria:
```
✅ Hero       (headline da empresa)
✅ Stats      (clientes atendidos, projetos, anos)
❌ Sobre      (bio pessoal — não se aplica)
✅ Conteudos  (cases, artigos)
✅ Ferramentas (stack da empresa)
✅ Consultoria (serviços)
❌ Portfolio  (portfólio pessoal — não se aplica)
✅ Contato
```

### Passo 3: Customizar conteúdo

> ⚠️ **Editor visual vem na Fase 3.** Por enquanto, editar direto no seed ou via DB mock.

Conteúdos por chave em `.data/db.json`:
```json
{ "content_key": "hero.headline",    "value": "Transformamos dados em decisão" }
{ "content_key": "hero.sub",         "value": "Consultoria de analytics e tecnologia" }
{ "content_key": "hero.description", "value": "Ajudamos empresas a..." }
{ "content_key": "stats",            "value": [{ "label": "Clientes", "value": "40+" }, ...] }
{ "content_key": "contact.links",    "value": [{ "label": "Email", "href": "..." }] }
```

### Passo 4: Customizar tema (cores)

Editar `tenant_theme.tokens` no `.data/db.json`:
```json
{
  "accent": "#0057FF",
  "bg":     "#FFFFFF",
  "fg":     "#111111",
  "muted":  "#6B7280"
}
```
CSS vars injetadas automaticamente no layout, sem tocar nos componentes.

### Passo 5: Acessar

```
http://localhost:3000/empresa
```
Domínio custom em produção: apontar `empresa.com.br` → Vercel → middleware resolve.

---

## Caso B — Layout alternativo (tipo SaaS/LP)

> **Nota:** `layout_type: "personal" | "corporate"` já existe no sistema. "corporate" usa o layout In9. Para um layout SaaS diferente, siga os passos abaixo.

### Quando usar
- Navbar diferente (com pricing, features, CTA)
- Seções completamente diferentes (Pricing, Testimonials, FAQ)
- Hero com vídeo de fundo ou full-screen
- Ordem diferente das seções

### Passos para implementar

#### 1. Adicionar novo valor em `layout_type`

Em `lib/db/types.ts`:
```ts
export type LayoutType = "personal" | "corporate" | "saas";
```

#### 2. Criar novo layout

```
app/[tenant]/
├─ page.tsx            ← orquestra qual layout renderizar
├─ layouts/
│  ├─ PersonalLayout.tsx   ← layout atual (Hero, Stats, Sobre...)
│  ├─ CorporateLayout.tsx  ← novo layout empresarial
│  └─ SaasLayout.tsx       ← novo layout SaaS
```

#### 3. Branch em `app/[tenant]/page.tsx`

```tsx
const layoutType = tenant.layout_type ?? "personal";

if (layoutType === "corporate") {
  return <CorporateLayout tenant={tenant} content={content} sections={enabledSet} />;
}
if (layoutType === "saas") {
  return <SaasLayout tenant={tenant} content={content} sections={enabledSet} />;
}
return <PersonalLayout tenant={tenant} content={content} sections={enabledSet} />;
```

#### 4. Criar novas seções para o layout empresarial

```
components/
├─ corporate/
│  ├─ HeroFull.tsx       ← Hero full-screen com CTA
│  ├─ Pricing.tsx        ← Tabela de preços
│  ├─ Testimonials.tsx   ← Depoimentos de clientes
│  ├─ FAQ.tsx            ← Acordeão de perguntas
│  └─ FeatureGrid.tsx    ← Grade de features
```

#### 5. Adicionar novas content_keys para o layout

```ts
// Novos content_keys para tenant com layout_type="saas"
"saas.hero.cta_text"      → "Começar agora"
"saas.hero.cta_href"      → "/trial"
"saas.pricing"            → [{ name: "Starter", price: 99, features: [...] }]
"saas.testimonials"       → [{ name: "João", company: "XYZ", text: "..." }]
"saas.faq"               → [{ q: "...", a: "..." }]
```

---

## Caso C — Site totalmente diferente

Se o site da empresa não tem nenhuma relação visual com o site pessoal:

```
app/[tenant]/
└─ page.tsx   ← lê tenant.layout_type e importa layout isolado
```

Cada empresa pode ter seu próprio `components/tenants/empresa-nome/` com design 100% independente, mas ainda usando:
- Mesma infra de tenant
- Mesmo DB adapter
- Mesmo sistema de auth/admin
- Mesma injeção de tema via CSS vars

---

## Checklist por fase

### Hoje (mock-local, sem Supabase)
- [ ] Criar tenant via `/admin/super` (escolher `layout_type`)
- [ ] Ajustar seções via `/admin/content?tenant=empresa`
- [ ] Editar `.data/db.json` na mão pra mudar copy/tema (ou usar editor em `/admin/content/[key]`)
- [ ] Verificar em `/empresa`

### Fase 3 (editor de conteúdo)
- [ ] Admin UI tipada para cada content_key
- [ ] Color picker para tema
- [ ] Upload de imagem (Supabase Storage)
- [ ] Preview ao vivo

### Extensão layout (quando precisar)
- [ ] Adicionar `layout_type` em `lib/db/types.ts` + seed
- [ ] Criar `app/[tenant]/layouts/CorporateLayout.tsx`
- [ ] Criar novas seções em `components/corporate/`
- [ ] Branching em `app/[tenant]/page.tsx`

---

## Notas

- Cada tenant tem seu próprio admin em `/admin` (selecionar tenant ativo no menu)
- Custom domain é configurado em `HOST_MAP` no `middleware.ts` agora; vira DB na Fase 2
- Membros de cada tenant têm acesso só ao seu tenant (RLS garante isso no Supabase)
- Layout alternativo não exige Supabase — funciona no mock também
