"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { MenuItem, PageKey } from "@/lib/site/types";

interface BurgerMenuProps {
  currentPageKey: PageKey;
  isOpen: boolean;
  menuItems: MenuItem[];
  onClose: () => void;
  onNavigate: (pageKey: PageKey) => void;
}

export function BurgerMenu({
  currentPageKey,
  isOpen,
  menuItems,
  onClose,
  onNavigate,
}: BurgerMenuProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="ml-auto mt-3 mr-3 flex h-[calc(100%-1.5rem)] w-[min(28rem,calc(100%-0.75rem))] flex-col rounded-[2.5rem] border border-white/20 bg-white/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mt-5 sm:mr-5 sm:h-[calc(100%-2.5rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">Navigation</p>
                <h2 className="mt-3 font-[var(--font-lora)] text-3xl tracking-[-0.04em] text-zinc-900">
                  Slides
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-500">
                  Burger conservé. La navigation directe reste concentrée ici, sans transformer le
                  site en navbar classique.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-900/10 bg-white/85 text-zinc-900 shadow-[0_16px_30px_rgba(16,16,16,0.06)] transition hover:-translate-y-px"
                aria-label="Close navigation"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="mt-8 grid flex-1 gap-3 overflow-y-auto pr-1">
              {menuItems.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onNavigate(item.target)}
                  className={cn(
                    "group rounded-[1.9rem] border px-5 py-4 text-left transition",
                    item.target === currentPageKey
                      ? "border-black/12 bg-white shadow-[0_20px_48px_rgba(16,16,16,0.12)]"
                      : "border-black/10 bg-white/66 hover:-translate-y-px hover:bg-white/85",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-zinc-500">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span className="text-sm text-zinc-500 transition group-hover:text-zinc-900">
                      →
                    </span>
                  </div>
                  <p className="mt-3 font-[var(--font-lora)] text-2xl tracking-[-0.03em] text-zinc-900 sm:text-[2rem]">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
