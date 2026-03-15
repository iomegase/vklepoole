import { GalleryEditor } from "@/components/admin/gallery-editor";
import { getSiteContent } from "@/lib/site/store";

export const dynamic = "force-dynamic";

export default async function AdminGalleriesPage() {
  const site = await getSiteContent();

  return <GalleryEditor initialGalleries={site.galleries} />;
}
