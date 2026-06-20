import { redirect } from "next/navigation";
import { isDev, signInAs } from "@/lib/auth";
import { DEV_USER_ID } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

async function devLoginAction() {
  "use server";
  await signInAs(DEV_USER_ID);
  redirect("/admin");
}

async function passwordLoginAction(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  // Sem env configurada ou senha errada → volta com erro (nega o acesso).
  if (!expected || password !== expected) {
    redirect("/auth/login?error=1");
  }
  // Autentica como o super-admin do seed (owner dos dois tenants).
  await signInAs(DEV_USER_ID);
  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="auth">
      <div className="auth__box">
        <h1 className="auth__title">Entrar</h1>
        {isDev() ? (
          <>
            <p className="muted">
              DEV_MODE está ativo — você já está autenticado como super-admin automaticamente
              em qualquer rota protegida. Use o botão abaixo apenas se a sessão sumir.
            </p>
            <form action={devLoginAction} className="admin__form">
              <button className="btn btn--primary" type="submit">Entrar como dev super-admin</button>
            </form>
          </>
        ) : (
          <>
            <p className="muted">Acesso ao painel de administração.</p>
            {error && <p className="admin__error">Senha incorreta.</p>}
            <form className="admin__form" action={passwordLoginAction}>
              <label className="admin__field">
                <span>Senha</span>
                <input name="password" type="password" autoComplete="current-password" required autoFocus />
              </label>
              <button className="btn btn--primary" type="submit">Entrar</button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
