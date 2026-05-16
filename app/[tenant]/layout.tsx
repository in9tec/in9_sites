import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { tokensToStyle } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant: slug } = await params;
  const tenant = await db.getTenantBySlug(slug);
  if (!tenant) notFound();
  const theme = await db.getTheme(tenant.id);
  const style = theme ? tokensToStyle(theme.tokens) : undefined;
  return (
    <div className="tenant" style={style} data-theme={theme?.mode ?? "light"}>
      {children}
    </div>
  );
}
