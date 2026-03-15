"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/auth/session";
import { deleteGallery, upsertGallery } from "@/lib/site/store";
import { inferMediaTypeFromUrl } from "@/lib/utils";
import type { Gallery } from "@/lib/site/types";
import { pageKeys } from "@/lib/site/types";

export async function saveGalleryAction(formData: FormData) {
  await requireAdminSession();

  const rawPayload = JSON.parse(String(formData.get("payload") || "{}")) as {
    assignedPage?: string | null;
    id: string;
    items: Gallery["items"];
    name: string;
  };

  if (rawPayload.assignedPage === "home" || rawPayload.assignedPage === "contact") {
    throw new Error("Home and Contact can never receive a gallery.");
  }

  const assignedPage =
    rawPayload.assignedPage === "events" ||
    rawPayload.assignedPage === "video" ||
    rawPayload.assignedPage === "mariage"
      ? rawPayload.assignedPage
      : null;

  await upsertGallery({
    ...rawPayload,
    assignedPage,
    name: rawPayload.name.trim(),
    items: rawPayload.items.map((item, index) => ({
      ...item,
      title: item.title.trim(),
      subtitle: item.subtitle.trim(),
      mediaType: item.mediaType || inferMediaTypeFromUrl(item.mediaUrl),
      order: Number.isFinite(item.order) ? item.order : index,
    })),
  });

  revalidatePath("/admin/galleries");

  for (const pageKey of pageKeys) {
    revalidatePath(pageKey === "home" ? "/" : `/${pageKey}`);
  }
}

export async function deleteGalleryAction(formData: FormData) {
  await requireAdminSession();

  const galleryId = String(formData.get("galleryId") || "");

  if (!galleryId) {
    throw new Error("Missing gallery id.");
  }

  await deleteGallery(galleryId);
  revalidatePath("/admin/galleries");

  for (const pageKey of pageKeys) {
    revalidatePath(pageKey === "home" ? "/" : `/${pageKey}`);
  }
}
