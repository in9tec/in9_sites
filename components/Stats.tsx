import type { Stat } from "@/lib/db/types";

export function Stats({ items }: { items: Stat[] }) {
  return (
    <section className="stats" aria-label="Números">
      <div className="container stats__grid">
        {items.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat__n">{s.n}</span>
            <span className="stat__l">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
