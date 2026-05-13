export function ToolIcon({ id }: { id: string }) {
  switch (id) {
    case "vscode":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M28.5 3.5 22 1.2c-.7-.3-1.5-.1-2 .4L3.6 16.2 2 15c-.5-.4-1.2-.4-1.7.1l-.6.6c-.5.5-.5 1.4 0 1.9l.6.6c.5.5 1.2.5 1.7.1L3.6 17 20 31.4c.5.5 1.3.7 2 .4l6.5-2.3c.6-.2 1-.8 1-1.4V4.9c0-.6-.4-1.2-1-1.4zM23 23.5 10 14l13-9.5v19z" fill="#0078D4" />
        </svg>
      );
    case "cursor":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <defs>
            <linearGradient id="cur1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#000" />
              <stop offset="1" stopColor="#666" />
            </linearGradient>
          </defs>
          <path d="M16 2 4 8.7v14.6L16 30l12-6.7V8.7L16 2z" fill="url(#cur1)" />
          <path d="M16 2v28l12-6.7V8.7L16 2z" fill="#999" opacity=".5" />
          <path d="M16 16 4 8.7 16 30l12-21.3L16 16z" fill="#fff" opacity=".7" />
        </svg>
      );
    case "claude":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect width="32" height="32" rx="6" fill="#D97757" />
          <path d="M11 22 8 10h2.2l2.1 8.6L14.5 10h2.1L19 18.6 21.1 10H23l-3.1 12h-2L15.5 13l-2.5 9h-2z" fill="#fff" />
        </svg>
      );
    case "gpt":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M28 13.4a7.4 7.4 0 0 0-.6-6.1 7.5 7.5 0 0 0-8.1-3.6 7.5 7.5 0 0 0-12.7 2.7 7.5 7.5 0 0 0-5 3.6 7.5 7.5 0 0 0 .9 8.8 7.4 7.4 0 0 0 .6 6.1 7.5 7.5 0 0 0 8.1 3.6 7.5 7.5 0 0 0 5.6 2.5 7.5 7.5 0 0 0 7.1-5.2 7.5 7.5 0 0 0 5-3.6 7.5 7.5 0 0 0-.9-8.8zM17 28.1a5.6 5.6 0 0 1-3.6-1.3l.2-.1 6-3.5c.3-.2.5-.5.5-.8v-8.5l2.5 1.5v7c0 3.2-2.6 5.7-5.6 5.7zM4.9 22.9a5.6 5.6 0 0 1-.7-3.8l.2.1 6 3.5c.3.2.7.2 1 0l7.4-4.3v2.9L12.7 25c-2.7 1.6-6.2.6-7.8-2.1zM3.4 11a5.6 5.6 0 0 1 2.9-2.5v7.1c0 .4.2.7.5.8l7.4 4.3-2.5 1.5L5.6 19c-2.7-1.6-3.6-5.1-2.2-7.9zm21 4.8-7.4-4.3 2.5-1.5 6.1 3.5c2.7 1.6 3.6 5.1 2 7.9-.6 1-1.6 1.9-2.7 2.4v-7.1c0-.4-.2-.7-.5-.8zm2.5-3.6h-.2l-6-3.5a1 1 0 0 0-1 0l-7.4 4.3v-2.9l6-3.5c2.7-1.6 6.2-.6 7.8 2.1.7 1.1.9 2.4.7 3.6zm-16 5L8.4 15.7v-7c0-3.1 2.6-5.7 5.7-5.7 1.3 0 2.6.5 3.6 1.3l-.2.1-6 3.5c-.3.2-.5.5-.5.8l-.1 8.5zm1.4-3.1L15.6 12l3.4 2v3.9l-3.4 2-3.4-2v-3.9z" fill="#10A37F" />
        </svg>
      );
    case "linear":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <defs>
            <linearGradient id="lin1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5E6AD2" />
              <stop offset="1" stopColor="#8A92E5" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="6" fill="url(#lin1)" />
          <path d="M6.5 18.5 13.5 25.5M6.5 13 19 25.5M7 8 24 25M11 5 27 21M17 5 27 15M22.5 5.5 26.5 9.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "notion":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect width="32" height="32" rx="6" fill="#fff" stroke="#E0DDD4" />
          <path d="M9 9h3l8 11V9h2v14h-3L11 12v11H9V9z" fill="#000" />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M12 4h4v8h-4a4 4 0 010-8z" fill="#F24E1E" />
          <path d="M16 4h4a4 4 0 010 8h-4V4z" fill="#FF7262" />
          <path d="M16 12h4a4 4 0 010 8h-4v-8z" fill="#A259FF" />
          <path d="M12 12h4v8h-4a4 4 0 010-8z" fill="#1ABCFE" />
          <path d="M12 20h4v4a4 4 0 11-4-4z" fill="#0ACF83" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.5c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.6-2.1-1.6-2.1-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.3 2.2 3.4 1.6 4.2 1.2.1-.9.5-1.6.9-1.9-3.1-.4-6.4-1.6-6.4-7 0-1.5.6-2.8 1.5-3.8-.1-.4-.6-1.9.1-3.9 0 0 1.2-.4 4 1.5 1.2-.3 2.4-.5 3.6-.5s2.5.2 3.6.5c2.7-1.9 4-1.5 4-1.5.8 2 .3 3.5.1 3.9.9 1 1.5 2.3 1.5 3.8 0 5.4-3.3 6.6-6.5 7 .5.4 1 1.3 1 2.6v3.8c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16 30 8.3 23.7 2 16 2z" fill="#181717" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect x="4" y="14" width="3" height="3" fill="#0DB7ED" />
          <rect x="7.5" y="14" width="3" height="3" fill="#0DB7ED" />
          <rect x="11" y="14" width="3" height="3" fill="#0DB7ED" />
          <rect x="14.5" y="14" width="3" height="3" fill="#0DB7ED" />
          <rect x="7.5" y="10.5" width="3" height="3" fill="#0DB7ED" />
          <rect x="11" y="10.5" width="3" height="3" fill="#0DB7ED" />
          <rect x="14.5" y="10.5" width="3" height="3" fill="#0DB7ED" />
          <rect x="11" y="7" width="3" height="3" fill="#0DB7ED" />
          <path d="M30 16c-1-1-3-1-4-.5-.3-2-2-3.5-2-3.5s-1.5 2-1 4c.3.6.7 1 1.2 1.2-1 .6-3.6.5-22.2.5C1.5 21 5 24 11 24c4.5 0 8-1.7 9.7-4.7 1.7.4 6 .3 7.6-2.5l.7-.8z" fill="#0DB7ED" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <ellipse cx="16" cy="7" rx="10" ry="3" fill="#336791" />
          <path d="M6 7v18c0 2 4.5 4 10 4s10-2 10-4V7" fill="none" stroke="#336791" strokeWidth="2.2" />
          <path d="M6 14c0 2 4.5 4 10 4s10-2 10-4M6 21c0 2 4.5 4 10 4s10-2 10-4" fill="none" stroke="#336791" strokeWidth="2.2" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M3 19s3 4 13 4 13-4 13-4M6 12l3 7 3-7 3 7 3-7M21 12c0-2 1.5-3 3.5-3s3.5 1 3.5 3c0 3-7 3-7 6 0 2 1.5 3 3.5 3" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <path d="M16 4 30 28H2L16 4z" fill="#000" />
        </svg>
      );
    case "slack":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect x="12" y="3" width="3.5" height="12" rx="1.75" fill="#E01E5A" />
          <rect x="3" y="16.5" width="12" height="3.5" rx="1.75" fill="#36C5F0" />
          <rect x="16.5" y="17" width="3.5" height="12" rx="1.75" fill="#2EB67D" />
          <rect x="17" y="12" width="12" height="3.5" rx="1.75" fill="#ECB22E" />
        </svg>
      );
    case "datadog":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect width="32" height="32" rx="6" fill="#632CA6" />
          <path d="M25 8 14 19l-3-3-6 6 4 4 14-14z" fill="#fff" />
          <circle cx="19" cy="13" r="1.6" fill="#FFCD00" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M16 8v16M8 16h16" />
        </svg>
      );
    default:
      return null;
  }
}
