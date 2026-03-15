import { PageEditorCard } from "@/components/admin/page-editor-card";
import { getSiteContent } from "@/lib/site/store";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const site = await getSiteContent();

  return (
    <div className="space-y-5">
      {site.pages.map((page) => (
        <PageEditorCard key={page.key} page={page} />
      ))}
    </div>
  );
}
