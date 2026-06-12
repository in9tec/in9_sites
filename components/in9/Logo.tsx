import Image from "next/image";

interface LogoProps {
  size?: number;
  withTagline?: boolean;
}

export function Logo({ size = 32, withTagline = false }: LogoProps) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <Image
        src="/in9-logo.png"
        alt="In9"
        width={size}
        height={size}
        style={{ borderRadius: size * 0.26, display: "block" }}
        priority
      />
      {withTagline && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: Math.max(10, size * 0.075),
            letterSpacing: "0.22em",
            color: "var(--fg-3)",
            textTransform: "uppercase",
          }}
        >
          Soluções e Tecnologia
        </span>
      )}
    </span>
  );
}
