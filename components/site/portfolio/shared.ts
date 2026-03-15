import type { CSSProperties } from "react";

import type { Variants } from "framer-motion";

import type { Gallery, PageKey } from "@/lib/site/types";

export interface Offset {
  x: number;
  y: number;
}

export interface VisualMotion {
  panel: Offset;
  hero: Offset;
  accent: Offset;
  background: Offset;
}

interface PageVisual {
  accent: string;
  accentSoft: string;
  eyebrow: string;
  accentLabel: string;
  detailItems: string[];
}

export const slideVariants: Variants = {
  enter: () => ({
    opacity: 0,
    scale: 0.985,
    filter: "blur(14px)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: () => ({
    opacity: 0,
    scale: 1.008,
    filter: "blur(10px)",
    transition: {
      duration: 0.38,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};

export const pageVisualMap: Record<PageKey, PageVisual> = {
  home: {
    accent: "#cabca8",
    accentSoft: "rgba(202, 188, 168, 0.2)",
    eyebrow: "Minimal / Immersive",
    accentLabel: "Selected works",
    detailItems: ["Central hero", "White surface", "One quiet accent"],
  },
  events: {
    accent: "#b81826",
    accentSoft: "rgba(184, 24, 38, 0.14)",
    eyebrow: "Editorial / Live",
    accentLabel: "Stage / crowd / energy",
    detailItems: ["Deep red slab", "Denser editorial layout", "Gallery-driven page"],
  },
  video: {
    accent: "#8aa1b7",
    accentSoft: "rgba(138, 161, 183, 0.18)",
    eyebrow: "Motion / Sequence",
    accentLabel: "Frames / rhythm / cut",
    detailItems: ["Light tech mood", "Grid overlay", "Motion-first navigation"],
  },
  mariage: {
    accent: "#d9c8b2",
    accentSoft: "rgba(217, 200, 178, 0.18)",
    eyebrow: "Ceremony / Intimacy",
    accentLabel: "Quiet vows",
    detailItems: ["Soft ivory atmosphere", "Centered portrait", "More air, less noise"],
  },
  contact: {
    accent: "#171717",
    accentSoft: "rgba(23, 23, 23, 0.08)",
    eyebrow: "Bookings / Contact",
    accentLabel: "France / Europe / Remote",
    detailItems: ["Almost typographic", "Minimal information density", "Direct orientation"],
  },
};

export function toTranslateStyle(x: number, y: number, scale = 1): CSSProperties {
  return {
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
  };
}

export function getGalleryHint(currentPageKey: PageKey, currentGallery: Gallery | null) {
  if (currentGallery) {
    return `${currentGallery.items.length} media`;
  }

  if (currentPageKey === "home" || currentPageKey === "contact") {
    return "No gallery";
  }

  return "Gallery ready";
}
