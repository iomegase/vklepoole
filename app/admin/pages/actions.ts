"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/auth/session";
import { pagePathMap } from "@/lib/site/constants";
import { updatePage } from "@/lib/site/store";
import { pageKeys } from "@/lib/site/types";

export async function savePageAction(formData: FormData) {
  await requireAdminSession();

  const key = String(formData.get("key") || "");

  if (!pageKeys.includes(key as (typeof pageKeys)[number])) {
    throw new Error("Invalid page key.");
  }

  await updatePage({
    key: key as (typeof pageKeys)[number],
    label: String(formData.get("label") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    imageUrl: String(formData.get("imageUrl") || "").trim() || undefined,
  });

  revalidatePath("/admin/pages");
  revalidatePath(pagePathMap[key as keyof typeof pagePathMap]);
}
