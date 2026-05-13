export function SectionHeader({ num, label, tone }: { num: string; label: string; tone?: "invert" }) {
  return (
    <div className={`sec-head ${tone === "invert" ? "sec-head--invert" : ""}`}>
      <span className="sec-head__num tabular">{num}</span>
      <span className="sec-head__line" aria-hidden="true" />
      <span className="sec-head__label">{label}</span>
    </div>
  );
}
