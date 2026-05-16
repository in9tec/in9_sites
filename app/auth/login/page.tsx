import { redirect } from "next/navigation";
import { isDev, signInAs } from "@/lib/auth";
import { DEV_USER_ID } from "@/lib/db/seed";

export const dynamic = "force-dynamic";

async function devLoginAction() {
  "use server";
  await signInAs(DEV_USER_ID);
  redirect("/admin");
}

export default function LoginPage() {
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
            <p className="muted">Login por email e senha (Supabase) — em construção.</p>
            <form className="admin__form" action="#">
              <label className="admin__field"><span>Email</span><input name="email" type="email" disabled /></label>
              <label className="admin__field"><span>Senha</span><input name="password" type="password" disabled /></label>
              <button className="btn btn--primary" type="submit" disabled>Entrar</button>
            </form>
            <p className="muted tabular">— Disponível na Fase 2 quando o Supabase entrar.</p>
          </>
        )}
      </div>
    </main>
  );
}
