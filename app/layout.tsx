import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nathan Vasconcelos — Tecnologia além do código",
  description:
    "Carreira, soft skills, processos de desenvolvimento e estabilização de sistemas. Conteúdo e consultoria em tecnologia por Nathan Vasconcelos.",
  openGraph: {
    title: "Nathan Vasconcelos — Tecnologia além do código",
    description: "Carreira, soft skills, processos de desenvolvimento e estabilização de sistemas.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
