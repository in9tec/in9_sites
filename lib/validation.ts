// Schemas Zod compartilhados entre as server actions.
// Centralizado aqui para reutilizar e manter consistência.

import { z } from "zod";

export const SlugSchema = z
  .string()
  .min(1)
  .max(60)
  .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens");

export const RoleSchema = z.enum(["owner", "editor"]);

export const InviteModeSchema = z.enum(["email", "code"]);

// Actions

export const CreateTenantSchema = z.object({
  slug: SlugSchema,
  name: z.string().min(1, "Nome obrigatório").max(120),
  layout_type: z.enum(["personal", "corporate"]).default("personal"),
});

export const SaveSectionsSchema = z.object({
  __tenant: z.string().min(1),
});

export const CreateInviteSchema = z.object({
  __tenant: z.string().min(1),
  mode: InviteModeSchema,
  role: RoleSchema,
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
});

export const RevokeInviteSchema = z.object({
  id: z.string().uuid("ID inválido"),
  __tenant: z.string().min(1),
});

export const RemoveMemberSchema = z.object({
  __tenant: z.string().min(1),
  userId: z.string().min(1),
});
