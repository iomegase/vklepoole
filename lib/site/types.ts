export const pageKeys = ["home", "events", "video", "mariage", "contact"] as const;
export const galleryAssignablePageKeys = ["events", "video", "mariage"] as const;

export type PageKey = (typeof pageKeys)[number];
export type GalleryAssignablePageKey = (typeof galleryAssignablePageKeys)[number];
export type MediaType = "image" | "video";

export interface AdminRecord {
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageContent {
  key: PageKey;
  label: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  target: PageKey;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  mediaUrl: string;
  mediaType: MediaType;
  order: number;
}

export interface Gallery {
  id: string;
  name: string;
  assignedPage: GalleryAssignablePageKey | null;
  items: GalleryItem[];
}

export interface SiteContent {
  pages: PageContent[];
  menuItems: MenuItem[];
  galleries: Gallery[];
}
