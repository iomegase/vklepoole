import { notFound } from "next/navigation";

import { renderPublicPage } from "@/lib/site/render-public-page";
import { pageKeys, type PageKey } from "@/lib/site/types";

export const dynamic = "force-dynamic";

const slugToPageKeyMap: Record<string, PageKey> = {
  events: "events",
  video: "video",
  mariage: "mariage",
  contact: "contact",
};

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  if (slug.length === 0) {
    return renderPublicPage("home");
  }

  if (slug.length > 1) {
    notFound();
  }

  const pageKey = slugToPageKeyMap[slug[0]];

  if (!pageKey || !pageKeys.includes(pageKey)) {
    notFound();
  }

  return renderPublicPage(pageKey);
}
