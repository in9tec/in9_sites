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

export interface DbAdapter {
  // ---------- Tenants ----------
  listTenants(): Promise<Tenant[]>;
  getTenantBySlug(slug: string): Promise<Tenant | null>;
  getTenantByHost(host: string): Promise<Tenant | null>;
  createTenant(input: { slug: string; name: string }): Promise<Tenant>;

  // ---------- Domains ----------
  listTenantDomains(tenantId: string): Promise<TenantDomain[]>;
  addTenantDomain(tenantId: string, host: string): Promise<TenantDomain>;
  removeTenantDomain(id: string): Promise<void>;

  // ---------- Sections ----------
  getSections(tenantId: string): Promise<TenantSection[]>;
  setSectionEnabled(tenantId: string, sectionId: SectionId, enabled: boolean): Promise<void>;
  setSectionsBulk(tenantId: string, sections: Pick<TenantSection, "section_id" | "enabled">[]): Promise<void>;

  // ---------- Content ----------
  getContent<K extends ContentKey>(tenantId: string, key: K): Promise<ContentMap[K] | null>;
  getAllContent(tenantId: string): Promise<TenantContent[]>;
  setContent<K extends ContentKey>(tenantId: string, key: K, value: ContentMap[K]): Promise<void>;

  // ---------- Theme ----------
  getTheme(tenantId: string): Promise<TenantTheme | null>;
  setTheme(tenantId: string, theme: Omit<TenantTheme, "tenant_id">): Promise<void>;

  // ---------- Members + Profiles ----------
  getProfile(userId: string): Promise<Profile | null>;
  listMembers(tenantId: string): Promise<(TenantMember & { profile: Profile | null })[]>;
  addMember(tenantId: string, userId: string, role: Role): Promise<void>;
  removeMember(tenantId: string, userId: string): Promise<void>;

  // ---------- Invites ----------
  listInvites(tenantId: string): Promise<TenantInvite[]>;
  createInvite(input: {
    tenant_id: string;
    role: Role;
    email?: string;
    code?: string;
    created_by: string;
    max_uses?: number;
    expires_at?: string;
  }): Promise<TenantInvite>;
  revokeInvite(id: string): Promise<void>;
  findInviteByCode(code: string): Promise<TenantInvite | null>;
  redeemInvite(id: string, userId: string): Promise<TenantInvite>;
}
