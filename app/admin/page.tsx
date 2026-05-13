import { isAdmin } from "@/lib/auth";
import { getSections } from "@/lib/sections";
import { SECTION_LABELS, type SectionId } from "@/lib/types";
import { loginAction, logoutAction, saveSectionsAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const sp = await searchParams;
  const authed = await isAdmin();

  if (!authed) {
    return (
      <main className="admin">
        <div className="admin__box">
          <h1 className="admin__title">Admin</h1>
          <p className="admin__sub">Entre com a senha para gerenciar as seções do site.</p>
          <form action={loginAction} className="admin__form">
            <label className="admin__field">
              <span>Senha</span>
              <input name="password" type="password" autoFocus required />
            </label>
            {sp.error && <p className="admin__error">Senha inválida.</p>}
            <button type="submit" className="btn btn--primary">Entrar</button>
          </form>
        </div>
      </main>
    );
  }

  const cfg = await getSections();
  const ids = Object.keys(SECTION_LABELS) as SectionId[];

  return (
    <main className="admin">
      <div className="admin__box admin__box--wide">
        <div className="admin__head">
          <div>
            <h1 className="admin__title">Seções do site</h1>
            <p className="admin__sub">Marque as seções que devem aparecer na home.</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="btn btn--ghost btn--sm">Sair</button>
          </form>
        </div>

        {sp.saved && <p className="admin__ok">Salvo. <a href="/" target="_blank" rel="noreferrer">Abrir site →</a></p>}

        <form action={saveSectionsAction} className="admin__sections">
          {ids.map((id) => (
            <label key={id} className="admin__row">
              <input
                type="checkbox"
                name={`section-${id}`}
                defaultChecked={cfg[id] !== false}
              />
              <span className="admin__row-label">{SECTION_LABELS[id]}</span>
              <code className="admin__row-id">{id}</code>
            </label>
          ))}
          <div className="admin__actions">
            <button type="submit" className="btn btn--primary">Salvar</button>
            <a href="/" className="btn btn--ghost btn--sm">Ver site</a>
          </div>
        </form>
      </div>
    </main>
  );
}
