interface LogoProps {
  size?: number;
  withTagline?: boolean;
}

export function Logo({ size = 32, withTagline = false }: LogoProps) {
  return (
    <span
      className="in9-logo"
      style={{ gap: Math.max(6, size * 0.18) }}
    >
      <span className="in9-logo__mark" style={{ fontSize: size }}>
        <span>In</span>
        <span
          className="in9-logo__nine"
          style={{ marginLeft: size * 0.02 }}
        >
          9
        </span>
      </span>
      {withTagline && (
        <span
          className="in9-logo__tagline"
          style={{ fontSize: Math.max(10, size * 0.085) }}
        >
          Do conceito à realidade
        </span>
      )}
    </span>
  );
}
