import type { Gallery, PageContent } from "@/lib/site/types";

const VIDEO_THUMB_ICON_URL = "https://www.svgrepo.com/show/310199/video-off.svg";

interface VideoCinematicLayoutProps {
  currentGallery: Gallery | null;
  currentPage: PageContent;
  onOpenGallery: () => void;
  onSelectIndex: (index: number) => void;
  selectedIndex: number;
}

function getSafeIndex(index: number, length: number) {
  if (length <= 0) {
    return -1;
  }
  if (index < 0) {
    return 0;
  }
  if (index >= length) {
    return length - 1;
  }
  return index;
}

export function VideoCinematicLayout({
  currentGallery,
  currentPage,
  onOpenGallery,
  onSelectIndex,
  selectedIndex,
}: VideoCinematicLayoutProps) {
  const items = currentGallery?.items ?? [];
  const safeIndex = getSafeIndex(selectedIndex, items.length);
  const activeItem = safeIndex >= 0 ? items[safeIndex] : null;
  const contentLines = currentPage.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const featureTitle = activeItem?.title ?? currentPage.title;
  const featureText = activeItem?.subtitle ?? contentLines.join(" ");

  return (
    <section className="relative h-full min-h-200 w-full overflow-hidden rounded-3xl bg-black shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: "url('/images/video1.png')" }}
      />
      <div className="absolute inset-0 bg-slate-800/5" />

      <div className="relative z-10 grid h-full min-h-[560px] grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="absolute inset-y-4 left-4 right-4 rounded-3xl   bg-white/12 backdrop-blur-sm sm:inset-y-6 sm:left-6 sm:right-10 md:right-[31%]" />

          <div className="relative p-6 flex h-full flex-col justify-between pr-2 text-white sm:pr-6 md:max-w-[66%]">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/82">
                Video
              </p>
              <h2 className="mt-6 max-w-[10ch] text-4xl uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-6xl">
                {featureTitle}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/82 sm:text-[1.15rem]">
                {featureText}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={onOpenGallery}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/72 text-3xl text-white transition hover:scale-[1.03]"
                  aria-label="Open video gallery"
                >
                  ▶
                </button>
              ) : null}
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/78">
                {safeIndex >= 0
                  ? `${String(safeIndex + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`
                  : "No media"}
              </p>
            </div>
          </div>
        </div>

        <aside className="p-4">
       

          <div className="mt-4 space-y-2">
            {items.length > 0 ? (
              items.map((item, index) => {
                const active = index === safeIndex;
                const thumbUrl =
                  item.mediaType === "video" ? VIDEO_THUMB_ICON_URL : item.mediaUrl;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => onSelectIndex(index)}
                    className={[
                      "group flex w-full items-center gap-3 rounded-xl shadow-md px-3 py-2 text-left transition",
                      active
                        ? " bg-black/14 backdrop-blur-sm text-slate-900"
                        : " bg-white/20 hover:bg-white/10 p-4 backdrop-blur-sm ",
                    ].join(" ")}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-900/50">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm uppercase leading-5 tracking-[0.08em] text-slate-900/50">
                        {item.title}
                      </p>
                    </div>

                    <div
                      className="h-14 w-20 rounded-md bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${thumbUrl}')` }}
                    />
                  </button>
                );
              })
            ) : (
              <div className="rounded-xl border border-white/15 bg-white/8 p-4 text-sm text-white/72">
                Aucun media assigne a cette page.
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
