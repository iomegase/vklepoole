import type { PageKey } from "@/lib/site/types";

import { toTranslateStyle, type VisualMotion } from "./shared";

interface PageBackdropProps {
  currentPageKey: PageKey;
  pageLabel: string;
  visualMotion: VisualMotion;
}

export function PageBackdrop({
  currentPageKey,
  pageLabel,
  visualMotion,
}: PageBackdropProps) {
  const isContact = currentPageKey === "contact";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          ...toTranslateStyle(visualMotion.background.x, visualMotion.background.y, 1.06),
          backgroundImage: "url('/images/contact.jpg')",
        }}
      />
      <div
        className="absolute inset-0 m-4 rounded-3xl bg-linear-to-b from-black/5 to-black/5 sm:m-8 lg:m-12"
        style={toTranslateStyle(visualMotion.background.x * 0.24, visualMotion.background.y * 0.24)}
      />
      <div
        className="absolute inset-x-16 top-1/4 h-40 rounded-full bg-black/5 opacity-50 blur-3xl md:inset-x-24 lg:inset-x-32"
        style={toTranslateStyle(visualMotion.background.x, visualMotion.background.y)}
      />
      <div className="absolute bottom-6 right-6 text-6xl font-semibold tracking-tighter text-black/5 sm:bottom-8 sm:right-8 sm:text-9xl">
        {isContact ? "CONTACT" : pageLabel.toUpperCase()}
      </div>
    </div>
  );
}
