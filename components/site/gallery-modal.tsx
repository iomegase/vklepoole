/* eslint-disable @next/next/no-img-element */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { Gallery } from "@/lib/site/types";

interface GalleryModalProps {
  gallery: Gallery | null;
  open: boolean;
  onClose: () => void;
}

export function GalleryModal({ gallery, open, onClose }: GalleryModalProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const items = gallery?.items ?? [];
  const selectedIndex = activeItemId
    ? items.findIndex((item) => item.id === activeItemId)
    : -1;
  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const activeItem = items[safeIndex];

  return (
    <AnimatePresence>
      {open && gallery && activeItem ? (
        <motion.div
          key={gallery.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.985 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(247,244,239,0.92))] shadow-[0_28px_90px_rgba(16,16,16,0.09),inset_0_1px_0_rgba(255,255,255,0.78)] relative flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2.5rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-black/7 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Gallery</p>
                <h2 className="mt-3 font-[var(--font-lora)] text-4xl tracking-[-0.04em] text-zinc-900">
                  {gallery.name}
                </h2>
              </div>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/10 bg-white/85 text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.06)] transition hover:-translate-y-px"
                onClick={onClose}
                aria-label="Close gallery"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="flex min-h-[50vh] items-center justify-center p-4 sm:p-6">
                <div className="overflow-hidden border border-zinc-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(243,239,233,0.94))] shadow-[0_24px_60px_rgba(16,16,16,0.1)] relative flex min-h-[48vh] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-white">
                  {activeItem.mediaType === "video" ? (
                    <video
                      key={activeItem.id}
                      controls
                      className="max-h-[70vh] w-full object-cover"
                      src={activeItem.mediaUrl}
                    />
                  ) : (
                    <img
                      key={activeItem.id}
                      src={activeItem.mediaUrl}
                      alt={activeItem.title}
                      className="max-h-[70vh] w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="flex min-h-0 flex-col border-t border-black/7 p-5 lg:border-l lg:border-t-0 lg:p-6">
                <div className="rounded-[1.9rem] border border-black/7 bg-white/78 p-5">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">
                    {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-[var(--font-lora)] text-4xl tracking-[-0.04em] text-zinc-900">
                    {activeItem.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-500">
                    {activeItem.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.05)] transition hover:-translate-y-px flex-1 justify-center"
                    onClick={() =>
                      setActiveItemId(items[safeIndex <= 0 ? items.length - 1 : safeIndex - 1]?.id ?? null)
                    }
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-zinc-900 px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_20px_40px_rgba(16,16,16,0.15)] transition hover:-translate-y-px flex-1 justify-center"
                    onClick={() =>
                      setActiveItemId(items[safeIndex >= items.length - 1 ? 0 : safeIndex + 1]?.id ?? null)
                    }
                  >
                    Next
                  </button>
                </div>

                <div className="mt-4 grid min-h-0 grid-cols-3 gap-2 overflow-y-auto rounded-[1.65rem] border border-black/7 bg-white/62 p-2">
                  {items.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setActiveItemId(item.id)}
                      className={cn(
                        "overflow-hidden rounded-[1rem] border border-black/7 transition",
                        index === safeIndex
                          ? "shadow-[0_12px_28px_rgba(16,16,16,0.1)]"
                          : "opacity-70 hover:opacity-100",
                      )}
                    >
                      {item.mediaType === "video" ? (
                        <div className="flex aspect-square items-center justify-center bg-[linear-gradient(180deg,#ffffff,#f3f0eb)] text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                          Video
                        </div>
                      ) : (
                        <img src={item.mediaUrl} alt={item.title} className="aspect-square w-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
