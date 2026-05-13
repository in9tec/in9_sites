import { STATS } from "@/content/site";

export function Stats() {
  return (
    <section className="stats" aria-label="Números">
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat__n">{s.n}</span>
            <span className="stat__l">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
