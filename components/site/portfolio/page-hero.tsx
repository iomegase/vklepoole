import type { PageContent } from "@/lib/site/types";

import { toTranslateStyle, type VisualMotion } from "./shared";

interface PageHeroProps {
  currentPage: PageContent;
  visualMotion: VisualMotion;
}

export function PageHero({ currentPage, visualMotion }: PageHeroProps) {
  const contentLines = currentPage.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const primaryLine = contentLines[0] ?? "";
  const secondaryLine = contentLines.slice(1).join(" ");

  return (
    <div className="hidden md:block relative h-[360px] w-full max-w-[620px] sm:h-[470px] lg:h-[620px]">
      <div className="absolute inset-[6%] rounded-[2.75rem] border border-black/8 bg-white/74 shadow-[0_28px_80px_rgba(16,16,16,0.08)]" />
      <div
        className="absolute inset-[10%] rounded-[2.2rem] border border-black/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(250,248,244,0.7))] p-6 sm:p-8"
        style={toTranslateStyle(visualMotion.hero.x, visualMotion.hero.y)}
      >
        <div className="flex items-center justify-between text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">
          <span>Available</span>
          <span>01 project at a time</span>
        </div>
        <div className="mt-10">
          <p className="text-[2.5rem] font-semibold leading-[0.92] tracking-[-0.05em] text-zinc-900 sm:text-[4rem]">
            {currentPage.title}
          </p>
          <p className="mt-5 max-w-md text-sm leading-8 text-zinc-500 sm:text-base">
            {primaryLine}
            {secondaryLine ? ` ${secondaryLine}` : ""}
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {["Editorial", "Events", "Video", "Mariage"].map((item) => (
            <div
              key={item}
              className="rounded-[1.35rem] border border-black/7 bg-white/72 px-4 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-500"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-zinc-500">
          {currentPage.label}
        </p>
      </div>
    </div>
  );
}
