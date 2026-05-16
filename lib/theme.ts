import type { ThemeTokens } from "@/lib/db/types";

/** Converte tokens em um objeto `style` para o <html>, ex.: { "--bg": "#..." }. */
export function tokensToStyle(tokens: ThemeTokens): Record<string, string> {
  const style: Record<string, string> = {};
  for (const [k, v] of Object.entries(tokens)) {
    style[`--${k}`] = v;
  }
  return style;
}
