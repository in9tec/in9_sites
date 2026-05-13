export function ServiceIcon({ id }: { id: string }) {
  const s = "currentColor";
  switch (id) {
    case "process":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={s} strokeWidth="1.6">
          <circle cx="6" cy="6" r="2.4" />
          <circle cx="18" cy="12" r="2.4" />
          <circle cx="6" cy="18" r="2.4" />
          <path d="M8.4 6h7.2M8.4 18h7.2M15.6 12H6" />
        </svg>
      );
    case "person":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={s} strokeWidth="1.6">
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5 20c.7-3.3 3.6-5.5 7-5.5s6.3 2.2 7 5.5" />
        </svg>
      );
    case "stabilize":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={s} strokeWidth="1.6">
          <path d="M3 14l4-6 3 4 4-7 3 5 4-3" />
          <path d="M3 19h18" />
        </svg>
      );
    case "leader":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={s} strokeWidth="1.6">
          <path d="M5 21V11l7-7 7 7v10" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    default:
      return null;
  }
}
