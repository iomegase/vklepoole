import type { GalleryAssignablePageKey, PageKey } from "@/lib/site/types";

export const pagePathMap: Record<PageKey, string> = {
  home: "/",
  events: "/events",
  video: "/video",
  mariage: "/mariage",
  contact: "/contact",
};

export function isGalleryAssignablePage(
  value: string | null | undefined,
): value is GalleryAssignablePageKey {
  return value === "events" || value === "video" || value === "mariage";
}
