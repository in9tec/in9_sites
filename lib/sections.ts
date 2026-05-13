import { promises as fs } from "node:fs";
import path from "node:path";
import type { SectionId, SectionsConfig } from "./types";

const FILE = path.join(process.cwd(), "content", "sections.json");

const DEFAULTS: SectionsConfig = {
  hero: true,
  stats: true,
  sobre: true,
  conteudos: true,
  ferramentas: true,
  consultoria: true,
  portfolio: true,
  contato: true,
};

export async function getSections(): Promise<SectionsConfig> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SectionsConfig>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export async function setSections(next: SectionsConfig): Promise<void> {
  const merged: SectionsConfig = { ...DEFAULTS, ...next };
  await fs.writeFile(FILE, JSON.stringify(merged, null, 2) + "\n", "utf8");
}

export function isEnabled(cfg: SectionsConfig, id: SectionId): boolean {
  return cfg[id] !== false;
}
