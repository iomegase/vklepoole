import "server-only";

import { randomUUID } from "crypto";
import type { Collection, Document } from "mongodb";

import { siteSeedData } from "@/data/site";
import { isGalleryAssignablePage } from "@/lib/site/constants";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb/client";
import type {
  Gallery,
  GalleryItem,
  MenuItem,
  PageContent,
  SiteContent,
} from "@/lib/site/types";
import { pageKeys } from "@/lib/site/types";

let fallbackStore: SiteContent = structuredClone(siteSeedData);

function stripMongoId<T>(document: T & { _id?: unknown }): T {
  const rest = { ...document };
  delete rest._id;
  return rest as T;
}

function sortPages(pages: PageContent[]) {
  return [...pages].sort(
    (left, right) => pageKeys.indexOf(left.key) - pageKeys.indexOf(right.key),
  );
}

function sortMenuItems(items: MenuItem[]) {
  return [...items].sort((left, right) => left.order - right.order);
}

function sortGalleryItems(items: GalleryItem[]) {
  return [...items].sort((left, right) => left.order - right.order);
}

function normalizeGallery(gallery: Gallery): Gallery {
  return {
    ...gallery,
    items: sortGalleryItems(gallery.items),
  };
}

function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    pages: sortPages(content.pages),
    menuItems: sortMenuItems(content.menuItems),
    galleries: [...content.galleries].map(normalizeGallery),
  };
}

async function getCollection<T extends Document>(
  name: string,
): Promise<Collection<T> | null> {
  const db = await getMongoDb();
  return db ? db.collection<T>(name) : null;
}

async function seedMongoContent() {
  const pageCollection = await getCollection<PageContent>("pages");
  const menuCollection = await getCollection<MenuItem>("menu");
  const galleryCollection = await getCollection<Gallery>("galleries");

  if (!pageCollection || !menuCollection || !galleryCollection) {
    return;
  }

  if ((await pageCollection.countDocuments()) === 0) {
    await pageCollection.insertMany(siteSeedData.pages);
  }

  if ((await menuCollection.countDocuments()) === 0) {
    await menuCollection.insertMany(siteSeedData.menuItems);
  }

  if ((await galleryCollection.countDocuments()) === 0) {
    await galleryCollection.insertMany(siteSeedData.galleries);
  }
}

function cloneFallbackStore() {
  return structuredClone(fallbackStore) as SiteContent;
}

function ensureValidGalleryAssignment(value: string | null) {
  if (value === null) {
    return null;
  }

  if (!isGalleryAssignablePage(value)) {
    throw new Error("Galleries can only be assigned to events, video or mariage.");
  }

  return value;
}

export function getDataMode() {
  return isMongoConfigured() ? "mongodb" : "seed";
}

export async function getSiteContent() {
  if (!isMongoConfigured()) {
    return normalizeSiteContent(cloneFallbackStore());
  }

  try {
    await seedMongoContent();
    const pageCollection = await getCollection<PageContent>("pages");
    const menuCollection = await getCollection<MenuItem>("menu");
    const galleryCollection = await getCollection<Gallery>("galleries");

    if (!pageCollection || !menuCollection || !galleryCollection) {
      return normalizeSiteContent(cloneFallbackStore());
    }

    const [pages, menuItems, galleries] = await Promise.all([
      pageCollection.find({}).toArray(),
      menuCollection.find({}).toArray(),
      galleryCollection.find({}).toArray(),
    ]);

    return normalizeSiteContent({
      pages: pages.map((page) => stripMongoId(page)),
      menuItems: menuItems.map((item) => stripMongoId(item)),
      galleries: galleries.map((gallery) => stripMongoId(gallery)),
    });
  } catch {
    return normalizeSiteContent(cloneFallbackStore());
  }
}

export async function updatePage(page: PageContent) {
  const payload: PageContent = {
    ...page,
    imageUrl: page.imageUrl || undefined,
  };

  if (!isMongoConfigured()) {
    fallbackStore.pages = fallbackStore.pages.map((entry) =>
      entry.key === payload.key ? payload : entry,
    );
    return payload;
  }

  const collection = await getCollection<PageContent>("pages");

  if (!collection) {
    throw new Error("Pages collection is unavailable.");
  }

  await collection.updateOne(
    { key: payload.key },
    { $set: payload },
    { upsert: true },
  );
  return payload;
}

export async function updateMenuItems(items: MenuItem[]) {
  const payload = sortMenuItems(
    items.map((item, index) => ({
      ...item,
      id: item.id || randomUUID(),
      order: Number.isFinite(item.order) ? item.order : index,
    })),
  );

  if (!isMongoConfigured()) {
    fallbackStore.menuItems = payload;
    return payload;
  }

  const collection = await getCollection<MenuItem>("menu");

  if (!collection) {
    throw new Error("Menu collection is unavailable.");
  }

  await collection.deleteMany({});
  await collection.insertMany(payload);
  return payload;
}

export async function upsertGallery(gallery: Gallery) {
  const payload: Gallery = {
    ...gallery,
    id: gallery.id || randomUUID(),
    assignedPage: ensureValidGalleryAssignment(gallery.assignedPage),
    items: sortGalleryItems(
      gallery.items.map((item, index) => ({
        ...item,
        id: item.id || randomUUID(),
        mediaType: item.mediaType === "video" ? "video" : "image",
        order: Number.isFinite(item.order) ? item.order : index,
      })),
    ),
  };

  if (!isMongoConfigured()) {
    fallbackStore.galleries = fallbackStore.galleries
      .filter((entry) => entry.id !== payload.id)
      .map((entry) =>
        entry.assignedPage && entry.assignedPage === payload.assignedPage
          ? { ...entry, assignedPage: null }
          : entry,
      );
    fallbackStore.galleries.push(payload);
    fallbackStore = normalizeSiteContent(fallbackStore);
    return payload;
  }

  const collection = await getCollection<Gallery>("galleries");

  if (!collection) {
    throw new Error("Gallery collection is unavailable.");
  }

  if (payload.assignedPage) {
    await collection.updateMany(
      {
        assignedPage: payload.assignedPage,
        id: { $ne: payload.id },
      },
      { $set: { assignedPage: null } },
    );
  }

  await collection.updateOne({ id: payload.id }, { $set: payload }, { upsert: true });
  return payload;
}

export async function deleteGallery(galleryId: string) {
  if (!isMongoConfigured()) {
    fallbackStore.galleries = fallbackStore.galleries.filter(
      (gallery) => gallery.id !== galleryId,
    );
    return;
  }

  const collection = await getCollection<Gallery>("galleries");

  if (!collection) {
    throw new Error("Gallery collection is unavailable.");
  }

  await collection.deleteOne({ id: galleryId });
}

export function getSystemStatus() {
  return {
    cloudinary: Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET,
    ),
    mongo: isMongoConfigured(),
    mode: getDataMode(),
  };
}
