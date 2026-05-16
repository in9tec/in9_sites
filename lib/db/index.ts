// DB adapter — interface única que hoje aponta para o mock e amanhã apontará
// para Supabase. Toda I/O de dados do app passa por aqui.
//
// Para trocar a implementação no futuro:
//   1. criar lib/db/supabase.ts exportando o mesmo shape
//   2. trocar o re-export abaixo
//
// Nenhum outro arquivo do app deve precisar mudar.

import * as mock from "./mock";

export const db = mock.adapter;

export type { DbAdapter } from "./adapter";
export * from "./types";
