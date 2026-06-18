import { Logo } from "./Logo";

export function In9Footer() {
  return (
    <footer className="in9-footer">
      <div className="container">
        <div className="in9-footer__grid">
          <div>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: 12 }}>
              <Logo size={22} />
            </div>
            <p style={{ color: "var(--fg-2)", fontSize: 14, lineHeight: 1.55, maxWidth: "34ch", marginTop: 16 }}>
              Do conceito à realidade. Estúdio independente de tecnologia projetando produtos digitais sob medida.
            </p>
          </div>

          <div className="in9-footer__col">
            <h4>Serviços</h4>
            <ul>
              <li><a href="#solucoes">Sites institucionais</a></li>
              <li><a href="#solucoes">Catálogos</a></li>
              <li><a href="#solucoes">Agendamento</a></li>
              <li><a href="#solucoes">Sistemas sob medida</a></li>
              <li><a href="#solucoes">UX / UI</a></li>
            </ul>
          </div>

          <div className="in9-footer__col">
            <h4>Estúdio</h4>
            <ul>
              <li><a href="#projetos">Projetos</a></li>
              <li><a href="#processo">Processo</a></li>
              <li><a href="#por-que">Porque a In9</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>

          <div className="in9-footer__col">
            <h4>Contato</h4>
            <ul>
              <li><a href="mailto:contatoin9tec@gmail.com">contatoin9tec@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="in9-footer__bottom">
          <span>© 2026 In9 Studio</span>
        </div>
      </div>
    </footer>
  );
}
