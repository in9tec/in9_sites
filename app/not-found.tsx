import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "var(--font-sans)",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", color: "var(--muted)" }}>
        404
      </span>
      <h1 style={{ fontSize: "24px", fontFamily: "var(--font-mono)", margin: 0, letterSpacing: "-0.02em" }}>
        Página não encontrada
      </h1>
      <p style={{ color: "var(--muted)", margin: 0, fontSize: "15px" }}>
        O endereço não existe ou foi removido.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          padding: "8px 20px",
          border: "1px solid var(--line-soft)",
          borderRadius: "2px",
          fontSize: "14px",
          color: "var(--fg)",
        }}
      >
        Voltar ao início
      </Link>
    </main>
  );
}
