"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/auth/session";
import { pagePathMap } from "@/lib/site/constants";
import { updateMenuItems } from "@/lib/site/store";
import type { MenuItem } from "@/lib/site/types";
import { pageKeys } from "@/lib/site/types";

export async function saveMenuAction(formData: FormData) {
  await requireAdminSession();

  const payload = JSON.parse(String(formData.get("payload") || "[]")) as MenuItem[];
  const sanitized = payload.map((item, index) => {
    if (!pageKeys.includes(item.target)) {
      throw new Error("Invalid menu target.");
    }

    return {
      id: item.id,
      label: item.label.trim(),
      order: Number.isFinite(item.order) ? item.order : index,
      target: item.target,
    } satisfies MenuItem;
  });

  await updateMenuItems(sanitized);
  revalidatePath("/admin/menu");

  for (const pageKey of pageKeys) {
    revalidatePath(pagePathMap[pageKey]);
  }
}
