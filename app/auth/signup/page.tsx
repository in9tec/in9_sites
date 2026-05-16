import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const sp = await searchParams;
  const invite = sp.code ? await db.findInviteByCode(sp.code) : null;

  return (
    <main className="auth">
      <div className="auth__box">
        <h1 className="auth__title">Criar conta</h1>
        {!sp.code && <p className="muted">Acesso por código de convite é necessário. Peça um link para o admin do tenant.</p>}
        {sp.code && !invite && <p className="admin__error">Código inválido, já usado ou expirado.</p>}
        {sp.code && invite && (
          <>
            <p className="muted tabular">
              Convite válido para o tenant <code>{invite.tenant_id}</code> · papel: <strong>{invite.role}</strong>
            </p>
            <p className="muted">
              Em construção — finalização do signup entrará na Fase 2 com Supabase. Por ora, o convite fica registrado.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
