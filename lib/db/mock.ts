import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { DbAdapter } from "./adapter";
import { seed } from "./seed";
import type {
  ContentKey,
  ContentMap,
  Profile,
  Role,
  SectionId,
  Tenant,
  TenantContent,
  TenantDomain,
  TenantInvite,
  TenantMember,
  TenantSection,
  TenantTheme,
} from "./types";

interface MockDB {
  tenants: Tenant[];
  domains: TenantDomain[];
  profiles: Profile[];
  members: TenantMember[];
  invites: TenantInvite[];
  sections: TenantSection[];
  content: TenantContent[];
  themes: TenantTheme[];
}

const FILE = path.join(process.cwd(), ".data", "db.json");

let cache: MockDB | null = null;
let writing: Promise<void> = Promise.resolve();

async function load(): Promise<MockDB> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(FILE, "utf8");
    cache = JSON.parse(raw) as MockDB;
  } catch {
    cache = seed();
    await persist();
  }
  return cache!;
}

async function persist(): Promise<void> {
  if (!cache) return;
  const snapshot = JSON.stringify(cache, null, 2);
  writing = writing.then(async () => {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, snapshot, "utf8");
  });
  await writing;
}

function nowIso(): string {
  return new Date().toISOString();
}

function genCode(): string {
  // 3 grupos curtos legíveis (sem 0/O, 1/I)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const group = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `${group(3)}-${group(3)}-${group(3)}`;
}

export const adapter: DbAdapter = {
  // ---------- Tenants ----------
  async listTenants() {
    const db = await load();
    return [...db.tenants];
  },
  async getTenantBySlug(slug) {
    const db = await load();
    return db.tenants.find((t) => t.slug === slug) ?? null;
  },
  async getTenantByHost(host) {
    const db = await load();
    const d = db.domains.find((x) => x.host.toLowerCase() === host.toLowerCase());
    if (!d) return null;
    return db.tenants.find((t) => t.id === d.tenant_id) ?? null;
  },
  async createTenant({ slug, name, layout_type = "personal" }) {
    const db = await load();
    if (db.tenants.some((t) => t.slug === slug)) {
      throw new Error(`Tenant slug "${slug}" already exists`);
    }
    const t: Tenant = { id: randomUUID(), slug, name, layout_type, created_at: nowIso() };
    db.tenants.push(t);
    await persist();
    return t;
  },

  // ---------- Domains ----------
  async listTenantDomains(tenantId) {
    const db = await load();
    return db.domains.filter((d) => d.tenant_id === tenantId);
  },
  async addTenantDomain(tenantId, host) {
    const db = await load();
    const d: TenantDomain = { id: randomUUID(), tenant_id: tenantId, host, verified_at: null };
    db.domains.push(d);
    await persist();
    return d;
  },
  async removeTenantDomain(id) {
    const db = await load();
    db.domains = db.domains.filter((d) => d.id !== id);
    await persist();
  },

  // ---------- Sections ----------
  async getSections(tenantId) {
    const db = await load();
    return db.sections.filter((s) => s.tenant_id === tenantId).sort((a, b) => a.position - b.position);
  },
  async setSectionEnabled(tenantId, sectionId, enabled) {
    const db = await load();
    const row = db.sections.find((s) => s.tenant_id === tenantId && s.section_id === sectionId);
    if (row) {
      row.enabled = enabled;
    } else {
      db.sections.push({ tenant_id: tenantId, section_id: sectionId, enabled, position: db.sections.length });
    }
    await persist();
  },
  async setSectionsBulk(tenantId, sections) {
    const db = await load();
    sections.forEach((s, idx) => {
      const row = db.sections.find((x) => x.tenant_id === tenantId && x.section_id === s.section_id);
      if (row) {
        row.enabled = s.enabled;
      } else {
        db.sections.push({ tenant_id: tenantId, section_id: s.section_id, enabled: s.enabled, position: idx });
      }
    });
    await persist();
  },

  // ---------- Content ----------
  async getContent(tenantId, key) {
    const db = await load();
    const row = db.content.find((c) => c.tenant_id === tenantId && c.key === key);
    return (row?.value as ContentMap[typeof key]) ?? null;
  },
  async getAllContent(tenantId) {
    const db = await load();
    return db.content.filter((c) => c.tenant_id === tenantId);
  },
  async setContent(tenantId, key, value) {
    const db = await load();
    const idx = db.content.findIndex((c) => c.tenant_id === tenantId && c.key === key);
    const row: TenantContent = { tenant_id: tenantId, key, value, updated_at: nowIso() };
    if (idx >= 0) db.content[idx] = row;
    else db.content.push(row);
    await persist();
  },

  // ---------- Theme ----------
  async getTheme(tenantId) {
    const db = await load();
    return db.themes.find((t) => t.tenant_id === tenantId) ?? null;
  },
  async setTheme(tenantId, theme) {
    const db = await load();
    const idx = db.themes.findIndex((t) => t.tenant_id === tenantId);
    const row: TenantTheme = { tenant_id: tenantId, ...theme };
    if (idx >= 0) db.themes[idx] = row;
    else db.themes.push(row);
    await persist();
  },

  // ---------- Members + Profiles ----------
  async getProfile(userId) {
    const db = await load();
    return db.profiles.find((p) => p.id === userId) ?? null;
  },
  async listMembers(tenantId) {
    const db = await load();
    return db.members
      .filter((m) => m.tenant_id === tenantId)
      .map((m) => ({ ...m, profile: db.profiles.find((p) => p.id === m.user_id) ?? null }));
  },
  async addMember(tenantId, userId, role) {
    const db = await load();
    if (!db.members.some((m) => m.tenant_id === tenantId && m.user_id === userId)) {
      db.members.push({ tenant_id: tenantId, user_id: userId, role });
      await persist();
    }
  },
  async removeMember(tenantId, userId) {
    const db = await load();
    db.members = db.members.filter((m) => !(m.tenant_id === tenantId && m.user_id === userId));
    await persist();
  },

  // ---------- Invites ----------
  async listInvites(tenantId) {
    const db = await load();
    return db.invites.filter((i) => i.tenant_id === tenantId);
  },
  async createInvite(input) {
    const db = await load();
    const inv: TenantInvite = {
      id: randomUUID(),
      tenant_id: input.tenant_id,
      role: input.role,
      email: input.email ?? null,
      code: input.code ?? (input.email ? null : genCode()),
      status: "pending",
      max_uses: input.max_uses ?? 1,
      uses: 0,
      expires_at: input.expires_at ?? new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      created_by: input.created_by,
      created_at: nowIso(),
      accepted_by: null,
      accepted_at: null,
    };
    db.invites.push(inv);
    await persist();
    return inv;
  },
  async revokeInvite(id) {
    const db = await load();
    const inv = db.invites.find((i) => i.id === id);
    if (inv) inv.status = "revoked";
    await persist();
  },
  async findInviteByCode(code) {
    const db = await load();
    return db.invites.find((i) => i.code === code && i.status === "pending") ?? null;
  },
  async redeemInvite(id, userId) {
    const db = await load();
    const inv = db.invites.find((i) => i.id === id);
    if (!inv) throw new Error("Invite not found");
    if (inv.status !== "pending") throw new Error("Invite not pending");
    if (new Date(inv.expires_at) < new Date()) {
      inv.status = "expired";
      await persist();
      throw new Error("Invite expired");
    }
    inv.uses += 1;
    if (inv.uses >= inv.max_uses) inv.status = "accepted";
    inv.accepted_by = userId;
    inv.accepted_at = nowIso();
    // Adiciona membership
    if (!db.members.some((m) => m.tenant_id === inv.tenant_id && m.user_id === userId)) {
      db.members.push({ tenant_id: inv.tenant_id, user_id: userId, role: inv.role });
    }
    await persist();
    return inv;
  },
};

// Export para debug/dev: força reload do snapshot do disco.
export async function _resetCache() {
  cache = null;
}

// (re-export para tipo só)
export type { SectionId, Role };
