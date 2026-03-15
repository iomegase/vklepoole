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
  const isVideo = currentPageKey === "video";
  const backgroundImage = isVideo ? "/images/video1.png" : "/images/contact.jpg";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          ...toTranslateStyle(visualMotion.background.x, visualMotion.background.y, 1.06),
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      <div
        className={[
          "absolute inset-0 m-4 rounded-3xl sm:m-8 lg:m-12",
          isVideo
            ? "bg-linear-to-t from-white/60 via-white/40 to-white/20"
            : "bg-linear-to-t from-white/60 via-white/40 to-white/20",
        ].join(" ")}
        style={toTranslateStyle(visualMotion.background.x * 0.24, visualMotion.background.y * 0.24)}
      />
      <div
        className={[
          "absolute inset-x-16 top-1/4 h-40 rounded-full opacity-50 blur-3xl md:inset-x-24 lg:inset-x-32",
          isVideo ? "bg-black/25" : "bg-black/5",
        ].join(" ")}
        style={toTranslateStyle(visualMotion.background.x, visualMotion.background.y)}
      />
      <div
        className={[
          "absolute bottom-6 right-6 text-6xl font-semibold tracking-tighter sm:bottom-8 sm:right-8 sm:text-9xl",
          isVideo ? "text-white/10" : "text-black/5",
        ].join(" ")}
      >
        {isContact ? "CONTACT" : pageLabel.toUpperCase()}
      </div>
    </div>
  );
}
