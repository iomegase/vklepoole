import type { MediaType } from "@/lib/site/types";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function inferMediaTypeFromUrl(url: string): MediaType {
  return /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url) ? "video" : "image";
}
