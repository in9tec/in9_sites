export function Footer({ brand }: { brand: { name: string; handle: string } }) {
  // Wordmark gigante do rodapé — a marca pessoal.
  const giant = "novasconcelos";

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <span className="brand__name">{brand.name}</span>
          <span className="muted">{brand.handle}</span>
        </div>
        <div className="footer__col">
          <span className="muted tabular">© {new Date().getFullYear()} — Todos os direitos reservados</span>
        </div>
      </div>
      <div className="footer__giant" aria-hidden="true">{giant}</div>
    </footer>
  );
}
