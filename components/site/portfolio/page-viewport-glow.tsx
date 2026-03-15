import { cn } from "@/lib/utils";
import type { PageKey } from "@/lib/site/types";

interface PageViewportGlowProps {
  pageKey: PageKey;
}

export function PageViewportGlow({ pageKey }: PageViewportGlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-colors duration-500",
        pageKey === "events" && "bg-[radial-gradient(circle_at_50%_0%,rgba(184,24,38,0.18),transparent_36%)]",
        pageKey === "video" && "bg-[radial-gradient(circle_at_78%_14%,rgba(138,161,183,0.14),transparent_28%)]",
        pageKey === "mariage" && "bg-[radial-gradient(circle_at_18%_24%,rgba(217,200,178,0.18),transparent_30%)]",
        pageKey === "contact" && "bg-[radial-gradient(circle_at_50%_40%,rgba(17,17,17,0.04),transparent_36%)]",
      )}
    />
  );
}
