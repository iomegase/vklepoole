import { MenuEditor } from "@/components/admin/menu-editor";
import { getSiteContent } from "@/lib/site/store";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const site = await getSiteContent();

  return <MenuEditor initialItems={site.menuItems} />;
}
